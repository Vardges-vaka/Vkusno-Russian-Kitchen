import { useCallback, useState } from "react";
import {
  isSupportedLanguage,
  resolveLanguage,
} from "../../../../../00_config/_config.index.js";
import { MENU_PDFS } from "../../../../../01_assets/_assets.index.js";

export const useMenuDownload = (lang) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(() =>
    resolveLanguage(lang),
  );

  const open = useCallback(() => {
    // A PDF choice is temporary; each visit starts with the page language.
    setSelectedLanguage(resolveLanguage(lang));
    setIsOpen(true);
  }, [lang]);

  const close = useCallback(() => setIsOpen(false), []);

  const selectLanguage = useCallback((language) => {
    if (isSupportedLanguage(language)) setSelectedLanguage(language);
  }, []);

  return {
    isOpen,
    selectedLanguage,
    selectedPdf: MENU_PDFS[selectedLanguage],
    handlers: { open, close, selectLanguage },
  };
};
