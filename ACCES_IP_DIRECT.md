# 🌐 Accès IP direct (Sans domaine)

## Prêt à l'emploi !

Votre site est déjà accessible sur :
**http://72.61.167.191:3000**

Aucune configuration supplémentaire nécessaire !

---

## Pourquoi utiliser le port ?

Le port 3000 est nécessaire car :
- Next.js tourne sur le port 3000
- C'est la configuration par défaut

---

## Souhaitez-vous masquer le port ? 

Si vous voulez accéder sans le `:3000`, vous DEVEZ configurer Nginx.

### Option rapide : Nginx sur port 80

```bash
# Créer la configuration
cat > /etc/nginx/sites-available/digitalpro << 'EOF'
server {
    listen 80;
    server_name 72.61.167.191;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

# Activer
ln -s /etc/nginx/sites-available/digitalpro /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

Ensuite : **http://72.61.167.191** (sans :3000)

---

## 🔒 Ajouter HTTPS (Optionnel)

Pour avoir HTTPS sans domaine, c'est complexe. Il faut :
1. Un certificat auto-signé (avertissement de sécurité)
2. Ou utiliser Cloudflare Tunnel
3. Ou Cloudflare SSL

**Recommandation : Utilisez un domaine ! C'est plus simple et gratuit.**

---

## ✅ Actuel

Votre site fonctionne sur :
- http://72.61.167.191:3000

**C'est déjà public !** ✅











