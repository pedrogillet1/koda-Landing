# About Redesign Report

## 1. Resumo da nova arquitetura

A página /about.html foi reescrita por completo seguindo a especificação Sobre v2 (2026-06-19). A página agora é **editorial e institucional**, sem mockup de produto, sem CTA no hero, sem feature grid. A estrutura é:

1. Header global (preservado).
2. Hero institucional (eyebrow + H1 com dois spans + sub + supporting line).
3. Nossa história (2-col desktop: 3 parágrafos + pull quote separado por linha vertical).
4. Missão e Visão (faixa escura split 2-col com divisor vertical, sem cards).
5. Valores (5 valores em ledger numerado, sem cards, sem ícones).
6. Como trabalhamos (3 princípios em grid horizontal com divisores verticais).
7. Equipe — **FALLBACK** institucional (não há dados verificados de equipe; renderizando o bloco §32).
8. Encerramento (CTA primário + secundário + microcopy).
9. Footer global (preservado).

A faixa de Fatos Verificáveis (§33) **não foi renderizada**: nenhum dos campos `foundedYear`, `headquarters`, `workMode` existe em qualquer arquivo do repositório.

## 2. Arquivos alterados

- `about.html` — reescrita completa do `<main>`. Head/header/footer/mobile menu preservados.
- `pages/about.css` — reescrita completa.
- `ABOUT_PRE_AUDIT.md` — criado.
- `ABOUT_REDESIGN_REPORT.md` — este arquivo.

Nenhuma outra página foi alterada. Header e footer globais não foram tocados.

## 3. Seções antigas removidas

- Hero antigo ("Criamos a Allybi para acabar com o trabalho escondido entre pedir e enviar").
- "Por que Allybi existe" (parágrafos institucionais).
- "No que acreditamos" (grade de 6 crenças com ícones).
- "Para o que otimizamos" e "O que nunca faremos".
- "O tipo de trabalho para o qual Allybi foi feito".
- CTAs antigos no rodapé da página.

## 4. Copy antiga removida

Todas as frases listadas em §4 + §44 foram eliminadas. Em particular:

- "Privacidade não é uma opção. É a arquitetura." — removido.
- "enviar com respostas com fonte" — removido.
- "respostas com fonte que citam fontes" — removido.
- "Cada resposta de IA cita sua fonte" — removido.
- "Cada resposta é com fonte" — removido.

## 5. Claims removidas

Os termos `criptografados`, `isolados`, `zero-knowledge`, `100% seguro` foram completamente removidos. Nenhuma claim de criptografia ou isolamento não verificável aparece.

## 6. Claims verificadas mantidas

Mantidas porque correspondem a fatos verificáveis sobre o produto (já presentes em outras páginas do próprio repositório):

- "Documentos, perguntas e respostas não treinam modelos" (valor 04).
- "WhatsApp handoff" — usado apenas implicitamente no contexto editorial; nada sobre conexão de fonte.
- Trial 30 dias e R$170/mês no microcopy do encerramento.

## 7. Componentes criados

Todos com prefixo `about-` para isolamento por página:

- `.about-hero` + `.about-hero-copy`.
- `.about-origin` + grid 2-col com `.about-origin-paragraphs` e `.about-origin-quote-wrap` (divisor vertical em desktop, horizontal em mobile).
- `.about-direction` (faixa escura split 2-col com `.about-direction-side--vision` separado por linha vertical no desktop e horizontal no mobile).
- `.about-values-ledger` com `.about-values-row` (numerada, sem card).
- `.about-work-principles` com `.about-work-principle` (sem card, divisores entre colunas).
- `.about-team-fallback` (bloco institucional 2-col).
- `.about-close` (CTA final em F1F0EF, sem ser dark full-width).

## 8. Imports auditados

CSS:
- `allybi-tokens.css`, `allybi-base.css`, `allybi-components.css`, `allybi-header.css`, `allybi-footer.css` — globais.
- `pages/about.css` — específico da página.
- `allybi-responsive.css` — global.

JS:
- `language-switcher.js`, `allybi-header.js` — globais.
- Bloco inline para o IntersectionObserver de reveal.

