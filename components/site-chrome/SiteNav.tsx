"use client";

import { usePathname } from "next/navigation";
import {
  ThinqAssetNavLogo,
  THINQASSET_LOGO_ALT,
} from "@/components/brand/ThinqAssetNavLogo";
import { HeroButton } from "@/components/hero/HeroButton";
import { TransitionLink } from "@/components/transition/TransitionLink";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getHeaderConfig,
  getHeaderVisualMode,
  HEADER_CTA,
  isHeaderDarkContent,
  SITE_NAV_LINKS,
  type NavLinkItem,
} from "@/lib/site-chrome/headerConfig";
import "./header.css";
import { SiteMobileMenu } from "./SiteMobileMenu";
import { useHeaderScrollState } from "./useHeaderScrollState";

function headerShellClass(mode: ReturnType<typeof getHeaderVisualMode>) {
  if (mode === "solid-light") return "site-header--solid-light";
  if (mode === "solid-dark") return "site-header--solid-dark";
  return "site-header--transparent";
}

function pillClass(mode: ReturnType<typeof getHeaderVisualMode>) {
  if (mode === "floating") return "site-header__pill--floating";
  if (mode === "solid-light") return "site-header__pill--solid-light";
  if (mode === "solid-dark") return "site-header__pill--solid-dark";
  return "site-header__pill--transparent";
}

function NavDropdownItem({
  link,
  navTone,
  pathname,
}: {
  link: NavLinkItem;
  navTone: "light" | "dark";
  pathname: string;
}) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const isChildActive = link.children?.some((child) => pathname === child.href);

  return (
    <div
      className="relative flex items-center self-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="true"
        className={[
          "site-header__nav-link",
          `site-header__nav-link--${navTone}`,
          "group inline-flex items-center gap-1 cursor-pointer bg-transparent border-0 p-0 text-left",
          isChildActive ? "!text-[color:var(--ta-gold)]" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <span>{link.label}</span>
        <svg
          width="8"
          height="5"
          viewBox="0 0 8 5"
          fill="none"
          className={`transition-transform duration-250 ease-out ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M1 1L4 4L7 1"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 -translate-x-1/2 top-full pt-2.5 z-50 min-w-[240px]"
          >
            <div
              className="overflow-hidden rounded-2xl border border-white/15 p-1.5 shadow-[0_24px_48px_-10px_rgba(0,0,0,0.75),inset_0_1px_1px_rgba(255,255,255,0.22)] backdrop-blur-2xl"
              style={{
                backgroundColor: "rgba(18, 23, 31, 0.94)",
              }}
            >
              {link.children?.map((child) => {
                const isActive = pathname === child.href;
                return (
                  <TransitionLink
                    key={child.href}
                    href={child.href}
                    onClick={() => setOpen(false)}
                    className={[
                      "group flex items-center justify-between rounded-xl px-4 py-2.5 text-[13.5px] font-[family-name:var(--font-lp-saturnia)] tracking-[-0.01em] transition-all duration-200",
                      isActive
                        ? "bg-white/10 text-[color:var(--ta-gold)] font-medium"
                        : "text-white/80 hover:bg-white/[0.08] hover:text-[color:var(--ta-gold)]",
                    ].join(" ")}
                  >
                    <span>{child.label}</span>
                    {isActive ? (
                      <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--ta-gold)] shadow-[0_0_8px_var(--ta-gold)]" />
                    ) : (
                      <span className="opacity-0 -translate-x-1 text-[10px] text-[color:var(--ta-gold)] transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0">
                        →
                      </span>
                    )}
                  </TransitionLink>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function SiteNav() {
  const pathname = usePathname();
  const headerConfig = getHeaderConfig(pathname);
  const { isScrolled } = useHeaderScrollState();
  const visualMode = getHeaderVisualMode(isScrolled, headerConfig);
  const useDarkContent = isHeaderDarkContent(visualMode);
  const navTone = useDarkContent ? "light" : "dark";

  return (
    <header
      className={["site-header", headerShellClass(visualMode)].join(" ")}
      data-transition-nav
    >
      <div
        className={[
          "site-header__outer",
          isScrolled
            ? "site-header__outer--floating"
            : "site-header__outer--expanded",
        ].join(" ")}
      >
        <div className={["site-header__pill", pillClass(visualMode)].join(" ")}>
          <TransitionLink
            href="/"
            className="site-header__logo-link"
            aria-label={`${THINQASSET_LOGO_ALT} home`}
          >
            <div
              className={[
                "site-header__logo-wrap",
                isScrolled ? "site-header__logo-wrap--compact" : "",
                useDarkContent ? "site-header__logo-wrap--invert" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <ThinqAssetNavLogo />
            </div>
          </TransitionLink>

          <nav className="site-header__nav" aria-label="Primary">
            {SITE_NAV_LINKS.map((link) => {
              if (link.children) {
                return (
                  <NavDropdownItem
                    key={link.label}
                    link={link}
                    navTone={navTone}
                    pathname={pathname}
                  />
                );
              }

              return (
                <TransitionLink
                  key={link.href}
                  href={link.href}
                  className={[
                    "site-header__nav-link",
                    `site-header__nav-link--${navTone}`,
                  ].join(" ")}
                >
                  {link.label}
                </TransitionLink>
              );
            })}
          </nav>

          <div className="site-header__cta-wrap">
            <HeroButton href={HEADER_CTA.href} label={HEADER_CTA.label} />
          </div>

          <SiteMobileMenu
            isScrolled={isScrolled}
            useDarkContent={useDarkContent}
          />
        </div>
      </div>
    </header>
  );
}
