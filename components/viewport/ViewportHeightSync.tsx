"use client";

import { useEffect } from "react";
import { syncAppViewportHeight } from "@/lib/viewport/syncAppViewportHeight";

export function ViewportHeightSync() {
  useEffect(() => {
    syncAppViewportHeight();

    const onResize = () => syncAppViewportHeight();

    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, []);

  return null;
}
