import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const layers = [
  { label: "User", color: "rgba(255,255,255,0.08)", text: "rgba(255,255,255,0.7)" },
  { label: "FastAPI Gateway", color: "rgba(56,189,248,0.08)", text: "#38BDF8" },
  { label: "AI Agent", color: "rgba(79,70,229,0.12)", text: "#818CF8" },
  { label: "RAG Retriever", color: "rgba(56,189,248,0.08)", text: "#38BDF8" },
  { label: "Vector DB", color: "rgba(79,70,229,0.08)", text: "#818CF8" },
  { label: "LLM", color: "rgba(56,189,248,0.12)", text: "#38BDF8" },
  { label: "Response", color: "rgba(52,211,153,0.08)", text: "#34d399" },
];

export const ArchitectureSketch = React.memo(() => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card p-6 lg:p-7"
    >
      <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground mb-5">
        Typical Architecture
      </p>
      <div className="flex flex-col items-center gap-0">
        {layers.map((layer, i) => (
          <React.Fragment key={layer.label}>
            <motion.div
              initial={{ opacity: 0, scaleX: 0.85 }}
              animate={inView ? { opacity: 1, scaleX: 1 } : {}}
              transition={{ duration: 0.35, delay: 0.15 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="w-full rounded-xl px-4 py-2.5 text-center"
              style={{
                background: layer.color,
                border: `1px solid ${layer.text}22`,
              }}
            >
              <span className="text-xs font-mono font-medium" style={{ color: layer.text }}>
                {layer.label}
              </span>
            </motion.div>
            {i < layers.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.2 + i * 0.07 }}
                className="flex flex-col items-center py-0.5"
              >
                <div className="w-px h-3" style={{ background: "rgba(56,189,248,0.2)" }} />
                <div
                  className="w-0 h-0"
                  style={{
                    borderLeft: "4px solid transparent",
                    borderRight: "4px solid transparent",
                    borderTop: "5px solid rgba(56,189,248,0.25)",
                  }}
                />
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </div>
    </motion.div>
  );
});
ArchitectureSketch.displayName = "ArchitectureSketch";