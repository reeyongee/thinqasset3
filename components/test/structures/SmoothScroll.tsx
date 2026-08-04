"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.('a[href^="#"]');
      if (!a) return;
      e.preventDefault();
      lenis.scrollTo(a.getAttribute("href") as string, { offset: -72 });
    };
    window.addEventListener("click", onClick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);
  return <>{children}</>;
}
