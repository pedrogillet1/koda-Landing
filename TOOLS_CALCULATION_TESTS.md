# Tools system - calculation tests report

**Date:** 2026-06-19
**Module under test:** `assets/tools/allybi-tools-data.js`
**Test runner:** `assets/tools/allybi-tools-data.test.mjs`
**Run:** `node assets/tools/allybi-tools-data.test.mjs`

## Result

```
=== SUMMARY ===
PASS: 58
FAIL: 0

All math tests PASS.
```

## What was verified

### §10 Calculator formula (TIME_CONFIG)

| §83 case | Inputs | Expected | Actual | Result |
|---|---|---|---|---|
| 1 minimum | freq `1-2`, `email`, search `under-2`, `none`, `never` | monthly > 0, < 1, bottleneck = search, finite | 0.108 h, bottleneck = search | ✓ |
| 2 metodologia | freq `6-10`, 4 places, search `6-10`, `[version,source,message]`, `sometimes` | raw ≈ 11.95, display 12 h/mês, annual 144 h, 18 dias | raw 11.951, display 12, annual 144, days 18 | ✓ exact |
| 3 high | freq `20+`, 6 places, search `20+`, all post-find, `almostAlways` | finite, not NaN, not Infinity, > 25 h/mês | 109.16 h | ✓ |
| 4 none exclusive | `afterFind: [version, source, none]` | post-find treated as empty | monthly 2.10 h | ✓ |
| 5 serialization | round-trip serialize → parse | values preserved, no raw answers in JSON | preserved, JSON has no `frequency`/`places` | ✓ |

### roundHours rule (§10)

| Input | Branch | Expected | Actual |
|---|---|---|---|
| 1.2 | < 10: half-hour | 1.0 | 1.0 ✓ |
| 1.4 | < 10: half-hour | 1.5 | 1.5 ✓ |
| 9.7 | < 10: half-hour | 9.5 | 9.5 ✓ |
| 11.95 | 10–29: integer | 12 | 12 ✓ |
| 29.4 | 10–29: integer | 29 | 29 ✓ |
| 30.0 | ≥ 30: even | 30 | 30 ✓ |
| 31.0 | ≥ 30: round(15.5)*2 = 32 | 32 | 32 ✓ |
| 32.0 | ≥ 30: round(16)*2 = 32 | 32 | 32 ✓ |
| 33.0 | ≥ 30: round(16.5)*2 = 34 | 34 | 34 ✓ |
| 143.4 | ≥ 30: round(71.7)*2 = 144 | 144 | 144 ✓ |

### §11 Diagnostic formula (FLOW_CONFIG)

| §83 case | Inputs | Expected | Actual | Result |
|---|---|---|---|---|
| D-1 zeros | all = `0` | score 0, "Fluxo claro" | 0, Fluxo claro | ✓ |
| D-2 threes | all = `3` | score 100, "Atrito crítico" | 100, Atrito crítico | ✓ |
| D-3 metodologia | `[1,2,2,3,2,2]` | score 69, bottleneck **source**, "Atrito alto" | 69, source, "Fonte invisível", Atrito alto | ✓ exact |
| D-4 tie-break | version=3, source=3 | bottleneck = **version** (tie order) | version | ✓ |
| D-5 band boundaries | 6 constructed scores | 24=claro, 28=moderate, 47=moderate, 53=high, 71=high, 79=critical | all match | ✓ |

### Diagnostic stage percents (§11)

| Stage | Raw answer | Expected percent | Actual |
|---|---|---|---|
| request | 0 | 0 | 0 ✓ |
| search | 1 | 33 | 33 ✓ |
| version | 2 | 67 | 67 ✓ |
| source | 3 | 100 | 100 ✓ |

### Diagnostic weights structure

`12 + 18 + 20 + 20 + 18 + 12 = 100` ✓ (assertion §86.5)

### §13 Share text builders

- Calculator share string contains: hours pattern, `Maior gargalo:`, `Calculadora do Tempo Perdido` ✓
- Calculator share string does NOT contain raw answer values (`places`, `6-10`, etc.) ✓
- Diagnostic share string contains: `69/100`, `Fonte invisível`, `comparar` ✓

### Question structure

- 5 calculator questions ✓
- 6 diagnostic questions ✓
- afterFind option `none` exists with `exclusive: true` flag ✓

## Spec-compliance summary

The data module is the **single source of truth** for §10 (TIME_CONFIG), §11 (FLOW_CONFIG), §33 (calculator questions), §50 (diagnostic questions), §13 (share text), and §12 (Allybi bridge map). All four downstream modules (`allybi-questionnaire.js`, `allybi-results.js`, `allybi-methodology.js`, `allybi-tools-qa.js`) will import this module - no formula duplication.

The `calculateTime` and `calculateDiagnostic` functions are pure (no side effects, no DOM, no localStorage) which makes them trivially testable and reusable in:
- Browser (via `<script>` tag and `window.AllybiToolsData`)
- Node.js (via `require()`)
- Test runner (this file, no test framework needed)

## Files in delivery (this session)

- `assets/tools/allybi-tools-data.js` (482 lines, the data module)
- `assets/tools/allybi-tools-data.test.mjs` (235 lines, the test runner)
- `TOOLS_SYSTEM_PRE_AUDIT.md` (audit)
- `TOOLS_CALCULATION_TESTS.md` (this report)

## Next session work

The math foundation is verified. Next session will build, in order:

1. `allybi-tools.css` - shared shell, buttons, no-scroll questionnaire skeleton, band colors
2. `allybi-questionnaire.js` - quiz controller (importing data module)
3. `allybi-results.js` - result controller (importing data module)
4. `allybi-methodology.js` - methodology accordion + anchor nav
5. `allybi-tools-qa.js` - Playwright runtime hooks
6. 7 HTML page rewrites (one per page, atomic main-block swaps)
7. Playwright captures across 13 viewports × 7 pages
8. §84-87 assertion suites
9. Full §88 grep
10. `TOOLS_ACCESSIBILITY_REPORT.md`, `TOOLS_VISUAL_QA_REPORT.md`, `TOOLS_REDESIGN_REPORT.md`

Every formula referenced in those subsequent files will pull from this verified module. No formula will be duplicated. No formula will be re-stated except in the published metodologia page (which displays them visually for users).
