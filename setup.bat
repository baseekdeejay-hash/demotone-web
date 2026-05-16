@echo off
chcp 65001 >nul
title demotone-web :: setup
echo === demotone-web :: setup ===
echo.
cd /d "O:\BASEK MUSIC PRODUCCIONS\DEMOTONE\DESIGN\demotone-web"
echo [CWD] %CD%
echo.

git --version
if errorlevel 1 (
    echo ERROR: git no esta instalado o no esta en PATH
    pause
    exit /b 1
)
echo.

if not exist ".git" (
    echo Inicializando repo git rama main...
    git init -b main
    echo.
)

echo Configurando identidad...
git config user.email "baseekdeejay@gmail.com"
git config user.name "Demotone"
echo.

echo Anyadiendo archivos al staging...
git add .
echo.

echo Creando commit inicial...
git commit -m "Initial commit: demotone-web"
echo.

echo Configurando remote origin...
git remote remove origin 2>nul
git remote add origin https://github.com/baseekdeejay-hash/demotone-web.git
echo.

echo Haciendo push a GitHub...
echo (Si te pide autenticacion, autoriza con tu navegador)
echo.
git push -u origin main

echo.
echo =================================
echo  HECHO
echo  Repo: https://github.com/baseekdeejay-hash/demotone-web
echo =================================
echo.
pause
