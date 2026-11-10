import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMapContext } from "../../../../03_context/_context.index.js";
import {
  BRANCHES,
  CONTACT_INFO,
} from "../../contact/04_contact_const/_contact_const.index.js";
import { findKitchenBySlug, hoursLabel } from "../03_kitchens_hlprs/_kitchens_hlprs.index.js";

export const useKitchen = () => {
  const { slug } = useParams();
  const { t, i18n } = useTranslation("Kitchens");
  // The map's own labels already live in the Contact file.
  const { t: tContact } = useTranslation("Contact");
  const lang = (i18n.language || "en").split("-")[0];
  const branch = findKitchenBySlug(slug);
  const { selectBranch } = useMapContext();

  useEffect(() => {
    if (branch) selectBranch(branch.id);
  }, [branch, selectBranch]);

  return {
    t,
    tContact,
    lang,
    branch,
    hours: branch ? hoursLabel(branch, t) : "",
    others: BRANCHES.filter((item) => item.slug !== slug),
    contactInfo: CONTACT_INFO,
  };
};
