# SAURAM — Full-Site Page Specifications

Companion to `DESIGN.md` (design system) and the working implementation in this folder.
Every page below **exists and runs** — open any `.html` file directly. This document is the
spec a developer follows to re-implement or extend the pages in React, Angular, Next.js,
Blazor or ASP.NET Core MVC.

---

## Global (applies to every page — not repeated below)

- **Header:** fixed premium header; transparent over the dark page hero → ivory glass +
  blur after 40 px scroll (`.site-header` / `.scrolled`, `js/main.js`). Active nav item =
  gold underline + `aria-current="page"`. Mobile ≤1023 px: hamburger → full-screen olive
  overlay menu with staggered link reveal, Escape to close.
- **Footer:** 5-column premium footer (`.footer-grid-5`): brand + tagline, Company,
  Products, Partner & Support, newsletter + socials; gold hairline top; policy row
  (Privacy · Terms · Returns · Shipping · Sitemap).
- **Page hero:** interior pages open with `.page-hero` — compact olive gradient band,
  grain, optional gold sunburst, breadcrumbs (small-caps, gold separators), Marcellus
  `.page-title` with a Cormorant-italic gold accent word, `.page-lede`.
- **Animations:** scroll-reveal (`.reveal` + IntersectionObserver), card lift + image zoom
  on hover, button ripple, smooth anchor scroll; everything disabled under
  `prefers-reduced-motion`. Page-level extras noted per page.
- **SEO:** unique `<title>` + `meta description` per page (already set); one `<h1>` per
  page; semantic landmarks (`header/nav/main/section/footer`); breadcrumbs mirror URL
  hierarchy. Production additions: canonical URLs, Open Graph image, `sitemap.xml`,
  JSON-LD noted per page.
- **Accessibility:** visible gold `:focus-visible` outline; labels or `sr-only` labels on
  every input; `aria-expanded` on accordions/menu; `role="status"` on live counts and form
  messages; modals get `aria-modal`, Escape close, focus return; color contrast ≥ AA
  (gold-on-light uses `--gold-deep`).
- **Developer notes:** pages share `css/styles.css` + `js/main.js` + `js/pages.js`.
  Product data lives once in `js/pages.js` (`window.SAURAM.PRODUCTS`) — port it to your
  framework's data layer. All fabricated content is marked `(placeholder)` in the markup.
  The shared shell (head/header/footer) is identical across files — extract it into your
  framework's layout component. Forms are demo-validated client-side (`data-validate`);
  wire `submit` to a real endpoint before launch.

---

## 1. Home — `index.html`
1. **Purpose:** brand first impression; route families to products, trade buyers to partnership.
2. **Layout:** full-screen olive hero with sunburst → 15 alternating ivory/cream/olive sections.
3. **Section order:** hero → promise → categories → why → process → featured products → certifications → testimonials → story → stats → CTA → gallery → contact → footer.
4. **Content:** brand story from `Details.txt`; real pack photography; placeholder stats/testimonials.
5. **Components:** promise cards, asymmetric category grid, split why-layout, process steps, product cards, stat counters, CTA banner, masonry.
6. **Mobile:** single column; category grid 1-col; timeline vertical; stats wrap 2-up.
7. **Desktop:** 1180 px container; categories 3-col with 2-row/2-col feature cells; products 4-col.
8. **Animations:** staggered hero lines, sun parallax, counters count-up once, reveals.
9. **CTAs:** hero "Explore Products" (primary gold) + "About Us" (ghost); per-section links; CTA banner; header "Shop Now" everywhere.
10. **SEO:** JSON-LD `Organization` + `WebSite`; preload hero fonts.
11. **A11y:** scroll-cue is a labeled link; hero text contrast on olive ≥ AA.
12. **Dev:** hero is the only `100svh` section — keep content within safe viewport insets.

