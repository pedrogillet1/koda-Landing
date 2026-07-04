# /pricing.html — pre-rewrite audit

**Date:** 2026-06-18

## Files used by /pricing.html

- `pricing.html` (461 lines)
- `pages/pricing.css` (287 lines)
- Inline `<style>` blocks (none — uses inline `style=` attributes in section markup)
- Shared CSS: `allybi-tokens.css`, `allybi-base.css`, `allybi-components.css`, `allybi-header.css`, `allybi-footer.css`, `allybi-responsive.css`
- Shared JS: `language-switcher.js`, `allybi-header.js`, `allybi-animations.js`
- Inline `<script>` at the bottom (lines 455–458) implementing accordion toggle
- `data-i18n-key` attributes throughout — translation strings live in `translations/pt.json` (and en/es), patched in place by `language-switcher.js`

## Current structure (line ranges)

| Lines | Block | Notes |
|---|---|---|
| 1–32 | `<head>` | Title, meta description, OG, fonts, CSS includes |
| 35–73 | Global header | Reused on every page |
| 75–110 | Mobile menu | Reused |
| 113 | `<main>` open | |
| 118–159 | `.pricing-hero` | 2-col hero: left = eyebrow "Preços" pill + H1 + sub + trust chips + secondary link; right = `.pricing-card` with name "Allybi" + green "30 dias grátis" badge + R$170 amount + period + price note + value blurb + 5 feature rows + reassurance microcopy |
| 164–178 | "O que entra no plano" | Short blurb with 5 anonymous bullets, no CTAs, no mockup |
| 183–267 | "O plano cobre o caminho inteiro" | Large white card containing 5-step numbered list AND inline product mockup. Cards "ANTES" and "COM ALLYBI" appear inside |
| 272–306 | "Como começar" | 5 numbered onboarding cards inside grey-bg section |
| 311–351 | FAQ | 8 questions, accordion-style with plus/minus SVG |
| 356–366 | Final CTA dark | "Comece com um fluxo real." + 2 buttons + small note |
| 370–448 | Global footer | Reused |
| 451–458 | Scripts | Includes inline FAQ JS at line 457 |
| 460–461 | Close tags | |

## Current CTAs (locations + hrefs)

| Section | Location | Text | Href |
|---|---|---|---|
| Hero secondary | line 134 | Ver como funciona → | `how-it-works.html` |
| Card primary (planel) | inside line 156 vicinity | (no real CTA — only `<p class="pricing-card__reassurance">` text!) | — |
| FAQ | none | none | — |
| Final CTA primary | line 361 | Começar grátis por 30 dias | `https://app.allybi.co/signup` |
| Final CTA secondary | line 362 | Ver como funciona | `how-it-works.html` |

**Critical findings:**
- **There is no primary trial CTA in the hero panel.** The panel ends with text only — no button. This is the single biggest conversion problem.
- The final CTA points to `app.allybi.co/signup`, **not** the spec-required `https://app.allybi.com.br`. (Server-side rewrite via `replaceAppOrigins` masks this, but source is wrong.)
- Hero secondary link uses relative `how-it-works.html`, not `/how-it-works.html`.

## Issues to fix (from screenshots in `qa-screenshots/pricing-before/`)

1. **R$170 repeated**: appears as `<strong>` at 48px in card AND in centered subtitle "Teste grátis por 30 dias. Depois, R$170/mês. Cancele quando quiser." on hero. §55 mandates ≤2 occurrences (panel + FAQ Q1).
2. **5 trust chips with green dots** in hero left column. §11 requires no chip row — just one-line trust statement.
3. **"Preços" rendered as a pill** (background, padding). §6 forbids; §11 forbids pill/border/background on eyebrow.
4. **"O plano cobre o caminho inteiro" inside one giant white card** that wraps numbered list + mockup. §4 mandates removal of "grande caixa branca externa."
5. **"ANTES" / "COM ALLYBI" comparison cards** present inside that section. §38 mandates full removal.
6. **5 onboarding cards** with numbered circles. §4 mandates removal; §39 mandates exactly 3 steps.
7. **FAQ Q1**: "O que acontece depois dos 30 dias?" — does not match §42 Q1 "Quanto custa o Allybi?" with R$170 in answer.
8. **No stepper interaction** in path section. §28 mandates user-controlled stepper with 5 states (Conecte/Pergunte/Confirme/Revise/Envie), initial active = "Confirme".
9. **Mobile**: hero displays as desktop with smaller fonts (no recomposition); trust chips wrap awkwardly; card sits below copy at full width.
10. **Final CTA H2**: "Comece com um fluxo real." — does not match §45 "Teste o caminho inteiro por 30 dias."
11. **Final CTA note**: "Depois R$170/mês. Cancele quando quiser." — repeats R$170 a 3rd time. §55 forbids.
12. **No tablet-specific treatment** (768–1099).
13. **No reduced-motion override scoped to pricing**; relies on global rule.

## Cards present (each must be removed per §4)

- 1× hero pricing card (`.pricing-card`)
- 2× "ANTES / COM ALLYBI" comparison cards inside path section
- 5× onboarding numbered cards
- 5× feature card-shaped rows inside hero `.pricing-card__features`

## Mockups present

- 1× inline static mockup inside the path section (no states, no stepper, no interactivity)
- No real product proof in any other section

## Banned terms found (grep)

- `Sem demo` — line 126: "Sem demo. Nada sai sem confirmação." — kept conceptually (rephrase as "Sem demo obrigatória" per §8)
- `app.allybi.co` — line 361 — needs replacement
- `&rarr;` — line 134 — replace with proper arrow

## Files that will be altered

| Path | Action |
|---|---|
| `pricing.html` | full main rewrite (lines 113–368); preserve head/header/mobile-menu/footer/scripts |
| `pages/pricing.css` | full rewrite |
| New: `assets/pricing-page.js` | stepper + FAQ controller |
| `pricing.html` `<head>` meta description | replace per §54 |

## Files NOT altered

- Global header (`allybi-header.css`, `allybi-header.js`, lines 35–73 + 75–110 of pricing.html)
- Global footer (`allybi-footer.css`, lines 370–448)
- Design tokens (`allybi-tokens.css`)
- Base styles (`allybi-base.css`)
- Shared components (`allybi-components.css`)
- Responsive sweeps (`allybi-responsive.css`)
- All other `.html` pages

## Baseline screenshots

`qa-screenshots/pricing-before/` — 11 viewports captured (full-page) per §3:

`360x640`, `360x740`, `390x844`, `430x932`, `768x1024`, `1024x768`, `1280x800`, `1366x768`, `1440x900`, `1920x1080`, `2048x1280`.
