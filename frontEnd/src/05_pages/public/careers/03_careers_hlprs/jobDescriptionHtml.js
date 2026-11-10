import { pickLocale, pickLocaleList } from "../../../../04_hlprs/pickLocale.js";

// Job text is the owner's spreadsheet, so it has to be escaped before it is
// placed in the JobPosting HTML. A "<" in a duty must not become a tag.
const escapeHtml = (value) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const section = (heading, items) => {
  if (!items.length) return "";
  const lis = items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  return `<h3>${escapeHtml(heading)}</h3><ul>${lis}</ul>`;
};

// The description Google reads. Headings come from the page copy so the
// structured data and the visible page use the same words.
export const jobDescriptionHtml = (job, common, lang, t) =>
  [
    `<p>${escapeHtml(pickLocale(job.summary, lang))}</p>`,
    section(t("job.sections.duties"), pickLocaleList(job.duties, lang)),
    section(t("job.sections.mustHave"), pickLocaleList(job.mustHave, lang)),
    section(t("job.sections.niceToHave"), pickLocaleList(job.niceToHave, lang)),
    section(t("job.sections.offer"), pickLocaleList(common.offer, lang)),
  ]
    .filter(Boolean)
    .join("");
