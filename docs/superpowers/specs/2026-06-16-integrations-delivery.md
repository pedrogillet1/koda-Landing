# /integrations.html refactor — delivery report

**Branch:** `integrations-refactor` (forked from `how-it-works-refactor`)
**Date:** 2026-06-16
**Brief:** mensagem do usuário, 16 seções
**Spec:** `docs/superpowers/specs/2026-06-16-integrations-design.md`
**Audit:** screenshots em `qa-screenshots/integrations-before/` (37 files)
**After:** screenshots em `qa-screenshots/integrations-redesign/` (37 files)

---

## 1. Summary of changes

| # | Phase | Outcome |
|---|-------|---------|
| 0 | Reveal observer | `initReveal()` cobre `.integ-reveal`; reduced-motion universal força `.integ-reveal` para `opacity:1`; noscript fallback. Antes 90% da página invisível em SEO/screenshots. |
| 1 | Hero 2-col | Layout grid texto+mockup. Reaproveita `hero-scene` (5 stages causal). 5 trust chips (3 visíveis no mobile). Mobile: stack, primary full-width, secondary text link. aria-hidden no workspace do mockup pra evitar double-announce com role=img. |
| 2 | **Matrix BLOCKER fix** | Removida matriz unified (WhatsApp como coluna source, "Enviar ✓" para WhatsApp, "Disponível" status — todos proibidos pelo brief item 7). Substituída por: **Matriz A** Fontes (Uploads/Outlook/OneDrive/SharePoint) + **Matriz B** Ações depois da revisão (E-mail via Outlook / WhatsApp handoff) com colunas "Ação final" e "Quem envia" explícitas. Mobile: 3 accordions agrupados (Sources / Actions / Roadmap) com sr-only group labels. |
| 3 | Visual map (nova seção) | Entre Hero e Fontes Conectadas. 3 colunas (Entram no chat / Allybi organiza / Você revisa e decide). Coluna 3 explícita: "E-mail via Outlook · com confirmação" + "WhatsApp handoff · você envia dentro do WhatsApp". Mobile: vertical com setas rotacionadas. |
| 4 | Copy refinos | • Hero sub 4 frases → 2 (e-mail/WhatsApp distintos)<br>• Hero micro deletado (duplicava trust pills, anglicism "inbox")<br>• `actions_h2` → "Depois da resposta, vem a revisão."<br>• `after_h2` → "Da fonte conectada à revisão." (sub mais curta)<br>• `after_step4_title` "Mensagem pronta" → "Mensagem para revisão"<br>• `after_step5_desc` expandido com 5 campos<br>• step 6 "Saída" novo (Outlook/WhatsApp explícitos)<br>• `roadmap_h2` "Em breve" → "Próximas fontes" com sub clarificando<br>• `final_cta_h2` "Conecte uma fonte e teste o caminho real." + sub fecha o caminho completo<br>• `outlook_card_desc` e `whatsapp_card_desc` differentiated (não mais template trio)<br>• Trust pillar `trust3_desc` canonical: "Seus documentos, perguntas e respostas não treinam modelos."<br>• Trust `trust4` "WhatsApp não sincroniza / Não lemos, sincronizamos nem pesquisamos seu WhatsApp."<br>• Trust `trust5` "Envio com revisão / Você confirma destinatário, mensagem, arquivo, fonte e canal..." |
| 5 | SEO/OG | title "Integrações \| Allybi", description completa, canonical, alternate hreflang, twitter card. |
| 6 | A11y | • `aria-controls="allybi-mobile-menu"` no mobile toggle<br>• `aria-label="sim"` em todos os checkmarks ✓ (desktop + mobile accordions)<br>• `aria-hidden="true"` no `.hero-scene__workspace` (resolve duplo announce com role=img)<br>• `scope="col"`/`scope="row"` em todos `<th>` das matrizes<br>• `<caption class="sr-only">` em ambas as matrizes<br>• `aria-hidden="true"` em SVGs/imgs decorativos<br>• Hover transform gated atrás de `@media (hover:hover) and (prefers-reduced-motion: no-preference)` |
| 7 | Action cards differentiation | WhatsApp action card recebe muted bg + dashed border — não lê como gêmeo "Disponível" do Outlook. |
| 8 | Legacy WhatsApp keys | Removidas chaves órfãs `integ.whatsapp`, `integ.col_whatsapp`, `integ.s1d` que listavam WhatsApp como source junto de Outlook/OneDrive/SharePoint. |

