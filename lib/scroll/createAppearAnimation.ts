import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const APPEAR_EASE = "cubic-bezier(0.12, 0.23, 0.17, 0.99)";

/** Start reveal once the trigger enters the lower ~15% of the viewport. */
const DEFAULT_VISIBLE_THRESHOLD = 0.85;

type AppearAnimationOptions = {
  trigger?: Element;
  start?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  visibleThreshold?: number;
};

function bindPlayIfVisible(
  trigger: Element,
  tween: gsap.core.Tween,
  scrollTrigger: ScrollTrigger,
  visibleThreshold = DEFAULT_VISIBLE_THRESHOLD,
) {
  const playIfVisible = () => {
    if (tween.isActive() || tween.progress() > 0) return;

    const rect = trigger.getBoundingClientRect();
    const viewportCutoff = window.innerHeight * visibleThreshold;
    const isInRevealZone =
      rect.top < viewportCutoff && rect.bottom > 0;

    if (scrollTrigger.isActive || isInRevealZone) {
      tween.play();
    }
  };

  playIfVisible();
  requestAnimationFrame(playIfVisible);
  window.addEventListener("load", playIfVisible, { once: true });
  ScrollTrigger.addEventListener("refresh", playIfVisible);

  ScrollTrigger.create({
    trigger,
    start: "top bottom",
    end: "bottom top",
    onEnter: playIfVisible,
    onEnterBack: playIfVisible,
    onUpdate: playIfVisible,
  });

  return playIfVisible;
}

/** Fade/slide reveal tied to scroll with an immediate visibility fallback. */
export function createAppearAnimation(
  element: HTMLElement,
  options: AppearAnimationOptions = {},
) {
  const {
    trigger = element,
    start = "top 50%",
    delay = 0.15,
    duration = 0.8,
    ease = APPEAR_EASE,
    from = { opacity: 0, y: 40 },
    to = { opacity: 1, y: 0, x: 0 },
    visibleThreshold = DEFAULT_VISIBLE_THRESHOLD,
  } = options;

  gsap.set(element, from);

  const tween = gsap.to(element, {
    ...to,
    duration,
    ease,
    delay,
    paused: true,
  });

  const scrollTrigger = ScrollTrigger.create({
    trigger,
    start,
    once: true,
    onEnter: () => tween.play(),
  });

  bindPlayIfVisible(trigger, tween, scrollTrigger, visibleThreshold);

  return { tween, scrollTrigger };
}

type ScrollRevealOptions = {
  trigger?: Element;
  start?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  from: gsap.TweenVars;
  to: gsap.TweenVars;
  visibleThreshold?: number;
};

/** Multi-target scroll reveal (e.g. benefit card rows). */
export function createScrollReveal(
  elements: HTMLElement | HTMLElement[],
  options: ScrollRevealOptions,
) {
  const targets = gsap.utils.toArray(elements) as HTMLElement[];
  if (targets.length === 0) return null;

  const {
    trigger = targets[0],
    start = "top 50%",
    delay = 0,
    duration = 0.8,
    ease = APPEAR_EASE,
    from,
    to,
    visibleThreshold = DEFAULT_VISIBLE_THRESHOLD,
  } = options;

  gsap.set(targets, from);

  const tween = gsap.to(targets, {
    ...to,
    duration,
    ease,
    delay,
    paused: true,
  });

  const scrollTrigger = ScrollTrigger.create({
    trigger,
    start,
    once: true,
    onEnter: () => tween.play(),
  });

  bindPlayIfVisible(trigger, tween, scrollTrigger, visibleThreshold);

  return { tween, scrollTrigger };
}
