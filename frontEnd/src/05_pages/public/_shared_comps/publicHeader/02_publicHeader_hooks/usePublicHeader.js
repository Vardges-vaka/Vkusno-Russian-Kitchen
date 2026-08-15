import { useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { resolveLanguage } from "../../../../../00_config/_config.index.js";

export const usePublicHeader = () => {
  const { lang: langParam } = useParams();
  const { t, i18n } = useTranslation("common");
  const lang = resolveLanguage(langParam, i18n.language);
  const headerRef = useRef(null);

  // The header is sticky and its height changes (it wraps on mobile, and the
  // language switcher can grow). Pages that sit under it - the menu category
  // tabs, section scroll-margins - need that height as a CSS variable.
  //
  // Published here, by the element that owns the height, rather than measured
  // from useMenu with document.querySelector(".PublicHeader_container"): that
  // coupled the menu page to a CSS class name, so renaming the class broke the
  // sticky offset silently. ResizeObserver also beats a window resize listener,
  // since the header can change height without the window changing size.
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return undefined;

    const publishOffset = () => {
      document.documentElement.style.setProperty(
        "--menu_header_offset",
        `${header.offsetHeight}px`,
      );
    };

    publishOffset();

    const observer = new ResizeObserver(publishOffset);
    observer.observe(header);

    return () => observer.disconnect();
  }, []);

  return {
    headerRef,
    lang,
    t,
  };
};
