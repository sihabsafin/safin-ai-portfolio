import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check } from "lucide-react";

const roadmap = [
  { quarter: "Q1", label: "AI Agents", done: true },
  { quarter: "Q2", label: "Enterprise RAG", done: true },
  { quarter: "Q3", label: "Voice AI", done: false, active: true },
  { quarter: "Q4", label: "Autonomous Workflows", done: false },
];

export const Roadmap = React.memo(() => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="mt-8">
      <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground mb-5">
        2025 Roadmap
      </p>
      <div className="flex items-center gap-0">
        {roadmap.map((item, i) => (
          <React.Fragment key={item.quarter}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
              className="flex flex-col items-center flex-1"
            >
              {/* Node */}
              <div
                className={[
                  "w-8 h-8 rounded-full flex items-center justify-center mb-2 border transition-all",
                  item.done
                    ? "bg-emerald-400/15 border-emerald-400/40"
                    : item.active
                    ? "bg-sky-400/15 border-sky-400/40"
                    : "bg-white/[0.03] border-white/10",
                ].join(" ")}
              >
                {item.done ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : item.active ? (
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                )}
              </div>
              <div
                className={[
                  "text-[10px] font-mono",
                  item.done
                    ? "text-emerald-400"
                    : item.active
                    ? "text-sky-400"
                    : "text-muted-foreground/50",
                ].join(" ")}
              >
                {item.quarter}
              </div>
              <div
                className={[
                  "text-[11px] font-medium text-center mt-0.5 leading-tight",
                  item.done
                    ? "text-foreground/70"
                    : item.active
                    ? "text-foreground/90"
                    : "text-muted-foreground/40",
                ].join(" ")}
              >
                {item.label}
              </div>
            </motion.div>
            {/* Connector */}
            {i < roadmap.length - 1 && (
              <div
                className="h-px flex-1 max-w-[40px] mb-8"
                style={{
                  background: roadmap[i].done
                    ? "rgba(52,211,153,0.3)"
                    : "rgba(255,255,255,0.08)",
                }}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
});
Roadmap.displayName = "Roadmap";