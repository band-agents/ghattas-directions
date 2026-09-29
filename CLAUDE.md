# Ghattas Clinic — website directions (round 2)

Three homepage directions for Ghattas Clinic (formerly "Elite Clinic", see ~/elite-clinic),
built on the client's brand book `Downloads/GC - Brand Elements Presentation.pdf` (ADMEDICA 2026).

- `npm run dev` → http://localhost:5196 (`ghattas-directions` in ~/.claude/launch.json)
- `npm run build:single` → `dist-single/index.html`, one self-contained file (~1 MB)
- `node scripts/to-artifact.mjs` → `dist-artifact/ghattas-directions.html` (no html/head/body, for the Artifact host)

Routes are bare hash tokens: `#overview` (default) · `#nocturne` (A) · `#porcelain` (B) · `#ascend` (C).
In-page links must use `scrollToId`, never `#anchors`, or they overwrite the route.

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
- **Every section follows `HIERARCHY` in content.ts**, same order in all three.
- Remotion compositions in `src/remotion/` run live via `@remotion/player` (`LivePlayer`). Each loops
  seamlessly by construction; entrances are done by the page, not the composition.
- `dr-portrait.webp` is cut at mid-thigh: only inside a frame that visibly does the cropping.
  `dr-seated.webp` is the complete figure and the only one that may float free.

## Deploy
Public repo `band-agents/ghattas-directions`. `npm run deploy:pages` builds and force-pushes the
output to `gh-pages` → https://band-agents.github.io/ghattas-directions/ (noindex meta is in index.html).
