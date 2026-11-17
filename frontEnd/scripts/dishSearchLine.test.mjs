// The line under a dish's title in search results, and under its picture when
// the dish is shared. Built from the dish's longer text plus the price
// (src/05_pages/public/menu/03_menu_hlprs/dishSearchLine.js).
// Before it, the line was the short card line, about 38 letters, and six
// Arabic dish pages all said only "one piece".
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  SEARCH_LINE_LIMIT,
  dishSearchLine,
} from "../src/05_pages/public/menu/03_menu_hlprs/dishSearchLine.js";
import { withMenuData } from "./readMenuData.mjs";

const line = (fields) =>
  dishSearchLine({ short: "Short card line.", price: 41, currency: "AED", lang: "en", ...fields });

test("whole sentences are kept while they fit, and the price ends the line", () => {
  assert.equal(
    line({ long: "A moist 160 g slice of honey cake. Layers of sponge and cream. Served chilled.", price: 26 }),
    "A moist 160 g slice of honey cake. Layers of sponge and cream. Served chilled. 26 AED.",
  );
});

test("a first sentence that is too long stops at a comma and ends with …", () => {
  assert.equal(
    line({
      long: "A steaming 500 g bowl of deep-ruby borscht pairs tender beef cubes with sweet beetroot, carrot and potato, all swimming in a lightly tangy broth brightened by tomato paste and a splash of vinegar. Second sentence.",
    }),
    "A steaming 500 g bowl of deep-ruby borscht pairs tender beef cubes with sweet beetroot, carrot and potato… 41 AED.",
  );
});

test("with no comma to stop at, it stops before a joining word, never two words after one", () => {
  const made = line({
    long: "A bright 300 g heap of freshly grated carrots glistens in a light sunflower-oil dressing sharpened with white vinegar and scented with warm coriander seed and a little garlic for depth.",
    price: 26,
  });
  assert.equal(
    made,
    "A bright 300 g heap of freshly grated carrots glistens in a light sunflower-oil dressing sharpened with white vinegar… 26 AED.",
  );
  assert.doesNotMatch(made, /\b(and|with|in) \S+… /);
});

test("a dot inside a number does not end a sentence", () => {
  assert.equal(
    line({ long: "A 0.5 l jug of mors. Served cold.", price: 18 }),
    "A 0.5 l jug of mors. Served cold. 18 AED.",
  );
});

test("Arabic gets no second dot after its currency sign", () => {
  const made = dishSearchLine({ long: "ملفوف أحمر مخلل، يقدم بحصة 200 غرام.", short: "", price: 14, currency: "د.إ", lang: "ar" });
  assert.equal(made, "ملفوف أحمر مخلل، يقدم بحصة 200 غرام. 14 د.إ");
});

test("a dish with no longer text falls back to its card line", () => {
  assert.equal(line({ long: "" }), "Short card line. 41 AED.");
  assert.equal(line({ long: undefined }), "Short card line. 41 AED.");
});

test("the line never runs past what a search result shows", () => {
  const made = line({ long: `${"word ".repeat(80).trim()}.`, price: 1234 });
  assert.ok(made.length <= SEARCH_LINE_LIMIT, `${made.length} letters`);
  assert.ok(made.endsWith("… 1234 AED."));
});

test("every dish, in every language, gets a full line of its own", async () => {
  const menu = await withMenuData((data) => data.MenuItems);
  assert.ok(menu.length > 0);
  for (const lang of ["en", "ru", "ar"]) {
    const read = async (file) =>
      JSON.parse(await readFile(new URL(`../public/locales/${lang}/${file}`, import.meta.url), "utf8"));
    const longTexts = (await read("MenuItems.json")).long ?? {};
    const currency = (await read("Menu.json")).menu.currency;
    const seen = new Map();
    for (const item of menu) {
      const made = dishSearchLine({
        long: longTexts[String(item.id)],
        short: item.description?.short?.[lang],
        price: item.price,
        currency,
        lang,
      });
      const who = `${lang} dish ${item.id}`;
      assert.ok(made.length >= 30, `${who}: only ${made.length} letters: ${made}`);
      assert.ok(made.length <= SEARCH_LINE_LIMIT, `${who}: ${made.length} letters`);
      assert.ok(
        made.endsWith(lang === "ar" ? `${item.price} ${currency}` : `${item.price} ${currency}.`),
        `${who} does not end with its price: ${made}`,
      );
      assert.ok(!seen.has(made), `${who} has the same line as dish ${seen.get(made)}`);
      seen.set(made, item.id);
    }
  }
});
