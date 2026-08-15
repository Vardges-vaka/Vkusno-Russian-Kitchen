import { createContext, useState, useEffect, useCallback, useMemo } from "react";
import PropTypes from "prop-types";

const ThemeContext = createContext();

const THEMES = ["light", "dark"];
const STORAGE_KEY = "theme";

const getSystemPreference = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

// Resolution order: an explicit saved choice wins, otherwise follow the OS.
//
// IMPORTANT: the inline <script> in index.html stamps data-theme before React
// mounts (so there is no light-to-dark flash) and MUST use this exact order.
// If the two ever disagree, the page paints one theme and then swaps.
const resolveInitialTheme = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (THEMES.includes(saved)) return saved;
  return getSystemPreference();
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(resolveInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const setSpecificTheme = useCallback((next) => {
    if (THEMES.includes(next)) {
      setTheme(next);
    } else if (import.meta.env.DEV) {
      console.warn(`Invalid theme: ${next}. Use 'light' or 'dark'.`);
    }
  }, []);

  // Not a hook despite the old name - it's an action on the context value,
  // and calling it "useSystemPreference" made the hooks linter treat it as one.
  const applySystemPreference = useCallback(() => {
    setTheme(getSystemPreference());
  }, []);

  // Memoised: without this every consumer re-renders whenever the provider does,
  // even when the theme itself has not changed.
  const contextValue = useMemo(
    () => ({
      theme,
      isDarkMode: theme === "dark",
      isLightMode: theme === "light",

      // Theme actions
      toggleTheme,
      setSpecificTheme,
      applySystemPreference,
      getSystemPreference,
    }),
    [theme, toggleTheme, setSpecificTheme, applySystemPreference],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

ThemeProvider.displayName = "ThemeProvider";

export { ThemeContext, ThemeProvider };
