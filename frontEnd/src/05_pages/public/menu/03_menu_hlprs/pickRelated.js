// Which other dishes a dish page links to, in its "More from the menu" row.
//
// The rule, for four places:
//   1. Three dishes from its own menu group: the ones that come right after
//      it, going round to the start of the group.
//   2. One dish from the next group on the menu. Which one depends on where
//      this dish sits in its own group, so a whole group does not all point at
//      the same dish.
//   3. A group with too few dishes (bread, drinks) is topped up from the
//      groups that follow.
//
// Nothing here is random, so a saved page is the same on every build. Step 2
// is also what gives a one-dish group a link leading to it: with steps 1 and
// 2 together, every dish page is linked from at least one other dish page.
//
// No imports on purpose: scripts/relatedDishes.test.mjs tests it in plain Node.
export const RELATED_COUNT = 4;

export const pickRelated = (categories, item, count = RELATED_COUNT) => {
  const groupIndex = categories.findIndex((category) =>
    category.menuItems.includes(item),
  );
  if (groupIndex === -1) return [];

  const picked = [];
  const add = (candidate) => {
    if (
      candidate !== item &&
      picked.length < count &&
      !picked.includes(candidate)
    ) {
      picked.push(candidate);
    }
  };

  const group = categories[groupIndex].menuItems;
  const position = group.indexOf(item);
  const addFromOwnGroup = (limit) => {
    for (let step = 1; step < group.length; step += 1) {
      if (picked.length >= limit) return;
      add(group[(position + step) % group.length]);
    }
  };

  addFromOwnGroup(categories.length > 1 ? count - 1 : count);

  for (let step = 1; step < categories.length; step += 1) {
    if (picked.length >= count) break;
    const next = categories[(groupIndex + step) % categories.length].menuItems;
    const start = step === 1 ? position % next.length : 0;
    for (let offset = 0; offset < next.length; offset += 1) {
      add(next[(start + offset) % next.length]);
    }
  }

  // Only when the rest of the menu ran out first.
  addFromOwnGroup(count);
  return picked;
};
