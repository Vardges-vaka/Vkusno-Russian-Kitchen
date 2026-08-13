// Menu data stores localized strings as { en, ar, ru }.
// Falls back to English so a missing translation never renders a blank.
export const pickLocale = (localized, lang) => {
  if (!localized) return "";
  return localized[lang] || localized.en || "";
};
