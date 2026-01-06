#!/bin/bash

# Script de mise à jour automatique pour Hostinger
# Usage: ./update-hostinger.sh

set -e  # Arrêter en cas d'erreur

echo "🔄 Mise à jour du site sur Hostinger..."
echo ""

# Couleurs pour les messages
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configuration (modifiez selon votre installation)
PROJECT_DIR="/var/www/digitalpro"
# ou PROJECT_DIR="/home/votreusername/public_html"
BRANCH="main"

# Vérifier que nous sommes dans le bon dossier
if [ ! -d "$PROJECT_DIR" ]; then
    echo -e "${RED}❌ Erreur: Le dossier $PROJECT_DIR n'existe pas${NC}"
    echo "Modifiez PROJECT_DIR dans le script selon votre configuration"
    exit 1
fi

cd "$PROJECT_DIR"

# Étape 1: Récupérer les modifications
echo -e "${YELLOW}📥 Étape 1: Récupération des modifications depuis Git...${NC}"
if git pull origin "$BRANCH"; then
    echo -e "${GREEN}✅ Modifications récupérées${NC}"
else
    echo -e "${RED}❌ Erreur lors du git pull${NC}"
    exit 1
fi

echo ""

# Étape 2: Installer les dépendances
echo -e "${YELLOW}📦 Étape 2: Installation des dépendances...${NC}"
if npm install; then
    echo -e "${GREEN}✅ Dépendances installées${NC}"
else
    echo -e "${RED}❌ Erreur lors de l'installation des dépendances${NC}"
    exit 1
fi

echo ""

# Étape 3: Builder le projet
echo -e "${YELLOW}🔨 Étape 3: Build du projet...${NC}"
if npm run build; then
    echo -e "${GREEN}✅ Build réussi${NC}"
else
    echo -e "${RED}❌ Erreur lors du build${NC}"
    exit 1
fi

echo ""

# Étape 4: Redémarrer l'application
echo -e "${YELLOW}🚀 Étape 4: Redémarrage de l'application...${NC}"

# Vérifier si PM2 est disponible
if command -v pm2 &> /dev/null; then
    if pm2 restart digitalpro; then
        echo -e "${GREEN}✅ Application redémarrée avec PM2${NC}"
    else
        echo -e "${YELLOW}⚠️  PM2 n'a pas pu redémarrer, essayez manuellement: pm2 restart digitalpro${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  PM2 n'est pas installé${NC}"
    echo "Redémarrez l'application manuellement via cPanel → Node.js Version Manager → Restart App"
fi

echo ""
echo -e "${GREEN}✅ Mise à jour terminée avec succès !${NC}"
echo ""
echo "Vérifiez votre site: https://votredomaine.com"







