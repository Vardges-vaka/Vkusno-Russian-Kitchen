import assert from "node:assert/strict";
import test from "node:test";
import { createSitemap } from "./generateSitemap.mjs";
import { checkCareersData } from "./checkTranslations.mjs";
import { CAREERS_MODULE, withCareersData } from "./readCareersData.mjs";
import { jobDescriptionHtml } from "../src/05_pages/public/careers/03_careers_hlprs/jobDescriptionHtml.js";
import {
  generalSubject,
  jobSubject,
  mailtoHref,
  whatsappHref,
} from "../src/05_pages/public/careers/03_careers_hlprs/applyLinks.js";

const LANGUAGES = ["en", "ru", "ar"];

const common = {
  brand: "Vkusno",
  applyEmail: "careers@vkusno.ae",
  applyWhatsApp: null,
  location: { en: "Dubai, UAE", ru: "Дубай, ОАЭ", ar: "دبي، الإمارات" },
  about: { en: "About", ru: "О нас", ar: "عنّا" },
  offer: { en: ["Visa"], ru: ["Виза"], ar: ["تأشيرة"] },
  hours: null,
  probation: null,
};

const fixtureJobs = [
  {
    id: "head-chef",
    title: { en: "Head Chef", ru: "Шеф-повар", ar: "رئيس الطهاة" },
    summary: {
      en: "Lead the kitchen <script>alert(1)</script>",
      ru: "Кухня",
      ar: "المطبخ",
    },
    duties: { en: ["Cook"], ru: ["Готовить"], ar: ["اطبخ"] },
    mustHave: { en: ["English"], ru: ["Английский"], ar: ["الإنجليزية"] },
    niceToHave: { en: [], ru: [], ar: [] },
    employmentType: "FULL_TIME",
    kitchens: ["arjan"],
    openings: null,
    datePosted: "2026-11-09",
  },
  {
    id: "packer",
    title: { en: "Packer", ru: "Упаковщик", ar: "موظف تعبئة" },
    summary: { en: "Pack the food", ru: "Упаковка", ar: "تعبئة" },
    duties: { en: ["Pack"], ru: ["Упакуй"], ar: ["عبّئ"] },
    mustHave: { en: ["Careful"], ru: ["Внимательность"], ar: ["الدقة"] },
    niceToHave: { en: [], ru: [], ar: [] },
    employmentType: "FULL_TIME",
    kitchens: null,
    openings: 2,
    datePosted: "2026-11-09",
  },
];

const fixturePlugin = {
  name: "careers-fixture",
  enforce: "pre",
  transform(code, id) {
    if (!id.replaceAll("\\", "/").endsWith(CAREERS_MODULE)) return null;
    return [
      'export const CAREERS_DATA_MODE = "live";',
      `export const CAREERS_COMMON = ${JSON.stringify(common)};`,
      `export const JOBS = ${JSON.stringify(fixtureJobs)};`,
    ].join("\n");
  },
};

test("the generated careers file passes the live shape rules", async () => {
  await withCareersData(async (data, server) => {
    const { BRANCHES } = await server.ssrLoadModule(
      "/src/05_pages/public/contact/04_contact_const/BRANCHES.js",
    );
    const problems = checkCareersData(data, BRANCHES.map((branch) => branch.id));
    assert.deepEqual(problems, []);
    assert.equal(data.CAREERS_DATA_MODE, "live");
    assert.ok(Array.isArray(data.JOBS));
  });
});

test("a preview file is refused unless the local override is set", () => {
  const preview = { CAREERS_DATA_MODE: "preview", CAREERS_COMMON: common, JOBS: [] };
  const refused = checkCareersData(preview, ["arjan"], {});
  assert.ok(refused.some((message) => message.includes("PREVIEW file")));
  const allowed = checkCareersData(preview, ["arjan"], { CAREERS_ALLOW_PREVIEW: "1" });
  assert.equal(allowed.some((message) => message.includes("PREVIEW file")), false);
});

test("job lookup, sitemap alternates and an empty job list", async () => {
  await withCareersData(async (_data, server) => {
    const { findJobById } = await server.ssrLoadModule(
      "/src/05_pages/public/careers/03_careers_hlprs/findJob.js",
    );
    const { JOBS } = await server.ssrLoadModule(CAREERS_MODULE);
    assert.equal(findJobById("head-chef")?.id, "head-chef");
    assert.equal(findJobById("packer")?.id, "packer");
    assert.equal(findJobById("no-such-job"), null);

    const sitemap = createSitemap([], JOBS);
    for (const id of ["head-chef", "packer"]) {
      for (const lang of LANGUAGES) {
        assert.ok(sitemap.includes(`<loc>https://vkusno.ae/${lang}/careers/${id}</loc>`));
        assert.ok(
          sitemap.includes(`hreflang="${lang}" href="https://vkusno.ae/${lang}/careers/${id}"`),
        );
      }
      assert.ok(sitemap.includes(`hreflang="x-default" href="https://vkusno.ae/en/careers/${id}"`));
    }
  }, { plugins: [fixturePlugin] });

  const empty = createSitemap([], []);
  assert.equal((empty.match(/<loc>https:\/\/vkusno\.ae\/(?:en|ru|ar)\/careers<\/loc>/g) ?? []).length, 3);
  assert.equal(/\/careers\/[a-z0-9]/.test(empty), false);
});

test("the email subject stays English and the body keeps the page language", () => {
  const job = fixtureJobs[0];
  for (const body of ["Hello", "Здравствуйте!\n\nХочу", "مرحبًا،\n\nأرغب"]) {
    const href = mailtoHref(common.applyEmail, jobSubject(job, common), body);
    const params = new URLSearchParams(href.slice(href.indexOf("?") + 1));
    assert.equal(params.get("subject"), "Head Chef – Vkusno");
    assert.equal(params.get("body"), body.replace(/\r?\n/g, "\r\n"));
    assert.equal(href.startsWith("mailto:careers@vkusno.ae?subject="), true);
    assert.equal(href.includes("+"), false);
    assert.ok(href.includes("%20"));
  }
  assert.equal(generalSubject(common), "General application – Vkusno");
  assert.equal(whatsappHref(null, "Hello"), null);
});

test("job posting data has no pay and only the named kitchen", async () => {
  await withCareersData(async (_data, server) => {
    const { jobPostingNode } = await server.ssrLoadModule("/src/04_hlprs/jsonLd.js");
    const { BRANCHES } = await server.ssrLoadModule(
      "/src/05_pages/public/contact/04_contact_const/BRANCHES.js",
    );
    const job = fixtureJobs[0];
    const html = jobDescriptionHtml(job, common, "en", (key) => key);
    assert.equal(html.includes("<script>"), false);
    assert.match(html, /&lt;script&gt;/);
    const node = jobPostingNode(job, "en", { descriptionHtml: html, branches: BRANCHES });
    assert.equal(node.title, "Head Chef");
    assert.equal(node.description, html);
    assert.equal(node.datePosted, "2026-11-09");
    assert.equal(node.employmentType, "FULL_TIME");
    assert.equal(node.hiringOrganization.name, "Vkusno");
    assert.equal(node.directApply, false);
    assert.equal("baseSalary" in node, false);
    assert.equal(node.jobLocation.length, 1);
    assert.equal(node.jobLocation[0].address.addressCountry, "AE");
  });
});
