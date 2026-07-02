import type { Metadata } from "next";
import { SiteAtmosphere } from "@/components/background/SiteAtmosphere";
import { ProgressiveBlurVeil } from "@/components/progressive-blur/ProgressiveBlurVeil";
import { ScrollOrchestratorProvider } from "@/components/scroll/ScrollOrchestratorProvider";
import { Albert_Sans, Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["300", "400"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const albertSans = Albert_Sans({
  variable: "--font-albert-sans",
  subsets: ["latin"],
  weight: ["500"],
});

export const metadata: Metadata = {
  title: "THINQASSET — Innovative Global Fund Management Solutions",
  description:
    "ThinqAsset Fund Management Ltd delivers tailored investment strategies and unparalleled client service, connecting the Middle East with global investment opportunities across Mauritius, DIFC, Luxembourg, and beyond.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistMono.variable} ${geistSans.variable} ${inter.variable} ${albertSans.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <ScrollOrchestratorProvider>
          <SiteAtmosphere />
          {children}
          <ProgressiveBlurVeil />
        </ScrollOrchestratorProvider>
      </body>
    </html>
  );
}
