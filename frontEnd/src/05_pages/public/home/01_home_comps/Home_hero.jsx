import PropTypes from "prop-types";
import { translateFn } from "../../../../04_hlprs/_hlprs.index.js";
import { motion } from "framer-motion";
import { heroBackground } from "../../../../01_assets/_assets.index.js";
import { DIRECT_ORDER } from "../../contact/04_contact_const/_contact_const.index.js";
import { useAttachingToSavedPage } from "../02_home_hooks/useAttachingToSavedPage.js";

const Home_hero = ({ t, onMenuClick, shouldReduceMotion }) => {
  // framer-motion animates from JS props, which the prefers-reduced-motion
  // media queries in the stylesheets cannot reach - so this staggered entrance
  // ran regardless of the OS setting. These collapse it to the final state.
  const enter = (offset) =>
    shouldReduceMotion ? false : { opacity: 0, y: offset };
  const settle = { opacity: 1, y: 0 };
  const timing = (delay) =>
    shouldReduceMotion ? { duration: 0 } : { duration: 0.8, delay };

  // The saved page is drawn with the text still hidden. framer-motion changes
  // those elements while React is attaching, so the first browser draw no
  // longer matches and React throws the saved page away. Plain elements with
  // the same hidden styles are used until attach finishes. The fade starts then.
  const isAttaching = useAttachingToSavedPage();
  const held = (offset) =>
    isAttaching
      ? { style: { opacity: 0, transform: `translateY(${offset}px)` } }
      : null;

  const Tagline = isAttaching ? "p" : motion.p;
  const Title = isAttaching ? "h1" : motion.h1;
  const Description = isAttaching ? "p" : motion.p;
  const Actions = isAttaching ? "div" : motion.div;

  return (
    <div className="Home_hero">
      <div className="Home_hero_wrapper">
        <div
          className="Home_hero_section"
          style={{ backgroundImage: `url(${heroBackground})` }}>
          <div className="Home_hero_overlay" aria-hidden="true" />

          <div className="Home_hero_content">
            <Tagline
              className="Home_hero_tagline"
              {...(held(20) ?? {
                initial: enter(20),
                animate: settle,
                transition: timing(0.2),
              })}>
              {t("hero.tagline")}
            </Tagline>

            <Title
              className="Home_hero_title"
              {...(held(30) ?? {
                initial: enter(30),
                animate: settle,
                transition: timing(0.5),
              })}>
              Vkusno
            </Title>

            <Description
              className="Home_hero_description"
              {...(held(20) ?? {
                initial: enter(20),
                animate: settle,
                transition: timing(0.8),
              })}>
              {t("hero.description")}
            </Description>

            <Actions
              className="Home_hero_ctaContainer"
              {...(held(20) ?? {
                initial: enter(20),
                animate: settle,
                transition: timing(1.1),
              })}>
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
            </Actions>
          </div>
        </div>
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
