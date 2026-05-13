@echo off
echo NANDI TRANSPORTERS - Cloud Deployment Helper
echo ============================================
echo.
echo This script helps deploy your app to the cloud.
echo.
echo Choose an option:
echo 1 - Create GitHub repo (required for most platforms)
echo 2 - Deploy to Railway (Recommended)
echo 3 - Deploy to Render
echo 4 - Deploy to Heroku
echo 5 - Show manual instructions
echo.
set /p choice=Choice:

if "%choice%"=="1" (
    echo.
    echo CREATING GITHUB REPO:
    echo ====================
    echo.
    echo 1. Go to: https://github.com/new
    echo 2. Repository name: nandi-transporters-webapp
    echo 3. Make it public or private
    echo 4. DON'T initialize with README
    echo 5. Click "Create repository"
    echo.
    echo Then run these commands in this folder:
    echo git init
    echo git add .
    echo git commit -m "Initial commit"
    echo git branch -M main
    echo git remote add origin https://github.com/YOUR_USERNAME/nandi-transporters-webapp.git
    echo git push -u origin main
    echo.
    pause
) else if "%choice%"=="2" (
    echo.
    echo RAILWAY DEPLOYMENT:
    echo ===================
    echo.
    echo 1. Sign up at: https://railway.app/
    echo 2. Install Railway CLI: npm install -g @railway/cli
    echo 3. Run these commands:
    echo    railway login
    echo    railway init
    echo    railway up
    echo.
    echo Your app will get a permanent URL like:
    echo https://your-app-name.up.railway.app
    echo.
    pause
) else if "%choice%"=="2" (
    echo.
    echo RENDER DEPLOYMENT:
    echo ==================
    echo.
    echo 1. Sign up at: https://render.com/
    echo 2. Click "New +" -^> "Web Service"
    echo 3. Connect your GitHub repo or upload files
    echo 4. Set build command: npm install
    echo 5. Set start command: npm start
    echo 6. Add environment variable: NODE_ENV=production
    echo.
    echo Render will give you a free URL.
    echo.
    pause
) else if "%choice%"=="3" (
    echo.
    echo HEROKU DEPLOYMENT:
    echo ==================
    echo.
    echo 1. Sign up at: https://heroku.com/
    echo 2. Install Heroku CLI from: https://devcenter.heroku.com/articles/heroku-cli
    echo 3. Run: heroku create your-app-name
    echo 4. Run: git push heroku main
    echo.
    echo Your app will be at: https://your-app-name.herokuapp.com
    echo.
    pause
) else (
    echo.
    echo Opening deployment instructions...
    start CLOUD_DEPLOY.md
    echo.
    echo Press any key to continue...
    pause >nul
)