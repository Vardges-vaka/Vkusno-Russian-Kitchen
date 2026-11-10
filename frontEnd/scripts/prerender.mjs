// Saves a finished HTML copy of every page into dist/, after the Vite build.
// Run from frontEnd/ by "npm run prerender", which postbuild calls.
//
// Why: the app is rendered in the browser, so every address used to return the
// same empty shell, and crawlers that do not run JavaScript saw no text. This
// step renders each address with the same React components and writes the
// result to dist/<address>/index.html. Vercel serves that file first.
// Addresses without a saved page still fall through to the shell.
import { existsSync } from "node:fs";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
  SITE_URL,
  assetPaths,
  buildPage,
  collectPageFiles,
  escapeHtml,
  pageFile,
  sitemapAddresses,
  splitHead,
} from "./prerenderHtml.mjs";

// React picks its development or production build from this when it is first
// imported. The browser bundle is the production build, so match it. Must be
// set before the server bundle is imported below.
process.env.NODE_ENV = "production";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const DIST = path.join(ROOT, "dist");
const SHELL = path.join(DIST, "index.html");
const MANIFEST = path.join(DIST, ".vite/manifest.json");
const SITEMAP = path.join(DIST, "sitemap.xml");
const SERVER_ENTRY = path.join(ROOT, "dist-ssr/entry-server.js");
const LOCALES = path.join(ROOT, "public/locales");
const RENDER_TIMEOUT_MS = 30000;

// Which page file draws each kind of page. The build manifest is keyed by
// these paths and lists the scripts and stylesheets that page needs.
const PAGE_SOURCE = {
  home: "src/05_pages/public/home/Home.jsx",
  menu: "src/05_pages/public/menu/Menu.jsx",
  dish: "src/05_pages/public/menu/MenuItem.jsx",
  contact: "src/05_pages/public/contact/Contact.jsx",
  kitchens: "src/05_pages/public/kitchens/Kitchens.jsx",
  kitchen: "src/05_pages/public/kitchens/Kitchen.jsx",
  careers: "src/05_pages/public/careers/Careers.jsx",
  job: "src/05_pages/public/careers/CareersJob.jsx",
  faq: "src/05_pages/public/legal/FAQ.jsx",
  privacy: "src/05_pages/public/legal/Privacy.jsx",
};

const stop = (message) => {
  throw new Error(`prerender: ${message}`);
};

const readJson = async (file) => JSON.parse(await readFile(file, "utf8"));

const loadTranslations = async () => {
  const resources = {};
  const folders = await readdir(LOCALES, { withFileTypes: true });
  for (const folder of folders.filter((entry) => entry.isDirectory())) {
    resources[folder.name] = {};
    for (const file of await readdir(path.join(LOCALES, folder.name))) {
      if (!file.endsWith(".json")) continue;
      resources[folder.name][file.slice(0, -".json".length)] = await readJson(
        path.join(LOCALES, folder.name, file),
      );
    }
  }
  return resources;
};

const withTimeout = (promise, label) => {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(
      () =>
        reject(
          new Error(
            `prerender: ${label} did not finish in ${RENDER_TIMEOUT_MS} ms`,
          ),
        ),
      RENDER_TIMEOUT_MS,
    );
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
};

// One 1200x630 JPEG per dish, cut from the dish photo, for WhatsApp and
// Facebook cards. JPEG because not every app shows a WebP share picture.
// A missing picture must never stop a deploy: any failure here is a warning,
// and that dish is simply shared without a picture.
const makeSharePictures = async (pages) => {
  const wanted = new Map();
  for (const page of pages) {
    if (page.share) wanted.set(page.share.name, page.share.source);
  }
  if (!wanted.size) return new Map();

  let sharp;
  try {
    ({ default: sharp } = await import("sharp"));
  } catch (error) {
    console.warn(
      `share pictures skipped: sharp could not be loaded (${error.message})`,
    );
    return new Map();
  }

  await mkdir(path.join(DIST, "share"), { recursive: true });
  const made = new Map();
  await Promise.all(
    [...wanted].map(async ([name, source]) => {
      try {
        await sharp(path.join(DIST, decodeURIComponent(source)))
          .resize(1200, 630, { fit: "cover", position: "centre" })
          .jpeg({ quality: 82, mozjpeg: true })
          .toFile(path.join(DIST, "share", `${name}.jpg`));
        made.set(name, `${SITE_URL}/share/${name}.jpg`);
      } catch (error) {
        console.warn(`share picture skipped for ${name}: ${error.message}`);
      }
    }),
  );
  return made;
};

