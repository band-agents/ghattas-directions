// Turn the single-file Vite build into an artifact page: the host wraps the
// file in its own <html>/<head>/<body>, so we emit only the contents — title
// first (the host scans the first 8 KB for it), then fonts, styles, the root
// and the script.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const src = readFileSync("dist-single/index.html", "utf8");
const pick = (re) => [...src.matchAll(re)].map((m) => m[0]);

const title = pick(/<title>[\s\S]*?<\/title>/g)[0];
const links = pick(/<link[^>]+fonts\.(googleapis|gstatic)[^>]*>/g);
const styles = pick(/<style[^>]*>[\s\S]*?<\/style>/g);
const scripts = pick(/<script[^>]*>[\s\S]*?<\/script>/g);
if (!title || !styles.length || !scripts.length) throw new Error("build output not as expected");

const out = [title, ...links, ...styles, '<div id="root"></div>', ...scripts].join("\n");
mkdirSync("dist-artifact", { recursive: true });
writeFileSync("dist-artifact/ghattas-directions.html", out);
console.log("dist-artifact/ghattas-directions.html", (out.length / 1024).toFixed(0), "KB",
  { links: links.length, styles: styles.length, scripts: scripts.length });
