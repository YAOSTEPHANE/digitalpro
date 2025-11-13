# 🔒 Configuration Domaine + HTTPS (Simple)

## 📝 Prérequis
- ✅ Un domaine (ex: mon-domaine.com)
- ✅ DNS configuré pointe vers 72.61.167.191

## 🔧 Étapes de configuration

### 1️⃣ Configurer le domaine dans les DNS

Allez chez votre registrar (là où vous avez acheté le domaine) :

**Ajoutez ces enregistrements DNS :**

```
Type: A
Nom: @
Valeur: 72.61.167.191
TTL: 3600
```

```
Type: A  
Nom: www
Valeur: 72.61.167.191
TTL: 3600
```

**Attendez 5-10 minutes** pour que les DNS se propagent.

---

### 2️⃣ Configurer Nginx

Sur le serveur, exécutez :

```bash
# Créer le fichier de configuration
nano /etc/nginx/sites-available/digitalpro
```

**Collez ce contenu (remplacez VOTRE_DOMAINE.com) :**

```nginx
server {
    listen 80;
    server_name VOTRE_DOMAINE.com www.VOTRE_DOMAINE.com;

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

Sauvegardez : `Ctrl+X`, puis `Y`, puis `Enter`.

**Activer :**
```bash
ln -s /etc/nginx/sites-available/digitalpro /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

---

### 3️⃣ Tester le domaine

Allez sur : **http://VOTRE_DOMAINE.com**

Si ça fonctionne, continuons avec HTTPS.

---

### 4️⃣ Installer Certbot

```bash
apt update
apt install certbot python3-certbot-nginx -y
```

---

### 5️⃣ Obtenir le certificat SSL gratuit

```bash
certbot --nginx -d VOTRE_DOMAINE.com -d www.VOTRE_DOMAINE.com
```

**Suivez les instructions :**
- Email : Entrez votre email
- Conditions : Appuyez sur `Y`
- Partager email : Appuyez sur `N` (ou Y, au choix)
- Rediriger HTTP vers HTTPS : Appuyez sur `1` (Recommandé)

---

### 6️⃣ Vérification

Allez sur : **https://VOTRE_DOMAINE.com**

Vous devriez voir le cadenas vert ! 🔒

---

### 7️⃣ Renouvellement automatique

Certbot configure le renouvellement automatique. Tester :

```bash
certbot renew --dry-run
```

---

## ✅ Résultat

- ✅ http://VOTRE_DOMAINE.com → Redirige vers HTTPS
- ✅ https://VOTRE_DOMAINE.com → Site sécurisé
- ✅ www.VOTRE_DOMAINE.com → Fonctionne aussi

---

## 🛠️ Commandes utiles

```bash
# Voir les certificats
certbot certificates

# Renouveler manuellement
certbot renew

# Nginx status
systemctl status nginx

# Logs Nginx
tail -f /var/log/nginx/error.log
```

---

## 📋 Checklist finale

- [ ] Domaine configuré dans les DNS
- [ ] Attendu 5-10 minutes pour la propagation DNS
- [ ] Nginx configuré
- [ ] Certbot installé
- [ ] SSL installé
- [ ] Site accessible en HTTPS
- [ ] Redirection HTTP → HTTPS active

---

**Votre site est maintenant sécurisé avec HTTPS ! 🔒✨**











