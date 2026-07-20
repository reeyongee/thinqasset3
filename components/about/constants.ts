export const ABOUT_DIALS = {
  designVariance: 7,
  motionIntensity: 6,
  visualDensity: 4,
} as const;

export const ABOUT_LAYOUT_FAMILIES = {
  hero: "editorial-manifesto",
  intro: "dual-pillar-cards",
  history: "scroll-timeline-rail",
  approach: "tabbed-pillar-card",
  cta: "bordered-card-glow",
} as const;

export const ABOUT_SECTION_BEATS = {
  hero: { verb: "REVEALS", motivation: "Headline arrives before scroll spectacle" },
  intro: {
    verb: "STAGGERS IN",
    motivation: "Shimmer title and pillar cards establish who we are",
  },
  history: {
    verb: "SCROLLS + FILLS",
    motivation: "Timeline progress and sticky visual track the firm story",
  },
  approach: {
    verb: "SWAPS + STAGGERS",
    motivation: "Four disciplines with a sliding accent rail and detail card",
  },
  cta: { verb: "SETTLES", motivation: "Calm handoff before exit" },
} as const;

export const ABOUT_HERO = {
  headlineLines: ["The people behind", "ThinqAsset"],
  subline:
    "Fund management built by actuaries, CFAs, and operators who stay in the room.",
} as const;

export type AboutIntroCard = {
  title: string;
  accent: string;
  accentVariant: "year" | "label";
  body: string;
};

export const ABOUT_INTRO = {
  title: "About us",
  intro:
    "We're a fund management firm built by practitioners who've spent their careers in global banks, consultancies, and fund platforms. We stay involved from jurisdiction choice through reporting — not as templates, but as partners who know the trade-offs.",
  cards: [
    {
      title: "Practitioners & Precision",
      accent: "2009",
      accentVariant: "year",
      body: "Alvin has been structuring funds in Mauritius since 2009, bringing actuarial discipline from London to VCC work and cross-border mandates. ThinqAsset was founded on that same standard: technical decision-making stays close to the GP.",
    },
    {
      title: "Structure Over Templates",
      accent: "DISCIPLINE",
      accentVariant: "label",
      body: "Fund structures get sold as packages, then handed to teams who've never met the GP. We built ThinqAsset around the opposite — tell the truth about trade-offs, stay in the conversation, and build something that still makes sense after the launch deck is forgotten.",
    },
  ] satisfies AboutIntroCard[],
} as const;

export type AboutHistoryMilestone = {
  year: string;
  title: string;
  description: string;
};

export const ABOUT_HISTORY_IMAGE = {
  src: "/thinqasset-assets/about/astronaut_in_space.webp",
  alt: "Astronaut floating in space",
} as const;

export const ABOUT_HISTORY = {
  title: "Our history",
  intro:
    "From London actuarial roots to Mauritius structuring and a multi-jurisdiction fund platform. A timeline of how ThinqAsset came to be.",
  milestones: [
    {
      year: "2005",
      title: "London Foundations",
      description:
        "Alvin began his career at Deloitte and AON Hewitt in London, building the actuarial and institutional discipline that would later shape how we structure funds and read risk.",
    },
    {
      year: "2009",
      title: "Mauritius & VCC Expertise",
      description:
        "Back in Mauritius, Alvin turned that discipline toward fund structuring and VCC work — the technical foundation ThinqAsset still builds on for cross-border mandates.",
    },
    {
      year: "2018",
      title: "Cross-Border Operations",
      description:
        "Akash spent years across dealing, asset management, and fund structuring at SBM, IBL, UIL, and Amicorp — learning what breaks when structure and reporting live in different rooms.",
    },
    {
      year: "2021",
      title: "ThinqAsset Founded",
      description:
        "Alvin and Akash founded ThinqAsset to keep mandate design, regulatory navigation, and ongoing fund management with the same people from first call through reporting.",
    },
    {
      year: "2024",
      title: "Mauritius & Dubai Platform",
      description:
        "Today we run day to day from Mauritius and Dubai, with partnerships across Luxembourg, Singapore, and offshore centres when the mandate actually calls for them.",
    },
  ] satisfies AboutHistoryMilestone[],
} as const;

export type AboutApproachPillar = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  components: string[];
};

export const ABOUT_APPROACH = {
  title: "Our approach",
  intro:
    "Four disciplines that stay with the mandate from first conversation through reporting. Each refined through years of cross-border fund work — not sold as a template.",
  pillars: [
    {
      id: 1,
      title: "Mandate & discovery",
      subtitle: "Understanding the GP before the structure",
      description:
        "We start with the strategy, investor base, and constraints — not a jurisdiction brochure. That means honest trade-offs up front, so the structure we design still makes sense after the launch deck is forgotten.",
      components: [
        "GP objectives and investor profile",
        "Liquidity and distribution needs",
        "Regulatory constraint mapping",
        "Fee and economics alignment",
        "Preliminary jurisdiction screening",
      ],
    },
    {
      id: 2,
      title: "Structure & jurisdiction",
      subtitle: "Architecture that fits the mandate",
      description:
        "Vehicle choice, layering, and service-provider coordination are one conversation — not three handoffs. We design structures we are prepared to run, across Mauritius, Dubai, and the offshore centres the mandate actually needs.",
      components: [
        "Vehicle selection (VCC, SPC, OPCI)",
        "Cross-border layering",
        "Service provider coordination",
        "Document and term sheet drafting",
        "Launch readiness review",
      ],
    },
    {
      id: 3,
      title: "Regulatory & governance",
      subtitle: "Licensing and oversight without the black box",
      description:
        "Applications, board setup, and compliance frameworks are built alongside the structure — not bolted on after. We keep regulators, administrators, and the GP in the same thread so nothing gets lost between rooms.",
      components: [
        "FSC and DFSA applications",
        "Board and committee setup",
        "Compliance monitoring frameworks",
        "AML and KYC program design",
        "Ongoing regulatory liaison",
      ],
    },
    {
      id: 4,
      title: "Operations & reporting",
      subtitle: "Same team from launch through NAV",
      description:
        "Fund accounting, investor reporting, and mandate review stay with the people who designed the structure. Operations should feel rigorous and transparent — aligned with the GP's strategy, not like a black box you inherit.",
      components: [
        "Fund accounting and NAV",
        "Investor reporting cycles",
        "Audit and tax coordination",
        "Portfolio monitoring support",
        "Continuous mandate review",
      ],
    },
  ] satisfies AboutApproachPillar[],
} as const;

export const ABOUT_CTA = {
  title: "Get in touch.",
  intro:
    "Curious if we're the right fit? We'd rather have a straight conversation than send a deck into the void.",
  buttonLabel: "Talk to us",
  href: "/contact",
} as const;
