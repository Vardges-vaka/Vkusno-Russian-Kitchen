import { Link } from "react-router-dom";
import { BRANCHES } from "../../../contact/04_contact_const/_contact_const.index.js";
import { pickLocale } from "../../../../../04_hlprs/_hlprs.index.js";
import "../00_publicFooter_styles/PublicFooter_branches.css";

const PublicFooter_branches = ({ branches, lang, tContact, t }) => {
  return (
    <section
      className="PublicFooter_branches"
      aria-label={tContact("contact.branches.label")}>
      <div className="PublicFooter_branches_header">
        <h2 className="PublicFooter_sectionTitle">
          {tContact("contact.branches.label")}
        </h2>
        <Link className="PublicFooter_branches_viewAll" to="/contact">
          {t("footer.viewContact")}
        </Link>
      </div>

      <ul className="PublicFooter_branches_list">
        {branches.map((branch) => {
          const name = pickLocale(branch.name, lang);
          const hoursLabel = branch.timing.is24Hours
            ? tContact("contact.branches.open24")
            : tContact("contact.branches.hours", {
                open: branch.timing.openTime,
                close: branch.timing.closeTime,
              });

          return (
            <li key={branch.id} className="PublicFooter_branches_item">
              <p className="PublicFooter_branches_line">
                <a
                  className="PublicFooter_branches_nameLink"
                  href={branch.location.googleMapsLink}
                  target="_blank"
                  rel="noreferrer">
                  {name}
                </a>
                <span className="PublicFooter_branches_dot" aria-hidden="true">
                  ·
                </span>
                <span className="PublicFooter_branches_hours">{hoursLabel}</span>
              </p>
              <p className="PublicFooter_branches_address">
                {branch.location.address}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default PublicFooter_branches;
