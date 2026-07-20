import type { OfferingDetailContent } from "./types";

/**
 * Enriched detail content for the three Our Structures jurisdiction pages.
 * Sourced from Our Services brief + Extra Info (QIF, journey, footprint).
 */
export const STRUCTURES_OFFERING_DETAILS: Record<string, OfferingDetailContent> =
  {
    "difc-structures": {
      slug: "difc-structures",
      index: "01",
      title: "DIFC structures",
      lede: "Qualified Investor Funds and Protected Cell Companies under a DFSA-aligned Middle East domicile.",
      statement: "Middle East domicile. Institutional launch path.",
      narrative: [
        "DIFC gives professional investors a regulated Gulf domicile with clear supervisory expectations and a proven route to market through established hosting. Sponsors choose DIFC when investor profile, distribution path, and regional credibility point to Dubai.",
        "We stand up Qualified Investor Funds and Protected Cell Companies with the governance, documentation, and ongoing administration each vehicle demands — coordinated with our wider platform across Mauritius and Luxembourg when the mandate spans regions.",
      ],
      capabilities: [
        {
          title: "Qualified Investor Fund (QIF)",
          detail:
            "Professional-investor funds with rapid launch through regulated hosting, DFSA-aligned governance, and institutional operating standards.",
        },
        {
          title: "DIFC Protected Cell Company",
          detail:
            "Ring-fenced investment cells under shared governance — suited to segregated mandates, country sleeves, and multi-strategy platforms.",
        },
        {
          title: "Regulated hosting coordination",
          detail:
            "Operate through established DIFC infrastructure rather than greenfield licensing when the strategy and investor base allow.",
        },
        {
          title: "Institutional governance",
          detail:
            "Board support, compliance monitoring, and fiduciary frameworks designed to hold up under LP and regulator review.",
        },
        {
          title: "Banking & service-provider setup",
          detail:
            "Coordinate banking, custody, administration, audit, and legal counterparts into one operating map.",
        },
        {
          title: "Cross-border stacking",
          detail:
            "Link DIFC vehicles to Mauritius and Luxembourg layers when investor access or asset location requires it.",
        },
      ],
      journey: [
        {
          title: "Mandate & investor profile",
          detail:
            "Confirm strategy, professional-investor base, and whether QIF or cellular architecture fits.",
        },
        {
          title: "Vehicle design",
          detail:
            "Select QIF and/or PCC structure, governance model, and hosting path with your advisers.",
        },
        {
          title: "Regulatory & operational setup",
          detail:
            "Coordinate DFSA-aligned documentation, banking, custody, and service providers.",
        },
        {
          title: "Launch",
          detail:
            "Go live with onboarding, governance in place, and cells or compartments ready where required.",
        },
        {
          title: "Operate & expand",
          detail:
            "Add cells, strategies, or linked jurisdictions without rebuilding the Middle East stack.",
        },
      ],
      audiences: [
        "GCC and international sponsors",
        "Private equity and venture managers",
        "Family offices deploying into the region",
        "Managers seeking a DFSA-aligned domicile",
        "Platforms needing cellular segregation",
      ],
      outcomes: [
        "Faster DIFC launch via established hosting",
        "Professional-investor credibility from day one",
        "Ring-fenced cells when strategies must stay segregated",
        "One desk coordinating DIFC with Mauritius and Luxembourg",
      ],
      relatedSlugs: [
        "mauritius-protected-cell-company",
        "luxembourg-gp-lp",
      ],
      heroGlobeLocationId: "uae",
    },

    "mauritius-protected-cell-company": {
      slug: "mauritius-protected-cell-company",
      index: "02",
      title: "Mauritius Protected Cell Company",
      lede: "Ring-fenced cells, shared governance, and country-specific strategies from our operational headquarters.",
      statement: "Cellular flexibility. Operational substance.",
      narrative: [
        "Mauritius Protected Cell Companies support multi-strategy platforms and country-specific sleeves under shared governance — with assets and liabilities ring-fenced within individual cells. For sponsors building Africa–Asia–Europe connectivity, Mauritius remains a practical structuring centre.",
        "As our operational HQ, we know Mauritius from the inside: VCC and PCC work, treaty-aware cross-border design, and day-to-day administration that keeps cells current after launch — not just formation paperwork.",
      ],
      capabilities: [
        {
          title: "Protected cell architecture",
          detail:
            "Ring-fenced investment cells under a common governance shell — isolation without rebuilding a new company per sleeve.",
        },
        {
          title: "Multi-strategy platforms",
          detail:
            "Segregate strategies, geographies, or investor cohorts while sharing institutional oversight.",
        },
        {
          title: "Country-specific sleeves",
          detail:
            "Stand up regional or country cells that stay legally distinct for risk and reporting clarity.",
        },
        {
          title: "Operational HQ coordination",
          detail:
            "Formation, board support, regulatory liaison, and ongoing administration from our Mauritius base.",
        },
        {
          title: "Cross-border linkage",
          detail:
            "Connect Mauritius cells to DIFC and Luxembourg layers when distribution or capital formation requires it.",
        },
        {
          title: "Service-provider management",
          detail:
            "Administrators, auditors, custodians, and banking partners coordinated as one operating map.",
        },
      ],
      journey: [
        {
          title: "Strategy mapping",
          detail:
            "Define which mandates need cellular segregation versus a single vehicle.",
        },
        {
          title: "PCC design",
          detail:
            "Design the core company, cell plan, governance, and documentation with your advisers.",
        },
        {
          title: "Establishment",
          detail:
            "Incorporate, open cells, and complete banking, custody, and operational readiness.",
        },
        {
          title: "Launch cells",
          detail:
            "Activate initial cells with onboarding, reporting lines, and service providers aligned.",
        },
        {
          title: "Scale the platform",
          detail:
            "Add cells and linked jurisdictions as strategies and investor demand evolve.",
        },
      ],
      audiences: [
        "Multi-strategy fund sponsors",
        "Africa and Indian Ocean focused managers",
        "Family offices needing segregated sleeves",
        "Platforms bridging Asia, Africa, and Europe",
        "Sponsors wanting Mauritius operational substance",
      ],
      outcomes: [
        "True ring-fencing within a shared governance shell",
        "Faster multi-sleeve launch than separate companies",
        "Administration run from our Mauritius HQ",
        "Cleaner risk narratives for LPs and counterparties",
      ],
      relatedSlugs: ["difc-structures", "luxembourg-gp-lp"],
      heroGlobeLocationId: "mauritius",
    },

    "luxembourg-gp-lp": {
      slug: "luxembourg-gp-lp",
      index: "03",
      title: "Luxembourg GP–LP",
      lede: "The institutional reference architecture for private equity, venture capital, and European fundraising.",
      statement: "European standard. Institutional familiarity.",
      narrative: [
        "Luxembourg GP–LP structures remain the architecture institutional LPs expect for private equity, venture capital, and European capital formation. Limited Partners → General Partner → Investment Fund → Portfolio Companies — a cascade counterparties already understand.",
        "We help sponsors stand up and operate GP–LP vehicles with governance, documentation, and ongoing coordination suited to European fundraising — linked to DIFC and Mauritius when the wider platform needs Middle East or Africa connectivity.",
      ],
      capabilities: [
        {
          title: "GP–LP architecture",
          detail:
            "Classic limited partnership design for PE, VC, and institutional private-market strategies.",
        },
        {
          title: "European fundraising readiness",
          detail:
            "Documentation and governance calibrated to LP due diligence and European allocator expectations.",
        },
        {
          title: "General Partner support",
          detail:
            "Governance, substance, and administrative support around the GP layer where required.",
        },
        {
          title: "Fund & portfolio coordination",
          detail:
            "Align fund vehicles with SPVs and portfolio company holding structures across the deal lifecycle.",
        },
        {
          title: "Service-provider stack",
          detail:
            "Coordinate administrators, auditors, depositaries, legal, and tax advisers into one operating plan.",
        },
        {
          title: "Cross-border platform fit",
          detail:
            "Connect Luxembourg GP–LP vehicles to DIFC and Mauritius structures when mandates span regions.",
        },
      ],
      journey: [
        {
          title: "Fund thesis & LP profile",
          detail:
            "Confirm strategy, target LPs, and whether Luxembourg GP–LP is the right reference domicile.",
        },
        {
          title: "Structure & documentation",
          detail:
            "Design GP, LP, and fund documentation with counsel and tax advisers.",
        },
        {
          title: "Establishment",
          detail:
            "Form entities, appoint service providers, and complete operational readiness.",
        },
        {
          title: "First close readiness",
          detail:
            "Investor onboarding, governance cadence, and reporting lines ready for institutional capital.",
        },
        {
          title: "Deploy & scale",
          detail:
            "Support subsequent closes, SPVs, and cross-border layers as the platform grows.",
        },
      ],
      audiences: [
        "Private equity sponsors",
        "Venture capital managers",
        "European institutional fundraisers",
        "Fund of funds and co-invest platforms",
        "Sponsors needing LP-familiar architecture",
      ],
      outcomes: [
        "Architecture LPs and counterparties already recognise",
        "Clearer European fundraising narrative",
        "Governance built for institutional review",
        "Coordinated link to Middle East and Mauritius layers",
      ],
      relatedSlugs: [
        "difc-structures",
        "mauritius-protected-cell-company",
      ],
      heroGlobeLocationId: "luxembourg",
    },
  };

export function getStructuresOfferingDetail(
  slug: string,
): OfferingDetailContent | undefined {
  return STRUCTURES_OFFERING_DETAILS[slug];
}

export function isStructuresOffering(slug: string): boolean {
  return slug in STRUCTURES_OFFERING_DETAILS;
}
