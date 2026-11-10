import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { i18nConfig } from "./i18n.Config.js";

// Used only while the pages are saved at build time. That runs in Node, where
// there is no network and no browser language, so every translation file is
// handed in up front and nothing is fetched.
export const initServerI18n = (resources) =>
  i18n.use(initReactI18next).init({
    ...i18nConfig,
    lng: i18nConfig.fallbackLng,
    ns: Object.keys(resources[i18nConfig.fallbackLng]),
    resources,
    initAsync: false,
  });

export default i18n;
