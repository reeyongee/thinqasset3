import { CONSULTATION_HREF } from "@/lib/transition/constants";

export type HeaderVariant = "overlay" | "block";
export type HeaderTheme = "light" | "dark";
export type HeaderVisualMode =
  | "floating"
  | "transparent"
  | "solid-light"
  | "solid-dark";

export const HEADER_SCROLL_SCROLLED_THRESHOLD = 70;

export type HeaderConfig = {
  variant: HeaderVariant;
  theme: HeaderTheme;
};

export const SITE_NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
] as const;

export const HEADER_CTA = {
  label: "Consultation",
  href: CONSULTATION_HREF,
} as const;

export function getHeaderConfig(pathname: string): HeaderConfig {
  if (pathname === "/") {
    return { variant: "overlay", theme: "light" };
  }

  return { variant: "overlay", theme: "light" };
}

export function getHeaderVisualMode(
  isScrolled: boolean,
  { variant, theme }: HeaderConfig,
): HeaderVisualMode {
  if (isScrolled) return "floating";

  if (variant === "overlay") {
    return "transparent";
  }

  return theme === "light" ? "solid-light" : "solid-dark";
}

export function isHeaderDarkContent(mode: HeaderVisualMode): boolean {
  return mode === "solid-light";
}
