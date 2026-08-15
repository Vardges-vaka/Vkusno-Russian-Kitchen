import {
  translateFn,
} from "../../../../../04_hlprs/_hlprs.index.js";
import { SOCIALS } from "../../../contact/04_contact_const/_contact_const.index.js";
import "../00_publicFooter_styles/PublicFooter_socials.css";

const PublicFooter_socials = ({ tContact }) => {
  return (
    <section
      className="PublicFooter_socials"
      aria-label={tContact("contact.socials.label")}>
      <h2 className="PublicFooter_sectionTitle">
        {tContact("contact.socials.label")}
      </h2>

      <ul className="PublicFooter_socials_list">
        {SOCIALS.map((social) => (
          <li key={social.name} className="PublicFooter_socials_item">
            <a
              className="PublicFooter_socials_link"
              href={social.link}
              target="_blank"
              rel="noreferrer"
              aria-label={social.name}>
              <img
                className="PublicFooter_socials_logo"
                src={social.logo}
                alt=""
                aria-hidden="true"
              />
              <span>{social.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

PublicFooter_socials.propTypes = {
  tContact: translateFn.isRequired,
};

export default PublicFooter_socials;
