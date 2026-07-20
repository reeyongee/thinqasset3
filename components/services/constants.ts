export const SERVICES_HERO = {
  eyebrow: "Services",
  brand: "THINQASSET",
  headlineLines: ["Three platforms.", "One operating model."],
  subline:
    "A regulated fund platform, institutional structures, and corporate infrastructure — built for sponsors who need the stack behind the strategy.",
  meta: "Fund platform · Structures · Corporate",
} as const;

export type ServiceOffering = {
  slug: string;
  title: string;
  summary: string;
  body: string;
  highlights?: readonly string[];
};

export type ServiceFaqItem = {
  question: string;
  answer: string;
};

export type ServiceRelatedCard = {
  offeringSlug: string;
  metaLabel: string;
};

export type ServiceJourneyStage = {
  title: string;
  summary: string;
};

export type ServiceSpotlightCard = {
  meta: string;
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
};

export type ServiceColumn = {
  id: string;
  index: string;
  title: string;
  teaser: string;
  /** Short hover copy for the card (~half of full pillar body). */
  blurb: string;
  body: string;
  href: string;
  /** McShannock-style offerings band headline on pillar detail pages. */
  offeringsHeadline: string;
  /** Optional client-journey scroll band (replaces offerings list on pillar hub). */
  journeyStages?: {
    headline: string;
    stages: readonly ServiceJourneyStage[];
  };
  /** Carousel headline when pillar offerings are shown as slides. */
  carouselHeadline?: string;
  image: {
    src: string;
    alt: string;
    targetSrc: string;
  };
  offerings: readonly ServiceOffering[];
  rationale: {
    headline: string;
    paragraphs: readonly [string, string];
    image?: {
      src: string;
      alt: string;
    };
  };
  outcomes: {
    headline: string;
    intro: string;
    benefits: readonly [string, string, string, string];
    image?: {
      src: string;
      alt: string;
    };
  };
  faqs: {
    headline: string;
    items: readonly ServiceFaqItem[];
  };
  related?: {
    headline: string;
    linkHref: string;
    linkLabel: string;
    cards: readonly [ServiceRelatedCard, ServiceRelatedCard];
  };
  spotlight?: {
    headline: string;
    subtitle?: string;
    cards: readonly [ServiceSpotlightCard, ServiceSpotlightCard];
  };
};

const SERVICE_IMAGES = {
  fund: "/thinqasset-assets/services/fund-platform/hero.png",
  structures: "/thinqasset-assets/services/structures.png",
  corporate: "/thinqasset-assets/services/corporate.png",
} as const;

const JURISDICTION_IMAGES = {
  mauritius: "/thinqasset-assets/footer/mauritius.webp",
  singapore: "/thinqasset-assets/footer/singapore.webp",
  luxembourg: "/thinqasset-assets/footer/luxembourg.webp",
  uae: "/thinqasset-assets/footer/uae.webp",
} as const;

const FUND_PLATFORM_IMAGES = {
  hero: "/thinqasset-assets/services/fund-platform/hero.png",
  rationale: "/thinqasset-assets/services/fund-platform/rationale.png",
  outcomes: "/thinqasset-assets/services/fund-platform/outcomes.png",
  journeyDiscovery: "/thinqasset-assets/services/fund-platform/journey-discovery.png",
  journeyLaunch: "/thinqasset-assets/services/fund-platform/journey-launch.png",
  journeyGrowth: "/thinqasset-assets/services/fund-platform/journey-growth.png",
  journeyLegacy: "/thinqasset-assets/services/fund-platform/journey-legacy.png",
  spotlightDifc: "/thinqasset-assets/services/fund-platform/spotlight-difc.png",
  spotlightMauritius: "/thinqasset-assets/services/fund-platform/spotlight-mauritius.png",
  carouselFaas: "/thinqasset-assets/services/fund-platform/carousel-faas.png",
  carouselHosting: "/thinqasset-assets/services/fund-platform/carousel-hosting.png",
  carouselManco: "/thinqasset-assets/services/fund-platform/carousel-manco.png",
  carouselGovernance: "/thinqasset-assets/services/fund-platform/carousel-governance.png",
  carouselTokenisation: "/thinqasset-assets/services/fund-platform/carousel-tokenisation.png",
  mauritius: "/thinqasset-assets/services/fund-platform/mauritius.png",
  luxembourg: "/thinqasset-assets/services/fund-platform/luxembourg.png",
  singapore: "/thinqasset-assets/services/fund-platform/singapore.png",
  uae: "/thinqasset-assets/services/fund-platform/uae.png",
} as const;

export type OfferingScrollImage = {
  src: string;
  alt: string;
};

const FUND_PLATFORM_JOURNEY_IMAGE_POOL: readonly OfferingScrollImage[] = [
  {
    src: FUND_PLATFORM_IMAGES.hero,
    alt: "Global regulated fund platform operations",
  },
  {
    src: FUND_PLATFORM_IMAGES.journeyDiscovery,
    alt: "Strategic discovery session",
  },
  {
    src: FUND_PLATFORM_IMAGES.journeyLaunch,
    alt: "Investment fund launch",
  },
  {
    src: FUND_PLATFORM_IMAGES.journeyGrowth,
    alt: "Portfolio and asset growth",
  },
  {
    src: FUND_PLATFORM_IMAGES.journeyLegacy,
    alt: "Institutional legacy and vault",
  },
];

