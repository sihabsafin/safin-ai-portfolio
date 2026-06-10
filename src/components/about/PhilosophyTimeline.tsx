import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Lightbulb,
  FlaskConical,
  CheckCircle2,
  Rocket,
  ActivitySquare,
  RefreshCw,
} from "lucide-react";

const steps = [
  {
    icon: Lightbulb,
    title: "Think",
    description: "Understand the business problem deeply before touching code.",
  },
  {
    icon: FlaskConical,
    title: "Prototype",
    description: "Validate the hypothesis quickly with a working slice.",
  },
  {
    icon: CheckCircle2,
    title: "Validate",
    description: "Evaluate against real data. Kill weak assumptions early.",
  },
  {
    icon: Rocket,
    title: "Deploy",
    description: "Ship production-grade architecture, not demos.",
  },
  {
    icon: ActivitySquare,
    title: "Monitor",
    description: "Observability, evals, and feedback loops baked in from day one.",
  },
  {
    icon: RefreshCw,
    title: "Iterate",
    description: "Continuous improvement driven by real-world signal.",
  },
];

export const PhilosophyTimeline = React.memo(() => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref}>
      <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground mb-6">
        Build Process
      </p>
      <div className="relative">
        {/* Vertical line */}
        <div
          className="absolute left-[17px] top-2 bottom-2 w-px"
          style={{
            background:
              "linear-gradient(to bottom, rgba(56,189,248,0.4), rgba(79,70,229,0.3), transparent)",
          }}
        />

        <div className="space-y-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="relative pl-11 group"
              >
                {/* Node */}
                <div
                  className="absolute left-0 top-0.5 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: "hsl(220 40% 8% / 0.9)",
                    border: "1px solid rgba(56,189,248,0.2)",
                    boxShadow: "0 0 0 3px hsl(220 40% 4% / 0.8)",
                  }}
                >
                  <Icon className="w-4 h-4 text-sky-400" strokeWidth={1.5} />
                </div>

                <h4 className="text-sm font-semibold text-foreground mb-0.5 leading-none">
                  {step.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
});
PhilosophyTimeline.displayName = "PhilosophyTimeline";