import Menu_itemCard from "./Menu_itemCard.jsx";
import { pickLocale } from "../../../../04_hlprs/_hlprs.index.js";
import "../00_menu_styles/Menu_categorySection.css";

const Menu_categorySection = ({ category, lang, t, onItemClick, onOrderClick }) => {
  return (
    <section
      id={`menuCategory-${category.id}`}
      data-menu-category={category.id}
      className="Menu_categorySection"
      aria-label={pickLocale(category.name, lang)}>
      <h2 className="Menu_categorySection_title">
        {pickLocale(category.name, lang)}
      </h2>
      <div className="Menu_categorySection_grid">
        {category.menuItems.map((item) => (
          <Menu_itemCard
            key={item.id}
            item={item}
            lang={lang}
            t={t}
            onClick={onItemClick}
            onOrderClick={onOrderClick}
          />
        ))}
      </div>
    </section>
  );
};

export default Menu_categorySection;
