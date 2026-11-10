import { Briefcase, MapPin } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { localePath } from "../../../00_config/_config.index.js";
import { PageMeta } from "../../../02_comps/_comps.index.js";
import { pickLocale } from "../../../04_hlprs/_hlprs.index.js";
import {
  Careers_applyPanel,
  Careers_jobDetail,
  Careers_offer,
} from "./01_careers_comps/_careers_comps.index.js";
import { useCareersJob } from "./02_careers_hooks/_careers_hooks.index.js";
import { jobLocationLabel } from "./03_careers_hlprs/_careers_hlprs.index.js";
import "./00_careers_styles/CareersJob.css";

// Unknown or closed id: back to the list, the same way an unknown dish
// goes back to the menu. The id itself is not translated.
const CareersJob = () => {
  const { t, lang, job, common, apply, jsonLd } = useCareersJob();

  if (!job || !apply) {
    return <Navigate to={localePath(lang, "careers")} replace />;
  }

  const title = pickLocale(job.title, lang);

  return (
    <div className="CareersJob_container">
      <PageMeta
        title={t("meta.jobTitle", { title })}
        description={pickLocale(job.summary, lang)}
        jsonLd={jsonLd}
      />

      <nav className="CareersJob_breadcrumb" aria-label={t("hero.title")}>
        <Link to={localePath(lang, "careers")}>{t("hero.title")}</Link>
        <span aria-hidden="true"> / </span>
        <span aria-current="page">{title}</span>
      </nav>

      <article className="CareersJob_article">
        <div className="CareersJob_main">
          <header className="CareersJob_header">
            <h1 className="CareersJob_title">{title}</h1>
            <p className="CareersJob_pills">
              <span className="CareersJob_pill">
                <Briefcase aria-hidden="true" size={14} />
                {t(`job.type.${job.employmentType}`)}
              </span>
              <span className="CareersJob_pill">
                <MapPin aria-hidden="true" size={14} />
                {jobLocationLabel(job, common, lang)}
              </span>
            </p>
            <a className="CareersJob_jump" href="#careers-apply">
              {t("apply.title")}
            </a>
          </header>

          <Careers_jobDetail job={job} common={common} lang={lang} t={t} />
          <Careers_offer common={common} lang={lang} t={t} />
        </div>

        <aside className="CareersJob_aside">
          <Careers_applyPanel
            id="careers-apply"
            title={t("apply.title")}
            text={t("apply.text", { email: apply.email })}
            email={apply.email}
            subject={apply.subject}
            mailto={apply.mailto}
            whatsapp={apply.whatsapp}
            lang={lang}
            t={t}
          />
        </aside>
      </article>
    </div>
  );
};

export default CareersJob;
