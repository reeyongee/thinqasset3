"use client";

import { TransitionLink } from "@/components/transition/TransitionLink";

type GlowButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  transitionItem?: boolean;
  variant?: "default" | "gold";
  size?: "md" | "sm";
  tabIndex?: number;
  "aria-hidden"?: boolean;
  "data-visible"?: boolean;
};

function isInternalRoute(href: string): boolean {
  return (
    href.startsWith("/") &&
    !href.startsWith("//") &&
    !href.includes("#") &&
    !href.startsWith("mailto:") &&
    !href.startsWith("tel:")
  );
}

function GlowButtonMarkup({ children }: { children: React.ReactNode }) {
  return (
    <>
      <span className="glow-button__base" aria-hidden />
      <span className="glow-button__glow-wrap" aria-hidden>
        <span className="glow-button__glow-square">
          <span className="glow-button__spinner glow-button__spinner--hover" />
          <span className="glow-button__spinner glow-button__spinner--mobile" />
        </span>
      </span>
      <span className="glow-button__inset" aria-hidden />
      <span className="glow-button__label">{children}</span>
    </>
  );
}

export function GlowButton({
  href,
  children,
  className = "",
  style,
  onClick,
  transitionItem = false,
  variant = "default",
  size = "md",
  tabIndex,
  "aria-hidden": ariaHidden,
  "data-visible": dataVisible,
}: GlowButtonProps) {
  const classNames = [
    "glow-button",
    "group",
    size === "sm" ? "glow-button--sm" : "",
    variant === "gold" ? "glow-button--gold" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const sharedProps = {
    className: classNames,
    style,
    onClick,
    tabIndex,
    "aria-hidden": ariaHidden,
    ...(dataVisible !== undefined ? { "data-visible": dataVisible } : {}),
  };

  if (isInternalRoute(href)) {
    return (
      <TransitionLink
        href={href}
        {...sharedProps}
        {...(transitionItem ? { "data-transition-item": true } : {})}
      >
        <GlowButtonMarkup>{children}</GlowButtonMarkup>
      </TransitionLink>
    );
  }

  return (
    <a href={href} {...sharedProps}>
      <GlowButtonMarkup>{children}</GlowButtonMarkup>
    </a>
  );
}
