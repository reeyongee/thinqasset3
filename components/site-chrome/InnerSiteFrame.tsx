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
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .site-bg { display: block !important; }
            html, body { background: var(--ta-navy) !important; }
          `,
        }}
      />
      <SmoothScroll />
      {children}
      <Grain />
    </div>
  );
}
