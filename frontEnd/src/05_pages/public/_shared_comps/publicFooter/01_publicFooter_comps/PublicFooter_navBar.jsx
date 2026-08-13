import { NavLink } from "react-router-dom";
import "../00_publicFooter_styles/PublicFooter_navBar.css";
import { FOOTER_LINKS } from "../04_publicFooter_const/_publicFooter_const.index.js";

// Same single-source-of-truth pattern as the header nav.

const PublicFooter_navBar = ({ t }) => {
  const FOOTER_NAV_LINKS = FOOTER_LINKS(t);
  return (
    <nav className="PublicFooter_navBar" aria-label="Footer navigation">
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

export default PublicFooter_navBar;
