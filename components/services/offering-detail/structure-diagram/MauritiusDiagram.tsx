"use client";

import {
  DIFC_PCC_TREE,
  LUXEMBOURG_GP_LP_CASCADE,
  MAURITIUS_PCC_TREE,
} from "./content";
import { GpLpCascadeDiagram } from "./GpLpCascadeDiagram";
import { PccRegionalTreeDiagram } from "./PccRegionalTreeDiagram";

export function MauritiusDiagram() {
  return <PccRegionalTreeDiagram content={MAURITIUS_PCC_TREE} />;
}

export function DifcDiagram() {
  return <PccRegionalTreeDiagram content={DIFC_PCC_TREE} />;
}

export function LuxembourgDiagram() {
  return <GpLpCascadeDiagram content={LUXEMBOURG_GP_LP_CASCADE} />;
}