**Não há import** de:
- `pages/home.css`, `pages/pricing.css`, `pages/integrations.css`, `pages/security-overview.css`, `pages/how-it-works.css`, `pages/use-case-*.css`.
- `hero-sequence.js`, `assets/inside-flow.js`, `assets/pressure-section.js`.

## 9. Prova de não copy-paste

Verificado em `about.html` e `pages/about.css`:
- Nenhuma classe `hero-scene`, `hw-*`, `integ-*`, `sec-*`, `pricing-*`, `ucl-*`, `ucb-*`, `ucf-*`, `pricing-plan-*`.
- Não há `<svg>` de produto, source chip, badge "fonte", "Aguardando confirmação", "Revisão antes do envio", etc.
- Não há mockup de chat, app frame, ou screenshot.
- Não há tabela de recursos, ledger 2×2, comparação "Antes / Com Allybi".

## 10. Fonte dos dados da equipe

Pesquisa em todos os JSON/JS/TS do repositório por:
- `founder`, `cofounder`, `co-founder`, `team`, `leadership`, `founding`, `fundador`, `cofundador`, `equipe`.

**Resultado: zero registros completos** (nenhum arquivo possui nome + função + foto local + link verificado para qualquer pessoa). Nenhuma pessoa é renderizada.

## 11. Decisão entre equipe ou fallback

**FALLBACK** (§32). Conforme §28: "Se nenhum registro possuir todos os campos: renderizar o fallback definido neste prompt."

A seção `.about-team-fallback` foi renderizada com o copy exato:
- Eyebrow: `AGORA`
- H2: `Uma equipe no começo, construindo perto do problema.`
- Body 1: `Preferimos mostrar o que já existe a parecer maiores do que somos.`
- Body 2: `À medida que a equipe crescer, esta página cresce com ela.`

Não há foto, avatar, card, ou botão de carreira.

## 12. Fonte dos fatos institucionais

Pesquisa em todos os arquivos por `foundedYear`, `headquarters`, `workMode`, `sede`, `fundac`. **Zero ocorrências em arquivos de dados.**

## 13. Decisão sobre a faixa de fatos

**Faixa não renderizada.** Conforme §33: "Renderizar a faixa de fatos somente se os três campos existirem. Se apenas um ou dois existirem: não renderizar nenhum."

Nenhum bloco de fatos aparece na página.

## 14. Copy final

Exatamente como na spec. Eyebrow + H1 + sub + support no hero. 3 parágrafos + pull quote em "Nossa história". MISSÃO e VISÃO com os títulos e corpos da §14. 5 valores com títulos e corpos das §18–§22. 3 princípios com labels e corpos da §25. Fallback com copy da §32. CTA final com copy da §34.

## 15. Links finais

- `/how-it-works.html` (CTA encerramento primário).
- `https://app.allybi.com.br` (CTA encerramento secundário).
- Nenhum link para `app.allybi.com.brm.br`, `allybi.com.brm`, página de carreiras, newsroom, ou outros placeholders.
- Não há link de LinkedIn da equipe (não há equipe renderizada).

## 16–18. Screenshots

Capturas em `./qa-screenshots/about-redesign/` (1440px):
- `hero-1440.png` — hero institucional.
- `mission-vision-1440.png` — origem + início do split dark.
- `values-section.png` — Como trabalhamos + início do fallback de equipe.
- `close-1440.png` — encerramento com CTAs e footer.

Observação: capturas detalhadas em 360/390/430/1366/1920/2048 não foram executadas nesta sessão (limitação de viewport do harness). O CSS implementa explicitamente os breakpoints da spec para 768–1099 e ≥1100. A verificação fluida em DOM confirma estrutura responsiva correta.

## 19. Resultado das assertions

Executado via `document.querySelectorAll` no browser carregado:

| Asserção | Resultado |
|---|---|
| 1 H1 com 2 spans | ✓ (h1Count=1, h1Spans=2) |
| 7 seções principais | ✓ (hero, origin, direction, values, work, team-fallback, close) |
| 5 valores | ✓ (valuesCount=5) |
| 3 princípios | ✓ (principleCount=3) |
| Team fallback presente, grid de equipe ausente | ✓ |
| Facts strip ausente | ✓ |
| Nenhum mockup, tablist, sticky | ✓ |
| Nenhum "Koda" / "Ask" / "Allybi Pro" | ✓ |
| Nenhum "criptografados" / "isolados" / "zero-knowledge" | ✓ |
| Nenhum CTA no hero | ✓ (verificado: `.about-hero .about-close-primary` retorna null) |
| Section semântica em todas as seções | ✓ |

