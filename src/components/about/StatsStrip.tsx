import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "5+", label: "Years Building", sub: "AI & Software" },
  { value: "20+", label: "Projects", sub: "Shipped to Production" },
  { value: "15+", label: "Countries", sub: "Worked With" },
  { value: "100%", label: "Production", sub: "Focus" },
];

export const StatsStrip = React.memo(() => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl p-5 text-center lg:text-left"
          style={{
            background: "hsl(220 40% 8% / 0.5)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="text-3xl lg:text-4xl font-semibold tracking-tight gradient-text mb-1">
            {s.value}
          </div>
          <div className="text-xs font-medium text-foreground/80 leading-tight">{s.label}</div>
          <div className="text-[11px] text-muted-foreground mt-0.5">{s.sub}</div>
        </motion.div>
      ))}
    </div>
  );
});
StatsStrip.displayName = "StatsStrip";