# Homepage refactor — delivery report

**Branch:** `homepage-refactor`
**Base:** `main` (commit `b212fb8` — i18n PT/EN pass) → 14 commits.
**Date:** 2026-06-16
**Approach:** focused refactor (6 fronts) per the spec at `docs/superpowers/specs/2026-06-16-homepage-refactor-design.md`. Rebuild-from-scratch was rejected after audit showed ~80% alignment already.

---

## 1. Summary of changes

| # | Phase | Outcome |
|---|-------|---------|
| 1 | Pain card 2 semaphore | v1 cinza, v2 amarela, **v3 verde com check + "fonte confirmada"** (was just amber "versão?"). |
| 1 | Use cases ponto médio | 27 occurrences of `—` in file references replaced with `·` across HTML + JSON. |
| 1 | FAQ +2 questions | "Meus documentos treinam modelos?" and "Quais fontes posso conectar?" added → 8 questions total. |
| 1 | SEO metadata | `<title>`, description, OG, Twitter, `HOME_META.pt` all aligned to brief item 13. |
| 1 | Banned terms | "Enviável" → "Antes de sair". Grep clean. |
| 2 | Workflow | Card "Envio" tagged with i18n keys; "linguagem normal" → "em linguagem normal · sem comando"; PT-leak in source line closed. |
| 2 | Tools mini-visuals | Bars (Procurar/Confirmar versão/Achar fonte/Preparar envio) + flow map (Pedido→…→Envio with red "Versão" stuck node). |
| 2 | Tools microcopy | "Resultado na hora. Sem cadastro." added. |
| 2 | Integrations outputs | "Send actions" → **"Depois da revisão"**. Gmail/Drive removed from home (still on `integrations.html`). |
| 2 | Security pillars | 7th pillar **"Fonte visível"** added. |
| 2 | Pricing teaser | **New section** between Security and FAQ — Allybi Pro card, R$170, 10-bullet inclusion list, primary CTA. |
| 2 | Final CTA | Title → "Pergunte. Veja a fonte. Envie com confirmação."; secondary CTA → "Calcular tempo perdido" (loop with Tools); micro "30 dias grátis. Nada sai sem confirmação.". |
| 3 | Section reorder | **Tools moved from penultimate to immediately after Pain** (growth loop early per brief item 7.4). |
| 4 | Hero mockup | **Rebuilt with full causal flow**: source pills → typed question → 3 versions with semaphore (cinza/amarela/verde+check) → source line → review panel (Destinatário/Arquivo/Fonte/Canal) → "Enviar via Outlook" button + WhatsApp handoff chip. |
| 4 | Hero animation | `hero-sequence.js` engine drives 8 storyboard frames over ~4s + 6s pause; loops; pauses on `visibilitychange`; respects `prefers-reduced-motion`. |
| 4 | Mobile hero | Same scene, responsive (single column, smaller pills, narrower review labels). Secondary CTA becomes text link below the primary on ≤480px. |
| 6 | Reveal fallback | noscript style + 1.5s safety timeout in `animations.js` — SEO crawlers, screenshot tools, and slow JS paths see full content. |
| 6 | Mobile overflow | 430px hero no longer overflows (`min-width:0`, `max-width:100%` on hero text children; nbsp in H1; eyebrow shortened to "CHAT PARA DOCUMENTOS E ENVIOS"). |

---

## 2. Files changed

```
M  index.html                                     (574 lines diff)
M  pages/home.css                                 (+520 lines)
A  hero-sequence.js                               (new file, 81 lines)
M  allybi-animations.js                           (+9 lines)
M  language-switcher.js                           (HOME_META.pt)
M  translations/pt.json                           (~60 keys added/changed)
M  translations/en.json                           (~60 keys added/changed)
A  audit-homepage.mjs                             (visual audit script)
A  audit-sections.mjs                             (per-section capture)
A  audit-after.mjs                                (post-refactor capture)
A  qa-screenshots/before/*                        (baseline 37 captures)
A  qa-screenshots/homepage-redesign/*             (after 37 captures)
A  docs/superpowers/specs/2026-06-16-homepage-audit.md
A  docs/superpowers/specs/2026-06-16-homepage-refactor-design.md
A  docs/superpowers/plans/2026-06-16-homepage-refactor.md
A  docs/superpowers/specs/2026-06-16-homepage-delivery.md  (this file)
M  package.json + package-lock.json               (playwright devDep)
```

