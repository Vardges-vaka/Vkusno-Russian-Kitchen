import React from "react";
import "./00_comps_styles/pageLoader.css";

// Shown by <Suspense> while a lazy route chunk downloads.
// Purely visual, so no props/state needed.
const PageLoader = () => {
  return (
    <div className="pageLoader" role="status" aria-label="Loading page">
      <div className="pageLoader__spinner" aria-hidden="true" />
      <p className="pageLoader__brand">VKUSNO</p>
    </div>
  );
};

export default PageLoader;
