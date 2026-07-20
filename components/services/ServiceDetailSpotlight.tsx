"use client";

import Image from "next/image";
import { useRef } from "react";
import type { ServiceSpotlightCard } from "./constants";
import { useServiceDetailSpotlightAnimation } from "./useServiceDetailSpotlightAnimation";

export type ServiceDetailSpotlightProps = {
  headline: string;
  subtitle?: string;
  cards: readonly [ServiceSpotlightCard, ServiceSpotlightCard];
};

export function ServiceDetailSpotlight({
  headline,
  subtitle,
  cards,
}: ServiceDetailSpotlightProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useServiceDetailSpotlightAnimation({ sectionRef });

  return (
    <section ref={sectionRef} className="sd-spotlight-section sd-section">
      <div className="sd-container">
        <div className="mb-10 flex flex-col gap-4 sm:mb-12 lg:mb-16">
          <h2 className="sd-spotlight-headline sd-h2">{headline}</h2>
          {subtitle ? (
            <p className="sd-spotlight-subtitle sd-body max-w-3xl">{subtitle}</p>
          ) : null}
        </div>

        <div className="sd-spotlight-grid">
          <div className="grid gap-x-10 gap-y-12 sm:gap-y-14 md:grid-cols-2 lg:gap-x-16 lg:gap-y-16">
            {cards.map((card, index) => (
              <div
                key={card.title}
                className={
                  index === 1
                    ? "flex flex-col gap-12 sm:gap-14 md:pt-20 lg:gap-16"
                    : "flex flex-col gap-12 sm:gap-14 lg:gap-16"
                }
              >
                <article>
                  <div className="card-image-wrap relative overflow-hidden rounded-3xl">
                    <Image
                      src={card.image.src}
                      alt={card.image.alt}
                      width={600}
                      height={600}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                      className="card-img aspect-square max-w-150 w-full object-cover"
                    />
                  </div>
                  <div className="card-meta mt-3 sm:mt-4 lg:mt-6">
                    <p>{card.meta}</p>
                  </div>
                  <h3 className="mt-2 font-[family-name:var(--font-inter)] text-xl font-semibold text-white sm:text-2xl">
                    {card.title}
                  </h3>
                  <p className="card-desc">{card.description}</p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
