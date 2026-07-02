"use client";

import type { FaqItemData } from "./constants";
import { FAQ_TOKENS } from "./constants";
import { FaqChevron } from "./FaqChevron";

type FaqItemProps = {
  item: FaqItemData;
  open: boolean;
  onToggle: () => void;
};

export function FaqItem({ item, open, onToggle }: FaqItemProps) {
  return (
    <div className="faq-item w-full overflow-hidden rounded-lg border border-[color:var(--token-btn-border)] bg-token-surface">
      <button
        type="button"
        className="faq-item-trigger flex w-full cursor-pointer items-center gap-3 border-0 bg-transparent p-5 text-left"
        aria-expanded={open}
        onClick={onToggle}
      >
        <span className="min-w-0 flex-1 select-none font-[family-name:var(--font-inter)] text-base font-medium leading-6 tracking-[-0.32px] text-white">
          {item.question}
        </span>
        <FaqChevron open={open} />
      </button>

      <div
        className="grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.12,0.23,0.17,0.99)]"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-2.5 px-5 pb-5">
            <p
              className="m-0 select-none font-[family-name:var(--font-inter)] text-base font-normal leading-[1.4] tracking-[-0.32px] [text-wrap:balance]"
              style={{ color: FAQ_TOKENS.muted }}
            >
              {item.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
