import PropTypes from "prop-types";

// Shared prop shapes for the data structures that travel through more than one
// component. Defined once here so Menu_itemCard, Menu_itemModal, the carousel
// and the bookshelf can't drift apart in how they describe the same dish.
//
// Deliberately loose on optional fields: menuItems.js is generated from a
// spreadsheet, so a missing description or image should render a fallback
// rather than fail a prop check.

// Menu data stores every user-facing string as { en, ar, ru } and reads it
// through pickLocale(). Not `isRequired` per key - pickLocale falls back to en.
export const localizedStringShape = PropTypes.shape({
  en: PropTypes.string,
  ar: PropTypes.string,
  ru: PropTypes.string,
});

export const menuItemShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: localizedStringShape.isRequired,
  description: PropTypes.shape({
    short: localizedStringShape,
    long: localizedStringShape,
  }),
  price: PropTypes.number,
  // No `thumbnail` any more - the 100x100 files exist on disk but are not
  // imported; see the note in menuItemExports.js.
  images: PropTypes.shape({
    card: PropTypes.string,
    card2x: PropTypes.string,
    full: PropTypes.string,
  }),
  nutrition: PropTypes.shape({
    calories: PropTypes.number,
    protein: PropTypes.number,
    fat: PropTypes.number,
    carbs: PropTypes.number,
  }),
  ingredients: PropTypes.arrayOf(PropTypes.string),
});

export const categoryShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: localizedStringShape.isRequired,
  menuItems: PropTypes.arrayOf(menuItemShape).isRequired,
});

export const aggregatorShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
});

export const branchShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: localizedStringShape.isRequired,
  location: PropTypes.shape({
    address: localizedStringShape.isRequired,
    googleMapsLink: PropTypes.string.isRequired,
    coordinates: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  timing: PropTypes.shape({
    is24Hours: PropTypes.bool.isRequired,
    openTime: PropTypes.string,
    closeTime: PropTypes.string,
  }).isRequired,
  aggregators: PropTypes.arrayOf(aggregatorShape).isRequired,
});

// CONTACT_INFO entries carry a lucide-react icon component alongside the data.
export const contactInfoShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
});

export const socialShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
});

// Every page component threads a `t` down to its children rather than each one
// calling useTranslation, so this appears in most propTypes blocks below.
export const translateFn = PropTypes.func;

// "en" | "ru" | "ar" - already normalised from i18n.language by the page hook.
export const langShape = PropTypes.oneOf(["en", "ru", "ar"]);

// Page hooks create refs and hand them to child components (the carousel
// track, the bookshelf, the in-view sentinel). Covers both object and
// callback refs.
export const refShape = PropTypes.oneOfType([
  PropTypes.func,
  PropTypes.shape({ current: PropTypes.any }),
]);
