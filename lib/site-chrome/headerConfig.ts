export type HeaderVariant = "overlay" | "block";
export type HeaderTheme = "light" | "dark";
export type HeaderVisualMode =
  | "floating"
  | "transparent"
  | "solid-light"
  | "solid-dark";

export const HEADER_SCROLL_SCROLLED_THRESHOLD = 70;
export const HEADER_SCROLL_HIDE_THRESHOLD = 400;

export type HeaderConfig = {
  variant: HeaderVariant;
  theme: HeaderTheme;
};

export const SITE_NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Why ThinqAsset", href: "/#why-thinqasset" },
  { label: "Global Footprint", href: "/#global-footprint" },
] as const;

export const HEADER_CTA = {
  label: "Consultation",
  href: "/contact",
} as const;

const DEFAULT_HEADER: HeaderConfig = {
  variant: "block",
  theme: "dark",
};

const ROUTE_HEADER: Record<string, HeaderConfig> = {
  "/": { variant: "overlay", theme: "light" },
  "/contact": { variant: "block", theme: "dark" },
};

export function getHeaderConfig(pathname: string): HeaderConfig {
  if (ROUTE_HEADER[pathname]) {
    return ROUTE_HEADER[pathname];
  }

  if (pathname.startsWith("/services")) {
    return { variant: "block", theme: "dark" };
  }

  return DEFAULT_HEADER;
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
