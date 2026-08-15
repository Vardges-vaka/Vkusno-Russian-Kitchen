import {
  translateFn,
} from "../../../../../04_hlprs/_hlprs.index.js";
import { Logo } from "../../../../../02_comps/_comps.index.js";
import "../00_publicFooter_styles/PublicFooter_about.css";

const PublicFooter_about = ({ t }) => {
  return (
    <section className="PublicFooter_about" aria-label={t("footer.about.label")}>
      <div className="PublicFooter_about_brand">
        <Logo />
      </div>

      <p className="PublicFooter_about_lead">{t("footer.about.lead")}</p>

      <div className="PublicFooter_about_story">
        <p>{t("footer.about.paragraph1")}</p>
        <p>{t("footer.about.paragraph2")}</p>
        <p>{t("footer.about.paragraph3")}</p>
      </div>

      <p className="PublicFooter_about_closing">{t("footer.about.closing")}</p>
    </section>
  );
};

PublicFooter_about.propTypes = {
  t: translateFn.isRequired,
};

export default PublicFooter_about;
