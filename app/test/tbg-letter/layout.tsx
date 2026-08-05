import type { Metadata } from "next";
import { Fraunces, Archivo, Spline_Sans_Mono } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import Grain from "@/components/primitives/Grain";
import { FOUNDER } from "@/components/founder-letter/constants";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});
const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo" });
const tbgmono = Spline_Sans_Mono({ subsets: ["latin"], variable: "--font-tbgmono" });

export const metadata: Metadata = {
  title: `TBG Group Holding — A Message from ${FOUNDER.name}`,
  description: `A letter from ${FOUNDER.name}, Founder & CEO of ${FOUNDER.org}, ${FOUNDER.place}.`,
};

export default function TbgLetterLayout({ children }: { children: React.ReactNode }) {
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
