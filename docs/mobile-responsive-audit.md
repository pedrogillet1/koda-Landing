# Mobile & Tablet Responsive Audit

> **Date:** 2026-04-01
> **Scope:** All pages in koda-Landing
> **Goal:** Identify layout, usability, and readability issues across phone and tablet viewports

---

## 1. Current Breakpoint Map

| Breakpoint | What Changes |
|------------|-------------|
| **1024px** | Desktop nav hides, mobile hamburger toggle shows, header shrinks to 56px, `grid-4` becomes `grid-2` |
| **960px** | Hero goes single-column, story stacks vertical, cases split stacks, security grid stacks |
| **768px** | Pain cards stack to 1 col, how-it-works steps stack, proof cards stack, integration cards shrink, `allybi-grid-2`/`allybi-grid-3` become 2 columns |
| **640px** | Footer columns hide, mobile links show, footer simplifies |
| **600px** | Hero padding reduces, CTAs stack full-width, chips shrink, trust items shrink, all major sections reduce to 80px padding, cases tabs go full-width |
| **480px** | All grids become 1 column |
| **390px** | Extra-small adjustments (font sizes, spacing) |

### Gap: No tablet-specific layout between 768px and 1024px

The header jumps straight from a full desktop nav bar to a hamburger menu at 1024px. There is no condensed tablet nav (e.g., icon-only items, collapsed dropdowns) for the 768-1024px range, which covers iPad portrait and many Android tablets.

---

## 2. Critical Issues

### 2.1 No tablet-specific layout (768-1024px gap)

- **Severity:** Critical
- **Detail:** At 1024px the nav switches to a hamburger. Tablets in landscape (1024px) get the mobile experience even though they have plenty of space. A condensed nav (fewer links, icon-only items, or a secondary overflow menu) would be more appropriate.
- **Recommendation:** Add a breakpoint around 1024px that shows a condensed horizontal nav instead of the hamburger, or lower the hamburger trigger to 768px and design an intermediate layout.

### 2.2 Hero scene mock illegible on phone

- **Severity:** Critical
- **Detail:** The browser mock in the hero section has a `max-width: 580px`. On 320-375px screens the mock shrinks proportionally but the text inside it becomes unreadably small.
- **Recommendation:** Hide the browser mock below 600px and replace it with a simplified illustration or a static screenshot optimized for small screens. Alternatively, crop to just the key UI element.

### 2.3 Trust rail wraps badly

- **Severity:** Critical
- **Detail:** The trust section has 5 items laid out with `nowrap`. On narrow screens the row overflows or the chips become cluttered and too small (11px font-size).
- **Recommendation:** Allow wrapping into two rows below 600px, or switch to a horizontal scroll with visible overflow indicators. Increase minimum chip font-size to 12px.

### 2.4 Pain SVG illustrations have hardcoded positions

- **Severity:** Critical
- **Detail:** Inline SVGs in the pain section use `<text>` elements with hardcoded `x`/`y` positions. These do not scale well below 320px and can overflow their containers.
- **Recommendation:** Replace hardcoded text positions with responsive SVG `viewBox` sizing, or swap inline SVGs for raster images with `srcset` at small breakpoints.

### 2.5 3-column proof grid creates excessive scroll on phone

- **Severity:** Critical
- **Detail:** The proof/testimonial grid stacks at 768px, but three large quote cards in a single column create a very long scroll distance on phone screens.
- **Recommendation:** Show only one testimonial with a swipe carousel on screens below 768px. Alternatively, collapse quotes into a summary view with an expand toggle.

### 2.6 No sticky mobile CTA

- **Severity:** Critical
- **Detail:** There is no persistent call-to-action visible while scrolling on mobile. Users must scroll back to the hero or down to the footer CTA section.
- **Recommendation:** Add a sticky bottom bar (48-56px) on mobile with the primary CTA button. Show it after the user scrolls past the hero section.

### 2.7 Footer mobile links are unorganized

