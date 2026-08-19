import type { Metadata } from "next";
import { GlassPrismCanvas } from "@/components/test/glass-prism";
import { createPageMetadata, noIndexRobots } from "@/lib/site-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Glass Prism Study",
  description: "Cinematic WebGL product shot of a tall architectural glass prism.",
  path: "/test10",
  robots: noIndexRobots,
});

export default function Test10Page() {
  return (
    <section
      data-transition-page
      style={{
        width: "100%",
        height: "100dvh",
        margin: 0,
        background: "#030407",
        overflow: "hidden",
      }}
    >
      <GlassPrismCanvas />
    </section>
  );
}
