#!/bin/bash

echo "🎨 Updating all logos to koda-logo_white..."
echo ""

cd /Users/alvarocamasmie/Downloads/landing

# Step 1: Rename the file to remove space
echo "Step 1: Renaming logo file..."
if [ -f "assets/images/koda-logo_white copy.svg" ]; then
    mv "assets/images/koda-logo_white copy.svg" "assets/images/koda-logo_white-copy.svg"
    echo "✅ Renamed to: koda-logo_white-copy.svg"
else
    echo "⚠️  File already renamed or not found"
fi

# Step 2: Update all HTML files to use the new logo
echo ""
echo "Step 2: Updating all HTML files..."

# Update index.html
sed -i '' 's|src="assets/images/koda-text-white-copy.svg"|src="assets/images/koda-logo_white-copy.svg"|g' index.html
echo "✅ Updated index.html"

# Update about.html
sed -i '' 's|src="assets/images/koda-text-white-copy.svg"|src="assets/images/koda-logo_white-copy.svg"|g' about.html
echo "✅ Updated about.html"

# Update contact.html
sed -i '' 's|src="assets/images/koda-text-white-copy.svg"|src="assets/images/koda-logo_white-copy.svg"|g' contact.html
echo "✅ Updated contact.html"

# Update privacy.html
sed -i '' 's|src="assets/images/koda-text-white-copy.svg"|src="assets/images/koda-logo_white-copy.svg"|g' privacy.html
echo "✅ Updated privacy.html"

# Update terms.html
sed -i '' 's|src="assets/images/koda-text-white-copy.svg"|src="assets/images/koda-logo_white-copy.svg"|g' terms.html
echo "✅ Updated terms.html"

# Update waitlist.html
sed -i '' 's|src="assets/images/koda-text-white-copy.svg"|src="assets/images/koda-logo_white-copy.svg"|g' waitlist.html
echo "✅ Updated waitlist.html"

echo ""
echo "Step 3: Verifying changes..."
grep -n "koda-logo_white-copy.svg" *.html | head -10
echo "... (showing first 10 matches)"

# Step 4: Commit and push
echo ""
echo "Step 4: Committing changes..."
git add .
git commit -m "Update logo to koda-logo_white across all pages

- Replaced koda-text-white-copy.svg with koda-logo_white-copy.svg
- Updated header and footer logos on all 6 pages
- Renamed file to remove space for better compatibility"

echo ""
echo "Step 5: Pushing to GitHub..."
git remote set-url origin https://pedrogillet1:REDACTED_ROTATE_THIS_TOKEN@github.com/pedrogillet1/koda-Landing.git
git push origin main

echo ""
echo "======================================"
echo "✅ Logo Updated Successfully!"
echo "======================================"
echo ""
echo "All pages now use: koda-logo_white-copy.svg"
echo "Refresh your page to see the new logo!"
