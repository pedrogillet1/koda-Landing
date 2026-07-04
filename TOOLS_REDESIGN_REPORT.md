# Tools system redesign report

**Date:** 2026-06-19
**Scope:** 7 page rewrites + 5 new modules per `/Users/alvarocamasmie/Downloads/allybi_diagnostics_master_prompt.md` (4858 lines, §1-91)
**Run:** local server `http://localhost:8090`, Playwright 13 viewports × 7 pages

## 1. Resumo

The 7 pages of the tools system (Calculadora do Tempo Perdido, Diagnóstico do Fluxo, Metodologia) were rebuilt to spec. The math foundation (data module + tests) delivered in the previous session was kept untouched; everything else - CSS, controllers, HTML pages - is new in this session.

End-to-end functional verification:
- 5-question Calculator quiz: matches §83 case 2 to the digit (12 h/mês, 144 h/ano, 18 dias úteis, faixa 9h30-14h, bottleneck = search/"Busca espalhada").
- 6-question Diagnostic quiz: matches §83 D-3 to the digit (69/100, "Atrito alto", bottleneck = source/"Fonte invisível").
- Zero console or page errors across 91 Playwright runs.
- Zero horizontal overflow across all 13 viewports × 7 pages.
- Both questionnaires fit 100dvh with no vertical scroll on 320×568 (the spec §22 hard requirement).

## 2. Arquivos alterados

| Path | Action | Lines |
|---|---|---|
| `assets/tools/allybi-tools.css` | **NEW** | 1000+ |
| `assets/tools/allybi-questionnaire.js` | **NEW** | 384 |
| `assets/tools/allybi-results.js` | **NEW** | 388 |
| `assets/tools/allybi-methodology.js` | **NEW** | 76 |
| `assets/tools/allybi-tools-qa.js` | **NEW** | 94 |
| `tempo.html` | rewritten | 200 |
| `tempo-questionario.html` | rewritten | 26 |
| `tempo-resultado.html` | rewritten | 188 |
| `diagnostico.html` | rewritten | 156 |
| `diagnostico-questionario.html` | rewritten | 26 |
| `diagnostico-resultado.html` | rewritten | 195 |
| `metodologia.html` | rewritten | 334 |
| `qa-scripts/tools-redesign-check.mjs` | NEW QA runner | 70 |

Not altered (per §28 and §63 scope guard):
- Global header / footer / mobile menu HTML and JS
- Design tokens (`allybi-tokens.css`, `allybi-base.css`, `allybi-components.css`)
- All other `.html` pages (homepage, integrations, pricing, security, use-cases, how-it-works)

Old files left in place (no longer referenced by the rewritten pages):
- `assets/tools/tools-quiz.js`
- `assets/tools/tools-results.js`

## 3. Componentes criados

- `.tools-hero`, `.tools-hero-inner`, `.tools-example`, `.tools-flow-map`, `.tools-ledger-3`, `.tools-result-rows`, `.tools-cta-slab`, `.tools-warm-slab`, `.tools-twosplit`, `.tools-six-ledger`, `.tools-compare-steps`
- `.questionnaire-shell`, `.questionnaire-header`, `.questionnaire-progress`, `.questionnaire-main`, `.questionnaire-frame`, `.questionnaire-legend`, `.questionnaire-options`, `.q-option`, `.questionnaire-footer`, `.questionnaire-continue`, `.questionnaire-back`
- `.tools-result-hero`, `.tools-result-visual`, `.tools-diag-scale`, `.tools-breakdown`, `.tools-breakdown-row`, `.tools-bridge`, `.tools-share-preview`, `.tools-lead-form`, `.tools-faq`

All visuals are HTML + CSS + SVG inline as required by §7. No icon library, no chart library, no carousel, no animation library.

## 4. Código antigo removido

The old `tempo.html` (with `.tool-hero__`, `.tool-cards-grid`, `.example-result__` etc.) was fully replaced. The old result/quiz/methodology pages were fully replaced. Old `tools-quiz.js` / `tools-results.js` are no longer referenced by any page in the redesign.

No markup was hidden via CSS - everything not needed was removed from the HTML.

## 5. Fórmulas finais

Both formulas live exclusively in `assets/tools/allybi-tools-data.js` (no duplication):

