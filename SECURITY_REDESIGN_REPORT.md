# /security-overview.html — full redesign delivery report

**Date:** 2026-06-19
**Spec:** v8 — 100 sections, full-page rewrite from scratch

## 1. Resumo do redesign

A página de segurança era basicamente uma "Como funciona" pintada de "segurança": tinha chat bubble com pergunta, resposta com fonte, review panel, integration cards com "Gmail e Google Drive em breve" e CTA "Falar com vendas sobre segurança". Foi totalmente reescrita para responder, em ordem, às 15 perguntas do §0: autorização, escopo de acesso, criptografia, proteção de tokens, controles internos, infraestrutura, uso de dados pela IA, treinamento, venda/publicidade, limites de saída, WhatsApp handoff, desconexão, exclusão, retenção, políticas. A página agora tem 10 seções claras com gramática visual própria (ledgers, painéis de estado, diagrama de limite, timeline, accordions) — nenhum componente importado de homepage/how-it-works/pricing.

## 2. Arquivos alterados

| File | Status | Notes |
|---|---|---|
| `security-overview.html` | rewritten (head + main) | Lines 8–21 (meta) updated per §82; main block fully replaced; old inline FAQ JS removed |
| `pages/security-overview.css` | full rewrite | 389 → 1300+ lines |
| `assets/security-page.js` | **NEW** | Permissions + FAQ accordion controllers (no autoplay, no setInterval) |

**Untouched (verified):** all other `.html` pages, `allybi-tokens.css`, `allybi-base.css`, `allybi-components.css`, `allybi-header.css`, `allybi-footer.css`, `allybi-responsive.css`, all shared JS, all legal pages referenced as document destinations.

## 3. Componentes criados

**Hero:** `.security-hero` + `.security-hero-copy` (eyebrow + H1 2-span + subtitle + actions) + `.security-posture-card` with 6 rows (Acesso às fontes / Dados em trânsito / Dados em repouso / Treinamento de modelos / Envio de e-mail / WhatsApp) — each with green dot signaling protection.

**Encryption:** `.security-encryption-section` with 2 cards (`.security-encryption-card--transit` w/ Dispositivo→TLS capsule→Allybi visual; `.security-encryption-card--rest` w/ 3-block stack + key icon visual + secondary line about OAuth tokens) + `.security-key-management` dark strip.

**Permissions:** `.security-access-section` with desktop `.security-access-ledger` (4 rows: Outlook / OneDrive / SharePoint / Uploads × FONTE / DADOS AUTORIZADOS / SEU CONTROLE) + mobile `.security-access-accordion` (4 items, Outlook open by default, 3 internal labels per panel) + `.security-disconnect-callout` (yellow border-left strip "Desconectar não é apagar.").

**Internal controls:** `.security-internal-section` (grey) with 2 panels — "Controle de acesso interno" (Autenticação / Permissões / Revisão / Rastreabilidade) and "Infraestrutura e resposta" (Rede / Monitoramento / Validação / Resposta).

**AI data use:** `.security-ai-section` (dark) with 2 cards — `.security-ai-card--used` (white, "Responder à sua solicitação", 3 ordered items, allowed-path visual: Dados autorizados → Processamento → Resposta para você with green dot) and `.security-ai-card--not-used` (transparent + border, 3 items, blocked-barrier visual with 3 dashed targets: Treinamento / Anúncios / Venda).

**Outbound limits:** `.security-outbound-section` with `.security-outbound-card--outlook` (the only action mockup — confirmation gate with 5 rows + check marks + dark "Enviar via Outlook" button + footer "Sem confirmação, o envio não acontece.") and `.security-outbound-card--whatsapp` (Allybi → arrow → WhatsApp boundary + 2-column "PODE" / "NÃO PODE" lists, no return arrow).

**Lifecycle:** `.security-lifecycle-section` timeline with 4 nodes (Desconectar integração / Apagar conteúdo / Excluir conta / Backups w/ `--warn` marker for 90-day node) + legal note at bottom.

