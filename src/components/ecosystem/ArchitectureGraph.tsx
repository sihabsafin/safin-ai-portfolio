import { useState } from "react";
import { ArchitectureNode, NodeData } from "./ArchitectureNode";
import { ConnectionLine } from "./ConnectionLine";

const architectureLayers: { id: string; label: string; nodes: NodeData[] }[] = [
  {
    id: "models",
    label: "Foundation Models",
    nodes: [
      { id: "openai",  label: "OpenAI GPT-4o",  layer: "models",    tags: ["200K", "Tools"], tooltip: { title: "OpenAI GPT-4o", desc: "Primary reasoning model for complex tasks, function calling, and structured output.", meta: [{ label: "Context Window", value: "200K" }, { label: "Function Calling", value: "Enabled" }, { label: "Latency", value: "~800ms" }] } },
      { id: "claude",  label: "Anthropic Claude",layer: "models",    tags: ["200K", "Safe"],  tooltip: { title: "Anthropic Claude 3.5", desc: "Long-context analysis, safety-critical workflows, document understanding.", meta: [{ label: "Context Window", value: "200K" }, { label: "Safety", value: "Constitutional AI" }] } },
      { id: "gemini",  label: "Gemini 1.5",      layer: "models",    tags: ["Multi"],          tooltip: { title: "Google Gemini 1.5", desc: "Multimodal tasks — vision, audio, and realtime use cases.", meta: [{ label: "Modalities", value: "Text + Vision + Audio" }] } },
      { id: "llama",   label: "Llama 3 (Local)", layer: "models",    tags: ["OSS"],            tooltip: { title: "Meta Llama 3", desc: "Self-hosted open-source model for private or cost-sensitive pipelines.", meta: [{ label: "Hosting", value: "Self-hosted (Ollama)" }] } },
    ],
  },
  {
    id: "agent",
    label: "Agent Orchestrator",
    nodes: [
      { id: "langgraph", label: "LangGraph",  sublabel: "State machine orchestration", layer: "agent", tags: ["Core"], tooltip: { title: "LangGraph", desc: "Stateful multi-step agent workflows with cycles, branching, and human-in-the-loop.", meta: [{ label: "Pattern", value: "Graph-based" }, { label: "Cycles", value: "Supported" }] } },
      { id: "crewai",    label: "CrewAI",     sublabel: "Role-based multi-agent",       layer: "agent", tooltip: { title: "CrewAI", desc: "Specialized agents with defined roles working collaboratively toward a goal." } },
      { id: "dspy",      label: "DSPy",       sublabel: "Programmatic prompting",       layer: "agent", tooltip: { title: "DSPy", desc: "Compile prompts and fine-tune LM programs instead of hand-writing prompts." } },
    ],
  },
  {
    id: "memory",
    label: "Memory Layer",
    nodes: [
      { id: "redis-mem",  label: "Redis",       sublabel: "Session & short-term",  layer: "memory", tags: ["<1ms"], tooltip: { title: "Redis Memory", desc: "Ultra-fast conversation context storage. Sub-millisecond read/write.", meta: [{ label: "Latency", value: "<1ms" }, { label: "Type", value: "In-memory" }] } },
      { id: "conv-mem",   label: "Mem0",         sublabel: "Persistent AI memory",  layer: "memory", tooltip: { title: "Mem0", desc: "Long-term personal memory that persists across sessions and users." } },
      { id: "pg-mem",     label: "PostgreSQL",   sublabel: "Structured long-term",  layer: "memory", tooltip: { title: "PostgreSQL Memory", desc: "Durable structured storage for facts, preferences, and historical context." } },
    ],
  },
  {
    id: "retrieval",
    label: "Retrieval Layer",
    nodes: [
      { id: "embed",     label: "Embedding Model",  sublabel: "Semantic encoding",     layer: "retrieval", tags: ["1536d"],  tooltip: { title: "Embedding Model", desc: "Converts text into dense vector representations for semantic search.", meta: [{ label: "Model", value: "text-embedding-3-large" }, { label: "Dims", value: "1536" }] } },
      { id: "vectordb",  label: "Vector DB",        sublabel: "Pinecone · Qdrant",     layer: "retrieval", tags: ["ANN"],    tooltip: { title: "Vector Database", desc: "Approximate nearest neighbour search over millions of embeddings.", meta: [{ label: "Primary", value: "Pinecone" }, { label: "Self-hosted", value: "Qdrant" }] } },
      { id: "hybrid",    label: "Hybrid Search",    sublabel: "Dense + sparse",        layer: "retrieval", tooltip: { title: "Hybrid Search", desc: "Combines dense vector similarity with sparse BM25 keyword search for better recall." } },
      { id: "rerank",    label: "Reranker",         sublabel: "Cohere · Cross-encoder", layer: "retrieval", tooltip: { title: "Reranking", desc: "Reorders retrieved results using a cross-encoder for higher precision." } },
    ],
  },
  {
    id: "backend",
    label: "Backend Layer",
    nodes: [
      { id: "fastapi",   label: "FastAPI",          sublabel: "Async · OpenAPI",       layer: "backend", tags: ["Core"], tooltip: { title: "FastAPI", desc: "High-performance async Python framework powering all API endpoints.", meta: [{ label: "Pattern", value: "Async/await" }, { label: "Spec", value: "OpenAPI 3.0" }] } },
      { id: "gateway",   label: "API Gateway",      sublabel: "Auth · Rate limiting",  layer: "backend", tooltip: { title: "API Gateway", desc: "Centralized authentication, rate limiting, and request routing." } },
      { id: "tools",     label: "Tool Calling",     sublabel: "Function execution",    layer: "backend", tooltip: { title: "Tool Calling", desc: "LLM-triggered function execution — search, DB queries, external APIs." } },
      { id: "stream",    label: "Streaming",        sublabel: "SSE · WebSockets",      layer: "backend", tooltip: { title: "Streaming", desc: "Server-sent events for token-level response streaming to clients." } },
    ],
  },
  {
    id: "infra",
    label: "Infrastructure",
    nodes: [
      { id: "docker",  label: "Docker",          sublabel: "Containerization", layer: "infra", tags: ["Core"], tooltip: { title: "Docker", desc: "All services containerized for consistent dev-to-prod environments." } },
      { id: "aws",     label: "AWS",             sublabel: "EC2 · ECS · S3",   layer: "infra", tooltip: { title: "AWS", desc: "Primary cloud provider. ECS for containers, RDS for databases, S3 for storage." } },
      { id: "k8s",     label: "Kubernetes",      sublabel: "Orchestration",    layer: "infra", tooltip: { title: "Kubernetes", desc: "Container orchestration for auto-scaling and zero-downtime deployments." } },
      { id: "cicd",    label: "GitHub Actions",  sublabel: "CI/CD",            layer: "infra", tooltip: { title: "GitHub Actions", desc: "Automated test, build, and deploy pipelines triggered on every commit." } },
    ],
  },
  {
    id: "users",
    label: "End Users",
    nodes: [
      { id: "users", label: "Users / Clients", sublabel: "Web · Mobile · API", layer: "users", tags: ["↗ prod"], tooltip: { title: "End Users", desc: "Web apps, mobile clients, and third-party API consumers." } },
    ],
  },
];

