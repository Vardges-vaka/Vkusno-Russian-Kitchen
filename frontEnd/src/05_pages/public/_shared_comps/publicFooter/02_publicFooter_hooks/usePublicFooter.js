import { useTranslation } from "react-i18next";
import { BRANCHES } from "../../../contact/04_contact_const/_contact_const.index.js";

export const usePublicFooter = () => {
  const { t, i18n } = useTranslation("common");
  const { t: tContact } = useTranslation("Contact");
  const lang = (i18n.language || "en").split("-")[0];

  return {
    t,
    tContact,
    lang,
    branches: BRANCHES,
  };
};