const FUND_PLATFORM_CAROUSEL_IMAGE_POOL: readonly OfferingScrollImage[] = [
  {
    src: FUND_PLATFORM_IMAGES.carouselFaas,
    alt: "Fund-as-a-Service",
  },
  {
    src: FUND_PLATFORM_IMAGES.carouselHosting,
    alt: "Regulated fund hosting",
  },
  {
    src: FUND_PLATFORM_IMAGES.carouselManco,
    alt: "Management company solutions",
  },
  {
    src: FUND_PLATFORM_IMAGES.carouselGovernance,
    alt: "Fund governance framework",
  },
  {
    src: FUND_PLATFORM_IMAGES.carouselTokenisation,
    alt: "Digital asset tokenisation",
  },
];

const STRUCTURES_JOURNEY_IMAGE_POOL: readonly OfferingScrollImage[] = [
  {
    src: SERVICE_IMAGES.structures,
    alt: "Investment structures across jurisdictions",
  },
  {
    src: FUND_PLATFORM_IMAGES.uae,
    alt: "DIFC and UAE structuring",
  },
  {
    src: FUND_PLATFORM_IMAGES.mauritius,
    alt: "Mauritius structuring hub",
  },
  {
    src: FUND_PLATFORM_IMAGES.luxembourg,
    alt: "Luxembourg GP–LP structures",
  },
];

const STRUCTURES_CAROUSEL_IMAGE_POOL: readonly OfferingScrollImage[] = [
  {
    src: FUND_PLATFORM_IMAGES.spotlightDifc,
    alt: "DIFC structures",
  },
  {
    src: FUND_PLATFORM_IMAGES.mauritius,
    alt: "Mauritius Protected Cell Company",
  },
  {
    src: FUND_PLATFORM_IMAGES.luxembourg,
    alt: "Luxembourg GP–LP",
  },
];

const CORPORATE_JOURNEY_IMAGE_POOL: readonly OfferingScrollImage[] = [
  {
    src: SERVICE_IMAGES.corporate,
    alt: "Corporate and institutional services",
  },
  {
    src: FUND_PLATFORM_IMAGES.singapore,
    alt: "Singapore corporate infrastructure",
  },
  {
    src: JURISDICTION_IMAGES.uae,
    alt: "UAE corporate presence",
  },
  {
    src: JURISDICTION_IMAGES.luxembourg,
    alt: "Luxembourg corporate services",
  },
];

const CORPORATE_CAROUSEL_IMAGE_POOL: readonly OfferingScrollImage[] = [
  {
    src: SERVICE_IMAGES.corporate,
    alt: "Corporate capabilities",
  },
  {
    src: FUND_PLATFORM_IMAGES.singapore,
    alt: "International corporate infrastructure",
  },
  {
    src: JURISDICTION_IMAGES.mauritius,
    alt: "Mauritius corporate administration",
  },
  {
    src: JURISDICTION_IMAGES.uae,
    alt: "UAE corporate services",
  },
  {
    src: FUND_PLATFORM_IMAGES.luxembourg,
    alt: "European corporate infrastructure",
  },
];

const PILLAR_OFFERING_IMAGE_POOLS: Record<
  ServiceColumn["id"],
  readonly OfferingScrollImage[]
> = {
  "fund-platform": FUND_PLATFORM_JOURNEY_IMAGE_POOL,
  structures: STRUCTURES_JOURNEY_IMAGE_POOL,
  corporate: CORPORATE_JOURNEY_IMAGE_POOL,
};

/** How many offering rows share one scroll-synced image before advancing. */
export const OFFERING_IMAGE_HOLD_ITEMS = 5;

/** Journey stages per scroll-synced image on fund-platform hub. */
export const JOURNEY_IMAGE_HOLD_ITEMS = 2;

/** Portion of each hold window used for the crossfade (remainder = fully visible). */
export const OFFERING_IMAGE_TRANSITION_SHARE = 0.62;

/** Scroll-synced offerings image — half-size pool, multiple rows per image. */
export function resolveOfferingScrollImage(
  pillarId: ServiceColumn["id"],
  index: number,
  holdItems: number = OFFERING_IMAGE_HOLD_ITEMS,
): OfferingScrollImage {
  const pool = PILLAR_OFFERING_IMAGE_POOLS[pillarId];
  const slot = Math.floor(index / holdItems);
  return pool[slot % pool.length]!;
}

/** Carousel slide image — cycles pillar art across offerings. */
export function resolveOfferingCarouselImage(
  pillarId: ServiceColumn["id"],
  index: number,
): OfferingScrollImage {
  if (pillarId === "fund-platform") {
    return FUND_PLATFORM_CAROUSEL_IMAGE_POOL[
      index % FUND_PLATFORM_CAROUSEL_IMAGE_POOL.length
    ]!;
  }

  if (pillarId === "structures") {
    return STRUCTURES_CAROUSEL_IMAGE_POOL[
      index % STRUCTURES_CAROUSEL_IMAGE_POOL.length
    ]!;
  }

  if (pillarId === "corporate") {
    return CORPORATE_CAROUSEL_IMAGE_POOL[
      index % CORPORATE_CAROUSEL_IMAGE_POOL.length
    ]!;
  }

  const pool = PILLAR_OFFERING_IMAGE_POOLS[pillarId];
  return pool[index % pool.length]!;
}

