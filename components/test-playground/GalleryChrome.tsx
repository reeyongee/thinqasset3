"use client";

import type { MouseEvent } from "react";
import { GlowRing } from "@/components/ui/GlowButton";

const pagerStyle = { minHeight: 0, padding: "4px 8px" } as const;
const closeStyle = { minHeight: 0, padding: "4px 12px" } as const;

export function GalleryPager({
  index,
  total,
  onPrev,
  onNext,
}: {
  index: number;
  total: number;
  onPrev: (e: MouseEvent) => void;
  onNext: (e: MouseEvent) => void;
}) {
  const current = String(Math.max(index, 1)).padStart(2, "0");
  const count = String(total).padStart(2, "0");

  return (
    <div
      role="group"
      aria-label="Profile switcher"
      className="gallery-chrome glow-button cursor-default rounded-full border border-[color:var(--token-btn-border)] shadow-lg backdrop-blur-xl"
      style={pagerStyle}
    >
      <GlowRing />
      <span className="relative z-[1] flex items-center font-[family-name:var(--font-geist-mono)] text-[10px]">
        <button
          type="button"
          onClick={onPrev}
          title="Previous profile (Left Arrow)"
          aria-label="Previous profile"
          className="cursor-pointer appearance-none border-0 bg-transparent px-1.5 text-[color:var(--ta-grey-light)] transition-colors hover:text-[color:var(--ta-gold)]"
        >
          ←
        </button>
        <span className="px-1.5 text-[9px] tracking-widest text-[color:var(--ta-grey-muted)]">
          {current} / {count}
        </span>
        <button
          type="button"
          onClick={onNext}
          title="Next profile (Right Arrow)"
          aria-label="Next profile"
          className="cursor-pointer appearance-none border-0 bg-transparent px-1.5 text-[color:var(--ta-grey-light)] transition-colors hover:text-[color:var(--ta-gold)]"
        >
          →
        </button>
      </span>
    </div>
  );
}

export function GalleryCloseButton({
  onClick,
  showEsc = true,
}: {
  onClick: () => void;
  showEsc?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title="Return to gallery (Esc)"
      aria-label="Close profile"
      className="gallery-chrome glow-button glow-button--action group cursor-pointer rounded-full border border-[color:var(--token-btn-border)] text-[color:var(--ta-grey-light)] shadow-lg backdrop-blur-xl"
      style={closeStyle}
    >
      <GlowRing />
      <span className="relative z-[1] flex items-center gap-1.5 font-[family-name:var(--font-geist-mono)] text-[10px]">
        <span className="tracking-[0.14em]">CLOSE</span>
        {showEsc ? (
          <span className="text-[9px] text-[color:var(--ta-grey-muted)] group-hover:text-[color:var(--ta-gold)]">
            [ESC]
          </span>
        ) : null}
      </span>
    </button>
  );
}
