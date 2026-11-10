import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useSyncExternalStore,
} from "react";
import PropTypes from "prop-types";
import { IS_SERVER } from "../../00_config/_config.index.js";

const ThemeContext = createContext();

const THEMES = ["light", "dark"];
const STORAGE_KEY = "theme";

// What a page saved at build time is drawn as. Nobody is visiting at build
// time, so the build cannot know their theme. Colours still never flash: the
// inline script in index.html stamps the real theme on <html> before paint.
const SERVER_THEME = "light";

const getSystemPreference = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

// Resolution order: an explicit saved choice wins, otherwise follow the OS.
//
// IMPORTANT: the inline <script> in index.html stamps data-theme before React
// mounts (so there is no light-to-dark flash) and MUST use this exact order.
// If the two ever disagree, the page paints one theme and then swaps.
const resolveInitialTheme = () => {
  if (IS_SERVER) return SERVER_THEME;
  const saved = localStorage.getItem(STORAGE_KEY);
  if (THEMES.includes(saved)) return saved;
  return getSystemPreference();
};

// For useSyncExternalStore below. There is nothing to listen to: the answer
// changes exactly once, when React has finished attaching to a saved page.
const subscribeToNothing = () => () => {};
const notAttaching = () => false;
const attaching = () => true;

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(resolveInitialTheme);

  // True at build time and while React attaches to a saved page, false after.
  // The saved page was drawn as "light", so the first browser render has to
  // say "light" too. Otherwise React leaves the toggle unchecked for a
  // dark-theme visitor and it then works inverted. The real theme is exposed
  // one render later.
  //
  // useSyncExternalStore is React's own hook for "server value first, browser
  // value after". Doing this with useState + useEffect is what the lint rule
  // react-hooks/set-state-in-effect forbids. Deliberate exception to the
  // "useState / useReducer / Context only" convention.
  const isAttachingToSavedPage = useSyncExternalStore(
    subscribeToNothing,
    notAttaching,
    attaching,
  );
  const shownTheme = isAttachingToSavedPage ? SERVER_THEME : theme;

  // Uses the real theme, not shownTheme: the saved choice and data-theme must
  // never be overwritten with the build-time placeholder.
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
      theme: shownTheme,
      isDarkMode: shownTheme === "dark",
      isLightMode: shownTheme === "light",

      // Theme actions
      toggleTheme,
      setSpecificTheme,
      applySystemPreference,
      getSystemPreference,
    }),
    [shownTheme, toggleTheme, setSpecificTheme, applySystemPreference],
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
