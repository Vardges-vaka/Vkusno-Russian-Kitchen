# Vkusno - frontend

Marketing and menu site for Vkusno, a Russian kitchen with five branches in
Dubai. Trilingual (English / Russian / Arabic, with RTL), light and dark
themes, and no backend: the menu is static data and ordering hands off to
delivery partners.

React 19 · Vite 8 · react-router · i18next · framer-motion · Google Maps
(`@vis.gl/react-google-maps`)

---

## Getting started

```bash
npm install
npm run dev
```

Create `.env` in this folder before the maps will render:

```
VITE_GOOGLE_MAPS_API_KEY=...
VITE_GOOGLE_MAPS_MAP_ID=...
VITE_IS_DEBUG=true
```

| Variable | Purpose |
| --- | --- |
| `VITE_GOOGLE_MAPS_API_KEY` | Branch maps on Contact and in the order modal. Without it those render a text fallback rather than breaking. |
| `VITE_GOOGLE_MAPS_MAP_ID` | Cloud-styled map id used by the Advanced Markers. |
| `VITE_IS_DEBUG` | `true` / `1` / `yes` enables context debug logging. **Compared as a string** - Vite inlines env vars as strings, so `=== true` would never match. |

`.env` is gitignored. The Maps key is bundled into the client (any `VITE_`
variable is), so it must be restricted by HTTP referrer in Google Cloud -
that restriction is the only thing protecting it.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Vite dev server |
| `npm run build` | Runs `prebuild` (translation check + sitemap), then builds |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint - expected to be clean |
| `npm run check:i18n` | Translation integrity check (see below) |
| `npm run sitemap` | Regenerate `public/sitemap.xml` |
| `node scripts/convertMenuImagesToWebp.mjs` | Regenerate WebP from source JPEGs |

`prebuild` runs automatically before `build`, so a drifted locale or a stale
sitemap cannot ship.

---

## Folder convention

The `src/` tree is numbered by layer. The numbers are the point: they sort in
dependency order, so anything may import from a **lower** number, and nothing
should import upward.

```
src/
  00_config/     app-wide constants: languages, localePath, SITE_URL, IS_DEBUG
  01_assets/     images, flags, logos + the barrels that export them
  02_comps/      shared components (Logo, LanguageSelect, PageMeta, ErrorBoundary)
  03_context/    providers: theme, language, client (breakpoints), map
  04_hlprs/      helpers: pickLocale, propShapes, useFocusTrap, jsonLd
  05_pages/      pages, grouped public/ and admin/
  06_routes/     route table, LanguageLayout, ScrollToTop
  07_styles/     ColorVariables.css (raw values) + App.css (semantic mapping)
```

Each **feature** repeats the same numbered shape:

```
05_pages/public/menu/
  00_menu_styles/    one CSS file per component
  01_menu_comps/     components, named Menu_thing.jsx
  02_menu_hooks/     useMenu.js - all state and handlers for the page
  03_menu_hlprs/     feature-specific logic (search, filter, item lookup)
  04_menu_const/     data (CATEGORIES, menuItems, INGREDIENTS)
  Menu.jsx           the page: composition only
```

Conventions worth knowing before editing:

- **`_x.index.js` barrels** re-export a folder. Import from the barrel, not the file.
- **Pages compose, hooks decide.** `Menu.jsx` has no state; `useMenu` returns
  `{ t, lang, …, handlers }` and the page wires it to components.
- **Components take `t` and `lang` as props** rather than calling
  `useTranslation` individually, so a page renders in one language consistently.
- **Comments explain *why*, not *what*.** If a line looks odd, there is usually
  a comment saying which bug it prevents. Please keep that up.

---

## Internationalisation

Three languages: `en`, `ru`, `ar`. Arabic is RTL.

**Translations live in `public/locales/{lng}/{namespace}.json`** - not in
`src/`. This matters: `src/` is build *input* and does not exist at runtime, so
a loader path pointing there works in dev and 404s in production.

Namespaces: `common`, `Home`, `Menu`, `MenuItems`, `Contact`, `FAQ`,
`Privacy`, `NotFound`.

### Language is in the URL

Every route is `/{lang}/…` - `/en/menu`, `/ru/menu/pelmeni`,
`/ar/menu/pelmeni-bil-lahm`. The URL is the source of truth; `localStorage` is
only a fallback for `/`.

Language precedence is identical in three places, and they must stay in sync:

1. the inline script in `index.html` (before first paint)
2. `LanguageContext`'s initialiser
3. `LanguageLayout`

Order: **URL → localStorage → navigator → English.** The inline script exists
so a shared `/ar/…` link paints RTL immediately instead of rendering LTR and
jumping.

### Adding a key

1. Add it to `public/locales/en/<ns>.json`, then `ru` and `ar`.
2. `npm run check:i18n`.

Build internal links with `localePath(lang, "menu")` - never a bare
`"/menu"`, or the link silently drops the language.

### Adding a language

1. Add the code to `SUPPORTED_LANGUAGES` in `00_config/_config.index.js` and to
   `supportedLngs` in `src/i18n/i18n.Config.js`.
2. Create `public/locales/<code>/` with all eight namespaces.
3. Add an endonym to `LANGUAGE_ENDONYMS` in `02_comps/LanguageSelect.jsx` -
   written in its own language, since that control is for people who cannot
   read the current one.
4. Add a `slug` and `name` entry per dish in `menuItems.js`.
5. If it is RTL, add it to `RTL_LANGUAGES`.

### The translation check

