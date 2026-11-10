import { BRANCHES } from "../../contact/04_contact_const/_contact_const.index.js";

export const findKitchenBySlug = (slug) =>
  BRANCHES.find((branch) => branch.slug === slug) ?? null;

// Hours come from the branch record. The site is the source of those times.
export const hoursLabel = (branch, t) =>
  branch.timing.is24Hours
    ? t("hours.open24")
    : t("hours.range", {
        open: branch.timing.openTime,
        close: branch.timing.closeTime,
      });
