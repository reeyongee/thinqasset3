/**
 * Routes where Lenis must stay off.
 *
 * Lenis virtualizes scrolling and breaks GSAP ScrollTrigger scrub/pin and
 * Framer `useScroll` pinned scenes unless carefully proxied. Prefer native
 * document scroll on any page with scroll-linked choreography.
 */
export function usesNativeScroll(pathname: string): boolean {
  if (pathname === "/") return true;
  if (pathname === "/about") return true;
  if (pathname.startsWith("/services")) return true;
  if (pathname.startsWith("/lab/")) return true;
  if (pathname.startsWith("/test/")) return true;
  return false;
}