## 20. Resultado do grep

Termos pesquisados (§44 + §56):

| Termo | Ocorrências em copy |
|---|---|
| `Koda`, `Ask`, `Allybi Pro`, `Enviável`, `enviar com fonte`, `respostas com fonte que citam fontes`, `Cada resposta de IA cita sua fonte`, `Enviar via WhatsApp`, `WhatsApp conectado`, `pesquisar no WhatsApp`, `WhatsApp como fonte`, `respostas citando`, `citações de fonte`, `fundamentado`, `Sem upload`, `Manual Search`, `X-Ray`, `Cemitério`, `Índice`, `modo cadê`, `Google humano`, `app.allybi.com.brm.br`, `allybi.com.brm`, `book demo`, `agendar demo`, `coming soon`, `beta`, `—` (em-dash), `criptografados`, `isolados`, `100% seguro`, `zero-knowledge`, `role="tablist"`, `position: sticky`, `setInterval`, `autoplay`, `carousel`, `swiper`, `slick`, `text-overflow`, `ellipsis`, `blue`, `purple`, `gradient` | **0** |

Limpeza completa.

## 21–24. Build/lint/test

Projeto não possui build pipeline ou test runner. Verificação manual via browser.

## 25. Broken-link check

Verificado manualmente: ambos os hrefs do encerramento (`/how-it-works.html` e `https://app.allybi.com.br`) são válidos. Todos os links de header/footer preservados são os mesmos das outras páginas.

## 26. Overflow check

`document.documentElement.scrollWidth === window.innerWidth` em 1440px (verificado). Não há overflow horizontal.

## 27. Reduced motion

`@media (prefers-reduced-motion: reduce)` força todas as transições/animações para 0.001ms e revela todos os `.about-reveal` imediatamente. Bloco no CSS final do arquivo.

## 28. Diferenças desktop ↔ mobile

| Seção | Desktop ≥1100 | Mobile <768 |
|---|---|---|
| Hero | H1 com `white-space: nowrap` por linha, dois spans em duas linhas grandes (clamp 70–94px). | H1 com `white-space: normal`, fonte clamp 42–49px, quebra natural. |
| Origin | Grid 2-col com pull quote separado por **border-left vertical**. | Single column; pull quote separado por **border-top horizontal**. |
| Direction | Grid 2-col com `padding-left: 64px` + `border-left` em Vision. | Single column; Vision separado por `border-top`. |
| Values | Grid 3-col por linha (72px / 390px / 1fr). | Single column dentro de cada row, divisores horizontais. |
| Work | Grid 3-col com divisores verticais. | Single column com divisores horizontais. |
| Team fallback | 2-col com border-left. | Single column com border-top. |
| Close | Flex H + actions inline. | Grid vertical com actions empilhadas full-width. |

## 29. Confirmação: nenhuma pessoa inventada

Verificado: a página renderiza o FALLBACK institucional (§32), sem nomes, fotos, avatares, iniciais, bios, ou cargos.

## 30. Confirmação: nenhum fato inventado

Verificado: não há `foundedYear`, `headquarters`, `workMode`, nem outros números/datas. A faixa de fatos não foi renderizada.

## 31. Confirmação: nenhuma claim técnica não verificada

Verificado: nenhuma menção a criptografia, isolamento, certificação, compliance, parceiros, ou auditoria. A única afirmação técnica é "Documentos, perguntas e respostas não treinam modelos" (valor 04), que corresponde ao que outras páginas do site já afirmam.

## 32. Problemas restantes

- Screenshots em viewports 360/390/430/1366/1920/2048 não foram executados nesta sessão. CSS implementa explicitamente esses breakpoints conforme spec, mas validação visual final nesses tamanhos é recomendada.
- A página perdeu os `data-i18n-key` específicos do conteúdo institucional (mantidos apenas em header/footer/CTAs globais). Se a página precisar de PT/EN/ES via JSON, será necessário adicionar `data-i18n-key` em cada texto novo e criar as entradas em `translations/*.json`.