---

## 2. Files changed

```
M  integrations.html                    (hero 2-col, visual map, matrix split, copy, SEO, a11y)
M  pages/integrations.css               (+260 lines: hero grid, map grid, mobile trust cap,
                                          action card chrome differentiation, hover guard)
M  allybi-animations.js                 (initReveal covers .integ-reveal)
M  allybi-base.css                      (reduced-motion universal block extended for .integ-reveal)
M  translations/pt.json                 (integ.* + hero.scene.* keys updated)
M  translations/en.json                 (integ.* + hero.scene.* keys updated)
A  audit-integ.mjs                      (8-breakpoint audit script)
A  audit-integ-after.mjs                (after-refactor capture)
A  qa-screenshots/integrations-before/  (37 baseline captures + report.json)
A  qa-screenshots/integrations-redesign/ (37 after captures + report.json)
A  docs/superpowers/specs/2026-06-16-integrations-design.md
A  docs/superpowers/specs/2026-06-16-integrations-delivery.md (this file)
```

Out-of-scope untouched.

---

## 3. Brief proof checklist (item 16)

### Fontes atuais (4)
- Visual map col 1 lists Outlook / OneDrive / SharePoint / Uploads.
- "Fontes conectadas" cards (4 premium cards).
- Matriz A columns: Uploads / Outlook / OneDrive / SharePoint.

### Outlook como fonte
- Hero mockup source pill: Outlook.
- Visual map col 1: Outlook icon.
- Fontes conectadas card: Outlook.
- Matriz A: Outlook column.

### Outlook como envio com confirmação
- Hero mockup stage 5: black "Enviar via Outlook" button.
- Action card "E-mail via Outlook" — "Envio com confirmação".
- Visual map col 3: "E-mail via Outlook · com confirmação".
- After flow step 6: "Outlook envia com confirmação."
- Matriz B "Quem envia" column for Outlook row: "Allybi, depois da confirmação".

### OneDrive / SharePoint / Uploads as sources
- Same as Outlook everywhere (hero pills, map col 1, card grid, Matriz A).

### Resposta com fonte
- Hero mockup: green v3 + source line "SharePoint / Clientes / Contratos / 14 mar".
- Visual map col 2 bullet: "Mostra fonte".
- Trust pillar 2: "Fonte visível".

### Revisão
- Hero mockup: dedicated Review panel (Destinatário / Arquivo / Fonte / Canal).
- Visual map col 3 label: "Você revisa e decide".
- After flow step 5: "Você confirma destinatário, mensagem, arquivo, fonte e canal".
- Trust pillar 5 desc: same.

### WhatsApp handoff (NOT source, NOT auto-sent)
- Hero mockup secondary chip: small "WhatsApp handoff" under the Outlook button (distinct).
- Visual map col 3: "WhatsApp handoff · você envia dentro do WhatsApp".
- Action card 2: muted/dashed chrome, "Handoff" badge, copy "O Allybi monta a mensagem. Você revisa e envia dentro do WhatsApp."
- Matriz B "Quem envia" for WhatsApp row: "Você, dentro do WhatsApp".
- Trust pillar 4: "WhatsApp não sincroniza / Não lemos, sincronizamos nem pesquisamos seu WhatsApp."
- Hero trust chip: "WhatsApp handoff" (secondary tier, hidden ≤480 to keep mobile fold).

### Nada sai sem confirmação
- Hero trust chip (3 visible mobile, 5 desktop).
- Trust pillar 5 title "Envio com revisão" + desc.
- After flow step 6 framing.
- Final CTA micro: "30 dias grátis. Nada sai sem confirmação."

### Documentos não treinam modelos
- Trust pillar 3 desc (canonical phrase): "Seus documentos, perguntas e respostas não treinam modelos."

---

## 4. Banned terms grep result

```
$ grep -E "Koda|Ask |Enviável|enviar com fonte|envio via WhatsApp|WhatsApp conectado|pesquisar no WhatsApp|WhatsApp como fonte|respostas citando|citações de fonte|fundamentado|Sem upload|Manual Search|X-Ray|Cemitério|modo cadê|Google humano|Preparar WhatsApp|Prepare WhatsApp|Enviar WhatsApp|Enviar via WhatsApp|book demo|Book demo" integrations.html
```

