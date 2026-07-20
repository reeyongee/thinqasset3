"use client";

import { useEffect, useRef } from "react";
import { orbEngine, type OrbConfig } from "./createOrbEngine";

type OrbProps = {
  hue?: number;
  hoverIntensity?: number;
  backgroundColor?: string;
};

export function Orb({
  hue = 0,
  hoverIntensity = 0.2,
  backgroundColor = "#000000",
}: OrbProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const config: OrbConfig = { hue, hoverIntensity, backgroundColor };
    orbEngine.mount(container, config);

    return () => {
      orbEngine.unmount();
    };
  }, [backgroundColor, hoverIntensity, hue]);

  useEffect(() => {
    orbEngine.updateConfig({ hue, hoverIntensity, backgroundColor });
  }, [backgroundColor, hoverIntensity, hue]);

  return <div ref={containerRef} className="about-hero-orb-container" />;
}
