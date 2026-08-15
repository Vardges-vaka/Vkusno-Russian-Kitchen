import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { pickLocale } from "../../../../04_hlprs/_hlprs.index.js";
import { useMapContext } from "../../../../03_context/_context.index.js";
import {
  BRANCHES,
  CONTACT_INFO,
  DIRECT_ORDER,
} from "../../contact/04_contact_const/_contact_const.index.js";
import Menu_orderMap from "./Menu_orderMap.jsx";
import "../00_menu_styles/Menu_orderModal.css";

const PHONE_CONTACT = CONTACT_INFO.find((item) => item.name === "phone");
const WHATSAPP_CONTACT = CONTACT_INFO.find((item) => item.name === "WhatsApp");

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
  const orderOnMeasureRef = useRef(null);
  const [orderOnHeight, setOrderOnHeight] = useState(0);
  const [canAnimateOrderOnHeight, setCanAnimateOrderOnHeight] = useState(false);

  // Animate panel height to the real content size (max-height transitions feel abrupt).
  useLayoutEffect(() => {
    const measureEl = orderOnMeasureRef.current;
    if (!measureEl) return;

    const readHeight = () => measureEl.offsetHeight;

    const applyHeight = (animate) => {
      const nextHeight = readHeight();

      if (!animate) {
        setOrderOnHeight(nextHeight);
        return;
      }

      // Wait one painted frame with the previous height so CSS can interpolate.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setOrderOnHeight(readHeight());
        });
      });
    };

    applyHeight(canAnimateOrderOnHeight);

    const resizeObserver = new ResizeObserver(() => {
      setOrderOnHeight(readHeight());
    });
    resizeObserver.observe(measureEl);

    return () => resizeObserver.disconnect();
  }, [
    selectedBranchId,
    lang,
    selectedBranch?.aggregators.length,
    canAnimateOrderOnHeight,
  ]);

  useLayoutEffect(() => {
    const frameId = requestAnimationFrame(() => {
      setCanAnimateOrderOnHeight(true);
    });

    return () => cancelAnimationFrame(frameId);
  }, []);

  // Esc closes; page scroll is locked. No branch pre-selected.
  // Clear on unmount so Contact doesn't inherit this modal's pin.
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
          <div className="Menu_orderModal_headerMain">
            <h2 id="Menu_orderModal_title" className="Menu_orderModal_title">
              {name}
            </h2>
            <p className="Menu_orderModal_subtitle">
              {t("menu.orderModal.subtitle")}
            </p>
          </div>
        </header>

        <div className="Menu_orderModal_directWrap">
          <div className="Menu_orderModal_directRow">
            <p className="Menu_orderModal_directLabel">
              {t("menu.orderModal.orderDirectlyFromUs")}
            </p>
            <div className="Menu_orderModal_directActions">
              <a
                className="Menu_orderModal_directAction Menu_orderModal_directAction--online"
                href={DIRECT_ORDER.link}
                target="_blank"
                rel="noreferrer"
                aria-label={t("menu.orderModal.orderFromUsAria")}>
                {t("menu.orderModal.online")}
              </a>
              <a
                className="Menu_orderModal_directAction"
                href={PHONE_CONTACT.link}
                aria-label={`${t("menu.orderModal.phone")} — ${PHONE_CONTACT.label}`}>
                {t("menu.orderModal.phone")}
              </a>
              <a
                className="Menu_orderModal_directAction"
                href={WHATSAPP_CONTACT.link}
                target="_blank"
                rel="noreferrer"
                aria-label={`${t("menu.orderModal.whatsApp")} — ${WHATSAPP_CONTACT.label}`}>
                {t("menu.orderModal.whatsApp")}
              </a>
            </div>
          </div>
        </div>

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

            <div
              className={`Menu_orderModal_orderOn${
                selectedBranch ? " Menu_orderModal_orderOn--ready" : ""
              }`}>
              <div
                className={`Menu_orderModal_orderOnBody${
                  canAnimateOrderOnHeight
                    ? " Menu_orderModal_orderOnBody--animate"
                    : ""
                }`}
                style={{ height: orderOnHeight }}>
                <div
                  ref={orderOnMeasureRef}
                  className="Menu_orderModal_orderOnMeasure">
                  {!selectedBranch && (
                    <p className="Menu_orderModal_pickPrompt" role="status">
                      {t("menu.orderModal.pickKitchenFirst")}
                    </p>
                  )}

                  {selectedBranch && (
                    <div
                      key={selectedBranch.id}
                      className="Menu_orderModal_appsWrap">
                      <h3 className="Menu_orderModal_heading">
                        {t("menu.orderModal.orderFrom", {
                          branch: selectedName,
                        })}
                      </h3>

                      {selectedBranch.aggregators.length > 0 && (
                        <div className="Menu_orderModal_apps">
                          {selectedBranch.aggregators.map(
                            (aggregator, index) => (
                              <a
                                key={aggregator.name}
                                className="Menu_orderModal_app"
                                style={{ "--app-index": index }}
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
                            ),
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu_orderModal;
