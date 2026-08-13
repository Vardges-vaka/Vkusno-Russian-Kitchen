import React from "react";
import { pickLocale } from "../../../../04_hlprs/_hlprs.index.js";
import "../00_menu_styles/Menu_itemCard.css";

// React.memo: 78 cards live on the page; without it every card re-renders
// each time the active tab changes while scrolling.
const Menu_itemCard = React.memo(({ item, lang, t, onClick }) => {
  const name = pickLocale(item.name, lang);
  const shortDescription = pickLocale(item.description?.short, lang);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick(item);
    }
  };

  return (
    <article
      className="Menu_itemCard"
      tabIndex={0}
      role="button"
      aria-label={name}
      onClick={() => onClick(item)}
      onKeyDown={handleKeyDown}>
      {/* Drinks have no photos yet — show a monogram tile instead */}
      {item.images?.thumbnail ? (
        <img
          className="Menu_itemCard_photo"
          src={item.images.thumbnail}
          alt={name}
          loading="lazy"
          width="100"
          height="100"
        />
      ) : (
        <div className="Menu_itemCard_photoFallback" aria-hidden="true">
          {name.charAt(0)}
        </div>
      )}

      <div className="Menu_itemCard_body">
        <h3 className="Menu_itemCard_name">{name}</h3>
        {shortDescription && (
          <p className="Menu_itemCard_description">{shortDescription}</p>
        )}
        <p className="Menu_itemCard_price">
          {item.price}
          <span className="Menu_itemCard_currency">{t("menu.currency")}</span>
        </p>
      </div>
    </article>
  );
});

Menu_itemCard.displayName = "Menu_itemCard";

export default Menu_itemCard;
