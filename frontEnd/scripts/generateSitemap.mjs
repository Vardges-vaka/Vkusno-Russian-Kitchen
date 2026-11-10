// Generates public/sitemap.xml from the app's own route + menu data.
// Run from frontEnd/: node scripts/generateSitemap.mjs  (wired into prebuild)
//
// Hand-maintaining ~220 URLs would rot within a week, so the dish list is read
// straight out of menuItems.js. Each URL carries xhtml:link alternates for the
// other two languages, which is what tells Google the three are translations
// rather than duplicates.
//
// <lastmod> is the day that page's words last changed, not the day the file
// was generated. Dates live in sitemap-lastmod.json (see sitemapDates.mjs).
//
// Dish photos are added only after the Vite build. Before that, an imported
// photo is still a /src/ path. The build gives it a real /assets/ address,
// and the second sitemap run writes that address next to the dish page.
import { readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readCareersData } from "./readCareersData.mjs";
import { readMenuData } from "./readMenuData.mjs";
import { buildSitemapDates, readSitemapLedger, writeSitemapLedger } from "./sitemapDates.mjs";

// new URL("../") already resolves to frontEnd/; path.dirname on a trailing
// slash would climb one level too far, to the repo root.
const ROOT = fileURLToPath(new URL("../", import.meta.url));
const SITE_URL = "https://vkusno.ae";
const LANGS = ["en", "ru", "ar"];
const STATIC_ROUTES = ["", "menu", "contact", "careers", "faq", "privacy"];

const urlFor = (lang, route) =>
  route ? `${SITE_URL}/${lang}/${route}` : `${SITE_URL}/${lang}`;

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const MANIFEST_PATH = path.join(ROOT, "dist/.vite/manifest.json");

const escapeXml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

// /src/ paths exist only inside the dev server. A published sitemap must
// point at the built file under /assets/.
export const sitemapPhotoUrl = (value) => {
  if (typeof value !== "string" || value.length === 0) return null;
  if (value.includes("/src/")) return null;
  if (value.startsWith("https://vkusno.ae/assets/")) return escapeXml(value);
  if (value.startsWith("/assets/")) return escapeXml(`${SITE_URL}${encodeURI(value)}`);
  return null;
};

const photoFor = (item) => {
  const loc = sitemapPhotoUrl(item.sitemapImage ?? item.images?.full);
  if (!loc) return null;
  return Object.fromEntries(
    LANGS.map((lang) => [
      lang,
      {
        loc,
        title: item.name?.[lang] || item.name?.en || "",
        caption: item.description?.short?.[lang] || item.description?.short?.en || "",
      },
    ]),
  );
};

// The manifest key is the source path. Vite's dev URL percent-encodes spaces.
const productionPhoto = (srcUrl, manifest) => {
  if (typeof srcUrl !== "string" || !srcUrl.startsWith("/src/")) return null;
  const built = manifest[decodeURIComponent(srcUrl.slice(1))]?.file;
  if (!built) return null;
  return `${SITE_URL}/${encodeURI(built)}`;
};

// dates is null for callers that only care about the URL list. The real
// sitemap always passes one date per URL.
const requireDate = (dates, lang, route) => {
  const lastmod = dates[`${lang}|${route}`];
  if (!ISO_DATE.test(lastmod ?? "")) {
    throw new Error(`Missing sitemap lastmod for ${urlFor(lang, route)}`);
  }
  return lastmod;
};

const imageBlock = (image) => {
  if (!image?.loc) return [];
  const lines = ["    <image:image>", `      <image:loc>${image.loc}</image:loc>`];
  if (image.title) lines.push(`      <image:title>${escapeXml(image.title)}</image:title>`);
  if (image.caption) lines.push(`      <image:caption>${escapeXml(image.caption)}</image:caption>`);
  lines.push("    </image:image>");
  return lines;
};

