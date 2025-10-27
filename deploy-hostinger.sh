#!/bin/bash

# Script de déploiement sur Hostinger VPS
# Usage: bash deploy-hostinger.sh

set -e

echo "🚀 Déploiement Digitalpro sur Hostinger VPS"
echo "=========================================="
echo ""

# Demander les informations
read -p "🌐 IP du serveur : " SERVER_IP
read -p "👤 Nom d'utilisateur (généralement root) : " USERNAME
read -p "🔑 Port SSH (défaut: 22) : " SSH_PORT
SSH_PORT=${SSH_PORT:-22}

SSH_TARGET="$USERNAME@$SERVER_IP"
PROJECT_DIR="/var/www/digitalpro"
APP_NAME="digitalpro"

echo ""
echo "📋 Configuration:"
echo "   SSH: $SSH_TARGET:$SSH_PORT"
echo "   Dossier: $PROJECT_DIR"
echo ""
read -p "Continuer ? (o/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Oo]$ ]]; then
    echo "Annulé."
    exit 1
fi

echo ""
echo "🔧 Étape 1: Connexion SSH..."
ssh -p $SSH_PORT $SSH_TARGET "echo '✅ Connexion établie'"

echo ""
echo "📦 Étape 2: Installation de Node.js..."
ssh -p $SSH_PORT $SSH_TARGET "command -v node >/dev/null 2>&1 || (curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash && export NVM_DIR=\"\$HOME/.nvm\" && [ -s \"\$NVM_DIR/nvm.sh\" ] && . \"\$NVM_DIR/nvm.sh\" && nvm install 18 && nvm use 18 && nvm alias default 18)"

echo ""
echo "📦 Étape 3: Installation de PM2..."
ssh -p $SSH_PORT $SSH_TARGET "npm install -g pm2"

echo ""
echo "📥 Étape 4: Clonage/Mise à jour du repository..."
if ssh -p $SSH_PORT $SSH_TARGET "[ -d '$PROJECT_DIR' ]"; then
    echo "   ⬆️  Mise à jour du repository..."
    ssh -p $SSH_PORT $SSH_TARGET "cd $PROJECT_DIR && git pull origin main"
else
    echo "   📥 Clonage du repository..."
    ssh -p $SSH_PORT $SSH_TARGET "mkdir -p $(dirname $PROJECT_DIR) && cd $(dirname $PROJECT_DIR) && git clone https://github.com/YAOSTEPHANE/digitalpro.git $APP_NAME"
fi

echo ""
echo "📦 Étape 5: Installation des dépendances..."
ssh -p $SSH_PORT $SSH_TARGET "cd $PROJECT_DIR && npm install"

echo ""
echo "🏗️  Étape 6: Construction du projet..."
ssh -p $SSH_PORT $SSH_TARGET "cd $PROJECT_DIR && npm run build"

echo ""
echo "🚀 Étape 7: Démarrage avec PM2..."
ssh -p $SSH_PORT $SSH_TARGET "cd $PROJECT_DIR && pm2 delete $APP_NAME 2>/dev/null || true"
ssh -p $SSH_PORT $SSH_TARGET "cd $PROJECT_DIR && pm2 start npm --name '$APP_NAME' -- start"
ssh -p $SSH_PORT $SSH_TARGET "pm2 save"

echo ""
echo "✨ Déploiement terminé !"
echo ""
echo "📊 Commandes utiles:"
echo "   Voir les logs: ssh -p $SSH_PORT $SSH_TARGET 'pm2 logs $APP_NAME'"
echo "   Redémarrer: ssh -p $SSH_PORT $SSH_TARGET 'pm2 restart $APP_NAME'"
echo "   Status: ssh -p $SSH_PORT $SSH_TARGET 'pm2 status'"
echo ""
echo "🌐 Votre site est accessible sur le port 3000"
echo "   Configurez Nginx pour rediriger le trafic"
echo ""

