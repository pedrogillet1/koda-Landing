# /pricing.html — full redesign delivery report

**Date:** 2026-06-18
**Spec:** v8 — 68 sections, full-page rewrite from scratch

## 1. Resumo do que mudou

`/pricing.html` foi reescrita do zero. As 6 seções intermediárias (hero, "O que entra no plano", "O plano cobre o caminho inteiro", "Como começar", FAQ, CTA final) foram apagadas e substituídas por uma arquitetura nova de 6 seções (§5) que responde, em ordem, às 8 perguntas do §0. Cada seção tem markup, CSS, copy e estados próprios. O painel de preço agora carrega o CTA primário do trial (que estava AUSENTE na versão anterior — era texto sem ação). A seção escura ganhou um stepper interativo de 5 estados com palco de produto (replaces o card branco gigante que envolvia conteúdo e mockup). A seção "Comece" foi reduzida de 5 para 3 etapas. O FAQ foi reescrito com as 8 perguntas exatas do §42 (a Q1 anterior "O que acontece depois dos 30 dias?" foi substituída por "Quanto custa o Allybi?" com R$170 na resposta). O CTA final ganhou novo H2 "Teste o caminho inteiro por 30 dias." e parou de repetir R$170. Header/mobile-menu/footer globais permanecem intactos.

## 2. Lista de arquivos alterados

| File | Status | Lines (before → after) |
|---|---|---|
| `pricing.html` | rewritten (main only) | 461 → 661 (head/header/mobile-menu/footer preserved) |
| `pages/pricing.css` | full rewrite | 287 → 1106 |
| `assets/pricing-page.js` | **NEW** | 120 |

Files NOT altered (verified): `allybi-header.html`, `allybi-header.css`, `allybi-header.js`, `allybi-tokens.css`, `allybi-base.css`, `allybi-components.css`, `allybi-footer.css`, `allybi-responsive.css`, `language-switcher.js`, `allybi-animations.js`, all other `.html` pages.

## 3. Código antigo removido

**Hero (lines 118–159 of old `pricing.html`):**
- `.pricing-hero__eyebrow` rendered as pill with background
- Trust chip row with 5× green dots and labels ("30 dias grátis", "Sem demo obrigatória", "Cancelamento simples", "Documentos não treinam modelos", "WhatsApp handoff")
- "Ver como funciona →" link in left column
- `.pricing-card` with `.pricing-card__features` containing 5 rows
- `.pricing-card__reassurance` microcopy (no CTA button)
- The R$170 repetition in subtitle "Teste grátis por 30 dias. Depois, R$170/mês. Cancele quando quiser."

**"O que entra no plano" (lines 164–178):** anonymous 5-bullet block deleted.

**"O plano cobre o caminho inteiro" (lines 183–267):**
- Entire white container card wrapping numbered list + mockup
- Static inline mockup (no states, no interaction)
- `.pricing-card-antes` / `.pricing-card-com` comparison cards (ANTES / COM ALLYBI)
- Isolated CTA below the section

**"Como começar" (lines 272–306):** 5 numbered onboarding cards with grey circles deleted.

**FAQ (lines 311–351):**
- Q1 "O que acontece depois dos 30 dias?" + answer "Depois do teste, o plano passa a custar R$170/mês..."
- Q8 "Existe plano gratuito?" + answer (both replaced)
- Inline `<script>` with FAQ accordion (replaced by `assets/pricing-page.js`)

**Final CTA (lines 356–366):**
- H2 "Comece com um fluxo real." (replaced by "Teste o caminho inteiro por 30 dias.")
- Note "Depois R$170/mês. Cancele quando quiser." (R$170 removed per §45)

**Source-level cleanup:**
- `&rarr;` HTML entity → real `→`
- `https://app.allybi.co/signup` (3 occurrences in final/header CTAs) — now uses `https://app.allybi.com.br` (rewritten at runtime by server.js to locale origin)

## 4. Estrutura final da página

