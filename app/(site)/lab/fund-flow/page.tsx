import { FundFlowExperiment } from "@/components/lab/fund-flow/FundFlowExperiment";

export const metadata = {
  title: "Fund Management Motion Study — THINQASSET",
  description: "A scroll-driven SVG study for the Fund Management hero beat.",
};

export default function FundFlowPage() {
  return (
    <section data-transition-page>
      <FundFlowExperiment />
    </section>
  );
}
