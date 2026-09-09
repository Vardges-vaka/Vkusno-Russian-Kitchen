// Generates public/sitemap.xml from the app's own route + menu data.
// Run from frontEnd/: node scripts/generateSitemap.mjs  (wired into prebuild)
//
// Hand-maintaining ~220 URLs would rot within a week, so the dish list is read
// straight out of menuItems.js. Each URL carries xhtml:link alternates for the
// other two languages, which is what tells Google the three are translations
// rather than duplicates.
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readMenuData } from "./readMenuData.mjs";

// new URL("../") already resolves to frontEnd/; path.dirname on a trailing
// slash would climb one level too far, to the repo root.
const ROOT = fileURLToPath(new URL("../", import.meta.url));
const SITE_URL = "https://vkusno.ae";
const LANGS = ["en", "ru", "ar"];
const STATIC_ROUTES = ["", "menu", "contact", "faq", "privacy"];

const urlFor = (lang, route) =>
  route ? `${SITE_URL}/${lang}/${route}` : `${SITE_URL}/${lang}`;

// One <url> per language, each listing all three as alternates.
const entry = (routeByLang, priority) =>
  LANGS.map((lang) => {
    const alternates = LANGS.map(
      (alt) =>
        `    <xhtml:link rel="alternate" hreflang="${alt}" href="${urlFor(alt, routeByLang[alt])}"/>`,
    ).join("\n");

    return [
      "  <url>",
      `    <loc>${urlFor(lang, routeByLang[lang])}</loc>`,
      alternates,
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${urlFor("en", routeByLang.en)}"/>`,
      `    <priority>${priority}</priority>`,
      "  </url>",
    ].join("\n");
  }).join("\n");

export const createSitemap = (menuItems) => {
  const entries = [
    ...STATIC_ROUTES.map((route) =>
      entry(Object.fromEntries(LANGS.map((l) => [l, route])), route === "" ? "1.0" : "0.8"),
    ),
    ...menuItems.map(({ slug }) =>
      entry(Object.fromEntries(LANGS.map((l) => [l, `menu/${slug[l]}`])), "0.6"),
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
  await writeFile(path.join(ROOT, "public/sitemap.xml"), createSitemap(MenuItems), "utf8");

  const total = (STATIC_ROUTES.length + MenuItems.length) * LANGS.length;
  console.log(
    `sitemap.xml: ${total} URLs (${STATIC_ROUTES.length} static + ${MenuItems.length} dishes) x ${LANGS.length} languages`,
  );
}
