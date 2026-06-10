import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArchitectureGraph } from "./ArchitectureGraph";
import { FloatingMetrics } from "./FloatingMetrics";
import { ScenarioSwitcher } from "./ScenarioSwitcher";
import { TechnologyCategory, categories } from "./TechnologyCategory";
import { WorkflowPipeline } from "./WorkflowPipeline";
import { QuoteBlock } from "./QuoteBlock";

export const EcosystemSection = () => {
  const headerRef  = useRef(null);
  const graphRef   = useRef(null);
  const catsRef    = useRef(null);
  const pipeRef    = useRef(null);
  const quoteRef   = useRef(null);

  const headerInView  = useInView(headerRef,  { once: true, margin: "-60px" });
  const graphInView   = useInView(graphRef,   { once: true, margin: "-60px" });
  const catsInView    = useInView(catsRef,    { once: true, margin: "-60px" });
  const pipeInView    = useInView(pipeRef,    { once: true, margin: "-60px" });
  const quoteInView   = useInView(quoteRef,   { once: true, margin: "-60px" });

  return (
    <section id="ecosystem" className="section-padding relative overflow-hidden">

      {/* ── Ambient background ───────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {/* Top center glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] opacity-[0.055]"
          style={{
            background: "radial-gradient(ellipse, hsl(217 91% 60%) 0%, hsl(263 70% 60%) 35%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        {/* Grid pattern subtle */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 20%, black 30%, transparent 80%)",
          }}
        />
      </div>

      <div className="container-narrow relative z-10">

        {/* ── Section Header ───────────────────────────────────── */}
        <div ref={headerRef} className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <p className="text-[11px] font-mono uppercase tracking-[0.24em] text-white/30 mb-5">
              / Ecosystem
            </p>
            <h2 className="text-4xl lg:text-[64px] font-semibold tracking-tight leading-[1.02] text-balance mb-6">
              Engineering AI{" "}
              <em
                className="not-italic"
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  background: "linear-gradient(120deg, #38BDF8 0%, #818CF8 50%, #4F46E5 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                systems
              </em>
              <br className="hidden lg:block" />
              that scale.
            </h2>
            <p className="text-[15px] text-white/40 max-w-xl leading-relaxed font-medium">
              Modern AI products are not powered by a single model.
              They are carefully engineered ecosystems combining LLMs, agent frameworks,
              retrieval, memory, backend services, cloud infrastructure, and continuous evaluation.
            </p>
          </motion.div>
        </div>

        {/* ── Floating Live Metrics ────────────────────────────── */}
        <FloatingMetrics inView={headerInView} />

        {/* ── Architecture Graph ───────────────────────────────── */}
        <div ref={graphRef} className="mb-10">
          {/* Sub-heading */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={graphInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3"
          >
            <div>
              <p className="text-[10.5px] font-mono uppercase tracking-[0.22em] text-white/25 mb-2">
                / Production Architecture
              </p>
              <h3 className="text-xl lg:text-2xl font-semibold tracking-tight text-white/80">
                How every component{" "}
                <span style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontStyle: "italic",
                  background: "linear-gradient(120deg, #38BDF8, #818CF8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>
                  connects.
                </span>
              </h3>
            </div>
            <p className="text-[11.5px] text-white/28 font-medium max-w-xs text-right hidden sm:block">
              Hover any node to highlight its role in the full stack.
            </p>
          </motion.div>

          {/* Graph wrapper */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={graphInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl border border-white/[0.06] p-6 lg:p-8"
            style={{
              background: "linear-gradient(180deg, hsl(220 40% 8%/0.7), hsl(220 40% 6%/0.5))",
              backdropFilter: "blur(20px)",
            }}
          >
            <ArchitectureGraph inView={graphInView} />
          </motion.div>
        </div>

        {/* ── Live Scenario Switcher ───────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={graphInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="mb-20"
        >
          <p className="text-[10.5px] font-mono uppercase tracking-[0.22em] text-white/25 mb-4">
            / Live Scenarios
          </p>
          <ScenarioSwitcher inView={graphInView} />
        </motion.div>

        {/* ── Technology Categories ────────────────────────────── */}
        <div ref={catsRef} className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={catsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="mb-8"
          >
            <p className="text-[10.5px] font-mono uppercase tracking-[0.22em] text-white/25 mb-2">
              / Technology Stack
            </p>
            <h3 className="text-xl lg:text-2xl font-semibold tracking-tight text-white/80">
              The full{" "}
              <span style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: "italic",
                background: "linear-gradient(120deg, #38BDF8, #818CF8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                toolkit.
              </span>
            </h3>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
            {categories.map((cat, i) => (
              <TechnologyCategory
                key={cat.title}
                data={cat}
                index={i}
                inView={catsInView}
              />
            ))}
          </div>
        </div>

        {/* ── Production Pipeline ──────────────────────────────── */}
        <div ref={pipeRef} className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={pipeInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="mb-8"
          >
            <p className="text-[10.5px] font-mono uppercase tracking-[0.22em] text-white/25 mb-2">
              / Delivery Process
            </p>
            <h3 className="text-xl lg:text-2xl font-semibold tracking-tight text-white/80">
              From problem to{" "}
              <span style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: "italic",
                background: "linear-gradient(120deg, #38BDF8, #818CF8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                production.
              </span>
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={pipeInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="rounded-2xl border border-white/[0.06] p-5 lg:p-6"
            style={{
              background: "linear-gradient(180deg, hsl(220 40% 8%/0.6), hsl(220 40% 6%/0.4))",
              backdropFilter: "blur(16px)",
            }}
          >
            <WorkflowPipeline inView={pipeInView} />
          </motion.div>
        </div>

        {/* ── Quote ────────────────────────────────────────────── */}
        <div ref={quoteRef}>
          <QuoteBlock inView={quoteInView} />
        </div>

      </div>
    </section>
  );
};