#!/bin/bash

cd /Users/alvarocamasmie/Downloads/landing

echo "📝 Committing changes..."
git add .
git commit -m "Apply light UI design system with working logo

✨ Design System Updates:
- Applied light color palette across all pages
- Page background: #F5F5F5
- Section background: #FFFFFF
- Footer background: #F1F0EF
- Text colors: #181818 (primary), #32302C (headings), #55534E (body), #6C6B6E (muted)
- Borders: #E6E6EC
- CTAs: #181818 background with white text

🖼️ Logo Updates:
- Changed to koda-logo_1 copy.svg
- URL-encoded spaces (%20) for proper loading
- Updated all headers and footers across 6 pages

🎨 Typography:
- Kept original font sizes (reverted design system typography)
- Only applied color changes

📄 Files Updated:
- index.html, about.html, contact.html, waitlist.html, privacy.html, terms.html
- light-theme-overrides.css

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"

echo ""
echo "🚀 Pushing to GitHub..."
git remote set-url origin https://pedrogillet1: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@github.com/pedrogillet1/koda-Landing.git
git push origin main

echo ""
echo "🌍 Making repository public..."
gh repo edit pedrogillet1/koda-Landing --visibility public

echo ""
echo "======================================"
echo "✅ Changes Committed & Repo is Public!"
echo "======================================"
echo ""
echo "Repository URL: https://github.com/pedrogillet1/koda-Landing"
echo "All changes have been pushed!"
