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
    heroImage:
      "https://framerusercontent.com/images/vqJMmoqyEUY5IlezsHqljCjArE.png?width=1898&height=1138",
    thumbImage:
      "https://framerusercontent.com/images/msTYoYYscxOBeeJIpRWzw6QKUM.png?width=2400&height=1200",
  },
  {
    id: "treaties",
    quote:
      "Mauritius treaty access and operational rigor give us confidence across Asia, Europe, and Africa.",
    name: "Fund Manager",
    role: "Multi-jurisdiction platform",
    heroImage:
      "https://framerusercontent.com/images/X5rTfMqVH5xFoUj2gO5YKCy6s.png?width=1918&height=1081",
    thumbImage:
      "https://framerusercontent.com/images/PbFAcRr5Jyj1pZN7stWIjXl1z4.png?width=2400&height=1200",
  },
  {
    id: "precision",
    quote:
      "Fund structures engineered for efficiency, not overhead — with governance LPs expect before capital is called.",
    name: "Institutional Partner",
    role: "Fund administration",
    heroImage:
      "https://framerusercontent.com/images/diFR0oNLDIcWO3TOjCpn2lHI.png?width=1954&height=906",
    thumbImage:
      "https://framerusercontent.com/images/EaTPsO2VcDDsExLtOdjpYKyPs.png?width=2400&height=1200",
  },
];
