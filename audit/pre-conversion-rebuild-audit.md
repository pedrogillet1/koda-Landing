# Pre-Conversion Rebuild Audit

Date: 2026-06-02

## Tool Pages — Need Rebuild
- finais.html: Static, not fun, no random generator, accent issues (27 lines)
- raio-x.html: "??" placeholder visible, 10 questions too long, accent issues (11 lines)
- tempo.html: Good direction but accent issues (9 lines)
- busca-manual.html: Generic hub, accent issues (7 lines)
- indice.html: Empty/boring with 0 data, accent issues (8 lines)
- metodologia.html: Dry, accent issues (14 lines)

## English Defaults in i18n Elements
- index.html: $4.2M, $185K, Board_Deck, Acme in data-i18n-key elements (PT translation overrides)
- how-it-works.html: "What are" in mock query (PT translation overrides)
- use-case pages: "erode", "quarter-over-quarter" in HTML defaults

## Translation Issues
- "workspace privado" appears 3x in pt.json — needs replacement
- "erode" in en.json use-case pages

## Legal Pages — PASS
- All 6 have Portuguese chrome, clean layout
- Legal content in English with review notice

## Homepage
- "Business" tab needs "Operações" in cases section
- Duplicate trust discussed in prior passes

## Verdict: Rebuild tool pages, fix accents, fix translations