- **Severity:** Critical
- **Detail:** Below 640px, footer columns hide and are replaced with a flat list of links. These are not grouped or visually organized, making navigation difficult.
- **Recommendation:** Use collapsible accordion groups (Product, Company, Legal) in the mobile footer, or at minimum add visual separators and group headings.

### 2.8 Form inputs may trigger iOS zoom

- **Severity:** Critical
- **Detail:** If any `<input>` or `<textarea>` has a `font-size` below 16px, iOS Safari will auto-zoom the viewport on focus, breaking the layout.
- **Recommendation:** Verify all form inputs use `font-size: 16px` or larger. Add the rule globally for mobile: `input, textarea, select { font-size: 16px; }`.

### 2.9 `allybi-grid-3` pain cards stay 2-col too long

- **Severity:** Critical
- **Detail:** Pain section cards use `allybi-grid-3`, which becomes 2-col at 768px and only goes to 1-col at 480px. On screens between 480-768px, two narrow cards side by side hurt readability.
- **Recommendation:** Switch `allybi-grid-3` to 1-col at 768px (not 480px) for the pain section. The cards contain enough text that single-column is better for readability on any screen under 768px.

---

## 3. Moderate Issues

### 3.10 Excessive section padding on phone

- **Severity:** Moderate
- **Detail:** The 600px breakpoint sets section padding to 80px. On a phone screen this is a large amount of vertical whitespace.
- **Recommendation:** Reduce to 56px or 64px at the 600px breakpoint, and 48px at 480px.

### 3.11 Hero H1 at 36px creates long headlines

- **Severity:** Moderate
- **Detail:** The minimum H1 size of 36px on a 320px screen creates 4-5 line headlines, especially in Portuguese (PT-BR) where words tend to be longer.
- **Recommendation:** Reduce to 28-32px below 390px. Use `clamp()` for fluid sizing: `font-size: clamp(28px, 6vw, 56px)`.

### 3.12 Cases tabs text may truncate in PT-BR

- **Severity:** Moderate
- **Detail:** Tabs go full-width on phone but longer labels like "Negocios" in Portuguese may truncate or cause horizontal overflow.
- **Recommendation:** Allow horizontal scroll on the tab bar, or use shorter labels on mobile. Test with the longest expected label in each locale.

### 3.13 FAQ accordion tap targets

- **Severity:** Moderate
- **Detail:** Accordion trigger padding is `24px 0`. While the horizontal tap area spans full width, the vertical tap target could be too small for comfortable use.
- **Recommendation:** Set a minimum height of 48px on each accordion trigger (per WCAG 2.5.8 target size guidelines). Padding of `16px 0` with a `min-height: 48px` would work.

### 3.14 Security subtitle unconstrained on mobile

- **Severity:** Moderate
- **Detail:** The security section subtitle has a `max-width: 600px` but no auto margins on mobile, so it can sit left-aligned and look unbalanced.
- **Recommendation:** Add `margin-inline: auto` to the subtitle so it centers properly at all widths.

### 3.15 Integration cards may overflow on narrow phones

- **Severity:** Moderate
- **Detail:** Integration cards have `min-width: 120px`. With 4 cards in a row on a very narrow phone (320px), this forces overflow.
- **Recommendation:** Remove `min-width` below 480px, or switch to a 2x2 grid at 480px and 1-col at 320px.

### 3.16 Proof cards over-padded on mobile

- **Severity:** Moderate
- **Detail:** Proof/testimonial cards have 48px padding on mobile, consuming significant horizontal space.
- **Recommendation:** Reduce card padding to 24px below 600px and 16px below 390px.

---

## 4. Page-by-Page Assessment

### 4.1 Homepage (`index.html`)

| Section | Status | Notes |
|---------|--------|-------|
| Hero | Pass | Stacks at 960px, CTAs stack at 600px |
| Trust | Warn | 5 items wrap messily; chips too small at 11px (see issue 2.3) |
| Pain | Warn | Goes 1-col at 768px via `allybi-grid-3` but should go 1-col earlier (see issue 2.9) |
| Story | Pass | Stacks at 960px |
| How it works | Pass | Stacks at 768px |
| Cases | Warn | Tabs work but browser mock scene might be too small on phone |
| Security | Pass | Stacks at 960px |
| Integrations | Warn | Cards could wrap oddly with 4 items at narrow widths (see issue 3.15) |
| Proof | Warn | Stacks at 768px but cards are too padded (see issue 3.16) |
| FAQ | Pass | Accordion works |
| CTA | Pass | Padding reduces appropriately |

