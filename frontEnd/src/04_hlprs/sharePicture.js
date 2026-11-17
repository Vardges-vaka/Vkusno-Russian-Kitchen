import { pickLocale } from "./pickLocale.js";

// The picture a link shows in WhatsApp, Facebook and other apps.
//
// A dish page uses its own photo. Every other page (home, menu, contact,
// kitchens, careers, FAQ, privacy, about, delivery) uses one site picture:
// the Borscht photo, the owner's choice of 16 Nov 2026. To change it, put
// another dish's English slug in SITE_PICTURE_DISH.
//
// scripts/prerender.mjs cuts each picture to 1200x630 at build time and
// saves it as dist/share/<name>.jpg. src/entry-server.jsx reads this file to
// make the pictures; jsonLd.js reads only the site picture's name, to give
// the same photo as the picture of the business in the hidden record.
export const SITE_PICTURE_DISH = "russian-borscht";
export const SITE_PICTURE_NAME = "vkusno";

export const dishShare = (item) =>
  item.images?.full ? { name: item.slug.en, source: item.images.full } : null;

// allItems must include hidden dishes: taking the Borscht off the menu for a
// while must not take the picture off every other page. alt says what the
// picture shows, in the page's language.
export const siteShare = (allItems, lang) => {
  const dish = allItems.find((item) => item.slug?.en === SITE_PICTURE_DISH);
  return dish?.images?.full
    ? {
        name: SITE_PICTURE_NAME,
        source: dish.images.full,
        alt: pickLocale(dish.name, lang),
      }
    : null;
};
