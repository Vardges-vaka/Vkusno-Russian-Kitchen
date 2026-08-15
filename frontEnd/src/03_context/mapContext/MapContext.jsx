import { createContext, useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { APIProvider, useApiIsLoaded } from "@vis.gl/react-google-maps";
import { IS_DEBUG } from "../../00_config/_config.index.js";

// Driven by VITE_IS_DEBUG in .env (see IS_DEBUG in 00_config). This used to be
// a hardcoded `true`, so every production visitor logged the Maps load.
const isMapContext_debug = IS_DEBUG;

const MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const MAPS_MAP_ID = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID;

// All 5 branches sit inside Dubai, so one shared default view works for
// every consumer of this context (Contact map today, order modal later).
const DUBAI_CENTER = { lat: 25.1972, lng: 55.2744 };
const DUBAI_DEFAULT_ZOOM = 11;

const MapContext = createContext();

// Renders *inside* <APIProvider>, which is required for useApiIsLoaded()
// to see the script's loading status. MapProvider itself renders above
// APIProvider, so the "is it loaded" piece has to live in this small bridge.
const MapContextBridge = ({ selectedBranchId, selectBranch, children }) => {
  const isMapReady = useApiIsLoaded();

  // Memoised: the map and every branch card read this value, so an unmemoised
  // object would re-render all of them on any parent render.
  const contextValue = useMemo(
    () => ({
      mapId: MAPS_MAP_ID,
      hasApiKey: true,
      isMapReady,
      dubaiCenter: DUBAI_CENTER,
      defaultZoom: DUBAI_DEFAULT_ZOOM,
      selectedBranchId,
      selectBranch,
    }),
    [isMapReady, selectedBranchId, selectBranch],
  );

  return (
    <MapContext.Provider value={contextValue}>{children}</MapContext.Provider>
  );
};

MapContextBridge.propTypes = {
  selectedBranchId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  selectBranch: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

const MapProvider = ({ children }) => {
  // Shared with the future order modal: a branch card and a map pin both
  // read/write this same selection, so it lives here instead of per-page state.
  const [selectedBranchId, setSelectedBranchId] = useState(null);

  const selectBranch = useCallback((branchId) => {
    setSelectedBranchId(branchId);
  }, []);

  const handleLoad = () => {
    isMapContext_debug && console.log("MapContext: Google Maps API loaded");
  };

  const handleError = (error) => {
    isMapContext_debug &&
      console.error("MapContext: Google Maps API failed to load", error);
  };

  const hasApiKey = Boolean(MAPS_API_KEY);

  // Memoised above the early return - hooks cannot run conditionally, so this
  // is computed on every render and only used on the no-key path below.
  const fallbackValue = useMemo(
    () => ({
      mapId: MAPS_MAP_ID,
      hasApiKey: false,
      isMapReady: false,
      dubaiCenter: DUBAI_CENTER,
      defaultZoom: DUBAI_DEFAULT_ZOOM,
      selectedBranchId,
      selectBranch,
    }),
    [selectedBranchId, selectBranch],
  );

  // No key configured (e.g. local dev before .env is set up) - skip loading
  // the script entirely and hand consumers a context they can use to show
  // a fallback UI instead of a broken map.
  if (!hasApiKey) {
    isMapContext_debug &&
      console.warn(
        "MapContext: VITE_GOOGLE_MAPS_API_KEY is missing - map features are disabled.",
      );

    return (
      <MapContext.Provider value={fallbackValue}>
        {children}
      </MapContext.Provider>
    );
  }

  return (
    <APIProvider
      apiKey={MAPS_API_KEY}
      onLoad={handleLoad}
      onError={handleError}>
      <MapContextBridge
        selectedBranchId={selectedBranchId}
        selectBranch={selectBranch}>
        {children}
      </MapContextBridge>
    </APIProvider>
  );
};

MapProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

MapProvider.displayName = "MapProvider";

export { MapContext, MapProvider };
