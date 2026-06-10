import { motion } from "framer-motion";
import {
  Sparkles, Cpu, Database, Search, ServerCog,
  Cloud, Activity, Users
} from "lucide-react";

interface TechItem {
  name: string;
  desc?: string;
  badge?: string;
}

interface TechCategoryData {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  layer: string;
  items: TechItem[];
}

const layerStyle: Record<string, { border: string; iconBg: string; iconText: string; badge: string; divider: string; hover: string }> = {
  models:    { border: "border-blue-500/20",   iconBg: "bg-blue-500/10 border-blue-500/20",    iconText: "text-blue-400",    badge: "bg-blue-500/12 text-blue-300 border-blue-400/25",    divider: "from-blue-500/20",   hover: "hover:border-blue-500/30" },
  agent:     { border: "border-violet-500/20", iconBg: "bg-violet-500/10 border-violet-500/20", iconText: "text-violet-400",  badge: "bg-violet-500/12 text-violet-300 border-violet-400/25", divider: "from-violet-500/20", hover: "hover:border-violet-500/30" },
  memory:    { border: "border-teal-500/20",   iconBg: "bg-teal-500/10 border-teal-500/20",    iconText: "text-teal-400",    badge: "bg-teal-500/12 text-teal-300 border-teal-400/25",    divider: "from-teal-500/20",   hover: "hover:border-teal-500/30" },
  retrieval: { border: "border-cyan-500/20",   iconBg: "bg-cyan-500/10 border-cyan-500/20",    iconText: "text-cyan-400",    badge: "bg-cyan-500/12 text-cyan-300 border-cyan-400/25",    divider: "from-cyan-500/20",   hover: "hover:border-cyan-500/30" },
  backend:   { border: "border-indigo-500/20", iconBg: "bg-indigo-500/10 border-indigo-500/20", iconText: "text-indigo-400",  badge: "bg-indigo-500/12 text-indigo-300 border-indigo-400/25", divider: "from-indigo-500/20", hover: "hover:border-indigo-500/30" },
  infra:     { border: "border-slate-500/20",  iconBg: "bg-slate-500/10 border-slate-500/20",  iconText: "text-slate-400",   badge: "bg-slate-500/12 text-slate-300 border-slate-400/25",  divider: "from-slate-500/20",  hover: "hover:border-slate-500/30" },
  monitoring:{ border: "border-emerald-500/20",iconBg: "bg-emerald-500/10 border-emerald-500/20",iconText:"text-emerald-400", badge: "bg-emerald-500/12 text-emerald-300 border-emerald-400/25", divider: "from-emerald-500/20", hover: "hover:border-emerald-500/30" },
};

