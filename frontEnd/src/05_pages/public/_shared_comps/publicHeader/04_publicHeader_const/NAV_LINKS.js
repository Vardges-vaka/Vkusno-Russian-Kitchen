export const NAV_LINKS = (t) => {
  return [
    { to: "/", label: t("header.nav_links.home") },
    { to: "/menu", label: t("header.nav_links.menu") },
    { to: "/contact", label: t("header.nav_links.contact") },
  ];
};