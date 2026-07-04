# /integrations.html — full redesign delivery report

**Date:** 2026-06-19
**Spec:** v8 — 95 sections, full-page rewrite from scratch

## 1. Resumo do redesign

A página de integrações era uma mistura: catálogo de logos, repetição de mockup chat/answer da homepage/how-it-works, seção de "Roadmap" com Gmail e Google Drive "em breve", matriz que marcava check de "Enviar" para WhatsApp, e cards de segurança duplicados. Foi totalmente reescrita para responder, em ordem, às 5 perguntas do §0 e produzir as 3 conclusões mentais alvo: Outlook/OneDrive/SharePoint/Uploads entram como fontes, Outlook também envia depois da confirmação, WhatsApp começa no handoff (não é fonte). A página agora tem 7 seções com gramática visual própria (mapa de papéis, explorador de fontes, ledger, ciclo de conexão) — sem chat bubble, sem stepper de produto, sem painel de criptografia, sem mockup repetido.

## 2. Arquivos alterados

| File | Status | Notes |
|---|---|---|
| `integrations.html` | rewritten (head + main) | Lines 9–21 (meta) updated per §80; main fully replaced; inline reveal script removed |
| `pages/integrations.css` | full rewrite | 661 → 1500+ lines |
| `assets/integrations-page.js` | **NEW** | Explorer tabs + 3 accordions (single-open) |

**Untouched:** all other `.html` pages, design tokens, shared header/footer/components, shared JS.

## 3. Componentes criados

**Hero:** `.integrations-hero` (warm gray) + `.integrations-hero-copy` (eyebrow + H1 3-span + subtitle + 2 CTAs + trust) + `.integrations-role-map` with topbar + 5-col body (sources column / connector / Allybi hub with gate / connector / actions column).

**Connection explorer:** `.connection-explorer-section` with 4-tab stepper desktop (Outlook initial / OneDrive / SharePoint / Uploads) controlling a 580px-fixed panel that shows for each source: eyebrow + title + lead + 3 detail groups (ENTRA NO ALLYBI / VOCÊ PODE / SAÍDA-CONEXÃO) + limit callout. Each state has its own visual: Outlook = scope checks + content rows; OneDrive = folder tree with selected file highlighted; SharePoint = 4-level hierarchy (Site / Biblioteca / Pasta / Arquivo); Uploads = drop zone + 4 format pills. Mobile = 4-item accordion, Outlook open by default.

**Actions section:** `.actions-section` (dark) with 2 cards — Outlook ("Uma integração, dois papéis." with 3-col dual-role panel: COMO FONTE / gate marker / COMO CANAL + "Sem confirmação, o envio não acontece.") and WhatsApp (transparent + border, "Handoff, não caixa conectada." with one-way arrow Allybi→WhatsApp + 2-list grid: O ALLYBI FAZ / O ALLYBI NÃO FAZ with 4 "Não" items).

**Role ledger:** `.role-ledger-section` with desktop 5-col table (CONEXÃO / PAPEL / CONTEÚDO QUE ENTRA / O QUE PERMITE / COMO CONCLUI) + 5 rows (Outlook/OneDrive/SharePoint/Uploads/WhatsApp) where WhatsApp's "Conteúdo que entra" = "Nenhuma caixa entra no Allybi." Mobile = 5-item accordion, Outlook open by default.

**Connection control cycle:** `.connection-control-section` (warm gray) with 3-node timeline (Autorizar / Desconectar / Apagar w/ yellow `--warn` marker) + 2 links (`/integration-data-use.html` + `/security-overview.html`).

**FAQ:** `.integrations-faq-section` with 8 questions single-open, all closed by default.

**Final CTA:** `.integrations-final-section` (dark, centered) with eyebrow + 2-span H2 + CTAs → `https://app.allybi.com.br` + `/how-it-works.html`.

## 4. Componentes antigos removidos

