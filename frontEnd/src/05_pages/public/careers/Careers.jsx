import { PageMeta } from "../../../02_comps/_comps.index.js";
import { graph, organisationNode } from "../../../04_hlprs/_hlprs.index.js";
import {
  Careers_applyPanel,
  Careers_jobCard,
  Careers_offer,
} from "./01_careers_comps/_careers_comps.index.js";
import { useCareers } from "./02_careers_hooks/_careers_hooks.index.js";
import "./00_careers_styles/Careers.css";

// The list stays up when nothing is open, with a general-application email.
// Applying is a mailto link. The site does not take a form or store a CV.
const Careers = () => {
  const { t, lang, jobs, common, general } = useCareers();

  return (
    <div className="Careers_container">
      <PageMeta
        title={t("meta.title")}
        description={t("meta.description")}
        jsonLd={graph(organisationNode(lang))}
      />

      <header className="Careers_hero">
        <h1 className="Careers_hero_title">{t("hero.title")}</h1>
        <p className="Careers_hero_intro">{t("hero.intro")}</p>
      </header>

      <section className="Careers_list" aria-label={t("list.title")}>
        <h2 className="Careers_sectionTitle">{t("list.title")}</h2>
        {jobs.length ? (
          <div className="Careers_grid">
            {jobs.map((job) => (
              <Careers_jobCard
                key={job.id}
                job={job}
                common={common}
                lang={lang}
                t={t}
              />
            ))}
          </div>
        ) : (
          <div className="Careers_empty">
            <p className="Careers_empty_title">{t("empty.title")}</p>
            <p className="Careers_empty_text">{t("empty.text")}</p>
          </div>
        )}
      </section>

      <Careers_offer common={common} lang={lang} t={t} />

      <Careers_applyPanel
        title={t("general.title")}
        text={t("general.text")}
        email={general.email}
        subject={general.subject}
        mailto={general.mailto}
        whatsapp={general.whatsapp}
        lang={lang}
        t={t}
      />
    </div>
  );
};

export default Careers;
