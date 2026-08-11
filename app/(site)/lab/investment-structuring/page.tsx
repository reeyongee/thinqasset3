import type { Metadata } from "next";
import { StructureStackExperiment } from "@/components/lab/investment-structuring/StructureStackExperiment";
import { createPageMetadata, noIndexRobots } from "@/lib/site-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Investment Structuring Motion Study",
  description: "A scroll-driven SVG study for the Investment Structuring hero beat.",
  path: "/lab/investment-structuring",
  robots: noIndexRobots,
});

export default function InvestmentStructuringPage() {
  return (
    <section data-transition-page>
      <StructureStackExperiment />
    </section>
  );
}
