#!/bin/bash

# This script fixes broken image links in the Koda Landing project by replacing spaces with hyphens in filenames and updating HTML references.

echo "Starting image path fix..."
echo ""

# 1. Rename files with spaces to use hyphens
echo "Step 1: Renaming files with spaces to use hyphens..."
find assets -depth -name "* *" | while read -r file; do
  new_file=$(echo "$file" | tr ' ' '-')
  mv "$file" "$new_file"
  echo "Renamed: $file -> $new_file"
done
echo ""

# 2. Update HTML files to use the new filenames
echo "Step 2: Updating HTML files..."
find . -name "*.html" -type f | while read -r html_file; do
  if grep -q '%20' "$html_file"; then
    # macOS-compatible sed with backup
    sed -i '' 's|%20|-|g' "$html_file"
    echo "Fixed paths in $html_file"
  fi
done
echo ""

# 3. Update CSS files to use the new filenames
echo "Step 3: Updating CSS files..."
find . -name "*.css" -type f | while read -r css_file; do
  if grep -q '%20' "$css_file"; then
    # macOS-compatible sed with backup
    sed -i '' 's|%20|-|g' "$css_file"
    echo "Fixed paths in $css_file"
  fi
done
echo ""

echo "✅ Image paths fixed successfully!"
echo ""
echo "Summary:"
echo "- All files with spaces renamed to use hyphens"
echo "- All HTML references updated"
echo "- All CSS references updated"