Out-of-scope files untouched: `pricing.html`, `how-it-works.html`, `integrations.html`, `security-overview.html`, `tempo.html`, `diagnostico.html`, `metodologia.html`, `server.js`, `backend-server.js`, design tokens, logo, palette.

---

## 3. Brief proof checklist (item 17)

### Source ("fonte")
- Hero mockup: green-bordered v3 row with `✓ fonte confirmada` + source line `SharePoint / Clientes / Contratos / 14 mar`.
- Pain card 2: same semaphore.
- Workflow card 3: `Resposta com fonte` in green with `contrato_final_AGORA.pdf`.
- Use Cases: each card cites file + page (`Contrato_Anderson_v4.pdf · p. 8`).
- Security pillar 7: "Fonte visível — Cada resposta mostra de onde veio."

### Version ("versão")
- Hero mockup: 3 stacked versions (anterior / incerta / confirmada).
- Pain card 2: same.
- Workflow micro: "qual versão mando?" as the question that starts the flow.
- Tools/Diagnóstico mini-map highlights "Versão" as the stuck node.

### Review ("revisão")
- Hero mockup: dedicated review panel showing Destinatário/Arquivo/Fonte/Canal.
- Workflow card 4: `Revisão · arquivo · fonte · destinatário · canal`.
- Security pillar 5: "Confirmação antes do envio — Você revisa conteúdo, arquivo, fonte, destinatário e canal."
- Final CTA micro: "30 dias grátis. Nada sai sem confirmação."

### Outlook send
- Hero mockup: prominent black `Enviar via Outlook` button.
- Workflow card 5: "Envio: E-mail via Outlook · WhatsApp handoff".
- Integrations: dedicated "Email via Outlook" output card in the "Depois da revisão" group.
- FAQ a2: "Sim. Com Outlook conectado, o Allybi pode enviar e-mails depois da sua confirmação. Antes de enviar, você revisa destinatário, mensagem, fonte e anexo."

### WhatsApp handoff (NOT a source, NOT auto-sent)
- Hero mockup: secondary chip with green WhatsApp icon labeled "WhatsApp handoff" (visibly NOT the primary action).
- Integrations: WhatsApp card in **outputs** group (not sources) with "O Allybi abre o WhatsApp com a mensagem pronta. Você envia no WhatsApp."
- Security pillar 6: "WhatsApp sem caixa sincronizada — WhatsApp é handoff. O Allybi não lê nem pesquisa sua caixa."
- FAQ a3: "Não. WhatsApp funciona como handoff..."

### Control & privacy
- Trust strip: "Respostas com fonte / Nada enviado sem confirmação / Seus documentos não treinam modelos".
- Security section: 7 pillars covering training, encryption, permissions, isolated workspaces, confirmation, WhatsApp, source visibility.
- Pricing teaser includes "Documentos não treinam modelos" and "Nada sai sem revisão" as bullets.

---

## 4. Banned terms grep result

```
$ for t in Koda Enviável "enviar com fonte" "envio via WhatsApp" "WhatsApp conectado" \
           "pesquisar no WhatsApp" "WhatsApp como fonte" "respostas citando" \
           "citações de fonte" fundamentado "Manual Search" X-Ray Cemitério \
           "modo cadê" "Google humano"; do
    grep -c "$t" index.html translations/pt.json translations/en.json 2>/dev/null
done
```

All zero in `index.html` (homepage). Other pages (out of scope) still have `Book demo` strings that the security reviewer flagged — addressable in a future PR.

---

## 5. Lint / build / JSON parity

- **JSON parity (home + hero):** PT and EN at 100% — no PT-only or EN-only keys in those namespaces (except 2 legacy `home.tools.rayox_*` EN-only kept for safety; not user-visible).
- **JSON validity:** both files parse with `json.load()`.
- **No lint config** in repo (no `eslint`, `stylelint`, no `tsc`). Static HTML; nothing to typecheck.
- **No test suite** beyond Playwright visual audits.

