import PropTypes from "prop-types";
import { useEffect } from "react";
import {
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  useMap,
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
import "../00_contact_styles/Contact_branchesMap.css";

const Contact_branchesMap_panner = ({ branches, selectedBranchId }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !selectedBranchId) return;

    const branch = branches.find((item) => item.id === selectedBranchId);
    if (!branch) return;

    map.panTo({
      lat: branch.location.coordinates.latitude,
      lng: branch.location.coordinates.longitude,
    });
  }, [map, branches, selectedBranchId]);

  return null;
};

const Contact_branchesMap_marker = ({
  branch,
  lang,
  t,
  isSelected,
  onSelect,
  onDeselect,
}) => {
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
          background="var(--accent_color)"
          borderColor="var(--accent_hover_color)"
          glyphColor="var(--surface_color)"
          scale={isSelected ? 1.2 : 1}
        />
      </AdvancedMarker>

      {isSelected && marker && (
        <InfoWindow anchor={marker} onCloseClick={onDeselect}>
          <div className="Contact_branchesMap_infoWindow">
            <p className="Contact_branchesMap_infoWindow_name">{name}</p>
            <p className="Contact_branchesMap_infoWindow_hours">
              {branch.timing.is24Hours
                ? t("contact.branches.open24")
                : t("contact.branches.hours", {
                    open: branch.timing.openTime,
                    close: branch.timing.closeTime,
                  })}
            </p>
            <a
              className="Contact_branchesMap_infoWindow_directions"
              href={branch.location.googleMapsLink}
              target="_blank"
              rel="noreferrer">
              {t("contact.branches.directions")}
            </a>
          </div>
        </InfoWindow>
      )}
    </>
  );
};

// The map itself. Renders inside <MapSdk>, which is required for
// useApiIsLoaded() to see whether Google's script has arrived.
const Contact_branchesMap_view = ({ branches, lang, t }) => {
  const { mapId, dubaiCenter, defaultZoom, selectedBranchId, selectBranch } =
    useMapContext();
  const isMapReady = useApiIsLoaded();

  const deselectBranch = () => selectBranch(null);

  return (
    <div className="Contact_branchesMap">
      {!isMapReady && (
        <p className="Contact_branchesMap_fallback" role="status">
          {t("contact.branches.mapLoading")}
        </p>
      )}

      <Map
        className="Contact_branchesMap_canvas"
        mapId={mapId}
        defaultCenter={dubaiCenter}
        defaultZoom={defaultZoom}
        gestureHandling="greedy"
        onClick={deselectBranch}>
        <Contact_branchesMap_panner
          branches={branches}
          selectedBranchId={selectedBranchId}
        />
        {branches.map((branch) => (
          <Contact_branchesMap_marker
            key={branch.id}
            branch={branch}
            lang={lang}
            t={t}
            isSelected={selectedBranchId === branch.id}
            onSelect={selectBranch}
            onDeselect={deselectBranch}
          />
        ))}
      </Map>
    </div>
  );
};

// Google's script is asked for here, when this map is put on the page - not
// by the whole page section. See MapSdk.jsx.
const Contact_branchesMap = ({ branches, lang, t }) => {
  const { hasApiKey } = useMapContext();

  // Shown in the map's place when there is no key, and by MapSdk when
  // Google's map cannot be shown. The page around it keeps working.
  const unavailable = (
    <div className="Contact_branchesMap">
      <p className="Contact_branchesMap_fallback" role="status">
        {t("contact.branches.mapUnavailable")}
      </p>
    </div>
  );

  if (!hasApiKey) return unavailable;

  return (
    <MapSdk fallback={unavailable}>
      <Contact_branchesMap_view branches={branches} lang={lang} t={t} />
    </MapSdk>
  );
};

Contact_branchesMap_panner.propTypes = {
  branches: PropTypes.arrayOf(branchShape).isRequired,
  selectedBranchId: PropTypes.string,
};

Contact_branchesMap_marker.propTypes = {
  branch: branchShape.isRequired,
  lang: langShape.isRequired,
  t: translateFn.isRequired,
  isSelected: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
  onDeselect: PropTypes.func.isRequired,
};

Contact_branchesMap_view.propTypes = {
  branches: PropTypes.arrayOf(branchShape).isRequired,
  lang: langShape.isRequired,
  t: translateFn.isRequired,
};

Contact_branchesMap.propTypes = {
  branches: PropTypes.arrayOf(branchShape).isRequired,
  lang: langShape.isRequired,
  t: translateFn.isRequired,
};

export default Contact_branchesMap;
