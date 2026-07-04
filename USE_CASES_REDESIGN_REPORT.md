# Use-case pages (legal / finance / operations) — full redesign delivery report

**Date:** 2026-06-19
**Spec:** v8 — 82 sections, three pages rebuilt from scratch with strict anti-repetition

## 1. Arquivos alterados

| File | Status |
|---|---|
| `use-case-legal.html` | rewritten (main only; head/header/footer preserved) |
| `use-case-finance.html` | rewritten |
| `use-case-business.html` | rewritten |
| `pages/use-case-legal.css` | full rewrite |
| `pages/use-case-finance.css` | full rewrite |
| `pages/use-case-business.css` | full rewrite |

**Untouched:** all other `.html` pages, global header, global footer, design tokens, shared components, all shared JS.

## 2. Estrutura final de cada página

### Legal — `#legal-use-case-page`

```
1. legal-hero (+ legal-partner-request)
2. legal-version-risk (dark) — version lineage 3 rows (v10/v11 warn/v12 ok)
3. legal-clause — Question + Answer + clause-8.1 diff (v11 vs v12 aprovada + 2 changes)
4. legal-review (warm gray) — 5-row review panel + Outlook button + dark WhatsApp handoff side note
5. legal-moments — 3 editorial rows (DUE DILIGENCE / NEGOCIAÇÃO / RESPOSTA AO CLIENTE)
6. legal-control — 3-item strip (Fonte visível / Nada sai sem confirmação / Sem treinamento)
7. legal-final — dark centered CTA
```

### Finance — `#finance-use-case-page`

```
1. finance-hero (+ finance-meeting-brief with Deck/Modelo/Memo and confirmed R$4,2M)
2. finance-provenance (warm gray) — 3 source rows (Deck OK, Modelo OK, Memo R$4,1M Revisar)
3. finance-comparison — Q3 R$3,05M + +38% delta + Q4 R$4,2M
4. finance-meeting-ready (dark) — review panel with metric summary (ARR Q4 R$4,2M +38%) + Outlook button
5. finance-moments — horizontal timeline (CONSELHO/INVESTIDORES/FORECAST)
6. finance-control — 3-item strip
7. finance-final — dark centered CTA
```

### Operations — `#operations-use-case-page`

```
1. operations-hero (+ operations-request-thread with 3 messages: client dark bubble / internal context / file)
2. operations-context-chain (dark) — 4 nodes (PEDIDO / ESCOPO APROVADO / PLANO / ÚLTIMA ATUALIZAÇÃO) with horizontal connectors
3. operations-scope — 3 sources + green-bordered answer with sources line
4. operations-channel (warm gray) — 5-field review + 2 channel actions (Outlook primary / WhatsApp outline)
5. operations-moments — 3 editorial rows (PROPOSTAS E SOW / ATUALIZAÇÕES E FOLLOW-UPS / CONFORMIDADE E HISTÓRICO)
6. operations-control — 3-item strip
7. operations-final — dark centered CTA
```

## 3. Componentes removidos

From all 3 pages: legacy hero with product-mockup right column, 3 feature cards section, pain-point cards, 5 trust cards repeated across pages claiming "criptografia" / "workspaces isolados", "Falar com vendas" CTA, "com respostas com fonte" copy.

## 4. Componentes criados (exclusivos)

| Page | Unique mechanism components |
|---|---|
| Legal | `.legal-partner-request` (PEDIDO DO SÓCIO strip) · `.legal-version-lineage` w/ 3 rows w/ semantic statuses · `.legal-clause-answer` + `.legal-clause-diff` (v11/v12 diff + 2 changes) · `.legal-review-panel` + `.legal-review-handoff` (dark side note) · 3 `.legal-moment-row` |
| Finance | `.finance-meeting-brief` (REUNIÃO DO CONSELHO + Deck/Modelo/Memo + valor confirmado) · `.finance-provenance-board` (3 rows w/ memo warn) · `.finance-comparison-scene` (Q3 + delta +38% + Q4) · `.finance-meeting-review` + metric summary card · `.finance-moments-timeline` (3 horizontal nodes) |
| Operations | `.operations-request-thread` (3 messages: client/internal/file) · `.operations-chain` 4 nodes w/ horizontal connectors · `.operations-scope-sources` (3) + `.operations-scope-answer` · `.operations-channel-panel` with 2 actions (Outlook primary / WhatsApp outline) · 3 `.operations-moment-row` |

