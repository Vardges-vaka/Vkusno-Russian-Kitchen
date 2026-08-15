export const i18nConfig = {
  fallbackLng: "en",
  debug: false,

  backend: {
    loadPath: "/src/i18n/locales/{{lng}}/{{ns}}.json",
  },

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
