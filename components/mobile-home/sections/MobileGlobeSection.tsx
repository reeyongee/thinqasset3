"use client";

import { useMemo, useState } from "react";
import { Globe } from "@/components/globe/Globe";
import { GlobeLocationCopy } from "@/components/globe/GlobeLocationCopy";
import {
  GLOBE_LEAD,
  GLOBE_LOCATIONS,
  GLOBE_SUBHEADING,
} from "@/components/globe/constants";
import { MobileReveal } from "../MobileReveal";

export function MobileGlobeSection() {
  const [activeLocationId, setActiveLocationId] = useState<string | null>(null);

  const activeLocation = useMemo(
    () =>
      GLOBE_LOCATIONS.find((location) => location.id === activeLocationId) ??
      null,
    [activeLocationId],
  );

  return (
    <section
      id="global-footprint"
      className="mobile-section"
      aria-labelledby="mobile-globe-heading"
    >
      <MobileReveal className="flex flex-col gap-6">
        <h2 id="mobile-globe-heading" className="mobile-section__headline">
          Our Global
          <span className="text-ta-gold pl-[0.15em]">Footprint</span>
        </h2>
        <p className="mobile-section__body text-white">{GLOBE_LEAD}</p>
        <p className="mobile-section__body max-w-[38ch] text-sm leading-[1.55]">
          {GLOBE_SUBHEADING}
        </p>
      </MobileReveal>

      <MobileReveal className="mt-6">
        <div className="mobile-globe-shell">
          <Globe onLocationClick={setActiveLocationId} />
        </div>
      </MobileReveal>

      <MobileReveal className="mt-4">
        <div className="mobile-card p-5">
          <GlobeLocationCopy activeLocation={activeLocation} />
        </div>
      </MobileReveal>

      <div className="mt-4 flex flex-wrap gap-2">
        {GLOBE_LOCATIONS.map((location) => {
          const active = activeLocationId === location.id;

          return (
            <button
              key={location.id}
              type="button"
              className={[
                "mobile-pressable rounded-full border px-3 py-1.5 font-[family-name:var(--font-inter)] text-xs",
                active
                  ? "border-ta-gold bg-[color:var(--token-btn-bg-hover)] text-white"
                  : "border-[color:var(--token-btn-border)] text-token-muted",
              ].join(" ")}
              onClick={() =>
                setActiveLocationId((current) =>
                  current === location.id ? null : location.id,
                )
              }
            >
              {location.name}
            </button>
          );
        })}
      </div>
    </section>
  );
}
