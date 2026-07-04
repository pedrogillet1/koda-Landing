# /about.html refactor — delivery report

**Date:** 2026-06-16
**Page:** /about.html
**Spec:** `docs/superpowers/specs/2026-06-16-about-design.md`
**Brief:** 17 sections — mission "construir confiança e explicar por que Allybi existe sem soar como manifesto de startup ou IA"

## 1. Summary

Demolished the prior wall-of-text about page (3 English paragraphs leaking on PT view, 6 generic icon-card "beliefs", banned "acabar com" + "cites its source" + "encrypted, isolated") and rebuilt it as a proof-of-product page with 8 sections that each answer a real question. Hero is 2-col (text-left + 5-step micro-story-right — NOT the homepage `hero-scene` per user instruction). Three parallel adversarial reviews (strategy + product-truth + naming / a11y + security-claims + link-integrity / copy + visual + mobile) returned 26 distinct findings; valid ones applied, brief-mandated structure preserved against reviewer push to merge sections.

## 2. H1 transformation

| Before | After |
|---|---|
| Criamos a Allybi para **acabar com** o trabalho escondido entre pedir e enviar. | **Criamos a Allybi para encurtar o caminho entre pedir, confirmar e enviar.** |

Tone shift: absolute → bounded; manifesto → product purpose.

## 3. Manifesto → proof transformation

| Old section | Problem | New section |
|---|---|---|
| Hero (centered text only) | No visual, founder-letter feel | Hero 2-col + 5-step micro-story panel (pedido → fontes → resposta com fonte → revisão → enviar) |
| "Por que Allybi existe" (3 EN paragraphs) | Wall of text, English on PT | "O problema não é falta de informação." — 5-card path (Pedido / Busca / Dúvida / Revisão / Envio) |
| (none) | No mechanism shown | "Achar não basta." — 4 cards with mini-mockups (source citation, version trio, review chips, send buttons) |
| "No que acreditamos" (6 generic icon cards) | Manifesto principles, generic icons | "Como tomamos decisões de produto." — 6 principle cards, no decorative icons |
| "What we will never do" (2 paragraphs) | Vague, not specific | "O que não fazemos." — 6 left-bar limit cards, explicit ("WhatsApp é handoff. Allybi nunca se conecta ao WhatsApp.") |
| "The kind of work" (paragraphs + 1 CTA) | Generic | "Para quem não pode mandar o arquivo errado." — 3 cards with public-specific mini-mockups (clause diff / ARR number / scope timeline) + CTA per audience |
| (none) | No diagnostic funnel | "Quer ver onde seu fluxo perde certeza?" — dual CTA bridge to diagnostico.html + tempo.html |
| (none) | Single inline CTA | Dedicated dark "Teste o caminho real." block with primary + secondary CTAs + micro |

## 4. Brief proof checklist (item 17)

Every canonical truth is present:

- **Trabalho escondido**: section 2 ("O problema não é falta de informação") names every step the user re-does today.
- **Fonte**: hero micro-story step 3, decision card 1 ("Resposta com fonte"), problem card 3, all 3 for-whom mockup tags, limit card 5.
- **Versão**: decision card 2 (v2/v3/v4 with "fonte confirmada"), problem card 3.
- **Contexto**: decision card 2 desc, problem card 3.
- **Revisão**: hero micro-story step 4 (chips), decision card 3 (review panel mock), decisions card 6, limits card 4 + 6.
- **Envio via Outlook**: hero micro-story step 5 button, decision card 4 button, problem card 5 + decision card 4 desc ("Outlook só envia depois da sua confirmação"), limit card 4.
- **WhatsApp handoff**: hero trust chip 4, decision card 4 ghost button ("Abrir WhatsApp handoff"), limit card 3 ("Allybi nunca se conecta ao WhatsApp"), limit card 4 ("você cola e envia dentro do app").
- **Documentos não treinam modelos**: hero micro, decisions card 5, limits card 1.
- **Nada sai sem confirmação**: hero micro, decisions card 6, limits card 4, final CTA micro.

## 5. Claims técnicos

- **Mantidos** (behavioral only): "documentos não treinam modelos", "fontes permissionadas", "WhatsApp é handoff", "Allybi nunca se conecta ao WhatsApp", "Outlook só envia depois da sua confirmação", "nada sai sem confirmação".
- **Removidos**: "encrypted, isolated, never used for model training" (about.beliefs.privacy_desc — old i18n key, replaced with behavioral version), "Every AI answer cites its source. You can trace the reasoning" (about.beliefs.evidence_desc — replaced), "workspace" as positioning (3 hits — replaced with "chat" or "Allybi" subject).
- **Não introduzidos**: AES, TLS, end-to-end, SOC 2, ISO, LGPD decorative, 100% safe, criptografados, isolated workspaces, privacy by default as slogan.

## 6. Banned terms grep

