import {
  translateFn,
  langShape,
} from "../../../../../04_hlprs/_hlprs.index.js";
import { NavLink } from "react-router-dom";
import "../00_publicFooter_styles/PublicFooter_navBar.css";
import { FOOTER_LINKS } from "../04_publicFooter_const/_publicFooter_const.index.js";

// Same single-source-of-truth pattern as the header nav.

const PublicFooter_navBar = ({ t, lang }) => {
  const FOOTER_NAV_LINKS = FOOTER_LINKS(t, lang);
  return (
    <nav className="PublicFooter_navBar" aria-label={t("a11y.footerNav")}>
      <ul className="PublicFooter_navBar_links">
        {FOOTER_NAV_LINKS.map(({ to, label }) => (
          <li key={to} className="PublicFooter_navBar_link_item">
            <NavLink
              to={to}
              className={({ isActive }) =>
                isActive
                  ? "PublicFooter_navBar_link active_footer_link"
                  : "PublicFooter_navBar_link"
              }>
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

PublicFooter_navBar.propTypes = {
  t: translateFn.isRequired,
  lang: langShape.isRequired,
};

export default PublicFooter_navBar;
