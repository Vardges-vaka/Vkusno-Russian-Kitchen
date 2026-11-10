import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { matchRoutes } from "react-router-dom";
// Must run before any component calls useTranslation, so keep it above App.
import i18n, { i18nReady } from "./i18n/i18n.index.js";
import App from "./App.jsx";
import UserRoutes from "./06_routes/userRoutes.jsx";

const container = document.getElementById("root");
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// A page saved at build time already has its HTML inside #root. React has to
// attach to it in one pass. If it had to wait for the page's code or for a
// translation file, it would throw the saved page away and show the loading
// spinner. So both are loaded first. Do not remove either wait.
const prepareSavedPage = async () => {
  const matches =
    matchRoutes(
      [{ path: "/:lang", children: UserRoutes }],
      window.location.pathname,
    ) ?? [];
  const page = matches.at(-1)?.route;

  await Promise.all([i18nReady, page?.element?.type?.preload?.()]);
  if (page?.namespaces) await i18n.loadNamespaces(page.namespaces);
};

// React reports a saved page that does not match instead of throwing. Keeping
// the reports on window lets a check read them without watching the console.
const reportHydrationProblem = (error) => {
  window.__vkusnoHydrationProblems = [
    ...(window.__vkusnoHydrationProblems ?? []),
    String(error?.message ?? error),
  ];
  console.error(error);
};

if (container.hasChildNodes()) {
  prepareSavedPage().then(
    () =>
      hydrateRoot(container, app, {
        onRecoverableError: reportHydrationProblem,
      }),
    // The page's code or words did not load. Start clean, the way the site
    // worked before pages were saved.
    () => createRoot(container).render(app),
  );
} else {
  // No saved page: the dev server, or an address that falls back to the shell.
  createRoot(container).render(app);
}
