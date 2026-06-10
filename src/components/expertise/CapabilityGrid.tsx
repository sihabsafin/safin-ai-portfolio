import React from "react";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Sparkles, Bot, Database, Cpu, Workflow, Eye,
  MessagesSquare, GitBranch, CheckCircle2, Server, Radio, Brain,
} from "lucide-react";
import { CapabilityCard, type Capability } from "./CapabilityCard";

const capabilities: Capability[] = [
  {
    icon: Sparkles,
    title: "Generative AI Systems",
    description:
      "Production-grade LLM applications, AI copilots, enterprise assistants and autonomous reasoning systems.",
    stack: ["OpenAI", "Claude", "Gemini", "Groq"],
    category: "Production",
    size: "large",
  },
  {
    icon: Bot,
    title: "AI Agents",
    description:
      "Autonomous multi-agent systems with tool calling, memory, planning and task execution.",
    stack: ["LangGraph", "CrewAI", "AutoGen", "MCP"],
    category: "Production",
    size: "medium",
  },
  {
    icon: Database,
    title: "Enterprise RAG",
    description:
      "Dense + hybrid retrieval, knowledge search, citation pipelines, private enterprise search.",
    stack: ["Pinecone", "Qdrant", "Chroma", "LlamaIndex"],
    category: "Enterprise",
    size: "medium",
  },
  {
    icon: Cpu,
    title: "Production ML",
    description:
      "Regression, classification, forecasting, recommendation — built for reliability in production.",
    stack: ["Scikit-learn", "XGBoost", "FastAPI", "Docker"],
    category: "Production",
    size: "medium",
  },
  {
    icon: Workflow,
    title: "MLOps",
    description:
      "Experiment tracking, model registries, CI/CD pipelines, drift monitoring and eval frameworks.",
    stack: ["MLflow", "DVC", "Prometheus", "GitHub Actions"],
    category: "Infrastructure",
    size: "large",
  },
  {
    icon: Eye,
    title: "Computer Vision",
    description:
      "Object detection, OCR, medical imaging analysis and segmentation pipelines.",
    stack: ["YOLO", "OpenCV", "Torchvision", "CLIP"],
    category: "Research",
    size: "medium",
  },
  {
    icon: MessagesSquare,
    title: "NLP",
    description:
      "Named entity recognition, classification, embeddings and summarization at scale.",
    stack: ["HuggingFace", "spaCy", "SentenceTransformers"],
    category: "Research",
    size: "medium",
  },
  {
    icon: GitBranch,
    title: "AI Automation",
    description:
      "Workflow automation agents that eliminate manual ops across CRM, ERP and business tooling.",
    stack: ["n8n", "LangChain", "Zapier API", "Webhooks"],
    category: "Enterprise",
    size: "medium",
  },
  {
    icon: CheckCircle2,
    title: "LLM Evaluation",
    description:
      "Offline + online evals, hallucination detection, guardrails and human feedback loops.",
    stack: ["RAGAS", "Promptfoo", "TruLens", "Braintrust"],
    category: "Production",
    size: "large",
  },
  {
    icon: Server,
    title: "AI Infrastructure",
    description:
      "Scalable, observable, cost-aware AI backends designed to handle real traffic.",
    stack: ["Docker", "AWS ECS", "FastAPI", "Redis", "Nginx"],
    category: "Infrastructure",
    size: "medium",
  },
  {
    icon: Radio,
    title: "AI APIs & Streaming",
    description:
      "REST, SSE streaming, real-time inference and function-calling API design.",
    stack: ["FastAPI", "WebSockets", "SSE", "MCP SDK"],
    category: "Infrastructure",
    size: "medium",
  },
  {
    icon: Brain,
    title: "Research & Innovation",
    description:
      "Fine-tuning, prompt engineering, embedding models and advanced reasoning research.",
    stack: ["LoRA", "QLoRA", "PEFT", "OpenAI Evals"],
    category: "Research",
    size: "medium",
  },
];

export const CapabilityGrid = React.memo(() => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div
      ref={ref}
      className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
      style={{ gridAutoRows: "auto" }}
    >
      {capabilities.map((cap, i) => (
        <div
          key={cap.title}
          className={cap.size === "large" ? "sm:row-span-1" : ""}
        >
          <CapabilityCard capability={cap} index={i} inView={inView} />
        </div>
      ))}
    </div>
  );
});
CapabilityGrid.displayName = "CapabilityGrid";