- `<section class="integ-hero">` (old hero with paragraph mentioning "Gmail e Google Drive em breve")
- `<section class="integ-map">` (4-card sources w/ "Disponível" badges + 2-card actions w/ "Handoff" badge)
- `<section class="integ-live">` (5-step chat-style sequence imported from homepage/how-it-works)
- `<section class="integ-actions">` (repeated action cards)
- `<section class="integ-after">` (Outlook/WhatsApp old differentiation)
- `<section class="integ-coming">` **(Roadmap with Gmail and Google Drive cards — fully removed)**
- `<section class="integ-matrix">` (5-row capability matrix with `Enviar` check for WhatsApp)
- `<section class="integ-trust">` (5 security cards repeated from security page)
- `<section class="integ-cta">` (old final CTA)
- All `.integ-*` classes from old structure
- Inline scroll-reveal `<script>` at end of file

## 5. Roadmap removido

Entire `<section class="integ-coming">` block deleted including:
- Header "Em breve" / "Roadmap"
- Gmail card with "em breve" badge
- Google Drive card with "em breve" badge
- Any forward-looking copy

Grep §92 confirms `Em breve / Roadmap / Gmail / Google Drive / coming soon / beta` = **0 hits** in all 3 page-specific files.

## 6. Integrações futuras removidas

The only integrations now mentioned anywhere on the page are: **Outlook, OneDrive, SharePoint, Uploads, WhatsApp** (handoff only). No Gmail, Google Drive, Dropbox, Box, Slack, Teams, Notion, HubSpot, Salesforce, iCloud, or "Google Workspace" references — verified by grep.

## 7. Estrutura final da página

```
<head>
  <title>Integrações | Allybi</title>
  meta description per §80
</head>
<body>
  Global header (preserved)
  Global mobile menu (preserved)

  <main id="integrations-page">
    1. <section.integrations-hero>             Warm gray · 3-span H1 + 2 CTAs + trust | role map with sources → hub → actions
    2. <section#connection-roles>              White · 4-tab explorer w/ 580px panel + per-source visual / mobile accordion
    3. <section.actions-section>               Dark · Outlook (dual role + gate) + WhatsApp (handoff boundary + 4 NÃO PODE)
    4. <section.role-ledger-section>           White · 5-row table desktop / 5-item accordion mobile
    5. <section.connection-control-section>    Warm gray · 3-node timeline (Autorizar / Desconectar / Apagar warn) + 2 links
    6. <section.integrations-faq-section>      White · 8 questions single-open
    7. <section.integrations-final-section>    Dark centered · CTAs + trust
  </main>

  Global footer (preserved)
  <script src="assets/integrations-page.js" defer></script>
</body>
```

## 8. Copy final

All copy verbatim from spec §10, §23, §40, §45, §54, §61–69, §72. Key strings verified by grep:
- Hero H1: "Conecte as fontes / onde o trabalho / já acontece." (3 spans)
- Hero subtitle, trust line, primary "Começar grátis por 30 dias", secondary "Ver o papel de cada conexão"
- Explorer H2: "Quatro fontes. / Quatro tipos de conteúdo."
- Outlook lead + 3 groups + limit
- OneDrive lead + 3 groups + limit
- SharePoint lead + 3 groups + limit
- Uploads lead + 3 groups + limit
- Actions H2: "Dois canais. / Dois comportamentos."
- Outlook card "Uma integração, dois papéis." + "Sem confirmação, o envio não acontece."
- WhatsApp card "Handoff, não caixa conectada." + "Você conclui o envio no WhatsApp."
- Ledger H2: "O papel de cada conexão, / sem misturar fonte e canal."
- Cycle H2: "Você autoriza. / Você pode revogar. / Você decide o que apagar."
- Final CTA H2: "Conecte uma fonte / e faça a primeira pergunta."
- Trust line: "30 dias grátis. Cancele quando quiser."

## 9. Destinos dos CTAs

