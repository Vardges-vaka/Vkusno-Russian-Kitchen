import "../00_contact_styles/Contact_socials.css";

const Contact_socials = ({ socials, t }) => {
  return (
    <div className="Contact_socials" aria-label={t("contact.socials.label")}>
      {socials.map((social) => (
        <a
          key={social.name}
          className="Contact_socials_link"
          href={social.link}
          target="_blank"
          rel="noreferrer">
          <img
            className="Contact_socials_logo"
            src={social.logo}
            alt=""
            aria-hidden="true"
          />
          <span className="Contact_socials_name">{social.name}</span>
        </a>
      ))}
    </div>
  );
};

export default Contact_socials;
