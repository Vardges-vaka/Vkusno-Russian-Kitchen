import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import {
  SUPPORTED_LANGUAGES,
  DEFAULT_LANGUAGE,
  absoluteUrl,
  isSupportedLanguage,
  localePath,
} from "../00_config/_config.index.js";

// Per-route document head.
//
// React 19 hoists <title>, <meta> and <link> rendered anywhere in the tree
// into <head>, so this needs no helmet-style library - it is just a component
// that renders tags. Later pages override the site-wide defaults in
// index.html simply by rendering after them.
//
// Also emits hreflang alternates: the same page in all three languages plus
// x-default, which is what tells Google these are translations of one another
// rather than duplicate content.
const PageMeta = ({ title, description, jsonLd, noindex, alternates }) => {
  const { pathname } = useLocation();

  // Strip the /:lang prefix to get the route shared across languages, so the
  // alternates can be rebuilt per language.
  const [, first, ...rest] = pathname.split("/");
  const routePath = isSupportedLanguage(first) ? rest.join("/") : [first, ...rest].join("/");

  const canonical = absoluteUrl(
    localePath(isSupportedLanguage(first) ? first : DEFAULT_LANGUAGE, routePath),
  );

  // Most routes have a language-independent path ("menu", "contact"), so the
  // same tail works for every language. Dish pages do NOT: the slug is
  // translated, so /ru/menu/pelmeni is /en/menu/pelmeni-with-meat. Without the
  // override every alternate would point at a URL that merely redirects, and
  // hreflang must reference the canonical URL directly.
  const pathFor = (lang) => alternates?.[lang] ?? localePath(lang, routePath);

  const fullTitle = title ? `${title} — Vkusno` : "Vkusno — Russian Kitchen in Dubai";

  return (
    <>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={canonical} />

      {noindex && <meta name="robots" content="noindex, follow" />}

      {SUPPORTED_LANGUAGES.map((lang) => (
        <link
          key={lang}
          rel="alternate"
          hrefLang={lang}
          href={absoluteUrl(pathFor(lang))}
        />
      ))}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={absoluteUrl(pathFor(DEFAULT_LANGUAGE))}
      />

      {/* No og:* / twitter:* here on purpose - see the note in index.html.
          React 19 appends hoisted meta rather than replacing it, so these
          would duplicate the static site-level tags; and the scrapers that
          read Open Graph do not run JavaScript, so they would never see
          them anyway. */}

      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </>
  );
};

PageMeta.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  // Object or array of Schema.org nodes; serialised into one ld+json block.
  // Rendered in place rather than hoisted - React 19 only hoists title/meta/
  // link, not inline scripts - which is fine: Google reads JSON-LD from the
  // body as readily as from the head.
  jsonLd: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  noindex: PropTypes.bool,
  // { en, ru, ar } of absolute-from-root paths, for routes whose path differs
  // per language (dish slugs). Omit when the path is language-independent.
  alternates: PropTypes.objectOf(PropTypes.string),
};

export default PageMeta;
