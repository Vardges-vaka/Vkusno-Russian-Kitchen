import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Borscht } from "../../../../01_assets/_assets.index.js";
import { pickLocale } from "../../../../04_hlprs/_hlprs.index.js";
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

const BookShelfSection = ({
  specialtiesRef,
  isSpecialtiesInView,
  bookshelfRef,
  bookshelfItems,
  lang,
  t,
}) => {
  const navigate = useNavigate();

  const handleNavigate = (itemId) => {
    navigate("/menu", { state: { openItemId: itemId } });
  };

  const handleImageError = (event) => {
    event.target.src = Borscht;
    event.target.onerror = null;
  };

  return (
    <section ref={specialtiesRef} className="specialties-section">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 50 }}
        animate={{
          opacity: isSpecialtiesInView ? 1 : 0,
          y: isSpecialtiesInView ? 0 : 50,
        }}
        transition={{ duration: 0.8, delay: 0.2 }}>
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
              style={{ background: SPINE_GRADIENTS[spineColorIndex] }}
              data-title={name}
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: isSpecialtiesInView ? 1 : 0,
                y: isSpecialtiesInView ? 0 : 30,
              }}
              transition={{
                duration: 0.5,
                delay: 0.1 + (index % 20) * 0.01,
              }}>
              <div className="specialty-card-content">
                <div className="specialty-image">
                  <img
                    src={item.images?.full || Borscht}
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
                  onClick={() => handleNavigate(item.id)}>
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

export default BookShelfSection;
