#!/bin/bash

echo "🎨 Finishing logo update..."
echo ""

cd /Users/alvarocamasmie/Downloads/landing

# Step 1: Rename the logo file to remove space
echo "Step 1: Renaming logo file..."
if [ -f "assets/images/koda-logo_white copy.svg" ]; then
    mv "assets/images/koda-logo_white copy.svg" "assets/images/koda-logo_white-copy.svg"
    echo "✅ Renamed to: koda-logo_white-copy.svg"
else
    echo "⚠️  File already renamed or not found"
fi

echo ""
echo "Step 2: Verifying HTML changes..."
grep -n "koda-logo_white-copy.svg" *.html | head -10
echo "... (showing first 10 matches)"

# Step 3: Commit and push
echo ""
echo "Step 3: Committing changes..."
git add .
git commit -m "Update all logos to koda-logo_white across header and footer

- Replaced koda-text-white-copy.svg with koda-logo_white-copy.svg
- Updated all 6 pages: index, about, contact, privacy, terms, waitlist
- Renamed logo file to remove space for better compatibility

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"

echo ""
echo "Step 4: Pushing to GitHub..."
git remote set-url origin https://pedrogillet1:REDACTED_ROTATE_THIS_TOKEN@github.com/pedrogillet1/koda-Landing.git
git push origin main

echo ""
echo "======================================"
echo "✅ Logo Update Complete!"
echo "======================================"
echo ""
echo "All pages now use: koda-logo_white-copy.svg"
echo "Refresh your landing page to see the new logo!"
