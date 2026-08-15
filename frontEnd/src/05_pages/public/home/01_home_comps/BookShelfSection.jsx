import PropTypes from "prop-types";
import { localePath } from "../../../../00_config/_config.index.js";
import { menuItemSlug } from "../../menu/03_menu_hlprs/_menu_hlprs.index.js";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { dishPlaceholder } from "../../../../01_assets/_assets.index.js";
import {
  menuItemShape,
  langShape,
  translateFn,
  refShape,
  pickLocale,
} from "../../../../04_hlprs/_hlprs.index.js";
import "../00_home_styles/BookShelfSection.css";

const SPINE_GRADIENTS = [
  "linear-gradient(to right, #8e44ad, #9b59b6)",
  "linear-gradient(to right, #2c3e50, #34495e)",
  "linear-gradient(to right, #c0392b, #e74c3c)",
  "linear-gradient(to right, #27ae60, #2ecc71)",
  "linear-gradient(to right, #f39c12, #f1c40f)",
  "linear-gradient(to right, #1abc9c, #16a085)",
  "linear-gradient(to right, #3498db, #2980b9)",
  "linear-gradient(to right, #795548, #5d4037)",
  "linear-gradient(to right, #607d8b, #455a64)",
  "linear-gradient(to right, #9c27b0, #7b1fa2)",
  "linear-gradient(to right, #6d1b36, #872140)",
  "linear-gradient(to right, #34558b, #486ca5)",
  "linear-gradient(to right, #316a45, #3e864f)",
  "linear-gradient(to right, #b8860b, #cd9830)",
  "linear-gradient(to right, #8a2727, #a13131)",
];

// Spine titles run along a 300px-tall book, so a long dish name either spills
// off the shelf or gets cut with an ellipsis. Shrinking the type for the few
// long ones keeps every name readable in full - "Baked Russian Pie With Potato
// And Mushroom" is 41 characters against a 14-character "Scrambled Eggs".
// Ellipsis stays in the CSS as a backstop for anything longer still.
const spineFontSize = (name) => {
  const length = name.length;
  if (length <= 22) return "0.85rem";
  if (length <= 30) return "0.72rem";
  if (length <= 38) return "0.62rem";
  return "0.55rem";
};

const BookShelfSection = ({
  specialtiesRef,
  isSpecialtiesInView,
  bookshelfRef,
  bookshelfItems,
  lang,
  t,
  shouldReduceMotion,
}) => {
  const navigate = useNavigate();

  // framer-motion drives these from JS props, which the prefers-reduced-motion
  // media query in the stylesheets cannot reach - so this page's 80-card
  // stagger ran regardless of the OS setting. Both helpers collapse to the
  // final state when the reader has asked for less motion.
  const enter = (offset) => (shouldReduceMotion ? {} : { opacity: 0, y: offset });
  const settle = (visible, offset) =>
    shouldReduceMotion
      ? { opacity: 1, y: 0 }
      : { opacity: visible ? 1 : 0, y: visible ? 0 : offset };

  // Straight to the dish's own URL. No `background` state here: arriving from
  // the home page there is no menu grid to overlay, so the dish renders as a
  // full page - which is also what a shared link or a crawler gets.
  const handleNavigate = (item) => {
    navigate(localePath(lang, `menu/${menuItemSlug(item, lang)}`));
  };

  const handleImageError = (event) => {
    event.target.src = dishPlaceholder;
    event.target.onerror = null;
  };

  return (
    <section ref={specialtiesRef} className="specialties-section">
      <motion.div
        className="section-header"
        initial={enter(50)}
        animate={settle(isSpecialtiesInView, 50)}
        transition={
          shouldReduceMotion ? { duration: 0 } : { duration: 0.8, delay: 0.2 }
        }>
        <h2>{t("bookShelf.title")}</h2>
        <div className="section-divider" aria-hidden="true" />
        <p className="section-subtitle">{t("bookShelf.description")}</p>
      </motion.div>

      <div ref={bookshelfRef} className="specialty-cards">
        {bookshelfItems.map((item, index) => {
          const spineColorIndex = index % SPINE_GRADIENTS.length;
          const name = pickLocale(item.name, lang);
          const shortDescription = pickLocale(item.description?.short, lang);

          return (
            <motion.div
              key={item.uniqueId}
              className={`specialty-card book-spine-${spineColorIndex}`}
              style={{
                background: SPINE_GRADIENTS[spineColorIndex],
                "--spine_title_size": spineFontSize(name),
              }}
              data-title={name}
              initial={enter(30)}
              animate={settle(isSpecialtiesInView, 30)}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.5, delay: 0.1 + (index % 20) * 0.01 }
              }>
              <div className="specialty-card-content">
                <div className="specialty-image">
                  <img
                    src={item.images?.card || item.images?.full || dishPlaceholder}
                    alt={name}
                    loading="lazy"
                    onError={handleImageError}
                  />
                </div>
                <h3>{name}</h3>
                <p>
                  {shortDescription || t("bookShelf.fallbackDescription")}
                </p>
                <div className="specialty-price">
                  {item.price} {t("bookShelf.currency")}
                </div>
                <button
                  type="button"
                  className="add-to-cart-btn"
                  onClick={() => handleNavigate(item)}>
                  {t("bookShelf.cta")}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

BookShelfSection.propTypes = {
  specialtiesRef: refShape,
  isSpecialtiesInView: PropTypes.bool,
  bookshelfRef: refShape,
  bookshelfItems: PropTypes.arrayOf(menuItemShape).isRequired,
  lang: langShape.isRequired,
  t: translateFn.isRequired,
  shouldReduceMotion: PropTypes.bool,
};

export default BookShelfSection;
