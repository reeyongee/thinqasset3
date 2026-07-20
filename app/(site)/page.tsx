import { BenefitsSection } from "@/components/benefits/BenefitsSection";
import { FaqSection } from "@/components/faq/FaqSection";
import { FinalCtaSection } from "@/components/final-cta/FinalCtaSection";
import { GlobeSection } from "@/components/globe/GlobeSection";
import { TestimonialsSection } from "@/components/testimonials/TestimonialsSection";
import { FeaturesSection } from "@/components/features/FeaturesSection";
import { Hero } from "@/components/hero/Hero";
import { HowItWorksSection } from "@/components/how-it-works/HowItWorksSection";
import { NumbersSection } from "@/components/numbers/NumbersSection";
import { OurApproachSection } from "@/components/our-approach/OurApproachSection";

export default function Home() {
  return (
    <>
      <Hero />
      <NumbersSection />
      <FeaturesSection />
      <HowItWorksSection />
      <OurApproachSection />
      <BenefitsSection />
      <TestimonialsSection />
      <GlobeSection />
      <FaqSection />
      <FinalCtaSection />
    </>
  );
}
