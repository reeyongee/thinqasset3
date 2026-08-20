"use client";

import { useEffect } from "react";
import { signalIntroCompleteOnce } from "@/lib/transition/introControl";
import { HeroContent } from "./HeroContent";
import { PrismVideoBackground } from "./PrismVideoBackground";

export function PrismHero() {
  useEffect(() => {
    signalIntroCompleteOnce();
  }, []);

  return (
    <section
      data-prism-hero
      className="relative h-dvh w-full overflow-hidden"
      style={{ background: "#000105" }}
      aria-labelledby="prism-hero-heading"
    >
      <PrismVideoBackground contained />
      <HeroContent />
    </section>
  );
}