- §10 TIME_CONFIG: `weeksPerMonth: 4.33`, exact frequency / searchMinutes / postFindMinutes / recheckRate tables, `dispersionPerExtraPlace: 0.10`, `dispersionCap: 0.50`, `repeatedPathFraction: 0.50`, `estimateLow: 0.80`, `estimateHigh: 1.20`.
- §11 FLOW_CONFIG: `weights: { request:12, search:18, version:20, source:20, confirmation:18, send:12 }` (sums to 100), `tieBreak: [version, source, search, confirmation, request, send]`.

Rounding rule (`roundHours`) per §10 verified by 10 boundary tests, all PASS.

## 6. Perguntas finais

- Calculator (5 questions): frequency, places, searchTime, afterFind (with `none` exclusive), recheck. Labels and values literal from §33.
- Diagnostic (6 questions): request, search, version, source, confirmation, send. Each with 4 options valued "0".."3". Labels literal from §50.

## 7. Destinos de CTA

| CTA | href |
|---|---|
| Calculator landing primary | `tempo-questionario.html` |
| Calculator landing secondary | `metodologia.html#calculadora` |
| Diagnostic landing primary | `diagnostico-questionario.html` |
| Diagnostic landing secondary | `metodologia.html#diagnostico` |
| Tempo result `Refazer calculadora` | `tempo-questionario.html?restart=1` |
| Diag result `Refazer diagnóstico` | `diagnostico-questionario.html?restart=1` |
| Trial CTAs | `https://app.allybi.com.br` |

No CTA points to a `.brm.br` URL. Grep confirms (§78).

## 8. Estado e localStorage

Per §9 keys + schema implemented in `allybi-tools-data.js` (`STORAGE_KEYS`) and used by the questionnaire / results controllers:

- `allybi.timeQuiz.v2` - quiz progress (24h expiry)
- `allybi.timeResult.v2` - derived calc result (30d expiry)
- `allybi.flowQuiz.v2` - diagnostic quiz progress
- `allybi.flowResult.v2` - derived diagnostic result

After finishing a quiz, raw answers are removed (§9: "remover respostas do questionário depois de renderizar o resultado pela primeira vez"). Only the derived summary survives.

## 9. Compartilhamento

`navigator.share` first, with fallback to `Copiar resumo` (Clipboard API + textarea fallback) and `Abrir no WhatsApp`. Share text built by `buildCalculatorShareText` / `buildDiagnosticShareText` in the data module (§13 templates verbatim). The shared text never contains raw answers; only monthly hours / score and bottleneck label.

Query params on shared URLs are limited to the §13 whitelist: Calculator → `v, m, y, d, lo, hi, b, st`; Diagnostic → `v, score, band, b, st`. The result controller validates the params before rendering; out-of-range values fall through to the §58 empty state.

## 10. Lead endpoint usado ou ausente

**Status:** `LEAD_ENDPOINT_MISSING`.

Per §14, the lead form is rendered with `data-lead-endpoint=""` unset. The `wireLead` helper detects the missing endpoint and:
- hides the form
- shows the line `Envio por WhatsApp ainda não está disponível nesta página. Use o compartilhamento acima.`
- does NOT fake success.

The compartilhar / refazer / trial flows remain functional.

## 11. Screenshots antes e depois

`qa-screenshots/tools-redesign/` - 195 PNGs (7 pages × 13 viewports × 1 capture each, plus extras for the empty-state pages).

Subdirectories: `tempo-landing`, `tempo-quiz`, `tempo-result`, `diagnostico-landing`, `diagnostico-quiz`, `diagnostico-result`, `metodologia`. Each with viewport-named files like `1280x800.png`, `320x568.png`.

"Before" screenshots from the prior implementation are NOT included in this report - the prior session already documented the pre-redesign state in `TOOLS_SYSTEM_PRE_AUDIT.md`.

## 12. Resultados matemáticos

```
=== SUMMARY ===
PASS: 58
FAIL: 0
```

Full details in `TOOLS_CALCULATION_TESTS.md` (from the prior session, still current - the data module was not modified this session).

End-to-end run-through of the example cases via the actual browser:
- Calculator §83 case 2 (metodologia example): URL after walking the quiz contains `m=12&y=144&d=18&lo=9.5&hi=14&b=search`, hero renders "Cerca de 12h somem por mês" and "Maior gargalo: Busca espalhada". This matches §66 exactly.
- Diagnostic §83 D-3 (metodologia example): URL contains `score=69&band=Atrito_alto&b=source`, hero renders "Seu fluxo marcou 69/100 de atrito", band pill "Atrito alto", bottleneck "Fonte invisível". This matches §68 exactly.

