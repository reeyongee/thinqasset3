"use client";

import { RefObject } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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

/**
 * Bottom reading-progress chrome.
 *
 * Lives in a full-height rail over main (position:relative) so `position:sticky`
 * can pin it to the viewport bottom, then release it flush with the footer —
 * no JS `bottom` writes, so it cannot drift out of sync while the footer scrolls.
 *
 * Stacking: below site header (50) and mobile menu (49), above page content.
 */
export default function ChapterBar({
  sections,
  chapters = FOUNDER_CHAPTERS,
}: {
  sections: RefObject<HTMLElement | null>[];
  chapters?: ScrollChapter[];
}) {
  return (
    <div className="chapter-bar-rail pointer-events-none absolute inset-0 z-40 overflow-visible in-data-mobile-menu-open:invisible">
      <div className="sticky top-[100dvh] h-0">
        <div
          role="status"
          aria-live="polite"
          aria-label="Reading progress"
          className="chapter-bar pointer-events-auto w-full -translate-y-full border-t border-line/25 bg-ink/92 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md sm:px-6 md:px-14"
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
      </div>
    </div>
  );
}
