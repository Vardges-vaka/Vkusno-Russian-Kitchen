import { createContext, useState, useEffect, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { IS_DEBUG, resolveLanguage } from "../../00_config/_config.index.js";

// Driven by VITE_IS_DEBUG in .env (see IS_DEBUG in 00_config). This used to be
// a hardcoded `true`, which logged on every language change in production.
const isLanguageContext_debug = IS_DEBUG;

const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
  const { i18n } = useTranslation();

  const [language, setLanguage] = useState(() =>
    // Same precedence as the inline script in index.html and as
    // LanguageLayout: the URL wins, so a shared /ar/menu link opens in Arabic
    // without a render in the previously-saved language first.
    //
    // window.location rather than useParams because this provider sits above
    // the Router - it has no route context to read.
    resolveLanguage(
      window.location.pathname.split("/")[1],
      localStorage.getItem("language"),
      i18n.language,
      navigator.language,
    ),
  );

  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
    localStorage.setItem("language", language);

    // Document direction is a document-level concern, so it lives here rather
    // than in LanguageSelect - a leaf presentational component that happens to
    // be mounted. The inline script in index.html already stamped these before
    // first paint; this keeps them correct when the user switches language.
    // dir alone drives RTL now. The old body.rtl class existed for one rule in
    // languageSelect.css, which became an inset-inline-* pair - so nothing
    // reads the class any more and the JS/CSS split it created is gone.
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";

    isLanguageContext_debug && console.log("language changed", language);
  }, [language, i18n]);

  const toggleLanguage = useCallback((newLanguage) => {
    setLanguage(newLanguage);
  }, []);

  // Memoised so consumers only re-render on an actual language change.
  const contextValue = useMemo(
    () => ({
      language,
      toggleLanguage,
    }),
    [language, toggleLanguage],
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

LanguageProvider.displayName = "LanguageProvider";

export { LanguageContext, LanguageProvider };
