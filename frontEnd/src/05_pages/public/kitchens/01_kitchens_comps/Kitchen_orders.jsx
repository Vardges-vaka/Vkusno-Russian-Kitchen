import PropTypes from "prop-types";
import {
  aggregatorShape,
  translateFn,
  noteOrderClick,
  ORDER_PLACE,
} from "../../../../04_hlprs/_hlprs.index.js";
import "../00_kitchens_styles/Kitchen_orders.css";

// kitchen: this kitchen's name in English. It only goes into the note an app
// button sends to Google Analytics (04_hlprs/orderClick.js).
const Kitchen_orders = ({ aggregators, kitchen, t }) => {
  if (!aggregators.length) return null;

  return (
    <section className="Kitchen_orders" aria-label={t("detail.order")}>
      <h2 className="Kitchen_orders_title">{t("detail.order")}</h2>
      <ul className="Kitchen_orders_list">
        {aggregators.map((aggregator) => (
          <li key={aggregator.name}>
            <a
              className="Kitchen_orders_link"
              href={aggregator.link}
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                noteOrderClick({
                  app: aggregator.name,
                  kitchen,
                  place: ORDER_PLACE.kitchen,
                })
              }>
              <img
                className="Kitchen_orders_logo"
                src={aggregator.logo}
                alt=""
                aria-hidden="true"
              />
              <span>{aggregator.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

Kitchen_orders.propTypes = {
  aggregators: PropTypes.arrayOf(aggregatorShape).isRequired,
  kitchen: PropTypes.string.isRequired,
  t: translateFn.isRequired,
};

export default Kitchen_orders;
