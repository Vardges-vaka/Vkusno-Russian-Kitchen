import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { localePath } from "../../../00_config/_config.index.js";
import { PageMeta } from "../../../02_comps/_comps.index.js";
import {
  BRANCHES,
  CONTACT_INFO,
  DIRECT_ORDER,
  SOCIALS,
} from "../contact/04_contact_const/_contact_const.index.js";
import { hoursLabel } from "../kitchens/03_kitchens_hlprs/kitchenFacts.js";
import DeliveryKitchen from "../delivery/DeliveryKitchen.jsx";
import "./links.css";

// One page with every way to order, made for the single link a social profile
// allows: /{lang}/links, or the short vkusno.ae/links (vercel.json sends that
// to the visitor's language).
//
// It holds no data and almost no words of its own. Kitchens and their apps
// come from BRANCHES, phone and WhatsApp from CONTACT_INFO, the social pages
// from SOCIALS, and the button words from the Delivery, Contact and Home
// files, so a change in any of those places shows here too. Its three own
// lines (title and what Google shows) are in Delivery.json under "links".
const Links = () => {
  const { t, i18n } = useTranslation("Delivery");
  const { t: tHome } = useTranslation("Home");
  const { t: tContact } = useTranslation("Contact");
  const { t: tKitchens } = useTranslation("Kitchens");
  const lang = (i18n.language || "en").split("-")[0];

  // Email is left out: this page is for ordering, and a mail link opens an
  // empty letter. It stays on the contact page.
  const reach = CONTACT_INFO.filter((item) => item.name !== "email");

  return (
    <div className="links">
      <PageMeta
        title={t("links.metaTitle")}
        description={t("links.metaDescription")}
      />

      <header className="links__hero">
        <h1 className="links__title">{t("links.title")}</h1>
        <p className="links__lead">{tHome("hero.description")}</p>
      </header>

      <ul className="links__main">
        <li>
          <a
            className="links__button links__button--primary"
            href={DIRECT_ORDER.link}
            target="_blank"
            rel="noreferrer">
            {t("direct.action")}
          </a>
        </li>
        <li>
          <Link className="links__button" to={localePath(lang, "menu")}>
            {t("hero.menu")}
          </Link>
        </li>
        {reach.map((item) => {
          const Icon = item.icon;
          const opensNewTab = item.name === "WhatsApp";
          return (
            <li key={item.name}>
              <a
                className="links__button"
                href={item.link}
                target={opensNewTab ? "_blank" : undefined}
                rel={opensNewTab ? "noreferrer" : undefined}>
                <Icon className="links__icon" size={18} aria-hidden="true" />
                <span>{tContact(`contact.infoPanel.${item.name}`)}</span>
                {/* A phone number reads left to right in Arabic too. It has
                    no letters, so the browser cannot work that out itself. */}
                <span className="links__detail" dir="ltr">
                  {item.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>

      <section className="links__section" aria-labelledby="links-kitchens">
        <h2 id="links-kitchens" className="links__sectionTitle">
          {t("kitchens.title")}
        </h2>
        <div className="links__kitchens">
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

      <section className="links__section" aria-labelledby="links-social">
        <h2 id="links-social" className="links__sectionTitle">
          {tContact("contact.socials.label")}
        </h2>
        <ul className="links__socials">
          {SOCIALS.map((social) => (
            <li key={social.name}>
              <a
                className="links__social"
                href={social.link}
                target="_blank"
                rel="noreferrer">
                <img
                  className="links__socialLogo"
                  src={social.logo}
                  alt=""
                  aria-hidden="true"
                  width={20}
                  height={20}
                />
                <span>{social.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Links;
