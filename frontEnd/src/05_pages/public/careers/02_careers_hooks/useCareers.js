import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { resolveLanguage } from "../../../../00_config/_config.index.js";
import {
  CAREERS_COMMON,
  JOBS,
} from "../04_careers_const/_careers_const.index.js";
import {
  generalSubject,
  mailtoHref,
  whatsappHref,
} from "../03_careers_hlprs/_careers_hlprs.index.js";

// The list page decides nothing local. Jobs are the generated file, and the
// general application is the same letter for every visitor.
export const useCareers = () => {
  const { t, i18n } = useTranslation("Careers");
  const { lang: langParam } = useParams();
  const lang = resolveLanguage(langParam, i18n.language);

  const email = CAREERS_COMMON.applyEmail;
  const subject = generalSubject(CAREERS_COMMON);
  // There is no form and nothing is stored. The visitor's mail app sends the CV.
  const mailto = mailtoHref(email, subject, t("apply.generalMailBody"));
  const whatsapp = CAREERS_COMMON.applyWhatsApp
    ? whatsappHref(
        CAREERS_COMMON.applyWhatsApp,
        t("apply.whatsappText", { title: CAREERS_COMMON.brand }),
      )
    : null;

  return {
    t,
    lang,
    jobs: JOBS,
    common: CAREERS_COMMON,
    general: { email, subject, mailto, whatsapp },
  };
};
