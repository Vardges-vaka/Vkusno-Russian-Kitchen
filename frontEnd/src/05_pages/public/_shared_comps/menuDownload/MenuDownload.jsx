import { Download } from "lucide-react";
import { langShape, translateFn } from "../../../../04_hlprs/_hlprs.index.js";
import { useMenuDownload } from "./02_menuDownload_hooks/_menuDownload_hooks.index.js";
import { MenuDownload_dialog } from "./01_menuDownload_comps/_menuDownload_comps.index.js";
import "./00_menuDownload_styles/MenuDownload.css";

const MenuDownload = ({ lang, t }) => {
  const { isOpen, selectedLanguage, selectedPdf, handlers } = useMenuDownload(lang);

  return (
    <div className="MenuDownload">
      <button
        type="button"
        className="MenuDownload_button"
        aria-haspopup="dialog"
        onClick={handlers.open}>
        <Download size={18} aria-hidden="true" />
        <span>{t("menuDownload.trigger", { ns: "common" })}</span>
      </button>

      {isOpen && (
        <MenuDownload_dialog
          lang={lang}
          t={t}
          selectedLanguage={selectedLanguage}
          selectedPdf={selectedPdf}
          onLanguageChange={handlers.selectLanguage}
          onClose={handlers.close}
        />
      )}
    </div>
  );
};

MenuDownload.propTypes = {
  lang: langShape.isRequired,
  t: translateFn.isRequired,
};

export default MenuDownload;