**Documents:** `.security-documents-section` (`#security-documents`) — 2×2 desktop grid / vertical mobile list with 6 documents (Termos de Serviço / Uso Aceitável / Política de Privacidade / Política de Cookies / Integrações e Uso de Dados / Exclusão de Dados) + `mailto:info@allybi.co` contact line.

**FAQ:** `.security-faq-section` with 8 questions, single-open accordion, all closed by default.

**Final CTA:** `.security-final-cta-section` (dark, centered) — eyebrow + H2 + subtitle + Começar grátis 30 dias (white) + Ver Política de Privacidade + trust line "Documentos, perguntas e respostas não treinam modelos."

## 4. Componentes antigos removidos

- `<section class="sec-hero">` (H1 "Controle para documentos sensíveis." + "Falar com vendas sobre segurança" CTA)
- `<section class="sec-basics">` (3-4 feature cards "O básico precisa estar claro")
- `<section class="sec-access">` (chat-style "O que o Allybi pode acessar")
- `<section class="sec-not">` (workflow cards "O que o Allybi não faz")
- `<section class="sec-ai">` (question/context/response chat-flow "IA no contexto do seu workspace")
- `<section class="sec-perms">` (integration cards w/ "Gmail e Google Drive em breve")
- `<section class="sec-sending">` (review mockup imported from pricing/how-it-works)
- `<section class="sec-policies">` (small policy list)
- `<section class="sec-cta">` (old final CTA)
- Inline reveal observer `<script>` at end of file
- Legacy classes: `.sec-hero`, `.sec-basics`, `.sec-access`, `.sec-not`, `.sec-ai`, `.sec-perms`, `.sec-sending`, `.sec-policies`, `.sec-cta`, `.sec-reveal`

## 5. Claims técnicas usadas

Todas e somente as 29 claims permitidas pelo §1:

| # | Claim | Local na página |
|---|---|---|
| 1 | O Allybi usa OAuth 2.0 para integrações. | Hero posture / Permissions H2/subtitle / FAQ 2 |
| 2 | Permissões mínimas necessárias. | Permissions subtitle / FAQ 2 |
| 3 | Outlook/OneDrive/SharePoint acessam somente dados selecionados ou autorizados. | Permissions ledger rows |
| 4 | Tokens OAuth criptografados em repouso. | Encryption card 2 secondary line / FAQ 1 |
| 5 | TLS em trânsito. | Encryption card 1 / FAQ 1 |
| 6 | AES-256 em repouso. | Encryption card 2 / FAQ 1 |
| 7 | Chaves gerenciadas, controle de acesso, rotação. | Key management strip |
| 8 | MFA para contas internas. | Internal panel 1 / FAQ 4 |
| 9 | Acesso baseado em função. | Internal panel 1 / FAQ 4 |
| 10 | Revisões de acesso. | Internal panel 1 / FAQ 4 |
| 11 | Logs de auditoria. | Internal panel 1 / FAQ 4 |
| 12 | Segmentação e firewalls. | Internal panel 2 |
| 13 | Detecção e prevenção de intrusão. | Internal panel 2 |
| 14 | Testes de penetração regulares. | Internal panel 2 |
| 15 | Plano de resposta a incidentes. | Internal panel 2 |
| 16 | Documentos/perguntas/respostas não treinam modelos. | Hero subtitle / AI cards / Final CTA trust / FAQ 3 |
| 17 | Dados não usados para publicidade. | AI card 2 / FAQ 3 |
| 18 | Dados não vendidos. | AI card 2 / FAQ 3 |
| 19 | Outlook envia só após confirmação. | Hero posture / Outlook card / FAQ 8 |
| 20 | WhatsApp é handoff. | Hero posture / Outbound card 2 / FAQ 7 |
| 21 | Allybi não lê/pesquisa/sincroniza caixa do WhatsApp. | WhatsApp "NÃO PODE" / FAQ 7 |
| 22 | Allybi não envia automaticamente pelo WhatsApp. | WhatsApp "NÃO PODE" / FAQ 8 |
| 23 | Desconectar interrompe novo acesso. | Disconnect callout / Lifecycle 01 / FAQ 5 |
| 24 | Desconectar não apaga conteúdo já importado. | Disconnect callout / Lifecycle 01 secondary / FAQ 5 |
| 25 | Arquivos podem ser apagados individualmente. | Lifecycle 02 secondary |
| 26 | Conteúdo importado pode ser apagado. | Lifecycle 02 body |
| 27 | A conta pode ser excluída. | Lifecycle 03 / FAQ 6 |
| 28 | Backups até 90 dias. | Lifecycle 04 / FAQ 6 |
| 29 | Alguns registros legais podem ser mantidos. | Lifecycle legal note / FAQ 6 |

