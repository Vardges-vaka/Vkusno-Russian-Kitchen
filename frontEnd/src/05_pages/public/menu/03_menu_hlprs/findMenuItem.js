import { Categories } from "../04_menu_const/CATEGORIES.js";
import { SUPPORTED_LANGUAGES } from "../../../../00_config/_config.index.js";

// Flat index built once at module load. The menu is static data, so paying
// for a lookup table beats scanning 13 categories on every route change.
const BY_ID = new Map();
const BY_SLUG = new Map();

for (const category of Categories) {
  for (const item of category.menuItems || []) {
    BY_ID.set(item.id, { item, categoryId: category.id });
    // A dish is reachable by its slug in ANY language, not just the one
    // currently active - so /ar/menu/pelmeni-with-meat still resolves and can
    // redirect to the Arabic slug rather than 404.
    for (const lang of SUPPORTED_LANGUAGES) {
      const slug = item.slug?.[lang];
      if (slug) BY_SLUG.set(slug, { item, categoryId: category.id, lang });
    }
  }
}

export const findMenuItemById = (itemId) => BY_ID.get(Number(itemId)) ?? null;

export const findMenuItemBySlug = (slug) => (slug ? BY_SLUG.get(slug) ?? null : null);

// The canonical URL segment for a dish in a given language.
export const menuItemSlug = (item, lang) =>
  item?.slug?.[lang] || item?.slug?.en || String(item?.id ?? "");
