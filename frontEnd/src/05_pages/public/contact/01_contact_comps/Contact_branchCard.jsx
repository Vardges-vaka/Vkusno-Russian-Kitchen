import { MapPin } from "lucide-react";
import { pickLocale } from "../../../../04_hlprs/_hlprs.index.js";
import "../00_contact_styles/Contact_branchCard.css";

const Contact_branchCard = ({ branch, lang, t, isSelected, onSelect }) => {
  const name = pickLocale(branch.name, lang);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect(branch.id);
    }
  };

  // Stops the click reaching the card's own onClick - links inside
  // the card should navigate, not just re-select the already-selected branch.
  const stopCardClick = (event) => event.stopPropagation();

  return (
    <article
      className={`Contact_branchCard${
        isSelected ? " Contact_branchCard--selected" : ""
      }`}
      tabIndex={0}
      role="button"
      aria-pressed={isSelected}
      aria-label={name}
      onClick={() => onSelect(branch.id)}
      onKeyDown={handleKeyDown}>
      <div className="Contact_branchCard_header">
        <h3 className="Contact_branchCard_name">{name}</h3>
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
        {branch.location.address}
      </p>

      {/* margin-top:auto in CSS pins the footer to the bottom, so cards
          in the same grid row stay visually aligned */}
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

export default Contact_branchCard;
