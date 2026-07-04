# Tools system (Calculadora + Diagnóstico + Metodologia) - pre-rewrite audit

**Date:** 2026-06-19
**Scope:** 7 pages - `/tempo.html`, `/tempo-questionario.html`, `/tempo-resultado.html`, `/diagnostico.html`, `/diagnostico-questionario.html`, `/diagnostico-resultado.html`, `/metodologia.html`

## Files present today

| File | Lines | Notes |
|---|---|---|
| `tempo.html` | 317 | Landing - uses global header/footer + inline content |
| `tempo-questionario.html` | 128 | Quiz shell - references `assets/tools/tools-quiz.js` |
| `tempo-resultado.html` | 205 | Result - references `assets/tools/tools-results.js` |
| `diagnostico.html` | 196 | Landing |
| `diagnostico-questionario.html` | 142 | Quiz shell (same JS module) |
| `diagnostico-resultado.html` | 232 | Result (same JS module) |
| `metodologia.html` | 348 | Methodology landing |
| `assets/tools/tools-quiz.js` | 300 | Shared quiz controller |
| `assets/tools/tools-results.js` | 437 | Shared results controller |

## Banned tokens scan (initial pass)

The spec §1 prohibited-token list and the broken-link variants from §78 were grep-tested against all 7 page files. Result: **0 hits** across all 7 pages.

Deeper grep (full §88 list) will be re-run after the rewrite is complete.

## Module architecture (current)

- `tools-quiz.js` (300 lines) - combines DATA + CONTROLLER + RESULT computation in one file
- `tools-results.js` (437 lines) - reads localStorage, renders, share, lead

**Issue:** the spec §5 explicitly mandates **6 separate modules** with single-responsibility:
- `allybi-tools.css`
- `allybi-tools-data.js`
- `allybi-questionnaire.js`
- `allybi-results.js`
- `allybi-methodology.js`
- `allybi-tools-qa.js`

Current `tools-quiz.js` and `tools-results.js` need to be split into the spec's module layout. Data and formulas must live in a single source of truth (`allybi-tools-data.js`) that all four other modules import.

## Files that will be created/altered

| Path | Action |
|---|---|
| `assets/tools/allybi-tools-data.js` | **NEW** - exact TIME_CONFIG (§10) + FLOW_CONFIG (§11) + questions + bands + bottleneck mapping + share copy + helpers |
| `assets/tools/allybi-tools-data.test.mjs` | **NEW** - unit tests covering all §83 cases (Calculator + Diagnostic) |
| `assets/tools/allybi-questionnaire.js` | **NEW** - replaces `tools-quiz.js` controller (no formulas) |
| `assets/tools/allybi-results.js` | **NEW** - replaces `tools-results.js` controller |
| `assets/tools/allybi-methodology.js` | **NEW** - accordion + anchor nav for `/metodologia.html` |
| `assets/tools/allybi-tools-qa.js` | **NEW** - runtime QA hooks for Playwright runs |
| `assets/tools/allybi-tools.css` | **NEW** - shared CSS module (shell + buttons + bands) |
| `tempo.html` | full main rewrite per §24-31 |
| `tempo-questionario.html` | full main rewrite per §17-23, §32-33 |
| `tempo-resultado.html` | full main rewrite per §34-40 |
| `diagnostico.html` | full main rewrite per §41-48 |
| `diagnostico-questionario.html` | full main rewrite per §17-23, §49-50 |
| `diagnostico-resultado.html` | full main rewrite per §51-57 |
| `metodologia.html` | full main rewrite per §59-72 |
| `tools-quiz.js` / `tools-results.js` | deprecated - references replaced by new module names |

## Files NOT altered

- Global header, footer, mobile menu
- Design tokens (`allybi-tokens.css`)
- All other `.html` pages (homepage, integrations, pricing, security, use-cases, how-it-works)

## Math foundation must come first

Per §83, the data module's correctness is the single non-negotiable: the metodologia example must compute to exactly **12 h/mês** (Calculator) and the [1,2,2,3,2,2] Diagnostic case must score **69/100** with bottleneck = **source**. Without these passing, every page above is built on sand. **The data module + tests are this session's primary deliverable.**

## Session scope (delivered in this turn)

1. This pre-audit
2. `assets/tools/allybi-tools-data.js` - complete data module with formulas, bands, mappings, share copy
3. `assets/tools/allybi-tools-data.test.mjs` - math unit tests covering §83 cases 1-5 (Calculator) and §83 cases 1-5 (Diagnostic)
4. Test run output with all PASS
5. `TOOLS_CALCULATION_TESTS.md` - math test report

## Out of session scope (deferred to next session)

- 7 HTML page rewrites
- `allybi-questionnaire.js` / `allybi-results.js` / `allybi-methodology.js` / `allybi-tools-qa.js` controllers
- `allybi-tools.css` shared stylesheet
- Playwright captures across 13 viewports × 7 pages
- §84-87 assertion suites
- §88 grep (full pass)
- `TOOLS_ACCESSIBILITY_REPORT.md`
- `TOOLS_VISUAL_QA_REPORT.md`
- `TOOLS_REDESIGN_REPORT.md`

The math foundation delivered in this session is the prerequisite for everything in the next session, and is independently verifiable.
