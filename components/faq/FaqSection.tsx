"use client";

import { useCallback, useRef, useState } from "react";
import { FAQ_ITEMS } from "./constants";
import { FaqHeadline } from "./FaqHeadline";
import { FaqItem } from "./FaqItem";
import { useFaqAnimations } from "./useFaqAnimations";

export function FaqSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  useFaqAnimations({ sectionRef });

  const toggleItem = useCallback((id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="faq-section section-deferred-paint section-intrinsic-md mx-auto flex w-full max-w-[1200px] scroll-mt-10 rounded-[40px] px-4 py-24 min-[810px]:px-6"
      aria-labelledby="faq-heading"
    >
      <div className="flex w-full flex-col items-start gap-10 min-[1200px]:flex-row min-[1200px]:gap-10">
        <FaqHeadline />

        <div className="faq-accordion flex w-full min-w-0 flex-col gap-3 min-[1200px]:flex-[1_0_0]">
          {FAQ_ITEMS.map((item) => (
            <div key={item.id} className="faq-item-reveal will-change-transform">
              <FaqItem
                item={item}
                open={openId === item.id}
                onToggle={() => toggleItem(item.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