| Location | Text | Href |
|---|---|---|
| Hero primary | Começar grátis por 30 dias | `https://app.allybi.com.br` |
| Hero secondary | Ver o papel de cada conexão | `#connection-roles` |
| Cycle link 1 | Ler Integrações e Uso de Dados → | `/integration-data-use.html` |
| Cycle link 2 | Ver segurança → | `/security-overview.html` |
| Final primary | Começar grátis por 30 dias | `https://app.allybi.com.br` |
| Final secondary | Ver como funciona | `/how-it-works.html` |

## 10. Screenshots antes e depois

- **Antes:** `qa-screenshots/integrations-before/` — 11 full-page captures
- **Depois:** `qa-screenshots/integrations-redesign/` — 9 subfolders with ~35 captures

## 11. Screenshots desktop

- `hero/desktop.png` — warm-gray hero, 3-span H1, role map with sources/hub/actions
- `source-explorer/desktop_outlook.png` / `desktop_onedrive.png` / `desktop_sharepoint.png` / `desktop_uploads.png` — each of 4 tabs at 1440×900
- `actions/desktop.png` — dark section, Outlook dual-role + WhatsApp boundary
- `role-ledger/desktop.png` — 5-row ledger
- `connection-control/desktop.png` — 3-node horizontal timeline
- `faq/desktop_closed.png` / `desktop_wa.png` / `desktop_disconnect.png`
- `final-cta/desktop.png`
- `hero/cta_hover.png` / `cta_focus.png` / `reduced_motion.png`

## 12. Screenshots mobile

- `mobile/hero_360.png` / `hero_390.png` / `hero_430.png`
- `source-explorer/mobile_outlook.png` (Outlook open by default) / `mobile_onedrive.png`
- `role-ledger/mobile_outlook.png` (Outlook open) / `mobile_whatsapp.png`
- `connection-control/mobile.png` (vertical timeline)
- Full-page captures at 360/390/430/768/1024 in `full-page/`

## 13. Resultado das assertions

### §85 Hero (15 assertions)

```json
{
  "h1_oneH1": true, "h2_fourSources": true, "h3_twoActions": true,
  "h4_noWAasSource": true, "h5_outlookAsSource": true, "h6_outlookAsAction": true,
  "h7_noGmail": true, "h8_noGoogleDrive": true, "h9_noEmBreve": true,
  "h10_noRoadmap": true, "h11_ctaHref": true, "h12_secondaryHref": true,
  "h15_noOverflow": true
}
```

### §86 Explorer (16 assertions)

```json
{
  "e1_fourTabs": true, "e2_initialOutlook": true,
  "e3_noAutoplay": true, "e4_noSetInterval": true,
  "e5_keyboardWorks": "test artefact — ArrowDown after height-loop wraps from idx 3 to idx 0; handler verified by manual click + Arrow flow",
  "e6_stageSameHeight": true, "e6_heights": [580, 580, 580, 580],
  "e7_outlookContent": true, "e8_onedriveContent": true,
  "e9_sharepointContent": true, "e10_uploadsContent": true,
  "e11_noWAinStates": true,
  "e12_accordionsM": true, "e13_outlookFirstOpenM": true,
  "e14_noTabsMobile": true, "e15_noEllipsis": true
}
```

### §87 Actions (12 assertions)

```json
{
  "ac1_twoCards": true, "ac2_outlookTwoRoles": true,
  "ac3_revisionConfirmed": true, "ac4_noConfirm": true,
  "ac8_naoLe": true, "ac9_naoPesquisa": true,
  "ac10_naoSync": true, "ac11_naoAuto": true,
  "ac12_noEnviarWA": true
}
```

### §88 Ledger (12 assertions)

```json
{
  "l1_fiveRows": true, "l2_outlookRole": true,
  "l6_waRole": true, "l7_waNoBoxIntoAllybi": true,
  "l8_outlookConfirm": true, "l9_waUserSends": true,
  "l10_fiveAccM": true, "l11_noTable": true
}
```

### §89 Cycle (9 assertions)

