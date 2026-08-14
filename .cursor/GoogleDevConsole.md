# Google Cloud / Maps Platform Setup - Vkusno Contact Page

Status: **Console setup AND codebase implementation are both complete.**
`@vis.gl/react-google-maps` is installed, `MapProvider`/`useMapContext` are
wired into `App.jsx`, `BRANCHES.js`/`CONTACT_INFO.js`/`SOCIALS.js` hold the
real data extracted from `context/Details - Copy.xlsx`, and the Contact page
(`frontEnd/src/05_pages/public/contact/`) renders the map with 5 branch pins
plus branch cards. Verified working end-to-end against
`http://localhost:5173/contact` (the API key's referrer restriction requires
port 5173 specifically - see the note below).
See `.cursor/plans/contact_page_with_maps_b5d86ef8.plan.md` for the full plan
history.

## What was done in Google Cloud Console

1. **Project**: `vkusno-website` (existing GCP project, billing enabled).
2. **API enabled**: Maps JavaScript API only (no other Maps APIs enabled -
   the key was originally auto-created with all ~35 Maps Platform APIs
   selected via the "Get Started" quick-setup flow, then manually
   restricted down to just this one, see step 3).
3. **API key** created (name: `Maps Platform API Key`):
   - **API restrictions**: restricted to `Maps JavaScript API` only (1 API).
   - **Application restrictions**: `Websites`, with these referrers
     allowed:
     - `localhost:5173/*` (Vite dev server)
     - `vkusno.ae/*`
     - `www.vkusno.ae/*`
     - `live.vkusno.ae/*` (staging subdomain, used before going live on the
       main domain - remove later if no longer needed)
     - `www.live.vkusno.ae/*`
4. **Map ID** created via Google Maps Platform → Map Management:
   - Name: `vkusno-contact-map`
   - Description: "Map for Vkusno's Contact Page"
   - Map type: `JavaScript`
   - Rendering type: `Vector` (required for `AdvancedMarker`, which the
     plan uses instead of the deprecated classic marker)
   - Tilt / Rotation: left unchecked (not needed for this use case)

## Where the values live

Both values are stored in `frontEnd/.env` (NOT `.env.local` - the project
only uses `.env`):

```
VITE_GOOGLE_MAPS_API_KEY=<the restricted API key above>
VITE_GOOGLE_MAPS_MAP_ID=<the vkusno-contact-map Map ID above>
```

- No quotes around values, no spaces around `=` (Vite/dotenv-safe format).
- `VITE_` prefix is required for Vite to expose these to client code via
  `import.meta.env`.
- `frontEnd/.env` is intended to be covered by the root `.gitignore`'s bare
  `.env` line, but the user is planning to revisit/re-verify the
  `.gitignore` setup later - don't assume it's airtight without
  double-checking `git status` first.

## Important gotcha: the port matters

The API key's application restriction only allows the referrers listed
above - notably `localhost:5173/*`, not any other port. Vite's dev server
falls back to 5174 (or higher) if 5173 is already taken by another process.
If the map shows "This page didn't load Google Maps correctly", check
whether the dev server actually bound to 5173 before assuming the key is
broken - kill whatever else is holding that port, or restart the correct
dev server, rather than touching the key/restrictions.

## Remaining follow-ups (not blockers)

- Branch name ru/ar translations in `BRANCHES.js` are a first draft by the
  assistant - worth a native-speaker pass.
- Careem/Deliveroo/Noon/Keeta storefront links are still `null` per branch
  (shown as disabled logos in the UI) until real links are provided; only
  Talabat has real links from the Excel sheet.
- The `live.vkusno.ae` referrer entries can be removed once staging is no
  longer needed.
