#!/bin/bash

# Commit and Push Landing Page to GitHub
# Repository: pedrogillet1/koda-Landing

echo "🚀 Committing and Pushing Landing Page to GitHub..."
echo ""

cd /Users/alvarocamasmie/Downloads/landing

# Commit all staged files
echo "📝 Creating commit..."
git commit -m "Initial commit: Complete landing page with updated logos

- Added all landing page HTML files (index, about, contact, privacy, terms, waitlist)
- Updated logos to koda-text-white copy.svg across all pages
- Added server.js for local development
- Added ngrok scripts for public deployment
- Added complete setup documentation

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"

if [ $? -eq 0 ]; then
    echo "✅ Commit created successfully"
    echo ""
    echo "🌐 Pushing to GitHub (pedrogillet1/koda-Landing)..."
    echo "⚠️  This will replace the contents of the GitHub repository"
    echo ""

    git push -u origin main --force

    if [ $? -eq 0 ]; then
        echo ""
        echo "======================================"
        echo "✅ Successfully Pushed to GitHub!"
        echo "======================================"
        echo ""
        echo "🌐 View your repository at:"
        echo "   https://github.com/pedrogillet1/koda-Landing"
        echo ""
        echo "Your landing page is now live on GitHub! 🎉"
    else
        echo ""
        echo "❌ Push failed. Possible reasons:"
        echo "   1. Need to authenticate with GitHub"
        echo "   2. No internet connection"
        echo "   3. Repository permissions issue"
        echo ""
        echo "Try running manually:"
        echo "   git push -u origin main --force"
    fi
else
    echo "❌ Commit failed"
    echo ""
    echo "Checking git status:"
    git status
fi
