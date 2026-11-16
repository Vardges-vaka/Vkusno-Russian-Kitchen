// Every kitchen has its own "Vkusno Russian Kitchen" listing on Google.
// BRANCHES.js keeps the link. The hidden business record on the home, contact
// and kitchen pages hands it to Google, so Google can tell that the kitchen
// page and the listing are the same place.
//
// The "Directions" buttons do not use this link. They keep the map pin.
import assert from "node:assert/strict";
import test from "node:test";
import { withCareersData } from "./readCareersData.mjs";

const BRANCHES_MODULE = "/src/05_pages/public/contact/04_contact_const/BRANCHES.js";
const JSON_LD_MODULE = "/src/04_hlprs/jsonLd.js";
const LISTING = /^https:\/\/www\.google\.com\/maps\?cid=\d{15,20}$/;

// withCareersData is borrowed only for its loader: BRANCHES.js imports logo
// pictures and jsonLd.js reads app config, which plain Node cannot do.
const { branches, restaurantNode } = await withCareersData(async (_jobs, server) => ({
  branches: (await server.ssrLoadModule(BRANCHES_MODULE)).BRANCHES,
  restaurantNode: (await server.ssrLoadModule(JSON_LD_MODULE)).restaurantNode,
}));

test("every kitchen has its own Google listing link", () => {
  assert.equal(branches.length, 5);
  for (const branch of branches) {
    assert.match(
      branch.location.googleListingLink ?? "",
      LISTING,
      `${branch.id} has no Google listing link`,
    );
  }
  const links = branches.map((branch) => branch.location.googleListingLink);
  assert.equal(new Set(links).size, branches.length, "two kitchens share one listing link");
});

test("the hidden record points at the listing, next to the two social pages", () => {
  for (const branch of branches) {
    const listing = branch.location.googleListingLink;
    for (const lang of ["en", "ru", "ar"]) {
      const node = restaurantNode(branch, lang);
      assert.equal(node.hasMap, listing, `${branch.id} ${lang}`);
      assert.equal(node.sameAs.length, 3, `${branch.id} ${lang}`);
      assert.equal(node.sameAs[2], listing, `${branch.id} ${lang}`);
      assert.match(node.sameAs[0], /instagram\.com/, `${branch.id} ${lang}`);
      assert.match(node.sameAs[1], /facebook\.com/, `${branch.id} ${lang}`);
    }
  }
});

test("a kitchen with no listing yet falls back to its map pin", () => {
  const [first] = branches;
  const withoutListing = {
    ...first,
    location: { ...first.location, googleListingLink: undefined },
  };
  const node = restaurantNode(withoutListing, "en");
  assert.equal(node.hasMap, first.location.googleMapsLink);
  assert.equal(node.sameAs.length, 2);
});

test("the map pin for the Directions buttons is still there", () => {
  for (const branch of branches) {
    assert.match(branch.location.googleMapsLink, /^https:\/\/maps\.app\.goo\.gl\//, branch.id);
  }
});