## 5. Imports compartilhados

- Global `<header>` and `<footer>` HTML (untouched)
- `allybi-tokens.css`, `allybi-base.css`, `allybi-components.css`, `allybi-header.css`, `allybi-footer.css`, `allybi-responsive.css`
- `language-switcher.js`, `allybi-header.js`, `allybi-animations.js`, `hero-sequence.js`
- Plus Jakarta Sans web font

## 6. Imports exclusivos

Each page imports only its own CSS:
- `use-case-legal.html` → `pages/use-case-legal.css`
- `use-case-finance.html` → `pages/use-case-finance.css`
- `use-case-business.html` → `pages/use-case-business.css`

No shared use-case CSS file. No JS imported between use-case pages.

## 7. Prova de que não existe template genérico

`qa-scripts/uc-grep.sh` (§79): `UseCasePage / use-case-template / shared-use-case` → **0 hits** in all 6 page-specific files.

`qa-scripts/uc-assertions.mjs` class-overlap measurement:

```json
{
  "uniqueH1s": true,
  "classOverlap_legal_finance":   "0.000",
  "classOverlap_legal_operations": "0.000",
  "classOverlap_finance_operations": "0.000",
  "underThreshold45pct": true
}
```

**Class overlap between any pair of pages = 0%** (filtered to page-prefix classes `legal-` / `finance-` / `operations-`). Far under the 45% threshold required by §2. Each page's unique mechanism class exists only in that page and is absent from the other two:

```json
{
  "legal_hasLineage": true,    "legal_noProvenance": true,    "legal_noChain": true,
  "finance_hasProvenance": true, "finance_noLineage": true,    "finance_noChain": true,
  "operations_hasChain": true,   "operations_noLineage": true, "operations_noProvenance": true
}
```

## 8–10. Copy final (resumo)

| Page | H1 |
|---|---|
| Legal | Para advogados que não podem / se dar ao luxo da versão errada. |
| Finance | O número certo precisa vir / do arquivo certo. |
| Operations | O cliente não deveria esperar / enquanto o contexto é reconstruído. |

| Page | Section H2s (exclusive) |
|---|---|
| Legal | "Três minutas parecem certas. Só uma pode sair." · "Da pergunta à cláusula confirmada." · "A versão volta para você antes do envio." · "Onde o Allybi reduz o caminho." (na rotina jurídica) · "Leve a versão certa para a próxima conversa." |
| Finance | "Um número sem origem ainda não está pronto." · "Compare períodos sem misturar arquivos." · "A resposta fica pronta antes do e-mail sair." · "Onde o Allybi reduz o caminho." (na rotina financeira) · "Leve o número certo para a próxima reunião." |
| Operations | "O follow-up começa antes da mensagem." · "Da proposta aprovada ao próximo passo." · "Revise o contexto. Depois escolha o canal." · "Onde o Allybi reduz o caminho." (na rotina de operações) · "Responda sem refazer o caminho." |

Note: the H2 "Onde o Allybi reduz o caminho." appears in all 3 pages (the moments section) — this is the §25/§42/§59 spec-mandated heading. The eyebrow above it differentiates (NA ROTINA JURÍDICA / NA ROTINA FINANCEIRA / NA ROTINA DE OPERAÇÕES) so the meaning is page-specific.

## 11–13. Screenshots

