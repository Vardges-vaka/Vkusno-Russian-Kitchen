import { useEffect, useRef } from "react";

// Elements that can hold focus. `:not([disabled])` matters because a disabled
// carousel arrow is still in the DOM but must not be a tab stop.
const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

// Keeps keyboard focus inside an open dialog and gives it back when the dialog
// closes. Both modals already set role="dialog" aria-modal="true" and handled
// Escape, but neither moved focus in, trapped Tab, or restored it - so Tab
// walked straight out into the page behind the overlay.
//
// Returns a ref to put on the dialog element.
export const useFocusTrap = (isActive = true) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isActive) return undefined;
    const container = containerRef.current;
    if (!container) return undefined;

    // Remember who opened this so focus can go home on close. Captured once,
    // before we move focus anywhere.
    const previouslyFocused = document.activeElement;

    const getFocusable = () =>
      [...container.querySelectorAll(FOCUSABLE)].filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      );

    // Move focus in. Prefer the first real control; fall back to the dialog
    // itself (tabIndex -1) so the reader is at least inside the dialog.
    const initial = getFocusable()[0] ?? container;
    initial.focus({ preventScroll: true });

    const handleKeyDown = (event) => {
      if (event.key !== "Tab") return;

      const focusable = getFocusable();
      if (!focusable.length) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      // Wrap around at both ends rather than letting focus escape.
      if (event.shiftKey && (active === first || !container.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    container.addEventListener("keydown", handleKeyDown);

    return () => {
      container.removeEventListener("keydown", handleKeyDown);
      // Only restore if the trigger is still in the document - after a route
      // change (closing a dish overlay) it may well be gone.
      if (previouslyFocused instanceof HTMLElement && previouslyFocused.isConnected) {
        previouslyFocused.focus({ preventScroll: true });
      }
    };
  }, [isActive]);

  return containerRef;
};

export default useFocusTrap;
