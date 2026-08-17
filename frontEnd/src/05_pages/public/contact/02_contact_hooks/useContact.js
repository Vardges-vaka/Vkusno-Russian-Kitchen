import { useTranslation } from "react-i18next";
import { useMapContext } from "../../../../03_context/_context.index.js";
import {
  BRANCHES,
  CONTACT_INFO,
  SOCIALS,
} from "../04_contact_const/_contact_const.index.js";

export const useContact = () => {
  const { t, i18n } = useTranslation("Contact");
  const lang = (i18n.language || "en").split("-")[0];

  const { selectedBranchId, selectBranch } = useMapContext();

  return {
    t,
    lang,
    branches: BRANCHES,
    contactInfo: CONTACT_INFO,
    socials: SOCIALS,
    selectedBranchId,
    handlers: {
      selectBranch,
    },
  };
};
