import type { Metadata } from "next";
import { FundFlowExperiment } from "@/components/lab/fund-flow/FundFlowExperiment";
import { createPageMetadata, noIndexRobots } from "@/lib/site-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Fund Management Motion Study",
  description: "A scroll-driven SVG study for the Fund Management hero beat.",
  path: "/lab/fund-flow",
  robots: noIndexRobots,
});

export default function FundFlowPage() {
  return (
    <section data-transition-page>
      <FundFlowExperiment />
    </section>
  );
}
