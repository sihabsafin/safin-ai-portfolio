import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { StatusBadge } from "./StatusBadge";

type Status = "production" | "live" | "building" | "research" | "experimental" | "beta";

export interface LiveModule {
  icon: LucideIcon;
  title: string;
  description: string;
  status: Status;
  tags: string[];
}

interface LiveModuleCardProps {
  module: LiveModule;
  index: number;
  inView: boolean;
}

export const LiveModuleCard = React.memo(({ module, index, inView }: LiveModuleCardProps) => {
  const Icon = module.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.15 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      className="glass-card-hover p-5 group cursor-default relative overflow-hidden"
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(56,189,248,0.07), transparent 70%)",
        }}
      />

      <div className="relative flex items-start justify-between gap-3 mb-3">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
          style={{
            background: "rgba(56,189,248,0.08)",
            border: "1px solid rgba(56,189,248,0.15)",
          }}
        >
          <Icon className="w-4 h-4 text-sky-400" strokeWidth={1.5} />
        </div>
        <StatusBadge status={module.status} />
      </div>

      <h4 className="text-sm font-semibold text-foreground mb-1.5 leading-snug">{module.title}</h4>
      <p className="text-xs text-muted-foreground leading-relaxed mb-3">{module.description}</p>

      <div className="flex flex-wrap gap-1.5">
        {module.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-mono px-2 py-0.5 rounded-md text-muted-foreground/70"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
});
LiveModuleCard.displayName = "LiveModuleCard";