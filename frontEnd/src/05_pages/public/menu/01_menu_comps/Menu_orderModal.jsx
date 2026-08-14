import { useEffect } from "react";
import { pickLocale } from "../../../../04_hlprs/_hlprs.index.js";
import { useMapContext } from "../../../../03_context/_context.index.js";
import { BRANCHES } from "../../contact/04_contact_const/_contact_const.index.js";
import Menu_orderMap from "./Menu_orderMap.jsx";
import "../00_menu_styles/Menu_orderModal.css";

const formatHours = (timing, t) =>
  timing.is24Hours
    ? t("menu.orderModal.open24")
    : t("menu.orderModal.hours", {
        open: timing.openTime,
        close: timing.closeTime,
      });

const Menu_orderModal = ({ item, lang, t, onClose }) => {
  const { selectedBranchId, selectBranch } = useMapContext();

  const name = pickLocale(item.name, lang);
  const selectedBranch = BRANCHES.find(
    (branch) => branch.id === selectedBranchId,
  );
  const selectedName = selectedBranch
    ? pickLocale(selectedBranch.name, lang)
    : null;

  // Esc closes; page scroll is locked. Start with no kitchen selected so the
  // map opens at dubaiCenter + defaultZoom, then clear on unmount so Contact
  // doesn't inherit this modal's pin.
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    selectBranch(null);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      selectBranch(null);
    };
  }, [onClose, selectBranch]);

  return (
    <div className="Menu_orderModal" onClick={onClose}>
      <div
        className="Menu_orderModal_dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="Menu_orderModal_title"
        onClick={(event) => event.stopPropagation()}>
        <div className="Menu_orderModal_handle" aria-hidden="true" />

        <button
          type="button"
          className="Menu_orderModal_close"
          aria-label={t("menu.close")}
          onClick={onClose}>
          ×
        </button>

        <header className="Menu_orderModal_header">
          <p className="Menu_orderModal_eyebrow">{t("menu.order")}</p>
          <h2 id="Menu_orderModal_title" className="Menu_orderModal_title">
            {name}
          </h2>
          <p className="Menu_orderModal_subtitle">
            {t("menu.orderModal.subtitle")}
          </p>
        </header>

        <div className="Menu_orderModal_layout">
          <div
            className="Menu_orderModal_map"
            aria-label={t("menu.orderModal.mapLabel")}>
            <Menu_orderMap branches={BRANCHES} lang={lang} t={t} />
          </div>

          <div className="Menu_orderModal_panel">
            <div className="Menu_orderModal_kitchensBlock">
              <h3 className="Menu_orderModal_heading">
                {t("menu.orderModal.pickKitchen")}
              </h3>

              <ul className="Menu_orderModal_kitchens">
                {BRANCHES.map((branch) => {
                  const branchName = pickLocale(branch.name, lang);
                  const isSelected = selectedBranchId === branch.id;

                  return (
                    <li key={branch.id}>
                      <button
                        type="button"
                        className={`Menu_orderModal_kitchen${
                          isSelected ? " Menu_orderModal_kitchen--selected" : ""
                        }`}
                        aria-pressed={isSelected}
                        onClick={() => selectBranch(branch.id)}>
                        <span className="Menu_orderModal_kitchen_name">
                          {branchName}
                        </span>
                        <span className="Menu_orderModal_kitchen_hours">
                          {formatHours(branch.timing, t)}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="Menu_orderModal_orderOn">
              {selectedBranch ? (
                <>
                  <h3 className="Menu_orderModal_heading">
                    {t("menu.orderModal.orderFrom", { branch: selectedName })}
                  </h3>

                  <div className="Menu_orderModal_apps">
                    {selectedBranch.aggregators.map((aggregator) => (
                      <a
                        key={aggregator.name}
                        className="Menu_orderModal_app"
                        href={aggregator.link}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={t("menu.orderModal.orderOn", {
                          app: aggregator.name,
                        })}>
                        <img
                          className="Menu_orderModal_app_logo"
                          src={aggregator.logo}
                          alt=""
                          aria-hidden="true"
                        />
                        <span className="Menu_orderModal_app_name">
                          {aggregator.name}
                        </span>
                      </a>
                    ))}
                  </div>
                </>
              ) : (
                <p className="Menu_orderModal_pickPrompt" role="status">
                  {t("menu.orderModal.pickKitchenFirst")}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu_orderModal;
