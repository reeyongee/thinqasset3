const LOCK_ATTR = "data-scroll-locked";

/** Freeze document scroll (pairs with Lenis stop in SmoothScroll). */
export function lockPageScroll() {
  document.documentElement.setAttribute(LOCK_ATTR, "");
  document.body.style.overflow = "hidden";
}

export function unlockPageScroll() {
  document.documentElement.removeAttribute(LOCK_ATTR);
  document.body.style.overflow = "";
}

export function isPageScrollLocked() {
  return document.documentElement.hasAttribute(LOCK_ATTR);
}