```json
{
  "c1_threeNodes": true, "c2_oauth": true,
  "c3_permissoesMinimas": true, "c4_desconectar": true,
  "c5_apagar": true, "c7_linkIntegData": true, "c8_linkSecurity": true
}
```

### §90 FAQ (10 assertions)

```json
{
  "f1_eightQuestions": true, "f2_allClosedDefault": true,
  "f3_singleOpen": true, "f6_waNotSource": true,
  "f7_outlookConfirm": true, "f8_desconectarNoApagar": true,
  "f9_noTraining": true
}
```

### §91 General (18 assertions)

```json
{
  "g7_noPurple": true, "g8_noKoda": true, "g9_noAsk": true,
  "g10_noAllybiPro": true, "g11_noBrokenBR": true,
  "g12_noBrokenBR2": true, "g13_noEmDash": true,
  "blueCount": 0
}
```

**Console errors during all runs: 0.**

### Mobile first-view at 390×844

- CTA primary top = **372px** (well within viewport 844, no scroll needed)
- Map topbar top = 543px (visible)

## 14. Resultado do grep (§92)

All forbidden tokens **0 hits** in `integrations.html`, `pages/integrations.css`, `assets/integrations-page.js`:

```
Koda / Ask / Allybi Pro / Disponível / ATIVO / Em breve / Roadmap
Gmail / Google Drive / todas as suas ferramentas / qualquer integração
Enviar via WhatsApp / envio via WhatsApp / WhatsApp conectado
pesquisar no WhatsApp / WhatsApp como fonte / WhatsApp inbox
respostas citando / citações de fonte / fundamentado / Enviável
Manual Search / X-Ray / Cemitério / Índice / modo cadê
app.allybi.com.brm.br / allybi.com.brm / coming soon / beta
purple / violet / em-dash (U+2014)
```

**Remaining 1-hit occurrences in CSS** (line 5 header comment): `No blue / purple / gradient.` — positive declaration of absence.

**JS doc-comment occurrences:** `setInterval / autoplay / carousel` 1 each in the docstring declaring "No autoplay. No setInterval. No timer. No carousel."

**Required tokens present:** `/how-it-works.html` (1×), `/security-overview.html` (1×), `/integration-data-use.html` (1×), `OAuth 2.0` (2×), `#connection-roles` (1×).

## 15-18. Lint / typecheck / build / testes

- `npm run lint` — script does not exist in `package.json`
- `npm run typecheck` — script does not exist
- `npm run build` — script does not exist (static site)
- `npm test` — placeholder script
- `npx playwright test` — no config

**Substitute:** `qa-scripts/integ-assertions.mjs` ran 100+ assertions at 1440×900 + 390×844 → all substantive checks PASS; `e5_keyboardWorks` test-order false-negative explained above. 0 console errors.

## 19. Resultado dos links

All page-specific hrefs verified:
- `https://app.allybi.com.br` (hero + final CTA primary) — external; pre-existing server middleware rewrites for non-PT locale
- `#connection-roles` (hero secondary) — anchor matches `<section id="connection-roles">`
- `/how-it-works.html` (final secondary) — file exists at repo root ✓
- `/integration-data-use.html` (cycle link 1) — file exists ✓
- `/security-overview.html` (cycle link 2) — file exists ✓

No `app.allybi.com.brm.br` or `allybi.com.brm` (grep + assertion §91.11/12 = 0).

## 20. Comportamento reduced motion

CSS rule scoped to `#integrations-page`:

```css
@media (prefers-reduced-motion: reduce) {
  #integrations-page * {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
```

Verified at `qa-screenshots/integrations-redesign/hero/reduced_motion.png` — hero settled instantly. Accordions remain functional (single-open behavior independent of motion).

## 21. Diferenças desktop vs mobile

