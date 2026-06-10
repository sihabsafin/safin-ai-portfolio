import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, LucideIcon } from "lucide-react";

export type CardSize = "large" | "medium" | "small";
export type CardCategory = "Production" | "Enterprise" | "Research" | "Infrastructure";

export interface Capability {
  icon: LucideIcon;
  title: string;
  description: string;
  stack: string[];
  category: CardCategory;
  size?: CardSize;
}

interface CapabilityCardProps {
  capability: Capability;
  index: number;
  inView: boolean;
}

const categoryColors: Record<CardCategory, { bg: string; text: string; border: string }> = {
  Production:    { bg: "rgba(52,211,153,0.08)",   text: "#34d399", border: "rgba(52,211,153,0.20)" },
  Enterprise:    { bg: "rgba(56,189,248,0.08)",   text: "#38BDF8", border: "rgba(56,189,248,0.20)" },
  Research:      { bg: "rgba(167,139,250,0.10)",  text: "#a78bfa", border: "rgba(167,139,250,0.22)" },
  Infrastructure:{ bg: "rgba(251,191,36,0.08)",   text: "#fbbf24", border: "rgba(251,191,36,0.20)" },
};

export const CapabilityCard = React.memo(({ capability, index, inView }: CapabilityCardProps) => {
  const { icon: Icon, title, description, stack, category, size = "medium" } = capability;
  const cat = categoryColors[category];
  const isLarge = size === "large";

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.04 + index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5, transition: { duration: 0.22 } }}
      className="glass-card-hover group relative overflow-hidden cursor-default flex flex-col"
      style={{ padding: isLarge ? "1.75rem" : "1.25rem 1.5rem" }}
    >
      {/* Hover radial glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(56,189,248,0.07), transparent 65%)",
        }}
      />

      {/* Top row: icon + category label */}
      <div className="relative flex items-start justify-between gap-3 mb-4">
        <motion.div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: "rgba(56,189,248,0.07)",
            border: "1px solid rgba(56,189,248,0.14)",
          }}
          whileHover={{ rotate: 6, scale: 1.08, transition: { duration: 0.2 } }}
        >
          <Icon className="w-[18px] h-[18px] text-sky-400" strokeWidth={1.5} />
        </motion.div>

        {/* Category pill top-right */}
        <span
          className="text-[10px] font-mono px-2 py-0.5 rounded-md flex-shrink-0 mt-0.5"
          style={{ background: cat.bg, color: cat.text, border: `1px solid ${cat.border}` }}
        >
          {category}
        </span>
      </div>

      {/* Title */}
      <h3
        className={[
          "font-semibold tracking-tight leading-snug mb-2",
          isLarge ? "text-[17px]" : "text-[15px]",
        ].join(" ")}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        className={[
          "text-muted-foreground leading-relaxed mb-4 flex-1",
          isLarge ? "text-sm" : "text-[13px]",
        ].join(" ")}
      >
        {description}
      </p>

      {/* Tech stack pills */}
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {stack.map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-mono px-2 py-0.5 rounded-md text-muted-foreground/70"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Arrow slides in on hover */}
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-300">
        <ArrowUpRight className="w-4 h-4 text-sky-400/70" />
      </div>
    </motion.div>
  );
});
CapabilityCard.displayName = "CapabilityCard";