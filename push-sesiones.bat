@echo off
chcp 65001 >nul
title demotone-web :: pagina /sesiones (Phase 1)
echo === Push: nueva pagina /sesiones con reproductor SoundCloud-like ===
cd /d "O:\BASEK MUSIC PRODUCCIONS\DEMOTONE\DESIGN\demotone-web"
del /f /q ".git\index.lock" 2>nul
git add -A
git commit -m "Feat: nueva pagina /sesiones con wavesurfer player + mini-player + audio proxy"
git push origin main
echo.
echo =====================================================
echo  Push hecho. Vercel:
echo   1) Instala wavesurfer.js + zustand (~30s)
echo   2) Hace build (~1 min)
echo   3) Despliega
echo  Cuando este verde, abre:
echo     https://www.demotone.es/sesiones
echo =====================================================
echo.
pause