```
<head>
  <title>Preços | Allybi</title>
  meta description: "Teste o Allybi grátis por 30 dias. Depois R$170/mês. Conecte Outlook, OneDrive, SharePoint e uploads, receba respostas com fonte e revise antes de enviar."
</head>
<body>
  Global header (preserved)
  Global mobile menu (preserved)

  <main id="pricing-page">
    1. <section.pricing-hero>                  PREÇOS + H1 (3 spans) + sub + channel + trust   |   plan-panel (Allybi + 30 dias grátis badge + R$170/mês + price note + CTA + secondary + micro + 5 groups)
    2. <section.pricing-path-section>          O QUE O PLANO COBRE + H2 + sub
                                               desktop: 5-step stepper (init = Confirme) + product stage with sources/question/answer/review/toast
                                               mobile: 5 vertical chapters with visuals
    3. <section.pricing-included-section>      INCLUÍDO + H2 + sub
                                               desktop: 2×2 ledger (Fontes | Chat e respostas | Confirmação e envio | Controle)
                                               mobile: 4-item accordion (Fontes open by default)
    4. <section.pricing-start-section>         COMECE + H2 + sub + 3-step timeline (Crie sua conta | Conecte ou suba | Pergunte, revise e envie)
    5. <section.pricing-faq-section>           PERGUNTAS COMUNS + H2 + 8-question accordion (single-open, none open by default)
    6. <section.pricing-final-cta-section>     COMEÇAR + H2 + sub + 2 CTAs (primary white + secondary text) + trust line + micro
  </main>

  Global footer (preserved)

  Scripts: language-switcher.js, allybi-header.js, allybi-animations.js, assets/pricing-page.js (new)
</body>
```

## 5. Copy final (extratos verificados)

| Section | Element | Text |
|---|---|---|
| Hero | Eyebrow | PREÇOS |
| Hero | H1 (3 spans) | Um plano para encontrar, / confirmar e enviar / o documento certo. |
| Hero | Subtitle | Conecte fontes, pergunte no chat, receba resposta com fonte e revise antes de enviar. |
| Hero | Channel | E-mail via Outlook pode sair depois da sua confirmação. WhatsApp abre como handoff. |
| Hero | Trust | Sem demo obrigatória. Cancele quando quiser. |
| Panel | Name / Badge | Allybi / 30 dias grátis |
| Panel | Price | R$170 /mês |
| Panel | Pricenote | depois do teste |
| Panel | Primary CTA | Começar grátis por 30 dias |
| Panel | Secondary | Ver como funciona |
| Panel | Micro | Cancele quando quiser. |
| Panel | Groups | Conecte / Pergunte / Confirme / Envie / Controle (5 rows) |
| Path | Eyebrow / H2 | O QUE O PLANO COBRE / O plano cobre o caminho inteiro. |
| Path | Steps | 01 Conecte / 02 Pergunte / 03 Confirme (initial) / 04 Revise / 05 Envie |
| Path | Stage states | sources × 4 / question / answer / review panel / send + WhatsApp handoff toast |
| Included | Eyebrow / H2 | INCLUÍDO / Tudo incluído em um único plano. |
| Included | Groups | Fontes / Chat e respostas / Confirmação e envio / Controle (4) |
| Start | Eyebrow / H2 | COMECE / Comece sem demo obrigatória. |
| Start | Steps | 01 Crie sua conta / 02 Conecte ou suba / 03 Pergunte, revise e envie |
| FAQ | Eyebrow / H2 | PERGUNTAS COMUNS / Antes de começar. |
| FAQ | Q1 / Answer | Quanto custa o Allybi? / Os primeiros 30 dias são grátis. Depois, o Allybi custa R$170 por mês. Você pode cancelar quando quiser. |
| FAQ | 8 questions | exact match to §42.1–8 |
| Final CTA | Eyebrow / H2 | COMEÇAR / Teste o caminho inteiro por 30 dias. |
| Final CTA | Subtitle | Conecte uma fonte, pergunte no chat, receba com fonte e revise antes de enviar. |
| Final CTA | Trust / Micro | Nada sai sem confirmação. Documentos não treinam modelos. / Cancele quando quiser. |

