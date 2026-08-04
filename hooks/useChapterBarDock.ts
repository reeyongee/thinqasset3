"use client";

import { RefObject, useLayoutEffect, useState } from "react";

const SITE_FOOTER_SELECTOR = "footer#site-footer";

/**
 * Keeps a fixed bottom bar pinned to the viewport until the site footer
 * enters view, then lifts it to sit flush above the footer.
 */
export function useChapterBarDock(
  barRef: RefObject<HTMLElement | null>,
  enabled: boolean,
) {
  const [bottom, setBottom] = useState(0);

  useLayoutEffect(() => {
    if (!enabled) {
      setBottom(0);
      return;
    }

    const bar = barRef.current;
    if (!bar) return;

    const update = () => {
      const footer = document.querySelector<HTMLElement>(SITE_FOOTER_SELECTOR);
      if (!footer) {
        setBottom(0);
        return;
      }

      const footerTop = footer.getBoundingClientRect().top;
      const viewportHeight = window.innerHeight;

      if (footerTop < viewportHeight) {
        setBottom(Math.max(0, viewportHeight - footerTop));
      } else {
        setBottom(0);
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    const footer = document.querySelector(SITE_FOOTER_SELECTOR);
    const resizeObserver =
      typeof ResizeObserver !== "undefined" && footer
        ? new ResizeObserver(update)
        : null;
    if (footer && resizeObserver) resizeObserver.observe(footer);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      resizeObserver?.disconnect();
    };
  }, [barRef, enabled]);

  return bottom;
}
