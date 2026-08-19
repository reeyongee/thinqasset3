import type { Metadata } from "next";
import { GlassPrismScene } from "@/components/lab/test11/GlassPrismScene";

export const metadata: Metadata = {
  title: "Glass Prism — WebGL Lab",
};

export default function Test11Page() {
  return <GlassPrismScene />;
}
