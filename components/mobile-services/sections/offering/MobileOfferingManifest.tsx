import { MobileReveal } from "@/components/mobile-home/MobileReveal";

type MobileOfferingManifestProps = {
  statement: string;
  narrative: readonly [string, string];
};

export function MobileOfferingManifest({
  statement,
  narrative,
}: MobileOfferingManifestProps) {
  return (
    <section
      className="mobile-slug-section"
      aria-labelledby="mobile-offering-manifest-heading"
    >
      <MobileReveal>
        <h2
          id="mobile-offering-manifest-heading"
          className="mobile-slug-manifest__statement"
        >
          {statement}
        </h2>
      </MobileReveal>

      <div className="mobile-slug-manifest__copy">
        {narrative.map((paragraph, index) => (
          <MobileReveal key={paragraph.slice(0, 24)} delay={0.05 + index * 0.04}>
            <p className="mobile-slug-body">{paragraph}</p>
          </MobileReveal>
        ))}
      </div>
    </section>
  );
}
