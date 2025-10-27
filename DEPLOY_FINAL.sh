#!/bin/bash

# Script de déploiement complet avec création des dossiers
# À exécuter sur le serveur VPS Hostinger

echo "🚀 Déploiement Digitalpro - Étape complète"
echo "=========================================="
echo ""

# Créer le dossier /var/www s'il n'existe pas
echo "📁 Création du dossier /var/www..."
mkdir -p /var/www
cd /var/www
success "Dossier créé"

# Installer Node.js 18
echo "📦 Installation de Node.js 18..."
if ! command -v nvm &> /dev/null; then
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
fi
nvm install 18
nvm use 18
nvm alias default 18
echo "✅ Node.js $(node --version) installé"

# Installer PM2
echo "📦 Installation de PM2..."
npm install -g pm2
echo "✅ PM2 installé"

# Nettoyer si ancienne installation
if [ -d "/var/www/digitalpro" ]; then
    echo "🧹 Nettoyage de l'ancienne installation..."
    pm2 delete digitalpro 2>/dev/null || true
    rm -rf /var/www/digitalpro
fi

# Cloner le repository (essayer accès public)
echo "📥 Clonage du repository..."
cd /var/www

# Option 1: Accès public
if git clone https://github.com/YAOSTEPHANE/digitalpro.git 2>/dev/null; then
    echo "✅ Repository cloné"
else
    echo "❌ Clonage échoué. Vérifier l'accès au repository."
    echo ""
    echo "Solutions:"
    echo "1. Rendre le repo public sur GitHub"
    echo "2. Utiliser un Personal Access Token"
    echo ""
    echo "Avec token:"
    echo "git clone https://VOTRE_TOKEN@github.com/YAOSTEPHANE/digitalpro.git"
    exit 1
fi

cd digitalpro

# Installer les dépendances
echo "📦 Installation des dépendances (peut prendre plusieurs minutes)..."
npm install
echo "✅ Dépendances installées"

# Builder
echo "🏗️  Construction du projet..."
npm run build
echo "✅ Projet construit"

# Démarrer avec PM2
echo "🚀 Démarrage avec PM2..."
pm2 start npm --name "digitalpro" -- start
pm2 save

# Configurer le démarrage automatique
pm2 startup 2>/dev/null || echo "Configurez pm2 startup manuellement"

echo ""
echo "=========================================="
echo "✅ DÉPLOIEMENT TERMINÉ!"
echo "=========================================="
echo ""
echo "📍 Votre site est accessible sur:"
echo "   http://72.61.167.191:3000"
echo ""
echo "📋 Commandes utiles:"
echo "   pm2 logs digitalpro      # Voir les logs"
echo "   pm2 status                # Voir le statut"
echo "   pm2 restart digitalpro    # Redémarrer"
echo ""

