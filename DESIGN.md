# SAURAM — Homepage Design System

Design spec for the SAURAM homepage (`index.html`, `css/styles.css`, `js/main.js`).
Everything below is derived from the brand's real assets: the "Saurashtra — Land of the
Sun" seal, the packaging (ivory labels, olive bands, gold foil, kraft pouches), and the
brand story in `Details.txt`. Use this document when building further pages so the site
stays one coherent system.

---

## 1. Brand direction

| Attribute | Expression on the page |
|---|---|
| Premium, minimal | Generous whitespace, one accent color (gold), quiet card surfaces |
| Traditional | Serif display type, the sun-over-fields seal motif, Cormorant italic accents |
| Modern | Fluid type scale, rounded 20px surfaces, restrained motion |
| Trustworthy | Real packaging photography, certification band, manufacturer-first copy |

**Signature element:** the rising-sun-over-fields line art from the logo, redrawn as
inline SVG. It appears as the hero's background emblem, the header/footer seal, the CTA
banner motif, and inside photography placeholders. This motif — not any stock pattern —
is what makes the page unmistakably SAURAM.

## 2. Color tokens (CSS custom properties in `:root`)

| Token | Hex | Use |
|---|---|---|
| `--ivory` | `#F7F3EA` | Page background |
| `--cream` | `#EFE7D6` | Alternate section background |
| `--cream-deep` | `#E7DDC6` | Placeholder gradients |
| `--olive-950` | `#181F10` | Darkest olive (hero/story gradients end) |
| `--olive-900` | `#212B17` | Dark sections, headings on light |
| `--olive-800` | `#2E3A24` | Dark section gradient start, olive button |
| `--charcoal` | `#1B1914` | Shadows base |
| `--ink` | `#2B2A24` | Body text on light |
| `--muted` | `#6E6A5C` | Secondary text on light |
| `--gold` | `#B08427` | Primary accent, eyebrows, hairlines |
| `--gold-deep` | `#94690F` | Gold text on light (AA contrast) |
| `--gold-soft` | `#D9B65F` | Gold accents on dark |
| `--gold-pale` | `#EBDCB2` | Pale gold fills, selection |
| `--kraft` | `#A9885C` | Kraft-paper support tone |

Rules: gold is an accent, never a background for long text. On dark sections use
`--gold-soft` for accents and `rgba(247,243,234,.7…78)` for body text. No colors outside
this table.

## 3. Typography

| Role | Face | Notes |
|---|---|---|
| Display | **Marcellus** (Google Fonts) | All headings & stat numerals. Single weight 400 — hierarchy comes from size, not weight. Echoes the engraved-seal character of the wordmark. |
| Accent | **Cormorant Garamond** italic 500/600 | Italic accent words in headlines, pull quotes, testimonials, footer tagline. Always paired with gold or olive. |
| Body / UI | **Manrope** 400–700 | Paragraphs, buttons, nav, labels. |

Scale (fluid):
- Hero H1: `clamp(2.5rem, 7.2vw, 5.4rem)`, line-height 1.1
- Section title: `clamp(1.9rem, 4vw, 3rem)`, line-height 1.14
- Eyebrow: `.72rem`, 700, letter-spacing `.32em`, uppercase, gold
- Body: `1rem`, line-height 1.7; ledes `1.02rem` in `--muted`
- Card titles: `1.2–1.5rem` Marcellus

## 4. Surface & rhythm tokens

- Radius: `--radius: 20px` (cards), `--radius-lg: 28px` (banners), `999px` (pills)
- Shadows: `--shadow-1` (rest), `--shadow-2` (hover) — layered, low-opacity charcoal
- Section padding: `clamp(4.5rem, 9vw, 8rem)`; grid gap `clamp(1.25rem, 2.5vw, 2rem)`
- Container: `min(1180px, 100% − clamp(2.5rem, 8vw, 5rem))`
- Hairlines: `--line` (gold 28%) on premium cards, `--line-soft` (ink 12%) elsewhere
- Grain: subtle SVG `feTurbulence` data-URI (`--grain`) over dark sections and placeholders — keeps large flat panels from feeling digital

Section background cadence down the page: ivory → cream → ivory → **olive** → ivory →
cream → ivory → **olive** → ivory … so dark storytelling moments punctuate light
commerce moments.

## 5. Section-by-section notes

1. **Header** — fixed; transparent over hero (ivory text) → ivory glass + blur + olive
   text after 40px scroll (`.scrolled`, toggled in `main.js`). Mobile ≤1023px: hamburger
   opens a full-screen olive menu with staggered link reveal.
2. **Hero** — full viewport (`100svh`), olive gradient + faint gold sunburst SVG
   (`.hero-sun`, gentle parallax on scroll). Three-line headline with staggered rise
   animation; "tradition." set in Cormorant italic gold. CTAs: gold pill (primary) +
   ghost outline (secondary). Scroll cue with animated gold line.
3. **Brand promise** — 4 cards, gold top border, circular cream icon wells, line icons
   drawn inline (droplet, bilona pot, shield-check, factory).
4. **Categories** — editorial asymmetric grid at ≥1024px: Pulses spans 2 rows tall,
   Ghee spans 2 columns wide, Spices/Oil single cells. Image zoom 1.06 on hover, olive
   gradient scrim for text legibility.
5. **Why choose** — split layout; two overlapping photos (4:5 + 3:4 with ivory border)
   plus an olive seal badge; 6 checkpoint list with gold check circles.
6. **Manufacturing** — 6 numbered steps on gold hairlines with node dots; numbers are
   Marcellus gold (a true sequence, so numbering carries meaning). 3 cols → 2 → 1.
