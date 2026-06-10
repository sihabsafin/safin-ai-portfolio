import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Bot,
  Database,
  Mic,
  Server,
  Workflow,
  BrainCircuit,
} from "lucide-react";
import { FeaturedProjectCard } from "./currently-building/FeaturedProjectCard";
import { LiveModuleCard, type LiveModule } from "./currently-building/LiveModuleCard";
import { Metrics } from "./currently-building/Metrics";

const modules: LiveModule[] = [
  {
    icon: Bot,
    title: "Autonomous AI Agents",
    description: "Self-directed agents that plan, execute, and recover from failures in long-horizon tasks.",
    status: "production",
    tags: ["LangGraph", "CrewAI", "FastAPI"],
  },
  {
    icon: Database,
    title: "Enterprise RAG",
    description: "Hybrid dense-sparse retrieval with re-ranking for large-scale knowledge bases.",
    status: "live",
    tags: ["LlamaIndex", "Pinecone", "Redis"],
  },
  {
    icon: Mic,
    title: "Voice AI",
    description: "Real-time voice interfaces with sub-200ms latency for conversational AI products.",
    status: "research",
    tags: ["Whisper", "ElevenLabs", "WebRTC"],
  },
  {
    icon: Server,
    title: "MCP Servers",
    description: "Model Context Protocol servers exposing enterprise tools to LLM runtimes.",
    status: "building",
    tags: ["MCP SDK", "TypeScript", "Docker"],
  },
  {
    icon: Workflow,
    title: "Multi-Agent Systems",
    description: "Orchestrating specialized agent graphs for complex enterprise automation pipelines.",
    status: "building",
    tags: ["LangGraph", "Redis", "AWS"],
  },
  {
    icon: BrainCircuit,
    title: "Realtime AI Apps",
    description: "Streaming inference, live context injection and sub-second LLM response UI.",
    status: "experimental",
    tags: ["OpenAI", "Vercel AI SDK", "SSE"],
  },
];

export const CurrentlyBuildingSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 80% 20%, rgba(79,70,229,0.07), transparent 60%), " +
            "radial-gradient(ellipse 40% 40% at 10% 70%, rgba(56,189,248,0.05), transparent 60%)",
        }}
      />
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div
        ref={ref}
        className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-10 relative z-10"
      >
        {/* Section Header */}
        <div className="mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <span className="live-dot" />
            <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground">
              Currently Building
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.06 }}
          >
            <h2 className="text-[38px] sm:text-5xl lg:text-6xl font-semibold tracking-[-0.04em] leading-[1.02] mb-6">
              <span className="text-foreground">Currently</span>
              <br />
              <span className="serif-italic gradient-text-accent">Building</span>
            </h2>
            <p
              className="text-base text-muted-foreground max-w-sm leading-relaxed italic border-l-2 pl-4"
              style={{ borderColor: "rgba(56,189,248,0.3)" }}
            >
              I don't ship demos.
              <br />
              I build AI systems that survive production.
            </p>
          </motion.div>
        </div>

        {/* Main Grid: Featured + Modules */}
        <div className="grid lg:grid-cols-12 gap-5 mb-8">
          {/* Left: Featured Card */}
          <div className="lg:col-span-5">
            <FeaturedProjectCard />
          </div>

          {/* Right: 6 Live Module Cards */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 xl:grid-cols-3 gap-4 content-start">
            {modules.map((mod, i) => (
              <LiveModuleCard key={mod.title} module={mod} index={i} inView={inView} />
            ))}
          </div>
        </div>

        {/* Metrics Strip */}
        <Metrics />
      </div>
    </section>
  );
};