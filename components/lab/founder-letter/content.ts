import { FOUNDER } from "@/components/founder-letter/constants";

export const FOUNDER_LETTER = {
  brand: "TBG Group",
  brandSub: "Holding Ltd.",
  eyebrow: "A Message from the Office of the",
  title: "Founder & Chief Executive Officer",
  heroSub:
    "TBG Group Holding Ltd. — established in the Dubai International Financial Centre, United Arab Emirates. A strategic holding company for a diversified portfolio of regulated financial services and investment businesses spanning the UAE, Luxembourg, and Mauritius.",
  heroMeta: ["TBG GROUP HOLDING LTD.", "EST. DIFC · DUBAI · UNITED ARAB EMIRATES"],
  purpose: {
    index: "01",
    label: "Purpose",
    lines: [
      "To build an institution that transcends generations,",
      "creates enduring value, and serves as a trusted steward of capital across global markets.",
    ],
    supporting:
      "Founded upon the principles of integrity, disciplined governance, innovation, and long-term value creation.",
  },
  footprint: {
    index: "02",
    label: "Global Footprint",
    lead: "Anchored in DIFC, spanning regulated markets, and expanding into the world's most dynamic economies.",
    nodes: [
      {
        place: "Dubai · DIFC",
        tag: "Established",
        label: "Home of the strategic holding company",
        detail:
          "TBG Group Holding Ltd. is established in the Dubai International Financial Centre, United Arab Emirates.",
      },
      {
        place: "UAE · Luxembourg · Mauritius",
        tag: "Portfolio",
        label: "Regulated financial services & investment businesses",
        detail:
          "A diversified portfolio of regulated fund management, asset management, multi-strategy investment funds, and institutional investment solutions.",
      },
      {
        place: "India",
        tag: "Expanding",
        label: "Regulatory presence · Inaugural Private Credit Fund",
        detail:
          "Advancing our regulatory presence in India and preparing to launch our inaugural Private Credit Fund in one of the world's most dynamic economies.",
      },
      {
        place: "Singapore · London",
        tag: "Planned",
        label: "A globally connected platform",
        detail:
          "Planned expansion bridging capital, innovation, and opportunity across the world's leading financial centres.",
      },
    ],
  },
  ecosystem: {
    index: "03",
    label: "The Ecosystem",
    statement:
      "Through our integrated platform, we deliver sophisticated cross-border solutions — enabling clients to navigate complexity, unlock opportunities, and scale with confidence, operational excellence, and uncompromising regulatory integrity.",
    capabilities: [
      "Regulated Fund Management",
      "Asset Management",
      "Multi-Strategy Funds",
      "Institutional Solutions",
      "Corporate Structuring",
      "Business Establishment",
      "Regulatory & Compliance Advisory",
      "Governance",
      "Strategic Outsourced Services",
    ],
  },
  trust: {
    index: "04",
    label: "Trust",
    statement: "At the heart of TBG lies something far more valuable than capital — trust.",
    body: "The confidence placed in us by our investors, partners, clients, regulators, and the exceptional professionals who form the TBG family is the foundation of our success. It inspires us to uphold the highest standards of governance, embrace innovation with responsibility, and create sustainable long-term value for every stakeholder.",
  },
  closing: {
    index: "05",
    label: "Gratitude",
    statement:
      "Together, we are building more than a financial institution — we are creating an enduring legacy founded on excellence, integrity, responsible stewardship, and lasting relationships.",
    thanks:
      "On behalf of our Board and the entire TBG family, I sincerely thank you for your continued trust and support. We look forward to shaping the future together — with ambition, purpose, and an unwavering commitment to excellence.",
    sign: FOUNDER.name,
    org: FOUNDER.org,
    place: FOUNDER.fullPlace,
  },
} as const;

/** Founder portrait — lab placeholder; production uses /images/tbg-founder-portrait.webp */
export const PORTRAIT = {
  src: "/thinqasset-assets/team/akash-baboolall.jpg",
  alt: `Portrait of ${FOUNDER.name}, ${FOUNDER.title}`,
  note: FOUNDER.name,
} as const;
