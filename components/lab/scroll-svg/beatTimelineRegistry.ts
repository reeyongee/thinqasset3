import gsap from "gsap";

type BeatTimeline = gsap.core.Timeline;

const map = new WeakMap<Element, BeatTimeline>();

export function setBeatTimeline(el: Element, tl: BeatTimeline) {
  map.set(el, tl);
}

export function getBeatTimeline(el: Element) {
  return map.get(el);
}

export function clearBeatTimeline(el: Element) {
  map.delete(el);
}

export type BeatSvgProps = {
  /** Loop for the lab page. Scroll story uses scrubbed paused timelines. */
  autoplay?: boolean;
  className?: string;
};
