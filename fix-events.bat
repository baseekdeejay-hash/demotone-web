@echo off
chcp 65001 >nul
title demotone-web :: fix Events.tsx huerfano
echo === Borrando components/Events.tsx (causa el error de build) ===
echo.
cd /d "O:\BASEK MUSIC PRODUCCIONS\DEMOTONE\DESIGN\demotone-web"

del /f /q ".git\index.lock" 2>nul

echo Borrando el archivo Events.tsx...
del /f /q "components\Events.tsx" 2>nul
echo OK
echo.

echo Estado git tras borrado:
git status -s
echo.

echo Anyadiendo cambios...
git add -A
echo.

echo Commit + push...
git commit -m "Fix: borrar components/Events.tsx huerfano que rompia build"
git push origin main

echo.
echo =====================================================
echo  Push hecho. Vercel hara nuevo build en segundos.
echo  Esperar ~2 min y mirar el deploy en verde.
echo =====================================================
echo.
pause