7. **Featured products** — 4 cards; real pack photography on cream media wells; pack
   sizes + "Enquire →" in the card footer.
8. **Certifications** — 5 badge cards with gold hairline borders. *Placeholder:* swap in
   real certificate artwork and FSSAI licence number.
9. **Trust** — 3 testimonial cards, Cormorant italic quotes, oversized gold quote mark.
   *Placeholder:* replace with real attributed quotes before launch.
10. **Story** — dark olive full-bleed; gold-bordered pull quote; mission/vision inline
    with gold lead-ins; farm-photography placeholder panel (4:5).
11. **Stats** — hairline-bounded band; Marcellus numerals count up on first view
    (IntersectionObserver). *Placeholder figures — confirm real numbers.*
12. **CTA banner** — rounded olive panel, sunburst motif, gold button.
13. **Gallery** — CSS-columns masonry (2 cols mobile, 3 desktop) mixing all 8 product
    photos with 3 designed photo-slot placeholders (Farm, Manufacturing, Food & Table).
14. **Contact** — split: info list (real address, phone/WhatsApp and email) + Google Maps
    embed (`.map-embed`) with a "Get directions" link. "Business Inquiry" mailto button.
15. **Footer** — near-black olive; inline ivory seal + wordmark; quick links, product
    links, newsletter (front-end only — wire to a real service), social icons
    (*placeholder hrefs*), gold gradient top hairline.

## 6. Imagery

**In use:** `Assets/pack-<slug>.jpg` — one per SKU (`toor-dal`, `mung-dal`, `chana-dal`,
`udad-dal`, `whole-jeera`, `coriander`, `groundnut-oil`, `ghee`). Each is a **2:3 portrait
crop of the front pack** at 1000×1500, quality-85 JPEG (~200–270 KB). `Assets/pack-<slug>-full.jpg`
is the matching landscape twin-pack shot (front + back label) at 1400 px wide, used only
for `data-full` in the gallery lightbox.

**Masters:** `ProductImages/*.png` are the untouched 1450×1086 renders (~2.5 MB each) with
the front pack on the left and the back pack on the right. Derivatives are generated from
them by cropping a portrait window over the front pack only — the crop must stop before
the back pack's left edge (roughly x = 0.50–0.51 of the width). Re-run that crop from the
masters if the packaging artwork changes; do not reference `ProductImages/` from the site.

Because every photo is now pre-cropped to the front unit at a single ratio, images drop
straight into `object-fit:cover` frames with no per-image CSS. The old `.crop-bottle`
oversize-and-clip utility has been removed.

**Photography to shoot** (replaces the temporary stock images in `Assets/placeholders/`,
wired into `.ph` panels via `.ph-img`): Saurashtra farm/field at golden hour (story +
gallery), manufacturing line (gallery), plated food with tadka (gallery), facility
exterior/clean room, and the in-house testing bench. The Google Maps embed on contact and
home is live.

## 7. Motion

- Scroll reveal: `.reveal` + `--d` inline delay; JS adds `.in` via IntersectionObserver
  (threshold .12, −40px bottom margin). Gated behind `html.js` so no-JS users see
  everything.
- Hero: keyframe rise per line; sun parallax at 0.18× scroll (rAF-throttled).
- Counters: ease-out cubic, 1.8s, fire once at 60% visibility.
- Hover grammar (consistent): cards lift −6px + shadow-2; images zoom 1.05–1.06 over
  .8s; buttons lift −2px; gold ripple on click.
- **All motion is disabled under `prefers-reduced-motion: reduce`.**

## 8. Accessibility & quality floor

- Focus: 2px gold `:focus-visible` outline, 3px offset.
- Mobile menu: `aria-expanded`/`aria-hidden` managed, Escape closes.
- Text on dark ≥ `rgba(247,243,234,.68)`; gold text on light uses `--gold-deep`.
- No horizontal overflow at 390px (verified); breakpoints at 700px and 1024px.
- Only external dependency: Google Fonts. Everything else is self-contained.

## 9. Porting notes (Next.js / React / Angular / Blazor)

- `css/styles.css` is componentizable as-is: each numbered comment block ≈ one component.
  Tokens can move to a theme file untouched.
- Replace IntersectionObserver code with your framework idiom (e.g. a `useReveal` hook /
  Angular directive / Blazor JS interop) — the CSS contract is just "add `.in`".
- **Logo assets:** the site uses the real brand artwork, machine-derived from
  `Assets/SAURAM_logo.png` (black on white): `SAURAM_emblem_ivory.png` +
  `SAURAM_emblem_dark.png` (round seal only — header swaps them via
  `.site-header.scrolled` / `body.menu-open` CSS) and `SAURAM_logo_ivory.png`
  (full lockup with wordmark + tagline — footer). All three are transparent PNGs with
  luminance-mapped alpha, so antialiasing survives on any background. Regenerate from a
  new master by re-running the ColorMatrix recolor (alpha = 1 − luminance; fill = ivory
  `#F7F3EA` or olive `#212A17`).
- Keep `html.js` gating (or SSR-safe equivalent) so content is never hidden without JS.

## 10. Pre-launch checklist (placeholders to replace)

- [ ] Contact address, phone, email (contact section + footer + mailto)
- [ ] FSSAI licence number + real certificate artwork
- [ ] Real testimonials with permission to name
- [ ] Real statistics (years, customers, partners, cities)
- [ ] Farm / manufacturing / food photography into `.ph` slots
- [ ] Google Maps embed
- [ ] Social profile URLs
- [ ] Newsletter form → mailing-list service
- [ ] "Shop Now" / "View Products" → real product or e-commerce pages
