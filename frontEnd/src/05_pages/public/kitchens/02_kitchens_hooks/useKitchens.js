import { useTranslation } from "react-i18next";
import {
  BRANCHES,
  CONTACT_INFO,
} from "../../contact/04_contact_const/_contact_const.index.js";

export const useKitchens = () => {
  const { t, i18n } = useTranslation("Kitchens");
  const lang = (i18n.language || "en").split("-")[0];

  return {
    t,
    lang,
    branches: BRANCHES,
    contactInfo: CONTACT_INFO,
  };
};
