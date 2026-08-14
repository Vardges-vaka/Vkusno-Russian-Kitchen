import { useEffect } from "react";
import { pickLocale } from "../../../../04_hlprs/_hlprs.index.js";
import "../00_menu_styles/Menu_itemModal.css";

const Menu_itemModal = ({ item, lang, t, onClose }) => {
  // Esc closes the modal; page scroll is locked while it is open
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  const name = pickLocale(item.name, lang);
  const longDescription = pickLocale(item.description?.long, lang);

  // Drinks have null nutrition values — hide the whole block then
  const hasNutrition = item.nutrition && item.nutrition.calories != null;
  const hasIngredients = item.ingredients && item.ingredients.length > 0;

  const NUTRITION_ROWS = hasNutrition
    ? [
        { key: "calories", value: item.nutrition.calories },
        { key: "protein", value: `${item.nutrition.protein} g` },
        { key: "fat", value: `${item.nutrition.fat} g` },
        { key: "carbs", value: `${item.nutrition.carbs} g` },
      ]
    : [];

  return (
    <div className="Menu_itemModal" onClick={onClose}>
      <div
        className="Menu_itemModal_dialog"
        role="dialog"
        aria-modal="true"
        aria-label={name}
        onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          className="Menu_itemModal_close"
          aria-label={t("menu.close")}
          onClick={onClose}>
          ×
        </button>

        {item.images?.full && (
          <img
            className="Menu_itemModal_photo"
            src={item.images.full}
            alt={name}
          />
        )}

        <div className="Menu_itemModal_body">
          <div className="Menu_itemModal_titleRow">
            <h2 className="Menu_itemModal_name">{name}</h2>
            <p className="Menu_itemModal_price">
              {item.price} {t("menu.currency")}
            </p>
          </div>

          {longDescription && (
            <p className="Menu_itemModal_description">{longDescription}</p>
          )}

          {hasNutrition && (
            <>
              <h3 className="Menu_itemModal_sectionTitle">
                {t("menu.nutrition.title")}
              </h3>
              <ul className="Menu_itemModal_nutrition">
                {NUTRITION_ROWS.map(({ key, value }) => (
                  <li key={key} className="Menu_itemModal_nutrition_pill">
                    <span className="Menu_itemModal_nutrition_value">
                      {value}
                    </span>
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

          {hasIngredients && (
            <>
              <h3 className="Menu_itemModal_sectionTitle">
                {t("menu.ingredients")}
              </h3>
              <ul className="Menu_itemModal_ingredients">
                {item.ingredients.map((ingredient) => (
                  <li key={ingredient} className="Menu_itemModal_ingredient">
                    {ingredient}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu_itemModal;
