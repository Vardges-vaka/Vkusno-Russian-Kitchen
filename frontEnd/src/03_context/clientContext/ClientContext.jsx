import { createContext, useMemo, useSyncExternalStore } from "react";
import PropTypes from "prop-types";
import { IS_SERVER } from "../../00_config/_config.index.js";

const ClientContext = createContext();

// Breakpoints match the CSS media queries used across the app
const TABLET_MIN_WIDTH = 768;
const DESKTOP_MIN_WIDTH = 1024;

// What a page saved at build time is drawn as. There is no screen at build
// time, so one layout has to be chosen. Phones are most visits, and the phone
// home page is the lighter one for React to attach to before it switches.
const SERVER_DEVICE_TYPE = "mobile";

// Width-based detection instead of user-agent sniffing:
// UA strings are unreliable and change between browser versions,
// while width also reacts to resize / rotation.
const getDeviceType = () => {
  const width = window.innerWidth;
  if (width >= DESKTOP_MIN_WIDTH) return "desktop";
  if (width >= TABLET_MIN_WIDTH) return "tablet";
  return "mobile";
};

const getServerDeviceType = () => SERVER_DEVICE_TYPE;

// matchMedia "change" fires only when a breakpoint is crossed,
// unlike a raw resize listener that fires on every dragged pixel.
const subscribeToBreakpoints = (onChange) => {
  const tabletQuery = window.matchMedia(`(min-width: ${TABLET_MIN_WIDTH}px)`);
  const desktopQuery = window.matchMedia(`(min-width: ${DESKTOP_MIN_WIDTH}px)`);

  tabletQuery.addEventListener("change", onChange);
  desktopQuery.addEventListener("change", onChange);

  return () => {
    tabletQuery.removeEventListener("change", onChange);
    desktopQuery.removeEventListener("change", onChange);
  };
};

// Touch is independent from screen size (e.g. touch-screen laptops), and it
// cannot change during a session - so it is read once at module load rather
// than recomputed on every render. There is no window while pages are saved.
const IS_TOUCH_DEVICE =
  !IS_SERVER && ("ontouchstart" in window || navigator.maxTouchPoints > 0);

const ClientProvider = ({ children }) => {
  // useSyncExternalStore, not useState + useEffect. While React attaches to a
  // saved page it must draw what the build drew ("mobile"), then switch to
  // the real screen. This hook does exactly that, and the lint rule
  // react-hooks/set-state-in-effect forbids the useEffect version. Deliberate
  // exception to the "useState / useReducer / Context only" convention.
  const deviceType = useSyncExternalStore(
    subscribeToBreakpoints,
    getDeviceType,
    getServerDeviceType,
  );

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
