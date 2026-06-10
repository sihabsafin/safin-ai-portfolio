import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check } from "lucide-react";

const principles = [
  "Production First",
  "Simplicity Over Complexity",
  "Data-Driven Decisions",
  "Human-Centered AI",
  "Scalable Architecture",
  "Continuous Learning",
  "Measurable Impact",
];

export const EngineeringPrinciples = React.memo(() => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card p-6 lg:p-8"
    >
      <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground mb-5">
        Engineering Principles
      </p>
      <div className="space-y-3">
        {principles.map((p, i) => (
          <motion.div
            key={p}
            initial={{ opacity: 0, x: -12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
            className="flex items-center gap-3"
          >
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                background: "rgba(56,189,248,0.10)",
                border: "1px solid rgba(56,189,248,0.20)",
              }}
            >
              <Check className="w-2.5 h-2.5 text-sky-400" strokeWidth={2.5} />
            </div>
            <span className="text-sm text-foreground/80 font-medium">{p}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
});
EngineeringPrinciples.displayName = "EngineeringPrinciples";