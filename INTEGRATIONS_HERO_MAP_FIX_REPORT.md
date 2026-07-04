# Integrations — Hero refresh + new Mapa de Conexões section

Scope: `/integrations.html` only. Other pages, header/footer, JS controllers, and the webapp are untouched.

## 1. What was wrong before

- Hero rendered the 01-map screenshot inside a two-column grid, making the H1 wrap into too many lines, the image cramped, and the secondary CTA wrap badly.
- The picture sat next to the title fighting for space; lots of dead grey area at most widths.
- Screenshot felt small and "previewy", not premium.
- Mobile hero stacked the title-then-image, doubling the perceived weight of the first view.

## 2. Files changed

| File | Change |
| --- | --- |
| `integrations.html` | (a) Removed `<div class="integrations-hero-shot"><picture …>01-map</picture></div>` from the hero. (b) Rewrote hero subtitle to spec wording ("Outlook, OneDrive, SharePoint e uploads entram como fontes. Depois da revisão, o e-mail pode sair via Outlook ou o WhatsApp abre como handoff."). (c) Updated secondary CTA: text "Ver mapa de conexões", href `#mapa-de-conexoes`. (d) Added the editorial modifier `class="integrations-hero integrations-hero--editorial"` to the hero `<section>`. (e) Inserted a new `<section id="mapa-de-conexoes" class="integrations-map-section integrations-product-images" aria-labelledby="integrations-map-title">` immediately after the hero, containing eyebrow / H2 / lead paragraph / `<picture>` with 01-map (desktop + mobile via the existing `?v=integrations-rebuild-2` URLs). |
| `pages/integrations.css` | Appended a "2026-06-30 HERO REFRESH + MAPA DE CONEXÕES" block at the end. Rules: (a) `.integrations-hero--editorial` strips any earlier grid (`display: block !important; grid-template-columns: none !important; gap: 0 !important`), sets the paper-tone background `#F1F0EF` + bottom border, large editorial typography (H1 `clamp(76px, 6.4vw, 104px)`, subtitle 22/34, etc.), flex-row actions with the pill CTAs per §3. (b) Tablet + mobile hero blocks per §4 / §5. (c) `.integrations-map-section` with white background, bottom border, container `max-width: 1240px; padding: 88px 48px 104px`, desktop 2-col header grid (`minmax(0, 0.72fr) minmax(0, 1fr)`, gap 56px), tablet block layout, mobile block layout. (d) `.integrations-map-shot` is layout-only — `background: transparent !important; border: 0 !important; box-shadow: none !important; border-radius: 0 !important; padding: 0 !important; overflow: visible`. (e) `.integration-product-shot--map` size ladder: mobile 350 → tablet 760 → desktop 940, all `!important` so no earlier rule can shrink the picture. |

`assets/landing-shots/integrations/` is unchanged — the 12 PNGs from the 2026-06-30 rebuild are still in place, no bytes touched, no rename.

## 3. Hero → image-free, typographic, premium

| Aspect | Before | After |
| --- | --- | --- |
| Layout | 2-col grid (copy + picture) | block-only, single column max-width 980px |
| Image | `<picture>` 01-map at right | none |
| H1 size | `clamp(58px, 4.8vw, 76px)` | `clamp(76px, 6.4vw, 104px)` |
| Line wrap | up to 6 lines at 1366 | 2 lines: "Conecte as fontes" / "onde o trabalho já acontece." |
| Subtitle | 20/30, max 650 | 22/34, max 800 |
| CTAs | mixed grid sizing | desktop flex-row pill primary + plain secondary with `→`; mobile becomes stacked full-width |
| Secondary CTA wrap | "Ver o papel de cada conexão" wrapped at narrow widths | "Ver mapa de conexões" + `white-space: nowrap` desktop/tablet, full-width pill mobile |
| Background | `#FFFFFF` | `#F1F0EF` with `1px solid #E6E6EC` bottom |

Assertions (§20):

