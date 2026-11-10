import PropTypes from "prop-types";
import {
  careersCommonShape,
  jobShape,
  langShape,
  pickLocale,
  pickLocaleList,
  translateFn,
} from "../../../../04_hlprs/_hlprs.index.js";
import "../00_careers_styles/Careers_jobDetail.css";

const ListSection = ({ title, items }) => {
  if (!items.length) return null;
  return (
    <section className="Careers_jobDetail_section">
      <h2 className="Careers_jobDetail_title">{title}</h2>
      <ul className="Careers_jobDetail_list">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
};

ListSection.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

// Hours and probation render only when the owner shows them in the ads.
// The sync writes null for a hidden line, so this is not a missing translation.
const Careers_jobDetail = ({ job, common, lang, t }) => {
  const hours = common.hours ? pickLocale(common.hours, lang) : "";
  const probation = common.probation ? pickLocale(common.probation, lang) : "";

  return (
    <div className="Careers_jobDetail">
      <section className="Careers_jobDetail_section">
        <h2 className="Careers_jobDetail_title">{t("job.sections.role")}</h2>
        <p className="Careers_jobDetail_text">{pickLocale(job.summary, lang)}</p>
      </section>

      <ListSection
        title={t("job.sections.duties")}
        items={pickLocaleList(job.duties, lang)}
      />
      <ListSection
        title={t("job.sections.mustHave")}
        items={pickLocaleList(job.mustHave, lang)}
      />
      <ListSection
        title={t("job.sections.niceToHave")}
        items={pickLocaleList(job.niceToHave, lang)}
      />

      {hours && (
        <section className="Careers_jobDetail_section">
          <h2 className="Careers_jobDetail_title">{t("job.sections.hours")}</h2>
          <p className="Careers_jobDetail_text">{hours}</p>
        </section>
      )}
      {probation && (
        <section className="Careers_jobDetail_section">
          <h2 className="Careers_jobDetail_title">{t("job.sections.probation")}</h2>
          <p className="Careers_jobDetail_text">{probation}</p>
        </section>
      )}
    </div>
  );
};

Careers_jobDetail.propTypes = {
  job: jobShape.isRequired,
  common: careersCommonShape.isRequired,
  lang: langShape.isRequired,
  t: translateFn.isRequired,
};

export default Careers_jobDetail;
