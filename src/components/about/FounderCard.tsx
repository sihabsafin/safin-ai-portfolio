import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

// ── Put your portrait in /public/sihab_safin.png (or update the path below)
const PORTRAIT_SRC = "/sihab_safin.png";

const metrics = [
  { value: 5,   suffix: "+", label: "Years\nBuilding"     },
  { value: 20,  suffix: "+", label: "AI\nSystems"         },
  { value: 15,  suffix: "+", label: "Countries\nServed"   },
  { value: 100, suffix: "%", label: "Production\nFocus"   },
];

const chips = [
  "LLMs", "AI Agents", "Enterprise RAG", "FastAPI",
  "LangGraph", "AWS", "MLOps", "Computer Vision",
];

const focusItems = [
  "Model Context Protocol",
  "Reasoning Models",
  "Long-Term Memory Systems",
  "Agentic Workflows",
];

// ── animated counter hook
function useCounter(target: number, active: boolean, delay = 0) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf: number;
    const t = setTimeout(() => {
      const dur = 1200;
      let start: number | null = null;
      const step = (ts: number) => {
        if (!start) start = ts;
        const prog = Math.min((ts - start) / dur, 1);
        const ease = 1 - Math.pow(1 - prog, 3);
        setCount(Math.round(ease * target));
        if (prog < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, delay);
    return () => { clearTimeout(t); cancelAnimationFrame(raf); };
  }, [active, target, delay]);
  return count;
}

// ── particle data (stable, no re-render)
const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  id:       i,
  left:     `${10 + Math.random() * 80}%`,
  bottom:   `${Math.random() * 60}%`,
  size:     1 + Math.random() * 2.5,
  dx:       (Math.random() - 0.5) * 30,
  duration: 4 + Math.random() * 6,
  delay:    Math.random() * 5,
  opacity:  0.3 + Math.random() * 0.7,
}));

