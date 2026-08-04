"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "framer-motion";
import { useIsPhoneViewport } from "@/hooks/useIsPhoneViewport";
import { isPageScrollLocked } from "@/lib/scroll/lockPageScroll";
import { scheduleScrollRefresh } from "@/lib/scroll/scrollOrchestrator";
import { usesNativeScroll } from "@/lib/scroll/usesNativeScroll";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const isPhone = useIsPhoneViewport();
  const useLenis =
    !reduced && !isPhone && !usesNativeScroll(pathname);

  useEffect(() => {
    if (!useLenis) {
      scheduleScrollRefresh();
      return;
    }

    const lenis = new Lenis({ lerp: 0.09 });

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    const syncLock = () => {
      if (isPageScrollLocked()) {
        lenis.stop();
      } else {
        lenis.start();
      }
    };
    syncLock();

    const observer = new MutationObserver(syncLock);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-scroll-locked"],
    });

    scheduleScrollRefresh();

    return () => {
      observer.disconnect();
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(onTick);
      lenis.destroy();
      scheduleScrollRefresh();
    };
  }, [useLenis]);

  useEffect(() => {
    scheduleScrollRefresh();
  }, [pathname]);

  return null;
}
