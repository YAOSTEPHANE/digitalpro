# 🌐 Rendre votre site accessible publiquement

## 📋 État actuel
- Votre site fonctionne : ✅
- Accès local seulement : ❌
- Besoin d'ouvrir le port 3000 : 🔧

---

## 🔥 ÉTAPE 1 : Ouvrir le port 3000 (UFW)

### Vérifier l'état du firewall
```bash
ufw status
```

### Ouvrir le port 3000
```bash
ufw allow 3000/tcp
ufw reload
```

### Vérifier que le port est ouvert
```bash
ufw status
```

Vous devriez voir :
```
3000/tcp                     ALLOW       Anywhere
```

## 🧪 Tester l'accès public

Ouvrez un navigateur et allez sur :
**http://72.61.167.191:3000**

Votre site devrait s'afficher !

---

## 🌐 Option 1 : Utiliser un domaine (Recommandé)

### A. Configurer le domaine dans les DNS

Allez dans la configuration DNS de votre domaine (chez votre registrar) :

**Ajoutez ces enregistrements :**
- **Type:** A
- **Nom:** @
- **Valeur:** 72.61.167.191
- **TTL:** 3600

- **Type:** A
- **Nom:** www
- **Valeur:** 72.61.167.191
- **TTL:** 3600

### B. Installer Nginx

```bash
apt update
apt install nginx -y
```

### C. Créer la configuration Nginx

```bash
nano /etc/nginx/sites-available/digitalpro
```

**Collez ce contenu (remplacez votredomaine.com par votre domaine) :**

```nginx
server {
    listen 80;
    server_name votredomaine.com www.votredomaine.com;

    location / {
        proxy_pass http://localhost:3000;
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
```

Sauvegardez avec `Ctrl+X`, puis `Y`, puis `Enter`.

### D. Activer le site

```bash
ln -s /etc/nginx/sites-available/digitalpro /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### E. Vérifier

Allez sur : **http://votredomaine.com**

---

## 🔒 Option 2 : Ajouter SSL (HTTPS gratuit)

### Installer Certbot

```bash
apt install certbot python3-certbot-nginx -y
```

### Obtenir un certificat SSL

```bash
certbot --nginx -d votredomaine.com -d www.votredomaine.com
```

Suivez les instructions. C'est gratuit avec Let's Encrypt !

### Renouvellement automatique

Certbot configure le renouvellement automatique. Testez-le :

```bash
certbot renew --dry-run
```

---

## ✅ Vérification finale

### Avec l'IP :
✅ http://72.61.167.191:3000

### Avec le domaine (si configuré) :
✅ http://votredomaine.com
✅ https://votredomaine.com (avec SSL)

---

## 🛠️ Dépannage

### Le site ne s'affiche pas

1. Vérifier le firewall :
```bash
ufw status
```

2. Vérifier que PM2 tourne :
```bash
pm2 status
pm2 logs digitalpro
```

3. Vérifier depuis le serveur :
```bash
curl http://localhost:3000
```

4. Vérifier les ports ouverts :
```bash
netstat -tuln | grep 3000
```

### Nginx ne fonctionne pas

```bash
# Vérifier la configuration
nginx -t

# Voir les erreurs
tail -f /var/log/nginx/error.log

# Redémarrer
systemctl restart nginx
```

### SSL ne fonctionne pas

```bash
# Vérifier le certificat
certbot certificates

# Forcer le renouvellement
certbot renew --force-renewal
```

---

## 📊 Résumé des commandes

```bash
# 1. Ouvrir le port
ufw allow 3000/tcp

# 2. Installer Nginx
apt install nginx -y

# 3. Créer la config
nano /etc/nginx/sites-available/digitalpro

# 4. Activer
ln -s /etc/nginx/sites-available/digitalpro /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx

# 5. Ajouter SSL (optionnel)
apt install certbot python3-certbot-nginx -y
certbot --nginx -d votredomaine.com
```

---

## 🎉 Votre site est maintenant public !

- ✅ Accessible depuis internet
- ✅ Avec votre domaine personnalisé
- ✅ Avec HTTPS sécurisé (si SSL configuré)

