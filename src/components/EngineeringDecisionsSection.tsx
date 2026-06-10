import { motion, useInView, animate, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { ArrowRight, Check, X, Minus } from "lucide-react";

// ─────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────

type Rating = 1 | 2 | 3 | 4 | 5;

interface Comparison {
  chosen: string;
  rejected: string;
  chosenPoints: string[];
  rejectedPoints: string[];
  reason: string;
  useCase: string;
  tradeoff: string;
  icon: string;
  accent: string;
}

interface TradeoffRow {
  name: string;
  chosen: boolean;
  performance: Rating;
  cost: Rating;
  scalability: Rating;
  complexity: Rating;
}

interface MatrixEntry {
  label: string;
  rows: TradeoffRow[];
}

interface Principle {
  title: string;
  body: string;
  icon: string;
}

// ─────────────────────────────────────────
// DATA
// ─────────────────────────────────────────

const COMPARISONS: Comparison[] = [
  {
    chosen: "LangGraph",
    rejected: "LangChain",
    chosenPoints: [
      "Stateful agent loops with explicit state machines",
      "Deterministic, debuggable control flow",
      "Built-in checkpointing for long-running tasks",
      "Conditional branching without callback hell",
    ],
    rejectedPoints: [
      "Implicit chain execution is hard to trace",
      "Memory management becomes unpredictable",
      "Difficult to resume failed runs",
      "High coupling between steps",
    ],
    reason: "Production agents need deterministic, observable control flow — not magic.",
    useCase: "Multi-step autonomous agents, research pipelines, long-running tasks",
    tradeoff: "Higher initial setup, significantly better operability",
    icon: "⬡",
    accent: "sky",
  },
  {
    chosen: "Qdrant",
    rejected: "Pinecone",
    chosenPoints: [
      "Hybrid BM25 + dense retrieval in one query",
      "Self-hostable — zero vendor lock-in",
      "Payload filtering for multi-tenant isolation",
      "80% cost reduction at scale",
    ],
    rejectedPoints: [
      "Dense-only retrieval misses keyword matches",
      "Managed-only, opaque pricing at volume",
      "No on-premises option for regulated industries",
      "Limited metadata filtering expressiveness",
    ],
    reason: "Healthcare and enterprise workloads demand hybrid search and data sovereignty.",
    useCase: "RAG systems, semantic search, multi-tenant SaaS",
    tradeoff: "Ops overhead vs full control over data and cost",
    icon: "◈",
    accent: "indigo",
  },
  {
    chosen: "FastAPI",
    rejected: "Flask / Django",
    chosenPoints: [
      "Native async — essential for AI streaming (SSE)",
      "Auto-generated OpenAPI docs from type hints",
      "Sub-100ms first-token latency in practice",
      "Pydantic validation catches errors before LLM calls",
    ],
    rejectedPoints: [
      "Synchronous by default — blocks on inference",
      "Manual serialization is error-prone at scale",
      "No streaming primitives without hacks",
      "Heavy ORM overhead irrelevant to AI workloads",
    ],
    reason: "AI APIs are fundamentally async and streaming — the framework must match.",
    useCase: "LLM inference APIs, RAG endpoints, real-time AI services",
    tradeoff: "Smaller ecosystem vs perfect fit for async AI workloads",
    icon: "⚡",
    accent: "emerald",
  },
  {
    chosen: "Claude",
    rejected: "GPT-4",
    chosenPoints: [
      "200K context window for entire codebases",
      "Superior instruction following on complex tasks",
      "More nuanced reasoning on edge cases",
      "Better refusal calibration for enterprise safety",
    ],
    rejectedPoints: [
      "32K context limits document-level analysis",
      "Inconsistent behavior on long multi-turn tasks",
      "Plugin ecosystem adds latency and failure modes",
      "Less predictable on sensitive domain content",
    ],
    reason: "Long-context reasoning and reliability matter more than brand recognition.",
    useCase: "Document analysis, code review, long research synthesis",
    tradeoff: "Smaller plugin ecosystem, unmatched context and reliability",
    icon: "◎",
    accent: "fuchsia",
  },
  {
    chosen: "PostgreSQL",
    rejected: "MongoDB",
    chosenPoints: [
      "ACID guarantees critical for financial/medical data",
      "pgvector turns Postgres into a vector store",
      "Joins across embeddings + metadata in one query",
      "Battle-tested operational tooling",
    ],
    rejectedPoints: [
      "Eventual consistency is risky for audit trails",
      "Separate vector DB adds infra overhead",
      "Schema-less invites data quality drift",
      "Aggregation pipeline complexity at join-heavy queries",
    ],
    reason: "When data integrity is non-negotiable, relational wins every time.",
    useCase: "Transactional AI systems, healthcare records, financial AI",
    tradeoff: "Less flexible schema vs rock-solid data integrity",
    icon: "▣",
    accent: "amber",
  },
  {
    chosen: "Redis",
    rejected: "Memcached",
    chosenPoints: [
      "Persistent memory for agent state between calls",
      "Pub/sub for real-time AI event streaming",
      "Redis Streams as a lightweight message queue",
      "Rich data structures: sorted sets, lists, hashes",
    ],
    rejectedPoints: [
      "Pure key-value only — no structured data",
      "No persistence — cache cold-starts kill UX",
      "No pub/sub primitive for event-driven AI",
      "Can't serve as a task queue without extra infra",
    ],
    reason: "Modern AI systems need more than a cache — they need stateful memory.",
    useCase: "Agent memory, rate limiting, real-time event pipelines",
    tradeoff: "Higher memory footprint vs far more capability",
    icon: "◉",
    accent: "rose",
  },
];

const MATRIX: MatrixEntry[] = [
  {
    label: "Orchestration",
    rows: [
      { name: "LangGraph",  chosen: true,  performance: 5, cost: 4, scalability: 5, complexity: 3 },
      { name: "LangChain",  chosen: false, performance: 3, cost: 4, scalability: 3, complexity: 4 },
      { name: "CrewAI",     chosen: false, performance: 4, cost: 4, scalability: 4, complexity: 2 },
    ],
  },
  {
    label: "Vector DB",
    rows: [
      { name: "Qdrant",     chosen: true,  performance: 5, cost: 5, scalability: 5, complexity: 3 },
      { name: "Pinecone",   chosen: false, performance: 4, cost: 2, scalability: 4, complexity: 5 },
      { name: "Weaviate",   chosen: false, performance: 4, cost: 3, scalability: 4, complexity: 3 },
    ],
  },
  {
    label: "API Layer",
    rows: [
      { name: "FastAPI",    chosen: true,  performance: 5, cost: 5, scalability: 5, complexity: 4 },
      { name: "Flask",      chosen: false, performance: 3, cost: 5, scalability: 3, complexity: 5 },
      { name: "Django",     chosen: false, performance: 3, cost: 5, scalability: 3, complexity: 3 },
    ],
  },
];

const TIMELINE_STEPS = [
  { label: "Requirement", sub: "Define the constraint" },
  { label: "Research",    sub: "Map the landscape" },
  { label: "Compare",     sub: "Build a matrix" },
  { label: "Prototype",   sub: "Validate assumptions" },
  { label: "Measure",     sub: "Benchmark in prod" },
  { label: "Deploy",      sub: "Ship with confidence" },
  { label: "Monitor",     sub: "Observe in the wild" },
  { label: "Iterate",     sub: "Refine the decision" },
];

const PRINCIPLES: Principle[] = [
  { icon: "⬡", title: "Production First",           body: "Every decision is made for operability, not elegance. Can you wake up at 3am and debug it?" },
  { icon: "◎", title: "Measure Before Optimizing",  body: "Premature optimization creates complexity without measured gain. Instrument first, optimize second." },
  { icon: "◈", title: "Prefer Simplicity",           body: "The best architecture is the one a new engineer understands in 20 minutes, not 20 days." },
  { icon: "▣", title: "Design for Failure",          body: "Every external call will fail. Circuit breakers, retries, and fallbacks are not optional." },
  { icon: "◉", title: "Observability Matters",       body: "If you can't see inside it, you can't fix it. Logs, traces, and metrics from day one." },
  { icon: "⚡", title: "Security by Default",        body: "Authentication, rate limiting, and input sanitization are not features — they are baselines." },
  { icon: "∞", title: "AI with Human Oversight",    body: "Autonomous systems need human checkpoints. Confidence thresholds and escalation paths are architecture." },
];

// ─────────────────────────────────────────
// ACCENT COLOR MAP
// ─────────────────────────────────────────

const ACCENT: Record<string, { pill: string; border: string; glow: string; badge: string }> = {
  sky:     { pill: "bg-sky-500/10 text-sky-300 border-sky-500/20",     border: "hover:border-sky-400/30",    glow: "from-sky-500/15 to-indigo-500/10",     badge: "bg-sky-500/10 text-sky-300" },
  indigo:  { pill: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20", border: "hover:border-indigo-400/30", glow: "from-indigo-500/15 to-purple-500/10",  badge: "bg-indigo-500/10 text-indigo-300" },
  emerald: { pill: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20", border: "hover:border-emerald-400/30", glow: "from-emerald-500/15 to-sky-500/10", badge: "bg-emerald-500/10 text-emerald-300" },
  fuchsia: { pill: "bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/20", border: "hover:border-fuchsia-400/30", glow: "from-fuchsia-500/15 to-indigo-500/10", badge: "bg-fuchsia-500/10 text-fuchsia-300" },
  amber:   { pill: "bg-amber-500/10 text-amber-300 border-amber-500/20",   border: "hover:border-amber-400/30",  glow: "from-amber-500/15 to-sky-500/10",     badge: "bg-amber-500/10 text-amber-300" },
  rose:    { pill: "bg-rose-500/10 text-rose-300 border-rose-500/20",     border: "hover:border-rose-400/30",   glow: "from-rose-500/15 to-fuchsia-500/10",  badge: "bg-rose-500/10 text-rose-300" },
};

// ─────────────────────────────────────────
// ANIMATED DOT COUNTER (for ratings)
// ─────────────────────────────────────────

function RatingDots({ value, inView }: { value: Rating; inView: boolean }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: i < value ? 1 : 0.18 } : {}}
          transition={{ duration: 0.3, delay: 0.05 * i, ease: [0.16, 1, 0.3, 1] }}
          className={`w-1.5 h-1.5 rounded-full ${i < value ? "bg-sky-400" : "bg-white/20"}`}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────
// ANIMATED ARROW
// ─────────────────────────────────────────

function AnimatedArrow({ className = "" }: { className?: string }) {
  return (
    <motion.div
      animate={{ x: [0, 5, 0] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      className={className}
    >
      <ArrowRight className="w-4 h-4" />
    </motion.div>
  );
}

// ─────────────────────────────────────────
// COMPARISON CARD
// ─────────────────────────────────────────

function ComparisonCard({ c, index, inView }: { c: Comparison; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);
  const a = ACCENT[c.accent];

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative overflow-hidden rounded-[1.25rem] border border-white/[0.07] bg-gradient-to-b from-[hsl(220_40%_9%/0.8)] to-[hsl(220_40%_6%/0.6)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 ${a.border}`}
      style={{ boxShadow: "0 1px 0 hsl(0 0% 100% / 0.04) inset, 0 16px 48px -16px hsl(220 50% 2% / 0.6)" }}
    >
      {/* Hover glow */}
      <div className={`absolute -inset-px bg-gradient-to-br ${a.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl pointer-events-none`} />
      <div className="absolute inset-0 grid-pattern opacity-[0.25] pointer-events-none" />

      <div className="relative p-7">

        {/* Icon + label */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-2xl leading-none">{c.icon}</span>
          <span className={`text-[10px] font-mono px-2.5 py-1 rounded-full border ${a.pill}`}>
            chosen
          </span>
        </div>

        {/* VS header */}
        <div className="flex items-center gap-3 mb-6">
          <div>
            <p className="text-xl font-semibold tracking-tight text-white">{c.chosen}</p>
            <p className="text-[11px] font-mono text-muted-foreground mt-0.5">selected</p>
          </div>
          <motion.div
            animate={{ x: hovered ? [0, 6, 0] : 0 }}
            transition={{ duration: 1.2, repeat: hovered ? Infinity : 0, ease: "easeInOut" }}
            className="mx-2 text-muted-foreground/40"
          >
            <ArrowRight className="w-4 h-4" />
          </motion.div>
          <div>
            <p className="text-xl font-semibold tracking-tight text-foreground/35 line-through decoration-white/20">{c.rejected}</p>
            <p className="text-[11px] font-mono text-muted-foreground/50 mt-0.5">rejected</p>
          </div>
        </div>

        {/* Two columns: chosen vs rejected */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {/* Chosen */}
          <div className="space-y-2">
            {c.chosenPoints.map((pt) => (
              <div key={pt} className="flex items-start gap-2">
                <Check className="w-3 h-3 text-emerald-400 mt-0.5 shrink-0" />
                <p className="text-[11px] text-foreground/70 leading-snug">{pt}</p>
              </div>
            ))}
          </div>
          {/* Rejected */}
          <div className="space-y-2">
            {c.rejectedPoints.map((pt) => (
              <div key={pt} className="flex items-start gap-2">
                <X className="w-3 h-3 text-rose-400/60 mt-0.5 shrink-0" />
                <p className="text-[11px] text-foreground/35 leading-snug">{pt}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.06] mb-5" />

        {/* Reason */}
        <div className="mb-4">
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-1.5">Why</p>
          <p className="text-[13px] text-foreground/75 leading-relaxed italic">{c.reason}</p>
        </div>

        {/* Use case + tradeoff */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-1.5">Best for</p>
            <p className="text-[11px] text-foreground/60 leading-snug">{c.useCase}</p>
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-1.5">Trade-off</p>
            <p className="text-[11px] text-foreground/60 leading-snug">{c.tradeoff}</p>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────
// DECISION TIMELINE — cinematic version
// ─────────────────────────────────────────

// Travelling light orb that loops across the line
function TravellingOrb({ inView }: { inView: boolean }) {
  const x = useMotionValue(0);
  const glow = useTransform(x, [0, 100], ["0%", "100%"]);

  useEffect(() => {
    if (!inView) return;
    let cancelled = false;
    const loop = async () => {
      while (!cancelled) {
        await animate(x, 100, { duration: 3.2, ease: "easeInOut", delay: 0.6 });
        if (cancelled) break;
        x.set(0);
        await new Promise((r) => setTimeout(r, 400));
      }
    };
    loop();
    return () => { cancelled = true; };
  }, [inView, x]);

  const left = useTransform(x, [0, 100], ["0%", "100%"]);

  return (
    <motion.div
      style={{ left }}
      className="absolute top-[19px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20"
    >
      {/* Core dot */}
      <div className="w-3 h-3 rounded-full bg-white shadow-[0_0_12px_4px_hsl(199_89%_60%/0.9),0_0_30px_8px_hsl(199_89%_60%/0.4)]" />
      {/* Trailing comet tail */}
      <motion.div
        className="absolute top-1/2 right-full -translate-y-1/2 h-px rounded-full pointer-events-none"
        style={{
          width: 40,
          background: "linear-gradient(to left, hsl(199 89% 60% / 0.7), transparent)",
        }}
      />
    </motion.div>
  );
}

// Connector arrow between two nodes
function ConnectorArrow({ delay, inView }: { delay: number; inView: boolean }) {
  return (
    <div className="absolute top-[13px] left-full w-full flex items-center justify-center pointer-events-none z-10"
      style={{ width: "calc(100% - 40px)", left: "calc(50% + 20px)", transform: "none" }}
    >
      {/* Arrow shaft */}
      <motion.div
        className="h-px flex-1"
        initial={{ scaleX: 0, originX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
        style={{ background: "linear-gradient(to right, hsl(199 89% 60% / 0.4), hsl(239 84% 60% / 0.3))" }}
      />
    </div>
  );
}

function DecisionTimeline({ inView }: { inView: boolean }) {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Auto-advance highlight through steps when in view
  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const interval = setInterval(() => {
      setActiveStep(i);
      setCompletedSteps((prev) => [...prev, i]);
      i++;
      if (i >= TIMELINE_STEPS.length) {
        clearInterval(interval);
        setTimeout(() => {
          setActiveStep(null);
          setCompletedSteps([]);
        }, 1400);
      }
    }, 320);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <div className="relative select-none">

      {/* ── Base track line ── */}
      <div className="absolute top-[19px] left-5 right-5 h-px bg-white/[0.06]" />

      {/* ── Animated fill line ── */}
      <motion.div
        className="absolute top-[19px] left-5 h-px"
        initial={{ width: 0 }}
        animate={inView ? { width: "calc(100% - 40px)" } : {}}
        transition={{ duration: 2.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ background: "linear-gradient(to right, hsl(199 89% 60% / 0.5), hsl(239 84% 60% / 0.5), hsl(271 81% 60% / 0.3))" }}
      />

      {/* ── Travelling light orb ── */}
      <TravellingOrb inView={inView} />

      {/* ── Step nodes ── */}
      <div className="relative grid grid-cols-4 lg:grid-cols-8 gap-1 pt-1">
        {TIMELINE_STEPS.map((step, i) => {
          const isActive    = activeStep === i;
          const isCompleted = completedSteps.includes(i) && activeStep !== i;

          return (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setActiveStep(i)}
              onMouseLeave={() => setActiveStep(null)}
              className="flex flex-col items-center text-center cursor-default group"
            >
              {/* ── Node ── */}
              <div className="relative mb-4">

                {/* Outer pulse ring — fires once on entry */}
                <motion.div
                  className="absolute inset-0 rounded-full border border-sky-400/40"
                  initial={{ scale: 1, opacity: 0 }}
                  animate={inView ? { scale: [1, 2.2, 2.2], opacity: [0, 0.5, 0] } : {}}
                  transition={{ duration: 1.0, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                />

                {/* Continuous glow ring when active */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      key="glow-ring"
                      className="absolute -inset-2 rounded-full"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.25 }}
                      style={{
                        background: "radial-gradient(circle, hsl(199 89% 60% / 0.25) 0%, transparent 70%)",
                        boxShadow: "0 0 20px 6px hsl(199 89% 60% / 0.2)",
                      }}
                    />
                  )}
                </AnimatePresence>

                {/* Ripple rings — continuous idle animation */}
                {inView && (
                  <>
                    <motion.div
                      className="absolute inset-0 rounded-full border border-sky-400/20"
                      animate={{ scale: [1, 1.8], opacity: [0.3, 0] }}
                      transition={{ duration: 2.5, delay: i * 0.3, repeat: Infinity, ease: "easeOut" }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full border border-sky-400/10"
                      animate={{ scale: [1, 2.4], opacity: [0.2, 0] }}
                      transition={{ duration: 2.5, delay: i * 0.3 + 0.4, repeat: Infinity, ease: "easeOut" }}
                    />
                  </>
                )}

                {/* Main circle */}
                <motion.div
                  animate={{
                    borderColor: isActive
                      ? "hsl(199 89% 60% / 0.8)"
                      : isCompleted
                      ? "hsl(199 89% 60% / 0.4)"
                      : "hsl(0 0% 100% / 0.10)",
                    boxShadow: isActive
                      ? "0 0 0 1px hsl(199 89% 60% / 0.3), 0 0 20px hsl(199 89% 60% / 0.4), inset 0 1px 0 hsl(0 0% 100% / 0.1)"
                      : isCompleted
                      ? "0 0 10px hsl(199 89% 60% / 0.2)"
                      : "none",
                    background: isActive
                      ? "linear-gradient(135deg, hsl(220 40% 16%), hsl(199 89% 60% / 0.15))"
                      : "linear-gradient(180deg, hsl(220 40% 12%), hsl(220 40% 8%))",
                  }}
                  transition={{ duration: 0.3 }}
                  className="relative w-10 h-10 rounded-full border flex items-center justify-center z-10"
                >
                  <motion.span
                    animate={{
                      color: isActive || isCompleted ? "#7dd3fc" : "#94a3b8",
                      scale: isActive ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                    className="text-[10px] font-mono font-semibold tabular-nums"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </motion.span>
                </motion.div>
              </div>

              {/* Label */}
              <motion.p
                animate={{
                  color: isActive ? "#f1f5f9" : isCompleted ? "#cbd5e1" : "hsl(215 16% 58%)",
                }}
                transition={{ duration: 0.2 }}
                className="text-[12px] font-semibold mb-1 leading-tight"
              >
                {step.label}
              </motion.p>

              {/* Sub label */}
              <AnimatePresence>
                {isActive ? (
                  <motion.p
                    key="sub-active"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -2 }}
                    transition={{ duration: 0.2 }}
                    className="text-[10px] font-mono text-sky-400/80 leading-snug"
                  >
                    {step.sub}
                  </motion.p>
                ) : (
                  <motion.p
                    key="sub-idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[10px] font-mono text-muted-foreground/50 leading-snug"
                  >
                    {step.sub}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Connector arrow to next step (hidden on mobile) */}
              {i < TIMELINE_STEPS.length - 1 && (
                <motion.div
                  className="absolute top-[14px] hidden lg:flex items-center"
                  style={{
                    left: "calc(50% + 20px)",
                    width: "calc(100% - 40px)",
                  }}
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    delay: i * 0.18,
                    ease: "easeInOut",
                  }}
                >
                  <motion.svg
                    width="14" height="10" viewBox="0 0 14 10" fill="none"
                    animate={{
                      opacity: isActive || activeStep === i + 1 ? 1 : 0.3,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <path
                      d="M1 5h10M8 1l4 4-4 4"
                      stroke="hsl(199 89% 60%)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* ── Active step detail pill ── */}
      <AnimatePresence>
        {activeStep !== null && (
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 mx-auto max-w-xs flex items-center gap-3 px-5 py-3 rounded-full border border-sky-400/25 bg-sky-500/[0.08] backdrop-blur-sm"
          >
            <span className="text-[11px] font-mono text-sky-400 tabular-nums">
              {String(activeStep + 1).padStart(2, "0")}
            </span>
            <span className="w-px h-3 bg-sky-400/30" />
            <span className="text-[12px] font-semibold text-foreground/90">
              {TIMELINE_STEPS[activeStep].label}
            </span>
            <span className="text-[11px] font-mono text-muted-foreground">
              — {TIMELINE_STEPS[activeStep].sub}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

// ─────────────────────────────────────────
// TRADE-OFF MATRIX
// ─────────────────────────────────────────

function TradeoffMatrix({ inView }: { inView: boolean }) {
  const [activeTab, setActiveTab] = useState(0);
  const entry = MATRIX[activeTab];

  return (
    <div>
      {/* Tab strip */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        {MATRIX.map((m, i) => (
          <button
            key={m.label}
            onClick={() => setActiveTab(i)}
            className={`px-4 py-1.5 rounded-full text-[12px] font-mono border transition-all duration-300 ${
              activeTab === i
                ? "bg-sky-500/15 border-sky-400/30 text-sky-300"
                : "bg-white/[0.03] border-white/[0.07] text-muted-foreground hover:border-white/20 hover:text-foreground/80"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-white/[0.07]">
        {/* Header */}
        <div className="grid grid-cols-5 bg-white/[0.03] border-b border-white/[0.06] px-5 py-3">
          {["Tool", "Performance", "Cost", "Scalability", "Complexity"].map((h) => (
            <p key={h} className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
              {h}
            </p>
          ))}
        </div>

        {/* Rows */}
        {entry.rows.map((row, i) => (
          <motion.div
            key={row.name}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            className={`grid grid-cols-5 items-center px-5 py-4 border-b border-white/[0.04] last:border-0 transition-colors duration-200 ${
              row.chosen
                ? "bg-sky-500/[0.04] hover:bg-sky-500/[0.07]"
                : "hover:bg-white/[0.02]"
            }`}
          >
            <div className="flex items-center gap-2">
              {row.chosen && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
                  className="w-1.5 h-1.5 rounded-full bg-sky-400"
                />
              )}
              <span className={`text-[13px] font-mono ${row.chosen ? "text-white font-medium" : "text-foreground/50"}`}>
                {row.name}
              </span>
              {row.chosen && (
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-sky-500/15 text-sky-400 border border-sky-500/20">
                  ✓
                </span>
              )}
            </div>
            <RatingDots value={row.performance} inView={inView} />
            <RatingDots value={row.cost}        inView={inView} />
            <RatingDots value={row.scalability} inView={inView} />
            <RatingDots value={row.complexity}  inView={inView} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// PRINCIPLES SIDEBAR / GRID
// ─────────────────────────────────────────

function PrincipleCard({ p, index, inView }: { p: Principle; index: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="group flex items-start gap-4 p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-sky-400/20 hover:bg-sky-500/[0.03] transition-all duration-300"
    >
      <span className="text-xl leading-none mt-0.5 group-hover:scale-110 transition-transform duration-300">
        {p.icon}
      </span>
      <div>
        <p className="text-[13px] font-semibold text-foreground/90 mb-1.5">{p.title}</p>
        <p className="text-[12px] text-muted-foreground leading-relaxed">{p.body}</p>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────
// ANIMATED COUNTER (for philosophy card)
// ─────────────────────────────────────────

function AnimatedStat({ to, suffix, label, inView, delay }: {
  to: number; suffix: string; label: string; inView: boolean; delay: number;
}) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, {
      duration: 1.6,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return c.stop;
  }, [inView, to, delay]);
  return (
    <div className="text-center">
      <p className="text-3xl font-semibold tracking-tight gradient-text">{val}{suffix}</p>
      <p className="text-[11px] font-mono text-muted-foreground mt-1">{label}</p>
    </div>
  );
}

// ─────────────────────────────────────────
// ROOT SECTION
// ─────────────────────────────────────────

export const EngineeringDecisionsSection = () => {
  const headerRef   = useRef<HTMLDivElement>(null);
  const cardsRef    = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const matrixRef   = useRef<HTMLDivElement>(null);
  const principlesRef = useRef<HTMLDivElement>(null);

  const headerInView     = useInView(headerRef,     { once: true, margin: "-80px" });
  const cardsInView      = useInView(cardsRef,      { once: true, margin: "-80px" });
  const timelineInView   = useInView(timelineRef,   { once: true, margin: "-80px" });
  const matrixInView     = useInView(matrixRef,     { once: true, margin: "-80px" });
  const principlesInView = useInView(principlesRef, { once: true, margin: "-80px" });

  return (
    <section id="engineering-decisions" className="section-padding relative overflow-hidden">

      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[radial-gradient(ellipse_at_top,hsl(239_84%_60%/0.07),transparent_65%)]" />
        <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_left,hsl(199_89%_60%/0.05),transparent_65%)]" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-[radial-gradient(ellipse_at_right,hsl(239_84%_60%/0.05),transparent_65%)]" />
      </div>

      <div className="container-narrow relative">

        {/* ── 1. HEADER ── */}
        <div ref={headerRef}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-20 max-w-3xl"
          >
            <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-5">
              / Engineering Decisions
            </p>
            <h2 className="text-5xl lg:text-7xl font-semibold tracking-tight leading-[1.02] mb-6">
              Decisions that<br />
              <span className="serif-italic gradient-text-accent">actually matter.</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Technology choices are easy. Engineering decisions are hard.
              Every production AI system is a series of thoughtful trade-offs.
            </p>
          </motion.div>

          {/* Philosophy card */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-gradient-to-br from-[hsl(220_40%_9%/0.8)] to-[hsl(220_40%_6%/0.5)] backdrop-blur-xl mb-24 p-10 lg:p-14"
            style={{ boxShadow: "0 1px 0 hsl(0 0% 100% / 0.04) inset, 0 24px 64px -24px hsl(220 50% 2% / 0.7)" }}
          >
            <div className="absolute inset-0 grid-pattern opacity-[0.3] pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse_at_top,hsl(239_84%_60%/0.08),transparent_70%)] pointer-events-none" />

            <div className="relative grid lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-8">
                <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-6">
                  Philosophy
                </p>
                <blockquote className="text-2xl lg:text-3xl font-semibold tracking-tight leading-[1.3] text-foreground/90 mb-6">
                  "The best architecture is rarely the most complex one. It's the one that's{" "}
                  <span className="gradient-text-accent">easiest to operate</span>, monitor, and evolve."
                </blockquote>
                <p className="text-base text-muted-foreground leading-relaxed max-w-lg">
                  I choose boring tech when it's the right call. I reach for cutting-edge when the problem demands it.
                  The decision framework doesn't change — only the output does.
                </p>
              </div>

              <div className="lg:col-span-4 grid grid-cols-3 lg:grid-cols-1 gap-6">
                <AnimatedStat to={20} suffix="+"  label="Production decisions" inView={headerInView} delay={0.4} />
                <AnimatedStat to={6}  suffix=" yrs" label="Avg system lifespan"  inView={headerInView} delay={0.5} />
                <AnimatedStat to={99} suffix="%"  label="Uptime SLA maintained" inView={headerInView} delay={0.6} />
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── 2. COMPARISON CARDS ── */}
        <div ref={cardsRef} className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={cardsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-end justify-between mb-10"
          >
            <div>
              <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-2">
                / Comparisons
              </p>
              <h3 className="text-3xl lg:text-4xl font-semibold tracking-tight">
                Why I chose what I chose.
              </h3>
            </div>
            <div className="hidden lg:flex items-center gap-4 text-[11px] font-mono text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Check className="w-3 h-3 text-emerald-400" /> Selected
              </span>
              <span className="flex items-center gap-1.5">
                <X className="w-3 h-3 text-rose-400/60" /> Rejected
              </span>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {COMPARISONS.map((c, i) => (
              <ComparisonCard key={c.chosen} c={c} index={i} inView={cardsInView} />
            ))}
          </div>
        </div>

        {/* ── 3. DECISION TIMELINE ── */}
        <div ref={timelineRef} className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={timelineInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-2">
              / Process
            </p>
            <h3 className="text-3xl lg:text-4xl font-semibold tracking-tight">
              How every decision gets made.
            </h3>
          </motion.div>

          <div
            className="relative overflow-hidden rounded-[1.5rem] border border-white/[0.07] bg-gradient-to-b from-[hsl(220_40%_9%/0.7)] to-[hsl(220_40%_6%/0.5)] backdrop-blur-xl p-8 lg:p-12"
            style={{ boxShadow: "0 1px 0 hsl(0 0% 100% / 0.04) inset" }}
          >
            <div className="absolute inset-0 grid-pattern opacity-[0.25] pointer-events-none" />
            <div className="relative">
              <DecisionTimeline inView={timelineInView} />
            </div>
          </div>
        </div>

        {/* ── 4. TRADE-OFF MATRIX ── */}
        <div ref={matrixRef} className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={matrixInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-2">
              / Trade-off Matrix
            </p>
            <h3 className="text-3xl lg:text-4xl font-semibold tracking-tight">
              Every choice, scored.
            </h3>
          </motion.div>

          <div
            className="relative overflow-hidden rounded-[1.5rem] border border-white/[0.07] bg-gradient-to-b from-[hsl(220_40%_9%/0.7)] to-[hsl(220_40%_6%/0.5)] backdrop-blur-xl p-8 lg:p-10"
            style={{ boxShadow: "0 1px 0 hsl(0 0% 100% / 0.04) inset" }}
          >
            <div className="absolute inset-0 grid-pattern opacity-[0.25] pointer-events-none" />
            <div className="relative">
              <TradeoffMatrix inView={matrixInView} />
            </div>
          </div>
        </div>

        {/* ── 5. PRINCIPLES ── */}
        <div ref={principlesRef} className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={principlesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-2">
              / Core Principles
            </p>
            <h3 className="text-3xl lg:text-4xl font-semibold tracking-tight">
              Non-negotiables in every system.
            </h3>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {PRINCIPLES.map((p, i) => (
              <PrincipleCard key={p.title} p={p} index={i} inView={principlesInView} />
            ))}
          </div>
        </div>

        {/* ── 6. BOTTOM QUOTE ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={principlesInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="relative text-center py-16"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_50%,hsl(199_89%_60%/0.07),transparent_70%)] pointer-events-none" />
          <div className="relative">
            <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-8">
              / The bottom line
            </p>
            <blockquote className="text-2xl lg:text-4xl font-semibold tracking-tight leading-[1.2] max-w-3xl mx-auto">
              <span className="text-foreground/50">"Great engineering isn't choosing</span>{" "}
              <span className="serif-italic gradient-text-accent">the newest tool.</span>{" "}
              <span className="text-foreground/50">It's choosing</span>{" "}
              <span className="gradient-text">the right tool for the right problem."</span>
            </blockquote>
          </div>
        </motion.div>

      </div>
    </section>
  );
};