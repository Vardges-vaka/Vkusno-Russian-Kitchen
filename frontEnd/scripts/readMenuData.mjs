import { fileURLToPath } from "node:url";
import { createServer } from "vite";

export const FRONTEND_ROOT = fileURLToPath(new URL("../", import.meta.url));
export const MENU_MODULE = "/src/05_pages/public/menu/04_menu_const/menuItems.js";

// Vite resolves the app's image imports and evaluates the actual menu exports,
// keeping build checks and the sitemap aligned with the menu customers see.
// Tests can supply a transform plugin to toggle flags entirely in memory.
export async function withMenuData(visit, { plugins = [] } = {}) {
  const server = await createServer({
    root: FRONTEND_ROOT,
    configFile: false,
    // Build checks must not invalidate an already-running dev server's cache.
    cacheDir: fileURLToPath(new URL("../node_modules/.vite-menu-data", import.meta.url)),
    plugins,
    logLevel: "error",
    optimizeDeps: { noDiscovery: true, include: [] },
    server: { middlewareMode: true, watch: null },
    appType: "custom",
  });
  try {
    return await visit(await server.ssrLoadModule(MENU_MODULE), server);
  } finally {
    await server.close();
  }
}

export const readMenuData = () => withMenuData((data) => data);
