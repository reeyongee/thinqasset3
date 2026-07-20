"use client";

import { HeroIntro } from "@/components/hero/HeroIntro";
import { ScrollStory } from "@/components/scroll-story/ScrollStory";

export function Hero() {
  return (
    <HeroIntro>
      <ScrollStory />
    </HeroIntro>
  );
}
