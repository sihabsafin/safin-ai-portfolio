import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  HeartPulse, TrendingUp, Scale, ShoppingBag,
  GraduationCap, Factory, FlaskConical,
} from "lucide-react";

const domains = [
  { icon: HeartPulse,    label: "Healthcare AI" },
  { icon: TrendingUp,    label: "Finance AI" },
  { icon: Scale,         label: "Legal AI" },
  { icon: ShoppingBag,   label: "Retail AI" },
  { icon: GraduationCap, label: "Education AI" },
  { icon: Factory,       label: "Manufacturing AI" },
  { icon: FlaskConical,  label: "Research AI" },
];

export const DomainStrip = React.memo(() => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="mt-12">
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
        className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground mb-5"
      >
        Industry Domains
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-wrap gap-2.5"
      >
        {domains.map((d, i) => {
          const Icon = d.icon;
          return (
            <motion.div
              key={d.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.35, delay: 0.12 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -2, transition: { duration: 0.18 } }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full cursor-default transition-all duration-300"
              style={{
                background: "hsl(220 40% 8% / 0.6)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <Icon
                className="w-3.5 h-3.5 text-sky-400/70"
                strokeWidth={1.5}
              />
              <span className="text-xs font-medium text-foreground/70">{d.label}</span>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
});
DomainStrip.displayName = "DomainStrip";