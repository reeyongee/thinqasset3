"use client";

import { useState } from "react";
import { FAQ_ITEMS } from "@/components/faq/constants";
import { MobileReveal } from "../MobileReveal";

export function MobileFaq() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);

  return (
    <section
      id="faq"
      className="mobile-section"
      aria-labelledby="mobile-faq-heading"
    >
      <MobileReveal>
        <h2 id="mobile-faq-heading" className="mobile-section__headline">
          Your questions, <span className="text-token-muted">clearly answered</span>
        </h2>
      </MobileReveal>

      <div className="mt-6 flex flex-col gap-3">
        {FAQ_ITEMS.map((item, index) => {
          const open = openId === item.id;

          return (
            <MobileReveal key={item.id} delay={index * 0.03}>
              <article className="mobile-card overflow-hidden">
                <button
                  type="button"
                  className="mobile-accordion__trigger mobile-pressable"
                  aria-expanded={open}
                  onClick={() =>
                    setOpenId((current) => (current === item.id ? null : item.id))
                  }
                >
                  <span>{item.question}</span>
                  <span aria-hidden className="text-ta-gold">
                    {open ? "−" : "+"}
                  </span>
                </button>

                <div
                  className="mobile-accordion__panel"
                  style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                >
                  <div className="mobile-accordion__panel-inner">
                    <p className="mobile-section__body p-4 pt-0 text-sm">
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