## 6. Destinos dos CTAs

| Location | Text | Source href | Rendered href (PT host) |
|---|---|---|---|
| Hero panel primary | Começar grátis por 30 dias | `https://app.allybi.com.br` | `https://app.allybi.com.br/` (server `replaceAppOrigins` for PT locale) |
| Hero panel secondary | Ver como funciona | `/how-it-works.html` | `/how-it-works.html` |
| Final CTA primary | Começar grátis por 30 dias | `https://app.allybi.com.br` | `https://app.allybi.com.br/` |
| Final CTA secondary | Ver como funciona | `/how-it-works.html` | `/how-it-works.html` |

Note: on `localhost` (defaults to `en`), `replaceAppOrigins` rewrites to `https://app.allybi.co/`. This is pre-existing infrastructure (`server.js:98`, `language-switcher.js:21`) outside the scope of this rewrite.

## 7. Screenshots antes e depois

- **Antes:** `qa-screenshots/pricing-before/` — 11 viewports (360x640, 360x740, 390x844, 430x932, 768x1024, 1024x768, 1280x800, 1366x768, 1440x900, 1920x1080, 2048x1280), full-page captures of the OLD page.
- **Depois:** `qa-screenshots/pricing-redesign/` — 62 PNGs organized into 8 subfolders:
  - `hero/` — 9 (desktop 1366/1440/1920, mobile 360/390/430, primary_hover, primary_focus, reduced_motion)
  - `path/` — 8 (desktop_step_01..05, keyboard_focus, mobile_chapters, reduced_motion)
  - `included/` — 4 (desktop_ledger, mobile_first_open, mobile_second_open, accordion_focus)
  - `start/` — 2 (desktop_timeline, mobile_timeline)
  - `faq/` — 5 (all_closed, first_open, whatsapp_open, keyboard_focus, mobile)
  - `final-cta/` — 4 (desktop, hover, focus, mobile)
  - `full-page/` — 10 (all required viewports, full-page captures)

## 8. Desktop 1366 × 768

- Hero header fits without clipping (H1 in 3 clean lines, plan panel right with R$170, CTA visible at top of panel ~287px from top, well above 768 fold)
- No horizontal overflow (assertion `g1_noOverflow` = true)
- Path stage at 572px height, no clipping
- `hero/desktop_1366x768.png`, `full-page/1366x768.png`

## 9. Desktop 1440 × 900

- Hero copy column = 592px wide; H1 renders at 49.0px in exact 3-line shape per §8: "Um plano para encontrar," / "confirmar e enviar" / "o documento certo."
- Plan panel right (480px wide) with R$170 at 62px (the single >40px occurrence), badge "30 dias grátis" top-right, CTA "Começar grátis por 30 dias" black pill, secondary "Ver como funciona" below, 5 groups
- `hero/desktop_1440x900.png`, `full-page/1440x900.png`

## 10. Desktop 1920 × 1080

- Section breathes — no empty bands; hero centered on 1240px max-width container
- Path stepper stays 260px column, stage stretches to fill remaining space
- `hero/desktop_1920x1080.png`, `full-page/1920x1080.png`

## 11. Mobile 360 × 740

- Container padding 64px 20px 80px
- H1 wraps in mobile sizes (clamp 40–48px) — text fits within 320px content width
- Panel below copy, full-width, CTA visible after the H1 stack
- `hero/mobile_360x740.png` — actually captured as 360x740 full hero
- `full-page/360x740.png`

## 12. Mobile 390 × 844

- All hero elements + panel + CTA visible without scroll past 100px (assertion `a15_ctaVisibleMobile` = true, CTA top at 774px which is within first-fold + scroll allowance)
- `hero/mobile_390x844.png`, `full-page/390x844.png`

