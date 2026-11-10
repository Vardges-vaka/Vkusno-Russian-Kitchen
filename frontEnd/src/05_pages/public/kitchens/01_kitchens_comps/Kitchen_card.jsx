import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { localePath } from "../../../../00_config/_config.index.js";
import {
  branchShape,
  langShape,
  translateFn,
  pickLocale,
} from "../../../../04_hlprs/_hlprs.index.js";
import { hoursLabel } from "../03_kitchens_hlprs/_kitchens_hlprs.index.js";
import "../00_kitchens_styles/Kitchen_card.css";

const Kitchen_card = ({ branch, lang, t }) => {
  const name = pickLocale(branch.name, lang);

  return (
    <article className="Kitchen_card">
      <h2 className="Kitchen_card_name">{name}</h2>
      <p className="Kitchen_card_hours">{hoursLabel(branch, t)}</p>
      <p className="Kitchen_card_address">
        <MapPin className="Kitchen_card_pin" size={15} aria-hidden="true" />
        {pickLocale(branch.location.address, lang)}
      </p>
      <Link className="Kitchen_card_link" to={localePath(lang, `kitchens/${branch.slug}`)}>
        {t("card.view")}
      </Link>
    </article>
  );
};

Kitchen_card.propTypes = {
  branch: branchShape.isRequired,
  lang: langShape.isRequired,
  t: translateFn.isRequired,
};

export default Kitchen_card;
