import { motion, useInView, useMotionValue, useSpring, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";

// ─────────────────────────────────────────
// DATA
// ─────────────────────────────────────────

const FEATURED = {
  id: "healthcare-rag",
  index: "01",
  category: "Healthcare AI",
  status: "Production",
  title: "Enterprise Healthcare RAG",
  subtitle: "End-to-end retrieval platform over 300k+ medical records with streaming responses, citation graphs, and HIPAA-compliant guardrails.",
  challenge:
    "Hospitals were losing 40+ minutes per physician per shift searching fragmented EHR systems. Keyword search failed on clinical language, and hallucinated AI answers carried liability risk.",
  solution:
    "Built a hybrid retrieval pipeline combining BM25 + dense embeddings over Qdrant, orchestrated via LangGraph with per-step guardrails, streaming FastAPI responses, and structured citation blocks traceable to source documents.",
  metrics: [
    { value: 85, suffix: "%", label: "Faster retrieval" },
    { value: 65, suffix: "%", label: "Support workload ↓" },
    { value: 97, suffix: "%", label: "Answer accuracy" },
    { value: 40, suffix: "%", label: "Lower inference cost" },
  ],
  decisions: [
    { choice: "LangGraph", reason: "Stateful agent orchestration with conditional branching and retry logic" },
    { choice: "Qdrant", reason: "Hybrid BM25 + dense retrieval; payload filtering for HIPAA tenant isolation" },
    { choice: "FastAPI", reason: "Native async streaming; sub-100ms first-token latency on SSE connections" },
  ],
  architecture: [
    { label: "Physician", sub: "Query intent" },
    { label: "FastAPI", sub: "Streaming gateway" },
    { label: "LangGraph", sub: "Agent + guardrails" },
    { label: "Qdrant", sub: "Hybrid retrieval" },
    { label: "GPT-4o", sub: "Answer synthesis" },
    { label: "Citations", sub: "Source trace" },
  ],
  stack: ["LangGraph", "FastAPI", "OpenAI", "Qdrant", "PostgreSQL", "Docker", "AWS ECS", "Redis", "GitHub Actions"],
  deployment: ["Docker", "AWS ECS", "GitHub Actions", "Cloudflare", "Datadog"],
  accent: "from-sky-500/20 to-indigo-500/20",
};

const SECONDARY = [
  {
    id: "research-agent",
    index: "02",
    category: "AI Agents",
    status: "Live",
    title: "Autonomous Research Agent",
    subtitle: "Multi-agent system that plans, retrieves, synthesises, and writes deep research reports end-to-end from a single natural language prompt.",
    impact: "8h research → 6 min",
    stat: "40+ sources cited per report",
    stack: ["Claude", "CrewAI", "LlamaIndex", "Qdrant", "Python", "Redis"],
    architecture: ["Planner", "Searcher", "Analyser", "Writer"],
    accent: "from-indigo-500/20 to-fuchsia-500/20",
    metric: { value: "6min", label: "vs 8h manual" },
  },
  {
    id: "medical-vision",
    index: "03",
    category: "Computer Vision",
    status: "Completed",
    title: "Medical Diagnosis Assistant",
    subtitle: "Vision + LLM pipeline assisting radiologists with chest X-ray triage, anomaly highlighting, and structured SOAP note generation.",
    impact: "3× faster triage",
    stat: "96.4% sensitivity on test set",
    stack: ["PyTorch", "CLIP", "GPT-4V", "FastAPI", "PostgreSQL", "AWS"],
    architecture: ["DICOM Input", "CLIP Encoder", "Anomaly Detector", "GPT-4V Report"],
    accent: "from-emerald-500/20 to-sky-500/20",
    metric: { value: "96.4%", label: "sensitivity" },
  },
];

const COMPACT = [
  { title: "AI Resume Analyzer", tags: ["LLM", "NLP"], status: "Live" },
  { title: "Multi-Agent Customer Support", tags: ["Agents", "LangGraph"], status: "Production" },
  { title: "Fraud Detection Pipeline", tags: ["ML", "Streaming"], status: "Production" },
  { title: "Demand Forecasting Engine", tags: ["Time Series", "XGBoost"], status: "Completed" },
  { title: "Recommendation System", tags: ["ML", "Vectors"], status: "Live" },
  { title: "Document Intelligence", tags: ["OCR", "RAG"], status: "Production" },
  { title: "Voice AI Assistant", tags: ["Voice", "Realtime"], status: "Research" },
  { title: "Contract Analysis", tags: ["NLP", "LLM"], status: "Live" },
  { title: "LLM Evaluation Platform", tags: ["Eval", "MLOps"], status: "Production" },
];

const ENGINEERING_METRICS = [
  { value: 20, suffix: "+", label: "Projects delivered" },
  { value: 99, suffix: "%", label: "Client satisfaction" },
  { value: 15, suffix: "+", label: "Countries served" },
  { value: 5, suffix: "+", label: "Years building AI" },
];

const STATUS_STYLES: Record<string, string> = {
  Production: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  Live: "text-sky-400 bg-sky-400/10 border-sky-400/20",
  Completed: "text-slate-400 bg-slate-400/10 border-slate-400/20",
  Research: "text-amber-400 bg-amber-400/10 border-amber-400/20",
};

// ─────────────────────────────────────────
// ANIMATED COUNTER
// ─────────────────────────────────────────

function Counter({ to, suffix, inView }: { to: number; suffix: string; inView: boolean }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return controls.stop;
  }, [inView, to]);
  return <>{display}{suffix}</>;
}

