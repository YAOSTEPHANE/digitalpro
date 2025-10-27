#!/bin/bash

# Script de déploiement sur serveur Hostinger
# Usage: ./deploy.sh

# Configuration SSH
echo "🔐 Connexion au serveur Hostinger..."

# Remplacez ces valeurs par vos informations
SSH_HOST="VOTRE_IP_SERVEUR"
SSH_USER="root"
SSH_PORT="22"

# Commande de déploiement
echo "📦 Récupération des derniers changements sur GitHub..."
git pull origin main

echo "🔨 Installation des dépendances..."
npm install

echo "🏗️ Construction du projet..."
npm run build

echo "🚀 Redémarrage de l'application..."
pm2 restart digitalpro || pm2 start npm --name "digitalpro" -- start

echo "✅ Déploiement terminé!"

