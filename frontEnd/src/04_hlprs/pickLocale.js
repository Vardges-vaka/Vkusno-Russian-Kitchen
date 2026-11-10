// Menu data stores localized strings as { en, ar, ru }.
// Falls back to English so a missing translation never renders a blank.
export const pickLocale = (localized, lang) => {
  if (!localized) return "";
  return localized[lang] || localized.en || "";
};

// Lists need an array fallback, not "". pickLocale is for one string;
// duties and offers are mapped, and a missing translation must not throw.
export const pickLocaleList = (localized, lang) => {
  const list = localized?.[lang];
  if (Array.isArray(list) && list.length) return list;
  if (Array.isArray(localized?.en)) return localized.en;
  return [];
};
