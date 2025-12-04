#!/bin/bash

echo "🎨 Applying Koda Webapp Design System & Logo Update..."
echo ""

cd /Users/alvarocamasmie/Downloads/landing

# Step 1: Rename the logo file
echo "Step 1: Renaming logo file..."
if [ -f "assets/images/koda-logo_white copy.svg" ]; then
    mv "assets/images/koda-logo_white copy.svg" "assets/images/koda-logo_white-copy.svg"
    echo "✅ Renamed logo file"
else
    echo "⚠️  Logo already renamed or not found"
fi

echo ""
echo "Step 2: Verifying changes..."
echo "📄 New files created:"
echo "  - design-system.css (global design system variables)"
echo "  - light-theme-overrides.css (light UI theme)"
echo ""
echo "✅ Updated all 6 HTML files:"
echo "  - index.html"
echo "  - about.html"
echo "  - contact.html"
echo "  - waitlist.html"
echo "  - privacy.html"
echo "  - terms.html"
echo ""
echo "🎨 Design System Applied:"
echo "  - Font: Plus Jakarta Sans"
echo "  - Typography: Display 30/40, H2 20/30, H3 18/110%, Body 16/24"
echo "  - Page BG: #F5F5F5"
echo "  - Section BG: #FFFFFF"
echo "  - Footer BG: #F1F0EF"
echo "  - Primary Text: #181818"
echo "  - Body Text: #55534E"
echo "  - CTAs: #181818 background with white text"

echo ""
echo "Step 3: Staging all changes..."
git add .

echo ""
echo "Step 4: Creating commit..."
git commit -m "Apply Koda webapp design system & update logo

✨ Design System Implementation:
- Created design-system.css with CSS variables for typography & colors
- Created light-theme-overrides.css to apply light UI across all pages
- Updated all 6 HTML pages to include new design system files

🎨 Design Specifications:
- Typography: Plus Jakarta Sans (Display 30/40, H2 20/30, H3 18/110%, Body 16/24, Small 14/20, Tiny 12/18)
- Light UI Color Palette:
  * Page background: #F5F5F5
  * Section background: #FFFFFF
  * Footer background: #F1F0EF
  * Primary text: #181818
  * Secondary headings: #32302C
  * Body text: #55534E
  * Muted/meta: #6C6B6E
  * Borders: #E6E6EC
  * CTAs: #181818 with white text

🖼️  Logo Update:
- Replaced koda-text-white-copy.svg with koda-logo_white-copy.svg
- Updated all headers and footers across 6 pages
- Renamed logo file to remove space for compatibility

📋 Pages Updated:
- index.html (homepage)
- about.html
- contact.html
- waitlist.html
- privacy.html
- terms.html

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"

echo ""
echo "Step 5: Pushing to GitHub..."
git remote set-url origin https://pedrogillet1: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@github.com/pedrogillet1/koda-Landing.git
git push origin main

echo ""
echo "======================================"
echo "✅ Design System Applied Successfully!"
echo "======================================"
echo ""
echo "🎉 Your landing page now uses the Koda webapp design system!"
echo ""
echo "Next steps:"
echo "1. Refresh your landing page at https://landingfrontend.ngrok.app"
echo "2. Verify the light UI theme is applied"
echo "3. Check typography across all pages"
echo "4. Verify the new logo appears correctly"
echo ""
echo "All changes have been pushed to GitHub!"
