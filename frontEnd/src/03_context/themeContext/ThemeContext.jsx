import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const setSpecificTheme = (newTheme) => {
    if (newTheme === "light" || newTheme === "dark") {
      setTheme(newTheme);
    } else {
      console.warn(`Invalid theme: ${newTheme}. Use 'light' or 'dark'.`);
    }
  };

  const getSystemPreference = () => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  // Set theme to system preference
  const useSystemPreference = () => {
    const systemTheme = getSystemPreference();
    setTheme(systemTheme);
  };

  const contextValue = {
    theme,
    isDarkMode: theme === "dark",
    isLightMode: theme === "light",

    // Theme actions
    toggleTheme,
    setSpecificTheme,
    useSystemPreference,
    getSystemPreference,
  };

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
