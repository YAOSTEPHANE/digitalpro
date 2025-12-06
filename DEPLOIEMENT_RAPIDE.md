# 🚀 Guide de Déploiement Rapide sur Hostinger

## ⚡ Déploiement Rapide (5 minutes)

### Étape 1 : Préparer le build local

Ouvrez PowerShell ou Terminal et exécutez :

```bash
npm run build
```

Cela créera le dossier `.next` avec votre site compilé.

### Étape 2 : Se connecter à Hostinger

1. Allez sur https://hpanel.hostinger.com
2. Connectez-vous à votre compte
3. Ouvrez **cPanel** ou **File Manager**

### Étape 3 : Uploader les fichiers

**Option A : Via File Manager (cPanel)**
1. Ouvrez **File Manager**
2. Allez dans `public_html` (ou votre dossier de domaine)
3. **Supprimez** les anciens fichiers si nécessaire
4. **Uploadez** tous les fichiers du projet **SAUF** :
   - ❌ `node_modules/` (sera réinstallé sur le serveur)
   - ❌ `.next/` (sera reconstruit sur le serveur)
   - ❌ `.git/`
   - ❌ `.env.local` (configurez-le sur le serveur)

**Fichiers à uploader :**
- ✅ `app/`
- ✅ `components/`
- ✅ `lib/`
- ✅ `public/`
- ✅ `package.json`
- ✅ `package-lock.json`
- ✅ `next.config.ts`
- ✅ `tsconfig.json`
- ✅ `server.js` (nouveau fichier créé)
- ✅ Tous les autres fichiers de configuration

### Étape 4 : Configurer Node.js dans cPanel

1. Dans cPanel, cherchez **"Node.js Version Manager"** ou **"Setup Node.js App"**
2. Si vous avez déjà une application, cliquez dessus
3. Sinon, cliquez sur **"Create Application"**
4. Configurez :
   - **Node.js Version** : `18.x` ou `20.x`
   - **Application Root** : `/home/votreusername/public_html` (ou votre chemin)
   - **Application URL** : Votre domaine
   - **Application Startup File** : `server.js` ⚠️ IMPORTANT
5. Cliquez sur **"Create"** ou **"Save"**

### Étape 5 : Installer les dépendances

Dans **Node.js Version Manager** :
1. Trouvez votre application
2. Cliquez sur **"Run NPM Install"**
3. Attendez la fin (peut prendre 2-5 minutes)

### Étape 6 : Builder le projet

**Via Terminal dans cPanel :**
1. Ouvrez **Terminal** dans cPanel
2. Exécutez :
```bash
cd public_html
npm run build
```

**OU via SSH (si vous avez un VPS) :**
```bash
ssh votreusername@votre-ip
cd public_html
npm run build
```

### Étape 7 : Démarrer l'application

Dans **Node.js Version Manager** :
1. Trouvez votre application
2. Cliquez sur **"Restart App"** ou **"Start App"**
3. Attendez quelques secondes

### Étape 8 : Vérifier

Visitez votre site : `https://votredomaine.com`

---

## 🔄 Mise à Jour du Site (après modifications)

Pour mettre à jour votre site après des changements :

1. **Localement** : `npm run build` (pour tester)
2. **Sur Hostinger** :
   - Uploadez les fichiers modifiés via File Manager
   - Dans Node.js Version Manager → **"Run NPM Install"**
   - Via Terminal : `npm run build`
   - **"Restart App"**

---

## ⚙️ Configuration des Variables d'Environnement

Si vous utilisez des variables d'environnement (email, API keys, etc.) :

1. Dans cPanel, ouvrez **File Manager**
2. Créez un fichier `.env.production` à la racine
3. Ajoutez vos variables :

```env
NODE_ENV=production
PORT=3000

# Email
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=votre-email@votredomaine.com
SMTP_PASS=votre-mot-de-passe

# API Keys
GEMINI_API_KEY=AIzaSyBeHODPwS3VpZsI7YgBQ7m8xUjduB9mOC4

# URLs
NEXT_PUBLIC_SITE_URL=https://votredomaine.com
```

---

## 🐛 Problèmes Courants

### ❌ Le site ne démarre pas
- Vérifiez que `server.js` existe et est bien configuré comme Startup File
- Vérifiez les logs dans Node.js Version Manager
- Vérifiez que le port est correct (généralement 3000)

### ❌ Erreur 502 Bad Gateway
- Vérifiez que l'application est démarrée dans Node.js Version Manager
- Vérifiez que le build s'est bien terminé
- Redémarrez l'application

### ❌ Les images ne s'affichent pas
- Vérifiez que le dossier `public/` est bien uploadé
- Vérifiez `next.config.ts` pour les domaines d'images externes

### ❌ Erreur "Cannot find module"
- Exécutez `npm install` dans Node.js Version Manager
- Vérifiez que `package.json` est bien uploadé

---

## 📞 Besoin d'aide ?

- Documentation Hostinger : https://www.hostinger.com/tutorials
- Support Hostinger : Via votre hPanel
- Documentation Next.js : https://nextjs.org/docs/deployment

---

## ✅ Checklist de Déploiement

- [ ] Build local réussi (`npm run build`)
- [ ] Fichiers uploadés sur Hostinger (sauf node_modules et .next)
- [ ] Application Node.js créée dans cPanel
- [ ] Startup File configuré : `server.js`
- [ ] NPM Install exécuté
- [ ] Build exécuté sur le serveur (`npm run build`)
- [ ] Application démarrée/redémarrée
- [ ] Site accessible et fonctionnel

---

**Bon déploiement ! 🎉**





