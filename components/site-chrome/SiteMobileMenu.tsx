"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { HeroButton } from "@/components/hero/HeroButton";
import { TransitionLink } from "@/components/transition/TransitionLink";
import {
  HEADER_CTA,
  SITE_NAV_LINKS,
} from "@/lib/site-chrome/headerConfig";
import {
  lockPageScroll,
  unlockPageScroll,
} from "@/lib/scroll/lockPageScroll";

function subscribeNoop() {
  return () => {};
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

function isNavLinkActive(href: string, pathname: string, hash: string) {
  if (href.includes("#")) {
    const [pathPart, hashPart] = href.split("#");
    const basePath = pathPart || "/";
    if (pathname !== basePath) return false;
    return hash === `#${hashPart}`;
  }

  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

type SiteMobileMenuProps = {
  isScrolled: boolean;
  useDarkContent: boolean;
};

export function SiteMobileMenu({
  isScrolled,
  useDarkContent,
}: SiteMobileMenuProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hash, setHash] = useState("");
  const mounted = useSyncExternalStore(
    subscribeNoop,
    getClientSnapshot,
    getServerSnapshot,
  );

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [pathname]);

  useEffect(() => {
    if (open) {
      lockPageScroll();
    } else {
      unlockPageScroll();
    }
    return () => {
      unlockPageScroll();
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      document.documentElement.setAttribute("data-mobile-menu-open", "");
    } else {
      document.documentElement.removeAttribute("data-mobile-menu-open");
    }

    return () => {
      document.documentElement.removeAttribute("data-mobile-menu-open");
    };
  }, [open]);

  const menuIconClass = open
    ? "site-header__menu-btn--overlay-open"
    : useDarkContent
      ? "text-[var(--ta-navy)]"
      : "text-white";

  const headerOffset = isScrolled ? "4rem" : "5rem";

  const overlay = (
    <div
      className={[
        "site-mobile-menu",
        open ? "site-mobile-menu--open" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      id="site-mobile-menu-panel"
      style={{ height: "100dvh" }}
      aria-hidden={!open}
      inert={!open ? true : undefined}
    >
      <div className="site-mobile-menu__glass" aria-hidden />
      <div className="site-mobile-menu__warmth" aria-hidden />

      <div
        className="site-mobile-menu__body"
        style={{
          paddingTop: headerOffset,
          paddingBottom: "max(1.5rem, env(safe-area-inset-bottom, 1.5rem))",
        }}
      >
        <nav
          className="site-mobile-menu__nav"
          aria-label="Primary mobile"
        >
          {SITE_NAV_LINKS.map((link, index) => {
            const active = isNavLinkActive(link.href, pathname, hash);

            return (
              <TransitionLink
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={[
                  "site-mobile-menu__link",
                  active ? "site-mobile-menu__link--active" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={{
                  transitionDelay: open ? `${120 + index * 60}ms` : "0ms",
                }}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </TransitionLink>
            );
          })}
        </nav>

        <div
          className="site-mobile-menu__cta"
          style={{
            transitionDelay: open
              ? `${120 + SITE_NAV_LINKS.length * 60 + 80}ms`
              : "0ms",
          }}
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
        aria-controls="site-mobile-menu-panel"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="site-header__menu-bar site-header__menu-bar--top" />
        <span className="site-header__menu-bar site-header__menu-bar--mid" />
        <span className="site-header__menu-bar site-header__menu-bar--bottom" />
      </button>

      {mounted ? createPortal(overlay, document.body) : null}
    </>
  );
}