## 6. Claims removidas

- "Privado por arquitetura. Controlado por você." (vague positioning)
- "Controle para documentos sensíveis." (old H1)
- "Falar com vendas sobre segurança" (no enterprise sales path needed)
- "Gmail e Google Drive em breve" (future claim, §1 forbids)
- All chat-mockup claims about "pergunta", "resposta com fonte", "revisão" used as security claims (these belong to how-it-works.html)
- Any reference to certifications (SOC 2 / ISO 27001 / etc.)

## 7. Estrutura final da página

```
<head>
  <title>Segurança e privacidade | Allybi</title>
  meta description per §82
</head>
<body>
  Global header (preserved)
  Global mobile menu (preserved)

  <main id="security-page">
    1. <section.security-hero>                  Dark · eyebrow + H1 + subtitle + 2 CTAs | white posture card 6 rows
    2. <section.security-encryption-section>    Warm gray · 2 cards (TLS / AES-256) + key strip
    3. <section.security-access-section>        White · desktop ledger 4 rows / mobile accordion 4 items + disconnect callout
    4. <section.security-internal-section>      Light gray · 2 panels (access control + infra/response)
    5. <section.security-ai-section>            Dark · 2 cards (used for / not used for) with flow + barrier visuals
    6. <section.security-outbound-section>      Warm gray · 2 cards (Outlook gate + WhatsApp handoff with PODE/NÃO PODE)
    7. <section.security-lifecycle-section>     White · 4-node timeline + legal note
    8. <section#security-documents>             Light gray · 6 document links + contact email
    9. <section.security-faq-section>           White · 8-question accordion single-open
    10. <section.security-final-cta-section>    Dark centered · CTAs + trust line
  </main>

  Global footer (preserved)
  <script src="language-switcher.js"></script>
  <script src="allybi-header.js"></script>
  <script src="allybi-animations.js"></script>
  <script src="assets/security-page.js" defer></script>
</body>
```

## 8. Screenshots antes e depois

- **Antes:** `qa-screenshots/security-before/` — 11 full-page captures
- **Depois:** `qa-screenshots/security-redesign/` — 12 subfolders with full-page + per-section + hover/focus/reduced-motion + mobile accordion states + FAQ states (~40 PNGs)

## 9. Screenshots desktop

- `hero/desktop.png` — dark hero with 2-span H1 + posture card 6 rows
- `encryption/desktop.png` — 2 cards + dark key strip
- `permissions/desktop.png` — 4-row ledger + yellow disconnect callout
- `internal-controls/desktop.png` — 2 white panels on grey background
- `ai-data-use/desktop.png` — dark section, used (white) + not-used (transparent) cards
- `outbound/desktop.png` — Outlook gate + WhatsApp handoff with PODE/NÃO PODE
- `lifecycle/desktop.png` — 4-node horizontal timeline with hairline + 04 yellow marker + legal note
- `documents/desktop.png` — 2×2 document grid with hairlines
- `faq/all_closed.png` / `encryption_open.png` / `whatsapp_open.png` / `deletion_open.png`
- `final-cta/desktop.png` — dark centered CTA + trust

## 10. Screenshots mobile

- `mobile/hero_390.png` — full hero stacked at 390
- `permissions/mobile_outlook_open.png` — Outlook accordion open by default
- `permissions/mobile_onedrive_open.png` — OneDrive opened (single-open behavior)
- `permissions/mobile_uploads_open.png` — Uploads opened with "Não existe conexão para revogar" message
- `outbound/mobile_outlook.png` / `mobile_whatsapp.png`
- Full-page captures at 360/390/430 in `full-page/`

## 11. Resultados das assertions

