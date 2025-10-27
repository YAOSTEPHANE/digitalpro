# 🚀 Déploiement rapide sur cPanel Hostinger

## ✅ Étapes rapides (5 minutes)

### 1️⃣ Accéder à Node.js dans cPanel
- Connectez-vous à cPanel
- Cherchez **"Node.js Version Manager"** dans la section Software
- Cliquez dessus

### 2️⃣ Créer l'application
- Cliquez sur **"Create Application"**
- **Node.js Version** : 18.x ou 20.x
- **Application Root** : `/home/username/digitalpro`
- **Application URL** : `digitalpro` (ou votre choix)
- Cliquez **"Create"**

### 3️⃣ Uploader les fichiers
- Ouvrez **File Manager**
- Naviguez vers votre dossier d'application
- Uploadez tous les fichiers de votre projet

### 4️⃣ Installer et builder
Retour dans **Node.js Version Manager** :
- Cliquez sur **"Run NPM Install"** ou **"Run NPM Install CI"**
- Attendez la fin de l'installation

### 5️⃣ Modifier server.js
Hostinger crée un `server.js`, remplacez-le par :

```javascript
const { spawn } = require('child_process');
const npm = spawn('npm', ['start'], {
  cwd: __dirname,
  stdio: 'inherit',
  shell: true
});
npm.on('close', (code) => console.log(`Exit: ${code}`));
```

### 6️⃣ Démarrer
- Retour à Node.js Manager
- Cliquez sur **"Restart App"** ou **"Start"**

### 7️⃣ Accéder
Votre site sera accessible sur : `votredomaine.com/digitalpro`

---

## 📝 Fichiers à uploader

- Tous les fichiers du projet (app/, components/, lib/, etc.)
- package.json
- package-lock.json
- .env (si nécessaire)
- server.js
- next.config.ts

---

## ⚠️ Important

1. **Ne pas uploader** : node_modules/, .next/, digitalpro-1/, digitalpro/
2. Hostinger installera node_modules automatiquement
3. Builder d'abord en local avec `npm run build`
4. Uploader le dossier `.next/` après le build

---

## 🔧 Si ça ne marche pas

1. Vérifiez les logs dans cPanel
2. Assurez-vous que le port est configuré
3. Vérifiez que server.js est correct
4. Rebuild avec `npm run build`

---

## ✨ Alternative : FTP + Terminal

Si vous avez accès SSH :

```bash
# Se connecter
ssh username@server

# Installer
cd ~/digitalpro
npm install
npm run build

# Démarrer
npm start
```

---

Bon déploiement! 🎉

