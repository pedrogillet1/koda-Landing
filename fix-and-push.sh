#!/bin/bash

# Complete Fix and Push Script for Landing Page
# This handles all issues and pushes to GitHub

echo "🔧 Fixing git issues and pushing to GitHub..."
echo ""

cd /Users/alvarocamasmie/Downloads/landing

# Step 1: Remove embedded git repository (the "Landing" folder issue)
echo "Step 1: Removing embedded git repository..."
if [ -d "Landing/.git" ]; then
    rm -rf Landing/.git
    echo "✅ Removed embedded .git from Landing folder"
else
    echo "ℹ️  No embedded git found"
fi

# Step 2: Remove Landing from staging and re-add it
echo ""
echo "Step 2: Fixing staging area..."
git rm --cached -r Landing 2>/dev/null
git add Landing
echo "✅ Re-staged Landing folder"

# Step 3: Stage all other files
echo ""
echo "Step 3: Staging all files..."
git add .
echo "✅ All files staged"

# Step 4: Show what will be committed
echo ""
echo "📊 Files to be committed:"
git status --short | head -20
echo "... (and more)"

# Step 5: Commit
echo ""
echo "Step 5: Creating commit..."
git commit -m "Initial commit: Complete Koda landing page

✨ Features:
- 6 complete HTML pages (index, about, contact, privacy, terms, waitlist)
- Updated Koda logo across all pages (koda-text-white copy.svg)
- Responsive design with mobile menu
- Multi-language support (EN, PT, ES)
- Complete assets (images, icons, fonts)

🛠️ Development Tools:
- server.js for local development
- ngrok scripts for public deployment
- Complete setup documentation

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"

if [ $? -ne 0 ]; then
    echo "❌ Commit failed. Showing git status:"
    git status
    exit 1
fi

echo "✅ Commit created successfully"

# Step 6: Push to GitHub
echo ""
echo "Step 6: Pushing to GitHub..."
echo "🌐 Repository: pedrogillet1/koda-Landing"
echo ""

git push -u origin main --force

if [ $? -eq 0 ]; then
    echo ""
    echo "======================================"
    echo "✅ Successfully Pushed to GitHub!"
    echo "======================================"
    echo ""
    echo "🌐 View your repository:"
    echo "   https://github.com/pedrogillet1/koda-Landing"
    echo ""
    echo "🎉 Your Koda landing page is now on GitHub!"
else
    echo ""
    echo "⚠️  Push might need authentication"
    echo ""
    echo "If authentication is required, you can:"
    echo "1. Use GitHub Desktop to push"
    echo "2. Set up SSH keys"
    echo "3. Use a Personal Access Token"
    echo ""
    echo "Or try: git push -u origin main --force"
fi
