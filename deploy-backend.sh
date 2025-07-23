#!/bin/bash

echo "🚀 Deploy Backend to Railway (Frontend on Netlify)"
echo "=================================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git not initialized. Please run:"
    echo "   git init"
    echo "   git add ."
    echo "   git commit -m 'Add WebSocket server'"
    echo "   git remote add origin https://github.com/yourusername/your-repo.git"
    echo "   git push -u origin main"
    exit 1
fi

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "📦 Installing Railway CLI..."
    npm install -g @railway/cli
fi

echo "✅ Railway CLI installed"

# Login to Railway
echo "🔐 Logging into Railway..."
railway login

if [ $? -ne 0 ]; then
    echo "❌ Failed to login to Railway"
    echo "Please visit https://railway.app and create an account first"
    exit 1
fi

# Navigate to server directory
cd server

# Initialize Railway project
echo "🏗️  Initializing Railway project..."
railway init

# Deploy
echo "🚀 Deploying to Railway..."
railway up

# Get the deployment URL
echo "📋 Getting deployment URL..."
railway status

echo ""
echo "🎉 Backend deployment complete!"
echo ""
echo "📋 Next steps:"
echo "1. Copy your Railway URL from above"
echo "2. Update src/app/core/services/drawing.service.ts:"
echo "   const serverUrl = 'YOUR_RAILWAY_URL';"
echo "3. Build and redeploy frontend to Netlify:"
echo "   npm run build"
echo "   # Upload dist/lightning to Netlify"
echo ""
echo "🔗 Railway Dashboard: https://railway.app"
echo "📖 Full guide: deploy-backend-only.md" 