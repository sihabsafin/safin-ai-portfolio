import { motion } from "framer-motion";

const metrics = [
  { label: "Latency",      value: "18ms",    unit: "",     color: "text-emerald-400", border: "border-emerald-500/20", bg: "bg-emerald-500/5" },
  { label: "Context",      value: "200K",    unit: "tok",  color: "text-blue-400",    border: "border-blue-500/20",    bg: "bg-blue-500/5" },
  { label: "Throughput",   value: "2.4M",    unit: "/day", color: "text-violet-400",  border: "border-violet-500/20",  bg: "bg-violet-500/5" },
  { label: "Availability", value: "99.9",    unit: "%",    color: "text-sky-400",     border: "border-sky-500/20",     bg: "bg-sky-500/5" },
  { label: "Memory",       value: "Active",  unit: "",     color: "text-teal-400",    border: "border-teal-500/20",    bg: "bg-teal-500/5" },
  { label: "Agents",       value: "6",       unit: "live", color: "text-indigo-400",  border: "border-indigo-500/20",  bg: "bg-indigo-500/5" },
];

const floatVariants = [
  { x: [0, 6, -4, 0],  y: [0, -8, 4, 0],  duration: 7  },
  { x: [0, -5, 7, 0],  y: [0, 6, -9, 0],  duration: 9  },
  { x: [0, 8, -3, 0],  y: [0, -5, 7, 0],  duration: 8  },
  { x: [0, -7, 5, 0],  y: [0, 8, -4, 0],  duration: 10 },
  { x: [0, 5, -8, 0],  y: [0, -6, 3, 0],  duration: 7.5 },
  { x: [0, -4, 6, 0],  y: [0, 7, -5, 0],  duration: 9.5 },
];

interface FloatingMetricsProps {
  inView: boolean;
}

export const FloatingMetrics = ({ inView }: FloatingMetricsProps) => (
  <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 my-8">
    {metrics.map((m, i) => {
      const fv = floatVariants[i % floatVariants.length];
      return (
        <motion.div
          key={m.label}
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            animate={inView ? { x: fv.x, y: fv.y } : {}}
            transition={{ duration: fv.duration, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }}
            className={`
              rounded-xl border ${m.border} ${m.bg}
              backdrop-blur-md px-3 py-2.5 text-center
              hover:scale-105 transition-transform duration-300
            `}
          >
            <div className={`text-[15px] font-bold tabular-nums leading-none ${m.color}`}>
              {m.value}
              {m.unit && <span className="text-[9px] font-semibold ml-0.5 opacity-70">{m.unit}</span>}
            </div>
            <div className="text-[9.5px] text-white/30 font-medium mt-1 uppercase tracking-wider">
              {m.label}
            </div>
          </motion.div>
        </motion.div>
      );
    })}
  </div>
);