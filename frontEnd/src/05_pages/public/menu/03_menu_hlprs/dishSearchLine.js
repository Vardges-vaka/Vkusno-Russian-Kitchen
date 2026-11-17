// The line a search engine shows under a dish's title, and the line under the
// picture when a dish is shared on WhatsApp or Facebook.
//
// It used to be the short line from the dish card ("Hearty beef & beet borscht
// with dill."), about 38 letters where Google has room for about 155. Now it is
// built from the longer text that is already on the dish page, followed by the
// price:
//   "A steaming 500 g bowl of deep-ruby borscht pairs tender beef cubes with
//    sweet beetroot, carrot and potato… 41 AED."
//
// Nothing here is written by hand per dish. Change the dish's text or price in
// the menu data and the line follows on the next build.
//
// Keep this file free of imports: scripts/dishSearchLine.test.mjs loads it
// with plain Node.

// About what Google shows on a computer. Phones show a little less, so the
// start of the line matters most.
export const SEARCH_LINE_LIMIT = 155;

const SENTENCE_ENDS = ".!?؟…";
const isSpace = (char) => char !== undefined && /\s/.test(char);

// "One. Two! Three" -> ["One.", "Two!", "Three"]. A dot inside a number
// ("3.5 g") is not followed by a space, so it does not split.
// Written as a loop on purpose: the regular expression for this needs
// "lookbehind", which older iPhones cannot read - and one unreadable
// expression stops the whole menu from loading there.
const sentences = (text) => {
  const clean = String(text ?? "").trim();
  const parts = [];
  let start = 0;
  for (let i = 0; i < clean.length; i += 1) {
    if (SENTENCE_ENDS.includes(clean[i]) && isSpace(clean[i + 1])) {
      parts.push(clean.slice(start, i + 1));
      let next = i + 1;
      while (next < clean.length && isSpace(clean[next])) next += 1;
      start = next;
      i = next - 1;
    }
  }
  if (start < clean.length) parts.push(clean.slice(start));
  return parts.map((part) => part.trim()).filter(Boolean);
};

// Where a sentence that is too long may stop, best first.
const AFTER_PUNCTUATION = /[,،;:–—]\s|\s-\s/g;
const BEFORE_JOINING_WORD = /\s(?:and|with|in|и|с|в|مع|في)\s|\sو(?=\S)/g;
const LOOSE_END = /[ ,،;:–—-]+$/;

const positions = (pattern, text) =>
  [...text.matchAll(pattern)].map((match) => match.index);

const wordCount = (text) => text.trim().split(/\s+/).filter(Boolean).length;

// Whole sentences while they fit in `room` letters. If even the first one is
// too long, it is cut at a comma, or before "and" / "with", and ends with "…".
const fit = (text, room) => {
  const parts = sentences(text);
  if (!parts.length) return "";

  let whole = "";
  for (const part of parts) {
    const longer = `${whole} ${part}`.trim();
    if (longer.length > room) break;
    whole = longer;
  }
  if (whole) return whole;

  let cut = parts[0].slice(0, room - 1);
  // Never stop in the first half: a line cut that early says too little.
  const earliest = room * 0.5;

  let stops = positions(AFTER_PUNCTUATION, cut).filter((at) => at >= earliest);
  if (!stops.length) {
    const joins = positions(BEFORE_JOINING_WORD, cut);
    // Not two words after another joining word ("... and scented…"): step
    // back until the last piece is at least three words long.
    while (
      joins.length > 1 &&
      wordCount(cut.slice(joins[joins.length - 2], joins[joins.length - 1])) < 3
    ) {
      joins.pop();
    }
    stops = joins.slice(-1).filter((at) => at >= earliest);
  }

  if (stops.length) {
    cut = cut.slice(0, stops[stops.length - 1]);
  } else if (cut.includes(" ")) {
    cut = cut.slice(0, cut.lastIndexOf(" "));
  }
  return `${cut.replace(LOOSE_END, "")}…`;
};

// long:     the dish's longer text in this language (MenuItems.json, "long")
// short:    the card line, used only when there is no longer text
// price:    the number from the menu data
// currency: the menu's own word for the currency in this language
export const dishSearchLine = ({ long, short, price, currency, lang }) => {
  const text = long || short || "";
  const priceText = `${price} ${currency}`;
  const body = fit(text, SEARCH_LINE_LIMIT - priceText.length - 2);
  // The Arabic currency sign has a dot inside it; a second dot after it
  // looks like a slip.
  const end = lang === "ar" ? "" : ".";
  return `${body} ${priceText}${end}`.trim();
};
