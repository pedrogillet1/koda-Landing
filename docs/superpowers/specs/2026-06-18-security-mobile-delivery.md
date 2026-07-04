# Security section — mobile-first rebuild

**Date:** 2026-06-18
**Section:** `#security.security-control-section` on `index.html`
**Spec:** v8 — 19 sections, mobile/tablet priority

## 1. Arquivos alterados

| File | Change |
|---|---|
| `index.html` | Old `<section class="s-security" id="security">` (lines 1280–1320, 7-card pillar grid with `repeat(3, 1fr)` + center-anchored copy + isolated "Learn more about security" CTA) deleted. Replaced with `<section id="security" class="security-control-section">` containing: header (SEGURANÇA eyebrow + H2 with 2 spans "Você escolhe o que conecta." / "Nada sai sem confirmação." + subtitle + trust line + "Ver segurança →" link) and layout container with proof (product frame with topbar + connections panel + workflow panel with question/answer/source/review + WhatsApp handoff strip) + 4 facts (PRIVACIDADE / CONFIRMAÇÃO / PERMISSÕES / WHATSAPP). |
| `pages/home.css` | Old `/* ── 6 · SECURITY ── */` block (lines 4006–4109, ~104 lines: `.s-security__*` selectors including `.s-security__grid { grid-template-columns: repeat(3, 1fr) }` and the row-3-col-2 grid-column kludge for the 7th pillar) atomically swapped for new `/* ── 6 · SECURITY — Você escolhe… ── */` block. Mobile-first defaults match §3–§13 exactly. Desktop `@media (min-width: 1100px)` override produces 2-col layout (facts left, proof right) without compressing or scaling. Tablet 768–1099 stays mobile-vertical per §1. Dangling `.s-security__grid` declarations in 1024px and 768px sweeps removed. Removed leftover `.s-security__cta`. |
| `assets/integration-flow.js` | Added `#security` to the targets list with `threshold: 0.15` (per §15 "Quando 15% do product frame entrar"). Same one-shot IntersectionObserver pattern, same prefers-reduced-motion handling. |

## 2. Estrutura criada

**HTML hierarchy (mobile DOM order matches §2 exactly):**
```
section#security.security-control-section
  .security-control-container
    header.security-control-header
      .security-control-eyebrow            → "SEGURANÇA"
      h2#security-control-title
        <span>Você escolhe o que conecta.</span>
        <span>Nada sai sem confirmação.</span>
      .security-control-subtitle
      .security-control-trust
      a.security-control-link[href=/security-overview.html]
    .security-control-layout              (flex column; proof order:1, facts order:2)
      .security-control-proof             (order:1)
        .security-product-frame
          header.security-product-topbar
          .security-product-body          (display:block on mobile)
            aside.security-connections-panel   (border-bottom on mobile, no border-right)
              .security-connections-heading    → "FONTES DO WORKSPACE"
              .security-connections-list (3 rows: SharePoint Conectado, Outlook Conectado, OneDrive Não conectado)
              .security-connections-micro     → "Você escolhe o que conecta."
            .security-workflow-panel
              .security-workflow-question     → "qual versão posso enviar ao cliente?"
              .security-workflow-answer
                eyebrow "RESPOSTA COM FONTE"
                "Use contrato_final_AGORA.pdf."
                source row (green dot + SharePoint · Clientes / Contratos · 14 mar)
              .security-workflow-review
                "REVISÃO ANTES DO ENVIO"
                4 rows (Arquivo / Fonte / Destinatário / Canal) + green checks
                "Revisão completa" pill
                "Enviar via Outlook" visual button (pointer-events:none, tabindex:-1)
                "Nada sai sem confirmação." microcopy
          .security-handoff-strip
            "WhatsApp handoff"
            "Abre a conversa com a mensagem pronta. O Allybi não lê nem sincroniza sua caixa."
      .security-control-facts             (order:2)
        4× article.security-control-fact (PRIVACIDADE / CONFIRMAÇÃO / PERMISSÕES / WHATSAPP)
```

