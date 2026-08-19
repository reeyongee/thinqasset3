"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useIsPhoneViewport } from "@/components/mobile-home/useIsPhoneViewport";
import { usePrefersReducedMotion } from "@/components/progressive-blur/usePrefersReducedMotion";
import { SiteBackground } from "./SiteBackground";

export function SiteAtmosphere() {
  const pathname = usePathname();
  const prefersReducedMotion = usePrefersReducedMotion();
  const isPhone = useIsPhoneViewport();
  const [useWebGL, setUseWebGL] = useState(true);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const supported = Boolean(canvas.getContext("webgl"));
    setUseWebGL(supported);
  }, []);

  const isPrismLab =
    pathname === "/test10" ||
    pathname.startsWith("/test10/") ||
    pathname === "/test13" ||
    pathname.startsWith("/test13/") ||
    pathname === "/test14" ||
    pathname.startsWith("/test14/");
  const enableWebGL = useWebGL && !isPhone && !isPrismLab;

  return (
    <SiteBackground
      useWebGL={enableWebGL}
      interactive={!prefersReducedMotion && enableWebGL}
    />
  );
}