## 2. About — `about.html`
1. **Purpose:** convert skepticism into trust — who makes the food and why.
2. **Layout:** hero → who-we-are split → journey timeline → vision/mission/values → founder (olive) → excellence + why split → awards → team → CTA.
3. **Section order:** as above; storytelling before people, people before CTA.
4. **Content:** "Rooted in purity. Driven by trust." headline; journey uses *named eras* (The roots / The founding / …) with `(year placeholder)`; two real co-founders — Raj Kansagara and Jaydeep Kalariya — with portraits (`.founder-duo` in the olive section, and the first two `.person` cards in the team grid).
5. **Components:** `.vtimeline`, promise cards, `.team-grid` with `.ph` avatars, doc-cards for awards.
6. **Mobile:** every split stacks (media first in story section); timeline stays left-rail.
7. **Desktop:** `why-grid` 2-col; values 4-up; team 4-up.
8. **Animations:** timeline items reveal sequentially; card lifts.
9. **CTAs:** "See the Process" (olive) mid-page; "Partner With Us" in founder section; end banner → Products.
10. **SEO:** JSON-LD `AboutPage` + `Organization` with both `founder` entries (Raj Kansagara, Jaydeep Kalariya) still to be added.
11. **A11y:** timeline is semantic headings + paragraphs, not a list of floats.
12. **Dev:** replace era labels with real years by editing `.vt-year` text only.

## 3. Product Listing — `products.html`
1. **Purpose:** browsable premium catalog for 8 SKUs; entry point for Quick View and detail pages.
2. **Layout:** hero → `catalog-layout` (sticky filter rail + toolbar + grid + pagination) → trade CTA banner. Quick View modal at body end.
3. **Section order:** filters left (desktop), toolbar (search / count / sort) above grid.
4. **Content:** 8 product cards, every one with a real pack photo; MRPs are placeholders and footnoted.
5. **Components:** `details.filters-box` (checkbox groups: category, price band, pack size, availability), `.search-box`, `.select-pill`, `.product-card` + `.card-actions` (wishlist/compare icon buttons) + hover `.quick-view`, `.pagination`, `.empty-state`, quick-view modal.
6. **Mobile:** filters collapse into a `<details>` disclosure above the grid; 1-col cards; toolbar wraps.
7. **Desktop:** 250 px sticky rail + auto-fill grid (≈3-col); filters auto-open via JS.
8. **Animations:** card lift/zoom; actions fade in on hover/focus-within; modal scale-in.
9. **CTAs:** every card "View Details"; Quick View "View Full Details"; trade banner "Business Inquiry".
10. **SEO:** JSON-LD `ItemList` of products; `?cat=` deep links are shareable (footer uses them).
11. **A11y:** icon buttons have per-product `aria-label`s; result count is `role="status"`; pagination buttons get `aria-current`.
12. **Dev:** all filtering/sort/pagination is client-side in `pages.js` over card `data-*` attributes (6 per page → real 2-page pagination). Wishlist/compare persist in `localStorage` (`sauram-wishlist`, `sauram-compare`).

## 4. Product Details — `product-details.html?p=<slug>`
1. **Purpose:** everything a buyer (retail or trade) needs to commit to one product.
2. **Layout:** slim breadcrumb hero → `pd-layout` (sticky gallery left, buy panel right) → label-explained accordion → reviews → product FAQs → related grid. Fixed `.sticky-buy` bar.
3. **Section order:** gallery/price/packs/CTAs first; long-form specifics in accordion; social proof after.
4. **Content:** driven by `SAURAM.PRODUCTS[slug]` — 8 slugs (`toor-dal`, `mung-dal`, `chana-dal`, `udad-dal`, `whole-jeera`, `whole-coriander`, `groundnut-oil`, `gir-cow-ghee`). Nutrition tables use the real pack-label values; reviews are placeholders.
5. **Components:** `.pd-main` (hover zoom follows cursor), `.pd-thumbs` (pack + 2 designed placeholder views), `.pill-check` pack sizes updating price + sticky bar, badges, share row (Web Share / WhatsApp / copy-link + toast), `.spec-table`, accordion, `.review-card` + stars, related product cards, sticky purchase bar (appears when CTAs scroll away).
6. **Mobile:** stacked; gallery not sticky; sticky-buy bar becomes the persistent CTA.
7. **Desktop:** 2-col with sticky gallery at `top:104px`.
8. **Animations:** image zoom 1.65 with cursor-origin; accordion grid-rows transition; sticky bar slide-up.
9. **CTAs:** "Send Purchase Inquiry" (gold, duplicated in sticky bar), "Download Spec Sheet" (olive).
10. **SEO:** in production render one static page per product (title/meta/JSON-LD `Product` + `Offer` + `NutritionInformation`); the `?p=` swap is a static-hosting convenience — JS already rewrites `document.title`/description.
11. **A11y:** thumbs are labeled buttons; pack sizes are a real radiogroup; nutrition table has caption + row headers.
12. **Dev:** to add a product, add one object to `PRODUCTS` and one card to `products.html`; detail page, related grids, quick view and search all pick it up automatically.

