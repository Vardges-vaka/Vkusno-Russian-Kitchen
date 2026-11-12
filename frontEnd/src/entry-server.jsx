import { StrictMode } from "react";
import { prerender } from "react-dom/static";
import { StaticRouter } from "react-router-dom";
import App from "./App.jsx";
import i18n, { initServerI18n } from "./i18n/i18n.server.js";
import { SUPPORTED_LANGUAGES, localePath } from "./00_config/_config.index.js";
import { pickLocale } from "./04_hlprs/_hlprs.index.js";
import { MenuItems } from "./05_pages/public/menu/04_menu_const/menuItems.js";
import { menuItemSlug } from "./05_pages/public/menu/03_menu_hlprs/_menu_hlprs.index.js";
import { JOBS } from "./05_pages/public/careers/04_careers_const/_careers_const.index.js";
import { BRANCHES } from "./05_pages/public/contact/04_contact_const/_contact_const.index.js";

// Entry for the build step that saves each page (scripts/prerender.mjs).
// Built for Node by `npm run build:ssr`. It never runs in the browser.

export { initServerI18n };

// [route, kind]. The kind names the page file, so the build step knows which
// stylesheets and scripts that page needs. A new static page needs a row here,
// a row in PAGE_SOURCE in scripts/prerender.mjs, and a sitemap entry.
const STATIC_PAGES = [
  ["", "home"],
  ["menu", "menu"],
  ["contact", "contact"],
  ["kitchens", "kitchens"],
  ["careers", "careers"],
  ["faq", "faq"],
  ["privacy", "privacy"],
  ["about", "about"],
  ["delivery", "delivery"],
];

// Every address the site can show, from the same data the pages use.
// heading is the text the page must show in its <h1>; the build stops if it
// is missing. share is the dish photo a share picture is cut from.
export const listPages = () =>
  SUPPORTED_LANGUAGES.flatMap((lang) => [
    ...STATIC_PAGES.map(([route, kind]) => ({
      lang,
      kind,
      path: localePath(lang, route),
    })),
    ...MenuItems.map((item) => ({
      lang,
      kind: "dish",
      path: localePath(lang, `menu/${menuItemSlug(item, lang)}`),
      heading: pickLocale(item.name, lang),
      share: item.images?.full
        ? { name: item.slug.en, source: item.images.full }
        : null,
    })),
    ...JOBS.map((job) => ({
      lang,
      kind: "job",
      path: localePath(lang, `careers/${job.id}`),
      heading: pickLocale(job.title, lang),
    })),
    ...BRANCHES.map((branch) => ({
      lang,
      kind: "kitchen",
      path: localePath(lang, `kitchens/${branch.slug}`),
      heading: pickLocale(branch.name, lang),
    })),
  ]);

// Draws one address with the real App and returns React's HTML. prerender()
// waits for every lazy page, so the result is the finished page.
export const renderPage = async (pagePath, lang) => {
  await i18n.changeLanguage(lang);

  const problems = [];
  const { prelude } = await prerender(
    <StrictMode>
      <App Router={StaticRouter} routerProps={{ location: pagePath }} />
    </StrictMode>,
    { onError: (error) => problems.push(error) },
  );
  const html = await new Response(prelude).text();

  // An error inside a page would otherwise be saved as a loading placeholder.
  if (problems.length) throw problems[0];
  return html;
};
