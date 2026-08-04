"use client";

import type { ComponentType } from "react";
import { DifcDiagram } from "./DifcDiagram";
import { LuxembourgDiagram } from "./LuxembourgDiagram";
import { MauritiusDiagram } from "./MauritiusDiagram";
import "./structure-diagram.css";

export type StructureDiagramSlug =
  | "difc-structures"
  | "mauritius-protected-cell-company"
  | "luxembourg-gp-lp";

const DIAGRAMS: Record<StructureDiagramSlug, ComponentType> = {
  "mauritius-protected-cell-company": MauritiusDiagram,
  "difc-structures": DifcDiagram,
  "luxembourg-gp-lp": LuxembourgDiagram,
};

export function isStructureDiagramSlug(
  slug: string,
): slug is StructureDiagramSlug {
  return slug in DIAGRAMS;
}

export function StructureDiagram({ slug }: { slug: string }) {
  if (!isStructureDiagramSlug(slug)) return null;
  const Diagram = DIAGRAMS[slug];
  return <Diagram />;
}
