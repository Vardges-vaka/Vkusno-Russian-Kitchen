// The note each order button sends to Google Analytics when it is pressed
// (src/04_hlprs/orderClick.js): which app, which kitchen, where on the site
// and, from the order window, which dish.
//
// Before it (17 Nov 2026) Google's own link counting was the only count. It
// missed every press in the order window and on the contact cards, counted no
// phone press, and could not tell three kitchens apart on Talabat.
import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import {
  ORDER_CLICK_EVENT,
  ORDER_PLACE,
  ORDER_WAY,
  noteOrderClick,
  orderClickLabels,
  orderWayOf,
} from "../src/04_hlprs/orderClick.js";
import { withMenuData } from "./readMenuData.mjs";

const SRC = fileURLToPath(new URL("../src/", import.meta.url));
const BRANCHES_MODULE = "/src/05_pages/public/contact/04_contact_const/BRANCHES.js";
const CONTACT_MODULE = "/src/05_pages/public/contact/04_contact_const/CONTACT_INFO.js";

// Runs one press with a stand-in for the browser's window, and returns what
// was handed to Google's list.
const press = (details, gtag) => {
  const sent = [];
  const before = globalThis.window;
  globalThis.window = { gtag: gtag ?? ((...args) => sent.push(args)) };
  try {
    return { result: noteOrderClick(details), sent };
  } finally {
    if (before === undefined) delete globalThis.window;
    else globalThis.window = before;
  }
};

test("a press sends one note named order_click with four plain labels", () => {
  const { result, sent } = press({
    app: "Talabat",
    kitchen: "Arjan",
    place: ORDER_PLACE.window,
    dish: "Russian Borscht",
  });
  assert.equal(result, true);
  assert.deepEqual(sent, [
    [
      "event",
      "order_click",
      {
        order_app: "Talabat",
        order_kitchen: "Arjan",
        order_place: "Order window",
        order_dish: "Russian Borscht",
      },
    ],
  ]);
  assert.equal(ORDER_CLICK_EVENT, "order_click");
});

test("a label with nothing to say is left out, not sent empty", () => {
  assert.deepEqual(orderClickLabels({ app: ORDER_WAY.online, place: ORDER_PLACE.home }), {
    order_app: "Order online",
    order_place: "Home page",
  });
  assert.deepEqual(
    orderClickLabels({ app: " Noon ", kitchen: "", place: undefined, dish: null }),
    { order_app: "Noon" },
  );
  assert.deepEqual(orderClickLabels(), {});
});

test("a label is cut at the 100 characters Google Analytics keeps", () => {
  const long = "д".repeat(150);
  const labels = orderClickLabels({ app: "Keeta", dish: long });
  assert.equal(Array.from(labels.order_dish).length, 100);
  // A cut never lands inside one character.
  const faces = orderClickLabels({ app: "Keeta", dish: "😀".repeat(150) });
  assert.equal(faces.order_dish, "😀".repeat(100));
});

test("phone and WhatsApp are ways to order, email is not", () => {
  assert.equal(orderWayOf("phone"), "Phone");
  assert.equal(orderWayOf("WhatsApp"), "WhatsApp");
  assert.equal(orderWayOf("email"), null);
  assert.equal(orderWayOf("constructor"), null);
  assert.equal(orderWayOf(undefined), null);

  const { result, sent } = press({ app: orderWayOf("email"), place: ORDER_PLACE.footer });
  assert.equal(result, false);
  assert.deepEqual(sent, [], "a press on the email row sent a note");
});

test("counting never gets in the way of the button", () => {
  // No browser at all (the pages are also built on a server).
  assert.equal(globalThis.window, undefined);
  assert.equal(noteOrderClick({ app: "Talabat" }), false);

  // Google's small function is missing.
  globalThis.window = {};
  try {
    assert.equal(noteOrderClick({ app: "Talabat" }), false);
  } finally {
    delete globalThis.window;
  }

  // It breaks.
  const broken = press({ app: "Talabat" }, () => {
    throw new Error("blocked");
  });
  assert.equal(broken.result, false);

  // Nothing useful was handed in.
  assert.equal(press(undefined).result, false);
  assert.equal(press({ kitchen: "Arjan" }).result, false);
});

