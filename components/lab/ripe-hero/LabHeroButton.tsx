"use client";

import { GlowButton } from "@/components/ui/GlowButton";

type LabHeroButtonProps = {
  href: string;
  label: string;
  variant?: "default" | "gold";
};

export function LabHeroButton({
  href,
  label,
  variant = "default",
}: LabHeroButtonProps) {
  return (
    <div className="ripe-hero__button-appear" data-ripe-appear>
      <GlowButton href={href} variant={variant}>
        {label}
      </GlowButton>
    </div>
  );
}
