import { motion } from "framer-motion";
import { Zap } from "lucide-react";

const favorites = [
  { name: "Python",     color: "sky"     },
  { name: "FastAPI",    color: "emerald" },
  { name: "LangGraph",  color: "violet"  },
  { name: "OpenAI",     color: "indigo"  },
  { name: "Docker",     color: "sky"     },
  { name: "AWS",        color: "indigo"  },
  { name: "PostgreSQL", color: "sky"     },
  { name: "Redis",      color: "emerald" },
];

const pillColor: Record<string, string> = {
  sky:     "bg-sky-500/10 border-sky-500/25 text-sky-300 hover:bg-sky-500/18 hover:border-sky-400/50 hover:text-white shadow-[0_0_14px_hsl(199_89%_60%/0)]  hover:shadow-[0_0_14px_hsl(199_89%_60%/0.12)]",
  indigo:  "bg-indigo-500/10 border-indigo-500/25 text-indigo-300 hover:bg-indigo-500/18 hover:border-indigo-400/50 hover:text-white",
  violet:  "bg-violet-500/10 border-violet-500/25 text-violet-300 hover:bg-violet-500/18 hover:border-violet-400/50 hover:text-white",
  emerald: "bg-emerald-500/10 border-emerald-500/25 text-emerald-300 hover:bg-emerald-500/18 hover:border-emerald-400/50 hover:text-white",
};

interface FavoriteToolsProps {
  inView: boolean;
}

export const FavoriteTools = ({ inView }: FavoriteToolsProps) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
    className="relative rounded-2xl overflow-hidden"
  >
    {/* Glow border */}
    <div
      className="absolute inset-0 rounded-2xl pointer-events-none z-10"
      style={{
        padding: "1px",
        background: "linear-gradient(135deg, hsl(199 89% 60% / 0.35), hsl(239 84% 60% / 0.25) 50%, transparent 80%)",
        WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
      }}
    />
    {/* Ambient top glow */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: "radial-gradient(ellipse 60% 80% at 0% 50%, hsl(199 89% 60% / 0.05), transparent 70%)",
      }}
    />

    <div
      className="relative px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-5"
      style={{
        background: "linear-gradient(135deg, hsl(220 40% 9% / 0.9), hsl(220 40% 7% / 0.7))",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Label */}
      <div className="shrink-0 flex items-center gap-3">
        <div className="w-7 h-7 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
          <Zap size={13} strokeWidth={1.8} className="text-sky-400" />
        </div>
        <div>
          <p className="text-[10.5px] font-mono uppercase tracking-[0.2em] text-white/35 leading-none mb-1">
            Daily Drivers
          </p>
          <p className="text-[11px] text-white/25 font-medium">Most used</p>
        </div>
      </div>

      {/* Divider */}
      <div className="hidden sm:block w-px h-9 bg-white/[0.06]" />

      {/* Pills */}
      <div className="flex flex-wrap gap-2">
        {favorites.map((tool, i) => (
          <motion.span
            key={tool.name}
            initial={{ opacity: 0, scale: 0.82 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.5 + i * 0.045, ease: [0.22, 1, 0.36, 1] }}
            className={`
              px-3 py-1.5 rounded-lg border text-[12px] font-semibold
              transition-all duration-300 cursor-default
              ${pillColor[tool.color]}
            `}
          >
            {tool.name}
          </motion.span>
        ))}
      </div>

      {/* Right quote */}
      <div className="hidden lg:flex flex-col ml-auto shrink-0 text-right border-l border-white/[0.05] pl-5">
        <p className="text-[12px] font-medium text-white/35 leading-snug font-serif italic">
          "I don't chase frameworks.
        </p>
        <p className="text-[12px] font-medium leading-snug italic"
          style={{
            background: "linear-gradient(90deg, #38BDF8, #818CF8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          I master systems."
        </p>
      </div>
    </div>
  </motion.div>
);