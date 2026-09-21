import type { SiteChromeConfig } from "./config";

export function shouldUseSharedScrollChrome(pathname: string, chrome: SiteChromeConfig): boolean {
  if (pathname === "/") return false;
  if (pathname === "/about") return false;
  if (pathname.startsWith("/our-")) return false;
  if (pathname.startsWith("/test-playground")) return false;
  if (pathname === "/independent-directors") return false;
  if (pathname === "/board-and-governance" || pathname === "/board") return false;
  if (!chrome.chrome) return false;
  return true;
}

export function shouldUseInnerSiteFrame(pathname: string, chrome: SiteChromeConfig): boolean {
  if (pathname === "/") return false;
  if (!chrome.chrome) return false;
  return true;
}
