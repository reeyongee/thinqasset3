import { StructureStackExperiment } from "@/components/lab/investment-structuring/StructureStackExperiment";

export const metadata = {
  title: "Investment Structuring Motion Study — THINQASSET",
  description: "A scroll-driven SVG study for the Investment Structuring hero beat.",
};

export default function InvestmentStructuringPage() {
  return (
    <section data-transition-page>
      <StructureStackExperiment />
    </section>
  );
}
