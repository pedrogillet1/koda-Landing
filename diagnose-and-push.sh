#!/bin/bash

echo "🔍 DIAGNOSING GIT STATUS..."
echo "======================================"
cd /Users/alvarocamasmie/Downloads/landing

echo ""
echo "1️⃣ Checking if git repo exists..."
if [ -d ".git" ]; then
    echo "✅ Git repository exists"
else
    echo "❌ No git repository found!"
    echo "Initializing git..."
    git init
    git branch -M main
fi

echo ""
echo "2️⃣ Current branch:"
git branch --show-current

echo ""
echo "3️⃣ Git remote configuration:"
git remote -v

echo ""
echo "4️⃣ Current git status:"
git status

echo ""
echo "5️⃣ Checking for commits:"
git log --oneline -5 2>/dev/null || echo "No commits yet"

echo ""
echo "======================================"
echo "🔧 FIXING AND PUSHING..."
echo "======================================"

echo ""
echo "Step 1: Removing embedded git repositories..."
find . -name ".git" -type d -not -path "./.git" -exec rm -rf {} + 2>/dev/null || true
rm -rf Landing/.git 2>/dev/null || true
echo "✅ Cleaned"

echo ""
echo "Step 2: Configuring remote..."
git remote remove origin 2>/dev/null || true
git remote add origin https://pedrogillet1:REDACTED_ROTATE_THIS_TOKEN@github.com/pedrogillet1/koda-Landing.git
echo "✅ Remote configured"

echo ""
echo "Step 3: Staging all files..."
git add -A
echo "✅ Files staged"

echo ""
echo "Step 4: Files to be committed:"
git status --short | head -30

echo ""
echo "Step 5: Creating commit..."
git commit -m "Initial commit: Complete Koda landing page

✨ Complete landing page with:
- 6 HTML pages (index, about, contact, privacy, terms, waitlist)
- Updated Koda logo (koda-text-white copy.svg)
- Responsive design + mobile menu
- Multi-language support (EN/PT/ES)
- Complete assets and documentation
- Development tools (server.js, ngrok scripts)

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>" || echo "⚠️ Nothing to commit or already committed"

echo ""
echo "Step 6: Checking commit..."
git log --oneline -1 2>/dev/null || echo "No commits to show"

echo ""
echo "Step 7: PUSHING TO GITHUB..."
echo "Repository: pedrogillet1/koda-Landing"
echo ""

git push -u origin main --force --verbose

if [ $? -eq 0 ]; then
    echo ""
    echo "======================================"
    echo "✅✅✅ SUCCESS! ✅✅✅"
    echo "======================================"
    echo ""
    echo "🌐 Your landing page is now on GitHub!"
    echo "   https://github.com/pedrogillet1/koda-Landing"
    echo ""
    echo "⚠️ IMPORTANT: Regenerate your token"
    echo "   https://github.com/settings/tokens"
else
    echo ""
    echo "======================================"
    echo "❌ PUSH FAILED"
    echo "======================================"
    echo ""
    echo "Showing detailed error information..."
    git push -u origin main --force --verbose 2>&1
fi