### 4.2 How It Works (`how-it-works.html`)

- Has its own CSS file (`pages/how-it-works.css`) with separate responsive rules.
- **Issue:** The 6-step horizontal flow navigation likely breaks on phone screens. Needs to become a vertical stepper or scrollable horizontal strip.
- **Action needed:** Verify step visuals are readable at 375px. The step illustrations and labels need testing.

### 4.3 Security Overview

- The 6 trust pillars are in a grid layout.
- **Issue:** Needs to go to 1-col on phone. Verify current grid behavior below 480px.
- **Issue:** If there is a data flow diagram using complex SVG, it will need simplification or a dedicated mobile version.

### 4.4 Legal / Finance / Business Use Cases

- Split layouts (copy + mock) stack at 960px -- this is correct.
- Pain cards have the same `allybi-grid-3` issue as the homepage (see issue 2.9).
- Diff/comparison mocks need review on phone screens to ensure they are legible.

### 4.5 Pricing

- Guided access page is relatively simple in layout.
- **Issue:** Feature checklist grid needs to go to 1-col on phone. Verify it does not stay in a multi-column layout below 480px.

### 4.6 Request Demo

- **Issue:** The form must be full-width single-column on mobile. Verify no side-by-side fields persist below 600px.
- **Issue:** Trust signals sidebar needs to stack below the form on mobile, not beside it.

### 4.7 Contact

- Intent selection cards plus the form need a 1-col layout on phone.
- Verify card tap targets meet 48px minimum height.

### 4.8 About

- Long text page.
- **Issue:** Needs adequate paragraph spacing and breathing room on mobile. Verify line-height is at least 1.5 and max-width constrains text to a comfortable measure (roughly 65-75 characters per line).

---

## 5. Recommended Fix Priority

### Phase 1 -- Ship blockers (Critical)

1. Fix form input font-size for iOS zoom prevention (issue 2.8)
2. Fix `allybi-grid-3` to go 1-col at 768px in pain sections (issue 2.9)
3. Fix trust rail wrapping/overflow (issue 2.3)
4. Make hero mock legible or swap on small screens (issue 2.2)
5. Organize mobile footer links into groups (issue 2.7)

### Phase 2 -- User experience improvements (Critical/Moderate)

6. Add sticky mobile CTA (issue 2.6)
7. Add a testimonial carousel for phone (issue 2.5)
8. Fix hardcoded SVG text positions (issue 2.4)
9. Add a condensed tablet nav for 768-1024px (issue 2.1)

### Phase 3 -- Polish (Moderate)

10. Reduce section padding on phone (issue 3.10)
11. Fluid H1 sizing with `clamp()` (issue 3.11)
12. Fix cases tab label truncation (issue 3.12)
13. Increase FAQ accordion tap targets (issue 3.13)
14. Center security subtitle on mobile (issue 3.14)
15. Fix integration card overflow (issue 3.15)
16. Reduce proof card padding (issue 3.16)

---

## 6. Testing Checklist

- [ ] iPhone SE (375x667) -- smallest common iPhone
- [ ] iPhone 14 Pro (393x852) -- current mainstream
- [ ] iPhone 14 Pro Max (430x932) -- large phone
- [ ] iPad Mini (768x1024) -- small tablet, portrait
- [ ] iPad Air (820x1180) -- standard tablet, portrait
- [ ] iPad Pro 11" (834x1194) -- landscape triggers desktop nav?
- [ ] Samsung Galaxy S21 (360x800) -- common Android
- [ ] Pixel 7 (412x915) -- common Android
- [ ] 320px viewport -- absolute minimum width test
- [ ] All pages tested in PT-BR locale (longer text strings)
