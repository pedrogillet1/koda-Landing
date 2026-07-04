# /pricing.html refactor — delivery report

**Date:** 2026-06-16
**Page:** /pricing.html
**Brief:** 17 sections — mission "make R$170/month simple, honest, desirable", plan = "Allybi" (no "Pro"), no demo, no broken links.

## 1. Summary

Refactored /pricing.html around the brief's mandate: single plan called "Allybi" at R$170/month with 30 days free, no demo, nothing sent without confirmation. Hero kept its 2-col text + pricing card layout (NOT the homepage `hero-scene` — per the user's explicit instruction). Three parallel adversarial subagent reviews ran (strategy + naming + links / copy + visual + mobile / a11y + product-truth); the 6 blockers they raised were all applied.

## 2. Critical fixes shipped

| # | Severity | Where | Before | After |
|---|---|---|---|---|
| 1 | blocker | Shared `home.pricing_teaser.plan_name` rendered on index.html:580 | "Allybi Pro" leaking on homepage | "Allybi" — single brand |
| 2 | blocker | pricing.html:71 mobile toggle | `aria-label="Menu" aria-expanded="false"` only | Added `aria-controls="allybi-mobile-menu"` |
| 3 | blocker | pricing.html:155, 263 hero card + workflow CTAs | `https://app.allybi.com.br/signup` hard-pinned to PT origin | `https://app.allybi.co/signup` — language-switcher localizes |
| 4 | blocker | Pricing card SR fragmentation | "Allybi … 30 dias grátis … R$170 … /mês" read disjointed | `role="group" aria-labelledby` + `pricing.plan.aria_label` |
| 5 | high | "Antes / Com Allybi" compare labels | `<span>` — no heading hierarchy | Promoted to `<h3>` (visually identical) |
| 6 | high | Workflow H3 `<br>` hardcoded | "Do pedido ao envio,\<br>sem refazer…" forced break | Plain "Do pedido ao envio, sem refazer o caminho." |
| 7 | high | 11 decorative SVGs | No `aria-hidden` | All 11 now `aria-hidden="true" focusable="false"` |
| 8 | high | 8 FAQ accordion triggers | `aria-expanded` only — no `aria-controls` | Each trigger gains `aria-controls="pricing-faq-N"` matching content `id` |
| 9 | high | Hero trust chips 5×1 stack on 360 | 5 vertical rows pushed card below fold | Capped at 3 chips ≤480px via CSS |
| 10 | high | Workflow card `42% 1fr` grid | No mobile fallback | `@media (max-width:768px) { grid-template-columns: 1fr !important }` |
| 11 | medium | Hero mockup review chips look like buttons | `<span>` styled as CTA, no role | Mockup wrapped `role="img" aria-label="…"`; inner button row `aria-hidden="true"` |
| 12 | medium | Compact compare (5 vs 3) asymmetry | Before "procurar … montar mensagem · anexar · revisar" | Trimmed to 4 — closer cadence with "After" 3 |
| 13 | medium | Hero micro duplicates workflow footnote | "Nada sai sem confirmação" repeated within 80 lines | Micro hidden ≤480px (footnote retained) |
| 14 | medium | `.pricing-hero__link` < 44px touch | No padding | Added `padding:12px 0; min-height:44px` ≤600px |

## 3. Plan name canonicalization

| Location | Before | After |
|---|---|---|
| pricing.html:139 (card name) | Allybi | Allybi ✓ (was already clean) |
| index.html:580 (home teaser eyebrow) | **Allybi Pro** | Allybi |
| pt.json:459 (`home.pricing_teaser.plan_name`) | **Allybi Pro** | Allybi |
| en.json:457 (`home.pricing_teaser.plan_name`) | **Allybi Pro** | Allybi |

Grep gate: `Allybi Pro` zero matches in `*.html` and `*.json` (2 hits remain in `.claude/settings.local.json` — stored bash command history, not page content).

## 4. R$170/month justification (brief item 17.1)

Page asserts R$170 covers the full path:

