import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, ArrowDown } from "lucide-react";

const aiStack = [
  "OpenAI", "Claude", "Gemini", "LangChain", "LangGraph",
  "CrewAI", "LlamaIndex", "FastAPI", "Docker", "AWS",
  "Pinecone", "Qdrant", "Redis",
];

const stats = [
  { value: "20+", label: "AI Systems Delivered" },
  { value: "5+", label: "Enterprise Products" },
  { value: "500K+", label: "AI Responses Processed" },
  { value: "99%", label: "Client Satisfaction" },
];

const floatingMetrics = [
  { label: "Latency", value: "18ms", x: "left-[-18px]", y: "top-[14%]", delay: 0 },
  { label: "Context", value: "200K", x: "right-[-10px]", y: "top-[22%]", delay: 0.8 },
  { label: "Accuracy", value: "98.7%", x: "right-[-24px]", y: "bottom-[28%]", delay: 1.4 },
  { label: "Agents", value: "6 Active", x: "left-[-8px]", y: "bottom-[18%]", delay: 0.5 },
  { label: "Tokens", value: "2.4M", x: "left-[38%]", y: "top-[-18px]", delay: 1.1 },
];

const floatY = [
  [0, -12, 0],
  [0, 10, 0],
  [0, -8, 0],
  [0, 14, 0],
  [0, -10, 0],
];

