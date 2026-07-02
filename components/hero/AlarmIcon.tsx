export function AlarmIcon() {
  return (
    <svg
      className="block size-4"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      role="presentation"
    >
      <circle
        cx="12"
        cy="13"
        r="7"
        stroke="var(--token-muted)"
        strokeWidth="1.5"
      />
      <path
        d="M12 9V13L14 15"
        stroke="var(--token-muted)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 3L2 6M19 3L22 6"
        stroke="var(--token-muted)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
