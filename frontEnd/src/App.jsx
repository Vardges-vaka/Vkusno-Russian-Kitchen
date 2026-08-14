import "./07_styles/ColorVariables.css";
import "./07_styles/App.css";
import { Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import {
  ThemeProvider,
  LanguageProvider,
  ClientProvider,
  MapProvider,
} from "./03_context/_context.index.js";
import { ErrorBoundary, PageLoader } from "./02_comps/_comps.index.js";
import { UserRoutes } from "./06_routes/_routes.index.js";
import ScrollToTop from "./06_routes/ScrollToTop.jsx";

function App() {
  return (
    <ErrorBoundary>
      <ClientProvider>
        <ThemeProvider>
          <LanguageProvider>
            <MapProvider>
              <Router>
                <ScrollToTop />
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route
                      path="/*"
                      element={
                        <Routes>
                          {UserRoutes.map((route) => (
                            <Route
                              key={route.path}
                              path={route.path}
                              element={route.element}
                            />
                          ))}
                        </Routes>
                      }
                    />
                  </Routes>
                </Suspense>
              </Router>
            </MapProvider>
          </LanguageProvider>
        </ThemeProvider>
      </ClientProvider>
    </ErrorBoundary>
  );
}

export default App;
