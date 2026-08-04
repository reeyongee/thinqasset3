"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Footer } from "@/components/footer/Footer";
import { ProgressiveBlurVeil } from "@/components/progressive-blur/ProgressiveBlurVeil";
import { ScrollSectionsProvider } from "@/components/scroll/ScrollSectionsProvider";
import { getSiteChromeConfig } from "@/lib/site-chrome/config";
import {
  shouldUseInnerSiteFrame,
  shouldUseSharedScrollChrome,
} from "@/lib/site-chrome/scrollChrome";
import { unlockPageScroll } from "@/lib/scroll/lockPageScroll";
import { scrollPageToTop } from "@/lib/scroll/scrollPageToTop";
import { InnerSiteFrame } from "./InnerSiteFrame";
import { SiteNav } from "./SiteNav";

type SiteShellProps = {
  children: React.ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  const pathname = usePathname();
  const prevPathnameRef = useRef<string | null>(null);
  const chromeConfig = getSiteChromeConfig(pathname);
  const { chrome, progressiveBlur } = chromeConfig;

  useEffect(() => {
    unlockPageScroll();
    document.body.classList.remove("contact-step-2");

    if (prevPathnameRef.current !== null && prevPathnameRef.current !== pathname) {
      scrollPageToTop();
    }
    prevPathnameRef.current = pathname;
  }, [pathname]);

  if (!chrome) {
    return <>{children}</>;
  }

  const useInnerFrame = shouldUseInnerSiteFrame(pathname, chromeConfig);
  const useScrollChrome = shouldUseSharedScrollChrome(pathname, chromeConfig);

  const page = useScrollChrome ? (
    <ScrollSectionsProvider dockAboveFooter>
      <div className="pb-[calc(3.5rem+env(safe-area-inset-bottom))]">{children}</div>
    </ScrollSectionsProvider>
  ) : (
    children
  );

  const framed = useInnerFrame ? <InnerSiteFrame>{page}</InnerSiteFrame> : page;

  return (
    <>
      <SiteNav />
      <main className="site-content">{framed}</main>
      <Footer />
      {progressiveBlur !== false ? <ProgressiveBlurVeil /> : null}
    </>
  );
}
