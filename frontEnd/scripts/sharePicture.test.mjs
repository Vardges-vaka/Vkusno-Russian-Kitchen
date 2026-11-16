// Every page has a picture for WhatsApp and Facebook cards.
// A dish page uses its own photo. Every other page uses the site picture:
// the Borscht photo, the owner's choice of 16 Nov 2026.
import assert from "node:assert/strict";
import test from "node:test";
import {
  SITE_PICTURE_DISH,
  SITE_PICTURE_NAME,
  dishShare,
  siteShare,
} from "../src/04_hlprs/sharePicture.js";
import { withMenuData } from "./readMenuData.mjs";

const borscht = {
  slug: { en: "russian-borscht" },
  name: { en: "Russian Borscht", ru: "Борщ", ar: "بورش روسي" },
  images: { full: "/assets/borscht.webp" },
};
const plov = {
  slug: { en: "beef-plov" },
  name: { en: "Beef Plov" },
  images: { full: "/assets/plov.webp" },
};

test("a dish page is shared with its own photo", () => {
  assert.deepEqual(dishShare(plov), {
    name: "beef-plov",
    source: "/assets/plov.webp",
  });
  assert.equal(dishShare({ slug: { en: "tea" }, images: {} }), null);
});

test("every other page is shared with the Borscht photo, named in the page's language", () => {
  assert.equal(SITE_PICTURE_DISH, "russian-borscht");
  assert.deepEqual(siteShare([plov, borscht], "ru"), {
    name: SITE_PICTURE_NAME,
    source: "/assets/borscht.webp",
    alt: "Борщ",
  });
  assert.equal(siteShare([plov, borscht], "en").alt, "Russian Borscht");
  assert.equal(siteShare([plov, borscht], "ar").alt, "بورش روسي");
});

test("no Borscht photo means no site picture, not a broken build", () => {
  assert.equal(siteShare([plov], "en"), null);
  assert.equal(siteShare([{ ...borscht, images: {} }], "en"), null);
});

test("the real menu has the Borscht photo, hidden or not, and no dish takes the site picture's name", async () => {
  await withMenuData(({ AllMenuItems }) => {
    const share = siteShare(AllMenuItems, "en");
    assert.ok(
      share,
      `no dish has the slug "${SITE_PICTURE_DISH}" and a full photo - choose another site picture in src/04_hlprs/sharePicture.js`,
    );
    assert.match(share.source, /\.webp$/);
    assert.equal(share.alt, "Russian Borscht");
    // dist/share/<name>.jpg: a dish with this slug would overwrite the picture.
    assert.equal(
      AllMenuItems.some((item) => item.slug?.en === SITE_PICTURE_NAME),
      false,
    );
  });
});
