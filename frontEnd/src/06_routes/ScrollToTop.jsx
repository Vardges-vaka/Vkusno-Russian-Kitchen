import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// React Router keeps scroll position by default - reset on every path change.
//
// Except when a dish opens as an overlay: that is a real navigation (the URL
// changes to /{lang}/menu/{slug}) but the menu grid stays mounted underneath,
// so scrolling it to the top would lose the reader's place the moment they
// close the modal.
const ScrollToTop = () => {
  const { pathname, state } = useLocation();
  const isOverlay = Boolean(state?.background);

  useEffect(() => {
    if (isOverlay) return;
    window.scrollTo(0, 0);
  }, [pathname, isOverlay]);

  return null;
};

export default ScrollToTop;