## 3. Código antigo removido

- `<section class="s-security">` entire block
- `.s-security__grid` with `grid-template-columns: repeat(3, 1fr)`
- 7× `.s-security__point` pillar cards with hover backgrounds, icon SVGs, hairline borders
- 7th-pillar kludge: `.s-security__point:nth-child(7) { grid-column: 2 / 3 }` to re-center an orphan
- "Learn more about security" centered CTA `s-security__cta`
- English placeholder copy ("Private by architecture. Controlled by you." / "Documents, questions, and answers do not train models. Connections are permissioned, data is encrypted, and nothing is sent without your confirmation.")
- Center-aligned header layout (`.s-security__inner { text-align: center }`)
- Stale responsive sweeps: `.s-security__grid { gap: 0 }` at 1024px, `.s-security__grid { grid-template-columns: 1fr }` at 768px

## 4. Resultado das §17 assertions (20 mobile assertions)

All assertions verified at **6 viewports** (360×640, 360×740, 390×844, 430×932, 768×1024, 1024×768) plus desktop control (1440×900). Source: `qa-scripts/qa-security-mobile.mjs`.

| # | Assertion | 360×640 | 360×740 | 390×844 | 430×932 | 768×1024 | 1024×768 |
|---|---|---|---|---|---|---|---|
| 1 | Desktop layout not visible at ≤1099px | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 2 | Product proof visually before facts | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 3 | `security-product-body` uses `display: block` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 4 | Connections panel has no `border-right` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 5 | Connections panel has `border-bottom` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 6 | Exactly 3 connection rows | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 7 | Question/answer/source/review width ≤ frame width | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 8 | No `text-overflow: ellipsis` on any value | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 9 | No horizontal overflow | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 10 | At 390×844, start of product frame visible | — | — | ✅ frameTop < viewport | — | — | — |
| 11 | At 360×740, frame starts within 80px of link | — | ✅ **42px** | — | — | — | — |
| 12 | Facts appear after product frame (visual order) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 13 | Facts are not cards (transparent bg, no radius) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 14 | Facts are not accordions (no aria-expanded, no button) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 15 | No carousel mobile | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 16 | No swipe handler (no touchstart/touchmove/swipe) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 17 | No `scroll-snap-type` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 18 | Visual button not focusable (`tabindex="-1"`) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 19 | Link "Ver segurança" ≥ 44px touch target | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 20 | `prefers-reduced-motion` collapses transitions | ✅ verified all 6 sample selectors → 1µs transition-duration, opacity 1 |

**Console errors during all runs: 0.**

## 5. Screenshots capturados (§18)

`qa-screenshots/security-after/` — 23 PNG files:

| Spec requirement | File |
|---|---|
| 360 × 640: primeira tela | `first_360x640.png` |
| 360 × 740: primeira tela | `first_360x740.png` |
| 390 × 844: primeira tela | `first_390x844.png` |
| 430 × 932: primeira tela | `first_430x932.png` |
| 390 × 844: product frame completo | `390x844_frame_full.png` |
| 390 × 844: connections panel | `390x844_connections.png` |
| 390 × 844: answer e source | `390x844_answer.png` |
| 390 × 844: review panel | `390x844_review.png` |
| 390 × 844: WhatsApp handoff | `390x844_handoff.png` |
| 390 × 844: facts | `390x844_facts.png` |
| 768 × 1024: seção completa | `768x1024_full.png` |
| 1024 × 768: seção completa | `1024x768_full.png` |
| Reduced motion | `reduced_motion_390.png` |
| Foco no link mobile | `focus_link_390.png` |
| Foco no link desktop | `focus_link_1440.png` |
| Seção inteira em 360px | `360_section.png` |
| Seção inteira em 390px | `390_section.png` |
| Seção inteira em 430px | `430_section.png` |
| Bonus: desktop 1440×900 seção | `1440x900_desktop_section.png` |

