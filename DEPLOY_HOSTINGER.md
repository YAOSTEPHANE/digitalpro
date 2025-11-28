# 🚀 Guide de Déploiement sur Hostinger

## 📋 Méthode 1 : Déploiement via cPanel (Recommandé pour hébergement partagé)

### Étape 1 : Préparer le build local

```bash
# 1. Installer les dépendances
npm install

# 2. Créer le build de production
npm run build

# 3. Vérifier que le build fonctionne
npm start
```

### Étape 2 : Uploader les fichiers sur Hostinger

**Via File Manager (cPanel) :**
1. Connectez-vous à votre **cPanel Hostinger**
2. Ouvrez **"File Manager"**
3. Naviguez vers `public_html` (ou votre dossier de domaine)
4. Uploadez tous les fichiers du projet **SAUF** :
   - `node_modules/` (sera réinstallé)
   - `.next/` (sera reconstruit)
   - `.git/`
   - `.env.local` (configurez-le sur le serveur)

**Fichiers à uploader :**
- `app/`
- `components/`
- `lib/`
- `public/`
- `package.json`
- `package-lock.json`
- `next.config.ts`
- `tsconfig.json`
- `tailwind.config.ts`
- `postcss.config.mjs`
- Tous les autres fichiers de configuration

### Étape 3 : Configurer Node.js dans cPanel

1. Dans cPanel, cherchez **"Node.js Version Manager"** ou **"Setup Node.js App"**
2. Cliquez sur **"Create Application"**
3. Configurez :
   - **Node.js Version** : `18.x` ou `20.x`
   - **Application Root** : `/home/votreusername/public_html` (ou votre chemin)
   - **Application URL** : Votre domaine
   - **Application Startup File** : `server.js`
4. Cliquez sur **"Create"**

### Étape 4 : Créer server.js

Créez un fichier `server.js` à la racine avec ce contenu :

```javascript
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
```

### Étape 5 : Installer les dépendances et builder

Dans **Node.js Version Manager** :
1. Trouvez votre application
2. Cliquez sur **"Run NPM Install"**
3. Attendez la fin de l'installation
4. Cliquez sur **"Run NPM Install CI"** (optionnel, pour un install propre)

Ensuite, via **Terminal** dans cPanel ou SSH :
```bash
cd /home/votreusername/public_html
npm run build
```

### Étape 6 : Démarrer l'application

Dans **Node.js Version Manager** :
1. Trouvez votre application
2. Cliquez sur **"Restart App"** ou **"Start App"**

---

## 📋 Méthode 2 : Déploiement via VPS/SSH (Recommandé pour VPS)

### Étape 1 : Se connecter au VPS

```bash
ssh root@VOTRE_IP_HOSTINGER
```

### Étape 2 : Installer Node.js (si pas déjà installé)

```bash
# Installer NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Recharger NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

# Installer Node.js 18
nvm install 18
nvm use 18
```

### Étape 3 : Cloner ou mettre à jour le projet

**Si première installation :**
```bash
cd /var/www
git clone https://github.com/YAOSTEPHANE/digitalpro.git
cd digitalpro
```

**Si mise à jour :**
```bash
cd /var/www/digitalpro
git pull origin main
```

### Étape 4 : Installer les dépendances et builder

```bash
# Installer les dépendances
npm install

# Créer le build
npm run build
```

### Étape 5 : Configurer PM2

```bash
# Installer PM2 globalement
npm install -g pm2

# Démarrer l'application avec PM2
pm2 start npm --name "digitalpro" -- start

# Sauvegarder la configuration PM2
pm2 save

# Configurer PM2 pour démarrer au boot
pm2 startup
```

### Étape 6 : Configurer Nginx (si nécessaire)

Créez un fichier de configuration Nginx :

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
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 🔧 Configuration des Variables d'Environnement

Créez un fichier `.env.production` sur le serveur avec :

```env
NODE_ENV=production
PORT=3000

# Email (si utilisé)
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=votre-email@votredomaine.com
SMTP_PASS=votre-mot-de-passe

# API Keys (si utilisé)
GEMINI_API_KEY=AIzaSyBeHODPwS3VpZsI7YgBQ7m8xUjduB9mOC4
OPENAI_API_KEY=votre-cle-openai

# URLs
NEXT_PUBLIC_SITE_URL=https://votredomaine.com
```

---

## ✅ Vérification Post-Déploiement

1. **Vérifier que le site fonctionne** : Visitez `https://votredomaine.com`
2. **Vérifier les logs** :
   - cPanel : Dans Node.js Version Manager → Logs
   - VPS : `pm2 logs digitalpro`
3. **Tester les fonctionnalités** :
   - Formulaire de contact
   - Chatbot
   - Pages principales

---

## 🔄 Mise à Jour du Site

Pour mettre à jour le site après des modifications :

**Via cPanel :**
1. Uploadez les nouveaux fichiers via File Manager
2. Dans Node.js Version Manager → **"Run NPM Install"**
3. Via Terminal : `npm run build`
4. **"Restart App"**

**Via VPS/SSH :**
```bash
cd /var/www/digitalpro
git pull origin main
npm install
npm run build
pm2 restart digitalpro
```

---

## 🐛 Dépannage

### Le site ne démarre pas
- Vérifiez les logs : `pm2 logs digitalpro` ou dans cPanel
- Vérifiez que le port est correct
- Vérifiez que Node.js est bien installé

### Erreur 502 Bad Gateway
- Vérifiez que l'application tourne : `pm2 list`
- Vérifiez le port dans la configuration Nginx
- Redémarrez l'application : `pm2 restart digitalpro`

### Les images ne s'affichent pas
- Vérifiez que `next.config.ts` contient les bons domaines
- Vérifiez que le dossier `public/` est bien uploadé

---

## 📞 Support

Pour plus d'aide, consultez :
- Documentation Hostinger : https://www.hostinger.com/tutorials
- Documentation Next.js : https://nextjs.org/docs/deployment

