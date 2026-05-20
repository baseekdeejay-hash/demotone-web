@echo off
chcp 65001 >nul
title demotone-web :: lluvia 3D boxes
echo === Push: Lluvia 3D de cajas TB-303 (rectangulares neon) ===
cd /d "O:\BASEK MUSIC PRODUCCIONS\DEMOTONE\DESIGN\demotone-web"
del /f /q ".git\index.lock" 2>nul
git add -A
git commit -m "Feat: lluvia 3D de cajas TB-303 (boxes rectangulares dibujo lineal amarillo neon)"
git push origin main
echo.
echo Push hecho. Vercel actualizara en 1-2 min.
pause
