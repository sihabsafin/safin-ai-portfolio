"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

// ─── Data ───────────────────────────────────────────────────────────────────

const FEATURED_REPO = {
  name: "Enterprise RAG Starter",
  tagline: "Production-ready AI retrieval system for enterprise scale.",
  purpose:
    "A batteries-included starter template that compresses months of RAG architecture decisions into a single deployable codebase — authentication, vector search, streaming, and observability out of the box.",
  status: "Active",
  stars: "248",
  impact: "Used by 30+ teams to bootstrap AI search in production.",
  architecture: [
    { layer: "API Layer", tech: "FastAPI + async streaming" },
    { layer: "Orchestration", tech: "LangGraph state machine" },
    { layer: "Vector Store", tech: "Qdrant with hybrid search" },
    { layer: "Cache / Queue", tech: "Redis + Celery workers" },
    { layer: "Auth", tech: "JWT + OAuth2 PKCE" },
    { layer: "Infra", tech: "Docker Compose → AWS ECS" },
  ],
  tech: ["FastAPI", "LangGraph", "Qdrant", "Redis", "Docker", "AWS", "JWT", "Python"],
};

const RESEARCH_TOPICS = [
  { title: "Reasoning Models", status: "Researching", icon: "🧠", desc: "Chain-of-thought, tree-of-thought, and test-time compute scaling in o-series models." },
  { title: "Long-Term AI Memory", status: "Experimenting", icon: "🗃️", desc: "Episodic memory architectures, semantic compression, and user-scoped persistent state." },
  { title: "Model Context Protocol", status: "Building", icon: "🔌", desc: "Tool-calling standards and composable agent interfaces via the Anthropic MCP spec." },
  { title: "AI Browsers", status: "Exploring", icon: "🌐", desc: "Browser-native agents, DOM interaction, and autonomous web navigation patterns." },
  { title: "Multi-Agent Systems", status: "Daily Research", icon: "🤝", desc: "Supervisor–worker topologies, inter-agent communication, and fault-tolerant orchestration." },
  { title: "Edge AI Inference", status: "Exploring", icon: "⚡", desc: "Quantization, ONNX export, and sub-100ms inference on constrained hardware." },
];

const CONTRIBUTIONS = [
  { org: "LangGraph", type: "Contributed Examples", color: "#6366f1" },
  { org: "CrewAI", type: "Community Templates", color: "#8b5cf6" },
  { org: "FastAPI", type: "Utilities & Docs", color: "#3b82f6" },
  { org: "Open Source AI Tools", type: "Maintainer", color: "#06b6d4" },
];

const ROADMAP = [
  { label: "Production LLMs", state: "mastered" },
  { label: "AI Agents", state: "mastered" },
  { label: "Enterprise RAG", state: "mastered" },
  { label: "Prompt Engineering", state: "mastered" },
  { label: "LangGraph Pipelines", state: "building" },
  { label: "MCP Integration", state: "building" },
  { label: "Reasoning Models", state: "learning" },
  { label: "Long-Term Memory", state: "learning" },
  { label: "AI Operating Systems", state: "exploring" },
  { label: "Edge AI Inference", state: "exploring" },
];

const STATE_META: Record<string, { label: string; color: string; glow: string; dot: string }> = {
  mastered:  { label: "Mastered",  color: "#22d3ee", glow: "rgba(34,211,238,0.25)",   dot: "#22d3ee" },
  building:  { label: "Building",  color: "#818cf8", glow: "rgba(129,140,248,0.25)",  dot: "#818cf8" },
  learning:  { label: "Learning",  color: "#f472b6", glow: "rgba(244,114,182,0.25)",  dot: "#f472b6" },
  exploring: { label: "Exploring", color: "#fb923c", glow: "rgba(251,146,60,0.25)",   dot: "#fb923c" },
};

const READING_LIST = [
  { title: "Attention Is All You Need", year: "2017", authors: "Vaswani et al.", tag: "Transformers" },
  { title: "ReAct: Synergizing Reasoning & Acting", year: "2023", authors: "Yao et al.", tag: "Agents" },
  { title: "Retrieval-Augmented Generation", year: "2020", authors: "Lewis et al.", tag: "RAG" },
  { title: "DSPy: Compiling Declarative LM Calls", year: "2023", authors: "Khattab et al.", tag: "DSPy" },
  { title: "LangGraph: Stateful Agent Runtimes", year: "2024", authors: "Chase et al.", tag: "Orchestration" },
  { title: "Constitutional AI (Anthropic)", year: "2022", authors: "Bai et al.", tag: "Alignment" },
];