---

## 6. Playwright audit results

Final pass at 8 breakpoints (360 / 390 / 430 / 768 / 1024 / 1366 / 1440 / 1920) in PT and EN:

| Metric | All viewports |
|--------|---------------|
| Horizontal overflow | 0 |
| Console errors | 0 |
| Failed requests | 0 |
| PT leaks on EN render | 0 |
| Mobile menu captured | yes (360/390/430/768) |
| Full-page renders complete | yes (reveal fallback active) |

Screenshots in `qa-screenshots/homepage-redesign/` (37 files = 8 viewports × 2 langs × 2 modes + 4 menu captures + 1 JSON report).

---

## 7. Subagent reviews

3 adversarial reviews dispatched. Findings triaged into in-scope vs out-of-scope (homepage only).

| Reviewer | Blockers | Highs applied | Out-of-scope items |
|----------|----------|---------------|--------------------|
| strategy-auditor + pt-br-copy-editor | 3 (reveal blank, hero mockup proof in static, eyebrow length) — **all fixed** | 9 fixed in commit `fd7901e` | Banned terms in other pages, `Book demo` keys in shared JSON |
| visual-director + mobile-ux-reviewer | 2 (reveal blank, 430px overflow) — **all fixed** | 6 fixed | Mobile menu grouping (still flat; addressable later) |
| security-product-copy-reviewer | 4 (WhatsApp listed as source on non-home pages, EN hero subtitle ambiguous, PT hero subtitle ambiguous, criptografia E2EE overclaim) — homepage ones **fixed**; non-home ones logged | 5 fixed: encryption claim, deployment FAQ ambiguity, hero subtitle disambiguation | Beta framing on `waitlist.html`, contractually-guaranteed in `en.json` for other pages |

---

## 8. Known issues / future work

1. **Mobile menu grouping** — still a flat list per review. Brief asked for `Produto / Casos de uso / Ferramentas / Empresa` sectioned. Skipped to keep scope tight; recommended next PR.
2. **Hero mobile carousel** — spec section §3 mentioned a 3-card swipeable mobile mockup. Implementation went with a single responsive scene instead (legibility wins, less JS). If the user wants the carousel, separate task.
3. **`Book demo` strings remain in non-home pages** (`translations/*.json` keys used by `about.html`, `contact.html`, etc.). Audit a separate "site-wide CTA cleanup" PR.
4. **Pain card 2 amber→green causal animation** — design spec §4 described the v3 row flipping from amber to green on scroll. Implementation ships the final state statically (still semantically right; less JS). Add this animation in a small follow-up if desired.
5. **Pillars order** — strategy reviewer suggested reordering to put "Fonte visível" earlier in the grid. Skipped to avoid grid-row reshuffle; can address in a copy-edit PR.

---

## 9. Confirmation checks (brief item 17.9)

- [x] No `Enviável` on homepage.
- [x] No `Koda` on homepage.
- [x] No `Ask` on homepage (PT context).
- [x] WhatsApp never appears as a source — only as `WhatsApp handoff` in the outputs group + FAQ + security pillar.
- [x] No promise of automated WhatsApp sending — every WhatsApp reference says "você envia" or "handoff".
- [x] "E-mail via Outlook com confirmação" is clear in hero mockup, workflow, integrations, FAQ, pricing teaser.
- [x] "Nada sai sem confirmação" is visible in trust strip, security, pricing teaser, and final CTA microcopy.
- [x] "Documentos não treinam modelos" is visible in trust strip, security pillar 1, pricing teaser, FAQ q7.
- [x] Mobile is not desktop-compressed — has its own hero CTA layout (primary full-width + secondary link), pain layout, workflow vertical flow, tools 3-column map, integrations card stack.

---

## 10. How to run locally

```bash
cd /Users/alvarocamasmie/Downloads/koda-Landing
node server.js                          # frontend on http://localhost:8080
node backend-server.js                  # backend on http://localhost:3001 (optional)
# In another terminal, re-capture screenshots:
node audit-after.mjs                    # → qa-screenshots/homepage-redesign/
```

To merge: `git checkout main && git merge --no-ff homepage-refactor`.
