import { SUPPORTED_LANGUAGES } from "../../../../00_config/_config.index.js";
import { Categories } from "../04_menu_const/CATEGORIES.js";
import { pickIngredient, isRenderableIngredient } from "../04_menu_const/INGREDIENTS.js";

// Search normalisation.
//
// The point is that typing should work regardless of which language the UI is
// in, and regardless of how carefully the reader types. Someone browsing in
// English can type "Борщ" and get Borscht; someone in Arabic can type "plov".
//
// Per-script quirks handled:
//   Russian  - ё and е are used interchangeably; readers rarely type ё
//   Arabic   - harakat (short-vowel marks) are usually omitted, and أ إ آ ٱ
//              are all typed as ا; ة is often typed ه, and ى as ي
//   Latin    - accents stripped via NFD so "sauteed" finds "sautéed"
const normalizeText = (value) =>
  String(value ?? "")
    .toLowerCase()
    .normalize("NFD")
    // Strip every combining mark rather than enumerating ranges. This covers
    // Latin accents, Arabic harakat, AND the hamza that أ decomposes into -
    // an explicit range missed that one, so "أرز" split into two words.
    // It also handles ё -> е for free (ё decomposes to е + diaeresis).
    .replace(/\p{M}/gu, "")
    .replace(/ـ/g, "") // Arabic tatweel (decorative stretching)
    .replace(/ٱ/g, "ا") // alef wasla does not decompose
    .replace(/ة/g, "ه") // taa marbuta, commonly typed as haa
    .replace(/ى/g, "ي") // alef maqsura, commonly typed as yaa
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();

// Every string a dish should be findable by, in EVERY language - not just the
// active one. Built once per item at module load and cached, because rebuilding
// 70 haystacks on each keystroke is wasteful.
const buildHaystack = (item, categoryNames) => {
  const parts = [];

  for (const lang of SUPPORTED_LANGUAGES) {
    parts.push(item.name?.[lang]);
    parts.push(item.description?.short?.[lang]);
    parts.push(item.slug?.[lang]);
    // Category, so "desserts" / "десерты" / "الحلويات" narrows the list
    parts.push(categoryNames?.[lang]);
    // Ingredients, translated - "творог" should find the cottage-cheese dishes
    for (const raw of item.ingredients ?? []) {
      if (isRenderableIngredient(raw)) parts.push(pickIngredient(raw, lang));
    }
  }

  return normalizeText(parts.filter(Boolean).join(" "));
};

const HAYSTACKS = new Map();
for (const category of Categories) {
  for (const item of category.menuItems ?? []) {
    HAYSTACKS.set(item.id, buildHaystack(item, category.name));
  }
}

// Every term must appear somewhere in the haystack, so "beef soup" narrows
// rather than widening the way a plain substring match would.
export const matchesQuery = (item, query) => {
  const normalized = normalizeText(query);
  if (!normalized) return true;

  const haystack = HAYSTACKS.get(item.id) ?? "";
  return normalized.split(" ").every((term) => haystack.includes(term));
};

export { normalizeText };
