// App-wide constants that more than one layer needs.

// Debug logging switch, driven by VITE_IS_DEBUG in .env.
//
// The comparison is against the STRING "true", not the boolean. Vite inlines
// env vars as strings, so `import.meta.env.VITE_IS_DEBUG === true` is always
// false and would silently disable logging everywhere. Any of true/1/yes is
// accepted so a stray value in .env does not quietly turn logging off.
export const IS_DEBUG = ["true", "1", "yes"].includes(
  String(import.meta.env.VITE_IS_DEBUG ?? "").trim().toLowerCase(),
);
//
// SUPPORTED_LANGUAGES used to live inside LanguageContext, but the router,
// the i18n config and the language switcher all need it now that the language
// is a URL segment - so it belongs here rather than inside a provider.

export const SUPPORTED_LANGUAGES = ["en", "ru", "ar"];
export const DEFAULT_LANGUAGE = "en";
export const RTL_LANGUAGES = ["ar"];

export const isSupportedLanguage = (lang) =>
  SUPPORTED_LANGUAGES.includes(lang);

export const isRtlLanguage = (lang) => RTL_LANGUAGES.includes(lang);

// "en-US" -> "en". i18next and navigator.language both hand back region tags.
export const normalizeLanguage = (lang) => (lang || "").split("-")[0];

// Resolve a usable language from anything: a URL param, i18n.language,
// navigator.language. Falls back to English rather than throwing.
export const resolveLanguage = (...candidates) => {
  for (const candidate of candidates) {
    const normalized = normalizeLanguage(candidate);
    if (isSupportedLanguage(normalized)) return normalized;
  }
  return DEFAULT_LANGUAGE;
};

// Build a language-prefixed path: localePath("ru", "menu") -> "/ru/menu".
// Every internal link goes through this so no route can silently lose its
// language segment.
export const localePath = (lang, path = "") => {
  const safeLang = isSupportedLanguage(lang) ? lang : DEFAULT_LANGUAGE;
  const rest = String(path).replace(/^\/+|\/+$/g, "");
  return rest ? `/${safeLang}/${rest}` : `/${safeLang}`;
};

// Sections that actually render a Google map: the Contact page, and the order
// modal reachable from anywhere under /menu.
//
// MapProvider mounts <APIProvider>, which downloads and parses the Maps JS SDK
// the moment it mounts. It used to wrap the whole app, so Home, FAQ, Privacy
// and the 404 page all paid for a script they never used. App consults this to
// mount the provider only where a map can appear.
const MAP_ROUTE_SEGMENTS = ["menu", "contact"];

export const routeNeedsMap = (pathname = "") => {
  const [, first, second] = pathname.split("/");
  // With a language prefix the section is the 2nd segment (/en/menu); without
  // one it is the 1st, which is what "/" looks like mid-redirect.
  const section = isSupportedLanguage(first) ? second : first;
  return MAP_ROUTE_SEGMENTS.includes(section);
};

// Canonical origin. Hardcoded rather than read from an env var: the staging
// deployment (live.vkusno.ae) is short-lived and carries X-Robots-Tag noindex,
// so its pages pointing their canonical at production is the correct and safe
// behaviour - it is exactly what stops staging competing with the real site.
export const SITE_URL = "https://vkusno.ae";

export const absoluteUrl = (path = "") =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
