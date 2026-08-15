import { createContext, useState, useEffect, useMemo } from "react";
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

// Touch is independent from screen size (e.g. touch-screen laptops), and it
// cannot change during a session - so it is read once at module load rather
// than recomputed on every render.
const IS_TOUCH_DEVICE =
  "ontouchstart" in window || navigator.maxTouchPoints > 0;

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

  // Memoised so consumers only re-render when the breakpoint actually changes.
  const contextValue = useMemo(
    () => ({
      deviceType, // "mobile" | "tablet" | "desktop"
      isMobile: deviceType === "mobile",
      isTablet: deviceType === "tablet",
      isDesktop: deviceType === "desktop",
      isTouchDevice: IS_TOUCH_DEVICE,
    }),
    [deviceType],
  );

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
