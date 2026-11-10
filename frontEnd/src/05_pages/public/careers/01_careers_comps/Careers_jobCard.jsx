import { Briefcase, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { localePath } from "../../../../00_config/_config.index.js";
import {
  careersCommonShape,
  jobShape,
  langShape,
  pickLocale,
  translateFn,
} from "../../../../04_hlprs/_hlprs.index.js";
import { jobLocationLabel } from "../03_careers_hlprs/_careers_hlprs.index.js";
import "../00_careers_styles/Careers_jobCard.css";

// One real link, stretched over the card with ::after. The "View job" words
// are aria-hidden because the link's name is already the job title.
const Careers_jobCard = ({ job, common, lang, t }) => {
  const title = pickLocale(job.title, lang);

  return (
    <article className="Careers_jobCard">
      <h3 className="Careers_jobCard_title">
        <Link
          to={localePath(lang, `careers/${job.id}`)}
          aria-label={t("list.viewJobAria", { title })}>
          {title}
        </Link>
      </h3>

      <p className="Careers_jobCard_pills">
        <span className="Careers_jobCard_pill">
          <Briefcase aria-hidden="true" size={14} />
          {t(`job.type.${job.employmentType}`)}
        </span>
        <span className="Careers_jobCard_pill">
          <MapPin aria-hidden="true" size={14} />
          {jobLocationLabel(job, common, lang)}
        </span>
      </p>

      <p className="Careers_jobCard_summary">{pickLocale(job.summary, lang)}</p>
      <span className="Careers_jobCard_view" aria-hidden="true">
        {t("list.viewJob")}
      </span>
    </article>
  );
};

Careers_jobCard.propTypes = {
  job: jobShape.isRequired,
  common: careersCommonShape.isRequired,
  lang: langShape.isRequired,
  t: translateFn.isRequired,
};

export default Careers_jobCard;