## 5. Quality — `quality.html`
1. **Purpose:** substantiate the purity claim with process, not adjectives.
2. **Layout:** hero → philosophy split (+lab photo slot) → 4 pillars → 6-step testing (olive) → packaging split → certification strip → batch-life timeline → documents CTA.
3–4. **Content:** "We ship what we would serve our own children" as the thesis; honest, non-invented claims; FSSAI licence number placeholder.
5. **Components:** promise cards, `process-track`, why-list, cert badges, `.vtimeline` (Day 0 → Dispatch).
6–7. **Responsive:** splits stack on mobile; process 3→2→1 col.
8. **Animations:** step reveals cascade; card lifts.
9. **CTAs:** strip link → certifications; end banner "Request Documents" → contact.
10. **SEO:** anchor ids for pillars enable deep links from FAQ answers.
11. **A11y:** the six steps are an ordered list — order is semantic.
12. **Dev:** timeline day labels are content, not generated — edit freely.

## 6. Manufacturing — `manufacturing.html`
1. **Purpose:** prove "actual manufacturer" with a walkable process.
2. **Layout:** hero → overview trio → **interactive 8-step process** (olive) → machinery quartet → food-safety split → mini gallery → visit CTA.
3. **Section order:** credibility trio before the deep-dive.
4. **Content:** steps: Raw Material, Cleaning, Sorting, Processing, Packaging, Quality Check, Storage, Dispatch — each with photo slot + 3 facts.
5. **Components:** `.steps-nav` chips (numbered — a true sequence) + `.step-panel` tab panels; promise cards; why-list.
6. **Mobile:** chips wrap into a cloud; panel stacks image-over-text.
7. **Desktop:** panel is 2-col (photo | facts).
8. **Animations:** panel swap uses `panelIn` rise; chips have hover/active states.
9. **CTAs:** "See Our Quality Process" cross-link; end banner → Products.
10. **SEO:** JSON-LD `HowTo` fits the 8 steps if desired.
11. **A11y:** chips are `role="tab"` with `aria-selected`; panels keep DOM order for no-JS reading.
12. **Dev:** step interactivity is ~15 lines in `pages.js` (`#stepsNav`); panels are plain divs with `id="step-N"`.

## 7. Gallery — `gallery.html`
1. **Purpose:** visual proof of world — products, packaging, factory, farm, food, video.
2. **Layout:** centered hero → category chip row → masonry → Load More → lightbox modal.
3. **Section order:** single gallery section keeps focus.
4. **Content:** all 8 real pack photos + 8 designed placeholder tiles (manufacturing/farm/food + 2 video slots with play glyphs). Tiles show the front-pack crop; `data-full` opens the full twin-pack shot (front + back label) in the lightbox.
5. **Components:** CSS-columns masonry, `.chip` filters, `.modal.lightbox-panel` with prev/next + captions, load-more button.
6. **Mobile:** 2-column masonry; lightbox nav buttons overlay image edges.
7. **Desktop:** 3-column; nav arrows float outside the panel.
8. **Animations:** image zoom on hover, caption fade-up, modal scale-in.
9. **CTAs:** none by design — the gallery is the destination (header CTA persists).
10. **SEO:** all real images carry descriptive `alt`; `ImageGallery` JSON-LD optional.
11. **A11y:** lightbox items are keyboard-activatable (`role="button"`, Enter/Space); arrows/Escape work in the modal.
12. **Dev:** items declare `data-gcat`, optional `data-full` + `data-caption`; batch size = 9 (`BATCH` in `pages.js`).

