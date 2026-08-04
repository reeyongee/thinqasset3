import type { SiteChromeConfig } from "./config";

export function shouldUseSharedScrollChrome(pathname: string, chrome: SiteChromeConfig): boolean {
  if (pathname === "/") return false;
  if (pathname === "/about") return false;
  if (!chrome.chrome) return false;
  return true;
}

export function shouldUseInnerSiteFrame(pathname: string, chrome: SiteChromeConfig): boolean {
  if (pathname === "/") return false;
  if (!chrome.chrome) return false;
  return true;
}
