# 🚀 Guide de déploiement sur VPS

## 🎯 Déploiement automatique (Recommandé)

### Option 1 : Script automatisé

```bash
# Sur votre machine locale
chmod +x deploy-vps.sh
./deploy-vps.sh root@VOTRE_IP_SERVEUR
```

**Le script fait tout automatiquement :**
- ✅ Vérification de la connexion SSH
- ✅ Installation de Node.js 18
- ✅ Installation de PM2
- ✅ Clonage/Mise à jour du repository
- ✅ Installation des dépendances
- ✅ Build du projet
- ✅ Démarrage avec PM2

---

## 🔧 Déploiement manuel (Étape par étape)

### Étape 1 : Se connecter au VPS

```bash
ssh root@VOTRE_IP_SERVEUR
# ou
ssh votre_user@VOTRE_IP_SERVEUR
```

### Étape 2 : Installer Node.js 18

```bash
# Option A : Avec NVM (Recommandé)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
nvm install 18
nvm use 18
node --version  # Vérifier que c'est la version 18+

# Option B : Avec le gestionnaire de paquets
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Étape 3 : Installer PM2

```bash
npm install -g pm2
```

### Étape 4 : Cloner le repository

```bash
cd /var/www
git clone https://github.com/YAOSTEPHANE/digitalpro.git
cd digitalpro
```

### Étape 5 : Installer les dépendances et builder

```bash
npm install
npm run build
```

### Étape 6 : Démarrer l'application

```bash
pm2 start npm --name "digitalpro" -- start
pm2 save
pm2 startup
```

### Étape 7 : Configurer Nginx (Optionnel mais recommandé)

```bash
# Installer Nginx
sudo apt update
sudo apt install nginx

# Copier la configuration
sudo cp nginx-config.conf /etc/nginx/sites-available/digitalpro

# Éditer pour remplacer votredomaine.com
sudo nano /etc/nginx/sites-available/digitalpro

# Activer le site
sudo ln -s /etc/nginx/sites-available/digitalpro /etc/nginx/sites-enabled/

# Tester la configuration
sudo nginx -t

# Redémarrer Nginx
sudo systemctl restart nginx
```

### Étape 8 : Installer SSL avec Let's Encrypt (Recommandé)

```bash
# Installer Certbot
sudo apt install certbot python3-certbot-nginx

# Obtenir un certificat SSL
sudo certbot --nginx -d votredomaine.com -d www.votredomaine.com

# Renouvellement automatique
sudo certbot renew --dry-run
```

---

## 📊 Commandes PM2 utiles

```bash
# Voir les logs
pm2 logs digitalpro

# Redémarrer
pm2 restart digitalpro

# Arrêter
pm2 stop digitalpro

# Status
pm2 status

# Monitorer
pm2 monit
```

---

## 🔄 Mise à jour de l'application

```bash
cd /var/www/digitalpro
git pull origin main
npm install
npm run build
pm2 restart digitalpro
```

---

## 🛠️ Dépannage

### L'application ne démarre pas

```bash
# Voir les logs
pm2 logs digitalpro

# Vérifier le port
netstat -tuln | grep 3000

# Tester manuellement
cd /var/www/digitalpro
npm start
```

### Erreur de build

```bash
# Nettoyer le cache
rm -rf .next node_modules
npm install
npm run build
```

### Nginx ne fonctionne pas

```bash
# Vérifier la configuration
sudo nginx -t

# Voir les logs
sudo tail -f /var/log/nginx/error.log

# Redémarrer
sudo systemctl restart nginx
```

### Port déjà utilisé

```bash
# Trouver le processus
sudo lsof -i :3000

# Tuer le processus si nécessaire
sudo kill -9 PID
```

---

## 🔐 Sécurité

### Configuration du firewall

```bash
# UFW (Ubuntu)
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw enable
```

### Variables d'environnement

Créer un fichier `.env.local` :

```bash
nano /var/www/digitalpro/.env.local
```

Contenu :
```env
SMTP_HOST=votre-smtp-host
SMTP_PORT=587
SMTP_USER=votre-email@example.com
SMTP_PASS=votre-mot-de-passe
```

---

## 📈 Monitoring

### Installer un monitoring

```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

### Afficher les métriques

```bash
pm2 show digitalpro
```

---

## 🌐 Configuration DNS

Si vous avez un domaine, configurez les enregistrements DNS :

```
Type: A
Nom: @
Valeur: VOTRE_IP_SERVEUR
TTL: 3600

Type: A
Nom: www
Valeur: VOTRE_IP_SERVEUR
TTL: 3600
```

---

## ✅ Checklist de déploiement

- [ ] Connecté au VPS via SSH
- [ ] Node.js 18+ installé
- [ ] PM2 installé
- [ ] Repository cloné
- [ ] Dépendances installées
- [ ] Application buildée
- [ ] Application démarrée avec PM2
- [ ] PM2 configuré pour le démarrage automatique
- [ ] Nginx configuré (optionnel)
- [ ] SSL installé (optionnel)
- [ ] Firewall configuré
- [ ] DNS configuré
- [ ] Application accessible

---

## 🆘 Support

En cas de problème :
1. Consultez les logs : `pm2 logs digitalpro`
2. Vérifiez Nginx : `sudo nginx -t && sudo systemctl status nginx`
3. Vérifiez le firewall : `sudo ufw status`
4. Testez l'application : `curl localhost:3000`

---

**Votre site est maintenant en ligne ! 🎉**

