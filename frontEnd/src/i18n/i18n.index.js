import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { isSupportedLanguage } from "../00_config/_config.index.js";
import { i18nConfig } from "./i18n.Config.js";

// Browser only. The build step that saves pages uses i18n.server.js instead.
//
// The address decides the language (/ru/menu is Russian). Starting i18next in
// that language means the first render already matches a saved page, instead
// of rendering in the last-used language and switching a moment later. With
// no language in the address (the bare "/"), the detector decides as before.
const urlLanguage = window.location.pathname.split("/")[1];

// Resolves when the first translation files are in memory. main.jsx waits for
// it before attaching React to a saved page.
export const i18nReady = i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    ...i18nConfig,
    ...(isSupportedLanguage(urlLanguage) ? { lng: urlLanguage } : {}),
  });

export default i18n;
