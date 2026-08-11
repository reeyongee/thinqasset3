"use client";

import type { ReactNode, RefObject } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useOptionalScrollSection } from "@/components/scroll/ScrollSection";
import type { ScrollChapter } from "@/lib/scroll/types";
import { useAmplitude } from "@/hooks/useScrollScene";
import { PAGE_HERO_IMAGES } from "@/lib/brand-assets";

const EASE = [0.22, 1, 0.36, 1] as const;
const DEFAULT_BG = PAGE_HERO_IMAGES.services;

export type PageHeroProps = {
  sectionRef?: RefObject<HTMLElement | null>;
  chapter?: ScrollChapter;
  lines: ReactNode[];
  subtitle?: ReactNode;
  meta?: readonly string[];
  imageSrc?: string;
  priority?: boolean;
};

export function PageHero({
  sectionRef: externalRef,
  chapter = { num: null, label: "Intro" },
  lines,
  subtitle,
  meta = [],
  imageSrc = DEFAULT_BG,
  priority = false,
}: PageHeroProps) {
  const amp = useAmplitude();
  const reduced = useReducedMotion() ?? false;
  const sectionRef = useOptionalScrollSection(chapter, externalRef);

  const { scrollYProgress: p } = useScroll({
    target: sectionRef as RefObject<HTMLElement>,
    offset: ["start start", "end start"] as never,
  });

  const bgY = useTransform(p, [0, 1], [0, 150 * amp]);
  const contentY = useTransform(p, [0, 1], [0, -90 * amp]);
  const contentOpacity = useTransform(p, [0, 0.75], [1, 0], { clamp: true });

  const lineMotion = (delay: number) =>
    reduced
      ? { initial: false as const, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { delay, duration: 1.1, ease: EASE },
        };

  const bgMotion = reduced
    ? { initial: false as const, animate: { opacity: 1 } }
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 1.4, ease: EASE },
      };

  return (
    <section ref={sectionRef} className="relative h-[100dvh] overflow-hidden bg-ink md:h-screen">
      <motion.div style={{ y: bgY }} className="absolute inset-[-10%] will-change-transform" {...bgMotion}>
        <Image
          src={imageSrc}
          alt=""
          fill
          priority={priority}
          sizes="100vw"
          className="object-cover opacity-[0.32] grayscale contrast-125"
        />
      </motion.div>
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--color-ink)_62%,transparent),color-mix(in_srgb,var(--color-ink)_18%,transparent)_45%,color-mix(in_srgb,var(--color-ink)_97%,transparent))]"
        {...bgMotion}
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col px-5 pb-[calc(3.5rem+env(safe-area-inset-bottom))] sm:px-6 md:px-14"
      >
        <div className="flex flex-1 flex-col justify-center">
          <div className="grid w-full items-end gap-6 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-7">
              <h1 className="max-w-[16ch] font-display text-[clamp(2rem,9vw,5.4rem)] font-light leading-[1.05] tracking-[-0.02em] md:max-w-[18ch] md:leading-[1.03]">
                {lines.map((line, i) => (
                  <motion.span key={i} className="block" {...lineMotion(0.25 + i * 0.13)}>
                    {line}
                  </motion.span>
                ))}
              </h1>
              {subtitle ? (
                <motion.p
                  className="mt-4 font-display text-[clamp(1.1rem,3.5vw,1.6rem)] italic text-paper/70 md:mt-5"
                  {...lineMotion(0.25 + lines.length * 0.13 + 0.14)}
                >
                  {subtitle}
                </motion.p>
              ) : null}
            </div>

            {meta.length > 0 ? (
              <div className="border-t border-line pt-4 md:col-span-4 md:col-start-9 md:border-t-0 md:pt-0">
                <div className="space-y-1.5 font-tmono text-[9px] uppercase tracking-[0.22em] text-paper/55 sm:text-[10px] sm:tracking-[0.24em]">
                  {meta.map((line, i) => (
                    <motion.p key={line} {...lineMotion(0.66 + i * 0.08)}>
                      {line}
                    </motion.p>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
