/**
 * Delta audit: McShannock FAQs + Related vs ThinqAsset implementation.
 * Usage: node scripts/audit-sd-faqs-related.mjs
 */
import { chromium } from "playwright-core";

const REF = "https://www.mcshannock.design/services/product-design";
const IMPL = "http://localhost:3000/services/global-regulated-fund-platform";

async function measure(page, label) {
  return page.evaluate((pageLabel) => {
    const article = document.querySelector("article");
    const sections = article ? [...article.querySelectorAll(":scope > section")] : [];
    const faqs = sections[4];
    const related = sections[5];

    function styles(el) {
      if (!el) return null;
      const cs = getComputedStyle(el);
      return {
        w: el.getBoundingClientRect().width,
        h: el.getBoundingClientRect().height,
        paddingTop: cs.paddingTop,
        paddingBottom: cs.paddingBottom,
        bg: cs.backgroundColor,
      };
    }

    function textStyles(sel, root) {
      const el = root?.querySelector(sel);
      if (!el) return null;
      const cs = getComputedStyle(el);
      return {
        fontSize: cs.fontSize,
        lineHeight: cs.lineHeight,
        fontWeight: cs.fontWeight,
      };
    }

    const faqGrid = faqs?.querySelector(".grid");
    const faqHeadline = faqs?.querySelector(".sd-faqs-headline");
    const faqItems = faqs ? [...faqs.querySelectorAll(".faq-item")] : [];
    const faqItem0 = faqItems[0];
    const faqQuestion = faqItem0?.querySelector(".flex span");
    const faqAnswer = faqItem0?.querySelector(".overflow-hidden p");
    const faqIcon = faqItem0?.querySelector(".rounded-full");

    const relatedHeader = related?.querySelector(".mb-10, [class*='mb-10']");
    const relatedGrid = related?.querySelector(".sd-related-grid .grid");
    const relatedCols = relatedGrid
      ? [...relatedGrid.children].map((col) => ({
          w: col.getBoundingClientRect().width,
          pt: getComputedStyle(col).paddingTop,
        }))
      : [];
    const cardImg = related?.querySelector(".card-img");
    const cardDesc = related?.querySelector(".card-desc");
    const relatedLink = related?.querySelector(".sd-related-link");

    return {
      pageLabel,
      sectionCount: sections.length,
      faqs: {
        section: styles(faqs),
        grid: faqGrid
          ? {
              gap: getComputedStyle(faqGrid).gap,
              cols: getComputedStyle(faqGrid).gridTemplateColumns,
            }
          : null,
        headline: textStyles(".sd-faqs-headline", faqs),
        itemCount: faqItems.length,
        item0OpenH: faqItem0?.getBoundingClientRect().height,
        question: faqQuestion
          ? {
              fontSize: getComputedStyle(faqQuestion).fontSize,
              lineHeight: getComputedStyle(faqQuestion).lineHeight,
            }
          : null,
        answer: faqAnswer
          ? {
              fontSize: getComputedStyle(faqAnswer).fontSize,
              lineHeight: getComputedStyle(faqAnswer).lineHeight,
            }
          : null,
        icon: faqIcon
          ? {
              w: faqIcon.getBoundingClientRect().width,
              h: faqIcon.getBoundingClientRect().height,
            }
          : null,
        panelClass: faqItem0?.querySelector(".grid")?.className.includes("1fr"),
      },
      related: {
        section: styles(related),
        headline: textStyles(".sd-related-headline", related),
        link: relatedLink
          ? {
              fontSize: getComputedStyle(relatedLink).fontSize,
              w: relatedLink.getBoundingClientRect().width,
            }
          : null,
        gridGap: relatedGrid ? getComputedStyle(relatedGrid).gap : null,
        cols: relatedCols,
        cardImg: cardImg
          ? {
              w: cardImg.getBoundingClientRect().width,
              h: cardImg.getBoundingClientRect().height,
              radius: getComputedStyle(cardImg.parentElement).borderRadius,
            }
          : null,
        cardDesc: cardDesc
          ? {
              fontSize: getComputedStyle(cardDesc).fontSize,
              lineHeight: getComputedStyle(cardDesc).lineHeight,
            }
          : null,
        cardCount: related?.querySelectorAll(".card-link").length ?? 0,
      },
    };
  }, label);
}

async function probeAccordion(page) {
  return page.evaluate(async () => {
    const faqs = document.querySelectorAll("article > section")[4];
    const items = [...faqs.querySelectorAll(".faq-item")];
    const item0 = items[0];
    const item1 = items[1];
    const row1 = item1?.querySelector(".flex");

    const h0Open = item0?.getBoundingClientRect().height;
    const panel0 = item0?.querySelector(".grid");
    const icon0 = item0?.querySelector(".rounded-full");

    row1?.click();
    await new Promise((r) => setTimeout(r, 250));

    const h0Closed = item0?.getBoundingClientRect().height;
    const h1Open = item1?.getBoundingClientRect().height;
    const panel1Open = item1?.querySelector(".grid")?.className.includes("1fr");
    const icon1Open = item1?.querySelector(".rounded-full")?.className.includes("rotate-0");

    row1?.click();
    await new Promise((r) => setTimeout(r, 250));

    const allClosed = items.every(
      (item) => !item.querySelector(".grid")?.className.includes("1fr"),
    );

    return {
      defaultOpen: panel0?.className.includes("1fr"),
      exclusiveOpen: panel1Open,
      reclickClosesAll: allClosed,
      heights: { h0Open, h0Closed, h1Open },
      iconOpen: icon1Open,
    };
  });
}

async function scrollReveal(page) {
  const faqs = await page.$(".sd-faqs-headline");
  if (faqs) {
    await faqs.scrollIntoViewIfNeeded();
    await page.waitForTimeout(900);
  }
  return page.evaluate(() => {
    const headline = document.querySelector(".sd-faqs-headline");
    const cs = headline ? getComputedStyle(headline) : null;
    return {
      opacity: cs?.opacity,
      visibility: cs?.visibility,
      transform: cs?.transform,
    };
  });
}

async function runViewport(browser, width, height) {
  const context = await browser.newContext({ viewport: { width, height } });
  const page = await context.newPage();

  await page.goto(REF, { waitUntil: "domcontentloaded", timeout: 90000 });
  await page.waitForSelector(".sd-faqs-headline", { timeout: 30000 });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);
  const ref = await measure(page, "mcshannock");
  const refAccordion =
    width >= 768 ? await probeAccordion(page) : null;
  const refReveal = await scrollReveal(page);

  await page.goto(IMPL, { waitUntil: "domcontentloaded", timeout: 90000 });
  await page.waitForSelector(".sd-faqs-headline", { timeout: 30000 });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);
  const impl = await measure(page, "thinqasset");
  const implAccordion =
    width >= 768 ? await probeAccordion(page) : null;
  const implReveal = await scrollReveal(page);

  await context.close();
  return { width, height, ref, impl, refAccordion, implAccordion, refReveal, implReveal };
}

const browser = await chromium.launch({ channel: "chrome", headless: true });
const viewports = [
  [1920, 660],
  [768, 900],
  [500, 660],
];
const results = [];
for (const [w, h] of viewports) {
  results.push(await runViewport(browser, w, h));
}
await browser.close();

const output = {
  auditDate: "2026-07-15",
  reference: REF,
  implementation: IMPL,
  viewports: results,
};

import { writeFileSync } from "node:fs";
writeFileSync(
  "scripts/thinq-sd-faqs-related-delta.json",
  JSON.stringify(output, null, 2),
);
console.log("Wrote scripts/thinq-sd-faqs-related-delta.json");
