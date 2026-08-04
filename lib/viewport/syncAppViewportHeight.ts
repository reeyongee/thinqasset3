/** Sync visible viewport size to CSS vars — stable on resize, not per scroll frame. */
export function syncAppViewportHeight() {
  if (typeof window === "undefined") return;

  const vv = window.visualViewport;
  const h = Math.round(vv?.height ?? window.innerHeight);
  const w = Math.round(vv?.width ?? window.innerWidth);

  document.documentElement.style.setProperty("--app-vh", `${h}px`);
  document.documentElement.style.setProperty("--app-vw", `${w}px`);
}
