"use client";

import { useLayoutEffect, useRef, useState } from "react";
import {
  HEADER_SCROLL_HIDE_THRESHOLD,
  HEADER_SCROLL_SCROLLED_THRESHOLD,
} from "@/lib/site-chrome/headerConfig";

export function useHeaderScrollState() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const prevYRef = useRef(0);

  useLayoutEffect(() => {
    prevYRef.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const scrollingDown = y > prevYRef.current;

      setIsScrolled(y > HEADER_SCROLL_SCROLLED_THRESHOLD);

      if (y > HEADER_SCROLL_HIDE_THRESHOLD && scrollingDown) {
        setIsHidden(true);
      } else if (!scrollingDown) {
        setIsHidden(false);
      }

      prevYRef.current = y;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { isScrolled, isHidden };
}