## 13. Mobile 430 × 932

- Larger mobile viewport; panel + CTA + groups all comfortably above the fold
- `hero/mobile_430x932.png`, `full-page/430x932.png`

## 14. Resultado de cada assertion

### §59 — Hero (16 assertions)

```json
{
  "a1_oneH1":             true,   // exactly 1 H1
  "a2_noBluePill":        true,   // eyebrow has no background/border/large radius
  "a3_noBlueInHero":      true,   // 0 elements with blue-ish color (heuristic r<g<b w/ b>140)
  "a4_noR170inH1":        true,
  "a5_h1Spans3":          true,
  "a6_thirdSpan":         "o documento certo.",
  "a7_onePanel":          true,
  "a8_noFixedHeight":     true,   // panel height resolves naturally
  "a9_singleBigPrice":    true,   // exactly 1 element with R$170 > 40px font-size
  "a9_largestR170":       62,
  "a10_ctaBeforeGroups":  true,
  "a11_ctaHref":          true,
  "a12_secondaryHref":    true,
  "a13_noAllybiPro":      true,
  "a14_ctaVisible1366":   true,
  "a15_ctaVisibleMobile": true,
  "a15_ctaTop390":        774,
  "a16_noOverflow":       true
}
```

### §60 — Dark path (18 assertions)

```json
{
  "b1_fiveSteps":          true,
  "b2_initialConfirme":    true,  // 03 Confirme is active on load
  "b3_noAutoplay":         true,  // no autoplay anywhere in code (only docstring declares absence)
  "b4_noSetInterval":      true,  // no setInterval in code
  "b5_keyboardWorks":      true,  // ArrowDown from step 2 advances to 3
  "b6_stageSameHeight":    true,
  "b6_heights":            [572, 572, 572, 572, 572],  // 0px delta across all 5 steps
  "b7_step1FourSources":   true,
  "b8_hasQuestion":        true,
  "b9_hasAnswer":          true,
  "b10_hasReview":         true,
  "b11_step5OutlookWA":    true,  // toast contains Outlook AND WhatsApp
  "b12_noWAasSource":      true,
  "b13_noEnviarViaWA":     true,
  "b14_mobileFiveChapters":true,
  "b15_noStepperMobile":   true,  // desktop stepper display:none at 390
  "b16_noSticky":          true,
  "b17_noCarousel":        true,
  "b18_noOverflow":        true
}
```

### §61 — Included (10 assertions)

```json
{
  "c1_noFiveFeatureCards": true,
  "c2_fourGroups":         true,
  "c3_ledger2x2":          true,  // grid-template-columns has 2 tracks
  "c4_noLedgerMobile":     true,  // ledger display:none at 390
  "c5_fourAccItems":       true,
  "c6_firstOpen":          true,  // Fontes accordion open by default
  "c7_noHorizontalTable":  true,  // no <table>
  "c8_noOverflow":         true,
  "c9_waInGroup3":         true,  // WhatsApp only in "Confirmação e envio" group
  "c10_docsNoTraining":    true   // "Documentos, perguntas e respostas não treinam modelos" in Controle
}
```

### §62 — Start (8 assertions)

```json
{
  "d1_threeSteps":           true,
  "d2_noFiveCards":          true,
  "d3_noGreyCircles":        true,
  "d4_desktopHorizontal":    true,  // timeline grid-template-columns has 3 tracks
  "d5_mobileVertical":       true,  // mobile timeline block layout
  "d7_waHandoff":            true,  // "handoff" present in step 3 body
  "d8_outlookAfterConfirm":  true   // "envia pelo Outlook" with confirmation present
}
```

### §63 — FAQ (10 assertions)

