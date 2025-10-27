#!/bin/bash

# Script de déploiement automatique sur VPS
# Usage: ./deploy-vps.sh USERNAME@SERVER_IP

set -e

echo "🚀 Déploiement de Digitalpro sur VPS"
echo "===================================="

# Variables
SSH_TARGET="${1:-root@localhost}"
PROJECT_NAME="digitalpro"
PROJECT_DIR="/var/www/digitalpro"
GITHUB_REPO="https://github.com/YAOSTEPHANE/digitalpro.git"

echo "📋 Configuration:"
echo "   SSH: $SSH_TARGET"
echo "   Dossier: $PROJECT_DIR"
echo "   Repo: $GITHUB_REPO"
echo ""

# Fonction pour exécuter des commandes sur le serveur distant
ssh_exec() {
    ssh $SSH_TARGET "$1"
}

echo "🔧 Étape 1: Vérification de l'accès SSH..."
ssh_exec "echo '✅ Connexion SSH réussie'"

echo ""
echo "📦 Étape 2: Installation de Node.js (si nécessaire)..."
ssh_exec "command -v node || (curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash && export NVM_DIR=\"\$HOME/.nvm\" && [ -s \"\$NVM_DIR/nvm.sh\" ] && . \"\$NVM_DIR/nvm.sh\" && nvm install 18 && nvm use 18)"

echo ""
echo "📦 Étape 3: Installation de PM2 (si nécessaire)..."
ssh_exec "command -v pm2 || npm install -g pm2"

echo ""
echo "📥 Étape 4: Clonage/Mise à jour du repository..."
if ssh_exec "test -d $PROJECT_DIR"; then
    echo "   Repository existe, mise à jour..."
    ssh_exec "cd $PROJECT_DIR && git pull origin main"
else
    echo "   Clonage du repository..."
    ssh_exec "mkdir -p $(dirname $PROJECT_DIR) && cd $(dirname $PROJECT_DIR) && git clone $GITHUB_REPO $PROJECT_NAME"
fi

echo ""
echo "📦 Étape 5: Installation des dépendances..."
ssh_exec "cd $PROJECT_DIR && npm install"

echo ""
echo "🏗️ Étape 6: Construction du projet..."
ssh_exec "cd $PROJECT_DIR && npm run build"

echo ""
echo "🚀 Étape 7: Démarrage de l'application..."
ssh_exec "cd $PROJECT_DIR && pm2 delete $PROJECT_NAME 2>/dev/null || true"
ssh_exec "cd $PROJECT_DIR && pm2 start npm --name '$PROJECT_NAME' -- start"
ssh_exec "pm2 save"
ssh_exec "pm2 startup systemd -u $(ssh_exec 'whoami') --hp /home/$(whoami)'"

echo ""
echo "✨ Déploiement terminé!"
echo ""
echo "📊 Informations:"
echo "   Commande pour voir les logs: ssh $SSH_TARGET 'pm2 logs $PROJECT_NAME'"
echo "   Commande pour redémarrer: ssh $SSH_TARGET 'pm2 restart $PROJECT_NAME'"
echo "   Commande pour status: ssh $SSH_TARGET 'pm2 status'"
echo ""
echo "🌐 Votre site devrait être accessible!"
echo "   Configurez Nginx/Apache pour rediriger vers localhost:3000"

