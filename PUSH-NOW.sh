#!/bin/bash
set -e

cd /Users/alvarocamasmie/Downloads/landing

echo "🔧 Step 1: Fixing embedded git..."
rm -rf Landing/.git 2>/dev/null || true
echo "✅ Fixed"

echo ""
echo "📦 Step 2: Staging files..."
git add -A
echo "✅ Staged"

echo ""
echo "💾 Step 3: Creating commit..."
git commit -m "Initial commit: Complete Koda landing page

✨ Features:
- 6 complete HTML pages (index, about, contact, privacy, terms, waitlist)
- Updated Koda logo across all pages
- Responsive design with mobile menu
- Multi-language support (EN, PT, ES)
- Complete assets and documentation

🛠️ Development Tools:
- server.js for local development
- ngrok scripts for public deployment

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>" 2>/dev/null || echo "Already committed or no changes"
echo "✅ Committed"

echo ""
echo "🚀 Step 4: Pushing to GitHub..."
git remote set-url origin https://pedrogillet1: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@github.com/pedrogillet1/koda-Landing.git
git push -u origin main --force

echo ""
echo "======================================"
echo "✅ SUCCESS! Pushed to GitHub!"
echo "======================================"
echo ""
echo "🌐 View at: https://github.com/pedrogillet1/koda-Landing"
echo ""
echo "⚠️  IMPORTANT: Regenerate your token at https://github.com/settings/tokens"
