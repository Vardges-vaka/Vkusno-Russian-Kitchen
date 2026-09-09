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

if (failures.length) {
  console.error(`\ntranslation check FAILED (${failures.length} problem(s)):\n`);
  failures.forEach((message) => console.error(`  - ${message}`));
  process.exit(1);
}

console.log(
  `translations ok: ${languages.length} languages x ${namespaces.length} namespaces, ` +
    `${itemIds.length} known menu items checked ` +
    `(${MenuItems.length} active, ${AllMenuItems.filter((item) => item.isActive === false).length} inactive preserved)`,
);
