#!/bin/bash

# Script pour redémarrer PM2 correctement

echo "🧹 Nettoyage de PM2..."
pm2 delete all
pm2 kill

echo "📁 Changement vers le dossier du projet..."
cd /var/www/digitalpro

echo "📋 Vérification du dossier..."
pwd
echo ""
echo "Liste des fichiers:"
ls -la | head -20

echo ""
echo "🚀 Démarrage de PM2 depuis le bon dossier..."
pm2 start npm --name "digitalpro" -- start

echo ""
echo "💾 Sauvegarde de la configuration..."
pm2 save

echo ""
echo "📊 Statut:"
pm2 status

echo ""
echo "📝 Logs (dernières 30 lignes):"
pm2 logs digitalpro --lines 30 --nostream

echo ""
echo "✅ Terminé!"
echo ""
echo "Testez avec: curl http://localhost:3000"

