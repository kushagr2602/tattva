#!/usr/bin/env node
// Framing check: does every product photo sit well in the card frame?
// The card is landscape 4:3 with object-fit. A portrait photo shown with the
// default "cover" gets its top and bottom cropped, so this flags any portrait
// photo that isn't marked `fit: "contain"` (which shows it whole on a soft ground).
//
//   node check-framing.mjs            # table
//   node check-framing.mjs --summary  # one line
// Exits 1 if any photo would be badly cropped, so it can gate a commit hook.

import fs from "node:fs";
import path from "node:path";

const ROOT = path.dirname(new URL(import.meta.url).pathname);
const CARD_RATIO = 4 / 3;          // the card frame
const PORTRAIT_MAX = 1.15;         // ratio below this crops too much under "cover"

// --- read JPEG/PNG dimensions from the file header (no dependencies) ---
function dimensions(file) {
  const b = fs.readFileSync(file);
  if (b[0] === 0x89 && b[1] === 0x50) return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) }; // PNG
  if (b[0] === 0xff && b[1] === 0xd8) { // JPEG: walk markers to the SOF frame
    let o = 2;
    while (o < b.length) {
      if (b[o] !== 0xff) { o++; continue; }
      const m = b[o + 1];
      if (m >= 0xc0 && m <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(m)) {
        return { h: b.readUInt16BE(o + 5), w: b.readUInt16BE(o + 7) };
      }
      o += 2 + b.readUInt16BE(o + 2);
    }
  }
  return null;
}

// --- pull id / image / fit out of lib/products.ts (no TS import needed) ---
const src = fs.readFileSync(path.join(ROOT, "lib/products.ts"), "utf8");
const products = [];
const re = /id:\s*"([^"]+)"[\s\S]*?image:\s*"([^"]+)"([\s\S]*?)(?=\n\s*\{|\n\s*\];)/g;
let m;
while ((m = re.exec(src))) {
  const [, id, image, tail] = m;
  const fit = (tail.match(/fit:\s*"(cover|contain)"/) || [])[1] || "cover";
  products.push({ id, image, fit });
}

const rows = [];
let problems = 0;
for (const p of products) {
  const file = path.join(ROOT, "public", p.image);
  if (!fs.existsSync(file)) { rows.push({ ...p, note: "MISSING FILE", bad: true }); problems++; continue; }
  const d = dimensions(file);
  if (!d) { rows.push({ ...p, note: "unreadable", bad: true }); problems++; continue; }
  const ratio = d.w / d.h;
  const recommend = ratio < PORTRAIT_MAX ? "contain" : "cover";
  // crop loss under "cover" in a 4:3 frame
  const loss = ratio >= CARD_RATIO
    ? 1 - CARD_RATIO / ratio           // wide: sides cropped
    : 1 - ratio / CARD_RATIO;          // tall: top/bottom cropped
  const bad = recommend === "contain" && p.fit !== "contain";
  if (bad) problems++;
  rows.push({ ...p, wh: `${d.w}x${d.h}`, ratio: ratio.toFixed(2), loss: Math.round(loss * 100), recommend, bad });
}

if (process.argv.includes("--summary")) {
  console.log(problems === 0
    ? `✓ framing: all ${rows.length} photos framed correctly`
    : `✗ framing: ${problems} photo(s) would be cropped — set fit:"contain" (run: node check-framing.mjs)`);
} else {
  console.log("\n  id                          size       ratio  cover-crop  fit       recommend");
  console.log("  " + "-".repeat(80));
  for (const r of rows) {
    if (r.note) { console.log(`  ${r.id.padEnd(28)}${r.note}`); continue; }
    const flag = r.bad ? " ⚠ FIX" : "";
    console.log(`  ${r.id.padEnd(28)}${(r.wh || "").padEnd(11)}${String(r.ratio).padEnd(7)}${(r.loss + "%").padEnd(12)}${r.fit.padEnd(10)}${r.recommend}${flag}`);
  }
  console.log("");
  console.log(problems === 0
    ? `  ✓ all ${rows.length} photos framed correctly`
    : `  ✗ ${problems} photo(s) need fit:"contain" in lib/products.ts`);
}

process.exit(problems === 0 ? 0 : 1);
