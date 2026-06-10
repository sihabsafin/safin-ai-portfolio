import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const scenarios = [
  {
    id: "healthcare",
    label: "Healthcare AI",
    color: "text-blue-300",
    border: "border-blue-500/25",
    bg: "bg-blue-500/8",
    steps: [
      { label: "Doctor Query",      layer: "users",     icon: "👨‍⚕️" },
      { label: "Medical Records",   layer: "retrieval", icon: "📋" },
      { label: "Embedding + Search",layer: "retrieval", icon: "🔍" },
      { label: "Claude / GPT-4",    layer: "models",    icon: "✦" },
      { label: "Agent Reasoning",   layer: "agent",     icon: "🧠" },
      { label: "Diagnosis Summary", layer: "users",     icon: "💊" },
    ],
  },
  {
    id: "legal",
    label: "Legal AI",
    color: "text-violet-300",
    border: "border-violet-500/25",
    bg: "bg-violet-500/8",
    steps: [
      { label: "Contract Upload",   layer: "users",     icon: "📄" },
      { label: "Chunking + Embed",  layer: "retrieval", icon: "🔎" },
      { label: "Vector Search",     layer: "retrieval", icon: "🗄️" },
      { label: "OpenAI GPT-4o",     layer: "models",    icon: "✦" },
      { label: "Risk Analysis",     layer: "agent",     icon: "⚖️" },
      { label: "Lawyer Summary",    layer: "users",     icon: "📝" },
    ],
  },
  {
    id: "support",
    label: "Customer Support AI",
    color: "text-emerald-300",
    border: "border-emerald-500/25",
    bg: "bg-emerald-500/8",
    steps: [
      { label: "Customer Message",  layer: "users",     icon: "💬" },
      { label: "Intent Detection",  layer: "agent",     icon: "🎯" },
      { label: "CRM + Knowledge",   layer: "retrieval", icon: "📚" },
      { label: "LLM Response Gen",  layer: "models",    icon: "✦" },
      { label: "Quality Check",     layer: "infra",     icon: "✅" },
      { label: "Agent Response",    layer: "users",     icon: "🤖" },
    ],
  },
];

const layerColors: Record<string, string> = {
  users:     "bg-white/8 border-white/15 text-white/75",
  models:    "bg-blue-500/12 border-blue-500/30 text-blue-300",
  agent:     "bg-violet-500/12 border-violet-500/30 text-violet-300",
  retrieval: "bg-cyan-500/12 border-cyan-500/30 text-cyan-300",
  backend:   "bg-indigo-500/12 border-indigo-500/30 text-indigo-300",
  infra:     "bg-slate-500/12 border-slate-500/30 text-slate-300",
};

interface ScenarioSwitcherProps {
  inView: boolean;
}

export const ScenarioSwitcher = ({ inView }: ScenarioSwitcherProps) => {
  const [active, setActive] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);

  // Auto-rotate scenarios every 6s
  useEffect(() => {
    if (!inView) return;
    const t = setInterval(() => {
      setActive((p) => (p + 1) % scenarios.length);
      setStepIdx(0);
    }, 6000);
    return () => clearInterval(t);
  }, [inView]);

  // Animate steps sequentially
  useEffect(() => {
    if (!inView) return;
    const s = scenarios[active];
    if (stepIdx < s.steps.length - 1) {
      const t = setTimeout(() => setStepIdx((p) => p + 1), 700);
      return () => clearTimeout(t);
    }
  }, [active, stepIdx, inView]);

  const scenario = scenarios[active];

  return (
    <div className="rounded-2xl border border-white/[0.07] overflow-hidden"
      style={{ background: "linear-gradient(145deg, hsl(220 40% 9%/0.9), hsl(220 40% 7%/0.8))" }}
    >
      {/* Tabs */}
      <div className="flex border-b border-white/[0.06] px-4 pt-4 gap-1">
        {scenarios.map((s, i) => (
          <button
            key={s.id}
            onClick={() => { setActive(i); setStepIdx(0); }}
            className={`
              px-3.5 py-1.5 rounded-t-lg text-[11.5px] font-semibold
              transition-all duration-300 border-b-2
              ${active === i
                ? `${s.color} border-current bg-white/[0.04]`
                : "text-white/35 border-transparent hover:text-white/60"
              }
            `}
          >
            {s.label}
          </button>
        ))}
        {/* Progress bar */}
        <div className="ml-auto self-center flex items-center gap-1.5 pb-1.5">
          {scenarios.map((_, i) => (
            <motion.div
              key={i}
              className="h-1 rounded-full bg-white/20 overflow-hidden"
              style={{ width: active === i ? 28 : 8 }}
              animate={{ width: active === i ? 28 : 8 }}
              transition={{ duration: 0.3 }}
            >
              {active === i && (
                <motion.div
                  className="h-full bg-white/60 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 6, ease: "linear" }}
                  key={active}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Flow steps */}
      <div className="p-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={scenario.id}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row sm:items-center gap-2 flex-wrap"
          >
            {scenario.steps.map((step, i) => (
              <div key={i} className="flex items-center gap-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: i <= stepIdx ? 1 : 0.2, scale: i <= stepIdx ? 1 : 0.85 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className={`
                    flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[11.5px] font-semibold
                    transition-all duration-300
                    ${layerColors[step.layer]}
                  `}
                >
                  <span className="text-sm leading-none">{step.icon}</span>
                  {step.label}
                </motion.div>
                {i < scenario.steps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: i < stepIdx ? 0.5 : 0.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                      <path d="M1 5H13M9 1L13 5L9 9" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.div>
                )}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        <p className="text-[10.5px] text-white/25 font-mono mt-3">
          Live scenario · auto-rotating · click tabs to switch
        </p>
      </div>
    </div>
  );
};