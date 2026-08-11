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
    return (1 - o) * 36 * amp;
  });
  const contentBlur = useTransform(progress, (v) => {
    const o = sceneOpacity(v, ENTER_START, ENTER_END, EXIT_START, EXIT_END);
    return reduced ? "none" : `blur(${12 * (1 - o)}px)`;
  });

  return (
    <section ref={sectionRef} style={style} className="relative bg-ink">
      <div className="sticky top-0 h-[100dvh] pb-[calc(3.5rem+env(safe-area-inset-bottom))] md:h-screen">

        <motion.div
          aria-hidden
          style={{ opacity: glow }}
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_40%_at_50%_50%,color-mix(in_srgb,var(--color-brass)_16%,transparent),transparent_70%)] md:bg-[radial-gradient(50%_40%_at_50%_38%,color-mix(in_srgb,var(--color-brass)_16%,transparent),transparent_70%)]"
        />

        <div className="relative flex h-full flex-col items-center justify-center px-5 sm:px-6 md:justify-start md:pb-[8vh] md:pt-[14vh]">
          <motion.div
            style={{
              opacity: contentO,
              y: contentY,
              filter: contentBlur,
            }}
            className="flex w-full flex-col items-center"
          >
            <h2 className="w-full text-center font-display text-[clamp(3.6rem,22vw,16rem)] font-light leading-none tracking-[-0.02em] md:text-[clamp(5rem,19vw,16rem)]">
              Trust<span className="italic text-brass">.</span>
            </h2>

            <div className="mt-8 flex max-w-[34ch] flex-col gap-5 text-center sm:mt-10 sm:max-w-[58ch]">
              <p className="font-display text-[clamp(1.1rem,3.2vw,1.45rem)] font-light leading-snug text-paper/85">
                {LETTER_TRUST_STATEMENT}
              </p>
              <p className="text-[0.9375rem] leading-relaxed text-paper/65 sm:text-[clamp(0.95rem,1.35vw,1.05rem)]">
                {LETTER_TRUST_BODY}
              </p>
              <p className="text-[0.9375rem] leading-relaxed text-paper/65 sm:text-[clamp(0.95rem,1.35vw,1.05rem)]">
                {LETTER_CLOSING.split(" — ").map((part, i, arr) =>
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
