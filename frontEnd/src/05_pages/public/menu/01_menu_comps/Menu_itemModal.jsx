import PropTypes from "prop-types";
import { useEffect } from "react";
import {
  menuItemShape,
  langShape,
  translateFn,
  pickLocale,
  useFocusTrap,
} from "../../../../04_hlprs/_hlprs.index.js";
import Menu_itemDetail from "./Menu_itemDetail.jsx";
import "../00_menu_styles/Menu_itemModal.css";

const Menu_itemModal = ({ item, lang, t, onClose, onOrder }) => {
  const dialogRef = useFocusTrap();

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
    <div className="Menu_itemModal" onClick={onClose}>
      <div
        ref={dialogRef}
        tabIndex={-1}
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

        <Menu_itemDetail
          item={item}
          lang={lang}
          t={t}
          onOrder={onOrder}
          headingLevel="h2"
        />
      </div>
    </div>
  );
};

Menu_itemModal.propTypes = {
  item: menuItemShape.isRequired,
  lang: langShape.isRequired,
  t: translateFn.isRequired,
  onClose: PropTypes.func.isRequired,
  onOrder: PropTypes.func.isRequired,
};

export default Menu_itemModal;
