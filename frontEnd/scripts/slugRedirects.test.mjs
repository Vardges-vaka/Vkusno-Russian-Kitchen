import assert from "node:assert/strict";
import test from "node:test";
import { buildSlugRedirects, withSlugRedirects } from "./generateSlugRedirects.mjs";

const borscht = {
  id: 13,
  slug: { en: "russian-borscht", ru: "borshch", ar: "borsh-rusi" },
};

const sameName = {
  id: 2,
  slug: { en: "plov", ru: "plov", ar: "plov" },
};

const redirectTo = (rules, source) => rules.find((rule) => rule.source === source)?.destination;

test("a wrong-language slug redirects to that language's own slug", () => {
  const rules = buildSlugRedirects([borscht, sameName]);
  assert.equal(redirectTo(rules, "/ru/menu/russian-borscht"), "/ru/menu/borshch");
  assert.equal(redirectTo(rules, "/ru/menu/borsh-rusi"), "/ru/menu/borshch");
  assert.equal(redirectTo(rules, "/en/menu/borshch"), "/en/menu/russian-borscht");
  assert.equal(redirectTo(rules, "/ar/menu/russian-borscht"), "/ar/menu/borsh-rusi");
  assert.equal(redirectTo(rules, "/en/menu/russian-borscht"), undefined);
  assert.equal(redirectTo(rules, "/ru/menu/borshch"), undefined);
  assert.equal(redirectTo(rules, "/ru/menu/plov"), undefined);
  assert.equal(rules.every((rule) => rule.permanent), true);
  assert.equal(new Set(rules.map((rule) => rule.source)).size, rules.length);
});

test("slug redirects are appended and hand-written rules stay", () => {
  const config = {
    redirects: [
      { source: "/menu", destination: "/en/menu", permanent: true },
      { source: "/ru/menu/stale", destination: "/ru/menu/old", permanent: true },
    ],
  };
  const next = withSlugRedirects(config, [borscht]);
  assert.equal(next.redirects[0].source, "/menu");
  assert.equal(next.redirects.some((rule) => rule.source === "/ru/menu/stale"), false);
  assert.equal(redirectTo(next.redirects, "/ru/menu/russian-borscht"), "/ru/menu/borshch");
});
