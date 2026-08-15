import { useState, useEffect, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { resolveLanguage } from "../../../../00_config/_config.index.js";
import { Categories } from "../04_menu_const/CATEGORIES.js";
import {
  DEFAULT_FILTERS,
  countItems,
  filterCategories,
  hasActiveFilters,
} from "../03_menu_hlprs/_menu_hlprs.index.js";

export const useMenu = () => {
  const { t, i18n } = useTranslation("Menu");
  const { lang: langParam } = useParams();
  const lang = resolveLanguage(langParam, i18n.language);

  const [activeCategoryId, setActiveCategoryId] = useState(Categories[0]?.id);
  // Dish whose "Order" button was pressed - opens the map + aggregator modal.
  // Transient action rather than a destination, so it stays local state.
  const [orderItem, setOrderItem] = useState(null);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  // Search + ingredient filters + sort, all in one pass. The matching itself
  // lives in 03_menu_hlprs: it indexes every dish across ALL three languages,
  // so the query language is independent of the UI language - typing "Борщ"
  // while browsing in English still finds Borscht.
  const visibleCategories = useMemo(() => filterCategories(filters), [filters]);
  const resultCount = useMemo(
    () => countItems(visibleCategories),
    [visibleCategories],
  );
  const filtersActive = hasActiveFilters(filters);

  // --menu_header_offset (the sticky "top" for the category tabs and the
  // scroll-margin for sections) is published by PublicHeader itself, via
  // usePublicHeader.

  // Highlight the tab of whichever category section currently sits in the
  // "reading band" just below the header. IntersectionObserver only fires
  // when a section enters/leaves that band - far cheaper than a scroll handler.
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
      // Band = 25% from the top of the viewport down to 35% - roughly
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

  const handleOrderOpen = useCallback((item) => {
    setOrderItem(item);
  }, []);

  const handleOrderClose = useCallback(() => {
    setOrderItem(null);
  }, []);

  const handleSearchChange = useCallback((value) => {
    setFilters((current) => ({ ...current, query: value }));
  }, []);

  const handleFilterChange = useCallback((patch) => {
    setFilters((current) => ({ ...current, ...patch }));
  }, []);

  // Resets the filters but keeps the search box - clearing "without: Pork"
  // should not also throw away what the reader typed.
  const handleFilterReset = useCallback(() => {
    setFilters((current) => ({ ...DEFAULT_FILTERS, query: current.query }));
  }, []);

  return {
    t,
    lang,
    categories: visibleCategories,
    filters,
    searchQuery: filters.query,
    resultCount,
    filtersActive,
    activeCategoryId,
    orderItem,
    handlers: {
      handleCategorySelect,
      handleOrderOpen,
      handleOrderClose,
      handleSearchChange,
      handleFilterChange,
      handleFilterReset,
    },
  };
};
