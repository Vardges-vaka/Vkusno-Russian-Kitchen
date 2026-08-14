import { useEffect } from "react";
import { pickLocale } from "../../../../04_hlprs/_hlprs.index.js";
import "../00_menu_styles/Menu_orderModal.css";

// Placeholder shell for the ordering flow. The final content (map, branches,
// aggregator links) will replace the _placeholder block — the overlay, close
// behaviour and layout are already final.
const Menu_orderModal = ({ item, lang, t, onClose }) => {
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

  return (
    <div className="Menu_orderModal" onClick={onClose}>
      <div
        className="Menu_orderModal_dialog"
        role="dialog"
        aria-modal="true"
        aria-label={`${t("menu.order")} — ${name}`}
        onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          className="Menu_orderModal_close"
          aria-label={t("menu.close")}
          onClick={onClose}>
          ×
        </button>

        <div className="Menu_orderModal_body">
          <h2 className="Menu_orderModal_title">
            {t("menu.order")} — {name}
          </h2>

          {/* TODO: replace with the map, branch list and aggregator links */}
          <div className="Menu_orderModal_placeholder">
            <p className="Menu_orderModal_placeholder_text">
              {t("menu.orderModal.placeholder")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu_orderModal;
