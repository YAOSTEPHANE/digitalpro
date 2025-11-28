# Script PowerShell pour mettre à jour le site sur Hostinger après git push
# Usage: .\update-hostinger.ps1

Write-Host "🔄 Mise à jour du site sur Hostinger" -ForegroundColor Green
Write-Host ""

# Configuration SSH (modifiez selon votre configuration)
$SSH_USER = "votreusername"
$SSH_HOST = "votre-ip-hostinger"
$PROJECT_DIR = "/var/www/digitalpro"  # ou "/home/votreusername/public_html"
$BRANCH = "main"

Write-Host "📋 Configuration:" -ForegroundColor Cyan
Write-Host "  Serveur: $SSH_USER@$SSH_HOST" -ForegroundColor White
Write-Host "  Dossier: $PROJECT_DIR" -ForegroundColor White
Write-Host "  Branche: $BRANCH" -ForegroundColor White
Write-Host ""

# Demander confirmation
$confirmation = Read-Host "Voulez-vous continuer ? (O/N)"
if ($confirmation -ne 'O' -and $confirmation -ne 'o') {
    Write-Host "❌ Annulé" -ForegroundColor Red
    exit
}

Write-Host ""
Write-Host "📥 Connexion au serveur et mise à jour..." -ForegroundColor Yellow

# Commande SSH pour mettre à jour
$sshCommand = @"
cd $PROJECT_DIR && \
echo '📥 Récupération des modifications...' && \
git pull origin $BRANCH && \
echo '📦 Installation des dépendances...' && \
npm install && \
echo '🔨 Build du projet...' && \
npm run build && \
echo '🚀 Redémarrage de l''application...' && \
pm2 restart digitalpro 2>/dev/null || echo '⚠️  Redémarrez manuellement via cPanel' && \
echo '✅ Mise à jour terminée !'
"@

# Exécuter la commande SSH
ssh "$SSH_USER@$SSH_HOST" $sshCommand

Write-Host ""
Write-Host "✅ Mise à jour terminée !" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Instructions manuelles (si SSH ne fonctionne pas):" -ForegroundColor Cyan
Write-Host "1. Connectez-vous à votre cPanel Hostinger" -ForegroundColor White
Write-Host "2. Ouvrez Terminal" -ForegroundColor White
Write-Host "3. Exécutez:" -ForegroundColor White
Write-Host "   cd $PROJECT_DIR" -ForegroundColor Yellow
Write-Host "   git pull origin $BRANCH" -ForegroundColor Yellow
Write-Host "   npm install" -ForegroundColor Yellow
Write-Host "   npm run build" -ForegroundColor Yellow
Write-Host "4. Dans Node.js Version Manager → Restart App" -ForegroundColor White

