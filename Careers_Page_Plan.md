# Careers Page Implementation Plan

> **For agentic workers:** Implement this plan stage by stage, in order. Use the checkboxes to track progress, and after
> each stage add a short **Completed — date:** note under that stage's heading (the convention used in
> `.plans/2026-09-09-menu-pdf-download.md`). **Git and GitHub are off limits:** the owner reviews the work and pushes it
> themselves. See "Hard rules" before you touch anything.

**Goal:** Add a careers section to vkusno.ae in English, Russian and Arabic. It has a list of open jobs and one page per
job, and it is built from the owner's job file (`MW\WORKFLOWS\HR\Positions.xlsx`), so the website and the job ads
(LinkedIn, Indeed, Bayt) always say the same thing.

**Architecture:** A Python sync script in the HR workflow reads `Positions.xlsx` and writes one generated data module
into the site, the same way `WORKFLOWS\Costs\.workflows\scripts\sync_site_allergens.py` writes allergens into
`menuItems.js`. A new public `careers` feature (numbered folders, barrels, a page hook) renders a list page and a job
page from that module. Interface copy lives in a new `Careers` locale namespace. Candidates apply by email (a `mailto:`
link plus the address shown as text). There is no form, no upload and no backend, and the site stores nothing about
anyone. The build checks the data, the sitemap lists the open jobs, and each job page carries schema.org `JobPosting`
data.

**Tech stack:** The existing React 19, Vite 8, react-router 7, i18next, PropTypes, lucide-react and plain component
CSS, plus Python 3 with openpyxl (already used by the workflows). **No new npm dependency, no backend, no analytics.**

