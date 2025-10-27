# 🔧 Solution à l'erreur PM2 "Could not read package.json"

## Problème
PM2 cherche `package.json` dans `/root/` au lieu de `/var/www/digitalpro/`

## ✅ Solution

### 1️⃣ Arrêter PM2 complètement
```bash
pm2 delete all
```

### 2️⃣ Aller dans le bon dossier
```bash
cd /var/www/digitalpro
```

### 3️⃣ Vérifier que vous êtes au bon endroit
```bash
pwd
# Devrait afficher: /var/www/digitalpro

ls package.json
# Devrait afficher: package.json
```

### 4️⃣ Démarrer PM2 depuis le bon dossier
```bash
pm2 start npm --name "digitalpro" -- start
```

### 5️⃣ Sauvegarder
```bash
pm2 save
```

### 6️⃣ Vérifier le statut
```bash
pm2 status
pm2 logs digitalpro
```

## 📋 Vérification finale
```bash
# Vérifier que l'application démarre correctement
pm2 logs digitalpro --lines 20

# Tester l'accès
curl http://localhost:3000

# Vérifier le statut
pm2 status
```

Tous les processus devraient être "online" maintenant!

