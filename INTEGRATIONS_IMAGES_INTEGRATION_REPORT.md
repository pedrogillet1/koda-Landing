# Integrations page — Screenshot Integration Report

Page touched: `/integrations.html`. No other pages or the webapp were modified.

## 1. Files changed

| File | Type | Change |
| --- | --- | --- |
| `integrations.html` | edit | (a) Added two `<link rel="preload">` for the 01-map hero (responsive media). (b) Replaced the hero `<div class="integrations-role-map-wrap">` HTML map mockup with a single `<picture class="integration-product-shot integration-product-shot--hero">` rendering 01-map. (c) Updated hero copy: H1 to "Conecte as fontes / onde o trabalho já acontece." (two spans), subtitle to the spec wording, secondary CTA href to `#papel-das-conexoes`. (d) Renamed the connection-roles section id to `papel-das-conexoes`, updated eyebrow → "PAPEL DAS FONTES", H2 → "Cada fonte entra com um papel claro.", subtitle to spec. (e) Replaced each of the 4 desktop `<div class="connection-explorer-state">` rich-content blocks with a single `<picture class="integration-product-shot connection-explorer-shot">` (02-outlook, 03-onedrive, 04-sharepoint, 05-uploads). (f) Replaced the mobile accordion (`.connection-explorer-acc-item × 4`) with 4 `<article class="connection-explorer-m-story">` blocks, each carrying number + title + role + a mobile `<picture>`. (g) Replaced the Outlook + WhatsApp two-card mockup (`actions-card--outlook` + `actions-card--whatsapp`) with a single `<picture class="integration-product-shot integration-product-shot--channels">` rendering 06-channels, inside `<section id="depois-da-revisao" class="actions-section actions-section--channels integrations-product-images">`. |
| `pages/integrations.css` | edit | Appended a "2026-06-29 SCREENSHOT INTEGRATION" block at the end of the file containing all picture-based layout rules: `.integration-product-shot` base, `.integrations-hero-shot`, `.connection-explorer-shot`, `.connection-explorer-m-story/-num/-title/-role/-shot`, `.actions-channels-shot`, `.integration-product-shot--channels`, plus desktop / tablet / mobile breakpoints per spec §11–§13, §16–§21, §23–§25, and a scoped `prefers-reduced-motion` block per §34. Rules are placed last so they win on source-order against the now-orphaned legacy `.integrations-map-*`, rich `.connection-explorer-state` content, `.actions-dual-*`, `.actions-handoff-*` rules earlier in the file. |
| `assets/landing-shots/integrations/` | new dir | The 12 product PNGs copied verbatim from the webapp source. Contact sheets and `capture-results.json` deliberately not copied. |

## 2. Assets copied (§3, §4)

Source root: `/Users/alvarocamasmie/Downloads/koda-webapp/artifacts/landing-shots/integrations/`
Public root: `/assets/landing-shots/integrations/`

SHA-256 hashes verified identical for all 12 files (source → destination), no bytes were modified. Contact sheets and capture-results.json intentionally NOT copied to the public directory.

12 PNGs at `/assets/landing-shots/integrations/`:
- 01-map-desktop.png / 01-map-mobile.png — hero (eager + preload)
- 02-outlook-desktop.png / 02-outlook-mobile.png — papel das conexões, Outlook state
- 03-onedrive-desktop.png / 03-onedrive-mobile.png — OneDrive state
- 04-sharepoint-desktop.png / 04-sharepoint-mobile.png — SharePoint state
- 05-uploads-desktop.png / 05-uploads-mobile.png — Uploads state
- 06-channels-desktop.png / 06-channels-mobile.png — Depois da revisão

All `curl http://localhost:8080/assets/landing-shots/integrations/*.png` → HTTP 200.

## 3. Removed visuals

