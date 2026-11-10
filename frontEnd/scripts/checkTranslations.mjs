// Translation integrity check. Exits non-zero on any failure, so `npm run
// build` refuses to ship drifted locales.
//
// Every rule here corresponds to a real defect found in this codebase:
//   - key drift        : the usual failure mode with 21 files and 3 languages
//   - interpolation    : a missing {{count}} silently renders a broken string
//   - BOM              : ar/FAQ.json had one; it crashes strict JSON.parse
//   - AR long == short : all 70 dishes shipped with truncated Arabic copy
//   - empty values     : an accidentally blanked key renders as nothing
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readMenuData } from "./readMenuData.mjs";
import { withCareersData } from "./readCareersData.mjs";

// new URL("../") already resolves to frontEnd/; path.dirname on a trailing
// slash would climb one level too far, to the repo root.
const ROOT = fileURLToPath(new URL("../", import.meta.url));
const LOCALES = path.join(ROOT, "public/locales");
const BASE = "en";

const failures = [];
const fail = (message) => failures.push(message);

// Plural suffixes legitimately differ per language (Russian has 3 forms,
// Arabic 6, English 2), so keys ending in these are compared by stem.
const PLURAL_SUFFIX = /_(zero|one|two|few|many|other)$/;

const leafPaths = (value, prefix = "") => {
  if (Array.isArray(value)) {
    return value.flatMap((entry, index) => leafPaths(entry, `${prefix}[${index}]`));
  }
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, entry]) =>
      leafPaths(entry, prefix ? `${prefix}.${key}` : key),
    );
  }
  return [prefix];
};

const flatten = (value, prefix = "", out = {}) => {
  if (Array.isArray(value)) {
    value.forEach((entry, index) => flatten(entry, `${prefix}[${index}]`, out));
    return out;
  }
  if (value && typeof value === "object") {
    Object.entries(value).forEach(([key, entry]) =>
      flatten(entry, prefix ? `${prefix}.${key}` : key, out),
    );
    return out;
  }
  out[prefix] = value;
  return out;
};

const stem = (key) => key.replace(PLURAL_SUFFIX, "");
const varList = (value) => [
  ...new Set(
    [...String(value).matchAll(/\{\{(.*?)\}\}/g)].map((m) => m[1].trim()),
  ),
].sort();

const JOB_ID = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;
const EMAIL = /^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/;

const isRealDate = (value) => {
  const match = ISO_DATE.exec(value);
  if (!match) return false;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
};

const isFutureDate = (value) => {
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date > today;
};

