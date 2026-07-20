"use client";

import { useState } from "react";

export type ServiceDetailFaqItem = {
  question: string;
  answer: string;
};

type ServiceDetailFaqAccordionProps = {
  items: readonly ServiceDetailFaqItem[];
};

function FaqToggleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M17 7L7 17M7 17H17M7 17V7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ServiceDetailFaqAccordion({
  items,
}: ServiceDetailFaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div>
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={item.question} className="faq-item sd-faq-item">
            <button
              type="button"
              className="sd-faq-trigger"
              aria-expanded={isOpen}
              onClick={() =>
                setOpenIndex((current) => (current === index ? null : index))
              }
            >
              <span className="sd-faq-question">{item.question}</span>
              <span
                className={`sd-faq-toggle ${isOpen ? "is-open" : "is-closed"}`}
                aria-hidden
              >
                <FaqToggleIcon className="size-4" />
              </span>
            </button>

            <div
              className={`grid transition-all duration-200 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="sd-faq-answer">
                  <p className="m-0">{item.answer}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