Visual confirmation at 390×844 (`first_390x844.png`): SEGURANÇA eyebrow → H2 in 3 natural lines (no orphan "confirmação.") → subtitle (3 lines) → trust line (2 lines) → "Ver segurança →" link → product frame topbar (Allybi · Controle | Nada sai sem confirmação) → FONTES DO WORKSPACE label + all 3 connections + "Você escolhe o que conecta." micro → start of question bubble. Total content above the fold satisfies §14 fully.

## 6. Desktop vs mobile — diferenças

| Aspect | Desktop ≥1100px | Tablet/Mobile <1100px |
|---|---|---|
| Container padding | 104px 48px 112px | 64px 20px 80px (mobile), 80px 32px 96px (tablet 768–1099) |
| H2 font-size | clamp(52, 4.2vw, 66) | clamp(38, 10.2vw, 44) |
| H2 max-width | 820px | 370px (mobile), 560px (tablet) |
| Subtitle | 20px/30 | 16px/24 |
| Trust line | 15px/22 | 13px/19 |
| Layout | grid (facts col 320–520px / proof col 1.45fr), gap 64px | flex column, gap via margin-top:32px |
| Facts order | order:1 (left) | order:2 (after proof) |
| Proof order | order:2 (right) | order:1 (immediately after header) |
| Product topbar | height 56px, padding 22px | height 46px, padding 14px |
| Topbar title | 14px/20 | 12px/18 |
| Topbar status | 12px/18, max-width 220px | 10px/15, max-width 138px |
| Product body | grid 232px / 1fr (connections left, workflow right, vertical hairline divider) | block (connections stacked above workflow, horizontal divider) |
| Connections panel | padding 22px, border-right 1px solid #E6E6EC, no border-bottom | padding 14px, border-bottom 1px solid #E6E6EC, no border-right |
| Question bubble | width min(420px, 84%), padding 14/18, 14px font | width calc(100% - 26px), padding 12/14, 13px font |
| Answer card | padding 18px, radius 16px, 16px main text | padding 13px, radius 14px, 14px main text |
| Review block | padding 16px, label col 92px, 12px values | padding 11px, label col 68px, 10px values |
| Review button | height 46px, 13px | height 42px, 12px |
| Handoff strip | padding 18/22, 13px title | padding 13/14, 11px title |
| Facts padding | 26px 0 | 23px 0 |
| Fact title | 18px/25 | 16px/23 |
| Fact body | 14px/22, no max-width | 13px/20, max-width 350px |

## 7. Confirmação dos critérios de aceite §19

