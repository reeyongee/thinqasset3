import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import { MotionConfig } from "framer-motion";
import Nav from "@/components/test/structures/Nav";
import SmoothScroll from "@/components/test/structures/SmoothScroll";
import { Grain, ProgressBar } from "@/components/test/structures/motion/Chrome";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500"],
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Protected Cell Structures — Test",
  description:
    "Editorial presentation of Mauritius PCC, DIFC PCC, and Luxembourg GP-LP structures",
  robots: { index: false, follow: false },
};

export default function StructuresLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${inter.variable} ${fraunces.variable} ta-editorial min-h-screen`}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            /* Scoped editorial tokens — live only on this route's wrapper.
               Mirrors the tailwind.config.js theme from the reference design. */
            .ta-editorial {
              --color-ink: #161512;
              --color-paper: #F6F5F1;
              --color-muted: #6E6A61;
              --color-line: #DDD9CF;
              --color-accent: #9C6B2F;
              --color-accent-bright: #C89A5C;
              --font-sans: var(--font-inter), system-ui, sans-serif;
              --font-display: var(--font-fraunces), Georgia, serif;
              background: var(--color-paper);
              color: var(--color-ink);
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              overflow-x: clip;
              font-family: var(--font-sans);
            }
            /* Scroll-to-top default (Lenis handles smooth) */
            .ta-editorial html { scroll-behavior: auto; }

            /* Pinned scene scale-down on short viewports */
            @media (max-height: 820px) {
              .ta-editorial .pin-tree { transform: scale(0.86); transform-origin: center top; }
            }

            /* Scoped utility classes (Tailwind v4 — no config file in this repo) */
            .ta-editorial .font-display { font-family: var(--font-display); }
            .ta-editorial .font-sans { font-family: var(--font-sans); }
            .ta-editorial .bg-paper { background-color: var(--color-paper); }
            .ta-editorial .bg-ink { background-color: var(--color-ink); }
            .ta-editorial .bg-accent { background-color: var(--color-accent); }
            .ta-editorial .bg-line { background-color: var(--color-line); }
            .ta-editorial .text-ink { color: var(--color-ink); }
            .ta-editorial .text-paper { color: var(--color-paper); }
            .ta-editorial .text-muted { color: var(--color-muted); }
            .ta-editorial .text-accent { color: var(--color-accent); }
            .ta-editorial .text-accentBright { color: var(--color-accent-bright); }
            .ta-editorial .border-line { border-color: var(--color-line); }
            .ta-editorial .border-ink/25 { border-color: color-mix(in srgb, var(--color-ink) 25%, transparent); }
            .ta-editorial .border-paper/15 { border-color: color-mix(in srgb, var(--color-paper) 15%, transparent); }
            .ta-editorial .bg-paper/85 { background-color: color-mix(in srgb, var(--color-paper) 85%, transparent); }
            .ta-editorial .bg-paper/15 { background-color: color-mix(in srgb, var(--color-paper) 15%, transparent); }
            .ta-editorial .bg-paper/70 { background-color: color-mix(in srgb, var(--color-paper) 70%, transparent); }
            .ta-editorial .bg-paper/10 { background-color: color-mix(in srgb, var(--color-paper) 10%, transparent); }
            .ta-editorial .text-paper/70 { color: color-mix(in srgb, var(--color-paper) 70%, transparent); }
            .ta-editorial .text-paper/15 { color: color-mix(in srgb, var(--color-paper) 15%, transparent); }
            .ta-editorial .text-ink/[0.06] { color: color-mix(in srgb, var(--color-ink) 6%, transparent); }

            /* Component helpers from the reference globals.css */
            .ta-editorial .container-ed {
              margin-left: auto; margin-right: auto;
              width: 100%; max-width: 100rem;
              padding-left: 1.5rem; padding-right: 1.5rem;
            }
            @media (min-width: 768px) {
              .ta-editorial .container-ed { padding-left: 2.5rem; padding-right: 2.5rem; }
            }
            @media (min-width: 1024px) {
              .ta-editorial .container-ed { padding-left: 4rem; padding-right: 4rem; }
            }
            .ta-editorial .marker {
              font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase;
              color: var(--color-muted);
            }

            /* Route-scoped page background (kills navy overscroll) */
            html, body { background: #F6F5F1 !important; }
            .site-bg { display: none !important; }
          `,
        }}
      />
      <MotionConfig reducedMotion="user">
        <ProgressBar />
        <Grain />
        <Nav />
        <SmoothScroll>
          <main className="overflow-x-clip">{children}</main>
        </SmoothScroll>
      </MotionConfig>
    </div>
  );
}
