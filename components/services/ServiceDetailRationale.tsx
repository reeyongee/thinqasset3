"use client";

import Image from "next/image";
import { useRef } from "react";
import { ServiceDetailPrimaryCta } from "./ServiceDetailPrimaryCta";
import { useServiceDetailRationaleAnimation } from "./useServiceDetailRationaleAnimation";

export type ServiceDetailRationaleProps = {
  headline: string;
  paragraphs: readonly [string, string];
  image: {
    src: string;
    alt: string;
  };
  ctaHref?: string;
  ctaLabel?: string;
};

export function ServiceDetailRationale({
  headline,
  paragraphs,
  image,
  ctaHref = "/contact",
  ctaLabel = "Consultation",
}: ServiceDetailRationaleProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useServiceDetailRationaleAnimation({ sectionRef });

  return (
    <section ref={sectionRef} className="sd-rationale sd-section">
      <div className="sd-container">
        <div className="sd-glass sd-glass--split">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="sd-rationale-text order-2 flex flex-col justify-center lg:order-1">
              <h2 className="sd-rationale-headline sd-h2">{headline}</h2>
              <div className="sd-rationale-desc sd-body">
                {paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </div>
              <div className="sd-rationale-cta mt-6 sm:mt-7 lg:mt-8">
                <ServiceDetailPrimaryCta href={ctaHref} label={ctaLabel} />
              </div>
            </div>

            <div className="sd-rationale-image relative order-1 lg:order-2">
              <Image
                src={image.src}
                alt={image.alt}
                width={770}
                height={730}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
