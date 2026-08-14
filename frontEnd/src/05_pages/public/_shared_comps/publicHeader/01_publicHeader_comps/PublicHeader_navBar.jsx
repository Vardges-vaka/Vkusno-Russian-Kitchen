import { NavLink } from "react-router-dom";
import "../00_publicHeader_styles/PublicHeader_navBar.css";
import { NAV_LINKS } from "../04_publicHeader_const/_publicHeader_const.index.js";

// Single source of truth for the nav, so adding a page is one entry, not one <li>.

const PublicHeader_navBar = ({ t }) => {
  const NAVBAR_LINKS = NAV_LINKS(t);
  return (
    <nav className="PublicHeader_navBar" aria-label="Main navigation">
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

export default PublicHeader_navBar;
