# /security-overview.html refactor — delivery report

**Branch:** `security-refactor` (forked from `integrations-refactor`)
**Date:** 2026-06-16
**Brief:** mensagem do usuário, 17 seções (max focus on item 2 — claim rules)
**Spec:** `docs/superpowers/specs/2026-06-16-security-design.md`
**Before:** `qa-screenshots/security-overview-before/` (37 files)
**After:** `qa-screenshots/security-overview-redesign/` (37 files)

---

## 1. Summary of changes

| # | Phase | Outcome |
|---|-------|---------|
| 0 | Reveal observer | `initReveal()` cobre `.sec-reveal`; reduced-motion universal força `.sec-reveal` para `opacity:1`; noscript fallback. Antes 90% da página invisível em screenshots/SEO. |
| 1 | Hero 2-col com permission panel ÚNICO | **NÃO reaproveita** `hero-scene` (decisão do usuário). Visual próprio: 4 fontes em verde (Outlook/OneDrive/SharePoint/Uploads — `conectado`/`adicionados`) + WhatsApp em roxo (`handoff` — distinção semântica) + pergunta com fonte + painel de revisão "AGUARDANDO CONFIRMAÇÃO" + botão "Enviar via Outlook". 5 trust chips (3 visíveis no mobile ≤600). |
| 2 | **Overclaim crypto removido** (BLOCKER per brief item 2) | Card "Dados protegidos / Criptografia em trânsito e em repouso" (com TODO 'confirm AES-256-GCM with engineering' confirmando que não verificado) **removido**. Substituído por **"Detalhes nas políticas"** com link inline para `#policies`. SEO description, OG, Twitter: 'criptografia' removida. |
| 3 | Banned terms rewrites | `basics_c4_h` "Nada sai sozinho" → **"Envio com revisão"**. `not_c3_h` "Não envia sozinho" → **"Não envia sem revisão"**. `not_c5_h` "Não deve inventar fonte" → **"Não apresenta incerteza como certeza"**. |
| 4 | IA workspace 4ª etapa | Adicionada zona "Limite claro / Sem fonte suficiente, mostra a limitação" + 4º statement "Limitação clara". |
| 5 | Highlight phrase | Após sub da seção 6: **"WhatsApp não é fonte. É handoff."** em estilo quote (border-left + bigger weight, no card chrome). |
| 6 | Access "Pode usar / Não usa" | Headings renomeados conforme brief. Lista direita reescrita pra refletir o que Allybi NÃO acessa (WhatsApp inbox, fontes não conectadas, arquivos fora do workspace, documentos removidos, canais sem permissão) — não mais user-control truisms. |
| 7 | Final CTA microcopy | "30 dias grátis. Documentos não treinam modelos. Nada sai sem confirmação." (canonical phrase). Secondary CTA → "Ver integrações e uso de dados". Title → "Teste sem perder controle." |
| 8 | SEO/OG cleanup | Title "Segurança \| Allybi", canonical, alternate hreflang, twitter card. 'criptografia' removida de description e OG. |
| 9 | Review-driven a11y | • mobile-toggle `aria-controls`<br>• h4 → h3 em sec-ai/sec-perms/sec-sending (hierarchy)<br>• panel send `<button>` → `<span>` (resolve conflict com `aria-hidden` parent)<br>• `aria-hidden` + `focusable="false"` nos SVGs do panel<br>• `:focus-visible` explícito em policies cards<br>• handoff tag color #4B1A99 (AA contrast) |
| 10 | Review-driven copy | • TODO comment 'confirm OAuth scope' removido<br>• panel_query "Qual versão" (capitalized)<br>• basics_sub: "Fonte, permissão e confirmação ficam visíveis em cada etapa." (drops 'projetado para' pattern)<br>• not_c6_p "O produto" → "O Allybi encontra e prepara. Você decide e envia."<br>• perms_whatsapp_desc: "O Allybi monta a mensagem. Você abre seu WhatsApp e envia."<br>• perms_roadmap "estão no roadmap" → "em breve" |
| 11 | Review-driven layout | • Sending mock confirm: green → black (green only for confirmed-source)<br>• Basics 5-card grid: 5-col @ ≥1100, 3-col @ 768-1099 (no orphan row)<br>• Trust chip cap moved from ≤480 to ≤600 (390/430 also cap)<br>• Tablet hero panel collapses `.sec-panel__answer` to keep CTAs above fold |
| 12 | Legacy keys cleanup | Removidas `sec.pillars`, `sec.willwont`, `sec.hero` nested, `sec.cta` nested do pt.json + en.json — carregavam claims AES-256/TLS e demo CTAs de versão anterior. |

---

## 2. Files changed

