// Build src/brand/logos.ts from the three lockup pages.
// Each option gives: the logomark alone, and the primary wordmark split into
// its two lines (GHATTAS / CLINIC) so a page can colour them separately.
const fs = require("fs");
const { execSync } = require("child_process");

function lockups(svg) {
  execSync(`node split.cjs ${svg} tmp`);
  return JSON.parse(fs.readFileSync("tmp.json", "utf8"));
}

/** Drop the ®: a near-square ring 10–17 units wide, plus whatever sits inside it. */
function dropRegistered(parts) {
  const inside = (a, b) => a.box[0] >= b.box[0] - 0.5 && a.box[1] >= b.box[1] - 0.5 &&
    a.box[0] + a.box[2] <= b.box[0] + b.box[2] + 0.5 && a.box[1] + a.box[3] <= b.box[1] + b.box[3] + 0.5;
  const rings = parts.filter((p) => Math.abs(p.box[2] - p.box[3]) < 1.5 && p.box[2] > 10 && p.box[2] < 17 &&
    parts.some((q) => q !== p && inside(q, p)));
  return parts.filter((p) => !rings.includes(p) && !rings.some((r) => inside(p, r)));
}

function bbox(parts) {
  const x0 = Math.min(...parts.map((p) => p.box[0])), y0 = Math.min(...parts.map((p) => p.box[1]));
  const x1 = Math.max(...parts.map((p) => p.box[0] + p.box[2])), y1 = Math.max(...parts.map((p) => p.box[1] + p.box[3]));
  return { x0, y0, w: x1 - x0, h: y1 - y0 };
}

function shift(d, dx, dy) {
  let i = 0;
  return d.replace(/-?\d+(\.\d+)?/g, (n) => (+(Number(n) - (i++ % 2 === 0 ? dx : dy)).toFixed(2)).toString());
}

function pack(parts) {
  const b = bbox(parts);
  return { w: +b.w.toFixed(2), h: +b.h.toFixed(2), d: parts.map((p) => shift(p.d, b.x0, b.y0)) };
}

function option(svg) {
  const L = lockups(svg);
  const mark = pack(dropRegistered(L.mark.parts));
  const word = dropRegistered(L.primary.parts);
  const b = bbox(word);
  // GHATTAS is the tall top line; CLINIC starts below its baseline.
  const tall = word.filter((p) => p.box[3] > b.h * 0.4);
  const nameBottom = Math.max(...tall.map((p) => p.box[1] + p.box[3]));
  const name = word.filter((p) => p.box[1] < nameBottom - 1);
  const sub = word.filter((p) => p.box[1] >= nameBottom - 1);
  const s = (list) => list.map((p) => shift(p.d, b.x0, b.y0));
  return {
    mark,
    word: { w: +b.w.toFixed(2), h: +b.h.toFixed(2), name: s(name), sub: s(sub), split: +(nameBottom - b.y0).toFixed(2) },
  };
}

const out = { globeSans: option("p10.svg"), globeSerif: option("p12.svg"), arrow: option("p16.svg") };
for (const [k, v] of Object.entries(out)) console.log(k, "mark", v.mark.w, v.mark.h, "word", v.word.w, v.word.h, "split", v.word.split);

const ts = `/**
 * The three logo options from the Ghattas Clinic brand book (ADMEDICA, 2026),
 * extracted as vectors straight from the PDF — not redrawn.
 *
 *   globeSans  — option 01: globe G + flared sans wordmark
 *   globeSerif — option 02: globe G + high-contrast serif wordmark
 *   arrow      — option 03: angular G with the up-arrow / male symbol + extended grotesque
 *
 * The ® is stripped; add it back only where the brand book shows it at print size.
 * Each part stays a separate path: they overlap (the crossbar runs into the
 * ring) and joining them under nonzero fill can cancel the overlap into a hole.
 * Each wordmark is split into its two lines so GHATTAS and CLINIC can take
 * different colours, as the book does on navy (white name, gold sub-line).
 */

export interface Mark { w: number; h: number; d: string[] }
export interface Word { w: number; h: number; name: string[]; sub: string[]; split: number }
export interface LogoOption { mark: Mark; word: Word }

export const LOGOS: Record<"globeSans" | "globeSerif" | "arrow", LogoOption> = ${JSON.stringify(out, null, 2)};
`;
fs.mkdirSync(process.argv[2], { recursive: true });
fs.writeFileSync(`${process.argv[2]}/logos.ts`, ts);
console.log("wrote", `${process.argv[2]}/logos.ts`, ts.length);
