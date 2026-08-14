import "../00_contact_styles/Contact_infoPanel.css";

const Contact_infoPanel = ({ contactInfo, t }) => {
  return (
    <div className="Contact_infoPanel" aria-label={t("contact.infoPanel.label")}>
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
            aria-label={`${t(`contact.infoPanel.${item.name}`)} - ${item.label}`}>
            <span className="Contact_infoPanel_iconWrap" aria-hidden="true">
              <Icon className="Contact_infoPanel_icon" size={20} />
            </span>

            {/* Two lines: the action ("Call us") + the actual value */}
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

export default Contact_infoPanel;
