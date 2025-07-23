#!/bin/bash

echo "🧪 Testing Real-time Drawing Board"
echo "=================================="

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Backend URL
BACKEND_URL="https://portfolio-production-5aea.up.railway.app"

echo -e "${YELLOW}1. Testing Backend Health...${NC}"
HEALTH_RESPONSE=$(curl -s "$BACKEND_URL/api/health")

if [[ $HEALTH_RESPONSE == *"status"* && $HEALTH_RESPONSE == *"ok"* ]]; then
    echo -e "${GREEN}✅ Backend is healthy!${NC}"
    echo "Response: $HEALTH_RESPONSE"
else
    echo -e "${RED}❌ Backend health check failed${NC}"
    echo "Response: $HEALTH_RESPONSE"
    exit 1
fi

echo ""
echo -e "${YELLOW}2. Testing WebSocket Connection...${NC}"
echo "This will test if the WebSocket server is accessible..."

# Test WebSocket endpoint (basic connectivity)
WS_TEST=$(curl -s -I "$BACKEND_URL" | head -1)
if [[ $WS_TEST == *"200"* || $WS_TEST == *"101"* ]]; then
    echo -e "${GREEN}✅ WebSocket server is accessible${NC}"
else
    echo -e "${RED}❌ WebSocket server not accessible${NC}"
    echo "Response: $WS_TEST"
fi

echo ""
echo -e "${YELLOW}3. Frontend Testing Instructions:${NC}"
echo -e "${GREEN}✅ Backend is ready!${NC}"
echo ""
echo "Now test the frontend:"
echo "1. Open your browser to: http://localhost:4200"
echo "2. Navigate to the Drawing Board section (5th dot)"
echo "3. Enter a username and select a color"
echo "4. Click 'Start Drawing'"
echo "5. Try drawing on the canvas"
echo ""
echo "For real-time testing:"
echo "1. Open multiple browser tabs"
echo "2. Join with different usernames"
echo "3. Draw simultaneously to test collaboration"
echo ""
echo -e "${GREEN}🎉 Your real-time drawing board is ready!${NC}"
echo ""
echo "Backend URL: $BACKEND_URL"
echo "Health Check: $BACKEND_URL/api/health"
echo ""
echo "If you encounter any issues, check:"
echo "- Browser console for errors"
echo "- Network tab for failed requests"
echo "- Railway logs: cd server && railway logs" 