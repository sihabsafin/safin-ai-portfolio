import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SkillCategoryCard } from "./SkillCategoryCard";
import { StackLayerDiagram } from "./StackLayerDiagram";
import { FavoriteTools } from "./FavoriteTools";
import { PhilosophyCard } from "./PhilosophyCard";

const categories = [
  {
    iconKey: "code",
    title: "Programming Languages",
    description: "Core languages for data engineering, systems, and scripting.",
    items: ["Python", "TypeScript", "SQL", "Bash", "C++", "JavaScript"],
    accentColor: "sky" as const,
    size: "md" as const,
  },
  {
    iconKey: "brain",
    title: "LLM Engineering",
    description: "Production-grade tooling for enterprise LLM systems.",
    items: ["OpenAI API", "Anthropic Claude", "Gemini", "Groq", "Ollama", "LangChain", "LangGraph", "CrewAI", "DSPy", "LlamaIndex", "Haystack"],
    accentColor: "indigo" as const,
    size: "lg" as const,
  },
  {
    iconKey: "bot",
    title: "AI & ML Frameworks",
    description: "Training, fine-tuning, and deploying production ML models.",
    items: ["PyTorch", "TensorFlow", "Scikit-Learn", "Transformers", "HuggingFace", "XGBoost", "spaCy", "OpenCV"],
    accentColor: "violet" as const,
    size: "md" as const,
  },
  {
    iconKey: "dbzap",
    title: "Vector Databases",
    description: "High-performance similarity search and hybrid retrieval.",
    items: ["Pinecone", "Qdrant", "Weaviate", "Milvus", "Chroma", "FAISS", "Redis Vector"],
    accentColor: "emerald" as const,
    size: "md" as const,
  },
  {
    iconKey: "cloud",
    title: "Cloud & DevOps",
    description: "Infrastructure, containers, and CI/CD for scalable AI systems.",
    items: ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "Vercel", "Railway", "Cloudflare", "GitHub Actions"],
    accentColor: "sky" as const,
    size: "md" as const,
  },
  {
    iconKey: "servercog",
    title: "Backend & APIs",
    description: "High-throughput APIs, real-time services, and data contracts.",
    items: ["FastAPI", "Django", "Flask", "Node.js", "Express", "REST", "GraphQL", "WebSockets"],
    accentColor: "indigo" as const,
    size: "md" as const,
  },
  {
    iconKey: "db",
    title: "Databases & Storage",
    description: "Relational, document, cache, and search storage layers.",
    items: ["PostgreSQL", "MongoDB", "Redis", "ElasticSearch", "DuckDB", "SQLite"],
    accentColor: "sky" as const,
    size: "md" as const,
  },
  {
    iconKey: "activity",
    title: "MLOps & Evaluation",
    description: "Experiment tracking, prompt monitoring, and LLM evaluation.",
    items: ["MLflow", "Weights & Biases", "DVC", "Airflow", "Kubeflow", "Prometheus", "Grafana", "RAGAS", "Promptfoo"],
    accentColor: "violet" as const,
    size: "md" as const,
  },
];

export const SkillsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const diagramRef = useRef(null);
  const diagramInView = useInView(diagramRef, { once: true, margin: "-60px" });

  return (
    <section id="skills" className="section-padding relative overflow-hidden">

      {/* ── Background ambilight ─────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] opacity-[0.07]"
          style={{
            background: "radial-gradient(ellipse, hsl(239 84% 60%) 0%, hsl(199 89% 60%) 40%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div className="container-narrow relative z-10" ref={ref}>

        {/* ── Section Header ───────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 mb-18">

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <p className="text-[11px] font-mono uppercase tracking-[0.24em] text-white/35 mb-5">
              / Stack
            </p>
            <h2 className="text-4xl lg:text-[64px] font-semibold tracking-tight leading-[1.02] text-balance mb-6">
              The{" "}
              <em className="serif-italic gradient-text-accent not-italic">tools</em>
              <br className="hidden lg:block" />
              I build with.
            </h2>
            <p className="text-[15px] text-white/45 max-w-lg leading-relaxed font-medium">
              Modern AI products are built with ecosystems, not individual frameworks.
              The architecture decisions made early define the ceiling of what's possible later.
            </p>
          </motion.div>

          <PhilosophyCard inView={inView} />
        </div>

        {/* ── Category Cards Grid ──────────────────────────────── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mb-24">
          {categories.map((cat, i) => (
            <SkillCategoryCard
              key={cat.title}
              {...cat}
              index={i}
              inView={inView}
            />
          ))}
        </div>

        {/* ── AI Stack Layers ──────────────────────────────────── */}
        <div ref={diagramRef} className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={diagramInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-11"
          >
            <p className="text-[11px] font-mono uppercase tracking-[0.24em] text-white/35 mb-3">
              / Architecture
            </p>
            <h3 className="text-2xl lg:text-[34px] font-semibold tracking-tight leading-tight">
              The AI{" "}
              <span className="serif-italic gradient-text-accent">stack</span>{" "}
              layers.
            </h3>
            <p className="text-[13.5px] text-white/40 mt-2.5 max-w-lg leading-relaxed font-medium">
              Every production AI system is a composition of layers. Here's how I think about the full stack.
            </p>
          </motion.div>

          <StackLayerDiagram inView={diagramInView} />
        </div>

        {/* ── Favorite Tools Strip ─────────────────────────────── */}
        <FavoriteTools inView={diagramInView} />

      </div>
    </section>
  );
};