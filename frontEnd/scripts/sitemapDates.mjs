// Last-changed dates for sitemap <lastmod>.
//
// Google ignores lastmod when every build stamps "today" on unchanged pages.
// This file remembers a hash of each page's words. The date stays put while
// the hash matches, and moves to today only when those words change.
// sitemap-lastmod.json is part of the build, so the next deploy keeps the
// old dates instead of inventing new ones.
import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as publicIdentity from "../src/05_pages/public/contact/04_contact_const/publicIdentity.js";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const LEDGER_PATH = fileURLToPath(new URL("./sitemap-lastmod.json", import.meta.url));
const CONTACT_SOURCE = fileURLToPath(
  new URL("../src/05_pages/public/contact/04_contact_const/BRANCHES.js", import.meta.url),
);

// One locale file holds the words for that static page. A new static route
// has to be listed here or the build stops, rather than shipping a date-less URL.
const STATIC_FILES = {
  "": "Home.json",
  menu: "Menu.json",
  contact: "Contact.json",
  kitchens: "Kitchens.json",
  careers: "Careers.json",
  faq: "FAQ.json",
  privacy: "Privacy.json",
  about: "About.json",
  delivery: "Delivery.json",
  // The links page keeps its own three lines in Delivery.json ("links") and
  // takes its button words from that file too.
  links: "Delivery.json",
};

// The pages that carry the hidden business record (jsonLd.js: the company
// and the kitchens): home, contact, kitchens, careers and each kitchen page.
// The record's facts - phone, email, profile links, second name, founding
// year, one-line description - count as these pages' words. Google's rule for
// lastmod names a change to the structured data as a real change, so the date
// moves when one of these facts changes. They are read as values, never as
// file text, so a comment or a line ending in publicIdentity.js moves nothing.
const RECORD_ROUTES = new Set(["", "contact", "kitchens", "careers"]);
const IDENTITY_FACTS = Object.fromEntries(
  Object.entries(publicIdentity).sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0)),
);

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export const hashContent = (value) =>
  createHash("sha256").update(JSON.stringify(value)).digest("hex").slice(0, 16);

// Line endings are not words. The same file has Windows line endings in a
// checkout on a Windows PC and plain ones on the build server. Hashing the
// text as it was read gave a page one hash here and another there, so the
// server found "changed words" on every deploy and stamped that day on the
// Contact, Delivery, Links and kitchen pages (BRANCHES.js was the file).
// Every file that is hashed as text goes through this first.
export const sameLineEndings = (text) => text.replace(/\r\n?/g, "\n");

// Same words keep the stored date. New or changed words get today.
export const dateForContent = (previous, hash, today) => {
  if (previous?.hash === hash && ISO_DATE.test(previous.lastmod ?? "")) return previous.lastmod;
  if (!ISO_DATE.test(today)) throw new Error(`Sitemap lastmod must be YYYY-MM-DD, got ${today}`);
  return today;
};

const pageKey = (lang, route) => `${lang}|${route}`;

const remember = (ledger, dates, next, key, content, today) => {
  const hash = hashContent(content);
  const lastmod = dateForContent(ledger[key], hash, today);
  next[key] = { hash, lastmod };
  dates[key] = lastmod;
};

const commonFor = (common, lang) => ({
  about: common?.about?.[lang] ?? null,
  offer: common?.offer?.[lang] ?? null,
  location: common?.location?.[lang] ?? null,
  hours: common?.hours ?? null,
  probation: common?.probation ?? null,
  applyEmail: common?.applyEmail ?? null,
});

export const readSitemapLedger = async () => {
  try {
    const parsed = JSON.parse(await readFile(LEDGER_PATH, "utf8"));
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error("sitemap-lastmod.json must be an object");
    }
    return parsed;
  } catch (error) {
    if (error?.code === "ENOENT") return {};
    throw error;
  }
};

export const writeSitemapLedger = (ledger) => {
  const ordered = Object.fromEntries(
    Object.keys(ledger)
      .sort()
      .map((key) => [key, ledger[key]]),
  );
  return writeFile(LEDGER_PATH, `${JSON.stringify(ordered, null, 2)}\n`, "utf8");
};

