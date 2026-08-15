import { useTranslation } from "react-i18next";
import "./00_comps_styles/pageLoader.css";

// Shown by <Suspense> while a lazy route chunk downloads.
//
// useSuspense: false is load-bearing, not a style choice. This component IS the
// fallback for the same Suspense boundary that react-i18next suspends on while
// it fetches a namespace. With the default (useSuspense: true) the fallback
// would suspend on its own translation lookup and take the boundary down with
// it. Reading the key before it resolves is fine here - it's a spinner label.
const PageLoader = () => {
  const { t } = useTranslation("common", { useSuspense: false });

  return (
    <div className="pageLoader" role="status" aria-label={t("a11y.loadingPage")}>
      <div className="pageLoader__spinner" aria-hidden="true" />
      <p className="pageLoader__brand">VKUSNO</p>
    </div>
  );
};

export default PageLoader;
