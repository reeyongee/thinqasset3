import { GlobeScrollSection } from "@/components/globe-scroll";

export const metadata = {
  title: "Globe Scroll — Dev",
  robots: { index: false, follow: false },
};

export default function FinGlobeLabPage() {
  return (
    <>
      <p
        style={{
          position: "fixed",
          top: "0.75rem",
          left: "1rem",
          zIndex: 200,
          margin: 0,
          fontSize: "0.75rem",
          color: "var(--token-muted)",
        }}
      >
        <a
          href="/test"
          style={{
            color: "var(--ta-gold)",
            textDecoration: "none",
            borderBottom:
              "1px solid color-mix(in srgb, var(--ta-gold) 40%, transparent)",
          }}
        >
          ← Test labs
        </a>
        <span style={{ marginLeft: "1rem" }}>Globe scroll (production build)</span>
      </p>
      <GlobeScrollSection />
    </>
  );
}
