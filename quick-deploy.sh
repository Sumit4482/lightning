#!/bin/bash

echo "🚀 Quick Deploy to Railway"
echo "=========================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git not initialized. Please run:"
    echo "   git init"
    echo "   git add ."
    echo "   git commit -m 'Initial commit'"
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

# Create new project
echo "🏗️  Creating Railway project..."
railway init

# Deploy
echo "🚀 Deploying to Railway..."
railway up

echo ""
echo "🎉 Deployment complete!"
echo ""
echo "📋 Next steps:"
echo "1. Get your Railway URL from the dashboard"
echo "2. Update src/app/core/services/drawing.service.ts with your URL"
echo "3. Deploy frontend to Vercel/Netlify"
echo ""
echo "🔗 Railway Dashboard: https://railway.app"
echo "📖 Full guide: deploy-to-railway.md" 