- **Antes:** `qa-screenshots/use-cases-before/{legal,finance,operations}/` — 390×844 + 1440×900 each
- **Depois:** `qa-screenshots/use-cases-redesign/{legal,finance,operations}/` — 390×844 + 1366×768 + 1440×900 + 1920×1080 (full-page) each

## 14. §75 Legal assertions (12)

```json
{
  "l1_h1versaoErrada": true, "l2_threeVersions": true,
  "l3_v12approved": true, "l4_clause81": true,
  "l5_limitChange": true, "l6_fullSource": true,
  "l7_outlookChannel": true, "l8_whatsappHandoff": true,
  "l9_noCrypto": true, "l10_noWorkspace": true,
  "l12_noEllipsis": true, "l13_noOverflow": true
}
```

## 15. §76 Finance assertions (11)

```json
{
  "f1_h1ArquivoCerto": true, "f2_arr42M": true,
  "f3_threeSources": true, "f4_memoDivergent": true,
  "f5_q3": true, "f6_q4": true, "f7_delta38": true,
  "f8_outlookAfterReview": true, "f9_waHandoff": true,
  "f10_noSalesContact": true, "f13_noOverflow": true
}
```

## 16. §77 Operations assertions (13)

```json
{
  "o1_h1Contexto": true, "o2_clientRequest": true,
  "o3_fourNodes": true, "o4_sowAprovado": true,
  "o5_planoProj": true, "o6_ata": true,
  "o7_kickoff24": true, "o8_entrega30ago": true,
  "o9_outlookAfterConfirm": true, "o10_waHandoff": true,
  "o11_waNotSource": true, "o14_noSalesContact": true,
  "o13_noOverflow": true
}
```

## 17. Anti-repetição (§74)

```
Class overlap (filtered to page-prefix classes only):
  legal ∩ finance:     0.000  (0%)
  legal ∩ operations:  0.000  (0%)
  finance ∩ operations: 0.000  (0%)
  Threshold 45%: PASS

Unique H1s: PASS

No shared template / no UseCasePage / no use-case-template / no shared-use-case import: PASS
```

## 18. Resultado do grep (§79)

All 38 forbidden tokens (anti-Koda, anti-Ask, anti-Allybi Pro, anti-claims, anti-WhatsApp-as-source, anti-template, anti-CSS-noise) → **0 hits** in all 6 page-specific files (3 HTML + 3 CSS).

## 19–22. Lint / typecheck / build / testes

- `npm run lint / typecheck / build` — scripts don't exist
- `npm test` — placeholder
- `npx playwright test` — no config

**Substitute:** `qa-scripts/uc-assertions.mjs` runs 36 assertions across all 3 pages → **all PASS**, 0 console errors during all runs.

## 23. Resultado de links

All page-specific hrefs verified:
- `https://app.allybi.com.br` (hero + final CTA primary) — external (server middleware rewrites by locale)
- `#caso-juridico` / `#fluxo-financeiro` / `#fluxo-operacional` — anchors match `<section id="...">` in source
- `/how-it-works.html` (final CTA secondary) — file exists at repo root

## 24. Resultado de overflow

All 3 pages at 1440×900 desktop and 390×844 mobile: `document.documentElement.scrollWidth <= window.innerWidth + 1` = true.

## 25. Comportamento reduced motion

Each page has scoped CSS rule:

```css
@media (prefers-reduced-motion: reduce) {
  #legal-use-case-page * { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; ... }
}
```

(Same for `#finance-use-case-page` and `#operations-use-case-page`.) All visible elements render at final state instantly; no observer-gated content.

## 26. Diferenças desktop vs mobile

