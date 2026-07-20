export const QT_EASE = [0.22, 1, 0.36, 1] as const;

export const ACCENT_GRADIENT_TEXT_STYLE = {
  background: "linear-gradient(180deg, #b6a082 0%, rgba(182, 160, 130, 0) 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
} as const;

export const ACCENT_PROGRESS_FILL_STYLE = {
  background:
    "linear-gradient(180deg, #b6a082 0%, rgba(182, 160, 130, 0.3) 100%)",
} as const;

export const SCROLL_SPRING = {
  stiffness: 100,
  damping: 30,
  restDelta: 0.001,
} as const;

export const PILLAR_INDICATOR_SPRING = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
};
