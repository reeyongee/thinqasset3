export type FaqItemData = {
  id: string;
  question: string;
  answer: string;
};

export const FAQ_ITEMS: FaqItemData[] = [
  {
    id: "what-is-optimus",
    question: "What is Optimus?",
    answer:
      "Optimus is an AI-powered investment advisor that analyzes your portfolio, provides personalized insights, and helps you make smarter decisions—without executing trades. You stay in full control while gaining institutional-level intelligence.",
  },
  {
    id: "account-access",
    question: "How does Optimus access my accounts?",
    answer:
      "We use secure, read-only access through Plaid (trusted by Venmo, Robinhood, and major banks). We can only view your data—never execute trades, withdraw funds, or modify your accounts.",
  },
  {
    id: "data-security",
    question: "Is my data secure?",
    answer:
      "Yes. All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We're SOC 2 Type II certified and never sell or share your personal information. Your credentials are never stored on our servers.",
  },
  {
    id: "execute-trades",
    question: "Can Optimus execute trades for me?",
    answer:
      "No. Optimus provides guidance and recommendations, but you execute all trades through your own brokerage account. This keeps you in control and ensures we remain an advisory tool, not a money manager.",
  },
  {
    id: "brokerages",
    question: "What brokerages do you support?",
    answer:
      "We support 300+ financial institutions including Fidelity, Vanguard, Schwab, Interactive Brokers, TD Ameritrade, E*TRADE, Robinhood, and more through our Plaid integration.",
  },
  {
    id: "who-is-orion",
    question: "Who is Orion?",
    answer:
      "Orion is your AI investment advisor—trained on decades of market data and financial theory. Ask Orion questions about stocks, strategies, or your portfolio anytime and receive instant, data-driven answers.",
  },
];

export const FAQ_TOKENS = {
  itemBg: "#121212",
  muted: "rgba(184, 184, 184, 0.9)",
  white: "#ffffff",
} as const;
