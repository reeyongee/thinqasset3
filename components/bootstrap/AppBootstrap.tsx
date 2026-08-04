"use client";

import { useLayoutEffect } from "react";
import { syncAppViewportHeight } from "@/lib/viewport/syncAppViewportHeight";
import { resetIntroSessionForReload, syncIntroPlayedFromSession } from "@/lib/transition/introControl";

export function AppBootstrap() {
  useLayoutEffect(() => {
    syncAppViewportHeight();

    const navigation = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;

    if (navigation?.type === "reload") {
      resetIntroSessionForReload();
      return;
    }

    syncIntroPlayedFromSession();
  }, []);

  return null;
}
