#!/bin/bash

# Koda Landing Page - Ngrok Tunnel Setup
# This script starts ngrok tunnels for both frontend and backend

echo "🚀 Starting Ngrok tunnels for Koda Landing Page..."
echo ""

# Check if ngrok is installed
if ! command -v ngrok &> /dev/null; then
    echo "❌ Error: ngrok is not installed"
    echo "Please install ngrok from: https://ngrok.com/download"
    exit 1
fi

# Check if ngrok is configured with authtoken
echo "ℹ️  Make sure you've configured ngrok with your authtoken:"
echo "   Run: ngrok config add-authtoken YOUR_AUTHTOKEN"
echo "   Get it from: https://dashboard.ngrok.com/get-started/your-authtoken"
echo ""

# Start landing page frontend tunnel
echo "📱 Starting frontend tunnel (landingfrontend.ngrok.app)..."
ngrok http 8080 --domain=landingfrontend.ngrok.app &

FRONTEND_PID=$!
sleep 2

# Start landing page backend tunnel (if needed)
echo "🔧 Starting backend tunnel (landingbackend.ngrok.app)..."
ngrok http 3001 --domain=landingbackend.ngrok.app &

BACKEND_PID=$!

echo ""
echo "✅ Ngrok tunnels starting..."
echo ""
echo "Frontend URL: https://landingfrontend.ngrok.app"
echo "Backend URL: https://landingbackend.ngrok.app"
echo ""
echo "Note: Domain tokens (rd_xxx) are for domain reservation, not authentication"
echo "      Frontend domain token: rd_353neA18cQ9TrKPIhCpXCLlLVBO"
echo "      Backend domain token: rd_353nRATqpfXccRTZfpj61SVufua"
echo ""
echo "To stop the tunnels, press Ctrl+C"
echo ""

# Trap Ctrl+C to kill both processes
trap "kill $FRONTEND_PID $BACKEND_PID 2>/dev/null" EXIT

# Wait for user to stop
wait
