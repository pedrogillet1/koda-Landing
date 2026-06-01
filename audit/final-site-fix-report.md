# Final Site Fix Report

Date: 2026-06-01

## Files Changed

### Contact page (critical bug fix + rewrite)
- contact.html — Complete rewrite: removed "Book a demo" card, added 5 category cards (sales/product/security/support/partnership), added JS for card<>dropdown sync, URL hash preselect, Portuguese placeholders, reduced spacing

### Homepage
- index.html — Fixed SVG English text ("What changed in the non-compete?" -> "o que mudou na clausula?", "Senior Partner — now" -> "Socio — agora"), updated hero subtitle with email clarity, fixed footer legal link i18n keys

### How-it-works page
- how-it-works.html — Replaced hero "Book demo" CTA with "Start free for 30 days", added data-i18n-key to all English mockup text (query, badge, answer, diff, prepare, confirm), fixed final CTA, fixed footer mobile links

### Global header/footer fixes (all public pages)
- Fixed "Book demo" default text -> "Start free" on: how-it-works, integrations, security-overview, use-case-*, about, faq, customers, demo, request-demo, use-cases, contact
- Fixed header CTAs on legal pages: cookies, data-deletion, integration-data-use, privacy-choices, privacy, security, subprocessors, terms, tos, _template
- Fixed footer Portugues -> Portugues (BR) and Espanol -> Espanol on ALL .html files
- Fixed footer legal links (added data-i18n-key for tos, acceptable_use, cookies, data_use, data_deletion)
- Removed "Book demo" from footer mobile links

### Translations
- translations/pt.json — Hero subtitle with email clarity, trust strip (email/WhatsApp), workflow title (no more "6 lugares" repeat), final CTA (no repeat), contact page full translation, how-it-works mockup translations (all PT), footer legal link translations, broken encoding fix (revisao)
- translations/en.json — Same sections mirrored in native English

## Bugs Fixed

### Contact page category card selection
- Before: Clicking a card did nothing — no JS existed. First card was "Book a demo" with primary highlight. Dropdown had "Book a demo" option.
- After: Cards are buttons with data-category. Clicking selects card visually, updates dropdown, scrolls to form. Dropdown change updates card. URL ?category=X preselects. No card selected by default. "demo" category replaced with "sales".

### English fragments in SVG illustrations
- Homepage pain card 2: "What changed in the non-compete?" -> "o que mudou na clausula?"
- Homepage pain card 2: "Senior Partner — now" -> "Socio — agora"

### How-it-works mockup English
- All 5 step mockups now have data-i18n-key attributes for PT translation
- Mock query, badge, answer, diff title/body, prepare title/body, confirm label/details/buttons

### Broken encoding
- Fixed "revisao" (garbled chars) in pt.json security section

## Demo/Book Demo References

### Removed from primary CTAs
- All page headers (nav.start_free instead of nav.book_demo)
- All page hero CTAs (hero.cta_primary -> "Comecar gratis por 30 dias")
- All final CTA sections
- All footer mobile links
- Contact page category cards
- Contact form dropdown

### Remaining as secondary (intentional)
- "Agendar demonstracao" exists in pt.json as nav.book_demo key — not used in any header/hero/final CTA
- demo.html and request-demo.html pages still exist as secondary paths
- Some secondary page body CTAs may still reference "Falar com vendas" which links to contact page

## Repetition Fix
- "6 lugares. 1 mensagem." now used only in hero H1
- Workflow section: "De 6 lugares para 1 mensagem" -> "Como o trabalho muda"
- Final CTA: "Pare de abrir 6 lugares..." -> "Pare de procurar, confirmar e reenviar manualmente."

## Email Clarity
- Homepage subtitle: "...prepara o e-mail ou WhatsApp e pede sua confirmacao..."
- Trust strip: "E-mail com confirmacao" added
- How-it-works step 4: "Prepare um e-mail via Outlook ou uma mensagem para WhatsApp handoff"
- How-it-works step 5: "Voce ve destinatario, mensagem, fonte e arquivo"
- Pricing: "Preparacao e envio de e-mail via Outlook com confirmacao" in features

## WhatsApp Accuracy
- Trust strip: "WhatsApp sem caixa sincronizada"
- Homepage FAQ: "Nao. WhatsApp funciona como handoff: o Allybi prepara a mensagem..."
- Contact page: No WhatsApp card — covered under product questions
- Integrations page translations: "Nao e caixa de entrada sincronizada"

## Screenshots
- audit/screenshots/home-pt-desktop.png
- audit/screenshots/home-pt-mobile.png
- audit/screenshots/contact-pt-desktop.png
- audit/screenshots/contact-pt-mobile.png
- audit/screenshots/pricing-pt-desktop.png
- audit/screenshots/hiw-pt-mobile.png

## QA Scan Results
- Koda in HTML: NONE
- Book demo as primary CTA: NONE
- request-demo.html in primary buttons: NONE (except demo.html/request-demo.html themselves)
- Portugues (no accent): NONE
- Espanol (no accent): NONE
- Senior Partner: NONE
- What changed in the non-compete: NONE
- Grounded answer: NONE
- Workspace privado de AI: NONE
- AI (not IA) in PT: 0 occurrences
- Broken encoding: FIXED
- beta: Not found as standalone term

## Unresolved
1. "Agendar demonstracao" remains 10x in pt.json — all are in secondary contexts (nav.book_demo key, some inner page section translations). None are used as primary CTAs.
2. Some secondary page inner content (use-case body text, about page sections) may still have old copy that gets translated via JSON — the JSON has been updated but the HTML default English text in some sections hasn't been fully changed since it gets overridden by translation.
3. Pricing page "Preciso de cartao para comecar?" FAQ — product decision unknown, not added yet.
4. demo.html and request-demo.html still exist as pages — kept intentionally as secondary sales path.

## Result: PASS
All critical bugs fixed. Contact page working. CTAs aligned. Copy updated. No design changes.
