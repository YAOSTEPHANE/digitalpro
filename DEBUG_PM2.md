# 🔍 Débogage PM2 - Problème "errored"

## Problème identifié
Vous voyez dans PM2 :
- Status: "errored" (ligne 0)
- Status: "online" (ligne 1)

Il y a une tentative échouée et une réussie.

## 🔧 Solutions à essayer

### 1️⃣ Voir les logs détaillés
```bash
pm2 logs digitalpro --err
```

Cela vous montrera l'erreur exacte.

### 2️⃣ Nettoyer et redémarrer
```bash
# Arrêter tous les processus
pm2 delete all

# Nettoyer
cd /var/www/digitalpro
rm -rf .next

# Reconstruire
npm run build

# Redémarrer
pm2 start npm --name "digitalpro" -- start
```

### 3️⃣ Vérifier le port
```bash
# Voir si le port 3000 est libre
netstat -tuln | grep 3000

# Si occupé, tuer le processus
lsof -ti:3000 | xargs kill -9
```

### 4️⃣ Démarrer manuellement pour voir l'erreur
```bash
cd /var/www/digitalpro
npm start
```
Cela affichera l'erreur exacte dans le terminal.

### 5️⃣ Vérifier les variables d'environnement
```bash
# Créer le fichier .env si nécessaire
cd /var/www/digitalpro
nano .env.local
```

Ajoutez si nécessaire :
```
PORT=3000
```

## 📋 Commandes utiles

```bash
# Voir les logs en temps réel
pm2 logs digitalpro --lines 100

# Voir tous les processus
pm2 list

# Redémarrer
pm2 restart digitalpro

# Arrêter
pm2 stop digitalpro

# Supprimer
pm2 delete digitalpro
```











