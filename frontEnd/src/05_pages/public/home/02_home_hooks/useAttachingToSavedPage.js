import { useSyncExternalStore } from "react";

// Nothing to subscribe to. The answer changes once, when React finishes
// attaching to a page that was saved at build time.
const subscribe = () => () => {};
const notAttaching = () => false;
const attaching = () => true;

// True while the page is saved, and again while React attaches to that saved
// page. False after. The home fade-in must not run during the attach, or the
// first browser draw differs from the saved page and React throws it away.
export const useAttachingToSavedPage = () =>
  useSyncExternalStore(subscribe, notAttaching, attaching);