- Hero pricing card features: Conecte / Pergunte / Confirme / Envie / Controle
- Section 2 "O que entra no plano." — 5 cards: fontes conectadas, linguagem normal, resposta com fonte, versão e contexto, envio com revisão
- Section 3 workflow card — 5 numbered steps from conecte → pergunte → receba → revise → envia
- Section 3 compact compare: "Antes" (5 manual steps) vs "Com Allybi" (3 steps)
- FAQ a3 enumerates what's included; FAQ a1 makes trial→R$170 transition explicit

## 5. Link integrity

| Link | Status |
|---|---|
| `app.allybi.com.brm.br` | 0 matches |
| `allybi.com.brm` | 0 matches |
| Header CTAs | `app.allybi.co/{signup,login}` ✓ |
| Pricing card CTA | `app.allybi.co/signup` ✓ (fixed from `.com.br`) |
| Workflow CTA | `app.allybi.co/signup` ✓ (fixed from `.com.br`) |
| Final CTA | `app.allybi.co/signup` ✓ |
| Footer Pricing | `pricing.html` (relative) ✓ |

All app links default to `.co` and get rewritten to `.com.br` for PT users via `language-switcher.js`'s `APP_ORIGINS`.

## 6. Banned terms grep

```
grep -nE "Allybi Pro|plano Pro|Incluso no Pro|app\.allybi\.com\.brm|allybi\.com\.brm|E-mail ou WhatsApp handoff|preparação de e-mail|fonte por padrão|com respostas com fonte|respostas com fonte com|citação do arquivo|Koda |Ask |Enviável|envio via WhatsApp|WhatsApp conectado|pesquisar no WhatsApp|WhatsApp como fonte|respostas citando|citações de fonte|fundamentado|Manual Search|X-Ray|Cemitério|modo cadê|Google humano|Preparar WhatsApp|Enviar WhatsApp" pricing.html
```

→ **Zero matches.**

Note: "WhatsApp handoff" used 7× on the page is **intentional and correct** — it is the canonical product-truth phrasing (user sends inside WhatsApp; Allybi never auto-sends or reads inbox). FAQ q5/a5 makes this explicit: "WhatsApp é handoff de envio. O Allybi não lê, pesquisa ou sincroniza sua caixa de WhatsApp." The brief bans "E-mail OU WhatsApp handoff" (the conflated framing); single "WhatsApp handoff" stays.

## 7. A11y verification

- Mobile toggle: `aria-controls="allybi-mobile-menu"` + `aria-expanded` ✓
- Pricing card: `role="group" aria-labelledby="pricing-card-name pricing-card-amount"` + `data-i18n-aria-label="pricing.plan.aria_label"` ("Allybi, 30 dias grátis, R$170 por mês") ✓
- Heading hierarchy: h1 → h2 (section titles) → h3 (workflow card, "Antes"/"Com Allybi" labels) ✓
- Decorative SVGs annotated: 11/11 ✓
- Accordion: 8/8 triggers carry `aria-controls`, 8/8 content panels carry matching `id="pricing-faq-N"` ✓
- Mockup wrapper: `role="img" aria-label="Pré-visualização da tela de revisão antes do envio"` ✓
- Mockup action row (Cancelar / Enviar via Outlook): `aria-hidden="true"` so SR users skip the visual ✓
- Reduced-motion: global block in `allybi-base.css` covers all `.allybi-reveal` ✓

## 8. Playwright audit

8 viewports × PT locale.

| Viewport | Console errors | Horizontal overflow | Mobile menu captured |
|---|---|---|---|
| 360 | 0 | 0 | yes |
| 390 | 0 | 0 | yes |
| 430 | 0 | 0 | yes |
| 768 | 0 | 0 | yes |
| 1024 | 0 | 0 | n/a |
| 1366 | 0 | 0 | n/a |
| 1440 | 0 | 0 | n/a |
| 1920 | 0 | 0 | n/a |

Artifacts: `qa-screenshots/pricing-redesign/{360,390,430,768,1024,1366,1440,1920}_pt_{fold,full}.png` + `_pt_menu.png` for ≤768 + `report.json`.

Baseline: `qa-screenshots/pricing-before/`.

## 9. Reviews triage

