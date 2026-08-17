import PropTypes from "prop-types";
import { localePath } from "../../../../00_config/_config.index.js";
import { menuItemSlug } from "../../menu/03_menu_hlprs/_menu_hlprs.index.js";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { dishPlaceholder } from "../../../../01_assets/_assets.index.js";
import {
  menuItemShape,
  langShape,
  translateFn,
  refShape,
  pickLocale,
} from "../../../../04_hlprs/_hlprs.index.js";
import "../00_home_styles/Home_featuredCarousel.css";

const Home_featuredCarousel = ({
  sectionRef,
  isInView,
  featuredItems,
  lang,
  t,
  shouldReduceMotion,
}) => {
  const navigate = useNavigate();
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // See Home_hero: framer-motion props are invisible to the CSS
  // prefers-reduced-motion queries, so the gate lives here.
  const enter = (offset) =>
    shouldReduceMotion ? false : { opacity: 0, y: offset };
  const settle = (visible, offset) =>
    shouldReduceMotion
      ? { opacity: 1, y: 0 }
      : { opacity: visible ? 1 : 0, y: visible ? 0 : offset };

  // Full dish page - see the note in BookShelfSection.
  const handleShowMore = useCallback(
    (item) => {
      navigate(localePath(lang, `menu/${menuItemSlug(item, lang)}`));
    },
    [navigate, lang],
  );

  const updateActiveIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const cards = track.querySelectorAll(".homeFeaturedCarousel__card");
    if (!cards.length) return;

    const trackCenter = track.scrollLeft + track.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(trackCenter - cardCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    updateActiveIndex();
    track.addEventListener("scroll", updateActiveIndex, { passive: true });
    window.addEventListener("resize", updateActiveIndex);

    return () => {
      track.removeEventListener("scroll", updateActiveIndex);
      window.removeEventListener("resize", updateActiveIndex);
    };
  }, [featuredItems.length, updateActiveIndex]);

  const scrollToIndex = (index) => {
    const track = trackRef.current;
    if (!track) return;

    const card = track.querySelectorAll(".homeFeaturedCarousel__card")[index];
    if (!card) return;

    const targetLeft =
      card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2;

    track.scrollTo({ left: targetLeft, behavior: "smooth" });
  };

  const scrollByStep = (direction) => {
    const nextIndex =
      direction === "next"
        ? Math.min(activeIndex + 1, featuredItems.length - 1)
        : Math.max(activeIndex - 1, 0);
    scrollToIndex(nextIndex);
  };

  const handleImageError = (event) => {
    event.target.src = dishPlaceholder;
    event.target.onerror = null;
  };

  return (
    <section ref={sectionRef} className="homeFeaturedCarousel">
      <div className="homeFeaturedCarousel__glow" aria-hidden="true" />

      <motion.div
        className="homeFeaturedCarousel__header"
        initial={enter(40)}
        animate={settle(isInView, 40)}
        transition={
          shouldReduceMotion ? { duration: 0 } : { duration: 0.7, delay: 0.1 }
        }>
        <div className="homeFeaturedCarousel__headerTop">
          <div>
            <p className="homeFeaturedCarousel__eyebrow">
              {t("featured.eyebrow")}
            </p>
            <h2 className="homeFeaturedCarousel__title">
              {t("featured.title")}
            </h2>
          </div>

          <div className="homeFeaturedCarousel__controls">
            <button
              type="button"
              className="homeFeaturedCarousel__navBtn"
              aria-label={t("featured.prev")}
              disabled={activeIndex === 0}
              onClick={() => scrollByStep("prev")}>
              <ChevronLeft size={22} strokeWidth={2.2} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="homeFeaturedCarousel__navBtn"
              aria-label={t("featured.next")}
              disabled={activeIndex === featuredItems.length - 1}
              onClick={() => scrollByStep("next")}>
              <ChevronRight size={22} strokeWidth={2.2} aria-hidden="true" />
            </button>
          </div>
        </div>

        <p className="homeFeaturedCarousel__subtitle">
          {t("featured.description")}
        </p>
      </motion.div>

      <div className="homeFeaturedCarousel__stage">
        <div
          ref={trackRef}
          className="homeFeaturedCarousel__track"
          aria-label={t("featured.title")}>
          {featuredItems.map((item, index) => {
            const name = pickLocale(item.name, lang);
            const shortDescription = pickLocale(item.description?.short, lang);
            const categoryLabel = pickLocale(item.categories?.[0], lang);
            const isActive = index === activeIndex;

            return (
              <motion.article
                key={item.id}
                className={`homeFeaturedCarousel__card${isActive ? " homeFeaturedCarousel__card--active" : ""}`}
                initial={enter(28)}
                animate={settle(isInView, 28)}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { duration: 0.45, delay: 0.06 + index * 0.04 }
                }
                onClick={() => isActive && handleShowMore(item)}
                onKeyDown={(event) => {
                  if (
                    isActive &&
                    (event.key === "Enter" || event.key === " ")
                  ) {
                    event.preventDefault();
                    handleShowMore(item);
                  }
                }}
                tabIndex={isActive ? 0 : -1}
                role="group"
                aria-roledescription="slide"
                aria-label={name}
                aria-current={isActive ? "true" : undefined}>
                <div className="homeFeaturedCarousel__imageWrap">
                  <img
                    className="homeFeaturedCarousel__image"
                    src={
                      item.images?.card || item.images?.full || dishPlaceholder
                    }
                    alt=""
                    loading="lazy"
                    onError={handleImageError}
                  />
                  <div
                    className="homeFeaturedCarousel__imageOverlay"
                    aria-hidden="true"
                  />

                  {categoryLabel && (
                    <span className="homeFeaturedCarousel__category">
                      {categoryLabel}
                    </span>
                  )}

                  <span className="homeFeaturedCarousel__priceBadge">
                    {item.price}{" "}
                    <span className="homeFeaturedCarousel__currency">
                      {t("bookShelf.currency")}
                    </span>
                  </span>
                </div>

                <div className="homeFeaturedCarousel__body">
                  <h3 className="homeFeaturedCarousel__name">{name}</h3>
                  <p className="homeFeaturedCarousel__description">
                    {shortDescription || t("bookShelf.fallbackDescription")}
                  </p>

                  <button
                    type="button"
                    className="homeFeaturedCarousel__cta"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleShowMore(item);
                    }}>
                    {t("bookShelf.cta")}
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      <div
        className="homeFeaturedCarousel__dots"
        role="group"
        aria-label={t("featured.title")}>
        {featuredItems.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className={`homeFeaturedCarousel__dot${index === activeIndex ? " homeFeaturedCarousel__dot--active" : ""}`}
            aria-label={`${pickLocale(item.name, lang)} (${index + 1}/${featuredItems.length})`}
            aria-current={index === activeIndex ? "true" : undefined}
            onClick={() => scrollToIndex(index)}
          />
        ))}
      </div>

      <button
        type="button"
        className="homeFeaturedCarousel__viewAll"
        onClick={() => navigate(localePath(lang, "menu"))}>
        {t("featured.viewAll")}
      </button>
    </section>
  );
};

Home_featuredCarousel.propTypes = {
  sectionRef: refShape,
  isInView: PropTypes.bool,
  featuredItems: PropTypes.arrayOf(menuItemShape).isRequired,
  lang: langShape.isRequired,
  t: translateFn.isRequired,
  shouldReduceMotion: PropTypes.bool,
};

export default Home_featuredCarousel;
