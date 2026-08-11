"use client";

import { RefObject, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useChapterBarDock } from "@/hooks/useChapterBarDock";
import type { ScrollChapter } from "@/lib/scroll/types";

export const FOUNDER_CHAPTERS: ScrollChapter[] = [
  { num: null, label: "Intro" },
  { num: "01", label: "Purpose" },
  { num: "02", label: "Foundation" },
  { num: "03", label: "Founder" },
  { num: "04", label: "Expansion" },
  { num: "05", label: "Trust" },
  { num: "06", label: "Gratitude" },
];

function ChapterDot({ target }: { target: RefObject<HTMLElement | null> }) {
  const { scrollYProgress } = useScroll({
    target: target as RefObject<HTMLElement>,
    offset: ["start 0.75", "end 0.25"] as never,
  });
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.25, 1, 1, 0.25], {
    clamp: true,
  });
  const scaleX = useTransform(scrollYProgress, [0, 0.35], [0.35, 1], { clamp: true });

  return (
    <motion.span
      style={{ opacity, scaleX }}
      className="h-px w-5 origin-left bg-brass"
      aria-hidden
    />
  );
}

function ChapterLabel({
  target,
  chapter,
}: {
  target: RefObject<HTMLElement | null>;
  chapter: ScrollChapter;
}) {
  const { scrollYProgress } = useScroll({
    target: target as RefObject<HTMLElement>,
    offset: ["start 0.7", "end 0.3"] as never,
  });
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0], { clamp: true });

  return (
    <motion.span
      style={{ opacity }}
      className="pointer-events-none absolute inset-0 flex items-center gap-3 font-tmono text-[9px] uppercase sm:text-[10px]"
    >
      {chapter.num ? (
        <>
          <span className="tracking-[0.22em] text-brass">{chapter.num}</span>
          <span className="tracking-[0.34em] text-[#8b9298] sm:tracking-[0.38em]">{chapter.label}</span>
        </>
      ) : (
        <span className="tracking-[0.34em] text-[#8b9298] sm:tracking-[0.38em]">{chapter.label}</span>
      )}
    </motion.span>
  );
}

export default function ChapterBar({
  sections,
  chapters = FOUNDER_CHAPTERS,
  dockAboveFooter = false,
}: {
  sections: RefObject<HTMLElement | null>[];
  chapters?: ScrollChapter[];
  /** Lift above the site footer once it scrolls into view. */
  dockAboveFooter?: boolean;
}) {
  const barRef = useRef<HTMLDivElement>(null);
  const dockBottom = useChapterBarDock(barRef, dockAboveFooter);

  return (
    <div
      ref={barRef}
      role="status"
      aria-live="polite"
      aria-label="Reading progress"
      style={{ bottom: dockAboveFooter ? dockBottom : undefined }}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line/25 bg-ink/92 px-4 py-3 backdrop-blur-md pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-6 md:px-14"
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4">
        <div className="relative h-4 min-w-[9.5rem] sm:min-w-[11rem]">
          {sections.map((ref, i) => (
            <ChapterLabel key={i} target={ref} chapter={chapters[i] ?? { num: null, label: "Section" }} />
          ))}
        </div>
        <div className="flex items-center gap-1.5" aria-hidden>
          {sections.map((ref, i) => (
            <ChapterDot key={i} target={ref} />
          ))}
        </div>
      </div>
    </div>
  );
}
