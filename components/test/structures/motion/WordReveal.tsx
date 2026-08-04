"use client";

import { motion } from "framer-motion";

export default function WordReveal({
  text,
  accent = [],
  mode = "view",
  delay = 0,
  className = "",
}: {
  text: string;
  accent?: string[];
  mode?: "load" | "view";
  delay?: number;
  className?: string;
}) {
  return (
    <span className={className}>
      {text.split(" ").map((w, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom pb-[0.1em] -mb-[0.1em]"
        >
          <motion.span
            className={`inline-block will-change-transform ${
              accent.includes(w) ? "italic text-accent" : ""
            }`}
            initial={{ y: "112%" }}
            {...(mode === "load"
              ? { animate: { y: 0 } }
              : { whileInView: { y: 0 }, viewport: { once: true, margin: "-8% 0px" } })}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: delay + i * 0.055 }}
          >
            {w}
          </motion.span>
        </span>
      ))}{" "}
    </span>
  );
}