## 8. Contact — `contact.html`
1. **Purpose:** one funnel for every audience — the form adapts by inquiry type.
2. **Layout:** hero → split (direct lines + hours + socials | adaptive form card) → map slot → mini-FAQ.
3. **Section order:** human contacts before the form; FAQ deflects before writing.
4. **Content:** address/phone/email placeholders clearly marked; working hours table.
5. **Components:** `.contact-list`, `.hours-table`, radio `pill-check` switch (General / Distributor / Export) toggling `[data-show-for]` fieldsets, `.form-card`, `.ph-map`.
6. **Mobile:** stacks info → form → map; pills wrap.
7. **Desktop:** 2-col at ~1.05:1.
8. **Animations:** conditional fields swap instantly (no jank); submit toast.
9. **CTAs:** "Send Business Inquiry" (gold) is the page's single primary action.
10. **SEO:** JSON-LD `LocalBusiness` with `openingHours` once the real address lands.
11. **A11y:** the pill group is a labeled `radiogroup`; errors are text, not color alone.
12. **Dev:** conditional logic is generic (`data-switch` / `data-show-for`) — reused on any future form.

## 9. Become a Distributor — `distributor.html`
1. **Purpose:** recruit territory partners; qualify them softly.
2. **Layout:** hero → 4 benefits → program & requirements split (accordion) → coverage map slot → application form → distributor FAQ → talk-first CTA.
3. **Section order:** give (benefits) before ask (requirements/form).
4. **Content:** margin/territory/supply/support pitch; requirements framed as a conversation.
5. **Components:** promise cards, why-list, accordion, `.ph-map`, `form-card` (territory + experience fields).
6–7. **Responsive:** splits stack; form grid 2→1 col.
8. **Animations:** standard reveals; accordion.
9. **CTAs:** "Submit Application" (gold) + end-banner alternative "Talk to Us First".
10. **SEO:** targets "FMCG distributorship Gujarat"-class queries via h2 wording.
11. **A11y:** required selects included in validation with visible errors.
12. **Dev:** `#apply` anchor allows direct deep-links from campaigns.

## 10. Export — `export.html`
1. **Purpose:** land importer/private-label inquiries with operational credibility.
2. **Layout:** hero → world-map slot + market chips → export range quartet → private-label/OEM split (olive) → **container loadability table** → standards + inquiry form split.
3. **Section order:** capability before paperwork; table before form (buyers plan first).
4. **Content:** indicative 20/40 ft figures marked placeholder; document set spelled out.
5. **Components:** `.spec-table` with thead, badge chips, olive why-list, export `form-card` (country, volume, label preference).
6. **Mobile:** table scrolls horizontally inside its card (`overflow-x`); splits stack.
7. **Desktop:** contact-style 2-col final section.
8. **Animations:** standard reveals only — this audience wants calm.
9. **CTAs:** "Send Export Inquiry" (gold); certifications cross-link.
10. **SEO:** heading language covers "private label ghee manufacturer India" style queries.
11. **A11y:** table has column headers; chips are informative `span`s, not fake buttons.
12. **Dev:** table values in one place; confirm with the export desk before launch.

## 11. Certifications — `certifications.html`
1. **Purpose:** show credentials honestly — held vs. planned clearly separated.
2. **Layout:** hero → credential cards (status-tagged) → certificate scan-slot gallery → compliance-in-practice split → CTA.
3. **Section order:** claims → evidence slots → what-it-means.
4. **Content:** FSSAI + Legal Metrology tagged "On pack today"; ISO/HACCP/APEDA tagged "Certificate slot — publish when certified". **Never ship implied certifications.**
5. **Components:** promise cards + `.tag`/`.badge-soft` status chips, `.ph` scan slots.
6–7. **Responsive:** card grid auto-fit 300 → 1 col.
8. **Animations:** standard reveals.
9. **CTAs:** "Request compliance documents" → contact; quality cross-link.
10. **SEO:** licence number in visible text once real (matches pack, aids trust queries).
11. **A11y:** status conveyed by text chips, not color alone.
12. **Dev:** swap `.ph` slots for `<img>` scans + lightbox (reuse gallery modal) when documents arrive.

