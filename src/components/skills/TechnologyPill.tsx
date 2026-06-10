import { motion } from "framer-motion";

interface TechnologyPillProps {
  label: string;
  index?: number;
  highlight?: boolean;
}

export const TechnologyPill = ({ label, index = 0, highlight = false }: TechnologyPillProps) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.82, y: 4 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 0.28, delay: index * 0.025, ease: [0.22, 1, 0.36, 1] }}
    className={`
      inline-flex items-center px-2.5 py-[5px] rounded-lg text-[11.5px] font-medium
      transition-all duration-300 cursor-default select-none group
      ${highlight
        ? "bg-sky-500/10 border border-sky-500/30 text-sky-300 hover:bg-sky-500/20 hover:border-sky-400/60 hover:text-white shadow-[0_0_12px_hsl(199_89%_60%/0.08)]"
        : "bg-white/[0.03] border border-white/[0.07] text-white/60 hover:border-white/20 hover:text-white/90 hover:bg-white/[0.06]"
      }
    `}
  >
    {label}
  </motion.span>
);