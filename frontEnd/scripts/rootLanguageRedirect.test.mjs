// The bare address https://vkusno.ae/ has no language in it. vercel.json sends
// it to /ru or /ar when the browser's first language is Russian or Arabic,
// and to /en for everyone else.
//
// Vercel compares a "has" header value with the WHOLE header, not with its
// start. A real browser sends a list ("ru-RU,ru;q=0.9,en-US;q=0.8"), so a
// pattern that describes only the first two letters matches a bare "ru" and
// nothing a browser really sends. That shipped: until November 2026 every
// Russian and Arabic visitor to the bare address landed on English.
// vercel.json cannot hold a comment, so the reason lives here, and these tests
// try the real rules on the headers real browsers send.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { KITCHEN_SLUG } from "../src/05_pages/public/kitchens/04_kitchens_const/KITCHEN_SLUG.js";

const config = JSON.parse(
  await readFile(new URL("../vercel.json", import.meta.url), "utf8"),
);

// Where Vercel sends the bare address for one Accept-Language header.
// The first rule that applies wins. The whole header has to match the value.
const destinationFor = (acceptLanguage, source = "/") => {
  for (const rule of config.redirects) {
    if (rule.source !== source) continue;
    const conditions = rule.has ?? [];
    // The old WordPress /?p=1 rule looks at the query, not at the language.
    if (conditions.some((condition) => condition.type !== "header")) continue;
    const applies = conditions.every(
      (condition) =>
        condition.key === "accept-language" &&
        acceptLanguage != null &&
        new RegExp(`^(?:${condition.value})$`).test(acceptLanguage),
    );
    if (applies) return rule.destination;
  }
  return undefined;
};

test("a Russian browser opening the bare address goes to /ru", () => {
  const headers = [
    "ru",
    "ru-RU",
    "ru,en;q=0.9",
    "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
    "RU-ru,ru;q=0.5",
  ];
  for (const header of headers) {
    assert.equal(destinationFor(header), "/ru", header);
  }
});

test("an Arabic browser opening the bare address goes to /ar", () => {
  const headers = ["ar", "ar-AE", "ar,en-US;q=0.9", "ar-AE,ar;q=0.9,en;q=0.8"];
  for (const header of headers) {
    assert.equal(destinationFor(header), "/ar", header);
  }
});

test("any other browser, and a robot that sends no language, goes to /en", () => {
  // The first language decides: English first with Russian second is English.
  const headers = [
    undefined,
    "",
    "*",
    "en-US,en;q=0.9",
    "en-GB,en;q=0.9,ru;q=0.8",
    "fr-FR,fr;q=0.9,ar;q=0.8",
    "de",
  ];
  for (const header of headers) {
    assert.equal(destinationFor(header), "/en", String(header));
  }
});

test("the short links address goes to the reader's language in the same way", () => {
  // vkusno.ae/links is the address for a social profile. A phone sends its
  // language exactly as a browser does, so the same three rules apply.
  assert.equal(destinationFor("ru-RU,ru;q=0.9,en-US;q=0.8", "/links"), "/ru/links");
  assert.equal(destinationFor("ru", "/links"), "/ru/links");
  assert.equal(destinationFor("ar-AE,ar;q=0.9,en;q=0.8", "/links"), "/ar/links");
  for (const header of [undefined, "", "en-US,en;q=0.9", "en-GB,en;q=0.9,ru;q=0.8"]) {
    assert.equal(destinationFor(header, "/links"), "/en/links", String(header));
  }
});

// The pages a person may type without a language: vkusno.ae/careers from a job
// ad, vkusno.ae/delivery, vkusno.ae/kitchens/arjan. Until November 2026 four
// of them and every kitchen page answered "page not found", while /menu,
// /about, /contact, /faq and /links forwarded (second website audit, 16 Nov
// 2026). They now follow the /links rules.
const SHORT_PAGES = ["delivery", "kitchens", "careers", "privacy"];

