import { Briefcase } from "lucide-react";
import { NavLink } from "react-router-dom";
import { localePath } from "../../../../../00_config/_config.index.js";
import {
  langShape,
  translateFn,
} from "../../../../../04_hlprs/_hlprs.index.js";
import { JOBS } from "../../../careers/04_careers_const/_careers_const.index.js";

// Same row as Call us / Email us: small label, then the line under it.
// Zero open jobs says so in that second line. There is no badge on the icon.
const PublicFooter_careers = ({ t, lang }) => {
  const openCount = JOBS.length;
  const detail = openCount > 0
    ? t("footer.nav_links.careersCount", { count: openCount })
    : t("footer.nav_links.careersNone");

  return (
    <li className="PublicFooter_contact_item">
      <NavLink
        className="PublicFooter_contact_link"
        to={localePath(lang, "careers")}>
        <Briefcase className="PublicFooter_contact_icon" size={16} aria-hidden="true" />
        <span className="PublicFooter_contact_text">
          <span className="PublicFooter_contact_action">
            {t("footer.nav_links.careers")}
          </span>
          <span className="PublicFooter_contact_value">{detail}</span>
        </span>
      </NavLink>
    </li>
  );
};

PublicFooter_careers.propTypes = {
  t: translateFn.isRequired,
  lang: langShape.isRequired,
};

export default PublicFooter_careers;
