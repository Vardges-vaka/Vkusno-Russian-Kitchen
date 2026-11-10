import assert from "node:assert/strict";
import test from "node:test";
import { createSitemap } from "./generateSitemap.mjs";
import { dateForContent } from "./sitemapDates.mjs";

const LANGS = ["en", "ru", "ar"];
const STATIC = ["", "menu", "contact", "careers", "faq", "privacy"];

const datesFor = (extra = {}) => {
  const dates = { ...extra };
  for (const lang of LANGS) {
    for (const route of STATIC) dates[`${lang}|${route}`] = dates[`${lang}|${route}`] ?? "2026-11-10";
  }
  return dates;
};

test("a page keeps its lastmod until its words change", () => {
  const hash = "abc";
  assert.equal(dateForContent({ hash, lastmod: "2026-01-02" }, hash, "2026-11-10"), "2026-01-02");
  assert.equal(dateForContent({ hash, lastmod: "2026-01-02" }, "changed", "2026-11-10"), "2026-11-10");
  assert.equal(dateForContent({ hash, lastmod: "nope" }, hash, "2026-11-10"), "2026-11-10");
  assert.equal(dateForContent(undefined, hash, "2026-11-10"), "2026-11-10");
  assert.throws(() => dateForContent(undefined, hash, "today"), /YYYY-MM-DD/);
});

test("createSitemap writes one lastmod per url when dates are supplied", () => {
  const dates = datesFor({
    "en|menu/eggs": "2026-05-05",
    "ru|menu/yaitsa": "2026-05-06",
    "ar|menu/bayd": "2026-05-07",
    "en|careers/head-chef": "2026-11-09",
    "ru|careers/head-chef": "2026-11-09",
    "ar|careers/head-chef": "2026-11-09",
  });
  const xml = createSitemap(
    [{ slug: { en: "eggs", ru: "yaitsa", ar: "bayd" } }],
    [{ id: "head-chef" }],
    dates,
  );
  assert.equal((xml.match(/<lastmod>/g) ?? []).length, (xml.match(/<url>/g) ?? []).length);
  assert.match(
    xml,
    /<loc>https:\/\/vkusno\.ae\/ru\/menu\/yaitsa<\/loc>[\s\S]*?<lastmod>2026-05-06<\/lastmod>/,
  );
  assert.match(
    xml,
    /<loc>https:\/\/vkusno\.ae\/en\/careers\/head-chef<\/loc>[\s\S]*?<lastmod>2026-11-09<\/lastmod>/,
  );
  assert.equal(createSitemap([], []).includes("<lastmod>"), false);
  assert.throws(() => createSitemap([], [], {}), /Missing sitemap lastmod/);
});
