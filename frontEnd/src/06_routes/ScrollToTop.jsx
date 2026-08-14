import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// React Router keeps scroll position by default - reset on every path change.
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
