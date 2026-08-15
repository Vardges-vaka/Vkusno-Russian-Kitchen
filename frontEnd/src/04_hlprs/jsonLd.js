import { SITE_URL, absoluteUrl, localePath } from "../00_config/_config.index.js";
import { pickLocale } from "./pickLocale.js";

// Schema.org builders. Every field below already exists in the app's own data
// - BRANCHES.js carries addresses, coordinates and opening hours; menuItems.js
// carries names, prices and photos - so none of this is duplicated content
// maintained by hand.

const ORGANISATION_ID = `${SITE_URL}/#organisation`;

// "07:00"/"23:00" -> schema.org opening hours. 24/7 branches get the
// all-days-all-hours form Google expects rather than an omitted field.
const openingHours = (timing) =>
  timing.is24Hours
    ? [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday", "Tuesday", "Wednesday", "Thursday",
            "Friday", "Saturday", "Sunday",
          ],
          opens: "00:00",
          closes: "23:59",
        },
      ]
    : [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday", "Tuesday", "Wednesday", "Thursday",
            "Friday", "Saturday", "Sunday",
          ],
          opens: timing.openTime,
          closes: timing.closeTime,
        },
      ];

export const restaurantNode = (branch, lang, contactInfo = []) => {
  const phone = contactInfo.find((item) => item.name === "phone")?.label;

  return {
    "@type": "Restaurant",
    "@id": `${SITE_URL}/#branch-${branch.id}`,
    name: `Vkusno — ${pickLocale(branch.name, lang)}`,
    servesCuisine: ["Russian", "Central Asian"],
    priceRange: "$$",
    url: absoluteUrl(localePath(lang, "contact")),
    ...(phone ? { telephone: phone } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: pickLocale(branch.location.address, lang),
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: branch.location.coordinates.latitude,
      longitude: branch.location.coordinates.longitude,
    },
    hasMap: branch.location.googleMapsLink,
    openingHoursSpecification: openingHours(branch.timing),
    parentOrganization: { "@id": ORGANISATION_ID },
  };
};

export const organisationNode = (lang) => ({
  "@type": "Organization",
  "@id": ORGANISATION_ID,
  name: "Vkusno",
  url: absoluteUrl(localePath(lang)),
  description: "Home-style Russian cooking in Dubai.",
});

export const menuItemNode = (item, lang) => ({
  "@type": "MenuItem",
  name: pickLocale(item.name, lang),
  description: pickLocale(item.description?.short, lang),
  url: absoluteUrl(localePath(lang, `menu/${item.slug?.[lang] ?? item.slug?.en}`)),
  ...(item.images?.full ? { image: absoluteUrl(item.images.full) } : {}),
  offers: {
    "@type": "Offer",
    price: item.price,
    priceCurrency: "AED",
  },
  ...(item.nutrition?.calories != null
    ? {
        nutrition: {
          "@type": "NutritionInformation",
          calories: `${item.nutrition.calories} cal`,
          proteinContent: `${item.nutrition.protein} g`,
          fatContent: `${item.nutrition.fat} g`,
          carbohydrateContent: `${item.nutrition.carbs} g`,
        },
      }
    : {}),
});

export const menuNode = (categories, lang) => ({
  "@type": "Menu",
  name: "Vkusno menu",
  url: absoluteUrl(localePath(lang, "menu")),
  hasMenuSection: categories.map((category) => ({
    "@type": "MenuSection",
    name: pickLocale(category.name, lang),
    hasMenuItem: category.menuItems.map((item) => menuItemNode(item, lang)),
  })),
});

// FAQ groups come straight from the locale file's groups[].items[] shape.
export const faqNode = (groups) => ({
  "@type": "FAQPage",
  mainEntity: (Array.isArray(groups) ? groups : []).flatMap((group) =>
    (group.items ?? []).map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  ),
});

export const breadcrumbNode = (trail) => ({
  "@type": "BreadcrumbList",
  itemListElement: trail.map((crumb, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: crumb.name,
    item: absoluteUrl(crumb.path),
  })),
});

// Wraps nodes in a single @graph so one <script> covers the whole page.
export const graph = (...nodes) => ({
  "@context": "https://schema.org",
  "@graph": nodes.filter(Boolean).flat(),
});
