"use client";

import Image from "next/image";
import { useState } from "react";
import { APPROACH_BODY, APPROACH_STEPS } from "@/components/our-approach/constants";
import { HeroButton } from "@/components/hero/HeroButton";
import { MobileReveal } from "../MobileReveal";

export function MobileApproach() {
  const [openId, setOpenId] = useState<string | null>(APPROACH_STEPS[0]?.id ?? null);

  return (
    <section
      id="use-cases"
      className="mobile-section"
      aria-labelledby="mobile-approach-heading"
    >
      <MobileReveal>
        <h2 id="mobile-approach-heading" className="mobile-section__headline">
          Built on expertise,{" "}
          <span className="text-ta-gold">deployed with discipline</span>
        </h2>
        <p className="mobile-section__body mt-3 max-w-[38ch]">{APPROACH_BODY}</p>
      </MobileReveal>

      <div className="mt-6 flex flex-col gap-3">
        {APPROACH_STEPS.map((step, index) => {
          const open = openId === step.id;

          return (
            <MobileReveal key={step.id} delay={index * 0.04}>
              <article className="mobile-card overflow-hidden">
                <button
                  type="button"
                  className="mobile-accordion__trigger mobile-pressable"
                  aria-expanded={open}
                  onClick={() =>
                    setOpenId((current) => (current === step.id ? null : step.id))
                  }
                >
                  <span>{step.title}</span>
                  <span aria-hidden className="text-ta-gold">
                    {open ? "−" : "+"}
                  </span>
                </button>

                <div
                  className="mobile-accordion__panel"
                  style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                >
                  <div className="mobile-accordion__panel-inner">
                    <div className="relative h-40 w-full">
                      <Image
                        src={step.image}
                        alt={step.imageAlt}
                        fill
                        sizes="100vw"
                        className="object-cover"
                      />
                    </div>
                    <p className="mobile-section__body p-4 text-sm">
                      {step.description}
                    </p>
                  </div>
                </div>
              </article>
            </MobileReveal>
          );
        })}
      </div>

      <MobileReveal className="mt-6">
        <HeroButton className="w-full" />
      </MobileReveal>
    </section>
  );
}
