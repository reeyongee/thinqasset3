"use client";

import dynamic from "next/dynamic";
import { useIsPhoneViewport } from "./useIsPhoneViewport";

const DesktopHome = dynamic(
  () => import("./DesktopHome").then((m) => ({ default: m.DesktopHome })),
  { ssr: true },
);

const MobileHomePage = dynamic(
  () =>
    import("./MobileHomePage").then((m) => ({ default: m.MobileHomePage })),
  { ssr: false },
);

export function HomeViewportGate() {
  const isPhone = useIsPhoneViewport();

  if (isPhone) {
    return <MobileHomePage />;
  }

  return <DesktopHome />;
}
