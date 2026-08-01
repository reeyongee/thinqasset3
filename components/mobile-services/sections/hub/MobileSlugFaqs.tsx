"use client";

import { useState } from "react";
import type { ServiceFaqItem } from "@/components/services/constants";
import { MobileReveal } from "@/components/mobile-home/MobileReveal";

type MobileSlugFaqsProps = {
  headline: string;
  items: readonly ServiceFaqItem[];
};

export function MobileSlugFaqs({ headline, items }: MobileSlugFaqsProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      className="mobile-slug-section"
      aria-labelledby="mobile-slug-faqs-heading"
    >
      <MobileReveal>
        <h2
          id="mobile-slug-faqs-heading"
          className="mobile-services-section__headline"
        >
          {headline}
        </h2>
      </MobileReveal>

      <div className="mobile-slug-faqs__list">
        {items.map((item, index) => {
          const open = openIndex === index;

          return (
            <MobileReveal key={item.question} delay={index * 0.03}>
              <article className="mobile-card overflow-hidden">
                <button
                  type="button"
                  className="mobile-accordion__trigger mobile-pressable"
                  aria-expanded={open}
                  onClick={() =>
                    setOpenIndex((current) => (current === index ? null : index))
                  }
                >
                  <span>{item.question}</span>
                  <span aria-hidden className="mobile-slug-faqs__toggle">
                    {open ? "−" : "+"}
                  </span>
                </button>

                <div
                  className="mobile-accordion__panel"
                  style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                >
                  <div className="mobile-accordion__panel-inner">
                    <p className="mobile-slug-body mobile-slug-faqs__answer">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </article>
            </MobileReveal>
          );
        })}
      </div>
    </section>
  );
}
