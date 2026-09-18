"use client";

import { RefObject } from "react";
import { motion, useReducedMotion, useTransform } from "framer-motion";
import {
  LETTER_CLOSING,
  LETTER_TRUST_BODY,
  LETTER_TRUST_STATEMENT,
} from "@/components/founder-letter/constants";
import { useAmplitude, usePinnedScene } from "@/hooks/useScrollScene";

function sceneOpacity(
  progress: number,
  enterStart: number,
  enterEnd: number,
  exitStart: number,
  exitEnd: number,
) {
  if (progress <= enterStart) return 0;
  if (progress < enterEnd) return (progress - enterStart) / (enterEnd - enterStart);
  if (progress <= exitStart) return 1;
  if (progress < exitEnd) return 1 - (progress - exitStart) / (exitEnd - exitStart);
  return 0;
}

const ENTER_START = 0.1;
const ENTER_END = 0.28;
const EXIT_START = 0.76;
const EXIT_END = 0.92;

const FRAME_PAD =
  "pt-[calc(var(--site-header-height-floating)+0.5rem)] pb-[calc(3.5rem+env(safe-area-inset-bottom))]";

export default function Trust({ sectionRef }: { sectionRef: RefObject<HTMLElement | null> }) {
  const amp = useAmplitude();
  const reduced = useReducedMotion() ?? false;
  const { progress, style } = usePinnedScene(sectionRef, {
    lengthVh: 420,
    mobileLengthVh: 300,
    smooth: false,
  });

  const glow = useTransform(progress, [ENTER_START, ENTER_END + 0.08], [0, 0.8], { clamp: true });

  const contentO = useTransform(progress, (v) =>
    sceneOpacity(v, ENTER_START, ENTER_END, EXIT_START, EXIT_END),
  );
  const contentY = useTransform(progress, (v) => {
    const o = sceneOpacity(v, ENTER_START, ENTER_END, EXIT_START, EXIT_END);
    return reduced ? 0 : (1 - o) * 16 * amp;
  });
  const contentBlur = useTransform(progress, (v) => {
    const o = sceneOpacity(v, ENTER_START, ENTER_END, EXIT_START, EXIT_END);
    return reduced ? "none" : `blur(${12 * (1 - o)}px)`;
  });

  const closingParts = LETTER_CLOSING.split(" — ");

  return (
    <section ref={sectionRef} style={style} className="relative">
      <div className="sticky top-0 flex h-[100dvh] flex-col overflow-hidden md:h-screen">
        <motion.div
          aria-hidden
          style={{ opacity: glow }}
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_40%_at_50%_50%,color-mix(in_srgb,var(--color-brass)_16%,transparent),transparent_70%)] md:bg-[radial-gradient(50%_40%_at_50%_38%,color-mix(in_srgb,var(--color-brass)_16%,transparent),transparent_70%)]"
        />

        <div
          className={`relative mx-auto flex min-h-0 w-full max-w-[1600px] flex-1 flex-col overflow-hidden px-5 sm:px-6 md:px-14 ${FRAME_PAD}`}
        >
          <motion.div
            style={{
              opacity: contentO,
              y: contentY,
              filter: contentBlur,
            }}
            className="flex min-h-0 w-full min-w-0 flex-1 flex-col items-center justify-center gap-4 sm:gap-5 md:grid md:grid-cols-12 md:content-center md:items-start md:gap-x-8 md:gap-y-0 lg:gap-x-12"
          >
            <h2 className="w-full shrink-0 text-center font-display text-[clamp(2.35rem,min(12vw,9.5dvh),3.6rem)] font-light leading-none tracking-[-0.03em] sm:text-[clamp(2.75rem,min(10vw,11dvh),4.25rem)] md:col-span-5 md:self-center md:text-left md:text-[clamp(3.4rem,min(7.2vw,13dvh),6.75rem)] lg:col-span-5">
              Trust<span className="italic text-brass">.</span>
            </h2>

            <div className="flex min-h-0 w-full min-w-0 max-w-[40rem] flex-col justify-center gap-3 overflow-y-auto overscroll-contain text-center sm:gap-3.5 md:col-span-7 md:max-w-none md:self-center md:gap-4 md:text-left lg:col-span-6 lg:col-start-7">
              <p className="text-pretty font-display text-[clamp(1rem,min(3.2vw,2.6dvh),1.2rem)] font-light leading-snug text-paper/85 md:text-[clamp(1.05rem,min(1.45vw,2.8dvh),1.28rem)] md:leading-[1.35]">
                {LETTER_TRUST_STATEMENT}
              </p>
              <p className="text-pretty text-[0.8125rem] leading-relaxed text-paper/65 sm:text-[0.875rem] md:text-[clamp(0.875rem,min(1.05vw,1.7dvh),1rem)] md:leading-[1.65]">
                {LETTER_TRUST_BODY}
              </p>
              <p className="text-pretty text-[0.8125rem] leading-relaxed text-paper/65 sm:text-[0.875rem] md:text-[clamp(0.875rem,min(1.05vw,1.7dvh),1rem)] md:leading-[1.65]">
                {closingParts.map((part, i, arr) =>
                  i < arr.length - 1 ? (
                    <span key={i}>
                      {part} —{" "}
                    </span>
                  ) : (
                    <em key={i} className="italic text-brass">
                      {part}
                    </em>
                  ),
                )}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
