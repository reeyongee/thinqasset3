"use client";

import { useLayoutEffect, useState } from "react";
import { HEADER_SCROLL_SCROLLED_THRESHOLD } from "@/lib/site-chrome/headerConfig";
import { isPageScrollLocked } from "@/lib/scroll/lockPageScroll";

export function useHeaderScrollState() {
  const [isScrolled, setIsScrolled] = useState(false);

  useLayoutEffect(() => {
    const onScroll = () => {
      if (isPageScrollLocked()) return;
      setIsScrolled(window.scrollY > HEADER_SCROLL_SCROLLED_THRESHOLD);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { isScrolled };
}
