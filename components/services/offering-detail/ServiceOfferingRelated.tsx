"use client";

import Image from "next/image";
import { useRef } from "react";
import { TransitionLink } from "@/components/transition/TransitionLink";
import { useServiceOfferingRelatedAnimation } from "./useServiceOfferingRelatedAnimation";

export type OfferingRelatedCard = {
  href: string;
  index: string;
  title: string;
  summary: string;
  image: { src: string; alt: string };
};

export type ServiceOfferingRelatedProps = {
  headline?: string;
  pillarHref: string;
  pillarLabel: string;
  cards: readonly OfferingRelatedCard[];
};

export function ServiceOfferingRelated({
  headline = "Continue through the platform",
  pillarHref,
  pillarLabel,
  cards,
}: ServiceOfferingRelatedProps) {
  const sectionRef = useRef<HTMLElement>(null);
  useServiceOfferingRelatedAnimation({ sectionRef });

  return (
    <section ref={sectionRef} className="od-related sd-section">
      <div className="sd-container">
        <div className="od-related__header">
          <h2 className="od-related__headline sd-h2">{headline}</h2>
          <TransitionLink href={pillarHref} className="od-related__pillar-link">
            {pillarLabel}
            <span aria-hidden> →</span>
          </TransitionLink>
        </div>

        <ul className="od-related__grid">
          {cards.map((card) => (
            <li key={card.href} className="od-related__card">
              <TransitionLink href={card.href} className="od-related__link">
                <div className="od-related__media">
                  <Image
                    src={card.image.src}
                    alt={card.image.alt}
                    width={640}
                    height={400}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="od-related__img"
                  />
                </div>
                <p className="od-related__index">{card.index}</p>
                <h3 className="od-related__title">{card.title}</h3>
                <p className="od-related__summary">{card.summary}</p>
              </TransitionLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
