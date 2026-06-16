# Relatório de auditoria — homepage Allybi (estado atual)

**Data:** 2026-06-16
**Escopo:** `/index.html` em PT e EN, 8 breakpoints (360 → 1920), full-page + above-fold.
**Ferramentas:** Playwright 1.61 (Chromium), script `audit-homepage.mjs` + `audit-sections.mjs`.
**Screenshots:** `/qa-screenshots/before/` (16 viewports × 2 idiomas + 18 seções).

## Achados quantitativos

| Item | 360 | 390 | 430 | 768 | 1024 | 1366 | 1440 | 1920 |
|------|-----|-----|-----|-----|------|------|------|------|
| Horizontal overflow | ❌ não | ❌ não | ❌ não | ❌ não | ❌ não | ❌ não | ❌ não | ❌ não |
| Console errors | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Failed requests | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| PT leaks no render EN | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |

**O único PT leak:** `<span class="s-workflow__flow-micro">Fonte: Clientes / Contratos / 14 mar</span>` no fluxo do produto — falta `data-i18n-key`. Trivial de corrigir.

## Avaliação por seção

A homepage atual está muito mais próxima do brief do que esperávamos. Quase tudo de estratégia, voz e estrutura já está alinhado. Os deltas são pontuais — refinamento, não rebuild.

### Header ✅
- Logo, Produto, Casos de uso, Ferramentas, Preços, Sobre, Entrar, Começar grátis. Match com brief item 7.1.
- Menu mobile presente e capturado em 360/390/430/768.

### Hero ⚠️ (refinamento)
- ✅ H1 "Um chat para encontrar, confirmar e enviar o documento certo." — alinhado.
- ✅ Subtitle alinhado, sem travessão, descreve o caminho.
- ✅ CTA primário "Começar grátis por 30 dias" + CTA secundário "Ver como funciona".
- ✅ Microcopy de preço e trust chips presentes.
- ⚠️ **Mockup do hero**: mostra fontes + pergunta + 1 resposta + 1 fonte. **Não mostra** versões coloridas (amarelo/verde), painel de revisão, botão "Enviar via Outlook". Brief item 7.2 pede o fluxo completo no mockup.
- ⚠️ **H1 desktop quebra** em 4 linhas em 1366/1440 — fica "Um chat para / encontrar, / confirmar e enviar o / documento certo." Estética ruim.
- ⚠️ Eyebrow "CHAT COM FONTE PARA DOCUMENTOS, E-MAILS E ENVIOS" quebra em 2 linhas no mobile. Encolher.

### Dor "Achar não basta" ✅⚠️
- ✅ Title e subtitle exatos do brief.
- ✅ Card 1 "Espalhado" + visual de chips. Match.
- ✅ Card 2 "Parecido" com 3 versões.
- ⚠️ **Estado verde faltando**: brief pede `contrato_final_AGORA.pdf` em **verde** ("fonte confirmada"). Hoje está em **amarelo** ("versão?"). Inverte o semáforo do brief.
- ❓ Card 3 "Antes de sair" não foi visualizado completo — possível confirmar via HTML.

### Workflow "Do pedido ao envio" ✅
- ✅ Background preto. Title sem travessão. Cards verticais limpos.
- ✅ "Resposta com fonte" em verde, "Revisão" usando ponto médio `·`.
- ⚠️ Card "Pergunta no chat / linguagem normal" — subtítulo "linguagem normal" sozinho fica críptico. Reescrever.
- ⚠️ Não vi o card "Envio" no scroll capturado — verificar se existe.

### Casos de uso ✅⚠️
- ✅ Title "Momentos em que ninguém quer adivinhar." e subtitle exatos do brief.
- ✅ Cards Jurídico/Financeiro/Operações com pergunta, copy e CTA "Veja para X →".
- ❌ **Travessão no nome de arquivo**: `Contrato_Anderson_v4.pdf — p. 8` usa `—`. Brief item 7.7 pede ponto médio: `Contrato_Anderson_v4.pdf · p. 8`. Mesmo problema provável nos cards Financeiro e Operações.

### Integrações ⚠️
- ✅ Title "Suas fontes e seus envios no mesmo fluxo." alinhado.
- ✅ Cards Outlook/OneDrive/SharePoint/Uploads com badge "ATIVO".
- ❌ **Falta separador "Depois da revisão"** + cards de saída (Email via Outlook + WhatsApp handoff). Brief item 7.6 é explícito sobre essa divisão.
- ❓ Gmail e Google Drive ainda aparecem na homepage? Brief recomenda mover só pra página Integrações.