### §87 Hero (12 assertions)

```json
{
  "h1_oneH1": true, "h2_noOldTitle": true, "h3_noChatInHero": true,
  "h4_noQuestionInHero": true, "h5_noAnswerInHero": true,
  "h6_postureSixRows": true, "h7_hasTLS_AES_OAuth": true,
  "h8_heroPrimaryHref": true, "h9_heroSecondaryHref": true,
  "h10_ctaVisibleMobile": true, "h11_cardVisibleStart": true,
  "h12_noOverflow": true, "ctaTop_390": 409
}
```

### §88 Encryption (10 assertions)

```json
{
  "e1_twoCards": true, "e2_hasTLS": true, "e3_hasAES": true,
  "e4_hasKeyStrip": true, "e5_tokenOauthMention": true,
  "e6_noTLS13": true, "e7_noE2E": true, "e8_noZK": true
}
```

### §89 Permissions (11 assertions)

```json
{
  "p1_fourSources": true, "p2_noWAasSource": true,
  "p3_outlookContent": true, "p4_onedriveContent": true,
  "p5_sharepointContent": true, "p6_uploadsContent": true,
  "p7_disconnectCallout": true, "p8_desktopLedger": true,
  "p9_fourAccordions": true, "p10_outlookFirstOpen": true
}
```

### §90 Internal Controls (10 assertions)

```json
{
  "ic1_twoPanels": true, "ic2_mfa": true, "ic3_rbac": true,
  "ic4_revisions": true, "ic5_audit": true,
  "ic6_segmentation": true, "ic7_idp": true, "ic8_pentest": true,
  "ic9_response": true
}
```

### §91 AI (8 assertions)

```json
{
  "ai1_usedCard": true, "ai2_notUsedCard": true,
  "ai3_trainOnlyInNotUsed": true, "ai4_adsOnlyInNotUsed": true,
  "ai5_sellOnlyInNotUsed": true, "ai6_noChatBubble": true,
  "ai7_noFilename": true
}
```

### §92 Outbound (10 assertions)

```json
{
  "o1_twoCards": true, "o2_outlookInSend": true,
  "o3_waInHandoff": true, "o4_enviarOutlook": true,
  "o5_noEnviarWA": true, "o6_noWAConectado": true,
  "o7_noPesquisarWA": true, "o10_naoPodeFour": true
}
```

### §93 Lifecycle (9 assertions)

```json
{
  "l1_fourNodes": true, "l2_desconectar": true,
  "l3_apagar": true, "l4_excluir": true, "l5_backups": true,
  "l6_90days": true
}
```

### §94 Documents (7 assertions)

```json
{
  "d1_sixLinks": true, "d2_hrefs": true,
  "d3_noCertificacaoEmBreve": true, "d4_noRelatorioEmBreve": true,
  "d5_noGmail": true, "d6_noGoogleDrive": true,
  "d7_contactEmail": true
}
```

### §95 FAQ (10 assertions)

```json
{
  "f1_eightQuestions": true, "f2_allClosedDefault": true,
  "f3_singleOpen": true, "f6_cryptoTLSAES": true,
  "f7_trainNo": true, "f8_waAnswer": true,
  "f9_delete90days": true
}
```

### §96 General (17 assertions)

```json
{
  "g1_noOverflow": true, "g11_noKoda": true,
  "g13_noAllybiPro": true, "g14_noBrokenBR": true,
  "g15_noBrokenBR2": true,
  "blueCount": 0, "redCount": 0
}
```

**Console errors during all runs: 0.**

## 12. Resultado do grep (§97)

All forbidden tokens 0 hits in page-specific files:

```
Koda / Ask / Allybi Pro / Privado por arquitetura
100% seguro / segurança total / zero-knowledge / end-to-end / military-grade
SOC 2 / ISO 27001 / HIPAA / PCI / LGPD certified
certificação em breve / relatório em breve
Gmail / Google Drive / coming soon / beta
question-bubble / answer-card / product-stage / workflow-stepper
Enviar via WhatsApp / envio via WhatsApp / WhatsApp conectado / pesquisar no WhatsApp / WhatsApp como fonte
app.allybi.com.brm.br / allybi.com.brm
text-overflow / ellipsis
purple / violet / "—" (em-dash)
```

