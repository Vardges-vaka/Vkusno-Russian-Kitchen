import { useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Borscht } from "../../../../01_assets/_assets.index.js";
import { pickLocale } from "../../../../04_hlprs/_hlprs.index.js";
import "../00_home_styles/Home_featuredCarousel.css";

const Home_featuredCarousel = ({
  sectionRef,
  isInView,
  featuredItems,
  lang,
  t,
}) => {
  const navigate = useNavigate();
  const trackRef = useRef(null);

  const handleShowMore = (itemId) => {
    navigate("/menu", { state: { openItemId: itemId } });
  };

  const scrollByOneCard = (direction) => {
    const track = trackRef.current;
    if (!track) return;

    const card = track.querySelector(".homeFeaturedCarousel__card");
    const gap = 16;
    const step = card ? card.offsetWidth + gap : track.clientWidth * 0.85;

    track.scrollBy({
      left: direction === "next" ? step : -step,
      behavior: "smooth",
    });
  };

  const handleImageError = (event) => {
    event.target.src = Borscht;
    event.target.onerror = null;
  };

  return (
    <section ref={sectionRef} className="homeFeaturedCarousel">
      <motion.div
        className="homeFeaturedCarousel__header"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 40 }}
        transition={{ duration: 0.7, delay: 0.1 }}>
        <h2 className="homeFeaturedCarousel__title">{t("featured.title")}</h2>
        <div className="homeFeaturedCarousel__divider" aria-hidden="true" />
        <p className="homeFeaturedCarousel__subtitle">
          {t("featured.description")}
        </p>
      </motion.div>

      <div className="homeFeaturedCarousel__controls">
        <button
          type="button"
          className="homeFeaturedCarousel__navBtn homeFeaturedCarousel__navBtn--prev"
          aria-label={t("featured.prev")}
          onClick={() => scrollByOneCard("prev")}>
          ‹
        </button>
        <button
          type="button"
          className="homeFeaturedCarousel__navBtn homeFeaturedCarousel__navBtn--next"
          aria-label={t("featured.next")}
          onClick={() => scrollByOneCard("next")}>
          ›
        </button>
      </div>

      <div
        ref={trackRef}
        className="homeFeaturedCarousel__track"
        aria-label={t("featured.title")}>
        {featuredItems.map((item, index) => {
          const name = pickLocale(item.name, lang);
          const shortDescription = pickLocale(item.description?.short, lang);

          return (
            <motion.article
              key={item.id}
              className="homeFeaturedCarousel__card"
              initial={{ opacity: 0, y: 24 }}
              animate={{
                opacity: isInView ? 1 : 0,
                y: isInView ? 0 : 24,
              }}
              transition={{ duration: 0.45, delay: 0.08 + index * 0.05 }}>
              <div className="homeFeaturedCarousel__imageWrap">
                <img
                  className="homeFeaturedCarousel__image"
                  src={item.images?.full || Borscht}
                  alt={name}
                  loading="lazy"
                  onError={handleImageError}
                />
              </div>

              <div className="homeFeaturedCarousel__body">
                <h3 className="homeFeaturedCarousel__name">{name}</h3>
                <p className="homeFeaturedCarousel__description">
                  {shortDescription || t("bookShelf.fallbackDescription")}
                </p>

                <div className="homeFeaturedCarousel__footer">
                  <span className="homeFeaturedCarousel__price">
                    {item.price} {t("bookShelf.currency")}
                  </span>
                  <button
                    type="button"
                    className="homeFeaturedCarousel__cta"
                    onClick={() => handleShowMore(item.id)}>
                    {t("bookShelf.cta")}
                  </button>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      <p className="homeFeaturedCarousel__hint" aria-hidden="true">
        {t("featured.swipeHint")}
      </p>
    </section>
  );
};

export default Home_featuredCarousel;
