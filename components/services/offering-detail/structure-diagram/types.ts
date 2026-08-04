import type { ReactNode } from "react";

export type PccCell = {
  id: string;
  title: string;
  items: readonly string[];
};

export type PccTreeContent = {
  headingId: string;
  title: ReactNode;
  investorsKicker: string;
  investorsTitle: string;
  investorsSub: string;
  coreMeta: string;
  coreTitle: string;
  coreGrid?: readonly string[];
  coreNote?: string;
  cells: readonly PccCell[];
  footerKicker: string;
  footerQuote: string;
  introExtra?: ReactNode;
};

export type GpLpLevel = {
  num: string;
  label: string;
  title: string;
  note: string;
  focal?: boolean;
};

export type GpLpCascadeContent = {
  headingId: string;
  title: ReactNode;
  levels: readonly GpLpLevel[];
  footerKicker: string;
  footerQuote: string;
};