Replaced (no longer rendered, but classes still live in the legacy CSS — see §1):
- HTML map mockup: `.integrations-role-map-wrap`, `.integrations-role-map`, `.integrations-map-topbar`, `.integrations-map-title`, `.integrations-map-status`, `.integrations-map-body`, `.integrations-map-heading`, `.integrations-map-sources`, `.integrations-map-source`, `.integrations-map-source-text/-name/-desc/-dot`, `.integrations-map-uploadicon`, `.integrations-map-connector`, `.integrations-map-line`, `.integrations-map-arrow`, `.integrations-map-hub` + nested hub/gate, `.integrations-map-actions`, `.integrations-map-action` + nested.
- Connection-explorer rich state-content: `.connection-explorer-copy`, `.connection-explorer-state-eyebrow/-title/-lead`, `.connection-explorer-groups`, `.connection-explorer-group/-label/-items`, `.connection-explorer-limit`, `.connection-explorer-visual` and modifiers, `.connection-explorer-visual-topbar/-role/-heading`, `.connection-explorer-scope-rows/-row/-check`, `.connection-explorer-content-row/-name/-type`, `.connection-explorer-visual-status`, `.connection-explorer-tree/-tree-row/-tree-icon`, `.connection-explorer-hierarchy/-hier-row/-hier-label/-hier-value`, `.connection-explorer-drop/-drop-icon/-drop-title/-drop-sub`, `.connection-explorer-formats/-format`.
- Mobile accordion: `.connection-explorer-acc-item`, `.connection-explorer-acc-trigger`, `.connection-explorer-acc-text/-name/-role/-icon`, `.connection-explorer-acc-panel/-lead/-label/-value/-limit`, `.connection-explorer-acc-uploadicon`.
- Two-card Outlook + WhatsApp section: `.actions-cards`, `.actions-card`, `.actions-card--outlook/--whatsapp`, `.actions-card-top/-eyebrow/-title/-body/-footer`, `.actions-card-eyebrow--dark`, `.actions-card-title--dark`, `.actions-card-body--dark`, `.actions-dual-role/-panel/-eyebrow/-title/-body/-gate/-gate-line/-gate-marker/-gate-label`, `.actions-handoff-boundary/-block/-arrow/-arrow-line/-arrow-head/-lists/-list/-list-heading/-list-item`.

The `.connection-explorer-tab` selector and its tab-indicator / tab-text rules remain — they are still used by the new layout. The existing `assets/integrations-page.js` tab controller (Outlook / OneDrive / SharePoint / Uploads ↔ `data-state="0..3"`) continues to drive the new picture-based stages with no JS change required. Keyboard (Arrow / Home / End / Enter / Space) support per §35 is unchanged.

## 4. Mapping (hero / roles / channels)

| Section | Article / state | Desktop PNG | Mobile PNG | Alt |
| --- | --- | --- | --- | --- |
| Hero | n/a (single picture) | 01-map-desktop.png | 01-map-mobile.png | Mapa do Allybi mostrando Outlook, OneDrive, SharePoint e uploads como fontes, e Outlook e WhatsApp handoff depois da revisão. |
| Papel das fontes | state 0 / mobile #01 (Outlook) | 02-outlook-desktop.png | 02-outlook-mobile.png | Detalhe do Allybi mostrando Outlook como fonte de e-mails, anexos e canal de envio depois da confirmação. |
| Papel das fontes | state 1 / mobile #02 (OneDrive) | 03-onedrive-desktop.png | 03-onedrive-mobile.png | Detalhe do Allybi mostrando OneDrive como fonte de arquivos e pastas com origem preservada. |
| Papel das fontes | state 2 / mobile #03 (SharePoint) | 04-sharepoint-desktop.png | 04-sharepoint-mobile.png | Detalhe do Allybi mostrando SharePoint como fonte com site, biblioteca, pasta e arquivo de origem. |
| Papel das fontes | state 3 / mobile #04 (Uploads) | 05-uploads-desktop.png | 05-uploads-mobile.png | Detalhe do Allybi mostrando uploads como fonte direta sem conexão externa. |
| Depois da revisão | n/a | 06-channels-desktop.png | 06-channels-mobile.png | Tela do Allybi explicando que Outlook pode enviar e-mail depois da confirmação e WhatsApp funciona apenas como handoff. |

## 5. Breakpoint behaviour

| Breakpoint | Hero | Papel das conexões | Depois da revisão |
| --- | --- | --- | --- |
| ≤767 mobile | single column, picture cap 350px (mobile PNG) | mobile articles (no selector, no accordion); picture cap 350px per article (mobile PNG) | single column, picture cap 350px (mobile PNG) |
| 768–1099 tablet | single column, picture cap 720px (desktop PNG) | selector horizontal 4-col + stage below, picture cap 760px (desktop PNG) | single column, picture cap 760px (desktop PNG) |
| 1100–1399 desktop | 2-col grid, picture cap 560px (desktop PNG) | 240px selector left / 1fr stage right, picture cap 940px (desktop PNG) | single column, picture cap 940px (desktop PNG), dark background |
| ≥1400 desktop | same as 1100–1399 but picture cap 620px | same | same |

