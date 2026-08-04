"use client";

import type { ReactNode, RefObject } from "react";
import { useScrollSection } from "@/components/scroll/ScrollSectionsProvider";
import type { ScrollChapter } from "@/lib/scroll/types";

type ScrollSectionProps = {
  chapter: ScrollChapter;
  children: ReactNode;
  className?: string;
  id?: string;
};

export function ScrollSection({ chapter, children, className, id }: ScrollSectionProps) {
  const ref = useScrollSection(chapter);

  return (
    <section ref={ref} id={id} className={className}>
      {children}
    </section>
  );
}

export function useOptionalScrollSection(
  chapter: ScrollChapter,
  externalRef?: RefObject<HTMLElement | null>,
) {
  const registeredRef = useScrollSection(chapter, !externalRef);
  return externalRef ?? registeredRef;
}
