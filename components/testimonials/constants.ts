export type TestimonialData = {
  id: string;
  quote: string;
  name: string;
  role: string;
  heroImage: string;
  thumbImage: string;
};

export const TESTIMONIALS: TestimonialData[] = [
  {
    id: "vcc",
    quote:
      "Purpose-built VCC structures that let institutional capital scale with segregated sub-fund discipline.",
    name: "Institutional Allocator",
    role: "Cross-border mandate",
    heroImage: "/thinqasset-assets/testimonials/vcc.png",
    thumbImage: "/thinqasset-assets/testimonials/vcc.png",
  },
  {
    id: "treaties",
    quote:
      "Mauritius treaty access and operational rigor give us confidence across Asia, Europe, and Africa.",
    name: "Fund Manager",
    role: "Multi-jurisdiction platform",
    heroImage: "/thinqasset-assets/testimonials/treaties.png",
    thumbImage: "/thinqasset-assets/testimonials/treaties.png",
  },
  {
    id: "precision",
    quote:
      "Fund structures engineered for efficiency, not overhead — with governance LPs expect before capital is called.",
    name: "Institutional Partner",
    role: "Fund administration",
    heroImage: "/thinqasset-assets/testimonials/precision.png",
    thumbImage: "/thinqasset-assets/testimonials/precision.png",
  },
];