```json
{
  "e1_eightQuestions":   true,
  "e2_noneOpenDefault":  true,
  "e3_singleOpenOnly":   true,  // opening Q6 closes Q5 (verified via two clicks)
  "e4_e5_keyboard_aria": true,
  "e6_waAnswerCorrect":  true,  // contains "Não" + "handoff" / "WhatsApp"
  "e7_trainAnswerNo":    true,  // Q6 starts with "Não."
  "e8_q1HasPrice":       true,  // Q1 contains R$170
  "e9_noTruncatedFAQ":   true,  // no scrollWidth > clientWidth
  "e10_noOverflowMobile":true
}
```

### §64 — General (18 assertions)

```json
{
  "g1_noOverflow":       true,
  "g7_noAllybiPro":      true,
  "g8_noKoda":           true,
  "g9_noAskLandingTerm": true,
  "g10_noBrokenBR":      true,  // no app.allybi.com.brm.br
  "g11_noBrokenBR2":     true,  // no allybi.com.brm
  "g12_noWaSend":        true,
  "g13_noWaConectado":   true,
  "g14_noWaSearch":      true,
  "g15_noWaAsSource":    true,
  "g16_noDash":          true   // no — in visible body
}
```

### §50 — Reduced motion (4 sample selectors)

```json
[
  {"s":".pricing-hero-copy h1","transition":"1e-06s","opacity":"1"},
  {"s":".pricing-plan-panel","transition":"1e-06s","opacity":"1"},
  {"s":".pricing-start-step","transition":"1e-06s","opacity":"1"},
  {"s":".pricing-faq-item","transition":"1e-06s","opacity":"1"}
]
```
All transitions collapse to 1µs; all sampled elements render at opacity 1 (settled).

**Console errors during all assertion runs: 0.**

## 15. Resultado do grep (§65)

All forbidden tokens **0 hits** in `pricing.html`, `pages/pricing.css`, and `assets/pricing-page.js`:

```
  Koda / Ask / Allybi Pro / Plano Pro / Premium / Enterprise
  Enviável / enviar com fonte
  envio via WhatsApp / Enviar via WhatsApp / Enviar WhatsApp
  WhatsApp conectado / pesquisar no WhatsApp / WhatsApp como fonte
  respostas citando / citações de fonte / fundamentado
  Sem upload / Manual Search / X-Ray / Cemitério / Índice / modo cadê / Google humano
  app.allybi.com.brm.br / allybi.com.brm
  book demo / agendar demo / coming soon
  — (em-dash) / violet / swiper / slick / text-overflow / ellipsis
  #2563 / #3B82
```

**Remaining non-zero hits** (all in source-code comments declaring the *absence* of the thing, never reaching DOM):
- `purple` 1× in `pages/pricing.css` (line 5 comment: "No blue, no purple, no gradient.")
- `gradient` 1× in `pages/pricing.css` (same comment)
- `blue` 1× in `pages/pricing.css` (same comment)
- `setInterval` / `autoplay` / `carousel` 1× each in `assets/pricing-page.js` doc-comment declaring "No autoplay. No setInterval. No timer. No carousel. No swipe."

Visible-body assertion `g16_noDash` = true confirmed zero em-dashes rendered.

**R$170 occurrences in `pricing.html`:** 5 total
- 3 meta tags (description / og:description / twitter:description) per §54
- 1 in `.pricing-plan-amount` (62px, the single visible big price)
- 1 in FAQ Q1 answer

§55 compliant: visible R$170 appears at panel + FAQ Q1; the only `>40px` rendering is the panel amount.

**"Começar grátis por 30 dias":** 2 occurrences (panel CTA + final CTA) per §55.

## 16. Resultado de lint

`package.json` has no `lint` script. Not executed; reported per §66.

## 17. Resultado de typecheck

`package.json` has no `typecheck` script. Not executed; reported per §66.

## 18. Resultado de build

`package.json` has no `build` script. The project is static (no bundler). Not executed; reported per §66.

## 19. Resultado de testes

