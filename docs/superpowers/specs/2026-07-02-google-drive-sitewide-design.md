# Add Google Drive as a live integration site-wide

**Date:** 2026-07-02
**Goal:** Make the marketing site consistently present **Google Drive** as a first-class, *live* connected source everywhere the Microsoft storage sources (OneDrive / SharePoint) appear. This aligns the public site with the working product and removes the "requesting a Google scope for a coming-soon feature" mismatch that is blocking Google OAuth (`drive.file`) brand verification.

## Scope decisions (from brainstorming)
- **Google Drive is LIVE** — add it everywhere; never label it "coming soon".
- **Gmail stays "coming soon"** — do **NOT** add Gmail to source lists/chips. The OAuth request is `drive.file` only; a Gmail scope is a restricted scope (separate, heavier CASA process) and is out of scope here.
- Site language is **Portuguese** (fallback). Match surrounding copy.
- Icons already exist: `assets/images/google-drive-icon.svg` (and `gmail-icon.svg`, unused here).

## The rule (applied per page)
> Wherever **OneDrive** and/or **SharePoint** appear as a connected source — an icon chip, a card, or a text enumeration like "Outlook, OneDrive, SharePoint e uploads" — **add Google Drive** right after SharePoint. Use `google-drive-icon.svg` for visual chips/cards (same markup/size as the OneDrive icon). For text lists, add the words "Google Drive". Keep Outlook/Gmail untouched (Gmail not added).

## Surfaces
1. **Visual (icon chips/cards)** — highest priority (what reviewers see):
   - `index.html` (hero source pills, `ENTRAM NO CHAT` sources, integration-flow)
   - `integrations.html` (source chips / lists; the connection-explorer)
   - `security-overview.html` (source references)
2. **Text source lists** — marketing pages that enumerate sources: `pricing.html`, `how-it-works.html`, `use-case-*.html`, `tempo*.html`, `diagnostico*.html`, `metodologia.html`, `demo.html`, `about.html`, `faq.html`, `customers.html`, `contact.html`, `request-demo.html`, `waitlist.html`, `use-cases.html`.
3. **Privacy policy** (`privacy.html`) — change the "Google Drive is coming soon / not treated as a live integration" statements so **Google Drive is a live integration**. Keep the *Google API Services User Data Disclosure* intact and compliant. **Gmail remains "coming soon"** in the policy.
4. **Legal / data docs** — where they enumerate connected sources, add Google Drive for accuracy: `terms.html`, `tos.html`, `cookies.html`, `subprocessors.html`, `security.html`, `data-deletion.html`, `integration-data-use.html`.

## Constraints
- **HTML-only** edits to each page's own file. Do not edit shared CSS unless strictly required; the Google Drive icon reuses the existing source-icon styling.
- **Do NOT fabricate product screenshots.** For the `integrations.html` connection-explorer tabs (which pair a source with a real screenshot), only add a Google Drive **tab/state if a real shot exists**; otherwise add Google Drive to the accompanying icon/text source lists and leave the screenshot explorer as-is. Never invent a Drive screenshot.
- Preserve each page's structure, `<main>` wrapper, header, and footer.
- Keep copy Portuguese and consistent with neighbors.

## Out of scope
- Adding Gmail anywhere (stays "coming soon").
- Any change to the actual product app or OAuth client config.
- Search Console domain verification and consent-screen edits (user-side, tracked separately).

## Verification
- After edits: screenshot `index.html`, `integrations.html`, and a couple of text-list pages; confirm Google Drive (icon + text) appears alongside OneDrive/SharePoint, Gmail does **not** appear, and no layout breakage at desktop + mobile.
- Confirm `privacy.html` no longer says Google Drive is "coming soon" while Gmail still does.
- Redeploy to Cloud Run (`gcloud run deploy allybi-landing --source . --region us-central1`) and re-verify on `allybi.com.br` + `allybi.co`.