`<picture>` element media query (`<source media="(max-width: 767px)">`) is what picks the file. The browser will only download one of the two URLs based on the viewport, satisfying §28 "não carregar desktop e mobile simultaneamente".

## 6. Performance

- Hero `<img>`: `loading="eager" fetchpriority="high" decoding="async"`.
- All other `<img>`s: `loading="lazy" decoding="async"`.
- `<link rel="preload" as="image" media="(min-width: 768px)">` for 01-map-desktop.png + matching mobile preload — only the matching one is fetched per §14.

## 7. Audit grep (§37, §38, §43, §45) — all clean

Executed against the live `http://localhost:8080/integrations.html` response:

| Probe | Result |
| --- | --- |
| `"WhatsApp conectado"` | 0 hits |
| `"pesquisar no WhatsApp"` | 0 hits |
| `"WhatsApp como fonte"` | 0 hits |
| `"envio via WhatsApp"` | 0 hits |
| `"Enviar via WhatsApp"` | 0 hits |
| `"Usar no Ask"` | 0 hits |
| `"app.allybi.com.brm.br"` | 0 hits |
| `"allybi.com.brm"` | 0 hits |
| `"Koda"` | 0 hits |
| `"ATIVO"` | 0 hits |
| `/Users/` or `koda-webapp` in runtime | 0 hits |
| `contact-sheet` or `capture-results` in runtime | 0 hits |
| `01-map` paths in served HTML | 4 hits (1 desktop src + 1 mobile srcset in the hero picture + 2 preload links) |
| `02-outlook` / `03-onedrive` / `04-sharepoint` / `05-uploads` paths | 4 hits each (1 desktop selector state + 1 mobile article = 2 pictures × 2 paths) |
| `06-channels` paths | 2 hits (single picture in actions section) |

## 8. Acceptance vs §48

| # | Criterion | Status |
| --- | --- | --- |
| 1 | 12 PNGs in landing | ✓ `ls assets/landing-shots/integrations/` → 12 files |
| 2 | No absolute path in runtime | ✓ grep result 0 |
| 3 | Hero uses 01-map | ✓ |
| 4 | Outlook uses 02-outlook | ✓ |
| 5 | OneDrive uses 03-onedrive | ✓ |
| 6 | SharePoint uses 04-sharepoint | ✓ |
| 7 | Uploads uses 05-uploads | ✓ |
| 8 | Canais uses 06-channels | ✓ |
| 9 | Desktop uses PNG desktop | ✓ via `<source media="(max-width: 767px)">` swap |
| 10 | Tablet uses PNG desktop | ✓ same media rule (≥768 selects desktop) |
| 11 | Mobile uses PNG mobile | ✓ `<source media="(max-width: 767px)">` |
| 12 | Nenhuma imagem cortada | ✓ wrappers have `overflow: visible`, no `object-fit: cover`, no max-height |
| 13 | Corner radius não cortado | ✓ wrappers don't clip; radius is part of PNG |
| 14 | Sombra não cortada | ✓ wrappers don't clip |
| 15 | Sem card extra ao redor | ✓ `.integration-product-shot` has no background/border/padding |
| 16 | Sem background-image | ✓ |
| 17 | Sem object-fit cover | ✓ uses `object-fit: contain` |
| 18 | Sem transform scale | ✓ |
| 19 | WhatsApp nunca como fonte | ✓ grep clean |
| 20 | Outlook = fonte e canal | ✓ tab role label preserved |
| 21 | OneDrive somente fonte | ✓ |
| 22 | SharePoint somente fonte | ✓ |
| 23 | Uploads fonte direta | ✓ |
| 24 | Sem "Enviar via WhatsApp" | ✓ grep clean |
| 25 | Sem "WhatsApp conectado" | ✓ |
| 26 | Sem badge roxo | ✓ |
| 27 | Mobile não usa desktop comprimido | ✓ `<source media="(max-width: 767px)">` swap |
| 28 | Mobile não overflow | wrappers cap at `min(100%, 350px)`; not measured at all 12 viewports but no horizontal overflow rules |
| 29 | Selector desktop por teclado | ✓ existing JS already provides Enter / Space / Arrow / Home / End |
| 30 | No-JS funciona | ✓ default state 0 has `is-active` in markup; mobile articles render without JS; hero/channels are pure markup |
| 31 | Reduced motion funciona | ✓ existing `#integrations-page *` rule plus new `.integrations-product-images *` rule both collapse transitions |
| 32 | Nenhuma outra página alterada | ✓ |
| 33 | Webapp não alterado | ✓ |
| 34 | Relatório entregue | ✓ this file |

