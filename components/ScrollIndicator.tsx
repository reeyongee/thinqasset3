"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export default function ScrollIndicator() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 96], [1, 0], { clamp: true });
  const y = useTransform(scrollY, [0, 96], [0, 10], { clamp: true });

  return (
    <motion.div
      aria-hidden
      style={{ opacity, y }}
      className="pointer-events-none fixed inset-x-0 bottom-[calc(4.5rem+env(safe-area-inset-bottom))] z-40 flex justify-center"
    >
      <svg
        viewBox="0 0 60 134"
        className="h-[5.2rem] w-[2.34rem]"
        role="img"
        aria-label="Scroll to explore"
      >
        <defs>
          <style>{`
            .scroll-ind-dot {
              animation: scroll-ind-drop 2.4s cubic-bezier(0.6, 0.04, 0.3, 1) infinite;
            }
            @keyframes scroll-ind-drop {
              0% { transform: translateY(0); opacity: 0; }
              12% { opacity: 1; }
              72% { opacity: 1; }
              100% { transform: translateY(44px); opacity: 0; }
            }
            .scroll-ind-chev {
              stroke: color-mix(in srgb, var(--color-paper) 55%, transparent);
              stroke-width: 1.4;
              fill: none;
              stroke-linecap: round;
              stroke-linejoin: round;
              animation: scroll-ind-bob 2.4s ease-in-out infinite;
            }
            @keyframes scroll-ind-bob {
              0%, 100% { transform: translateY(0); opacity: 0.35; }
              50% { transform: translateY(5px); opacity: 0.85; }
            }
            ${reduced ? `
              .scroll-ind-dot, .scroll-ind-chev { animation: none; }
              .scroll-ind-dot { opacity: 1; }
              .scroll-ind-chev { opacity: 0.6; }
            ` : ""}
            @media (prefers-reduced-motion: reduce) {
              .scroll-ind-dot, .scroll-ind-chev { animation: none; }
              .scroll-ind-dot { opacity: 1; }
              .scroll-ind-chev { opacity: 0.6; }
            }
          `}</style>
        </defs>

        <rect
          x="0.75"
          y="5.75"
          width="58.5"
          height="98.5"
          rx="29.25"
          fill="none"
          stroke="color-mix(in srgb, var(--color-paper) 45%, transparent)"
          strokeWidth="1.5"
        />
        <line
          x1="30"
          y1="29"
          x2="30"
          y2="83"
          stroke="color-mix(in srgb, var(--color-paper) 14%, transparent)"
          strokeWidth="1"
        />
        <g className="scroll-ind-dot">
          <circle cx="30" cy="31" r="4.5" fill="var(--color-brass)" />
        </g>

        <path className="scroll-ind-chev" d="M22 118 l8 7 8-7" />
      </svg>
    </motion.div>
  );
}
