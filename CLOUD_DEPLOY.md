# NANDI TRANSPORTERS - Cloud Deployment via GitHub + Render

## Deploy to Render from GitHub (Recommended)

### Prerequisites:
- GitHub account (https://github.com)
- Render account (https://render.com)
- Your webapp pushed to a GitHub repository

### Step 1: Push to GitHub

1. Initialize git (if not done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Nandi Transporters webapp"
   ```

2. Create a new repository on GitHub (https://github.com/new)

3. Push your code:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/nandi-transporters.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy on Render

1. **Sign up**: Go to https://render.com/ and create a free account
2. **Connect GitHub**: Link your GitHub account to Render
3. **Create new Web Service**: Click "New +" → "Web Service"
4. **Select repository**: Choose `nandi-transporters` (or your repo name)
5. **Configure settings**:
   - **Name**: `nandi-transporters-webapp`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. **Environment variables**: Set `NODE_ENV=production`
7. **Click Deploy**: Render will automatically build and deploy

### Step 3: Get Your Live URL

- Render provides a free URL like: `https://nandi-transporters-webapp.onrender.com`
- Share this URL to access your webapp from anywhere
- Changes pushed to GitHub automatically redeploy

## Files Ready for Deployment

Your app is already configured for cloud deployment:
- ✅ `package.json` with start script
- ✅ `render.yaml` with Render configuration
- ✅ `.gitignore` to exclude sensitive files
- ✅ SQLite database (works on cloud)
- ✅ All dependencies listed
- ✅ Server binds to dynamic PORT

## Benefits
- **Automatic deployment** - Push to GitHub, auto-deploy to Render
- **Permanent URL** - accessible from anywhere
- **No port forwarding** needed
- **HTTPS included** - secure by default
- **Free tier available** - generous free plan

## Troubleshooting

### Build fails
- Check `package.json` has all required dependencies
- Ensure `npm start` works locally: `npm start`

### Database issues
- SQLite database file is created automatically on first run
- Each Render instance gets its own database
- Use cloud database (PostgreSQL/MongoDB) if you need data persistence across redeployments

### Port binding
- Render automatically assigns a PORT - server correctly uses `process.env.PORT || 3000`

## Need Help?
- [Render Documentation](https://render.com/docs)
- [GitHub Guide](https://docs.github.com/en/get-started/getting-started-with-git)
- [Express.js Documentation](https://expressjs.com/)
