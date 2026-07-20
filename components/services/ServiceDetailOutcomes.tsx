"use client";

import Image from "next/image";
import { useRef } from "react";
import { BenefitCheckIcon } from "./BenefitCheckIcon";
import { useServiceDetailOutcomesAnimation } from "./useServiceDetailOutcomesAnimation";

export type ServiceDetailOutcomesProps = {
  headline: string;
  intro: string;
  benefits: readonly [string, string, string, string];
  image: {
    src: string;
    alt: string;
  };
};

export function ServiceDetailOutcomes({
  headline,
  intro,
  benefits,
  image,
}: ServiceDetailOutcomesProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useServiceDetailOutcomesAnimation({ sectionRef });

  return (
    <section ref={sectionRef} className="sd-outcomes sd-section">
      <div className="sd-container">
        <div className="sd-glass sd-glass--split">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="sd-outcomes-image relative">
              <Image
                src={image.src}
                alt={image.alt}
                width={770}
                height={730}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="sd-outcomes-text flex flex-col justify-center">
              <h2 className="sd-outcomes-headline sd-h2">{headline}</h2>
              <p className="sd-outcomes-desc sd-body">{intro}</p>
              <ul className="mt-4 flex flex-col sm:mt-5 lg:mt-6">
                {benefits.map((benefit, index) => (
                  <li
                    key={benefit}
                    className="sd-benefit relative py-4 sm:py-5 lg:py-6"
                  >
                    <div className="sd-benefit-border absolute left-0 top-0 h-px w-full" />
                    <div className="flex items-start gap-3">
                      <BenefitCheckIcon className="sd-benefit-icon size-6 shrink-0 text-ta-gold sm:size-7 lg:size-8" />
                      <span className="sd-benefit-text">{benefit}</span>
                    </div>
                    {index === benefits.length - 1 ? (
                      <div className="sd-benefit-border absolute bottom-0 left-0 h-px w-full" />
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