export const categories: TechCategoryData[] = [
  {
    icon: <Sparkles size={14} strokeWidth={1.8} />,
    title: "Foundation Models",
    subtitle: "Enterprise reasoning engines",
    layer: "models",
    items: [
      { name: "OpenAI GPT-4o", desc: "200K context · Function Calling", badge: "Prod" },
      { name: "Anthropic Claude", desc: "Long context · Safety aligned", badge: "Prod" },
      { name: "Gemini 1.5", desc: "Multimodal · Realtime", badge: "Exp" },
      { name: "Llama 3", desc: "Open source · Self-hosted" },
    ],
  },
  {
    icon: <Cpu size={14} strokeWidth={1.8} />,
    title: "Agent Frameworks",
    subtitle: "Orchestration & multi-step reasoning",
    layer: "agent",
    items: [
      { name: "LangGraph", desc: "State machines · Cycles", badge: "Core" },
      { name: "CrewAI", desc: "Multi-agent · Role-based" },
      { name: "DSPy", desc: "Programmatic prompting" },
      { name: "AutoGen", desc: "Microsoft · Code gen" },
      { name: "LlamaIndex", desc: "Data connectors · RAG" },
      { name: "Haystack", desc: "Pipelines · Enterprise" },
    ],
  },
  {
    icon: <Database size={14} strokeWidth={1.8} />,
    title: "Memory Layer",
    subtitle: "Conversation & knowledge persistence",
    layer: "memory",
    items: [
      { name: "Redis", desc: "Session memory · Sub-ms", badge: "Core" },
      { name: "Mem0", desc: "Persistent AI memory" },
      { name: "PostgreSQL", desc: "Long-term structured" },
      { name: "MongoDB", desc: "Document memory store" },
    ],
  },
  {
    icon: <Search size={14} strokeWidth={1.8} />,
    title: "Retrieval Layer",
    subtitle: "Semantic + hybrid search",
    layer: "retrieval",
    items: [
      { name: "Pinecone", desc: "Managed · Prod-ready", badge: "Core" },
      { name: "Qdrant", desc: "Self-hosted · Fast" },
      { name: "Weaviate", desc: "Graph + vector" },
      { name: "Milvus", desc: "Billion-scale" },
      { name: "FAISS", desc: "In-memory · Research" },
      { name: "Chroma", desc: "Local dev · Prototype" },
    ],
  },
  {
    icon: <ServerCog size={14} strokeWidth={1.8} />,
    title: "Backend & APIs",
    subtitle: "High-throughput service layer",
    layer: "backend",
    items: [
      { name: "FastAPI", desc: "Async · OpenAPI", badge: "Core" },
      { name: "Django", desc: "Admin · ORM" },
      { name: "Node.js", desc: "Event loop · Streaming" },
      { name: "GraphQL", desc: "Flexible queries" },
      { name: "WebSockets", desc: "Realtime streaming" },
    ],
  },
  {
    icon: <Cloud size={14} strokeWidth={1.8} />,
    title: "Infrastructure",
    subtitle: "Production-grade deployment",
    layer: "infra",
    items: [
      { name: "AWS", desc: "EC2 · ECS · Lambda", badge: "Core" },
      { name: "Docker", desc: "Containerization" },
      { name: "Kubernetes", desc: "Orchestration · Scale" },
      { name: "Cloudflare", desc: "Edge · CDN" },
      { name: "GitHub Actions", desc: "CI/CD · Automation" },
      { name: "Railway", desc: "Fast deploy · Dev" },
    ],
  },
  {
    icon: <Activity size={14} strokeWidth={1.8} />,
    title: "Monitoring & Evals",
    subtitle: "Observability & LLM quality",
    layer: "monitoring",
    items: [
      { name: "MLflow", desc: "Experiment tracking", badge: "Core" },
      { name: "Weights & Biases", desc: "ML observability" },
      { name: "RAGAS", desc: "RAG evaluation" },
      { name: "Promptfoo", desc: "Prompt testing" },
      { name: "Grafana", desc: "Dashboards · Metrics" },
      { name: "OpenTelemetry", desc: "Distributed tracing" },
    ],
  },
];

interface TechnologyCategoryProps {
  data: TechCategoryData;
  index: number;
  inView: boolean;
}

export const TechnologyCategory = ({ data, index, inView }: TechnologyCategoryProps) => {
  const s = layerStyle[data.layer];

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className={`
        group relative rounded-[1.25rem] border ${s.border} ${s.hover}
        bg-gradient-to-b from-white/[0.035] to-white/[0.01]
        backdrop-blur-xl p-5 flex flex-col gap-4
        transition-all duration-400
        hover:-translate-y-0.5
      `}
    >
      {/* Top shimmer */}
      <div className="absolute inset-x-0 top-0 h-px rounded-t-[1.25rem] bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />

      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className={`w-[30px] h-[30px] rounded-lg border flex items-center justify-center shrink-0 ${s.iconBg} ${s.iconText}`}>
            {data.icon}
          </div>
          <div>
            <h3 className="text-[12.5px] font-bold tracking-tight text-white/85 leading-none">
              {data.title}
            </h3>
            <p className="text-[10.5px] text-white/30 mt-0.5 font-medium leading-none">
              {data.subtitle}
            </p>
          </div>
        </div>
        <span className={`text-[9.5px] font-mono text-white/20 mt-0.5`}>
          {String(data.items.length).padStart(2, "0")}
        </span>
      </div>

      {/* Divider */}
      <div className={`h-px bg-gradient-to-r ${s.divider} via-transparent to-transparent opacity-60`} />

      {/* Items */}
      <div className="flex flex-col gap-2">
        {data.items.map((item) => (
          <div key={item.name} className="flex items-center justify-between gap-2 group/item">
            <div>
              <span className="text-[12px] font-semibold text-white/75 group-hover/item:text-white/90 transition-colors">
                {item.name}
              </span>
              {item.desc && (
                <p className="text-[10.5px] text-white/28 font-medium leading-tight mt-0.5">
                  {item.desc}
                </p>
              )}
            </div>
            {item.badge && (
              <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold border shrink-0 ${s.badge}`}>
                {item.badge}
              </span>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};