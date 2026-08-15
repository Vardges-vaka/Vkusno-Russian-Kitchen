import PropTypes from "prop-types";
import Menu_itemCard from "./Menu_itemCard.jsx";
import {
  categoryShape,
  langShape,
  translateFn,
  pickLocale,
} from "../../../../04_hlprs/_hlprs.index.js";
import "../00_menu_styles/Menu_categorySection.css";

const Menu_categorySection = ({ category, lang, t, onOrderClick }) => {
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
            onOrderClick={onOrderClick}
          />
        ))}
      </div>
    </section>
  );
};

Menu_categorySection.propTypes = {
  category: categoryShape.isRequired,
  lang: langShape.isRequired,
  t: translateFn.isRequired,
  onOrderClick: PropTypes.func.isRequired,
};

export default Menu_categorySection;
