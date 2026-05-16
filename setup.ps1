# Script de inicialización para demotone-web
# Ejecutar desde PowerShell con: .\setup.ps1

$ErrorActionPreference = "Stop"

Write-Host "=== demotone-web :: setup ===" -ForegroundColor Yellow
Write-Host ""

# Asegurar que estamos en la carpeta correcta
$ProjectPath = "O:\BASEK MUSIC PRODUCCIONS\DEMOTONE\DESIGN\demotone-web"
Set-Location $ProjectPath
Write-Host "[OK] CWD: $ProjectPath" -ForegroundColor Green

# Verificar git
$gitVersion = git --version
Write-Host "[OK] $gitVersion" -ForegroundColor Green

# Init repo si no existe
if (-not (Test-Path ".git")) {
    Write-Host ""
    Write-Host "Inicializando repositorio git en rama 'main'..." -ForegroundColor Cyan
    git init -b main
} else {
    Write-Host "[INFO] Repositorio git ya existe, saltando init" -ForegroundColor Yellow
}

# Configurar identidad local
Write-Host ""
Write-Host "Configurando identidad git (solo para este repo)..." -ForegroundColor Cyan
git config user.email "baseekdeejay@gmail.com"
git config user.name "Demotone"

# Add + commit
Write-Host ""
Write-Host "Añadiendo archivos al staging..." -ForegroundColor Cyan
git add .

Write-Host ""
Write-Host "Creando commit inicial..." -ForegroundColor Cyan
git commit -m "Initial commit: demotone-web"

# Remote
Write-Host ""
Write-Host "Configurando remote 'origin'..." -ForegroundColor Cyan
$existingRemote = git remote 2>$null
if ($existingRemote -contains "origin") {
    git remote set-url origin https://github.com/baseekdeejay-hash/demotone-web.git
    Write-Host "[INFO] Remote 'origin' actualizado" -ForegroundColor Yellow
} else {
    git remote add origin https://github.com/baseekdeejay-hash/demotone-web.git
    Write-Host "[OK] Remote 'origin' añadido" -ForegroundColor Green
}

# Push
Write-Host ""
Write-Host "Haciendo push a GitHub..." -ForegroundColor Cyan
Write-Host "(Si te pide autenticación, autoriza con tu navegador o token)" -ForegroundColor Yellow
git push -u origin main

Write-Host ""
Write-Host "=== HECHO ===" -ForegroundColor Green
Write-Host "Repo: https://github.com/baseekdeejay-hash/demotone-web" -ForegroundColor White
