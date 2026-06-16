# Relatório de auditoria — /how-it-works.html

**Data:** 2026-06-16
**Branch base:** `how-it-works-refactor` (forked from `homepage-refactor`)
**Escopo:** `/how-it-works.html` em PT e EN, 8 breakpoints (360 → 1920), full-page + above-fold + mobile menu.
**Ferramentas:** Playwright 1.61 (Chromium), `audit-hiw.mjs`.
**Screenshots:** `/qa-screenshots/how-it-works-before/` (37 capturas + report.json).

## Resumo de uma frase

A página atual tem estrutura conceitual razoável (hero → 6 panels storyboard → depth section → CTA final), mas **80% do conteúdo é invisível pra crawlers, screenshots e usuários com JS lento** porque a classe `.hiw-reveal` (`opacity:0` por default) não tem trigger JS. Plus o hero não cumpre o brief (sem mockup à direita).

## Achados quantitativos

| Item | 360 | 390 | 430 | 768 | 1024 | 1366 | 1440 | 1920 |
|------|-----|-----|-----|-----|------|------|------|------|
| Horizontal overflow | ❌ não | ❌ não | ❌ não | ❌ não | ❌ não | ❌ não | ❌ não | ❌ não |
| Console errors | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Failed requests | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| PT leaks no render EN | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |

Métricas automáticas estão limpas. **O problema real é estrutural — vide próxima seção.**

## Bug crítico 1: reveal-on-scroll quebrado

`pages/how-it-works.css` linhas 7–9:

```css
.hiw-reveal { opacity:0; transform:translateY(12px); ... }
.hiw-reveal.is-visible { opacity:1; transform:translateY(0); }
@media(prefers-reduced-motion:reduce){ .hiw-reveal{ opacity:1; ... } }
```

Não existe JS que adicione a classe `.is-visible` a `.hiw-reveal` — o handler global em `allybi-animations.js` só observa `.allybi-reveal` (sem prefixo). Resultado:

- Tudo abaixo do hero (header da story section, 6 panels, depth, CTA final) fica **opacity:0 sempre**.
- Usuários com `prefers-reduced-motion: reduce` veem a página inteira por causa da regra `@media`.
- Crawlers, screenshot tools, JS desabilitado: veem **só o hero**.

Confirmado nos screenshots: 1440_pt_full.png e 360_pt_full.png mostram uma faixa branca gigante onde deveriam estar 6 panels + depth section.

## Bug crítico 2: hero não cumpre o brief

Brief item 6 pede:
- 2 colunas (texto à esquerda, mockup funcional à direita).
- Hero mockup com fonte conectada + pergunta + resposta com fonte + versão confirmada + revisão + Enviar via Outlook.
- Trust chips: Resposta com fonte / E-mail via Outlook / WhatsApp handoff / Documentos não treinam modelos.

Estado atual:
- Layout **centralizado, sem mockup**. Hero é só texto + CTAs + 3 trust chips inline.
- Trust chips presentes: "Respostas com fonte / Nada enviado sem confirmação / WhatsApp sem caixa sincronizada" — bom mas falta "Documentos não treinam modelos".
- Falta mockup com versões coloridas, painel de revisão, botão Enviar via Outlook.

## Avaliação por seção (assumindo reveals funcionando)

### Hero ⚠️
- H1 atual: "Pergunte, confirme e envie sem abrir tudo de novo." — **alinhado** com brief.
- Sub atual: "Conecte fontes, suba arquivos e pergunte no chat. O Allybi responde com fonte, monta a mensagem e envia e-mails via Outlook depois da sua confirmação. WhatsApp abre como handoff." — **alinhado**, mas o brief sugere versão mais enxuta.
- CTA primário "Começar grátis por 30 dias" ✓
- CTA secundário "Ver integrações" ✓
- Microcopy "30 dias grátis. Depois R$170/mês. Cancele quando quiser." ✓
- **Sem mockup** — falta a prova visual (item 6 do brief).

### Storyboard (6 panels) ⚠️
- Atual tem 6 panels com h3 + p + visual mock. Em alternância (normal / reverse). Match estrutural com o brief item 4.
- Copy dos panels já alinhado com brief depois da sessão anterior de tradução.
- Visuais: mocks de arquivos OK, mas o brief pede semáforo correto no painel "Compare e confirme" (vermelho/verde para alteração) e o painel "Prepare o envio" precisa mostrar review explícito com Outlook send.
- **Bug reveal**: tudo invisível na renderização estática.

### Depth section ⚠️
- 3 zonas: "Entram", "Allybi", "Saem".
- Conteúdo OK, mas **invisível por reveal bug**.
- Mobile: layout precisa virar vertical (hoje provavelmente segue layout 3 colunas comprimido).

### CTA final ⚠️
- "Faça o primeiro fluxo completo em minutos." ✓
- Sub OK.
- CTAs OK.
- **Invisível por reveal bug**.

### Footer ✅
- Footer global compartilhado.

