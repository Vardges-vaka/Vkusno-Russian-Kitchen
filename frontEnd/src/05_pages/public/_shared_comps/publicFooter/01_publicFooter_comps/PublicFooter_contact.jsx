import {
  translateFn,
} from "../../../../../04_hlprs/_hlprs.index.js";
import { CONTACT_INFO } from "../../../contact/04_contact_const/_contact_const.index.js";
import "../00_publicFooter_styles/PublicFooter_contact.css";

const PublicFooter_contact = ({ tContact }) => {
  return (
    <section
      className="PublicFooter_contact"
      aria-label={tContact("contact.infoPanel.label")}>
      <h2 className="PublicFooter_sectionTitle">
        {tContact("contact.infoPanel.label")}
      </h2>

      <ul className="PublicFooter_contact_list">
        {CONTACT_INFO.map((item) => {
          const Icon = item.icon;
          const opensNewTab = item.name === "WhatsApp";

          return (
            <li key={item.name} className="PublicFooter_contact_item">
              <a
                className="PublicFooter_contact_link"
                href={item.link}
                target={opensNewTab ? "_blank" : undefined}
                rel={opensNewTab ? "noreferrer" : undefined}
                aria-label={`${tContact(`contact.infoPanel.${item.name}`)} - ${item.label}`}>
                <Icon className="PublicFooter_contact_icon" size={16} aria-hidden="true" />
                <span className="PublicFooter_contact_text">
                  <span className="PublicFooter_contact_action">
                    {tContact(`contact.infoPanel.${item.name}`)}
                  </span>
                  <span className="PublicFooter_contact_value">{item.label}</span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

PublicFooter_contact.propTypes = {
  tContact: translateFn.isRequired,
};

export default PublicFooter_contact;
