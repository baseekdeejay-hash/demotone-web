@echo off
chcp 65001 >nul
title demotone-web :: REPARAR y REDEPLEGAR
echo === REPARANDO ESTADO GIT ROTO + REDEPLOY ===
echo.
cd /d "O:\BASEK MUSIC PRODUCCIONS\DEMOTONE\DESIGN\demotone-web"

echo Paso 1: Eliminando locks de git...
del /f /q ".git\index.lock" 2>nul
del /f /q ".git\objects\maintenance.lock" 2>nul
del /f /q ".git\HEAD.lock" 2>nul
del /f /q ".git\refs\heads\main.lock" 2>nul
echo OK
echo.

echo Paso 2: Reseteando staging (deshacer rename roto y delete falso)...
git reset HEAD -- .
echo OK
echo.

echo Paso 3: Eliminando archivo 'tail' fantasma si existe...
del /f /q "tail" 2>nul
echo OK
echo.

echo Paso 4: Forzando re-add de tailwind.config.ts y tsconfig.json...
git add -f tailwind.config.ts tsconfig.json
echo OK
echo.

echo Paso 5: Anyadiendo TODOS los demas cambios...
git add -A
echo OK
echo.

echo Paso 6: Estado tras reparacion:
git status -s
echo.

echo Paso 7: Creando commit de reparacion + cambios SEO/Security...
git commit -m "Fix: restore tailwind.config.ts and tsconfig.json + apply SEO/Security batch"
echo.

echo Paso 8: Push a GitHub (Vercel hara re-deploy)...
git push origin main

echo.
echo =====================================================
echo  Reparacion + push terminados.
echo  Ve a Vercel dashboard y comprueba que el build:
echo    1) Empieza un nuevo deploy automatico
echo    2) Termina en verde (Ready)
echo  Si vuelve a fallar, copia el log de error.
echo =====================================================
echo.
pause
