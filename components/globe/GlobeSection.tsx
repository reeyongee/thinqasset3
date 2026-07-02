"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Globe } from "./Globe";
import { GlobeHeadline } from "./GlobeHeadline";
import { GlobeLocationCopy } from "./GlobeLocationCopy";
import { GLOBE_LOCATIONS } from "./constants";
import { useGlobeAnimations } from "./useGlobeAnimations";

export function GlobeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [activeLocationId, setActiveLocationId] = useState<string | null>(null);
  const [cardHeight, setCardHeight] = useState<number | undefined>(undefined);
  useGlobeAnimations({ sectionRef });

  const activeLocation = useMemo(
    () =>
      GLOBE_LOCATIONS.find((location) => location.id === activeLocationId) ??
      null,
    [activeLocationId],
  );

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const update = () => {
      const isDesktop = window.matchMedia("(min-width: 810px)").matches;
      setCardHeight(isDesktop ? card.offsetHeight : undefined);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(card);
    window.addEventListener("resize", update);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [activeLocation]);

  return (
    <section
      ref={sectionRef}
      id="global-footprint"
      className="globe-section mx-auto flex w-full max-w-[1200px] flex-col items-start justify-center gap-6 px-4 py-32 min-[810px]:px-6"
      aria-labelledby="global-footprint-heading"
    >
      <GlobeHeadline />

      <div className="globe-panel flex h-[640px] w-full flex-col gap-3 will-change-transform min-[810px]:h-auto min-[810px]:flex-row min-[810px]:items-start min-[810px]:overflow-visible">
        <div
          ref={cardRef}
          className="globe-copy-card order-0 flex h-[346px] shrink-0 flex-col items-start justify-center rounded-lg border border-[color:var(--token-btn-border)] bg-token-surface p-8 min-[810px]:order-1 min-[810px]:h-auto min-[810px]:justify-normal min-[810px]:p-10"
        >
          <GlobeLocationCopy activeLocation={activeLocation} />
        </div>

        <div
          className="globe-wrapper relative order-1 flex min-h-0 flex-1 flex-col items-center justify-center min-[810px]:order-2 min-[810px]:overflow-visible"
          style={cardHeight !== undefined ? { height: cardHeight } : undefined}
        >
          <div className="globe-canvas-shell relative aspect-square w-full shrink-0 max-w-[min(360px,calc(100vw-48px))] min-[810px]:absolute min-[810px]:top-1/2 min-[810px]:right-0 min-[810px]:-translate-y-1/2">
            <Globe onLocationClick={setActiveLocationId} />
            <div className="globe-drag-indicator" aria-hidden>
              Drag
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
