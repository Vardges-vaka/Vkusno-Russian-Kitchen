import assert from "node:assert/strict";
import test from "node:test";
import {
  assetPaths,
  buildPage,
  collectPageFiles,
  escapeHtml,
  pageFile,
  sitemapAddresses,
  splitHead,
} from "./prerenderHtml.mjs";

const TEMPLATE = [
  "<!doctype html>",
  '<html lang="en">',
  "  <head>",
  "    <title>Vkusno - Russian Kitchen in Dubai</title>",
  '    <meta property="og:title" content="Vkusno - Russian Kitchen in Dubai" />',
  "    <meta",
  '      property="og:description"',
  '      content="Site description." />',
  '    <meta property="og:url" content="https://vkusno.ae/" />',
  '    <meta property="og:locale" content="en_US" />',
  '    <meta property="og:locale:alternate" content="ru_RU" />',
  '    <meta property="og:locale:alternate" content="ar_AE" />',
  '    <link rel="stylesheet" crossorigin href="/assets/index-1.css">',
  "  </head>",
  "  <body>",
  '    <div id="root"></div>',
  "  </body>",
  "</html>",
].join("\n");

const RENDERED = [
  '<link rel="preload" as="image" href="/assets/flag.svg"/>',
  '<link rel="preload" as="image" imageSrcSet="/assets/a.webp 400w" fetchPriority="high"/>',
  "<title>Борщ - Vkusno</title>",
  '<meta name="description" content="Beef &amp; beet soup."/>',
  '<link rel="canonical" href="https://vkusno.ae/ru/menu/borshch"/>',
  '<link rel="alternate" hrefLang="en" href="https://vkusno.ae/en/menu/russian-borscht"/>',
  '<link rel="alternate" hrefLang="ru" href="https://vkusno.ae/ru/menu/borshch"/>',
  '<link rel="alternate" hrefLang="ar" href="https://vkusno.ae/ar/menu/borsh-rusi"/>',
  '<link rel="alternate" hrefLang="x-default" href="https://vkusno.ae/en/menu/russian-borscht"/>',
  '<!--$--><h1>Борщ</h1><script type="application/ld+json">{"priceRange":"$$"}</script><!--/$-->',
].join("");

const FILES = [
  "assets/MenuItem-1.js",
  "assets/index-1.css",
  "assets/MenuItem-1.css",
];

const page = (overrides = {}) => {
  const { tags, markup } = splitHead(RENDERED);
  return buildPage({
    template: TEMPLATE,
    lang: "ru",
    tags,
    markup,
    files: FILES,
    share: null,
    ...overrides,
  });
};

test("the head tags React writes first are split from the page", () => {
  const { tags, markup } = splitHead(RENDERED);
  assert.equal(tags.length, 9);
  assert.equal(tags[2], "<title>Борщ - Vkusno</title>");
  assert.ok(markup.startsWith("<!--$--><h1>"));
  assert.deepEqual(splitHead("<div>no head</div>"), {
    tags: [],
    markup: "<div>no head</div>",
  });
});

test("a saved page gets its own language, title, share text and files", () => {
  const html = page();
  assert.ok(html.includes('<html lang="ru" dir="ltr">'));
  assert.equal(html.split("<title>").length - 1, 1);
  assert.ok(html.includes("<title>Борщ - Vkusno</title>"));
  assert.ok(
    html.includes('<meta property="og:title" content="Борщ - Vkusno" />'),
  );
  assert.ok(
    html.includes(
      '<meta property="og:description" content="Beef &amp; beet soup." />',
    ),
  );
  assert.ok(
    html.includes(
      '<meta property="og:url" content="https://vkusno.ae/ru/menu/borshch" />',
    ),
  );
  assert.ok(html.includes('<meta property="og:locale" content="ru_RU" />'));
  assert.ok(
    html.includes('<meta property="og:locale:alternate" content="en_US" />'),
  );
  assert.ok(
    html.includes('<meta property="og:locale:alternate" content="ar_AE" />'),
  );
  assert.equal(
    html.includes(
      'content="ru_RU" />\n    <meta property="og:locale:alternate" content="ru_RU"',
    ),
    false,
  );
  assert.equal(html.split('rel="canonical"').length - 1, 1);
  assert.equal(html.split('rel="alternate"').length - 1, 4);
  assert.ok(html.includes('<div id="root"><!--$--><h1>Борщ</h1>'));
  // "$$" must survive: a plain string replacement would turn it into "$".
  assert.ok(html.includes('{"priceRange":"$$"}'));
});

