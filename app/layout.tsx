import type { Metadata } from "next";
import { SiteAtmosphere } from "@/components/background/SiteAtmosphere";
import { ScrollOrchestratorProvider } from "@/components/scroll/ScrollOrchestratorProvider";
import { TransitionProvider } from "@/components/transition/TransitionProvider";
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
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var n=performance.getEntriesByType("navigation")[0];if(n&&n.type==="reload"){sessionStorage.removeItem("heroIntroPlayed");document.documentElement.removeAttribute("data-intro-played");document.documentElement.removeAttribute("data-intro-ready");return;}if(sessionStorage.getItem("heroIntroPlayed")==="true"){document.documentElement.setAttribute("data-intro-played","");}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full">
        <ScrollOrchestratorProvider>
          <SiteAtmosphere />
          <TransitionProvider>{children}</TransitionProvider>
        </ScrollOrchestratorProvider>
      </body>
    </html>
  );
}
