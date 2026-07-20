import { Values3dGallery } from "@/components/lab/values-3d/Values3dGallery";

export const metadata = {
  title: "Values 3D Motion Lab",
  robots: { index: false, follow: false },
};

export default function TestValuesPage() {
  return (
    <>
      <p
        style={{
          position: "fixed",
          top: "0.75rem",
          right: "1rem",
          zIndex: 20,
          margin: 0,
          fontSize: "0.75rem",
        }}
      >
        <a
          href="/test/svg-beats"
          style={{
            color: "var(--ta-gold)",
            textDecoration: "none",
            borderBottom: "1px solid color-mix(in srgb, var(--ta-gold) 40%, transparent)",
          }}
        >
          SVG scroll beats lab →
        </a>
      </p>
      <Values3dGallery />
    </>
  );
}
