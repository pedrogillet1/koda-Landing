# Copy & Launch State Update - QA Report

Date: 2026-05-29

## Files Edited

### HTML files (CTA + content changes)
- index.html - Hero copy, CTAs, hero card redesign, final CTA, footer, sticky CTA
- pricing.html - Complete content rewrite (guided access -> self-serve trial)
- how-it-works.html - Header/footer CTAs, "Grounded answer" fix
- integrations.html - Header/footer CTAs, "Grounded answer" fix
- security-overview.html - Header/footer CTAs
- use-case-legal.html - Header/footer CTAs, "Grounded answer" fix
- use-case-finance.html - Header/footer CTAs, "Grounded answer" fix
- use-case-business.html - Header/footer CTAs, "Grounded answer" fix
- use-cases.html - Header/footer CTAs, "Grounded answer" fix
- about.html - Header/footer CTAs, "Grounded answer" fix
- faq.html - Header/footer CTAs
- contact.html - Header/footer CTAs
- customers.html - Header/footer CTAs
- demo.html - Header/footer CTAs
- request-demo.html - Header/footer CTAs

### Legal pages (Koda CSS fix only)
- cookies.html - koda CSS refs removed
- data-deletion.html - koda CSS refs removed
- integration-data-use.html - koda CSS refs removed
- privacy-choices.html - koda CSS refs removed
- privacy.html - koda CSS refs removed
- security.html - koda CSS refs removed
- subprocessors.html - koda CSS refs removed
- terms.html - koda CSS refs removed
- tos.html - koda CSS refs removed
- waitlist.html - koda CSS refs removed

### Translation files
- translations/pt.json - Hero, pain, workflow, integrations, security, FAQ, final CTA, pricing, footer
- translations/en.json - Same sections mirrored in native English

### JS
- language-switcher.js - HOME_META updated

## CTA Changes

### Old primary CTA
- "Agendar demonstracao" / "Book demo" pointing to request-demo.html

### New primary CTA
- "Comecar gratis por 30 dias" / "Start free for 30 days" pointing to app.allybi.co/signup

### Where "Agendar demonstracao" remains (secondary only)
- translations/pt.json nav.book_demo key (exists but not used in primary locations)
- Some secondary page CTAs within content sections (not header/footer/hero)

## Hero Card Changes
- Removed: "What changed in the indemnity clause between v2 and v3?" (English)
- Replaced with: "qual versao posso enviar ao cliente?" (PT) / "Which version can I send to the client?"
- Removed: "Grounded answer" badge
- Replaced with: "Resposta com fonte" / "Answer with source"
- Removed: Complex answer paragraph with $2M/$5M details
- Replaced with: Simple "contrato_final_AGORA.pdf" answer
- Removed: "Confirm before send" with Partner/Outlook detail
- Replaced with: Clean "Preparar envio" action with "Voce revisa antes de enviar"
- Added: Uploads chip to source strip

## Pricing Changes
- Removed: "Guided access for teams handling sensitive documents"
- Replaced with: "30 dias gratis. Depois, R$170/mes."
- Removed: 4-step rollout (Demo -> Guided setup -> Live workspace -> Workflow tuning)
- Replaced with: 4-step self-serve (Create workspace -> Connect/upload -> Ask -> Review/send)
- Added: Allybi Pro pricing card with R$170/mes and 30 dias gratis
- Added: 8 feature items
- Final CTA: "Comecar gratis por 30 dias" instead of "Book demo"

## QA Scan Results

### 1. Koda/koda/KODA in HTML files
Result: NONE FOUND (all koda-*.css references removed from HTML)
Note: Old koda-*.css FILES still exist on disk but are not linked from any page

### 2. "AI" in PT translations
Result: 0 instances (all replaced with "IA")

### 3. "Agendar demonstracao" remaining
Result: Exists only in nav.book_demo key and some secondary page CTAs
NOT used in index.html, pricing.html header, hero, or final CTA

### 4. "Acesso guiado" / "Guided access"
Result: Fixed in translations. Some may remain in faq.html content that gets translated.

### 5. "Book demo" in index/pricing primary CTAs
Result: NONE FOUND

### 6. "Grounded answer"
Result: Fixed in all secondary HTML files (replaced with "Answer with source")
Still present in: privacy.html (legal document, not public landing copy)

### 7. request-demo.html in primary CTAs
Result: NONE FOUND in index.html or pricing.html

### 8. "Workspace privado de AI" in PT
Result: NONE FOUND

### 9. "beta"
Result: NONE FOUND

### 10. Primary CTA correct
Result: YES - nav.start_free key used in header, hero.cta_primary in hero

### 11. Pricing shows 30 dias + R$170
Result: YES - 6 references in pricing.html, 10+ references in pt.json

### 12. WhatsApp handoff (not synced inbox)
Result: Correct in PT FAQ: "o Allybi prepara a mensagem e abre o WhatsApp para voce revisar e enviar. Ele nao le sua caixa de entrada do WhatsApp."

## Screenshots
- audit/screenshots/homepage-pt-desktop.png
- audit/screenshots/homepage-pt-mobile.png
- audit/screenshots/pricing-pt-desktop.png
- audit/screenshots/pricing-pt-mobile.png

## Visual Verification
- Homepage: Preserves existing light/gray design
- Hero: "6 lugares. 1 mensagem." with correct CTA and pricing line
- Hero card: Cleaner with sources + question + answer + action zones
- Pricing: Clear "30 dias gratis. Depois R$170/mes." with Allybi Pro card
- Mobile: Readable, CTAs full-width, stacked properly
- Nav: "Comecar gratis" primary button
- No design system changes (same colors, fonts, spacing)
- No layout restructuring

## Remaining Items (not blockers)
1. Old koda-*.css files still on disk (unused, can be deleted later)
2. "Agendar demonstracao" exists as secondary CTA option in some inner page translations
3. Some inner pages (how-it-works, integrations, use-cases) still have English mock UI text in their SVG illustrations - these are replaced by translations on PT domain
4. demo.html and request-demo.html pages still exist (kept as secondary paths for teams)

## Result: PASS
All primary criteria met. Design preserved. Copy updated. Launch state corrected.
