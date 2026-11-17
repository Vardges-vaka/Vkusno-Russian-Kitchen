import { SITE_URL, absoluteUrl, localePath } from "../00_config/_config.index.js";
import {
  PUBLIC_DESCRIPTION,
  PUBLIC_EMAIL,
  PUBLIC_FACEBOOK,
  PUBLIC_FOUNDING_YEAR,
  PUBLIC_INSTAGRAM,
  PUBLIC_LINKEDIN,
  PUBLIC_OTHER_NAME,
  PUBLIC_PHONE,
} from "../05_pages/public/contact/04_contact_const/publicIdentity.js";
import { pickLocale } from "./pickLocale.js";
import { SITE_PICTURE_NAME } from "./sharePicture.js";

// Schema.org builders. Every field below already exists in the app's own data
// - BRANCHES.js carries addresses, coordinates, opening hours and each
// kitchen's own Google listing; menuItems.js
// carries names, prices and photos; publicIdentity.js carries the phone,
// email, social links, founding year and the one-line description - so none
// of this is duplicated by hand.
// Hours stay as published on the site. Ratings are not added.

const ORGANISATION_ID = `${SITE_URL}/#organisation`;
const MENU_PATH = "menu";
const LOGO = {
  "@type": "ImageObject",
  url: `${SITE_URL}/icon-512.png`,
  width: 512,
  height: 512,
};
// The picture of the business: a photo of the food, not the logo. Google asks
// for a photo here, and there are no kitchen photos, so this is the site
// picture the owner chose - the Borscht, the same file every non-dish page is
// shared with (sharePicture.js; the build saves it as /share/vkusno.jpg).
// The logo keeps its own field.
const PHOTO = `${SITE_URL}/share/${SITE_PICTURE_NAME}.jpg`;
const SAME_AS = [PUBLIC_INSTAGRAM, PUBLIC_FACEBOOK, PUBLIC_LINKEDIN];

// One address for "the menu" as a thing, so a kitchen can point at it and the
// menu page can say "that is me". Same form as the kitchens' own ids.
const menuId = (lang) => `${absoluteUrl(localePath(lang, MENU_PATH))}#menu`;

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
  const phone = contactInfo.find((item) => item.name === "phone")?.label || PUBLIC_PHONE;
  const email = contactInfo.find((item) => item.name === "email")?.label || PUBLIC_EMAIL;
  // The kitchen's own Google listing. It is the map the record points to, and
  // one more page that says "this is the same kitchen". A kitchen with no
  // listing yet keeps its map pin and the two social pages.
  const listing = branch.location.googleListingLink;

  return {
    "@type": "Restaurant",
    "@id": `${SITE_URL}/#branch-${branch.id}`,
    name: `Vkusno - ${pickLocale(branch.name, lang)}`,
    alternateName: PUBLIC_OTHER_NAME,
    servesCuisine: ["Russian", "Central Asian"],
    priceRange: "$$",
    url: absoluteUrl(
      localePath(lang, branch.slug ? `kitchens/${branch.slug}` : "contact"),
    ),
    telephone: phone,
    email,
    menu: absoluteUrl(localePath(lang, MENU_PATH)),
    // The same menu as a thing with dishes and prices (menuNode below carries
    // this id on the menu page). "menu" above stays: it is the plain link
    // Google's own guide asks for.
    hasMenu: {
      "@type": "Menu",
      "@id": menuId(lang),
      url: absoluteUrl(localePath(lang, MENU_PATH)),
    },
    logo: LOGO,
    image: PHOTO,
    sameAs: listing ? [...SAME_AS, listing] : SAME_AS,
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
    hasMap: listing || branch.location.googleMapsLink,
    openingHoursSpecification: openingHours(branch.timing),
    parentOrganization: { "@id": ORGANISATION_ID },
  };
};

export const organisationNode = (lang) => ({
  "@type": "Organization",
  "@id": ORGANISATION_ID,
  name: "Vkusno",
  alternateName: PUBLIC_OTHER_NAME,
  url: absoluteUrl(localePath(lang)),
  description: pickLocale(PUBLIC_DESCRIPTION, lang),
  foundingDate: PUBLIC_FOUNDING_YEAR,
  logo: LOGO,
  image: PHOTO,
  telephone: PUBLIC_PHONE,
  email: PUBLIC_EMAIL,
  sameAs: SAME_AS,
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
  // The id each kitchen's record points at (hasMenu in restaurantNode).
  "@id": menuId(lang),
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

// Google for Jobs reads one JobPosting per job page (never on the list page).
// No baseSalary: pay is not published (owner decision D9). Google lists it
// as recommended, not required.
export const jobPostingNode = (job, lang, { descriptionHtml, branches = [] }) => ({
  "@type": "JobPosting",
  title: pickLocale(job.title, lang),
  description: descriptionHtml,
  datePosted: job.datePosted,
  employmentType: job.employmentType,
  directApply: false,
  ...(job.openings ? { totalJobOpenings: job.openings } : {}),
  url: absoluteUrl(localePath(lang, `careers/${job.id}`)),
  identifier: { "@type": "PropertyValue", name: "Vkusno", value: job.id },
  hiringOrganization: {
    "@type": "Organization",
    "@id": ORGANISATION_ID,
    name: "Vkusno",
    sameAs: SITE_URL,
  },
  jobLocation: branches
    .filter((branch) => !job.kitchens || job.kitchens.includes(branch.id))
    .map((branch) => ({
      "@type": "Place",
      name: `Vkusno - ${pickLocale(branch.name, lang)}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: pickLocale(branch.location.address, lang),
        addressLocality: "Dubai",
        addressCountry: "AE",
      },
    })),
});

// Wraps nodes in a single @graph so one <script> covers the whole page.
export const graph = (...nodes) => ({
  "@context": "https://schema.org",
  "@graph": nodes.filter(Boolean).flat(),
});