export const SERVICE_COLUMNS: readonly ServiceColumn[] = [
  {
    id: "fund-platform",
    index: "01",
    title: "Global regulated fund platform",
    teaser: "Launch and scale regulated funds without building the stack.",
    blurb:
      "Institutional governance, regulatory oversight, and operations for managers, PE/VC sponsors, and family offices.",
    body: "Helping investment managers, private equity firms, venture capital sponsors, financial institutions and family offices launch, operate and scale regulated investment platforms.",
    href: "/services/global-regulated-fund-platform",
    offeringsHeadline:
      "Global regulated fund infrastructure, done properly",
    journeyStages: {
      headline: "Your journey with us",
      stages: [
        {
          title: "Discovery",
          summary:
            "Understand your objectives, strategy, investors, markets, and regulatory context before recommending anything.",
        },
        {
          title: "Strategy & structuring",
          summary:
            "Design jurisdiction, fund vehicle, governance, and cross-border structure with your advisers.",
        },
        {
          title: "Establishment",
          summary:
            "Coordinate incorporation, fund setup, regulatory path, banking, custody, and operational readiness.",
        },
        {
          title: "Launch",
          summary:
            "Move into live operations — onboarding, governance, compliance, reporting, and service-provider coordination.",
        },
        {
          title: "Growth",
          summary:
            "Scale with additional funds, jurisdictions, SPVs, capital raises, and international expansion on the same platform.",
        },
        {
          title: "Optimisation",
          summary:
            "Mature governance, compliance, risk, ESG, and operational efficiency as the business evolves.",
        },
        {
          title: "Legacy",
          summary:
            "Long-term succession, family governance, wealth preservation, and institutional continuity.",
        },
      ],
    },
    carouselHeadline: "Core solutions",
    rationale: {
      headline: "Institutional infrastructure behind your strategy",
      paragraphs: [
        "Regulated funds require governance, compliance, onboarding, and distribution — not just portfolio decisions. Building that stack independently is slow, capital-intensive, and diverts focus from the mandate.",
        "Our platform provides licensed hosting, ManCo governance, and operational depth so you retain strategy and investor relationships while the regulated stack runs to institutional standard.",
      ],
      image: {
        src: FUND_PLATFORM_IMAGES.rationale,
        alt: "Institutional infrastructure behind your strategy",
      },
    },
    outcomes: {
      headline: "Why sponsors choose our platform",
      intro:
        "One integrated operating model across regulated investment, governance, and administration — so you scale without rebuilding infrastructure.",
      benefits: [
        "Faster route to market without greenfield licensing",
        "One strategic relationship across DIFC, Mauritius, and Luxembourg",
        "Institutional governance and compliance embedded across the lifecycle",
        "Scalable infrastructure that grows with additional funds and jurisdictions",
      ],
      image: {
        src: FUND_PLATFORM_IMAGES.outcomes,
        alt: "Why sponsors choose our platform",
      },
    },
    image: {
      src: SERVICE_IMAGES.fund,
      targetSrc: SERVICE_IMAGES.fund,
      alt: "Institutional fund platform operations across global financial centres",
    },
    faqs: {
      headline: "Frequently asked questions about our fund platform",
      items: [
        {
          question: "What is a regulated fund platform?",
          answer:
            "A regulated fund platform is the licensed operating layer behind an investment fund — governance, compliance, administration, and regulatory oversight — so sponsors can focus on strategy and investors without building a standalone management company.",
        },
        {
          question: "Who is the platform designed for?",
          answer:
            "Investment managers, private equity and venture capital sponsors, financial institutions, and family offices who need institutional infrastructure, cross-border capability, and regulatory substance behind their mandate.",
        },
        {
          question: "How does Fund-as-a-Service differ from traditional launch?",
          answer:
            "Instead of establishing your own licensed management company, you operate through our regulated infrastructure while retaining strategy, brand, and investor relationships. Time to market and fixed establishment costs are typically lower.",
        },
        {
          question: "Which jurisdictions does the platform cover?",
          answer:
            "We coordinate regulated hosting and umbrella structures across DIFC, Mauritius, and Luxembourg — with consistent governance standards and centralised project management across the network.",
        },
        {
          question: "How do you handle investor onboarding and AML?",
          answer:
            "Investor onboarding, KYC, AML, and MLRO services are embedded in the platform — rigorous enough for institutional due diligence without unnecessary friction for legitimate investors.",
        },
        {
          question: "Can we bring our own investment team?",
          answer:
            "Yes. Sponsors retain portfolio and commercial control. Our role is the regulated operating layer — ManCo governance, compliance, administration, and coordination with administrators, custodians, and auditors.",
        },
        {
          question: "How long does a typical launch take?",
          answer:
            "Timelines depend on structure, jurisdiction, and regulatory path. Hosting through an established platform is materially faster than greenfield licensing — we scope realistic milestones during consultation.",
        },
        {
          question: "What makes this different from a traditional fund administrator?",
          answer:
            "Administrators execute instructions. Our platform provides the regulatory framework, governance, and operational depth behind the fund — closer to a management company and hosting model than back-office processing alone.",
        },
        {
          question: "Do you support cross-border distribution?",
          answer:
            "Yes. Distribution is coordinated with the regulatory and operational realities of each market, aligned to the domicile and investor profile of the fund.",
        },
      ],
    },
    spotlight: {
      headline: "Global regulatory footprint",
      subtitle: "Three strategic financial centres. One operating model.",
      cards: [
        {
          meta: "DFSA regulated",
          title: "DIFC — Middle East hub",
          description:
            "Principal Middle East platform: FaaS, fund hosting, QIF, ManCo, portfolio management, and institutional governance for GCC and international investors.",
          image: {
            src: FUND_PLATFORM_IMAGES.spotlightDifc,
            alt: "Dubai International Financial Centre",
          },
        },
        {
          meta: "Cross-border centres",
          title: "Mauritius & Luxembourg",
          description:
            "Mauritius: international funds, PCC, PE/VC, and cross-border vehicles. Luxembourg: GP–LP, institutional PE/VC, and European fundraising access.",
          image: {
            src: FUND_PLATFORM_IMAGES.spotlightMauritius,
            alt: "Mauritius and Luxembourg financial centres",
          },
        },
      ],
    },
    offerings: [
      {
        slug: "fund-as-a-service",
        title: "Fund-as-a-Service (FaaS)",
        summary:
          "Launch and operate your investment fund through our end-to-end regulated platform.",
        body: "Instead of building a regulated investment management business from the ground up, sponsors gain access to our institutional infrastructure — governance, compliance, operational management, and regulatory oversight — while retaining ownership of strategy, brand, and investor relationships. You manage the investments. We manage the infrastructure.",
        highlights: [
          "Faster time to market",
          "Lower fixed establishment cost",
          "Institutional credibility from day one",
        ],
      },
      {
        slug: "regulated-fund-hosting",
        title: "Regulated fund hosting",
        summary:
          "Operate under our licensed regulatory framework for a faster, more efficient route to market.",
        body: "Fund hosting enables managers to launch and operate investment funds using an existing regulated platform rather than establishing a standalone management company. The sponsor owns the investment strategy and commercial success; we provide the regulatory framework, governance, and operational infrastructure.",
        highlights: [
          "Regulatory hosting / umbrella model",
          "Independent governance and oversight",
          "Reduced capital and licensing burden",
        ],
      },
      {
        slug: "regulatory-umbrella-platform",
        title: "Regulatory umbrella platform",
        summary:
          "Leverage established regulatory infrastructure to launch compliant products across jurisdictions.",
        body: "Our regulatory umbrella connects DIFC, Mauritius, and Luxembourg under one coordinated operating model — consistent governance standards, centralised project management, and the flexibility to expand as strategies evolve.",
        highlights: [
          "Multi-jurisdiction coordination",
          "Consistent governance standards",
          "Scalable product launch path",
        ],
      },
      {
        slug: "white-label-fund-solutions",
        title: "White-label fund solutions",
        summary:
          "Bring your strategy to market under your brand while we run the regulated operating layer.",
        body: "White-label solutions let sponsors present a fully branded investment product to investors while ThinqAsset manages the regulatory, operational, and administrative framework behind the scenes.",
      },
      {
        slug: "management-company",
        title: "Management company (ManCo)",
        summary:
          "Institutional governance, independent oversight, and trusted execution across the fund lifecycle.",
        body: "Our ManCo platform provides the governance framework that protects investors and supports sponsors — supervision, regulatory compliance, operational management, and coordination between administrators, custodians, auditors, and other counterparties.",
        highlights: [
          "Independent governance",
          "Regulatory accountability",
          "Segregation of duties",
        ],
      },
      {
        slug: "portfolio-management",
        title: "Portfolio management",
        summary:
          "Disciplined execution, risk management, and alignment with defined investment objectives.",
        body: "Professional portfolio management solutions focused on disciplined execution, risk oversight, and alignment with the mandate — delivered within our regulated operating environment.",
      },
      {
        slug: "fund-governance",
        title: "Fund governance",
        summary:
          "Frameworks that strengthen oversight, transparency, and fiduciary standards.",
        body: "Robust governance frameworks designed to meet the standards institutional investors and regulators expect — clear accountabilities, transparent reporting, and durable oversight across the lifecycle.",
      },
      {
        slug: "compliance-risk-management",
        title: "Compliance & risk management",
        summary:
          "Integrated compliance and risk services that keep pace with evolving regulation.",
        body: "We embed compliance and risk management into day-to-day operations so funds remain aligned with regulatory obligations while protecting investors and the platform.",
      },
      {
        slug: "aml-kyc-mlro",
        title: "AML / KYC & MLRO",
        summary:
          "AML, KYC, and Money Laundering Reporting Officer support across the investor lifecycle.",
        body: "Comprehensive AML, KYC, and MLRO services that support regulatory compliance and protect against financial crime — without turning onboarding into friction for legitimate investors.",
      },
      {
        slug: "investor-onboarding",
        title: "Investor onboarding",
        summary:
          "Rigorous due diligence with an onboarding experience investors can actually complete.",
        body: "A seamless onboarding process that combines institutional due diligence with a clear investor experience — from first contact through admission.",
      },
      {
        slug: "cross-border-distribution",
        title: "Cross-border distribution",
        summary:
          "Compliant routes to expand investor reach across key international markets.",
        body: "Distribution support designed for sponsors who need access beyond a single domicile — coordinated with the regulatory and operational realities of each market.",
      },
      {
        slug: "capital-markets-infrastructure",
        title: "Capital markets infrastructure",
        summary:
          "Institutional infrastructure for fund operations, execution, reporting, and connectivity.",
        body: "Capital markets, custody, escrow, and structured finance capabilities that support acquisitions, financing transactions, capital formation, and complex multi-party deals.",
      },
      {
        slug: "custody-escrow",
        title: "Custody & escrow",
        summary:
          "Secure custody and escrow arrangements that protect assets and give counterparties confidence.",
        body: "Custody and escrow solutions designed to protect assets, facilitate transactions, and provide institutional confidence to investors and counterparties.",
      },
      {
        slug: "spvs",
        title: "SPVs",
        summary:
          "Structuring and administration of special purpose vehicles for investments and transactions.",
        body: "Formation and ongoing administration of SPVs for investments, acquisitions, co-investments, financing, and bespoke transaction requirements — with ring-fencing where it matters.",
      },
      {
        slug: "structured-finance",
        title: "Structured finance",
        summary:
          "Tailored structures that optimise capital and support complex transactions.",
        body: "Structured finance solutions that improve financing efficiency and support sophisticated transaction architectures across asset classes and jurisdictions.",
      },
      {
        slug: "tokenisation-digital-assets",
        title: "Tokenisation & digital asset structures",
        summary:
          "Compliant frameworks for next-generation issuance, management, and administration.",
        body: "Digital asset and tokenisation structures explored within an institutional governance framework — bridging traditional finance and digital ownership models where regulation permits.",
      },
    ],
  },
  {
    id: "structures",
    index: "02",
    title: "Our structures",
    teaser: "DIFC, Mauritius, and Luxembourg — matched to the mandate.",
    blurb:
      "Three jurisdictions. Vehicles matched to investor base and strategy — QIF, PCC, or Luxembourg GP–LP.",
    body: "The right jurisdiction should support the investment strategy. We help sponsors select and stand up the structure that fits investor profile, asset class, and distribution path.",
    href: "/services/our-structures",
    offeringsHeadline: "Investment structures built for scale",
    journeyStages: {
      headline: "Your journey with us",
      stages: [
        {
          title: "Discovery",
          summary:
            "Understand strategy, investors, asset class, and distribution path before recommending a domicile.",
        },
        {
          title: "Strategy & structuring",
          summary:
            "Match DIFC, Mauritius, or Luxembourg vehicles to the mandate with your advisers.",
        },
        {
          title: "Establishment",
          summary:
            "Coordinate formation, documentation, banking, and operational readiness for the chosen structure.",
        },
        {
          title: "Launch",
          summary:
            "Go live with governance, onboarding, and service providers aligned to institutional standard.",
        },
        {
          title: "Growth",
          summary:
            "Add cells, compartments, or linked jurisdictions as strategies and capital scale.",
        },
        {
          title: "Optimisation",
          summary:
            "Refine governance, reporting, and cross-border stacking as the platform matures.",
        },
        {
          title: "Legacy",
          summary:
            "Maintain structures for long-term continuity, succession, and institutional credibility.",
        },
      ],
    },
    carouselHeadline: "Structures by jurisdiction",
    rationale: {
      headline: "The right jurisdiction for the mandate",
      paragraphs: [
        "Investor profile, asset class, and distribution path should drive domicile — not the other way around. We help sponsors select and stand up vehicles across DIFC, Mauritius, and Luxembourg with the governance each jurisdiction demands.",
        "From QIF and protected cell companies to Luxembourg GP–LP, structures are matched to strategy and operated through our coordinated cross-border platform.",
      ],
      image: {
        src: FUND_PLATFORM_IMAGES.uae,
        alt: "The right jurisdiction for the mandate",
      },
    },
    outcomes: {
      headline: "Structures that hold up under institutional review",
      intro:
        "Our structures are chosen and administered for real-world fundraising and operations — which delivers:",
      benefits: [
        "Ring-fenced cells and segregated mandates where strategies require it",
        "Consistent governance standards across Middle East, African, and European domiciles",
        "Rapid launch paths through established regulatory hosting",
        "Documentation and administration built for scale as the platform grows",
      ],
      image: {
        src: FUND_PLATFORM_IMAGES.luxembourg,
        alt: "Structures that hold up under institutional review",
      },
    },
    image: {
      src: SERVICE_IMAGES.structures,
      targetSrc: SERVICE_IMAGES.structures,
      alt: "Cross-border investment structures across DIFC, Mauritius, and Luxembourg",
    },
    faqs: {
      headline: "Frequently asked questions about our structures",
      items: [
        {
          question: "How do I choose between DIFC, Mauritius, and Luxembourg?",
          answer:
            "Investor profile, asset class, distribution path, and regulatory expectations should drive domicile. We help sponsors match vehicle to mandate rather than forcing strategy into a single jurisdiction.",
        },
        {
          question: "What is a protected cell company?",
          answer:
            "A PCC ring-fences assets and liabilities within individual cells under shared governance — useful for segregated strategies, country-specific sleeves, and platforms that need cellular flexibility with institutional oversight.",
        },
        {
          question: "Who should use DIFC structures?",
          answer:
            "Sponsors seeking a regulated Middle East domicile — including professional-investor QIFs and Protected Cell Companies — with rapid launch through established hosting and DFSA-aligned governance.",
        },
        {
          question: "When is Luxembourg GP–LP the right choice?",
          answer:
            "For private equity, venture capital, and European institutional fundraising where the GP–LP architecture remains the reference standard for LPs and counterparties.",
        },
        {
          question: "Can structures span multiple jurisdictions?",
          answer:
            "Yes. Many mandates combine Middle East, African, and European domiciles. We coordinate documentation, governance, and administration across the stack from a single operating desk.",
        },
        {
          question: "What governance is included after formation?",
          answer:
            "Ongoing administration, regulatory liaison, board and shareholder support, and coordination with auditors and service providers — structures are operated, not just incorporated.",
        },
        {
          question: "How quickly can a structure be stood up?",
          answer:
            "Launch paths vary by vehicle and regulator. Established hosting and template governance materially shorten time to first close compared with greenfield licensing.",
        },
        {
          question: "Do you support tokenisation and digital asset structures?",
          answer:
            "Where regulation permits, we explore digital asset and tokenisation frameworks within institutional governance — bridging traditional finance and digital ownership models.",
        },
        {
          question: "What due diligence should LPs expect?",
          answer:
            "Institutional-grade documentation, clear ring-fencing where required, segregated mandates, and governance that holds up under LP and regulator review.",
        },
      ],
    },
    spotlight: {
      headline: "Three jurisdictions. One structuring desk.",
      subtitle: "DIFC, Mauritius, and Luxembourg — coordinated for the mandate.",
      cards: [
        {
          meta: "Middle East",
          title: "DIFC — QIF & PCC",
          description:
            "Professional-investor funds and ring-fenced cells under a DFSA-aligned domicile, with rapid launch through established hosting.",
          image: {
            src: FUND_PLATFORM_IMAGES.spotlightDifc,
            alt: "Dubai International Financial Centre",
          },
        },
        {
          meta: "Operational HQ & Europe",
          title: "Mauritius PCC & Luxembourg GP–LP",
          description:
            "Cellular platforms from our Mauritius base and institutional GP–LP architecture for European private-market fundraising.",
          image: {
            src: FUND_PLATFORM_IMAGES.spotlightMauritius,
            alt: "Mauritius and Luxembourg structuring centres",
          },
        },
      ],
    },
    related: {
      headline: "Structures clients deploy with us",
      linkHref: "/services",
      linkLabel: "View all services",
      cards: [
        {
          offeringSlug: "difc-structures",
          metaLabel: "Structures",
        },
        {
          offeringSlug: "luxembourg-gp-lp",
          metaLabel: "Structures",
        },
      ],
    },
    offerings: [
      {
        slug: "difc-structures",
        title: "DIFC structures",
        summary:
          "Qualified Investor Funds and Protected Cell Companies under a DFSA-aligned Middle East domicile.",
        body: "DIFC structures for professional investors — QIF and Protected Cell Company vehicles with rapid launch through regulated hosting, institutional governance, and coordination across our wider platform.",
        highlights: [
          "Qualified Investor Fund (QIF)",
          "Protected Cell Company",
          "DFSA-aligned governance",
        ],
      },
      {
        slug: "mauritius-protected-cell-company",
        title: "Mauritius Protected Cell Company (PCC)",
        summary:
          "Ring-fenced cells, shared governance, and country-specific strategies from our operational HQ.",
        body: "Mauritius PCCs support ring-fenced investment cells with shared governance — a proven structure for multi-strategy platforms and country-specific sleeves, operated from our Mauritius base.",
        highlights: [
          "Ring-fenced investment cells",
          "Shared governance",
          "Country-specific strategies",
        ],
      },
      {
        slug: "luxembourg-gp-lp",
        title: "Luxembourg GP–LP",
        summary:
          "The institutional standard for private equity, venture capital, and European fundraising.",
        body: "Luxembourg GP–LP structures remain the reference architecture for private equity, venture capital, institutional fundraising, and European investment strategies — Limited Partners → General Partner → Investment Fund → Portfolio Companies.",
        highlights: [
          "Private equity & venture capital",
          "Institutional fundraising",
          "European investment strategies",
        ],
      },
    ],
  },
  {
    id: "corporate",
    index: "03",
    title: "Corporate & institutional services",
    teaser: "Incorporate, govern, and run internationally from one desk.",
    blurb:
      "Core capabilities plus global corporate infrastructure — structuring, secretarial, CFO, and compliance across the centres your group uses.",
    body: "Beyond incorporation: structuring, governance, accounting, compliance, and ongoing administration across leading financial centres — so leadership can focus on the business.",
    href: "/services/corporate-institutional-services",
    offeringsHeadline:
      "Corporate infrastructure that keeps pace with growth",
    journeyStages: {
      headline: "Your journey with us",
      stages: [
        {
          title: "Discovery",
          summary:
            "Understand commercial objectives, entity stack, and where governance or compliance is breaking.",
        },
        {
          title: "Strategy & structuring",
          summary:
            "Design jurisdictions, holding layers, and operating entities with your advisers.",
        },
        {
          title: "Establishment",
          summary:
            "Incorporate, domicile, appoint officers, and complete banking readiness.",
        },
        {
          title: "Launch",
          summary:
            "Activate secretarial, accounting, payroll, and compliance cadences.",
        },
        {
          title: "Growth",
          summary:
            "Add subsidiaries, SPVs, and regional expansion on the same operating desk.",
        },
        {
          title: "Optimisation",
          summary:
            "Tighten reporting, audit coordination, and substance as the group matures.",
        },
        {
          title: "Legacy",
          summary:
            "Family office, trusts, and succession infrastructure for multi-generational continuity.",
        },
      ],
    },
    carouselHeadline: "Core capabilities",
    rationale: {
      headline: "Corporate substance across the centres you use",
      paragraphs: [
        "International groups need more than incorporation — they need governance, accounting, compliance, and secretarial discipline across every entity in the stack. Fragmented providers create gaps that regulators and counterparties notice.",
        "We deliver coordinated corporate, CFO, and compliance services across the financial centres our clients operate in — so leadership can focus on the business, not the back office.",
      ],
      image: {
        src: FUND_PLATFORM_IMAGES.singapore,
        alt: "Corporate substance across the centres you use",
      },
    },
    outcomes: {
      headline: "Infrastructure that scales with the group",
      intro:
        "Our corporate platform is built for groups that operate across borders and need continuity — which means:",
      benefits: [
        "Entity formation and secretarial kept current across jurisdictions",
        "Accounting, payroll, and CFO support calibrated to growth-stage needs",
        "Compliance and audit coordination without last-minute scrambles",
        "Family office and private client infrastructure with institutional rigour",
      ],
      image: {
        src: SERVICE_IMAGES.corporate,
        alt: "Infrastructure that scales with the group",
      },
    },
    image: {
      src: SERVICE_IMAGES.corporate,
      targetSrc: SERVICE_IMAGES.corporate,
      alt: "International corporate infrastructure and governance across financial centres",
    },
    faqs: {
      headline: "Frequently asked questions about corporate services",
      items: [
        {
          question: "What corporate services does ThinqAsset provide?",
          answer:
            "International structuring, incorporation, secretarial, accounting, CFO support, payroll, audit coordination, governance, compliance, and private client infrastructure across the financial centres our clients use.",
        },
        {
          question: "Which jurisdictions do you support?",
          answer:
            "UAE, Singapore, Hong Kong, Malaysia, Mauritius, Luxembourg, BVI, Cayman, Guernsey, the United Kingdom, and coordinated support elsewhere through our network.",
        },
        {
          question: "How do CFO and accounting services work?",
          answer:
            "We provide bookkeeping, management reporting, group consolidation, and CFO-level support calibrated to growth-stage and institutional needs — aligned with audit and tax advisers where required.",
        },
        {
          question: "Can you support family offices and private clients?",
          answer:
            "Yes. Governance, administration, succession planning, and cross-border structuring for entrepreneurial families and UHNW individuals — with institutional rigour behind the infrastructure.",
        },
        {
          question: "How does compliance coordination work?",
          answer:
            "Proactive compliance across evolving regulatory obligations — ESG, FATCA/CRS, economic substance, MLRO, data protection, and legal coordination — without last-minute scrambles at year-end.",
        },
        {
          question: "Do you work with existing advisers?",
          answer:
            "We coordinate with tax, legal, and audit advisers rather than replacing them — our role is operational execution and governance continuity across the entity stack.",
        },
        {
          question: "Can you incorporate and maintain entities remotely?",
          answer:
            "Yes. Formation, secretarial, and ongoing administration are delivered across borders with local substance and regulatory requirements respected in each centre.",
        },
        {
          question: "What is included in governance support?",
          answer:
            "Board and shareholder processes, minute books, statutory filings, and frameworks that promote accountability and transparent decision-making as the group scales.",
        },
        {
          question: "How do trusts and foundations fit the platform?",
          answer:
            "Trust, foundation, and estate structures are coordinated with the wider corporate and investment platform so succession and governance stay aligned across generations.",
        },
      ],
    },
    spotlight: {
      headline: "Global corporate infrastructure",
      subtitle:
        "Supporting businesses across leading financial centres — with regulatory compliance built in.",
      cards: [
        {
          meta: "Jurisdictions",
          title: "UAE · Singapore · Hong Kong · Mauritius · Luxembourg",
          description:
            "Plus Malaysia, BVI, Cayman, Guernsey, and the United Kingdom — coordinated presence where your group actually operates.",
          image: {
            src: FUND_PLATFORM_IMAGES.singapore,
            alt: "Global corporate infrastructure jurisdictions",
          },
        },
        {
          meta: "Compliance stack",
          title: "ESG · FATCA / CRS · ESR · MLRO · Data protection",
          description:
            "Proactive compliance and legal coordination so obligations stay mapped — not discovered at year-end.",
          image: {
            src: JURISDICTION_IMAGES.uae,
            alt: "Corporate compliance infrastructure",
          },
        },
      ],
    },
    related: {
      headline: "Corporate services in the stack",
      linkHref: "/services",
      linkLabel: "View all services",
      cards: [
        {
          offeringSlug: "international-structuring",
          metaLabel: "Corporate",
        },
        { offeringSlug: "corporate-compliance", metaLabel: "Corporate" },
      ],
    },
    offerings: [
      {
        slug: "international-structuring",
        title: "International structuring",
        summary:
          "Cross-border corporate and investment structures aligned to commercial, regulatory, and tax objectives.",
        body: "We design and implement efficient cross-border structures tailored to commercial goals, regulatory constraints, and tax considerations — then stay involved as the group evolves.",
      },
      {
        slug: "incorporation",
        title: "Incorporation",
        summary:
          "End-to-end company establishment across leading international jurisdictions.",
        body: "Fast, coordinated incorporation support across the jurisdictions our clients actually use — with the governance and banking readiness steps built into the plan.",
      },
      {
        slug: "corporate-spvs",
        title: "SPVs",
        summary:
          "Formation and administration of SPVs for holding, acquisitions, financing, and structured deals.",
        body: "Special purpose vehicles for investment holding, acquisitions, financing, and structured transactions — formed and administered with clear ring-fencing and ongoing compliance.",
      },
      {
        slug: "domiciliation",
        title: "Domiciliation",
        summary:
          "Registered office and compliant local presence that satisfies jurisdictional requirements.",
        body: "Provide your entity with a registered office and a credible local presence that meets jurisdictional and regulatory expectations.",
      },
      {
        slug: "corporate-secretarial",
        title: "Corporate secretarial",
        summary:
          "Statutory, governance, and filing obligations kept current across the entity lifecycle.",
        body: "Comprehensive secretarial services so entities remain compliant with statutory, governance, and filing obligations — without last-minute scrambles.",
      },
      {
        slug: "directorship",
        title: "Directorship",
        summary:
          "Independent and nominee directors for effective governance and regulatory compliance.",
        body: "Experienced independent and nominee directors providing oversight, substance where required, and governance that stands up to counterparties and regulators.",
      },
      {
        slug: "cfo-services",
        title: "CFO services",
        summary:
          "Outsourced CFO leadership spanning reporting, budgeting, forecasting, and advisory.",
        body: "Strategic financial leadership without a full-time bench — reporting, budgeting, forecasting, and business advisory calibrated to growth-stage and institutional needs.",
      },
      {
        slug: "accounting",
        title: "Accounting",
        summary:
          "Bookkeeping, financial reporting, and management accounts tailored to the business.",
        body: "Accurate, timely accounting including bookkeeping, financial reporting, and management accounts that leadership can actually use.",
      },
      {
        slug: "payroll",
        title: "Payroll",
        summary:
          "Accurate, on-time payroll administration in full compliance with local rules.",
        body: "Reliable payroll administration ensuring employees are paid accurately, on time, and in compliance with local regulations.",
      },
      {
        slug: "audit-coordination",
        title: "Audit coordination",
        summary:
          "End-to-end coordination with auditors for a cleaner, faster close.",
        body: "We coordinate with auditors to streamline the process, reduce noise, and support timely completion.",
      },
      {
        slug: "corporate-governance",
        title: "Governance",
        summary:
          "Frameworks that promote accountability, transparency, and sound decision-making.",
        body: "Corporate governance frameworks that promote accountability and transparent decision-making across the organisation.",
      },
      {
        slug: "corporate-compliance",
        title: "Compliance",
        summary:
          "Proactive compliance across evolving regulatory and operational obligations.",
        body: "Ongoing compliance support covering regulatory obligations and operational risk — including ESG, FATCA/CRS, ESR, MLRO, data protection, and legal coordination where required.",
        highlights: [
          "UAE · Singapore · Hong Kong · Malaysia",
          "Mauritius · Luxembourg · BVI · Cayman",
          "Guernsey · United Kingdom",
        ],
      },
      {
        slug: "private-client-family-office",
        title: "Private client & family office",
        summary:
          "Institutional infrastructure for families, family businesses, and private capital.",
        body: "Governance, administration, succession planning, and cross-border structuring for entrepreneurial families and UHNW individuals — infrastructure traditionally reserved for the largest family offices.",
      },
      {
        slug: "trusts-foundations-estate",
        title: "Trusts, foundations & estate planning",
        summary:
          "Structures that protect wealth and support multi-generational planning.",
        body: "Trust, foundation, and estate planning structures coordinated with the wider corporate and investment platform so succession and governance stay aligned.",
      },
    ],
  },
] as const;

