# Design spec — /about.html refactor

**Branch base:** working tree on `main` (pricing refactor uncommitted; about will land in same series)
**Date:** 2026-06-16
**Brief:** 17 sections; mission "construir confiança e explicar por que Allybi existe sem soar manifesto"

## Estado atual (auditoria)

| Aspecto | Estado |
|---|---|
| Reveal class | `.allybi-reveal` (works) |
| Hero shape | Centered text, no visual |
| H1 | "Criamos a Allybi para **acabar com** o trabalho escondido…" — banido |
| Sub | Curto, OK |
| Hero CTA | None |
| Visuals | None — wall of text from start to end |
| Principles section | 6 generic icon-cards (banido por brief) |
| Banned terms count | 6 hits — "acabar com" (2x), "cites its source", "encrypted, isolated", "workspace" (3x), "trace the reasoning" |
| English leaking on PT page | YES (about.why.p1/p2/p3, about.never.p1, about.work.p1 all in English) |
| "For whom" cards | None |
| Diagnostic bridge | None |
| Final CTA section | None (single inline CTA inside about.work) |
| Footer language selector | "English" default label on PT view — sync bug |
| Trust chips | None |

## Brief diff resumido

| Bloco brief | Estado atual | Decisão |
|---|---|---|
| 1. Header global | Já existe (correto) | Manter |
| 2. Hero novo | Centered text only | Refazer: 2-col, micro-história à direita |
| 3. Por que existe | "Por que Allybi existe" + 3 parágrafos | Refazer: título "O problema não é falta de informação." + 5 cards (Pedido / Busca / Dúvida / Revisão / Envio) |
| 4. A decisão de produto | Falta | Novo: "Achar não basta." + 4 cards (Resposta com fonte, Versão, Revisão, Envio controlado) |
| 5. Como tomamos decisões | "No que acreditamos" 6 cards genéricos | Rename + reescrever para 6 princípios curtos, sem ícones grandes |
| 6. O que não fazemos | "What we will never do" 2 parágrafos curtos | Refazer como 6 cards com limites claros |
| 7. Para quem criamos | Existe parágrafo "kind of work" | Refazer: 3 cards (advogados, financeiro, operações) com micro mockup + CTA |
| 8. Ponte diagnóstico | Falta | Novo (mesmo padrão das use-cases) |
| 9. CTA final | Falta como seção dedicada | Novo: bloco dark "Teste o caminho real." |
| 10. Footer | OK, "Metodologia" já consistente | Verificar idioma label |

## Abordagem

Refazer /about.html como página de **prova de produto**, não manifesto. Cada seção responde a uma pergunta direta. Visual mockups onde provam (hero micro-história + use-case mini mockups). Zero ícones decorativos isolados. Cards em grids equilibrados.

### Hero (1 unidade)
- 2-col grid (text-left + micro-story-right) — mesmo padrão de pricing.html (hero não é hero-scene da home)
- Eyebrow `Sobre a Allybi` / H1 / sub / 2 CTAs / micro / 5 trust chips
- Micro-story à direita: pedido → fontes → resposta com fonte → revisão → enviar via Outlook (6 micro-steps verticais)
- Mobile: 3 mini-cards (Pedido / Resposta com fonte / Revisão)

### Seções de prova (8 blocos)
1. **Hero** (acima)
2. **O problema não é falta de informação** — 5 cards (Pedido / Busca / Dúvida / Revisão / Envio) com fluxo horizontal desktop, vertical mobile
3. **Achar não basta** — 4 cards de decisão de produto com mini visuais
4. **Como tomamos decisões de produto** — 6 princípios em grid 3×2 (label + descrição, sem ícone grande)
5. **O que não fazemos** — 6 cards de limites
6. **Para quem criamos** — 3 cards com mini mockup (legal / finance / ops)
7. **Ponte para diagnóstico** — CTA dual (Mapear fluxo / Calcular tempo perdido)
8. **CTA final** — bloco dark "Teste o caminho real."

### Padrão CSS
- Reutilizar `.allybi-section`, `.allybi-container`, `.allybi-reveal`, `.allybi-stagger`
- Pages-scoped `pages/about.css` para overrides específicos do hero 2-col + micro-story
- Mobile-first quebras em 600px / 480px
- Reduced-motion já coberto em `allybi-base.css` global

### i18n
- Namespace `about.*` (PT + EN paridade)
- Sub keys: `about.hero.*`, `about.problem.*`, `about.decision.*`, `about.decisions.*`, `about.limits.*`, `about.for_whom.*`, `about.bridge.*`, `about.final.*`
- Apagar/substituir keys legadas (`about.why.*`, `about.beliefs.*`, `about.optimize.*`, `about.never.*`, `about.work.*`)

### SEO/metadata
- Title: `Sobre | Allybi`
- Description: brief item 13 verbatim
- OG title/description: brief item 13 verbatim
- Canonical + hreflang alternate

### Animations
- `.allybi-reveal` reuse — initReveal() já cobre
- No new motion components — produto se prova pelo conteúdo

## Decisões padrão
- NÃO reutilizar `hero-scene` da homepage (user instruction repetida em pricing e security-overview; aplica a todas hero pages)
- Mini-mockups das use-cases: reaproveitar componentes em `pages/about.css` (não tocar nos componentes globais)
- Stale principle-card icons removidos: ícones grandes sozinhos são banidos por brief
- Idioma footer: o `language-switcher.js` deve setar label correto na load; checar bug no QA

## Out of scope
- Refactor de outras páginas
- Mudanças em components globais (`allybi-header.css`, `allybi-footer.css`)
- Tradução ES (mantida vazia/idêntica ao EN se existir)
- Decoração nova de header/footer

## Riscos
- Hero 2-col vai aumentar altura no mobile → mitigar com micro-story compacta (3 mini-cards verticais, não 6)
- "Para quem" com mini mockups: cuidar para não criar mockup ilegível < 12px
- 6+5+4+6+3 = 24 cards no total — checar densidade visual / fatiga; manter espaçamento generoso entre seções (88-112px desktop, 64-80px mobile)