**Spec:** The owner's request of 9 November 2026 ("a careers page for Vkusno's website that follows the same codebase
principles, structure, stylings, themes and conventions; nothing pushed or created with git or GitHub"), the inspected
repository, and the HR workflow built the same day (`MW\WORKFLOWS\HR\`).

**Status:** Built 10 Nov 2026. Nothing committed, pushed or deployed. See the handoff at the end.

**Repository:** `C:\Users\vardg\OneDrive\Desktop\Vkusno\Monthly Workflows\WEB_APPS\Vkusno`. Paths in this plan are
relative to that folder, except paths starting with `MW\`, which means
`C:\Users\vardg\OneDrive\Desktop\Vkusno\Monthly Workflows`. (The older plans in `.plans/` name
`Desktop\Codding\Vkusno`; that path is out of date.)

---

## Hard rules (read first)

1. **No git, no GitHub.** Do not run `git init/add/commit/branch/checkout/switch/stash/reset/restore/merge/rebase/tag/push/pull/fetch`,
   do not open pull requests, do not touch remotes, hooks or `.gitignore`. Read-only `git status` and `git diff` for
   your own review are allowed. The owner commits and pushes.
2. **No deployment.** No Vercel CLI and no changes to `frontEnd/vercel.json` (no stage needs one). `npm run preview` on
   `127.0.0.1` is the furthest the work goes.
3. **Privacy.**
   - Only the public fields listed in "Data contract" may reach the website. The `Notes (private)` column, pay,
     people's names, staff files and anything from `MW\WORKFLOWS\HR\Staff\` or `MW\New Staff\` must never be read by
     the sync script, never written to the site, and never quoted in this plan's notes.
   - The site must not collect applications: no form, no file upload, no API, no storage, no third-party form service.
   - No analytics, pixels or click tracking. The Privacy page says none are used.
4. **`Positions.xlsx` belongs to the owner.**
   - Before Stage 1 changes its structure, copy it to `MW\WORKFLOWS\HR\.backups\Positions (before careers columns, <date>).xlsx`.
   - Only **add** the columns and sheets that Stage 1 lists. Never change, move or delete the owner's existing cells.
   - Never set `Open now?`. Opening a job is the owner's decision.
   - If the file is open in Excel (a `~$Positions.xlsx` lock file exists), stop and ask.
5. **The generated data file is never edited by hand:**
   `frontEnd/src/05_pages/public/careers/04_careers_const/JOBS.js`. Change `Positions.xlsx` and run the sync again.
6. **Follow the house conventions** in "Conventions this feature must follow". When in doubt, copy what the Contact,
   FAQ and Menu features already do.
7. **Keep this file where the owner put it** (`Careers_Page_Plan.md` at the repository root). It is not covered by
   `.gitignore`, so it shows as untracked. Leave that to the owner. Put verification scripts, screenshots and temporary
   files under `.context/careers-page/`, which is already ignored.
8. **Never send anything.** Do not send test emails or WhatsApp messages. Check `mailto:` and `wa.me` links by reading
   their `href`.

---

## Owner decisions (use the defaults unless the owner says otherwise)

| # | Decision | Recommended default |
| --- | --- | --- |
| D1 | Which jobs appear on vkusno.ae | Rows with `Open now?` = Yes **and** `Brand on ad` = Vkusno (blank counts as Vkusno). Kompot or Blin-i jobs never show on vkusno.ae. |
| D2 | Languages | A job is published only when its English, Russian and Arabic texts are complete. The AI drafts Russian and Arabic in `Positions.xlsx`; the owner checks them before opening the job. |
| D3 | How to apply | **Email only:** careers@vkusno.ae, as a "mailto" button plus the address shown as text. WhatsApp only if the owner gives a number for CVs; the WhatsApp keys and button are then added (Stage 3 says where). |
| D4 | Where the link to the page goes | **Footer only** ("Careers", before FAQ). The header nav stays Menu and Contact. |
| D5 | Email subject line | Always the **English** job title + " – Vkusno" (e.g. `Head Chef – Vkusno`), whatever the page language. This matches the job ads and lets the CV workflow sort emails by job. The message body is in the visitor's language. |
| D6 | Privacy Policy | A new "Job applications" section in all three languages. It says how long CVs are kept (draft: **12 months**). **The page must not be deployed before the owner approves this text.** |
| D7 | No open jobs | The page stays live with a friendly "no open positions" state and a general-application email. |
| D8 | "How many?" | Not shown on the page. Used only as `totalJobOpenings` in the structured data when filled. |
| D9 | Pay | Never shown (same as the job ads). The structured data has no `baseSalary`. Google lists that field as recommended, not required. |

Record any decision the owner changes in this table, with the date.

---

## What the visitor gets

1. **`/{lang}/careers`**, the list page:
   - A hero with the title, a gold underline and a one-line intro, matching the Contact and FAQ heroes.
   - **Open positions:** a grid of job cards (title, Full-time / Part-time pill, location pill, a 3-line summary, a "View
     job" link). The whole card is clickable through one real link.
   - **No open jobs:** a short panel saying so, with the general-application email (D7).
   - **What we offer** and **About Vkusno:** one panel, with the text taken from `Positions.xlsx` (Common sheet).
   - **Don't see your job?:** a general-application panel (careers@vkusno.ae, subject `General application – Vkusno`).
2. **`/{lang}/careers/{jobId}`**, the job page (e.g. `/ru/careers/head-chef`):
   - A breadcrumb (Careers / job title) in the Menu dish page style.
   - The job title as `h1`, the pills, and a "How to apply" jump link (on narrow screens).
   - Sections: About the role, What you will do, What you need, Nice to have (only if filled), What we offer, About
     Vkusno, and Working hours / Probation (only when the owner shows them in ads).
   - An **apply panel**: the "Apply by email" button (opens the visitor's mail app with the subject and a short message
     filled in), the email address and subject shown as text for people without a mail app, and one privacy line linking
     to the Privacy Policy. On wide screens it sits in a sticky side column; on narrow screens it comes after the
     sections.
   - An unknown or closed job id redirects to `/{lang}/careers`, like an unknown dish redirects to the menu.
3. **Same id in every language.** `/en/careers/head-chef`, `/ru/careers/head-chef` and `/ar/careers/head-chef` are the
   same job. The header language switcher already keeps the rest of the path, so no slug translation or redirect is
   needed (unlike dishes).
4. **The footer gets a "Careers" link** in all three languages (D4).

---

## What is already in place (inspected 9 November 2026)

| Existing file | What this feature takes from it |
| --- | --- |
| `frontEnd/README.md` | **The rulebook:** numbered layers (import only downward), `_x.index.js` barrels, `Feature_sub.jsx` naming, "pages compose, hooks decide", `t`/`lang` passed as props, comments explain *why*, `localePath` for every link, semantic CSS variables only, logical properties, `public/locales/{lng}/{ns}.json`, `npm run check:i18n`. |
| `frontEnd/src/06_routes/userRoutes.jsx` | Lazy routes relative to `/:lang`, with `"*"` last. Add `careers` and `careers/:jobId` before it. |
| `frontEnd/src/06_routes/LanguageLayout.jsx`, `02_comps/LanguageSelect.jsx` | Header and footer render once. The language switch keeps the rest of the path (`careers/head-chef`). |
| `frontEnd/src/00_config/_config.index.js` | `SUPPORTED_LANGUAGES`, `resolveLanguage`, `localePath`, `absoluteUrl`, `SITE_URL`. **Do not** add careers to `MAP_ROUTE_SEGMENTS`: no map on these pages, so the Maps SDK must not load. |
| `frontEnd/src/02_comps/PageMeta.jsx` | Title (adds " - Vkusno"), description, canonical, hreflang alternates and JSON-LD. The default alternates already work because the id is the same in every language. |
| `frontEnd/src/04_hlprs/jsonLd.js` | All schema.org builders live here (`graph`, `organisationNode`, `breadcrumbNode`, `restaurantNode`…). Add `jobPostingNode` here. |
| `frontEnd/src/04_hlprs/pickLocale.js`, `propShapes.js` | `{ en, ru, ar }` data read through `pickLocale`. Shared PropTypes shapes (`localizedStringShape`, `langShape`, `translateFn`). |
| `frontEnd/src/05_pages/public/menu/MenuItem.jsx` + `00_menu_styles/MenuItem.css` | The standalone detail page pattern: `<Navigate replace>` for an unknown id, breadcrumb markup and styles, `alternates`, and `breadcrumbNode`. |
| `frontEnd/src/05_pages/public/contact/` | Page and hook shape (`useContact` returns `{ t, lang, …, handlers }`). Hero styles, the panel (`Contact_connect_panel`), the card grid (1 → 2 → 3 columns) and the card (`Contact_branchCard`: hover lift, gold border, pill). `BRANCHES` (ids `arjan`, `marina`, `bbSolAvenue`, `bbCuisinette`, `dso`) for job locations. |
| `frontEnd/src/05_pages/public/legal/FAQ.jsx`, `Privacy.jsx` | Content-page heroes. Privacy's `sections[]` locale shape, which Stage 4 extends. A cross-feature read of `../contact/04_contact_const/_contact_const.index.js` is the precedent for importing `BRANCHES`. |
| `frontEnd/src/05_pages/public/_shared_comps/publicFooter/04_publicFooter_const/FOOTER_LINKS.js` | The single place for footer links (D4). |
| `_shared_comps/menuDownload/00_menuDownload_styles/MenuDownload.css`, `notFound/notFound.css` | Button patterns: the secondary outline button (`MenuDownload_button`) and the primary filled button (`notFound_action--primary`). Both have a 44px minimum height and a 2px accent focus ring. |
| `frontEnd/src/07_styles/App.css`, `ColorVariables.css` | Semantic theme names (`--bg_color`, `--surface_color`, `--text_color`, `--text_muted_color`, `--border_color`, `--shadow_color`, `--accent_color`, `--accent_hover_color`, `--accent_soft_color`, `--gold_color`, `--footer_text_color`). The **page gutter list** (add the new containers there). Fonts are inherited (`h1`–`h6` get the display face automatically). |
| `frontEnd/scripts/generateSitemap.mjs`, `readMenuData.mjs`, `checkTranslations.mjs`, `menuAvailability.test.mjs` | The sitemap is built from route and data lists. Data is loaded through Vite SSR (`createServer` + `ssrLoadModule`), because modules that import `00_config` read `import.meta.env`, which plain Node does not have. Build-time data checks live in `checkTranslations.mjs`. Tests use `node:test` and Vite transform plugins as fixtures. **`menuAvailability.test.mjs` asserts the sitemap has 15 `<url>` entries when the menu is empty**: one more static route makes that 18. |
| `frontEnd/public/locales/{en,ru,ar}/*.json` | 8 namespaces today. Files are UTF-8 **without BOM** and use LF line endings. Russian and Arabic keep the brand in Latin letters ("О Vkusno", "عن Vkusno"). |
| `MW\WORKFLOWS\Costs\.workflows\scripts\sync_site_allergens.py` | The model for the sync script: `--dry-run`, reads Excel read-only, writes JS into the site, checks the result with `node --check`, restores the old file if it fails, never pushes. |
| `MW\WORKFLOWS\HR\Positions.xlsx` | The owner's job file (see "Data contract"). Today it has 9 roles (Head Chef, Sous Chef, Chef de Partie, Demi Chef de Partie, Commis Chef, Kitchen Helper – Orders & Dispatch, Kitchen Steward, Packer, Driver). **All are `Open now?` = No** and all have `Brand on ad` = Vkusno, so the first live build shows the empty state (D7). |
| `MW\WORKFLOWS\HR\.agent\scripts\make_ads.py` | Builds the Word and text ads from the same file. Its `lines()` helper splits a cell into points. Reuse it so ads and site split points identically. It reads the Common sheet's first three columns only, so new columns to the right do not affect it. |

---

## Data contract

### `Positions.xlsx`: what the sync reads (columns are found by header name, never by position)

**Sheet `Positions`** (header in row 1). Row order = order on the website.

| Column | Becomes | Rule |
| --- | --- | --- |
| `Job ID` **(new)** | `id`, and the URL `/careers/{id}` | Lowercase Latin letters, digits and single hyphens (`^[a-z0-9]+(-[a-z0-9]+)*$`). Unique. Never changed or reused once a job has been published. |
| `Position` | `title.en` | Required. |
| `Job type` | `employmentType` | `Full-time` → `FULL_TIME`, `Part-time` → `PART_TIME`. Anything else stops the sync. |
| `Open now?` | Filter | Only `Yes` is published (D1). |
| `Brand on ad` | Filter | Blank or `Vkusno` → vkusno.ae. Any other brand is skipped (D1). |
| `Kitchens` | `kitchens` (branch ids) | `Any of our 5 kitchens` or blank → `null` (all branches). Otherwise a comma list of `Arjan`, `BB Cuisinette`, `BB SOL`, `Marina`, `DSO` → `arjan`, `bbCuisinette`, `bbSolAvenue`, `marina`, `dso`. An unknown name stops the sync. |
| `How many?` | `openings` | Optional positive whole number, else `null` (D8). |
| `Short summary` | `summary.en` | Required. |
| `Duties` | `duties.en[]` | One point per line (`make_ads.lines()`). Required, at least 1. |
| `Must have` | `mustHave.en[]` | Required, at least 1. |
| `Nice to have` | `niceToHave.en[]` | Optional (may be `[]`). |
| `Open since` **(new)** | `datePosted` (`YYYY-MM-DD`) | A real date. Required for open jobs. Not in the future. |

**Never read and never exported:** `#`, `Team`, `Level`, `Reports to`, `Brands`, `Notes (private)`,
`Last updated`, and any column the owner adds later. The script builds its output
from this whitelist only. It never loops over all the columns.

**New sheets `Russian` and `Arabic`**, one each, same layout:

| Job ID | Position | Short summary | Duties | Must have | Nice to have |
| --- | --- | --- | --- | --- | --- |

One row per `Job ID`. Lists must have **the same number of lines** as the English cell (empty English = empty here).

**Sheet `Common`**: add two columns to the right of the existing three: `Text (RU)`, `Text (AR)`. The sync uses only
these items, and only when `Show in ads?` = Yes:

| Item | Becomes |
| --- | --- |
| `About Vkusno` | `CAREERS_COMMON.about` (required) |
| `What we offer` | `CAREERS_COMMON.offer[]` (one point per line, required) |
| `Location` | `CAREERS_COMMON.location` (required) |
| `How to apply` | `CAREERS_COMMON.applyEmail`: only the first email address found in the English text (required) |
| `Working hours` | `CAREERS_COMMON.hours` (only if shown, else `null`) |
| `Probation` | `CAREERS_COMMON.probation` (only if shown, else `null`) |

`About us - all brands`, `About Blin-i` and `About Kompot` are never used on vkusno.ae. If D3 enables WhatsApp, add a
Common item `Apply WhatsApp` (international number, digits only, `Show in ads?` = Yes). It becomes
`CAREERS_COMMON.applyWhatsApp`; otherwise that is `null`.

### `JOBS.js`: the only file the site reads

`frontEnd/src/05_pages/public/careers/04_careers_const/JOBS.js` (generated, ESM, pure data, **no imports**, UTF-8 without BOM, LF):

```js
// GENERATED by MW\WORKFLOWS\HR\.agent\scripts\sync_site_careers.py from WORKFLOWS\HR\Positions.xlsx - 2026-11-09 10:15.
// Do not edit by hand: change Positions.xlsx and run the sync again (see README "Careers").
// Public fields only - notes, pay and names never reach this file.

// "live" = what visitors may see. "preview" = every Vkusno job, for local review only; the build refuses it.
export const CAREERS_DATA_MODE = "live";

export const CAREERS_COMMON = {
  "brand": "Vkusno",
  "applyEmail": "careers@vkusno.ae",
  "applyWhatsApp": null,
  "location": { "en": "Dubai, UAE", "ru": "…", "ar": "…" },
  "about": { "en": "…", "ru": "…", "ar": "…" },
  "offer": { "en": ["…"], "ru": ["…"], "ar": ["…"] },
  "hours": null,
  "probation": null
};

export const JOBS = [
  {
    "id": "head-chef",
    "title": { "en": "Head Chef", "ru": "…", "ar": "…" },
    "summary": { "en": "…", "ru": "…", "ar": "…" },
    "duties": { "en": ["…"], "ru": ["…"], "ar": ["…"] },
    "mustHave": { "en": ["…"], "ru": ["…"], "ar": ["…"] },
    "niceToHave": { "en": [], "ru": [], "ar": [] },
    "employmentType": "FULL_TIME",
    "kitchens": null,
    "openings": null,
    "datePosted": "2026-11-09"
  }
];
```

Write each value with `json.dumps(..., ensure_ascii=False, indent=2)`. JSON is valid JavaScript and the escaping is
safe. `JOBS = []` is a valid live state.

---

## Conventions this feature must follow

- **Folders:** `src/05_pages/public/careers/` with `00_careers_styles/`, `01_careers_comps/`, `02_careers_hooks/`,
  `03_careers_hlprs/`, `04_careers_const/`, each with its `_careers_*.index.js` barrel (same spelling pattern as
  `_contact_comps.index.js`). Pages `Careers.jsx` and `CareersJob.jsx` sit at the feature root, like `Menu.jsx` and
  `MenuItem.jsx`. Do not create empty placeholder files (the README lists the existing ones as a known gap).
- **Imports only go downward** (00 → 07). The careers feature may read `../contact/04_contact_const/_contact_const.index.js`
  (FAQ and Privacy already do). Shared layers (`04_hlprs`) never import from `05_pages`.
- **Naming:** components `Careers_jobCard.jsx`; CSS classes `Careers_jobCard_title`, modifier `--open` style;
  one CSS file per component, imported by that component.
- **Pages compose, hooks decide.** `Careers.jsx` and `CareersJob.jsx` hold no state or logic beyond composition (and the
  `<Navigate>` guard, as in `MenuItem.jsx`). `useCareers` and `useCareersJob` return `{ t, lang, … }`.
- **Components take `t` and `lang` as props.** Only the hooks call `useTranslation("Careers")`. Shared footer copy is
  read with `{ ns: "common" }` where needed.
- **PropTypes everywhere**, with shapes from `04_hlprs/propShapes.js`.
- **Comments explain why** (e.g. why the subject is English, why the email is shown as text, why there is no form).
- **Links:** internal links use `localePath(lang, "careers")` and `localePath(lang, \`careers/${id}\`)`, never a bare
  path. External `mailto:` and `wa.me` links are plain `<a>`; `wa.me` opens in a new tab with `rel="noreferrer"`,
  as in `Contact_infoPanel`.
- **CSS:**
  - Only semantic variables. Only logical properties (`padding-inline`, `margin-block-start`, `inset-inline-start`,
    `text-align: start`); no `left`/`right` (the Contact hero's `text-align: left` is an old RTL quirk; do not copy
    it).
  - Breakpoints 640 / 768 / 1024px. Touch targets ≥ 44px. `:focus-visible` gets a 2px accent outline.
  - A `prefers-reduced-motion` block removes transitions and lifts.
- **Text direction:** wrap the email address and the subject line in `<bdi>` so they read correctly inside Arabic text.
  Long email addresses get `overflow-wrap: anywhere` so 320px screens do not scroll sideways.
- **No new dependency, no images, no map, no animation library work.** Icons come from `lucide-react`
  (`Briefcase`, `MapPin`, `Mail`, plus `MessageCircle` only if D3 enables WhatsApp). Avoid direction arrows; they would
  need RTL flipping.

---

## Stage overview

| Stage | Deliverable | Depends on |
| --- | --- | --- |
| 1. Data bridge (HR workflow) | New columns and sheets in `Positions.xlsx`, drafted translations, `sync_site_careers.py`, first `JOBS.js` | Owner's file closed in Excel |
| 2. Data layer, checks, tests (site) | Barrels, helpers, prop shapes, `jobPostingNode`, build check with preview guard, sitemap, tests | Stage 1 |
| 3. Pages, components, styles, copy | Routes, two pages, components, CSS, `Careers` namespace, footer link, gutters | Stage 2 |
| 4. Privacy and documentation | Privacy section draft (3 languages), README "Careers" section, HR notes | Stage 3 |
| 5. Verification and handoff | Lint, tests and build pass; browser matrix; SEO and privacy checks; review notes | Stages 1–4 |

---

## Stage 1 — Data bridge (outside the repository, in `MW\WORKFLOWS\HR`)

**Completed — 10 Nov 2026.** Backup saved. Excel opens the file. Existing cells were not changed. `Open now?` is still No. Live sync wrote an empty job list.

**Files**

- Modify `MW\WORKFLOWS\HR\Positions.xlsx` (after the backup in Hard rule 4).
- Create `MW\WORKFLOWS\HR\.agent\scripts\sync_site_careers.py`.
- Generate `frontEnd/src/05_pages/public/careers/04_careers_const/JOBS.js`.
- Modify `MW\WORKFLOWS\HR\_START_HERE.txt` (one short "Careers page" block).

### 1A. Add the new columns and sheets

- [ ] Back up the file (Hard rule 4). Open it with openpyxl (keep data validations, styles, freeze panes; check that
      Excel still opens it with `MW\.assistant\scripts\office_to_pdf.ps1` or by opening it read-only).
- [ ] `Positions`: append `Job ID` and `Open since` **after the last existing column**, copying the header style. Add a
      short note for each to the `Read me` sheet ("Job ID = the web address of the job, e.g. head-chef; never change it
      once the job has been online"; "Open since = the date the job opened; needed for the website").
- [ ] Suggest Job IDs for the 9 roles, e.g. `head-chef`, `sous-chef`, `chef-de-partie`, `demi-chef-de-partie`,
      `commis-chef`, `kitchen-helper`, `kitchen-steward`, `packer`, `driver`. Leave `Open since` empty: the owner fills
      it when opening a job.
- [ ] Create sheets `Russian` and `Arabic` (layout in "Data contract"), one row per job, then draft translations of
      Position, Short summary, Duties, Must have and Nice to have.
      - Keep the same number of lines.
      - Use natural job-board wording: Russian "Шеф-повар", "Су-шеф", "Повар (шеф де парти)", "Повар-помощник
        (коммис)"…; Arabic in Modern Standard Arabic.
      - Keep "Vkusno" in Latin letters.
      - Fill every drafted cell light yellow and add a `Read me` line: "Russian / Arabic: drafts by the assistant -
        please check before opening a job".
- [ ] `Common`: add `Text (RU)` and `Text (AR)` to the right. Draft them for About Vkusno, What we offer, Location, How to
      apply, Working hours and Probation, in the same yellow.
- [ ] Do not change any existing cell, and do not set any `Open now?`.

### 1B. Write `sync_site_careers.py`

Model it on `sync_site_allergens.py` (same docstring header style, plain functions, `python -X utf8`):

```text
python -X utf8 sync_site_careers.py              write JOBS.js with the open Vkusno jobs (live)
python -X utf8 sync_site_careers.py --dry-run    print what would be published; write nothing
python -X utf8 sync_site_careers.py --preview    write EVERY Vkusno job, marked "preview" - local review only;
                                                 the site build refuses a preview file
```

- [ ] Paths are derived from the script location, as in `make_ads.py`: `HR = …\WORKFLOWS\HR`, `MW = two levels up`.
      The output is `MW\WEB_APPS\Vkusno\frontEnd\src\05_pages\public\careers\04_careers_const\JOBS.js`.
- [ ] Read with `openpyxl.load_workbook(…, read_only=True, data_only=True)`. Find columns by header text, and reuse
      `make_ads.lines()` for multi-line cells.
- [ ] **Live checks** (any failure → print every problem, write nothing, exit non-zero):
  - a published job lacks `Job ID`, `Open since`, a `Russian` or `Arabic` row, or any required text;
  - list lengths differ between languages;
  - a `Job ID` is duplicated or badly formed;
  - a `Job type` or `Kitchens` value is unknown;
  - `How to apply` has no email address;
  - a required Common item or its RU/AR text is missing.
- [ ] **Preview mode** publishes all Vkusno jobs whatever `Open now?` says, sets `CAREERS_DATA_MODE = "preview"`, and
      omits missing Russian or Arabic texts (the site falls back to English through `pickLocale`). It prints a loud
      warning that the file must be re-synced without `--preview` before any build.
- [ ] **Privacy guard:**
  - Build the output from the whitelist only.
  - After building the text, check it contains none of the `Notes (private)` cell texts (any note ≥ 12 characters),
    no `AED`, and no `@` other than the apply email. Otherwise stop without writing.
  - The script must never open `HR\Staff\` or `New Staff\`.
- [ ] Write with `encoding="utf-8"` and LF newlines. Then run `node --check` on a temporary `.mjs` copy; if it fails,
      restore the previous file and stop (the same as `sync_site_allergens.py save_js`).
- [ ] Print a short summary, e.g. `3 jobs published (head-chef, commis-chef, kitchen-steward), 6 not open, 0 other brand
      - live` and the next steps (`npm run build` in `frontEnd`; the owner pushes).

### 1C. First run

- [ ] Run `--dry-run`, then a normal live run. With today's file this writes `JOBS = []` (nothing is open). That is
      expected and must build.
- [ ] Add a "Careers page" block to `MW\WORKFLOWS\HR\_START_HERE.txt`: how to publish and close a job (see "Publishing
      a job later").

**Exit criteria:** The backup exists. `Positions.xlsx` opens in Excel with the owner's data unchanged. `--dry-run` and the
live run succeed. `JOBS.js` parses with `node --check`, is `live` mode, and contains only whitelisted fields.

---

## Stage 2 — Data layer, build checks and tests (site)

**Completed — 10 Nov 2026.** `npm test` 13 passed. A preview file fails `check:i18n` with the guard message, and passes with `CAREERS_ALLOW_PREVIEW=1`.

**New files**

```text
frontEnd/src/05_pages/public/careers/
  03_careers_hlprs/
    findJob.js
    applyLinks.js
    jobDescriptionHtml.js
    _careers_hlprs.index.js
  04_careers_const/
    JOBS.js                       (generated in Stage 1)
    _careers_const.index.js
frontEnd/scripts/readCareersData.mjs
frontEnd/scripts/careers.test.mjs
```

**Files to modify**

- `frontEnd/src/04_hlprs/pickLocale.js`, `propShapes.js`, `jsonLd.js`
- `frontEnd/scripts/checkTranslations.mjs`, `generateSitemap.mjs`, `menuAvailability.test.mjs`

### 2A. Helpers and shapes

- [ ] `pickLocale.js`: add `pickLocaleList(localized, lang)` → `localized?.[lang]` if it is a non-empty array, else
      `localized?.en`, else `[]`. Comment why: lists need an array fallback, not `""`.
- [ ] `propShapes.js`: add `localizedListShape` (en/ru/ar arrays of strings), `jobShape` (fields from the data contract)
      and `careersCommonShape`. Keep the existing "deliberately loose on optional fields" spirit.
- [ ] `_careers_const.index.js`: `export { JOBS, CAREERS_COMMON, CAREERS_DATA_MODE } from "./JOBS.js";`
- [ ] `findJob.js`: a `Map` built once at module load (the same reasoning as `findMenuItem.js`), and
      `findJobById(id)` → job or `null`.
- [ ] `applyLinks.js`:

```js
// The subject is always the ENGLISH title (owner decision D5): the CV workflow sorts the careers@ inbox by subject,
// and the job ads on LinkedIn/Indeed use the same "Head Chef – Vkusno" wording.
export const jobSubject = (job, common) => `${job.title.en} – ${common.brand}`;
export const generalSubject = (common) => `General application – ${common.brand}`;

// RFC 6068: spaces as %20 (encodeURIComponent, not "+"), line breaks as CRLF.
export const mailtoHref = (email, subject, body = "") =>
  `mailto:${email}?subject=${encodeURIComponent(subject)}` +
  (body ? `&body=${encodeURIComponent(body.replace(/\r?\n/g, "\r\n"))}` : "");

// Only when the owner gives a WhatsApp number for CVs (D3); otherwise no button at all.
export const whatsappHref = (digits, text) =>
  digits ? `https://wa.me/${digits}?text=${encodeURIComponent(text)}` : null;
```

- [ ] `jobDescriptionHtml.js`: `jobDescriptionHtml(job, common, lang, t)` builds the `JobPosting.description` HTML.
      It contains `<p>` for the summary, then `<h3>` + `<ul><li>` for duties, must have, nice to have (if any) and what
      we offer, with headings from `t("job.sections.*")`. **Escape `& < > " '`** in every data string.

### 2B. Structured data

- [ ] In `jsonLd.js` add:

```js
// Google for Jobs reads one JobPosting per job page (never on the list page). No baseSalary: pay is not published
// (owner decision D9) - Google lists it as recommended, not required.
export const jobPostingNode = (job, lang, { descriptionHtml, branches = [] }) => ({
  "@type": "JobPosting",
  title: pickLocale(job.title, lang),
  description: descriptionHtml,
  datePosted: job.datePosted,
  employmentType: job.employmentType,
  directApply: false,
  ...(job.openings ? { totalJobOpenings: job.openings } : {}),
  url: absoluteUrl(localePath(lang, `careers/${job.id}`)),
  identifier: { "@type": "PropertyValue", name: "Vkusno", value: job.id },
  hiringOrganization: { "@type": "Organization", "@id": ORGANISATION_ID, name: "Vkusno", sameAs: SITE_URL },
  jobLocation: branches
    .filter((branch) => !job.kitchens || job.kitchens.includes(branch.id))
    .map((branch) => ({
      "@type": "Place",
      name: `Vkusno - ${pickLocale(branch.name, lang)}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: pickLocale(branch.location.address, lang),
        addressLocality: "Dubai",
        addressCountry: "AE",
      },
    })),
});
```

### 2C. Build check and preview guard

- [ ] Create `scripts/readCareersData.mjs`, mirroring `readMenuData.mjs`: a `CAREERS_MODULE` path, `withCareersData(visit,
      { plugins })` with its own `cacheDir` (`node_modules/.vite-careers-data`), and `readCareersData()`.
- [ ] Extend `checkTranslations.mjs` with a careers block (the menu data checks already live there):
  - `CAREERS_DATA_MODE` must be `"live"` unless the environment has `CAREERS_ALLOW_PREVIEW=1` (local review builds
    only; Vercel never sets it). Message: `JOBS.js is a PREVIEW file - run sync_site_careers.py without --preview before building`.
  - Every job: valid and unique `id`; non-empty `title` and `summary` in en/ru/ar; `duties` and `mustHave` non-empty
    with equal lengths across languages; `niceToHave` equal lengths (0 allowed); every list item a non-empty string;
    `employmentType` ∈ {`FULL_TIME`, `PART_TIME`}; `kitchens` `null` or known branch ids; `openings` `null` or a
    positive integer; `datePosted` a real `YYYY-MM-DD` date, not in the future.
  - `CAREERS_COMMON`: brand `Vkusno`; a valid `applyEmail`; `about` and `location` complete in 3 languages; `offer`
    non-empty with equal lengths; `hours`/`probation` `null` or complete; `applyWhatsApp` `null` or digits only.
  - Add the job count to the final success line.
  - Preview mode in a local build only skips the 3-language completeness rules. Shape rules still apply.

### 2D. Sitemap

- [ ] `generateSitemap.mjs`: `STATIC_ROUTES = ["", "menu", "contact", "careers", "faq", "privacy"]`. Change to
      `createSitemap(menuItems, jobs = [])` and add `jobs.map(({ id }) => entry(<same id for each language>, "0.5"))`.
      The main block reads `JOBS` through `readCareersData()`. Update the console summary (static + dishes + jobs).
- [ ] `menuAvailability.test.mjs`: the empty-menu test now expects **18** `<url>` entries (6 static routes × 3
      languages). Update the number and say why in its comment.

### 2E. Tests (`scripts/careers.test.mjs`, `node:test`, no new framework)

- [ ] The real `JOBS.js` passes the shape rules (an empty list is fine).
- [ ] With a Vite transform-plugin fixture (the pattern in `menuAvailability.test.mjs`), inject two fixture jobs and
      check:
  - `findJobById` finds both and returns `null` for an unknown id;
  - `createSitemap([], jobs)` has `/en|ru|ar/careers/{id}` with hreflang alternates;
  - `createSitemap([], [])` has the three `/careers` URLs and no `/careers/` job URL.
- [ ] `mailtoHref(jobSubject(job, common), …)` decodes back to exactly `Head Chef – Vkusno` for every page language,
      and the body keeps Cyrillic and Arabic text. `whatsappHref(null, …)` is `null`.
- [ ] `jobPostingNode` has `title`, `description`, `datePosted`, `employmentType`, `hiringOrganization.name`,
      `jobLocation[].address.addressCountry === "AE"` and `directApply === false`, and has no `baseSalary`. With
      `kitchens: ["arjan"]` it has exactly one location.
- [ ] `jobDescriptionHtml` escapes `<script>` in a fixture summary.

**Exit criteria:** `npm test`, `npm run check:i18n` and `npm run lint` pass from `frontEnd`. A preview `JOBS.js` makes
`check:i18n` fail with the guard message (and pass with `CAREERS_ALLOW_PREVIEW=1`). The sitemap gains only careers
URLs.

---

## Stage 3 — Pages, components, styles and translations

**Completed — 10 Nov 2026.** Footer link, three languages, empty state and job page checked in the browser.

**New files**

```text
frontEnd/src/05_pages/public/careers/
  Careers.jsx
  CareersJob.jsx
  00_careers_styles/
    Careers.css
    CareersJob.css
    Careers_jobCard.css
    Careers_jobDetail.css
    Careers_applyPanel.css
    Careers_offer.css
  01_careers_comps/
    Careers_jobCard.jsx
    Careers_jobDetail.jsx
    Careers_applyPanel.jsx
    Careers_offer.jsx
    _careers_comps.index.js
  02_careers_hooks/
    useCareers.js
    useCareersJob.js
    _careers_hooks.index.js
frontEnd/public/locales/{en,ru,ar}/Careers.json
```

**Files to modify**

- `frontEnd/src/06_routes/userRoutes.jsx`
- `frontEnd/src/i18n/i18n.Config.js` (add `"Careers"` to `ns`)
- `frontEnd/src/07_styles/App.css` (add `.Careers_container` and `.CareersJob_container` to the page-gutter selector list)
- `frontEnd/src/05_pages/public/_shared_comps/publicFooter/04_publicFooter_const/FOOTER_LINKS.js`
- `frontEnd/public/locales/{en,ru,ar}/common.json` (`footer.nav_links.careers`)

### 3A. Routes

- [ ] Add `const Careers = lazy(() => import("../05_pages/public/careers/Careers.jsx"));` and the same for
      `CareersJob`. Add `{ path: "careers", element: <Careers /> }` and `{ path: "careers/:jobId", element: <CareersJob /> }`
      **before** `"*"`.
- [ ] No change to `App.jsx`, `MAP_ROUTE_SEGMENTS`, `ScrollToTop` or `LanguageLayout`.

### 3B. Hooks (all decisions live here)

- [ ] `useCareers()` →
      `{ t, lang, jobs: JOBS, common: CAREERS_COMMON, general: { email, subject, mailto, whatsapp } }`. `lang` comes from
      `resolveLanguage(langParam, i18n.language)` (as `useMenu`). The general application uses `generalSubject` and the
      `apply.generalMailBody` copy.
- [ ] `useCareersJob()` → the same plus `job` (or `null`), `apply: { email, subject, mailto, whatsapp }` for that job
      (body `apply.mailBody` with the **localized** title) and `jsonLd`:
      `graph(jobPostingNode(job, lang, { descriptionHtml, branches: BRANCHES }), breadcrumbNode([...]))`, built with
      `useMemo` on `[job, lang, t]`.

### 3C. Pages (composition only)

- [ ] `Careers.jsx`:
  - `PageMeta` with `t("meta.title")`, `t("meta.description")` and `jsonLd={graph(organisationNode(lang))}`.
  - The hero (`h1` + intro).
  - `section` "Open positions" (`h2`) holding either the card grid or the empty-state panel.
  - `Careers_offer`.
  - `Careers_applyPanel` (general variant).
- [ ] `CareersJob.jsx`:
  - `if (!job) return <Navigate to={localePath(lang, "careers")} replace />`.
  - `PageMeta` with `t("meta.jobTitle", { title })`, `description={pickLocale(job.summary, lang)}` and the hook's
    `jsonLd`.
  - The breadcrumb `nav` (copy the `MenuItem_breadcrumb` markup; label from `hero.title`).
  - An `article` with header (`h1`, pills, a "How to apply" jump link to `#careers-apply` that shows only under 1024px).
  - `Careers_jobDetail`, then `Careers_offer`, then an `aside` with `Careers_applyPanel id="careers-apply"`.

### 3D. Components

| Component | Props | Notes |
| --- | --- | --- |
| `Careers_jobCard` | `job, common, lang, t` | `<article>`; `h3` holds the one real `<Link>` to the job, stretched over the card with `::after { inset: 0 }` (card `position: relative`). Pills: job type and location. Summary clamped to 3 lines. A visual "View job" label inside the link area (`aria-hidden`, since the link name is the title); give the link `aria-label={t("list.viewJobAria", { title })}`. |
| `Careers_jobDetail` | `job, common, lang, t` | `section`s with `h2`: role (summary `<p>`), duties, must have, nice to have (only if non-empty), working hours / probation (only if not `null`). Lists are real `<ul>`. |
| `Careers_offer` | `common, lang, t` | One panel: "What we offer" (`ul`) + "About Vkusno" (`p`). |
| `Careers_applyPanel` | `title, text, email, subject, mailto, whatsapp, lang, t, id` | `h2` title; the primary button `<a href={mailto}>` with `Mail` icon ("Apply by email"); the email and subject as text inside `<bdi>`; the optional WhatsApp secondary button only when `whatsapp` is not `null`; the privacy line with `<Link to={localePath(lang, "privacy")}>`. Used for the job (with `id`) and the general application. |

All components: PropTypes using the new shapes; `pickLocale` / `pickLocaleList` for data; no `useTranslation` inside.

### 3E. Styles (copy the measurements; only semantic variables)

- [ ] **Containers:**
  - `.Careers_container { margin: 0 auto; padding-bottom: 48px }` and 64px from 768px (as `.Contact_container`).
  - `.CareersJob_container { max-width: 1120px; margin: 0 auto; padding-block: 24px 64px }` (16px/48px below 768px,
    as `.MenuItem_container`).
  - Both get the page gutters through the `App.css` list.
- [ ] **Hero:** the `.Contact_hero` / `.FAQ_hero` measurements, with `text-align: start`.
  - Padding 32px 0 8px (48px 0 16px from 768px).
  - Title 32px (36px from 768px), `letter-spacing: 0.06em`.
  - Gold underline: 80 × 3px, radius 2px, `margin-block-start: 12px`.
  - Intro 15px / 1.7, muted, `max-inline-size: 65ch`.
- [ ] **Section titles** (`h2`) as `.Contact_branches_title` (22px → 26px). Small panel headings as
      `.Contact_connect_heading` (13px, 700, 0.08em, uppercase, muted).
- [ ] **Grid:** one column, 2 from 640px, 3 from 1024px; gap 16px (20px from 1024px). This is the branch grid.
- [ ] **Card:** the `.Contact_branchCard` treatment.
  - Surface background, 1px border, radius 14px, padding 18px, column flex with gap 10px.
  - On hover / `:focus-within`: `translateY(-2px)`, gold border, `0 6px 18px var(--shadow_color)`.
  - Title 17–18px. Pills as `.Contact_branchCard_hours` (12px, 600, accent on `--accent_soft_color`, radius 999px,
    padding 4px 10px).
  - Summary 14px / 1.6, muted, clamped with `-webkit-line-clamp: 3` + `line-clamp: 3`.
  - The link's focus ring is drawn on the card (`:has(:focus-visible)` with an outline fallback on the link).
- [ ] **Panels** (offer, empty state, apply): as `.Contact_connect_panel` (surface, border, radius 16px, padding
      20px → 24px from 768px).
- [ ] **Lists:** 15px / 1.7, `padding-inline-start: 1.25em`, `::marker` in `--gold_color`.
- [ ] **Buttons:**
  - Primary = the `.notFound_action--primary` look (accent background, `--footer_text_color` text, hover
    `--accent_hover_color`, radius 8px, 14px/700, ≥ 44px tall, `inline-size: 100%` inside the narrow aside).
  - Secondary = the `.MenuDownload_button` outline look.
- [ ] **Job page layout from 1024px:** `display: grid; grid-template-columns: minmax(0, 1fr) minmax(300px, 360px);
      gap: 32px`. The aside is `position: sticky; inset-block-start: calc(var(--menu_header_offset, 72px) + 16px);
      align-self: start` (the header publishes that offset). Below 1024px: one column, with the apply panel after the
      sections and the jump link visible.
- [ ] **Breadcrumb:** copy the `.MenuItem_breadcrumb` rules (prefixed `CareersJob_breadcrumb`).
- [ ] **Reduced motion:** remove the card transitions and lifts.

### 3F. Translations (`Careers` namespace; UTF-8 without BOM; check with `npm run check:i18n`)

Russian and Arabic below are drafts. A native speaker or the owner should read them before deployment.

| Key | English | Russian | Arabic |
| --- | --- | --- | --- |
| `meta.title` | Careers | Вакансии | الوظائف |
| `meta.description` | Jobs at Vkusno in Dubai: chefs, kitchen and delivery team. See the open positions and how to apply. | Работа в Vkusno в Дубае: повара, команда кухни и доставки. Открытые вакансии и как откликнуться. | وظائف في Vkusno في دبي: طهاة وفريق المطبخ والتوصيل. اطّلع على الوظائف الشاغرة وطريقة التقديم. |
| `meta.jobTitle` | {{title}} job in Dubai | Вакансия «{{title}}» в Дубае | وظيفة {{title}} في دبي |
| `hero.title` | Careers | Вакансии | الوظائف |
| `hero.intro` | Join the team that cooks Vkusno's home-style Russian food in Dubai. | Присоединяйтесь к команде, которая готовит домашнюю русскую еду Vkusno в Дубае. | انضم إلى الفريق الذي يُعِدّ أطباق Vkusno الروسية المنزلية في دبي. |
| `list.title` | Open positions | Открытые вакансии | الوظائف الشاغرة |
| `list.viewJob` | View job | Подробнее | تفاصيل الوظيفة |
| `list.viewJobAria` | View job: {{title}} | Подробнее о вакансии: {{title}} | تفاصيل وظيفة: {{title}} |
| `empty.title` | No open positions right now | Сейчас открытых вакансий нет | لا توجد وظائف شاغرة حاليًا |
| `empty.text` | We are always glad to hear from good cooks and kitchen staff. You are welcome to send us your CV. | Мы всегда рады хорошим поварам и сотрудникам кухни. Вы можете отправить нам своё резюме. | يسعدنا دائمًا التعرّف على الطهاة وموظفي المطبخ المميّزين. يمكنك إرسال سيرتك الذاتية إلينا. |
| `general.title` | Don't see your job? | Не нашли подходящую вакансию? | لم تجد الوظيفة المناسبة؟ |
| `general.text` | Send us your CV and tell us which job you are looking for. | Отправьте нам резюме и напишите, какую работу вы ищете. | أرسل إلينا سيرتك الذاتية وأخبرنا بالوظيفة التي تبحث عنها. |
| `job.type.FULL_TIME` | Full-time | Полная занятость | دوام كامل |
| `job.type.PART_TIME` | Part-time | Частичная занятость | دوام جزئي |
| `job.sections.role` | About the role | О вакансии | عن الوظيفة |
| `job.sections.duties` | What you will do | Обязанности | المهام |
| `job.sections.mustHave` | What you need | Требования | المتطلبات |
| `job.sections.niceToHave` | Nice to have | Будет плюсом | ميزة إضافية |
| `job.sections.offer` | What we offer | Мы предлагаем | ما نقدّمه |
| `job.sections.about` | About Vkusno | О Vkusno | عن Vkusno |
| `job.sections.hours` | Working hours | График работы | ساعات العمل |
| `job.sections.probation` | Probation | Испытательный срок | فترة التجربة |
| `job.allJobs` | All open positions | Все вакансии | جميع الوظائف الشاغرة |
| `job.factsLabel` | Job details | Информация о вакансии | تفاصيل الوظيفة |
| `apply.title` | How to apply | Как откликнуться | طريقة التقديم |
| `apply.text` | Send your CV to {{email}}. | Отправьте резюме на {{email}}. | أرسل سيرتك الذاتية إلى {{email}}. |
| `apply.subjectLabel` | Email subject | Тема письма | عنوان الرسالة |
| `apply.emailButton` | Apply by email | Откликнуться по почте | قدّم عبر البريد الإلكتروني |
| `apply.mailBody` | Hello,\n\nI would like to apply for the {{title}} position. My CV is attached.\n\nThank you. | Здравствуйте!\n\nХочу откликнуться на вакансию «{{title}}». Резюме во вложении.\n\nСпасибо. | مرحبًا،\n\nأرغب في التقديم على وظيفة {{title}}. مرفق سيرتي الذاتية.\n\nشكرًا لكم. |
| `apply.generalMailBody` | Hello,\n\nI would like to work at Vkusno. My CV is attached.\n\nThank you. | Здравствуйте!\n\nХочу работать в Vkusno. Резюме во вложении.\n\nСпасибо. | مرحبًا،\n\nأرغب في العمل لدى Vkusno. مرفق سيرتي الذاتية.\n\nشكرًا لكم. |
| `apply.privacy` | We use your CV only to consider you for jobs at Vkusno. | Мы используем ваше резюме только для подбора сотрудников в Vkusno. | نستخدم سيرتك الذاتية فقط للنظر في توظيفك لدى Vkusno. |
| `apply.privacyLink` | Privacy Policy | Политика конфиденциальности | سياسة الخصوصية |

Only if D3 enables WhatsApp, also add:

| Key | English | Russian | Arabic |
| --- | --- | --- | --- |
| `apply.whatsappButton` | Apply on WhatsApp | Откликнуться в WhatsApp | قدّم عبر واتساب |
| `apply.whatsappText` | Hello, I would like to apply for the {{title}} position at Vkusno. | Здравствуйте! Хочу откликнуться на вакансию «{{title}}» в Vkusno. | مرحبًا، أرغب في التقديم على وظيفة {{title}} لدى Vkusno. |

`common.json` → `footer.nav_links.careers`: **Careers** / **Вакансии** / **الوظائف**. Then add the link as the first
entry of `FOOTER_LINKS`.

**Exit criteria:** All six routes render in both themes. `npm run lint` and `npm run check:i18n` pass. The footer link
works in all three languages. No Maps SDK request is made on careers routes.

---

## Stage 4 — Privacy Policy and documentation

**Completed — 10 Nov 2026.** Privacy section 8 is a draft and needs the owner's approval before deployment.

**Files to modify**

- `frontEnd/public/locales/{en,ru,ar}/Privacy.json`
- `frontEnd/README.md`
- `MW\WORKFLOWS\HR\_START_HERE.txt` (if not already done in Stage 1)

### 4A. Privacy section (D6: owner approval required before deployment)

- [ ] Insert a new section **"8. Job applications"** after "7. How long we keep information". Renumber the later section
      titles and `contact.title` (13), and update `lastUpdated`. Do this identically in all three languages.
- [ ] English draft (the owner chooses the final retention period):

> **8. Job applications**
> If you apply for a job at Vkusno, you send us your CV and contact details by email. Our website does not collect or
> store applications itself.
> We use your application only to consider you for current and future positions at Vkusno, share it only with the
> people involved in hiring, and do not sell or publish it.
> We keep applications for up to 12 months and then delete them, unless you ask us to delete yours sooner or you join
> our team.

- [ ] Translate into Russian and Arabic in the existing tone of `Privacy.json`. Optionally add "and job openings" to
      section 1's description of the site, in all three languages.
- [ ] In the handoff, flag clearly that this text needs the owner's approval (and legal review if the owner wants it).
      Do not present it as legal advice.

### 4B. README

- [ ] Namespaces: add `Careers`. "Adding a language" step 2 now says **nine** namespaces.
- [ ] New section **"## Careers"**:
  - the data flow (`Positions.xlsx` → `sync_site_careers.py` → `JOBS.js` → build);
  - "never edit `JOBS.js`";
  - the publish and close routine;
  - the preview mode and its build guard;
  - why there is no form (privacy, no backend);
  - why the subject is English;
  - the sitemap and `JobPosting` notes;
  - the known limit: WhatsApp and LinkedIn link previews stay site-level, because Open Graph tags are static (see
    "Known gaps").

**Exit criteria:** Privacy changes pass `check:i18n` and are listed as "awaiting owner approval". The README explains the
feature well enough for the owner to publish a job without this plan.

---

## Stage 5 — Verification and handoff

**Completed — 10 Nov 2026.** Lint, tests and the live build passed. `JOBS.js` was put back to live mode after the preview check. Details are in the handoff below.

### 5A. Checks (from `frontEnd`; record the results under each stage)

```powershell
npm run lint
npm test
npm run build
npm run preview -- --host 127.0.0.1 --port 4173 --strictPort
```

`npm run build` runs `check:i18n` (now including careers) and regenerates the sitemap. Inspect the sitemap diff: only
`/careers` and `/careers/{id}` URLs may be added.

### 5B. Data scenarios

- [ ] **Live, nothing open** (today's file): `/en|ru|ar/careers` show the empty state and the general application;
      `/en/careers/head-chef` redirects to `/en/careers`.
- [ ] **Preview:**
  - Run `sync_site_careers.py --preview`, then `npm run dev`. All 9 jobs render in EN (and RU/AR where drafted).
  - `npm run build` **fails** with the guard message; with `CAREERS_ALLOW_PREVIEW=1` it builds for `npm run preview`.
  - Afterwards **re-run the live sync** and confirm `CAREERS_DATA_MODE = "live"` before finishing. Never leave a preview
    file behind.
- [ ] **Fixtures in tests:** 0, 1 and 2 jobs (Stage 2E).

### 5C. Browser matrix

- [ ] Routes: `/{en,ru,ar}/careers` and `/{en,ru,ar}/careers/{id}` (preview data). Also an unknown id, `/de/careers`
      (existing language redirect), and the language switcher on a job page (it keeps the id).
- [ ] Widths 320 / 390 / 768 / 1024 / 1365px × light/dark × EN/RU/AR. Also a short viewport, 200% zoom and reduced
      motion. Check:
  - no horizontal scroll;
  - the email and subject read correctly in Arabic (`<bdi>`);
  - the sticky aside does not cover the footer;
  - the jump link works under 1024px.
- [ ] Keyboard and screen reader:
  - one `h1` per page, `h2` sections, `h3` card titles;
  - Tab order runs header → cards (one stop per card) → panels → footer;
  - a focus ring is visible on every control;
  - the card link has an accessible name.
- [ ] Apply links (read only, never send):
  - each `href` decodes to `careers@vkusno.ae`, subject `<English title> – Vkusno`, and the body in the page language
    with the localized title;
  - the general application uses `General application – Vkusno`;
  - with D3 off there is no WhatsApp button.
- [ ] Network: careers routes request no Google Maps, analytics or third-party script. Only `/locales/{lang}/Careers.json`
      is new.

### 5D. SEO and privacy checks

- [ ] In the rendered head of a job page: title (`… job in Dubai - Vkusno`), description (the summary), canonical,
      hreflang en/ru/ar plus x-default, and one JSON-LD script that `JSON.parse`s and holds `JobPosting` +
      `BreadcrumbList`. The list page has no `JobPosting`.
- [ ] `public/sitemap.xml`: 3 `/careers` URLs; job URLs only for live open jobs.
- [ ] Privacy grep over `frontEnd/src`, `frontEnd/public` and `frontEnd/dist`: no `Notes (private)` text, no `AED`, no
      `passport`, no `salary`.
- [ ] After deployment the owner tests one live job URL in Google's Rich Results Test (local URLs cannot be tested).
      Write this in the handoff as an owner step.

### 5E. Handoff note (add to the end of this file)

- [ ] The files created and changed (site and HR workflow).
- [ ] The results of every check, with screenshots in `.context/careers-page/`.
- [ ] Untested browsers (native iOS Safari, Android Chrome, Firefox unless actually run).
- [ ] Open owner items: D6 privacy approval, RU/AR translation review, any decision changed.
- [ ] Review URLs (`http://127.0.0.1:4173/en/careers`…).
- [ ] The sentence "Nothing was committed, pushed or deployed."

**Exit criteria:** All checks pass or are explained. `JOBS.js` is live mode. The owner has a clear list of what to
review before pushing.

---

## Publishing a job later (the owner's routine, for README and `_START_HERE.txt`)

1. In `Positions.xlsx`:
   - set `Open now?` = Yes;
   - fill `Open since`;
   - check the `Job ID`;
   - check the Russian and Arabic rows (ask the HR assistant to draft them if they are new).
2. In `MW\WORKFLOWS\HR\.agent\scripts`: `python -X utf8 sync_site_careers.py --dry-run`, then without `--dry-run`.
3. In `WEB_APPS\Vkusno\frontEnd`: `npm run build` (optional: `npm run preview` to look).
4. Commit, push and deploy as usual (the owner's own steps).

**Closing a job:** `Open now?` = No → sync → build → push. The job's URL then redirects to the list and leaves the
sitemap. **Changing a job's text:** edit `Positions.xlsx` (and its RU/AR rows) → sync → build → push. The job ads come
from the same file through `make_ads.py`.

---

## Out of scope (not in this version)

- A header-nav link (D4), a Home page teaser, an FAQ entry.
- An application form, CV upload, applicant accounts, an ATS or any backend.
- Careers pages on the Blin-i or Kompot sites. The sync script is Vkusno-only for now. A later `--site` option could
  reuse it.
- Per-job WhatsApp/LinkedIn link previews (they need prerendering; see README "Known gaps").
- Pay ranges (D9), analytics or click tracking, automatic posting to LinkedIn, Indeed or Bayt.

---

## Definition of done

- [ ] `/en|ru|ar/careers` and `/en|ru|ar/careers/{id}` work in light/dark, LTR/RTL, from 320px to desktop, by
      keyboard.
- [ ] Jobs come only from `Positions.xlsx` through `sync_site_careers.py`. Only open Vkusno jobs with complete English,
      Russian and Arabic texts appear. No private field can reach the site.
- [ ] Applying opens an email to careers@vkusno.ae with the English subject `<Job> – Vkusno`. The site stores nothing.
- [ ] A preview data file cannot be built by accident.
- [ ] The sitemap, hreflang, canonical and `JobPosting` data are correct. No map or analytics load on careers routes.
- [ ] `npm run lint`, `npm test` and `npm run build` pass.
- [ ] The Privacy Policy draft and RU/AR copy are marked for the owner's approval.
- [ ] The README and HR `_START_HERE.txt` explain the routine.
- [x] Nothing was committed, pushed or deployed. The owner reviews and pushes.

---

## Handoff — 10 Nov 2026

Nothing was committed, pushed or deployed.

### What was added

- `WORKFLOWS\HR\.backups\Positions (before careers columns, 2026-11-10).xlsx`
- `Positions.xlsx`: columns `Job ID` and `Open since`, sheets `Russian` and `Arabic`, and `Text (RU)` / `Text (AR)` on Common. Existing cells were not changed. `Open now?` is still No. Yellow cells are drafts.
- `WORKFLOWS\HR\.agent\scripts\sync_site_careers.py`
- `WORKFLOWS\HR\_START_HERE.txt` — how to publish and close a job
- The careers pages, styles, `Careers` translations, footer link, sitemap, build check and tests
- A draft "8. Job applications" section in the Privacy Policy (English, Russian, Arabic). Later sections were renumbered.

### Checks

- Excel opened the workbook read-only: sheets Positions, Common, Russian, Arabic, Read me. Head Chef is still `head-chef`, Open now? = No.
- `npm run lint` passed.
- `npm test` passed (13 tests).
- `npm run check:i18n` on the live file: 3 languages, 9 namespaces, 0 open jobs.
- A preview file makes that check fail with: `JOBS.js is a PREVIEW file - run sync_site_careers.py without --preview before building`. With `CAREERS_ALLOW_PREVIEW=1` it passes (9 jobs). The live sync was run again afterwards. `CAREERS_DATA_MODE` is `"live"`.
- `npm run build` passed. Sitemap: 264 URLs (6 static + 82 dishes + 0 jobs) × 3 languages. The only new URLs are `/en|ru|ar/careers`. No job URLs, because nothing is open.
- Careers files do not contain pay, passport or private notes. The word AED still appears in the existing menu and home price text. It was already there.

### Browser (Chrome via the editor)

Looked at `http://127.0.0.1:4173` (the live build) and, for the job pages only, a temporary dev server with preview data. That preview file was removed again.

- `/en/careers`, `/ru/careers`, `/ar/careers`: empty state, general application to careers@vkusno.ae, subject `General application – Vkusno`. Arabic is right-to-left. The email and the subject sit in `<bdi>`.
- `/en/careers/head-chef` on the live build redirects to `/en/careers`.
- `/de/careers` goes to the current language's home (`/ru` in that session). That is the existing language redirect. It does not keep `/careers`.
- With preview data, all 9 jobs render. The language switch on Head Chef stays on `head-chef`. The Russian page title is Шеф-повар. The email subject stays `Head Chef – Vkusno`.
- No "Apply on WhatsApp" button. No Google Maps or analytics request on the careers pages.
- Job page head: title `Head Chef job in Dubai - Vkusno`, the summary as the description, canonical and hreflang, and JSON-LD with `JobPosting` and `BreadcrumbList`. No salary. The list page has only an Organization entry.
- Widths 320, 390 and 1365: no sideways scroll. At 1365 the apply panel is sticky. Under 1024 the "How to apply" jump goes to `#careers-apply`.
- Card links are named "View job: …". One h1 per page.

Screenshots: `.context/careers-page/` (Arabic phone, job page). Not tested: Safari on iPhone, Chrome on Android, Firefox.

### Please review before you push

1. Privacy section "8. Job applications", including the 12-month retention. This is a draft, not legal advice. Do not deploy until you approve it.
2. The yellow Russian and Arabic cells in `Positions.xlsx`.
3. Decisions were left at the defaults: email only, footer link only, no pay on the page.

### To look at it

The live build is on `http://127.0.0.1:4173/en/careers` (also `/ru/careers` and `/ar/careers`). It shows the empty state, which is correct today.

To see the nine jobs locally: `python -X utf8 sync_site_careers.py --preview`, then `npm run dev`. Run the sync again without `--preview` before any build.
