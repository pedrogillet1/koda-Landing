# Design spec — 3 use-case pages refactor

**Branch:** `use-cases-refactor` (from `security-refactor`)
**Date:** 2026-06-16
**Brief:** 17 sections, 3 pages: legal, finance, business

## Estado atual

| Page | Reveal | Hero shape | Critical issues |
|---|---|---|---|
| Legal | `.allybi-reveal` (works) | centered text | Wordy H1 ("se dar ao luxo da versão errada"), CTA final "clareza" BANIDO |
| Finance | `.allybi-reveal` (works) | centered text | H1 "vasculhar" BANIDO + travessão + concordância, sub "com respostas com fonte" 2x BANIDO, sec "fonte por padrão" BANIDO, CTA "clareza" BANIDO |
| Business | `.allybi-reveal` (works) | centered text | H1 starts with "proposta aprovada, plano ou follow-up" — brief item 8 explicitly bans this exact phrase. "Redija respostas" + "compõe a mensagem com fonte nos seus documentos" BANIDOS. CTA "clareza" BANIDO. |

**Shared:** Hero centered (brief pede 2-col with public-specific mockup). Diagnostic bridge missing on all 3.

## Approach

1 agent per page (parallel) using identical refactor template:

- **Hero rebuild**: 2-col grid, text left + public-specific permission/mockup panel right (reusing the `hero-scene` component from homepage since user only restricted reuse on /security-overview). Trust chips (5 per brief).
- **Copy verbatim from brief**: H1, sub desktop, sub mobile, microcopy, all 3 dor cards, all 4 prova sections, security section, diagnostic bridge, final CTA.
- **Diagnostic bridge** (new section): title + sub + CTA to diagnostico.html + link to tempo.html + micro.
- **CTA final** rewrite: drop "clareza", use brief-mandated "Teste com uma minuta/deck/proposta real."
- **Security cards**: drop unverified crypto/workspace claims.
- **SEO/OG**: brief item 14 exact titles + descriptions.
- **Mobile**: 2-col stacks, primary full-width, secondary text link.

## Standard refactor pattern (all 3 pages)

```
Hero: 2-col grid
├─ Text col: eyebrow + H1 + sub + 2 CTAs + microcopy + 5 trust chips
└─ Visual col: hero-scene variant (same component, public-specific copy via i18n)
Pain: 3 cards (already in place, slight copy refresh)
Proof: 4 sections (already in place, copy align with brief)
Security: 5 cards (drop overclaim if present)
Diagnostic bridge: NEW section between security and final CTA
Final CTA: title + sub from brief + new micro
```

## Decisões padrão

- Reaproveitar `hero-scene` (homepage component) com copy específica por público. Não criar novos mockups by hand — economia + consistência.
- Hero-scene query/answer specific per page:
  - Legal: "o que mudou na cláusula 8.1?" → Anderson_MSA_v4.pdf · p. 12
  - Finance: "qual foi o ARR do Q4?" → Deck_Conselho_Q4.pdf · slide 7
  - Business: "manda o SOW atualizado?" → Escopo_Cliente_Alfa_v2.docx · Mar 8
- Diagnostic bridge: title + sub per public (brief items 6/7/8 each have specific title).
- All other sections: light copy refresh; no structural rebuild needed.

## Out of scope

- Mockups customizados além do hero-scene (custaria token demais; visual já está consistente com o resto do site).
- Refactor de outras páginas.
- Mobile menu grouping (deferred).
