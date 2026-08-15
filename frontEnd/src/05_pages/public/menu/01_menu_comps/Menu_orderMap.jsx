import PropTypes from "prop-types";
import { useCallback, useEffect, useRef } from "react";
import {
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  useMap,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { useMapContext } from "../../../../03_context/_context.index.js";
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

// Lives inside <Map> so useMap() resolves to this instance. Pans when the
// customer picks a kitchen from the list or a pin - not on every render.
const Menu_orderMap_panner = ({
  branches,
  selectedBranchId,
  dubaiCenter,
  defaultZoom,
  cameFromPinRef,
}) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    // A pin tap already puts that kitchen under the customer's finger, so the
    // camera stays where it is. Moving it here is exactly what made the pins
    // look broken: selecting one re-centred and zoomed the map to 13, which
    // pushed the other four kitchens off screen where they could not be
    // tapped at all - so the list became the only way to change branch.
    if (cameFromPinRef.current) {
      cameFromPinRef.current = false;
      return;
    }

    // No kitchen picked - show all branches at the shared Dubai overview zoom.
    if (!selectedBranchId) {
      map.setCenter(dubaiCenter);
      map.setZoom(defaultZoom);
      return;
    }

    const branch = branches.find((item) => item.id === selectedBranchId);
    if (!branch) return;

    // Pan only, never zoom in. This map is a picker rather than something to
    // explore, so every kitchen has to stay on screen and reachable.
    map.panTo({
      lat: branch.location.coordinates.latitude,
      lng: branch.location.coordinates.longitude,
    });
  }, [map, branches, selectedBranchId, dubaiCenter, defaultZoom, cameFromPinRef]);

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

const Menu_orderMap = ({ branches, lang, t }) => {
  const {
    mapId,
    hasApiKey,
    isMapReady,
    dubaiCenter,
    defaultZoom,
    selectedBranchId,
    selectBranch,
  } = useMapContext();

  // Flags the next selection as coming from a pin tap rather than the kitchen
  // list, so the panner above knows to leave the camera alone.
  const cameFromPinRef = useRef(false);

  const selectFromPin = useCallback(
    (branchId) => {
      cameFromPinRef.current = true;
      selectBranch(branchId);
    },
    [selectBranch],
  );

  if (!hasApiKey) {
    return (
      <div className="Menu_orderMap">
        <p className="Menu_orderMap_fallback" role="status">
          {t("menu.orderModal.mapUnavailable")}
        </p>
      </div>
    );
  }

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
        <Menu_orderMap_panner
          branches={branches}
          selectedBranchId={selectedBranchId}
          dubaiCenter={dubaiCenter}
          defaultZoom={defaultZoom}
          cameFromPinRef={cameFromPinRef}
        />
        {branches.map((branch) => (
          <Menu_orderMap_marker
            key={branch.id}
            branch={branch}
            lang={lang}
            t={t}
            isSelected={selectedBranchId === branch.id}
            onSelect={selectFromPin}
          />
        ))}
      </Map>
    </div>
  );
};

Menu_orderMap_panner.propTypes = {
  branches: PropTypes.arrayOf(branchShape).isRequired,
  selectedBranchId: PropTypes.string,
  dubaiCenter: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
  defaultZoom: PropTypes.number.isRequired,
  cameFromPinRef: PropTypes.shape({ current: PropTypes.bool }).isRequired,
};

Menu_orderMap_marker.propTypes = {
  branch: branchShape.isRequired,
  lang: langShape.isRequired,
  t: translateFn.isRequired,
  isSelected: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
};

Menu_orderMap.propTypes = {
  branches: PropTypes.arrayOf(branchShape).isRequired,
  lang: langShape.isRequired,
  t: translateFn.isRequired,
};

export default Menu_orderMap;
