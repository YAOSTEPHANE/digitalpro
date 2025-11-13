# ✅ Site Digitalpro est en ligne!

## 🌐 Accès au site
Votre site est accessible sur :
- **http://72.61.167.191:3000**
- **http://localhost:3000** (depuis le serveur)

## 📊 Statut PM2
```
✓ Ready in 832ms
- Network: http://72.61.167.191:3000
```

L'application tourne correctement avec PM2.

## 🔧 Commandes utiles

### Voir les logs
```bash
pm2 logs digitalpro
```

### Voir le statut
```bash
pm2 status
```

### Redémarrer
```bash
pm2 restart digitalpro
```

### Mise à jour future
```bash
cd /var/www/digitalpro
git pull origin main
npm install
npm run build
pm2 restart digitalpro
```

## 🔒 Configuration du firewall (optionnel)

Pour que le site soit accessible depuis internet:

```bash
ufw allow 3000/tcp
ufw reload
```

## 🌐 Test depuis votre navigateur

Ouvrez votre navigateur et allez sur:
**http://72.61.167.191:3000**

## 🎉 Félicitations!

Votre site Digitalpro est maintenant en ligne sur Hostinger VPS!

---

## 📋 Prochaines étapes (optionnelles)

### 1. Configurer Nginx (reverse proxy)
Pour utiliser un domaine au lieu de l'IP:
```bash
apt install nginx
# Puis configurer /etc/nginx/sites-available/digitalpro
```

### 2. Installer SSL (HTTPS)
```bash
apt install certbot python3-certbot-nginx
certbot --nginx -d votredomaine.com
```

### 3. Configurer le domaine
Dans les DNS de votre domaine, ajoutez:
- Type: A
- Nom: @
- Valeur: 72.61.167.191