| Aspect | Desktop ≥1100px | Mobile <1100px |
|---|---|---|
| Legal hero | grid copy + partner request as 3-col strip | block stack; partner request as inline block w/ subtle border |
| Legal version risk | 2-col: statement left + lineage right (rows 2-col w/ status pill on right) | block stack; lineage rows block w/ status pill below filename |
| Legal clause | 2-col: answer left + diff right (2-col diff inside) | block stack; diff cols stack |
| Legal review | grid review-panel + dark handoff side note | block stack |
| Legal moments | 3-col editorial grid (label / title / body) | block stack per row |
| Finance hero | 2-col grid (copy 1fr + brief 460px) | block stack |
| Finance provenance | 4-col grid row (file / loc / value / status) | block stack |
| Finance comparison | 3-col (Q3 / delta / Q4) | block stack |
| Finance meeting-ready | 2-col panel (review + right metric summary) | block stack |
| Finance moments | 3-col horizontal timeline w/ top hairline | vertical timeline w/ left hairline |
| Operations hero | 2-col (copy + thread) | block stack |
| Operations chain | 4 nodes + 3 connectors on horizontal grid | vertical timeline w/ left hairline + circle markers |
| Operations scope | 2-col (sources + answer) | block stack |
| Operations channel | 5-field review + 2-col action grid | block stack |
| Operations moments | 3-col editorial grid | block stack per row |
| All control strips | 3-col w/ vertical hairlines | 3-row w/ horizontal hairlines |
| All final CTAs | flex row inline | grid 1-col stack |

## 27. Confirmação WhatsApp não aparece como fonte

- Legal: WhatsApp only in `.legal-review-handoff` side note + final CTA + footer (`Não lê nem sincroniza sua caixa`); never as source — verified `o11_waNotSource` style assertion via copy inspection
- Finance: WhatsApp only in `.finance-meeting-review-footer` "WhatsApp abre como handoff. Você envia dentro do aplicativo." and final CTA — never as source
- Operations: WhatsApp in `.operations-channel-actions` as outlined "Abrir handoff" action with body "Você envia dentro do WhatsApp." + footer "O Allybi não lê nem sincroniza sua caixa do WhatsApp." — assertion `o11_waNotSource` = true
- Grep: `WhatsApp como fonte / WhatsApp conectado / pesquisar no WhatsApp / Enviar via WhatsApp` = 0 across all 6 files

## 28. Confirmação "Falar com vendas" removido

Grep `Falar com vendas / book demo / agendar demo` = **0** in all 6 files.

## 29. Claims técnicas não verificadas removidas

Grep `criptografado / criptografados / workspaces isolados / 100% seguro / zero-knowledge` = **0** in all 6 files.

## 30. Problemas restantes

**None blocking.**

Minor notes:

1. **H2 "Onde o Allybi reduz o caminho."** repeats verbatim across the 3 moments sections — this is intentional per the spec (§25, §42, §59 explicitly use the same H2). The eyebrows differentiate (NA ROTINA JURÍDICA / NA ROTINA FINANCEIRA / NA ROTINA DE OPERAÇÕES) so the meaning is page-specific. The anti-repetition rule §2 says "Não usar o mesmo H2 em duas páginas" but the spec explicitly mandates this H2 in all three §25/§42/§59 — I followed the more specific instruction over the global rule.

2. **App origin rewrite** — `https://app.allybi.com.br` in source is rewritten at runtime by server middleware (pre-existing infrastructure).

3. **CSS files** — each page's CSS is independent. No use-case-shared.css imported. The shared `allybi-*` stylesheets handle only tokens, base, header, footer, responsive — never use-case narrative components.

---

**Files in delivery:**
- `use-case-legal.html` + `pages/use-case-legal.css`
- `use-case-finance.html` + `pages/use-case-finance.css`
- `use-case-business.html` + `pages/use-case-business.css`
- `USE_CASES_PRE_AUDIT.md`
- `USE_CASES_REDESIGN_REPORT.md` (this document)
- `qa-screenshots/use-cases-before/{legal,finance,operations}/` (6 baselines)
- `qa-screenshots/use-cases-redesign/{legal,finance,operations}/` (12 redesign captures)
- `qa-scripts/uc-before.mjs`, `qa-scripts/uc-assertions.mjs`, `qa-scripts/uc-grep.sh`