test("the place names are plain, different, and short enough", () => {
  const places = Object.values(ORDER_PLACE);
  assert.equal(new Set(places).size, places.length);
  for (const label of [...places, ...Object.values(ORDER_WAY)]) {
    assert.match(label, /^[A-Za-z][A-Za-z ]{2,39}$/, label);
  }
});

// The links that start an order, as the pages write them: a delivery app, the
// "Order online" address, and a row of CONTACT_INFO (phone, WhatsApp, email).
const ORDER_LINK = /href=\{(?:aggregator\.link|DIRECT_ORDER\.link|item\.link|action\.link)\}/g;
const NOTE = /noteOrderClick\(/g;

const jsxFiles = async (dir) => {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) found.push(...(await jsxFiles(full)));
    else if (entry.name.endsWith(".jsx")) found.push(full);
  }
  return found;
};

test("every order button on the site sends the note", async () => {
  const wired = {};
  for (const file of await jsxFiles(SRC)) {
    const text = await readFile(file, "utf8");
    const links = (text.match(ORDER_LINK) ?? []).length;
    const notes = (text.match(NOTE) ?? []).length;
    const name = path.basename(file);
    if (links || notes) wired[name] = notes;
    assert.equal(notes, links, `${name}: ${links} order links but ${notes} notes`);
  }
  // A new page with order buttons has to be added here on purpose.
  assert.deepEqual(wired, {
    "Contact_branchCard.jsx": 1,
    "Contact_infoPanel.jsx": 1,
    "Delivery.jsx": 1,
    "DeliveryKitchen.jsx": 1,
    "Home_hero.jsx": 1,
    "Kitchen_orders.jsx": 1,
    "Links.jsx": 2,
    "Menu_orderMap.jsx": 1,
    "Menu_orderModal.jsx": 3,
    "PublicFooter_contact.jsx": 1,
  });
});

test("every kitchen, app and dish has a plain English name for its label", async () => {
  const { branches, contactInfo, dishes } = await withMenuData(async (menu, server) => ({
    branches: (await server.ssrLoadModule(BRANCHES_MODULE)).BRANCHES,
    contactInfo: (await server.ssrLoadModule(CONTACT_MODULE)).CONTACT_INFO,
    dishes: menu.MenuItems,
  }));

  const kitchens = branches.map((branch) => branch.name.en);
  assert.equal(kitchens.length, 5);
  assert.equal(new Set(kitchens).size, 5, "two kitchens would share one label");
  for (const [index, branch] of branches.entries()) {
    assert.deepEqual(
      orderClickLabels({ app: "x", kitchen: kitchens[index] }).order_kitchen,
      kitchens[index],
      `${branch.id}: the kitchen name does not fit a label as it is`,
    );
    const apps = branch.aggregators.map((aggregator) => aggregator.name);
    assert.equal(new Set(apps).size, apps.length, `${branch.id}: an app is listed twice`);
    for (const app of apps) assert.match(app, /^[A-Z][A-Za-z]{2,20}$/, `${branch.id}: ${app}`);
  }

  // The rows the phone and WhatsApp buttons are made from still carry the
  // names orderWayOf() knows.
  assert.deepEqual(
    contactInfo.map((item) => orderWayOf(item.name)),
    ["Phone", "WhatsApp", null],
  );

  assert.ok(dishes.length > 0);
  for (const dish of dishes) {
    assert.ok(dish.name?.en?.trim(), `dish ${dish.id} has no English name`);
    assert.ok(Array.from(dish.name.en).length <= 100, `dish ${dish.id}: name is over 100 characters`);
  }
});
