"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { HeroButton } from "@/components/hero/HeroButton";
import { TransitionLink } from "@/components/transition/TransitionLink";
import {
  HEADER_CTA,
  SITE_NAV_LINKS,
} from "@/lib/site-chrome/headerConfig";

function subscribeNoop() {
  return () => {};
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

type SiteMobileMenuProps = {
  isScrolled: boolean;
  useDarkContent: boolean;
};

export function SiteMobileMenu({
  isScrolled,
  useDarkContent,
}: SiteMobileMenuProps) {
  const [open, setOpen] = useState(false);
  const mounted = useSyncExternalStore(
    subscribeNoop,
    getClientSnapshot,
    getServerSnapshot,
  );

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const menuIconClass = useDarkContent
    ? "text-[var(--ta-navy)]"
    : "text-white";

  const overlay = (
    <div
      className={[
        "site-mobile-menu fixed inset-0 z-[55] bg-zinc-950 backdrop-blur-xl transition-all duration-500 ease-out",
        open
          ? "visible opacity-100"
          : "pointer-events-none invisible opacity-0",
      ].join(" ")}
      style={{ height: "100dvh" }}
      aria-hidden={!open}
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black"
        aria-hidden
      />
      <div
        className="absolute left-0 top-0 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl"
        aria-hidden
      />
      <div
        className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl"
        aria-hidden
      />

      <button
        type="button"
        onClick={() => setOpen(false)}
        className={[
          "absolute flex h-10 w-10 items-center justify-center text-white transition-all duration-500 ease-out",
          isScrolled ? "right-9 top-6.5" : "right-5 top-6.5 sm:right-11 sm:top-6.5",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
        style={{ zIndex: 60 }}
        aria-label="Close menu"
        tabIndex={open ? 0 : -1}
      >
        <span className="absolute h-[1.5px] w-8 rotate-45 bg-current transition-all duration-300 ease-out" />
        <span className="absolute h-[1.5px] w-8 -rotate-45 bg-current transition-all duration-300 ease-out" />
      </button>

      <div className={isScrolled ? "relative z-10 h-16" : "relative z-10 h-20"} />

      <div
        className="relative z-10 flex flex-col justify-between px-6 sm:px-8"
        style={{
          minHeight: `calc(100dvh - ${isScrolled ? "64px" : "80px"})`,
          paddingBottom: "max(2rem, env(safe-area-inset-bottom, 2rem))",
        }}
      >
        <div className="flex flex-1 items-center">
          <nav className="flex w-full flex-col gap-1">
            {SITE_NAV_LINKS.map((link, index) => (
              <TransitionLink
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={[
                  "group relative overflow-hidden rounded-2xl px-6 py-2 text-4xl font-semibold text-white transition-all duration-300 hover:bg-white/5",
                  open ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0",
                ].join(" ")}
                style={{
                  transitionDelay: open ? `${index * 75}ms` : "0ms",
                }}
              >
                <span className="relative z-10">{link.label}</span>
                <div
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 transition-transform duration-300 group-hover:translate-x-0"
                  aria-hidden
                />
              </TransitionLink>
            ))}
          </nav>
        </div>

        <div
          className={[
            "transition-all duration-500",
            open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
          ].join(" ")}
        >
          <HeroButton
            href={HEADER_CTA.href}
            label={HEADER_CTA.label}
            className="w-full"
            onClick={() => setOpen(false)}
          />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        type="button"
        className={["site-header__menu-btn", menuIconClass].join(" ")}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span
          className={[
            "site-header__menu-bar",
            open ? "translate-y-[0.4375rem] rotate-45" : "",
          ].join(" ")}
        />
        <span
          className={[
            "site-header__menu-bar",
            open ? "scale-0 opacity-0" : "",
          ].join(" ")}
        />
        <span
          className={[
            "site-header__menu-bar",
            open ? "-translate-y-[0.4375rem] -rotate-45" : "",
          ].join(" ")}
        />
      </button>

      {mounted ? createPortal(overlay, document.body) : null}
    </>
  );
}
