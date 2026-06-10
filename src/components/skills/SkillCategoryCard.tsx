import { motion } from "framer-motion";
import {
  Code2, BrainCircuit, Bot, DatabaseZap, Cloud, ServerCog, Database, Activity
} from "lucide-react";
import { TechnologyPill } from "./TechnologyPill";

interface SkillCategoryCardProps {
  iconKey: string;
  title: string;
  description: string;
  items: string[];
  index: number;
  inView: boolean;
  size?: "sm" | "md" | "lg";
  accentColor?: "sky" | "indigo" | "violet" | "emerald";
}

const iconMap: Record<string, React.ReactNode> = {
  code:     <Code2 size={15} strokeWidth={1.8} />,
  brain:    <BrainCircuit size={15} strokeWidth={1.8} />,
  bot:      <Bot size={15} strokeWidth={1.8} />,
  dbzap:    <DatabaseZap size={15} strokeWidth={1.8} />,
  cloud:    <Cloud size={15} strokeWidth={1.8} />,
  servercog:<ServerCog size={15} strokeWidth={1.8} />,
  db:       <Database size={15} strokeWidth={1.8} />,
  activity: <Activity size={15} strokeWidth={1.8} />,
};

const accentMap = {
  sky: {
    iconBg:   "bg-sky-500/[0.08] border-sky-500/[0.18]",
    iconText: "text-sky-400",
    count:    "text-sky-400/50",
    divider:  "from-sky-500/20 via-sky-500/5 to-transparent",
    glow:     "group-hover:shadow-[0_0_40px_hsl(199_89%_60%/0.07)]",
    border:   "group-hover:border-sky-500/25",
  },
  indigo: {
    iconBg:   "bg-indigo-500/[0.08] border-indigo-500/[0.18]",
    iconText: "text-indigo-400",
    count:    "text-indigo-400/50",
    divider:  "from-indigo-500/20 via-indigo-500/5 to-transparent",
    glow:     "group-hover:shadow-[0_0_40px_hsl(239_84%_60%/0.08)]",
    border:   "group-hover:border-indigo-500/25",
  },
  violet: {
    iconBg:   "bg-violet-500/[0.08] border-violet-500/[0.18]",
    iconText: "text-violet-400",
    count:    "text-violet-400/50",
    divider:  "from-violet-500/20 via-violet-500/5 to-transparent",
    glow:     "group-hover:shadow-[0_0_40px_hsl(263_70%_60%/0.08)]",
    border:   "group-hover:border-violet-500/25",
  },
  emerald: {
    iconBg:   "bg-emerald-500/[0.08] border-emerald-500/[0.18]",
    iconText: "text-emerald-400",
    count:    "text-emerald-400/50",
    divider:  "from-emerald-500/20 via-emerald-500/5 to-transparent",
    glow:     "group-hover:shadow-[0_0_40px_hsl(152_76%_50%/0.07)]",
    border:   "group-hover:border-emerald-500/25",
  },
};

export const SkillCategoryCard = ({
  iconKey,
  title,
  description,
  items,
  index,
  inView,
  size = "md",
  accentColor = "sky",
}: SkillCategoryCardProps) => {
  const a = accentMap[accentColor];

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.065, ease: [0.22, 1, 0.36, 1] }}
      className={`
        group relative flex flex-col gap-0
        rounded-[1.25rem] border border-white/[0.06]
        bg-gradient-to-b from-white/[0.04] to-white/[0.015]
        backdrop-blur-xl transition-all duration-500
        ${a.glow} ${a.border}
        hover:-translate-y-1
        ${size === "lg" ? "row-span-2" : ""}
      `}
    >
      {/* Subtle top edge highlight */}
      <div className="absolute inset-x-0 top-0 h-px rounded-t-[1.25rem] bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />

      <div className="p-6 flex flex-col gap-4 h-full">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className={`w-[34px] h-[34px] rounded-xl border flex items-center justify-center shrink-0 transition-all duration-300 ${a.iconBg} ${a.iconText}`}>
              {iconMap[iconKey]}
            </div>
            <h3 className="text-[13px] font-semibold tracking-tight text-white/85 leading-snug">
              {title}
            </h3>
          </div>
          <span className={`text-[10.5px] font-mono tabular-nums mt-0.5 shrink-0 ${a.count}`}>
            {String(items.length).padStart(2, "0")}
          </span>
        </div>

        {/* Description */}
        <p className="text-[11.5px] leading-relaxed text-white/38 -mt-1 font-medium">
          {description}
        </p>

        {/* Gradient divider */}
        <div className={`h-px bg-gradient-to-r ${a.divider}`} />

        {/* Pills */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {items.map((item, i) => (
            <TechnologyPill key={item} label={item} index={i} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};