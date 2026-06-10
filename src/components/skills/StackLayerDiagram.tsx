import { motion } from "framer-motion";
import {
  MonitorSmartphone, Cpu, Sparkles, Fingerprint,
  Layers, HardDrive, FlaskConical, CloudCog
} from "lucide-react";

const layers = [
  {
    icon: <MonitorSmartphone size={14} strokeWidth={1.7} />,
    label: "Application Layer",
    sub: "User-facing interfaces, APIs, WebSockets",
    color: "sky",
    tools: ["FastAPI", "Django", "Next.js", "GraphQL"],
  },
  {
    icon: <Cpu size={14} strokeWidth={1.7} />,
    label: "AI Agent Layer",
    sub: "Orchestration, reasoning, multi-agent workflows",
    color: "violet",
    tools: ["LangGraph", "CrewAI", "AutoGen", "DSPy"],
  },
  {
    icon: <Sparkles size={14} strokeWidth={1.7} />,
    label: "LLM Layer",
    sub: "Foundation models, inference, function calling",
    color: "indigo",
    tools: ["OpenAI", "Claude", "Gemini", "Groq", "Ollama"],
  },
  {
    icon: <Fingerprint size={14} strokeWidth={1.7} />,
    label: "Embedding Layer",
    sub: "Semantic encoding, reranking, dense retrieval",
    color: "sky",
    tools: ["Sentence Transformers", "OpenAI Embed", "Cohere"],
  },
  {
    icon: <Layers size={14} strokeWidth={1.7} />,
    label: "Vector Database",
    sub: "Similarity search, hybrid retrieval, ANN indexes",
    color: "emerald",
    tools: ["Pinecone", "Qdrant", "Weaviate", "FAISS"],
  },
  {
    icon: <HardDrive size={14} strokeWidth={1.7} />,
    label: "Data & Backend",
    sub: "Structured storage, caching, search indexes",
    color: "sky",
    tools: ["PostgreSQL", "Redis", "MongoDB", "ElasticSearch"],
  },
  {
    icon: <FlaskConical size={14} strokeWidth={1.7} />,
    label: "MLOps & Evaluation",
    sub: "Experiment tracking, monitoring, prompt evals",
    color: "violet",
    tools: ["MLflow", "W&B", "RAGAS", "Promptfoo"],
  },
  {
    icon: <CloudCog size={14} strokeWidth={1.7} />,
    label: "Cloud Infrastructure",
    sub: "Compute, containers, orchestration, CI/CD",
    color: "indigo",
    tools: ["AWS", "Docker", "Kubernetes", "GitHub Actions"],
  },
];

const colorMap: Record<string, {
  bar: string; barRgb: string; text: string; tool: string;
  nodeBg: string; nodeBorder: string; nodeText: string; cardHover: string;
}> = {
  sky: {
    bar: "bg-sky-500", barRgb: "hsl(199 89% 60%)",
    text: "text-sky-400",
    tool: "bg-sky-500/10 text-sky-300 border-sky-500/20",
    nodeBg: "bg-sky-500/10", nodeBorder: "border-sky-500/30", nodeText: "text-sky-400",
    cardHover: "hover:border-sky-500/20",
  },
  violet: {
    bar: "bg-violet-500", barRgb: "hsl(263 70% 60%)",
    text: "text-violet-400",
    tool: "bg-violet-500/10 text-violet-300 border-violet-500/20",
    nodeBg: "bg-violet-500/10", nodeBorder: "border-violet-500/30", nodeText: "text-violet-400",
    cardHover: "hover:border-violet-500/20",
  },
  indigo: {
    bar: "bg-indigo-500", barRgb: "hsl(239 84% 60%)",
    text: "text-indigo-400",
    tool: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
    nodeBg: "bg-indigo-500/10", nodeBorder: "border-indigo-500/30", nodeText: "text-indigo-400",
    cardHover: "hover:border-indigo-500/20",
  },
  emerald: {
    bar: "bg-emerald-500", barRgb: "hsl(152 76% 50%)",
    text: "text-emerald-400",
    tool: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    nodeBg: "bg-emerald-500/10", nodeBorder: "border-emerald-500/30", nodeText: "text-emerald-400",
    cardHover: "hover:border-emerald-500/20",
  },
};

interface StackLayerDiagramProps {
  inView: boolean;
}

export const StackLayerDiagram = ({ inView }: StackLayerDiagramProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative flex flex-col">
        {layers.map((layer, i) => {
          const c = colorMap[layer.color];
          const isLast = i === layers.length - 1;

          return (
            <div key={layer.label} className="relative flex flex-col items-center">

              {/* ── Node + Card row ── */}
              <div className="w-full flex items-center gap-4">

                {/* Node circle */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.35, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className={`
                    relative shrink-0 w-9 h-9 rounded-full border
                    flex items-center justify-center
                    ${c.nodeBg} ${c.nodeBorder} ${c.nodeText}
                    shadow-[0_0_16px_var(--glow)]
                  `}
                  style={{ "--glow": `${c.barRgb}33` } as React.CSSProperties}
                >
                  {layer.icon}
                  {/* Ping ring on first item */}
                  {i === 0 && (
                    <span
                      className={`absolute inset-0 rounded-full animate-ping opacity-20 ${c.bar}`}
                      style={{ animationDuration: "2.5s" }}
                    />
                  )}
                </motion.div>

                {/* Card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.08 + 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className={`
                    flex-1 group
                    rounded-xl border border-white/[0.06]
                    bg-gradient-to-r from-white/[0.035] to-white/[0.015]
                    backdrop-blur-md px-4 py-3
                    flex flex-col sm:flex-row sm:items-center gap-3
                    transition-all duration-300
                    hover:-translate-y-px
                    ${c.cardHover}
                  `}
                >
                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <span className={`text-[12.5px] font-semibold tracking-tight ${c.text}`}>
                      {layer.label}
                    </span>
                    <p className="text-[11px] text-white/35 leading-relaxed mt-0.5 font-medium">
                      {layer.sub}
                    </p>
                  </div>
                  {/* Tool chips */}
                  <div className="flex flex-wrap gap-1.5 shrink-0">
                    {layer.tools.map((t) => (
                      <span
                        key={t}
                        className={`px-2 py-0.5 rounded-md text-[10.5px] font-medium border ${c.tool}`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* ── Connector below (arrow) ── */}
              {!isLast && (
                <motion.div
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={inView ? { opacity: 1, scaleY: 1 } : {}}
                  transition={{ duration: 0.3, delay: i * 0.08 + 0.2, ease: "easeOut" }}
                  style={{ transformOrigin: "top" }}
                  className="flex flex-col items-center w-9 py-0.5 gap-0"
                >
                  {/* Dashed line segment */}
                  <div
                    className="w-px flex-1"
                    style={{
                      height: "22px",
                      background: `linear-gradient(to bottom, ${c.barRgb}55, ${colorMap[layers[i + 1].color].barRgb}55)`,
                    }}
                  />
                  {/* Arrow chevron */}
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    className="opacity-50"
                  >
                    <path
                      d="M1 1L5 5L9 1"
                      stroke={c.barRgb}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};