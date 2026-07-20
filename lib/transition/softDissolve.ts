import gsap from "gsap";
import {
  BRAND_EASE,
  CONTENT_BLUR,
  CONTENT_LEAVE_DELAY,
  CONTENT_OFFSET,
  ENTER_EASE,
  ENTER_TEXT_DELAY,
  ENTER_TEXT_DURATION,
  ENTER_TEXT_STAGGER,
  ENTER_VEIL_DURATION,
  EXIT_EASE,
  LEAVE_TEXT_DURATION,
  LEAVE_VEIL_DURATION,
  LEAVE_VEIL_OVERLAP,
  NAV_ENTER_DURATION,
  NAV_ENTER_VEIL_OVERLAP,
  NAV_LEAVE_DELAY,
  NAV_LEAVE_DURATION,
  NAV_OFFSET,
  SHELL_ENTER_DELAY,
  SHELL_ENTER_DURATION,
  SHELL_ENTER_STAGGER,
  SHELL_OFFSET,
  TRANSITION_SELECTORS,
  VEIL_HOLD_DURATION,
} from "./constants";

function getNav(): HTMLElement | null {
  return document.querySelector(TRANSITION_SELECTORS.nav);
}

function getContentTargets(): Element[] {
  const main = document.querySelector(TRANSITION_SELECTORS.root);
  if (!main) return [];

  const page = main.querySelector(TRANSITION_SELECTORS.page);
  if (page) {
    return Array.from(
      page.querySelectorAll(
        `${TRANSITION_SELECTORS.text}, ${TRANSITION_SELECTORS.item}`,
      ),
    );
  }

  const hero = main.querySelector(".scroll-story-hero-content");
  if (hero) return [hero];

  return [];
}

function getHomeShellSections(): Element[] {
  const main = document.querySelector(TRANSITION_SELECTORS.root);
  if (!main || main.querySelector(TRANSITION_SELECTORS.page)) return [];

  return Array.from(main.children).filter((child) => {
    const el = child as HTMLElement;
    if (el.matches("[data-transition-nav]")) return false;
    if (el.querySelector(".scroll-story-hero-content")) return false;
    return true;
  });
}

function baselineNav(nav: HTMLElement): void {
  gsap.set(nav, { autoAlpha: 1, y: 0, clearProps: "filter" });
}

function baselineContent(targets: Element[]): void {
  if (targets.length === 0) return;
  gsap.set(targets, { autoAlpha: 1, y: 0, filter: "blur(0px)" });
}

/** Keep incoming route hidden until the reveal timeline runs. Never blur the nav. */
export function hideIncomingContent(): void {
  const nav = getNav();
  const content = getContentTargets();
  const shell = getHomeShellSections();

  if (nav) {
    gsap.set(nav, { autoAlpha: 0, y: -NAV_OFFSET });
  }

  if (content.length > 0) {
    gsap.set(content, {
      autoAlpha: 0,
      y: CONTENT_OFFSET,
      filter: `blur(${CONTENT_BLUR}px)`,
    });
  }

  if (shell.length > 0) {
    gsap.set(shell, { autoAlpha: 0, y: SHELL_OFFSET });
  }
}

/** Clear GSAP inline styles applied during transitions. */
export function resetTransitionStyles(): void {
  const nav = getNav();
  const content = getContentTargets();
  const shell = getHomeShellSections();

  if (nav) {
    gsap.set(nav, { clearProps: "all" });
    baselineNav(nav);
  }

  if (content.length > 0) {
    gsap.set(content, { clearProps: "all" });
    baselineContent(content);
  }

  if (shell.length > 0) {
    gsap.set(shell, { clearProps: "all" });
    gsap.set(shell, { autoAlpha: 1, y: 0 });
  }
}

