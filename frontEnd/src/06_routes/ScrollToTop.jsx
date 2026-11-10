import { useEffect, useRef, useSyncExternalStore } from "react";
import { useLocation } from "react-router-dom";

// For useSyncExternalStore below: true at build time and while React attaches
// to a page saved at build time, false in every other render.
const subscribeToNothing = () => () => {};
const notAttaching = () => false;
const attaching = () => true;

// React Router keeps scroll position by default - reset on every path change.
//
// Except when a dish opens as an overlay: that is a real navigation (the URL
// changes to /{lang}/menu/{slug}) but the menu grid stays mounted underneath,
// so scrolling it to the top would lose the reader's place the moment they
// close the modal.
const ScrollToTop = () => {
  const { pathname, state } = useLocation();
  const isOverlay = Boolean(state?.background);

  // A saved page is on screen before React arrives, so the reader may already
  // have scrolled it, and a reload restores their position. The first run
  // must leave that alone. Later page changes still reset to the top.
  const isAttachingToSavedPage = useSyncExternalStore(
    subscribeToNothing,
    notAttaching,
    attaching,
  );
  const skipFirstReset = useRef(isAttachingToSavedPage);

  useEffect(() => {
    if (isOverlay) return;
    if (skipFirstReset.current) {
      skipFirstReset.current = false;
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, isOverlay]);

  return null;
};

export default ScrollToTop;
