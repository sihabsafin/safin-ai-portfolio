import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export const SectionHeader = React.memo(() => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="mb-16 lg:mb-20">
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground mb-5"
      >
        / Expertise
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, delay: 0.06 }}
      >
        <h2 className="text-[40px] sm:text-5xl lg:text-[64px] font-semibold tracking-[-0.04em] leading-[1.01] mb-6">
          <span className="text-foreground/50">Core</span>
          <br />
          <span className="serif-italic gradient-text-accent">Capabilities</span>
          <br />
          <span className="text-foreground/70">Across the</span>
          <br />
          <span className="gradient-text">Modern AI Stack.</span>
        </h2>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: 0.14 }}
        className="text-lg text-muted-foreground max-w-xl leading-relaxed"
      >
        Not just skills. Capabilities that move business metrics — from first
        prototype to production at scale.
      </motion.p>
    </div>
  );
});
SectionHeader.displayName = "SectionHeader";