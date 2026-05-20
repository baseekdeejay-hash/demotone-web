@echo off
chcp 65001 >nul
title demotone-web :: lluvia 3D TB-303
echo === Push: Lluvia 3D de TB-303 ===
echo.
cd /d "O:\BASEK MUSIC PRODUCCIONS\DEMOTONE\DESIGN\demotone-web"

del /f /q ".git\index.lock" 2>nul

echo Estado actual:
git status -s
echo.

echo Anyadiendo cambios...
git add -A
echo.

echo Commit + push...
git commit -m "Feat: lluvia 3D de TB-303 responsive (margenes laterales en pantallas anchas + pocket en Bio y Music)"
git push origin main

echo.
echo =====================================================
echo  Push hecho. En 1-2 min Vercel actualiza demotone.es
echo  
echo  Pruebalo en:
echo   - Estudio (pantalla ancha): rain en margenes lat.
echo   - Portatil: rain debajo de foto Bio + en Music
echo   - Movil: sin rain (correcto)
echo =====================================================
echo.
pause
