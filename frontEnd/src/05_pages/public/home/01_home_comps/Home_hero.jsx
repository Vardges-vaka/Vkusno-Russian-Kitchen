import PropTypes from "prop-types";
import { translateFn } from "../../../../04_hlprs/_hlprs.index.js";
import { motion } from "framer-motion";
import { heroBackground } from "../../../../01_assets/_assets.index.js";
import { DIRECT_ORDER } from "../../contact/04_contact_const/_contact_const.index.js";

const Home_hero = ({ t, onMenuClick, shouldReduceMotion }) => {
  // framer-motion animates from JS props, which the prefers-reduced-motion
  // media queries in the stylesheets cannot reach - so this staggered entrance
  // ran regardless of the OS setting. These collapse it to the final state.
  const enter = (offset) => (shouldReduceMotion ? false : { opacity: 0, y: offset });
  const settle = { opacity: 1, y: 0 };
  const timing = (delay) =>
    shouldReduceMotion ? { duration: 0 } : { duration: 0.8, delay };

  return (
    <div className="Home_hero">
      <div className="Home_hero_wrapper">
        <motion.div
          className="Home_hero_section"
          style={{ backgroundImage: `url(${heroBackground})` }}>
          <div className="Home_hero_overlay" aria-hidden="true" />

          <div className="Home_hero_content">
            <motion.p
              className="Home_hero_tagline"
              initial={enter(20)}
              animate={settle}
              transition={timing(0.2)}>
              {t("hero.tagline")}
            </motion.p>

            <motion.h1
              className="Home_hero_title"
              initial={enter(30)}
              animate={settle}
              transition={timing(0.5)}>
              Vkusno
            </motion.h1>

            <motion.p
              className="Home_hero_description"
              initial={enter(20)}
              animate={settle}
              transition={timing(0.8)}>
              {t("hero.description")}
            </motion.p>

            <motion.div
              className="Home_hero_ctaContainer"
              initial={enter(20)}
              animate={settle}
              transition={timing(1.1)}>
              {/* Primary action: straight to the RestHero storefront.
                  Same destination as "Order directly > Online" in the menu
                  order modal, so both entry points stay in sync via DIRECT_ORDER. */}
              <a
                className="Home_hero_cta Home_hero_cta--order"
                href={DIRECT_ORDER.link}
                target="_blank"
                rel="noreferrer"
                aria-label={t("hero.orderNowAria")}>
                {t("hero.orderNow")}
              </a>

              <button
                type="button"
                className="Home_hero_cta"
                onClick={onMenuClick}>
                {t("hero.cta")}
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

Home_hero.propTypes = {
  t: translateFn.isRequired,
  onMenuClick: PropTypes.func.isRequired,
  shouldReduceMotion: PropTypes.bool,
};

export default Home_hero;
