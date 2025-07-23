# 🚀 Deploy to Railway (Free) - Step by Step

## Prerequisites
- GitHub account
- Railway account (free)

## Step 1: Prepare Your Repository

### Option A: Use Current Repository
If your code is already on GitHub, skip to Step 2.

### Option B: Create New Repository
```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit with drawing board"

# Create GitHub repository and push
# (Do this on GitHub.com)
git remote add origin https://github.com/yourusername/your-repo.git
git push -u origin main
```

## Step 2: Deploy to Railway

### 1. Go to Railway
- Visit [railway.app](https://railway.app)
- Sign up with your GitHub account

### 2. Create New Project
- Click "New Project"
- Select "Deploy from GitHub repo"
- Choose your repository

### 3. Configure Deployment
Railway will auto-detect your project structure. You need to:

**For the Server:**
- Set **Root Directory** to: `server`
- Set **Build Command** to: `npm install`
- Set **Start Command** to: `npm start`

**For the Frontend (Optional):**
- Create another service
- Set **Root Directory** to: `.` (root)
- Set **Build Command** to: `npm run build`
- Set **Output Directory** to: `dist/lightning`

### 4. Environment Variables
Add these in Railway dashboard:
```
NODE_ENV=production
PORT=3000
```

### 5. Deploy!
- Click "Deploy"
- Wait for build to complete
- Get your server URL: `https://your-app.railway.app`

## Step 3: Update Frontend

### Update Server URL
Edit `src/app/core/services/drawing.service.ts`:

```typescript
// Change this line:
const serverUrl = 'https://your-app.railway.app'; // Your Railway URL
```

### Deploy Frontend
You have several options:

**Option A: Deploy to Railway (Same Project)**
- Add another service in Railway
- Set root directory to `.` (project root)
- Build command: `npm run build`
- Output directory: `dist/lightning`

**Option B: Deploy to Vercel (Recommended for Frontend)**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts
# - Set build command: npm run build
# - Set output directory: dist/lightning
```

**Option C: Deploy to Netlify**
- Go to netlify.com
- Connect your GitHub repo
- Set build command: `npm run build`
- Set publish directory: `dist/lightning`

## Step 4: Test Your Deployment

### 1. Test Server
```bash
# Check if server is running
curl https://your-app.railway.app/api/health

# Should return:
{
  "status": "ok",
  "users": 0,
  "strokes": 0,
  "timestamp": "..."
}
```

### 2. Test Frontend
- Open your deployed frontend URL
- Navigate to Drawing Board
- Try connecting with different users
- Test real-time drawing

## Step 5: Custom Domain (Optional)

### In Railway Dashboard:
1. Go to your project
2. Click "Settings"
3. Add custom domain
4. Update DNS records

### Update Frontend:
```typescript
const serverUrl = 'https://your-custom-domain.com';
```

## 🎉 Success!

Your real-time drawing board is now live at:
- **Frontend**: `https://your-frontend-url.com`
- **Backend**: `https://your-app.railway.app`

## 🔧 Troubleshooting

### Common Issues:

1. **Build Fails**
   - Check Railway logs
   - Ensure all dependencies are in package.json
   - Verify Node.js version compatibility

2. **WebSocket Connection Fails**
   - Check CORS settings in server
   - Verify server URL in frontend
   - Check Railway logs for errors

3. **Port Issues**
   - Railway auto-assigns ports
   - Use `process.env.PORT` in server code (already done)

### Railway Logs:
- Go to Railway dashboard
- Click on your service
- Check "Logs" tab for errors

## 💰 Cost Breakdown

**Railway Free Tier:**
- $5 credit monthly
- Server: ~$2-3/month
- Frontend: ~$1-2/month
- **Total: FREE** (within $5 limit)

**Alternative Free Options:**
- **Render**: 750 hours/month (completely free)
- **Vercel**: Generous free tier
- **Netlify**: 100GB bandwidth/month

## 🚀 Next Steps

1. **Monitor Usage**: Check Railway dashboard for usage
2. **Scale Up**: If you hit limits, consider paid plans
3. **Add Features**: Implement more drawing tools
4. **Analytics**: Add user tracking and analytics

Your portfolio now has a **production-ready real-time application** that demonstrates enterprise-level skills! 