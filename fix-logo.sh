#!/bin/bash

echo "🔧 Fixing Koda logo issue..."
echo ""

cd /Users/alvarocamasmie/Downloads/landing

# Step 1: Rename the file to remove the space
echo "Step 1: Renaming logo file (removing space)..."
if [ -f "assets/images/koda-text-white copy.svg" ]; then
    mv "assets/images/koda-text-white copy.svg" "assets/images/koda-text-white-copy.svg"
    echo "✅ Renamed to: koda-text-white-copy.svg"
else
    echo "⚠️  File not found or already renamed"
fi

# Step 2: Update all HTML files
echo ""
echo "Step 2: Updating HTML files..."

# Update index.html
sed -i '' 's|assets/images/koda-text-white%20copy.svg|assets/images/koda-text-white-copy.svg|g' index.html
sed -i '' 's|assets/images/koda-text-white copy.svg|assets/images/koda-text-white-copy.svg|g' index.html

# Update about.html
sed -i '' 's|assets/images/koda-text-white%20copy.svg|assets/images/koda-text-white-copy.svg|g' about.html
sed -i '' 's|assets/images/koda-text-white copy.svg|assets/images/koda-text-white-copy.svg|g' about.html

# Update contact.html
sed -i '' 's|assets/images/koda-text-white%20copy.svg|assets/images/koda-text-white-copy.svg|g' contact.html
sed -i '' 's|assets/images/koda-text-white copy.svg|assets/images/koda-text-white-copy.svg|g' contact.html

# Update privacy.html
sed -i '' 's|assets/images/koda-text-white%20copy.svg|assets/images/koda-text-white-copy.svg|g' privacy.html
sed -i '' 's|assets/images/koda-text-white copy.svg|assets/images/koda-text-white-copy.svg|g' privacy.html

# Update terms.html
sed -i '' 's|assets/images/koda-text-white%20copy.svg|assets/images/koda-text-white-copy.svg|g' terms.html
sed -i '' 's|assets/images/koda-text-white copy.svg|assets/images/koda-text-white-copy.svg|g' terms.html

# Update waitlist.html
sed -i '' 's|assets/images/koda-text-white%20copy.svg|assets/images/koda-text-white-copy.svg|g' waitlist.html
sed -i '' 's|assets/images/koda-text-white copy.svg|assets/images/koda-text-white-copy.svg|g' waitlist.html

echo "✅ All HTML files updated"

# Step 3: Commit changes
echo ""
echo "Step 3: Committing changes..."
git add .
git commit -m "Fix logo display: rename file to remove space

- Renamed 'koda-text-white copy.svg' to 'koda-text-white-copy.svg'
- Updated all HTML references to use hyphen instead of space
- This fixes logo loading issues across all pages"

# Step 4: Push to GitHub
echo ""
echo "Step 4: Pushing to GitHub..."
git remote set-url origin https://pedrogillet1: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@github.com/pedrogillet1/koda-Landing.git
git push origin main

echo ""
echo "======================================"
echo "✅ Logo Fixed and Pushed!"
echo "======================================"
echo ""
echo "The logo should now display correctly!"
echo "Refresh your page: https://landingfrontend.ngrok.app"
