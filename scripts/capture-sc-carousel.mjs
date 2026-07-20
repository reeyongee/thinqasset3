/**
 * Capture McShannock "Our other services" carousel section evidence.
 */
import { chromium } from "playwright-core";
import { writeFileSync } from "node:fs";

const URL = "https://www.mcshannock.design/services/product-design";

async function captureViewport(page, width, height) {
  await page.setViewportSize({ width, height });
  await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 90000 });
  await page.waitForSelector(".sc-heading", { state: "attached", timeout: 30000 });
  await page.evaluate(() => {
    document.querySelector(".sc-heading")?.scrollIntoView({ block: "center" });
  });
  await page.waitForTimeout(1500);

  const data = await page.evaluate(async () => {
    const section = document.querySelector(".sc-heading")?.closest("section");
    if (!section) return { error: "section not found" };

    await new Promise((r) => setTimeout(r, 800));

    function probe(el) {
      if (!el) return null;
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return {
        tag: el.tagName.toLowerCase(),
        className: el.className,
        w: r.width,
        h: r.height,
        x: r.x,
        y: r.y,
        padding: `${cs.paddingTop} ${cs.paddingRight} ${cs.paddingBottom} ${cs.paddingLeft}`,
        margin: `${cs.marginTop} ${cs.marginRight} ${cs.marginBottom} ${cs.marginLeft}`,
        gap: cs.gap,
        fontSize: cs.fontSize,
        lineHeight: cs.lineHeight,
        fontWeight: cs.fontWeight,
        letterSpacing: cs.letterSpacing,
        color: cs.color,
        backgroundColor: cs.backgroundColor,
        borderRadius: cs.borderRadius,
        border: cs.border,
        transform: cs.transform,
        opacity: cs.opacity,
        visibility: cs.visibility,
        transition: cs.transition,
        gridTemplateColumns: cs.gridTemplateColumns,
        maxWidth: cs.maxWidth,
      };
    }

    const track = section.querySelector(".flex.touch-pan-y");
    const slides = [...section.querySelectorAll(".sc-slide")];
    const nav = section.querySelector(".sc-nav");
    const prevBtn = nav?.querySelector("button[aria-label='Previous slide']");
    const nextBtn = nav?.querySelector("button[aria-label='Next slide']");

    const preScroll = {
      heading: probe(section.querySelector(".sc-heading")),
      section: probe(section),
      track: probe(track),
      slide0: probe(slides[0]),
      card0: probe(slides[0]?.querySelector(".rounded-2xl, .lg\\:rounded-3xl") || slides[0]?.firstElementChild),
      nav: probe(nav),
    };

    // IO evidence for scroll reveal
    const ioLog = [];
    await new Promise((resolve) => {
      const targets = [
        section.querySelector(".sc-heading"),
        ...slides,
        nav,
      ].filter(Boolean);
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            ioLog.push({
              className: e.target.className?.slice?.(0, 80) || e.target.tagName,
              ratio: e.intersectionRatio,
              isIntersecting: e.isIntersecting,
              top: e.boundingClientRect.top,
            });
          }
        },
        { threshold: [0, 0.25, 0.5, 0.75, 1] },
      );
      targets.forEach((t) => io.observe(t));
      setTimeout(() => {
        io.disconnect();
        resolve();
      }, 500);
    });

    const postScrollSettled = {
      heading: {
        opacity: getComputedStyle(section.querySelector(".sc-heading")).opacity,
        visibility: getComputedStyle(section.querySelector(".sc-heading")).visibility,
        transform: getComputedStyle(section.querySelector(".sc-heading")).transform,
      },
      slide0: {
        opacity: getComputedStyle(slides[0]).opacity,
        visibility: getComputedStyle(slides[0]).visibility,
        transform: getComputedStyle(slides[0]).transform,
      },
      nav: {
        opacity: getComputedStyle(nav).opacity,
        visibility: getComputedStyle(nav).visibility,
        transform: getComputedStyle(nav).transform,
      },
    };

    // Click interactions
    const trackStyleBefore = track?.getAttribute("style");
    const transformBefore = track ? getComputedStyle(track).transform : null;

    nextBtn?.click();
    await new Promise((r) => setTimeout(r, 400));
    const afterNext = {
      trackStyle: track?.getAttribute("style"),
      transform: track ? getComputedStyle(track).transform : null,
      translateX: track?.style.transform,
    };

    nextBtn?.click();
    await new Promise((r) => setTimeout(r, 400));
    const afterNext2 = {
      trackStyle: track?.getAttribute("style"),
      transform: track ? getComputedStyle(track).transform : null,
    };

    prevBtn?.click();
    await new Promise((r) => setTimeout(r, 400));
    const afterPrev = {
      trackStyle: track?.getAttribute("style"),
      transform: track ? getComputedStyle(track).transform : null,
    };

    // Card hover
    const card = slides[0]?.querySelector(".rounded-2xl, [class*='rounded-2xl']");
    const cardBorderBefore = card ? getComputedStyle(card).borderColor : null;
    card?.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }));
    await new Promise((r) => setTimeout(r, 200));
    const cardHover = card
      ? {
          border: getComputedStyle(card).border,
          borderColor: getComputedStyle(card).borderColor,
          transition: getComputedStyle(card).transition,
        }
      : null;

    // Link hover on first card
    const link = slides[0]?.querySelector("a.group");
    const underline = link?.querySelector(".arrow-link-underline");
    link?.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }));
    await new Promise((r) => setTimeout(r, 350));
    const linkHover = underline
      ? {
          width: getComputedStyle(underline).width,
          transition: getComputedStyle(underline).transition,
        }
      : null;
    const arrowHover = link?.querySelector("div.transition-transform");
    const arrowTransform = arrowHover
      ? getComputedStyle(arrowHover).transform
      : null;

    // GSAP globals on section elements
    const gsapTargets = {};
    for (const sel of [".sc-heading", ".sc-slide", ".sc-nav"]) {
      const el = section.querySelector(sel) || section.querySelectorAll(sel)[0];
      if (el && window.gsap) {
        gsapTargets[sel] = {
          hasGsap: true,
          inlineStyle: el.getAttribute("style"),
        };
      }
    }

    // Embla detection
    const emblaDetected = {
      emblaGlobal: typeof window.EmblaCarousel !== "undefined",
      trackDataAttrs: track ? { ...track.dataset } : null,
      trackClasses: track?.className,
      slideCount: slides.length,
      slideClasses: slides[0]?.className,
    };

    // Card internals first slide
    const cardInner = slides[0];
    const imageWrap = cardInner?.querySelector("[class*='aspect-']");
    const icon = cardInner?.querySelector(".size-6 img, [class*='size-6'] img");
    const title = cardInner?.querySelector("h3");
    const desc = cardInner?.querySelector("p.flex-1");
    const cardLink = cardInner?.querySelector("a.group");

    return {
      preScroll,
      postScrollSettled,
      ioLog,
      carousel: {
        transformBefore,
        afterNext,
        afterNext2,
        afterPrev,
        emblaDetected,
      },
      interactions: { cardBorderBefore, cardHover, linkHover, arrowTransform },
      cardAnatomy: {
        imageWrap: probe(imageWrap),
        icon: probe(icon),
        title: probe(title),
        desc: probe(desc),
        link: probe(cardLink),
      },
      slideWidths: slides.map((s, i) => ({
        i,
        w: s.getBoundingClientRect().width,
        mr: getComputedStyle(s).marginRight,
      })),
      sectionHTML: section.outerHTML.slice(0, 2500),
    };
  });

  return { width, height, ...data };
}

const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage();
const results = [];
for (const [w, h] of [
  [1920, 900],
  [768, 900],
  [500, 700],
]) {
  results.push(await captureViewport(page, w, h));
}
await browser.close();

// Fetch page scripts list
const scriptRes = await fetch(URL);
const html = await scriptRes.text();
const scripts = [...html.matchAll(/src="(\/_next\/static\/chunks\/[^"]+\.js)"/g)].map((m) => m[1]);

writeFileSync(
  "scripts/mcshannock-sc-carousel-capture.json",
  JSON.stringify({ url: URL, scripts: scripts.slice(0, 40), viewports: results }, null, 2),
);
console.log("Wrote scripts/mcshannock-sc-carousel-capture.json");
