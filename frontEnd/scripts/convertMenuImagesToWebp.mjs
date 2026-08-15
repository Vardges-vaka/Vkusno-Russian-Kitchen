// Converts every source .jpg under src/01_assets to a .webp beside it.
// Originals are kept as source files; the app imports only the .webp.
// Run from frontEnd/: node scripts/convertMenuImagesToWebp.mjs
import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const DIRS = [
  "src/01_assets/menuItems/thumbnail",
  "src/01_assets/menuItems/full",
  // The hero background and the Borscht fallback were missed in the first
  // pass and shipped as ~1.5 MB JPEGs each - the hero is the homepage LCP.
  "src/01_assets/images",
  "src/01_assets",
];

// Derived size tier: menu cards render a few hundred pixels wide, but the only
// sizes that existed were 1200x900 (far too big - 9.5 MB across the grid) and
// 100x100 (too small, visibly blurry). 400x300 keeps the 4:3 ratio, is an
// exact third of the source, and still looks sharp on a 2x display.
// Two tiers, not one. A card renders ~250 CSS px, so 400px covers a standard
// display - but at DPR 2-3 (every phone, most laptops) the browser needs
// 500-750px and would otherwise skip straight back to the 1200px original,
// which is the whole problem this is meant to solve. 800px is the 2x step.
const DERIVED = [
  {
    from: "src/01_assets/menuItems/full",
    to: "src/01_assets/menuItems/card",
    width: 400,
    suffix: "(400x300px)",
    replace: /\(1200x900px\)/,
  },
  {
    from: "src/01_assets/menuItems/full",
    to: "src/01_assets/menuItems/card2x",
    width: 800,
    suffix: "(800x600px)",
    replace: /\(1200x900px\)/,
  },
];

// q80 is visually indistinguishable for food photography while cutting
// 40-70% of the weight; thumbnails are 100x100 so quality barely matters.
const QUALITY = 80;

// The hero is a full-bleed background: it never renders wider than a desktop
// viewport, so shipping it at its native size is wasted bytes.
const MAX_WIDTH = {
  "src/01_assets/images": 1920,
  "src/01_assets": 1920,
};

let totalBefore = 0;
let totalAfter = 0;

for (const dir of DIRS) {
  const files = await readdir(dir);
  const jpgs = files.filter((file) => file.toLowerCase().endsWith(".jpg"));
  if (!jpgs.length) {
    console.log(`${dir}: no .jpg files`);
    continue;
  }

  for (const file of jpgs) {
    const source = path.join(dir, file);
    const target = source.replace(/\.jpg$/i, ".webp");

    const pipeline = sharp(source);
    const maxWidth = MAX_WIDTH[dir];
    // withoutEnlargement: never upscale something already smaller.
    if (maxWidth) pipeline.resize({ width: maxWidth, withoutEnlargement: true });

    await pipeline.webp({ quality: QUALITY }).toFile(target);

    totalBefore += (await stat(source)).size;
    totalAfter += (await stat(target)).size;
  }

  console.log(`${dir}: ${jpgs.length} files converted`);
}

const toMb = (bytes) => (bytes / 1024 / 1024).toFixed(1);
console.log(
  `total: ${toMb(totalBefore)} MB (jpg) -> ${toMb(totalAfter)} MB (webp)`,
);

// --- derived tiers, generated from the full-size sources ---
for (const tier of DERIVED) {
  await mkdir(tier.to, { recursive: true });

  const files = (await readdir(tier.from)).filter((file) =>
    file.toLowerCase().endsWith(".jpg"),
  );

  let tierBytes = 0;
  for (const file of files) {
    const target = path.join(
      tier.to,
      file.replace(tier.replace, tier.suffix).replace(/\.jpg$/i, ".webp"),
    );

    await sharp(path.join(tier.from, file))
      .resize({ width: tier.width, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(target);

    tierBytes += (await stat(target)).size;
  }

  console.log(
    `${tier.to}: ${files.length} files at ${tier.width}px -> ${toMb(tierBytes)} MB total`,
  );
}
