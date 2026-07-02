"use client";

import { useEffect } from "react";
import {
  initDeferredPaintRefresh,
  initScrollOrchestrator,
} from "@/lib/scroll/scrollOrchestrator";

export function ScrollOrchestratorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const cleanupOrchestrator = initScrollOrchestrator();
    const cleanupDeferredPaint = initDeferredPaintRefresh();
    return () => {
      cleanupOrchestrator();
      cleanupDeferredPaint();
    };
  }, []);

  return children;
}
