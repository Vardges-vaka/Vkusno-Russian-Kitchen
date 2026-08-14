import React from "react";
import { pickLocale } from "../../../../04_hlprs/_hlprs.index.js";
import "../00_menu_styles/Menu_itemCard.css";

// React.memo: 78 cards live on the page; without it every card re-renders
// each time the active tab changes while scrolling.
const Menu_itemCard = React.memo(({ item, lang, t, onClick, onOrderClick }) => {
  const name = pickLocale(item.name, lang);
  const shortDescription = pickLocale(item.description?.short, lang);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick(item);
    }
  };

  // stopPropagation: the whole card opens the details modal, so the
  // Order button must not bubble its click up to the card.
  const handleOrderClick = (event) => {
    event.stopPropagation();
    onOrderClick(item);
  };

  return (
    <article
      className="Menu_itemCard"
      tabIndex={0}
      role="button"
      aria-label={name}
      onClick={() => onClick(item)}
      onKeyDown={handleKeyDown}>
      {/* Full-size image: the card photo is now large, thumbnails look blurry.
          loading="lazy" keeps the initial page load light despite the size. */}
      {item.images?.full ? (
        <img
          className="Menu_itemCard_photo"
          src={item.images.full}
          alt={name}
          loading="lazy"
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

        <div className="Menu_itemCard_footer">
          <p className="Menu_itemCard_price">
            {item.price}
            <span className="Menu_itemCard_currency">{t("menu.currency")}</span>
          </p>
          <button
            type="button"
            className="Menu_itemCard_orderBtn"
            aria-label={`${t("menu.order")} - ${name}`}
            onClick={handleOrderClick}>
            {t("menu.order")}
          </button>
        </div>
      </div>
    </article>
  );
});

Menu_itemCard.displayName = "Menu_itemCard";

export default Menu_itemCard;
