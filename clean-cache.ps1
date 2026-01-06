# Script de nettoyage du cache Next.js
Write-Host "Nettoyage du cache Next.js..." -ForegroundColor Yellow

# Supprimer le dossier .next
if (Test-Path ".next") {
    Remove-Item -Recurse -Force .next
    Write-Host "✓ Dossier .next supprime" -ForegroundColor Green
} else {
    Write-Host "✓ Dossier .next n'existe pas" -ForegroundColor Gray
}

# Supprimer le dossier node_modules/.cache si existe
if (Test-Path "node_modules\.cache") {
    Remove-Item -Recurse -Force "node_modules\.cache"
    Write-Host "✓ Cache node_modules supprime" -ForegroundColor Green
}

Write-Host "`nCache nettoye avec succes!" -ForegroundColor Green
Write-Host "Redemarrez le serveur avec: npm run dev" -ForegroundColor Cyan







