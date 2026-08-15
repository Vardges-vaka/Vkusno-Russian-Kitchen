import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import {
  categoryShape,
  langShape,
  translateFn,
  pickLocale,
} from "../../../../04_hlprs/_hlprs.index.js";
import "../00_menu_styles/Menu_categoryTabs.css";

const Menu_categoryTabs = ({ categories, lang, t, activeCategoryId, onSelect }) => {
  const tabsRef = useRef(null);

  // When scrolling the page changes the active category, keep its pill
  // visible inside the horizontally-scrollable tab strip.
  useEffect(() => {
    const activeTab = tabsRef.current?.querySelector(
      ".Menu_categoryTabs_tab--active",
    );
    if (activeTab) {
      activeTab.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeCategoryId]);

  // Not a tablist. role="tab" promises arrow-key navigation and matching
  // role="tabpanel" sections, and implementing that properly would fight the
  // IntersectionObserver scroll-spy that drives the active state. These are
  // in-page jump links, so a <nav> of buttons describes what they actually do
  // and behaves correctly with no extra ARIA. aria-current marks the section
  // the reader is currently in.
  return (
    <nav
      className="Menu_categoryTabs"
      ref={tabsRef}
      aria-label={t("menu.a11y.categoryNav")}>
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          aria-current={category.id === activeCategoryId ? "true" : undefined}
          className={
            category.id === activeCategoryId
              ? "Menu_categoryTabs_tab Menu_categoryTabs_tab--active"
              : "Menu_categoryTabs_tab"
          }
          onClick={() => onSelect(category.id)}>
          {pickLocale(category.name, lang)}
        </button>
      ))}
    </nav>
  );
};

Menu_categoryTabs.propTypes = {
  categories: PropTypes.arrayOf(categoryShape).isRequired,
  lang: langShape.isRequired,
  t: translateFn.isRequired,
  activeCategoryId: PropTypes.number,
  onSelect: PropTypes.func.isRequired,
};

export default Menu_categoryTabs;
