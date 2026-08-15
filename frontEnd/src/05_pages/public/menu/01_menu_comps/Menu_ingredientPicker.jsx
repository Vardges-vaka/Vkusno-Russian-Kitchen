import PropTypes from "prop-types";
import { useId, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { langShape, translateFn } from "../../../../04_hlprs/_hlprs.index.js";
import { normalizeText } from "../03_menu_hlprs/_menu_hlprs.index.js";
import "../00_menu_styles/Menu_ingredientPicker.css";

// Multi-select ingredient list with its own search box. Used twice by
// Menu_filters - once for "contains", once for "without".
//
// 209 ingredients is far too many for a plain checkbox list, so the search box
// is the primary way in. It reuses normalizeText from the menu search, which
// means filtering the options is accent- and script-insensitive too: typing
// "творог" finds Cottage cheese while the UI is in English.
const Menu_ingredientPicker = ({ label, options, selected, onChange, lang, t }) => {
  const [optionQuery, setOptionQuery] = useState("");
  const listId = useId();

  const visibleOptions = useMemo(() => {
    const normalized = normalizeText(optionQuery);
    if (!normalized) return options;
    return options.filter((option) => normalizeText(option.haystack).includes(normalized));
  }, [options, optionQuery]);

  const selectedSet = useMemo(() => new Set(selected), [selected]);

  const toggle = (id) =>
    onChange(
      selectedSet.has(id)
        ? selected.filter((value) => value !== id)
        : [...selected, id],
    );

  // Select-all applies to what is currently VISIBLE, not the whole catalogue -
  // otherwise searching "cheese" and hitting select-all would silently tick
  // 209 boxes rather than the handful on screen.
  const selectAllVisible = () =>
    onChange([...new Set([...selected, ...visibleOptions.map((o) => o.id)])]);

  const clearAll = () => onChange([]);

  return (
    <div className="Menu_ingredientPicker">
      <div className="Menu_ingredientPicker_head">
        <span className="Menu_filters_label" id={`${listId}-label`}>
          {label}
          {selected.length > 0 && (
            <span className="Menu_ingredientPicker_badge">{selected.length}</span>
          )}
        </span>

        <div className="Menu_ingredientPicker_actions">
          <button
            type="button"
            className="Menu_ingredientPicker_action"
            onClick={selectAllVisible}
            disabled={visibleOptions.length === 0}>
            {t("menu.filters.selectAll")}
          </button>
          <button
            type="button"
            className="Menu_ingredientPicker_action"
            onClick={clearAll}
            disabled={selected.length === 0}>
            {t("menu.filters.deselectAll")}
          </button>
        </div>
      </div>

      <div className="Menu_ingredientPicker_search">
        <Search size={14} aria-hidden="true" />
        <input
          type="search"
          className="Menu_ingredientPicker_searchInput"
          value={optionQuery}
          placeholder={t("menu.filters.searchIngredients")}
          aria-label={`${t("menu.filters.searchIngredients")} - ${label}`}
          onChange={(event) => setOptionQuery(event.target.value)}
        />
        {optionQuery && (
          <button
            type="button"
            className="Menu_ingredientPicker_clearSearch"
            aria-label={t("menu.search.clear")}
            onClick={() => setOptionQuery("")}>
            <X size={13} aria-hidden="true" />
          </button>
        )}
      </div>

      <ul
        className="Menu_ingredientPicker_list"
        aria-labelledby={`${listId}-label`}>
        {visibleOptions.length === 0 ? (
          <li className="Menu_ingredientPicker_empty" role="status">
            {t("menu.filters.noIngredients")}
          </li>
        ) : (
          visibleOptions.map((option) => (
            <li key={option.id} className="Menu_ingredientPicker_row">
              <label className="Menu_ingredientPicker_option">
                <input
                  type="checkbox"
                  checked={selectedSet.has(option.id)}
                  onChange={() => toggle(option.id)}
                />
                <span lang={lang}>{option.label}</span>
              </label>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

Menu_ingredientPicker.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      haystack: PropTypes.string.isRequired,
    }),
  ).isRequired,
  selected: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  lang: langShape.isRequired,
  t: translateFn.isRequired,
};

export default Menu_ingredientPicker;
