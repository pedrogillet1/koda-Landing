#!/bin/bash

# Push Landing Page Changes to GitHub
# Repository: pedrogillet1/koda-Landing

echo "🔄 Preparing to push changes to GitHub..."
echo ""

cd /Users/alvarocamasmie/Downloads/landing

# Check git status
echo "📋 Current changes:"
git status --short

echo ""
echo "➕ Staging all changed files..."
git add .

echo ""
echo "📝 Creating commit..."
git commit -m "$(cat <<'EOF'
Update logo across all landing pages

- Replaced 'logo copy.svg' with 'koda-text-white copy.svg'
- Fixed logo references in all 6 HTML pages (index, about, contact, privacy, terms, waitlist)
- Added URL encoding (%20) for space in filename to ensure proper image loading
- Added server.js for local development
- Added ngrok startup scripts for public access

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"

if [ $? -eq 0 ]; then
    echo "✅ Commit created successfully"
    echo ""
    echo "🚀 Pushing to GitHub (pedrogillet1/koda-Landing)..."
    git push origin main

    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ Successfully pushed to GitHub!"
        echo "🌐 View your repository at:"
        echo "   https://github.com/pedrogillet1/koda-Landing"
    else
        echo ""
        echo "❌ Push failed. Trying 'master' branch instead..."
        git push origin master
    fi
else
    echo "❌ Commit failed"
    echo ""
    echo "Current git status:"
    git status
fi
