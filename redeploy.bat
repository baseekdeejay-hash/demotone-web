@echo off
chcp 65001 >nul
title demotone-web :: deploy video hero
echo === Deploy: Video Hero con scroll-scrubbing ===
echo.
cd /d "O:\BASEK MUSIC PRODUCCIONS\DEMOTONE\DESIGN\demotone-web"

echo Limpiando locks de git si existen...
del /f /q ".git\index.lock" 2>nul
del /f /q ".git\objects\maintenance.lock" 2>nul
echo.

echo Estado actual:
git status -s
echo.

echo Anyadiendo cambios al staging...
git add -A
echo.

echo Creando commit...
git commit -m "Feat: video Hero con scroll-scrubbing + poster mobile"
echo.

echo Push a GitHub (Vercel auto-redeploy)...
git push origin main

echo.
echo =====================================================
echo  Push hecho. Vercel disparara nuevo build en segundos.
echo  Sigue el progreso en vercel.com/dashboard
echo  Cuando termine, refresca demotone.es para ver el video.
echo =====================================================
echo.
pause
