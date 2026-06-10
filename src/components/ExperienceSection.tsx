import { motion, useInView, useScroll, useTransform, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const milestones = [
  {
    year: "2019",
    title: "The Beginning",
    subtitle: "Web Development",
    icon: "◈",
    story:
      "Started building websites from scratch. Learned that every pixel is a decision, and every decision is a philosophy.",
    tech: ["HTML", "CSS", "JavaScript", "React", "Node.js"],
    lesson: "Code that works isn't enough.",
    lessonSub: "Clean architecture and user experience are the real product.",
    color: "hsl(199 89% 60%)",
  },
  {
    year: "2021",
    title: "Into the Machine",
    subtitle: "Machine Learning",
    icon: "⬡",
    story:
      "Built my first production ML model. Discovered that data quality destroys model complexity in every fight.",
    tech: ["Python", "PyTorch", "Scikit-learn", "Pandas", "MLflow"],
    lesson: "Data beats algorithms.",
    lessonSub: "A clean dataset outperforms a complex model every single time.",
    color: "hsl(220 89% 65%)",
  },
  {
    year: "2022",
    title: "Eyes of the Machine",
    subtitle: "Computer Vision",
    icon: "◎",
    story:
      "Trained models to see the world. Realized that perception is an engineering problem—and a beautiful one.",
    tech: ["OpenCV", "YOLO", "TensorFlow", "CUDA", "Docker"],
    lesson: "Perception is architecture.",
    lessonSub: "How you structure the problem determines what the model can see.",
    color: "hsl(239 84% 65%)",
  },
  {
    year: "2023",
    title: "The Language Turn",
    subtitle: "LLMs & RAG Systems",
    icon: "◇",
    story:
      "Built my first enterprise RAG system. Learned that production AI is far more than prompting—it's infrastructure, memory, and trust.",
    tech: ["LangChain", "OpenAI", "Pinecone", "FastAPI", "PostgreSQL"],
    lesson: "Architecture beats prompts.",
    lessonSub: "How knowledge is retrieved matters more than how it's requested.",
    color: "hsl(270 80% 65%)",
  },
  {
    year: "2024",
    title: "Agents Awakening",
    subtitle: "AI Agents",
    icon: "⬢",
    story:
      "Built multi-agent systems that reason, plan, and act autonomously. Started thinking in systems instead of models.",
    tech: ["LangGraph", "AutoGen", "CrewAI", "Redis", "Kafka"],
    lesson: "Systems beat models.",
    lessonSub: "The magic isn't in one model—it's in how they collaborate.",
    color: "hsl(199 89% 55%)",
  },
  {
    year: "2025",
    title: "Enterprise Scale",
    subtitle: "Enterprise AI Systems",
    icon: "◉",
    story:
      "Shipping AI at enterprise scale—real users, real stakes, real impact. Every deployment is a proof of principle.",
    tech: ["AWS", "Azure", "LangGraph", "Anthropic", "Terraform"],
    lesson: "Production is the final exam.",
    lessonSub: "Nothing is real until it runs in the wild, reliably, at scale.",
    color: "hsl(152 76% 55%)",
  },
];

const turningPoints = [
  {
    moment: "Built my first client website",
    learned: "Learned customer thinking.",
    icon: "→",
  },
  {
    moment: "Shipped my first ML model",
    learned: "Learned production realities.",
    icon: "→",
  },
  {
    moment: "Discovered LLMs",
    learned: "Shifted toward AI engineering.",
    icon: "→",
  },
  {
    moment: "Built my first multi-agent system",
    learned: "Started thinking in systems instead of models.",
    icon: "→",
  },
];

const achievements = [
  { value: 20, suffix: "+", label: "AI Projects Delivered" },
  { value: 5, suffix: "+", label: "Years Building Software" },
  { value: 15, suffix: "+", label: "Countries Worked With" },
  { value: 99, suffix: "%", label: "Client Satisfaction" },
  { value: 100, suffix: "%", label: "Production Focus" },
];

const growthSteps = [
  "Web Development",
  "Automation",
  "Machine Learning",
  "Deep Learning",
  "LLMs",
  "AI Agents",
  "Enterprise AI",
];

// ─── Animated Counter ─────────────────────────────────────────────────────────

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, value, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) {
        if (ref.current) ref.current.textContent = Math.round(v) + suffix;
      },
    });
    return controls.stop;
  }, [inView, value, suffix]);

  return (
    <span ref={ref} className="tabular-nums">
      0{suffix}
    </span>
  );
}

