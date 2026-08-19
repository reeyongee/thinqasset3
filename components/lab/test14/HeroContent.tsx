"use client";

import { GlowButton } from "@/components/ui/GlowButton";
import {
  GLOBE_SCROLL_HERO,
  GLOBE_SCROLL_JURISDICTIONS,
} from "@/components/globe-scroll/content";
import "./hero.css";

/**
 * "world" in several languages. Arabic (`عالم`) and Hindi (`दुनिया`)
 * appear twice as often as the others.
 */
const ODOMETER_WORDS = [
  "dunia.",
  "عالم",
  "दुनिया",
  "monde.",
  "عالم",
  "Welt.",
  "दुनिया",
  "mundo.",
  "世界.",
  "عالم",
  "мир.",
  "दुनिया",
  "mondo.",
  "wereld.",
  "세계.",
  "dunia.",
  "عالم",
  "दुनिया",
];

function odometerKeyframes(rowCount: number) {
  const slots = rowCount - 1;
  const slot = 100 / slots;
  const hold = slot * 0.76;
  const lines: string[] = [];

  for (let i = 0; i < slots; i += 1) {
    const y = (-(i * 100) / rowCount).toFixed(4);
    const start = i * slot;
    const holdEnd = start + hold;
    lines.push(
      `${start.toFixed(3)}%, ${holdEnd.toFixed(3)}% { transform: translateY(${y}%); animation-timing-function: cubic-bezier(0.7, 0, 0.2, 1); }`,
    );
  }

  const lastY = (-((rowCount - 1) * 100) / rowCount).toFixed(4);
  lines.push(
    `${((slots - 1) * slot + hold).toFixed(3)}%, 99.85% { transform: translateY(${lastY}%); }`,
  );
  lines.push("100% { transform: translateY(0); }");

  return `@keyframes prism-hero-odometer { ${lines.join(" ")} }`;
}

export function HeroContent() {
  const rows = ["world.", ...ODOMETER_WORDS, "world."];
  const durationSec = Math.max(18, rows.length * 2.2);

  return (
    <div className="prism-hero">
      <style>{`
        ${odometerKeyframes(rows.length)}
        @media (prefers-reduced-motion: no-preference) {
          .prism-hero__odometer-track {
            animation: prism-hero-odometer ${durationSec}s linear 2.2s infinite;
          }
        }
      `}</style>

      <div className="prism-hero__content">
        <h1 className="prism-hero__headline" data-transition-text="headline">
          {GLOBE_SCROLL_HERO.title}
          <span className="prism-hero__title-accent">
            {GLOBE_SCROLL_HERO.titleAccent}
          </span>
        </h1>

        <p
          className="prism-hero__body"
          data-transition-text="body"
          aria-label="Connecting the world."
        >
          <span className="prism-hero__body-lead" aria-hidden="true">
            <span className="prism-hero__body-prefix">Connecting the</span>
            <span className="prism-hero__odometer">
              <span className="prism-hero__odometer-track">
                {rows.map((word, i) => (
                  <span
                    key={`${word}-${i}`}
                    className="prism-hero__odometer-row"
                    lang={
                      word === "عالم"
                        ? "ar"
                        : word === "दुनिया"
                          ? "hi"
                          : word === "dunia."
                            ? "id"
                            : word === "мир."
                              ? "ru"
                              : word === "世界."
                                ? "zh"
                                : word === "세계."
                                  ? "ko"
                                  : undefined
                    }
                  >
                    <span className="prism-hero__odometer-strut" aria-hidden>
                      x
                    </span>
                    <span className="prism-hero__odometer-word">{word}</span>
                  </span>
                ))}
              </span>
            </span>
          </span>
        </p>

        <div className="prism-hero__ctas">
          <GlowButton
            href={GLOBE_SCROLL_HERO.ctaHref}
            variant="gold"
            size="sm"
            transitionItem
          >
            {GLOBE_SCROLL_HERO.ctaLabel}
          </GlowButton>
          <GlowButton href="/services" size="sm" transitionItem>
            Our services
          </GlowButton>
        </div>
      </div>

      <div className="prism-hero__logos" aria-label="Operating jurisdictions">
        <div className="prism-hero__logos-marquee">
          <ul>
            {GLOBE_SCROLL_JURISDICTIONS.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
