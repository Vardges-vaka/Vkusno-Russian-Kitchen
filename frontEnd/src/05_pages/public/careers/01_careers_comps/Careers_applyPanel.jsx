import PropTypes from "prop-types";
import { Mail, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { localePath } from "../../../../00_config/_config.index.js";
import {
  langShape,
  translateFn,
} from "../../../../04_hlprs/_hlprs.index.js";
import "../00_careers_styles/Careers_applyPanel.css";

// Email is shown as text as well as a mailto link: not everyone has a mail
// app, and the address has to be readable inside Arabic (hence <bdi>).
// WhatsApp renders only when the owner has published a number. There is no form.
const Careers_applyPanel = ({
  title,
  text,
  email,
  subject,
  mailto,
  whatsapp,
  lang,
  t,
  id,
}) => (
  <section className="Careers_applyPanel" id={id} aria-labelledby={id ? `${id}-title` : undefined}>
    <h2 className="Careers_applyPanel_title" id={id ? `${id}-title` : undefined}>
      {title}
    </h2>
    <p className="Careers_applyPanel_text">{text}</p>

    <a className="Careers_applyPanel_email" href={mailto}>
      <Mail aria-hidden="true" size={18} />
      {t("apply.emailButton")}
    </a>

    <p className="Careers_applyPanel_address">
      <bdi>{email}</bdi>
    </p>
    <p className="Careers_applyPanel_subject">
      <span className="Careers_applyPanel_subjectLabel">{t("apply.subjectLabel")}</span>
      <bdi>{subject}</bdi>
    </p>

    {whatsapp && (
      <a
        className="Careers_applyPanel_whatsapp"
        href={whatsapp}
        target="_blank"
        rel="noreferrer">
        <MessageCircle aria-hidden="true" size={18} />
        {t("apply.whatsappButton")}
      </a>
    )}

    <p className="Careers_applyPanel_privacy">
      {t("apply.privacy")}{" "}
      <Link to={localePath(lang, "privacy")}>{t("apply.privacyLink")}</Link>
    </p>
  </section>
);

Careers_applyPanel.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  mailto: PropTypes.string.isRequired,
  whatsapp: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
  lang: langShape.isRequired,
  t: translateFn.isRequired,
  id: PropTypes.string,
};

export default Careers_applyPanel;
