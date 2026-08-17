import { useMenu } from "./02_menu_hooks/_menu_hooks.index.js";
import { PageMeta } from "../../../02_comps/_comps.index.js";
import { graph, menuNode } from "../../../04_hlprs/_hlprs.index.js";
import { Categories } from "./04_menu_const/CATEGORIES.js";
import {
  Menu_categoryTabs,
  Menu_categorySection,
  Menu_filters,
  Menu_orderModal,
  Menu_searchBar,
} from "./01_menu_comps/_menu_comps.index.js";
import "./00_menu_styles/Menu.css";

const Menu = () => {
  const {
    t,
    lang,
    categories,
    filters,
    searchQuery,
    resultCount,
    filtersActive,
    activeCategoryId,
    orderItem,
    handlers,
  } = useMenu();

  const hasResults = categories.length > 0;

  return (
    <div className="Menu_container">

      <PageMeta
        title={t("meta.title")}
        description={t("meta.description")}
        jsonLd={graph(menuNode(Categories, lang))}
      />

      <header className="Menu_hero">
        <h1 className="Menu_hero_lead">{t("menu.hero.lead")}</h1>
        <p className="Menu_hero_description">{t("menu.hero.description")}</p>
        <Menu_searchBar
          value={searchQuery}
          onChange={handlers.handleSearchChange}
          t={t}
        />
        <Menu_filters
          lang={lang}
          t={t}
          filters={filters}
          onChange={handlers.handleFilterChange}
          onReset={handlers.handleFilterReset}
          hasActive={filtersActive}
          resultCount={resultCount}
        />
      </header>

      {hasResults ? (
        <>
          <Menu_categoryTabs
            categories={categories}
            lang={lang}
            t={t}
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
