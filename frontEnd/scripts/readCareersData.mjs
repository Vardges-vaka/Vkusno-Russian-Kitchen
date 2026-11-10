import { fileURLToPath } from "node:url";
import { createServer } from "vite";

export const CAREERS_MODULE =
  "/src/05_pages/public/careers/04_careers_const/JOBS.js";

// Same reason as readMenuData: JOBS.js is plain, but the pages that join it
// to branch addresses import app config, and that reads import.meta.env.
// A separate cache dir so this check cannot invalidate a running dev server
// or the menu-data check.
export async function withCareersData(visit, { plugins = [] } = {}) {
  const server = await createServer({
    root: fileURLToPath(new URL("../", import.meta.url)),
    configFile: false,
    cacheDir: fileURLToPath(new URL("../node_modules/.vite-careers-data", import.meta.url)),
    plugins,
    logLevel: "error",
    optimizeDeps: { noDiscovery: true, include: [] },
    server: { middlewareMode: true, watch: null },
    appType: "custom",
  });
  try {
    return await visit(await server.ssrLoadModule(CAREERS_MODULE), server);
  } finally {
    await server.close();
  }
}

export const readCareersData = () => withCareersData((data) => data);
