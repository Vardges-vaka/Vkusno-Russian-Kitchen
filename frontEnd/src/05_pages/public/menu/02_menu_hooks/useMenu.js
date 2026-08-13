import { useState, useEffect, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Categories } from "../04_menu_const/CATEGORIES.js";

export const useMenu = () => {
  const { t, i18n } = useTranslation("Menu");
  // "en-US" -> "en" so it matches the data's locale keys (en / ar / ru)
  const lang = (i18n.language || "en").split("-")[0];

  const [activeCategoryId, setActiveCategoryId] = useState(Categories[0]?.id);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const normalizedQuery = searchQuery.trim().toLowerCase();

  // Categories narrowed by the search query. Matches the dish name in the
  // current language AND in English (so "plov" works while browsing in
  // Russian), plus the short description. Empty categories drop out.
  const visibleCategories = useMemo(() => {
    if (!normalizedQuery) return Categories;

    return Categories.map((category) => ({
      ...category,
      menuItems: category.menuItems.filter((item) => {
        const haystack = [
          item.name?.[lang],
          item.name?.en,
          item.description?.short?.[lang],
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return haystack.includes(normalizedQuery);
      }),
    })).filter((category) => category.menuItems.length > 0);
  }, [normalizedQuery, lang]);

  // The header is sticky with a variable height (it wraps on mobile),
  // so we measure it and expose the value to CSS. The category tabs use
  // it as their sticky "top" and sections as their scroll-margin.
  useEffect(() => {
    const header = document.querySelector(".PublicHeader_container");

    const setHeaderOffset = () => {
      document.documentElement.style.setProperty(
        "--menu_header_offset",
        `${header ? header.offsetHeight : 0}px`,
      );
    };

    setHeaderOffset();
    window.addEventListener("resize", setHeaderOffset);
    return () => window.removeEventListener("resize", setHeaderOffset);
  }, []);

  // Highlight the tab of whichever category section currently sits in the
  // "reading band" just below the header. IntersectionObserver only fires
  // when a section enters/leaves that band — far cheaper than a scroll handler.
  // Re-runs when search changes the rendered sections, so we observe the
  // current DOM nodes rather than stale removed ones.
  useEffect(() => {
    const sections = document.querySelectorAll("[data-menu-category]");
    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategoryId(Number(entry.target.dataset.menuCategory));
          }
        });
      },
      // Band = 25% from the top of the viewport down to 35% — roughly
      // "what the eye is reading" once the sticky header/tabs are excluded.
      { rootMargin: "-25% 0px -65% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [visibleCategories]);

  const handleCategorySelect = useCallback((categoryId) => {
    setActiveCategoryId(categoryId);
    const section = document.getElementById(`menuCategory-${categoryId}`);
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleItemOpen = useCallback((item) => {
    setSelectedItem(item);
  }, []);

  const handleItemClose = useCallback(() => {
    setSelectedItem(null);
  }, []);

  const handleSearchChange = useCallback((value) => {
    setSearchQuery(value);
  }, []);

  return {
    t,
    lang,
    categories: visibleCategories,
    searchQuery,
    activeCategoryId,
    selectedItem,
    handlers: {
      handleCategorySelect,
      handleItemOpen,
      handleItemClose,
      handleSearchChange,
    },
  };
};