// ─── Milestone Card ───────────────────────────────────────────────────────────

function MilestoneCard({
  milestone,
  index,
  isActive,
  onClick,
}: {
  milestone: (typeof milestones)[0];
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className="relative cursor-pointer group"
      style={{ "--node-color": milestone.color } as React.CSSProperties}
    >
      {/* Timeline connector */}
      {index < milestones.length - 1 && (
        <div className="absolute left-[27px] top-[56px] w-[1px] h-full"
          style={{
            background: `linear-gradient(to bottom, ${milestone.color}40, transparent)`,
          }}
        />
      )}

      <div
        className="relative flex gap-6 p-6 rounded-2xl transition-all duration-500"
        style={{
          background: isActive
            ? `linear-gradient(135deg, hsl(220 40% 11% / 0.95), hsl(220 40% 8% / 0.8))`
            : "transparent",
          border: isActive
            ? `1px solid ${milestone.color}30`
            : "1px solid transparent",
          boxShadow: isActive
            ? `0 20px 60px -20px ${milestone.color}20, inset 0 1px 0 hsl(0 0% 100% / 0.04)`
            : "none",
        }}
      >
        {/* Node */}
        <div className="flex-shrink-0 flex flex-col items-center gap-2">
          <motion.div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold relative"
            style={{
              background: isActive
                ? `linear-gradient(135deg, ${milestone.color}20, ${milestone.color}08)`
                : "hsl(220 40% 8% / 0.6)",
              border: `1px solid ${isActive ? milestone.color + "40" : "hsl(0 0% 100% / 0.06)"}`,
              boxShadow: isActive ? `0 0 24px ${milestone.color}25` : "none",
            }}
            animate={isActive ? { scale: [1, 1.05, 1] } : { scale: 1 }}
            transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
          >
            <span style={{ color: milestone.color }}>{milestone.icon}</span>
          </motion.div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <p
                className="text-[11px] font-mono uppercase tracking-[0.2em] mb-1"
                style={{ color: milestone.color }}
              >
                {milestone.year}
              </p>
              <h3 className="text-xl font-semibold tracking-tight text-white leading-tight">
                {milestone.title}
              </h3>
              <p className="text-sm text-white/50 mt-0.5">{milestone.subtitle}</p>
            </div>
          </div>

          <motion.div
            initial={false}
            animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="text-sm text-white/70 leading-relaxed mt-3 mb-4">
              {milestone.story}
            </p>

            {/* Tech pills */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {milestone.tech.map((t) => (
                <span
                  key={t}
                  className="text-[10px] font-mono px-2.5 py-1 rounded-full"
                  style={{
                    background: `${milestone.color}10`,
                    border: `1px solid ${milestone.color}25`,
                    color: milestone.color,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Lesson */}
            <div
              className="p-4 rounded-xl"
              style={{
                background: `${milestone.color}08`,
                border: `1px solid ${milestone.color}20`,
              }}
            >
              <p
                className="text-xs font-mono uppercase tracking-[0.15em] mb-1.5"
                style={{ color: milestone.color }}
              >
                Biggest Lesson
              </p>
              <p className="text-base font-semibold text-white leading-tight">
                {milestone.lesson}
              </p>
              <p className="text-xs text-white/50 mt-1 leading-relaxed">
                {milestone.lessonSub}
              </p>
            </div>
          </motion.div>

          {/* Collapsed preview */}
          {!isActive && (
            <p className="text-sm text-white/40 mt-2 line-clamp-1">
              {milestone.lesson}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export const ExperienceSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeMilestone, setActiveMilestone] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const lineProgress = useTransform(scrollYProgress, [0.1, 0.7], ["0%", "100%"]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, hsl(199 89% 60% / 0.07) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at bottom right, hsl(239 84% 60% / 0.06) 0%, transparent 70%)",
        }}
      />

      <div className="container-narrow relative" ref={ref}>

        {/* ── Editorial Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mb-6"
        >
          <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-white/30 mb-8">
            / Career Journey
          </p>

          <h2 className="font-semibold tracking-tight leading-[1.0]" style={{ fontSize: "clamp(2.4rem, 5vw, 4.5rem)" }}>
            <span className="gradient-text">A Track Record</span>
            <br />
            <span className="text-white/20 font-light" style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.8rem)" }}>of</span>
            <br />
            <span
              className="serif-italic"
              style={{
                fontSize: "clamp(2.8rem, 6vw, 5.2rem)",
                background: "linear-gradient(120deg, #38BDF8 0%, #818CF8 50%, #4F46E5 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Shipping.
            </span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg text-white/45 max-w-xl leading-relaxed mb-24 font-light"
        >
          Every project,<br />
          every challenge,<br />
          and every deployment<br />
          shaped the engineer I am today.
        </motion.p>

        {/* ── Growth Timeline ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mb-24"
        >
          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/25 mb-8">
            / Evolution
          </p>
          <div className="relative">
            {/* Track */}
            <div className="absolute top-[22px] left-0 right-0 h-[1px] bg-white/[0.06]" />
            {/* Animated progress */}
            <motion.div
              className="absolute top-[22px] left-0 h-[1px]"
              style={{
                width: lineProgress,
                background: "linear-gradient(90deg, #38BDF8, #818CF8, #4F46E5)",
              }}
            />
            <div className="flex justify-between relative">
              {growthSteps.map((step, i) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.07, duration: 0.5 }}
                  className="flex flex-col items-center gap-3 group"
                >
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-xs font-mono font-bold relative z-10 transition-all duration-300"
                    style={{
                      background:
                        i <= 4
                          ? `linear-gradient(135deg, #38BDF820, #4F46E520)`
                          : "hsl(220 40% 8%)",
                      border: `1px solid ${i <= 4 ? "#38BDF830" : "hsl(0 0% 100% / 0.08)"}`,
                      boxShadow: i <= 4 ? "0 0 16px #38BDF818" : "none",
                      color: i <= 4 ? "#38BDF8" : "hsl(0 0% 100% / 0.3)",
                    }}
                  >
                    {i + 1}
                  </div>
                  <p
                    className="text-[10px] font-mono text-center hidden sm:block"
                    style={{ color: i <= 4 ? "hsl(199 89% 65%)" : "hsl(0 0% 100% / 0.25)" }}
                  >
                    {step.split(" ").map((w, wi) => (
                      <span key={wi} className="block">{w}</span>
                    ))}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Main Content: Timeline + Stats ── */}
        <div className="grid lg:grid-cols-12 gap-16 mb-24">

          {/* Left: Milestone Timeline */}
          <div className="lg:col-span-7 space-y-2">
            <div className="flex items-center justify-between mb-8">
              <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/25">
                / Career Milestones
              </p>
              <p className="text-[11px] font-mono text-white/20">
                Click to expand
              </p>
            </div>
            {milestones.map((m, i) => (
              <MilestoneCard
                key={m.year}
                milestone={m}
                index={i}
                isActive={activeMilestone === i}
                onClick={() => setActiveMilestone(activeMilestone === i ? -1 : i)}
              />
            ))}
          </div>

          {/* Right: Sticky lessons panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="sticky top-32">

              {/* Lessons Learned */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="glass-card p-8 mb-6"
              >
                <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/30 mb-6">
                  / Lessons Learned
                </p>
                <div className="space-y-5">
                  {[
                    { year: "2019", lesson: "Code that works isn't enough." },
                    { year: "2021", lesson: "Data beats algorithms." },
                    { year: "2023", lesson: "Architecture beats prompts." },
                    { year: "2025", lesson: "Systems beat models." },
                  ].map((item, i) => (
                    <motion.div
                      key={item.year}
                      initial={{ opacity: 0, x: 10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.5 + i * 0.08 }}
                      className="flex gap-4 items-start"
                    >
                      <span className="text-[10px] font-mono text-white/20 pt-1 flex-shrink-0 w-8">
                        {item.year}
                      </span>
                      <div>
                        <div className="w-4 h-[1px] bg-white/10 mt-[10px] mr-3 inline-block" />
                        <span className="text-sm font-medium text-white/75 leading-snug">
                          {item.lesson}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Turning Points */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.55 }}
                className="glass-card p-8"
                style={{
                  background: "linear-gradient(135deg, hsl(220 40% 9% / 0.8), hsl(239 84% 10% / 0.4))",
                  border: "1px solid hsl(239 84% 60% / 0.12)",
                }}
              >
                <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/30 mb-6">
                  / Moments That Changed Everything
                </p>
                <div className="space-y-4">
                  {turningPoints.map((tp, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.6 + i * 0.08 }}
                      className="group"
                    >
                      <p className="text-xs font-semibold text-white/80 mb-0.5 group-hover:text-white transition-colors">
                        {tp.moment}
                      </p>
                      <p className="text-xs text-white/35 flex items-center gap-1.5">
                        <span
                          className="text-[10px]"
                          style={{ color: "hsl(199 89% 60%)" }}
                        >
                          {tp.icon}
                        </span>
                        {tp.learned}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ── Achievement Counters ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-24"
        >
          <div
            className="relative rounded-3xl overflow-hidden p-10 lg:p-14"
            style={{
              background:
                "linear-gradient(135deg, hsl(220 40% 9% / 0.8), hsl(220 40% 6% / 0.6))",
              border: "1px solid hsl(0 0% 100% / 0.06)",
            }}
          >
            {/* Glow */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px]"
              style={{
                background:
                  "linear-gradient(90deg, transparent, hsl(199 89% 60% / 0.4), transparent)",
              }}
            />
            <div
              className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, hsl(199 89% 60% / 0.08), transparent 70%)",
              }}
            />

            <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/25 mb-10 text-center">
              / Impact by the Numbers
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4">
              {achievements.map((a, i) => (
                <motion.div
                  key={a.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.6 }}
                  className="text-center group"
                >
                  <div
                    className="text-4xl lg:text-5xl font-bold tracking-tight mb-2"
                    style={{
                      background:
                        "linear-gradient(120deg, #38BDF8, #818CF8)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    <Counter value={a.value} suffix={a.suffix} />
                  </div>
                  <p className="text-xs text-white/40 font-medium leading-tight">
                    {a.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Future Vision ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-24"
        >
          <div
            className="relative rounded-3xl overflow-hidden p-10 lg:p-14 gradient-border-card"
          >
            {/* Animated glow orb */}
            <div
              className="absolute -top-32 -right-32 w-64 h-64 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, hsl(239 84% 60% / 0.15), transparent 70%)",
                animation: "float-orb 8s ease-in-out infinite",
              }}
            />

            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/25 mb-6">
                  / What's Next
                </p>
                <h3 className="text-4xl lg:text-5xl font-semibold tracking-tight leading-tight mb-6">
                  Building the{" "}
                  <span className="serif-italic gradient-text-accent">
                    future
                  </span>
                  <br />
                  of intelligence.
                </h3>
                <p className="text-white/45 text-sm leading-relaxed">
                  The work continues. Every system built is a foundation for the next one.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    icon: "◈",
                    text: "Building autonomous AI systems",
                    color: "#38BDF8",
                  },
                  {
                    icon: "⬡",
                    text: "Exploring long-term memory architectures",
                    color: "#818CF8",
                  },
                  {
                    icon: "◎",
                    text: "Advancing enterprise AI at scale",
                    color: "#4F46E5",
                  },
                  {
                    icon: "◇",
                    text: "Creating products that solve real-world problems",
                    color: "#38BDF8",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.08 }}
                    className="flex items-center gap-4 group"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-sm transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: `${item.color}10`,
                        border: `1px solid ${item.color}20`,
                        color: item.color,
                      }}
                    >
                      {item.icon}
                    </div>
                    <p className="text-sm text-white/65 group-hover:text-white/90 transition-colors">
                      {item.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Closing Quote ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center pt-8 pb-4"
        >
          <div className="w-16 h-[1px] bg-white/10 mx-auto mb-12" />
          <blockquote>
            <p
              className="serif-italic text-4xl lg:text-5xl xl:text-6xl leading-tight mb-4"
              style={{
                background: "linear-gradient(120deg, #FFFFFF 0%, #BAE6FD 40%, #A5B4FC 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Every year taught me
              <br />
              something.
            </p>
            <p className="serif-italic text-3xl lg:text-4xl text-white/35">
              Every project
              <br />
              proved it.
            </p>
          </blockquote>
          <div className="w-16 h-[1px] bg-white/10 mx-auto mt-12" />
        </motion.div>

      </div>
    </section>
  );
};