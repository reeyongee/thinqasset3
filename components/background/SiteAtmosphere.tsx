"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { usePrefersReducedMotion } from "@/components/progressive-blur/usePrefersReducedMotion";
import { SiteBackground } from "./SiteBackground";

export function SiteAtmosphere() {
  const pathname = usePathname();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [useWebGL, setUseWebGL] = useState(true);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const supported = Boolean(canvas.getContext("webgl"));
    setUseWebGL(supported);
  }, []);

  return (
    <SiteBackground
      useWebGL={useWebGL}
      interactive={!prefersReducedMotion && useWebGL}
    />
  );
}