// ─────────────────────────────────────────────
export const FounderCard = React.memo(() => {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const m0 = useCounter(metrics[0].value, inView, 400);
  const m1 = useCounter(metrics[1].value, inView, 500);
  const m2 = useCounter(metrics[2].value, inView, 600);
  const m3 = useCounter(metrics[3].value, inView, 700);
  const counts = [m0, m1, m2, m3];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-[28px] overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, hsl(220 40% 8% / 0.97), hsl(225 45% 6% / 0.99))",
        border: "1px solid rgba(56,189,248,0.18)",
        transition: "border-color 0.4s ease",
      }}
      // hover handled via Tailwind group-hover or inline style override below
    >
      {/* inner top highlight */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.10), transparent)",
        }}
      />

      {/* ambient card glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 30% 20%, rgba(56,189,248,0.07), transparent 65%)," +
            "radial-gradient(ellipse 50% 50% at 80% 80%, rgba(79,70,229,0.09), transparent 60%)",
        }}
      />

      {/* ── Portrait ── */}
      <div className="relative w-full overflow-hidden rounded-t-[20px]" style={{ aspectRatio: "3/4", maxHeight: 480 }}>
        <img
          src={PORTRAIT_SRC}
          alt="Sihab Safin — Generative AI Engineer"
          className="w-full h-full object-cover object-top block"
          style={{
            filter: "saturate(0.88) brightness(0.92) contrast(1.06)",
            transition: "filter 0.5s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}
        />

        {/* dark-to-navy gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg," +
              "rgba(10,20,45,0.15) 0%," +
              "rgba(10,20,45,0.05) 35%," +
              "transparent 55%," +
              "rgba(8,15,35,0.55) 78%," +
              "rgba(6,10,28,0.92) 100%)",
            mixBlendMode: "multiply",
          }}
        />

        {/* breathe glow behind portrait */}
        <div
          className="absolute -bottom-5 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: "80%",
            height: 160,
            background: "radial-gradient(ellipse, rgba(56,189,248,0.18), transparent 70%)",
            animation: "glowBreathe 4s ease-in-out infinite",
          }}
        />

        {/* floating particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {PARTICLES.map((p) => (
            <div
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: p.left,
                bottom: p.bottom,
                width: p.size,
                height: p.size,
                background: "rgba(56,189,248,0.7)",
                opacity: p.opacity,
                animation: `floatUp ${p.duration}s linear ${p.delay}s infinite`,
                // CSS var for dx isn't possible inline; use transform hack below
                // Each particle drifts sideways via keyframe; approx with translateX
              }}
            />
          ))}
        </div>

        {/* status badge */}
        <div
          className="absolute top-4 left-4 z-10 flex items-center gap-1.5 rounded-full px-3.5 py-1.5"
          style={{
            background: "rgba(6,10,28,0.75)",
            border: "1px solid rgba(52,211,153,0.35)",
            backdropFilter: "blur(8px)",
          }}
        >
          <span className="relative flex-shrink-0">
            <span
              className="block w-2 h-2 rounded-full"
              style={{ background: "#34d399" }}
            />
            <span
              className="absolute inset-0 -m-0.5 rounded-full"
              style={{
                background: "rgba(52,211,153,0.35)",
                animation: "pulse 2s ease-in-out infinite",
              }}
            />
          </span>
          <span>
            <span
              className="block text-[11px] font-medium leading-none"
              style={{ color: "#34d399" }}
            >
              Available
            </span>
            <span
              className="block text-[10px] leading-none mt-0.5"
              style={{ color: "rgba(255,255,255,0.50)" }}
            >
              For AI Consulting
            </span>
          </span>
        </div>
      </div>

      {/* ── Card Body ── */}
      <div className="relative z-10 px-6 pb-7 -mt-8">

        {/* Identity */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4"
        >
          <h3
            className="text-[26px] font-semibold tracking-[-0.03em] leading-[1.1]"
            style={{ color: "rgba(255,255,255,0.95)" }}
          >
            Sihab Safin
          </h3>
          <p
            className="text-[12px] font-mono uppercase tracking-[0.08em] mt-1.5"
            style={{ color: "rgba(56,189,248,0.85)" }}
          >
            Generative AI Engineer
          </p>
          <p
            className="text-[13px] mt-1"
            style={{ color: "rgba(255,255,255,0.42)" }}
          >
            Engineering Production-Ready AI Systems
          </p>
        </motion.div>

        {/* divider */}
        <div
          className="h-px mb-4"
          style={{ background: "rgba(255,255,255,0.07)" }}
        />

        {/* Founder statement */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="text-[15px] leading-[1.65] mb-5 serif-italic"
          style={{ color: "rgba(255,255,255,0.75)" }}
        >
          I build intelligent systems that solve{" "}
          <em style={{ color: "rgba(56,189,248,0.9)", fontStyle: "italic" }}>
            measurable business problems
          </em>{" "}
          — not experimental demos.
        </motion.p>

        {/* divider */}
        <div
          className="h-px mb-5"
          style={{ background: "rgba(255,255,255,0.07)" }}
        />

        {/* Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-4 gap-2 mb-5"
        >
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className="rounded-2xl p-3 text-center transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div
                className="text-[22px] font-bold tracking-tight leading-none"
                style={{
                  background: "linear-gradient(135deg, #38BDF8, #818CF8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {counts[i]}{m.suffix}
              </div>
              <div
                className="text-[9.5px] uppercase tracking-wide mt-1.5 leading-tight whitespace-pre-line"
                style={{ color: "rgba(255,255,255,0.42)" }}
              >
                {m.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Expertise chips */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
          className="mb-5"
        >
          <p
            className="text-[10px] font-mono uppercase tracking-[0.18em] mb-2.5"
            style={{ color: "rgba(255,255,255,0.30)" }}
          >
            Expertise
          </p>
          <div className="flex flex-wrap gap-1.5">
            {chips.map((chip) => (
              <span
                key={chip}
                className="text-[11.5px] font-medium rounded-full px-3 py-1.5 transition-all duration-250 cursor-default hover:-translate-y-px"
                style={{
                  color: "rgba(255,255,255,0.65)",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.10)",
                }}
              >
                {chip}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Current focus */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl p-4 mb-5"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <p
            className="text-[10px] font-mono uppercase tracking-[0.18em] mb-2.5"
            style={{ color: "rgba(255,255,255,0.30)" }}
          >
            Currently Exploring
          </p>
          <div className="flex flex-col gap-1.5">
            {focusItems.map((item, i) => (
              <div key={item} className="flex items-center gap-2.5">
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{
                    background: "rgba(56,189,248,0.6)",
                    animation: `focusPulse 3s ease-in-out ${i * 0.5}s infinite`,
                  }}
                />
                <span
                  className="text-[12.5px]"
                  style={{ color: "rgba(255,255,255,0.65)" }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Availability */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl p-4 mb-5"
          style={{
            background:
              "linear-gradient(135deg, rgba(56,189,248,0.06), rgba(79,70,229,0.08))",
            border: "1px solid rgba(56,189,248,0.2)",
          }}
        >
          <p
            className="text-[10px] font-mono uppercase tracking-[0.15em] mb-1.5"
            style={{ color: "rgba(56,189,248,0.7)" }}
          >
            Currently Accepting
          </p>
          <p
            className="text-[14px] font-semibold tracking-tight"
            style={{ color: "rgba(255,255,255,0.90)" }}
          >
            2 Enterprise AI Projects
          </p>
          <p
            className="text-[11px] mt-0.5"
            style={{ color: "rgba(255,255,255,0.40)" }}
          >
            Q3 2026 · Worldwide
          </p>
        </motion.div>

        {/* Signature */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="text-center text-[12px] serif-italic"
          style={{ color: "rgba(255,255,255,0.25)" }}
        >
          Building AI for real-world impact.
        </motion.p>
      </div>

      {/* global keyframes injected once */}
      <style>{`
        @keyframes glowBreathe {
          0%,100% { opacity:.7; transform:translateX(-50%) scaleX(1); }
          50%      { opacity:1; transform:translateX(-50%) scaleX(1.08); }
        }
        @keyframes floatUp {
          0%   { opacity:0; transform:translateY(0); }
          20%  { opacity:.8; }
          80%  { opacity:.4; }
          100% { opacity:0; transform:translateY(-120px); }
        }
        @keyframes focusPulse {
          0%,100% { opacity:.6; }
          50%     { opacity:1; }
        }
        @keyframes pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%     { opacity:.4; transform:scale(1.6); }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </motion.div>
  );
});
FounderCard.displayName = "FounderCard";