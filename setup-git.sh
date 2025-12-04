#!/bin/bash

# Setup Git Repository for Koda Landing Page
# This will initialize git and connect to pedrogillet1/koda-Landing

echo "🔧 Setting up Git repository..."
echo ""

cd /Users/alvarocamasmie/Downloads/landing

# Check if already a git repo
if [ -d ".git" ]; then
    echo "✅ Git repository already exists"
else
    echo "📦 Initializing new Git repository..."
    git init
    echo "✅ Git repository initialized"
fi

echo ""
echo "🔗 Setting up remote connection to GitHub..."
git remote remove origin 2>/dev/null  # Remove if exists
git remote add origin https://github.com/pedrogillet1/koda-Landing.git

echo "✅ Remote 'origin' set to: https://github.com/pedrogillet1/koda-Landing.git"

echo ""
echo "📋 Checking current branch..."
CURRENT_BRANCH=$(git branch --show-current 2>/dev/null)

if [ -z "$CURRENT_BRANCH" ]; then
    echo "🌿 Creating main branch..."
    git checkout -b main
else
    echo "✅ Current branch: $CURRENT_BRANCH"
fi

echo ""
echo "📝 Creating .gitignore..."
cat > .gitignore <<'GITIGNORE'
# Node modules
node_modules/

# OS files
.DS_Store
Thumbs.db

# Log files
*.log
npm-debug.log*

# Environment variables
.env
.env.local

# Editor directories
.vscode/
.idea/

GITIGNORE

echo "✅ .gitignore created"

echo ""
echo "➕ Staging all files..."
git add .

echo ""
echo "📊 Files to be committed:"
git status --short

echo ""
echo "======================================"
echo "✅ Git Setup Complete!"
echo "======================================"
echo ""
echo "Next steps:"
echo "1. Run: git commit -m \"Initial commit with landing page updates\""
echo "2. Run: git push -u origin main"
echo ""
echo "Or use GitHub Desktop to commit and push."
echo ""
