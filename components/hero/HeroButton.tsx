"use client";

import { GlowButton } from "@/components/ui/GlowButton";
import { CTA_HREF } from "./constants";

type HeroButtonProps = {
  className?: string;
  animate?: boolean;
  animationDelay?: string;
  label?: string;
  href?: string;
  onClick?: () => void;
  transitionItem?: boolean;
};

export function HeroButton({
  className = "",
  animate = false,
  animationDelay = "0.2s",
  label = "Consultation",
  href = CTA_HREF,
  onClick,
  transitionItem = false,
}: HeroButtonProps) {
  const classNames = [animate ? "hero-fade-up" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <GlowButton
      href={href}
      className={classNames}
      style={animate ? { animationDelay } : undefined}
      onClick={onClick}
      transitionItem={transitionItem}
    >
      {label}
    </GlowButton>
  );
}
