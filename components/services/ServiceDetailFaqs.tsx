"use client";

import { useRef } from "react";
import { ServiceDetailFaqAccordion } from "./ServiceDetailFaqAccordion";
import type { ServiceDetailFaqItem } from "./ServiceDetailFaqAccordion";
import { useServiceDetailFaqsAnimation } from "./useServiceDetailFaqsAnimation";

export type ServiceDetailFaqsProps = {
  headline: string;
  items: readonly ServiceDetailFaqItem[];
};

function splitServiceFaqHeadline(headline: string) {
  const marker = " about ";
  const index = headline.indexOf(marker);
  if (index === -1) {
    return { lead: headline, accent: null as string | null };
  }

  return {
    lead: headline.slice(0, index),
    accent: headline.slice(index + 1),
  };
}

export function ServiceDetailFaqs({ headline, items }: ServiceDetailFaqsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { lead, accent } = splitServiceFaqHeadline(headline);

  useServiceDetailFaqsAnimation({ sectionRef });

  return (
    <section ref={sectionRef} className="sd-faqs sd-section" aria-labelledby="sd-faqs-heading">
      <div className="sd-container">
        <div className="sd-faqs-body">
          <div className="sd-faqs-headline-col">
            <div className="sd-faqs-headline-sticky">
              <h2 id="sd-faqs-heading" className="sd-faqs-headline sd-h2">
                {lead}
                {accent ? (
                  <>
                    {" "}
                    <span className="sd-faqs-headline-accent">{accent}</span>
                  </>
                ) : null}
              </h2>
            </div>
          </div>

          <div className="sd-faqs-list">
            <ServiceDetailFaqAccordion items={items} />
          </div>
        </div>
      </div>
    </section>
  );
}
