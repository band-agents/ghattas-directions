/**
 * The brand book's palette, as it actually renders.
 *
 * The book prints three hexes (#082741 navy, #e5b335 gold, #fffdfa porcelain)
 * but its swatches and colour grid show something else: the navy swatch
 * renders as #111826, and the gold is a brushed champagne gradient, nowhere
 * near the saturated #e5b335. Everything below was sampled pixel by pixel from
 * the book's own colour-grid page, so the site matches what the client has
 * already approved by eye.
 */

export const NAVY = {
  /** The book's printed spec. Used for the deep end of gradients. */
  spec: "#082742",
  deep: "#05172D",
  blue: "#043356",
  /** Colour grid, lightest to darkest. */
  500: "#5B657C",
  600: "#3C465C",
  700: "#252D42",
  800: "#181E2E",
  850: "#111826", // the "Dark Navi" swatch as rendered
  900: "#0F141D",
} as const;

export const GOLD = {
  /** Colour grid, lightest to darkest. */
  100: "#FBDCB1",
  200: "#F0CD9D",
  300: "#E4BB87",
  400: "#CEA16F",
  500: "#B18156",
  /** The dark end of the book's gold gradient. The only gold that passes
      4.5:1 as text on porcelain, so every gold word on a light ground uses it. */
  ink: "#93643E",
  /** The flat gold of the logo on navy. */
  logo: "#EAC998",
  spec: "#E5B335",
} as const;

export const PORCELAIN = { spec: "#FFFDFA", page: "#F9F9F9" } as const;

/** The brushed-gold diagonal, sampled across the book's gold swatch. */
export const BRUSHED_STOPS: [number, string][] = [
  [0, "#E4C398"], [0.1, "#EECDA2"], [0.2, "#E1BB8C"], [0.32, "#D3A776"], [0.42, "#D5AB7B"],
  [0.52, "#E2BD90"], [0.62, "#F0D1A5"], [0.72, "#E2C093"], [0.82, "#CEA579"], [0.92, "#B8895D"], [1, "#B18153"],
];

export const BRUSHED_CSS = `linear-gradient(118deg, ${BRUSHED_STOPS.map(([o, c]) => `${c} ${o * 100}%`).join(", ")})`;
