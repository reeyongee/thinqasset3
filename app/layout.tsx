import type { Viewport } from "next";
import { AppBootstrap } from "@/components/bootstrap/AppBootstrap";
import { SiteAtmosphere } from "@/components/background/SiteAtmosphere";
import { SitePreloader } from "@/components/preloader/SitePreloader";
import { ScrollOrchestratorProvider } from "@/components/scroll/ScrollOrchestratorProvider";
import { TransitionProvider } from "@/components/transition/TransitionProvider";
import { ViewportHeightSync } from "@/components/viewport/ViewportHeightSync";
import { rootMetadata } from "@/lib/site-metadata";
import { Albert_Sans, Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const preloaderBootScript = `
(function () {
  try {
    var path = location.pathname;
    if (path !== "/" && path !== "") return;
    if (sessionStorage.getItem("heroIntroPlayed") === "true") {
      document.documentElement.setAttribute("data-intro-played", "");
      return;
    }
    document.documentElement.setAttribute("data-preloader-pending", "");
  } catch (e) {}
})();
`;

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

export const metadata = rootMetadata;

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
      <head>
        <script dangerouslySetInnerHTML={{ __html: preloaderBootScript }} />
      </head>
      <body className="min-h-full">
        <AppBootstrap />
        <ViewportHeightSync />
        <ScrollOrchestratorProvider>
          <SiteAtmosphere />
          <TransitionProvider>
            <SitePreloader />
            {children}
          </TransitionProvider>
        </ScrollOrchestratorProvider>
      </body>
    </html>
  );
}
