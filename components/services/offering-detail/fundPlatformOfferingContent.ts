import type { OfferingDetailContent } from "./types";

/**
 * Enriched detail content for the 16 Global Regulated Fund Platform offerings.
 * Sourced from Our Services + Extra Info platform chapters; written for the
 * shared ServiceOfferingDetail template.
 */
export const FUND_PLATFORM_OFFERING_DETAILS: Record<
  string,
  OfferingDetailContent
> = {
  "fund-as-a-service": {
    slug: "fund-as-a-service",
    index: "01",
    title: "Fund-as-a-Service",
    lede: "Launch and operate through our regulated platform — without building the stack from scratch.",
    statement: "You manage the investments. We manage the infrastructure.",
    narrative: [
      "Launching a fund the traditional way means licensing, capital, senior hires, policies, banking, custody, administration, and ongoing supervision — before a single investment is made. For many sponsors, that stack is the barrier, not the strategy.",
      "Fund-as-a-Service gives you our institutional operating environment: governance, compliance, operational management, and regulatory oversight — while you keep strategy, brand, and investor relationships. One coordinated platform instead of a dozen vendors.",
    ],
    capabilities: [
      {
        title: "Regulated infrastructure",
        detail:
          "Operate through an established platform designed for institutional investment activity, subject to applicable regulatory requirements.",
      },
      {
        title: "Management company layer",
        detail:
          "Institutional governance and oversight across the lifecycle — board support, compliance monitoring, and supervisory discipline.",
      },
      {
        title: "Fund structuring",
        detail:
          "Open- or closed-ended vehicles, PE/VC, real estate, private credit, fund of funds, co-invest, umbrella, and cell structures — designed to the mandate.",
      },
      {
        title: "Investor onboarding",
        detail:
          "Classification, AML/KYC, subscription processing, and capital commitment administration with institutional rigour.",
      },
      {
        title: "Service-provider coordination",
        detail:
          "Administrators, custodians, auditors, legal, tax, and banking partners coordinated from one desk.",
      },
      {
        title: "Ongoing operations",
        detail:
          "Governance meetings, regulatory reporting, compliance monitoring, fund amendments, and expansion support after launch.",
      },
    ],
    journey: [
      {
        title: "Strategy & consultation",
        detail:
          "Clarify objectives, investor base, asset class, and preferred jurisdictions before recommending a path.",
      },
      {
        title: "Structure & documentation",
        detail:
          "Design the vehicle, governance model, and operating map with your advisers.",
      },
      {
        title: "Regulatory & banking readiness",
        detail:
          "Coordinate the regulatory path, banking, custody, and operational setup.",
      },
      {
        title: "Launch & onboarding",
        detail:
          "Go live with investor onboarding, governance in place, and service providers aligned.",
      },
      {
        title: "Operate & scale",
        detail:
          "Grow with additional funds, jurisdictions, and products on the same platform.",
      },
    ],
    audiences: [
      "Emerging asset managers",
      "Private equity firms",
      "Venture capital managers",
      "Family offices",
      "International asset managers",
      "FinTech investment platforms",
    ],
    outcomes: [
      "Faster route to market than greenfield licensing",
      "Lower fixed establishment cost",
      "Institutional credibility from day one",
      "Capital freed for research, deals, and investor relations",
    ],
    relatedSlugs: [
      "regulated-fund-hosting",
      "management-company",
      "white-label-fund-solutions",
    ],
  },

  "regulated-fund-hosting": {
    slug: "regulated-fund-hosting",
    index: "02",
    title: "Regulated fund hosting",
    lede: "Operate under our licensed framework for a faster, cleaner route to market.",
    statement: "Hosted regulation. Your strategy. Institutional oversight.",
    narrative: [
      "Fund hosting lets eligible managers launch and operate investment funds using an existing regulated platform rather than establishing a standalone management company. You own the investment strategy and commercial outcome.",
      "We provide the regulatory framework, independent governance, and operational infrastructure — reducing capital burden, licensing complexity, and time to first close while keeping oversight at institutional standard.",
    ],
    capabilities: [
      {
        title: "Regulatory hosting model",
        detail:
          "Access an established licensed environment where your product can sit with professional governance.",
      },
      {
        title: "Independent oversight",
        detail:
          "Segregation of duties and supervisory controls that institutional investors expect to see.",
      },
      {
        title: "Operational readiness",
        detail:
          "Banking, administration, and service-provider coordination folded into the hosting path.",
      },
      {
        title: "Scalable product path",
        detail:
          "Add share classes, sub-funds, or sibling vehicles without rebuilding infrastructure.",
      },
    ],
    journey: [
      {
        title: "Eligibility & fit",
        detail:
          "Assess strategy, sponsor profile, and jurisdiction fit for a hosting model.",
      },
      {
        title: "Governance design",
        detail:
          "Map oversight, delegation, and reporting into the hosting framework.",
      },
      {
        title: "Setup & appointments",
        detail:
          "Coordinate documentation, service providers, and operational accounts.",
      },
      {
        title: "Live operations",
        detail:
          "Run under hosted regulation with ongoing compliance and governance cadence.",
      },
    ],
    audiences: [
      "First-time fund sponsors",
      "Boutique managers",
      "PE / VC teams expanding abroad",
      "Family office platforms",
    ],
    outcomes: [
      "Reduced licensing and capital burden",
      "Independent governance without building a ManCo",
      "Faster establishment than standalone regulation",
      "Clear accountability for investors and regulators",
    ],
    relatedSlugs: [
      "fund-as-a-service",
      "regulatory-umbrella-platform",
      "management-company",
    ],
  },

  "regulatory-umbrella-platform": {
    slug: "regulatory-umbrella-platform",
    index: "03",
    title: "Regulatory umbrella platform",
    lede: "One coordinated model across DIFC, Mauritius, and Luxembourg.",
    statement: "Multiple jurisdictions. One operating rhythm.",
    narrative: [
      "Cross-border strategies fail when each domicile becomes a separate project with different governance habits. Our regulatory umbrella connects DIFC, Mauritius, and Luxembourg under consistent standards and centralised project management.",
      "You get the flexibility to launch compliant products where investors and assets require them — without losing a single point of operational truth.",
    ],
    capabilities: [
      {
        title: "Multi-jurisdiction coordination",
        detail:
          "Aligned processes across Middle East, African, and European domiciles.",
      },
      {
        title: "Consistent governance standards",
        detail:
          "Shared expectations for oversight, reporting, and service-provider quality.",
      },
      {
        title: "Central project management",
        detail:
          "One desk driving documentation, timelines, and counterparties across centres.",
      },
      {
        title: "Product expansion path",
        detail:
          "Add vehicles and markets as the platform matures — without restarting from zero.",
      },
    ],
    journey: [
      {
        title: "Map the mandate",
        detail:
          "Investor base, asset geography, and distribution path determine domicile mix.",
      },
      {
        title: "Select the stack",
        detail:
          "Choose hosting, ManCo, and vehicle combinations per jurisdiction.",
      },
      {
        title: "Synchronise launch",
        detail:
          "Coordinate filings, banking, and ops so entities go live as one platform.",
      },
      {
        title: "Govern as a network",
        detail:
          "Ongoing reporting and oversight with shared cadence across centres.",
      },
    ],
    audiences: [
      "Cross-border managers",
      "Multi-strategy platforms",
      "Institutional sponsors",
      "Family offices with regional sleeves",
    ],
    outcomes: [
      "Coherent governance across domiciles",
      "Faster multi-market product launch",
      "Reduced fragmentation of vendors and processes",
      "Room to expand without rebuilding the model",
    ],
    relatedSlugs: [
      "regulated-fund-hosting",
      "cross-border-distribution",
      "fund-as-a-service",
    ],
  },

  "white-label-fund-solutions": {
    slug: "white-label-fund-solutions",
    index: "04",
    title: "White-label fund solutions",
    lede: "Your brand in front of investors. Our regulated operating layer behind it.",
    statement: "Market under your name. Run on institutional rails.",
    narrative: [
      "White-label solutions let sponsors present a fully branded investment product while ThinqAsset manages the regulatory, operational, and administrative framework out of view.",
      "Investors experience your brand and strategy. Counterparties and regulators see a platform built to institutional standard — without you carrying the full infrastructure cost.",
    ],
    capabilities: [
      {
        title: "Branded investor experience",
        detail:
          "Presentation, onboarding touchpoints, and communications aligned to your identity.",
      },
      {
        title: "Regulated back-end",
        detail:
          "Hosting, governance, compliance, and administration delivered through our platform.",
      },
      {
        title: "Operational anonymity where needed",
        detail:
          "Infrastructure partners stay in the background while you own commercial relationships.",
      },
      {
        title: "Scale without rebranding debt",
        detail:
          "Add products and jurisdictions while keeping a consistent front-of-house brand.",
      },
    ],
    journey: [
      {
        title: "Brand & product brief",
        detail:
          "Define how the offering should feel to investors and what must stay white-label.",
      },
      {
        title: "Operating map",
        detail:
          "Assign regulatory, admin, and governance responsibilities behind the brand.",
      },
      {
        title: "Launch packaging",
        detail:
          "Align documentation, onboarding, and reporting with your market-facing identity.",
      },
      {
        title: "Live brand operations",
        detail:
          "Run day-to-day with your team on strategy and ours on the regulated stack.",
      },
    ],
    audiences: [
      "Brand-led asset managers",
      "Distribution platforms",
      "Family offices launching labelled vehicles",
      "FinTech product teams",
    ],
    outcomes: [
      "Full brand ownership with institutional back-end",
      "Faster product launch than building in-house",
      "Clean separation of commercial and regulated roles",
      "Room to extend the labelled range over time",
    ],
    relatedSlugs: [
      "fund-as-a-service",
      "regulated-fund-hosting",
      "investor-onboarding",
    ],
  },

  "management-company": {
    slug: "management-company",
    index: "05",
    title: "Management company (ManCo)",
    lede: "Independent governance, regulatory accountability, and trusted execution across the lifecycle.",
    statement: "Governance that protects investors — and frees sponsors to invest.",
    narrative: [
      "Institutional investors evaluate governance, oversight, and operational resilience before they evaluate the pitch deck. A professional ManCo is the framework that makes those questions answerable.",
      "Our Management Company provides supervision, regulatory interaction, risk oversight, and service-provider coordination — so investment decisions stay with the manager while the fund operates to institutional standard.",
    ],
    capabilities: [
      {
        title: "Corporate governance",
        detail:
          "Board administration, policies, decision processes, and oversight of delegated functions.",
      },
      {
        title: "Regulatory oversight",
        detail:
          "Liaison, compliance monitoring, reporting, and internal control reviews.",
      },
      {
        title: "Risk management",
        detail:
          "Identification, monitoring, escalation, and reporting within the agreed framework.",
      },
      {
        title: "Investment oversight",
        detail:
          "Independent checks that activity stays aligned to objectives, documents, and disclosures.",
      },
      {
        title: "Service-provider management",
        detail:
          "Central coordination of administrators, custodians, auditors, counsel, and banks.",
      },
      {
        title: "Lifecycle governance",
        detail:
          "From pre-launch design through growth, amendments, and orderly wind-up.",
      },
    ],
    journey: [
      {
        title: "Governance design",
        detail:
          "Tailor oversight to strategy, investor profile, and regulatory framework.",
      },
      {
        title: "Pre-launch readiness",
        detail:
          "Documentation review, appointments, and operational controls before capital.",
      },
      {
        title: "Live ManCo cadence",
        detail:
          "Board meetings, compliance monitoring, risk reviews, and reporting rhythm.",
      },
      {
        title: "Scale & evolve",
        detail:
          "New classes, sub-funds, and jurisdictions with governance that keeps pace.",
      },
    ],
    audiences: [
      "Asset managers",
      "Private equity sponsors",
      "Venture capital firms",
      "Real estate & infrastructure managers",
      "Private credit managers",
      "Emerging managers",
    ],
    outcomes: [
      "Independent governance investors can diligence",
      "Clear segregation of duties",
      "Coordinated service-provider ecosystem",
      "Scalable oversight as the platform grows",
    ],
    relatedSlugs: [
      "fund-governance",
      "compliance-risk-management",
      "fund-as-a-service",
    ],
  },

  "portfolio-management": {
    slug: "portfolio-management",
    index: "06",
    title: "Portfolio management",
    lede: "Disciplined execution and risk oversight inside a regulated operating environment.",
    statement: "Mandate alignment. Measured risk. Professional execution.",
    narrative: [
      "Portfolio management on our platform sits inside the same governance and compliance environment as the rest of the fund — not as a bolted-on trading desk.",
      "We focus on disciplined execution, risk oversight, and alignment with defined investment objectives so performance work happens within clear boundaries.",
    ],
    capabilities: [
      {
        title: "Mandate-aligned execution",
        detail:
          "Portfolio activity framed by investment objectives and governing documents.",
      },
      {
        title: "Risk oversight",
        detail:
          "Monitoring and escalation pathways connected to the wider ManCo framework.",
      },
      {
        title: "Reporting discipline",
        detail:
          "Clear performance and risk reporting for sponsors, boards, and investors.",
      },
      {
        title: "Regulated context",
        detail:
          "Portfolio work delivered within the platform’s compliance and operational controls.",
      },
    ],
    journey: [
      {
        title: "Define the mandate",
        detail:
          "Objectives, constraints, liquidity, and risk appetite agreed up front.",
      },
      {
        title: "Operating protocols",
        detail:
          "Execution, escalation, and reporting pathways embedded in governance.",
      },
      {
        title: "Live management",
        detail:
          "Ongoing portfolio activity with oversight and documented decisions.",
      },
      {
        title: "Review & refine",
        detail:
          "Periodic reviews against mandate, risk, and investor expectations.",
      },
    ],
    audiences: [
      "Sponsors needing regulated PM support",
      "Multi-asset platforms",
      "Family office investment sleeves",
      "Managers scaling beyond founder-led trading",
    ],
    outcomes: [
      "Execution tied to a written mandate",
      "Risk visibility for boards and investors",
      "Cleaner segregation from pure advisory roles",
      "Portfolio work that survives institutional review",
    ],
    relatedSlugs: [
      "management-company",
      "fund-governance",
      "compliance-risk-management",
    ],
  },

  "fund-governance": {
    slug: "fund-governance",
    index: "07",
    title: "Fund governance",
    lede: "Frameworks that strengthen oversight, transparency, and fiduciary standards.",
    statement: "Clear accountabilities. Durable oversight. Transparent reporting.",
    narrative: [
      "Strong governance is what turns a strategy into an institution. Investors and regulators look for decision rights, escalation paths, and reporting they can trust.",
      "We design and operate governance frameworks that meet institutional expectations — without burying the investment team in process theatre.",
    ],
    capabilities: [
      {
        title: "Governance architecture",
        detail:
          "Boards, committees, delegation maps, and decision protocols matched to the vehicle.",
      },
      {
        title: "Fiduciary standards",
        detail:
          "Oversight practices that protect investors and document how decisions were made.",
      },
      {
        title: "Transparent reporting",
        detail:
          "Board packs, investor updates, and exception reporting with a reliable cadence.",
      },
      {
        title: "Lifecycle coverage",
        detail:
          "Governance that holds from launch through amendments, growth, and exit.",
      },
    ],
    journey: [
      {
        title: "Diagnose the gaps",
        detail:
          "Review existing controls against investor and regulatory expectations.",
      },
      {
        title: "Design the framework",
        detail:
          "Set accountabilities, meeting cadence, and escalation paths.",
      },
      {
        title: "Embed & train",
        detail:
          "Roll out policies, board routines, and documentation habits.",
      },
      {
        title: "Govern continuously",
        detail:
          "Run the calendar: meetings, reviews, and transparent reporting.",
      },
    ],
    audiences: [
      "Fund boards",
      "Emerging managers professionalising",
      "PE / VC sponsors raising institutional capital",
      "Family offices building governed vehicles",
    ],
    outcomes: [
      "Governance that survives LP diligence",
      "Fewer surprises in regulatory and audit reviews",
      "Decision trails investors can follow",
      "A framework that scales with new products",
    ],
    relatedSlugs: [
      "management-company",
      "compliance-risk-management",
      "fund-as-a-service",
    ],
  },

  "compliance-risk-management": {
    slug: "compliance-risk-management",
    index: "08",
    title: "Compliance & risk management",
    lede: "Integrated compliance and risk services that keep pace with evolving regulation.",
    statement: "Compliance embedded in operations — not bolted on at year-end.",
    narrative: [
      "Funds that treat compliance as a periodic project create gaps regulators and counterparties notice. We embed monitoring, controls, and risk oversight into day-to-day operations.",
      "The goal is simple: stay aligned with obligations, protect investors, and keep the investment team focused on the mandate.",
    ],
    capabilities: [
      {
        title: "Compliance frameworks",
        detail:
          "Policies, monitoring programmes, and internal reviews calibrated to the vehicle.",
      },
      {
        title: "Risk monitoring",
        detail:
          "Operational and investment risk visibility with clear escalation paths.",
      },
      {
        title: "Regulatory reporting",
        detail:
          "Ongoing filings and evidence packs prepared as part of the operating rhythm.",
      },
      {
        title: "Control reviews",
        detail:
          "Periodic testing of controls so gaps surface before they become findings.",
      },
    ],
    journey: [
      {
        title: "Risk & obligation map",
        detail:
          "Identify regulatory, operational, and investment risk surfaces for the fund.",
      },
      {
        title: "Control design",
        detail:
          "Put monitoring, ownership, and reporting into the operating model.",
      },
      {
        title: "Live monitoring",
        detail:
          "Run ongoing compliance and risk reviews with documented outcomes.",
      },
      {
        title: "Adapt as rules change",
        detail:
          "Update frameworks when regulation, products, or jurisdictions evolve.",
      },
    ],
    audiences: [
      "Managers under active regulatory supervision",
      "Multi-jurisdiction platforms",
      "Sponsors preparing for institutional LPs",
      "Boards needing independent risk visibility",
    ],
    outcomes: [
      "Fewer last-minute compliance scrambles",
      "Risk visibility for ManCo and boards",
      "Evidence-ready reporting trails",
      "Controls that travel with new products",
    ],
    relatedSlugs: [
      "aml-kyc-mlro",
      "fund-governance",
      "management-company",
    ],
  },

  "aml-kyc-mlro": {
    slug: "aml-kyc-mlro",
    index: "09",
    title: "AML / KYC & MLRO",
    lede: "Financial-crime controls and MLRO support across the investor lifecycle.",
    statement: "Rigorous enough for institutions. Workable for legitimate investors.",
    narrative: [
      "AML, KYC, and MLRO obligations sit at the centre of regulated fund operations. Done poorly, they block good investors or miss real risk. Done well, they protect the platform without becoming theatre.",
      "We provide comprehensive AML/KYC processes and Money Laundering Reporting Officer support so onboarding and ongoing monitoring stay credible under institutional diligence.",
    ],
    capabilities: [
      {
        title: "Investor due diligence",
        detail:
          "Structured KYC collection, verification, and classification for professional investors.",
      },
      {
        title: "AML programme",
        detail:
          "Policies, screening, and ongoing monitoring aligned to jurisdictional expectations.",
      },
      {
        title: "MLRO support",
        detail:
          "Reporting officer coverage, escalation pathways, and documented decisions.",
      },
      {
        title: "Lifecycle monitoring",
        detail:
          "Refresh cycles and trigger-based reviews as investors and risk profiles change.",
      },
    ],
    journey: [
      {
        title: "Programme design",
        detail:
          "Set AML/KYC standards appropriate to investor types and jurisdictions.",
      },
      {
        title: "Onboarding workflow",
        detail:
          "Build a clear path from first contact through admission decisions.",
      },
      {
        title: "Live MLRO cadence",
        detail:
          "Operate screening, escalations, and reporting with an audit trail.",
      },
      {
        title: "Ongoing refresh",
        detail:
          "Periodic reviews and event-driven updates across the investor book.",
      },
    ],
    audiences: [
      "Fund sponsors onboarding professional investors",
      "Platforms expanding into new markets",
      "ManCo teams needing MLRO coverage",
      "Family offices admitting external capital",
    ],
    outcomes: [
      "Institutional-grade financial-crime controls",
      "Clearer investor journeys with fewer dead ends",
      "Documented MLRO decisions for regulators",
      "Monitoring that continues after first close",
    ],
    relatedSlugs: [
      "investor-onboarding",
      "compliance-risk-management",
      "fund-governance",
    ],
  },

  "investor-onboarding": {
    slug: "investor-onboarding",
    index: "10",
    title: "Investor onboarding",
    lede: "Institutional due diligence with an onboarding experience investors can finish.",
    statement: "From first contact to admission — without unnecessary friction.",
    narrative: [
      "Investor onboarding is where governance meets experience. If the process is opaque, good capital walks. If it is loose, the platform inherits risk.",
      "We combine rigorous due diligence with a clear path through classification, documentation, subscription, and records — so sponsors look professional from the first interaction.",
    ],
    capabilities: [
      {
        title: "Investor classification",
        detail:
          "Professional / qualified investor pathways aligned to the domicile.",
      },
      {
        title: "Documentation & subscriptions",
        detail:
          "KYC packs, subscription processing, and capital commitment administration.",
      },
      {
        title: "Investor records",
        detail:
          "Clean registers and evidence trails ready for administrators and auditors.",
      },
      {
        title: "Experience design",
        detail:
          "Clear status, fewer loops, and guidance that reduces back-and-forth.",
      },
    ],
    journey: [
      {
        title: "Define the pathway",
        detail:
          "Map investor types, required evidence, and decision owners.",
      },
      {
        title: "Prepare the pack",
        detail:
          "Align questionnaires, disclosures, and subscription materials.",
      },
      {
        title: "Run admissions",
        detail:
          "Process applications with AML/KYC checks and documented outcomes.",
      },
      {
        title: "Maintain the book",
        detail:
          "Keep records current for reporting, transfers, and subsequent closes.",
      },
    ],
    audiences: [
      "Sponsors raising institutional capital",
      "Funds with multi-close calendars",
      "White-label product teams",
      "Family offices admitting co-investors",
    ],
    outcomes: [
      "Higher completion rates on legitimate applications",
      "Diligence that holds up under LP and regulator review",
      "Less admin burden on the sponsor team",
      "Cleaner handoff into ongoing investor servicing",
    ],
    relatedSlugs: [
      "aml-kyc-mlro",
      "cross-border-distribution",
      "white-label-fund-solutions",
    ],
  },

  "cross-border-distribution": {
    slug: "cross-border-distribution",
    index: "11",
    title: "Cross-border distribution",
    lede: "Compliant routes to expand investor reach across key international markets.",
    statement: "Reach beyond one domicile — with the regulatory reality in view.",
    narrative: [
      "Distribution is not a marketing campaign with a passport stamp. Each market has rules, investor categories, and operational constraints that must match the fund’s domicile and profile.",
      "We help sponsors expand reach through coordinated, compliant distribution pathways — aligned to the regulatory and operational realities of each market.",
    ],
    capabilities: [
      {
        title: "Market pathway design",
        detail:
          "Map where the product can be offered and under what investor categories.",
      },
      {
        title: "Regulatory alignment",
        detail:
          "Coordinate distribution plans with domicile rules and local requirements.",
      },
      {
        title: "Operational readiness",
        detail:
          "Onboarding, banking, and reporting prepared for multi-market investors.",
      },
      {
        title: "Partner coordination",
        detail:
          "Work with placement agents, counsel, and platforms where the strategy requires it.",
      },
    ],
    journey: [
      {
        title: "Target market map",
        detail:
          "Prioritise geographies by investor demand and regulatory feasibility.",
      },
      {
        title: "Pathway confirmation",
        detail:
          "Confirm offering routes, disclosures, and operational constraints.",
      },
      {
        title: "Enable distribution",
        detail:
          "Align materials, onboarding, and service providers for inbound capital.",
      },
      {
        title: "Monitor & expand",
        detail:
          "Add markets as the platform and investor base mature.",
      },
    ],
    audiences: [
      "Managers seeking GCC / Europe / Africa capital",
      "Funds launching from DIFC, Mauritius, or Luxembourg",
      "Sponsors with multi-region LP pipelines",
      "Platforms building regional sleeves",
    ],
    outcomes: [
      "Distribution plans that survive counsel review",
      "Investor reach without improvising compliance",
      "Clearer sequencing of market entry",
      "Onboarding ready for international LPs",
    ],
    relatedSlugs: [
      "regulatory-umbrella-platform",
      "investor-onboarding",
      "fund-as-a-service",
    ],
  },

  "capital-markets-infrastructure": {
    slug: "capital-markets-infrastructure",
    index: "12",
    title: "Capital markets infrastructure",
    lede: "Institutional infrastructure for operations, execution, reporting, and market connectivity.",
    statement: "The rails behind capital formation and complex deals.",
    narrative: [
      "Capital markets work needs more than a term sheet. Sponsors need banking connectivity, operational controls, reporting discipline, and counterparties who recognise institutional process.",
      "Our capital markets infrastructure supports fund operations, execution support, reporting, and the connectivity required for acquisitions, financing, and multi-party transactions.",
    ],
    capabilities: [
      {
        title: "Operational connectivity",
        detail:
          "Banking, settlement support, and operational accounts coordinated for live deals.",
      },
      {
        title: "Execution support",
        detail:
          "Infrastructure that helps transactions move from agreement to close cleanly.",
      },
      {
        title: "Reporting & controls",
        detail:
          "Visibility for boards, sponsors, and counterparties throughout the process.",
      },
      {
        title: "Deal scaffolding",
        detail:
          "Works alongside SPVs, custody, escrow, and structured finance when the transaction needs them.",
      },
    ],
    journey: [
      {
        title: "Transaction brief",
        detail:
          "Clarify capital path, counterparties, and operational requirements.",
      },
      {
        title: "Infrastructure map",
        detail:
          "Assign banking, custody, SPV, and reporting roles for the deal.",
      },
      {
        title: "Execute & settle",
        detail:
          "Coordinate the operating steps through close with documented controls.",
      },
      {
        title: "Post-close operations",
        detail:
          "Reporting, ongoing accounts, and readiness for the next transaction.",
      },
    ],
    audiences: [
      "Sponsors running frequent transactions",
      "PE / VC platforms with complex closes",
      "Family offices deploying into private deals",
      "Managers needing institutional banking access",
    ],
    outcomes: [
      "Fewer operational surprises at close",
      "Clearer connectivity between fund and markets",
      "Reporting counterparties can trust",
      "Reusable infrastructure for subsequent deals",
    ],
    relatedSlugs: ["custody-escrow", "spvs", "structured-finance"],
  },

  "custody-escrow": {
    slug: "custody-escrow",
    index: "13",
    title: "Custody & escrow",
    lede: "Secure arrangements that protect assets and give counterparties confidence.",
    statement: "Assets protected. Transactions facilitated. Confidence documented.",
    narrative: [
      "Custody and escrow are where trust becomes operational. Investors and counterparties need to know assets are held and released under clear, enforceable conditions.",
      "We design and coordinate custody and escrow arrangements that protect assets, facilitate transactions, and stand up to institutional scrutiny.",
    ],
    capabilities: [
      {
        title: "Custody coordination",
        detail:
          "Arrangements with recognised custodians aligned to the fund’s asset profile.",
      },
      {
        title: "Escrow structures",
        detail:
          "Conditioned holding and release mechanics for acquisitions and multi-party deals.",
      },
      {
        title: "Counterparty confidence",
        detail:
          "Clear documentation of who holds what, when, and under which triggers.",
      },
      {
        title: "Operational integration",
        detail:
          "Tied into banking, administration, and governance rather than left as a side letter.",
      },
    ],
    journey: [
      {
        title: "Asset & deal map",
        detail:
          "Identify what must be custodied or escrowed and why.",
      },
      {
        title: "Provider & terms",
        detail:
          "Select arrangements and document release conditions.",
      },
      {
        title: "Go live",
        detail:
          "Open accounts, fund arrangements, and connect reporting.",
      },
      {
        title: "Operate & release",
        detail:
          "Manage ongoing custody and conditioned releases through the deal lifecycle.",
      },
    ],
    audiences: [
      "Funds holding institutional assets",
      "Acquisition and co-invest vehicles",
      "Structured transaction parties",
      "Sponsors needing investor comfort on asset protection",
    ],
    outcomes: [
      "Clear asset protection narrative for LPs",
      "Conditioned releases that reduce deal friction",
      "Custody integrated with fund operations",
      "Documentation counterparties accept",
    ],
    relatedSlugs: [
      "capital-markets-infrastructure",
      "spvs",
      "structured-finance",
    ],
  },

  spvs: {
    slug: "spvs",
    index: "14",
    title: "SPVs",
    lede: "Structuring and administration of special purpose vehicles for investments and transactions.",
    statement: "Ring-fence where it matters. Administer with discipline.",
    narrative: [
      "SPVs are the workhorses of private markets — holding assets, isolating risk, and enabling co-investments and financings. They only work when formation and ongoing administration stay sharp.",
      "We form and administer SPVs for investments, acquisitions, co-investments, financing, and bespoke transactions — with ring-fencing and compliance built into the operating plan.",
    ],
    capabilities: [
      {
        title: "Formation & structuring",
        detail:
          "Vehicle design matched to the transaction, investor set, and jurisdiction.",
      },
      {
        title: "Ring-fencing",
        detail:
          "Clear segregation of assets and liabilities where strategies require it.",
      },
      {
        title: "Ongoing administration",
        detail:
          "Secretarial, governance, and compliance kept current after close.",
      },
      {
        title: "Platform integration",
        detail:
          "SPVs that sit cleanly beside funds, custody, and corporate infrastructure.",
      },
    ],
    journey: [
      {
        title: "Transaction brief",
        detail:
          "Define purpose, parties, jurisdiction, and ring-fencing needs.",
      },
      {
        title: "Form the vehicle",
        detail:
          "Incorporate, document, and appoint the operating roles.",
      },
      {
        title: "Bank & operationalise",
        detail:
          "Accounts, custody links, and admin cadence before capital moves.",
      },
      {
        title: "Administer through lifecycle",
        detail:
          "Maintain compliance, reporting, and eventual exit or unwind.",
      },
    ],
    audiences: [
      "PE / VC deal teams",
      "Co-investment programmes",
      "Real estate and infrastructure sponsors",
      "Family offices structuring acquisitions",
    ],
    outcomes: [
      "Vehicles stood up to the deal timeline",
      "Ring-fencing that holds under scrutiny",
      "Administration that doesn’t drift after close",
      "Reusable SPV patterns across a deal pipeline",
    ],
    relatedSlugs: [
      "structured-finance",
      "custody-escrow",
      "capital-markets-infrastructure",
    ],
  },

  "structured-finance": {
    slug: "structured-finance",
    index: "15",
    title: "Structured finance",
    lede: "Tailored structures that optimise capital and support complex transactions.",
    statement: "Capital architecture for deals that don’t fit a standard form.",
    narrative: [
      "Complex transactions need capital structures that match cash flows, risk allocation, and counterparty requirements — not a generic fund wrapper forced into place.",
      "We help design and support structured finance solutions that improve financing efficiency and hold together across asset classes and jurisdictions.",
    ],
    capabilities: [
      {
        title: "Structure design",
        detail:
          "Capital stacks, waterfall logic, and vehicle design matched to the deal.",
      },
      {
        title: "Cross-border coordination",
        detail:
          "Jurisdictional pieces arranged so financing and investment legs work together.",
      },
      {
        title: "Operational support",
        detail:
          "SPVs, escrow, and administration that keep the structure alive after close.",
      },
      {
        title: "Governance overlay",
        detail:
          "Oversight and reporting appropriate to the sophistication of the financing.",
      },
    ],
    journey: [
      {
        title: "Deal economics",
        detail:
          "Map cash flows, risk allocation, and counterparty constraints.",
      },
      {
        title: "Structure proposal",
        detail:
          "Design vehicles and financing legs with counsel and tax advisers.",
      },
      {
        title: "Implementation",
        detail:
          "Stand up entities, accounts, and documentation for close.",
      },
      {
        title: "Ongoing servicing",
        detail:
          "Administer the structure through refinancing, amendments, or exit.",
      },
    ],
    audiences: [
      "Sponsors running leveraged or layered deals",
      "Private credit and specialty finance teams",
      "Acquisition platforms",
      "Family offices with complex financing needs",
    ],
    outcomes: [
      "Financing structures matched to real economics",
      "Clearer risk allocation among parties",
      "Operational readiness for multi-leg closes",
      "Governance that keeps complex stacks intelligible",
    ],
    relatedSlugs: [
      "spvs",
      "capital-markets-infrastructure",
      "custody-escrow",
    ],
  },

  "tokenisation-digital-assets": {
    slug: "tokenisation-digital-assets",
    index: "16",
    title: "Tokenisation & digital assets",
    lede: "Compliant frameworks for next-generation issuance, management, and administration.",
    statement: "Digital ownership models — inside institutional governance.",
    narrative: [
      "Tokenisation is only interesting if it survives legal, regulatory, and operational reality. We explore digital asset structures within an institutional governance framework — where regulation permits.",
      "The aim is not novelty for its own sake. It is bridging traditional finance and digital ownership models with the same oversight, AML discipline, and investor protection standards as conventional vehicles.",
    ],
    capabilities: [
      {
        title: "Regulatory-first design",
        detail:
          "Structures scoped to what applicable frameworks actually allow.",
      },
      {
        title: "Eligible asset exploration",
        detail:
          "Real estate interests, private market exposures, and other assets where tokenisation may add efficiency.",
      },
      {
        title: "Governance overlay",
        detail:
          "Issuance and administration tied to ManCo-grade oversight and investor protections.",
      },
      {
        title: "Operational bridging",
        detail:
          "Connecting digital ownership models to onboarding, custody concepts, and reporting.",
      },
    ],
    journey: [
      {
        title: "Feasibility",
        detail:
          "Test asset type, investor base, and jurisdiction against regulatory constraints.",
      },
      {
        title: "Structure design",
        detail:
          "Define the legal wrapper, governance, and digital issuance model with advisers.",
      },
      {
        title: "Controls & onboarding",
        detail:
          "Embed AML/KYC, disclosures, and operational controls before issuance.",
      },
      {
        title: "Administer & report",
        detail:
          "Run ongoing administration with institutional reporting habits.",
      },
    ],
    audiences: [
      "Sponsors exploring digital issuance",
      "Real-world asset platforms",
      "Managers bridging TradFi and digital channels",
      "Family offices testing new ownership models",
    ],
    outcomes: [
      "Digital structures that start from regulation, not hype",
      "Governance continuity with traditional funds",
      "Clearer investor protection narrative",
      "A path to experiment without abandoning institutional standards",
    ],
    relatedSlugs: [
      "fund-as-a-service",
      "fund-governance",
      "aml-kyc-mlro",
    ],
  },
};

export function getFundPlatformOfferingDetail(
  slug: string,
): OfferingDetailContent | undefined {
  return FUND_PLATFORM_OFFERING_DETAILS[slug];
}

export function isFundPlatformOffering(slug: string): boolean {
  return slug in FUND_PLATFORM_OFFERING_DETAILS;
}