```
M  security-overview.html                (hero 2-col, banned-term rewrites, new 5th basics
                                          card, AI 4th stage, highlight phrase, h3 hierarchy,
                                          aria-controls, SEO/OG)
M  pages/security-overview.css           (hero grid, permission panel ÚNICO, mobile rules,
                                          review-fix block: sending confirm dark, basics
                                          5-col, trust chip cap 600, focus-visible,
                                          highlight as quote, handoff badge contrast)
M  allybi-animations.js                  (initReveal covers .sec-reveal)
M  allybi-base.css                       (reduced-motion universal block + .sec-reveal)
M  translations/pt.json                  (sec.* + new panel keys; orphan blocks removed)
M  translations/en.json                  (sec.* + new panel keys; orphan blocks removed)
A  audit-sec.mjs                         (audit script)
A  audit-sec-after.mjs                   (after-refactor capture)
A  qa-screenshots/security-overview-before/   (baseline + report)
A  qa-screenshots/security-overview-redesign/ (after + report)
A  docs/superpowers/specs/2026-06-16-security-design.md
A  docs/superpowers/specs/2026-06-16-security-delivery.md (this file)
```

---

## 3. Brief proof checklist (item 17)

### Fontes permissionadas
- Hero permission panel: 4 source rows em verde com "conectado"/"adicionados".
- Access "Pode usar" list: 5 fontes.
- Trust chip hero: "Fontes permissionadas".

### Documentos não treinam modelos (canonical phrase 5 places)
- Hero microcopy.
- Trust chip hero (secondary).
- basics_c1_h: "Documentos não treinam modelos".
- not_c1_p: "Documentos, perguntas e respostas não são usados para treinamento."
- ai_stmt2: "Os dados do workspace não treinam modelos."
- Final CTA micro.

### Resposta com fonte
- Hero permission panel mostra arquivo + path "Clientes / Contratos / 14 mar".
- basics_c3 "Fonte visível / Cada resposta mostra de onde veio quando há base suficiente."
- ai_stmt3 "Fonte visível".
- Trust chip hero "Resposta com fonte".

### Limites quando não há base suficiente
- AI workspace 4ª etapa "Limite claro / Sem fonte suficiente, mostra a limitação."
- ai_stmt4 "Limitação clara".
- not_c5 "Não apresenta incerteza como certeza / Quando não há base suficiente, mostra a limitação."

### Revisão antes do envio
- Hero permission panel: "AGUARDANDO CONFIRMAÇÃO" yellow label + review fields + send button.
- basics_c4 "Envio com revisão / Você revisa mensagem, arquivo, fonte, destinatário e canal antes do envio."
- Section 7 (sending): mock review panel completo.
- Trust chip "Revisão antes do envio".
- Final CTA micro "Nada sai sem confirmação".

### Outlook como envio com confirmação
- Hero panel: black "Enviar via Outlook" button.
- sending_ch1_p: "Pode ser enviado depois da sua confirmação."
- not_c3_p: "E-mails via Outlook exigem revisão e confirmação."

### WhatsApp handoff
- Hero permission panel: WhatsApp roxo com tag "handoff" (visually distinct from green sources).
- Trust chip "WhatsApp handoff" (secondary).
- Access "Não usa" list: "WhatsApp inbox" primeiro item.
- Highlight phrase: **"WhatsApp não é fonte. É handoff."**
- perms_whatsapp_desc: "O Allybi monta a mensagem. Você abre seu WhatsApp e envia."
- not_c2: "Não lê seu WhatsApp / WhatsApp é handoff. A caixa de entrada não é pesquisada."
- not_c3_p: "WhatsApp é enviado pelo usuário dentro do WhatsApp."
- sending_ch2_p: "Abre o WhatsApp com mensagem pronta. O envio final é do usuário."

### Usuário no controle
- Access section "O Allybi só usa o que você autoriza."
- Trust strip, hero, final CTA todos enfatizam confirmação.

---

## 4. Claims técnicos mantidos vs removidos

### Mantidos (com base real no produto)
- "Documentos não treinam modelos" — canonical, repetido 5x.
- "Acesso permissionado" — descreve mecanismo OAuth.
- "Fonte visível" — comportamento observável do produto.
- "Envio com revisão" — UI real.
- "WhatsApp handoff" — comportamento real (não é integração).

### Removidos ou suavizados
- ❌ "Criptografia em trânsito e em repouso" (basics_c3 card) — TODO `confirm AES-256-GCM with engineering` confirmava overclaim. Substituído por **"Detalhes nas políticas"** com link para `#policies`.
- ❌ SEO description + OG + Twitter: "criptografia" removida.
- ❌ Orphan keys `sec.pillars.encryption.desc` ("AES-256-GCM em repouso, TLS em trânsito") removidas do pt.json + en.json.
- ❌ "Não deve inventar fonte" → "Não apresenta incerteza como certeza" (frase canonical mais segura).

---

## 5. Banned terms grep

