import { createContext, useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { IS_DEBUG } from "../../00_config/_config.index.js";

// This provider must NOT mount <APIProvider>, and must not import MapSdk.jsx.
//
// <APIProvider> downloads Google's Maps script the moment it mounts. This
// provider wraps whole sections of the site (see routeNeedsMap), so when it
// mounted <APIProvider> itself, the menu and every dish page downloaded that
// script for a map that is only inside the order window. Each map now asks
// for the script itself, through MapSdk.jsx.
//
// What stays here is small: which kitchen is picked, and the map settings.

// Driven by VITE_IS_DEBUG in .env (see IS_DEBUG in 00_config). This used to be
// a hardcoded `true`, so every production visitor logged the Maps load.
const isMapContext_debug = IS_DEBUG;

const MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const MAPS_MAP_ID = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID;

// All 5 branches sit inside Dubai, so one shared default view works for
// every consumer of this context (the Contact map and the order window).
const DUBAI_CENTER = { lat: 25.1972, lng: 55.2744 };
const DUBAI_DEFAULT_ZOOM = 11;

const MapContext = createContext();

const MapProvider = ({ children }) => {
  // Shared with the order window: a branch card and a map pin both read and
  // write this same selection, so it lives here instead of per-page state.
  const [selectedBranchId, setSelectedBranchId] = useState(null);

  const selectBranch = useCallback((branchId) => {
    setSelectedBranchId(branchId);
  }, []);

  const hasApiKey = Boolean(MAPS_API_KEY);

  // Memoised: the map and every branch card read this value, so an unmemoised
  // object would re-render all of them on any parent render.
  const contextValue = useMemo(
    () => ({
      apiKey: MAPS_API_KEY,
      mapId: MAPS_MAP_ID,
      hasApiKey,
      dubaiCenter: DUBAI_CENTER,
      defaultZoom: DUBAI_DEFAULT_ZOOM,
      selectedBranchId,
      selectBranch,
    }),
    [hasApiKey, selectedBranchId, selectBranch],
  );

  // No key configured (e.g. local dev before .env is set up): the map
  // components read hasApiKey and show their "map unavailable" line instead
  // of mounting MapSdk, so Google's script is never asked for.
  if (!hasApiKey) {
    isMapContext_debug &&
      console.warn(
        "MapContext: VITE_GOOGLE_MAPS_API_KEY is missing - map features are disabled.",
      );
  }

  return (
    <MapContext.Provider value={contextValue}>{children}</MapContext.Provider>
  );
};

MapProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

MapProvider.displayName = "MapProvider";

export { MapContext, MapProvider };
