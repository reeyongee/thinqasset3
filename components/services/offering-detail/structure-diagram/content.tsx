"use client";

import type { GpLpCascadeContent, PccTreeContent } from "./types";

export const MAURITIUS_PCC_TREE: PccTreeContent = {
  headingId: "od-structure-diagram-mauritius-heading",
  title: (
    <>
      One entity, <em>three markets.</em>
    </>
  ),
  investorsKicker: "Top — Capital",
  investorsTitle: "Global Investors",
  investorsSub: "Institutional LPs · Family offices · HNWIs · DFIs",
  coreMeta: "Mauritius — One Legal Entity",
  coreTitle: "Protected Cell Company",
  coreGrid: ["Shared board", "Administrator", "Auditor", "Compliance"],
  cells: [
    {
      id: "A",
      title: "India",
      items: ["Private equity", "Listed securities", "Venture capital", "Infrastructure"],
    },
    {
      id: "B",
      title: "Sri Lanka",
      items: ["Private companies", "Listed stocks", "Hotels & tourism", "Infrastructure"],
    },
    {
      id: "C",
      title: "Bangladesh",
      items: ["Growth equity", "Manufacturing", "Technology", "Healthcare"],
    },
  ],
  footerKicker: "Legal segregation",
  footerQuote:
    "Each cell\u2019s assets and liabilities are segregated under Mauritius PCC law \u2014 one shared governance layer, cheaper and cleaner than three standalone funds.",
};

export const DIFC_PCC_TREE: PccTreeContent = {
  headingId: "od-structure-diagram-difc-heading",
  title: (
    <>
      The Dubai <em>variant.</em>
    </>
  ),
  investorsKicker: "Top — Capital",
  investorsTitle: "Global & Professional Investors",
  investorsSub: "Institutional LPs · Family offices · Professional investors · DFIs",
  coreMeta: "DIFC — DFSA-aligned",
  coreTitle: "Protected Cell Company",
  coreGrid: ["Shared board", "Regulated hosting", "Auditor", "Compliance"],
  cells: [
    {
      id: "A",
      title: "Gulf Investment Sleeve",
      items: ["Regional PE", "Real estate", "Infrastructure", "Private markets"],
    },
    {
      id: "B",
      title: "Middle East Strategy",
      items: ["Listed securities", "Venture capital", "Hotels & tourism", "Cross-border"],
    },
    {
      id: "C",
      title: "GCC Focus Cell",
      items: ["Growth equity", "Technology", "Healthcare", "Infrastructure"],
    },
  ],
  footerKicker: "Legal segregation",
  footerQuote:
    "Each cell\u2019s assets and liabilities are ring-fenced under DIFC PCC architecture \u2014 one shared governance layer for Gulf and Middle East sleeves, without three standalone vehicles.",
  introExtra: (
    <>
      <p className="od-structure-diagram__lede od-structure-diagram__intro-lede">
        Structurally identical to Mauritius, relabelled for the DIFC — Gulf and Middle
        East sleeves under a DFSA-aligned core.
      </p>
      <div className="od-structure-diagram__aside-rule od-structure-diagram__intro-aside">
        <p className="od-structure-diagram__marker od-structure-diagram__marker--accent">
          On the same page — QIF
        </p>
        <ul className="od-structure-diagram__aside-list">
          <li>Professional investors</li>
          <li>Rapid launch via regulated hosting</li>
          <li>Institutional governance</li>
        </ul>
      </div>
    </>
  ),
};

export const LUXEMBOURG_GP_LP_CASCADE: GpLpCascadeContent = {
  headingId: "od-structure-diagram-lux-heading",
  title: (
    <>
      The cascade institutional <em>LPs</em> already know.
    </>
  ),
  levels: [
    {
      num: "01",
      label: "Commit",
      title: "Limited Partners",
      note: "Capital commitment",
    },
    {
      num: "02",
      label: "Manage",
      title: "General Partner",
      note: "Fund management",
    },
    {
      num: "03",
      label: "Hold",
      title: "Investment Fund",
      note: "The vehicle",
      focal: true,
    },
    {
      num: "04",
      label: "Own",
      title: "Portfolio Companies",
      note: "Underlying assets",
    },
  ],
  footerKicker: "Reference architecture",
  footerQuote:
    "LPs commit via the GP; the fund holds the portfolio companies. Familiar to allocators and counterparties.",
};
