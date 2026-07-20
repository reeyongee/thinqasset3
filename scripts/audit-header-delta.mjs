#!/usr/bin/env node
/**
 * Compare ThinqAsset McShannock-header port vs live source on key probes.
 * Usage: node scripts/audit-header-delta.mjs
 */

import { writeFileSync } from "node:fs";

const PROBES = [
  { label: "top", scrollY: 0 },
  { label: "scrolled", scrollY: 150 },
  { label: "deep-down", scrollY: 600 },
  { label: "scroll-up", scrollY: 300 },
];

const CAPTURE_FN = `() => {
  const header = document.querySelector('header');
  const outer = header?.firstElementChild;
  const pill = outer?.firstElementChild;
  const logo = pill?.querySelector('a[aria-label], a.site-header__logo-link, a[href="/"] img, .hero-nav-logo__mark')?.parentElement?.parentElement || pill?.querySelector('a');
  const nav = pill?.querySelector('nav');
  const cta = pill?.querySelector('a[href*="contact"], a[href*="consultation"], .header-cta');
  const menuBtn = pill?.querySelector('button[aria-label*="menu" i]');
  const cs = (el) => el ? {
    className: el.className,
    bg: getComputedStyle(el).backgroundColor,
    transform: getComputedStyle(el).transform,
    translate: getComputedStyle(el).translate,
    maxWidth: getComputedStyle(el).maxWidth,
    borderRadius: getComputedStyle(el).borderRadius,
    backdrop: getComputedStyle(el).backdropFilter,
    height: el.getBoundingClientRect().height,
    width: el.getBoundingClientRect().width,
  } : null;
  return {
    scrollY: window.scrollY,
    viewport: { w: innerWidth, h: innerHeight },
    header: cs(header),
    outer: cs(outer),
    pill: cs(pill),
    navDisplay: nav ? getComputedStyle(nav).display : null,
    ctaDisplay: cta?.parentElement ? getComputedStyle(cta.parentElement).display : (cta ? getComputedStyle(cta).display : null),
    menuDisplay: menuBtn ? getComputedStyle(menuBtn).display : null,
    headerClass: header?.className,
  };
}`;

function delta(ref, live, path) {
  const r = path.split(".").reduce((o, k) => o?.[k], ref);
  const l = path.split(".").reduce((o, k) => o?.[k], live);
  if (r === l) return null;
  if (typeof r === "number" && typeof l === "number" && Math.abs(r - l) < 2) return null;
  return { path, ref: r, live: l };
}

function compare(refSet, liveSet) {
  const deltas = [];
  for (const probe of PROBES) {
    const ref = refSet[probe.label];
    const live = liveSet[probe.label];
    if (!ref || !live) continue;
    for (const path of [
      "header.bg",
      "header.transform",
      "header.translate",
      "header.height",
      "outer.maxWidth",
      "pill.borderRadius",
      "pill.backdrop",
      "pill.bg",
      "pill.width",
      "navDisplay",
    ]) {
      const d = delta(ref, live, path);
      if (d) deltas.push({ probe: probe.label, ...d });
    }
  }
  return deltas;
}

const instructions = {
  methodology: "Run CAPTURE_FN in Chrome DevTools evaluate_script at each probe scroll on both sites @ 1440 and 390 viewports.",
  captureFn: CAPTURE_FN,
  probes: PROBES,
  reference: {
    url: "https://www.mcshannock.design/services/product-design",
    notes: "variant=block theme=dark",
  },
  live: {
    url: "http://localhost:3000/services/global-regulated-fund-platform",
    notes: "ThinqAsset port",
  },
};

writeFileSync(
  new URL("./thinq-header-audit-instructions.json", import.meta.url),
  JSON.stringify(instructions, null, 2),
);

console.log("Wrote scripts/thinq-header-audit-instructions.json");
