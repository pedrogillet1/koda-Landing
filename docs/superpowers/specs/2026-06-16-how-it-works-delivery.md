# /how-it-works.html refactor — delivery report

**Branch:** `how-it-works-refactor` (forked from `homepage-refactor`).
**Base:** `homepage-refactor` HEAD → 7 commits.
**Date:** 2026-06-16
**Brief:** mensagem do usuário, 14 seções.
**Spec:** `docs/superpowers/specs/2026-06-16-how-it-works-design.md`.
**Audit baseline:** `docs/superpowers/specs/2026-06-16-how-it-works-audit.md`.

---

## 1. Summary of changes

| # | Phase | Outcome |
|---|-------|---------|
| 1 | Reveal fix | `initReveal()` cobre `.allybi-reveal, .hiw-reveal`; 1.5s safety fallback. Antes 80% da página invisível em SEO/crawlers. |
| 1 | Reduced-motion universal | Bloco `@media (prefers-reduced-motion: reduce)` em `allybi-base.css` — kills animation/transition globally + força `.allybi-reveal/.hiw-reveal` para `opacity:1`. |
| 2 | Hero rebuild | Layout 2-coluna (texto + mockup à direita reaproveitando `hero-scene`). 4 trust chips. Eyebrow 'Como funciona'. Mobile responsivo. |
| 3 | Panel 02 banned term | `Preparar WhatsApp` → `Abrir handoff`. |
| 3 | Panel 04 semáforo | Texto novo (added) agora **verde** (era amarelo). Status "Alteração confirmada na fonte" com check. sr-only "removido:"/"adicionado:" para a11y. |
| 3 | Panel 05 expansão | Title "Monte a mensagem para revisão". Painel estruturado: Mensagem (preview) / Arquivo / Fonte / Canal. Microcopy WhatsApp handoff. |
| 4 | Depth h2 + sub | "Uma pergunta vira um fluxo confirmado." Sub framing positivo. Saem zone com micros "com confirmação" e "você envia no app". h4→h3 (heading hierarchy). |
| 5 | Bridge para diagnóstico | **Nova seção** entre depth e CTA: "Quer ver onde seu fluxo trava hoje?" + CTA diagnostico.html + link tempo.html + microcopy. |
| 6 | CTA final | + microcopy "30 dias grátis. Nada sai sem confirmação." |
| 6 | Panel 06 | + trust micro "Nada sai sem sua confirmação." dentro do mock visual. |
| 7 | SEO/OG | title "Como funciona \| Allybi", description completa, canonical, alternate hreflang, twitter card. |
| 8 | A11y global | `:focus-visible` em CTAs/links/buttons; mobile-toggle 40→44px; `.sr-only`; aria-label do hero scene via i18n; aria-hidden em SVGs decorativos. |
| 8 | Copy review fixes | story_h2 sem duplicar H1, story_sub na ordem do brief, panel3_desc "cita a fonte", bridge_sub natural PT-BR, em-dash em titles → ":" |
| 8 | Visual review fixes | hero mobile tighter, trust bullets neutral, panel 5 dl stack mobile, depth section vertical mobile com connector. |
| 8 | Motion review fix | hero-sequence.js roda **uma vez** e freezes em s5 (não loop infinito). |

---

## 2. Files changed

```
M  allybi-animations.js              (initReveal cobre .hiw-reveal)
M  allybi-base.css                   (+focus-visible + .sr-only + reduced-motion universal)
M  allybi-header.css                 (mobile-toggle 40→44px)
M  hero-sequence.js                  (runs once, supports multiple .hero-scene)
M  how-it-works.html                 (hero 2-col, panels refined, depth, NEW bridge section, CTA micro, SEO/OG)
M  pages/how-it-works.css            (hero grid, mobile rules, depth mobile vertical, bridge styles)
M  language-switcher.js              (data-i18n-aria-label support)
M  translations/pt.json              (hiw.* keys updated + new keys)
M  translations/en.json              (hiw.* keys updated + new keys)
A  audit-hiw.mjs                     (visual audit script)
A  audit-hiw-after.mjs               (after-refactor capture)
A  qa-screenshots/how-it-works-before/   (37 baseline captures + report.json)
A  qa-screenshots/how-it-works-redesign/ (37 after captures + report.json)
A  docs/superpowers/specs/2026-06-16-how-it-works-audit.md
A  docs/superpowers/specs/2026-06-16-how-it-works-design.md
A  docs/superpowers/specs/2026-06-16-how-it-works-delivery.md (this file)
```

Out of scope (untouched): outras páginas internas, server, palette/logo, sistema i18n architecture.

---

## 3. Brief proof checklist (item 14)

### Fonte
- Hero mockup: green-bordered v3 row + check + source line `SharePoint / Clientes / Contratos / 14 mar`.
- Panel 03: badge "Resposta com fonte" + path "Clientes / Contratos / 14 mar · p. 12".
- Panel 04: source ref "Contrato v3 vs v4 · Cláusula 8.1" + status "Alteração confirmada na fonte".
- Panel 05: structured field "Fonte: Clientes / Contratos / 14 mar · p. 12".
- Panel 06: review field "Fonte: Clientes / Contratos / 14 mar".
- Depth section: "com fonte" chip in the Allybi center.

### Versão
- Hero mockup: 3 stacked versions (anterior / incerta / confirmada).
- Panel 04: explicit version diff (v3 vs v4) with red strikethrough + green replacement.
- Tools bridge: "Mapeie em 1 minuto onde o time trava: pedido, busca, **versão**, fonte..."

