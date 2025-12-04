#!/bin/bash

# Koda Landing Page - Complete Startup Script
# This script configures ngrok, starts the server, and launches ngrok tunnels

echo "🚀 Koda Landing Page - Complete Setup"
echo "======================================"
echo ""

# Step 1: Configure ngrok authtoken
echo "Step 1/3: Configuring ngrok authtoken..."
ngrok config add-authtoken 33fTneoH89q5L6Ji1VPvR78v8pG_2kt4wsMcMvFBUQAnBRJGr

if [ $? -eq 0 ]; then
    echo "✅ Authtoken configured successfully"
else
    echo "⚠️  Authtoken may already be configured (this is okay)"
fi
echo ""

# Step 2: Start the landing page server in background
echo "Step 2/3: Starting landing page server on port 8080..."
cd /Users/alvarocamasmie/Downloads/landing
node server.js &
SERVER_PID=$!

# Wait for server to start
sleep 2

# Check if server is running
if kill -0 $SERVER_PID 2>/dev/null; then
    echo "✅ Server started successfully (PID: $SERVER_PID)"
    echo "   Local URL: http://localhost:8080"
else
    echo "❌ Failed to start server"
    exit 1
fi
echo ""

# Step 3: Start ngrok tunnel
echo "Step 3/3: Starting ngrok tunnel..."
ngrok http 8080 --domain=landingfrontend.ngrok.app &
NGROK_PID=$!

# Wait for ngrok to connect
sleep 3

echo ""
echo "======================================"
echo "✅ Setup Complete!"
echo "======================================"
echo ""
echo "📍 Your landing page is now accessible at:"
echo "   🌐 Local:  http://localhost:8080"
echo "   🌍 Public: https://landingfrontend.ngrok.app"
echo ""
echo "📊 Process Information:"
echo "   Server PID: $SERVER_PID"
echo "   Ngrok PID:  $NGROK_PID"
echo ""
echo "To stop everything:"
echo "   kill $SERVER_PID $NGROK_PID"
echo ""
echo "Or press Ctrl+C (this will stop ngrok, but server will keep running)"
echo ""

# Trap Ctrl+C to clean up
trap "echo ''; echo 'Stopping...'; kill $NGROK_PID 2>/dev/null; kill $SERVER_PID 2>/dev/null; echo 'Stopped.'; exit" INT

# Keep script running
wait $NGROK_PID
