// One-off converter: creates a .webp next to every menu .jpg.
// Originals are kept as source files; the app imports only the .webp.
// Run from frontEnd/: node scripts/convertMenuImagesToWebp.mjs
import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const DIRS = [
  "src/01_assets/menuItems/thumbnail",
  "src/01_assets/menuItems/full",
];

// q80 is visually indistinguishable for food photography while cutting
// 40-70% of the weight; thumbnails are 100x100 so quality barely matters.
const QUALITY = 80;

let totalBefore = 0;
let totalAfter = 0;

for (const dir of DIRS) {
  const files = await readdir(dir);
  const jpgs = files.filter((file) => file.toLowerCase().endsWith(".jpg"));

  for (const file of jpgs) {
    const source = path.join(dir, file);
    const target = source.replace(/\.jpg$/i, ".webp");

    await sharp(source).webp({ quality: QUALITY }).toFile(target);

    totalBefore += (await stat(source)).size;
    totalAfter += (await stat(target)).size;
  }

  console.log(`${dir}: ${jpgs.length} files converted`);
}

const toMb = (bytes) => (bytes / 1024 / 1024).toFixed(1);
console.log(
  `total: ${toMb(totalBefore)} MB (jpg) -> ${toMb(totalAfter)} MB (webp)`,
);
