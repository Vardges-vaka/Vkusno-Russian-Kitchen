import PropTypes from "prop-types";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  menuItemShape,
  langShape,
  translateFn,
  pickLocale,
} from "../../../../04_hlprs/_hlprs.index.js";
import { localePath } from "../../../../00_config/_config.index.js";
import { menuItemSlug } from "../03_menu_hlprs/_menu_hlprs.index.js";
import "../00_menu_styles/Menu_itemCard.css";

// React.memo: 70 cards live on the page; without it every card re-renders
// each time the active tab changes while scrolling.
const Menu_itemCard = React.memo(({ item, lang, t, onOrderClick }) => {
  const location = useLocation();
  const name = pickLocale(item.name, lang);
  const shortDescription = pickLocale(item.description?.short, lang);

  // Each photo gets a shimmer placeholder beneath it until it decodes. The
  // menu data is bundled, so the grid itself never "loads" - the images are
  // the only slow part, and a per-card skeleton matches what the reader sees.
  const [imageLoaded, setImageLoaded] = useState(false);

  // Callback ref rather than onLoad alone: an image served from cache can
  // finish loading before React attaches the handler, so the event never
  // fires. Checking .complete on attach covers that case.
  const imageRef = (node) => {
    if (node?.complete && node.naturalWidth > 0) setImageLoaded(true);
  };

  // The dish name is a real <Link>, not a div with role="button". The card
  // used to be role="button" with an Order <button> inside it - interactive
  // nested in interactive, which is invalid ARIA and left screen readers with
  // an ambiguous target. The link's ::after stretches over the whole card so
  // the click area is unchanged; the Order button sits above it via z-index.
  //
  // `background` tells App to render this dish as an overlay over the grid
  // instead of a full page. A crawler or a middle-click gets the real page.
  const to = localePath(lang, `menu/${menuItemSlug(item, lang)}`);

  const handleOrderClick = (event) => {
    event.stopPropagation();
    onOrderClick(item);
  };

  return (
    <article className="Menu_itemCard">
      {item.images?.full ? (
        <div
          className={`Menu_itemCard_photoWrap${
            imageLoaded ? " Menu_itemCard_photoWrap--loaded" : ""
          }`}>
          <img
            ref={imageRef}
            className="Menu_itemCard_photo"
            /* The grid used to load the 1200x900 original for every card -
               9.5 MB of photos for tiles a few hundred pixels wide. The 400px
               tier covers 1x displays; the browser only reaches for the
               original on a high-DPI screen at the widest breakpoint.
               `sizes` mirrors the grid in Menu_categorySection.css. */
            src={item.images.card ?? item.images.full}
            srcSet={
              item.images.card
                ? [
                    `${item.images.card} 400w`,
                    item.images.card2x && `${item.images.card2x} 800w`,
                    `${item.images.full} 1200w`,
                  ]
                    .filter(Boolean)
                    .join(", ")
                : undefined
            }
            sizes="(max-width: 600px) 50vw, (max-width: 1024px) 33vw, 260px"
            alt={name}
            loading="lazy"
            decoding="async"
            /* Intrinsic ratio of the source photos. Without these the grid
               reflows as each image arrives. */
            width={1200}
            height={900}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(true)}
          />
        </div>
      ) : (
        <div className="Menu_itemCard_photoFallback" aria-hidden="true">
          {name.charAt(0)}
        </div>
      )}

      <div className="Menu_itemCard_body">
        <h3 className="Menu_itemCard_name">
          <Link
            className="Menu_itemCard_nameLink"
            to={to}
            state={{ background: location }}>
            {name}
          </Link>
        </h3>
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

Menu_itemCard.propTypes = {
  item: menuItemShape.isRequired,
  lang: langShape.isRequired,
  t: translateFn.isRequired,
  onOrderClick: PropTypes.func.isRequired,
};

export default Menu_itemCard;