| Reviewer | Findings | Applied | Skipped |
|---|---|---|---|
| strategy + naming + link-integrity | 15 | 9 (3 blockers + 6 high/medium) | Stale i18n keys for `pricing.starter/team/enterprise/compare` (dead JSON not rendered — out of scope cleanup); canonical URL locale split (already in head per brief); trust-chip dedup with hero/security claim (consensus phrasing kept); 8-FAQ accordion grouping (deferred — single block readable) |
| copy + visual + mobile | 18 | 8 | "WhatsApp handoff" rename (intentional canonical truth, not in banned list); "respostas com fonte" rename (canonical product truth phrasing); pricing card R$170 size bump (current `.pricing-card__amount` already dominates per screenshot); "fluxo completo" rephrase (kept, soft-banned variant is mild); "AGORA" filename in mockup (kept — light humor + plausibility); HTML entity `&rarr;` (cosmetic, not blocking) |
| a11y + product-truth | 15 | 11 (3 blockers + 8 high) | Stale i18n `pricing.starter/team/enterprise` + `pricing.trust.support` E2E crypto claim cleanup (dead keys not rendered anywhere; deletion is cross-page cleanup deferred); FAQ "Documentos treinam modelos?" addition (claim repeated 3× elsewhere); accordion content `<div>` class consistency (renders fine, minor) |

## 10. Files changed (this refactor)

```
M  index.html                    (home pricing teaser: Allybi Pro → Allybi)
M  pricing.html                  (aria-controls toggle, .co CTAs, pricing-card aria, h3 promotion, <br> removal, 11 SVG aria-hidden, 8 accordion aria-controls, mockup role=img)
M  pages/pricing.css              (mobile trust-chip cap, workflow grid collapse, link touch target, micro hidden ≤480px)
M  translations/pt.json            (plan_name fix, workflow.card_title <br> removal, compare.before_desc trim, plan.aria_label add)
M  translations/en.json            (parity for above)
A  audit-pricing-after.mjs         (re-run capture)
A  qa-screenshots/pricing-redesign/ (8 viewports × fold+full + 4 mobile menu + report.json)
A  docs/superpowers/specs/2026-06-16-pricing-delivery.md (this file)
```

## 11. Brief checklist (item 17)

- [x] Plano é só "Allybi" — sem "Pro" no card, FAQ, header, mockup, metadata
- [x] R$170/mês justificado pelo caminho completo (fonte → ask → answer → review → send)
- [x] 30 dias grátis prominente (badge no card + hero sub + final CTA)
- [x] "Cancele quando quiser" visível (card price-note + workflow CTA note + final CTA + FAQ a7)
- [x] "Sem demo" explícito (hero micro + reassurance + FAQ a2)
- [x] "Nada sai sem confirmação" (hero micro + workflow footnote + FAQ a4)
- [x] "Documentos não treinam modelos" (hero trust4 + card row 5)
- [x] Outlook envia COM confirmação (todos refs)
- [x] WhatsApp = handoff (FAQ a5 explícito: "não lê, pesquisa ou sincroniza")
- [x] Links: 0 `app.allybi.com.brm`, todos signup CTAs em `.co` (localizam via JS)
- [x] Hero NÃO reutiliza `hero-scene` (per user explicit instruction)
- [x] Sem overflow horizontal em 8 breakpoints
- [x] Zero console errors em 8 breakpoints
- [x] Mobile não é desktop comprimido (mobile-specific CSS rules para chips, grid, link)
- [x] Banidos: 0 hits (incluindo "Allybi Pro" cross-page após fix do home teaser)

## 12. Confirmed: plano é apenas "Allybi"

Verificação textual:
- `grep -n "Allybi Pro" pricing.html` → 0
- `grep -n "Allybi Pro" index.html` → 0
- `grep -n "Allybi Pro" translations/*.json` → 0
- Card eyebrow renders "Allybi" + "30 dias grátis" badge — no qualifier
- Section 2 H2: "O que entra no plano." — singular plan
- FAQ q3: "O que está incluído?" — no "no Pro" suffix
- Workflow eyebrow: "Incluído" — was "Incluso no Pro"

## 13. How to run

```bash
cd /Users/alvarocamasmie/Downloads/koda-Landing
node server.js &
node audit-pricing-after.mjs        # re-capture 8 viewports
open "http://localhost:8080/pricing.html?lang=pt"
open "http://localhost:8080/pricing.html?lang=en"
```
