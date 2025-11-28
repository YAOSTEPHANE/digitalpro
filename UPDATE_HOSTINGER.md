# 🔄 Mise à Jour du Site sur Hostinger après Git Push

## 🚀 Méthode Rapide (Recommandée)

### Étape 1 : Push vers Git (déjà fait ✅)

```bash
git add .
git commit -m "Vos modifications"
git push origin main
```

### Étape 2 : Se connecter au serveur Hostinger

**Option A : Via SSH (VPS ou hébergement avec SSH)**
```bash
ssh votreusername@votre-ip-hostinger
# ou
ssh root@votre-ip-hostinger
```

**Option B : Via Terminal dans cPanel**
1. Connectez-vous à votre **cPanel Hostinger**
2. Ouvrez **Terminal** dans cPanel
3. Vous êtes déjà connecté !

### Étape 3 : Aller dans le dossier du projet

```bash
cd /home/votreusername/public_html
# ou
cd /var/www/digitalpro
# (selon où vous avez installé le projet)
```

### Étape 4 : Récupérer les dernières modifications

```bash
git pull origin main
```

### Étape 5 : Installer les nouvelles dépendances (si nécessaire)

```bash
npm install
```

### Étape 6 : Rebuilder le projet

```bash
npm run build
```

### Étape 7 : Redémarrer l'application

**Si vous utilisez PM2 (VPS) :**
```bash
pm2 restart digitalpro
# ou
pm2 restart all
```

**Si vous utilisez Node.js Version Manager (cPanel) :**
1. Retournez dans **cPanel**
2. Ouvrez **Node.js Version Manager**
3. Trouvez votre application
4. Cliquez sur **"Restart App"**

---

## ⚡ Script Automatique pour VPS

Créez un fichier `update.sh` sur votre serveur :

```bash
#!/bin/bash

echo "🔄 Mise à jour du site..."

# Aller dans le dossier du projet
cd /var/www/digitalpro
# ou cd /home/votreusername/public_html

# Récupérer les modifications
echo "📥 Récupération des modifications..."
git pull origin main

# Installer les dépendances
echo "📦 Installation des dépendances..."
npm install

# Builder le projet
echo "🔨 Build du projet..."
npm run build

# Redémarrer l'application
echo "🚀 Redémarrage de l'application..."
pm2 restart digitalpro

echo "✅ Mise à jour terminée !"
```

**Pour l'utiliser :**
```bash
# Rendre le script exécutable
chmod +x update.sh

# Exécuter le script
./update.sh
```

---

## 🔧 Configuration Git sur le Serveur (Première fois)

Si c'est la première fois que vous utilisez Git sur le serveur :

### 1. Installer Git (si pas déjà installé)

```bash
# Sur Ubuntu/Debian
sudo apt-get update
sudo apt-get install git

# Vérifier l'installation
git --version
```

### 2. Cloner le repository (si première installation)

```bash
cd /var/www
# ou cd /home/votreusername/public_html

git clone https://github.com/YAOSTEPHANE/digitalpro.git
cd digitalpro

# Installer les dépendances
npm install

# Builder
npm run build
```

### 3. Configurer Git (si nécessaire)

```bash
git config --global user.name "Votre Nom"
git config --global user.email "votre-email@example.com"
```

---

## 📋 Checklist de Mise à Jour

- [ ] `git push` effectué localement ✅
- [ ] Connecté au serveur Hostinger (SSH ou Terminal cPanel)
- [ ] Dans le bon dossier (`cd /chemin/vers/projet`)
- [ ] `git pull origin main` exécuté
- [ ] `npm install` exécuté (si nouvelles dépendances)
- [ ] `npm run build` exécuté
- [ ] Application redémarrée (PM2 ou cPanel)

---

## 🐛 Dépannage

### ❌ Erreur "git: command not found"
- Git n'est pas installé sur le serveur
- Installez-le : `sudo apt-get install git` (Ubuntu/Debian)

### ❌ Erreur "Permission denied" lors du git pull
- Vérifiez les permissions du dossier
- Utilisez `sudo` si nécessaire : `sudo git pull`

### ❌ Erreur "npm: command not found"
- Node.js n'est pas installé ou pas dans le PATH
- Vérifiez avec `node --version`
- Si Node.js Version Manager est utilisé, activez-le d'abord

### ❌ Le site ne se met pas à jour
- Vérifiez que le build s'est bien terminé
- Vérifiez les logs : `pm2 logs digitalpro` ou dans cPanel
- Redémarrez l'application manuellement
- Videz le cache du navigateur (Ctrl+F5)

### ❌ Conflits Git
Si vous avez des conflits lors du `git pull` :
```bash
# Voir les fichiers en conflit
git status

# Résoudre les conflits manuellement ou
git stash
git pull origin main
git stash pop
```

---

## 🔐 Sécurité : Utiliser SSH Key au lieu du mot de passe

Pour éviter de taper le mot de passe à chaque fois :

### 1. Générer une clé SSH (sur votre ordinateur)

```bash
ssh-keygen -t rsa -b 4096 -C "votre-email@example.com"
```

### 2. Copier la clé publique sur le serveur

```bash
ssh-copy-id votreusername@votre-ip-hostinger
```

Maintenant vous pourrez vous connecter sans mot de passe !

---

## ⚡ Automatisation avec Webhook (Avancé)

Pour automatiser complètement le processus après chaque `git push`, vous pouvez configurer un webhook GitHub qui déclenchera automatiquement la mise à jour sur votre serveur.

**Créer un endpoint webhook sur votre serveur :**

```javascript
// webhook.js
const http = require('http');
const { exec } = require('child_process');

http.createServer((req, res) => {
  if (req.url === '/webhook' && req.method === 'POST') {
    exec('cd /var/www/digitalpro && git pull && npm install && npm run build && pm2 restart digitalpro', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error}`);
        res.writeHead(500);
        res.end('Error');
        return;
      }
      console.log(`stdout: ${stdout}`);
      res.writeHead(200);
      res.end('OK');
    });
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
}).listen(3001);
```

---

## 📞 Besoin d'aide ?

- Documentation Git : https://git-scm.com/doc
- Documentation Hostinger : https://www.hostinger.com/tutorials
- Support Hostinger : Via votre hPanel

---

**Bon déploiement ! 🎉**