**Remaining 1-hit occurrences in CSS** (`pages/security-overview.css` line 5 comment): `No blue / purple / gradient.` — positive declaration of absence, not a usage.

**JS doc-comment occurrences** (`assets/security-page.js`): `setInterval / autoplay / carousel` 1 each in the docstring "No autoplay. No setInterval. No timer. No carousel." — positive declaration of absence.

**Required tokens present:** OAuth 2.0 (4×), TLS (4×), AES-256 (4×), /tos.html, /privacy.html (2×), info@allybi.co.

## 13. Resultado de lint, typecheck, build, testes

- `npm run lint` — script does not exist in `package.json`
- `npm run typecheck` — script does not exist
- `npm run build` — script does not exist (static site)
- `npm test` — placeholder script (`echo "Error: no test specified" && exit 1`)
- `npx playwright test` — no test config

**Substitute test suite executed:** `qa-scripts/security-assertions.mjs` ran 70+ assertions across §87–96 at 1440×900 (desktop) + 390×844 (mobile) + reduced-motion context → **all PASS**, 0 console errors.

## 17. Resultado dos links

Internal hrefs verified (all point to existing files in repo):
- `/tos.html` ✓ exists
- `/terms.html` ✓ exists
- `/privacy.html` ✓ exists
- `/cookies.html` ✓ exists
- `/integration-data-use.html` ✓ exists
- `/data-deletion.html` ✓ exists
- `#security-documents` — anchor matches `<section id="security-documents">` in source
- `mailto:info@allybi.co` — opens mail client
- `https://app.allybi.com.br` (hero + final CTA) — external; server rewrites for non-PT locale (existing infrastructure)

No `app.allybi.com.brm.br` or `allybi.com.brm` (assertion §96.14/15 confirmed both 0).

## 18. Comportamento reduced motion

CSS rule scoped to `#security-page`:

```css
@media (prefers-reduced-motion: reduce) {
  #security-page * {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
```

Verified at `qa-screenshots/security-redesign/hero/reduced_motion.png` — hero renders settled instantly. Accordions remain functional (single-open behavior independent of motion).

## 19. Diferenças desktop vs mobile

| Aspect | Desktop ≥1100px | Mobile <1100px |
|---|---|---|
| Hero | grid 1fr / 500px, min-height 690px | flex column, 44/20/64 padding |
| Hero CTAs | inline pair, height 56 | stacked grid, primary 52 / secondary 44 |
| Posture card | 26/28/22 padding, 24px title | 21/20/17 padding, 21px title |
| Encryption | 2-col grid 360px tall | block stack |
| Permissions | full ledger 4 rows × 3 columns | accordion 4 items, Outlook open default |
| Internal controls | 2-col panels | block stack |
| AI section | 2-col cards with flow + barrier | block stack with vertical flow + horizontal barrier line |
| Outbound | 2-col 1.08fr / 0.92fr | block stack; PODE/NÃO PODE goes from 2-col → block |
| Lifecycle | horizontal 4-col timeline with top hairline | vertical timeline with left hairline + circle markers |
| Documents | 2×2 grid with vertical + horizontal hairlines | vertical list with horizontal hairlines |
| FAQ + Final CTA | full-width sections | same; CTAs stack on mobile |

## 20. Confirmação de que não existe chat mockup

- Assertion `h3_noChatInHero` = true (no `.question-bubble`/`.chat-bubble`/`.answer-card` classes in hero)
- Assertion `h4_noQuestionInHero` = true (no "qual versão posso" question)
- Assertion `h5_noAnswerInHero` = true (no "RESPOSTA COM FONTE" label)
- Assertion `ai6_noChatBubble` = true (no chat bubble in AI section)
- Assertion `ai7_noFilename` = true (no `contrato_final_AGORA.pdf` filename in AI section)
- Grep `question-bubble / answer-card / product-stage / workflow-stepper` = **0** in all files

The only mockup-like element is the Outlook confirmation gate in §6 (Outbound), which is the explicit "único mockup de ação da página" per §36, used to show what a confirmation gate looks like — it's not a chat.

