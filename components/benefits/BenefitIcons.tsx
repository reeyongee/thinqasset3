import type { ReactNode } from "react";
import type { BenefitIconName } from "./constants";

type BenefitIconProps = {
  name: BenefitIconName;
  className?: string;
};

function IconShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={className}
    >
      {children}
    </svg>
  );
}

function ResearchIcon({ className }: { className?: string }) {
  return (
    <IconShell className={className}>
      <path
        d="M 1.003 12.003 C 0.617 12.004 0.265 11.783 0.098 11.434 C -0.069 11.086 -0.02 10.673 0.223 10.373 L 10.123 0.173 C 10.276 -0.004 10.531 -0.051 10.737 0.059 C 10.943 0.169 11.045 0.407 10.983 0.633 L 9.063 6.653 C 8.948 6.96 8.992 7.305 9.18 7.574 C 9.367 7.844 9.675 8.004 10.003 8.003 L 17.003 8.003 C 17.39 8.001 17.742 8.223 17.909 8.571 C 18.076 8.919 18.027 9.333 17.783 9.633 L 7.883 19.833 C 7.73 20.009 7.476 20.056 7.27 19.946 C 7.064 19.836 6.961 19.598 7.023 19.373 L 8.943 13.353 C 9.058 13.045 9.015 12.701 8.827 12.431 C 8.64 12.162 8.332 12.002 8.003 12.003 Z"
        transform="translate(2.997 1.997)"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconShell>
  );
}

function OptimizeIcon({ className }: { className?: string }) {
  return (
    <IconShell className={className}>
      <path
        d="M 0 0 L 6 0 L 6 6"
        transform="translate(16 7)"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 20 0 L 11.5 8.5 L 6.5 3.5 L 0 10"
        transform="translate(2 7)"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconShell>
  );
}

function MarketsIcon({ className }: { className?: string }) {
  return (
    <IconShell className={className}>
      <path
        d="M 0 8 C 0 3.582 3.582 0 8 0 C 12.418 0 16 3.582 16 8 C 16 12.418 12.418 16 8 16 C 3.582 16 0 12.418 0 8 Z"
        transform="translate(4 5)"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 0 0 L 0 4 L 2 6"
        transform="translate(12 9)"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 3 0 L 0 3"
        transform="translate(2 3)"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 3 3 L 0 0"
        transform="translate(19 3)"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 2.38 0 L 0 2.3"
        transform="translate(4 18.7)"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 0 0 L 2.36 2.33"
        transform="translate(17.64 18.67)"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconShell>
  );
}

function DecisionsIcon({ className }: { className?: string }) {
  return (
    <IconShell className={className}>
      <path
        d="M 0 10 C 0 4.477 4.477 0 10 0 C 15.523 0 20 4.477 20 10 C 20 15.523 15.523 20 10 20 C 4.477 20 0 15.523 0 10 Z"
        transform="translate(2 2)"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 0 6 C 0 2.686 2.686 0 6 0 C 9.314 0 12 2.686 12 6 C 12 9.314 9.314 12 6 12 C 2.686 12 0 9.314 0 6 Z"
        transform="translate(6 6)"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 0 2 C 0 0.895 0.895 0 2 0 C 3.105 0 4 0.895 4 2 C 4 3.105 3.105 4 2 4 C 0.895 4 0 3.105 0 2 Z"
        transform="translate(10 10)"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconShell>
  );
}

function MistakesIcon({ className }: { className?: string }) {
  return (
    <IconShell className={className}>
      <path
        d="M 16 10.997 C 16 15.997 12.5 18.497 8.34 19.947 C 8.122 20.021 7.886 20.017 7.67 19.937 C 3.5 18.497 0 15.997 0 10.997 L 0 3.997 C 0 3.445 0.448 2.997 1 2.997 C 3 2.997 5.5 1.797 7.24 0.277 C 7.678 -0.097 8.322 -0.097 8.76 0.277 C 10.51 1.807 13 2.997 15 2.997 C 15.552 2.997 16 3.445 16 3.997 Z"
        transform="translate(4 2.003)"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 0 2 L 2 4 L 6 0"
        transform="translate(9 10)"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconShell>
  );
}

function LearnIcon({ className }: { className?: string }) {
  return (
    <IconShell className={className}>
      <path
        d="M 0 0 L 0 14"
        transform="translate(12 7)"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 1 15 C 0.448 15 0 14.552 0 14 L 0 1 C 0 0.448 0.448 0 1 0 L 6 0 C 8.209 0 10 1.791 10 4 C 10 1.791 11.791 0 14 0 L 19 0 C 19.552 0 20 0.448 20 1 L 20 14 C 20 14.552 19.552 15 19 15 L 13 15 C 11.343 15 10 16.343 10 18 C 10 16.343 8.657 15 7 15 Z"
        transform="translate(2 3)"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconShell>
  );
}

export function BenefitIcon({ name, className }: BenefitIconProps) {
  switch (name) {
    case "research":
      return <ResearchIcon className={className} />;
    case "optimize":
      return <OptimizeIcon className={className} />;
    case "markets":
      return <MarketsIcon className={className} />;
    case "decisions":
      return <DecisionsIcon className={className} />;
    case "mistakes":
      return <MistakesIcon className={className} />;
    case "learn":
      return <LearnIcon className={className} />;
  }
}