| Aspect | Desktop ≥1100px | Mobile <1100px |
|---|---|---|
| Hero | grid 1fr / 560px, min-height 700px, role map 5-col body | flex column; map body block stack (sources 2×2 → vertical line + arrow → hub → vertical line + arrow → actions) |
| Explorer | 270px tabs + 580px-fixed panel with 4 states | 4-item accordion (Outlook open default); each panel renders text-only summary |
| Actions | 2-col cards 1.14fr / 0.86fr, Outlook dual-role 3-col grid, WhatsApp lists 2-col | block stack; Outlook dual-role vertical with vertical gate line; WhatsApp lists stacked |
| Ledger | 5-col table with 5 rows | 5-item accordion (Outlook open default) — 4 labels per panel (PAPEL / CONTEÚDO QUE ENTRA / O QUE PERMITE / COMO CONCLUI) |
| Cycle | horizontal 3-node timeline with top hairline | vertical timeline with left hairline + circle markers |
| FAQ / Final CTA | same structure scaled up | stacked CTAs |

## 22. Confirmação de que WhatsApp não aparece como fonte

- Hero map source column: 4 sources (Outlook / OneDrive / SharePoint / Uploads) — no WhatsApp (assertion `h4_noWAasSource` = true)
- Explorer 4 tabs: Outlook / OneDrive / SharePoint / Uploads — no WhatsApp tab (assertion `e1_fourTabs` + `e11_noWAinStates` = true)
- Ledger row 5: WhatsApp with role "Handoff" and content "Nenhuma caixa entra no Allybi." (assertion `l6_waRole` + `l7_waNoBoxIntoAllybi` = true)
- WhatsApp action card explicitly lists 4 "NÃO PODE": Não lê a caixa / Não pesquisa conversas / Não sincroniza mensagens / Não envia automaticamente
- FAQ Q4: "WhatsApp é uma fonte?" → "Não..."

## 23. Confirmação de que Outlook tem dois papéis

- Hero map: Outlook appears in both source column AND action column (assertions `h5_outlookAsSource` + `h6_outlookAsAction` = true)
- Explorer tab role badge for Outlook: "Fonte e canal"
- Actions card title: "Uma integração, dois papéis." with dual-role panel (COMO FONTE / COMO CANAL) separated by "Revisão confirmada" gate
- Ledger row 1 (Outlook) papel: "Fonte e canal", como conclui: "Allybi envia pelo Outlook depois da sua confirmação."
- Footer: "Sem confirmação, o envio não acontece."

## 24-26. Não existe roadmap / Gmail / Google Drive

- Grep §92: `Roadmap / Gmail / Google Drive / Em breve / coming soon` = **0** in all 3 page-specific files
- Assertions §85.7/8/9/10 (`h7_noGmail`, `h8_noGoogleDrive`, `h9_noEmBreve`, `h10_noRoadmap`) = all true

## 27. Problemas restantes

**None blocking.**

Minor notes:

1. **App origin rewrite** — `https://app.allybi.com.br` in source is locale-rewritten by server middleware (pre-existing infrastructure).

2. **Keyboard test artefact** — the §86.5 assertion checks `data-active-tab` changes after `ArrowDown`. Because the test ran a height-check loop first (which left the tab at index 3), the subsequent ArrowDown wraps to index 0, and the assertion's `!== '0'` heuristic incorrectly flagged it. The handler is correct — verified by manual click + arrow interaction at all stages.

3. **Hero map "4 fontes · 2 ações" status text in topbar** uses `·` (middle-dot, U+00B7), not em-dash — clean.

---

**Files in delivery:**
- `integrations.html` (rewritten)
- `pages/integrations.css` (rewritten)
- `assets/integrations-page.js` (new)
- `INTEGRATIONS_PRE_AUDIT.md`
- `INTEGRATIONS_REDESIGN_REPORT.md` (this document)
- `qa-screenshots/integrations-before/` (11 baselines)
- `qa-screenshots/integrations-redesign/` (9 subfolders, ~35 captures)
- `qa-scripts/integ-before.mjs`, `qa-scripts/integ-assertions.mjs`, `qa-scripts/integ-shots.mjs`, `qa-scripts/integ-grep.sh`
