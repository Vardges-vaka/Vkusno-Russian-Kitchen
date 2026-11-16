// Converts every source .jpg under src/01_assets to a .webp beside it.
// Originals are kept as source files; the app imports only the .webp.
// Run from frontEnd/: node scripts/convertMenuImagesToWebp.mjs
import { mkdir, readdir, stat, writeFile } from "node:fs/promises";
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

// The 1200x900 dish photos are the heaviest thing a dish page loads. At q80
// they averaged 143 KB and the busiest (Mixed Grill) was 280 KB. Each one is
// now saved at the highest quality, from 80 down to 60, that fits in 100 KB.
// A photo too detailed to fit even at 60 stays at 60 and is simply heavier:
// below that the meat and bread start to look soft, and the food has to look
// the same. The card tiers below are made from the .jpg, so they do not change.
const FULL_DIR = "src/01_assets/menuItems/full";
const FULL_MAX_BYTES = 100 * 1024;
const FULL_MIN_QUALITY = 60;
// effort 6 packs the same picture a few percent smaller (slower to make, the
// same to look at). smartSubsample keeps red and green edges crisp at lower
// quality - tomato on lavash, herbs on borscht.
const FULL_OPTIONS = { effort: 6, smartSubsample: true };

// The hero is a full-bleed background: it never renders wider than a desktop
// viewport, so shipping it at its native size is wasted bytes.
const MAX_WIDTH = {
  "src/01_assets/images": 1920,
  "src/01_assets": 1920,
};

// The homepage hero is the first and biggest picture the homepage needs. It
// is shown enlarged under a dark layer (Home.css, .Home_hero_overlay: 50-70%
// black), which hides fine detail, so q40 halves the file (280 KB -> 139 KB)
// and looks the same there. Do not reuse this for a picture shown as it is.
const HERO_DIR = "src/01_assets/images";
const HERO_OPTIONS = { quality: 40, effort: 6, smartSubsample: true };

// App logos are drawn at 26-32 px. These two were 500x500 PNGs of about
// 200 KB each. A 128 px WebP is 2-3 KB and looks the same at that size.
// The .png stays as the source; the app imports the .webp beside it.
const SMALL_LOGOS = [
  "src/01_assets/aggregatorLogos/Noon_Logo.png",
  "src/01_assets/socialLogos/WhatsApp_Logo.png",
];
const LOGO_WIDTH = 128;

// The bytes to write for one 1200x900 dish photo, and the quality they use.
const encodeFullPhoto = async (source) => {
  // A photo that already fits at the plain q80 keeps exactly the bytes it had
  // before the cap existed, so the light photos do not change at all.
  const plain = await sharp(source).webp({ quality: QUALITY }).toBuffer();
  if (plain.length <= FULL_MAX_BYTES) return { buffer: plain, quality: QUALITY };

  const at = (quality) =>
    sharp(source).webp({ quality, ...FULL_OPTIONS }).toBuffer();

  const lowest = await at(FULL_MIN_QUALITY);
  if (lowest.length > FULL_MAX_BYTES) {
    return { buffer: lowest, quality: FULL_MIN_QUALITY };
  }

  // The file grows with quality, so halve the range until the best fit is left.
  let fits = FULL_MIN_QUALITY;
  let best = lowest;
  let highest = QUALITY;
  while (fits < highest) {
    const middle = Math.ceil((fits + highest) / 2);
    const buffer = await at(middle);
    if (buffer.length <= FULL_MAX_BYTES) {
      fits = middle;
      best = buffer;
    } else {
      highest = middle - 1;
    }
  }
  return { buffer: best, quality: fits };
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

  // Only filled for the 1200x900 dish photos.
  const fullPhotos = { plain: 0, fitted: 0, heavy: [] };

  for (const file of jpgs) {
    const source = path.join(dir, file);
    const target = source.replace(/\.jpg$/i, ".webp");

    if (dir === FULL_DIR) {
      const { buffer, quality } = await encodeFullPhoto(source);
      await writeFile(target, buffer);
      if (buffer.length > FULL_MAX_BYTES) {
        fullPhotos.heavy.push(`${file} ${Math.round(buffer.length / 1024)} KB`);
      } else if (quality === QUALITY) {
        fullPhotos.plain += 1;
      } else {
        fullPhotos.fitted += 1;
      }
    } else {
      const pipeline = sharp(source);
      const maxWidth = MAX_WIDTH[dir];
      // withoutEnlargement: never upscale something already smaller.
      if (maxWidth) {
        pipeline.resize({ width: maxWidth, withoutEnlargement: true });
      }

      await pipeline
        .webp(dir === HERO_DIR ? HERO_OPTIONS : { quality: QUALITY })
        .toFile(target);
    }

    totalBefore += (await stat(source)).size;
    totalAfter += (await stat(target)).size;
  }

  console.log(`${dir}: ${jpgs.length} files converted`);
  if (dir === FULL_DIR) {
    const cap = FULL_MAX_BYTES / 1024;
    console.log(
      `  ${fullPhotos.plain} at q${QUALITY}, ` +
        `${fullPhotos.fitted} lowered to fit ${cap} KB, ` +
        `${fullPhotos.heavy.length} still over ${cap} KB at q${FULL_MIN_QUALITY}`,
    );
    for (const line of fullPhotos.heavy) console.log(`    ${line}`);
  }
}

const toMb = (bytes) => (bytes / 1024 / 1024).toFixed(1);
console.log(
  `total: ${toMb(totalBefore)} MB (jpg) -> ${toMb(totalAfter)} MB (webp)`,
);

// --- small logos ---
let logoBytes = 0;
for (const source of SMALL_LOGOS) {
  const target = source.replace(/\.png$/i, ".webp");
  await sharp(source)
    .resize({ width: LOGO_WIDTH, withoutEnlargement: true })
    .webp({ quality: 90, effort: 6, smartSubsample: true })
    .toFile(target);
  logoBytes += (await stat(target)).size;
}
console.log(
  `small logos: ${SMALL_LOGOS.length} files at ${LOGO_WIDTH}px -> ${(logoBytes / 1024).toFixed(1)} KB total`,
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
