#!/usr/bin/env bash
set -euo pipefail

APP_NAME="digitalpro"
APP_DIR="/var/www/digitalpro"
REPO_URL="https://github.com/YAOSTEPHANE/digitalpro.git"
DOMAIN="digitalpro-solutions.com"
NODE_MAJOR="22"

export DEBIAN_FRONTEND=noninteractive

echo "==> Mise à jour système (léger)"
apt-get update -qq

if ! command -v git >/dev/null 2>&1; then
  apt-get install -y -qq git curl nginx certbot python3-certbot-nginx ufw
fi

if ! command -v node >/dev/null 2>&1; then
  echo "==> Installation Node.js ${NODE_MAJOR}"
  curl -fsSL https://deb.nodesource.com/setup_${NODE_MAJOR}.x | bash -
  apt-get install -y -qq nodejs
fi

if ! command -v pm2 >/dev/null 2>&1; then
  echo "==> Installation PM2"
  npm install -g pm2
fi

mkdir -p /var/www
if [ ! -d "${APP_DIR}/.git" ]; then
  echo "==> Clone du dépôt"
  git clone "${REPO_URL}" "${APP_DIR}"
else
  echo "==> Pull des dernières modifications"
  git -C "${APP_DIR}" fetch origin main
  git -C "${APP_DIR}" reset --hard origin/main
fi

cd "${APP_DIR}"

if [ ! -f .env.local ]; then
  echo "==> Création .env.local production"
  cat > .env.local <<EOF
NEXT_PUBLIC_SITE_URL=https://${DOMAIN}
NEXT_PUBLIC_DEMO_WEB_URL=https://www.nyimmobilier.com
NEXT_PUBLIC_DEMO_MOBILE_URL=https://enregistreur-caisse.vercel.app
EOF
fi

echo "==> Installation des dépendances"
npm ci || npm install

echo "==> Build Next.js"
export NODE_ENV=production
npm run build

echo "==> Démarrage PM2"
if pm2 describe "${APP_NAME}" >/dev/null 2>&1; then
  pm2 restart "${APP_NAME}" --update-env
else
  pm2 start npm --name "${APP_NAME}" -- start
  pm2 save
  pm2 startup systemd -u root --hp /root >/tmp/pm2-startup.txt 2>/dev/null || true
  if grep -q "sudo env" /tmp/pm2-startup.txt 2>/dev/null; then
    bash -c "$(grep 'sudo env' /tmp/pm2-startup.txt)"
  fi
fi

echo "==> Configuration Nginx"
cat > "/etc/nginx/sites-available/${APP_NAME}" <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN} www.${DOMAIN};

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

ln -sf "/etc/nginx/sites-available/${APP_NAME}" "/etc/nginx/sites-enabled/${APP_NAME}"
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx

if command -v ufw >/dev/null 2>&1; then
  ufw allow OpenSSH >/dev/null 2>&1 || ufw allow 22/tcp
  ufw allow 'Nginx Full' >/dev/null 2>&1 || { ufw allow 80/tcp; ufw allow 443/tcp; }
  ufw --force enable >/dev/null 2>&1 || true
fi

if ! certbot certificates 2>/dev/null | grep -q "${DOMAIN}"; then
  echo "==> Certificat SSL Let's Encrypt"
  certbot --nginx -d "${DOMAIN}" -d "www.${DOMAIN}" --non-interactive --agree-tos -m admin@${DOMAIN} || true
fi

echo "==> Déploiement terminé"
pm2 status
curl -s -o /dev/null -w "HTTP local: %{http_code}\n" http://127.0.0.1:3000 || true
