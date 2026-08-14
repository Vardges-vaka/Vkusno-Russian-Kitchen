import { useState, useEffect, useRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useInView } from "framer-motion";
import { Categories } from "../../menu/04_menu_const/CATEGORIES.js";

const BOOKSHELF_TARGET = 80;
const FEATURED_COUNT = 10;

export const useHome = () => {
  const { i18n } = useTranslation("Home");
  const lang = (i18n.language || "en").split("-")[0];

  const [isLoaded, setIsLoaded] = useState(false);
  const specialtiesRef = useRef(null);
  const bookshelfRef = useRef(null);

  const isSpecialtiesInView = useInView(specialtiesRef, {
    once: true,
    amount: 0.3,
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Flatten the static menu into one long shelf — repeat real dishes until
  // we have ~80 "books", same visual density as the old site.
  const bookshelfItems = useMemo(() => {
    const allMenuItems = Categories.flatMap(
      (category) => category.menuItems || [],
    );
    if (!allMenuItems.length) return [];

    const repeats = Math.ceil(BOOKSHELF_TARGET / allMenuItems.length);
    const expanded = [];

    for (let copy = 0; copy < repeats; copy += 1) {
      allMenuItems.forEach((item) => {
        expanded.push({
          ...item,
          uniqueId: `${item.id}-copy-${copy}`,
        });
      });
    }

    return expanded.slice(0, BOOKSHELF_TARGET);
  }, []);

  // One dish per category for mobile/tablet carousel — no duplicates.
  const featuredItems = useMemo(() => {
    const picked = [];

    Categories.forEach((category) => {
      if (category.menuItems?.[0]) {
        picked.push(category.menuItems[0]);
      }
    });

    return picked.slice(0, FEATURED_COUNT);
  }, []);

  return {
    lang,
    isLoaded,
    specialtiesRef,
    bookshelfRef,
    isSpecialtiesInView,
    bookshelfItems,
    featuredItems,
  };
};
