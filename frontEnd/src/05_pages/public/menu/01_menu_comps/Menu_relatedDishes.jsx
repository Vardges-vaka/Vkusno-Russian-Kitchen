import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  menuItemShape,
  langShape,
  translateFn,
  pickLocale,
} from "../../../../04_hlprs/_hlprs.index.js";
import { localePath } from "../../../../00_config/_config.index.js";
import { menuItemSlug } from "../03_menu_hlprs/_menu_hlprs.index.js";
import "../00_menu_styles/Menu_relatedDishes.css";

// The row of other dishes at the foot of a dish page.
//
// Plain links, with no `background` state: each one opens the other dish as
// its own page, which is also the address a crawler follows. Before this row
// a dish page linked to no other dish.
//
// The photo has an empty alt on purpose. The dish name is the link's text
// right under it, and a screen reader would otherwise say the name twice.
const Menu_relatedDishes = ({ items, lang, t }) => {
  if (!items.length) return null;

  return (
    <section className="Menu_related" aria-labelledby="menu-related-title">
      <h2 id="menu-related-title" className="Menu_related_title">
        {t("menu.related.title")}
      </h2>
      <ul className="Menu_related_list">
        {items.map((item) => {
          const name = pickLocale(item.name, lang);
          const photo = item.images?.card ?? item.images?.full;
          return (
            <li key={item.id} className="Menu_related_item">
              <Link
                className="Menu_related_link"
                to={localePath(lang, `menu/${menuItemSlug(item, lang)}`)}>
                {photo ? (
                  <img
                    className="Menu_related_photo"
                    src={photo}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    width={400}
                    height={300}
                  />
                ) : (
                  <span className="Menu_related_photoFallback" aria-hidden="true">
                    {name.charAt(0)}
                  </span>
                )}
                <span className="Menu_related_name">{name}</span>
                <span className="Menu_related_price">
                  {item.price}
                  <span className="Menu_related_currency">
                    {t("menu.currency")}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

Menu_relatedDishes.propTypes = {
  items: PropTypes.arrayOf(menuItemShape).isRequired,
  lang: langShape.isRequired,
  t: translateFn.isRequired,
};

export default Menu_relatedDishes;
