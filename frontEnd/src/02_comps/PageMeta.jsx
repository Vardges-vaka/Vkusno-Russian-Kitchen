import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import {
  SUPPORTED_LANGUAGES,
  DEFAULT_LANGUAGE,
  absoluteUrl,
  isSupportedLanguage,
  localePath,
} from "../00_config/_config.index.js";

const PageMeta = ({ title, description, jsonLd, noindex, alternates }) => {
  const { pathname } = useLocation();

  const [, first, ...rest] = pathname.split("/");
  const routePath = isSupportedLanguage(first)
    ? rest.join("/")
    : [first, ...rest].join("/");

  const canonical = absoluteUrl(
    localePath(
      isSupportedLanguage(first) ? first : DEFAULT_LANGUAGE,
      routePath,
    ),
  );

  const pathFor = (lang) => alternates?.[lang] ?? localePath(lang, routePath);

  const fullTitle = title
    ? `${title} - Vkusno`
    : "Vkusno - Russian Kitchen in Dubai";

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

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </>
  );
};

PageMeta.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  jsonLd: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  noindex: PropTypes.bool,
  alternates: PropTypes.objectOf(PropTypes.string),
};

export default PageMeta;
