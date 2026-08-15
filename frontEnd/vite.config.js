import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    // Baseline browsers that support the features this app already relies on:
    // CSS logical properties, aspect-ratio, and dynamic import. Raising this
    // from Vite's default avoids shipping transpilation nobody needs.
    target: "es2022",

    // Report real transfer size. Slightly slower builds, but "420 kB" without
    // a gzip figure is a misleading number to optimise against.
    reportCompressedSize: true,

    chunkSizeWarningLimit: 200,

    // Never base64-inline an asset into JS.
    //
    // Vite's 4 KB default silently embedded all 70 menu thumbnails - 268 KB of
    // the menu chunk, for images no component even renders. Inlined assets also
    // cannot be cached separately or lazily fetched, so for a photo-heavy site
    // the default trades a handful of requests for a permanently fatter bundle.
    assetsInlineLimit: 0,

    rollupOptions: {
      output: {
        // Split the vendor libraries out of the app bundle. They change only
        // when a dependency is upgraded, so a content hash on each means a
        // normal code change no longer invalidates ~250 kB of React and
        // friends in everyone's cache.
        //
        // Grouped by upgrade cadence rather than one chunk per package: a
        // hundred tiny chunks costs more in requests than it saves in cache
        // hits.
        manualChunks: (id) => {
          if (!id.includes("node_modules")) return undefined;

          if (id.includes("react-router")) return "vendor-router";
          if (/[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/.test(id)) {
            return "vendor-react";
          }
          if (id.includes("i18next")) return "vendor-i18n";
          if (id.includes("framer-motion") || id.includes("motion-dom")) {
            return "vendor-motion";
          }
          // Only the Menu and Contact routes mount this, and it is heavy.
          if (id.includes("@vis.gl") || id.includes("google-maps")) {
            return "vendor-maps";
          }
          if (id.includes("lucide-react")) return "vendor-icons";

          return "vendor";
        },
      },
    },
  },
});
