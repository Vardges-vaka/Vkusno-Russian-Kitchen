import { useEffect } from "react";

let activeLocks = 0;
let originalOverflow = "";

// Route overlays and action dialogs can overlap during navigation. Only the
// last dialog to leave should restore scrolling, regardless of cleanup order.
export const useBodyScrollLock = () => {
  useEffect(() => {
    if (activeLocks === 0) originalOverflow = document.body.style.overflow;
    activeLocks += 1;
    document.body.style.overflow = "hidden";

    return () => {
      activeLocks -= 1;
      if (activeLocks === 0) document.body.style.overflow = originalOverflow;
    };
  }, []);
};
