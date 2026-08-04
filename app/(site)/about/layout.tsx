import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — A Message from the Founder | THINQASSET",
  description:
    "A letter from the Office of the Founder & CEO of TBG Group Holding Ltd., DIFC, Dubai.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