```
$ grep -E "Koda|Ask|Enviável|envio via WhatsApp|WhatsApp conectado|pesquisar no WhatsApp|WhatsApp como fonte|respostas citando|citações de fonte|fundamentado|Manual Search|X-Ray|Cemitério|modo cadê|Google humano|Preparar WhatsApp|Enviar WhatsApp|100% seguro|blindado|Nada sozinho|Não deve inventar|AES-256|SOC 2|ISO 27001|zero-knowledge|projetado para|permite que|possibilita|de forma simples|solução completa|jornada|sem fricção|hub|centralizado|plataforma inteligente|robusto|escalável|intuitivo|inovador" security-overview.html
```

→ **Zero matches** in `security-overview.html`.

JSON `sec.*` namespace: clean (after orphan block removal).

---

## 6. JSON parity

After orphan keys cleanup: 53 keys per side (pt.json vs en.json), 100% match in current `sec.*` namespace.

---

## 7. Playwright audit results

8 breakpoints × PT/EN × full + above-fold + mobile menu.

| Metric | All viewports |
|--------|---------------|
| Horizontal overflow | 0 |
| Console errors | 0 |
| Failed requests | 0 |
| PT leaks on EN render | 0 |
| Mobile menu captured | yes (360/390/430/768) |

Screenshots in `qa-screenshots/security-overview-redesign/`.

---

## 8. Subagent reviews triage

| Reviewer | Findings | Applied | Skipped (with rationale) |
|----------|----------|---------|--------------------------|
| security-claims + strategy + whatsapp-risk | 14 items (all NITs) — VERDICT: "page is safe" | 4 fixed (TODO removal, whatsapp_desc rewrite, roadmap copy, highlight styling note) | 10 nits accepted as-is |
| pt-br-copy + visual + mobile | 17 items (3 marked blockers, 7 highs) | 11 fixed | "Nada sai sem confirmação" → kept (it IS the canonical brief phrase; reviewer false-positive). "Não lê seu WhatsApp" → kept (no banned wording). Section 8 policies + Section 4 NOT structural rework deferred. Contato menu parity deferred (out of scope). |
| a11y + product-truth | 15 items (2 highs) — VERDICT: "page is accessible and self-truthful (pending fixes)" | 11 fixed | Touch target on basics_inline-link accepted as inline-text exception (WCAG 2.5.5 inline exception). |

---

## 9. Known follow-ups

1. Section 4 (sec-not) has 6 negative cards — could merge into section 3 "Não usa" column for stronger structure. Deferred.
2. Section 8 (policies) — 6 pill cards in a single grid. Could turn into 2-col with category headers. Deferred.
3. Mobile menu Contato parity vs desktop — site-wide, deferred.

---

## 10. Confirmation checks (brief item 17.11)

- [x] WhatsApp não aparece como fonte (panel uses purple/handoff tag, access lists "WhatsApp inbox" under "Não usa").
- [x] Não existe "Enviar WhatsApp" em nenhum lugar.
- [x] Não há promessa de envio automático pelo WhatsApp ("Você abre seu WhatsApp e envia").
- [x] WhatsApp descrito como handoff (hero panel tag, perms card, highlight phrase, NOT card 2).
- [x] Usuário envia no WhatsApp ("Você, dentro do WhatsApp" / "Você abre seu WhatsApp e envia").
- [x] Allybi não lê nem pesquisa caixa do WhatsApp (NOT card 2, perms description).
- [x] Outlook como envio real com confirmação (hero panel, sending mock, sending_ch1, not_c3).
- [x] Nada sai sem confirmação (canonical phrase visible in 4 spots).
- [x] Documentos não treinam modelos (canonical phrase visible in 5 spots).
- [x] Não há overclaim técnico (crypto removed, no AES/SOC/ISO/100%, deflects to policies).
- [x] Não há certificações falsas (none invented; "Certificações...quando disponíveis" note kept honest).
- [x] Mobile não é desktop comprimido (hero stacks, trust chips cap at 600, hero panel collapses on tablet).
- [x] Animações ensinam mudança (reveal opacity only; no hero loop on this page).
- [x] Reduced motion funciona (allybi-base.css global + page-scoped).
- [x] Não há horizontal overflow (8 breakpoints verified).
- [x] Não há card cortado.
- [x] Não há mockup ilegível (hero panel collapses on tablet, mobile peeks).
- [x] Não há CTA duplicado sem motivo (hero / final use distinct sub-actions).

---

## 11. How to run

```bash
cd /Users/alvarocamasmie/Downloads/koda-Landing
node server.js
node audit-sec-after.mjs                # re-capture
open http://localhost:8080/security-overview.html?lang=pt
```

To merge: `git checkout main && git merge --no-ff security-refactor` (brings homepage, how-it-works, integrations, security refactors together + global a11y/reduced-motion fixes).
