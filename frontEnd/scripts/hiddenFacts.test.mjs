// The hidden business record: the facts a search engine reads on the home,
// contact, kitchens, kitchen, careers and menu pages (src/04_hlprs/jsonLd.js).
// People do not see it. These tests hold five things the second website audit
// (16 Nov 2026) asked for: a photo instead of the logo, plain profile links,
// LinkedIn, the name used on the Google listings, and a tie from each kitchen
// to the menu.
import assert from "node:assert/strict";
import test from "node:test";
import { withCareersData } from "./readCareersData.mjs";

const CONST = "/src/05_pages/public/contact/04_contact_const";
const LANGS = ["en", "ru", "ar"];

// withCareersData is borrowed only for its loader: these files import pictures
// and read app config, which plain Node cannot do.
const { branches, jsonLd, identity, socials, share } = await withCareersData(
  async (_jobs, server) => ({
    branches: (await server.ssrLoadModule(`${CONST}/BRANCHES.js`)).BRANCHES,
    jsonLd: await server.ssrLoadModule("/src/04_hlprs/jsonLd.js"),
    identity: await server.ssrLoadModule(`${CONST}/publicIdentity.js`),
    socials: (await server.ssrLoadModule(`${CONST}/SOCIALS.js`)).SOCIALS,
    share: await server.ssrLoadModule("/src/04_hlprs/sharePicture.js"),
  }),
);

const records = () =>
  LANGS.flatMap((lang) => [
    jsonLd.organisationNode(lang),
    ...branches.map((branch) => jsonLd.restaurantNode(branch, lang)),
  ]);

test("profile links are the profiles' own addresses, with nothing after them", () => {
  for (const link of [identity.PUBLIC_INSTAGRAM, identity.PUBLIC_FACEBOOK, identity.PUBLIC_LINKEDIN]) {
    assert.match(link, /^https:\/\/www\.(instagram|facebook|linkedin)\.com\/[A-Za-z0-9/_-]+$/, link);
    assert.ok(!link.includes("?") && !link.includes("#"), `${link} carries a tag`);
  }
  for (const record of records()) {
    assert.deepEqual(
      record.sameAs.slice(0, 3),
      [identity.PUBLIC_INSTAGRAM, identity.PUBLIC_FACEBOOK, identity.PUBLIC_LINKEDIN],
      record.name,
    );
  }
});

test("the buttons people press open the same three profiles as the hidden record", () => {
  assert.deepEqual(
    socials.map((social) => [social.name, social.link]),
    [
      ["Instagram", identity.PUBLIC_INSTAGRAM],
      ["Facebook", identity.PUBLIC_FACEBOOK],
      ["LinkedIn", identity.PUBLIC_LINKEDIN],
    ],
  );
});

test("the company and every kitchen also carry the name used on the Google listings", () => {
  assert.equal(identity.PUBLIC_OTHER_NAME, "Vkusno Russian Kitchen");
  for (const record of records()) {
    assert.equal(record.alternateName, "Vkusno Russian Kitchen", record.name);
    // The site's own name does not change: the headline stays "Vkusno".
    assert.match(record.name, /^Vkusno( - .+)?$/, record.name);
  }
  assert.equal(jsonLd.organisationNode("en").name, "Vkusno");
});

test("the picture of the business is the site photo, and the logo stays the logo", () => {
  const photo = `https://vkusno.ae/share/${share.SITE_PICTURE_NAME}.jpg`;
  for (const record of records()) {
    assert.equal(record.image, photo, record.name);
    assert.match(record.logo.url, /\/icon-512\.png$/, record.name);
    assert.notEqual(record.image, record.logo.url, record.name);
  }
});

test("each kitchen points at the menu, and the menu page answers to that same id", () => {
  for (const lang of LANGS) {
    const menu = jsonLd.menuNode([], lang);
    assert.equal(menu["@id"], `https://vkusno.ae/${lang}/menu#menu`);
    assert.equal(menu.url, `https://vkusno.ae/${lang}/menu`);
    for (const branch of branches) {
      const kitchen = jsonLd.restaurantNode(branch, lang);
      assert.deepEqual(
        kitchen.hasMenu,
        { "@type": "Menu", "@id": menu["@id"], url: menu.url },
        `${branch.id} ${lang}`,
      );
      // The plain link Google's guide asks for is still there.
      assert.equal(kitchen.menu, menu.url, `${branch.id} ${lang}`);
    }
  }
});

test("nothing a kitchen's record already said has gone", () => {
  const kitchen = jsonLd.restaurantNode(branches[0], "en");
  for (const key of [
    "@type", "@id", "name", "servesCuisine", "priceRange", "url", "telephone", "email",
    "menu", "logo", "image", "sameAs", "address", "geo", "hasMap",
    "openingHoursSpecification", "parentOrganization",
  ]) {
    assert.ok(key in kitchen, `the kitchen record lost "${key}"`);
  }
  const company = jsonLd.organisationNode("en");
  for (const key of ["@type", "@id", "name", "url", "description", "foundingDate", "logo", "image", "telephone", "email", "sameAs"]) {
    assert.ok(key in company, `the company record lost "${key}"`);
  }
});