if (!existsSync(SHELL)) stop("dist/index.html is missing. Run npm run build.");
if (!existsSync(MANIFEST)) {
  stop(
    "dist/.vite/manifest.json is missing. Run this through npm run build, which keeps that file until the sitemap step.",
  );
}
if (!existsSync(SERVER_ENTRY))
  stop("dist-ssr/entry-server.js is missing. Run npm run build:ssr first.");

const shell = await readFile(SHELL, "utf8");
if (!shell.includes('<div id="root"></div>')) {
  stop("dist/index.html is not the empty app shell. Run npm run build again.");
}

const manifest = await readJson(MANIFEST);
const server = await import(pathToFileURL(SERVER_ENTRY).href);
await server.initServerI18n(await loadTranslations());
const pages = server.listPages();

// The sitemap and the saved pages must describe the same site.
const listed = new Set(sitemapAddresses(await readFile(SITEMAP, "utf8")));
const saved = new Set(pages.map((page) => `${SITE_URL}${page.path}`));
const onlyInSitemap = [...listed].filter((address) => !saved.has(address));
const onlySaved = [...saved].filter((address) => !listed.has(address));
if (onlyInSitemap.length || onlySaved.length) {
  stop(
    `the sitemap and the saved pages differ. Only in sitemap: ${onlyInSitemap.slice(0, 5).join(", ") || "none"}. Only saved: ${onlySaved.slice(0, 5).join(", ") || "none"}.`,
  );
}

const filesByKind = Object.fromEntries(
  Object.entries(PAGE_SOURCE).map(([kind, source]) => [
    kind,
    collectPageFiles(manifest, source),
  ]),
);
const sharePictures = await makeSharePictures(pages);

let bytes = 0;
const counts = {};
for (const page of pages) {
  const files = filesByKind[page.kind];
  if (!files)
    stop(`no page file is listed for kind "${page.kind}" (${page.path})`);

  const rendered = await withTimeout(
    server.renderPage(page.path, page.lang),
    page.path,
  );
  const { tags, markup } = splitHead(rendered);

  if (!/<h1[\s>]/.test(markup)) stop(`${page.path} has no <h1>`);
  if (page.heading && !markup.includes(`>${escapeHtml(page.heading)}</h1>`)) {
    stop(`${page.path} does not show "${page.heading}" as its heading`);
  }
  if (markup.includes("<!--$!-->"))
    stop(`${page.path} was saved as a loading placeholder`);
  if (
    markup.includes('class="pageLoader"') ||
    markup.includes('class="errorBoundary"')
  ) {
    stop(`${page.path} was saved as the loading or error screen`);
  }

  const shareUrl = page.share ? sharePictures.get(page.share.name) : null;
  let html;
  try {
    html = buildPage({
      template: shell,
      lang: page.lang,
      tags,
      markup,
      files,
      share: shareUrl ? { url: shareUrl, alt: page.heading } : null,
    });
  } catch (error) {
    stop(`${page.path}: ${error.message}`);
  }

  if (html.includes("/src/")) stop(`${page.path} points at a /src/ file`);
  for (const asset of assetPaths(html)) {
    if (!existsSync(path.join(DIST, asset)))
      stop(`${page.path} uses ${asset}, which is not in dist`);
  }

  const target = path.join(DIST, pageFile(page.path));
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, html, "utf8");

  bytes += Buffer.byteLength(html);
  counts[page.kind] = (counts[page.kind] ?? 0) + 1;
}

const summary = Object.entries(counts)
  .map(([kind, count]) => `${count} ${kind}`)
  .join(", ");
console.log(
  `saved pages: ${pages.length} (${summary}), ${(bytes / 1048576).toFixed(1)} MB, ${sharePictures.size} share pictures`,
);