const CURIOSITIES = [
  "Model Context Protocol (MCP)",
  "Long-Term AI Memory",
  "Reasoning Models",
  "AI Browsers",
  "Multi-Agent Collaboration",
  "Edge AI Inference",
  "AI Operating Systems",
];

// ─── Micro helpers ───────────────────────────────────────────────────────────

const StatusBadge = ({ status }: { status: string }) => {
  const colors: Record<string, string> = {
    "Active": "#22d3ee",
    "Researching": "#818cf8",
    "Experimenting": "#f472b6",
    "Building": "#6366f1",
    "Exploring": "#fb923c",
    "Daily Research": "#22d3ee",
  };
  const c = colors[status] ?? "#94a3b8";
  return (
    <span
      style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        padding: "4px 12px", borderRadius: 999,
        border: `1px solid ${c}44`,
        background: `${c}15`,
        color: c, fontSize: 11, fontWeight: 600, letterSpacing: "0.08em",
        textTransform: "uppercase",
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: c, boxShadow: `0 0 6px ${c}` }} />
      {status}
    </span>
  );
};

// ─── Stagger container ───────────────────────────────────────────────────────

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

// ─── Section ─────────────────────────────────────────────────────────────────

export default function OpenSourceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const meshY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  const [expandedRepo, setExpandedRepo] = useState(false);
  const [hoveredRoadmap, setHoveredRoadmap] = useState<string | null>(null);

  return (
    <section
      ref={sectionRef}
      id="open-source"
      style={{
        position: "relative",
        background: "#050d1a",
        overflow: "hidden",
        padding: "140px 0 160px",
        fontFamily: "'Inter', 'DM Sans', system-ui, sans-serif",
      }}
    >
      {/* ── Background mesh / glow ── */}
      <motion.div style={{ y: meshY, position: "absolute", inset: 0, pointerEvents: "none" }}>
        {/* Grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `linear-gradient(rgba(99,102,241,0.06) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(99,102,241,0.06) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }} />
        {/* Radial glows */}
        <div style={{
          position: "absolute", top: "-10%", left: "50%", transform: "translateX(-50%)",
          width: 900, height: 600,
          background: "radial-gradient(ellipse at center, rgba(99,102,241,0.13) 0%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute", bottom: "5%", right: "-10%",
          width: 600, height: 600,
          background: "radial-gradient(ellipse at center, rgba(6,182,212,0.09) 0%, transparent 70%)",
        }} />
        {/* Horizontal shimmer line */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 1,
          background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent)",
        }} />
      </motion.div>

      <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>

        {/* ════════════════════════════════════════
            EDITORIAL HEADING
        ════════════════════════════════════════ */}
        <motion.div
          ref={heroRef}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", marginBottom: 96 }}
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1, duration: 0.5 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "8px 20px", borderRadius: 999,
              border: "1px solid rgba(99,102,241,0.35)",
              background: "rgba(99,102,241,0.08)",
              marginBottom: 40,
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#6366f1", boxShadow: "0 0 8px #6366f1" }} />
            <span style={{ color: "#a5b4fc", fontSize: 12, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" }}>
              Open Source & Research
            </span>
          </motion.div>

          {/* Main headline */}
          <h2 style={{ margin: 0, lineHeight: 1.05 }}>
            {["Building", "Beyond", "Client Projects."].map((word, i) => (
              <motion.div
                key={word}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: "block" }}
              >
                {word === "Beyond" ? (
                  <span style={{
                    fontFamily: "'Instrument Serif', 'Georgia', serif",
                    fontStyle: "italic",
                    fontSize: "clamp(56px, 9vw, 112px)",
                    background: "linear-gradient(135deg, #a78bfa 0%, #38bdf8 55%, #6366f1 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}>
                    {word}
                  </span>
                ) : (
                  <span style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(52px, 8.5vw, 108px)",
                    color: word === "Client Projects." ? "rgba(148,163,184,0.5)" : "#f1f5f9",
                    letterSpacing: "-0.03em",
                  }}>
                    {word}
                  </span>
                )}
              </motion.div>
            ))}
          </h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.65, duration: 0.8 }}
            style={{
              maxWidth: 600, margin: "32px auto 0",
              color: "#64748b", fontSize: 18, lineHeight: 1.75,
              fontWeight: 400,
            }}
          >
            Great engineers don't just ship products. They contribute{" "}
            <em style={{ color: "#94a3b8", fontStyle: "normal" }}>knowledge, tools, research,</em>
            {" "}and ideas back to the community.
          </motion.p>
        </motion.div>

        {/* ════════════════════════════════════════
            FEATURED REPOSITORY
        ════════════════════════════════════════ */}
        <SectionLabel label="Featured Repository" />

        <motion.div
          variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}
          style={{ marginBottom: 96 }}
        >
          <motion.div variants={fadeUp}>
            <motion.div
              onClick={() => setExpandedRepo(!expandedRepo)}
              whileHover={{ scale: 1.005 }}
              style={{
                position: "relative", overflow: "hidden", cursor: "pointer",
                borderRadius: 24,
                border: "1px solid rgba(99,102,241,0.25)",
                background: "linear-gradient(135deg, rgba(15,23,42,0.9) 0%, rgba(17,24,39,0.95) 100%)",
                backdropFilter: "blur(20px)",
                padding: "48px 52px",
              }}
            >
              {/* Glow accent */}
              <div style={{
                position: "absolute", top: -80, right: -80,
                width: 400, height: 400,
                background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
                pointerEvents: "none",
              }} />

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "start" }}>
                {/* Left */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 12,
                      background: "linear-gradient(135deg, #6366f1, #3b82f6)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 20,
                    }}>
                      🗂️
                    </div>
                    <div>
                      <h3 style={{ margin: 0, color: "#f1f5f9", fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>
                        {FEATURED_REPO.name}
                      </h3>
                      <div style={{ marginTop: 6 }}><StatusBadge status={FEATURED_REPO.status} /></div>
                    </div>
                  </div>

                  <p style={{ color: "#94a3b8", fontSize: 16, lineHeight: 1.7, margin: "0 0 28px" }}>
                    {FEATURED_REPO.purpose}
                  </p>

                  {/* Stats row */}
                  <div style={{ display: "flex", gap: 24, marginBottom: 32 }}>
                    {[
                      { label: "Stars", value: FEATURED_REPO.stars },
                      { label: "Teams using it", value: "30+" },
                      { label: "Layers", value: "6" },
                    ].map(s => (
                      <div key={s.label}>
                        <div style={{ color: "#6366f1", fontSize: 22, fontWeight: 800 }}>{s.value}</div>
                        <div style={{ color: "#475569", fontSize: 12, marginTop: 2 }}>{s.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Tech pills */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {FEATURED_REPO.tech.map(t => (
                      <motion.span
                        key={t}
                        whileHover={{ background: "rgba(99,102,241,0.25)", borderColor: "rgba(99,102,241,0.6)" }}
                        style={{
                          padding: "5px 14px", borderRadius: 999,
                          border: "1px solid rgba(99,102,241,0.2)",
                          background: "rgba(99,102,241,0.08)",
                          color: "#a5b4fc", fontSize: 12, fontWeight: 600,
                          transition: "all 0.2s",
                        }}
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Right – Architecture */}
                <div>
                  <div style={{
                    borderRadius: 16,
                    border: "1px solid rgba(99,102,241,0.15)",
                    background: "rgba(10,15,30,0.7)",
                    overflow: "hidden",
                  }}>
                    <div style={{
                      padding: "14px 20px",
                      borderBottom: "1px solid rgba(99,102,241,0.12)",
                      display: "flex", alignItems: "center", gap: 8,
                    }}>
                      {["#ff5f57","#febc2e","#28c840"].map(c => (
                        <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
                      ))}
                      <span style={{ color: "#475569", fontSize: 11, marginLeft: 8, fontFamily: "monospace" }}>
                        architecture.md
                      </span>
                    </div>
                    <div style={{ padding: "24px 20px" }}>
                      {FEATURED_REPO.architecture.map((row, i) => (
                        <motion.div
                          key={row.layer}
                          initial={{ opacity: 0, x: -10 }}
                          animate={inView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: 0.4 + i * 0.07, duration: 0.4 }}
                          style={{
                            display: "flex", alignItems: "center", gap: 12,
                            padding: "10px 0",
                            borderBottom: i < FEATURED_REPO.architecture.length - 1
                              ? "1px solid rgba(99,102,241,0.08)" : "none",
                          }}
                        >
                          <div style={{
                            width: 6, height: 6, borderRadius: "50%", flexShrink: 0,
                            background: `hsl(${220 + i * 15},70%,65%)`,
                            boxShadow: `0 0 6px hsl(${220 + i * 15},70%,65%)`,
                          }} />
                          <span style={{ color: "#64748b", fontSize: 11, width: 100, flexShrink: 0, fontFamily: "monospace" }}>
                            {row.layer}
                          </span>
                          <span style={{ color: "#cbd5e1", fontSize: 12, fontFamily: "monospace" }}>
                            {row.tech}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <motion.div
                    animate={{ opacity: expandedRepo ? 1 : 0.7 }}
                    style={{
                      marginTop: 20, padding: "16px 20px", borderRadius: 12,
                      background: "rgba(34,211,238,0.05)",
                      border: "1px solid rgba(34,211,238,0.15)",
                    }}
                  >
                    <p style={{ margin: 0, color: "#94a3b8", fontSize: 13, lineHeight: 1.6 }}>
                      💡 <span style={{ color: "#22d3ee" }}>Impact:</span>{" "}{FEATURED_REPO.impact}
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ════════════════════════════════════════
            RESEARCH & EXPERIMENTS
        ════════════════════════════════════════ */}
        <SectionLabel label="Research & Experiments" />

        <motion.div
          variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}
          style={{
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16, marginBottom: 96,
          }}
        >
          {RESEARCH_TOPICS.map((t) => (
            <motion.div key={t.title} variants={fadeUp}>
              <ResearchCard topic={t} />
            </motion.div>
          ))}
        </motion.div>

        {/* ════════════════════════════════════════
            OPEN SOURCE CONTRIBUTIONS
        ════════════════════════════════════════ */}
        <SectionLabel label="Open Source Contributions" />

        <motion.div
          variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}
          style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 96 }}
        >
          {CONTRIBUTIONS.map((c) => (
            <motion.div key={c.org} variants={fadeUp}>
              <motion.div
                whileHover={{ y: -4, borderColor: `${c.color}55` }}
                style={{
                  padding: "28px 24px", borderRadius: 16,
                  border: "1px solid rgba(255,255,255,0.07)",
                  background: "rgba(15,23,42,0.7)",
                  backdropFilter: "blur(12px)",
                  transition: "all 0.3s",
                }}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: 10, marginBottom: 16,
                  background: `${c.color}22`, border: `1px solid ${c.color}44`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 16,
                }}>
                  📦
                </div>
                <div style={{ color: "#f1f5f9", fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{c.org}</div>
                <div style={{ color: "#64748b", fontSize: 12 }}>{c.type}</div>
                <div style={{
                  marginTop: 16, fontSize: 11, color: c.color,
                  fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase",
                }}>
                  Planned →
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* ════════════════════════════════════════
            LEARNING ROADMAP
        ════════════════════════════════════════ */}
        <SectionLabel label="Learning Roadmap" />

        <motion.div
          variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}
          style={{ marginBottom: 96 }}
        >
          <motion.div variants={fadeUp}>
            <div style={{
              borderRadius: 24,
              border: "1px solid rgba(99,102,241,0.15)",
              background: "rgba(10,15,30,0.6)",
              backdropFilter: "blur(20px)",
              padding: "48px 52px",
            }}>
              {/* Legend */}
              <div style={{ display: "flex", gap: 24, marginBottom: 40, flexWrap: "wrap" }}>
                {Object.entries(STATE_META).map(([key, m]) => (
                  <div key={key} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: m.color, boxShadow: `0 0 6px ${m.color}` }} />
                    <span style={{ color: m.color, fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>{m.label}</span>
                  </div>
                ))}
              </div>

              {/* Timeline */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
                {ROADMAP.map((item, i) => {
                  const m = STATE_META[item.state];
                  const isHovered = hoveredRoadmap === item.label;
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + i * 0.06, duration: 0.5 }}
                      onHoverStart={() => setHoveredRoadmap(item.label)}
                      onHoverEnd={() => setHoveredRoadmap(null)}
                      style={{
                        display: "flex", alignItems: "center", gap: 16,
                        padding: "16px 20px", borderRadius: 12,
                        border: `1px solid ${isHovered ? m.color + "44" : "rgba(255,255,255,0.05)"}`,
                        background: isHovered ? m.glow : "rgba(255,255,255,0.02)",
                        cursor: "default",
                        transition: "all 0.25s",
                      }}
                    >
                      <span style={{
                        width: 10, height: 10, borderRadius: "50%", flexShrink: 0,
                        background: m.dot,
                        boxShadow: isHovered ? `0 0 12px ${m.dot}` : `0 0 6px ${m.dot}66`,
                        transition: "box-shadow 0.25s",
                      }} />
                      <span style={{ color: isHovered ? "#f1f5f9" : "#94a3b8", fontSize: 14, fontWeight: 500, flex: 1 }}>
                        {item.label}
                      </span>
                      <span style={{
                        fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
                        textTransform: "uppercase", color: m.color,
                        opacity: isHovered ? 1 : 0.6, transition: "opacity 0.2s",
                      }}>
                        {m.label}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ════════════════════════════════════════
            READING LIST  +  CURRENTLY CURIOUS
        ════════════════════════════════════════ */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 28, marginBottom: 96 }}>

          {/* Reading list */}
          <div>
            <SectionLabel label="AI Reading List" />
            <motion.div
              variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}
              style={{ display: "flex", flexDirection: "column", gap: 10 }}
            >
              {READING_LIST.map((paper, i) => (
                <motion.div key={paper.title} variants={fadeUp}>
                  <motion.div
                    whileHover={{ x: 4, borderColor: "rgba(99,102,241,0.35)" }}
                    style={{
                      display: "flex", alignItems: "center", gap: 20,
                      padding: "18px 24px", borderRadius: 14,
                      border: "1px solid rgba(255,255,255,0.06)",
                      background: "rgba(15,23,42,0.6)",
                      backdropFilter: "blur(10px)",
                      transition: "all 0.25s",
                    }}
                  >
                    <span style={{
                      width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                      background: `hsl(${220 + i * 20},60%,22%)`,
                      border: `1px solid hsl(${220 + i * 20},60%,35%)`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 12,
                    }}>📄</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ color: "#e2e8f0", fontSize: 14, fontWeight: 600 }}>{paper.title}</div>
                      <div style={{ color: "#475569", fontSize: 12, marginTop: 2 }}>{paper.authors} · {paper.year}</div>
                    </div>
                    <span style={{
                      padding: "3px 10px", borderRadius: 999, fontSize: 10,
                      fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
                      background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.25)",
                      color: "#a5b4fc",
                    }}>
                      {paper.tag}
                    </span>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Currently Curious */}
          <div>
            <SectionLabel label="Currently Curious About" />
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              style={{
                borderRadius: 20,
                border: "1px solid rgba(251,146,60,0.2)",
                background: "linear-gradient(135deg, rgba(15,23,42,0.9), rgba(20,10,30,0.9))",
                backdropFilter: "blur(20px)",
                padding: "32px 28px",
                position: "sticky", top: 120,
              }}
            >
              {/* Top glow */}
              <div style={{
                position: "absolute", top: -30, right: -30,
                width: 200, height: 200,
                background: "radial-gradient(circle, rgba(251,146,60,0.1) 0%, transparent 70%)",
                pointerEvents: "none",
              }} />

              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
                <span style={{ fontSize: 20 }}>🔭</span>
                <span style={{ color: "#fb923c", fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                  On My Radar
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {CURIOSITIES.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -12 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.07, duration: 0.4 }}
                    whileHover={{ x: 4 }}
                    style={{
                      display: "flex", alignItems: "center", gap: 12,
                      padding: "10px 14px", borderRadius: 10,
                      background: "rgba(251,146,60,0.04)",
                      border: "1px solid rgba(251,146,60,0.08)",
                      cursor: "default", transition: "transform 0.2s",
                    }}
                  >
                    <span style={{
                      width: 5, height: 5, borderRadius: "50%", flexShrink: 0,
                      background: "#fb923c", boxShadow: "0 0 5px #fb923c",
                    }} />
                    <span style={{ color: "#cbd5e1", fontSize: 13, fontWeight: 500 }}>{item}</span>
                  </motion.div>
                ))}
              </div>

              <div style={{
                marginTop: 24, padding: "14px 16px", borderRadius: 10,
                background: "rgba(251,146,60,0.06)",
                border: "1px solid rgba(251,146,60,0.12)",
              }}>
                <p style={{ margin: 0, color: "#6b7280", fontSize: 12, lineHeight: 1.6, fontStyle: "italic" }}>
                  These don't claim expertise — they signal continuous evolution with the field.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ════════════════════════════════════════
            PHILOSOPHY QUOTE
        ════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.9 }}
          style={{
            textAlign: "center", padding: "80px 40px",
            position: "relative",
          }}
        >
          {/* Hairline rules */}
          <div style={{
            position: "absolute", top: "50%", left: 0, right: 0,
            height: 1,
            background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.3), transparent)",
            pointerEvents: "none",
          }} />

          <div style={{
            display: "inline-block",
            background: "#050d1a",
            padding: "0 60px",
            position: "relative",
          }}>
            <div style={{
              color: "#6366f1", fontSize: 48, fontFamily: "'Georgia', serif",
              lineHeight: 1, marginBottom: 16, opacity: 0.5,
            }}>
              "
            </div>
            <p style={{
              margin: 0,
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              background: "linear-gradient(135deg, #e2e8f0, #94a3b8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Knowledge grows<br />
              <span style={{
                fontFamily: "'Instrument Serif', 'Georgia', serif",
                fontStyle: "italic",
                background: "linear-gradient(135deg, #a78bfa, #38bdf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                when it's shared.
              </span>
            </p>
          </div>
        </motion.div>

        {/* ════════════════════════════════════════
            BOTTOM CTA
        ════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.7 }}
          style={{
            textAlign: "center",
            padding: "48px 40px",
            borderRadius: 24,
            border: "1px solid rgba(99,102,241,0.2)",
            background: "linear-gradient(135deg, rgba(99,102,241,0.06), rgba(6,182,212,0.04))",
            backdropFilter: "blur(16px)",
            position: "relative", overflow: "hidden",
          }}
        >
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse at center, rgba(99,102,241,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
          <p style={{ margin: "0 0 8px", color: "#94a3b8", fontSize: 16 }}>
            Interested in collaborating on open-source AI?
          </p>
          <p style={{ margin: "0 0 32px", color: "#f1f5f9", fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>
            Let's build together.
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04, boxShadow: "0 0 32px rgba(99,102,241,0.4)" }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "14px 36px", borderRadius: 999,
              background: "linear-gradient(135deg, #6366f1, #3b82f6)",
              color: "#fff", fontSize: 15, fontWeight: 700,
              textDecoration: "none", letterSpacing: "-0.01em",
              boxShadow: "0 0 20px rgba(99,102,241,0.3)",
            }}
          >
            Start a Conversation
            <span style={{ fontSize: 18 }}>→</span>
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}

// ─── Shared sub-components ────────────────────────────────────────────────────

function SectionLabel({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
      <span style={{
        color: "#6366f1", fontSize: 11, fontWeight: 700,
        letterSpacing: "0.14em", textTransform: "uppercase",
      }}>
        {label}
      </span>
      <div style={{ flex: 1, height: 1, background: "rgba(99,102,241,0.15)" }} />
    </div>
  );
}

function ResearchCard({ topic }: { topic: typeof RESEARCH_TOPICS[0] }) {
  const [hovered, setHovered] = useState(false);

  const statusColors: Record<string, string> = {
    "Researching": "#818cf8",
    "Experimenting": "#f472b6",
    "Building": "#6366f1",
    "Exploring": "#fb923c",
    "Daily Research": "#22d3ee",
  };
  const c = statusColors[topic.status] ?? "#94a3b8";

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -4, borderColor: `${c}44` }}
      style={{
        padding: "28px 24px", borderRadius: 16,
        border: `1px solid ${hovered ? c + "33" : "rgba(255,255,255,0.07)"}`,
        background: hovered ? `${c}08` : "rgba(15,23,42,0.7)",
        backdropFilter: "blur(12px)",
        transition: "all 0.3s",
        position: "relative", overflow: "hidden",
      }}
    >
      {hovered && (
        <div style={{
          position: "absolute", top: -40, right: -40,
          width: 150, height: 150,
          background: `radial-gradient(circle, ${c}18 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />
      )}
      <div style={{ fontSize: 28, marginBottom: 14 }}>{topic.icon}</div>
      <h4 style={{ margin: "0 0 8px", color: "#f1f5f9", fontSize: 15, fontWeight: 700 }}>{topic.title}</h4>
      <p style={{ margin: "0 0 16px", color: "#64748b", fontSize: 13, lineHeight: 1.6 }}>{topic.desc}</p>
      <StatusBadge status={topic.status} />
    </motion.div>
  );
}