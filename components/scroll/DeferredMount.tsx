"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type DeferredMountProps = {
  children: ReactNode;
  rootMargin?: string;
  minHeight?: number | string;
  className?: string;
  id?: string;
  onVisible?: () => void;
};

export function DeferredMount({
  children,
  rootMargin = "400px",
  minHeight,
  className,
  id,
  onVisible,
}: DeferredMountProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setMounted(true);
          onVisible?.();
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [rootMargin, onVisible]);

  return (
    <div
      ref={rootRef}
      id={id}
      className={className}
      style={!mounted && minHeight !== undefined ? { minHeight } : undefined}
    >
      {mounted ? children : null}
    </div>
  );
}
