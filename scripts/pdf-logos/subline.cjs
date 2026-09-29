// Replace the wordmarks' "CLINIC" line with "FOR MEN'S HEALTH", as vector paths.
//
//   node subline.cjs <fonts dir> ../../src/brand/logos.ts
//
// The client dropped "Clinic" from the logo (2026-09-29). Their marketing plan
// shows the approved lockup: GHATTAS over FOR MEN'S HEALTH in a light,
// semi-condensed sans, tracked out to about 70% of the name's width. Options 01
// and 02 take exactly that (Barlow Semi Condensed 500). Option 03 keeps its own
// pairing, where the second line was an italic serif ("Clinic"), so its line is
// set in DM Serif Display Italic.
//
// Needs opentype.js@1.3.4 and the two TTFs (from fonts.googleapis.com css2, which
// serves .ttf to non-browser user agents).

const fs = require("fs");
const path = require("path");
const opentype = require("opentype.js");

const [, , fontsDir, logosPath] = process.argv;
const src = fs.readFileSync(logosPath, "utf8");
const start = src.indexOf("= {") + 2;
const end = src.lastIndexOf("};") + 1;
const LOGOS = JSON.parse(src.slice(start, end));

const sans = opentype.loadSync(path.join(fontsDir, "BarlowSemiCondensed.ttf"));
const ital = opentype.loadSync(path.join(fontsDir, "DMSerifDisplay.ttf"));

/** Lay out `text` so its caps are `cap` tall and it spans exactly `width`. */
function tracked(font, text, cap, width) {
  const size = cap / (font.tables.os2.sCapHeight / font.unitsPerEm);
  const glyphs = font.stringToGlyphs(text);
  const scale = size / font.unitsPerEm;
  let natural = 0;
  glyphs.forEach((g, i) => {
    natural += g.advanceWidth * scale;
    if (i < glyphs.length - 1) natural += font.getKerningValue(g, glyphs[i + 1]) * scale;
  });
  // Tracking is added between glyphs only, so the last letter ends flush.
  const lastSide = (glyphs.at(-1).advanceWidth - glyphs.at(-1).xMax) * scale;
  const track = (width - (natural - lastSide)) / (glyphs.length - 1);
  return { size, glyphs, scale, track };
}

function pathsFor(font, layout, x0, baseline) {
  const out = [];
  let x = x0;
  layout.glyphs.forEach((g, i) => {
    const p = g.getPath(x, baseline, layout.size).toPathData(2);
    if (p) out.push(p);
    x += g.advanceWidth * layout.scale + layout.track;
    if (i < layout.glyphs.length - 1) x += font.getKerningValue(g, layout.glyphs[i + 1]) * layout.scale;
  });
  return out;
}

function bboxOf(ds) {
  const nums = ds.join(" ").match(/-?\d+(\.\d+)?/g).map(Number);
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (let i = 0; i < nums.length; i += 2) {
    x0 = Math.min(x0, nums[i]); x1 = Math.max(x1, nums[i]);
    y0 = Math.min(y0, nums[i + 1]); y1 = Math.max(y1, nums[i + 1]);
  }
  return { x0, y0, x1, y1 };
}

for (const [key, opt] of Object.entries(LOGOS)) {
  const w = opt.word;
  const nameH = w.split;            // GHATTAS runs from 0 to split
  const nameB = bboxOf(w.name);
  const nameW = nameB.x1 - nameB.x0;
  let sub;
  if (key === "arrow") {
    // Italic line, untracked, centred; sized off the old "Clinic" x-height.
    const size = nameH * 0.78;
    const glyphs = ital.stringToGlyphs("for Men's Health");
    const scale = size / ital.unitsPerEm;
    const layout = { size, glyphs, scale, track: 0 };
    const natural = glyphs.reduce((s, g) => s + g.advanceWidth * scale, 0);
    const baseline = nameH + nameH * 0.3 + (ital.tables.os2.sCapHeight / ital.unitsPerEm) * size;
    sub = pathsFor(ital, layout, nameB.x0 + (nameW - natural) / 2, baseline);
  } else {
    const cap = nameH * 0.27;
    const width = nameW * 0.72;
    const layout = tracked(sans, "FOR MEN’S HEALTH", cap, width);
    const baseline = nameH + nameH * 0.42 + cap;
    sub = pathsFor(sans, layout, nameB.x0 + (nameW - width) / 2, baseline);
  }
  const sb = bboxOf(sub);
  const all = bboxOf([...w.name, ...sub]);
  w.sub = sub;
  w.h = +Math.max(all.y1, sb.y1).toFixed(2);
  w.w = +Math.max(w.w, all.x1).toFixed(2);
  console.log(key, "name", nameW.toFixed(1), "x", nameH, "| sub", (sb.x1 - sb.x0).toFixed(1), "x", (sb.y1 - sb.y0).toFixed(1), "| word h", w.h);
}

const header = src.slice(0, start - 2)
  .replace(/ \* Each wordmark is split into its two lines so GHATTAS and CLINIC can take\n \* different colours, as the book does on navy \(white name, gold sub-line\)\./,
    " * Each wordmark is split into its two lines so GHATTAS and the sub-line can take\n * different colours, as the book does on navy (white name, gold sub-line).\n *\n * The sub-line is no longer the book's CLINIC: the client replaced it with\n * FOR MEN'S HEALTH (2026-09-29). scripts/pdf-logos/subline.cjs sets it; rerun it\n * after regenerating from the PDF.");
fs.writeFileSync(logosPath, `${header}= ${JSON.stringify(LOGOS, null, 2)};\n`);
console.log("wrote", logosPath);