test("delivery, kitchens, careers and privacy open in the reader's language", () => {
  for (const page of SHORT_PAGES) {
    const source = `/${page}`;
    assert.equal(destinationFor("ru-RU,ru;q=0.9,en-US;q=0.8", source), `/ru/${page}`);
    assert.equal(destinationFor("ru", source), `/ru/${page}`);
    assert.equal(destinationFor("ar-AE,ar;q=0.9,en;q=0.8", source), `/ar/${page}`);
    assert.equal(destinationFor("ar", source), `/ar/${page}`);
    for (const header of [undefined, "", "*", "en-US,en;q=0.9", "en-GB,en;q=0.9,ru;q=0.8", "de"]) {
      assert.equal(destinationFor(header, source), `/en/${page}`, `${source} ${String(header)}`);
    }
  }
});

test("each kitchen's short address opens that kitchen's page in the reader's language", () => {
  const slugs = Object.values(KITCHEN_SLUG);
  assert.equal(slugs.length, 5);
  for (const slug of slugs) {
    const source = `/kitchens/${slug}`;
    assert.equal(destinationFor("ru-RU,ru;q=0.9,en-US;q=0.8", source), `/ru/kitchens/${slug}`);
    assert.equal(destinationFor("ar-AE,ar;q=0.9,en;q=0.8", source), `/ar/kitchens/${slug}`);
    for (const header of [undefined, "en-US,en;q=0.9", "en-GB,en;q=0.9,ru;q=0.8"]) {
      assert.equal(destinationFor(header, source), `/en/kitchens/${slug}`, `${source} ${String(header)}`);
    }
  }
});

const sitemap = await readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8");
const sitePages = new Set(
  [...sitemap.matchAll(/<loc>https:\/\/vkusno\.ae(\/[^<]*)<\/loc>/g)].map((match) => match[1]),
);

test("every page of the site, except a dish or a job, has a short address", () => {
  // Dish and job addresses are different words in each language, so they have
  // no single short form.
  const pages = [...sitePages]
    .filter((page) => page.startsWith("/en/"))
    .map((page) => page.slice("/en/".length))
    .filter((page) => !/^(menu|careers)\/./.test(page));
  assert.ok(pages.length >= 14, `only ${pages.length} pages found in the sitemap`);
  for (const page of pages) {
    // A robot sends no language. It must reach the English page in one step.
    assert.equal(destinationFor(undefined, `/${page}`), `/en/${page}`, `/${page} is not forwarded`);
  }
});

test("a rule that looks at the language is temporary and leads to a real page", () => {
  const looksAtLanguage = (rule) =>
    (rule.has ?? []).some(
      (condition) => condition.type === "header" && condition.key === "accept-language",
    );
  const sources = [...new Set(config.redirects.filter(looksAtLanguage).map((rule) => rule.source))];
  // The bare address, /links, the four pages above and the five kitchens.
  assert.equal(sources.length, 11);
  for (const source of sources) {
    const rules = config.redirects.filter(
      (rule) =>
        rule.source === source &&
        (rule.has ?? []).every((condition) => condition.type === "header"),
    );
    const page = source === "/" ? "" : source;
    // Russian, Arabic, then everyone else: the first rule that applies wins,
    // so the rule without a condition has to come last.
    assert.deepEqual(
      rules.map((rule) => [rule.destination, looksAtLanguage(rule)]),
      [
        [`/ru${page}`, true],
        [`/ar${page}`, true],
        [`/en${page}`, false],
      ],
      source,
    );
    for (const rule of rules) {
      // A permanent answer is remembered by the browser. The next reader on
      // that phone, in another language, would be sent to the wrong page.
      assert.equal(rule.permanent, false, `${source} -> ${rule.destination} must stay temporary`);
      assert.ok(sitePages.has(rule.destination), `${rule.destination} is not a page of the site`);
    }
  }
});

test("a short address never hides a real page or another rule", () => {
  const counts = new Map();
  for (const rule of config.redirects) {
    const key = `${rule.source} ${JSON.stringify(rule.has ?? null)}`;
    counts.set(key, (counts.get(key) ?? 0) + 1);
    assert.ok(!sitePages.has(rule.source), `${rule.source} is a real page and is also forwarded`);
  }
  for (const [key, count] of counts) assert.equal(count, 1, `the same rule twice: ${key}`);
});
