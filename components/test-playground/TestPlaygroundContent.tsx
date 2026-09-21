"use client";

import { useState } from "react";
import { GlowButton } from "@/components/ui/GlowButton";
import { TransitionLink } from "@/components/transition/TransitionLink";

type ColorToken = {
  name: string;
  variable: string;
  hex: string;
  role: string;
  textDark?: boolean;
};

const COLOR_TOKENS: ColorToken[] = [
  {
    name: "Navy Deep",
    variable: "--ta-navy-deep",
    hex: "#161c24",
    role: "Core Canvas / Viewport Backdrop",
  },
  {
    name: "Navy Ground",
    variable: "--ta-navy",
    hex: "#1e252d",
    role: "Standard Background / Base Surface",
  },
  {
    name: "Navy Mid",
    variable: "--ta-navy-mid",
    hex: "#343d4a",
    role: "Structural Divider / Accent Fill",
  },
  {
    name: "Navy Card",
    variable: "--ta-navy-card",
    hex: "#2a252c",
    role: "Elevated Institutional Surface",
  },
  {
    name: "Heritage Gold",
    variable: "--ta-gold",
    hex: "#b6a082",
    role: "Brand Primary Accent / Highlight",
    textDark: true,
  },
  {
    name: "Bright Gold",
    variable: "--ta-gold-hover",
    hex: "#c9b896",
    role: "Interactive Hover / Active Sheen",
    textDark: true,
  },
  {
    name: "Muted Slate",
    variable: "--ta-grey-muted",
    hex: "#9f9da0",
    role: "Secondary Metadata / Body Dim",
  },
  {
    name: "Grey Border",
    variable: "--ta-grey-border",
    hex: "#3d4450",
    role: "Subtle Separators & Card Outlines",
  },
];

const ROUTE_TARGETS = [
  {
    label: "Home Route",
    path: "/",
    desc: "Test return dissolve and preloader bypass",
  },
  {
    label: "About Us",
    path: "/about",
    desc: "Founder letter scene transition",
  },
  {
    label: "Services Hub",
    path: "/services",
    desc: "Pillar hub and institutional offerings",
  },
  {
    label: "Contact Gateway",
    path: "/contact",
    desc: "Direct structuring inquiry overlay",
  },
  {
    label: "Invoice Applet",
    path: "/invoice",
    desc: "Standalone document generator",
  },
];

