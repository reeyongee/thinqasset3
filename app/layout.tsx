import type { Metadata, Viewport } from "next";
import { AppBootstrap } from "@/components/bootstrap/AppBootstrap";
import { SiteAtmosphere } from "@/components/background/SiteAtmosphere";
import { ScrollOrchestratorProvider } from "@/components/scroll/ScrollOrchestratorProvider";
import { TransitionProvider } from "@/components/transition/TransitionProvider";
import { ViewportHeightSync } from "@/components/viewport/ViewportHeightSync";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
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
      suppressHydrationWarning
    >
      <body className="min-h-full">
        <AppBootstrap />
        <ViewportHeightSync />
        <ScrollOrchestratorProvider>
          <SiteAtmosphere />
          <TransitionProvider>{children}</TransitionProvider>
        </ScrollOrchestratorProvider>
      </body>
    </html>
  );
}