// Shape rules for JOBS.js. A preview file may skip Russian and Arabic
// (the page falls back to English) but only when CAREERS_ALLOW_PREVIEW=1.
// Unpublished jobs have no "Open since", so a preview date may be null.
export function checkCareersData(data, branchIds, env = process.env) {
  const problems = [];
  const fail = (message) => problems.push(message);
  const mode = data?.CAREERS_DATA_MODE;
  if (mode !== "live" && mode !== "preview") {
    fail('CAREERS_DATA_MODE must be "live" or "preview"');
    return problems;
  }
  const preview = mode === "preview";
  if (preview && env.CAREERS_ALLOW_PREVIEW !== "1") {
    fail("JOBS.js is a PREVIEW file - run sync_site_careers.py without --preview before building");
    return problems;
  }

  const textAt = (value, label) => {
    const required = preview ? ["en"] : ["en", "ru", "ar"];
    for (const lang of required) {
      if (typeof value?.[lang] !== "string" || !value[lang].trim()) {
        fail(`${label}: missing ${lang} text`);
      }
    }
    if (!preview || !value) return;
    for (const lang of ["ru", "ar"]) {
      if (!Object.hasOwn(value, lang)) continue;
      if (typeof value[lang] !== "string" || !value[lang].trim()) {
        fail(`${label}: ${lang} text is present but empty`);
      }
    }
  };

  const listsAt = (value, label, min) => {
    const lengths = {};
    for (const lang of ["en", "ru", "ar"]) {
      const required = lang === "en" || !preview;
      const present = value != null && Object.hasOwn(value, lang);
      if (!present) {
        if (required) fail(`${label}: missing ${lang} list`);
        continue;
      }
      const list = value[lang];
      if (!Array.isArray(list)) {
        fail(`${label}: ${lang} is not a list`);
        continue;
      }
      if (required && list.length < min) {
        fail(`${label}: ${lang} needs at least ${min} item(s)`);
      }
      if (list.some((item) => typeof item !== "string" || !item.trim())) {
        fail(`${label}: ${lang} has an empty item`);
      }
      lengths[lang] = list.length;
    }
    if (lengths.en == null) return;
    for (const lang of ["ru", "ar"]) {
      if (lengths[lang] != null && lengths[lang] !== lengths.en) {
        fail(`${label}: ${lang} has ${lengths[lang]} lines, English has ${lengths.en}`);
      }
    }
  };

  const common = data?.CAREERS_COMMON;
  if (!common || typeof common !== "object") {
    fail("CAREERS_COMMON is missing");
    return problems;
  }
  if (common.brand !== "Vkusno") fail('CAREERS_COMMON.brand must be "Vkusno"');
  if (typeof common.applyEmail !== "string" || !EMAIL.test(common.applyEmail)) {
    fail("CAREERS_COMMON.applyEmail must be an email address");
  }
  if (common.applyWhatsApp != null && !/^\d+$/.test(common.applyWhatsApp)) {
    fail("CAREERS_COMMON.applyWhatsApp must be digits only or null");
  }
  textAt(common.about, "CAREERS_COMMON.about");
  textAt(common.location, "CAREERS_COMMON.location");
  listsAt(common.offer, "CAREERS_COMMON.offer", 1);
  for (const key of ["hours", "probation"]) {
    if (common[key] == null) continue;
    textAt(common[key], `CAREERS_COMMON.${key}`);
  }

  if (!Array.isArray(data.JOBS)) {
    fail("JOBS must be a list");
    return problems;
  }
  const seen = new Set();
  for (const job of data.JOBS) {
    const label = job?.id || "(job)";
    if (typeof job?.id !== "string" || !JOB_ID.test(job.id)) {
      fail(`${label}: id must be lowercase letters, digits and single hyphens`);
    } else if (seen.has(job.id)) {
      fail(`${label}: duplicated id`);
    }
    if (typeof job?.id === "string") seen.add(job.id);
    textAt(job?.title, `${label} title`);
    textAt(job?.summary, `${label} summary`);
    listsAt(job?.duties, `${label} duties`, 1);
    listsAt(job?.mustHave, `${label} mustHave`, 1);
    listsAt(job?.niceToHave, `${label} niceToHave`, 0);
    if (job?.employmentType !== "FULL_TIME" && job?.employmentType !== "PART_TIME") {
      fail(`${label}: employmentType must be FULL_TIME or PART_TIME`);
    }
    if (job?.kitchens == null) {
      // any kitchen
    } else if (!Array.isArray(job.kitchens) || job.kitchens.length === 0) {
      fail(`${label}: kitchens must be null or a list of branch ids`);
    } else {
      const unknown = job.kitchens.filter((id) => !branchIds.includes(id));
      if (unknown.length) fail(`${label}: unknown kitchen(s) ${unknown.join(", ")}`);
    }
    if (job?.openings != null && (!Number.isInteger(job.openings) || job.openings < 1)) {
      fail(`${label}: openings must be a positive whole number or null`);
    }
    if (job?.datePosted == null) {
      if (!preview) fail(`${label}: datePosted is required`);
    } else if (typeof job.datePosted !== "string" || !isRealDate(job.datePosted)) {
      fail(`${label}: datePosted must be a real YYYY-MM-DD date`);
    } else if (isFutureDate(job.datePosted)) {
      fail(`${label}: datePosted is in the future`);
    }
  }
  return problems;
}

const invokedDirectly =
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

