import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const ClientContext = createContext();

// Breakpoints match the CSS media queries used across the app
const TABLET_MIN_WIDTH = 768;
const DESKTOP_MIN_WIDTH = 1024;

// Width-based detection instead of user-agent sniffing:
// UA strings are unreliable and change between browser versions,
// while width also reacts to resize / rotation.
const getDeviceType = () => {
  const width = window.innerWidth;
  if (width >= DESKTOP_MIN_WIDTH) return "desktop";
  if (width >= TABLET_MIN_WIDTH) return "tablet";
  return "mobile";
};

const ClientProvider = ({ children }) => {
  const [deviceType, setDeviceType] = useState(getDeviceType);

  useEffect(() => {
    // matchMedia "change" fires only when a breakpoint is crossed,
    // unlike a raw resize listener that fires on every dragged pixel.
    const tabletQuery = window.matchMedia(
      `(min-width: ${TABLET_MIN_WIDTH}px)`,
    );
    const desktopQuery = window.matchMedia(
      `(min-width: ${DESKTOP_MIN_WIDTH}px)`,
    );

    const updateDeviceType = () => setDeviceType(getDeviceType());

    tabletQuery.addEventListener("change", updateDeviceType);
    desktopQuery.addEventListener("change", updateDeviceType);

    return () => {
      tabletQuery.removeEventListener("change", updateDeviceType);
      desktopQuery.removeEventListener("change", updateDeviceType);
    };
  }, []);

  // Touch is independent from screen size (e.g. touch-screen laptops),
  // so it's a separate flag rather than folded into deviceType.
  const isTouchDevice =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;

  const contextValue = {
    deviceType, // "mobile" | "tablet" | "desktop"
    isMobile: deviceType === "mobile",
    isTablet: deviceType === "tablet",
    isDesktop: deviceType === "desktop",
    isTouchDevice,
  };

  return (
    <ClientContext.Provider value={contextValue}>
      {children}
    </ClientContext.Provider>
  );
};

ClientProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

ClientProvider.displayName = "ClientProvider";

export { ClientContext, ClientProvider };
