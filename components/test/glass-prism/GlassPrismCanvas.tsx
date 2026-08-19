"use client";

import { useEffect, useRef } from "react";
import { createGlassPrismScene } from "./createScene";

export function GlassPrismCanvas() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const scene = createGlassPrismScene(host);
    return () => scene.dispose();
  }, []);

  return (
    <div
      ref={hostRef}
      aria-hidden
      style={{
        width: "100%",
        height: "100%",
        background: "#030407",
      }}
    />
  );
}