// Animated particle dots
const Particles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {Array.from({ length: 22 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full bg-secondary/30"
        style={{
          width: Math.random() * 3 + 1,
          height: Math.random() * 3 + 1,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, Math.random() * -40 - 10, 0],
          opacity: [0, 0.6, 0],
        }}
        transition={{
          duration: Math.random() * 8 + 6,
          repeat: Infinity,
          delay: Math.random() * 6,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

const NeuralOrb = () => (
  <div className="relative w-full aspect-square max-w-[520px] mx-auto select-none">
    {/* Background glow layers */}
    <motion.div
      animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.85, 0.5] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      className="absolute inset-[8%] rounded-full"
      style={{
        background: "radial-gradient(circle at 32% 32%, rgba(56,189,248,0.5), rgba(79,70,229,0.28) 50%, transparent 72%)",
        filter: "blur(36px)",
      }}
    />
    <motion.div
      animate={{ scale: [1.06, 1, 1.06], opacity: [0.4, 0.7, 0.4] }}
      transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      className="absolute inset-[22%] rounded-full"
      style={{
        background: "radial-gradient(circle at 68% 68%, rgba(79,70,229,0.55), transparent 65%)",
        filter: "blur(24px)",
      }}
    />

    {/* Rotating outer ring */}
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      className="absolute inset-0"
    >
      <svg viewBox="0 0 400 400" className="w-full h-full">
        <circle cx="200" cy="200" r="194" fill="none" stroke="rgba(56,189,248,0.08)" strokeWidth="1" strokeDasharray="4 12" />
      </svg>
    </motion.div>

    {/* Counter-rotating ring */}
    <motion.div
      animate={{ rotate: -360 }}
      transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      className="absolute inset-[6%]"
    >
      <svg viewBox="0 0 400 400" className="w-full h-full">
        <circle cx="200" cy="200" r="185" fill="none" stroke="rgba(79,70,229,0.10)" strokeWidth="1" strokeDasharray="2 8" />
      </svg>
    </motion.div>

    {/* Main neural SVG */}
    <svg viewBox="0 0 400 400" className="relative w-full h-full">
      <defs>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.65" />
        </linearGradient>
        <radialGradient id="nodeGrad">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="60%" stopColor="#38BDF8" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.3" />
        </radialGradient>
        <radialGradient id="centerGrad">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="40%" stopColor="#38BDF8" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.4" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Static rings */}
      <circle cx="200" cy="200" r="148" fill="none" stroke="rgba(255,255,255,0.04)" />
      <circle cx="200" cy="200" r="96" fill="none" stroke="rgba(255,255,255,0.06)" />
      <circle cx="200" cy="200" r="50" fill="none" stroke="rgba(56,189,248,0.12)" />

      {/* Connection lines */}
      {[
        [58, 118, 200, 200], [342, 76, 200, 200], [76, 298, 200, 200],
        [324, 316, 200, 200], [200, 28, 200, 200], [28, 200, 200, 200],
        [372, 200, 200, 200], [200, 372, 200, 200],
        [58, 118, 342, 76], [76, 298, 324, 316],
        [200, 28, 372, 200], [28, 200, 200, 372],
        [142, 68, 258, 68], [68, 260, 130, 320],
      ].map(([x1, y1, x2, y2], i) => (
        <motion.line
          key={i}
          x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="url(#lineGrad)" strokeWidth="0.8"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 0.55, 0.35] }}
          transition={{ duration: 1.8, delay: 0.3 + i * 0.07, ease: "easeOut" }}
        />
      ))}

      {/* Pulse traveling along a line */}
      <motion.circle
        r="3"
        fill="#38BDF8"
        opacity="0.9"
        filter="url(#glow)"
        animate={{
          cx: [58, 200, 342],
          cy: [118, 200, 76],
          opacity: [0, 0.9, 0],
        }}
        transition={{ duration: 3, repeat: Infinity, delay: 2, ease: "easeInOut" }}
      />
      <motion.circle
        r="2.5"
        fill="#818CF8"
        opacity="0.8"
        animate={{
          cx: [200, 28, 200],
          cy: [28, 200, 372],
          opacity: [0, 0.8, 0],
        }}
        transition={{ duration: 4, repeat: Infinity, delay: 3.5, ease: "easeInOut" }}
      />

      {/* Outer nodes */}
      {[
        [58, 118, 5.5], [342, 76, 6.5], [76, 298, 5], [324, 316, 5.5],
        [200, 28, 4], [28, 200, 4.5], [372, 200, 4.5], [200, 372, 4],
        [142, 68, 4], [258, 68, 3.5], [68, 260, 3.5], [130, 320, 3.5],
      ].map(([cx, cy, r], i) => (
        <motion.circle
          key={i}
          cx={cx} cy={cy} r={r}
          fill="url(#nodeGrad)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 + i * 0.06, type: "spring", stiffness: 200 }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
      ))}

      {/* Center node with pulse */}
      <motion.circle
        cx="200" cy="200" r="22"
        fill="url(#centerGrad)"
        filter="url(#glow)"
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "200px 200px" }}
      />
      <motion.circle
        cx="200" cy="200" r="34"
        fill="none"
        stroke="rgba(56,189,248,0.25)"
        strokeWidth="1"
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeOut" }}
        style={{ transformOrigin: "200px 200px" }}
      />
    </svg>

    {/* Floating metric cards */}
    {floatingMetrics.map((m, i) => (
      <motion.div
        key={m.label}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, y: floatY[i] }}
        transition={{
          opacity: { duration: 0.5, delay: 1.4 + i * 0.15 },
          scale: { duration: 0.5, delay: 1.4 + i * 0.15 },
          y: { duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: m.delay },
        }}
        className={`absolute ${m.x} ${m.y} glass-card px-3 py-2`}
        style={{ borderRadius: "10px" }}
      >
        <div className="text-[10px] font-mono text-muted-foreground leading-tight">{m.label}</div>
        <div className="text-[13px] font-semibold font-mono text-secondary leading-tight">{m.value}</div>
      </motion.div>
    ))}

    {/* agent.run() pill */}
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 1.8 }}
      className="absolute top-[44%] -left-6 glass-card px-3 py-2"
      style={{ borderRadius: "10px" }}
    >
      <div className="flex items-center gap-2">
        <span className="live-dot" style={{ width: 6, height: 6 }} />
        <span className="text-[11px] font-mono text-foreground/80">agent.run()</span>
      </div>
    </motion.div>
  </div>
);

