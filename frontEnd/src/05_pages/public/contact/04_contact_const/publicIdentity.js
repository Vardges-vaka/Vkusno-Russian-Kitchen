// Facts already shown on the site. The contact list, the social links and the
// hidden business record all read these, so they cannot drift apart.
export const PUBLIC_PHONE = "+971 52 102 5674";
export const PUBLIC_EMAIL = "info@vkusno.ae";
// Plain profile addresses, nothing after them. The Instagram link used to end
// with "?igsh=..." (a tag the Instagram app adds to a copied link, marking
// whose phone it came from) and the LinkedIn one with "?viewAsMember=true"
// (the address an admin sees). Search engines match these links against the
// profiles, so they must be the profiles' own addresses.
export const PUBLIC_INSTAGRAM = "https://www.instagram.com/vkusnodxb";
export const PUBLIC_FACEBOOK = "https://www.facebook.com/vkusnodxb";
export const PUBLIC_LINKEDIN = "https://www.linkedin.com/company/vkusnorussiankitchen/";

// The name on the five Google listings, on Talabat and on Instagram. The site
// itself says "Vkusno" (the owner's choice for the headline). The hidden
// business record gives this as the second name, so a search engine can tell
// the website and the listings are one business. It is not shown on a page.
export const PUBLIC_OTHER_NAME = "Vkusno Russian Kitchen";

// The year the About page and the footer give ("Founded in Dubai in 2021").
export const PUBLIC_FOUNDING_YEAR = "2021";

// One line saying what Vkusno is, for the hidden business record. Each is the
// opening sentence of that language's homepage description
// (public/locales/<lang>/Home.json, meta.description). It was English on the
// Russian and Arabic pages. If the wording changes there, change it here too.
export const PUBLIC_DESCRIPTION = {
  en: "Home-style Russian cooking in Dubai.",
  ru: "Домашняя русская кухня в Дубае.",
  ar: "مطبخ روسي منزلي في دبي.",
};
