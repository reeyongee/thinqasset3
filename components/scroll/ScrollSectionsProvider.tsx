"use client";

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import ChapterBar from "@/components/ChapterBar";
import ScrollIndicator from "@/components/ScrollIndicator";
import type { ScrollChapter } from "@/lib/scroll/types";

type SectionEntry = {
  ref: RefObject<HTMLElement | null>;
  chapter: ScrollChapter;
};

type ScrollSectionsContextValue = {
  mount: (ref: RefObject<HTMLElement | null>, chapter: ScrollChapter) => () => void;
};

const ScrollSectionsContext = createContext<ScrollSectionsContextValue | null>(null);

export function ScrollSectionsProvider({
  children,
  dockAboveFooter = true,
}: {
  children: ReactNode;
  dockAboveFooter?: boolean;
}) {
  const [entries, setEntries] = useState<SectionEntry[]>([]);

  const mount = useCallback((ref: RefObject<HTMLElement | null>, chapter: ScrollChapter) => {
    setEntries((prev) => [...prev, { ref, chapter }]);

    return () => {
      setEntries((prev) => prev.filter((entry) => entry.ref !== ref));
    };
  }, []);

  const value = useMemo(() => ({ mount }), [mount]);
  const sections = entries.map((entry) => entry.ref);
  const chapters = entries.map((entry) => entry.chapter);

  return (
    <ScrollSectionsContext.Provider value={value}>
      {sections.length > 0 ? (
        <ChapterBar sections={sections} chapters={chapters} dockAboveFooter={dockAboveFooter} />
      ) : null}
      <ScrollIndicator />
      {children}
    </ScrollSectionsContext.Provider>
  );
}

export function useScrollSection(chapter: ScrollChapter, enabled = true) {
  const ctx = useContext(ScrollSectionsContext);
  const ref = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!ctx || !enabled) return;
    return ctx.mount(ref, chapter);
  }, [ctx, enabled, chapter.num, chapter.label]);

  return ref;
}
