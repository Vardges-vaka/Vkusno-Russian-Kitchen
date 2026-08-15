import PropTypes from "prop-types";
import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { langShape, translateFn, pickLocale } from "../../../../04_hlprs/_hlprs.index.js";
import { INGREDIENT_OPTIONS } from "../04_menu_const/INGREDIENTS.js";
import { SORT_OPTIONS } from "../03_menu_hlprs/_menu_hlprs.index.js";
import Menu_ingredientPicker from "./Menu_ingredientPicker.jsx";
import "../00_menu_styles/Menu_filters.css";

// Optional filter panel, collapsed by default so the menu still reads as a
// menu rather than a search tool. The toggle shows a dot when something is
// active, so a filtered view is never a mystery.
const Menu_filters = ({
  lang,
  t,
  filters,
  onChange,
  onReset,
  hasActive,
  resultCount,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Labels come from the same dictionary the modal uses, so the filter reads in
  // the active language. Sorted by the localised label rather than the English
  // id, or the Arabic list would appear in English order.
  //
  // `haystack` carries the name in ALL languages, so the picker's own search
  // finds "Cottage cheese" when someone types "творог" in an English UI.
  const ingredients = useMemo(
    () =>
      INGREDIENT_OPTIONS.map((option) => ({
        id: option.id,
        label: pickLocale(option, lang),
        haystack: [option.en, option.ru, option.ar].filter(Boolean).join(" "),
      })).sort((a, b) => a.label.localeCompare(b.label, lang)),
    [lang],
  );

  return (
    <div className="Menu_filters">
      <div className="Menu_filters_bar">
        <button
          type="button"
          className={`Menu_filters_toggle${hasActive ? " Menu_filters_toggle--active" : ""}`}
          aria-expanded={isOpen}
          aria-controls="Menu_filters_panel"
          onClick={() => setIsOpen((open) => !open)}>
          <SlidersHorizontal size={16} aria-hidden="true" />
          {t("menu.filters.title")}
          {hasActive && <span className="Menu_filters_dot" aria-hidden="true" />}
        </button>

        <p className="Menu_filters_count" role="status">
          {t("menu.filters.results", { count: resultCount })}
        </p>
      </div>

      <div id="Menu_filters_panel" className="Menu_filters_panel" hidden={!isOpen}>
        <label className="Menu_filters_field Menu_filters_field--sort">
          <span className="Menu_filters_label">{t("menu.filters.sort")}</span>
          <select
            className="Menu_filters_select"
            value={filters.sort}
            onChange={(event) => onChange({ sort: event.target.value })}>
            {SORT_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {t(`menu.filters.sortOptions.${option}`)}
              </option>
            ))}
          </select>
        </label>

        <Menu_ingredientPicker
          label={t("menu.filters.with")}
          options={ingredients}
          selected={filters.withIngredients}
          onChange={(withIngredients) => onChange({ withIngredients })}
          lang={lang}
          t={t}
        />

        <Menu_ingredientPicker
          label={t("menu.filters.without")}
          options={ingredients}
          selected={filters.withoutIngredients}
          onChange={(withoutIngredients) => onChange({ withoutIngredients })}
          lang={lang}
          t={t}
        />

        {hasActive && (
          <button type="button" className="Menu_filters_reset" onClick={onReset}>
            <X size={14} aria-hidden="true" />
            {t("menu.filters.clear")}
          </button>
        )}
      </div>
    </div>
  );
};

Menu_filters.propTypes = {
  lang: langShape.isRequired,
  t: translateFn.isRequired,
  filters: PropTypes.shape({
    sort: PropTypes.string.isRequired,
    withIngredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    withoutIngredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  hasActive: PropTypes.bool,
  resultCount: PropTypes.number.isRequired,
};

export default Menu_filters;
