import { pickLocale } from "../../../../04_hlprs/pickLocale.js";
import { BRANCHES } from "../../contact/04_contact_const/_contact_const.index.js";
import { JOBS } from "../04_careers_const/_careers_const.index.js";

// Built once. The list is static data from Positions.xlsx, so a lookup table
// beats scanning it on every job-page render. Same idea as findMenuItem.
const BY_ID = new Map(JOBS.map((job) => [job.id, job]));

export const findJobById = (id) => (id ? BY_ID.get(id) ?? null : null);

// null kitchens means "any of our 5 kitchens": show the shared location line
// ("Dubai, UAE") rather than five branch names. A named list shows those branches.
export const jobLocationLabel = (job, common, lang) => {
  if (!job?.kitchens?.length) return pickLocale(common?.location, lang);
  return job.kitchens
    .map((id) => {
      const branch = BRANCHES.find((item) => item.id === id);
      return branch ? pickLocale(branch.name, lang) : "";
    })
    .filter(Boolean)
    .join(", ");
};
