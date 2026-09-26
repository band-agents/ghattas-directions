// Dump every filled/stroked path on a PDF page to an SVG in page space.
// usage: node extract.cjs <pdf> <page1based> <out.svg>
const fs = require("fs");
const pdfjs = require("pdfjs-dist/legacy/build/pdf.js");
const { OPS } = pdfjs;

const [, , file, pageNo, out] = process.argv;

const mul = (m, n) => [
  m[0] * n[0] + m[2] * n[1], m[1] * n[0] + m[3] * n[1],
  m[0] * n[2] + m[2] * n[3], m[1] * n[2] + m[3] * n[3],
  m[0] * n[4] + m[2] * n[5] + m[4], m[1] * n[4] + m[3] * n[5] + m[5],
];
const ap = (m, x, y) => [m[0] * x + m[2] * y + m[4], m[1] * x + m[3] * y + m[5]];
const f = (v) => +v.toFixed(3);

(async () => {
  const doc = await pdfjs.getDocument({ data: new Uint8Array(fs.readFileSync(file)), disableFontFace: true }).promise;
  const page = await doc.getPage(+pageNo);
  const vp = page.getViewport({ scale: 1 });
  const ol = await page.getOperatorList();
  let ctm = [1, 0, 0, 1, 0, 0];
  let fill = "#000", stroke = "#000", lw = 1;
  const stack = [];
  let d = ""; let cur = [0, 0];
  const shapes = [];
  let counts = {};
  for (let i = 0; i < ol.fnArray.length; i++) {
    const fn = ol.fnArray[i], a = ol.argsArray[i];
    const name = Object.keys(OPS).find((k) => OPS[k] === fn);
    counts[name] = (counts[name] || 0) + 1;
    switch (fn) {
      case OPS.save: stack.push({ ctm, fill, stroke, lw }); break;
      case OPS.restore: ({ ctm, fill, stroke, lw } = stack.pop() || { ctm, fill, stroke, lw }); break;
      case OPS.transform: ctm = mul(ctm, a); break;
      case OPS.paintFormXObjectBegin: stack.push({ ctm, fill, stroke, lw }); if (a[0]) ctm = mul(ctm, a[0]); break;
      case OPS.paintFormXObjectEnd: ({ ctm, fill, stroke, lw } = stack.pop()); break;
      case OPS.setLineWidth: lw = a[0]; break;
      case OPS.setFillRGBColor: fill = typeof a[0] === "string" ? a[0] : `rgb(${a.join(",")})`; break;
      case OPS.setStrokeRGBColor: stroke = typeof a[0] === "string" ? a[0] : `rgb(${a.join(",")})`; break;
      case OPS.setFillGray: fill = typeof a[0] === "string" ? a[0] : `rgb(${a[0] * 255},${a[0] * 255},${a[0] * 255})`; break;
      case OPS.setFillCMYKColor: fill = typeof a[0] === "string" ? a[0] : "#f0f"; break;
      case OPS.constructPath: {
        const [ops, args] = a;
        let j = 0;
        for (const op of ops) {
          if (op === OPS.moveTo) { const [x, y] = ap(ctm, args[j++], args[j++]); d += `M${f(x)} ${f(y)}`; cur = [x, y]; }
          else if (op === OPS.lineTo) { const [x, y] = ap(ctm, args[j++], args[j++]); d += `L${f(x)} ${f(y)}`; cur = [x, y]; }
          else if (op === OPS.curveTo) {
            const p = []; for (let k = 0; k < 3; k++) p.push(...ap(ctm, args[j++], args[j++]));
            d += `C${p.map(f).join(" ")}`; cur = [p[4], p[5]];
          } else if (op === OPS.curveTo2) { // v: first control = current point
            const p = []; for (let k = 0; k < 2; k++) p.push(...ap(ctm, args[j++], args[j++]));
            d += `C${f(cur[0])} ${f(cur[1])} ${p.map(f).join(" ")}`; cur = [p[2], p[3]];
          } else if (op === OPS.curveTo3) { // y: second control = end
            const p = []; for (let k = 0; k < 2; k++) p.push(...ap(ctm, args[j++], args[j++]));
            d += `C${f(p[0])} ${f(p[1])} ${f(p[2])} ${f(p[3])} ${f(p[2])} ${f(p[3])}`; cur = [p[2], p[3]];
          } else if (op === OPS.closePath) d += "Z";
          else if (op === OPS.rectangle) {
            const x = args[j++], y = args[j++], w = args[j++], h = args[j++];
            const pts = [[x, y], [x + w, y], [x + w, y + h], [x, y + h]].map(([px, py]) => ap(ctm, px, py));
            d += `M${pts.map(([px, py]) => `${f(px)} ${f(py)}`).join("L")}Z`;
          }
        }
        break;
      }
      case OPS.fill: case OPS.eoFill: case OPS.fillStroke: case OPS.eoFillStroke:
        shapes.push({ d, fill, rule: fn === OPS.eoFill || fn === OPS.eoFillStroke ? "evenodd" : "nonzero" }); d = ""; break;
      case OPS.stroke: case OPS.closeStroke:
        shapes.push({ d, stroke, lw: lw * Math.hypot(ctm[0], ctm[1]) }); d = ""; break;
      case OPS.endPath: d = ""; break;
    }
  }
  const [x0, y0, x1, y1] = vp.viewBox;
  // PDF y goes up; flip into SVG space.
  const body = shapes.map((s) => s.fill
    ? `<path d="${s.d}" fill="${s.fill}" fill-rule="${s.rule}"/>`
    : `<path d="${s.d}" fill="none" stroke="${s.stroke}" stroke-width="${f(s.lw)}"/>`).join("\n");
  fs.writeFileSync(out, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${x0} ${y0} ${x1 - x0} ${y1 - y0}"><g transform="matrix(1 0 0 -1 0 ${y1 + y0})">\n${body}\n</g></svg>`);
  console.log(out, shapes.length, "shapes", JSON.stringify(counts));
})();
