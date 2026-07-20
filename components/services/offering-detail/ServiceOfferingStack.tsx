"use client";

import Image from "next/image";
import { useRef } from "react";
import type { OfferingCapability } from "./types";
import { useServiceOfferingStackAnimation } from "./useServiceOfferingStackAnimation";

export type ServiceOfferingStackProps = {
  headline?: string;
  capabilities: readonly OfferingCapability[];
  image: { src: string; alt: string };
};

export function ServiceOfferingStack({
  headline = "What you get",
  capabilities,
  image,
}: ServiceOfferingStackProps) {
  const sectionRef = useRef<HTMLElement>(null);
  useServiceOfferingStackAnimation({ sectionRef });

  return (
    <section ref={sectionRef} className="od-stack sd-section">
      <div className="sd-container">
        <h2 className="od-stack__headline sd-h2">{headline}</h2>

        <div className="od-stack__layout">
          <div className="od-stack__media-col">
            <div className="od-stack__sticky">
              <div className="od-stack__image">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={720}
                  height={900}
                  sizes="(max-width: 1024px) 100vw, 36vw"
                  className="od-stack__img"
                />
              </div>
            </div>
          </div>

          <ol className="od-stack__list">
            {capabilities.map((item, index) => (
              <li key={item.title} className="od-stack__item">
                <span className="od-stack__num" aria-hidden>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="od-stack__body">
                  <h3 className="od-stack__title">{item.title}</h3>
                  <p className="od-stack__detail">{item.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
