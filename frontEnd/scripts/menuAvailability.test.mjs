import assert from "node:assert/strict";
import test from "node:test";
import { createSitemap } from "./generateSitemap.mjs";
import { MENU_MODULE, readMenuData, withMenuData } from "./readMenuData.mjs";

const MENU_ROOT = "/src/05_pages/public/menu";
const LANGUAGES = ["en", "ru", "ar"];
const ids = (items) => items.map(({ id }) => id).sort((a, b) => a - b);
const categoryItems = (categories) => categories.flatMap(({ menuItems }) => menuItems);

// Inject before the public list is derived, without changing the source files.
// Each Vite server has its own module graph, so lookup and search indexes are
// rebuilt exactly as they would be after changing a flag and reloading the app.
const availabilityFixture = (changes) => ({
  name: "menu-availability-fixture",
  enforce: "pre",
  transform(code, id) {
    if (!id.replaceAll("\\", "/").endsWith(MENU_MODULE)) return null;
    const anchor = "export const MenuItems =";
    assert.ok(code.includes(anchor), "fixture must run before the active list is derived");
    const updates = changes === "all-off"
      ? "for (const item of AllMenuItems) item.isActive = false;"
      : `for (const [id, value] of Object.entries(${JSON.stringify(changes)})) {
          const item = AllMenuItems.find((item) => item.id === Number(id));
          if (!item) throw new Error('Unknown fixture item ' + id);
          item.isActive = value;
        }`;
    return code.replace(anchor, `${updates}\n${anchor}`);
  },
});

const loadPublicMenu = async (server) => {
  const { Categories } = await server.ssrLoadModule(`${MENU_ROOT}/04_menu_const/CATEGORIES.js`);
  const lookup = await server.ssrLoadModule(`${MENU_ROOT}/03_menu_hlprs/findMenuItem.js`);
  const filters = await server.ssrLoadModule(`${MENU_ROOT}/03_menu_hlprs/filterMenu.js`);
  return { Categories, ...lookup, ...filters };
};

test("every known menu item declares its availability explicitly", async () => {
  await withMenuData(async ({ MenuItems, AllMenuItems, default: defaultItems }, server) => {
    assert.ok(AllMenuItems.length > 0);
    for (const item of AllMenuItems) {
      assert.equal(typeof item.isActive, "boolean", `item ${item.id} needs isActive`);
    }
    assert.equal(new Set(ids(AllMenuItems)).size, AllMenuItems.length, "catalog ids are unique");
    assert.equal(defaultItems, MenuItems);
    assert.deepEqual(ids(MenuItems), ids(AllMenuItems.filter((item) => item.isActive)));
    const { Categories, filterCategories } = await loadPublicMenu(server);
    assert.deepEqual(ids(categoryItems(Categories)), ids(MenuItems));
    assert.ok(Categories.every(({ menuItems }) => menuItems.length > 0));
    assert.deepEqual(ids(categoryItems(filterCategories({}))), ids(MenuItems));
  });
});

test("switching dishes off and back on updates listings, searches, links and sitemap", async (t) => {
  const original = await readMenuData();
  // Cover both a currently served item and a formerly commented-out item.
  for (const reference of [original.ScrambledEggs, original.BeefTongue]) {
    for (const isActive of [false, true]) {
      await t.test(`${reference.name.en}: isActive ${isActive}`, async () => {
        await withMenuData(async ({ AllMenuItems, MenuItems }, server) => {
          const item = AllMenuItems.find(({ id }) => id === reference.id);
          assert.equal(item.isActive, isActive);
          assert.deepEqual(item.images, reference.images, "photos are retained");
          assert.deepEqual(item.description, reference.description, "copy is retained");
          assert.equal(item.price, reference.price);
          assert.equal(MenuItems.some(({ id }) => id === item.id), isActive);

          const { Categories, findMenuItemById, findMenuItemBySlug, filterCategories } = await loadPublicMenu(server);
          assert.equal(categoryItems(Categories).some(({ id }) => id === item.id), isActive);
          assert.equal(Boolean(findMenuItemById(String(item.id))), isActive);
          const sitemap = createSitemap(MenuItems);
          for (const lang of LANGUAGES) {
            assert.equal(Boolean(findMenuItemBySlug(item.slug[lang])), isActive, `${lang} slug availability`);
            assert.equal(
              categoryItems(filterCategories({ query: item.name[lang] })).some(({ id }) => id === item.id),
              isActive,
              `${lang} search availability`,
            );
            assert.equal(sitemap.includes(`https://vkusno.ae/${lang}/menu/${item.slug[lang]}<`), isActive);
          }
        }, { plugins: [availabilityFixture({ [reference.id]: isActive })] });
      });
    }
  }
});

test("categories disappear when their last active dish is turned off", async () => {
  const bread = (await readMenuData()).UzbekFlatbread;
  await withMenuData(async ({ MenuItems }, server) => {
    const { Categories, filterCategories } = await loadPublicMenu(server);
    assert.equal(MenuItems.some(({ id }) => id === bread.id), false);
    assert.equal(Categories.some(({ id }) => id === 11), false);
    assert.equal(filterCategories({}).some(({ id }) => id === 11), false);
  }, { plugins: [availabilityFixture({ [bread.id]: false })] });
});

test("disabling the whole menu leaves static pages in the sitemap", async () => {
  await withMenuData(async ({ AllMenuItems, MenuItems }, server) => {
    const { Categories, filterCategories, findMenuItemById, findMenuItemBySlug } = await loadPublicMenu(server);
    assert.ok(AllMenuItems.length > 0, "catalog remains available for reactivation");
    assert.deepEqual(MenuItems, []);
    assert.deepEqual(Categories, []);
    assert.deepEqual(filterCategories({}), []);
    for (const item of AllMenuItems) {
      assert.equal(findMenuItemById(item.id), null);
      for (const lang of LANGUAGES) assert.equal(findMenuItemBySlug(item.slug[lang]), null);
    }
    const sitemap = createSitemap(MenuItems);
    assert.equal((sitemap.match(/<url>/g) ?? []).length, 15);
    assert.equal(sitemap.includes("/menu/"), false);
    for (const lang of LANGUAGES) {
      assert.ok(sitemap.includes(`<loc>https://vkusno.ae/${lang}/menu</loc>`));
    }
  }, { plugins: [availabilityFixture("all-off")] });
});
