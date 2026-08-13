import { motion } from "framer-motion";
import Borscht from "../../../../01_assets/_assets.index.js";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const BookShelfSection = ({ props }) => {
  const { t } = useTranslation("home");
  const {
    specialtiesRef,
    isSpecialtiesInView,
    scrollBookshelf,
    bookshelfRef,
    // simulatedMenuItems,
    allMenuItems,
    sampleMenuItems,
  } = props;
  const navigate = useNavigate();
  const handleNavigate = (itemId) => {
    console.log("💡▶︎©|၊၊| itemId: ", itemId);
    navigate(`/menu/${itemId}`);
  };
  // Generate more sample items if the existing ones aren't enough
  const generateSampleItems = () => {
    const sampleTitles = [
      "Beef Stroganoff",
      "Chicken Kiev",
      "Pelmeni",
      "Shashlik",
      "Borscht Supreme",
      "Mushroom Julienne",
      "Olivier Premium",
      "Blini with Caviar",
      "Golubtsy",
      "Ukha Fish Soup",
      "Pozharsky Cutlets",
      "Siberian Pelmeni",
      "Kholodets",
      "Solyanka Deluxe",
      "Pirozhki Assorted",
      "Medovik Cake",
      "Napoleon Dessert",
      "Syrniki Special",
      "Tula Gingerbread",
      "Kvass",
    ];

    const newTitle = sampleMenuItems.map((item) => item.name);
    const newDescription = sampleMenuItems.map(
      (item) => item.description.short,
    );
    const sampleDescriptions = [
      "A traditional Russian dish with tender meat and rich sauce.",
      "Delicate chicken with herb butter, perfectly breaded and fried.",
      "Handmade dumplings filled with seasoned meat and served with sour cream.",
      "Marinated meat skewers grilled to perfection over open flames.",
      "Rich beetroot soup with fresh vegetables and tender beef chunks.",
      "Mushrooms baked in creamy sauce with golden cheese crust.",
      "Classic Russian salad with finest ingredients and homemade dressing.",
    ];

    // Updated: Process real menu items to ensure unique keys
    const processedMenuItems = sampleMenuItems.map((item, index) => {
      if (item && item._id) {
        return {
          ...item,
          uniqueId: `${item._id}-copy-${index}`,
          // _id: `${item._id}-copy-${index}`, // Create a unique ID for duplicated items
        };
      }
      return item;
    });

    // Generate 80 items if we don't have enough
    const demoItems = [];
    const totalNeeded = 80 - processedMenuItems.length;

    if (totalNeeded > 0) {
      for (let i = 0; i < totalNeeded; i++) {
        demoItems.push({
          _id: `sample-${i}-${Date.now()}-${Math.random()
            .toString(36)
            .substr(2, 9)}`, // More unique IDs
          name:
            // EN:
            sampleTitles[i % sampleTitles.length] +
            " " +
            (Math.floor(i / sampleTitles.length) + 1),
          description: {
            short: sampleDescriptions[i % sampleDescriptions.length],
          },
          images: {
            main: `https://source.unsplash.com/featured/?russian,food,${i}`,
          },
          sellingPrice: Math.floor(Math.random() * 40) + 20,
        });
      }
    }

    return [...processedMenuItems, ...demoItems];
  };
  const simulatedMenuItems = generateSampleItems();
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
        <div className="section-divider"></div>
        <p className="section-subtitle">{t("bookShelf.description")}</p>
      </motion.div>

      {/* Add navigation buttons for bookshelf */}
      {/* <div
        className="bookshelf-nav prev"
        onClick={() => scrollBookshelf("prev")}>
        &#8249;
      </div>
      <div
        className="bookshelf-nav next"
        onClick={() => scrollBookshelf("next")}>
        &#8250;
      </div> */}

      {/* Removed drag event handlers from this div */}
      <div ref={bookshelfRef} className="specialty-cards">
        {/* ORIGINAL IMPLEMENTATION WITH ACTUAL BACKEND DATA (COMMENTED OUT)
        {allMenuItems.map((item, index) => (
          <motion.div
            key={item._id}
            className="specialty-card"
            data-title={item.name.EN}
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: isSpecialtiesInView ? 1 : 0,
              y: isSpecialtiesInView ? 0 : 30,
            }}
            transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}>
            <div className="specialty-card-content">
              <div className="specialty-image">
                <img src={item.images.main} alt={item.name.EN} />
              </div>
              <h3>{item.name.EN}</h3>
              <p>{item.description.short.EN}</p>
              <div className="specialty-price">{item.sellingPrice} AED</div>
              <button className="add-to-cart-btn">Add to Cart</button>
            </div>
          </motion.div>
        ))}*/}

        {/* SIMULATED BOOKSHELF WITH ~80 MENU ITEMS */}
        {simulatedMenuItems.map((item, index) => {
          const spineColorIndex = index % 15;

          // Handle image loading error
          const handleImageError = (e) => {
            e.target.src = Borscht; // Fallback to a local image
            e.target.onerror = null; // Prevent infinite loop
          };

          return (
            <motion.div
              key={item.uniqueId || `simulated-${index}-${Date.now()}`}
              className={`specialty-card book-spine-${spineColorIndex}`}
              style={{
                // Inline style backup for spine colors
                background: [
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
                ][spineColorIndex],
              }}
              data-title={item.name}
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
                    src={item.images?.main || Borscht}
                    alt={item.name}
                    onError={handleImageError}
                  />
                </div>
                <h3>{item.name}</h3>
                <p>
                  {item.description?.short ||
                    "A delicious traditional dish from our special menu collection."}
                </p>
                <div className="specialty-price">{item.sellingPrice} AED</div>
                <button
                  className="add-to-cart-btn"
                  onClick={() => handleNavigate(item._id)}>
                  {t("bookShelf.cta")}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Updated scroll hint */}
      {/* <div className="bookshelf-scroll-hint">
        <span>&#8249;</span> Use arrows to browse our full menu{" "}
        <span>&#8250;</span>
      </div> */}

      {/* <motion.div
        className="view-menu-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: isSpecialtiesInView ? 1 : 0,
          y: isSpecialtiesInView ? 0 : 20,
        }}
        transition={{ duration: 0.5, delay: 0.9 }}>
        <button className="view-menu-btn">View Full Menu</button>
      </motion.div> */}
    </section>
  );
};

export default BookShelfSection;
