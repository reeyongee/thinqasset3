"use client";

import { useRef } from "react";
import { ScrollStoryCopy } from "./ScrollStoryCopy";
import { ScrollStoryVisual } from "./ScrollStoryVisual";
import { useScrollStoryTimeline } from "./useScrollStoryTimeline";

export function ScrollStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  useScrollStoryTimeline({ sectionRef, stickyRef });

  return (
    <section ref={sectionRef} data-scroll-story className="relative">
      <div
        ref={stickyRef}
        className="relative h-[92vh] w-full overflow-x-clip min-[810px]:h-[78vh] min-[1200px]:h-screen"
      >
        <ScrollStoryVisual />

        <div className="scroll-story-content relative z-[4] mx-auto flex h-full w-full max-w-[1200px] flex-col px-6 pb-12">
          <ScrollStoryCopy />
        </div>
      </div>
    </section>
  );
}
