import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export interface NodeData {
  id: string;
  label: string;
  sublabel?: string;
  layer: "models" | "agent" | "memory" | "retrieval" | "backend" | "infra" | "users";
  tags?: string[];
  tooltip?: {
    title: string;
    desc: string;
    meta?: { label: string; value: string }[];
  };
}

const layerColors: Record<string, { bg: string; border: string; text: string; glow: string; tag: string }> = {
  models:    { bg: "bg-blue-500/10",   border: "border-blue-500/30",   text: "text-blue-300",   glow: "0 0 20px hsl(217 91% 60%/0.35)", tag: "bg-blue-500/15 text-blue-300 border-blue-500/25" },
  agent:     { bg: "bg-violet-500/10", border: "border-violet-500/30", text: "text-violet-300", glow: "0 0 20px hsl(263 70%  60%/0.35)", tag: "bg-violet-500/15 text-violet-300 border-violet-500/25" },
  memory:    { bg: "bg-teal-500/10",   border: "border-teal-500/30",   text: "text-teal-300",   glow: "0 0 20px hsl(173 80% 40%/0.35)", tag: "bg-teal-500/15 text-teal-300 border-teal-500/25" },
  retrieval: { bg: "bg-cyan-500/10",   border: "border-cyan-500/30",   text: "text-cyan-300",   glow: "0 0 20px hsl(189 94% 43%/0.35)", tag: "bg-cyan-500/15 text-cyan-300 border-cyan-500/25" },
  backend:   { bg: "bg-indigo-500/10", border: "border-indigo-500/30", text: "text-indigo-300", glow: "0 0 20px hsl(239 84% 60%/0.35)", tag: "bg-indigo-500/15 text-indigo-300 border-indigo-500/25" },
  infra:     { bg: "bg-slate-500/10",  border: "border-slate-500/30",  text: "text-slate-300",  glow: "0 0 20px hsl(215 20%  65%/0.30)", tag: "bg-slate-500/15 text-slate-300 border-slate-500/25" },
  users:     { bg: "bg-white/5",       border: "border-white/20",      text: "text-white/80",   glow: "0 0 20px hsl(0 0% 100%/0.15)",   tag: "bg-white/10 text-white/70 border-white/15" },
};

interface ArchitectureNodeProps {
  node: NodeData;
  hoveredLayer: string | null;
  onHover: (layer: string | null) => void;
  delay?: number;
  inView: boolean;
}

export const ArchitectureNode = ({
  node, hoveredLayer, onHover, delay = 0, inView,
}: ArchitectureNodeProps) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const c = layerColors[node.layer];
  const isDimmed = hoveredLayer !== null && hoveredLayer !== node.layer;
  const isHighlighted = hoveredLayer === node.layer;

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.88, y: 10 }}
      animate={inView ? {
        opacity: isDimmed ? 0.25 : 1,
        scale: isHighlighted ? 1.04 : 1,
        y: 0,
      } : { opacity: 0, scale: 0.88, y: 10 }}
      transition={{ duration: isDimmed || isHighlighted ? 0.2 : 0.5, delay: inView ? delay : 0, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => { onHover(node.layer); setTooltipOpen(true); }}
      onMouseLeave={() => { onHover(null); setTooltipOpen(false); }}
    >
      {/* Breathing glow ring when highlighted */}
      {isHighlighted && (
        <motion.div
          className={`absolute -inset-1 rounded-xl ${c.bg} blur-sm`}
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      <div
        className={`
          relative rounded-xl border px-3.5 py-2.5 cursor-pointer
          flex items-center gap-2.5 transition-all duration-300
          ${c.bg} ${c.border}
          ${isHighlighted ? "shadow-lg" : ""}
        `}
        style={{ boxShadow: isHighlighted ? c.glow : "none" }}
      >
        {/* Pulse dot */}
        {isHighlighted && (
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-current flex-shrink-0"
            style={{ color: c.text.replace("text-", "") }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}

        <div>
          <p className={`text-[12.5px] font-semibold tracking-tight leading-none ${c.text}`}>
            {node.label}
          </p>
          {node.sublabel && (
            <p className="text-[10.5px] text-white/35 mt-0.5 leading-tight font-medium">
              {node.sublabel}
            </p>
          )}
        </div>

        {/* Tags */}
        {node.tags && node.tags.length > 0 && (
          <div className="flex gap-1 ml-auto">
            {node.tags.slice(0, 2).map((t) => (
              <span key={t} className={`px-1.5 py-0.5 rounded text-[9.5px] font-semibold border ${c.tag}`}>
                {t}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {tooltipOpen && node.tooltip && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-50 w-52 pointer-events-none"
          >
            <div
              className="rounded-xl border border-white/[0.1] p-3.5 text-left"
              style={{
                background: "linear-gradient(145deg, hsl(220 40% 11%/0.98), hsl(220 40% 8%/0.95))",
                backdropFilter: "blur(20px)",
                boxShadow: `0 20px 60px hsl(220 50% 2%/0.8), ${c.glow}`,
              }}
            >
              <p className={`text-[12px] font-bold mb-1 ${c.text}`}>{node.tooltip.title}</p>
              <p className="text-[11px] text-white/50 leading-relaxed mb-2.5">{node.tooltip.desc}</p>
              {node.tooltip.meta && (
                <div className="flex flex-col gap-1 border-t border-white/[0.06] pt-2">
                  {node.tooltip.meta.map((m) => (
                    <div key={m.label} className="flex justify-between items-center">
                      <span className="text-[10px] text-white/35 font-medium">{m.label}</span>
                      <span className={`text-[10px] font-bold ${c.text}`}>{m.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Arrow */}
            <div
              className="w-2 h-2 mx-auto rotate-45 -mt-1 border-r border-b border-white/[0.1]"
              style={{ background: "hsl(220 40% 9%)" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};