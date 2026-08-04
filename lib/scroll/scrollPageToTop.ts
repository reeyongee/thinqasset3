/** Reset document scroll — used on route changes where Next.js may preserve position. */
export function scrollPageToTop(): void {
  if (typeof window === "undefined") return;

  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}
