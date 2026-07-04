# Use Cases Pre-Audit (v2 rebuild)

Date: 2026-07-03. Scope: `/use-case-legal.html`, `/use-case-finance.html`, `/use-case-business.html` (operations).

Evidence labels: **Verified** = read from file/command output; **Inference** = derived; **Not checked** = pending.

> Note: this replaces a stale 2026-06-19 audit that described an older 2-column/feature-card/security-card structure. The current live pages use a newer vertical-prefixed structure (documented below from a fresh grep).

## Before-screenshots

**Verified.** Full-page screenshots at 12 viewports per page:
`qa-screenshots/use-cases-before/{legal,finance,operations}/{WxH}.png` — 12 each, 36 total.
Viewports: 360×640, 360×740, 390×844, 430×932, 768×1024, 1024×768, 1100×800, 1280×800, 1366×768, 1440×900, 1920×1080, 2048×1280.

## Current sections (Verified, from markup)

| Page | Sections (in order) |
|---|---|
| legal | `legal-hero`, `legal-version-risk`, `legal-clause`, `legal-review`, `legal-moments`, `legal-control`, `legal-final` |
| finance | `finance-hero`, `finance-provenance`, `finance-comparison`, `finance-meeting-ready`, `finance-moments`, `finance-control`, `finance-final` |
| operations (business) | `operations-hero`, `operations-context-chain`, `operations-scope`, `operations-channel`, `operations-moments`, `operations-control`, `operations-final` |

Shared header + `mobile-menu` + footer present on all three. Per-page CSS: `pages/use-case-{legal,finance,business}.css` (Verified from `<link>`s).

## Current product mockups / images (Verified)

- Only image referenced per page is `assets/images/allybi-logo.svg` (header/footer/menu).
- **No product PNG screenshots exist.** All product examples are **hand-drawn in landing HTML/CSS**. Spec forbids this (§5, §2) — product visuals must be generated in the webapp screenshot system and embedded as `<picture>` PNGs.

## Structure gaps vs target spec (each target page needs 4 image sections)

- **Legal:** current 3 image sections (`version-risk`, `clause`, `review`); target §20 needs **4**: version-risk (01), clause-answer (02), **clause-diff (03)**, review (04). → add clause-diff; split clause into answer + diff.
- **Finance:** current `provenance`, `comparison`, `meeting-ready`; target §23 needs **4**: **meeting-brief (01)**, provenance (02), period-compare (03), review (04). → add meeting-brief.
- **Operations:** current `context-chain`, `scope`, `channel`; target §26 needs **4**: **request-thread (01)**, context-chain (02), scope-answer (03), channel-review (04). → add request-thread.

## Copy problems (Verified)

- Em dash `—` present (forbidden §43): finance ×1 (line 197), operations ×2 (lines 227, 251). Legal ×0.
- No other §43 forbidden terms found in current markup (checked: Koda, Allybi Pro, Falar com vendas, Agendar/book demo, criptografad*, workspaces isolados, 100% seguro, zero-knowledge, WhatsApp-as-source, "com respostas com fonte", etc.). Re-verified after rebuild.

## Visual problems to fix (per spec)

- Replace all hand-drawn product mockups with webapp PNGs (§5–§6).
- Remove any hero right-side image / two-column hero (§18). Current heroes are `*-hero`; rebuild replaces them wholesale with the shared single-column hero (§18–§19).
- Screenshots must carry NO card/border/shadow/radius/padding/background wrapper (§17, §29, §39).

## Mobile problems

- **Not checked in detail.** Before-screenshots captured at 360/390/430 widths for reference. Rebuild applies mandated mobile hero/section rules (§19, §31) and mobile-specific PNGs; after-QA will assert no horizontal overflow and mobile `currentSrc`.

## Repeated structures

- Pages already use vertical-prefixed classes and per-page CSS; **no generic `UseCasePage` template exists** (§46 satisfied). Rebuild keeps vertical prefixes; shared primitives limited to buttons/container/image-helper/header/footer (§46).

## Files to edit / create

**Landing:** `use-case-legal.html`, `use-case-finance.html`, `use-case-business.html` (full rebuild); `pages/use-case-{legal,finance,business}.css` (rebuild) + shared `pages/use-cases-shared.css`; assets `assets/landing-shots/use-cases-v2/{legal,finance,operations}/` (24 PNGs).

**Webapp:** `public/marketing-assets/upload-formats.svg` (copy from `/Users/alvarocamasmie/Downloads/Group 246 (3).svg`); dev-only route `/__marketing__/use-case-shots` + `UseCaseShotsPage`; `scripts/capture-use-case-shots.js`.

**Reused unchanged:** `allybi-*.css`, `pages/home.css`, header/footer/JS, design tokens.

## Gate

Pre-audit complete → implementation may proceed. Phase A (webapp screenshots) before Phase B (landing).
