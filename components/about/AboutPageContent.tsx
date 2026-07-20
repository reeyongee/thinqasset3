"use client";

import "./about.css";
import { AboutApproach } from "./AboutApproach";
import { AboutCta } from "./AboutCta";
import { AboutHero } from "./AboutHero";
import { AboutHistory } from "./AboutHistory";
import { AboutIntro } from "./AboutIntro";

export function AboutPageContent() {
  return (
    <div className="about-page">
      <AboutHero />
      <AboutIntro />
      <AboutHistory />
      <AboutApproach />
      <AboutCta />
    </div>
  );
}
