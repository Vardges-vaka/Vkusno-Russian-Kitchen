// Generates public/sitemap.xml from the app's own route + menu data.
// Run from frontEnd/: node scripts/generateSitemap.mjs  (wired into prebuild)
//
// Hand-maintaining ~220 URLs would rot within a week, so the dish list is read
// straight out of menuItems.js. Each URL carries xhtml:link alternates for the
// other two languages, which is what tells Google the three are translations
// rather than duplicates.
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// new URL("../") already resolves to frontEnd/; path.dirname on a trailing
// slash would climb one level too far, to the repo root.
const ROOT = fileURLToPath(new URL("../", import.meta.url));
const SITE_URL = "https://vkusno.ae";
const LANGS = ["en", "ru", "ar"];
const STATIC_ROUTES = ["", "menu", "contact", "faq", "privacy"];

// menuItems.js imports images, so it cannot simply be imported here. Pull the
// slug blocks out textually instead - the same approach the audit used.
const readSlugs = async () => {
  const raw = await readFile(
    path.join(ROOT, "src/05_pages/public/menu/04_menu_const/menuItems.js"),
    "utf8",
  );

  // Dishes are taken off the menu by commenting the block out (that is how
  // the drinks were disabled too). Strip comment lines first, or the sitemap
  // advertises URLs for items the kitchen no longer serves - and those pages
  // redirect straight back to /menu.
  const source = raw
    .split(/\r?\n/)
    .filter((line) => !/^\s*\/\//.test(line))
    .join("\n");

  const slugs = [];
  const re = /slug:\s*\{\s*en:\s*"([^"]+)",\s*ru:\s*"([^"]+)",\s*ar:\s*"([^"]+)",?\s*\}/g;
  let match;
  while ((match = re.exec(source))) {
    slugs.push({ en: match[1], ru: match[2], ar: match[3] });
  }
  return slugs;
};

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

const slugs = await readSlugs();
if (!slugs.length) {
  console.error("generateSitemap: no slugs found in menuItems.js - aborting");
  process.exit(1);
}

const entries = [
  ...STATIC_ROUTES.map((route) =>
    entry(Object.fromEntries(LANGS.map((l) => [l, route])), route === "" ? "1.0" : "0.8"),
  ),
  ...slugs.map((slug) =>
    entry(Object.fromEntries(LANGS.map((l) => [l, `menu/${slug[l]}`])), "0.6"),
  ),
];

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
  '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  entries.join("\n"),
  "</urlset>",
  "",
].join("\n");

await writeFile(path.join(ROOT, "public/sitemap.xml"), xml, "utf8");

const total = (STATIC_ROUTES.length + slugs.length) * LANGS.length;
console.log(
  `sitemap.xml: ${total} URLs (${STATIC_ROUTES.length} static + ${slugs.length} dishes) x ${LANGS.length} languages`,
);