// One <url> per language, each listing all three as alternates.
const entry = (routeByLang, priority, dates, photos) =>
  LANGS.map((lang) => {
    const route = routeByLang[lang];
    const alternates = LANGS.map(
      (alt) =>
        `    <xhtml:link rel="alternate" hreflang="${alt}" href="${urlFor(alt, routeByLang[alt])}"/>`,
    ).join("\n");

    const lines = [
      "  <url>",
      `    <loc>${urlFor(lang, route)}</loc>`,
      alternates,
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${urlFor("en", routeByLang.en)}"/>`,
      ...imageBlock(photos?.[lang]),
    ];
    if (dates) lines.push(`    <lastmod>${requireDate(dates, lang, route)}</lastmod>`);
    lines.push(`    <priority>${priority}</priority>`, "  </url>");
    return lines.join("\n");
  }).join("\n");

export const createSitemap = (menuItems, jobs = [], dates = null) => {
  const entries = [
    ...STATIC_ROUTES.map((route) =>
      entry(
        Object.fromEntries(LANGS.map((l) => [l, route])),
        route === "" ? "1.0" : "0.8",
        dates,
      ),
    ),
    ...menuItems.map((item) =>
      entry(
        Object.fromEntries(LANGS.map((l) => [l, `menu/${item.slug[l]}`])),
        "0.6",
        dates,
        photoFor(item),
      ),
    ),
    // The job id is the same in every language, unlike a dish slug.
    ...jobs.map(({ id }) =>
      entry(
        Object.fromEntries(LANGS.map((l) => [l, `careers/${id}`])),
        "0.5",
        dates,
      ),
    ),
  ];

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:xhtml="http://www.w3.org/1999/xhtml"',
    '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    entries.join("\n"),
    "</urlset>",
    "",
  ].join("\n");
};

// The active export is the same list used by the app. An entirely disabled
// menu is valid: the sitemap then contains only the site's static routes.
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { MenuItems } = await readMenuData();
  const { JOBS, CAREERS_COMMON } = await readCareersData();
  let manifest = null;
  try {
    manifest = JSON.parse(await readFile(MANIFEST_PATH, "utf8"));
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
  }
  const menuItems = manifest
    ? MenuItems.map((item) => ({
        ...item,
        sitemapImage: productionPhoto(item.images?.full, manifest),
      }))
    : MenuItems;
  if (manifest) {
    const withPhoto = menuItems.filter((item) => item.sitemapImage).length;
    if (withPhoto !== MenuItems.length) {
      throw new Error(`Sitemap photos resolved ${withPhoto} of ${MenuItems.length} dishes`);
    }
  }
  const today = new Date().toISOString().slice(0, 10);
  const { dates, ledger } = await buildSitemapDates({
    langs: LANGS,
    staticRoutes: STATIC_ROUTES,
    menuItems,
    jobs: JOBS,
    common: CAREERS_COMMON,
    ledger: await readSitemapLedger(),
    today,
  });
  await writeSitemapLedger(ledger);
  const xml = createSitemap(menuItems, JOBS, dates);
  await writeFile(path.join(ROOT, "public/sitemap.xml"), xml, "utf8");
  // Vite already copied the pre-build sitemap into dist. Replace that copy
  // once the photo addresses exist, then drop the manifest so it is not published.
  if (manifest) {
    await writeFile(path.join(ROOT, "dist/sitemap.xml"), xml, "utf8");
    await rm(MANIFEST_PATH, { force: true });
  }

  const total = (STATIC_ROUTES.length + MenuItems.length + JOBS.length) * LANGS.length;
  const photos = manifest ? MenuItems.length : 0;
  console.log(
    `sitemap.xml: ${total} URLs (${STATIC_ROUTES.length} static + ${MenuItems.length} dishes + ${JOBS.length} jobs) x ${LANGS.length} languages${photos ? `, ${photos} dish photos` : ""}`,
  );
}
