import { localePath } from "../../../../../00_config/_config.index.js";

// Single source of truth for the nav, so adding a page is one entry, not one <li>.
// Paths go through localePath so no link can lose its language prefix.
export const NAV_LINKS = (t, lang) => {
  return [
    { to: localePath(lang, "menu"), label: t("header.nav_links.menu") },
    { to: localePath(lang, "contact"), label: t("header.nav_links.contact") },
  ];
};
