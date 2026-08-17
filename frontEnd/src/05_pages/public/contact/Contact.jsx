import { useContact } from "./02_contact_hooks/_contact_hooks.index.js";
import {
  Contact_infoPanel,
  Contact_socials,
  Contact_branchesMap,
  Contact_branchCard,
} from "./01_contact_comps/_contact_comps.index.js";
import { PageMeta } from "../../../02_comps/_comps.index.js";
import { graph, organisationNode, restaurantNode } from "../../../04_hlprs/_hlprs.index.js";
import "./00_contact_styles/Contact.css";

const Contact = () => {
  const {
    t,
    lang,
    branches,
    contactInfo,
    socials,
    selectedBranchId,
    handlers,
  } = useContact();

  return (
    <div className="Contact_container">
      <PageMeta
        title={t("meta.title")}
        description={t("meta.description")}
        jsonLd={graph(
          organisationNode(lang),
          branches.map((branch) => restaurantNode(branch, lang, contactInfo)),
        )}
      />

      <header className="Contact_hero">
        <h1 className="Contact_hero_title">{t("contact.title")}</h1>
        <p className="Contact_hero_subtitle">{t("contact.subtitle")}</p>
      </header>

      <section
        className="Contact_connect"
        aria-label={t("contact.infoPanel.label")}>
        <div className="Contact_connect_panel">
          <div className="Contact_connect_block">
            <h2 className="Contact_connect_heading">
              {t("contact.infoPanel.label")}
            </h2>
            <Contact_infoPanel contactInfo={contactInfo} t={t} />
          </div>

          <hr className="Contact_connect_divider" />

          <div className="Contact_connect_block">
            <h2 className="Contact_connect_heading">
              {t("contact.socials.label")}
            </h2>
            <Contact_socials socials={socials} t={t} />
          </div>
        </div>

        <div className="Contact_connect_map">
          <Contact_branchesMap branches={branches} lang={lang} t={t} />
        </div>
      </section>

      <section
        className="Contact_branches"
        aria-label={t("contact.branches.label")}>
        <h2 className="Contact_branches_title">
          {t("contact.branches.label")}
        </h2>
        <div className="Contact_branches_grid">
          {branches.map((branch) => (
            <Contact_branchCard
              key={branch.id}
              branch={branch}
              lang={lang}
              t={t}
              isSelected={selectedBranchId === branch.id}
              onSelect={handlers.selectBranch}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Contact;
