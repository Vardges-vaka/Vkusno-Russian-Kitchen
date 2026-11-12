import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { localePath } from "../../../00_config/_config.index.js";
import { PageMeta } from "../../../02_comps/_comps.index.js";
import {
  BRANCHES,
  DIRECT_ORDER,
} from "../contact/04_contact_const/_contact_const.index.js";
import { hoursLabel } from "../kitchens/03_kitchens_hlprs/kitchenFacts.js";
import DeliveryKitchen from "./DeliveryKitchen.jsx";
import "./delivery.css";

// Preview page. The words are a first draft, so search engines should not
// keep it. The kitchens and app links come from BRANCHES, the same list the
// contact and kitchen pages use, so a new app does not have to be typed twice.
const Delivery = () => {
  const { t, i18n } = useTranslation("Delivery");
  const { t: tKitchens } = useTranslation("Kitchens");
  const lang = (i18n.language || "en").split("-")[0];

  return (
    <div className="delivery">
      <PageMeta
        title={t("meta.title")}
        description={t("meta.description")}
        noindex
      />

      <header className="delivery__hero">
        <h1 className="delivery__title">{t("hero.title")}</h1>
        <p className="delivery__lead">{t("hero.lead")}</p>
        <Link className="delivery__menu" to={localePath(lang, "menu")}>
          {t("hero.menu")}
        </Link>
      </header>

      <div className="delivery__paths">
        <section className="delivery__path delivery__path--direct">
          <h2 className="delivery__pathTitle">{t("direct.title")}</h2>
          <p className="delivery__pathText">{t("direct.text")}</p>
          <a
            className="delivery__action"
            href={DIRECT_ORDER.link}
            target="_blank"
            rel="noreferrer">
            {t("direct.action")}
          </a>
        </section>

        <section className="delivery__path">
          <h2 className="delivery__pathTitle">{t("apps.title")}</h2>
          <p className="delivery__pathText">{t("apps.text")}</p>
        </section>

        <section className="delivery__pickup">
          <h2 className="delivery__pathTitle">{t("pickup.title")}</h2>
          <p className="delivery__pathText">{t("pickup.text")}</p>
        </section>
      </div>

      <section className="delivery__kitchens" aria-label={t("kitchens.title")}>
        <h2 className="delivery__kitchensTitle">{t("kitchens.title")}</h2>
        <div className="delivery__grid">
          {BRANCHES.map((branch) => (
            <DeliveryKitchen
              key={branch.id}
              branch={branch}
              lang={lang}
              hours={hoursLabel(branch, tKitchens)}
              t={t}
            />
          ))}
        </div>
      </section>

      <p className="delivery__note">{t("note")}</p>
    </div>
  );
};

export default Delivery;
