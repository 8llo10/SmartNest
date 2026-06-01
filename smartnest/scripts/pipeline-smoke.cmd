@echo off
setlocal

if "%APP_PORT%"=="" set APP_PORT=3000
if "%IMAGE_NAME%"=="" set IMAGE_NAME=smartnest
if "%CONTAINER_NAME%"=="" set CONTAINER_NAME=smartnest-container
if "%TAG%"=="" set TAG=local-smoke

echo [1/5] Install dependencies
call npm ci
if errorlevel 1 call npm install
if errorlevel 1 exit /b 1

echo [2/5] Build
call npm run build
if errorlevel 1 exit /b 1

echo [3/5] Test (lint)
call npm test
if errorlevel 1 exit /b 1

echo [4/5] Package (docker build)
docker build -t %IMAGE_NAME%:%TAG% .
if errorlevel 1 exit /b 1

echo [5/5] Deploy (docker run)
for /f "tokens=*" %%i in ('docker ps -a --format "{{.Names}}" ^| findstr /r /c:"^%CONTAINER_NAME%$"') do docker rm -f %CONTAINER_NAME%
docker run -d --name %CONTAINER_NAME% -p %APP_PORT%:80 %IMAGE_NAME%:%TAG%
if errorlevel 1 exit /b 1

echo Smoke pipeline finished. App should be available on http://localhost:%APP_PORT%
