"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/footer/Footer";
import { ProgressiveBlurVeil } from "@/components/progressive-blur/ProgressiveBlurVeil";
import { getSiteChromeConfig } from "@/lib/site-chrome/config";
import { SiteNav } from "./SiteNav";

type SiteShellProps = {
  children: React.ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  const pathname = usePathname();
  const { chrome } = getSiteChromeConfig(pathname);

  if (!chrome) {
    return <>{children}</>;
  }

  return (
    <>
      <SiteNav />
      <main className="site-content">{children}</main>
      <Footer />
      <ProgressiveBlurVeil />
    </>
  );
}
