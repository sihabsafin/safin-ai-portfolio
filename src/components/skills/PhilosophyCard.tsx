import { motion } from "framer-motion";
import { Quote } from "lucide-react";

interface PhilosophyCardProps {
  inView: boolean;
}

export const PhilosophyCard = ({ inView }: PhilosophyCardProps) => (
  <motion.div
    initial={{ opacity: 0, x: 30, y: 10 }}
    animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
    transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
    className="relative rounded-[1.25rem] border border-white/[0.07] backdrop-blur-xl overflow-hidden max-w-sm self-start shrink-0"
    style={{
      background: "linear-gradient(145deg, hsl(220 40% 10% / 0.9), hsl(220 40% 7% / 0.7))",
    }}
  >
    {/* Gradient border shimmer */}
    <div
      className="absolute inset-0 rounded-[1.25rem] pointer-events-none"
      style={{
        padding: "1px",
        background: "linear-gradient(145deg, hsl(199 89% 60% / 0.3), transparent 50%, hsl(239 84% 60% / 0.2))",
        WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
      }}
    />
    {/* Top glow */}
    <div
      className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
      style={{
        background: "radial-gradient(ellipse at 40% 0%, hsl(199 89% 60% / 0.10), transparent 70%)",
      }}
    />

    <div className="relative p-7">
      <div className="flex items-start gap-3 mb-5">
        <div className="w-7 h-7 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0 mt-0.5">
          <Quote size={13} strokeWidth={1.8} className="text-sky-400" />
        </div>
        <p className="text-[14.5px] font-semibold text-white/90 leading-snug tracking-tight">
          Choosing the right technology is more important than using the newest technology.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-sky-500/25 via-indigo-500/15 to-transparent mb-5" />

      <p className="text-[12px] text-white/40 leading-relaxed font-medium">
        Modern AI products are built with ecosystems, not individual frameworks.
        Architecture decisions made early define the ceiling of what's possible later.
      </p>

      <div className="mt-6 flex items-center gap-2.5">
        <div className="live-dot" />
        <span className="text-[10.5px] font-mono uppercase tracking-[0.18em] text-white/35">
          Build philosophy
        </span>
      </div>
    </div>
  </motion.div>
);