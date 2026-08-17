import { Link, useParams } from "react-router-dom";
import {
  localePath,
  resolveLanguage,
} from "../../../00_config/_config.index.js";
import { useTranslation } from "react-i18next";
import "./notFound.css";

const NotFound = () => {
  const { t, i18n } = useTranslation("NotFound");
  const { lang: langParam } = useParams();
  const lang = resolveLanguage(langParam, i18n.language);

  return (
    <div className="notFound">
      <title>{`${t("title")} - Vkusno`}</title>
      <meta name="robots" content="noindex, follow" />

      <div className="notFound_container">
        <p className="notFound_code" aria-hidden="true">
          {t("code")}
        </p>

        <header className="notFound_hero">
          <h1 className="notFound_title">{t("title")}</h1>
          <p className="notFound_message">{t("message")}</p>
        </header>

        <nav className="notFound_actions" aria-label={t("actionsAria")}>
          <Link
            className="notFound_action notFound_action--primary"
            to={localePath(lang)}>
            {t("home")}
          </Link>
          <Link className="notFound_action" to={localePath(lang, "menu")}>
            {t("menu")}
          </Link>
          <Link className="notFound_action" to={localePath(lang, "contact")}>
            {t("contact")}
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default NotFound;
