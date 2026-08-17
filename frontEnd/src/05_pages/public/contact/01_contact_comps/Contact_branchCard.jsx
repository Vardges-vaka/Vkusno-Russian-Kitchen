import PropTypes from "prop-types";
import { MapPin } from "lucide-react";
import {
  branchShape,
  langShape,
  translateFn,
  pickLocale,
} from "../../../../04_hlprs/_hlprs.index.js";
import "../00_contact_styles/Contact_branchCard.css";

const Contact_branchCard = ({ branch, lang, t, isSelected, onSelect }) => {
  const name = pickLocale(branch.name, lang);

  const stopCardClick = (event) => event.stopPropagation();

  return (
    <article
      className={`Contact_branchCard${
        isSelected ? " Contact_branchCard--selected" : ""
      }`}
      onClick={() => onSelect(branch.id)}>
      <div className="Contact_branchCard_header">
        <h3 className="Contact_branchCard_name">
          <button
            type="button"
            className="Contact_branchCard_nameBtn"
            aria-pressed={isSelected}
            onClick={(event) => {
              stopCardClick(event);
              onSelect(branch.id);
            }}>
            {name}
          </button>
        </h3>
        <p className="Contact_branchCard_hours">
          {branch.timing.is24Hours
            ? t("contact.branches.open24")
            : t("contact.branches.hours", {
                open: branch.timing.openTime,
                close: branch.timing.closeTime,
              })}
        </p>
      </div>

      <p className="Contact_branchCard_address">
        <MapPin
          className="Contact_branchCard_addressIcon"
          size={15}
          aria-hidden="true"
        />
        {pickLocale(branch.location.address, lang)}
      </p>

      <div className="Contact_branchCard_footer">
        <div className="Contact_branchCard_aggregators">
          {branch.aggregators.map((aggregator) => (
            <a
              key={aggregator.name}
              className="Contact_branchCard_aggregator"
              href={aggregator.link}
              target="_blank"
              rel="noreferrer"
              aria-label={aggregator.name}
              title={aggregator.name}
              onClick={stopCardClick}>
              <img
                className="Contact_branchCard_aggregatorLogo"
                src={aggregator.logo}
                alt={aggregator.name}
              />
            </a>
          ))}
        </div>

        <a
          className="Contact_branchCard_directions"
          href={branch.location.googleMapsLink}
          target="_blank"
          rel="noreferrer"
          onClick={stopCardClick}>
          {t("contact.branches.directions")}
        </a>
      </div>
    </article>
  );
};

Contact_branchCard.propTypes = {
  branch: branchShape.isRequired,
  lang: langShape.isRequired,
  t: translateFn.isRequired,
  isSelected: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
};

export default Contact_branchCard;