/** Pillar hub pages + every offering — used by /services/[slug]. */
export type ServicePageEntry = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  body: string;
  highlights?: readonly string[];
  pillarId: ServiceColumn["id"];
  parentHref?: string;
};

function buildServicePages(): Record<string, ServicePageEntry> {
  const pages: Record<string, ServicePageEntry> = {};

  for (const column of SERVICE_COLUMNS) {
    const pillarSlug = column.href.replace(/^\/services\//, "");
    pages[pillarSlug] = {
      slug: pillarSlug,
      title: column.title,
      eyebrow: "Services",
      summary: column.teaser,
      body: column.body,
      highlights: column.offerings.map((o) => o.title),
      pillarId: column.id,
    };

    for (const offering of column.offerings) {
      pages[offering.slug] = {
        slug: offering.slug,
        title: offering.title,
        eyebrow: column.title,
        summary: offering.summary,
        body: offering.body,
        highlights: offering.highlights,
        pillarId: column.id,
        parentHref: column.href,
      };
    }
  }

  return pages;
}

export const SERVICE_PAGES = buildServicePages();

/** Old Structures offering slugs → consolidated DIFC structures page. */
export const DEPRECATED_SERVICE_SLUGS: Record<string, string> = {
  "difc-qualified-investor-fund": "difc-structures",
  "difc-protected-cell-company": "difc-structures",
};

export function getServicePage(slug: string): ServicePageEntry | undefined {
  return SERVICE_PAGES[slug];
}

export function getServicePillarImage(pillarId: ServiceColumn["id"]) {
  return SERVICE_COLUMNS.find((column) => column.id === pillarId)?.image;
}

export function resolveServiceRelatedCards(
  pillar: ServiceColumn,
  excludeSlug?: string,
) {
  if (!pillar.related) {
    return null;
  }

  const related = pillar.related;

  const cards = related.cards
    .map((card) => {
      const offering = pillar.offerings.find(
        (entry) => entry.slug === card.offeringSlug,
      );
      if (!offering || offering.slug === excludeSlug) return null;

      return {
        href: `/services/${offering.slug}`,
        image: {
          src: pillar.image.src,
          alt: offering.summary,
        },
        meta: `${offering.title} • ${card.metaLabel}`,
        description: offering.summary,
      };
    })
    .filter((card): card is NonNullable<typeof card> => card !== null);

  if (cards.length >= 2) {
    return cards.slice(0, 2) as [
      (typeof cards)[number],
      (typeof cards)[number],
    ];
  }

  const fallback = pillar.offerings
    .filter((offering) => offering.slug !== excludeSlug)
    .slice(0, 2)
    .map((offering) => ({
      href: `/services/${offering.slug}`,
      image: {
        src: pillar.image.src,
        alt: offering.summary,
      },
      meta: `${offering.title} • ${related.cards[0]?.metaLabel ?? pillar.title}`,
      description: offering.summary,
    }));

  return fallback as [
    (typeof fallback)[number],
    (typeof fallback)[number],
  ];
}

export function getAllServiceSlugs(): string[] {
  return Object.keys(SERVICE_PAGES);
}

export type ServiceCarouselSlide = {
  href: string;
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
};

export function getPillarOfferingSlides(
  pillar: ServiceColumn,
): ServiceCarouselSlide[] {
  return pillar.offerings.map((offering, index) => {
    const image = resolveOfferingCarouselImage(pillar.id, index);
    return {
      href: `/services/${offering.slug}`,
      title: offering.title,
      description: offering.summary,
      image,
    };
  });
}

export function getOtherServicePillars(
  excludePillarId: ServiceColumn["id"],
): ServiceCarouselSlide[] {
  return SERVICE_COLUMNS.filter((column) => column.id !== excludePillarId).map(
    (column) => ({
      href: column.href,
      title: column.title,
      description: column.blurb,
      image: {
        src: column.image.src,
        alt: column.title,
      },
    }),
  );
}
