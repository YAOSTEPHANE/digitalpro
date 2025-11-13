# 🔧 Solution erreur Certbot 404

## ❌ Problème
Let's Encrypt ne peut pas accéder à votre domaine pour vérifier la propriété.

## ✅ Solutions

### Solution 1 : Vérifier que Nginx fonctionne sur port 80

```bash
# Vérifier que Nginx écoute sur le port 80
netstat -tuln | grep :80

# Tester l'accès HTTP
curl http://localhost
curl http://digitalpro-solutions.com
```

### Solution 2 : Vérifier les DNS

Votre domaine doit pointer vers 72.61.167.191

```bash
# Vérifier les DNS
nslookup digitalpro-solutions.com
dig digitalpro-solutions.com
```

Assurez-vous que les enregistrements A pointent vers 72.61.167.191

### Solution 3 : Vérifier que le firewall permet le port 80

```bash
# Autoriser le port 80
ufw allow 80/tcp
ufw allow 443/tcp
ufw reload
ufw status
```

### Solution 4 : Vérifier la configuration Nginx

```bash
# Vérifier la configuration
cat /etc/nginx/sites-enabled/digitalpro

# Vérifier les logs
tail -f /var/log/nginx/error.log
```

### Solution 5 : Configuration Nginx pour acme-challenge

La configuration doit permettre à Certbot de servir les fichiers de vérification.

**Supprimer la configuration actuelle :**
```bash
rm /etc/nginx/sites-enabled/digitalpro
nano /etc/nginx/sites-available/digitalpro
```

**Ajouter :**
```nginx
server {
    listen 80;
    server_name digitalpro-solutions.com www.digitalpro-solutions.com;

    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }

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

**Activer :**
```bash
ln -s /etc/nginx/sites-available/digitalpro /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### Solution 6 : Réessayer Certbot

```bash
certbot --nginx -d digitalpro-solutions.com -d www.digitalpro-solutions.com
```

---

## 📋 Checklist de vérification

- [ ] DNS pointe vers 72.61.167.191 (vérifier avec `nslookup`)
- [ ] Nginx fonctionne (`systemctl status nginx`)
- [ ] Port 80 ouvert (`ufw allow 80/tcp`)
- [ ] Configuration Nginx permet acme-challenge
- [ ] Site accessible via http://digitalpro-solutions.com

---

## 🚀 Test rapide

Exécutez ces commandes une par une :

```bash
# 1. Vérifier DNS
nslookup digitalpro-solutions.com

# 2. Vérifier firewall
ufw allow 80/tcp
ufw allow 443/tcp
ufw reload

# 3. Redémarrer Nginx
systemctl restart nginx

# 4. Tester l'accès
curl -I http://digitalpro-solutions.com

# 5. Réessayer Certbot
certbot --nginx -d digitalpro-solutions.com -d www.digitalpro-solutions.com
```

---

## 📞 Si ça ne fonctionne toujours pas

Vérifiez les logs détaillés :
```bash
certbot --nginx -d digitalpro-solutions.com -d www.digitalpro-solutions.com -v
tail -f /var/log/letsencrypt/letsencrypt.log
```