// dates is what the XML writer reads. nextLedger is what we save afterwards.
// Dropped pages are left out of nextLedger, so a removed dish does not keep a stale date.
export const buildSitemapDates = async ({
  langs,
  staticRoutes,
  menuItems,
  jobs,
  kitchens = [],
  common,
  ledger,
  today,
}) => {
  const files = [
    ...new Set([
      ...Object.values(STATIC_FILES),
      "MenuItems.json",
      "common.json",
      ...(kitchens.length ? ["Kitchens.json"] : []),
    ]),
  ];
  const localeText = {};
  await Promise.all(
    langs.flatMap((lang) =>
      files.map(async (file) => {
        localeText[`${lang}/${file}`] = sameLineEndings(
          await readFile(path.join(ROOT, "public/locales", lang, file), "utf8"),
        );
      }),
    ),
  );

  const longByLang = Object.fromEntries(
    langs.map((lang) => {
      const parsed = JSON.parse(localeText[`${lang}/MenuItems.json`]);
      return [lang, parsed.long ?? {}];
    }),
  );
  const contactSource = sameLineEndings(await readFile(CONTACT_SOURCE, "utf8"));

  const dates = {};
  const next = {};
  const note = (key, content) => remember(ledger, dates, next, key, content, today);

  for (const route of staticRoutes) {
    const file = STATIC_FILES[route];
    if (!file) throw new Error(`No sitemap content file for route "${route || "/"}"`);
    for (const lang of langs) {
      const parts = [localeText[`${lang}/${file}`]];
      if (route === "menu") {
        parts.push(
          menuItems.map((item) => ({
            id: item.id,
            slug: item.slug?.[lang] ?? null,
            name: item.name?.[lang] ?? null,
            short: item.description?.short?.[lang] ?? null,
            price: item.price,
          })),
        );
      }
      if (
        route === "contact" ||
        route === "kitchens" ||
        route === "delivery" ||
        route === "links"
      ) {
        parts.push(contactSource);
      }
      if (RECORD_ROUTES.has(route)) parts.push(IDENTITY_FACTS);
      // The About page repeats the footer story, so a change there moves the date.
      if (route === "about") {
        parts.push(JSON.parse(localeText[`${lang}/common.json`]).footer?.about ?? null);
      }
      if (route === "careers") {
        parts.push(commonFor(common, lang));
        parts.push(
          jobs.map((job) => ({
            id: job.id,
            title: job.title?.[lang] ?? null,
            summary: job.summary?.[lang] ?? null,
          })),
        );
      }
      note(pageKey(lang, route), parts);
    }
  }

  for (const slug of kitchens) {
    for (const lang of langs) {
      note(pageKey(lang, `kitchens/${slug}`), [
        localeText[`${lang}/Kitchens.json`],
        contactSource,
        slug,
        IDENTITY_FACTS,
      ]);
    }
  }

  for (const item of menuItems) {
    for (const lang of langs) {
      const route = `menu/${item.slug?.[lang] ?? ""}`;
      note(pageKey(lang, route), {
        id: item.id,
        slug: item.slug?.[lang] ?? null,
        name: item.name?.[lang] ?? null,
        short: item.description?.short?.[lang] ?? null,
        price: item.price,
        nutrition: item.nutrition ?? null,
        ingredients: item.ingredients ?? null,
        allergens: item.allergens ?? null,
        long: longByLang[lang][String(item.id)] ?? "",
      });
    }
  }

  for (const job of jobs) {
    for (const lang of langs) {
      note(pageKey(lang, `careers/${job.id}`), {
        ...commonFor(common, lang),
        id: job.id,
        title: job.title?.[lang] ?? null,
        summary: job.summary?.[lang] ?? null,
        duties: job.duties?.[lang] ?? null,
        mustHave: job.mustHave?.[lang] ?? null,
        niceToHave: job.niceToHave?.[lang] ?? null,
        employmentType: job.employmentType ?? null,
        kitchens: job.kitchens ?? null,
        openings: job.openings ?? null,
        datePosted: job.datePosted ?? null,
      });
    }
  }

  return { dates, ledger: next };
};