## Comparação com brief detalhado

| Brief item | Estado atual | Delta |
|---|---|---|
| 4. Hero copy | H1 ✓, sub ✓, CTAs ✓, microcopy ✓ | Trust chips faltam "Documentos não treinam modelos"; falta mockup visual |
| 4. Etapa 01 | "Conecte ou suba" + chips de fonte + 3 arquivos | Copy alinhado; brief pede status "3 arquivos encontrados no OneDrive" — provavelmente já tem |
| 4. Etapa 02 | "Pergunte no chat" + query + 4 chips de ação | Brief pede "Comparar versões / Encontrar fonte / Preparar revisão / Abrir handoff" — atual usa "Preparar e-mail / Preparar WhatsApp" — **PRECISA AJUSTE** (o brief explicitamente proíbe "Preparar WhatsApp") |
| 4. Etapa 03 | "Receba com fonte" + arquivo + fonte path | OK; cor verde precisa ser garantida |
| 4. Etapa 04 | "Compare e confirme" + clausula 8.1 vermelho/amarelo | Precisa garantir: removido vermelho + novo verde, status "Alteração confirmada na fonte" |
| 4. Etapa 05 | "Prepare o envio" + chips Outlook/WhatsApp + mensagem | Brief pede painel completo: Mensagem, Arquivo, Fonte, Canal, microcopy WhatsApp como handoff |
| 4. Etapa 06 | "Revise e envie" + campos + botões | OK, garantir botões "Cancelar / Enviar via Outlook" |
| 4. Por baixo | "Por fora, uma pergunta. Por baixo, o fluxo inteiro." | Brief sugere "Uma pergunta no chat. Um fluxo completo por trás." Reescrita pequena. |
| 4. Por baixo mobile | desktop 3 colunas → mobile vertical sequência | precisa verificar layout mobile |
| 4. Ponte para diagnóstico | **NÃO EXISTE** | Adicionar nova seção antes do CTA final: "Quer ver onde seu fluxo trava hoje?" + CTAs pra tempo.html e diagnostico.html |
| 4. CTA final | "Faça o primeiro fluxo completo em minutos." | ✓ |

## Termos banidos (grep prévio)

```
$ grep -E "Preparar WhatsApp|Prepare WhatsApp|book demo|Enviável|Koda|fundamentado" how-it-works.html
how-it-works.html:174:            <span class="hiw-chip hiw-chip--action" data-i18n-key="hiw.panel2_chip4">Preparar WhatsApp</span>
```

**1 termo banido encontrado**: `Preparar WhatsApp` no panel 2. Brief explícito sobre não usar essa frase (item 4 etapa 02).

## Anti-padrões

1. **Hero text-only sem mockup** — viola brief item 6 ("texto à esquerda, mockup funcional à direita").
2. **`.hiw-reveal` órfão** — define visual hidden mas sem JS trigger funcional. Bug que afeta SEO, social cards, snapshot tools.
3. **Etapa 02 chip "Preparar WhatsApp"** — termo banido.
4. **Sem ponte para diagnóstico** — não há loop pra `tempo.html` e `diagnostico.html` nesta página (que conceitualmente deveria empurrar pro funil).
5. **Trust chips do hero faltam 1** — "Documentos não treinam modelos" não está nos 3 chips atuais.

## O que está bom

- Estrutura conceitual (hero → 6 panels storyboard → depth → CTA) alinhada com brief.
- Copy dos panels já bem alinhado depois da sessão de tradução prévia.
- Header e footer globais consistentes com o resto do site.
- Reduced-motion media query já implementada nos cards.
- Sem horizontal overflow em nenhum breakpoint.
- Sem console errors.

## Conclusão

Página atual está em **45-55% de alinhamento** com o brief. Não é por copy ruim — é principalmente:
1. **Bug de reveal que oculta 80% da página** (consequência: SEO ruim, social cards ruins, screenshot tools veem só hero).
2. **Hero sem mockup visual** (consequência: a página não cumpre seu papel de DEMONSTRAÇÃO).
3. **Sem ponte para diagnóstico** (consequência: perde loop de growth).
4. **1 termo banido** ("Preparar WhatsApp").
5. Mockups dos panels precisam refinamento semântico (cores verde/amarelo/vermelho).

**Recomendação:** refatoração focada, não rebuild. Mantém estrutura, voz, e i18n. Acrescenta:
- Hero mockup completo (reaproveitar `hero-scene` da homepage).
- Fix do reveal (apply `.allybi-reveal` consistente OU adicionar handler pra `.hiw-reveal`).
- Refinar mockups dos 6 panels (semáforo + animação causal sutil).
- Trocar "Preparar WhatsApp" → "Abrir handoff".
- Adicionar 4º trust chip.
- Adicionar ponte para diagnóstico.
- Animações causais (3 panels-chave: 02 → 03 → 06).
- prefers-reduced-motion global na homepage também (pedido do usuário).

**Estimativa:** ~40-50% do esforço de um rebuild from scratch.
