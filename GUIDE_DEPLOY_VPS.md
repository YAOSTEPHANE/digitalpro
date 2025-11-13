# 🚀 Démarche de déploiement sur VPS Hostinger

## 📋 Prérequis

- ✅ VPS Hostinger actif avec accès SSH
- ✅ Mots de passe ou clé SSH
- ✅ Accès à votre panel Hostinger

---

## 🔑 ÉTAPE 1 : Récupérer vos identifiants SSH

1. Connectez-vous à votre **hPanel Hostinger**
2. Allez dans **"VPS"** ou **"VPS Cloud"**
3. Trouvez votre VPS et cliquez dessus
4. Notez ces informations :
   - **IP Address** : `xxx.xxx.xxx.xxx`
   - **Username** : Généralement `root`
   - **Port SSH** : Généralement `22`
   - **Password** : Mot de passe root

---

## 🔌 ÉTAPE 2 : Vérifier l'accès SSH

Sur votre ordinateur local (PowerShell ou Terminal) :

```bash
ssh root@VOTRE_IP_ADRESSE
```

Exemple :
```bash
ssh root@185.123.45.67
```

Si c'est la première connexion, répondez `yes` à la question de sécurité.

---

## 🛠️ ÉTAPE 3 : Installer Node.js sur le VPS

Une fois connecté au VPS via SSH, exécutez ces commandes :

```bash
# Installer NVM (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Recharger NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

# Installer Node.js 18 (LTS)
nvm install 18
nvm use 18

# Vérifier l'installation
node --version
npm --version
```

Vous devriez voir :
- Node.js version : `v18.x.x`
- npm version : `9.x.x`

---
y## 📦 ÉTAPE 4 : Installer PM2

```bash
npm install -g pm2

# Vérifier l'installation
pm2 --version
```

---

## 📥 ÉTAPE 5 : Cloner votre projet

```bash
# Créer le dossier
mkdir -p /var/www
cd /var/www

# Cloner le repository
git clone https://github.com/YAOSTEPHANE/digitalpro.git

# Aller dans le dossier
cd digitalpro

# Installer les dépendances
npm install

# Builder le projet
npm run build
```

⚠️ Le build peut prendre 2-5 minutes. Attendez la fin.

---

## 🚀 ÉTAPE 6 : Démarrer l'application avec PM2

```bash
# Démarrer l'application
pm2 start npm --name "digitalpro" -- start

# Sauvegarder la configuration
pm2 save

# Configurer PM2 pour démarrer au boot
pm2 startup

# Copier la commande affichée et l'exécuter
```

Exemple de commande à exécuter :
```bash
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u root --hp /root
```

---

## 🌐 ÉTAPE 7 : Configurer le firewall (optionnel mais recommandé)

```bash
# Installer UFW (si pas déjà installé)
apt install ufw -y

# Autoriser les ports nécessaires
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw allow 3000/tcp  # Port de Next.js

# Activer le firewall
ufw enable

# Vérifier
ufw status
```

---

## 🔄 ÉTAPE 8 : Configurer Nginx comme reverse proxy (Optionnel)

Si vous voulez que votre site soit accessible via votre domaine :

```bash
# Installer Nginx
apt install nginx -y

# Créer un fichier de configuration
nano /etc/nginx/sites-available/digitalpro
```

Collez cette configuration (remplacez `votredomaine.com` par votre domaine) :

```nginx
server {
    listen 80;
    server_name votredomaine.com www.votredomaine.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enregistrez avec `Ctrl+X`, puis `Y`, puis `Enter`.

```bash
# Activer le site
ln -s /etc/nginx/sites-available/digitalpro /etc/nginx/sites-enabled/

# Tester la configuration
nginx -t

# Redémarrer Nginx
systemctl restart nginx
```

---

## 🔒 ÉTAPE 9 : Installer SSL avec Let's Encrypt (Optionnel mais recommandé)

```bash
# Installer Certbot
apt install certbot python3-certbot-nginx -y

# Obtenir un certificat SSL
certbot --nginx -d votredomaine.com -d www.votredomaine.com

# Le renouvellement automatique est déjà configuré
certbot renew --dry-run
```

---

## ✅ Vérification finale

```bash
# Voir le statut de l'application
pm2 status

# Voir les logs en temps réel
pm2 logs digitalpro

# Vérifier que l'application écoute sur le port 3000
netstat -tuln | grep 3000
```

Votre site devrait maintenant être accessible sur :
- **Directement** : `http://VOTRE_IP:3000`
- **Via Nginx** : `http://votredomaine.com`

---

## 🛠️ Commandes utiles pour la maintenance

```bash
# Voir les logs
pm2 logs digitalpro

# Redémarrer l'application
pm2 restart digitalpro

# Arrêter l'application
pm2 stop digitalpro

# Mettre à jour l'application
cd /var/www/digitalpro
git pull origin main
npm install
npm run build
pm2 restart digitalpro

# Voir le statut
pm2 status
pm2 monit
```

---

## 🆘 Dépannage

### L'application ne démarre pas
```bash
# Voir les logs d'erreur
pm2 logs digitalpro --err

# Vérifier que le port n'est pas déjà utilisé
netstat -tuln | grep 3000
```

### Erreur "Cannot find module"
```bash
cd /var/www/digitalpro
rm -rf node_modules
npm install
pm2 restart digitalpro
```

### Build échoue
```bash
# Vérifier l'espace disque
df -h

# Vérifier la mémoire
free -h

# Nettoyer et rebuilder
rm -rf .next
npm run build
```

---

## 🎉 Félicitations !

Votre site Digitalpro est maintenant en ligne sur votre VPS Hostinger !

---

## 📝 Notes importantes

- **PM2** garde votre application en ligne même si vous fermez la connexion SSH
- **PM2 save** sauvegarde la configuration pour le redémarrage
- **Les mises à jour** se font avec `git pull` puis `pm2 restart`
- **Les logs** sont accessibles 24/7 avec `pm2 logs digitalpro`

---

Besoin d'aide ? Consultez : https://www.hostinger.com/help











