# Comment installer Node.js via cPanel sur Hostinger

## 📋 Guide étape par étape

### Étape 1 : Accéder à cPanel
1. Connectez-vous à votre compte Hostinger
2. Accédez à votre panneau de contrôle
3. Cliquez sur **"cPanel"** ou accédez à votre hPanel

### Étape 2 : Trouver l'onglet Node.js
1. Dans le cPanel, cherchez la section **"Software"** (Logiciel)
2. Cliquez sur **"Node.js Version Manager"** ou **"Setup Node.js App"**
   - Si vous ne le voyez pas, cherchez dans **"Other"** (Autres)

### Étape 3 : Créer une application Node.js
1. Cliquez sur **"Create Application"** (Créer une application)
2. Remplissez les informations suivantes :

   **Node.js Version :** 
   - Sélectionnez la version **18.x** ou **20.x** (recommandé)
   
   **Application Root :**
   - C'est le dossier où sera déployée votre application
   - Exemple : `/home/username/public_html/digitalpro`
   
   **Application URL :**
   - Cela crée l'URL d'accès à votre application
   - Exemple : `digitalpro`
   - URL complète : `votredomaine.com/digitalpro` ou sous-domaine
   
   **Application Startup File :**
   - Entrez : `server.js` ou laissez vide (Hostinger le créera automatiquement)

3. Cliquez sur **"Create"**

### Étape 4 : Configuration de l'application
Une fois l'application créée, vous verrez :
- **App Environment Variables** - Variables d'environnement
- **Documentation** - Informations sur l'application
- **Run NPM Install** - Bouton pour installer les dépendances

### Étape 5 : Uploader votre projet
1. Ouvrez **File Manager** dans cPanel
2. Naviguez vers le dossier de votre application (celui que vous avez choisi dans l'Application Root)
3. Uploadez tous les fichiers de votre projet (via FTP ou File Manager)

### Étape 6 : Installer les dépendances
1. Retournez dans **Node.js Version Manager**
2. Trouvez votre application dans la liste
3. Cliquez sur **"Run NPM Install"** ou **"Run NPM Install CI"**

### Étape 7 : Modifier le fichier de démarrage
Hostinger crée un fichier `server.js`, mais vous devez le modifier pour Next.js :

```javascript
// Ouvrez server.js et remplacez par :
const { spawn } = require('child_process');
const path = require('path');

// Chemin vers l'exécutable npm
const npm = spawn('npm', ['start'], {
  cwd: __dirname,
  stdio: 'inherit',
  shell: true
});

npm.on('close', (code) => {
  console.log(`Process exited with code ${code}`);
});
```

### Étape 8 : Configurer le fichier package.json
Assurez-vous que votre `package.json` contient :

```json
{
  "scripts": {
    "start": "next start -p $PORT",
    "build": "next build"
  },
  "dependencies": {
    "next": "^15.5.4",
    "react": "19.1.0",
    "react-dom": "19.1.0"
  }
}
```

### Étape 9 : Créer le fichier .env (si nécessaire)
1. Dans File Manager, créez un fichier `.env` à la racine de votre application
2. Ajoutez vos variables d'environnement :
```
SMTP_HOST=votre-smtp-host
SMTP_PORT=587
SMTP_USER=votre-email@example.com
SMTP_PASS=votre-mot-de-passe
```

### Étape 10 : Builder l'application
1. Dans cPanel, retournez à **Node.js Version Manager**
2. Cliquez sur **"Run NPM Install CI"**
3. Attendez que l'installation se termine

### Étape 11 : Démarrer l'application
1. Dans la liste des applications Node.js
2. Cherchez le bouton **"Restart App"** ou **"Start"**
3. Cliquez dessus pour démarrer votre application

### Étape 12 : Configurer un domaine (Optionnel)
Si vous voulez que votre site soit accessible via votre domaine :

1. Dans cPanel, allez dans **"Domains"** ou **"Subdomains"**
2. Configurez votre domaine pour pointer vers le dossier de l'application
3. Ou utilisez un sous-domaine : `digitalpro.votredomaine.com`

---

## 🔧 Solution de problèmes courants

### L'application ne démarre pas
- Vérifiez les logs dans cPanel
- Assurez-vous que le port est correctement configuré
- Vérifiez que toutes les dépendances sont installées

### Erreur de build
- Assurez-vous d'avoir Node.js 18+ 
- Vérifiez que tous les fichiers sont uploadés
- Regardez les logs dans cPanel

### L'application démarre mais affiche une erreur
- Vérifiez que le fichier `server.js` est correctement configuré
- Assurez-vous que `.env` contient toutes les variables nécessaires
- Vérifiez la console du navigateur pour les erreurs

---

## 📝 Notes importantes

- **Port automatique** : Hostinger gère automatiquement le port pour votre application
- **Root public** : Évitez de mettre votre application dans `public_html` directement si vous voulez qu'elle soit accessible via URL dédiée
- **Build requis** : N'oubliez pas de builder avant le premier démarrage avec `npm run build`
- **Logs** : Consultez les logs dans cPanel pour déboguer

---

## 🎯 Alternative : Via SSH (si disponible)

Si votre plan Hostinger inclut SSH :

```bash
# Se connecter via SSH
ssh username@server

# Naviguer vers votre application
cd ~/digitalpro

# Installer les dépendances
npm install

# Builder
npm run build

# Démarrer avec PM2
npm install -g pm2
pm2 start npm --name "digitalpro" -- start
pm2 save
```

---

## 📞 Support

Pour de l'aide supplémentaire :
- Support Hostinger : https://www.hostinger.com/help
- Documentation cPanel : https://docs.cpanel.net/

