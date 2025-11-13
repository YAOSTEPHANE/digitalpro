# Script PowerShell pour déployer sur VPS Hostinger
$ServerIP = "72.61.167.191"
$Username = "root"
$Password = "D1g1t@lpr0SO"
$ProjectDir = "/var/www/digitalpro"

Write-Host "🚀 Déploiement de Digitalpro sur VPS Hostinger" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green
Write-Host ""

# Créer une session SSH sécurisée
$securePassword = ConvertTo-SecureString $Password -AsPlainText -Force
$credential = New-Object System.Management.Automation.PSCredential($Username, $securePassword)

Write-Host "🔧 Étape 1: Connexion au serveur..." -ForegroundColor Yellow

# Créer les commandes à exécuter
$commands = @"
echo '🚀 Début du déploiement de Digitalpro'
echo '===================================='

# Étape 1: Installer Node.js 18 si pas déjà installé
echo '📦 Installation de Node.js...'
if ! command -v node &> /dev/null; then
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
    export NVM_DIR="\$HOME/.nvm"
    [ -s "\$NVM_DIR/nvm.sh" ] && . "\$NVM_DIR/nvm.sh"
    nvm install 18
    nvm use 18
    nvm alias default 18
fi

# Étape 2: Installer PM2
echo '📦 Installation de PM2...'
npm install -g pm2

# Étape 3: Cloner ou mettre à jour le repository
echo '📥 Clonage/Mise à jour du repository...'
if [ -d "$ProjectDir" ]; then
    echo 'Repository existe, mise à jour...'
    cd $ProjectDir
    git pull origin main
else
    echo 'Clonage du repository...'
    mkdir -p /var/www
    cd /var/www
    git clone https://github.com/YAOSTEPHANE/digitalpro.git
fi

# Étape 4: Installer les dépendances
echo '📦 Installation des dépendances...'
cd $ProjectDir
npm install

# Étape 5: Builder le projet
echo '🏗️  Construction du projet...'
npm run build

# Étape 6: Démarrer avec PM2
echo '🚀 Démarrage avec PM2...'
pm2 delete digitalpro 2>/dev/null || true
pm2 start npm --name "digitalpro" -- start
pm2 save

echo ''
echo '✨ Déploiement terminé!'
echo ''
echo '📊 Informations:'
echo '   Serveur: $ServerIP'
echo '   Application: http://$ServerIP:3000'
echo ''
echo 'Commandes utiles:'
echo '   Voir les logs: pm2 logs digitalpro'
echo '   Status: pm2 status'
echo '   Redémarrer: pm2 restart digitalpro'
"@

Write-Host "📋 Préparation des commandes de déploiement..." -ForegroundColor Yellow

# Exécuter les commandes via SSH
Write-Host ""
Write-Host "🔐 Connexion SSH au serveur..." -ForegroundColor Cyan
Write-Host "   IP: $ServerIP" -ForegroundColor Gray
Write-Host "   Utilisateur: $Username" -ForegroundColor Gray
Write-Host ""

# Note: Pour l'automatisation complète dans PowerShell, utilisez plink.exe ou Posh-SSH
Write-Host "⚠️  Exécution manuelle requise:" -ForegroundColor Yellow
Write-Host ""
Write-Host "Connectez-vous avec:" -ForegroundColor Cyan
Write-Host "ssh root@72.61.167.191" -ForegroundColor White
Write-Host ""
Write-Host "Puis collez ces commandes:" -ForegroundColor Cyan
Write-Host ""
Write-Host $commands -ForegroundColor White
Write-Host ""
Write-Host "Ou copiez et exécutez ces commandes une par une:" -ForegroundColor Yellow

# Afficher les commandes étape par étape
$steps = @"
# 1. Installer Node.js 18
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
export NVM_DIR="\$HOME/.nvm"
[ -s "\$NVM_DIR/nvm.sh" ] && . "\$NVM_DIR/nvm.sh"
nvm install 18
nvm use 18

# 2. Installer PM2
npm install -g pm2

# 3. Cloner le repository
cd /var/www
git clone https://github.com/YAOSTEPHANE/digitalpro.git
cd digitalpro

# 4. Installer les dépendances
npm install

# 5. Builder
npm run build

# 6. Démarrer avec PM2
pm2 start npm --name "digitalpro" -- start
pm2 save
pm2 startup
"@

Write-Host $steps -ForegroundColor Green











