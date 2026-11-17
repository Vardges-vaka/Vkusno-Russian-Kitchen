import { Component, useSyncExternalStore } from "react";
import PropTypes from "prop-types";
import {
  APIProvider,
  APILoadingStatus,
  useApiLoadingStatus,
} from "@vis.gl/react-google-maps";
import { IS_DEBUG, IS_SERVER } from "../../00_config/_config.index.js";
import useMapContext from "./useMapContext.js";

// Loads Google's Maps script, and only when a map is really on screen.
//
// <APIProvider> downloads and parses the Maps script (about 220 KB) the moment
// it mounts. It used to wrap whole sections of the site, so the menu and every
// dish page paid for a map that is only inside the order window. Now each map
// wraps itself in <MapSdk>: the Contact page and a kitchen page load the
// script with the page, the order window loads it when it opens.
//
// The script is downloaded once per visit however many times this mounts: the
// library keeps one loader for the whole page.
//
// Use this inside a map component only. Never put it around a page or a
// section, and keep it out of 03_context/_context.index.js: the point is that
// it mounts with a map and with nothing else.
//
// It is also the guard. A map is a helper: the kitchens, their hours and the
// order buttons are plain parts of the page. So whatever goes wrong with
// Google's map, this shows the caller's "map unavailable" line in its place
// and the rest of the page keeps working. Three things can go wrong:
//   1. Google's script cannot be fetched (no connection, an ad blocker).
//   2. Google refuses the key (key removed, billing stopped, or this address
//      is not on the key's list).
//   3. The map code throws while it runs.
// Before this guard, case 2 took the whole page down as soon as a visitor
// picked a kitchen: the pin code threw and the site's error screen replaced
// everything, order buttons included.

// Defined once, outside the component: the library re-runs its loader when
// these change, so a new function on every render would be wasted work.
const handleLoad = () => {
  IS_DEBUG && console.log("MapSdk: Google Maps API loaded");
};

const handleError = (error) => {
  IS_DEBUG && console.error("MapSdk: Google Maps API failed to load", error);
};

// Case 2. Google calls window.gm_authFailure when it refuses the key. The maps
// library does not listen for it, so this file does. One answer for the whole
// page: a key refused for one map is refused for every map.
let keyRefused = false;
const refusedListeners = new Set();

const subscribeToRefusal = (listener) => {
  refusedListeners.add(listener);
  return () => refusedListeners.delete(listener);
};
const isKeyRefused = () => keyRefused;
// Pages are saved at build time with the map's place ready, never refused.
const notRefusedWhileSaving = () => false;

if (!IS_SERVER) {
  const previous = window.gm_authFailure;
  window.gm_authFailure = () => {
    keyRefused = true;
    IS_DEBUG && console.error("MapSdk: Google refused the map key");
    refusedListeners.forEach((listener) => listener());
    if (typeof previous === "function") previous();
  };
}

// Case 3. Error boundaries are the one case React still requires a class.
// Without this one, an error inside a map climbs to the site-wide boundary
// and the whole page is replaced by the error screen.
class MapErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    IS_DEBUG && console.error("MapSdk: the map stopped with an error", error);
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

MapErrorBoundary.propTypes = {
  fallback: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};

// Renders *inside* <APIProvider>, which is required for useApiLoadingStatus()
// to see how the script's download went (case 1).
const MapGuard = ({ fallback, children }) => {
  const status = useApiLoadingStatus();
  const refused = useSyncExternalStore(
    subscribeToRefusal,
    isKeyRefused,
    notRefusedWhileSaving,
  );

  const cannotLoad =
    status === APILoadingStatus.FAILED ||
    status === APILoadingStatus.AUTH_FAILURE;

  // The boundary stays in place in every case, and the swap happens inside it.
  // Taking a half-working Google map off the page can itself throw (its pins
  // clean up against a map that never started). With the boundary still
  // around it, that error stops here too instead of reaching the site-wide
  // error screen.
  return (
    <MapErrorBoundary fallback={fallback}>
      {refused || cannotLoad ? fallback : children}
    </MapErrorBoundary>
  );
};

MapGuard.propTypes = {
  fallback: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};

// Render only when hasApiKey (from useMapContext) is true.
// fallback: what to show in the map's place when the map cannot be shown.
const MapSdk = ({ fallback, children }) => {
  const { apiKey } = useMapContext();

  return (
    <APIProvider apiKey={apiKey} onLoad={handleLoad} onError={handleError}>
      <MapGuard fallback={fallback}>{children}</MapGuard>
    </APIProvider>
  );
};

MapSdk.propTypes = {
  fallback: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};

export default MapSdk;
