import PropTypes from "prop-types";
import {
  contactInfoShape,
  translateFn,
  noteOrderClick,
  orderWayOf,
} from "../../../../04_hlprs/_hlprs.index.js";
import "../00_contact_styles/Contact_infoPanel.css";

// place and kitchen only go into the note a press on the phone or WhatsApp
// row sends to Google Analytics (04_hlprs/orderClick.js): place says which
// page this panel is on, kitchen is set on a kitchen's own page. The email
// row sends no note.
const Contact_infoPanel = ({ contactInfo, t, place, kitchen }) => {
  return (
    <div
      className="Contact_infoPanel"
      aria-label={t("contact.infoPanel.label")}>
      {contactInfo.map((item) => {
        const Icon = item.icon;
        const opensNewTab = item.name === "WhatsApp";

        return (
          <a
            key={item.name}
            className="Contact_infoPanel_row"
            href={item.link}
            target={opensNewTab ? "_blank" : undefined}
            rel={opensNewTab ? "noreferrer" : undefined}
            aria-label={`${t(`contact.infoPanel.${item.name}`)} - ${item.label}`}
            onClick={() =>
              noteOrderClick({ app: orderWayOf(item.name), kitchen, place })
            }>
            <span className="Contact_infoPanel_iconWrap" aria-hidden="true">
              <Icon className="Contact_infoPanel_icon" size={20} />
            </span>

            <span className="Contact_infoPanel_text">
              <span className="Contact_infoPanel_action">
                {t(`contact.infoPanel.${item.name}`)}
              </span>
              <span className="Contact_infoPanel_label">{item.label}</span>
            </span>
          </a>
        );
      })}
    </div>
  );
};

Contact_infoPanel.propTypes = {
  contactInfo: PropTypes.arrayOf(contactInfoShape).isRequired,
  t: translateFn.isRequired,
  place: PropTypes.string.isRequired,
  kitchen: PropTypes.string,
};

export default Contact_infoPanel;