export const HeroSection = () => {
  return (
    <section className="relative min-h-[calc(100vh+120px)] flex items-center pt-36 pb-28 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      {/* Mesh gradient spotlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% -5%, rgba(56,189,248,0.13) 0%, transparent 60%), " +
            "radial-gradient(ellipse 50% 40% at 85% 15%, rgba(79,70,229,0.12) 0%, transparent 55%), " +
            "radial-gradient(ellipse 40% 35% at 15% 75%, rgba(56,189,248,0.07) 0%, transparent 55%)",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(5,7,11,0.7) 100%)",
        }}
      />

      {/* Animated background orbs */}
      <motion.div
        animate={{ x: [0, 50, 0], y: [0, -35, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-48 -left-48 w-[700px] h-[700px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <motion.div
        animate={{ x: [0, -35, 0], y: [0, 45, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 -right-48 w-[700px] h-[700px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(79,70,229,0.10) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <Particles />

      <div className="container-narrow relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">

          {/* ── Left Column ── */}
          <div className="lg:col-span-7 flex flex-col">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="inline-flex items-center gap-2.5 self-start px-4 py-2 rounded-full mb-10"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.10)",
                backdropFilter: "blur(20px)",
              }}
            >
              <span className="live-dot" />
              <span className="text-xs font-medium text-foreground/90">Available for AI Consulting</span>
              <span
                className="hidden sm:block w-px h-3 bg-white/20"
              />
              <span className="text-xs text-muted-foreground hidden sm:inline">
                Generative AI · AI Agents · Enterprise LLM Systems
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.06 }}
              className="text-[46px] sm:text-[62px] lg:text-[76px] xl:text-[88px] font-semibold leading-[1.01] tracking-[-0.04em] text-balance mb-8"
            >
              <span className="text-foreground">Building</span>
              <br />
              <span className="serif-italic gradient-text-accent">Intelligent Systems</span>
              <br />
              <span className="text-foreground/90">People Actually </span>
              <span className="gradient-text">Use.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed mb-10"
            >
              Generative AI Engineer specializing in production-grade LLMs, autonomous AI agents,
              RAG pipelines and enterprise machine learning systems that solve real business problems.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.26 }}
              className="flex flex-wrap items-center gap-3 mb-5"
            >
              <Button variant="hero" size="lg" asChild>
                <a href="#projects">
                  <BookOpen className="w-4 h-4" />
                  View Case Studies
                  <ArrowDown className="w-4 h-4 ml-1" />
                </a>
              </Button>
              <Button variant="hero-outline" size="lg" asChild>
                <a href="#contact">
                  Book AI Consultation
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
            </motion.div>

            {/* Trust micro-copy */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.38 }}
              className="text-xs text-muted-foreground/60 mb-12"
            >
              Trusted by founders, startups, researchers, and businesses worldwide.
            </motion.p>

            {/* Trusted AI Stack */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.44 }}
            >
              <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground mb-4">
                Trusted AI Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {aiStack.map((t) => (
                  <span key={t} className="pill">{t}</span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Right Column – Neural Orb ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <NeuralOrb />
          </motion.div>
        </div>

        {/* ── Stats Strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.55 }}
          className="mt-24 lg:mt-32 grid grid-cols-2 md:grid-cols-4 gap-px rounded-3xl overflow-hidden"
          style={{
            border: "1px solid rgba(255,255,255,0.07)",
            background: "rgba(255,255,255,0.02)",
            backdropFilter: "blur(20px)",
          }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 + i * 0.08 }}
              className="p-7 lg:p-9 bg-background/50 text-center md:text-left"
            >
              <div className="text-3xl lg:text-[42px] font-semibold tracking-tight gradient-text mb-2">
                {s.value}
              </div>
              <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};