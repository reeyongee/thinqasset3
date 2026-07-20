"use client";

import { usePathname } from "next/navigation";
import {
  ThinqAssetNavLogo,
  THINQASSET_LOGO_ALT,
} from "@/components/brand/ThinqAssetNavLogo";
import { HeroButton } from "@/components/hero/HeroButton";
import { TransitionLink } from "@/components/transition/TransitionLink";
import {
  getHeaderConfig,
  getHeaderVisualMode,
  HEADER_CTA,
  isHeaderDarkContent,
  SITE_NAV_LINKS,
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

export function SiteNav() {
  const pathname = usePathname();
  const headerConfig = getHeaderConfig(pathname);
  const { isScrolled, isHidden } = useHeaderScrollState();
  const visualMode = getHeaderVisualMode(isScrolled, headerConfig);
  const useDarkContent = isHeaderDarkContent(visualMode);
  const navTone = useDarkContent ? "light" : "dark";

  return (
    <header
      className={[
        "site-header",
        headerShellClass(visualMode),
        isHidden ? "site-header--hidden" : "",
      ]
        .filter(Boolean)
        .join(" ")}
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
            {SITE_NAV_LINKS.map((link) => (
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
            ))}
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
