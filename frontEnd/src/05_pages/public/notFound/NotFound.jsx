import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./notFound.css";

const NotFound = () => {
  const { t } = useTranslation("NotFound");

  return (
    <div className="notFound">
      <div className="notFound_container">
        <p className="notFound_code" aria-hidden="true">
          {t("code")}
        </p>

        <header className="notFound_hero">
          <h1 className="notFound_title">{t("title")}</h1>
          <p className="notFound_message">{t("message")}</p>
        </header>

        <nav className="notFound_actions" aria-label={t("actionsAria")}>
          <Link className="notFound_action notFound_action--primary" to="/">
            {t("home")}
          </Link>
          <Link className="notFound_action" to="/menu">
            {t("menu")}
          </Link>
          <Link className="notFound_action" to="/contact">
            {t("contact")}
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default NotFound;