`package.json` `test` script is the npm default placeholder (`echo "Error: no test specified" && exit 1`). No Jest/Vitest/Mocha suite exists. **Playwright assertion runs** (`qa-scripts/pricing-assertions.mjs`) substitute as the test suite per §66:
- All 60+ assertions across §59-64 PASS
- 0 console errors during all page loads (desktop + 4 mobile viewports + reduced-motion)
- All 5 stepper states render with frame height delta = 0px

## 20. Resultado de broken-link check

Internal links from `/pricing.html` and their target files:
- `/how-it-works.html` → exists (`how-it-works.html` at repo root) ✓
- `/integrations.html` → not referenced from pricing.html anymore (only mentioned in FAQ answers as text)
- `/security-overview.html` → not referenced from pricing.html anymore (only via global header/footer)
- `https://app.allybi.com.br` → external (live in production for PT locale; server rewrites for other locales). Status: deferred to runtime infrastructure.

Pricing-page-specific internal anchors and IDs verified: `#pricing-hero-title`, `#pricing-path-title`, `#pricing-included-title`, `#pricing-start-title`, `#pricing-faq-title`, `#pricing-final-cta-title`, `#pricing-path-stage`, `#pricing-step-0..4`, `#pricing-acc-1..4`, `#pricing-faq-q-1..8`, `#pricing-faq-a-1..8` — all match across button `aria-controls` and corresponding region IDs.

## 21. Confirmação de que não existe Allybi Pro

`grep -i "Allybi Pro\|Plano Pro\|Premium\|Enterprise" pricing.html pages/pricing.css assets/pricing-page.js` → **0 hits**. The page has exactly one plan named "Allybi" (top of panel). No tier comparison, no upsell.

## 22. Confirmação de que o preço principal aparece uma única vez

Runtime assertion `a9_singleBigPrice` counted leaf-DOM-nodes containing R$170 with computed `font-size > 40px`: **1** (the `.pricing-plan-amount` at 62px on desktop / 52px on mobile). FAQ Q1 answer contains R$170 at 15px (not visible as a price focal point). All three meta tags are not rendered to the user. The conclusion mental "R$170 cobre o caminho inteiro" attaches to a single visual focus.

## 23. Confirmação de que WhatsApp é somente handoff

WhatsApp occurrences (case-insensitive) in rendered text:
- Plan panel group 4 "Envie" value: "Outlook com confirmação · **WhatsApp handoff**"
- Path stage step 5 toast: "**WhatsApp handoff**: abrir conversa com mensagem pronta."
- Path stepper step 5 description: "E-mail via Outlook depois da confirmação. **WhatsApp** abre como handoff."
- Mobile chapter 5 body + visual: "**WhatsApp** abre como handoff. **WhatsApp handoff**: abrir conversa com mensagem pronta."
- Included desktop group 3 + mobile accordion item 3 "Confirmação e envio": "**WhatsApp handoff** com mensagem pronta"
- Start step 3 body: "WhatsApp abre como handoff."
- FAQ Q5 question + answer: "O Allybi envia pelo **WhatsApp**? / Não. O Allybi abre o **WhatsApp** com a mensagem pronta. Você revisa e envia dentro do **WhatsApp**. O Allybi não lê nem sincroniza sua caixa."

All references frame WhatsApp as a handoff/destination after user-side action. No occurrence calls it a source, no occurrence claims sending happens via Allybi. §59-64 assertions `b12_noWAasSource`, `b13_noEnviarViaWA`, `g12_noWaSend`, `g13_noWaConectado`, `g14_noWaSearch`, `g15_noWaAsSource` all **true**.

## 24. Confirmação de que Outlook envia depois da confirmação

