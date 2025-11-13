# 🔧 Solution aux erreurs de déploiement

## Problème identifié

Les erreurs dans le terminal montrent :
1. ❌ Git n'authentifie pas avec le mot de passe
2. ❌ Le dossier du projet n'existe pas

## ✅ Solution : Créer un Personal Access Token

### Étape 1 : Créer un token GitHub

1. Allez sur : https://github.com/settings/tokens
2. Cliquez sur **"Generate new token"** → **"Generate new token (classic)"**
3. Nommez-le : "Digitalpro Deploy"
4. Cochez les permissions :
   - ✅ **repo** (accès complet aux repositories)
5. Cliquez sur **"Generate token"**
6. **COPIEZ LE TOKEN** (vous ne pourrez plus le voir après)

### Étape 2 : Utiliser le token au lieu du mot de passe

Au lieu de :
```bash
git clone https://github.com/YAOSTEPHANE/digitalpro.git
```

Utilisez :
```bash
git clone https://VOTRE_TOKEN@github.com/YAOSTEPHANE/digitalpro.git
```

OU configurez-le globalement :
```bash
git config --global url."https://VOTRE_TOKEN@github.com/".insteadOf "https://github.com/"
```

---

## 🚀 Déploiement complet corrigé

Voici les commandes CORRECTES à exécuter sur le serveur :

```bash
# 1. Se connecter au serveur
ssh root@72.61.167.191
# Mot de passe: D1g1t@lpr0SO

# 2. Installer Node.js 18
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
nvm install 18
nvm use 18

# 3. Installer PM2
npm install -g pm2

# 4. Cloner avec token GitHub (REMPLACEZ VOTRE_TOKEN)
cd /var/www
git clone https://VOTRE_TOKEN@github.com/YAOSTEPHANE/digitalpro.git

# 5. Aller dans le dossier
cd digitalpro

# 6. Installer les dépendances
npm install

# 7. Builder
npm run build

# 8. Démarrer avec PM2
pm2 start npm --name "digitalpro" -- start
pm2 save
pm2 startup
```

---

## 🔐 Alternative : Utiliser SSH au lieu d'HTTPS

Si vous préférez utiliser SSH plutôt qu'un token :

### Sur votre machine locale :
```bash
# Générer une clé SSH
ssh-keygen -t ed25519 -C "votre_email@example.com"

# Afficher la clé publique
cat ~/.ssh/id_ed25519.pub
```

### Sur GitHub :
1. Allez sur : https://github.com/settings/keys
2. Cliquez **"New SSH key"**
3. Collez la clé publique
4. Cliquez **"Add SSH key"**

### Sur le serveur :
```bash
# Copier la clé SSH vers le serveur
ssh-copy-id root@72.61.167.191

# Cloner avec SSH
cd /var/www
git clone git@github.com:YAOSTEPHANE/digitalpro.git
```

---

## 🎯 Solution rapide sans token (accès public)

Si vous rendez votre repo public temporairement :

```bash
cd /var/www
git clone https://github.com/YAOSTEPHANE/digitalpro.git
# Fonctionnera sans authentification
```

---

## 📋 Checklist de résolution

- [ ] Créer un Personal Access Token sur GitHub
- [ ] Copier le token
- [ ] Utiliser le token dans la commande git clone
- [ ] Vérifier que Node.js est installé
- [ ] Vérifier que npm fonctionne
- [ ] Cloner le repository avec succès
- [ ] Installer les dépendances
- [ ] Builder le projet
- [ ] Démarrer avec PM2

---

## ⚠️ Important

**Ne partagez JAMAIS votre token GitHub !**

Le token est comme un mot de passe et doit être gardé secret.











