# Déploiement digitalpro sur VPS Hostinger
# Usage: .\deploy-vps.ps1 [-VpsHost 72.61.167.191] [-SshUser root]

param(
  [string]$VpsHost = "72.61.167.191",
  [string]$SshUser = "root",
  [string]$SshKey = "$env:USERPROFILE\.ssh\id_ed25519"
)

$ErrorActionPreference = "Stop"
$ProjectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$RemoteScript = "/tmp/deploy-digitalpro.sh"

Write-Host "Deploiement sur $SshUser@${VpsHost}" -ForegroundColor Cyan

if (-not (Test-Path $SshKey)) {
  Write-Host "Cle SSH introuvable: $SshKey" -ForegroundColor Red
  Write-Host "Connectez-vous via hPanel > VPS > Terminal et executez:" -ForegroundColor Yellow
  Write-Host "  bash $RemoteScript" -ForegroundColor White
  exit 1
}

$localScript = Join-Path $ProjectRoot "scripts\deploy-vps.sh"
if (-not (Test-Path $localScript)) {
  throw "Script introuvable: $localScript"
}

Write-Host "Copie du script de deploiement..." -ForegroundColor Yellow
scp -i $SshKey -o StrictHostKeyChecking=accept-new $localScript "${SshUser}@${VpsHost}:${RemoteScript}"

Write-Host "Execution distante..." -ForegroundColor Yellow
ssh -i $SshKey -o StrictHostKeyChecking=accept-new "${SshUser}@${VpsHost}" "chmod +x ${RemoteScript} && bash ${RemoteScript}"

Write-Host "Termine. Site: https://digitalpro-solutions.com" -ForegroundColor Green
