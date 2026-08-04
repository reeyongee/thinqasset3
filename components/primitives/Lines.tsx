"use client";

import { motion } from "framer-motion";

export default function Lines({
  lines,
  delay = 0,
  className = "",
}: {
  lines: React.ReactNode[];
  delay?: number;
  className?: string;
}) {
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className="block will-change-transform"
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: delay + i * 0.1 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
