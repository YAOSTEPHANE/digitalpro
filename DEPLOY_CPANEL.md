# 🚀 Déploiement sur Hostinger via cPanel

## Prérequis
- Accès à votre cPanel Hostinger
- Node.js Version Manager installé (vérifiez dans "Software")

## Étapes

### 1️⃣ Créer l'application Node.js

1. Connectez-vous à **cPanel**
2. Cherchez **"Node.js Version Manager"** ou **"Setup Node.js App"**
3. Cliquez sur **"Create Application"**
4. Remplissez :
   - **Node.js Version** : 18.x ou 20.x
   - **Application Root** : `/home/username/digitalpro`
   - **Application URL** : `digitalpro` (ou votre choix)
   - **Application Startup File** : Laissez vide ou `server.js`
5. Cliquez sur **"Create"**

### 2️⃣ Uploader vos fichiers

**Option A : Via File Manager**
1. Ouvrez **"File Manager"** dans cPanel
2. Naviguez vers le dossier de votre application (celui spécifié dans Application Root)
3. Uploadez tous vos fichiers de projet

**Option B : Via FTP**
```bash
# Utilisez FileZilla ou votre client FTP favori
# Serveur: ftp.votredomaine.com
# Port: 21
# Connectez-vous et uploadez les fichiers
```

**Fichiers à uploader** :
- Tous les dossiers : `app/`, `components/`, `lib/`, `public/`, etc.
- Tous les fichiers racine : `package.json`, `next.config.ts`, `tsconfig.json`, etc.
- **Ne PAS uploader** : `node_modules/`, `.next/`

### 3️⃣ Installer les dépendances

1. Retour dans **"Node.js Version Manager"**
2. Trouvez votre application dans la liste
3. Cliquez sur **"Run NPM Install"** ou **"Run NPM Install CI"**

### 4️⃣ Builder le projet

Dans votre gestionnaire de fichiers cPanel ou via SSH (si disponible) :

```bash
cd /home/username/digitalpro
npm run build
```

### 5️⃣ Modifier server.js

Hostinger crée un `server.js` automatiquement, modifiez-le pour Next.js :

```javascript
const { spawn } = require('child_process');

const npm = spawn('npm', ['start'], {
  cwd: __dirname,
  stdio: 'inherit',
  shell: true
});

npm.on('close', (code) => {
  console.log(`Process exited with code ${code}`);
});
```

### 6️⃣ Démarrer l'application

1. Retour dans **Node.js Version Manager**
2. Trouvez votre application
3. Cliquez sur **"Restart App"** ou **"Start"**

### 7️⃣ Accéder à votre site

Votre site sera accessible sur :
- `http://votredomaine.com/digitalpro`
- Ou selon l'URL que vous avez configurée

---

## 🔧 Configuration avancée (VPS uniquement)

Si vous avez un VPS et accès SSH :

```bash
# Se connecter
ssh username@VOTRE_IP

# Builder sur le serveur
cd ~/digitalpro
npm run build

# Démarrer
pm2 start npm --name "digitalpro" -- start
pm2 save
```

---

## ❌ Problèmes courants

### L'application ne démarre pas
- Vérifiez les logs dans cPanel
- Assurez-vous que toutes les dépendances sont installées
- Vérifiez que `package.json` contient le script "start"

### Erreur "Cannot find module"
- Relancez "Run NPM Install CI"
- Vérifiez que tous les fichiers sont uploadés

### Build échoue
- Assurez-vous d'avoir assez de mémoire
- Utilisez `npm run build` pour voir les erreurs détaillées

---

## 📞 Support

- Support Hostinger : https://www.hostinger.com/help
- Chat disponible dans votre hPanel

---

## ✅ Checklist

- [ ] Application Node.js créée dans cPanel
- [ ] Tous les fichiers uploadés
- [ ] npm install exécuté
- [ ] Projet buildé avec `npm run build`
- [ ] server.js modifié
- [ ] Application démarrée
- [ ] Site accessible












