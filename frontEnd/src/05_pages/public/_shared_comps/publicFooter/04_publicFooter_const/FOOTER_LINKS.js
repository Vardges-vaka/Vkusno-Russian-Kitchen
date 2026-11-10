import { localePath } from "../../../../../00_config/_config.index.js";

// Same single-source-of-truth pattern as the header nav.
// Careers is not in this list. It sits under the social links.
export const FOOTER_LINKS = (t, lang) => {
  return [
    { to: localePath(lang, "faq"), label: t("footer.nav_links.faq") },
    { to: localePath(lang, "privacy"), label: t("footer.nav_links.privacy") },
  ];
};