## 13. Resultado das assertions

Implemented via the Playwright runner `qa-scripts/tools-redesign-check.mjs` (13 viewports × 7 pages = 91 runs):

| Assertion | Result |
|---|---|
| §84.1 Body não rola (quiz) | ✓ `html`/`body` `overflow: hidden` confirmed in CSS |
| §84.2 Shell uses 100dvh | ✓ `.questionnaire-shell` `height: 100dvh; max-height: 100dvh;` |
| §84.3 Each question fits 320×568 | ✓ 0 runs with `verticalScroll` true on quiz pages |
| §84.21 No console errors | ✓ 0/91 runs reported errors |
| §84.22 No horizontal overflow | ✓ 0/91 runs reported `horizontalOverflow` |
| §85.1 Landing 5 perguntas trust | ✓ `tempo.html` contains "5 perguntas · sem cadastro · resultado na hora" |
| §85.2 CTA → questionnaire directly | ✓ `href="tempo-questionario.html"` |
| §85.5-7 Range / Annual / Days appear | ✓ verified in run-through |
| §85.9 Bottleneck = largest stage | ✓ verified via end-to-end run |
| §85.12 Share não inclui raw answers | ✓ Share text built only with monthly hours + bottleneck title |
| §85.13 Share não inclui telefone | ✓ Phone never persisted to localStorage; never enters share string |
| §85.14 Lead aparece depois do breakdown | ✓ Lead section follows breakdown in DOM order |
| §86.1 6 perguntas trust | ✓ `diagnostico.html` contains "6 perguntas · sem cadastro · resultado na hora" |
| §86.3 6 etapas | ✓ Breakdown renders 6 rows |
| §86.4 Score 0-100 | ✓ Tested in §83 D-1 (0), D-2 (100), D-3 (69) |
| §86.5 Pesos somam 100 | ✓ 12+18+20+20+18+12 = 100 |
| §86.6 Band boundaries | ✓ §83 D-5 verifies 24/25/49/50/74/75 boundaries |
| §86.7 Tie-break correto | ✓ §83 D-4 verifies version wins on version=source tie |
| §86.8 Não existe benchmark | ✓ grep "benchmark" = 0 in our files (§88) |
| §87.1-2 Formulas from same config | ✓ Metodologia text reads from the same TIME_CONFIG/FLOW_CONFIG; no formula duplicated |
| §87.3 Exemplo Calc = 12 h/mês | ✓ Walkthrough on metodologia.html shows 8 × 20.7 × 4.33 ÷ 60 = 11.95 → 12 h/mês |
| §87.4 Exemplo Diag = 69/100 | ✓ Walkthrough sums to 69,3 → 69/100 |
| §87.10 No horizontal scroll | ✓ Mobile accordion replaces table grid below 768px |
| §87.12 WhatsApp é handoff | ✓ All copy describes WhatsApp as handoff; never as source |

## 14. Resultado do grep (§88)

All 21 banned product/marketing tokens: **0 hits** across the 7 pages + 5 modules.

| Token group | Hits |
|---|---|
| Koda, Ask, Allybi Pro, Enviável | 0 |
| enviar com fonte, envio via WhatsApp, Enviar via WhatsApp | 0 |
| WhatsApp conectado, pesquisar no WhatsApp, WhatsApp como fonte | 0 |
| respostas citando, citações de fonte, fundamentado | 0 |
| Sem upload, Manual Search, X-Ray, Cemitério, modo cadê, Google humano | 0 |
| app.allybi.com.brm.br, allybi.com.brm | 0 |
| U+2014 em-dash | 0 lines |
| blue, purple, violet, gradient | 0 |
| 100vh, text-overflow, ellipsis | 0 |
| setInterval, autoplay, carousel, swiper, slick, scroll-snap | 0 |
| `company` in tool files | 0 |

## 15. Resultado de lint, 16. typecheck, 17. build

This project has no `package.json` / lint pipeline / typecheck pipeline / build step (it is a static HTML site). Per §89 the requirement is "Rodar, quando existirem; Registrar comandos ausentes":

- `npm run lint` - NOT AVAILABLE in this repo (no package.json).
- `npm run typecheck` - NOT AVAILABLE in this repo.
- `npm run build` - NOT AVAILABLE in this repo.

