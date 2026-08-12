# Temporary placeholder imagery

Every file in this folder is a **stand-in**. They exist so the layout can be reviewed with
real photographs in place — none of them show MK Enterprise, its facility, its people or its
products. Replace them with SAURAM's own photography before launch and this folder can be
deleted.

## How they're wired in

Photo slots keep their designed `.ph` panel and gain an image on top:

```html
<div class="ph ph-tall">
  <img class="ph-img" src="Assets/placeholders/farm-sunrise.jpg" alt="…" loading="lazy">
</div>
```

- `.ph-img` — fills the panel (`object-fit: cover`)
- `.ph-img-contain` — letterboxes instead (used for the base maps)
- `.ph-cap` — small caption strip over the image (used in the manufacturing step panels)

If an image is missing or fails to load, the original cream/olive/kraft gradient panel shows
through, so nothing breaks. To swap in a real photo, change the `src` (and the `alt`) — no
CSS changes needed. In `js/pages.js`, the product "Lifestyle" and "Texture" thumbnails also
point at two files here.

## Where each file is used

| File | Used on |
| --- | --- |
| `farm-sunrise.jpg` | `index.html` story panel, `gallery.html` (Harvest Season) |
| `farm-rows.jpg` | `index.html` gallery (Farm & Harvest), `gallery.html` (Fields of Saurashtra) |
| `produce-market.jpg` | `manufacturing.html` step 1 (Farm & Mandi) |
| `spice-market.jpg` | `manufacturing.html` step 2 (Cleaning Line) |
| `spices-flatlay.jpg` | `manufacturing.html` step 3 (Grading & Sorting), product "Texture" thumb |
| `lab-bench.jpg` | `manufacturing.html` step 6 (Quality Bench) |
| `lab-team.jpg` | `manufacturing.html` (Hygiene & Safety), `quality.html` (Laboratory) |
| `warehouse-aisle.jpg` | `manufacturing.html` step 7 + `about.html` facility panel, `index.html` gallery |
| `warehouse-boxes.jpg` | `manufacturing.html` step 8 + facility grid |
| `thali-bowls.jpg` | `gallery.html` (The Thali) |
| `curry-bowl.jpg` | `index.html` gallery (Food & Table) |
| `tadka-pan.jpg` | `gallery.html` (Tadka Moment), product "Lifestyle" thumb |
| `map-world.png` | `export.html` — blank base map, corridors still to be drawn |
| `map-india.png` | `distributor.html` — blank base map, territories still to be marked |

## Sources & licences

- Photographs: **Unsplash** (Unsplash License — free for commercial use, no attribution
  required). Fetched at 1400–1600 px, quality 70.
- `map-world.png`: Wikimedia Commons, *BlankMap-World.svg* — **public domain**.
- `map-india.png`: Wikimedia Commons, *India location map.svg* — **CC BY-SA 3.0**. If this
  map ships to production it needs attribution and share-alike compliance; the intent is to
  replace it with a purpose-built coverage map.

## Slots deliberately left as designed placeholders

These were **not** filled, because a stock image there would misrepresent the business:

- Certificate / licence scans and the records shelf (`certifications.html`) — stock images
  would read as fabricated credentials.
- The two unnamed team portraits (`about.html` — Quality Lead, Sales & Partnerships) — no
  stand-in faces. The co-founders' own portraits live in `Assets/team/`, not here.
- The two video slots (`gallery.html`) — a still would imply a video exists.
- The oil-press and packing-line slots (`export.html`, `quality.html`, `manufacturing.html`
  steps 4–5 + facility grid, `gallery.html`) — the stock photos formerly here (`oil-bottle.jpg`,
  `kraft-packs.jpg`) showed a different product (olive oil, not groundnut oil) and, in the
  packing-line shot, a visible third-party brand logo on the boxes. Both were removed rather
  than replaced with another stock substitute.