## 8.b Recompliance pass (2026-06-30) — "no extra frame" + new screenshots

The webapp regenerated all 12 PNGs (with `noGreyBoxPassed: true` + `noInternalNavPassed: true` in `capture-results.json`) and the user spec for the integrations page was re-issued with stricter §8 / §9 / §47 anti-frame rules and a cache-bust requirement (`?v=integrations-rebuild-2`). Actions taken:

1. **Re-copied the 12 PNGs** from `/Users/alvarocamasmie/Downloads/koda-webapp/artifacts/landing-shots/integrations/` over the existing `/assets/landing-shots/integrations/`. SHA-256 verified identical source → destination for all 12.
2. **Cache-bust added to every PNG URL** in `integrations.html` via `sed -i ''` substitution. 22 picture / preload URLs now end in `?v=integrations-rebuild-2`. Re-grep on the served HTML: 22 cache-bust occurrences, 0 unbusted URLs.
3. **CSS strengthened** (`pages/integrations.css` override block):
   - `.integration-product-shot` + `.integration-product-shot img` — added explicit `background: transparent !important; border: 0 !important; box-shadow: none !important; border-radius: 0 !important; padding: 0 !important; overflow: visible !important; filter: none !important; transform: none !important` per spec §8.
   - Grouped reset rule on `.integrations-hero-shot, .actions-channels-shot, .integrations-product-images .connection-explorer-panel, .integrations-product-images .connection-explorer-state` — same `!important` chrome strip per spec §9 / §18 / §22 / §25.
   - Hero desktop grid updated to spec §13: `grid-template-columns: minmax(0, 0.82fr) minmax(620px, 1fr); gap: 56px`. H1 to `clamp(56px, 4.6vw, 74px)`. Hero image cap bumped to `min(100%, 700px)` (≥1400) and `min(100%, 620px)` (1100–1399).
   - Channels image cap stays at `min(100%, 940px)` on desktop (already matched spec §25) — the wrapper no longer has any background / border / shadow / radius / padding.
4. **Grep audit on served HTML** (post-change):
   - 22 `?v=integrations-rebuild-2` occurrences ✓
   - 0 unbusted asset URLs ✓
   - 0 `/Users/` or `koda-webapp` leaks ✓
   - 0 `contact-sheet` / `capture-results` references ✓
   - 0 `integration-shot-frame` / `integration-image-frame` / `integration-visual-frame` / `screenshot-card` / `mockup-card` classes ✓
   - 0 hits for any forbidden copy (`WhatsApp conectado`, `Enviar via WhatsApp`, `WhatsApp como fonte`, `envio via WhatsApp`, `pesquisar no WhatsApp`, `Usar no Ask`, `Koda`, `ATIVO`, etc.) ✓
   - All 6 asset name stems present in the served HTML ✓
5. **No JS changes required** — existing `assets/integrations-page.js` continues to drive the `.connection-explorer-state` `.is-active` toggle.
6. **No other pages or webapp touched.**

## 9. Outstanding

- The dead `.integrations-map-*`, `.connection-explorer-state` rich-content, `.connection-explorer-acc-*` and `.actions-card/-dual/-handoff-*` rules remain in `pages/integrations.css` (no longer referenced by any HTML). A follow-up sweep could delete those ~700 lines for byte savings. The functional/visual integration is unaffected because the new picture-based rules override them on source-order.
- Playwright assertion suites for §31–§45 were not added in this pass — page-level verification was done via `curl` for HTTP 200 + presence of asset URLs and absence of forbidden copy. Full multi-breakpoint Playwright coverage is outside this single edit.
- The legacy `INTEGRATIONS_IMAGES_PRE_AUDIT.md` and `INTEGRATIONS_ASSET_MANIFEST.md` were not produced as standalone artifacts; their data is summarised in §1–§4 above.
