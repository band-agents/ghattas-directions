# Ghattas Clinic — website directions (round 2)

Three homepage directions for Ghattas Clinic (formerly "Elite Clinic", see ~/elite-clinic),
built on the client's brand book `Downloads/GC - Brand Elements Presentation.pdf` (ADMEDICA 2026).

- `npm run dev` → http://localhost:5196 (`ghattas-directions` in ~/.claude/launch.json)
- `npm run build:single` → `dist-single/index.html`, one self-contained file (~1 MB)
- `node scripts/to-artifact.mjs` → `dist-artifact/ghattas-directions.html` (no html/head/body, for the Artifact host)

**Multi-page since 2026-09-29.** Routes are `#<direction>/<page>` (`src/lib/routes.ts`): `#overview`, then
`#nocturne`, `#nocturne/book`, `#porcelain/specialties`… Eight pages per direction, defined once in
`PAGES` in content.ts (home, book, private, specialties, international, doctor, journal, contact); the
four core services each own one. The switcher keeps the page when changing direction. In-page jumps
must use `scrollToId`, never `#anchors`, or they overwrite the route.

`src/kit/` holds the shared booking wizard and contact form. They draw in each direction's look
through `--kit-*` variables set on the direction root, and take its button classes via `ui`.
Both are demos and say so on confirmation.

## Rules
- **Second source:** `Downloads/Ghattas_Clinic_Marketing_Plan final.pdf` gives the slogan ("A New
  Perspective on Men's Health"), bio, the four core services (`CORE_SERVICES`) and the Men's Health &
  Beyond specialties (`SPECIALTIES`). Summaries it doesn't give are marked `/* ours */`.
- **Copy lives only in `src/content.ts`.** The three directions share it so the client compares
  design, not words. `BOOK` is the brand book's own language; everything else is PLACEHOLDER.
- **Logos are vectors extracted from the PDF** (`src/brand/logos.ts`, generated — do not hand-edit).
  Option 01 → A, 02 → B, 03 → C. **The book's CLINIC line is gone** (client, 2026-09-29): the
  sub-line is FOR MEN'S HEALTH, typeset by `scripts/pdf-logos/subline.cjs` (Barlow Semi Condensed
  for 01/02, matching the marketing plan's approved lockup; DM Serif italic for 03). Rerun it after
  any regeneration from the PDF. Parts stay separate paths: joined under nonzero fill the
  crossbar/ring overlap cancels into a hole.
- **Colours are sampled from the book's swatch pages, not its printed hexes** (`src/brand/tokens.ts`).
  The printed gold #E5B335 is not what the book shows; the swatch is a brushed champagne gradient.
  Gold text on light grounds is always `GOLD.ink` #93643E (the only gold passing 4.5:1).
- **Every page follows `PAGES` in content.ts**, same sections in all three. The overview's page-by-page
  table is generated from it.
- **Urology and Fertility are gone** (client, 2026-09-29): the core specialties are Andrology and Sexual
  Health only. Do not bring them back in copy, glyph labels, articles or reviews. Dr. Ghattas' title
  ("Consultant Urologist & Andrologist") is still shown on the doctor caption, pending the client.
- Remotion compositions in `src/remotion/` run live via `@remotion/player` (`LivePlayer`). Each loops
  seamlessly by construction; entrances are done by the page, not the composition.
- `dr-portrait.webp` is cut at mid-thigh: only inside a frame that visibly does the cropping.
  `dr-seated.webp` is the complete figure and the only one that may float free.

## Deploy
Public repo `band-agents/ghattas-directions`. `npm run deploy:pages` builds and force-pushes the
output to `gh-pages` → https://band-agents.github.io/ghattas-directions/ (noindex meta is in index.html).
