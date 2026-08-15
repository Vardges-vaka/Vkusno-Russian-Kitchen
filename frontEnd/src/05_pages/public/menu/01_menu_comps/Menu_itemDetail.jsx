import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import {
  menuItemShape,
  langShape,
  translateFn,
  pickLocale,
} from "../../../../04_hlprs/_hlprs.index.js";
import {
  pickIngredient,
  isRenderableIngredient,
} from "../04_menu_const/INGREDIENTS.js";
import "../00_menu_styles/Menu_itemModal.css";

// The dish content itself - photo, price, description, nutrition, ingredients.
// Rendered in two places: inside Menu_itemModal (overlay, when you click a card)
// and inside MenuItem (standalone page, on a direct hit or from a crawler).
// Keeping it here means the two can never drift apart.
//
// `headingLevel` differs by context: the overlay sits inside the menu page, so
// its title is an h2; the standalone page's title IS the page heading, so h1.
const Menu_itemDetail = ({ item, lang, t, onOrder, headingLevel = "h2" }) => {
  const Heading = headingLevel;
  const name = pickLocale(item.name, lang);

  // Long descriptions live in the MenuItems locale namespace rather than in
  // menuItems.js: ~95 KB across three languages, of which only this component
  // ever renders any. Keeping them in the bundle meant the home page paid for
  // Arabic and Russian dish copy it would never show.
  //
  // useSuspense: false so opening a dish never suspends the page it sits on.
  // The short description covers the gap on the first open; after that the
  // namespace is cached.
  const { t: tItems, ready } = useTranslation("MenuItems", { useSuspense: false });
  const longDescription = ready
    ? tItems(`long.${item.id}`, { defaultValue: "" })
    : "";
  const description = longDescription || pickLocale(item.description?.short, lang);

  // Drinks have null nutrition values - hide the whole block then
  const hasNutrition = item.nutrition && item.nutrition.calories != null;

  // Translate to the active language and drop leaked spreadsheet header rows.
  // Deduped because several raw strings collapse to the same display name
  // once the kitchen's "(Est.)" provenance notes are stripped.
  const ingredients = [
    ...new Set(
      (item.ingredients || [])
        .filter(isRenderableIngredient)
        .map((ingredient) => pickIngredient(ingredient, lang)),
    ),
  ];

  const NUTRITION_ROWS = hasNutrition
    ? [
        { key: "calories", value: item.nutrition.calories },
        { key: "protein", value: `${item.nutrition.protein} g` },
        { key: "fat", value: `${item.nutrition.fat} g` },
        { key: "carbs", value: `${item.nutrition.carbs} g` },
      ]
    : [];

  return (
    <>
      {item.images?.full && (
        <img
          className="Menu_itemModal_photo"
          src={item.images.full}
          alt={name}
        />
      )}

      <div className="Menu_itemModal_body">
        <div className="Menu_itemModal_titleRow">
          <Heading className="Menu_itemModal_name">{name}</Heading>
          <div className="Menu_itemModal_actions">
            <p className="Menu_itemModal_price">
              {item.price} {t("menu.currency")}
            </p>
            <button
              type="button"
              className="Menu_itemModal_orderBtn"
              aria-label={`${t("menu.order")} - ${name}`}
              onClick={() => onOrder(item)}>
              {t("menu.order")}
            </button>
          </div>
        </div>

        {description && (
          <p className="Menu_itemModal_description">{description}</p>
        )}

        {hasNutrition && (
          <>
            <h3 className="Menu_itemModal_sectionTitle">
              {t("menu.nutrition.title")}
            </h3>
            <ul className="Menu_itemModal_nutrition">
              {NUTRITION_ROWS.map(({ key, value }) => (
                <li key={key} className="Menu_itemModal_nutrition_pill">
                  <span className="Menu_itemModal_nutrition_value">{value}</span>
                  <span className="Menu_itemModal_nutrition_label">
                    {t(`menu.nutrition.${key}`)}
                  </span>
                </li>
              ))}
            </ul>
            <p className="Menu_itemModal_nutrition_notice">
              {t("menu.nutrition.notice")}
            </p>
          </>
        )}

        {ingredients.length > 0 && (
          <>
            <h3 className="Menu_itemModal_sectionTitle">
              {t("menu.ingredients")}
            </h3>
            <ul className="Menu_itemModal_ingredients">
              {ingredients.map((ingredient) => (
                <li key={ingredient} className="Menu_itemModal_ingredient">
                  {ingredient}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
};

Menu_itemDetail.propTypes = {
  item: menuItemShape.isRequired,
  lang: langShape.isRequired,
  t: translateFn.isRequired,
  onOrder: PropTypes.func.isRequired,
  headingLevel: PropTypes.oneOf(["h1", "h2"]),
};

export default Menu_itemDetail;