const connections: [string, string][] = [
  ["models", "agent"],
  ["agent", "memory"],
  ["agent", "retrieval"],
  ["retrieval", "backend"],
  ["memory", "backend"],
  ["backend", "infra"],
  ["infra", "users"],
];

const layerLabelColors: Record<string, string> = {
  models:    "text-blue-400/70",
  agent:     "text-violet-400/70",
  memory:    "text-teal-400/70",
  retrieval: "text-cyan-400/70",
  backend:   "text-indigo-400/70",
  infra:     "text-slate-400/70",
  users:     "text-white/40",
};

interface ArchitectureGraphProps {
  inView: boolean;
}

export const ArchitectureGraph = ({ inView }: ArchitectureGraphProps) => {
  const [hoveredLayer, setHoveredLayer] = useState<string | null>(null);

  // Find which connections are relevant for the hovered layer
  const getConnDelay = (from: string, to: string) => {
    const allLayers = architectureLayers.map((l) => l.id);
    return (allLayers.indexOf(from) * 0.07);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col items-stretch gap-0">
        {architectureLayers.map((layer, layerIdx) => {
          const isLastLayer = layerIdx === architectureLayers.length - 1;
          const connBelow = connections.find(([from]) => from === layer.id);

          return (
            <div key={layer.id} className="flex flex-col items-center w-full">
              {/* Layer header label */}
              <div className="w-full mb-2 flex items-center gap-2">
                <div className="h-px flex-1 bg-white/[0.04]" />
                <span className={`text-[9.5px] font-mono uppercase tracking-[0.18em] ${layerLabelColors[layer.id]} px-2`}>
                  {layer.label}
                </span>
                <div className="h-px flex-1 bg-white/[0.04]" />
              </div>

              {/* Nodes row */}
              <div className="w-full flex flex-wrap justify-center gap-2 px-2">
                {layer.nodes.map((node, ni) => (
                  <ArchitectureNode
                    key={node.id}
                    node={node}
                    hoveredLayer={hoveredLayer}
                    onHover={setHoveredLayer}
                    delay={layerIdx * 0.1 + ni * 0.04}
                    inView={inView}
                  />
                ))}
              </div>

              {/* Connector to next layer */}
              {!isLastLayer && connBelow && (
                <ConnectionLine
                  fromLayer={connBelow[0]}
                  toLayer={connBelow[1]}
                  hoveredLayer={hoveredLayer}
                  inView={inView}
                  delay={layerIdx * 0.07 + 0.25}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};