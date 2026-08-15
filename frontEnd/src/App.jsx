// Self-hosted typefaces (see the type block in ColorVariables.css).
// Imported before the stylesheets that reference them so the @font-face
// rules are registered first.
import "@fontsource-variable/playfair-display";
import "@fontsource-variable/golos-text";
import "@fontsource/ibm-plex-sans-arabic/400.css";
import "@fontsource/ibm-plex-sans-arabic/600.css";

import "./07_styles/ColorVariables.css";
import "./07_styles/App.css";
import { Suspense } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ThemeProvider,
  LanguageProvider,
  ClientProvider,
  MapProvider,
} from "./03_context/_context.index.js";
import { ErrorBoundary, PageLoader } from "./02_comps/_comps.index.js";
import {
  localePath,
  resolveLanguage,
  routeNeedsMap,
} from "./00_config/_config.index.js";
import UserRoutes, { MenuItem } from "./06_routes/userRoutes.jsx";
import LanguageLayout from "./06_routes/LanguageLayout.jsx";
import ScrollToTop from "./06_routes/ScrollToTop.jsx";

// "/" has no language in it, so pick one: the visitor's saved/ detected
// language if we support it, English otherwise. replace, so Back does not
// bounce them straight back here.
const RootRedirect = () => {
  const { i18n } = useTranslation();
  return <Navigate to={localePath(resolveLanguage(i18n.language))} replace />;
};

const AppRoutes = () => {
  const location = useLocation();

  // Set by Menu when a dish card is clicked. Its presence means "keep the
  // menu grid rendered underneath and show the dish as an overlay"; its
  // absence means this is a direct hit, so the dish renders as a real page.
  const background = location.state?.background;

  const routes = (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/:lang" element={<LanguageLayout />}>
          {UserRoutes.map((route) => (
            <Route
              key={route.path ?? "index"}
              index={route.index}
              path={route.path}
              element={route.element}
            />
          ))}
        </Route>
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/:lang/menu/:slug"
            element={<MenuItem variant="overlay" />}
          />
        </Routes>
      )}
    </>
  );

  // One provider wrapping BOTH route trees, rather than one per tree: the
  // overlay and the grid beneath it must share a single Maps context, or the
  // order modal would load the SDK a second time.
  return routeNeedsMap(location.pathname) ? (
    <MapProvider>{routes}</MapProvider>
  ) : (
    routes
  );
};

function App() {
  return (
    <ErrorBoundary>
      <ClientProvider>
        <ThemeProvider>
          <LanguageProvider>
            {/* MapProvider is NOT here - it mounts inside AppRoutes, and only
                on routes that can show a map. See routeNeedsMap. */}
            <Router>
              <ScrollToTop />
              <Suspense fallback={<PageLoader />}>
                <AppRoutes />
              </Suspense>
            </Router>
          </LanguageProvider>
        </ThemeProvider>
      </ClientProvider>
    </ErrorBoundary>
  );
}

export default App;
