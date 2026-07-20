"use client";

import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTransitionAnimation } from "@/components/transition/TransitionAnimationContext";
import {
  OFFERING_IMAGE_HOLD_ITEMS,
  OFFERING_IMAGE_TRANSITION_SHARE,
} from "@/components/services/constants";
import { scheduleScrollRefresh } from "@/lib/scroll/scrollOrchestrator";

gsap.registerPlugin(ScrollTrigger);

const SCROLL_START = "top 88%";
const IMAGE_SCRUB_START = "top 70%";
const IMAGE_SCRUB_END = "bottom 30%";
const IMAGE_SCRUB_SMOOTHING = 1.75;

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

type UseServiceDetailOfferingsAnimationProps = {
  sectionRef: RefObject<HTMLElement | null>;
  imageHoldItems?: number;
};

function offeringSlotBlend(floatSlot: number, transitionShare: number): number {
  const slotProgress = floatSlot - Math.floor(floatSlot);
  const holdStart = 1 - transitionShare;
  if (slotProgress <= holdStart) return 0;
  const linear = (slotProgress - holdStart) / transitionShare;
  return easeInOutCubic(linear);
}

function applyOfferingImageBlend(
  layers: NodeListOf<HTMLElement>,
  lowLayer: number,
  highLayer: number,
  blend: number,
) {
  if (lowLayer === highLayer || blend <= 0.001) {
    layers.forEach((layer, index) => {
      gsap.set(layer, {
        autoAlpha: index === lowLayer ? 1 : 0,
        filter: index === lowLayer ? "blur(0px)" : "blur(2px)",
        scale: 1,
      });
    });
    return;
  }

  const mix = Math.min(1, Math.max(0, blend));

  layers.forEach((layer, index) => {
    let alpha = 0;

    if (index === lowLayer) {
      alpha = 1 - mix;
    } else if (index === highLayer) {
      alpha = mix;
    }

    gsap.set(layer, {
      autoAlpha: alpha,
      filter: `blur(${2 * (1 - Math.abs(alpha - 0.5) * 2)}px)`,
      scale: 1,
    });
  });
}

export function useServiceDetailOfferingsAnimation({
  sectionRef,
  imageHoldItems = OFFERING_IMAGE_HOLD_ITEMS,
}: UseServiceDetailOfferingsAnimationProps) {
  const { isNavigating } = useTransitionAnimation();

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || isNavigating) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const headline = section.querySelector<HTMLElement>(
        ".sd-offerings-headline",
      );
      const imageWrap = section.querySelector<HTMLElement>(".sd-offerings-image");
      const list = section.querySelector<HTMLElement>(".sd-offerings-list");
      const layers = section.querySelectorAll<HTMLElement>(
        ".sd-offerings-image-layer",
      );
      const ctas = section.querySelectorAll<HTMLElement>(".sd-offerings-cta");
      const items = section.querySelectorAll<HTMLElement>(".sd-offering-item");

      gsap.set([headline, imageWrap, ...ctas, ...items].filter(Boolean), {
        autoAlpha: 1,
        y: 0,
      });

      layers.forEach((layer, index) => {
        gsap.set(layer, {
          autoAlpha: index === 0 ? 1 : 0,
          filter: index === 0 ? "blur(0px)" : "blur(2px)",
          scale: 1,
        });
      });

      items.forEach((item) => {
        const border = item.querySelector<HTMLElement>(".sd-offering-border");
        const icon = item.querySelector<HTMLElement>(".sd-offering-icon");
        const name = item.querySelector<HTMLElement>(".sd-offering-name");
        const desc = item.querySelector<HTMLElement>(".sd-offering-desc");
        gsap.set([border, icon, name, desc].filter(Boolean), {
          autoAlpha: 1,
          scaleX: 1,
          scale: 1,
          y: 0,
        });
      });

      if (!reduceMotion && list && layers.length > 1 && items.length > 1) {
        ScrollTrigger.create({
          trigger: list,
          start: IMAGE_SCRUB_START,
          end: IMAGE_SCRUB_END,
          scrub: IMAGE_SCRUB_SMOOTHING,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const floatIndex = self.progress * Math.max(items.length - 1, 1);
            const floatSlot = floatIndex / imageHoldItems;
            const lowSlot = Math.floor(floatSlot);
            const blend = offeringSlotBlend(
              floatSlot,
              OFFERING_IMAGE_TRANSITION_SHARE,
            );

            const lowLayer = lowSlot % layers.length;
            const highLayer = (lowSlot + 1) % layers.length;

            applyOfferingImageBlend(layers, lowLayer, highLayer, blend);
          },
        });
      } else if (reduceMotion && layers.length) {
        layers.forEach((layer, index) => {
          gsap.set(layer, {
            autoAlpha: index === 0 ? 1 : 0,
            clearProps: "filter,transform",
          });
        });
      }

      if (reduceMotion) return;

      if (headline) {
        ScrollTrigger.create({
          trigger: headline,
          start: SCROLL_START,
          once: true,
          onEnter: () => {
            gsap.fromTo(
              headline,
              { y: 30 },
              {
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                clearProps: "transform",
              },
            );
          },
        });
      }

      if (imageWrap && layers.length) {
        ScrollTrigger.create({
          trigger: imageWrap,
          start: SCROLL_START,
          once: true,
          onEnter: () => {
            gsap.fromTo(
              imageWrap,
              { autoAlpha: 0 },
              {
                autoAlpha: 1,
                duration: 0.8,
                ease: "power2.out",
              },
            );
          },
        });
      }

      ctas.forEach((cta) => {
        ScrollTrigger.create({
          trigger: cta,
          start: SCROLL_START,
          once: true,
          onEnter: () => {
            gsap.fromTo(
              cta,
              { y: 20 },
              {
                y: 0,
                duration: 0.6,
                ease: "power2.out",
                clearProps: "transform",
              },
            );
          },
        });
      });

      items.forEach((item) => {
        const border = item.querySelector<HTMLElement>(".sd-offering-border");
        const icon = item.querySelector<HTMLElement>(".sd-offering-icon");
        const name = item.querySelector<HTMLElement>(".sd-offering-name");
        const desc = item.querySelector<HTMLElement>(".sd-offering-desc");

        ScrollTrigger.create({
          trigger: item,
          start: SCROLL_START,
          once: true,
          onEnter: () => {
            const tl = gsap.timeline();
            if (border) {
              tl.fromTo(
                border,
                { scaleX: 0, transformOrigin: "left center" },
                { scaleX: 1, duration: 0.5, ease: "power2.inOut" },
              );
            }
            if (icon) {
              tl.fromTo(
                icon,
                { scale: 0 },
                {
                  scale: 1,
                  duration: 0.4,
                  ease: "back.out(1.7)",
                  clearProps: "transform",
                },
                "-=0.2",
              );
            }
            if (name) {
              tl.fromTo(
                name,
                { y: 16 },
                {
                  y: 0,
                  duration: 0.5,
                  ease: "power2.out",
                  clearProps: "transform",
                },
                "-=0.3",
              );
            }
            if (desc) {
              tl.fromTo(
                desc,
                { y: 12 },
                {
                  y: 0,
                  duration: 0.4,
                  ease: "power2.out",
                  clearProps: "transform",
                },
                "-=0.25",
              );
            }
          },
        });
      });

      scheduleScrollRefresh();
    },
    { scope: sectionRef, dependencies: [isNavigating, imageHoldItems] },
  );
}
