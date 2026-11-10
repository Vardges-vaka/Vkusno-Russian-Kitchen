import PropTypes from "prop-types";
import { aggregatorShape, translateFn } from "../../../../04_hlprs/_hlprs.index.js";
import "../00_kitchens_styles/Kitchen_orders.css";

const Kitchen_orders = ({ aggregators, t }) => {
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
              rel="noreferrer">
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
  t: translateFn.isRequired,
};

export default Kitchen_orders;
