"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

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
      <span className="glow-button__base" aria-hidden />
      <span className="glow-button__glow-wrap" aria-hidden>
        <span className="glow-button__glow-square">
          <span className="glow-button__spinner glow-button__spinner--hover" />
          <span className="glow-button__spinner glow-button__spinner--mobile" />
        </span>
      </span>
      <span className="glow-button__inset" aria-hidden />
      <span className="glow-button__label">{children}</span>
    </button>
  );
}
