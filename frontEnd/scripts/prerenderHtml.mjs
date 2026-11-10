// Pure helpers for scripts/prerender.mjs. They only work on strings and plain
// objects, so scripts/prerenderHtml.test.mjs can test them without a build.

export const SITE_URL = "https://vkusno.ae";

// Open Graph wants language_TERRITORY. Same values as index.html.
const OG_LOCALE = { en: "en_US", ru: "ru_RU", ar: "ar_AE" };
const RTL_LANGUAGES = ["ar"];

// React writes these five characters this way in the HTML it produces.
export const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#x27;");

// /en -> en/index.html, /en/menu/borshch -> en/menu/borshch/index.html.
// Vercel serves a folder's index.html at the folder's own address.
export const pageFile = (pagePath) => {
  const clean = pagePath.replace(/^\/+|\/+$/g, "");
  if (!clean) throw new Error("The bare address / is not a saved page");
  return `${clean}/index.html`;
};

export const sitemapAddresses = (xml) =>
  [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

// Every /assets/ file a page points at, decoded to the name on disk.
export const assetPaths = (html) => [
  ...new Set(
    [...html.matchAll(/\/assets\/[^"'\s,]+?\.[a-z0-9]+(?=["'\s),]|$)/gi)].map(
      (match) => decodeURIComponent(match[0].replaceAll("&amp;", "&")),
    ),
  ),
];

const HEAD_TAG = /^(?:<title>[\s\S]*?<\/title>|<(?:meta|link)\b[^>]*\/>)/;

// React writes the page's <title>, <meta> and <link> tags at the very start
// of its output, before the page itself. Peel them off so they can go in
// <head>, where crawlers and share cards look for them.
export const splitHead = (html) => {
  const tags = [];
  let markup = html;
  for (;;) {
    const match = HEAD_TAG.exec(markup);
    if (!match) break;
    tags.push(match[0]);
    markup = markup.slice(match[0].length);
  }
  return { tags, markup };
};

const attribute = (tag, name) =>
  new RegExp(`\\s${name}="([^"]*)"`).exec(tag)?.[1] ?? null;

const readHead = (tags) => {
  const title = tags.find((tag) => tag.startsWith("<title>"));
  const description = tags.find(
    (tag) =>
      tag.startsWith("<meta") && attribute(tag, "name") === "description",
  );
  const canonical = tags.find(
    (tag) => tag.startsWith("<link") && attribute(tag, "rel") === "canonical",
  );
  return {
    title: title ? title.slice("<title>".length, -"</title>".length) : null,
    description: description ? attribute(description, "content") : null,
    canonical: canonical ? attribute(canonical, "href") : null,
    alternates: tags.filter(
      (tag) => tag.startsWith("<link") && attribute(tag, "rel") === "alternate",
    ).length,
  };
};

// The files one page needs, in the order Vite itself loads them for a lazy
// page: the page file, then everything it imports, then its stylesheets.
// Keeping that order keeps the stylesheets in the order the browser gets today.
export const collectPageFiles = (manifest, sourceKey) => {
  const files = [];
  const seen = new Set();
  const visit = (key) => {
    if (seen.has(key)) return;
    seen.add(key);
    const chunk = manifest[key];
    if (!chunk) throw new Error(`Build manifest has no entry for ${key}`);
    files.push(chunk.file);
    for (const imported of chunk.imports ?? []) visit(imported);
    for (const css of chunk.css ?? [])
      if (!files.includes(css)) files.push(css);
  };
  visit(sourceKey);
  return files;
};

// Exactly one match, or stop. A function replacement on purpose: a plain
// string would treat "$$" (the price range in the structured data) specially.
const swap = (html, pattern, replacement, label) => {
  const found = html.match(new RegExp(pattern.source, "g")) ?? [];
  if (found.length !== 1) {
    throw new Error(
      `index.html: expected exactly one ${label}, found ${found.length}`,
    );
  }
  return html.replace(pattern, () => replacement);
};

// React also writes a preload for every image that is not lazy. Those <img>
// tags are already in the saved page, so the preloads would only push footer
// logos ahead of the stylesheets. The dish photo asks for high priority, so
// its preload stays.
const keepInHead = (tag) =>
  !tag.includes('rel="preload"') || tag.includes('fetchPriority="high"');

export const buildPage = ({ template, lang, tags, markup, files, share }) => {
  const head = readHead(tags);
  if (!head.title) throw new Error("page has no <title>");
  if (!head.description) throw new Error("page has no meta description");
  if (!head.canonical) throw new Error("page has no canonical link");
  if (head.alternates !== 4) {
    throw new Error(`page has ${head.alternates} language links, expected 4`);
  }

  const dir = RTL_LANGUAGES.includes(lang) ? "rtl" : "ltr";
  const pageTags = tags.filter(
    (tag) => !tag.startsWith("<title>") && keepInHead(tag),
  );
  const fileLinks = files
    .filter((file) => !template.includes(`"/${file}"`))
    .map((file) =>
      file.endsWith(".css")
        ? `<link rel="stylesheet" crossorigin href="/${file}">`
        : `<link rel="modulepreload" crossorigin href="/${file}">`,
    );
  const shareTags = share
    ? [
        `<meta property="og:image" content="${share.url}" />`,
        '<meta property="og:image:type" content="image/jpeg" />',
        '<meta property="og:image:width" content="1200" />',
        '<meta property="og:image:height" content="630" />',
        `<meta property="og:image:alt" content="${escapeHtml(share.alt)}" />`,
        `<meta name="twitter:image" content="${share.url}" />`,
      ]
    : [];
  const otherLocales = Object.keys(OG_LOCALE)
    .filter((code) => code !== lang)
    .map(
      (code) =>
        `<meta property="og:locale:alternate" content="${OG_LOCALE[code]}" />`,
    )
    .join("\n    ");
  const added = [...pageTags, ...fileLinks, ...shareTags]
    .map((tag) => `  ${tag}\n  `)
    .join("");

  let html = template;
  html = swap(
    html,
    /<html lang="en">/,
    `<html lang="${lang}" dir="${dir}">`,
    '<html lang="en">',
  );
  html = swap(
    html,
    /<title>[^<]*<\/title>/,
    `<title>${head.title}</title>`,
    "<title>",
  );
  html = swap(
    html,
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:title" content="${head.title}" />`,
    "og:title",
  );
  html = swap(
    html,
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:description" content="${head.description}" />`,
    "og:description",
  );
  html = swap(
    html,
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:url" content="${head.canonical}" />`,
    "og:url",
  );
  html = swap(
    html,
    /<meta\s+property="og:locale"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:locale" content="${OG_LOCALE[lang]}" />`,
    "og:locale",
  );
  html = swap(
    html,
    /<meta\s+property="og:locale:alternate"\s+content="[^"]*"\s*\/>\s*<meta\s+property="og:locale:alternate"\s+content="[^"]*"\s*\/>/,
    otherLocales,
    "pair of og:locale:alternate",
  );
  html = swap(html, /<\/head>/, `${added}</head>`, "</head>");
  html = swap(
    html,
    /<div id="root"><\/div>/,
    `<div id="root">${markup}</div>`,
    '<div id="root"></div>',
  );
  return html;
};
