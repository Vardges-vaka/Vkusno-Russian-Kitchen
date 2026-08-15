// Stand-in for a dish photo that failed to load, or an item with no image.
//
// This used to be Borscht.jpg (1.3 MB, now 200 KB as WebP). It is a static
// import, so every visitor downloaded it for an onError handler that
// essentially never fires - all 70 items have photos. An inline data URI
// costs no request and about a kilobyte of JS.
//
// Colours are baked in rather than themed: it renders inside an <img>, which
// cannot read CSS custom properties. Warm neutrals that sit acceptably on
// both the cream and charcoal card surfaces.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" role="img">
  <rect width="400" height="300" fill="#e4dacb"/>
  <circle cx="200" cy="150" r="62" fill="none" stroke="#b3a696" stroke-width="6"/>
  <circle cx="200" cy="150" r="34" fill="#b3a696" opacity="0.45"/>
  <path d="M108 150a92 46 0 0 0 184 0" fill="none" stroke="#b3a696" stroke-width="6" stroke-linecap="round"/>
</svg>`;

export const dishPlaceholder = `data:image/svg+xml,${encodeURIComponent(
  svg.replace(/\s+/g, " ").trim(),
)}`;

export default dishPlaceholder;
