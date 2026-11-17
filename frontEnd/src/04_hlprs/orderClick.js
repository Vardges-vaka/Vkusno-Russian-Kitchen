// One note to Google Analytics for every press on a button that starts an
// order: a delivery app, "Order online", WhatsApp or the phone number.
//
// Why the site sends its own note (17 Nov 2026). Google Analytics counts
// links that leave the site by itself, but it listens at the very top of the
// page. The order window and the contact cards stop a press before it gets
// there, so presses in those two places never reached Google - and the order
// window is how people order from the menu and from every dish page. A phone
// link is not counted by Google at all. And three kitchens share one Talabat
// address, so the address alone cannot say which kitchen was chosen.
//
// The note is named "order_click". It carries up to four plain labels, always
// in English so the numbers do not split by the page's language:
//   order_app     - Talabat, Careem, Deliveroo, Noon, Keeta, Order online,
//                   WhatsApp, Phone
//   order_kitchen - the kitchen, when the button belongs to one
//   order_place   - where on the site the button is (ORDER_PLACE below)
//   order_dish    - the dish, when the order window was opened from one
// Nothing about the visitor is added here.
//
// In Google Analytics the four labels show in reports only after each one is
// registered there as a custom dimension (Admin > Custom definitions), and
// only from that day on.
//
// gtag is the small function index.html defines before Google's own file is
// asked for. Calling it only adds a line to a list; Google's file reads the
// list when it arrives. So this is safe when that file is slow or blocked.

export const ORDER_CLICK_EVENT = "order_click";

export const ORDER_PLACE = Object.freeze({
  window: "Order window",
  map: "Order window map",
  kitchen: "Kitchen page",
  contact: "Contact page",
  delivery: "Delivery page",
  links: "Links page",
  home: "Home page",
  footer: "Footer",
});

// The ways to order that are not a delivery app.
export const ORDER_WAY = Object.freeze({
  online: "Order online",
  phone: "Phone",
  whatsApp: "WhatsApp",
});

// CONTACT_INFO names its rows "phone", "WhatsApp" and "email". Email is not a
// way to order: it gets no label, so no note is sent for it.
export const orderWayOf = (contactName) => {
  if (contactName === "phone") return ORDER_WAY.phone;
  if (contactName === "WhatsApp") return ORDER_WAY.whatsApp;
  return null;
};

// Google Analytics keeps at most 100 characters of a label.
const LABEL_LIMIT = 100;

const asLabel = (value) =>
  typeof value === "string" ? Array.from(value.trim()).slice(0, LABEL_LIMIT).join("") : "";

// Only labels that say something are sent. An empty one is left out, so
// Google shows "(not set)" for it instead of a blank name.
export const orderClickLabels = ({ app, kitchen, place, dish } = {}) => {
  const named = {
    order_app: app,
    order_kitchen: kitchen,
    order_place: place,
    order_dish: dish,
  };
  const labels = {};
  for (const [key, value] of Object.entries(named)) {
    const label = asLabel(value);
    if (label) labels[key] = label;
  }
  return labels;
};

// Called from a button's onClick. It never stops the press and never throws:
// counting must not get in the way of the button itself.
export const noteOrderClick = (details) => {
  try {
    if (typeof window === "undefined" || typeof window.gtag !== "function") return false;
    const labels = orderClickLabels(details);
    // A note that does not say which button was pressed says nothing.
    if (!labels.order_app) return false;
    window.gtag("event", ORDER_CLICK_EVENT, labels);
    return true;
  } catch {
    return false;
  }
};
