#!/bin/bash

# Script de déploiement automatique pour Digitalpro
SERVER_IP="72.61.167.191"
USERNAME="root"
PASSWORD="D1g1t@lpr0SO"
PROJECT_DIR="/var/www/digitalpro"
APP_NAME="digitalpro"

echo "🚀 Déploiement automatique de Digitalpro"
echo "=========================================="

# Fonction pour exécuter des commandes avec gestion du mot de passe
ssh_cmd() {
    sshpass -p "$PASSWORD" ssh -o StrictHostKeyChecking=no $USERNAME@$SERVER_IP "$1"
}

scp_cmd() {
    sshpass -p "$PASSWORD" scp -o StrictHostKeyChecking=no "$1" $USERNAME@$SERVER_IP:"$2"
}

# Vérifier si sshpass est installé
if ! command -v sshpass &> /dev/null; then
    echo "📦 Installation de sshpass..."
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        sudo apt-get update && sudo apt-get install -y sshpass
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        brew install sshpass
    fi
fi

echo ""
echo "🔧 Étape 1: Connexion au serveur..."
ssh_cmd "echo '✅ Connexion SSH établie'"

echo ""
echo "📦 Étape 2: Installation de Node.js..."
ssh_cmd "command -v node >/dev/null 2>&1 || (curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash && export NVM_DIR=\"\$HOME/.nvm\" && [ -s \"\$NVM_DIR/nvm.sh\" ] && . \"\$NVM_DIR/nvm.sh\" && nvm install 18 && nvm use 18 && nvm alias default 18)"

echo ""
echo "📦 Étape 3: Installation de PM2..."
ssh_cmd "npm install -g pm2"

echo ""
echo "📥 Étape 4: Clonage/Mise à jour du repository..."
if ssh_cmd "[ -d '$PROJECT_DIR' ]"; then
    echo "   ⬆️  Mise à jour du repository..."
    ssh_cmd "cd $PROJECT_DIR && git pull origin main"
else
    echo "   📥 Clonage du repository..."
    ssh_cmd "mkdir -p /var/www && cd /var/www && git clone https://github.com/YAOSTEPHANE/digitalpro.git"
fi

echo ""
echo "📦 Étape 5: Installation des dépendances..."
ssh_cmd "cd $PROJECT_DIR && npm install"

echo ""
echo "🏗️  Étape 6: Construction du projet..."
ssh_cmd "cd $PROJECT_DIR && npm run build"

echo ""
echo "🚀 Étape 7: Démarrage avec PM2..."
ssh_cmd "cd $PROJECT_DIR && pm2 delete $APP_NAME 2>/dev/null || true"
ssh_cmd "cd $PROJECT_DIR && pm2 start npm --name '$APP_NAME' -- start"
ssh_cmd "pm2 save"

echo ""
echo "🔧 Étape 8: Configuration du firewall..."
ssh_cmd "ufw allow 3000/tcp 2>/dev/null || true"

echo ""
echo "✨ Déploiement terminé !"
echo ""
echo "📊 Informations:"
echo "   Serveur: $SERVER_IP"
echo "   Application: http://$SERVER_IP:3000"
echo ""
echo "📊 Commandes utiles:"
echo "   Voir les logs: ssh $USERNAME@$SERVER_IP 'pm2 logs $APP_NAME'"
echo "   Status: ssh $USERNAME@$SERVER_IP 'pm2 status'"
echo "   Redémarrer: ssh $USERNAME@$SERVER_IP 'pm2 restart $APP_NAME'"

