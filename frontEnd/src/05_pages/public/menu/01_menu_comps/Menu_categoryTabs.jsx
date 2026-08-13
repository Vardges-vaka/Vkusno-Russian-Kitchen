import { useEffect, useRef } from "react";
import { pickLocale } from "../../../../04_hlprs/_hlprs.index.js";
import "../00_menu_styles/Menu_categoryTabs.css";

const Menu_categoryTabs = ({ categories, lang, activeCategoryId, onSelect }) => {
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

  return (
    <div
      className="Menu_categoryTabs"
      ref={tabsRef}
      role="tablist"
      aria-label="Menu categories">
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          role="tab"
          aria-selected={category.id === activeCategoryId}
          className={
            category.id === activeCategoryId
              ? "Menu_categoryTabs_tab Menu_categoryTabs_tab--active"
              : "Menu_categoryTabs_tab"
          }
          onClick={() => onSelect(category.id)}>
          {pickLocale(category.name, lang)}
        </button>
      ))}
    </div>
  );
};

export default Menu_categoryTabs;
