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
