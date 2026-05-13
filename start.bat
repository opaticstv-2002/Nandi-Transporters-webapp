@echo off
echo NANDI TRANSPORTERS - Car Hiring Management Web App
echo ==================================================
echo.
echo Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    echo Then run this script again.
    pause
    exit /b 1
)

echo Node.js is installed.
echo.
echo Installing dependencies...
npm install

if errorlevel 1 (
    echo ERROR: Failed to install dependencies!
    pause
    exit /b 1
)

echo.
echo Starting the server...
echo.
echo The app will be available at: http://localhost:3000
echo.
echo For remote access from any network:
echo 1. Find your computer's IP address (shown below)
echo 2. Set up port forwarding in your router to port 3000
echo 3. Use: http://YOUR_PUBLIC_IP:3000
echo.
for /f "tokens=2 delims=:" %%i in ('ipconfig ^| findstr /R /C:"IPv4 Address"') do (
    echo Your local IP: %%i
)
echo.
echo Do you want to start a public tunnel?
echo 1 - localtunnel (recommended)
echo 2 - ngrok
echo 3 - No tunnel
set /p tunnelChoice=Choice: 
if /I "%tunnelChoice%"=="1" (
    echo.
    echo Starting server and localtunnel...
    start "NANDI TRANSPORTERS Server" cmd /k "npm start"
    timeout /t 3 >nul
    start "localtunnel" cmd /k "npx localtunnel --port 3000"
    exit /b 0
) else if /I "%tunnelChoice%"=="2" (
    where ngrok >nul 2>&1
    if errorlevel 1 (
        echo.
        echo ERROR: ngrok is not installed or not in PATH.
        echo Install ngrok from https://ngrok.com/download and try again.
        pause
        exit /b 1
    )
    echo.
    echo Starting server and ngrok tunnel...
    start "NANDI TRANSPORTERS Server" cmd /k "npm start"
    timeout /t 3 >nul
    start "ngrok" cmd /k "ngrok http 3000"
    exit /b 0
) else (
    echo.
    echo Press Ctrl+C to stop the server
    echo.
    npm start
)