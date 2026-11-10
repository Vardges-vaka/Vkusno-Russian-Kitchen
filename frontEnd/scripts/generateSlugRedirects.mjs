// Writes the dish-slug redirects into vercel.json.
// Run from frontEnd/: node scripts/generateSlugRedirects.mjs  (wired into prebuild)
//
// /ru/menu/russian-borscht is the English slug on the Russian page. The React
// page already swaps that for /ru/menu/borshch, but only after JavaScript runs.
// A robot that does not run JavaScript keeps the wrong address as a second
// copy of the dish. These rules send the wrong address to the right one
// before the app loads. The language in the address stays the same.
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readMenuData } from "./readMenuData.mjs";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const VERCEL_PATH = path.join(ROOT, "vercel.json");
const LANGS = ["en", "ru", "ar"];

// Vercel treats a redirect source as a path pattern. A slug with ":" or "*"
// would become a wildcard. The menu slugs are plain words, so reject anything else.
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

// Hand-written rules, such as /menu -> /en/menu, must survive a rebuild.
// Only rules this script owns match a language plus a dish slug.
const DISH_REDIRECT = /^\/(en|ru|ar)\/menu\/[^/]+$/;

export const buildSlugRedirects = (items) => {
  const canonical = new Map();
  for (const item of items) {
    for (const lang of LANGS) {
      const slug = item.slug?.[lang];
      if (!slug) continue;
      if (!SLUG.test(slug)) throw new Error(`Unsafe menu slug "${slug}" on item ${item.id}`);
      const key = `${lang}/${slug}`;
      const owner = canonical.get(key);
      if (owner != null && owner !== item.id) {
        throw new Error(`Two dishes use /${lang}/menu/${slug}`);
      }
      canonical.set(key, item.id);
    }
  }

  const bySource = new Map();
  for (const item of items) {
    for (const pageLang of LANGS) {
      const target = item.slug?.[pageLang] || item.slug?.en;
      if (!target) continue;
      for (const otherLang of LANGS) {
        const foreign = item.slug?.[otherLang];
        if (!foreign || foreign === target) continue;
        // This address is already the real page for a dish in this language.
        if (canonical.has(`${pageLang}/${foreign}`)) continue;
        const source = `/${pageLang}/menu/${foreign}`;
        const destination = `/${pageLang}/menu/${target}`;
        const existing = bySource.get(source);
        if (existing && existing !== destination) {
          throw new Error(`${source} would redirect to both ${existing} and ${destination}`);
        }
        bySource.set(source, destination);
      }
    }
  }

  const redirects = [...bySource.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([source, destination]) => ({ source, destination, permanent: true }));

  const sources = new Set(redirects.map((rule) => rule.source));
  for (const rule of redirects) {
    if (rule.source === rule.destination) throw new Error(`Redirect loops on ${rule.source}`);
    if (sources.has(rule.destination)) throw new Error(`Redirect chain through ${rule.destination}`);
  }
  return redirects;
};

export const withSlugRedirects = (config, items) => ({
  ...config,
  redirects: [
    ...(config.redirects ?? []).filter((rule) => !DISH_REDIRECT.test(rule.source)),
    ...buildSlugRedirects(items),
  ],
});

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { MenuItems } = await readMenuData();
  const config = JSON.parse(await readFile(VERCEL_PATH, "utf8"));
  const next = withSlugRedirects(config, MenuItems);
  await writeFile(VERCEL_PATH, `${JSON.stringify(next, null, 2)}\n`, "utf8");
  const added = next.redirects.length - (config.redirects ?? []).filter((rule) => !DISH_REDIRECT.test(rule.source)).length;
  console.log(`vercel.json: ${added} wrong-language dish redirects (${next.redirects.length} redirects in total)`);
}
