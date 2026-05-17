@echo off
chcp 65001 >nul
title demotone-web :: seguridad + seo
echo === Deploy: Anti-descarga, seguridad y SEO ===
echo.
cd /d "O:\BASEK MUSIC PRODUCCIONS\DEMOTONE\DESIGN\demotone-web"

del /f /q ".git\index.lock" 2>nul
del /f /q ".git\objects\maintenance.lock" 2>nul

echo Estado actual:
git status -s
echo.

echo Anyadiendo cambios al staging...
git add -A
echo.

echo Creando commit...
git commit -m "Security + SEO: anti-descarga imagenes, security headers, sitemap, robots, JSON-LD, OG image"
echo.

echo Push a GitHub (Vercel auto-redeploy)...
git push origin main

echo.
echo =====================================================
echo  Push hecho. En ~1-2 min Vercel desplegara los cambios.
echo  
echo  Despues del deploy, abre Google Search Console para
echo  registrar la web (te dejo instrucciones aparte).
echo =====================================================
echo.
pause