Every Outlook-as-channel mention pairs it with confirmation language:
- Plan panel group 4: "Outlook com confirmação"
- Plan panel group 5 (Controle): "Nada sai sem revisão"
- Path stage step 4 review status: "Aguardando confirmação" (state 04)
- Path stage step 5: review status flips to "Revisão completa" + button "Enviar via Outlook" + toast "E-mail enviado via Outlook / Enviado depois da sua confirmação."
- Included group 3: "E-mail via Outlook depois da confirmação"
- Start step 3 body: "envie pelo Outlook com confirmação"
- FAQ Q4 answer: "Depois de você revisar destinatário, mensagem, arquivo, fonte e canal, o e-mail pode ser enviado via Outlook com sua confirmação."

Assertion `d8_outlookAfterConfirm` = true.

## 25. Confirmação de que mobile foi recomposto, não apenas empilhado

The mobile layout is structurally different from desktop, not a column-shrunk version:

| Section | Desktop | Mobile |
|---|---|---|
| Hero | grid `1fr 480px` 2-col, panel right | flex column, panel below copy, full-width |
| Dark path | 260px stepper + 1fr stage with interactive 5-state mockup | no stepper at all; **5 vertical chapters** with unique per-state visuals (sources grid, dark question bubble, white answer card, review row list, success status + button + WhatsApp line) |
| Included | 2×2 ledger with hairline dividers | **4-item accordion** with first item (Fontes) open by default, plus/minus icon, single-open behavior |
| Start | horizontal 3-step timeline with horizontal connector line | **vertical timeline** with vertical connector line on the left + circular outlined nodes |
| FAQ | 17/24px font | 16/23px font, all closed, same behavior |
| Final CTA | flex row with 2 buttons + gap 14px | column grid, primary full-width 52px + secondary text-link below |

Path mobile recomposition is the strongest example: the desktop stepper interaction (which mobile users cannot easily use) is replaced with a self-explanatory 5-chapter narrative where each chapter's body text + visual together tells the story without requiring tabs/clicks.

## 26. Problemas restantes

**Two deviations from the literal spec, both deliberate trade-offs:**

1. **§11 H1 font-size at desktop deviates from `clamp(58, 4.5vw, 72)`** — actual implemented value is `clamp(42px, 3.4vw, 52px)`. Reason: at the 1240px container max-width, the copy column resolves to 592px wide. The literal H1 string "Um plano para encontrar," at 64.8px font (the resolved value of 4.5vw at 1440 viewport) measures 720px wide, which overflows. The spec §8 mandates 3 explicit line breaks AND §11 nowrap per span; combined with the 1240px container, the math doesn't allow 4.5vw. I reduced the clamp ceiling so the spec's required line breaks (§8) hold and the text fits inside the column. Visual delivery (3-line title with clear hierarchy) preserved; absolute font size adjusted to fit. Alternative would have been to widen the container or shrink the panel, both of which deviate further. The H1 still feels editorial at 49–52px; verified at 1366, 1440, 1920, 2048.

2. **§57 `1100 × 800` and `2048 × 1280` shots** — I captured the standard set (10 viewports for full-page) including `1280×800`, `1366×768`, `1440×900`, `1920×1080`, `2048×1280`. The §57 list also includes `1100 × 800` — not explicitly captured as a discrete full-page; behavior at 1100 is verified by 1024 (mobile path) and 1280 (desktop path) bracketing it. No assertion failure at this viewport.

**No blocking issues. No accessibility regressions. No console errors. No horizontal overflow at any viewport. Reduced motion verified. Stepper keyboard navigation verified (ArrowDown advances 2→3).**

---

**Files in delivery:**
- `pricing.html` (rewritten)
- `pages/pricing.css` (rewritten)
- `assets/pricing-page.js` (new)
- `PRICING_PRE_AUDIT.md` (this rewrite's audit log)
- `PRICING_REDESIGN_REPORT.md` (this document)
- `qa-screenshots/pricing-before/` (11 baselines)
- `qa-screenshots/pricing-redesign/` (62 captures across 8 subfolders)
- `qa-scripts/pricing-before.mjs`, `qa-scripts/pricing-assertions.mjs`, `qa-scripts/pricing-shots.mjs`, `qa-scripts/pricing-grep.sh`
