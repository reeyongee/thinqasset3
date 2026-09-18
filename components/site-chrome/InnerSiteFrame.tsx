"use client";

import { Fraunces, Archivo, Spline_Sans_Mono } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import Grain from "@/components/primitives/Grain";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});
const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo" });
const tbgmono = Spline_Sans_Mono({ subsets: ["latin"], variable: "--font-tbgmono" });

export function InnerSiteFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${fraunces.variable} ${archivo.variable} ${tbgmono.variable}`}>
      {/* Body stays transparent so the z-index:-1 mesh can sit behind page content. */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .site-bg { display: block !important; }
            html { background: var(--ta-navy-deep) !important; }
            body { background: transparent !important; }
          `,
        }}
      />
      <SmoothScroll />
      {children}
      <Grain />
    </div>
  );
}