### Contexto
- Panel 05 desc: "O Allybi monta a mensagem com **contexto**, arquivo e canal."
- Panel 02: chips "Comparar versões / Encontrar fonte" framing context as the work.

### Revisão
- Hero mockup: dedicated review panel (Destinatário/Arquivo/Fonte/Canal).
- Panel 05 title: "Monte a mensagem para **revisão**".
- Panel 06: review mock with Para/Arquivo/Fonte/Via fields + Cancelar/Enviar buttons.
- Depth h2: "Uma pergunta vira um fluxo confirmado."
- Depth sub: "Cada envio passa por **revisão**. Você confirma fonte, versão, mensagem e canal antes de qualquer envio."

### Envio via Outlook
- Hero mockup: prominent black `Enviar via Outlook` button.
- Panel 05 chip: "E-mail via Outlook".
- Panel 06 button: "Enviar via Outlook" with confirmation micro.
- Depth Saem zone: "E-mail via Outlook · com confirmação".

### WhatsApp handoff (não como source, não auto-sent)
- Hero mockup: small chip "WhatsApp handoff" secondary to Outlook button.
- Panel 02 chip: "Abrir handoff" (substitui "Preparar WhatsApp" banido).
- Panel 05 microcopy: "Para WhatsApp, o Allybi abre a conversa com a mensagem pronta. Você envia no WhatsApp."
- Depth Saem zone: "WhatsApp handoff · você envia no app".
- Hero trust chip: "WhatsApp handoff" with neutral dot.

### Nada sai sem confirmação
- Trust chip hero (4 chips).
- Panel 06 trust micro inside the mock.
- Bridge micro line below CTAs.
- Final CTA micro: "30 dias grátis. Nada sai sem confirmação."
- Depth sub: "Você confirma ... antes de qualquer envio."

### Documentos não treinam modelos
- Trust chip hero (1 of 4 chips).
- Reinforcement via security FAQ link (footer).

---

## 4. Banned terms grep

```
$ grep -cE "Koda|Ask|Enviável|enviar com fonte|envio via WhatsApp|WhatsApp conectado|pesquisar no WhatsApp|WhatsApp como fonte|respostas citando|citações de fonte|fundamentado|Sem upload|Manual Search|X-Ray|Cemitério|modo cadê|Google humano|Preparar WhatsApp|Prepare WhatsApp|book demo|Book demo" how-it-works.html
0
```

Page is clean.

---

## 5. JSON parity (hiw namespace)

| File | hiw keys | Parity vs other lang |
|------|---------|---------------------|
| en.json | 88 hiw keys | 2 legacy EN-only (`cta_title2`, `cta_subtitle2` — unused) |
| pt.json | 88 hiw keys | 2 legacy PT-only (`mock_confirm`, `strip_upload` — unused) |

All new/updated keys have both PT and EN values.

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
| Full-page renders complete | yes (reveal fix active) |

Screenshots in `qa-screenshots/how-it-works-redesign/`.

---

## 7. Subagent reviews

3 adversarial reviews dispatched concurrently:

| Reviewer | Findings | Applied | Out-of-scope / nits skipped |
|----------|----------|---------|------------------------------|
| strategy-auditor + pt-br-copy-editor | 20 items | 13 fixed in commit `020c6fe` | nits #15-#20 (panel chip duplication, lowercase chip, secondary query mock) |
| visual-director + motion-director + mobile-ux-reviewer | 18 items | 12 fixed | menu grouping (out of scope), panel chip tier-visual (nit), panel 4 diff legend (nit) |
| accessibility-reviewer + product-truth-reviewer | 15 items | 11 fixed | logo aria-label (nit), language selector keyboard (out-of-scope) |

---

## 8. Known follow-ups (not blocking)

1. Mobile menu grouping — still flat. Recommended next PR.
2. Hero pricing repeated copy across hero + final CTA — minor.
3. Footer language selector full keyboard navigation — needs JS work, out of this scope.
4. Loop pricing line strategy decision (drop or include R$170/mês) — defer to product.

---

## 9. Confirmation checks (brief item 14.9)

- [x] WhatsApp não aparece como fonte (only as handoff in depth Saem + panel 5 micro).
- [x] Não há promessa de envio automático pelo WhatsApp (explicit "você envia no app").
- [x] Outlook aparece como envio real com confirmação (hero mock button + panel 05/06 + depth "com confirmação").
- [x] Etapa final mostra revisão antes do envio (panel 06 + depth h2 explicit).
- [x] Mobile não é desktop comprimido (custom mobile rules em hero, panel 5, depth section).
- [x] Animações ensinam mudança (hero sequence 5 acts; rest is just opacity reveal).
- [x] Reduced motion funciona (universal block in allybi-base.css + page-scoped overrides).
- [x] Não há horizontal overflow (8 breakpoints).
- [x] Não há card cortado.
- [x] Não há mockup ilegível (panel 5 mobile stacks; hero mobile peeks visual into fold).
- [x] Não há CTA duplicado sem motivo (hero + bridge + final use distinct CTAs).

---

## 10. How to run

```bash
cd /Users/alvarocamasmie/Downloads/koda-Landing
node server.js                          # frontend on http://localhost:8080
# Re-capture screenshots:
node audit-hiw-after.mjs                # → qa-screenshots/how-it-works-redesign/
# Open the page:
open http://localhost:8080/how-it-works.html?lang=pt
```

To merge: `git checkout main && git merge --no-ff how-it-works-refactor`.