test("only the files the shell does not already load are added, in order", () => {
  const html = page();
  assert.equal(html.split('href="/assets/index-1.css"').length - 1, 1);
  const script = html.indexOf(
    '<link rel="modulepreload" crossorigin href="/assets/MenuItem-1.js">',
  );
  const style = html.indexOf(
    '<link rel="stylesheet" crossorigin href="/assets/MenuItem-1.css">',
  );
  assert.ok(script > html.indexOf('href="/assets/index-1.css"'));
  assert.ok(style > script);
  assert.ok(style < html.indexOf("</head>"));
});

test("only the high-priority image preload is kept", () => {
  const html = page();
  assert.equal(html.includes('href="/assets/flag.svg"'), false);
  assert.ok(html.includes('fetchPriority="high"'));
});

test("Arabic pages are right-to-left and a dish can carry a share picture", () => {
  const html = page({
    lang: "ar",
    share: {
      url: "https://vkusno.ae/share/russian-borscht.jpg",
      alt: 'Soup "of the day"',
    },
  });
  assert.ok(html.includes('<html lang="ar" dir="rtl">'));
  assert.ok(html.includes('<meta property="og:locale" content="ar_AE" />'));
  assert.ok(
    html.includes(
      '<meta property="og:image" content="https://vkusno.ae/share/russian-borscht.jpg" />',
    ),
  );
  assert.ok(
    html.includes(
      '<meta property="og:image:alt" content="Soup &quot;of the day&quot;" />',
    ),
  );
  assert.ok(
    html.includes(
      '<meta name="twitter:image" content="https://vkusno.ae/share/russian-borscht.jpg" />',
    ),
  );
  assert.equal(page().includes("og:image"), false);
});

test("the build stops when the shell or the page is not what it expects", () => {
  assert.throws(
    () => page({ template: TEMPLATE.replace('<div id="root"></div>', "") }),
    /expected exactly one/,
  );
  assert.throws(
    () =>
      page({
        template: TEMPLATE.replace("</title>", "</title><title>x</title>"),
      }),
    /expected exactly one <title>/,
  );
  assert.throws(
    () => page({ tags: ["<title>x</title>"] }),
    /no meta description/,
  );
  const { tags } = splitHead(RENDERED);
  assert.throws(
    () => page({ tags: tags.filter((tag) => !tag.includes("x-default")) }),
    /3 language links/,
  );
});

test("page files follow the order Vite loads them in", () => {
  const manifest = {
    "src/Page.jsx": {
      file: "assets/Page.js",
      imports: ["_shared.js", "_vendor.js"],
      css: ["assets/Page.css"],
    },
    "_shared.js": {
      file: "assets/shared.js",
      imports: ["_vendor.js"],
      css: ["assets/shared.css"],
    },
    "_vendor.js": { file: "assets/vendor.js", css: ["assets/vendor.css"] },
  };
  assert.deepEqual(collectPageFiles(manifest, "src/Page.jsx"), [
    "assets/Page.js",
    "assets/shared.js",
    "assets/vendor.js",
    "assets/vendor.css",
    "assets/shared.css",
    "assets/Page.css",
  ]);
  assert.throws(
    () => collectPageFiles(manifest, "src/Missing.jsx"),
    /no entry for src\/Missing\.jsx/,
  );
});

test("small helpers", () => {
  assert.equal(pageFile("/en"), "en/index.html");
  assert.equal(pageFile("/ru/menu/borshch"), "ru/menu/borshch/index.html");
  assert.throws(() => pageFile("/"), /bare address/);
  assert.equal(
    escapeHtml('Tom & "Jerry" <\'s>'),
    "Tom &amp; &quot;Jerry&quot; &lt;&#x27;s&gt;",
  );
  assert.deepEqual(
    sitemapAddresses(
      "<url><loc>https://vkusno.ae/en</loc><image:loc>https://vkusno.ae/assets/a.webp</image:loc></url>",
    ),
    ["https://vkusno.ae/en"],
  );
  assert.deepEqual(
    assetPaths(
      '<img src="/assets/Russian%20Borscht(1200x900px)-CFAKDk6b.webp" srcSet="/assets/a.webp 400w, /assets/b.webp 800w"/>' +
        '<div style="background-image:url(/assets/hero-1.webp)"></div><script>{"image":"https://vkusno.ae/assets/a.webp"}</script>' +
        '<link href="/assets/_config.index-1.js">',
    ),
    [
      "/assets/Russian Borscht(1200x900px)-CFAKDk6b.webp",
      "/assets/a.webp",
      "/assets/b.webp",
      "/assets/hero-1.webp",
      "/assets/_config.index-1.js",
    ],
  );
});
