import "./07_styles/ColorVariables.css";
import "./07_styles/App.css";
import { Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import {
  ThemeProvider,
  LanguageProvider,
} from "./03_context/_context.index.js";
import { UserRoutes } from "./06_routes/_routes.index.js";

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
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
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
