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
  const entriesRef = useRef<SectionEntry[]>([]);
  const [, bump] = useState(0);

  const mount = useCallback((ref: RefObject<HTMLElement | null>, chapter: ScrollChapter) => {
    entriesRef.current = [...entriesRef.current, { ref, chapter }];
    bump((n) => n + 1);

    return () => {
      entriesRef.current = entriesRef.current.filter((entry) => entry.ref !== ref);
      bump((n) => n + 1);
    };
  }, []);

  const value = useMemo(() => ({ mount }), [mount]);
  const sections = entriesRef.current.map((entry) => entry.ref);
  const chapters = entriesRef.current.map((entry) => entry.chapter);

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
