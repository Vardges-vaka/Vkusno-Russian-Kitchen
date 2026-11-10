// Shows dist/ the way Vercel serves it, for looking at the saved pages locally.
// Run from frontEnd/ after npm run build:  npm run preview:saved
//
// npm run preview (vite preview) cannot do this. It answers /en/menu with the
// empty app shell and only finds en/menu/index.html at /en/menu/ with a slash.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DIST = fileURLToPath(new URL("../dist/", import.meta.url));
const PORT = Number(process.env.PORT) || 4180;

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
  ".webmanifest": "application/manifest+json",
};

const isFile = async (file) => {
  try {
    return (await stat(file)).isFile();
  } catch {
    return false;
  }
};

// Same three headers as vercel.json. They do not change the page.
const SECURITY_HEADERS = {
  "x-content-type-options": "nosniff",
  "referrer-policy": "strict-origin-when-cross-origin",
  "x-frame-options": "SAMEORIGIN",
};

// Vercel's order: an exact file, then a folder's index.html.
// An address with no file is not the shell. The caller answers 404.
const find = async (pathname) => {
  const target = path.join(DIST, pathname);
  if (!target.startsWith(DIST)) return null;
  if (await isFile(target)) return { file: target, served: "file" };

  const index = path.join(target, "index.html");
  if (await isFile(index)) {
    return { file: index, served: pathname === "/" ? "shell" : "saved-page" };
  }

  return null;
};

// A missing page (no file extension) gets 404.html. A missing file, such as
// a script, stays a plain 404 so the browser is not handed HTML as JavaScript.
const isPageAddress = (pathname) =>
  !pathname.startsWith("/assets/") &&
  !pathname.startsWith("/locales/") &&
  !pathname.includes(".");

createServer(async (request, response) => {
  const { pathname } = new URL(request.url, "http://localhost");
  let decoded = pathname;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    // Keep the raw path; it simply will not match a file.
  }

  const found = await find(decoded);
  if (!found) {
    const notFoundPage = path.join(DIST, "404.html");
    if (isPageAddress(decoded) && (await isFile(notFoundPage))) {
      response.writeHead(404, {
        ...SECURITY_HEADERS,
        "content-type": "text/html; charset=utf-8",
        "cache-control": "no-store",
        "x-served": "not-found",
      });
      response.end(await readFile(notFoundPage));
      return;
    }
    response.writeHead(404, {
      ...SECURITY_HEADERS,
      "content-type": "text/plain; charset=utf-8",
    });
    response.end("404 Not Found");
    return;
  }

  response.writeHead(200, {
    ...SECURITY_HEADERS,
    "content-type":
      TYPES[path.extname(found.file)] ?? "application/octet-stream",
    "cache-control": "no-store",
    "x-served": found.served,
  });
  response.end(await readFile(found.file));
}).listen(PORT, "localhost", () => {
  console.log(`saved pages: http://localhost:${PORT}/en   (Ctrl+C to stop)`);
});
