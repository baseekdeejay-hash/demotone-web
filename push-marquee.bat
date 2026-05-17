@echo off
chcp 65001 >nul
title demotone-web :: marquee centrado
echo === Push: marquee centrado ===
cd /d "O:\BASEK MUSIC PRODUCCIONS\DEMOTONE\DESIGN\demotone-web"
del /f /q ".git\index.lock" 2>nul
git add -A
git commit -m "UX: marquee con mas items para sensacion de linea siempre llena/centrada"
git push origin main
echo.
echo Push hecho. Vercel desplegara en 1-2 min.
pause