→ **Zero matches** in `integrations.html`.

JSON `integ.*` namespace: only "Ask in chat" / "row_ask_chat" → legitimate EN verb usage, unrelated to banned brand "Ask".

---

## 5. JSON parity check

`integ.*` namespace: 95 PT keys vs 95 EN keys. Parity OK. Legacy `integ.whatsapp` / `integ.col_whatsapp` / `integ.s1d` removed in this PR (were listing WhatsApp as a source equivalent — a regression risk).

---

## 6. Playwright audit results

8 breakpoints × PT/EN × full + above-fold + mobile menu.

| Metric | All viewports |
|--------|---------------|
| Horizontal overflow | 0 |
| Console errors | 0 |
| Failed requests | 0 |
| PT leaks on EN render | 0 |
| Mobile menu captured | yes (360/390/430/768) |
| Full-page renders complete | yes |

Screenshots in `qa-screenshots/integrations-redesign/`.

---

## 7. Subagent reviews triage

3 reviews dispatched concurrently:

| Reviewer | Findings | Applied | Skipped |
|----------|----------|---------|---------|
| whatsapp-risk + strategy | 13 items, 3 verdict blockers | 9 fixed | hero scene 6th stage proving WhatsApp button (deferred — visual map col 3 + matrix Quem envia already cover) |
| copy + visual + mobile | 18 items | 13 fixed | visual map deletion (rejected — brief explicitly requires it), default-open accordions (nit) |
| a11y + product-truth | 14 items, 0 verdict blockers | 11 fixed | language-selector aria-controls (out of scope), 12px micro contrast (deferred — colors are token vars) |

---

## 8. Known follow-ups

1. Mobile menu grouping (still flat) — site-wide, deferred.
2. Hero mockup never visibly shows "Abrir WhatsApp" as an explicit handoff button — currently only the Outlook send button is prominent. Map col 3 and Matrix B Quem envia explicitly state user sends inside WhatsApp, so this is informational only. Add a state in `hero-sequence.js` if customer pushes back.
3. `language-switcher.js` aria-expanded/controls — global concern, out of scope.

---

## 9. Confirmation checks (brief item 16.9)

- [x] WhatsApp não aparece como fonte (apenas como handoff; legacy keys removidas).
- [x] Não existe "Enviar ✓" para WhatsApp em nenhum lugar do HTML.
- [x] Não existe promessa de envio automático pelo WhatsApp.
- [x] WhatsApp está descrito como handoff explicitamente (hero, map col 3, action card, matrix B, trust pillar 4).
- [x] "Usuário envia no WhatsApp" — "Você, dentro do WhatsApp" / "você envia dentro do WhatsApp".
- [x] Allybi não lê nem pesquisa a caixa do WhatsApp — trust4.
- [x] Outlook aparece como envio real com confirmação (hero mockup, action card, matrix B, after step 6).
- [x] Fontes e ações estão separadas (Matriz A vs Matriz B com colunas distintas).
- [x] Matriz mobile virou accordion (3 grupos: Sources / Actions / Roadmap).
- [x] Roadmap não compete com integrações atuais (cards menores, label secundário, sub clarifica que produto já funciona sem Gmail/Drive).
- [x] Mobile não é desktop comprimido (custom mobile rules em hero, trust chips, accordions, matrices).
- [x] Animações ensinam mudança (hero sequence 5 acts; reveal genérico no resto).
- [x] Reduced motion funciona (`@media (prefers-reduced-motion: reduce)` em allybi-base.css + page-scoped overrides + hover guard).
- [x] Não há horizontal overflow (8 breakpoints).
- [x] Não há card cortado.
- [x] Não há mockup ilegível (hero mockup expandido + mobile peeks).
- [x] Não há CTA duplicado sem motivo (hero/final usam estrutura diferente; secondary muda contexto).

---

## 10. How to run

```bash
cd /Users/alvarocamasmie/Downloads/koda-Landing
node server.js                          # frontend on http://localhost:8080
node audit-integ-after.mjs              # re-capture qa-screenshots/integrations-redesign/
open http://localhost:8080/integrations.html?lang=pt
```

To merge: `git checkout main && git merge --no-ff integrations-refactor`.
