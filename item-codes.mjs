#!/usr/bin/env node
// Print the item-code list. Default: a readable table. `--csv`: comma-separated for a spreadsheet.
//   node item-codes.mjs            # table
//   node item-codes.mjs --csv > item-codes.csv
import fs from "node:fs";
import path from "node:path";

const root = path.dirname(new URL(import.meta.url).pathname);
const products = JSON.parse(fs.readFileSync(path.join(root, "content/products.json"), "utf8"));
products.sort((a, b) => a.code.localeCompare(b.code));

if (process.argv.includes("--csv")) {
  const esc = (s) => `"${String(s).replace(/"/g, '""')}"`;
  console.log("Code,Item,Category");
  for (const p of products) console.log([p.code, p.name, p.category].map(esc).join(","));
} else {
  console.log(`\n  Tattva item codes (${products.length})\n`);
  const w = Math.max(...products.map((p) => p.name.length));
  for (const p of products) console.log(`  ${p.code.padEnd(9)}${p.name.padEnd(w + 3)}${p.category}`);
  console.log("");
}