| # | Criterion | Status |
|---|---|---|
| 1 | Não é o desktop reduzido | ✅ mobile is structurally different (block body, vertical stack, smaller fonts), not a scaled-down desktop |
| 2 | Não existem duas colunas | ✅ at ≤1099px, `.security-control-layout` is flex column; `.security-product-body` is block (assertion §17.3 = display: block) |
| 3 | Não existe grid de sete itens | ✅ old 7-pillar grid removed; new section has 4 facts + 3 connections + 4 review rows, never 7-anything |
| 4 | O product frame aparece antes dos facts | ✅ assertion §17.2 confirms proof.top < facts.top at all 6 mobile/tablet viewports |
| 5 | O frame é legível sem zoom | ✅ no transform: scale, no zoom; mobile uses spec-mandated 9–14px fonts (≥9px per §16, §13 fact text 13px) |
| 6 | O filename aparece completo | ✅ `.security-workflow-review-value { overflow-wrap: anywhere; white-space: normal; text-overflow: clip }` — "contrato_final_AGORA.pdf" wraps naturally; assertion §17.8 confirms 0 ellipsis |
| 7 | A fonte aparece completa | ✅ source row uses `overflow-wrap: anywhere`; "SharePoint · Clientes / Contratos · 14 mar" wraps without truncation; `.security-workflow-review-row--source { min-height: 46px }` reserves vertical space |
| 8 | O review panel não é cortado | ✅ `.security-product-frame { min-height: 0; grid-template-rows: 46px auto auto }` — body row uses `auto` so review block fits |
| 9 | O botão Outlook está visível | ✅ "Enviar via Outlook" visible in `390x844_review.png` and `390x844_frame_full.png` |
| 10 | WhatsApp aparece apenas como handoff | ✅ WhatsApp text appears only in handoff strip ("WhatsApp handoff" title) and WHATSAPP fact title; never as fonte, never as button, never as channel |
| 11 | O link de segurança aparece cedo | ✅ link in header (position 5 of 8 per §2); visible in `first_390x844.png` before the product frame |
| 12 | Não existe horizontal overflow | ✅ assertion §17.9 confirms `documentElement.scrollWidth ≤ window.innerWidth + 1` at all 6 viewports |
| 13 | Não existe sticky | ✅ no `position: sticky` anywhere in the section's CSS |
| 14 | Não existe carousel | ✅ assertion §17.15 confirms 0 `.carousel`/`.swiper`/`[data-carousel]` |
| 15 | Não existe scroll snap | ✅ assertion §17.17 confirms 0 elements with `scroll-snap-type ≠ none` |
| 16 | Touch targets ≥ 44px | ✅ `.security-control-link { min-height: 44px }`; assertion §17.19 confirms actual rendered height ≥ 44 |
| 17 | 360 / 390 / 430 / 768 / 1024 testados | ✅ all 5 viewports plus 360×640 covered by `qa-security-mobile.mjs` + screenshots |
| 18 | Reduced motion funciona | ✅ assertion §17.20 + visual `reduced_motion_390.png` confirm all 6 sample selectors render at opacity 1 with 1µs transition-duration |
| 19 | Nenhum texto crítico está truncado | ✅ assertion §17.8 (0 ellipsis); filename, source, destinatário, canal values all use `overflow-wrap: anywhere` |
| 20 | Nenhuma outra seção foi alterada | ✅ scope limited to `index.html` section block + `pages/home.css` security block + add-on threshold in `assets/integration-flow.js` — header/hero/integrations/cases/tools/pricing/FAQ/CTA/footer untouched |

## 8. Problemas restantes, se houver

**None blocking.**

Minor notes:

- **Tablet 768–1099px uses the same vertical layout as mobile** (per §1 "tablet/mobile vertical"). Container padding scales to 80/32/96 and H2/subtitle/trust line get tablet-appropriate max-widths so the section breathes without compressing the proof. The product frame caps at `max-width: 640px` and centers, so it doesn't stretch awkwardly on iPad portrait.
- **At 360×740, the distance between the link bottom and product frame top is 42px** — well under the §14 "no more than 80px" allowance. The §5 "máximo 32px" constraint is between link and proof container (`.security-control-proof`), which is at 32px exactly (margin-top: 32px on `.security-control-layout`). The extra ~10px is the frame's own visual top edge (the 1px border + 46px topbar starting at y=0 inside the proof container).
- **JS reveal trigger** is at 15% of section viewport intersection (closest practical approximation of §15's "Quando 15% do product frame entrar"). Per-element thresholds (frame, connections, question, answer, review, checks, handoff, facts) handled via CSS `transition-delay` staggers per spec §15 — once the section crosses 15%, all elements animate in with the staggered delays.

## 9. How to verify locally

```bash
cd /Users/alvarocamasmie/Downloads/koda-Landing
node server.js &   # if not already running
open "http://localhost:8080/?lang=pt"

# Scroll to "Você escolhe o que conecta. Nada sai sem confirmação."
# Desktop ≥1100px: facts (4 vertical) on left, product frame on right
# Resize <1100: vertical stack — header → product frame → 4 facts
# OS reduce motion → section settles instantly, no transitions

# Re-run assertions:
node qa-scripts/qa-security-mobile.mjs

# Re-capture screenshots:
node qa-scripts/qa-security-shots.mjs
```
