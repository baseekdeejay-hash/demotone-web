@echo off
chcp 65001 >nul
title demotone-web :: cleanup + scrub mas rapido
echo === Push: quitar SynthRain y acelerar scroll-scrub video ===
cd /d "O:\BASEK MUSIC PRODUCCIONS\DEMOTONE\DESIGN\demotone-web"
del /f /q ".git\index.lock" 2>nul

REM Borrar archivos huerfanos del feature SynthRain (si Windows permite)
del /f /q "components\effects\SynthRain.tsx" 2>nul
del /f /q "public\images\synth.jpg" 2>nul
del /f /q "push-synthrain.bat" 2>nul

git add -A
git commit -m "Cleanup: quitar SynthRain feature + acelerar video scrub 2x (completa al 50% del Hero)"
git push origin main
echo.
echo Push hecho. Vercel actualiza en 1-2 min.
pause
