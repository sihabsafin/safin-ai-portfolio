import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const milestones = [
  { year: "2019", title: "Started in Software", detail: "Full-stack development & system design." },
  { year: "2021", title: "Entered ML/AI", detail: "First production ML model. Fell in love with the problem space." },
  { year: "2022", title: "LLM Specialization", detail: "Shifted entirely to large language models and AI systems." },
  { year: "2023", title: "Agents & RAG", detail: "Built first multi-agent systems. Scaled enterprise RAG pipelines." },
  { year: "2024", title: "Enterprise AI", detail: "Delivering end-to-end AI products for global clients." },
  { year: "Now", title: "Building", detail: "Frontier systems. Autonomous workflows. Production AI at scale.", active: true },
];

export const JourneyTimeline = React.memo(() => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref}>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
        className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground mb-8"
      >
        Journey
      </motion.p>

      {/* Desktop: horizontal */}
      <div className="hidden md:block relative">
        {/* Track line */}
        <div
          className="absolute top-[18px] left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(to right, rgba(56,189,248,0.4), rgba(79,70,229,0.3), rgba(255,255,255,0.05))",
          }}
        />
        <div className="grid grid-cols-6 gap-4 relative">
          {milestones.map((m, i) => (
            <motion.div
              key={m.year}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.1 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center group"
            >
              {/* Node */}
              <div
                className={[
                  "w-9 h-9 rounded-full flex items-center justify-center mb-4 border transition-all duration-300 group-hover:scale-110 z-10",
                  m.active
                    ? "bg-sky-400/20 border-sky-400/50"
                    : "bg-background border-white/15",
                ].join(" ")}
                style={{ background: m.active ? undefined : "hsl(220 40% 6%)" }}
              >
                {m.active ? (
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse" />
                ) : (
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: "linear-gradient(135deg,#38BDF8,#4F46E5)" }}
                  />
                )}
              </div>
              <div
                className={[
                  "text-xs font-mono font-semibold mb-1",
                  m.active ? "text-sky-400" : "text-foreground/50",
                ].join(" ")}
              >
                {m.year}
              </div>
              <div className="text-[12px] font-semibold text-foreground/80 leading-tight mb-1">
                {m.title}
              </div>
              <div className="text-[11px] text-muted-foreground leading-relaxed">{m.detail}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile: vertical */}
      <div className="md:hidden relative pl-8">
        <div
          className="absolute left-[15px] top-0 bottom-0 w-px"
          style={{
            background:
              "linear-gradient(to bottom, rgba(56,189,248,0.4), rgba(79,70,229,0.3), transparent)",
          }}
        />
        <div className="space-y-7">
          {milestones.map((m, i) => (
            <motion.div
              key={m.year}
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
              className="relative"
            >
              <div
                className={[
                  "absolute -left-8 top-0.5 w-7 h-7 rounded-full flex items-center justify-center border",
                  m.active ? "border-sky-400/50 bg-sky-400/10" : "border-white/12",
                ].join(" ")}
                style={{ background: m.active ? undefined : "hsl(220 40% 6%)" }}
              >
                {m.active ? (
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                ) : (
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "linear-gradient(135deg,#38BDF8,#4F46E5)" }}
                  />
                )}
              </div>
              <span
                className={[
                  "text-[10px] font-mono font-semibold",
                  m.active ? "text-sky-400" : "text-muted-foreground/60",
                ].join(" ")}
              >
                {m.year}
              </span>
              <div className="text-sm font-semibold text-foreground/80 mt-0.5">{m.title}</div>
              <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{m.detail}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
});
JourneyTimeline.displayName = "JourneyTimeline";