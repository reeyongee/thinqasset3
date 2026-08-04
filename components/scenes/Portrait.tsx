"use client";

import { RefObject } from "react";
import Image from "next/image";
import { motion, MotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import Kicker from "@/components/primitives/Kicker";
import { ThinqAssetLogoMark } from "@/components/brand/ThinqAssetLogoMark";
import { SCENE_SPRING, useAmplitude } from "@/hooks/useScrollScene";

/**
 * FounderPortrait — the designated home of the founder's photograph.
 * Pass `src` (e.g. "/images/founder.jpg") to replace the engraved placeholder plate.
 */
export function FounderPortrait({
  src,
  alt = "Founder & Chief Executive Officer, TBG Group Holding Ltd.",
  drift,
}: {
  src?: string;
  alt?: string;
  drift: MotionValue<number>;
}) {
  return (
    <div className="relative border border-line bg-ink2 p-3">
      <div className="relative aspect-[3/4] overflow-hidden border border-line">
        <motion.div
          style={{ y: drift }}
          className="absolute inset-0 flex items-end justify-center will-change-transform"
        >
          {src ? (
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 768px) 90vw, 40vw"
              className="object-contain object-bottom"
            />
          ) : (
            <div className="relative flex h-full w-full items-center justify-center bg-[linear-gradient(160deg,color-mix(in_srgb,var(--color-ink2)_70%,var(--color-brass)),var(--color-ink))]">
              <span aria-hidden className="select-none font-display text-[24vh] italic leading-none text-paper/10">
                T
              </span>
              <span className="absolute bottom-6 font-tmono text-[9px] uppercase tracking-[0.3em] text-paper/45">
                Founder photograph — 3:4 plate
              </span>
            </div>
          )}
        </motion.div>
        {/* caption plate */}
        <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-line bg-ink/90 px-4 py-3 font-tmono text-[9px] uppercase tracking-[0.26em] text-paper/60">
          <span>Plate 01 — The Founder</span>
          <span>Office of the CEO</span>
        </figcaption>
      </div>
      {/* corner ticks */}
      {["top-1 left-1", "top-1 right-1", "bottom-1 left-1", "bottom-1 right-1"].map((pos) => (
        <span
          key={pos}
          aria-hidden
          className={`absolute ${pos} h-2 w-2 border-paper/30 ${pos.includes("top") ? "border-t" : "border-b"} ${pos.includes("left") ? "border-l" : "border-r"}`}
        />
      ))}
    </div>
  );
}

export default function Portrait({ sectionRef }: { sectionRef: RefObject<HTMLElement | null> }) {
  const amp = useAmplitude();
  const target = sectionRef as RefObject<HTMLElement>;

  const entry = useScroll({ target, offset: ["start end", "center center"] as never }).scrollYProgress;
  const smooth = useSpring(entry, SCENE_SPRING);
  const full = useScroll({ target, offset: ["start end", "end start"] as never }).scrollYProgress;

  const clipPath = useTransform(smooth, [0, 1], ["inset(0% 10% 14% 10%)", "inset(0% 0% 0% 0%)"]);
  const frameO = useTransform(smooth, [0, 0.35], [0, 1], { clamp: true });
  const drift = useTransform(full, [0, 1], [-14 * amp, 14 * amp]);
  const textO = useTransform(smooth, [0.3, 0.9], [0, 1], { clamp: true });
  const textY = useTransform(smooth, [0.3, 0.9], [28 * amp, 0], { clamp: true });

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-ink py-[12vh] pb-[calc(14vh+3.5rem+env(safe-area-inset-bottom))] text-paper md:py-[16vh]">
      <div className="mx-auto grid max-w-[1600px] gap-10 px-5 sm:gap-14 sm:px-6 md:grid-cols-12 md:px-14">
        {/* 5 columns, hard left — portrait plate */}
        <motion.figure style={{ clipPath, opacity: frameO }} className="md:col-span-5 md:col-start-1">
          <FounderPortrait
            src="/images/tbg-founder-portrait.webp"
            alt="Founder & Chief Executive Officer, TBG Group Holding Ltd."
            drift={drift}
          />
        </motion.figure>

        {/* 6 columns, offset down — the pull quote */}
        <motion.div style={{ opacity: textO, y: textY }} className="md:col-span-6 md:col-start-7 md:pt-[13vh]">
          <Kicker>05 — The Founder</Kicker>
          <blockquote className="mt-6 font-display text-[clamp(1.55rem,7vw,3.2rem)] font-light leading-[1.18] md:mt-9 md:leading-[1.16]">
            &ldquo;We are building more than a financial institution —{" "}
            <em className="italic text-brass">an enduring legacy</em> of excellence, integrity and responsible
            stewardship.&rdquo;
          </blockquote>

          <div className="mt-10 flex items-center gap-6">
            <ThinqAssetLogoMark height={56} className="shrink-0" />
            <div className="font-tmono text-[10px] uppercase leading-relaxed tracking-[0.26em] text-paper/55">
              <p>Founder &amp; Chief Executive Officer</p>
              <p>TBG Group Holding Ltd. — DIFC, Dubai</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
