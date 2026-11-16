// Every dish page ends with a row of four other dishes ("More from the menu"):
// three from its own menu group and one from the next group.
// Before it, a dish page linked to no other dish.
import assert from "node:assert/strict";
import test from "node:test";
import {
  RELATED_COUNT,
  pickRelated,
} from "../src/05_pages/public/menu/03_menu_hlprs/pickRelated.js";
import { withMenuData } from "./readMenuData.mjs";

const dish = (id) => ({ id });
const [a, b, c, d, e, f, g, h] = [1, 2, 3, 4, 5, 6, 7, 8].map(dish);
const menu = [
  { id: 1, menuItems: [a, b, c, d, e, f] },
  { id: 2, menuItems: [g] },
  { id: 3, menuItems: [h] },
];
const ids = (items) => items.map(({ id }) => id);

test("a dish links to three dishes after it in its own group and one from the next group", () => {
  assert.equal(RELATED_COUNT, 4);
  assert.deepEqual(ids(pickRelated(menu, a)), [2, 3, 4, 7]);
  assert.deepEqual(ids(pickRelated(menu, c)), [4, 5, 6, 7]);
});

test("the last dish of a group goes round to the first", () => {
  assert.deepEqual(ids(pickRelated(menu, f)), [1, 2, 3, 7]);
});

test("dishes of one group do not all point at the same dish of the next group", () => {
  const two = [
    { id: 1, menuItems: [a, b, c, d, e] },
    { id: 2, menuItems: [f, g, h] },
  ];
  assert.deepEqual(ids(pickRelated(two, a)), [2, 3, 4, 6]);
  assert.deepEqual(ids(pickRelated(two, b)), [3, 4, 5, 7]);
  assert.deepEqual(ids(pickRelated(two, e)), [1, 2, 3, 7]);
  // a group of three: two of its own, then two from the next (the first) group
  assert.deepEqual(ids(pickRelated(two, f)), [7, 8, 1, 2]);
});

test("a one-dish group is topped up from the groups that follow", () => {
  assert.deepEqual(ids(pickRelated(menu, g)), [8, 1, 2, 3]);
  assert.deepEqual(ids(pickRelated(menu, h)), [1, 2, 3, 4]);
});

test("a tiny menu gives what it has, and an unknown dish gives nothing", () => {
  const tiny = [{ id: 1, menuItems: [a, b] }];
  assert.deepEqual(ids(pickRelated(tiny, a)), [2]);
  const oneGroup = [{ id: 1, menuItems: [a, b, c, d, e, f] }];
  assert.deepEqual(ids(pickRelated(oneGroup, a)), [2, 3, 4, 5]);
  assert.deepEqual(pickRelated(menu, dish(99)), []);
  assert.deepEqual(ids(pickRelated(menu, a, 2)), [2, 7]);
});

test("on the real menu every dish gets four others and is linked from another dish", async () => {
  await withMenuData(async (_menu, server) => {
    const { Categories } = await server.ssrLoadModule(
      "/src/05_pages/public/menu/04_menu_const/CATEGORIES.js",
    );
    const dishes = [...new Set(Categories.flatMap(({ menuItems }) => menuItems))];
    assert.ok(dishes.length > RELATED_COUNT);

    const linkedFrom = new Map(dishes.map((item) => [item, 0]));
    for (const item of dishes) {
      const related = pickRelated(Categories, item);
      const group = Categories.find(({ menuItems }) => menuItems.includes(item));
      assert.equal(related.length, RELATED_COUNT, item.slug.en);
      assert.equal(related.includes(item), false, `${item.slug.en} links to itself`);
      assert.equal(new Set(related).size, RELATED_COUNT, `${item.slug.en} repeats a dish`);
      if (group.menuItems.length > 1) {
        assert.ok(
          group.menuItems.includes(related[0]),
          `${item.slug.en} does not start with a dish of its own group`,
        );
      }
      for (const other of related) {
        assert.equal(other.isActive, true, `${item.slug.en} links to a hidden dish`);
        linkedFrom.set(other, linkedFrom.get(other) + 1);
      }
    }
    const unlinked = dishes.filter((item) => linkedFrom.get(item) === 0);
    assert.deepEqual(
      unlinked.map((item) => item.slug.en),
      [],
      "these dish pages have no link leading to them from another dish",
    );
  });
});