export function softDissolveLeave(): gsap.core.Timeline {
  const nav = getNav();
  const content = getContentTargets();
  const veil = document.querySelector(TRANSITION_SELECTORS.veil);
  const tl = gsap.timeline();

  if (nav) baselineNav(nav);
  baselineContent(content);

  if (nav) {
    tl.to(
      nav,
      {
        autoAlpha: 0,
        y: -NAV_OFFSET,
        duration: NAV_LEAVE_DURATION,
        ease: EXIT_EASE,
      },
      NAV_LEAVE_DELAY,
    );
  }

  if (content.length > 0) {
    tl.to(
      content,
      {
        autoAlpha: 0,
        y: -CONTENT_OFFSET,
        filter: `blur(${CONTENT_BLUR}px)`,
        duration: LEAVE_TEXT_DURATION,
        ease: EXIT_EASE,
      },
      NAV_LEAVE_DELAY + CONTENT_LEAVE_DELAY,
    );
  }

  if (veil) {
    tl.to(
      veil,
      {
        autoAlpha: 1,
        duration: LEAVE_VEIL_DURATION,
        ease: BRAND_EASE,
      },
      `-=${LEAVE_VEIL_OVERLAP}`,
    );
  }

  return tl;
}

export function softDissolveEnter(): gsap.core.Timeline {
  const nav = getNav();
  const content = getContentTargets();
  const veil = document.querySelector(TRANSITION_SELECTORS.veil);

  hideIncomingContent();

  const tl = gsap.timeline();

  tl.to({}, { duration: VEIL_HOLD_DURATION });

  if (veil) {
    tl.to(veil, {
      autoAlpha: 0,
      duration: ENTER_VEIL_DURATION,
      ease: BRAND_EASE,
    });
  }

  if (nav) {
    tl.to(
      nav,
      {
        autoAlpha: 1,
        y: 0,
        duration: NAV_ENTER_DURATION,
        ease: ENTER_EASE,
      },
      `-=${NAV_ENTER_VEIL_OVERLAP}`,
    );
  }

  if (content.length > 0) {
    tl.to(
      content,
      {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration: ENTER_TEXT_DURATION,
        stagger: { each: ENTER_TEXT_STAGGER, from: "start" },
        ease: ENTER_EASE,
      },
      `+=${ENTER_TEXT_DELAY}`,
    );
  }

  const shell = getHomeShellSections();
  if (shell.length > 0) {
    tl.to(
      shell,
      {
        autoAlpha: 1,
        y: 0,
        duration: SHELL_ENTER_DURATION,
        stagger: { each: SHELL_ENTER_STAGGER, from: "start" },
        ease: ENTER_EASE,
      },
      `+=${SHELL_ENTER_DELAY}`,
    );
  }

  return tl;
}

export function softDissolveLeaveReducedMotion(): gsap.core.Timeline {
  const nav = getNav();
  const content = getContentTargets();
  const veil = document.querySelector(TRANSITION_SELECTORS.veil);
  const tl = gsap.timeline();

  if (nav) tl.set(nav, { autoAlpha: 0 });
  if (content.length > 0) tl.set(content, { autoAlpha: 0 });

  if (veil) {
    tl.to(veil, { autoAlpha: 1, duration: 0.12, ease: "none" });
  }

  return tl;
}

export function softDissolveEnterReducedMotion(): gsap.core.Timeline {
  const nav = getNav();
  const content = getContentTargets();
  const veil = document.querySelector(TRANSITION_SELECTORS.veil);

  hideIncomingContent();

  const tl = gsap.timeline();

  if (veil) {
    tl.to(veil, { autoAlpha: 0, duration: 0.12, ease: "none" });
  }

  if (nav) {
    tl.set(nav, { autoAlpha: 1, clearProps: "y" });
  }

  if (content.length > 0) {
    tl.set(content, { autoAlpha: 1, clearProps: "all" });
  }

  const shell = getHomeShellSections();
  if (shell.length > 0) {
    tl.set(shell, { autoAlpha: 1, clearProps: "all" });
  }

  return tl;
}
