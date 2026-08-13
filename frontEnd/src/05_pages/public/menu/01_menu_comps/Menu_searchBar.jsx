import { Search, X } from "lucide-react";
import "../00_menu_styles/Menu_searchBar.css";

const Menu_searchBar = ({ value, onChange, t }) => {
  return (
    <div className="Menu_searchBar" role="search">
      <Search className="Menu_searchBar_icon" size={18} aria-hidden="true" />
      <input
        type="text"
        className="Menu_searchBar_input"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={t("menu.search.placeholder")}
        aria-label={t("menu.search.placeholder")}
      />
      {/* Clear button only appears once there is something to clear */}
      {value && (
        <button
          type="button"
          className="Menu_searchBar_clear"
          onClick={() => onChange("")}
          aria-label={t("menu.search.clear")}>
          <X size={16} aria-hidden="true" />
        </button>
      )}
    </div>
  );
};

export default Menu_searchBar;
