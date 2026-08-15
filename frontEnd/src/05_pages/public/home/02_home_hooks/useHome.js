import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useInView, useReducedMotion } from "framer-motion";
import { Categories } from "../../menu/04_menu_const/CATEGORIES.js";

const FEATURED_COUNT = 10;

// Both lists derive from CATEGORIES.js, which is a static module import - they
// are identical for every visitor and never change at runtime. Computed once at
// module load rather than in a useMemo: a per-instance memo with an empty
// dependency array was doing the same work while the React Compiler flagged it
// as unpreservable (the push-in-a-loop below defeats its analysis).

// One book per dish - every dish on the menu, each exactly once.
//
// This used to pad to a fixed 80 "books" by looping the menu, which meant
// roughly a dozen dishes appeared twice on the shelf (and got worse as dishes
// were taken off the menu - at 67 active it was repeating 13). A customer
// seeing the same dish twice reads it as a bug, and each duplicate cost
// another image. Shelf density is a styling concern; it does not need fake
// stock to fill it.
const BOOKSHELF_ITEMS = Categories.flatMap(
  (category) => category.menuItems || [],
).map((item) => ({ ...item, uniqueId: String(item.id) }));

// One dish per category for mobile/tablet carousel - no duplicates.
const FEATURED_ITEMS = Categories.map((category) => category.menuItems?.[0])
  .filter(Boolean)
  .slice(0, FEATURED_COUNT);

export const useHome = () => {
  const { i18n } = useTranslation("Home");
  const lang = (i18n.language || "en").split("-")[0];

  const specialtiesRef = useRef(null);
  const bookshelfRef = useRef(null);

  const isSpecialtiesInView = useInView(specialtiesRef, {
    once: true,
    amount: 0.3,
  });

  // Nine stylesheets already respect prefers-reduced-motion, but framer-motion
  // drives its animations from JS props, which CSS media queries cannot reach -
  // so the 80-card stagger on this page ran regardless of the OS setting.
  // Components use this to skip the enter offsets and land at the final state.
  const shouldReduceMotion = useReducedMotion();

  return {
    lang,
    specialtiesRef,
    bookshelfRef,
    isSpecialtiesInView,
    shouldReduceMotion,
    bookshelfItems: BOOKSHELF_ITEMS,
    featuredItems: FEATURED_ITEMS,
  };
};
