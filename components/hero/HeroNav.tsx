"use client";

import { useEffect, useState } from "react";
import {
  ThinqAssetNavLogo,
  THINQASSET_LOGO_ALT,
} from "@/components/brand/ThinqAssetNavLogo";
import { HeroButton } from "./HeroButton";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Why ThinqAsset", href: "/#why-thinqasset" },
  { label: "Global Footprint", href: "/#global-footprint" },
  { label: "Contact", href: "mailto:info@thinqasset.com" },
] as const;

const MENU_LINK_DELAYS = ["0.2s", "0.3s", "0.4s", "0.5s", "0.6s"] as const;

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative flex h-[31px] w-[31px] cursor-pointer items-center justify-center overflow-hidden">
      <span
        className={[
          "absolute left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-[7px] bg-white transition-transform duration-300 ease-[cubic-bezier(0.12,0.23,0.17,0.99)]",
          open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-[9px]",
        ].join(" ")}
      />
      <span
        className={[
          "absolute left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-[7px] bg-white transition-transform duration-300 ease-[cubic-bezier(0.12,0.23,0.17,0.99)]",
          open ? "top-1/2 -translate-y-1/2 -rotate-45 w-5" : "bottom-[9px]",
        ].join(" ")}
      />
    </span>
  );
}

export function HeroNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <div className="hero-nav-bar fixed inset-x-0 top-0 z-50 h-16">
        <nav className="flex h-full w-full flex-col items-center justify-center px-4 min-[810px]:mx-auto min-[810px]:max-w-[1200px] min-[810px]:px-6">
          <div className="flex h-10 w-full items-center justify-between">
            <a
              href="/"
              className="hero-nav-logo inline-flex shrink-0 items-center no-underline"
              aria-label={`${THINQASSET_LOGO_ALT} home`}
            >
              <ThinqAssetNavLogo />
            </a>

            <div className="hidden items-center gap-4 min-[1200px]:flex">
              {NAV_LINKS.map((link) => (
                <p key={link.label} className="m-0 leading-[1.4]">
                  <a
                    href={link.href}
                    className="hero-nav-link font-[family-name:var(--font-inter)] text-base font-normal tracking-[-0.32px] text-token-muted no-underline"
                  >
                    {link.label}
                  </a>
                </p>
              ))}
              <HeroButton />
            </div>

            <button
              type="button"
              className="flex items-center justify-center border-0 bg-transparent p-0 min-[1200px]:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <MenuIcon open={false} />
            </button>
          </div>
        </nav>
      </div>

      {menuOpen ? (
        <div
          className="menu-overlay fixed inset-0 z-[60] flex flex-col items-center justify-center min-[1200px]:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="menu-overlay__glass" aria-hidden />
          <nav className="flex flex-col items-center gap-0">
            {NAV_LINKS.map((link, index) => (
              <a
                key={link.label}
                href={link.href}
                className="menu-link font-display text-[48px] leading-[1.1] tracking-[-2px] text-token-muted no-underline"
                style={{ animationDelay: MENU_LINK_DELAYS[index] }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="absolute bottom-16 left-1/2 flex -translate-x-1/2 items-center justify-center border-0 bg-transparent p-0"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            <MenuIcon open />
          </button>
        </div>
      ) : null}
    </>
  );
}