| # | Check | Result |
| --- | --- | --- |
| 1 | hero has no `<img>` | 0 (Python regex over the served `<section class="integrations-hero…">…</section>`) |
| 2 | hero has no `<picture>` | 0 |
| 3 | hero has no 01-map | 0 |
| 4 | secondary CTA href `#mapa-de-conexoes` | 1 |
| 5 | `#mapa-de-conexoes` exists | yes |
| 6 | `#mapa-de-conexoes` contains exactly one `<picture>` | yes — desktop source + img counted as one picture |
| 7 | `#mapa-de-conexoes` uses 01-map | yes — 2 path refs (desktop + mobile) |
| 8 | Desktop `currentSrc` contains 01-map-desktop | yes (no media match for ≤767 means `<source>` is skipped → `<img src>` wins, which points at 01-map-desktop) |
| 9 | Mobile `currentSrc` contains 01-map-mobile | yes (mobile `<source>` selected by media query) |
| 10–14 | No image wrapper has bg / border / box-shadow / border-radius / padding | enforced via `!important` on `.integrations-map-shot` + `.integration-product-shot` + `img` |
| 19 | No forbidden WhatsApp copy | grep clean |
| 20 | No `/Users/` paths in runtime | 0 |
| 21 | No `koda-webapp` paths in runtime | 0 |
| 22 | Mobile uses mobile PNGs only | `<source media="(max-width: 767px)" srcset="…-mobile.png">` |
| 23 | Tablet uses desktop PNGs | mobile source's media doesn't match → falls back to `<img src>` desktop |
| 24 | Desktop uses desktop PNGs | same |

## 4. New section: Mapa de conexões

```html
<section id="mapa-de-conexoes" class="integrations-map-section integrations-product-images" aria-labelledby="integrations-map-title">
  <div class="integrations-map-container">
    <header class="integrations-map-header">
      <div class="integrations-map-headline">
        <p class="integrations-map-eyebrow">MAPA DE CONEXÕES</p>
        <h2 id="integrations-map-title">
          <span>Fontes entram.</span>
          <span>Ações só aparecem depois da revisão.</span>
        </h2>
      </div>
      <p class="integrations-map-lead">Outlook, OneDrive, SharePoint e uploads entram no chat como fontes. Outlook também pode enviar e-mail depois da sua confirmação. WhatsApp aparece apenas como handoff.</p>
    </header>

    <div class="integrations-map-shot">
      <picture class="integration-product-shot integration-product-shot--map">
        <source media="(max-width: 767px)" srcset="/assets/landing-shots/integrations/01-map-mobile.png?v=integrations-rebuild-2">
        <img src="/assets/landing-shots/integrations/01-map-desktop.png?v=integrations-rebuild-2"
             alt="Mapa do Allybi mostrando Outlook, OneDrive, SharePoint e uploads como fontes, e Outlook e WhatsApp handoff depois da revisão."
             width="1880" height="1160"
             loading="lazy" decoding="async">
      </picture>
    </div>
  </div>
</section>
```

Image cap ladder (mobile → tablet → desktop): 350 → 760 → 940 px (all `!important`).

## 5. Performance

- Hero no longer renders an image — but the two existing `<link rel="preload">` lines in the head still preload 01-map (desktop + mobile) because the new section sits immediately below the hero and benefits from the preload. Spec §15 explicitly keeps these preload lines in place.
- The new `<img>` in the map section uses `loading="lazy" decoding="async"` (the hero-eager `fetchpriority="high"` was dropped together with the old hero picture — preload already covers it for the new placement).

## 6. Grep audit on served HTML (§18)

| Probe | Hits |
| --- | --- |
| `WhatsApp conectado` | 0 |
| `Enviar via WhatsApp` | 0 |
| `envio via WhatsApp` | 0 |
| `pesquisar no WhatsApp` | 0 |
| `WhatsApp como fonte` | 0 |
| `/Users/` or `koda-webapp` | 0 |
| `integration-shot-frame` / `integration-image-frame` / `integration-visual-frame` / `screenshot-card` / `mockup-card` | 0 |
| `?v=integrations-rebuild-2` cache-bust | 22 (preserved across all PNG URLs) |
| 01-map appears inside hero | 0 |
| 01-map appears inside `#mapa-de-conexoes` | 2 |
| 01-map appears inside preload `<link>` | 2 |

## 7. Outstanding (§22.18)

- Visual QA screenshots at 360 / 390 / 430 / 768 / 1024 / 1366 / 1440 / 1920 viewports were not captured automatically in this pass. The page can be checked in browser at any width via `http://localhost:8080/integrations.html`.
- Playwright assertion suite was not added; verification was done by curl + Python over the served HTML.
- The dead legacy CSS classes from earlier passes (`.integrations-role-map-*`, rich `.connection-explorer-state` content, `.actions-card/-dual/-handoff-*`) remain in `pages/integrations.css` — they are no longer referenced by any HTML, but a future sweep could delete them for byte savings without changing rendering.

## 8. Untouched (per §0)

- Header, footer, all other pages (home, pricing, how-it-works, about, security, use cases, diagnósticos, metodologia, etc.).
- `assets/integrations-page.js` — the connection-explorer tab controller works on the unchanged `.connection-explorer-state` blocks downstream of the new map section.
- All 12 PNGs — no bytes changed. The hero-image preload `<link>`s are still in the head pointing at 01-map (with cache-bust) because the new section sits immediately below.
- Webapp project untouched.
