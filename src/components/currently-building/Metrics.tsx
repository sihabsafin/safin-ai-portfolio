import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const metrics = [
  { value: "98%", label: "Accuracy" },
  { value: "120ms", label: "Latency" },
  { value: "200K", label: "Context Window" },
  { value: "6", label: "Active Agents" },
];

export const Metrics = React.memo(() => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
      {metrics.map((m, i) => (
        <motion.div
          key={m.label}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.1 + i * 0.07 }}
          className="rounded-2xl p-4 text-center"
          style={{
            background: "hsl(220 40% 8% / 0.5)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="text-2xl font-semibold tracking-tight gradient-text">{m.value}</div>
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground mt-1">{m.label}</div>
        </motion.div>
      ))}
    </div>
  );
});
Metrics.displayName = "Metrics";