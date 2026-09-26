// Split a lockup page SVG (from extract.cjs) into its four lockups,
// normalised to y-down at the origin. Prints each shape's bbox so the
// registered mark can be told apart from the logo.
const fs = require("fs");
const [, , inSvg, tag] = process.argv;
const src = fs.readFileSync(inSvg, "utf8");
const vb = src.match(/viewBox="([^"]+)"/)[1].split(" ").map(Number);
const [W, H] = [vb[2], vb[3]];
const shapes = [...src.matchAll(/<path d="([^"]+)" fill="([^"]+)"/g)].map((m) => {
  const nums = m[1].match(/-?\d+(\.\d+)?/g).map(Number);
  const xs = [], ys = [];
  for (let i = 0; i < nums.length; i += 2) { xs.push(nums[i]); ys.push(nums[i + 1]); }
  return { d: m[1], fill: m[2], x0: Math.min(...xs), x1: Math.max(...xs), y0: Math.min(...ys), y1: Math.max(...ys) };
}).filter((s) => s.x1 - s.x0 < W * 0.8); // drop the page background

const quads = { vertical: [], horizontal: [], primary: [], mark: [] };
for (const s of shapes) {
  const cx = (s.x0 + s.x1) / 2, cy = (s.y0 + s.y1) / 2; // pdf space, y up
  const top = cy > H / 2, left = cx < W / 2;
  quads[top ? (left ? "vertical" : "horizontal") : (left ? "primary" : "mark")].push(s);
}
const out = {};
for (const [k, list] of Object.entries(quads)) {
  const x0 = Math.min(...list.map((s) => s.x0)), x1 = Math.max(...list.map((s) => s.x1));
  const y0 = Math.min(...list.map((s) => s.y0)), y1 = Math.max(...list.map((s) => s.y1));
  const norm = (d) => {
    let i = 0;
    return d.replace(/-?\d+(\.\d+)?/g, (n) => {
      const v = Number(n);
      const r = i++ % 2 === 0 ? v - x0 : y1 - v;
      return (+r.toFixed(2)).toString();
    });
  };
  out[k] = {
    w: +(x1 - x0).toFixed(2), h: +(y1 - y0).toFixed(2),
    parts: list.map((s) => ({
      d: norm(s.d), fill: s.fill,
      box: [s.x0 - x0, y1 - s.y1, s.x1 - s.x0, s.y1 - s.y0].map((v) => +v.toFixed(1)),
    })),
  };
  console.log(tag, k, out[k].w, out[k].h, list.length, "parts");
  for (const p of out[k].parts) console.log("   ", p.fill, p.box.join(" "));
}
fs.writeFileSync(`${tag}.json`, JSON.stringify(out));
