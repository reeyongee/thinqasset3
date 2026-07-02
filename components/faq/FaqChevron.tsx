type FaqChevronProps = {
  open: boolean;
};

export function FaqChevron({ open }: FaqChevronProps) {
  return (
    <svg
      aria-hidden
      className="faq-chevron shrink-0 text-white transition-transform duration-300 ease-[cubic-bezier(0.12,0.23,0.17,0.99)]"
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      style={{ transform: open ? "rotate(45deg)" : "none" }}
    >
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
}
