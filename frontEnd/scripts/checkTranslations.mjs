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
const menuRaw = await readFile(
  path.join(ROOT, "src/05_pages/public/menu/04_menu_const/menuItems.js"),
  "utf8",
);

// Dishes are taken off the menu by commenting the block out, so comment lines
// must go before parsing - otherwise a disabled dish still counts as active
// and its locale entry looks required rather than orphaned.
const menuSource = menuRaw
  .split(/\r?\n/)
  .filter((line) => !/^\s*\/\//.test(line))
  .join("\n");

const grab = (chunk, lang) =>
  chunk.match(new RegExp(`${lang}:\\s*"((?:[^"\\\\]|\\\\.)*)"`))?.[1];

const shortById = {};
for (const [, id, shortChunk] of menuSource.matchAll(
  /\n {2}id: (\d+),[\s\S]*?short: \{([\s\S]*?)\},/g,
)) {
  shortById[id] = Object.fromEntries(
    ["en", "ru", "ar"].map((lang) => [lang, grab(shortChunk, lang)]),
  );
}

// Dishes taken off the menu temporarily keep their translated copy - the
// three currently disabled are due back within the year, and rewriting three
// languages of description would be pure waste. So a locale entry for a
// DISABLED dish is allowed; one for a dish that never existed is not.
const disabledIds = new Set(
  [...menuRaw.matchAll(/^\s*\/\/\s*id: (\d+),/gm)].map((m) => m[1]),
);

const itemIds = Object.keys(shortById);
if (!itemIds.length) fail("menuItems.js: no items parsed - has the shape changed?");

let duplicated = 0;
for (const lang of languages) {
  const longs = loaded[lang]?.MenuItems?.long ?? {};

  for (const id of itemIds) {
    const long = longs[id];
    if (long === undefined) {
      fail(`${lang}/MenuItems.json: missing long description for item ${id}`);
      continue;
    }
    if (long === shortById[id][lang]) {
      duplicated += 1;
      if (duplicated <= 5) {
        fail(`${lang}/MenuItems.json: item ${id} long description duplicates the short one`);
      }
    }
  }

  // An id in the locale file with no matching dish is dead weight - unless
  // the dish is merely commented out, in which case it is deliberate.
  for (const id of Object.keys(longs)) {
    if (!shortById[id] && !disabledIds.has(id)) {
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
    `${itemIds.length} active menu items checked` +
    (disabledIds.size ? `, ${disabledIds.size} disabled preserved` : ""),
);
