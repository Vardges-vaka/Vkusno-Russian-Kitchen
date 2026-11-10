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
import { writeFile } from "node:fs/promises";
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

// dates is null for callers that only care about the URL list. The real
// sitemap always passes one date per URL.
const requireDate = (dates, lang, route) => {
  const lastmod = dates[`${lang}|${route}`];
  if (!ISO_DATE.test(lastmod ?? "")) {
    throw new Error(`Missing sitemap lastmod for ${urlFor(lang, route)}`);
  }
  return lastmod;
};

// One <url> per language, each listing all three as alternates.
const entry = (routeByLang, priority, dates) =>
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
    ...menuItems.map(({ slug }) =>
      entry(
        Object.fromEntries(LANGS.map((l) => [l, `menu/${slug[l]}`])),
        "0.6",
        dates,
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
    '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
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
  const today = new Date().toISOString().slice(0, 10);
  const { dates, ledger } = await buildSitemapDates({
    langs: LANGS,
    staticRoutes: STATIC_ROUTES,
    menuItems: MenuItems,
    jobs: JOBS,
    common: CAREERS_COMMON,
    ledger: await readSitemapLedger(),
    today,
  });
  await writeSitemapLedger(ledger);
  await writeFile(
    path.join(ROOT, "public/sitemap.xml"),
    createSitemap(MenuItems, JOBS, dates),
    "utf8",
  );

  const total = (STATIC_ROUTES.length + MenuItems.length + JOBS.length) * LANGS.length;
  console.log(
    `sitemap.xml: ${total} URLs (${STATIC_ROUTES.length} static + ${MenuItems.length} dishes + ${JOBS.length} jobs) x ${LANGS.length} languages`,
  );
}
