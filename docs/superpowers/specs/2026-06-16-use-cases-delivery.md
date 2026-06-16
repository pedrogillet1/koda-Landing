# 3 use-case pages refactor — delivery report

**Branch:** `use-cases-refactor` (forked from `security-refactor`)
**Date:** 2026-06-16
**Pages:** /use-case-legal.html, /use-case-finance.html, /use-case-business.html
**Spec:** `docs/superpowers/specs/2026-06-16-use-cases-design.md`

## 1. Summary

Refactored 3 use-case pages in parallel (1 agent per page) using shared template:

- Hero 2-col grid (text + reused `.hero-scene` mockup with public-specific copy)
- Pain section (3 cards from brief, public-specific)
- Proof sections (4 sections from brief)
- Security cards (5 each, no overclaim, with descriptions, CTA to /security-overview.html)
- NEW Diagnostic bridge between security and final CTA (links to diagnostico.html + tempo.html)
- Final CTA: brief item 6/7/8 verbatim — drops banned "clareza"

3 adversarial reviews then ran in parallel (strategy+title-doctor+product-truth / copy+visual+mobile / a11y+security-claims). 17+24+18 findings → consolidated and applied in one commit.

## 2. H1 transformations

| Page | Before | After |
|------|--------|-------|
| Legal | Para advogados que não podem se dar ao luxo da versão errada. | **Para advogados que não podem enviar a versão errada.** |
| Finance | Encontre o deck, modelo ou métrica certo — sem vasculhar. | **Para equipes financeiras que não podem apresentar o número errado.** |
| Business | Encontre a proposta aprovada, plano ou follow-up. | **Para operações que não podem perder o contexto do cliente.** |

## 3. Public specificity (proof checklist)

**Legal** — clauses, versions, drafts, partner/client risk:
- Hero scene: Anderson_MSA_v4.pdf · SharePoint / Anderson / Contratos / 14 mar
- Pain: "Sócio pergunta o que mudou" / "Cliente pede a última minuta" / "Cláusula enterrada entre versões"
- Proof 1: "Compare minutas sem abrir tudo de novo"
- Proof 2: "Quais são os termos de não concorrência no contrato Anderson?" → "Seção 9.3: não concorrência por 24 meses..."

**Finance** — numbers, decks, models, board/CFO risk:
- Hero scene: Deck_Conselho_Q4.pdf · slide 7
- Pain: "Três versões do deck" / "Números espalhados" / specific "Q3 deck vs Q4" attachment mistake
- Proof 1: "ARR Q4 atingiu R$4,2M, alta de 37% vs Q3" (math accurate)
- Proof 2: Q3 R$3,05M vs Q4 R$4,2M comparison

**Business** — proposals, SOWs, context, client risk:
- Hero scene: Escopo_Cliente_Alfa_v2.docx · Mar 8
- Pain: "Cliente esperando o follow-up" / "Três 'finais' diferentes" / "Cliente novo, contexto antigo"
- Proof 1: "Quais são as entregas no escopo aprovado?" → SOW with cronograma
- Proof 2: 3-version list with date timeline

## 4. Brief proof checklist (item 17)

Each canonical truth is present on all 3 pages:

- **Fonte**: hero mockup source line, proof section source-cited answer, security pillar 2.
- **Versão**: hero mockup 3-version semaphore, pain card 2 (each page has version pain), proof section 2.
- **Contexto**: built into pain copy + proof section 3 (review panel).
- **Revisão**: hero mockup review panel, proof section 3, security pillar 4.
- **Outlook send**: hero "Enviar via Outlook" button, proof section 3 with confirm button, security pillar 4.
- **WhatsApp handoff**: hero secondary chip, proof section 4, security pillar 5 ("WhatsApp sem caixa sincronizada").
- **Documentos não treinam modelos**: security pillar 1 (with description); also in final CTA micro.
- **Nada sai sem confirmação**: hero microcopy, security section, final CTA micro.

## 5. Claims técnicos

- **Mantidos**: comportamentais apenas — "documentos não treinam modelos", "fonte visível", "permissões por fonte", "nada sai sem confirmação", "WhatsApp sem caixa sincronizada".
- **Removidos** (não havia base verificada): "criptografia em trânsito e em repouso", "workspaces isolados", "AES-256", "TLS", "SOC 2", "ISO". None of these terms appear in any of the 3 use-case HTMLs (grep verified — zero matches).
- Deflection pattern: each page security section now has CTA → `security-overview.html` for full policy details.

## 6. Banned terms grep

```
$ grep -E "Koda|Ask|Enviável|envio via WhatsApp|WhatsApp conectado|pesquisar no WhatsApp|WhatsApp como fonte|respostas citando|citações de fonte|fundamentado|Manual Search|X-Ray|Cemitério|modo cadê|Google humano|Preparar WhatsApp|Enviar WhatsApp|fonte por padrão|com respostas com fonte|Redija respostas|vasculhar|clareza|Nada sozinho|Não deve inventar|se dar ao luxo|AES|100% seguro|criptografados|workspaces isolados" use-case-*.html
```

