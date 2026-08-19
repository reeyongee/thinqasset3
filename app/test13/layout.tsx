import type { Metadata } from "next";
import { noIndexRobots } from "@/lib/site-metadata";

export const metadata: Metadata = {
  robots: noIndexRobots,
};

export default function Test13Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .site-bg { display: none !important; }
            html, body { background: #161c24 !important; overflow: hidden; }
          `,
        }}
      />
      {children}
    </>
  );
}
