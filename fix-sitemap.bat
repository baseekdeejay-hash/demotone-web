@echo off
chcp 65001 >nul
title demotone-web :: fix sitemap (sin hashes)
echo === Fix Sitemap: quitar hashes y usar URL canonica www ===
echo.
cd /d "O:\BASEK MUSIC PRODUCCIONS\DEMOTONE\DESIGN\demotone-web"

del /f /q ".git\index.lock" 2>nul

echo Estado:
git status -s
echo.

echo Commit + push...
git add -A
git commit -m "Fix: sitemap canonico sin hashes (era rechazado por Google)"
git push origin main

echo.
echo =====================================================
echo  Push hecho. Esperar 2 min y volver a enviar
echo  sitemap.xml en Google Search Console.
echo =====================================================
echo.
pause