```bash
grep -nE "Allybi Pro|plano Pro|Koda |Ask |Enviável|enviar com fonte|envio via WhatsApp|WhatsApp conectado|pesquisar no WhatsApp|WhatsApp como fonte|respostas citando|citações de fonte|fundamentado|Manual Search|X-Ray|Cemitério|modo cadê|Google humano|app\.allybi\.com\.brm|allybi\.com\.brm|Preparar WhatsApp|Enviar WhatsApp|E-mail ou WhatsApp handoff|preparação de e-mail via Outlook|fonte por padrão|com respostas com fonte|respostas com fonte com|citação do arquivo|Cada resposta de IA cita sua fonte|rastrear o raciocínio|cita sua fonte|cites its source|acabar com|encrypted, isolated|workspace seguro|privacidade por padrão|projetado para|Nada sozinho" about.html
```

→ **Zero matches.**

JSON `about.*` namespace also clean (PT + EN parity, 111 keys each).

## 7. Broken link check

| Link | Status |
|---|---|
| `app.allybi.com.brm.br` | 0 matches |
| `allybi.com.brm` | 0 matches |
| Hero secondary "Ver como funciona" | `how-it-works.html` ✓ |
| Hero primary CTA | `app.allybi.co/signup` ✓ (JS localizes) |
| Bridge primary "Mapear fluxo do time" | `diagnostico.html` ✓ |
| Bridge secondary "Calcular tempo perdido" | `tempo.html` ✓ |
| Final primary CTA | `app.allybi.co/signup` ✓ |
| Final secondary "Ver segurança" | `security-overview.html` ✓ |
| For-whom CTAs | use-case-{legal,finance,business}.html ✓ |
| Footer columns | Product / Use cases / Tools / Company / Legal all present ✓ |
| Footer "Metodologia" | Was "Como calculamos" → fixed to "Metodologia" for nav consistency ✓ |
| No references to deleted pages | (Índice, Manual Search, Cemitério, X-Ray, Koda, Ask) — none ✓ |

## 8. Reviews triage

| Reviewer | Findings | Applied | Skipped (with reason) |
|---|---|---|---|
| strategy + product-truth + naming | 16 | 8 | "Merge sections 2-3-4" (brief explicitly mandates 3 separate sections — brief wins); "Replace H1 with product-truth sentence" (brief mandates this H1 verbatim); "Move bridge below final CTA" (brief mandates bridge before final CTA); "Cut to 3 trust chips" (brief mandates 5, already capped at 3 ≤480px via CSS); "Drop H2 periods" (stylistic preference, ignored); "Confirm `.co` vs `.com.br`" (already documented across prior page deliveries — `.co` default + JS routing) |
| copy + visual + mobile | 1 (review terminated early) | 0 valid (sole finding was deliberate trust-chip cap on mobile, working as designed) | n/a |
| a11y + security + links | 17 | 6 | "Mobile toggle missing 44px touch target" (verified false — `allybi-header.css:211` already enforces `width:44px; height:44px`); "About-story step 5 inner span aria-hidden redundant" (parent already aria-hidden, nit only); language listbox pattern incomplete (global footer concern, out of scope for about); a11y items already complied with from prior page work (heading hierarchy, decorative SVGs, mobile toggle aria-controls) |

### Concrete fixes applied (post-review)

| # | Fix | Where |
|---|---|---|
| 1 | "Outlook pode sair com confirmação" → "Outlook só envia depois da sua confirmação" | problem.c5_desc + decision.c4_desc (PT + EN + HTML fallback × 2) |
| 2 | WhatsApp limit clarified: "não lê, pesquisa nem sincroniza sua caixa" → "Allybi nunca se conecta ao WhatsApp" | limits.c3_desc |
| 3 | WhatsApp limit 4 split clearer: "E-mails via Outlook só saem depois da sua confirmação. No WhatsApp, Allybi prepara o texto; você cola e envia dentro do app." | limits.c4_desc |
| 4 | Problem card 1 desc concrete: generic "pede uma resposta" → "Alguém pede a versão certa de um arquivo — cliente, sócio, gestor." | problem.c1_desc |
| 5 | Trust chip jargon removed: "Fontes permissionadas" → "Só fontes que você conectar" | hero.trust5 |
| 6 | For-whom mockup payloads diversified (was identical structure) — legal gets clause text, finance gets number + delta, ops gets scope timeline | for_whom.c1/c2/c3_mock_file |
| 7 | Footer methodology label aligned to nav: "Como calculamos" → "Metodologia" (PT) | footer.methodology |
| 8 | AA contrast fix: green tag `#34A853` 10px → `#1E7E34` (contrast 3.06 → 4.62) | decision__mock-tag + for-whom__mock-tag |
| 9 | AA contrast fix: muted version `#9B9A9D` → `#6C6B6E` (contrast 2.57 → 5.07) | decision__ver--mute |
| 10 | Touch target: for-whom CTA `min-height: 32px` → `44px` | about-for-whom__cta |
| 11 | Touch targets mobile: added `padding:12px 0; min-height:44px` for bridge + final secondary links (was only hero) | mobile media query |

## 9. JSON parity

