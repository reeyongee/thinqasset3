import { chromium } from "playwright-core";

const URL = "https://www.mcshannock.design/services/product-design";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({ viewport: { width: 1920, height: 900 } });
await page.goto(URL, { waitUntil: "domcontentloaded" });

const initial = await page.evaluate(() => {
  const section = document.querySelector(".sc-heading")?.closest("section");
  const article = document.querySelector("article");
  const sections = article ? [...article.querySelectorAll(":scope > section")] : [];
  const allSections = [...document.querySelectorAll("section")];
  const idx = allSections.indexOf(section);
  const read = (sel) => {
    const el = section?.querySelector(sel);
    if (!el) return null;
    const cs = getComputedStyle(el);
    return { opacity: cs.opacity, visibility: cs.visibility, transform: cs.transform, display: cs.display };
  };
  return {
    inArticle: article?.contains(section),
    articleSectionCount: sections.length,
    pageSectionIndex: idx,
    beforeInView: {
      heading: read(".sc-heading"),
      slide0: read(".sc-slide"),
      nav: read(".sc-nav"),
    },
  };
});

// scroll until section top hits 88% viewport
await page.evaluate(() => {
  const section = document.querySelector(".sc-heading")?.closest("section");
  if (!section) return;
  const target = section.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.88;
  window.scrollTo(0, target);
});
await page.waitForTimeout(50);
const atTrigger = await page.evaluate(() => {
  const section = document.querySelector(".sc-heading")?.closest("section");
  const read = (sel) => {
    const el = section?.querySelector(sel);
    if (!el) return null;
    const cs = getComputedStyle(el);
    return { opacity: cs.opacity, visibility: cs.visibility, transform: cs.transform };
  };
  return { heading: read(".sc-heading"), slide0: read(".sc-slide"), nav: read(".sc-nav") };
});
await page.waitForTimeout(1000);
const settled = await page.evaluate(() => {
  const section = document.querySelector(".sc-heading")?.closest("section");
  const read = (sel) => {
    const el = section?.querySelector(sel);
    if (!el) return null;
    const cs = getComputedStyle(el);
    return { opacity: cs.opacity, visibility: cs.visibility, transform: cs.transform, style: el.getAttribute("style") };
  };
  return { heading: read(".sc-heading"), slide0: read(".sc-slide"), slide2: section?.querySelectorAll(".sc-slide")[2] ? read(".sc-slide:nth-child(3)") : null, nav: read(".sc-nav") };
});

console.log(JSON.stringify({ initial, atTrigger, settled }, null, 2));
await browser.close();
