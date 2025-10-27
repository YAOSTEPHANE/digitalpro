#!/bin/bash

# Script de déploiement avec gestion de l'authentification GitHub
# À utiliser sur le serveur VPS

echo "🚀 Déploiement Digitalpro"
echo "========================"
echo ""

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Fonction pour afficher les erreurs
error() {
    echo -e "${RED}❌ $1${NC}"
}

success() {
    echo -e "${GREEN}✅ $1${NC}"
}

info() {
    echo -e "${YELLOW}ℹ️  $1${NC}"
}

# 1. Installer Node.js 18
info "Installation de Node.js 18..."
if command -v nvm &> /dev/null; then
    nvm use 18
else
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
    nvm install 18
    nvm use 18
    nvm alias default 18
fi
node --version
npm --version
success "Node.js installé"

# 2. Installer PM2
info "Installation de PM2..."
npm install -g pm2
success "PM2 installé"

# 3. Cloner le repository
info "Clonage du repository..."
cd /var/www

# Si le dossier existe déjà, le supprimer
if [ -d "digitalpro" ]; then
    info "Suppression de l'ancien dossier..."
    rm -rf digitalpro
fi

# Méthode 1 : Tentative avec accès public (si repo public)
info "Tentative de clonage public..."
if git clone https://github.com/YAOSTEPHANE/digitalpro.git; then
    success "Repository cloné (accès public)"
else
    error "Échec du clonage public"
    echo ""
    echo "⚠️  AUTHENTIFICATION REQUISE"
    echo ""
    echo "Options:"
    echo "1. Rendre le repo public sur GitHub"
    echo "2. Utiliser un Personal Access Token"
    echo ""
    echo "Pour utiliser un token:"
    echo "git clone https://VOTRE_TOKEN@github.com/YAOSTEPHANE/digitalpro.git"
    echo ""
    exit 1
fi

cd digitalpro

# 4. Installer les dépendances
info "Installation des dépendances..."
npm install
success "Dépendances installées"

# 5. Builder
info "Construction du projet..."
npm run build
success "Projet construit"

# 6. Démarrer avec PM2
info "Démarrage avec PM2..."
pm2 delete digitalpro 2>/dev/null || true
pm2 start npm --name "digitalpro" -- start
pm2 save

# 7. Configurer le démarrage automatique
pm2 startup | grep "sudo" | bash

success "Application démarrée avec PM2"

echo ""
echo "=========================================="
echo "✅ DÉPLOIEMENT TERMINÉ!"
echo "=========================================="
echo ""
echo "📊 Informations:"
echo "   Serveur: 72.61.167.191"
echo "   Application: http://72.61.167.191:3000"
echo ""
echo "📋 Commandes utiles:"
echo "   Voir les logs: pm2 logs digitalpro"
echo "   Status: pm2 status"
echo "   Redémarrer: pm2 restart digitalpro"
echo "   Arrêter: pm2 stop digitalpro"
echo ""