export function TestPlaygroundContent() {
  const [activeTab, setActiveTab] = useState<"tokens" | "type" | "controls" | "routes">("tokens");
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [counter, setCounter] = useState(0);
  const [toggleState, setToggleState] = useState(true);

  const copyToClipboard = (hex: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      void navigator.clipboard.writeText(hex);
      setCopiedHex(hex);
      setTimeout(() => setCopiedHex(null), 1800);
    }
  };

  return (
    <div
      data-transition-page
      className="relative min-h-screen w-full px-5 pt-28 pb-24 sm:px-8 md:px-14 lg:px-20"
      style={{ background: "transparent" }}
    >
      {/* Background ambient lighting */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 h-[420px] w-[90vw] max-w-[1200px] rounded-full opacity-20 blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, var(--ta-gold) 0%, rgba(52, 61, 74, 0.4) 60%, transparent 80%)",
        }}
      />

      <div className="relative mx-auto max-w-[1280px]">
        {/* Eyebrow & Status Header */}
        <div
          data-transition-item
          className="inline-flex items-center gap-2.5 rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em]"
          style={{
            borderColor: "color-mix(in srgb, var(--ta-gold) 35%, transparent)",
            background: "color-mix(in srgb, var(--ta-navy-mid) 30%, transparent)",
            color: "var(--ta-gold)",
          }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#b6a082] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#b6a082]" />
          </span>
          LABORATORY BENCH // SYSTEM VALIDATION
        </div>

        {/* Hero Section */}
        <div className="mt-5 max-w-[920px]">
          <h1
            data-transition-text="headline"
            className="font-display text-[clamp(2.4rem,5.5vw,4.5rem)] font-light leading-[1.08] tracking-[-0.02em] text-white"
          >
            Design System Benchmark &amp;{" "}
            <span className="italic" style={{ color: "var(--ta-gold)" }}>
              Motion Sandbox
            </span>
          </h1>

          <p
            data-transition-text="body"
            className="mt-5 max-w-[720px] text-[clamp(1rem,2vw,1.18rem)] font-light leading-relaxed text-[#9f9da0]"
          >
            An operational test suite for verifying ThinqAsset luxury design tokens, typography
            hierarchy, interactive <code className="text-[#b6a082]">&lt;GlowButton /&gt;</code>{" "}
            states, and the <code className="text-[#b6a082]">softDissolve</code> page transition
            choreography.
          </p>
        </div>

        {/* Quick Actions */}
        <div
          data-transition-item
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <GlowButton
            href="/contact"
            variant="gold"
            transitionItem
          >
            Schedule Consultation
          </GlowButton>

          <GlowButton
            href="/services"
            variant="default"
            transitionItem
          >
            Explore Services
          </GlowButton>

          <button
            type="button"
            onClick={() => setCounter((c) => c + 1)}
            className="cursor-pointer rounded-full border px-5 py-3 font-mono text-xs font-medium uppercase tracking-[0.14em] text-white transition-all hover:border-[#b6a082] hover:text-[#b6a082]"
            style={{
              borderColor: "var(--ta-grey-border)",
              background: "rgba(42, 37, 44, 0.4)",
            }}
          >
            Interactive Pulse: {counter}
          </button>
        </div>

        {/* Tab Navigation */}
        <div
          data-transition-item
          className="mt-14 flex flex-wrap items-center gap-2 border-b pb-4"
          style={{ borderColor: "var(--ta-grey-border)" }}
        >
          {(
            [
              { id: "tokens", label: "01. Color & Atmosphere" },
              { id: "type", label: "02. Typographic Scale" },
              { id: "controls", label: "03. Interactive Components" },
              { id: "routes", label: "04. Transition Router" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="cursor-pointer rounded-md px-4 py-2 text-xs font-mono tracking-[0.15em] transition-all"
              style={{
                background:
                  activeTab === tab.id
                    ? "color-mix(in srgb, var(--ta-gold) 15%, transparent)"
                    : "transparent",
                color: activeTab === tab.id ? "var(--ta-gold)" : "var(--ta-grey-muted)",
                borderBottom:
                  activeTab === tab.id
                    ? "2px solid var(--ta-gold)"
                    : "2px solid transparent",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Tokens */}
        {activeTab === "tokens" && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2
                data-transition-text="body"
                className="font-display text-2xl font-light text-white"
              >
                Institutional Color Tokens
              </h2>
              <span className="font-mono text-xs text-[#9f9da0]">
                {copiedHex ? `Copied ${copiedHex} to clipboard!` : "Click any swatch to copy HEX"}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {COLOR_TOKENS.map((token) => (
                <div
                  key={token.variable}
                  onClick={() => copyToClipboard(token.hex)}
                  data-transition-item
                  className="group relative cursor-pointer overflow-hidden rounded-xl border p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#b6a082]"
                  style={{
                    background: "rgba(30, 37, 45, 0.45)",
                    borderColor: "var(--ta-grey-border)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <div
                    className="h-20 w-full rounded-lg border shadow-inner flex items-end p-2 transition-transform group-hover:scale-[1.02]"
                    style={{
                      background: token.hex,
                      borderColor: "rgba(255, 255, 255, 0.08)",
                    }}
                  >
                    <span
                      className="font-mono text-[10px] font-medium tracking-wider px-1.5 py-0.5 rounded"
                      style={{
                        background: token.textDark ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.15)",
                        color: token.textDark ? "#ffffff" : "#ffffff",
                      }}
                    >
                      {token.hex}
                    </span>
                  </div>

                  <div className="mt-3">
                    <p className="font-display text-base text-white">{token.name}</p>
                    <p className="font-mono text-[11px] text-[#b6a082]">{token.variable}</p>
                    <p className="mt-1 text-xs text-[#9f9da0] leading-snug">{token.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Typography */}
        {activeTab === "type" && (
          <div className="mt-8 space-y-8">
            <div>
              <h2
                data-transition-text="body"
                className="font-display text-2xl font-light text-white"
              >
                Typographic Hierarchy &amp; Specimen
              </h2>
              <p className="mt-1 text-sm text-[#9f9da0]">
                Testing LP Saturnia serif headlines alongside Inter and Geist Mono numerals.
              </p>
            </div>

            <div
              data-transition-item
              className="space-y-6 rounded-2xl border p-6 md:p-8"
              style={{
                background: "rgba(30, 37, 45, 0.45)",
                borderColor: "var(--ta-grey-border)",
                backdropFilter: "blur(16px)",
              }}
            >
              {/* Display H1 */}
              <div className="border-b pb-6" style={{ borderColor: "rgba(61, 68, 80, 0.5)" }}>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#b6a082]">
                  Font-Display Large / LP Saturnia 400
                </span>
                <p className="mt-2 font-display text-4xl sm:text-5xl font-light text-white">
                  Regulated Institutional Fund Infrastructure
                </p>
              </div>

              {/* Display H2 with Italic */}
              <div className="border-b pb-6" style={{ borderColor: "rgba(61, 68, 80, 0.5)" }}>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#b6a082]">
                  Font-Display Italic Accented
                </span>
                <p className="mt-2 font-display text-2xl sm:text-3xl font-light text-white">
                  Connecting cross-border capital through{" "}
                  <em className="italic" style={{ color: "var(--ta-gold)" }}>
                    meticulous structural architecture
                  </em>
                  .
                </p>
              </div>

              {/* Inter Body */}
              <div className="border-b pb-6" style={{ borderColor: "rgba(61, 68, 80, 0.5)" }}>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#b6a082]">
                  Editorial Body Copy / Inter Sans 400
                </span>
                <p className="mt-2 max-w-[70ch] text-base leading-relaxed text-[#9f9da0]">
                  ThinqAsset operates specialized hosting and fiduciary frameworks designed for
                  institutional fund managers, venture sponsors, and multi-family offices. Every
                  jurisdiction is calibrated to statutory standards across DIFC, Mauritius, and
                  Luxembourg.
                </p>
              </div>

              {/* Geist Mono Data Row */}
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#b6a082]">
                  Financial Metadata / Geist Mono
                </span>
                <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4 font-mono text-xs text-[#9f9da0]">
                  <div className="border-l pl-3" style={{ borderColor: "var(--ta-gold)" }}>
                    <p className="text-[10px] uppercase tracking-wider text-[#b6a082]">JURISDICTION</p>
                    <p className="mt-0.5 text-white">DIFC / DFSA CAT 3C</p>
                  </div>
                  <div className="border-l pl-3" style={{ borderColor: "var(--ta-gold)" }}>
                    <p className="text-[10px] uppercase tracking-wider text-[#b6a082]">STRUCTURE</p>
                    <p className="mt-0.5 text-white">QIF / CELL PLATFORM</p>
                  </div>
                  <div className="border-l pl-3" style={{ borderColor: "var(--ta-gold)" }}>
                    <p className="text-[10px] uppercase tracking-wider text-[#b6a082]">SETTLEMENT</p>
                    <p className="mt-0.5 text-white">T+0 INSTITUTIONAL</p>
                  </div>
                  <div className="border-l pl-3" style={{ borderColor: "var(--ta-gold)" }}>
                    <p className="text-[10px] uppercase tracking-wider text-[#b6a082]">STATUS</p>
                    <p className="mt-0.5 text-emerald-400 font-semibold">VERIFIED // OPERATIONAL</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Interactive Controls */}
        {activeTab === "controls" && (
          <div className="mt-8 space-y-8">
            <div>
              <h2
                data-transition-text="body"
                className="font-display text-2xl font-light text-white"
              >
                Interactive Controls &amp; Glass Surfaces
              </h2>
              <p className="mt-1 text-sm text-[#9f9da0]">
                Verify button animations, micro-interactions, and state changes.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* GlowButton Showcase */}
              <div
                data-transition-item
                className="rounded-2xl border p-6"
                style={{
                  background: "rgba(30, 37, 45, 0.45)",
                  borderColor: "var(--ta-grey-border)",
                  backdropFilter: "blur(14px)",
                }}
              >
                <h3 className="font-display text-lg text-white">GlowButton Variants</h3>
                <p className="mt-1 text-xs text-[#9f9da0]">
                  Hardware-accelerated spinning glow sheen on hover &amp; focus.
                </p>

                <div className="mt-6 space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <GlowButton href="/contact" variant="gold" size="md">
                      Gold Variant (Medium)
                    </GlowButton>
                    <GlowButton href="/contact" variant="gold" size="sm">
                      Gold (Small)
                    </GlowButton>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <GlowButton href="/services" variant="default" size="md">
                      Default Variant (Medium)
                    </GlowButton>
                    <GlowButton href="/services" variant="default" size="sm">
                      Default (Small)
                    </GlowButton>
                  </div>
                </div>
              </div>

              {/* State & Feedback Widget */}
              <div
                data-transition-item
                className="rounded-2xl border p-6"
                style={{
                  background: "rgba(30, 37, 45, 0.45)",
                  borderColor: "var(--ta-grey-border)",
                  backdropFilter: "blur(14px)",
                }}
              >
                <h3 className="font-display text-lg text-white">Stateful React Playground</h3>
                <p className="mt-1 text-xs text-[#9f9da0]">
                  Verifies client re-renders and smooth state updates without layout shifts.
                </p>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between rounded-xl border p-3.5" style={{ borderColor: "var(--ta-grey-border)" }}>
                    <span className="font-mono text-xs text-white">Reactive Counter:</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCounter((c) => Math.max(0, c - 1))}
                        className="cursor-pointer h-7 w-7 rounded border font-mono text-xs text-[#b6a082] transition hover:bg-[#343d4a]"
                        style={{ borderColor: "var(--ta-grey-border)" }}
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-mono text-sm font-semibold text-white">
                        {counter}
                      </span>
                      <button
                        onClick={() => setCounter((c) => c + 1)}
                        className="cursor-pointer h-7 w-7 rounded border font-mono text-xs text-[#b6a082] transition hover:bg-[#343d4a]"
                        style={{ borderColor: "var(--ta-grey-border)" }}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border p-3.5" style={{ borderColor: "var(--ta-grey-border)" }}>
                    <span className="font-mono text-xs text-white">Feature Toggle Simulation:</span>
                    <button
                      onClick={() => setToggleState(!toggleState)}
                      className="cursor-pointer relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
                      style={{
                        background: toggleState ? "var(--ta-gold)" : "var(--ta-navy-mid)",
                      }}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          toggleState ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Routes & Page Transitions */}
        {activeTab === "routes" && (
          <div className="mt-8 space-y-6">
            <div>
              <h2
                data-transition-text="body"
                className="font-display text-2xl font-light text-white"
              >
                Page Transition Choreography
              </h2>
              <p className="mt-1 text-sm text-[#9f9da0]">
                Test smooth soft-dissolve transitions to all live routes via{" "}
                <code className="text-[#b6a082]">TransitionLink</code>.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ROUTE_TARGETS.map((target) => (
                <TransitionLink
                  key={target.path}
                  href={target.path}
                  data-transition-item
                  className="group relative flex flex-col justify-between rounded-xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#b6a082]"
                  style={{
                    background: "rgba(30, 37, 45, 0.45)",
                    borderColor: "var(--ta-grey-border)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-[#b6a082]">
                        TARGET ROUTE
                      </span>
                      <span className="font-mono text-xs text-[#9f9da0] transition-transform group-hover:translate-x-1 group-hover:text-white">
                        →
                      </span>
                    </div>
                    <h3 className="mt-2 font-display text-lg text-white group-hover:text-[#b6a082] transition-colors">
                      {target.label}
                    </h3>
                    <p className="mt-1 text-xs text-[#9f9da0] leading-relaxed">
                      {target.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t font-mono text-[11px] text-[#b6a082]" style={{ borderColor: "rgba(61, 68, 80, 0.4)" }}>
                    {target.path}
                  </div>
                </TransitionLink>
              ))}
            </div>
          </div>
        )}

        {/* Institutional Proof Metrics */}
        <div
          data-transition-item
          className="mt-16 grid grid-cols-1 gap-6 border-t pt-10 sm:grid-cols-3"
          style={{ borderColor: "var(--ta-grey-border)" }}
        >
          <div className="space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#b6a082]">
              GLOBAL HUBS
            </span>
            <p className="font-display text-3xl font-light text-white">03 Center Jurisdictions</p>
            <p className="text-xs text-[#9f9da0]">DIFC (Dubai), Mauritius, Luxembourg</p>
          </div>

          <div className="space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#b6a082]">
              ROUTING ENGINE
            </span>
            <p className="font-display text-3xl font-light text-white">Soft-Dissolve GSAP</p>
            <p className="text-xs text-[#9f9da0]">Zero-flash client route orchestration</p>
          </div>

          <div className="space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#b6a082]">
              STANDARD COMPLIANCE
            </span>
            <p className="font-display text-3xl font-light text-white">WCAG 2.2 AA</p>
            <p className="text-xs text-[#9f9da0]">Reduced-motion and semantic contrast ready</p>
          </div>
        </div>
      </div>
    </div>
  );
}
