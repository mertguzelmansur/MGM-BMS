@echo off
REM MGM BMS - APK'yi bu bilgisayarda derler.
REM Gerekenler: Node.js 22+, Android Studio (JDK 21 ve Android SDK icin)
cd /d "%~dp0"
where node >nul 2>nul || (echo Node.js bulunamadi: https://nodejs.org & pause & exit /b 1)
if not defined JAVA_HOME if exist "%ProgramFiles%\Android\Android Studio\jbr" set "JAVA_HOME=%ProgramFiles%\Android\Android Studio\jbr"
if not defined ANDROID_HOME if exist "%LOCALAPPDATA%\Android\Sdk" set "ANDROID_HOME=%LOCALAPPDATA%\Android\Sdk"
echo [1/3] Bagimliliklar kuruluyor...
call npm install --no-audit --no-fund || (pause & exit /b 1)
echo [2/3] Web dosyalari Android projesine kopyalaniyor...
call npx esbuild src/cap-entry.js --bundle --format=iife --minify --outfile=www/vendor/cap.js || (pause & exit /b 1)
call npx cap sync android || (pause & exit /b 1)
echo [3/3] APK derleniyor (ilk seferde birkac dakika surer)...
cd android
call gradlew.bat assembleDebug || (pause & exit /b 1)
cd ..
copy /y android\app\build\outputs\apk\debug\app-debug.apk MGM_BMS.apk >nul
echo.
echo Hazir: %CD%\MGM_BMS.apk
pause
