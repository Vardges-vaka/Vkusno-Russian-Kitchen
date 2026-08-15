export const i18nConfig = {
  fallbackLng: "en",
  debug: false,

  // Locales live in public/ so Vite copies them into dist/ verbatim.
  // Anything under src/ is bundle input and does NOT exist at runtime.
  backend: {
    loadPath: "/locales/{{lng}}/{{ns}}.json",
  },

  // The detector can return a region tag ("en-US", "ru-RU"); without these
  // two lines i18next would request /locales/en-US/*.json and 404.
  supportedLngs: ["en", "ar", "ru"],
  load: "languageOnly",

  ns: ["common", "Home", "Contact", "Menu", "FAQ", "Privacy", "NotFound"],
  defaultNS: "common",

  interpolation: {
    escapeValue: false,
  },

  detection: {
    order: ["localStorage", "cookie", "navigator"],
    caches: ["localStorage", "cookie"],
  },
};
