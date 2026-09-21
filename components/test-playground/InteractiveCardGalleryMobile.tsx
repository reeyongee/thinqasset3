"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FooterArrowIcon } from "@/components/footer/icons/FooterArrowIcon";
import Grain from "@/components/primitives/Grain";
import { GlowRing } from "@/components/ui/GlowButton";

type TeamMember = {
  id: string;
  image: string;
  role: string;
  name: string;
  bio: string[];
};

const FLUID_EASE = [0.22, 1, 0.36, 1] as const;

type InteractiveCardGalleryMobileProps = {
  title: string;
  members: TeamMember[];
};

export function InteractiveCardGalleryMobile({
  title,
  members,
}: InteractiveCardGalleryMobileProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();
  const duration = reduceMotion ? 0 : 0.38;
  const selectedIndex = members.findIndex((c) => c.id === selectedId);
  const selectedCard = selectedIndex !== -1 ? members[selectedIndex] : null;

  const hasMounted = useRef(false);
  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  }, [selectedId, reduceMotion]);

  const goToNext = useCallback(() => {
    if (selectedIndex < 0) return;
    const nextIdx = (selectedIndex + 1) % members.length;
    setSelectedId(members[nextIdx].id);
  }, [selectedIndex, members]);

  const goToPrev = useCallback(() => {
    if (selectedIndex < 0) return;
    const prevIdx = (selectedIndex - 1 + members.length) % members.length;
    setSelectedId(members[prevIdx].id);
  }, [selectedIndex, members]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedId(null);
      } else if (e.key === "ArrowRight" && selectedCard) {
        goToNext();
      } else if (e.key === "ArrowLeft" && selectedCard) {
        goToPrev();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedCard, goToNext, goToPrev]);

  return (
    <div
      data-transition-page
      className={`relative w-full bg-transparent px-4 pt-[calc(var(--site-header-height-floating)+1.25rem)] selection:bg-[color:var(--ta-gold)]/20 selection:text-white ${
        selectedCard
          ? "pb-[calc(6.25rem+env(safe-area-inset-bottom,0px))]"
          : "pb-20"
      }`}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .site-bg { display: block !important; }
            html { background-color: var(--ta-navy-deep) !important; }
            body {
              background: transparent !important;
              margin: 0 !important;
              padding: 0 !important;
            }
          `,
        }}
      />
      <Grain />

      <AnimatePresence mode="wait" initial={false}>
        {selectedCard ? (
          <motion.article
            key={`profile-${selectedCard.id}`}
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 10 }}
            transition={{ duration, ease: FLUID_EASE }}
            className="relative z-10"
          >
            <button
              type="button"
              onClick={() => setSelectedId(null)}
              aria-label={`Close ${selectedCard.name} profile`}
              className="relative block w-full overflow-hidden rounded-[14px] border border-white/10 bg-ta-maroon text-left shadow-[0_28px_56px_-12px_rgba(0,0,0,0.85),inset_0_1px_1px_0_rgba(255,255,255,0.25)]"
            >
              <span className="relative block aspect-[3/4] w-full">
                <Image
                  src={selectedCard.image}
                  alt=""
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover object-center"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-white/[0.06]"
                />
              </span>
            </button>

            <header className="mt-6">
              <h1 className="font-[family-name:var(--font-lp-saturnia)] text-[26px] font-normal leading-tight tracking-[0.015em] text-white">
                {selectedCard.name}
              </h1>
              <p className="mt-2 font-[family-name:var(--font-geist-mono)] text-[11px] font-bold uppercase leading-none tracking-[0.2em] text-[color:var(--ta-gold)]">
                {selectedCard.role}
              </p>
            </header>

            <div className="mt-6 space-y-4 font-[family-name:var(--font-inter)] text-base font-normal leading-[1.65] tracking-[-0.01em] text-[color:var(--ta-grey-light)]">
              {selectedCard.bio.map((paragraph, pIdx) => (
                <p key={pIdx}>{paragraph}</p>
              ))}
            </div>
          </motion.article>
        ) : (
          <motion.div
            key="overview"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: duration * 0.7, ease: FLUID_EASE }}
            className="relative z-10"
          >
            <h1 className="font-[family-name:var(--font-lp-saturnia)] text-[28px] font-normal leading-none tracking-[0.015em] text-white">
              {title}
            </h1>

            <ul className="mt-8 flex list-none flex-col gap-5 p-0">
              {members.map((card) => (
                <li key={card.id}>
                  <button
                    type="button"
                    data-card-id={card.id}
                    aria-label={`${card.name}, ${card.role}`}
                    onClick={() => setSelectedId(card.id)}
                    className="group relative block w-full overflow-hidden rounded-[14px] border border-white/10 bg-ta-maroon text-left shadow-[0_14px_36px_-8px_rgba(0,0,0,0.7),inset_0_1px_1px_0_rgba(255,255,255,0.12)] transition-[border-color,transform] duration-200 active:scale-[0.985] active:border-[color:var(--ta-gold)]/50"
                  >
                    <span className="relative block aspect-[3/4] w-full">
                      <Image
                        src={card.image}
                        alt=""
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover object-center"
                      />
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-white/[0.06]"
                      />
                    </span>

                    <span
                      className="absolute bottom-3.5 left-3.5 right-3.5 z-20 flex items-center justify-between gap-3 rounded-[12px] border border-white/20 p-2.5 pl-3.5 shadow-[0_8px_32px_0_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.22)] backdrop-blur-xl"
                      style={{
                        backgroundColor:
                          "color-mix(in srgb, var(--ta-maroon) 88%, transparent)",
                      }}
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-[family-name:var(--font-lp-saturnia)] text-[16px] font-normal leading-tight tracking-[0.015em] text-white">
                          {card.name}
                        </span>
                        <span className="mt-0.5 block truncate font-[family-name:var(--font-geist-mono)] text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--ta-gold)]">
                          {card.role}
                        </span>
                      </span>
                      <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border shadow-inner"
                        style={{
                          borderColor: "rgba(182, 160, 130, 0.6)",
                          backgroundColor: "rgba(182, 160, 130, 0.2)",
                        }}
                      >
                        <span className="relative h-2.5 w-2.5 text-[color:var(--ta-gold)]">
                          <FooterArrowIcon />
                        </span>
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {selectedCard ? (
        <nav
          aria-label="Profile controls"
          className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
        >
          <div
            className="gallery-chrome glow-button pointer-events-auto flex h-14 w-full max-w-[22rem] cursor-default items-center justify-between rounded-full"
            style={{ minHeight: "3.5rem", padding: "0 0.375rem" }}
          >
            <GlowRing />
            <div className="relative z-[1] flex min-h-11 items-center">
              <button
                type="button"
                onClick={goToPrev}
                title="Previous profile (Left Arrow)"
                aria-label="Previous profile"
                className="flex min-h-11 min-w-11 items-center justify-center text-[color:var(--ta-grey-light)] active:text-[color:var(--ta-gold)]"
              >
                ←
              </button>
              <span className="px-1 font-[family-name:var(--font-geist-mono)] text-[10px] tracking-widest text-[color:var(--ta-gold)]">
                0{selectedIndex + 1} / 0{members.length}
              </span>
              <button
                type="button"
                onClick={goToNext}
                title="Next profile (Right Arrow)"
                aria-label="Next profile"
                className="flex min-h-11 min-w-11 items-center justify-center text-[color:var(--ta-grey-light)] active:text-[color:var(--ta-gold)]"
              >
                →
              </button>
            </div>
            <button
              type="button"
              onClick={() => setSelectedId(null)}
              title="Return to gallery (Esc)"
              aria-label="Close profile"
              className="relative z-[1] flex min-h-11 items-center rounded-full px-4 font-[family-name:var(--font-geist-mono)] text-[11px] text-[color:var(--ta-grey-light)] active:text-white"
            >
              <span className="tracking-[0.14em]">CLOSE</span>
            </button>
          </div>
        </nav>
      ) : null}
    </div>
  );
}
