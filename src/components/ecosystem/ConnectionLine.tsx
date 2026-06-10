import { motion } from "framer-motion";

interface ConnectionLineProps {
  fromLayer: string;
  toLayer: string;
  hoveredLayer: string | null;
  inView: boolean;
  delay?: number;
}

const layerGradients: Record<string, string> = {
  "models-agent":     "from-blue-500/60 via-violet-500/40 to-violet-500/60",
  "agent-memory":     "from-violet-500/60 via-teal-500/40 to-teal-500/60",
  "agent-retrieval":  "from-violet-500/60 via-cyan-500/40 to-cyan-500/60",
  "retrieval-backend":"from-cyan-500/60 via-indigo-500/40 to-indigo-500/60",
  "memory-backend":   "from-teal-500/60 via-indigo-500/40 to-indigo-500/60",
  "backend-infra":    "from-indigo-500/60 via-slate-500/40 to-slate-500/60",
  "infra-users":      "from-slate-500/60 via-white/30 to-white/40",
};

const connectorKey = (a: string, b: string) =>
  `${a}-${b}` in layerGradients ? `${a}-${b}` : `${b}-${a}`;

export const ConnectionLine = ({
  fromLayer, toLayer, hoveredLayer, inView, delay = 0,
}: ConnectionLineProps) => {
  const key = connectorKey(fromLayer, toLayer);
  const gradientClass = layerGradients[key] || "from-white/20 to-white/20";

  const isActive =
    hoveredLayer === fromLayer ||
    hoveredLayer === toLayer ||
    hoveredLayer === null;

  return (
    <div className="relative flex flex-col items-center w-full py-1" aria-hidden>
      {/* Static gradient line */}
      <motion.div
        initial={{ scaleY: 0, opacity: 0 }}
        animate={inView ? { scaleY: 1, opacity: isActive ? 1 : 0.15 } : { scaleY: 0, opacity: 0 }}
        transition={{ duration: 0.5, delay, ease: "easeOut" }}
        style={{ transformOrigin: "top" }}
        className={`w-px h-8 bg-gradient-to-b ${gradientClass} transition-opacity duration-300`}
      />

      {/* Travelling particle */}
      {inView && (
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
          style={{ background: "white", opacity: isActive ? 0.7 : 0 }}
          animate={{ y: [0, 34, 0] }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay + Math.random() * 1.5,
          }}
        />
      )}

      {/* Chevron arrow */}
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={inView ? { opacity: isActive ? 0.55 : 0.12, y: 0 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay: delay + 0.15 }}
        className="transition-opacity duration-300"
      >
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
          <path
            d="M1 1L5 5L9 1"
            stroke="white"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </div>
  );
};