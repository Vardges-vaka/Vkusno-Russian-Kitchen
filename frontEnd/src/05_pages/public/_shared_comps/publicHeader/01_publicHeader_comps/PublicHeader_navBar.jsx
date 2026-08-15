import {
  translateFn,
  langShape,
} from "../../../../../04_hlprs/_hlprs.index.js";
import { NavLink } from "react-router-dom";
import "../00_publicHeader_styles/PublicHeader_navBar.css";
import { NAV_LINKS } from "../04_publicHeader_const/_publicHeader_const.index.js";

// Single source of truth for the nav, so adding a page is one entry, not one <li>.

const PublicHeader_navBar = ({ t, lang }) => {
  const NAVBAR_LINKS = NAV_LINKS(t, lang);
  return (
    <nav className="PublicHeader_navBar" aria-label={t("a11y.mainNav")}>
      <ul className="PublicHeader_navBar_links">
        {NAVBAR_LINKS.map(({ to, label }) => (
          <li key={to} className="PublicHeader_navBar_link_item">
            <NavLink
              to={to}
              className={({ isActive }) =>
                isActive
                  ? "PublicHeader_navBar_link active_link"
                  : "PublicHeader_navBar_link"
              }>
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

PublicHeader_navBar.propTypes = {
  t: translateFn.isRequired,
  lang: langShape.isRequired,
};

export default PublicHeader_navBar;