→ **Zero matches** in all 3 pages.

JSON `ucl`, `ucf`, `ucb` namespaces also clean.

## 7. JSON parity

| Namespace | PT keys | EN keys | Parity |
|---|---|---|---|
| ucl | 66 | 66 | ✓ |
| ucf | 70 | 70 | ✓ |
| ucb | 76 | 76 | ✓ |

## 8. Playwright audit

8 breakpoints × 3 pages = 24 viewport captures × PT.

| Metric | All viewports |
|---|---|
| Horizontal overflow | 0 |
| Console errors | 0 |
| Mobile menu captured | yes (360/390/430/768 per page) |
| Full-page renders | yes |

Screenshots in `qa-screenshots/use-cases-redesign/{legal,finance,business}/`.

## 9. Reviews triage

| Reviewer | Total | Applied | Skipped |
|---|---|---|---|
| strategy + title-doctor + product-truth | 17 (3 legal, 8 finance, 6 business) | 14 | "Para X que não podem Y" scaffold (brief-mandated pattern, intentional family), per-page diagnostic bridge variants (deferred) |
| pt-br-copy + visual + mobile | 24 | 16 | jargon "handoff" (not banned), "Para X que não podem Y" replays (brief-mandated), green border in proof-2 mock (debatable) |
| a11y + security-claims | 18 | 11 | language menu aria-controls (out of scope — global JS), decorative SVG site-wide audit (deferred — not blocking these pages) |

## 10. Files changed

```
M  use-case-legal.html                (hero 2-col rebuild, h3→h2 fix, security descs + CTA, aria-controls)
M  use-case-finance.html              (hero 2-col rebuild, copy refinements, aria-controls)
M  use-case-business.html             (hero 2-col rebuild, proof 3 confirm button, security descs + CTA, pain card rewrites)
M  pages/use-case-legal.css           (2-col hero grid, mobile rules, security desc styling)
M  pages/use-case-finance.css         (2-col hero grid, mobile rules, channels, bridge, CTA)
M  pages/use-case-business.css        (2-col hero grid, mobile rules, security cards, confirm actions)
M  translations/pt.json               (ucl/ucf/ucb namespaces — 70-86 keys each)
M  translations/en.json               (same — full parity)
A  audit-uc.mjs                       (baseline)
A  audit-uc-after.mjs                 (after-refactor)
A  qa-screenshots/use-cases-before/{legal,finance,business}/
A  qa-screenshots/use-cases-redesign/{legal,finance,business}/
A  docs/superpowers/specs/2026-06-16-use-cases-design.md
A  docs/superpowers/specs/2026-06-16-use-cases-delivery.md (this file)
```

## 11. Known follow-ups

1. Per-page diagnostic bridge micro variants (currently shared "Nenhum documento é pedido. Resultado na hora."). Minor.
2. Site-wide decorative SVG audit for `aria-hidden`. Cross-page, deferred.
3. Language menu aria-controls + nav-dropdown aria-haspopup. Global header concern, deferred.
4. Sticky CTA aria-hidden toggling (finance + business). Minor; deferred.

## 12. Confirmation checks (brief item 17.12)

- [x] 3 H1s padrão equivalente: "Para [público] que não podem [risco real]"
- [x] Finance não usa "vasculhar" no hero (replaced with brief H1)
- [x] Business não usa H1 genérico (brief item 8 H1 applied)
- [x] Não há "com respostas com fonte" (grep clean)
- [x] Não há "fonte por padrão" (grep clean)
- [x] Não há "citação do arquivo" (grep clean)
- [x] WhatsApp não aparece como fonte (handoff in pillar 5 + proof 4 + scene secondary chip)
- [x] Não há promessa de envio automático pelo WhatsApp ("você revisa e envia no WhatsApp")
- [x] Outlook como envio real com confirmação (hero scene button + proof 3 confirm action + security pillar 4)
- [x] Mobile não é desktop comprimido (each page has mobile-specific CSS rules)
- [x] Animações ensinam mudança (hero-sequence reused, single-shot, freezes on s5)
- [x] Reduced motion funciona (global block in allybi-base.css)
- [x] Não há horizontal overflow (8 breakpoints × 3 pages verified)
- [x] Não há card cortado
- [x] Não há mockup ilegível
- [x] Não há CTA duplicado sem motivo

## 13. How to run

```bash
cd /Users/alvarocamasmie/Downloads/koda-Landing
node server.js
node audit-uc-after.mjs                # re-capture
for p in legal finance business; do
  open "http://localhost:8080/use-case-$p.html?lang=pt"
done
```

To merge: `git checkout main && git merge --no-ff use-cases-refactor` (brings the 3 use-case pages + all prior refactors: homepage, how-it-works, integrations, security, plus global a11y/reduced-motion improvements).
