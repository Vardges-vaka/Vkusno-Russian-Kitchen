import { useMenu } from "./02_menu_hooks/_menu_hooks.index.js";
import {
  Menu_categoryTabs,
  Menu_categorySection,
  Menu_itemModal,
  Menu_orderModal,
  Menu_searchBar,
} from "./01_menu_comps/_menu_comps.index.js";
import "./00_menu_styles/Menu.css";

const Menu = () => {
  const {
    t,
    lang,
    categories,
    searchQuery,
    activeCategoryId,
    selectedItem,
    orderItem,
    handlers,
  } = useMenu();

  const hasResults = categories.length > 0;

  return (
    <div className="Menu_container">
      <header className="Menu_hero">
        <h1 className="Menu_hero_title">{t("menu.title")}</h1>
        <p className="Menu_hero_subtitle">{t("menu.subtitle")}</p>
        <Menu_searchBar
          value={searchQuery}
          onChange={handlers.handleSearchChange}
          t={t}
        />
      </header>

      {hasResults ? (
        <>
          <Menu_categoryTabs
            categories={categories}
            lang={lang}
            activeCategoryId={activeCategoryId}
            onSelect={handlers.handleCategorySelect}
          />

          <main className="Menu_sections">
            {categories.map((category) => (
              <Menu_categorySection
                key={category.id}
                category={category}
                lang={lang}
                t={t}
                onItemClick={handlers.handleItemOpen}
                onOrderClick={handlers.handleOrderOpen}
              />
            ))}
          </main>
        </>
      ) : (
        <p className="Menu_emptyState" role="status">
          {t("menu.search.noResults", { query: searchQuery.trim() })}
        </p>
      )}

      {selectedItem && (
        <Menu_itemModal
          item={selectedItem}
          lang={lang}
          t={t}
          onClose={handlers.handleItemClose}
        />
      )}

      {orderItem && (
        <Menu_orderModal
          item={orderItem}
          lang={lang}
          t={t}
          onClose={handlers.handleOrderClose}
        />
      )}
    </div>
  );
};

export default Menu;
