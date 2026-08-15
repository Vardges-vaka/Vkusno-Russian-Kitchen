import PropTypes from "prop-types";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  SUPPORTED_LANGUAGES,
  localePath,
  resolveLanguage,
} from "../../../00_config/_config.index.js";
import { PageMeta } from "../../../02_comps/_comps.index.js";
import {
  breadcrumbNode,
  graph,
  menuItemNode,
  pickLocale,
} from "../../../04_hlprs/_hlprs.index.js";
import { findMenuItemBySlug, menuItemSlug } from "./03_menu_hlprs/_menu_hlprs.index.js";
import {
  Menu_itemDetail,
  Menu_itemModal,
  Menu_orderModal,
} from "./01_menu_comps/_menu_comps.index.js";
import "./00_menu_styles/MenuItem.css";

// One dish, at /{lang}/menu/{slug}.
//
// Two presentations, one component:
//   variant="overlay" - you clicked a card, so the modal sits over the grid
//                       (App passes the previous location as `background`)
//   variant="page"    - a direct hit, a refresh, or a crawler: a real page
//                       with the dish name as its h1
//
// The dish content itself is Menu_itemDetail in both cases.
const MenuItem = ({ variant = "page" }) => {
  const { t, i18n } = useTranslation("Menu");
  const { lang: langParam, slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const lang = resolveLanguage(langParam, i18n.language);

  // The order modal is a transient action rather than a destination, so it
  // stays local state instead of becoming another URL.
  const [orderItem, setOrderItem] = useState(null);

  const match = findMenuItemBySlug(slug);

  const handleClose = useCallback(() => {
    // Came from the grid - step back so the scroll position survives.
    if (location.state?.background) navigate(-1);
    else navigate(localePath(lang, "menu"));
  }, [location.state, navigate, lang]);

  const handleOrder = useCallback((item) => setOrderItem(item), []);
  const handleOrderClose = useCallback(() => setOrderItem(null), []);

  // Unknown slug - send them to the menu rather than a dead end.
  if (!match) return <Navigate to={localePath(lang, "menu")} replace />;

  // Slug from another language (a shared /ru/ link opened by an EN reader, or
  // a language switch on a dish page): redirect to this language's slug so the
  // URL and the content agree, and so there is one canonical URL per dish.
  const canonicalSlug = menuItemSlug(match.item, lang);
  if (canonicalSlug !== slug) {
    return (
      <Navigate
        to={localePath(lang, `menu/${canonicalSlug}`)}
        replace
        state={location.state}
      />
    );
  }

  const { item } = match;
  const name = pickLocale(item.name, lang);

  if (variant === "overlay") {
    return (
      <>
        <Menu_itemModal
          item={item}
          lang={lang}
          t={t}
          onClose={handleClose}
          onOrder={handleOrder}
        />
        {orderItem && (
          <Menu_orderModal
            item={orderItem}
            lang={lang}
            t={t}
            onClose={handleOrderClose}
          />
        )}
      </>
    );
  }

  return (
    <div className="MenuItem_container">
      {/* Only the standalone page emits metadata. In overlay mode the menu
          page underneath already owns the document head, and a modal should
          not rewrite the canonical URL of the page behind it. */}
      <PageMeta
        title={name}
        description={pickLocale(item.description?.short, lang)}
        /* Each language has its own slug, so the alternates cannot be derived
           from this URL - they are built from the dish's own slug map. */
        alternates={Object.fromEntries(
          SUPPORTED_LANGUAGES.map((code) => [
            code,
            localePath(code, `menu/${menuItemSlug(item, code)}`),
          ]),
        )}
        jsonLd={graph(
          menuItemNode(item, lang),
          breadcrumbNode([
            { name: t("meta.title"), path: localePath(lang, "menu") },
            { name, path: localePath(lang, `menu/${canonicalSlug}`) },
          ]),
        )}
      />

      <nav className="MenuItem_breadcrumb" aria-label={t("menu.a11y.categoryNav")}>
        <Link to={localePath(lang, "menu")}>{t("menu.hero.lead")}</Link>
        <span aria-hidden="true"> / </span>
        <span aria-current="page">{name}</span>
      </nav>

      <article className="MenuItem_card">
        <Menu_itemDetail
          item={item}
          lang={lang}
          t={t}
          onOrder={handleOrder}
          headingLevel="h1"
        />
      </article>

      {orderItem && (
        <Menu_orderModal
          item={orderItem}
          lang={lang}
          t={t}
          onClose={handleOrderClose}
        />
      )}
    </div>
  );
};

MenuItem.propTypes = {
  variant: PropTypes.oneOf(["page", "overlay"]),
};

export default MenuItem;
