"use client";

import { useRef, useState } from "react";
import { DeferredMount } from "@/components/scroll/DeferredMount";
import { FEATURES } from "./constants";
import { FeaturesHeadline } from "./FeaturesHeadline";
import { FlipFeatureCard } from "./FlipFeatureCard";
import { useFeaturesAnimations } from "./useFeaturesAnimations";

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [cardsReady, setCardsReady] = useState(false);
  useFeaturesAnimations({ sectionRef, enabled: cardsReady });

  return (
    <section
      ref={sectionRef}
      id="features"
      className="section-deferred-paint section-intrinsic-md mx-auto flex w-full max-w-[1200px] flex-col items-start justify-center px-4 py-24 min-[810px]:px-6"
      aria-labelledby="features-heading"
    >
      <div className="flex w-full flex-col gap-6">
        <FeaturesHeadline />

        <DeferredMount
          id="cards"
          rootMargin="500px"
          minHeight={520}
          onVisible={() => setCardsReady(true)}
          className="features-cards flex w-full flex-col gap-3 min-[810px]:max-[1199px]:grid min-[810px]:max-[1199px]:grid-cols-2 min-[1200px]:flex-row"
        >
          {FEATURES.map((feature, index) => (
            <FlipFeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </DeferredMount>
      </div>
    </section>
  );
}
