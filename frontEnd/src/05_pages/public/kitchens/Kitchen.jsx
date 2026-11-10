import { Link, Navigate } from "react-router-dom";
import { MapPin } from "lucide-react";
import { localePath } from "../../../00_config/_config.index.js";
import { PageMeta } from "../../../02_comps/_comps.index.js";
import {
  graph,
  pickLocale,
  restaurantNode,
} from "../../../04_hlprs/_hlprs.index.js";
import { Contact_branchesMap, Contact_infoPanel } from "../contact/01_contact_comps/_contact_comps.index.js";
import { Kitchen_orders } from "./01_kitchens_comps/_kitchens_comps.index.js";
import { useKitchen } from "./02_kitchens_hooks/_kitchens_hooks.index.js";
import "./00_kitchens_styles/Kitchen.css";

const Kitchen = () => {
  const { t, tContact, lang, branch, hours, others, contactInfo } = useKitchen();

  if (!branch) return <Navigate to={localePath(lang, "kitchens")} replace />;

  const name = pickLocale(branch.name, lang);
  const address = pickLocale(branch.location.address, lang);

  return (
    <div className="Kitchen_container">
      <PageMeta
        title={t("meta.kitchenTitle", { name })}
        description={t("meta.kitchenDescription", { name, address, hours })}
        jsonLd={graph(restaurantNode(branch, lang, contactInfo))}
      />

      <nav className="Kitchen_breadcrumb" aria-label={t("detail.back")}>
        <Link to={localePath(lang, "kitchens")}>{t("detail.back")}</Link>
        <span aria-hidden="true"> / </span>
        <span aria-current="page">{name}</span>
      </nav>

      <header className="Kitchen_header">
        <h1 className="Kitchen_title">{name}</h1>
        <p className="Kitchen_hours">{hours}</p>
      </header>

      <div className="Kitchen_layout">
        <div className="Kitchen_facts">
          <section className="Kitchen_block" aria-label={t("detail.address")}>
            <h2 className="Kitchen_heading">{t("detail.address")}</h2>
            <p className="Kitchen_address">
              <MapPin className="Kitchen_pin" size={16} aria-hidden="true" />
              {address}
            </p>
            <a
              className="Kitchen_directions"
              href={branch.location.googleMapsLink}
              target="_blank"
              rel="noreferrer">
              {t("detail.directions")}
            </a>
          </section>

          <section className="Kitchen_block" aria-label={t("detail.contact")}>
            <h2 className="Kitchen_heading">{t("detail.contact")}</h2>
            <Contact_infoPanel contactInfo={contactInfo} t={tContact} />
          </section>

          <Kitchen_orders aggregators={branch.aggregators} t={t} />
        </div>

        <Contact_branchesMap branches={[branch]} lang={lang} t={tContact} />
      </div>

      <section className="Kitchen_others" aria-label={t("detail.other")}>
        <h2 className="Kitchen_heading">{t("detail.other")}</h2>
        <ul className="Kitchen_others_list">
          {others.map((item) => (
            <li key={item.id}>
              <Link to={localePath(lang, `kitchens/${item.slug}`)}>
                {pickLocale(item.name, lang)}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Kitchen;
