type OfferingIconProps = {
  className?: string;
};

/** McShannock play-arrow icon — 32×32, dual-path fill + stroke. */
export function OfferingIcon({ className }: OfferingIconProps) {
  return (
    <svg
      className={className}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M8 6.5L24 16L8 25.5V6.5Z"
        fill="currentColor"
        fillOpacity="0.2"
      />
      <path
        d="M8 6.5L24 16L8 25.5V6.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
