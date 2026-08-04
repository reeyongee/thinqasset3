"use client";

import { RefObject } from "react";
import { motion, MotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useAmplitude, usePinnedScene } from "@/hooks/useScrollScene";

const CLOSING =
  "On behalf of our Board and the entire TBG family, thank you for your continued trust. We look forward to shaping the future together — with ambition, purpose, and an unwavering commitment to excellence.";

function Letter({ p, i, ch, reduced }: { p: MotionValue<number>; i: number; ch: string; reduced: boolean }) {
  const s = 0.04 + i * 0.04;
  const opacity = useTransform(p, [s, s + 0.09], [0, 1], { clamp: true });
  const blur = useTransform(p, [s, s + 0.09], ["blur(14px)", "blur(0px)"], { clamp: true });
  const y = useTransform(p, [s, s + 0.09], [30, 0], { clamp: true });

  return (
    <motion.span
      style={{ opacity, y, filter: reduced ? "none" : blur }}
      className={`inline-block will-change-transform ${ch === "." ? "italic text-brass" : ""}`}
    >
      {ch}
    </motion.span>
  );
}

export default function Trust({ sectionRef }: { sectionRef: RefObject<HTMLElement | null> }) {
  const amp = useAmplitude();
  const reduced = useReducedMotion() ?? false;
  const { progress, style } = usePinnedScene(sectionRef, {
    lengthVh: 380,
    mobileLengthVh: 260,
    smooth: false,
  });

  const glow = useTransform(progress, [0, 0.32], [0, 0.8], { clamp: true });

  // Reversed exit → entry: rises from below, de-blurs, fades in — then holds through the pin.
  const textO = useTransform(progress, (v) => {
    if (v <= 0.3) return 0;
    if (v >= 0.52) return 1;
    return (v - 0.3) / 0.22;
  });
  const textY = useTransform(progress, (v) => {
    if (v <= 0.3) return 44 * amp;
    if (v >= 0.52) return 0;
    return (44 * amp) * (1 - (v - 0.3) / 0.22);
  });
  const textBlur = useTransform(progress, (v) => {
    if (v <= 0.3) return "blur(12px)";
    if (v >= 0.52) return "blur(0px)";
    const t = (v - 0.3) / 0.22;
    return `blur(${12 * (1 - t)}px)`;
  });

  return (
    <section ref={sectionRef} style={style} className="relative bg-ink">
      <div className="sticky top-0 h-[100dvh] pb-[calc(3.5rem+env(safe-area-inset-bottom))] md:h-screen">

        <motion.div
          aria-hidden
          style={{ opacity: glow }}
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_40%_at_50%_50%,color-mix(in_srgb,var(--color-brass)_16%,transparent),transparent_70%)] md:bg-[radial-gradient(50%_40%_at_50%_38%,color-mix(in_srgb,var(--color-brass)_16%,transparent),transparent_70%)]"
        />

        <div className="relative flex h-full flex-col items-center justify-center px-5 sm:px-6 md:justify-start md:pb-[10vh] md:pt-[20vh]">
          <h2 className="w-full text-center font-display text-[clamp(3.6rem,22vw,16rem)] font-light leading-none tracking-[-0.02em] md:text-[clamp(5rem,19vw,16rem)]">
            {"Trust.".split("").map((ch, i) => (
              <Letter key={i} p={progress} i={i} ch={ch} reduced={reduced} />
            ))}
          </h2>

          <motion.p
            style={{
              opacity: textO,
              y: textY,
              filter: reduced ? "none" : textBlur,
            }}
            className="mt-8 max-w-[34ch] text-center text-[0.9375rem] leading-relaxed text-paper/65 sm:mt-10 sm:max-w-[58ch] sm:text-[clamp(0.95rem,1.35vw,1.05rem)]"
          >
            {CLOSING.split(" — ").map((part, i, arr) =>
              i < arr.length - 1 ? (
                <span key={i}>
                  {part} —{" "}
                </span>
              ) : (
                <em key={i} className="italic text-brass">
                  {part}
                </em>
              )
            )}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