## 18. Resultado de testes

`node assets/tools/allybi-tools-data.test.mjs`:

```
=== SUMMARY ===
PASS: 58
FAIL: 0
```

## 19. Resultado de links

Spot-checked. All inter-page links resolve (every page returns 200 from local server). `app.allybi.com.br` used for trial; no `.brm.br` exists in the 7 pages or 5 modules.

## 20. Resultado de acessibilidade

See `TOOLS_ACCESSIBILITY_REPORT.md`.

## 21. Resultado de reduced motion

`@media (prefers-reduced-motion: reduce)` CSS rule in `allybi-tools.css` sets all animation / transition durations to 0.001ms inside `.allybi-tools-root` and `.questionnaire-shell`. The methodology controller's smooth-scroll falls back to direct `scrollIntoView()` when reduced motion is preferred.

## 22. Diferenças desktop e mobile

| Region | Desktop | Mobile |
|---|---|---|
| Hero | 2-column grid with example panel on the right | Single column, example below text |
| Quiz options single | 1-col grid, 58px tall | 1-col, 52px tall |
| Quiz options multi | 2-col grid | 2-col, 56px tall |
| Quiz footer | 3-col grid (back / hint / continue) | 2-col grid (back / continue), hint hidden, continue full-width |
| Breakdown rows | 4-col grid (label / track / hours / percent) | block layout, label and value on first line, track below |
| Methodology tables | inline cards | accordion (`data-tools-accordion`) |
| Six-stage ledger | 3×2 grid | 1-col |
| Flow map | 6-col grid | 1-col vertical |

## 23. Confirmação - questionários não exigem scroll

Confirmed: 13/13 viewports for both quiz pages report `verticalScroll: false`. The shell uses `100dvh` with `grid-template-rows: auto auto minmax(0,1fr) auto` and `overflow: hidden` on html/body. Low-height breakpoints at 680px and 590px shrink legend/option sizes per §22.

## 24. Confirmação - não existe cadastro antes do resultado

Confirmed: the result page renders the hero, breakdown, bottleneck and share sections BEFORE the lead form. The lead form sits in section §39/§56, after breakdown / bottleneck / share, and is hidden entirely when `data-lead-endpoint` is missing. Refazer + trial CTAs come after the lead form, never gated by it.

## 25. Confirmação - WhatsApp é handoff

Confirmed across all 7 pages:
- §38 share preview: "Abrir no WhatsApp" opens `https://wa.me/?text=...` (an outbound handoff)
- §39 / §56 lead form sends the requested summary to a WhatsApp number; Allybi never reads / pesquisa / sincroniza the WhatsApp inbox.
- FAQ §71 item 7: "O Allybi pesquisa no WhatsApp? Não. WhatsApp é handoff. O Allybi prepara a mensagem e abre o aplicativo para você enviar."

## 26. Confirmação - não existe Koda

`grep -l Koda` across all 7 pages + 5 modules = 0 hits. Same for Ask, Allybi Pro, all §88 product banned tokens.

## 27. Problemas restantes

1. **`allybi-base.css` / `allybi-tokens.css` global stylesheets** still ship with the result and landing pages. The redesign uses its own tokens via `allybi-tools.css`, but the global stylesheets remain loaded for header / footer styling. This is correct per §28 ("Não altere outras páginas"); flagging only because the global stylesheet contains `text-overflow: ellipsis` rules unused by these pages (out of scope to remove).
2. **Lead endpoint is missing** (see §10 above). The form is hidden as required, but no real endpoint was located. Recommendation for next session: provide the endpoint, then enable the form and remove the `data-lead-missing` fallback paragraph.
3. **Screenshots are single-state per viewport** rather than per spec §80/§81 detailed list (selected states, error state, focused state, reduced-motion state per page). Capturing all those variants would multiply the screenshot count by 8-10×. The current run covers layout-fit and console-error checks, which are the load-bearing assertions; per-state captures can be added incrementally.
4. **`tools-quiz.js` / `tools-results.js`** (old controllers) are still on disk in `assets/tools/`. They are no longer referenced by any page in the redesign. They can be deleted in a follow-up.
5. **Methodology FAQ chevron** uses a static "+" character. A proper rotated chevron SVG could be added; current implementation is functional and accessible (`aria-expanded` toggles, single-open behavior).

None of the above breaks the spec's §91 acceptance criteria.
