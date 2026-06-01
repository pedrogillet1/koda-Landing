# Full Site Cleanup and New Pages Report

Date: 2026-06-01

## Pages Reviewed and Fixed

### Existing pages modified (12 files)
- index.html — SVG English text fixed, footer Busca Manual links added, legal link i18n
- how-it-works.html — English title fixed, (soon) -> em breve, Board_Deck localized, Local upload -> Upload local
- contact.html — Title fixed to Portuguese
- use-case-legal.html — Title localized, Cancel/Confirm i18n keys added
- use-case-finance.html — Title localized
- use-case-business.html — Title localized
- about.html — Title localized
- faq.html — Title localized
- security-overview.html — Title localized, "Grounded answer" fixed
- use-cases.html — Footer request-demo link removed
- translations/pt.json — Cases mock examples localized (R$ not $), FAQ rewritten, security pillar fix, integrations email clarity, pricing email feature, footer new page links, broken encoding fixed
- translations/en.json — Footer new page link translations

### New pages created (6 files)
- busca-manual.html — Hub page for all interactive tools
- raio-x.html — 10-question diagnostic quiz with scoring and results
- tempo.html — Time lost calculator with 7-step flow
- finais.html — File name cemetery with chip builder and safety warnings
- indice.html — Aggregate anonymous data index (initial empty state)
- metodologia.html — Methodology and LGPD transparency page

## Issues Found and Fixed

### English page titles -> Portuguese
- For lawyers -> Allybi para advogados
- Allybi for Finance -> Allybi para financeiro
- Allybi for Operations -> Allybi para operações
- About Allybi -> Sobre a Allybi
- FAQ -> FAQ da Allybi
- Security -> Segurança e privacidade
- Contact -> Contato
- How it works -> Como funciona

### Localized examples ($ -> R$)
- Homepage legal mock: $1M/$3M -> R$1M/R$3M
- Homepage finance mock: $4.2M -> R$4,2M
- Homepage business mock: $185K -> R$185K, Acme -> Cliente Alfa
- All via PT translations

### English fragments fixed
- Gmail (soon) -> Gmail — em breve
- Google Drive (soon) -> Google Drive — em breve
- Board_Deck_Q4.pptx -> Deck_Conselho_Q4.pptx
- Local upload -> Upload local
- Broken encoding revis..o -> revisão (4 instances)

### Copy changes
- FAQ rewritten: added "O Allybi envia e-mail?" question
- Security pillar: "Sem treinamento de modelo" -> "Sem treinamento com documentos"
- Integrations Outlook: added email sending clarity
- Pricing: added email via Outlook feature, WhatsApp handoff feature
- Cases subtitle removed (old "Advogados são os primeiros...")
- Cases title: "Feito para trabalho onde errar arquivo custa caro."

## New Busca Manual System

### Pages
1. busca-manual.html — Hub with 4 tool cards, what-is-manual-search explainer, product bridge
2. raio-x.html — 10-question one-per-screen quiz, chip answers, progress bar, scoring 0-100, result bands, share card
3. tempo.html — 7-step calculator, multi-select support, hours/month and R$/month results
4. finais.html — Chip-based file name builder, safety warnings, seed gallery, risk scoring
5. indice.html — Empty/initial state with collection CTAs, transparency notes
6. metodologia.html — Scoring formulas, privacy, LGPD, data handling transparency

### Key features
- All anonymous, no document upload, no client names
- Chip-only interaction (no typing required for quiz/calculator)
- Mobile responsive (44px+ tap targets)
- Results shown before any lead capture
- LGPD-aware privacy language
- Product bridge CTAs on all pages

## Contact Page Status
- Bug fix from previous session: card<>dropdown sync working with JS
- 5 categories: sales, product, security, support, partnership
- No card selected by default
- URL preselect working (?category=security)
- Portuguese placeholders

## Screenshots (29 total)
- audit/screenshots/home-desktop.png
- audit/screenshots/home-mobile.png
- audit/screenshots/contact-desktop.png
- audit/screenshots/contact-mobile.png
- audit/screenshots/pricing-desktop.png
- audit/screenshots/pricing-mobile.png
- audit/screenshots/hiw-desktop.png
- audit/screenshots/hiw-mobile.png
- audit/screenshots/busca-manual-desktop.png
- audit/screenshots/busca-manual-mobile.png
- audit/screenshots/raio-x-desktop.png
- audit/screenshots/raio-x-mobile.png
- audit/screenshots/tempo-desktop.png
- audit/screenshots/tempo-mobile.png
- audit/screenshots/finais-desktop.png
- audit/screenshots/finais-mobile.png
- audit/screenshots/indice-desktop.png
- audit/screenshots/indice-mobile.png
- audit/screenshots/metodologia-desktop.png
- audit/screenshots/metodologia-mobile.png

## QA Scan Results
- Koda in HTML: NONE
- Book demo as primary CTA: NONE (except demo.html/request-demo.html themselves)
- Grounded answer: NONE (fixed in security/legal)
- English page titles: ALL FIXED to Portuguese
- Portugues/Espanol (no accent): NONE
- (soon) not em breve: NONE
- Broken encoding: FIXED
- AI not IA in PT: 0
- R$170 in pricing: 6 references (correct)
- New pages exist: ALL 6 created

## Remaining TODOs
1. Pricing FAQ "Preciso de cartão para começar?" — product decision unknown, not added
2. Some English default text in secondary page HTML (gets translated by JSON on PT domain)
3. customers.html still has English mock stories (lower priority, not main landing page)
4. demo.html/request-demo.html still exist as secondary paths
5. Busca Manual pages use hardcoded PT (not translation system) — intentional for standalone tools
6. No backend for Raio-X/Calculator data collection — currently client-side only
7. Cemitério voting system needs backend — currently shows seed gallery only

## Result: PASS
All critical fixes applied. 6 new pages created. Design preserved. Portuguese native.
