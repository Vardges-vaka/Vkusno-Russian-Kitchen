import PropTypes from "prop-types";
import { useEffect } from "react";
import {
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  useMap,
  useMapsLibrary,
  useAdvancedMarkerRef,
  useApiIsLoaded,
} from "@vis.gl/react-google-maps";
import { useMapContext } from "../../../../03_context/_context.index.js";
// Loads Google's script when this map is put on the page - see MapSdk.jsx.
import MapSdk from "../../../../03_context/mapContext/MapSdk.jsx";
import {
  branchShape,
  langShape,
  translateFn,
  pickLocale,
} from "../../../../04_hlprs/_hlprs.index.js";
import "../00_menu_styles/Menu_orderMap.css";

const formatHours = (timing, t) =>
  timing.is24Hours
    ? t("menu.orderModal.open24")
    : t("menu.orderModal.hours", {
        open: timing.openTime,
        close: timing.closeTime,
      });

const Menu_orderMap_fitter = ({ branches }) => {
  const map = useMap();
  const core = useMapsLibrary("core");

  useEffect(() => {
    if (!map || !core || branches.length === 0) return;

    const fitAllBranches = () => {
      const bounds = new core.LatLngBounds();
      branches.forEach((branch) =>
        bounds.extend({
          lat: branch.location.coordinates.latitude,
          lng: branch.location.coordinates.longitude,
        }),
      );

      map.fitBounds(bounds, 48);
    };

    fitAllBranches();

    const container = map.getDiv();
    if (!container) return undefined;

    const observer = new ResizeObserver(fitAllBranches);
    observer.observe(container);

    return () => observer.disconnect();
  }, [map, core, branches]);

  return null;
};

const Menu_orderMap_marker = ({ branch, lang, t, isSelected, onSelect }) => {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const name = pickLocale(branch.name, lang);

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={{
          lat: branch.location.coordinates.latitude,
          lng: branch.location.coordinates.longitude,
        }}
        title={name}
        onClick={() => onSelect(branch.id)}>
        <Pin
          background={isSelected ? "var(--gold_color)" : "var(--accent_color)"}
          borderColor="var(--accent_hover_color)"
          glyphColor="var(--surface_color)"
          scale={isSelected ? 1.25 : 1}
        />
      </AdvancedMarker>

      {isSelected && marker && (
        <InfoWindow
          anchor={marker}
          headerDisabled
          maxWidth={260}
          pixelOffset={[0, -4]}>
          <div className="Menu_orderMap_infoWindow">
            <p className="Menu_orderMap_infoWindow_name">{name}</p>
            <p className="Menu_orderMap_infoWindow_hours">
              {formatHours(branch.timing, t)}
            </p>
            <div className="Menu_orderMap_infoWindow_apps">
              {branch.aggregators.map((aggregator) => (
                <a
                  key={aggregator.name}
                  className="Menu_orderMap_infoWindow_app"
                  href={aggregator.link}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={t("menu.orderModal.orderOn", {
                    app: aggregator.name,
                  })}
                  title={aggregator.name}>
                  <img
                    className="Menu_orderMap_infoWindow_logo"
                    src={aggregator.logo}
                    alt=""
                  />
                </a>
              ))}
            </div>
          </div>
        </InfoWindow>
      )}
    </>
  );
};

// The map itself. Renders inside <MapSdk>, which is required for
// useApiIsLoaded() to see whether Google's script has arrived.
const Menu_orderMap_view = ({ branches, lang, t }) => {
  const { mapId, dubaiCenter, defaultZoom, selectedBranchId, selectBranch } =
    useMapContext();
  const isMapReady = useApiIsLoaded();

  return (
    <div className="Menu_orderMap">
      {!isMapReady && (
        <p className="Menu_orderMap_fallback" role="status">
          {t("menu.orderModal.mapLoading")}
        </p>
      )}

      <Map
        className="Menu_orderMap_canvas"
        mapId={mapId}
        defaultCenter={dubaiCenter}
        defaultZoom={defaultZoom}
        gestureHandling="greedy"
        disableDefaultUI={false}
        mapTypeControl={false}
        streetViewControl={false}
        fullscreenControl={false}>
        <Menu_orderMap_fitter branches={branches} />
        {branches.map((branch) => (
          <Menu_orderMap_marker
            key={branch.id}
            branch={branch}
            lang={lang}
            t={t}
            isSelected={selectedBranchId === branch.id}
            onSelect={selectBranch}
          />
        ))}
      </Map>
    </div>
  );
};

// Google's script is asked for here, when the order window puts this map on
// the page - not when the menu page loads. See MapSdk.jsx.
const Menu_orderMap = ({ branches, lang, t }) => {
  const { hasApiKey } = useMapContext();

  // Shown in the map's place when there is no key, and by MapSdk when
  // Google's map cannot be shown. The kitchens and the order buttons beside
  // it are plain parts of the window and keep working.
  const unavailable = (
    <div className="Menu_orderMap">
      <p className="Menu_orderMap_fallback" role="status">
        {t("menu.orderModal.mapUnavailable")}
      </p>
    </div>
  );

  if (!hasApiKey) return unavailable;

  return (
    <MapSdk fallback={unavailable}>
      <Menu_orderMap_view branches={branches} lang={lang} t={t} />
    </MapSdk>
  );
};

Menu_orderMap_fitter.propTypes = {
  branches: PropTypes.arrayOf(branchShape).isRequired,
};

Menu_orderMap_marker.propTypes = {
  branch: branchShape.isRequired,
  lang: langShape.isRequired,
  t: translateFn.isRequired,
  isSelected: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
};

Menu_orderMap_view.propTypes = {
  branches: PropTypes.arrayOf(branchShape).isRequired,
  lang: langShape.isRequired,
  t: translateFn.isRequired,
};

Menu_orderMap.propTypes = {
  branches: PropTypes.arrayOf(branchShape).isRequired,
  lang: langShape.isRequired,
  t: translateFn.isRequired,
};

export default Menu_orderMap;
