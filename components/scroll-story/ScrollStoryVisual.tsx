"use client";

import { HeroBgMedia } from "@/components/hero/HeroBgMedia";
import { ScrollStoryBeatVisuals } from "./ScrollStoryBeatVisuals";

export function ScrollStoryVisual() {
  return (
    <>
      <div
        className="scroll-story-image pointer-events-none absolute inset-0 z-0 overflow-hidden"
        style={{
          WebkitMaskImage:
            "linear-gradient(90deg, rgba(0, 0, 0, 0) 33%, rgb(0, 0, 0) 100%)",
          maskImage:
            "linear-gradient(90deg, rgba(0, 0, 0, 0) 33%, rgb(0, 0, 0) 100%)",
        }}
      >
        <div className="hero-bg-scale absolute inset-0">
          <HeroBgMedia />
        </div>
      </div>

      <ScrollStoryBeatVisuals />
    </>
  );
}
