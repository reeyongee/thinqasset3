"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { GlowRing } from "@/components/ui/GlowButton";

type ContactFormButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

/** Native button using the site GlowButton visual (no arrow icon). */
export function ContactFormButton({
  children,
  className = "",
  ...props
}: ContactFormButtonProps) {
  return (
    <button
      type="button"
      className={["glow-button", "group", "contact-form-action", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <GlowRing />
      <span className="glow-button__label">{children}</span>
    </button>
  );
}