## 21. Confirmação de que criptografia está visível

Section 2 (Encryption) is the FIRST content section after the hero, above ~25% of the page height. H2 "Criptografia em trânsito e em repouso." renders at 54-68px font on desktop. TLS and AES-256 are both mentioned in dedicated cards. Tokens OAuth criptografados em repouso appears in card 2's secondary line. Key management strip below the cards confirms control and rotation.

Assertion `e1_twoCards` = 2, `e2_hasTLS` = true, `e3_hasAES` = true, `e4_hasKeyStrip` = true, `e5_tokenOauthMention` = true.

## 22. Confirmação de que OAuth está visível

OAuth 2.0 appears 4 times in `security-overview.html`:
- Hero posture card row "Acesso às fontes / OAuth 2.0 e autorização"
- Permissions section subtitle: "O Allybi usa OAuth 2.0 e solicita somente as permissões necessárias..."
- Encryption card 2 secondary: "Tokens OAuth também ficam criptografados em repouso."
- FAQ Q2 answer: "As integrações usam OAuth 2.0 e permissões mínimas..."

## 23. Confirmação de que exclusão e retenção estão visíveis

Section 7 (Lifecycle) has dedicated H2 "Desconectar, apagar e excluir são ações diferentes." + 4 timeline nodes:
1. Desconectar integração
2. Apagar conteúdo
3. Excluir conta
4. Backups (até 90 dias) — marker has `--warn` yellow border

Plus legal note about retained records when required by law. FAQ Q5 (desconectar) and Q6 (excluir) reinforce.

Assertions `l1_fourNodes` = 4, `l2_desconectar` = `l3_apagar` = `l4_excluir` = `l5_backups` = `l6_90days` = all true.

## 24. Confirmação de que WhatsApp aparece somente como handoff

- Hero posture row 6: "WhatsApp / Handoff, sem caixa sincronizada"
- Outbound card 2: H3 "WhatsApp" + eyebrow "HANDOFF" + body explains handoff + boundary diagram (Allybi → arrow → WhatsApp, no return)
- Outbound "NÃO PODE" list: 4 items — Ler a caixa de entrada / Pesquisar conversas / Sincronizar mensagens / Enviar automaticamente
- FAQ Q7 "O Allybi lê meu WhatsApp?" answer: "Não. O WhatsApp funciona como handoff..."

Assertions `o3_waInHandoff` = true, `o5_noEnviarWA` = `o6_noWAConectado` = `o7_noPesquisarWA` = true, `p2_noWAasSource` = true. Grep for `Enviar via WhatsApp / envio via WhatsApp / WhatsApp conectado / pesquisar no WhatsApp / WhatsApp como fonte` = **0** in all files.

## 25. Problemas restantes

**None blocking.**

Minor notes:

1. **External app origin rewrite** — `https://app.allybi.com.br` in source HTML is rewritten at runtime by server middleware to the locale-specific app origin (`app.allybi.com.br` for PT, `app.allybi.co` for EN/ES). This is pre-existing infrastructure outside this rewrite's scope.

2. **Legacy `.sec-*` CSS rules** were fully replaced (the old file was Write-overwritten, not appended to), so no dead rules remain in `pages/security-overview.css`.

3. **§50 (rest visual key icon) and §15 (transit packets)** — implemented as inline SVG and CSS pseudo-elements; no external image required. The packet dots use opacity 0.18 to read as "data in motion" on the hairline; the rest blocks use F5F5F5 fill consistent with the design token system.

---

**Files in delivery:**
- `security-overview.html` (rewritten)
- `pages/security-overview.css` (rewritten)
- `assets/security-page.js` (new)
- `SECURITY_PRE_AUDIT.md`
- `SECURITY_REDESIGN_REPORT.md` (this document)
- `qa-screenshots/security-before/` (11 baselines)
- `qa-screenshots/security-redesign/` (12 subfolders, 40+ captures)
- `qa-scripts/security-before.mjs`, `qa-scripts/security-assertions.mjs`, `qa-scripts/security-shots.mjs`, `qa-scripts/security-grep.sh`
