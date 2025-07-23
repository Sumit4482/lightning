#!/bin/bash

echo "🚀 Setting up Real-Time Drawing Board Server"
echo "============================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Navigate to server directory
cd server

# Install dependencies
echo "📦 Installing server dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Create .env file for configuration
echo "⚙️  Creating configuration file..."
cat > .env << EOF
# Drawing Board Server Configuration
PORT=3000
NODE_ENV=development

# CORS Settings (for production, specify your domain)
CORS_ORIGIN=*

# Optional: Database configuration for persistent storage
# DATABASE_URL=your_database_url_here
EOF

echo "✅ Configuration file created"

echo ""
echo "🎉 Setup complete! To start the server:"
echo ""
echo "   cd server"
echo "   npm start"
echo ""
echo "   Or for development with auto-restart:"
echo "   npm run dev"
echo ""
echo "📡 Server will be available at:"
echo "   - WebSocket: ws://localhost:3000"
echo "   - HTTP: http://localhost:3000"
echo "   - Health Check: http://localhost:3000/api/health"
echo ""
echo "🌐 Your Angular app should connect to: http://localhost:3000"
echo ""
echo "💡 For production deployment:"
echo "   1. Update the server URL in src/app/core/services/drawing.service.ts"
echo "   2. Deploy the server to your hosting platform"
echo "   3. Update CORS settings in server/drawing-server.js" 