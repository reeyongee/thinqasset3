"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import WordReveal from "./motion/WordReveal";

const toc = [
  ["01", "Mauritius PCC", "#mauritius"],
  ["02", "DIFC PCC", "#difc"],
  ["03", "Luxembourg GP–LP", "#luxembourg"],
];

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const titleO = useTransform(scrollYProgress, [0.2, 0.9], [1, 0]);
  const tocY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section ref={ref} id="top" className="flex min-h-svh flex-col justify-end pt-28 pb-12">
      <div className="container-ed">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="marker mb-8"
            >
              Fund architecture — three jurisdictions
            </motion.p>
            <motion.h1
              style={{ y: titleY, opacity: titleO }}
              className="font-display text-[clamp(3.25rem,8.5vw,8.5rem)] leading-[0.92] tracking-tight"
            >
              <WordReveal mode="load" text="One governance layer." />
              <br />
              <WordReveal mode="load" delay={0.25} accent={["Ring-fenced"]} text="Ring-fenced markets." />
            </motion.h1>
          </div>

          <motion.div style={{ y: tocY }} className="col-span-12 lg:col-span-4 lg:self-end">
            <ul>
              {toc.map(([n, name, href], i) => (
                <motion.li
                  key={n}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.12, duration: 0.6 }}
                  className="border-t border-line last:border-b"
                >
                  <a href={href} className="group flex items-baseline gap-4 py-4">
                    <span className="marker w-6 shrink-0">{n}</span>
                    <span className="font-display text-xl leading-none transition-transform duration-300 group-hover:translate-x-1.5">
                      {name}
                    </span>
                    <span className="ml-auto text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                      →
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-12 h-px w-16 origin-left bg-accent"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="marker mt-4"
        >
          Scroll — the diagrams draw themselves
        </motion.p>
      </div>
    </section>
  );
}
