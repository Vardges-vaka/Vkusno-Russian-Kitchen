import { useContext } from "react";
import { MapContext } from "./MapContext";

const useMapContext = () => {
  const context = useContext(MapContext);

  if (!context) {
    throw new Error(
      "useMapContext must be used within a MapProvider. " +
        "Make sure to wrap your component tree with <MapProvider>.",
    );
  }

  return context;
};

export default useMapContext;
