import { chromium } from "playwright-core";

const URL = "https://www.mcshannock.design/services/product-design";

const page = await chromium.launch({ channel: "chrome", headless: true }).then(b => b.newPage());
await page.setViewportSize({ width: 1920, height: 900 });
await page.goto(URL, { waitUntil: "domcontentloaded" });

const pre = await page.evaluate(() => {
  const section = document.querySelector(".sc-heading")?.closest("section");
  window.scrollTo(0, 0);
  const heading = section?.querySelector(".sc-heading");
  const slides = [...section?.querySelectorAll(".sc-slide") || []];
  const nav = section?.querySelector(".sc-nav");
  const read = (el) => el ? ({
    opacity: getComputedStyle(el).opacity,
    visibility: getComputedStyle(el).visibility,
    transform: getComputedStyle(el).transform,
    style: el.getAttribute("style"),
  }) : null;
  return {
    articleIndex: [...document.querySelectorAll("article > section")].indexOf(section),
    preScroll: { heading: read(heading), slide0: read(slides[0]), slide1: read(slides[1]), nav: read(nav) },
  };
});

await page.evaluate(() => document.querySelector(".sc-heading")?.scrollIntoView({ block: "center" }));
await page.waitForTimeout(1200);

const post = await page.evaluate(() => {
  const section = document.querySelector(".sc-heading")?.closest("section");
  const heading = section?.querySelector(".sc-heading");
  const slides = [...section?.querySelectorAll(".sc-slide") || []];
  const nav = section?.querySelector(".sc-nav");
  const read = (el) => el ? ({
    opacity: getComputedStyle(el).opacity,
    visibility: getComputedStyle(el).visibility,
    transform: getComputedStyle(el).transform,
    style: el.getAttribute("style"),
  }) : null;
  const btn = section?.querySelector(".sc-nav button");
  const btnCs = btn ? getComputedStyle(btn) : null;
  const maxW228 = section?.querySelector(".max-w-228");
  const viewport = section?.querySelector(".overflow-hidden");
  return {
    postScroll: { heading: read(heading), slide0: read(slides[0]), nav: read(nav) },
    maxW228: maxW228 ? getComputedStyle(maxW228).maxWidth : null,
    viewportPad: viewport ? getComputedStyle(viewport).padding : null,
    navBtn: btn ? { w: btn.getBoundingClientRect().width, h: btn.getBoundingClientRect().height, border: btnCs.border, radius: btnCs.borderRadius, bg: btnCs.backgroundColor } : null,
    primaryHover: getComputedStyle(document.documentElement).getPropertyValue('--color-primary') || 'n/a',
  };
});

// real hover on card and link
await page.hover(".sc-slide:first-child .rounded-2xl, .sc-slide:first-child [class*='rounded-2xl']");
await page.waitForTimeout(200);
const cardHover = await page.evaluate(() => {
  const card = document.querySelector(".sc-slide")?.querySelector("[class*='rounded-2xl']");
  return card ? { borderColor: getComputedStyle(card).borderColor, border: getComputedStyle(card).border } : null;
});
await page.hover(".sc-slide:first-child a.group");
await page.waitForTimeout(350);
const linkHover = await page.evaluate(() => {
  const u = document.querySelector(".sc-slide a.group .arrow-link-underline");
  const arrow = document.querySelector(".sc-slide a.group div.transition-transform");
  return { underlineW: u ? getComputedStyle(u).width : null, arrowT: arrow ? getComputedStyle(arrow).transform : null };
});

console.log(JSON.stringify({ pre, post, cardHover, linkHover }, null, 2));
await page.context().browser()?.close();
