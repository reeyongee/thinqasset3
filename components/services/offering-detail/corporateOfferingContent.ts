import type { OfferingDetailContent } from "./types";

/**
 * Enriched detail content for Corporate & Institutional Services capabilities.
 * Sourced from Our Services brief + Extra Info chapters 12–14 (CSP, Private
 * Client, Trusts) and the shared client journey.
 */
export const CORPORATE_OFFERING_DETAILS: Record<string, OfferingDetailContent> =
  {
    "international-structuring": {
      slug: "international-structuring",
      index: "01",
      title: "International structuring",
      lede: "Cross-border corporate and investment structures aligned to commercial, regulatory, and tax objectives.",
      statement: "Structure follows the mandate — not the other way around.",
      narrative: [
        "International groups need holding, operating, and investment layers that survive regulator and counterparty scrutiny. Template organograms rarely survive first contact with tax, substance, and commercial reality.",
        "We design and implement efficient cross-border structures with your advisers — then stay involved as the group evolves, expands, or raises capital.",
      ],
      capabilities: [
        {
          title: "Group architecture",
          detail:
            "Holding, operating, and investment layers mapped to commercial goals and jurisdictional constraints.",
        },
        {
          title: "Jurisdiction selection",
          detail:
            "Screen domiciles against substance, treaty, regulatory, and investor expectations.",
        },
        {
          title: "Investment vehicle design",
          detail:
            "Align corporate stacks with fund and SPV layers when private capital sits alongside operating businesses.",
        },
        {
          title: "Adviser coordination",
          detail:
            "Work with tax and legal counsel so recommendations are implementable, not theoretical.",
        },
        {
          title: "Implementation oversight",
          detail:
            "Incorporate, document, and stand up governance as one coordinated programme.",
        },
        {
          title: "Ongoing evolution",
          detail:
            "Restructure as acquisitions, exits, and regional expansion change the map.",
        },
      ],
      journey: [
        {
          title: "Objectives & constraints",
          detail:
            "Clarify commercial goals, investor base, tax posture, and regulatory limits.",
        },
        {
          title: "Structure options",
          detail:
            "Compare jurisdictions and vehicle types with honest trade-offs.",
        },
        {
          title: "Design lock",
          detail:
            "Finalise organogram, governance, and documentation plan with advisers.",
        },
        {
          title: "Stand-up",
          detail:
            "Incorporate entities, appoint officers, and complete banking readiness.",
        },
        {
          title: "Operate & refine",
          detail:
            "Maintain and adjust the stack as the business scales.",
        },
      ],
      audiences: [
        "Expanding international groups",
        "Investment holding companies",
        "Family businesses going cross-border",
        "Sponsors combining corporate and fund layers",
      ],
      outcomes: [
        "Structures that match real commercial flows",
        "Clearer substance and governance narrative",
        "Fewer fragmented provider handoffs",
        "A stack ready to evolve with growth",
      ],
      relatedSlugs: ["incorporation", "corporate-spvs", "domiciliation"],
    },

    incorporation: {
      slug: "incorporation",
      index: "02",
      title: "Incorporation",
      lede: "End-to-end company establishment across leading international jurisdictions.",
      statement: "Formed properly. Ready to operate.",
      narrative: [
        "Incorporation is more than a filing. Banking, governance, and regulatory readiness decide whether the entity is useful on day one.",
        "We coordinate fast, end-to-end establishment across the centres our clients actually use — with the secretarial and operational steps built into the plan.",
      ],
      capabilities: [
        {
          title: "Jurisdiction filing",
          detail:
            "Company establishment across UAE, Singapore, Hong Kong, Mauritius, Luxembourg, BVI, Cayman, Guernsey, UK, and more.",
        },
        {
          title: "Constitutional documents",
          detail:
            "Memoranda, articles, and shareholder arrangements prepared for the intended use of the entity.",
        },
        {
          title: "Officer appointments",
          detail:
            "Directors, secretaries, and registered agents appointed with clear mandates.",
        },
        {
          title: "Banking readiness",
          detail:
            "Package formation documents and KYC so account opening is not an afterthought.",
        },
        {
          title: "Initial governance",
          detail:
            "Minute books, registers, and first-board cadence established at launch.",
        },
        {
          title: "Handover to operations",
          detail:
            "Secretarial, accounting, and compliance workflows activated after formation.",
        },
      ],
      journey: [
        {
          title: "Scope the entity",
          detail:
            "Confirm purpose, jurisdiction, ownership, and officer requirements.",
        },
        {
          title: "Prepare filings",
          detail:
            "Assemble constitutional documents and supporting KYC.",
        },
        {
          title: "Incorporate",
          detail:
            "File, obtain certificates, and complete statutory registers.",
        },
        {
          title: "Activate",
          detail:
            "Appoint officers, open banking pathways, and set governance cadence.",
        },
        {
          title: "Maintain",
          detail:
            "Hand into ongoing secretarial and compliance support.",
        },
      ],
      audiences: [
        "Founders establishing international entities",
        "Groups adding regional subsidiaries",
        "Investment SPV sponsors",
        "Family offices forming holding companies",
      ],
      outcomes: [
        "Faster coordinated formation",
        "Documents ready for banks and counterparties",
        "Governance started on day one",
        "Clean path into ongoing administration",
      ],
      relatedSlugs: [
        "international-structuring",
        "domiciliation",
        "corporate-secretarial",
      ],
    },

    "corporate-spvs": {
      slug: "corporate-spvs",
      index: "03",
      title: "SPVs",
      lede: "Formation and administration of SPVs for holding, acquisitions, financing, and structured deals.",
      statement: "Ring-fenced vehicles. Clear deal plumbing.",
      narrative: [
        "Special purpose vehicles isolate risk, clarify ownership, and keep deal economics auditable. Poorly administered SPVs become friction for lenders, LPs, and buyers.",
        "We form and administer SPVs for investment holding, acquisitions, financing, and structured transactions — with ring-fencing and ongoing compliance built in.",
      ],
      capabilities: [
        {
          title: "Deal-specific formation",
          detail:
            "SPVs designed for acquisitions, co-invests, financing, and holding structures.",
        },
        {
          title: "Ring-fencing discipline",
          detail:
            "Clear separation of assets, liabilities, and cash flows from the wider group.",
        },
        {
          title: "Ongoing administration",
          detail:
            "Secretarial, accounting, and compliance kept current through the deal lifecycle.",
        },
        {
          title: "Lender & investor packaging",
          detail:
            "Documentation and governance that stand up to financing and diligence review.",
        },
        {
          title: "Multi-jurisdiction SPVs",
          detail:
            "Coordinate vehicles across the centres the transaction actually requires.",
        },
        {
          title: "Exit readiness",
          detail:
            "Maintain books and registers so unwind or sale is orderly.",
        },
      ],
      journey: [
        {
          title: "Deal map",
          detail:
            "Confirm transaction purpose, counterparties, and jurisdiction needs.",
        },
        {
          title: "Vehicle design",
          detail:
            "Select SPV form, ownership, and governance with advisers.",
        },
        {
          title: "Formation",
          detail:
            "Incorporate, appoint officers, and complete banking setup.",
        },
        {
          title: "Transaction support",
          detail:
            "Administer closings, covenants, and reporting during the deal.",
        },
        {
          title: "Lifecycle management",
          detail:
            "Maintain or wind down cleanly when the purpose ends.",
        },
      ],
      audiences: [
        "Private equity deal teams",
        "Corporate development groups",
        "Financing sponsors",
        "Family offices running co-invests",
      ],
      outcomes: [
        "Cleaner risk isolation per deal",
        "Administration that keeps pace with closings",
        "Documentation counterparties can diligence",
        "Orderly exit or refinance paths",
      ],
      relatedSlugs: [
        "international-structuring",
        "incorporation",
        "audit-coordination",
      ],
    },

    domiciliation: {
      slug: "domiciliation",
      index: "04",
      title: "Domiciliation",
      lede: "Registered office and compliant local presence that satisfies jurisdictional requirements.",
      statement: "Local presence without building a local bench.",
      narrative: [
        "Regulators and banks expect a credible registered office and local presence — not a letterbox fiction. Substance expectations vary by centre and evolve.",
        "We provide registered office and domiciliation support that meets jurisdictional requirements and pairs cleanly with secretarial and directorship services.",
      ],
      capabilities: [
        {
          title: "Registered office",
          detail:
            "Compliant address and mail handling in the relevant financial centre.",
        },
        {
          title: "Local presence packaging",
          detail:
            "Presence arrangements calibrated to regulatory and banking expectations.",
        },
        {
          title: "Statutory correspondence",
          detail:
            "Receive, escalate, and track regulator and registry communications.",
        },
        {
          title: "Substance alignment",
          detail:
            "Coordinate domiciliation with directors, staff, and operating reality where required.",
        },
        {
          title: "Multi-entity portfolios",
          detail:
            "Consistent domiciliation standards across a group’s entity stack.",
        },
        {
          title: "Change of domicile support",
          detail:
            "Assist migrations and re-registrations when strategy shifts.",
        },
      ],
      journey: [
        {
          title: "Requirements check",
          detail:
            "Map jurisdiction rules for registered office and presence.",
        },
        {
          title: "Setup",
          detail:
            "Appoint registered office and configure correspondence flows.",
        },
        {
          title: "Integrate",
          detail:
            "Align with secretarial, directors, and banking relationships.",
        },
        {
          title: "Monitor",
          detail:
            "Track filings and regulator communications continuously.",
        },
        {
          title: "Adjust",
          detail:
            "Update arrangements as substance or location needs change.",
        },
      ],
      audiences: [
        "International subsidiaries",
        "Investment holding companies",
        "SPV portfolios",
        "Groups needing multi-centre presence",
      ],
      outcomes: [
        "Registry-compliant registered offices",
        "Faster response to official correspondence",
        "Clearer substance narrative for banks",
        "Consistent presence across the entity stack",
      ],
      relatedSlugs: [
        "incorporation",
        "corporate-secretarial",
        "directorship",
      ],
    },

    "corporate-secretarial": {
      slug: "corporate-secretarial",
      index: "05",
      title: "Corporate secretarial",
      lede: "Statutory, governance, and filing obligations kept current across the entity lifecycle.",
      statement: "Registers current. Decisions recorded. Filings on time.",
      narrative: [
        "Secretarial failure is quiet until a diligence request, banking refresh, or regulator letter arrives. Then missing minutes and stale filings become the story.",
        "We provide comprehensive secretarial services so entities stay compliant with statutory, governance, and filing obligations — without last-minute scrambles.",
      ],
      capabilities: [
        {
          title: "Statutory registers",
          detail:
            "Maintain shareholder, director, and officer registers accurately.",
        },
        {
          title: "Board & shareholder support",
          detail:
            "Agendas, minutes, resolutions, and circulation packs prepared to standard.",
        },
        {
          title: "Annual filings",
          detail:
            "Track and complete annual returns and registry obligations on time.",
        },
        {
          title: "Change management",
          detail:
            "Process officer, address, and capital changes with clean documentation trails.",
        },
        {
          title: "Multi-jurisdiction cadence",
          detail:
            "One operating rhythm across the centres your group uses.",
        },
        {
          title: "Diligence packs",
          detail:
            "Assemble corporate records quickly for banks, buyers, and investors.",
        },
      ],
      journey: [
        {
          title: "Entity audit",
          detail:
            "Review registers, filings, and minute books for gaps.",
        },
        {
          title: "Cadence setup",
          detail:
            "Install board calendar, filing timetable, and document controls.",
        },
        {
          title: "Ongoing support",
          detail:
            "Run meetings, resolutions, and statutory updates continuously.",
        },
        {
          title: "Annual cycle",
          detail:
            "Complete returns, renewals, and year-end governance packs.",
        },
        {
          title: "Event response",
          detail:
            "Support financings, acquisitions, and ownership changes cleanly.",
        },
      ],
      audiences: [
        "Multi-entity corporate groups",
        "Investment holding companies",
        "Family offices with company stacks",
        "Growth companies professionalising governance",
      ],
      outcomes: [
        "Fewer filing surprises",
        "Board records ready for diligence",
        "Consistent governance across jurisdictions",
        "Less internal bandwidth spent on statutory noise",
      ],
      relatedSlugs: [
        "corporate-governance",
        "directorship",
        "corporate-compliance",
      ],
    },

    directorship: {
      slug: "directorship",
      index: "06",
      title: "Directorship",
      lede: "Independent and nominee directors for effective governance and regulatory compliance.",
      statement: "Oversight that stands up to scrutiny.",
      narrative: [
        "Boards need directors who understand fiduciary duty, local requirements, and the commercial purpose of the entity. Empty chairs and rubber stamps fail substance and counterparty tests.",
        "We provide experienced independent and nominee directors for oversight, substance where required, and governance that holds up to regulators and counterparties.",
      ],
      capabilities: [
        {
          title: "Independent directors",
          detail:
            "Experienced board members providing real oversight and challenge.",
        },
        {
          title: "Nominee arrangements",
          detail:
            "Nominee directors where jurisdiction and structure appropriately allow.",
        },
        {
          title: "Substance support",
          detail:
            "Director presence and decision-making aligned to local expectations.",
        },
        {
          title: "Board process",
          detail:
            "Participation in meetings with proper briefing and recorded decisions.",
        },
        {
          title: "Conflict management",
          detail:
            "Clear mandates and conflict protocols across related entities.",
        },
        {
          title: "Transition support",
          detail:
            "Orderly appointment and resignation as ownership or strategy changes.",
        },
      ],
      journey: [
        {
          title: "Board needs",
          detail:
            "Define independence, substance, and skill requirements.",
        },
        {
          title: "Appointment",
          detail:
            "Complete KYC, filings, and mandate letters.",
        },
        {
          title: "Onboarding",
          detail:
            "Brief directors on business, risks, and reporting cadence.",
        },
        {
          title: "Active oversight",
          detail:
            "Run board cycles with informed participation.",
        },
        {
          title: "Review",
          detail:
            "Adjust board composition as the entity evolves.",
        },
      ],
      audiences: [
        "Regulated and substance-sensitive entities",
        "Investment holding companies",
        "Cross-border subsidiaries",
        "Family structures needing independent oversight",
      ],
      outcomes: [
        "Credible board composition",
        "Stronger substance narrative",
        "Decisions properly recorded",
        "Lower governance risk in diligence",
      ],
      relatedSlugs: [
        "corporate-secretarial",
        "corporate-governance",
        "domiciliation",
      ],
    },

    "cfo-services": {
      slug: "cfo-services",
      index: "07",
      title: "CFO services",
      lede: "Outsourced CFO leadership spanning reporting, budgeting, forecasting, and advisory.",
      statement: "Strategic finance without a full-time bench.",
      narrative: [
        "Growth-stage and international groups often need CFO-level judgement before a full-time hire makes sense — or between hires. Gaps show up in forecasting, board packs, and lender conversations.",
        "We deliver outsourced CFO leadership: reporting, budgeting, forecasting, and business advisory calibrated to growth-stage and institutional needs.",
      ],
      capabilities: [
        {
          title: "Management reporting",
          detail:
            "Board-ready packs that leadership can actually use to decide.",
        },
        {
          title: "Budgeting & forecasting",
          detail:
            "Forward views tied to commercial plans and cash reality.",
        },
        {
          title: "Cash & working capital",
          detail:
            "Visibility and discipline around liquidity across entities.",
        },
        {
          title: "Investor & lender packs",
          detail:
            "Financial narratives suited to capital raises and facilities.",
        },
        {
          title: "Process design",
          detail:
            "Close calendars, controls, and handoffs between accounting and leadership.",
        },
        {
          title: "Advisory support",
          detail:
            "Scenario work for expansion, acquisitions, and restructuring.",
        },
      ],
      journey: [
        {
          title: "Finance diagnostic",
          detail:
            "Assess reporting quality, close process, and decision gaps.",
        },
        {
          title: "Operating rhythm",
          detail:
            "Install reporting calendar, KPIs, and forecast cycle.",
        },
        {
          title: "Hands-on leadership",
          detail:
            "Drive monthly packs, board prep, and cash oversight.",
        },
        {
          title: "Capital events",
          detail:
            "Support raises, facilities, and diligence with clean numbers.",
        },
        {
          title: "Scale or handoff",
          detail:
            "Grow the function or transition to an in-house CFO when ready.",
        },
      ],
      audiences: [
        "Growth companies",
        "Multi-entity international groups",
        "Family offices needing finance leadership",
        "Sponsors between full-time CFO hires",
      ],
      outcomes: [
        "Clearer board and investor reporting",
        "Forecasts leadership trusts",
        "Less firefighting at close",
        "Finance capacity without permanent overhead",
      ],
      relatedSlugs: ["accounting", "payroll", "audit-coordination"],
    },

    accounting: {
      slug: "accounting",
      index: "08",
      title: "Accounting",
      lede: "Bookkeeping, financial reporting, and management accounts tailored to the business.",
      statement: "Accurate books. Timely signal.",
      narrative: [
        "Accounting that arrives late or opaque forces leadership to manage by anecdote. International groups also need consolidation and multi-currency discipline.",
        "We deliver accurate, timely accounting — bookkeeping, financial reporting, and management accounts leadership can use.",
      ],
      capabilities: [
        {
          title: "Bookkeeping",
          detail:
            "Day-to-day ledgers kept current across entities and currencies.",
        },
        {
          title: "Management accounts",
          detail:
            "Periodic packs with variance commentary, not just trial balances.",
        },
        {
          title: "Statutory financials",
          detail:
            "Year-end accounts prepared for audit and filing where required.",
        },
        {
          title: "Multi-entity consolidation",
          detail:
            "Group views that reflect how the business actually operates.",
        },
        {
          title: "Controls & close",
          detail:
            "Close checklists and reconciliations that reduce rework.",
        },
        {
          title: "System hygiene",
          detail:
            "Chart of accounts and process design suited to growth.",
        },
      ],
      journey: [
        {
          title: "Books review",
          detail:
            "Assess ledger quality, systems, and close gaps.",
        },
        {
          title: "Setup",
          detail:
            "Align chart of accounts, entities, and reporting formats.",
        },
        {
          title: "Monthly cycle",
          detail:
            "Run bookkeeping, reconciliations, and management packs.",
        },
        {
          title: "Year-end",
          detail:
            "Prepare statutory accounts and support audit.",
        },
        {
          title: "Improve",
          detail:
            "Tighten close speed and reporting usefulness over time.",
        },
      ],
      audiences: [
        "Operating companies",
        "Holding and investment entities",
        "Multi-jurisdiction groups",
        "Family offices with entity stacks",
      ],
      outcomes: [
        "Books ready for decisions and diligence",
        "Faster monthly close",
        "Cleaner audit entry point",
        "Less internal time spent chasing numbers",
      ],
      relatedSlugs: ["cfo-services", "payroll", "audit-coordination"],
    },

    payroll: {
      slug: "payroll",
      index: "09",
      title: "Payroll",
      lede: "Accurate, on-time payroll administration in full compliance with local rules.",
      statement: "People paid correctly. Local rules respected.",
      narrative: [
        "Payroll mistakes damage trust faster than almost any other back-office failure. Cross-border teams multiply filing and compliance complexity.",
        "We administer payroll so employees are paid accurately, on time, and in compliance with local regulations — coordinated with accounting and CFO reporting.",
      ],
      capabilities: [
        {
          title: "Payroll processing",
          detail:
            "Accurate calculation and payment cycles for local employee bases.",
        },
        {
          title: "Statutory filings",
          detail:
            "Withholdings, contributions, and filings handled to local rules.",
        },
        {
          title: "Multi-centre coordination",
          detail:
            "Align payroll across jurisdictions where the group operates.",
        },
        {
          title: "Onboarding & leavers",
          detail:
            "Clean starts and exits with proper documentation trails.",
        },
        {
          title: "Reporting into finance",
          detail:
            "Payroll costs flowing correctly into management accounts.",
        },
        {
          title: "Exception handling",
          detail:
            "Bonuses, adjustments, and corrections processed without chaos.",
        },
      ],
      journey: [
        {
          title: "Workforce map",
          detail:
            "Confirm locations, contracts, and statutory requirements.",
        },
        {
          title: "Payroll setup",
          detail:
            "Configure calendars, deductions, and approval flows.",
        },
        {
          title: "Run cycles",
          detail:
            "Process payroll and filings each period.",
        },
        {
          title: "Reconcile",
          detail:
            "Tie payroll to accounting and management reporting.",
        },
        {
          title: "Scale",
          detail:
            "Add headcount and centres without reinventing process.",
        },
      ],
      audiences: [
        "International operating companies",
        "Regional subsidiaries",
        "Family offices with staffed entities",
        "Groups consolidating fragmented payroll vendors",
      ],
      outcomes: [
        "On-time accurate payments",
        "Local compliance without internal specialists everywhere",
        "Cleaner cost reporting",
        "Fewer payroll-related disputes",
      ],
      relatedSlugs: ["accounting", "cfo-services", "corporate-compliance"],
    },

    "audit-coordination": {
      slug: "audit-coordination",
      index: "10",
      title: "Audit coordination",
      lede: "End-to-end coordination with auditors for a cleaner, faster close.",
      statement: "Audit as a process — not a scramble.",
      narrative: [
        "Audits stall when management cannot produce schedules, reconciliations, and answers on time. Multi-entity groups multiply the coordination problem.",
        "We coordinate with auditors to streamline the process, reduce noise, and support timely completion — working alongside your accounting and CFO stack.",
      ],
      capabilities: [
        {
          title: "Audit planning",
          detail:
            "Timeline, PBC lists, and owner map agreed before fieldwork starts.",
        },
        {
          title: "PBC management",
          detail:
            "Prepared-by-client schedules tracked to completion.",
        },
        {
          title: "Query response",
          detail:
            "Centralised responses so auditors are not chasing six inboxes.",
        },
        {
          title: "Multi-entity coordination",
          detail:
            "Align component audits and group reporting needs.",
        },
        {
          title: "Close support",
          detail:
            "Reconciliations and adjustments handled with accounting teams.",
        },
        {
          title: "Post-audit improvements",
          detail:
            "Capture control and process fixes for the next cycle.",
        },
      ],
      journey: [
        {
          title: "Pre-audit readiness",
          detail:
            "Assess books, schedules, and open issues before kickoff.",
        },
        {
          title: "Kickoff",
          detail:
            "Agree scope, timeline, and information requests with auditors.",
        },
        {
          title: "Fieldwork support",
          detail:
            "Deliver PBCs and resolve queries in cadence.",
        },
        {
          title: "Completion",
          detail:
            "Support opinions, filings, and board reporting of results.",
        },
        {
          title: "Lessons learned",
          detail:
            "Tighten next year’s close based on findings.",
        },
      ],
      audiences: [
        "Groups with statutory audit obligations",
        "Investment holding companies",
        "Multi-jurisdiction portfolios",
        "Companies professionalising year-end",
      ],
      outcomes: [
        "Faster audit cycles",
        "Fewer last-minute fire drills",
        "Clearer ownership of PBC items",
        "Better controls entering the next year",
      ],
      relatedSlugs: ["accounting", "cfo-services", "corporate-governance"],
    },

    "corporate-governance": {
      slug: "corporate-governance",
      index: "11",
      title: "Governance",
      lede: "Frameworks that promote accountability, transparency, and sound decision-making.",
      statement: "Decisions that can be explained — and defended.",
      narrative: [
        "Governance is how groups make and record decisions as they scale. Weak frameworks create ambiguity for boards, investors, and regulators.",
        "We install corporate governance frameworks that promote accountability and transparent decision-making across the organisation.",
      ],
      capabilities: [
        {
          title: "Board frameworks",
          detail:
            "Charters, reserved matters, and reporting lines that match reality.",
        },
        {
          title: "Decision rights",
          detail:
            "Clear authority maps across shareholders, boards, and management.",
        },
        {
          title: "Policy suite",
          detail:
            "Core policies proportionate to size and risk profile.",
        },
        {
          title: "Meeting discipline",
          detail:
            "Calendars, packs, and minutes that create an auditable trail.",
        },
        {
          title: "Subsidiary governance",
          detail:
            "Consistent standards across the entity stack without bureaucracy theatre.",
        },
        {
          title: "Investor-ready narratives",
          detail:
            "Governance stories that survive LP and bank diligence.",
        },
      ],
      journey: [
        {
          title: "Governance diagnostic",
          detail:
            "Map current decision rights, gaps, and risk points.",
        },
        {
          title: "Framework design",
          detail:
            "Draft charters, policies, and reporting cadence.",
        },
        {
          title: "Board adoption",
          detail:
            "Approve and embed frameworks with officers and owners.",
        },
        {
          title: "Operate",
          detail:
            "Run meetings and decisions against the framework.",
        },
        {
          title: "Refresh",
          detail:
            "Update as the group, investors, or regulators change expectations.",
        },
      ],
      audiences: [
        "Scaling international groups",
        "Family businesses professionalising",
        "Investment platforms",
        "Entities preparing for institutional capital",
      ],
      outcomes: [
        "Clearer accountability",
        "Decision trails ready for diligence",
        "Less ad-hoc board practice",
        "Governance that scales with complexity",
      ],
      relatedSlugs: [
        "corporate-secretarial",
        "directorship",
        "corporate-compliance",
      ],
    },

    "corporate-compliance": {
      slug: "corporate-compliance",
      index: "12",
      title: "Compliance",
      lede: "Proactive compliance across evolving regulatory and operational obligations.",
      statement: "Obligations mapped. Surprises reduced.",
      narrative: [
        "Compliance is not a year-end project. ESG expectations, FATCA/CRS, economic substance, MLRO, and data protection create continuous obligations across centres.",
        "We provide proactive compliance support covering regulatory obligations and operational risk — coordinated with legal counsel where required.",
      ],
      capabilities: [
        {
          title: "Obligation mapping",
          detail:
            "Jurisdictional compliance calendars for the entities you actually run.",
        },
        {
          title: "Economic substance & ESR",
          detail:
            "Support substance assessments and filings where regimes apply.",
        },
        {
          title: "FATCA / CRS",
          detail:
            "Classification and reporting coordination with administrators and banks.",
        },
        {
          title: "AML / MLRO coordination",
          detail:
            "Policies, monitoring, and reporting officer support where required.",
        },
        {
          title: "ESG & data protection",
          detail:
            "Proportionate frameworks for emerging disclosure and privacy duties.",
        },
        {
          title: "Legal coordination",
          detail:
            "Work with counsel on regulatory change without losing operational ownership.",
        },
      ],
      journey: [
        {
          title: "Compliance inventory",
          detail:
            "List entities, regulators, and recurring obligations.",
        },
        {
          title: "Calendar & owners",
          detail:
            "Assign deadlines and accountable owners.",
        },
        {
          title: "Operate",
          detail:
            "Run filings, monitoring, and issue escalation continuously.",
        },
        {
          title: "Regulatory change",
          detail:
            "Interpret and implement new requirements with advisers.",
        },
        {
          title: "Assure",
          detail:
            "Periodic reviews so the map stays true.",
        },
      ],
      audiences: [
        "Multi-jurisdiction corporate groups",
        "Regulated and substance-sensitive entities",
        "Family offices with international assets",
        "Groups consolidating fragmented compliance vendors",
      ],
      outcomes: [
        "Fewer missed filings",
        "Clearer ownership of obligations",
        "Better readiness for bank and LP diligence",
        "Compliance treated as infrastructure, not crisis response",
      ],
      relatedSlugs: [
        "corporate-governance",
        "corporate-secretarial",
        "international-structuring",
      ],
    },

    "private-client-family-office": {
      slug: "private-client-family-office",
      index: "13",
      title: "Private client & family office",
      lede: "Institutional infrastructure for families, family businesses, and private capital.",
      statement: "Family complexity. Institutional operating standards.",
      narrative: [
        "Entrepreneurial families and UHNW individuals increasingly manage operating businesses, private investments, property, and philanthropy across borders. Advice alone is not enough — they need infrastructure.",
        "Our Private Client & Family Office platform provides governance, administration, succession planning coordination, and cross-border structuring traditionally reserved for the largest family offices.",
      ],
      capabilities: [
        {
          title: "Family office setup",
          detail:
            "Single- or multi-family office operating models designed to the family’s scope.",
        },
        {
          title: "Governance frameworks",
          detail:
            "Family councils, investment committees, and decision rights that reduce ambiguity.",
        },
        {
          title: "Asset administration",
          detail:
            "Coordination across holding companies, investments, and operating businesses.",
        },
        {
          title: "Cross-border structuring",
          detail:
            "Entity and ownership maps that fit family and commercial objectives.",
        },
        {
          title: "Succession coordination",
          detail:
            "Work with legal and tax advisers on orderly multi-generational transfer.",
        },
        {
          title: "Professional network",
          detail:
            "One desk coordinating bankers, counsel, auditors, and investment managers.",
        },
      ],
      journey: [
        {
          title: "Family discovery",
          detail:
            "Understand assets, stakeholders, values, and pain points.",
        },
        {
          title: "Operating model",
          detail:
            "Design family office scope, governance, and service map.",
        },
        {
          title: "Stand-up",
          detail:
            "Implement entities, policies, and administration cadences.",
        },
        {
          title: "Run",
          detail:
            "Ongoing coordination of governance, reporting, and advisers.",
        },
        {
          title: "Next generation",
          detail:
            "Evolve structures and education as succession plans mature.",
        },
      ],
      audiences: [
        "Entrepreneurial families",
        "UHNW individuals",
        "Family businesses internationalising",
        "Families forming first family offices",
      ],
      outcomes: [
        "Institutional infrastructure without building a private bank",
        "Clearer family decision rights",
        "Coordinated advisers instead of fragmented vendors",
        "Structures ready for succession conversations",
      ],
      relatedSlugs: [
        "trusts-foundations-estate",
        "international-structuring",
        "corporate-governance",
      ],
    },

    "trusts-foundations-estate": {
      slug: "trusts-foundations-estate",
      index: "14",
      title: "Trusts, foundations & estate planning",
      lede: "Structures that protect wealth and support multi-generational planning.",
      statement: "Continuity across generations — with governance attached.",
      narrative: [
        "Estate planning is no longer a simple will. International assets, operating businesses, and blended families need ownership and governance structures that survive change.",
        "We coordinate trusts, foundations, and estate planning structures with specialist legal and tax advisers — aligned to the wider corporate and investment platform so succession and governance stay coherent.",
      ],
      capabilities: [
        {
          title: "Trust structures",
          detail:
            "Coordinate trust arrangements for asset protection, succession, and stewardship objectives.",
        },
        {
          title: "Foundations",
          detail:
            "Foundation vehicles where jurisdiction and family goals make them appropriate.",
        },
        {
          title: "Holding & estate maps",
          detail:
            "Align trusts and foundations with companies and investment vehicles.",
        },
        {
          title: "Governance for successors",
          detail:
            "Decision frameworks that reduce dispute risk across generations.",
        },
        {
          title: "Adviser orchestration",
          detail:
            "Legal and tax specialists coordinated with operational administration.",
        },
        {
          title: "Lifecycle administration",
          detail:
            "Ongoing support so structures remain current after setup.",
        },
      ],
      journey: [
        {
          title: "Objectives & family map",
          detail:
            "Clarify beneficiaries, assets, values, and risk concerns.",
        },
        {
          title: "Structure options",
          detail:
            "Compare trusts, foundations, and corporate layers with advisers.",
        },
        {
          title: "Implementation",
          detail:
            "Establish vehicles and transfer assets per counsel’s plan.",
        },
        {
          title: "Governance embed",
          detail:
            "Install reporting, protector/board roles, and review cadence.",
        },
        {
          title: "Stewardship",
          detail:
            "Administer and refresh as family and law evolve.",
        },
      ],
      audiences: [
        "UHNW families",
        "Business owners planning succession",
        "Cross-border estate holders",
        "Families coordinating philanthropy and wealth",
      ],
      outcomes: [
        "Clearer succession pathways",
        "Structures aligned to the wider entity stack",
        "Reduced fragmentation between advisers",
        "Governance that outlives the founding generation",
      ],
      relatedSlugs: [
        "private-client-family-office",
        "international-structuring",
        "corporate-governance",
      ],
    },
  };

export function getCorporateOfferingDetail(
  slug: string,
): OfferingDetailContent | undefined {
  return CORPORATE_OFFERING_DETAILS[slug];
}

export function isCorporateOffering(slug: string): boolean {
  return slug in CORPORATE_OFFERING_DETAILS;
}
