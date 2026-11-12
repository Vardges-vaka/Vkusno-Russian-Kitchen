import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { localePath } from "../../../00_config/_config.index.js";
import { PageMeta } from "../../../02_comps/_comps.index.js";
import "./about.css";

// Preview page. The story is the same text already shown in the footer, so
// the two places do not drift. Search engines should not keep this draft.
const About = () => {
  const { t, i18n } = useTranslation("About");
  const { t: tCommon } = useTranslation("common");
  const lang = (i18n.language || "en").split("-")[0];

  return (
    <div className="about">
      <PageMeta
        title={t("meta.title")}
        description={t("meta.description")}
        noindex
      />

      <header className="about__hero">
        <h1 className="about__title">{t("title")}</h1>
        <p className="about__lead">{tCommon("footer.about.lead")}</p>
      </header>

      <div className="about__story">
        <p>{tCommon("footer.about.paragraph1")}</p>
        <p>{tCommon("footer.about.paragraph2")}</p>
        <p>{tCommon("footer.about.paragraph3")}</p>
        <p className="about__closing">{tCommon("footer.about.closing")}</p>
      </div>

      <p className="about__halal">{t("halal")}</p>

      <section className="about__serve" aria-labelledby="about-serve">
        <h2 id="about-serve" className="about__serveTitle">
          {t("serve.title")}
        </h2>
        <ul className="about__points">
          <li>
            <p>{t("serve.kitchens")}</p>
            <Link to={localePath(lang, "kitchens")}>{t("serve.kitchensLink")}</Link>
          </li>
          <li>
            <p>{t("serve.order")}</p>
            <Link to={localePath(lang, "delivery")}>{t("serve.orderLink")}</Link>
          </li>
          <li>
            <p>{t("serve.seating")}</p>
            <Link to={localePath(lang, "menu")}>{t("serve.menuLink")}</Link>
          </li>
        </ul>
      </section>

      <p className="about__note">{t("note")}</p>
    </div>
  );
};

export default About;