`npm run check:i18n` fails the build on: key drift between languages, orphan
keys, empty values, UTF-8 BOMs, interpolation mismatches, and any dish whose
long description merely repeats its short one. Every rule corresponds to a bug
that actually shipped here once.

Two deliberate exceptions:

- **Plural variants may omit a variable, never invent one.** Arabic
  `results_one` ("طبق واحد") and the dual `results_two` ("طبقان") encode the
  count in the wording, so demanding `{{count}}` would force unidiomatic copy.
- **`MenuItems` skips key-parity** - it is keyed by numeric dish id, not by
  translation key, and is validated separately against `menuItems.js`.

---

## Menu data

`04_menu_const/menuItems.js` is generated from the client's spreadsheet and
holds one exported object per dish.

```js
export const PelmeniWithMeat = {
  id: 36,
  slug: { en: "pelmeni-with-meat", ru: "pelmeni", ar: "pelmeni-bil-lahm" },
  name: { en: …, ar: …, ru: … },
  categories: [{ en: …, ar: …, ru: … }],
  description: { short: { en: …, ar: …, ru: … } },
  price: 45,
  images: { full: pelmeniWithMeatFull },
  nutrition: { calories, protein, fat, carbs },
  ingredients: ["Ground beef", "Onion, finely chopped", …],
};
```

Things that are not obvious:

- **Long descriptions are NOT here.** They live in
  `public/locales/{lng}/MenuItems.json` keyed by dish id - ~95 KB across three
  languages, rendered only in the dish detail, so bundling them made every page
  pay for copy it never showed.
- **Ingredients are English keys**, translated at render time through
  `04_menu_const/INGREDIENTS.js`. That file also strips the spreadsheet's
  `(Est.)` provenance notes, which were reaching customers as `Salt (Est.)`.
- **Slugs are per language** and Arabic ones are Latin transliterations, not
  Arabic script - these links get pasted into WhatsApp, where percent-encoded
  Arabic renders as garbage.
- **Thumbnails are on disk but not imported.** Nothing renders them, and at
  ~3.8 KB each they sat under Vite's inline limit and were base64-embedded into
  the menu chunk - 268 KB of it. `assetsInlineLimit: 0` now prevents a repeat.

### Taking a dish off the menu

Comment out its block in `menuItems.js` **and** its entries in `CATEGORIES.js`
(both the import and the category's `menuItems` array) - that is how the drinks
are disabled. Then delete its id from the three `MenuItems.json` files, or
`check:i18n` will flag the orphan. `npm run sitemap` picks up the change; the
generator ignores commented-out blocks so a removed dish is not advertised.

### Images

Source JPEGs live beside their WebP output; only WebP is imported.
`node scripts/convertMenuImagesToWebp.mjs` regenerates everything and caps the
hero at 1920px.

> **Known issue:** menu cards render the 1200×900 image because the only other
> size is a 100×100 thumbnail. That is ~9.5 MB of photos on the menu page. The
> fix is a ~400×300 tier plus `srcset`; the converter is the place to add it.

---

## Routing

`App.jsx` → `LanguageLayout` (validates `:lang`, renders header/footer once) →
the routes in `06_routes/userRoutes.jsx`.

Dish pages use React Router's **background-location** pattern. Clicking a card
pushes `/{lang}/menu/{slug}` with `state.background`, and `App` renders the
dish as an overlay above the still-mounted grid. A direct hit, a refresh or a
crawler has no `background`, so the same URL renders a full standalone page.
Both share `Menu_itemDetail`, so they cannot drift.

A slug from another language resolves and redirects to the current language's
slug, which keeps one canonical URL per dish.

---

## Styling and theming

`ColorVariables.css` holds raw values (`--L_*` light, `--D_*` dark) and the
typeface stacks. `App.css` maps them to semantic names (`--bg_color`,
`--font_body`) under `[data-theme]`. **Components only ever use the semantic
names.**

Fonts are self-hosted via `@fontsource` - Playfair Display (display) and Golos
Text (body) for Latin/Cyrillic, IBM Plex Sans Arabic for everything under
`lang="ar"`. Per-subset `unicode-range` files mean an Arabic visitor downloads
no Latin font at all.

**Use logical properties** (`inset-inline-start`, `padding-inline`) for anything
directional, so Arabic mirrors automatically. Physical `left`/`right` remain
only where they are genuinely non-directional - centring pairs, full-bleed
backgrounds, the button shimmer.

---

## Deployment

Vercel. `vercel.json` holds the SPA rewrite and cache headers: `/assets/*` is
immutable (content-hashed), `/locales/*` must revalidate - otherwise a
translation fix sits behind a stale cache.

Staging is `live.vkusno.ae`, production `vkusno.ae`. Canonical URLs are
hardcoded to production in `00_config`, so staging pages point their canonical
at the real site - which is what stops staging competing in search. **Staging
must also carry `X-Robots-Tag: noindex`.**

404s are soft: client routing means the server answers 200 for any path, so the
NotFound page carries `noindex, follow`.

---

## Known gaps

- Menu images ship at 1200×900 (above).
- No dietary or allergen tags. Allergens are derivable from `ingredients`;
  **halal status and vegetarian are not** and need kitchen confirmation.
- No analytics. Note that the privacy policy currently states none are used -
  that copy must change first, in all three languages.
- Open Graph tags are static and site-level. Scrapers such as WhatsApp do not
  run JavaScript, so per-route previews would need prerendering.
- `src/` still contains zero-byte placeholder files and commented-out admin
  routes from an earlier plan.
