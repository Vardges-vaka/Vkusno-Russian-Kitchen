import { Categories } from "../04_menu_const/CATEGORIES.js";
import { itemHasAnyIngredient } from "../04_menu_const/INGREDIENTS.js";
import { matchesQuery } from "./searchMenu.js";

// Sort keys are stable strings so they can live in the URL later without
// depending on array order. "default" keeps the menu's own curation.
export const SORT_OPTIONS = ["default", "priceAsc", "priceDesc"];
export const DEFAULT_FILTERS = {
  query: "",
  sort: "default",
  withIngredients: [],
  withoutIngredients: [],
};

const SORTERS = {
  priceAsc: (a, b) => (a.price ?? 0) - (b.price ?? 0),
  priceDesc: (a, b) => (b.price ?? 0) - (a.price ?? 0),
};

// Applies search + filters + sort and returns categories with their surviving
// items. Categories that end up empty drop out, so the page never renders a
// heading with nothing under it.
//
// Sorting happens WITHIN each category rather than flattening the menu: the
// category structure is the page's navigation (sticky tabs, scroll-spy), and
// a global price sort would leave those tabs pointing at nothing coherent.
export const filterCategories = (filters) => {
  const { query, sort, withIngredients, withoutIngredients } = {
    ...DEFAULT_FILTERS,
    ...filters,
  };

  const sorter = SORTERS[sort];

  return Categories.map((category) => {
    const menuItems = category.menuItems.filter((item) => {
      if (!matchesQuery(item, query)) return false;
      // "contains" only narrows when something is ticked - an empty list
      // means "no preference", not "match nothing".
      if (withIngredients.length && !itemHasAnyIngredient(item, withIngredients)) {
        return false;
      }
      if (itemHasAnyIngredient(item, withoutIngredients)) return false;
      return true;
    });

    return {
      ...category,
      menuItems: sorter ? [...menuItems].sort(sorter) : menuItems,
    };
  }).filter((category) => category.menuItems.length > 0);
};

export const countItems = (categories) =>
  categories.reduce((total, category) => total + category.menuItems.length, 0);

// Any filter beyond the search box being active - drives the "clear" button
// and the active-state styling on the filter toggle.
export const hasActiveFilters = (filters) =>
  filters.sort !== DEFAULT_FILTERS.sort ||
  Boolean(filters.withIngredients?.length) ||
  Boolean(filters.withoutIngredients?.length);
