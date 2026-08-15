import { useEffect } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  isSupportedLanguage,
  localePath,
  resolveLanguage,
} from "../00_config/_config.index.js";
import { useLanguageContext } from "../03_context/_context.index.js";
import {
  PublicHeader,
  PublicFooter,
} from "../05_pages/public/_shared_comps/_public.shared_comps.index.js";

// Layout route for every public page. Two jobs:
//
// 1. The URL is the source of truth for language. Whatever /:lang says wins
//    over localStorage, so a shared /ru/menu link opens in Russian even for a
//    visitor whose last choice was English.
//
// 2. Header and footer render once here instead of being repeated in all six
//    route definitions - which also stops them remounting on every navigation.
const LanguageLayout = () => {
  const { lang } = useParams();
  const { i18n } = useTranslation();
  const { language, toggleLanguage } = useLanguageContext();

  const isValid = isSupportedLanguage(lang);

  useEffect(() => {
    if (isValid && lang !== language) toggleLanguage(lang);
  }, [isValid, lang, language, toggleLanguage]);

  // Unknown prefix (/de/menu, or a stray path segment): send them to the same
  // page under a language we actually have, rather than showing a 404 for what
  // is really just a bad prefix.
  if (!isValid) {
    return (
      <Navigate to={localePath(resolveLanguage(i18n.language))} replace />
    );
  }

  return (
    <>
      <PublicHeader />
      <Outlet />
      <PublicFooter />
    </>
  );
};

export default LanguageLayout;
