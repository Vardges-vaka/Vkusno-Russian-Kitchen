import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { localePath } from "../../../00_config/_config.index.js";
import {
  branchShape,
  langShape,
  pickLocale,
  translateFn,
  noteOrderClick,
} from "../../../04_hlprs/_hlprs.index.js";
import "./deliveryKitchen.css";

// One kitchen, with only the apps that kitchen actually accepts.
// place: which page this card is on (the Delivery page or the Links page). It
// only goes into the note an app button sends to Google Analytics
// (04_hlprs/orderClick.js).
const DeliveryKitchen = ({ branch, lang, hours, t, place }) => {
  const name = pickLocale(branch.name, lang);

  return (
    <article className="deliveryKitchen">
      <h3 className="deliveryKitchen__name">{name}</h3>
      <p className="deliveryKitchen__hours">{hours}</p>
      <p className="deliveryKitchen__address">
        {pickLocale(branch.location.address, lang)}
      </p>

      <ul className="deliveryKitchen__apps">
        {branch.aggregators.map((aggregator) => (
          <li key={aggregator.name}>
            <a
              className="deliveryKitchen__app"
              href={aggregator.link}
              target="_blank"
              rel="noreferrer"
              aria-label={t("kitchens.orderOn", { name: aggregator.name })}
              onClick={() =>
                noteOrderClick({
                  app: aggregator.name,
                  kitchen: pickLocale(branch.name, "en"),
                  place,
                })
              }>
              <img
                className="deliveryKitchen__logo"
                src={aggregator.logo}
                alt=""
                aria-hidden="true"
              />
              <span>{aggregator.name}</span>
            </a>
          </li>
        ))}
      </ul>

      <Link
        className="deliveryKitchen__more"
        to={localePath(lang, `kitchens/${branch.slug}`)}>
        {t("kitchens.view")}
      </Link>
    </article>
  );
};

DeliveryKitchen.propTypes = {
  branch: branchShape.isRequired,
  lang: langShape.isRequired,
  hours: PropTypes.string.isRequired,
  t: translateFn.isRequired,
  place: PropTypes.string.isRequired,
};

export default DeliveryKitchen;