## 12. FAQ — `faq.html`
1. **Purpose:** self-serve answers; deflect support load; SEO long-tail.
2. **Layout:** centered hero with live search → category chips → 7 grouped accordions (21 Q&As) → empty state → ask-us CTA.
3. **Section order:** groups ordered by purchase journey: Products → Orders → Shipping → Quality → Manufacturing → Export → Payments.
4. **Content:** answers link into the relevant deep pages.
5. **Components:** hero `.search-box`, chips, `.accordion` groups, `.empty-state` with contact CTA.
6–7. **Responsive:** chips wrap; groups 900 px max width everywhere.
8. **Animations:** matching items auto-expand while searching; accordion transitions.
9. **CTAs:** persistent "Contact us" fallback in empty state + end banner.
10. **SEO:** `FAQPage` JSON-LD with all 21 Q&A pairs — high-value snippet target.
11. **A11y:** search filters without focus loss; group headings remain when matched.
12. **Dev:** search is text-content matching per `.acc-item`; add Q&As freely.

## 13. 404 — `404.html`
1. **Purpose:** recover lost visitors with brand charm.
2. **Layout:** single full-viewport olive `error-hero`; the seal's **sun is the zero** in "4☀4", gently floating.
3. **Section order:** code → line "Looks like this page wandered off." → two buttons → search link.
4. **Content:** one wry sentence, no lorem.
5. **Components:** `.error-code` + `.sun-zero` SVG, gold + ghost buttons.
6–7. **Responsive:** type scales `clamp(5.5rem → 10rem)`.
8. **Animations:** 5 s sun float loop (disabled under reduced motion).
9. **CTAs:** "Back Home" (gold) + "Explore Products" (ghost) + search text link.
10. **SEO:** serve with real 404 status; page is self-noindexing by status.
11. **A11y:** code has `aria-label="Error 404"`.
12. **Dev:** map server/host 404 rule to this file (e.g. Netlify `404.html` works as-is).

## 14–17. Policies — `privacy-policy.html`, `terms.html`, `return-policy.html`, `shipping-policy.html`
1. **Purpose:** legal clarity in brand voice ("plain-language summary" callouts).
2. **Layout:** slim hero → `side-layout`: sticky scroll-spy section nav | `.prose` body.
3. **Section order:** per policy — privacy 7 sections; terms 6; returns 5 (leads with "the short version"); shipping 5 (timeline `spec-table`).
4. **Content:** professionally drafted placeholders flagged for legal review; shipping table values are placeholders.
5. **Components:** `.side-nav[data-scrollspy]`, `.prose` (numbered `ol` with gold leading-zero counters), `.callout`.
6. **Mobile:** nav stacks above content, non-sticky.
7. **Desktop:** 250 px sticky rail; 70ch prose measure.
8. **Animations:** scroll-spy only — reading pages stay still.
9. **CTAs:** inline cross-links (returns ↔ shipping ↔ contact).
10. **SEO:** plain titles; link all four from every footer (done).
11. **A11y:** `scroll-margin-top` keeps anchored headings below the fixed header.
12. **Dev:** pure content pages — edit prose, nav links, nothing else.

## 18. Sitemap — `sitemap.html`
1. **Purpose:** human-readable map of all 17 pages.
2. **Layout:** slim hero → 3-column link grid (Products / Company / Partner & Support) with small descriptions.
3–5. Uses `.sitemap-grid`; every link is real; product deep-links use `?cat=` / `?p=`.
6–7. **Responsive:** auto-fit 220 px → 1 col.
8. **Animations:** column reveals; 3 px link nudge on hover.
9. **CTAs:** none — navigation is the purpose.
10. **SEO:** complements (does not replace) production `sitemap.xml`.
11. **A11y:** columns are labeled `h2` groups.
12. **Dev:** update alongside footer when pages are added.

---

## Placeholder master list (before launch)
FSSAI licence number + certificate scans · the two remaining team names & portraits (Quality
Lead, Sales & Partnerships) · journey years ·
testimonials/reviews with permission · statistics · MRPs & container loadabilities · policy
legal review · Instagram/Facebook/LinkedIn profile URLs · form backends (contact,
distributor, export, newsletter) · real farm/factory/food/lifestyle photography to replace
the temporary stock images in `Assets/placeholders/` (see that folder's `README.md`) ·
coverage + export-corridor maps (currently blank base maps) · gallery video slots.

**Done:** contact details (address, phone/WhatsApp, email) and the Google Maps embed on
`index.html` + `contact.html` are live — sourced from `Details.txt`.
