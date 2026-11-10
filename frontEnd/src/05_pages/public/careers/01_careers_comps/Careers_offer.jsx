import {
  careersCommonShape,
  langShape,
  pickLocale,
  pickLocaleList,
  translateFn,
} from "../../../../04_hlprs/_hlprs.index.js";
import "../00_careers_styles/Careers_offer.css";

// One panel for the two texts every Vkusno ad shares. They come from the
// Common sheet, not from the page copy, so a change in Positions.xlsx is
// the change on the site.
const Careers_offer = ({ common, lang, t }) => (
  <section className="Careers_offer">
    <h2 className="Careers_offer_title">{t("job.sections.offer")}</h2>
    <ul className="Careers_offer_list">
      {pickLocaleList(common.offer, lang).map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>

    <h2 className="Careers_offer_title Careers_offer_title--about">
      {t("job.sections.about")}
    </h2>
    <p className="Careers_offer_about">{pickLocale(common.about, lang)}</p>
  </section>
);

Careers_offer.propTypes = {
  common: careersCommonShape.isRequired,
  lang: langShape.isRequired,
  t: translateFn.isRequired,
};

export default Careers_offer;
