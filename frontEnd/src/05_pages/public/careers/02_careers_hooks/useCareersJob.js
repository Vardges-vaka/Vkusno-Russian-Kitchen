import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { localePath } from "../../../../00_config/_config.index.js";
import {
  breadcrumbNode,
  graph,
  jobPostingNode,
  pickLocale,
} from "../../../../04_hlprs/_hlprs.index.js";
import { BRANCHES } from "../../contact/04_contact_const/_contact_const.index.js";
import {
  findJobById,
  jobDescriptionHtml,
  jobSubject,
  mailtoHref,
  whatsappHref,
} from "../03_careers_hlprs/_careers_hlprs.index.js";
import { useCareers } from "./useCareers.js";

export const useCareersJob = () => {
  const { t, lang, jobs, common, general } = useCareers();
  const { jobId } = useParams();
  const job = findJobById(jobId);

  const apply = useMemo(() => {
    if (!job) return null;
    const email = common.applyEmail;
    // English subject on every language of the page: see jobSubject.
    const subject = jobSubject(job, common);
    const title = pickLocale(job.title, lang);
    return {
      email,
      subject,
      mailto: mailtoHref(email, subject, t("apply.mailBody", { title })),
      whatsapp: common.applyWhatsApp
        ? whatsappHref(common.applyWhatsApp, t("apply.whatsappText", { title }))
        : null,
    };
  }, [job, common, lang, t]);

  // Rebuilt when the language changes, because the description HTML is translated.
  const jsonLd = useMemo(() => {
    if (!job) return null;
    const title = pickLocale(job.title, lang);
    return graph(
      jobPostingNode(job, lang, {
        descriptionHtml: jobDescriptionHtml(job, common, lang, t),
        branches: BRANCHES,
      }),
      breadcrumbNode([
        { name: t("hero.title"), path: localePath(lang, "careers") },
        { name: title, path: localePath(lang, `careers/${job.id}`) },
      ]),
    );
  }, [job, common, lang, t]);

  return { t, lang, jobs, common, general, job, apply, jsonLd };
};
