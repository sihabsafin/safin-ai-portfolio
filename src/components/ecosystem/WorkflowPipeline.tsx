import { motion } from "framer-motion";

const steps = [
  { label: "Business Problem", icon: "💡", color: "text-yellow-400",  border: "border-yellow-500/25",  bg: "bg-yellow-500/8"  },
  { label: "Research",         icon: "🔬", color: "text-blue-400",    border: "border-blue-500/25",    bg: "bg-blue-500/8"    },
  { label: "Prototype",        icon: "⚡", color: "text-violet-400",  border: "border-violet-500/25",  bg: "bg-violet-500/8"  },
  { label: "RAG Pipeline",     icon: "🔍", color: "text-cyan-400",    border: "border-cyan-500/25",    bg: "bg-cyan-500/8"    },
  { label: "Evaluation",       icon: "📊", color: "text-indigo-400",  border: "border-indigo-500/25",  bg: "bg-indigo-500/8"  },
  { label: "Deployment",       icon: "🚀", color: "text-sky-400",     border: "border-sky-500/25",     bg: "bg-sky-500/8"     },
  { label: "Monitoring",       icon: "👁", color: "text-emerald-400", border: "border-emerald-500/25", bg: "bg-emerald-500/8" },
  { label: "Optimization",     icon: "🎯", color: "text-orange-400",  border: "border-orange-500/25",  bg: "bg-orange-500/8"  },
  { label: "Production",       icon: "✦", color: "text-white/80",    border: "border-white/20",       bg: "bg-white/5"       },
];

interface WorkflowPipelineProps {
  inView: boolean;
}

export const WorkflowPipeline = ({ inView }: WorkflowPipelineProps) => (
  <div className="w-full">
    <div className="flex flex-wrap items-center gap-y-3 gap-x-0">
      {steps.map((step, i) => (
        <div key={step.label} className="flex items-center">
          {/* Step node */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            className={`
              flex flex-col items-center gap-1.5 px-3 py-2.5 rounded-xl border
              ${step.border} ${step.bg} transition-all duration-300
              hover:scale-105 hover:-translate-y-0.5 cursor-default
            `}
          >
            <span className="text-base leading-none">{step.icon}</span>
            <span className={`text-[10.5px] font-bold ${step.color} whitespace-nowrap`}>
              {step.label}
            </span>
          </motion.div>

          {/* Arrow connector */}
          {i < steps.length - 1 && (
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={inView ? { opacity: 1, scaleX: 1 } : {}}
              transition={{ duration: 0.3, delay: i * 0.07 + 0.2 }}
              style={{ transformOrigin: "left" }}
              className="flex items-center mx-1"
            >
              <div className="w-4 h-px bg-white/15" />
              <svg width="6" height="8" viewBox="0 0 6 8" fill="none" className="opacity-30">
                <path d="M1 1L5 4L1 7" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          )}
        </div>
      ))}
    </div>
  </div>
);