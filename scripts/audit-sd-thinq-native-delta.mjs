/**
 * Delta audit: ThinqAsset service detail reskin vs site reference pages.
 * Documents intentional remaining deltas vs McShannock CRS reference.
 */
import { chromium } from "playwright-core";
import { writeFileSync } from "node:fs";

const SUB_OFFERING = "http://localhost:3000/services/fund-as-a-service";
const PILLAR_HUB = "http://localhost:3000/services/global-regulated-fund-platform";
const REF_HOME = "http://localhost:3000/";
const REF_ABOUT = "http://localhost:3000/about";
const REF_SERVICES = "http://localhost:3000/services";

async function measureDetail(page) {
  return page.evaluate(() => {
    const cs = (el) => (el ? getComputedStyle(el) : null);
    const pick = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const s = cs(el);
      return {
        fontSize: s.fontSize,
        lineHeight: s.lineHeight,
        fontWeight: s.fontWeight,
        fontFamily: s.fontFamily.split(",")[0],
        color: s.color,
      };
    };

    return {
      h1: pick(".sd-headline"),
      h2Offerings: pick(".sd-offerings-headline"),
      h2Rationale: pick(".sd-rationale-headline"),
      h2Faqs: pick(".sd-faqs-headline"),
      h2Related: pick(".sd-related-headline"),
      h2Carousel: pick(".sc-heading"),
      body: pick(".sd-description"),
      cardDesc: pick(".card-desc"),
      breadcrumb: pick(".sd-breadcrumb"),
      eyebrow: pick(".services-eyebrow"),
      cta: pick(".hero-btn"),
      container: cs(document.querySelector(".sd-container"))?.maxWidth,
      glass: cs(document.querySelector(".sd-glass"))?.backgroundColor,
      accentIcon: cs(document.querySelector(".sd-offering-icon"))?.color,
      carouselHoverReady: !!document.querySelector(".sc-slide-card"),
      progressiveBlur: !!document.querySelector("[data-progressive-blur]"),
    };
  });
}

async function measureReference(page, url, selectors) {
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
  return page.evaluate((sels) => {
    const cs = (el) => (el ? getComputedStyle(el) : null);
    const out = {};
    for (const [key, sel] of Object.entries(sels)) {
      const el = document.querySelector(sel);
      if (!el) {
        out[key] = null;
        continue;
      }
      const s = cs(el);
      out[key] = {
        fontSize: s.fontSize,
        lineHeight: s.lineHeight,
        fontWeight: s.fontWeight,
        fontFamily: s.fontFamily.split(",")[0],
      };
    }
    return out;
  }, selectors);
}

async function probeCarouselHover(page) {
  await page.evaluate(() =>
    document.querySelector(".sc-slide-card")?.scrollIntoView({ block: "center" }),
  );
  await page.waitForTimeout(300);
  return page.evaluate(() => {
    const card = document.querySelector(".sc-slide-card");
    card?.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }));
    return card ? getComputedStyle(card).borderColor : null;
  });
}

const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto(SUB_OFFERING, { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForSelector(".sd-headline", { state: "attached" });
const subOffering = await measureDetail(page);
const carouselHover = await probeCarouselHover(page);

await page.goto(PILLAR_HUB, { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForSelector(".sd-headline", { state: "attached" });
const pillarHub = await measureDetail(page);

const homeRef = await measureReference(page, REF_HOME, {
  heroHeadline: ".hero-headline, [class*='hero'] h1",
  heroBtn: ".hero-btn",
});

const aboutRef = await measureReference(page, REF_ABOUT, {
  sectionTitle: ".about-section__title, .about-hero__headline",
  eyebrow: ".about-eyebrow",
});

const servicesRef = await measureReference(page, REF_SERVICES, {
  heroHeadline: ".services-hero__headline",
  eyebrow: ".services-eyebrow",
});

await browser.close();

const output = {
  auditDate: "2026-07-15",
  pages: { subOffering: SUB_OFFERING, pillarHub: PILLAR_HUB },
  implementation: { subOffering, pillarHub, carouselHover },
  siteReference: { home: homeRef, about: aboutRef, services: servicesRef },
  alignedWithSite: {
    h2Unified: "40px display (.sd-h2) across offerings, rationale, FAQs, related, carousel",
    h1: "clamp(2.5rem, 5vw, 3.75rem) display on landing",
    body: "16px Inter on descriptions and FAQ answers",
    cta: "hero-btn 16px / 40px height → /consultation",
    container: "max-width 1200px (.sd-container)",
    accent: "var(--ta-gold) on icons, links, carousel hover",
    canvas: "navy mesh + glass cards (no white/gray-50 bands)",
    breadcrumb: "sub-offering landing only",
    progressiveBlur: "re-enabled for /services routes",
  },
  intentionalDeltas: {
    mcshannockStructure: "Section order and GSAP motion preserved from CRS port",
    typographyFamily: "LP Saturnia/display + Inter vs McShannock Geist",
    relatedCards: "2 sibling offerings vs McShannock project grid",
    carouselSlides: "2 other pillars vs 6 McShannock services",
    copyAndImagery: "ThinqAsset pillar PNGs and copy",
    ctaDestination: "/consultation vs McShannock contact",
    noFinalCta: "No closing CTA band per product decision",
  },
};

writeFileSync(
  "scripts/thinq-sd-thinq-native-delta.json",
  JSON.stringify(output, null, 2),
);
console.log("Wrote scripts/thinq-sd-thinq-native-delta.json");