async function checkLocales() {
const languages = (await readdir(LOCALES, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

const namespaces = (await readdir(path.join(LOCALES, BASE)))
  .filter((file) => file.endsWith(".json"))
  .map((file) => file.replace(/\.json$/, ""));

const loaded = {};

for (const lang of languages) {
  loaded[lang] = {};
  for (const namespace of namespaces) {
    const file = path.join(LOCALES, lang, `${namespace}.json`);
    const raw = await readFile(file, "utf8");

    if (raw.charCodeAt(0) === 0xfeff) {
      fail(`${lang}/${namespace}.json starts with a UTF-8 BOM`);
    }

    try {
      loaded[lang][namespace] = JSON.parse(raw.replace(/^﻿/, ""));
    } catch (error) {
      fail(`${lang}/${namespace}.json is not valid JSON: ${error.message}`);
    }
  }
}

// MenuItems is validated separately below: it is keyed by numeric item id,
// so the usual key-parity rules do not describe it.
const PARITY_SKIP = new Set(["MenuItems"]);

for (const namespace of namespaces) {
  if (PARITY_SKIP.has(namespace)) continue;
  const base = loaded[BASE][namespace];
  if (!base) continue;

  const baseKeys = new Set(leafPaths(base).map(stem));
  const baseFlat = flatten(base);

  for (const lang of languages) {
    if (lang === BASE) continue;
    const target = loaded[lang][namespace];
    if (!target) { fail(`${lang}/${namespace}.json is missing`); continue; }

    const targetKeys = new Set(leafPaths(target).map(stem));
    for (const key of baseKeys) {
      if (!targetKeys.has(key)) fail(`${lang}/${namespace}: missing key "${key}"`);
    }
    for (const key of targetKeys) {
      if (!baseKeys.has(key)) fail(`${lang}/${namespace}: orphan key "${key}" (not in ${BASE})`);
    }

    const targetFlat = flatten(target);
    for (const [key, value] of Object.entries(targetFlat)) {
      if (typeof value === "string" && value.trim() === "") {
        fail(`${lang}/${namespace}: "${key}" is empty`);
      }
      const baseValue = baseFlat[key];
      if (baseValue === undefined) continue;

      const baseVars = varList(baseValue);
      const targetVars = varList(value);

      // An unknown variable is always a bug: i18next renders it literally.
      const unknown = targetVars.filter((name) => !baseVars.includes(name));
      if (unknown.length) {
        fail(`${lang}/${namespace}: "${key}" uses unknown variable(s) {{${unknown.join("}}, {{")}}}`);
      }

      // A MISSING variable is only a bug outside plural forms. Arabic
      // "طبق واحد" (one dish) and "طبقان" (the dual, exactly two) encode the
      // count in the wording itself, so requiring {{count}} there would force
      // unidiomatic copy. Plural variants may therefore omit, never invent.
      if (!PLURAL_SUFFIX.test(key)) {
        const missing = baseVars.filter((name) => !targetVars.includes(name));
        if (missing.length) {
          fail(`${lang}/${namespace}: "${key}" is missing {{${missing.join("}}, {{")}}}`);
        }
      }
    }
  }
}

// Short descriptions still live in menuItems.js (the grid needs them, and the
// search indexes them across all languages); long ones moved to the MenuItems
// namespace. Cross-check the two, because the original defect was all 70
// Arabic long descriptions being copies of the short one.
const { AllMenuItems, MenuItems } = await readMenuData();
const shortById = {};
for (const item of AllMenuItems) {
  if (typeof item.isActive !== "boolean") {
    fail(`menuItems.js: item ${item.id} must declare isActive as true or false`);
  }
  if (Object.hasOwn(shortById, item.id)) {
    fail(`menuItems.js: duplicate item id ${item.id}`);
  }
  shortById[item.id] = item.description?.short ?? {};
  for (const lang of languages) {
    if (typeof shortById[item.id][lang] !== "string" || !shortById[item.id][lang].trim()) {
      fail(`menuItems.js: item ${item.id} is missing its ${lang} short description`);
    }
  }
}

// Keep validating inactive dishes so switching them back on restores complete
// translated content. Only ids absent from the full catalog are orphaned.
const itemIds = Object.keys(shortById);
if (!itemIds.length) fail("menuItems.js: the full menu catalog is empty");

let duplicated = 0;
for (const lang of languages) {
  const longs = loaded[lang]?.MenuItems?.long ?? {};

  for (const id of itemIds) {
    const long = longs[id];
    if (long === undefined) {
      fail(`${lang}/MenuItems.json: missing long description for item ${id}`);
      continue;
    }
    if (typeof long !== "string" || !long.trim()) {
      fail(`${lang}/MenuItems.json: item ${id} long description is empty or not text`);
      continue;
    }
    if (long === shortById[id][lang]) {
      duplicated += 1;
      if (duplicated <= 5) {
        fail(`${lang}/MenuItems.json: item ${id} long description duplicates the short one`);
      }
    }
  }

  for (const id of Object.keys(longs)) {
    if (!Object.hasOwn(shortById, id)) {
      fail(`${lang}/MenuItems.json: long description for unknown item ${id}`);
    }
  }
}
if (duplicated > 5) fail(`...and ${duplicated - 5} more duplicated long descriptions`);

let openJobs = 0;
try {
  const careersLoaded = await withCareersData(async (data, server) => {
    const { BRANCHES } = await server.ssrLoadModule(
      "/src/05_pages/public/contact/04_contact_const/BRANCHES.js",
    );
    return { data, branchIds: BRANCHES.map((branch) => branch.id) };
  });
  openJobs = Array.isArray(careersLoaded.data.JOBS) ? careersLoaded.data.JOBS.length : 0;
  checkCareersData(careersLoaded.data, careersLoaded.branchIds).forEach((message) => fail(message));
} catch (error) {
  fail(`careers data could not be read: ${error.message}`);
}

if (failures.length) {
  console.error(`\ntranslation check FAILED (${failures.length} problem(s)):\n`);
  failures.forEach((message) => console.error(`  - ${message}`));
  process.exit(1);
}

console.log(
  `translations ok: ${languages.length} languages x ${namespaces.length} namespaces, ` +
    `${itemIds.length} known menu items checked ` +
    `(${MenuItems.length} active, ${AllMenuItems.filter((item) => item.isActive === false).length} inactive preserved), ` +
    `${openJobs} open jobs`,
);
}

if (invokedDirectly) {
  await checkLocales();
}
