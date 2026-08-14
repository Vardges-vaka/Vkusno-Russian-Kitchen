import { motion } from "framer-motion";
import { heroBackground } from "../../../../01_assets/_assets.index.js";

const Home_hero = ({ isLoaded, t, onMenuClick }) => {
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}>
              {t("hero.tagline")}
            </motion.p>

            <motion.h1
              className="Home_hero_title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.5 }}>
              Vkusno
            </motion.h1>

            <motion.p
              className="Home_hero_description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.8 }}>
              {t("hero.description")}
            </motion.p>

            <motion.div
              className="Home_hero_ctaContainer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 1.1 }}>
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

export default Home_hero;
