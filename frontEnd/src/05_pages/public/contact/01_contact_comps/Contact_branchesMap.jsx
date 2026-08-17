import PropTypes from "prop-types";
import { useEffect } from "react";
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

const Contact_branchesMap = ({ branches, lang, t }) => {
  const {
    mapId,
    hasApiKey,
    isMapReady,
    dubaiCenter,
    defaultZoom,
    selectedBranchId,
    selectBranch,
  } = useMapContext();

  const deselectBranch = () => selectBranch(null);

  if (!hasApiKey) {
    return (
      <div className="Contact_branchesMap">
        <p className="Contact_branchesMap_fallback" role="status">
          {t("contact.branches.mapUnavailable")}
        </p>
      </div>
    );
  }

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

Contact_branchesMap.propTypes = {
  branches: PropTypes.arrayOf(branchShape).isRequired,
  lang: langShape.isRequired,
  t: translateFn.isRequired,
};

export default Contact_branchesMap;
