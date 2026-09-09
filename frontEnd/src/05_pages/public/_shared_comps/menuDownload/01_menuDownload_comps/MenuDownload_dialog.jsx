import PropTypes from "prop-types";
import { useEffect, useId } from "react";
import { Download, X } from "lucide-react";
import {
  isRtlLanguage,
  SUPPORTED_LANGUAGES,
} from "../../../../../00_config/_config.index.js";
import { MENU_PDFS } from "../../../../../01_assets/_assets.index.js";
import {
  langShape,
  translateFn,
  useFocusTrap,
  useBodyScrollLock,
} from "../../../../../04_hlprs/_hlprs.index.js";
import "../00_menuDownload_styles/MenuDownload_dialog.css";

const MenuDownload_dialog = ({
  lang,
  t,
  selectedLanguage,
  selectedPdf,
  onLanguageChange,
  onClose,
}) => {
  const dialogRef = useFocusTrap();
  useBodyScrollLock();
  const id = useId();
  const titleId = `${id}-title`;
  const descriptionId = `${id}-description`;
  const languageId = `${id}-language`;

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !event.defaultPrevented) onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    // Dish routes keep Menu mounted underneath them. Browser Forward must
    // dismiss this chooser even when the background route itself is unchanged.
    window.addEventListener("popstate", onClose);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("popstate", onClose);
    };
  }, [onClose]);

  return (
    <div
      className="MenuDownload_overlay"
      lang={lang}
      dir={isRtlLanguage(lang) ? "rtl" : "ltr"}
      onClick={onClose}>
      <div
        ref={dialogRef}
        className="MenuDownload_dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          className="MenuDownload_dialog_close"
          aria-label={t("menuDownload.close", { ns: "common" })}
          onClick={onClose}>
          <X size={20} aria-hidden="true" />
        </button>

        <header className="MenuDownload_dialog_header">
          <h2 id={titleId} className="MenuDownload_dialog_title">
            {t("menuDownload.title", { ns: "common" })}
          </h2>
          <p id={descriptionId} className="MenuDownload_dialog_description">
            {t("menuDownload.description", { ns: "common" })}
          </p>
        </header>

        <div className="MenuDownload_dialog_field">
          <label htmlFor={languageId} className="MenuDownload_dialog_label">
            {t("menuDownload.languageLabel", { ns: "common" })}
          </label>
          <select
            id={languageId}
            className="MenuDownload_dialog_select"
            value={selectedLanguage}
            lang={selectedLanguage}
            dir={selectedPdf.dir}
            onChange={(event) => onLanguageChange(event.target.value)}>
            {SUPPORTED_LANGUAGES.map((language) => (
              <option
                key={language}
                value={language}
                lang={language}
                dir={MENU_PDFS[language].dir}>
                {MENU_PDFS[language].label}
              </option>
            ))}
          </select>
        </div>

        <div className="MenuDownload_dialog_actions">
          <a
            className="MenuDownload_dialog_download"
            href={selectedPdf.url}
            download={selectedPdf.fileName}
            type="application/pdf"
            hrefLang={selectedLanguage}>
            <Download size={18} aria-hidden="true" />
            <span>{t("menuDownload.download", { ns: "common" })}</span>
          </a>
          <button
            type="button"
            className="MenuDownload_dialog_cancel"
            onClick={onClose}>
            {t("menuDownload.cancel", { ns: "common" })}
          </button>
        </div>
      </div>
    </div>
  );
};

MenuDownload_dialog.propTypes = {
  lang: langShape.isRequired,
  t: translateFn.isRequired,
  selectedLanguage: langShape.isRequired,
  selectedPdf: PropTypes.shape({
    url: PropTypes.string.isRequired,
    fileName: PropTypes.string.isRequired,
    dir: PropTypes.oneOf(["ltr", "rtl"]).isRequired,
  }).isRequired,
  onLanguageChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MenuDownload_dialog;