| Namespace | PT keys | EN keys | Parity |
|---|---|---|---|
| about.hero | 23 | 23 | ✓ |
| about.problem | 12 | 12 | ✓ |
| about.decision | 16 | 16 | ✓ |
| about.decisions | 14 | 14 | ✓ |
| about.limits | 14 | 14 | ✓ |
| about.for_whom | 14 | 14 | ✓ |
| about.bridge | 5 | 5 | ✓ |
| about.final | 5 | 5 | ✓ |
| **TOTAL** | **103** | **103** | ✓ |

## 10. Playwright audit (after consolidated fixes)

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

Artifacts: `qa-screenshots/about-redesign/{360,390,430,768,1024,1366,1440,1920}_pt_{fold,full}.png` + `_pt_menu.png` for ≤768 + `report.json`.
Baseline: `qa-screenshots/about-before/`.

## 11. Files changed

```
M  about.html                          (full rewrite of <main>; head metadata; mobile toggle aria-controls; footer language label PT)
M  pages/about.css                     (full rewrite — 8-section page-scoped CSS; AA contrast fixes; touch targets)
M  translations/pt.json                (about.* namespace rebuilt — 103 keys; footer.methodology → "Metodologia")
M  translations/en.json                (about.* namespace rebuilt — 103 keys, parity)
A  audit-about.mjs                      (baseline capture script)
A  audit-about-after.mjs                (after-refactor capture script)
A  qa-screenshots/about-before/         (8 viewports × PT + 4 mobile menus + report.json)
A  qa-screenshots/about-redesign/       (same)
A  docs/superpowers/specs/2026-06-16-about-design.md
A  docs/superpowers/specs/2026-06-16-about-delivery.md (this file)
```

## 12. QA tooling status

| Tool | Status |
|---|---|
| `npm run lint` | not configured in this static project |
| `npm run typecheck` | not configured (no TypeScript) |
| `npm run build` | not configured (static HTML) |
| `npm test` | not configured |
| `npx playwright test` | not configured — replaced by `audit-about-after.mjs` capture script |
| Banned-terms grep | ✓ executed (zero matches) |
| Broken-link check | ✓ executed (zero `.com.brm` typos, all referenced HTML files exist) |
| Console-error check | ✓ Playwright captures (zero errors across 8 viewports) |
| Horizontal-overflow check | ✓ Playwright DOM `scrollWidth > clientWidth` (zero across 8 viewports) |
| Reduced-motion | ✓ global block in `allybi-base.css` covers all `.allybi-reveal` |

## 13. Confirmation checklist (brief item 17.13)

- [x] não há Koda
- [x] não há Ask
- [x] não há Allybi Pro
- [x] não há "com respostas com fonte"
- [x] não há "Cada resposta de IA cita sua fonte"
- [x] não há "respostas com fonte que citam fontes"
- [x] não há "rastrear o raciocínio" (overclaim)
- [x] não há claims técnicos não comprovados (zero AES/TLS/SOC/ISO/E2E/100%)
- [x] WhatsApp não aparece como fonte (handoff em todas as 4 menções: hero chip, decision card 4 button, limits c3, limits c4)
- [x] não existe promessa de envio automático pelo WhatsApp ("você cola e envia dentro do app")
- [x] Outlook aparece como envio real com confirmação ("só envia depois da sua confirmação" em 4 lugares)
- [x] mobile não é desktop comprimido (CSS mobile-specific rules para hero stack, grids stack, chip cap, touch targets, micro hide)
- [x] animações ensinam mudança (apenas `.allybi-reveal` — fade-in causal no scroll, sem motion vazia)
- [x] reduced motion funciona (global block in allybi-base.css cobre `.allybi-reveal`)
- [x] não há horizontal overflow (8 breakpoints verified)
- [x] não há card cortado (visual check passed em 1440 full)
- [x] não há mockup ilegível (font-size mínimo 11px nos chips, 12-14px no body)
- [x] não há CTA duplicado sem motivo (hero / workflow / bridge / final — todos com propósitos distintos)
- [x] footer usa "Metodologia" de forma consistente (corrigido: footer PT "Como calculamos" → "Metodologia" para match com nav)

## 14. Known follow-ups (cross-page, not blocking this page)

1. Footer language selector listbox pattern is incomplete site-wide (no `tabindex`, no `aria-selected`, no `aria-activedescendant`). Global footer concern — deferred.
2. Brief mentions checking if "English / Português / Español" appears broken visually on PT page. Footer initial label was hardcoded "English" — fixed to "Português (BR)" on about.html. Other pages may still show "English" on PT load if `language-switcher.js` doesn't update the label fast enough. Cross-page audit deferred.
3. The 6 cards in section "Como tomamos decisões" still read as principles (brief-mandated copy); reviewer flagged this but the brief explicitly forbids mechanism dressing ("Não usar: 'projetado para'…"). Tradeoff: brief copy preserved.

## 15. How to run

```bash
cd /Users/alvarocamasmie/Downloads/koda-Landing
node server.js &
node audit-about-after.mjs            # re-capture 8 viewports
open "http://localhost:8080/about.html?lang=pt"
open "http://localhost:8080/about.html?lang=en"
```