// ─────────────────────────────────────────
// ARCHITECTURE MINI DIAGRAM
// ─────────────────────────────────────────

function ArchDiagram({ nodes }: { nodes: { label: string; sub?: string }[] }) {
  return (
    <div className="flex flex-col items-center gap-0 w-full">
      {nodes.map((n, i) => (
        <div key={n.label} className="flex flex-col items-center">
          <div className="group/node flex flex-col items-center justify-center w-36 px-3 py-2 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:border-sky-400/30 hover:bg-sky-500/[0.06] transition-all duration-300">
            <span className="text-[12px] font-mono font-medium text-foreground/90 text-center leading-tight">{n.label}</span>
            {n.sub && <span className="text-[10px] font-mono text-muted-foreground/60 mt-0.5 text-center leading-tight">{n.sub}</span>}
          </div>
          {i < nodes.length - 1 && (
            <div className="flex flex-col items-center my-1">
              <div className="w-px h-4 bg-gradient-to-b from-sky-400/40 to-transparent" />
              <div className="w-1.5 h-1.5 rotate-45 border-r border-b border-sky-400/50 -mt-1" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────
// MINI ARCH STRIP (for secondary cards)
// ─────────────────────────────────────────

function ArchStrip({ nodes }: { nodes: string[] }) {
  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {nodes.map((n, i) => (
        <div key={n} className="flex items-center gap-1.5">
          <span className="px-2 py-0.5 rounded text-[11px] font-mono text-foreground/70 bg-white/[0.04] border border-white/[0.07]">
            {n}
          </span>
          {i < nodes.length - 1 && <span className="text-white/20 text-[11px]">→</span>}
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────
// STATUS BADGE
// ─────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono border ${STATUS_STYLES[status] ?? STATUS_STYLES.Completed}`}>
      {status === "Production" || status === "Live" ? (
        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      ) : (
        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
      )}
      {status}
    </span>
  );
}

// ─────────────────────────────────────────
// STACK PILLS
// ─────────────────────────────────────────

function StackPills({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((t) => (
        <span
          key={t}
          className="px-2.5 py-1 rounded-md text-[11px] font-mono text-foreground/75 bg-white/[0.04] border border-white/[0.07] hover:border-sky-400/30 hover:text-sky-300 transition-all duration-200"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────
// FEATURED CASE STUDY
// ─────────────────────────────────────────

function FeaturedCaseStudy({ inView }: { inView: boolean }) {
  const p = FEATURED;
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden rounded-[1.5rem] border border-white/[0.07] bg-gradient-to-b from-[hsl(220_40%_9%/0.75)] to-[hsl(220_40%_6%/0.6)] backdrop-blur-xl"
      style={{ boxShadow: "0 1px 0 hsl(0 0% 100% / 0.04) inset, 0 24px 64px -24px hsl(220 50% 2% / 0.7)" }}
    >
      {/* Accent glow on hover */}
      <div className={`absolute -inset-px bg-gradient-to-br ${p.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl pointer-events-none`} />

      {/* Grid texture overlay */}
      <div className="absolute inset-0 grid-pattern opacity-[0.35] pointer-events-none" />

      <div className="relative p-8 lg:p-12">

        {/* Header row */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-10">
          <div className="flex items-center gap-4">
            <span className="text-[11px] font-mono text-muted-foreground tabular-nums">{p.index} /</span>
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-sky-400">{p.category}</span>
            <StatusBadge status={p.status} />
          </div>
          <div className="flex items-center gap-2">
            <button className="h-9 px-4 rounded-full bg-white text-background text-[12px] font-medium inline-flex items-center gap-1.5 hover:bg-white/90 transition-all duration-200 hover:scale-[1.02]">
              Case Study <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <button className="h-9 w-9 rounded-full bg-white/[0.05] border border-white/10 inline-flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-white/[0.09] transition-all duration-200">
              <Github className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Title */}
        <div className="mb-10">
          <h3 className="text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.05] mb-3">
            {p.title}
          </h3>
          <p className="text-lg text-foreground/60 leading-relaxed max-w-2xl">{p.subtitle}</p>
        </div>

        {/* Main body: left content + right architecture */}
        <div className="grid lg:grid-cols-12 gap-10">

          {/* Left — challenge, solution, decisions */}
          <div className="lg:col-span-8 space-y-10">

            {/* Challenge */}
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-3">Challenge</p>
              <p className="text-base text-foreground/75 leading-relaxed">{p.challenge}</p>
            </div>

            {/* Solution */}
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-3">Solution</p>
              <p className="text-base text-foreground/75 leading-relaxed">{p.solution}</p>
            </div>

            {/* Business impact */}
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-5">Business Impact</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {p.metrics.map((m, i) => (
                  <motion.div
                    key={m.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.06 }}
                    className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 group/metric hover:border-sky-400/20 hover:bg-sky-500/[0.04] transition-all duration-300"
                  >
                    <p className="text-2xl font-semibold tracking-tight gradient-text mb-1">
                      <Counter to={m.value} suffix={m.suffix} inView={inView} />
                    </p>
                    <p className="text-[11px] text-muted-foreground font-mono">{m.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Engineering decisions */}
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-5">Engineering Decisions</p>
              <div className="space-y-3">
                {p.decisions.map((d, i) => (
                  <motion.div
                    key={d.choice}
                    initial={{ opacity: 0, x: -16 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.45, delay: 0.6 + i * 0.07 }}
                    className="flex items-start gap-4 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-sky-400/20 transition-all duration-300"
                  >
                    <span className="shrink-0 px-2.5 py-1 rounded-lg text-[11px] font-mono font-medium text-sky-300 bg-sky-500/10 border border-sky-500/20">
                      {d.choice}
                    </span>
                    <p className="text-[13px] text-foreground/65 leading-relaxed pt-0.5">{d.reason}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Stack + Deployment */}
            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-4">Stack</p>
                <StackPills items={p.stack} />
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-4">Deployment</p>
                <StackPills items={p.deployment} />
              </div>
            </div>

          </div>

          {/* Right — architecture diagram */}
          <div className="lg:col-span-4 flex flex-col items-center justify-start pt-2">
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-6 self-start lg:self-auto">Architecture</p>
            <ArchDiagram nodes={p.architecture} />
          </div>

        </div>
      </div>
    </motion.article>
  );
}

// ─────────────────────────────────────────
// SECONDARY CARD
// ─────────────────────────────────────────

function SecondaryCard({ p, delay, inView }: { p: typeof SECONDARY[0]; delay: number; inView: boolean }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden rounded-[1.25rem] border border-white/[0.07] bg-gradient-to-b from-[hsl(220_40%_9%/0.7)] to-[hsl(220_40%_6%/0.5)] backdrop-blur-xl hover:border-sky-400/20 transition-all duration-500 hover:-translate-y-1 cursor-pointer"
      style={{ boxShadow: "0 1px 0 hsl(0 0% 100% / 0.04) inset, 0 16px 48px -16px hsl(220 50% 2% / 0.6)" }}
    >
      <div className={`absolute -inset-px bg-gradient-to-br ${p.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl pointer-events-none`} />
      <div className="absolute inset-0 grid-pattern opacity-[0.3] pointer-events-none" />

      <div className="relative p-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[11px] font-mono text-muted-foreground tabular-nums">{p.index} /</span>
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-sky-400">{p.category}</span>
            </div>
            <StatusBadge status={p.status} />
          </div>
          <button className="shrink-0 h-8 w-8 rounded-full bg-white/[0.04] border border-white/[0.08] inline-flex items-center justify-center text-foreground/50 group-hover:text-foreground group-hover:bg-white/[0.08] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300">
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <h3 className="text-2xl lg:text-3xl font-semibold tracking-tight leading-tight mb-3">{p.title}</h3>
        <p className="text-sm text-foreground/60 leading-relaxed mb-8">{p.subtitle}</p>

        {/* Metric highlight */}
        <div className="flex items-end gap-6 mb-8 pb-8 border-b border-white/[0.06]">
          <div>
            <p className="text-3xl font-semibold tracking-tight gradient-text">{p.metric.value}</p>
            <p className="text-[11px] font-mono text-muted-foreground mt-1">{p.metric.label}</p>
          </div>
          <p className="text-sm text-foreground/50 pb-1">{p.stat}</p>
        </div>

        {/* Architecture strip */}
        <div className="mb-6">
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-3">Architecture</p>
          <ArchStrip nodes={p.architecture} />
        </div>

        {/* Stack */}
        <StackPills items={p.stack} />
      </div>
    </motion.article>
  );
}

// ─────────────────────────────────────────
// COMPACT CARD
// ─────────────────────────────────────────

function CompactCard({ item, delay, inView }: { item: typeof COMPACT[0]; delay: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex items-center justify-between p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-sky-400/20 hover:bg-sky-500/[0.03] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
    >
      <div>
        <p className="font-medium text-[14px] mb-2 group-hover:text-white transition-colors">{item.title}</p>
        <div className="flex items-center gap-3">
          <StatusBadge status={item.status} />
          <div className="flex gap-2">
            {item.tags.map((t) => (
              <span key={t} className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
      <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-sky-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300" />
    </motion.div>
  );
}

// ─────────────────────────────────────────
// ENGINEERING METRICS STRIP
// ─────────────────────────────────────────

function MetricsStrip({ inView }: { inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-[1.5rem] border border-white/[0.07] bg-gradient-to-br from-[hsl(220_40%_9%/0.6)] to-[hsl(220_40%_6%/0.4)] backdrop-blur-xl"
    >
      <div className="absolute inset-0 grid-pattern opacity-[0.4] pointer-events-none" />
      <div className="relative grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/[0.06]">
        {ENGINEERING_METRICS.map((m, i) => (
          <div key={m.label} className="p-8 lg:p-10 flex flex-col items-center text-center group hover:bg-sky-500/[0.03] transition-colors duration-300">
            <p className="text-4xl lg:text-5xl font-semibold tracking-tight gradient-text mb-2">
              <Counter to={m.value} suffix={m.suffix} inView={inView} />
            </p>
            <p className="text-[12px] font-mono uppercase tracking-[0.15em] text-muted-foreground">{m.label}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────
// BOTTOM CTA
// ─────────────────────────────────────────

function BottomCTA({ inView }: { inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative text-center pt-10"
    >
      {/* Soft radial behind the CTA */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,hsl(199_89%_60%/0.10),transparent_70%)] pointer-events-none" />

      <div className="relative space-y-8">
        <div className="space-y-4">
          <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
            / Start a project
          </p>
          <h2 className="text-4xl lg:text-6xl font-semibold tracking-tight leading-[1.05]">
            Interested in building <br />
            <span className="serif-italic gradient-text-accent">something similar?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Every system here was designed from a business problem outward. Let's do the same for yours.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4">
          <button className="group/cta h-12 px-8 rounded-full bg-white text-background text-sm font-semibold inline-flex items-center gap-2 hover:bg-white/90 transition-all duration-200 hover:scale-[1.02]">
            Let's talk
            <ArrowUpRight className="w-4 h-4 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5 transition-transform duration-200" />
          </button>
          <button className="h-12 px-6 rounded-full border border-white/10 text-sm text-foreground/70 hover:text-foreground hover:border-white/20 hover:bg-white/[0.04] transition-all duration-200">
            View all work
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────
// ROOT SECTION
// ─────────────────────────────────────────

export const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);

  const sectionInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const metricsInView = useInView(metricsRef, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      {/* Global radial glow background layer (matches existing global BG language) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-[radial-gradient(ellipse_at_top,hsl(199_89%_60%/0.07),transparent_65%)]" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_right,hsl(239_84%_60%/0.06),transparent_65%)]" />
      </div>

      <div className="container-narrow relative" ref={sectionRef}>

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 max-w-3xl"
        >
          <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-5">
            / Enterprise Case Studies
          </p>
          <h2 className="text-5xl lg:text-7xl font-semibold tracking-tight leading-[1.02] mb-6">
            Production AI systems.<br />
            <span className="serif-italic gradient-text-accent">Real outcomes.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
            Every system below was designed to solve measurable business problems —
            not showcase technology.
          </p>
        </motion.div>

        {/* ── Featured ── */}
        <div className="mb-12">
          <FeaturedCaseStudy inView={sectionInView} />
        </div>

        {/* ── Secondary ── */}
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          {SECONDARY.map((p, i) => (
            <SecondaryCard key={p.id} p={p} delay={0.1 + i * 0.1} inView={sectionInView} />
          ))}
        </div>

        {/* ── Compact grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mb-24"
        >
          <div className="flex items-end justify-between mb-6">
            <h3 className="text-xl font-semibold tracking-tight">More Projects</h3>
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
              {String(COMPACT.length).padStart(2, "0")} more
            </span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {COMPACT.map((item, i) => (
              <CompactCard key={item.title} item={item} delay={0.4 + i * 0.04} inView={sectionInView} />
            ))}
          </div>
        </motion.div>

        {/* ── Engineering metrics ── */}
        <div ref={metricsRef} className="mb-24">
          <MetricsStrip inView={metricsInView} />
        </div>

        {/* ── Bottom CTA ── */}
        <BottomCTA inView={metricsInView} />

      </div>
    </section>
  );
};