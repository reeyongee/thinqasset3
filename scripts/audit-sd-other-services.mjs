/**
 * Delta audit: McShannock vs ThinqAsset "Our other services" carousel.
 */
import { chromium } from "playwright-core";
import { writeFileSync } from "node:fs";

const REF = "https://www.mcshannock.design/services/product-design";
const IMPL = "http://localhost:3000/services/global-regulated-fund-platform";

async function measure(page) {
  return page.evaluate(() => {
    const section = document.querySelector(".sc-heading")?.closest("section");
    if (!section) return { error: "no section" };

    section.scrollIntoView({ block: "center" });
    const cs = (el) => (el ? getComputedStyle(el) : null);
    const r = (el) => (el ? el.getBoundingClientRect() : null);

    const heading = section.querySelector(".sc-heading");
    const slide0 = section.querySelector(".sc-slide");
    const card = slide0?.querySelector("[class*='rounded-2xl']");
    const imgWrap = slide0?.querySelector("[class*='aspect-']");
    const title = slide0?.querySelector("h3");
    const desc = slide0?.querySelector("p.flex-1");
    const nav = section.querySelector(".sc-nav");
    const btn = nav?.querySelector("button");
    const track = section.querySelector(".flex.touch-pan-y");
    const viewport = section.querySelector(".overflow-hidden.px-4, .overflow-hidden");

    return {
      section: {
        h: r(section)?.height,
        py: `${cs(section)?.paddingTop} / ${cs(section)?.paddingBottom}`,
        bg: cs(section)?.backgroundColor,
      },
      heading: {
        fs: cs(heading)?.fontSize,
        lh: cs(heading)?.lineHeight,
        fw: cs(heading)?.fontWeight,
        maxW: cs(section.querySelector(".max-w-228"))?.maxWidth,
      },
      slide: {
        w: r(slide0)?.width,
        mr: cs(slide0)?.marginRight,
        count: section.querySelectorAll(".sc-slide").length,
      },
      card: {
        pad: cs(card)?.padding,
        radius: cs(card)?.borderRadius,
        border: cs(card)?.borderColor,
      },
      img: { w: r(imgWrap)?.width, h: r(imgWrap)?.height },
      title: { fs: cs(title)?.fontSize, lh: cs(title)?.lineHeight },
      desc: { fs: cs(desc)?.fontSize, lh: cs(desc)?.lineHeight },
      nav: {
        mt: cs(nav)?.marginTop,
        gap: cs(nav)?.gap,
        btnW: r(btn)?.width,
        btnH: r(btn)?.height,
      },
      viewportPad: cs(viewport)?.paddingLeft,
      trackTransform: cs(track)?.transform,
      inArticle: document.querySelector("article")?.contains(section),
    };
  });
}

async function probeInteractions(page) {
  await page.evaluate(() =>
    document.querySelector(".sc-heading")?.scrollIntoView({ block: "center" }),
  );
  await page.waitForTimeout(600);

  const carousel = await page.evaluate(async () => {
    const track = document.querySelector(".flex.touch-pan-y");
    const next = document.querySelector(
      'button[aria-label="Next slide"]',
    );
    const before = track?.getAttribute("style");
    next?.click();
    await new Promise((r) => setTimeout(r, 400));
    const after1 = track?.getAttribute("style");
    next?.click();
    await new Promise((r) => setTimeout(r, 400));
    const after2 = track?.getAttribute("style");
    return { before, after1, after2 };
  });

  await page.evaluate(() =>
    document.querySelector(".sc-slide")?.scrollIntoView({ block: "center" }),
  );
  await page.waitForTimeout(300);
  const cardHover = await page.evaluate(() => {
    const card = document.querySelector(".sc-slide [class*='rounded-2xl']");
    card?.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }));
    return card ? getComputedStyle(card).borderColor : null;
  });

  return { carousel, cardHover };
}

async function runViewport(browser, width, height) {
  const page = await browser.newPage({ viewport: { width, height } });

  await page.goto(REF, { waitUntil: "domcontentloaded", timeout: 90000 });
  await page.waitForSelector(".sc-heading", { state: "attached" });
  const ref = await measure(page);
  const refIx = await probeInteractions(page);

  await page.goto(IMPL, { waitUntil: "domcontentloaded", timeout: 90000 });
  await page.waitForSelector(".sc-heading", { state: "attached" });
  const impl = await measure(page);
  const implIx = await probeInteractions(page);

  await page.close();
  return { width, height, ref, impl, refIx, implIx };
}

const browser = await chromium.launch({ channel: "chrome", headless: true });
const viewports = [];
for (const [w, h] of [
  [1920, 900],
  [768, 900],
  [500, 700],
]) {
  viewports.push(await runViewport(browser, w, h));
}
await browser.close();

const output = {
  auditDate: "2026-07-15",
  reference: REF,
  implementation: IMPL,
  matched: {
    layout: "bg-black symmetric py 48/64/96, max-w-228 headline, embla viewport px 16/24/136",
    slides: "sc-slide widths 340/360/608, mr 16/20/24, aspect 542/304 image",
    gsap: "single timeline @ top 88%: heading y40/1s, slides x60/0.8s stagger 0.1, nav y20/0.6s",
    embla: "loop, align start, slidesToScroll 1, dragFree false, containScroll trimSnaps",
    interactions: "card border hover primary blue, nav prev/next, translate3d track",
    placement: "outside article after related work",
  },
  intentionalDeltas: {
    slideCount: "2 other pillars vs 6 McShannock design services",
    icons: "OfferingIcon SVG vs Sanity 32px icons",
    images: "Pillar stock PNGs vs Sanity photography",
    hoverBorder: "hover:border-[#444fe9] vs hover:border-primary (same colour)",
    copy: "ThinqAsset pillar blurbs vs McShannock service descriptions",
    headline: "Our other services (same label; maps to platforms)",
    prefersReducedMotion: "Guard added",
    pageTransitions: "TransitionLink on Learn more",
  },
  viewports,
};

writeFileSync(
  "scripts/thinq-sd-other-services-delta.json",
  JSON.stringify(output, null, 2),
);
console.log("Wrote scripts/thinq-sd-other-services-delta.json");
