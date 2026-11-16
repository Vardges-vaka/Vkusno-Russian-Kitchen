// vercel.json puts five security headers on every address.
//
// The Content-Security-Policy is kept to rules that cannot stop anything the
// site loads: who may frame the site, where a <base> tag or a form may point,
// and no plugins. It has NO list of allowed outside addresses, on purpose.
// A browser enforces such a list silently, and only on the live site: the day
// Google Maps, Google Analytics or Clarity starts loading a file from a new
// address, the map or the statistics would stop with nobody watching. Adding
// a new tool would break the same way. For a site with no login and no forms
// that risk is worth more than the list. If a list is ever wanted, it has to
// be tested on the contact map, the order window and both statistics tools.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const config = JSON.parse(
  await readFile(new URL("../vercel.json", import.meta.url), "utf8"),
);

const everywhere = Object.fromEntries(
  config.headers
    .filter((rule) => rule.source === "/(.*)" && !rule.has)
    .flatMap((rule) => rule.headers)
    .map(({ key, value }) => [key.toLowerCase(), value]),
);

const policy = Object.fromEntries(
  (everywhere["content-security-policy"] ?? "")
    .split(";")
    .map((part) => part.trim().split(/\s+/))
    .filter(([name]) => name)
    .map(([name, ...values]) => [name, values]),
);

test("every address gets the five security headers", () => {
  const expected = [
    "x-content-type-options",
    "referrer-policy",
    "x-frame-options",
    "permissions-policy",
    "content-security-policy",
  ];
  for (const name of expected) {
    assert.ok(everywhere[name], `${name} is missing from vercel.json`);
  }
});

test("the policy has the four rules that cannot block a file", () => {
  assert.deepEqual(policy["frame-ancestors"], ["'self'"]);
  assert.deepEqual(policy["base-uri"], ["'self'"]);
  assert.deepEqual(policy["form-action"], ["'self'"]);
  assert.deepEqual(policy["object-src"], ["'none'"]);
});

test("the policy does not list where scripts, styles, pictures or data may come from", () => {
  const lists = [
    "default-src",
    "script-src",
    "script-src-elem",
    "style-src",
    "img-src",
    "font-src",
    "connect-src",
    "frame-src",
    "worker-src",
    "sandbox",
  ];
  for (const name of lists) {
    assert.equal(
      policy[name],
      undefined,
      `${name} can silently block Google Maps or the statistics tools - see the note at the top of this file`,
    );
  }
});

test("the site does not ask for the camera, microphone or location", () => {
  const value = everywhere["permissions-policy"] ?? "";
  for (const feature of ["camera", "microphone", "geolocation"]) {
    assert.match(value, new RegExp(`${feature}=\\(\\)`), feature);
  }
});