### Segurança ⚠️
- ✅ Title "Privado por arquitetura. Controlado por você." — forte.
- ✅ Subtitle alinhado.
- ⚠️ **Só 4 pilares visíveis** (Sem treinamento, Criptografia, Permissões de integração, Workspaces isolados). Brief item 7.8 pede 6: faltam "Fonte visível", "Confirmação antes do envio", "WhatsApp sem caixa sincronizada".

### Pricing teaser ❌
- **Não existe.** Brief item 7.9 pede uma seção dedicada (R$170/mês, lista do que está incluído, CTA "Começar grátis por 30 dias").

### Ferramentas (Diagnósticos) ⚠️📍
- ✅ Title "Antes de testar, meça o que está custando tempo." — bom.
- ✅ Cards Calculadora + Diagnóstico com CTAs alinhados.
- ❌ **Posição errada**: hoje está na seção 7/9 (penúltima). Brief item 7.4 quer **logo depois da dor ou do workflow** — growth loop só funciona cedo.
- ❌ **Falta microcopy**: "Resultado na hora. Sem cadastro para ver o resultado."
- ❌ **Falta visual**: cards "vazios" no centro. Brief pede mini gráfico (Procurar/Confirmar/Achar fonte/Preparar envio) ou mapa (Pedido → Busca → Versão → Fonte → Confirmação → Envio).

### FAQ ⚠️
- ✅ 6 perguntas alinhadas + accordion.
- ❌ **Faltam 2 perguntas**: "Meus documentos treinam modelos?" e "Quais fontes posso conectar?". Brief item 7.10 pede 8.

### CTA final ⚠️
- ✅ Title "Conecte. Pergunte. Envie com confirmação." — forte.
- ✅ CTA primário "Começar grátis por 30 dias".
- ⚠️ CTA secundário "Falar com vendas". Brief item 7.11 sugere "Calcular tempo perdido" como secundário (cria loop com Diagnósticos). Decisão estratégica.

### Footer ✅
- Estrutura coerente. Não auditado em detalhe.

## Termos banidos detectados (PT)

Grep rápido do HTML do `index.html`:

- ❌ `book demo` em metadata Open Graph (verificar)
- ❌ `—` (travessão) em vários nomes de arquivos mockados → trocar por `·`
- ✅ Nenhum dos termos críticos (Koda, Ask, Enviável, fundamentado, Manual Search, X-Ray, etc) visível na renderização.

(Grep completo será feito na fase de QA do plano.)

## Anti-padrões identificados

- Chips soltos no card "Espalhado" sem narrativa direta. Funcionam mas poderiam ser mais explícitos.
- Tools (Diagnósticos) com cards visualmente "vazios" no centro — só copy + CTA. Brief explícito sobre não usar "cards com ícone grande e vazio".
- Animação atual: cards aparecem com `opacity:0 → 1 + translateY`. Não causal (não conta a história). Brief pede animação que explica mudança (pergunta vira resposta, versão incerta vira confirmada).

## O que está REALMENTE bom

- Voz PT-BR humana, direta, sem hype. Sem travessão em copy.
- Cores semânticas usadas com intenção (verde para fonte confirmada, amarelo para incerteza).
- Mobile não é "desktop comprimido" — cada seção tem layout próprio mobile.
- Sticky CTA mobile no bottom — boa decisão.
- Sem horizontal overflow, sem console errors, sem links quebrados.
- I18n PT/EN funciona (após sessão anterior).

## Conclusão e recomendação

A homepage atual está em **80–85% de alinhamento** com o brief. Não é um caso de "tudo errado, rebuild from scratch". É um caso de "refinamento estratégico com 1 mudança estrutural (mover Tools pra cima) + 1 seção nova (Pricing teaser) + N ajustes de copy/visual/mockup".

**Mudar de abordagem**: ao invés de rebuild from scratch, recomendo **refatoração focada** em 6 frentes:

1. **Hero mockup expandido** (versões coloridas + painel de revisão + botão Enviar via Outlook)
2. **Reordenação**: Tools depois de Pain (growth loop cedo)
3. **Nova seção Pricing teaser**
4. **Refinamentos cirúrgicos** em Pain (cor verde), Use Cases (ponto médio), Integrations (cards de saída), Security (+3 pilares), Tools (microcopy + visual), FAQ (+2 perguntas).
5. **Animação causal**: substituir reveals genéricos por animações que explicam mudança.
6. **QA visual**: re-rodar Playwright em 8 breakpoints depois das mudanças.

Manter: estrutura HTML/CSS atual, sistema de i18n, voz da copy, semáforo de cores.

**Estimativa**: 6 frentes vs. rebuild completo do zero. ~40-50% do esforço, com risco muito menor de quebrar o que já está bom.
