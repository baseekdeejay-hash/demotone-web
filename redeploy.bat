@echo off
chcp 65001 >nul
title demotone-web :: ajuste tamano video hero
echo === Deploy: Hero video panel intermedio ===
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
git commit -m "Refactor: Hero video en panel 7/12 (sin upscaling)"
echo.

echo Push a GitHub (Vercel auto-redeploy)...
git push origin main

echo.
echo =====================================================
echo  Push hecho. En ~1-2 min se actualiza demotone.es
echo =====================================================
echo.
pause
