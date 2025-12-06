# Script PowerShell pour déployer sur Hostinger
# Usage: .\deploy-hostinger.ps1

Write-Host "🚀 Déploiement sur Hostinger" -ForegroundColor Green
Write-Host ""

# Étape 1 : Build du projet
Write-Host "📦 Étape 1 : Build du projet..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erreur lors du build" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build réussi!" -ForegroundColor Green
Write-Host ""

# Étape 2 : Créer le fichier server.js si nécessaire
Write-Host "📝 Étape 2 : Vérification de server.js..." -ForegroundColor Yellow
if (-not (Test-Path "server.js")) {
    $serverJs = @"
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://` + hostname + `:` + port);
  });
});
"@
    Set-Content -Path "server.js" -Value $serverJs
    Write-Host "✅ server.js créé!" -ForegroundColor Green
} else {
    Write-Host "✅ server.js existe déjà" -ForegroundColor Green
}

Write-Host ""
Write-Host "📋 Instructions pour le déploiement:" -ForegroundColor Cyan
Write-Host "1. Connectez-vous à votre cPanel Hostinger" -ForegroundColor White
Write-Host "2. Ouvrez File Manager" -ForegroundColor White
Write-Host "3. Uploadez tous les fichiers SAUF node_modules et .next" -ForegroundColor White
Write-Host "4. Dans Node.js Version Manager, créez une application" -ForegroundColor White
Write-Host "5. Configurez Application Startup File: server.js" -ForegroundColor White
Write-Host "6. Cliquez sur 'Run NPM Install'" -ForegroundColor White
Write-Host "7. Via Terminal: npm run build" -ForegroundColor White
Write-Host "8. Cliquez sur 'Restart App'" -ForegroundColor White
Write-Host ""
Write-Host "✅ Prêt pour le déploiement!" -ForegroundColor Green





