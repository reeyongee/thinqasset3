import type { Metadata } from "next";
import { GLSLHills } from "@/components/lab/test13/GLSLHills";
import { createPageMetadata, noIndexRobots } from "@/lib/site-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "GLSL Hills — Brand Colors",
  description: "Animated procedural hills shader tinted with ThinqAsset brand palette.",
  path: "/test13",
  robots: noIndexRobots,
});

export default function Test13Page() {
  return (
    <section
      data-transition-page
      style={{
        width: "100%",
        height: "100dvh",
        margin: 0,
        background: "#161c24",
        overflow: "hidden",
      }}
    >
      <GLSLHills />
    </section>
  );
}
