"use client";

import { RefObject } from "react";
import { motion, useReducedMotion, useTransform } from "framer-motion";
import { LETTER_CLOSING, LETTER_TRUST_BODY } from "@/components/founder-letter/constants";
import { useAmplitude, usePinnedScene } from "@/hooks/useScrollScene";

const BODY = `${LETTER_TRUST_BODY.split(".")[0]}.`;
const FOOTNOTE = `${LETTER_CLOSING.split(".")[0]}.`;

export default function Trust({ sectionRef }: { sectionRef: RefObject<HTMLElement | null> }) {
  const amp = useAmplitude();
  const reduced = useReducedMotion() ?? false;
  const { progress, style } = usePinnedScene(sectionRef, {
    lengthVh: 280,
    mobileLengthVh: 200,
    smooth: true,
  });

  const glow = useTransform(progress, [0.1, 0.34], reduced ? [0.7, 0.7] : [0, 0.9], {
    clamp: true,
  });
  const monumentO = useTransform(progress, [0.06, 0.26], reduced ? [1, 1] : [0.16, 1], {
    clamp: true,
  });
  const monumentScale = useTransform(progress, [0.06, 0.3], reduced ? [1, 1] : [1.06, 1], {
    clamp: true,
  });
  const bodyO = useTransform(progress, [0.28, 0.46], reduced ? [1, 1] : [0, 1], { clamp: true });
  const bodyY = useTransform(progress, [0.28, 0.46], [14 * amp, 0], { clamp: true });
  const footnoteO = useTransform(progress, [0.5, 0.68], reduced ? [1, 1] : [0, 1], {
    clamp: true,
  });
  const footnoteY = useTransform(progress, [0.5, 0.68], [12 * amp, 0], { clamp: true });

  return (
    <section ref={sectionRef} style={style} className="relative">
      <div className="sticky top-0 flex h-[100dvh] items-center overflow-hidden pb-[calc(3.5rem+env(safe-area-inset-bottom))] md:h-screen">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col items-center justify-center px-5 text-center sm:px-6 md:px-14">
          <motion.h2
            style={{ opacity: monumentO, scale: monumentScale }}
            className="relative isolate origin-center font-display text-[clamp(4.5rem,min(18vw,22dvh),13rem)] font-light leading-none tracking-[-0.04em] text-paper"
          >
            <motion.span
              aria-hidden
              style={{ opacity: glow }}
              className="pointer-events-none absolute left-1/2 top-[46%] -z-10 h-[1.22em] w-[1.72em] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--color-brass)_46%,transparent)_0%,transparent_74%)]"
            />
            Trust<span className="italic text-brass">.</span>
          </motion.h2>

          <motion.p
            style={{ opacity: bodyO, y: bodyY }}
            className="mt-10 max-w-[46ch] text-pretty text-[clamp(1.05rem,2vw,1.2rem)] font-light leading-[1.55] text-paper/88 sm:mt-12 md:mt-14"
          >
            {BODY}
          </motion.p>

          <motion.p
            style={{ opacity: footnoteO, y: footnoteY }}
            className="mt-10 max-w-[40ch] text-pretty text-[0.875rem] leading-relaxed text-paper/72 sm:mt-12 md:mt-16 md:text-[0.9375rem]"
          >
            {FOOTNOTE}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
