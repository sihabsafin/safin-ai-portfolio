import { motion, useInView, AnimatePresence, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ArrowUpRight, ArrowUp } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Expertise", href: "#expertise" },
  { label: "Case Studies", href: "#projects" },
  { label: "Engineering Decisions", href: "#decisions" },
  { label: "Career", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const services = [
  "AI Agents",
  "Enterprise RAG",
  "LLM Applications",
  "AI Consulting",
  "Automation",
  "Architecture",
];

const resources = [
  { label: "GitHub", href: "https://github.com/sihabsafin" },
  { label: "LinkedIn", href: "https://linkedin.com/in/sihabsafin" },
  { label: "WhatsApp", href: "https://wa.me/8801690166707?text=Hi%20Safin,%20I%20found%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project." },
  { label: "Email", href: "https://mail.google.com/mail/?view=cm&fs=1&to=sihabulislamsafin1@gmail.com&su=Hello%20Safin" },
  { label: "View Resume", href: "/resume/Safin-Generative-AI-Engineer.pdf" },
  { label: "Research", href: "https://scholar.google.com/citations?hl=en&user=-Br0Z7UAAAAJ" },
];

const currentFocus = [
  "Enterprise AI",
  "Multi-Agent Systems",
  "Long-Term Memory",
  "MCP",
  "Reasoning Models",
];

const socialCards = [
  {
    label: "GitHub",
    sub: "Explore Projects",
    href: "https://github.com/sihabsafin",
    color: "#38BDF8",
  },
  {
    label: "LinkedIn",
    sub: "Professional Network",
    href: "https://linkedin.com/in/sihabsafin",
    color: "#818CF8",
  },
  {
    label: "WhatsApp",
    sub: "Quick Chat",
    href: "https://wa.me/8801690166707?text=Hi%20Safin,%20I%20found%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project.",
    color: "#25D366",
  },
  {
    label: "HuggingFace",
    sub: "Models & Spaces",
    href: "https://huggingface.co/sihabsafin",
    color: "#4F46E5",
  },
  {
    label: "Kaggle",
    sub: "Research & Data",
    href: "https://kaggle.com/sihabsafin",
    color: "#38BDF8",
  },
];

const stats = [
  { value: 20, suffix: "+", label: "Projects" },
  { value: 15, suffix: "+", label: "Countries" },
  { value: 5, suffix: "+", label: "Years" },
  { value: 100, suffix: "%", label: "AI Focus" },
];

const techStack = ["React", "TypeScript", "Framer Motion"];

// ─── Animated Counter ─────────────────────────────────────────────────────────

function MiniCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const ctrl = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) {
        if (ref.current) ref.current.textContent = Math.round(v) + suffix;
      },
    });
    return ctrl.stop;
  }, [inView, value, suffix]);
  return <span ref={ref} className="tabular-nums">0{suffix}</span>;
}

// ─── Scroll To Top ────────────────────────────────────────────────────────────

function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Scroll to top"
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-2xl flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #38BDF8, #4F46E5)",
            boxShadow:
              "0 8px 32px -8px hsl(199 89% 60% / 0.5), 0 0 0 1px hsl(199 89% 60% / 0.2)",
          }}
        >
          <ArrowUp className="w-4 h-4 text-white" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ─── Easter Egg Built With ─────────────────────────────────────────────────────

function BuiltWith() {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      className="cursor-default select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence mode="wait">
        {hovered ? (
          <motion.span
            key="curiosity"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            style={{
              background: "linear-gradient(90deg, #38BDF8, #818CF8)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Built with Curiosity.
          </motion.span>
        ) : (
          <motion.span
            key="heart"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="text-white/25"
          >
            Built by Sihab Safin
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

// ─── Nav Link with underline ───────────────────────────────────────────────────

function FooterLink({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className="group relative text-sm text-white/40 hover:text-white/90 transition-colors duration-200 w-fit block"
    >
      {label}
      <span
        className="absolute -bottom-0.5 left-0 w-0 h-[1px] group-hover:w-full transition-all duration-300"
        style={{ background: "linear-gradient(90deg, #38BDF8, #818CF8)" }}
      />
    </a>
  );
}

// ─── Main Footer ──────────────────────────────────────────────────────────────

export const Footer = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <>
      <ScrollToTop />

      <footer
        id="footer"
        className="relative overflow-hidden border-t"
        style={{ borderColor: "hsl(0 0% 100% / 0.05)" }}
      >
        {/* Background */}
        <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at top, hsl(199 89% 60% / 0.06) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-[600px] h-[400px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at bottom left, hsl(239 84% 60% / 0.05) 0%, transparent 65%)",
          }}
        />

        <div className="container-narrow relative" ref={ref}>

          {/* ── Hero Quote ── */}
          <div className="pt-28 pb-24 text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-white/20 mb-10">
                / The Final Word
              </p>

              <h2
                className="font-semibold tracking-tight leading-[1.05] mx-auto"
                style={{ fontSize: "clamp(2.2rem, 5vw, 4.2rem)", maxWidth: "700px" }}
              >
                <span className="gradient-text">Building the future,</span>
                <br />
                <span className="text-white/50 font-light" style={{ fontSize: "0.9em" }}>
                  one intelligent
                </span>
                <br />
                <span
                  className="serif-italic"
                  style={{
                    fontSize: "1.15em",
                    background:
                      "linear-gradient(120deg, #38BDF8 0%, #818CF8 50%, #4F46E5 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  system
                </span>
                <span
                  className="font-semibold"
                  style={{
                    fontSize: "1.05em",
                    background:
                      "linear-gradient(120deg, #818CF8, #4F46E5)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {" "}at a time.
                </span>
              </h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="mt-8 text-white/35 text-base font-light leading-relaxed max-w-sm mx-auto"
              >
                Thanks for exploring my work.<br />
                I hope it inspired new ideas,<br />
                new conversations,<br />
                and new possibilities.
              </motion.p>
            </motion.div>
          </div>

          {/* ── Availability Card + Follow Strip ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="grid sm:grid-cols-2 gap-4 mb-20"
          >
            {/* Availability */}
            <div
              className="glass-card p-7 relative overflow-hidden"
              style={{ border: "1px solid hsl(152 76% 50% / 0.15)" }}
            >
              <div
                className="absolute -top-10 -right-10 w-32 h-32 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse, hsl(152 76% 50% / 0.12), transparent 70%)",
                }}
              />
              <div className="flex items-center gap-3 mb-4">
                <div className="live-dot" />
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/30">
                  Status
                </span>
              </div>
              <p className="text-2xl font-semibold tracking-tight mb-1.5" style={{ color: "#34d399" }}>
                Available
              </p>
              <p className="text-sm text-white/40 leading-relaxed">
                Accepting{" "}
                <span className="text-white/75 font-medium">2 new projects</span>{" "}
                this quarter.
              </p>
            </div>

            {/* Follow Journey */}
            <div
              className="glass-card p-7 relative overflow-hidden flex flex-col justify-between"
              style={{
                background:
                  "linear-gradient(135deg, hsl(220 40% 9% / 0.8), hsl(239 84% 10% / 0.4))",
                border: "1px solid hsl(239 84% 60% / 0.1)",
              }}
            >
              <div>
                <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/25 mb-3">
                  / Follow My Journey
                </p>
                <p className="text-sm text-white/45 leading-relaxed mb-5">
                  Updates on AI, engineering,<br />
                  research, and production systems.
                </p>
              </div>
              <a
                href="https://linkedin.com/in/sihabsafin"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
                style={{ color: "#818CF8" }}
              >
                Follow on LinkedIn
                <motion.span
                  className="inline-block"
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowUpRight className="w-4 h-4" />
                </motion.span>
              </a>
            </div>
          </motion.div>

          {/* ── Four Column Grid ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-10 mb-20"
          >
            {/* Navigation */}
            <div>
              <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/20 mb-5">
                Navigation
              </p>
              <div className="space-y-3">
                {navLinks.map((l) => (
                  <FooterLink key={l.label} label={l.label} href={l.href} />
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/20 mb-5">
                Services
              </p>
              <div className="space-y-3">
                {services.map((s) => (
                  <p key={s} className="text-sm text-white/40">
                    {s}
                  </p>
                ))}
              </div>
            </div>

            {/* Resources */}
            <div>
              <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/20 mb-5">
                Resources
              </p>
              <div className="space-y-3">
                {resources.map((r) => (
                  <a
                    key={r.label}
                    href={r.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-1.5 text-sm text-white/40 hover:text-white/80 transition-colors duration-200 w-fit"
                  >
                    {r.label}
                    <ArrowUpRight
                      className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Current Focus */}
            <div>
              <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/20 mb-5">
                Currently Building
              </p>
              <div className="relative">
                <div
                  className="absolute left-[7px] top-1.5 bottom-1.5 w-[1px]"
                  style={{
                    background:
                      "linear-gradient(to bottom, #38BDF825, #4F46E525, transparent)",
                  }}
                />
                <div className="space-y-3.5">
                  {currentFocus.map((f, i) => (
                    <div key={f} className="flex items-center gap-3.5">
                      <div
                        className="w-[14px] h-[14px] rounded-full flex-shrink-0 flex items-center justify-center relative z-10"
                        style={{
                          background: `${i % 2 === 0 ? "#38BDF8" : "#818CF8"}15`,
                          border: `1px solid ${i % 2 === 0 ? "#38BDF8" : "#818CF8"}30`,
                        }}
                      >
                        <div
                          className="w-1 h-1 rounded-full"
                          style={{ background: i % 2 === 0 ? "#38BDF8" : "#818CF8" }}
                        />
                      </div>
                      <p className="text-sm text-white/40">{f}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Social Cards ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mb-20"
          >
            <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/20 mb-5">
              / Connect
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {socialCards.map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.06, duration: 0.4 }}
                  whileHover={{ y: -3 }}
                  className="group relative flex flex-col justify-between p-5 rounded-2xl overflow-hidden transition-all duration-300"
                  style={{
                    background: "hsl(220 40% 8% / 0.7)",
                    border: "1px solid hsl(0 0% 100% / 0.06)",
                    backdropFilter: "blur(20px)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.border = `1px solid ${s.color}30`;
                    el.style.boxShadow = `0 12px 32px -10px ${s.color}20`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.border = "1px solid hsl(0 0% 100% / 0.06)";
                    el.style.boxShadow = "none";
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse at top left, ${s.color}07, transparent 70%)`,
                    }}
                  />
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: `${s.color}12`,
                        border: `1px solid ${s.color}20`,
                        color: s.color,
                      }}
                    >
                      {s.label.charAt(0)}
                    </div>
                    <ArrowUpRight
                      className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      style={{ color: s.color }}
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white/70 group-hover:text-white/95 transition-colors mb-0.5">
                      {s.label}
                    </p>
                    <p className="text-[10px] text-white/25">{s.sub}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* ── Stats Strip ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mb-20"
          >
            <div
              className="rounded-2xl px-8 py-6 grid grid-cols-2 sm:grid-cols-4 gap-6"
              style={{
                background: "hsl(220 40% 7% / 0.6)",
                border: "1px solid hsl(0 0% 100% / 0.05)",
              }}
            >
              {stats.map((s, i) => (
                <div key={s.label} className="text-center">
                  <p
                    className="text-2xl font-bold tracking-tight mb-1"
                    style={{
                      background: "linear-gradient(120deg, #38BDF8, #818CF8)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    <MiniCounter value={s.value} suffix={s.suffix} />
                  </p>
                  <p className="text-[11px] font-mono text-white/30 uppercase tracking-[0.1em]">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Final Quote ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-20"
          >
            <div
              className="w-10 h-[1px] mx-auto mb-12"
              style={{ background: "hsl(0 0% 100% / 0.08)" }}
            />
            <blockquote>
              <p
                className="serif-italic leading-snug mx-auto"
                style={{
                  fontSize: "clamp(1.5rem, 3.5vw, 2.6rem)",
                  maxWidth: "560px",
                  background:
                    "linear-gradient(120deg, #FFFFFF 0%, #BAE6FD 40%, #A5B4FC 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Every great product starts
              </p>
              <p
                className="serif-italic leading-snug"
                style={{
                  fontSize: "clamp(1.5rem, 3.5vw, 2.6rem)",
                  color: "hsl(0 0% 100% / 0.25)",
                }}
              >
                with one decision
              </p>
              <p
                className="serif-italic leading-snug"
                style={{
                  fontSize: "clamp(1.5rem, 3.5vw, 2.6rem)",
                  background:
                    "linear-gradient(120deg, #38BDF8 0%, #818CF8 50%, #4F46E5 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                to build.
              </p>
            </blockquote>
            <div
              className="w-10 h-[1px] mx-auto mt-12"
              style={{ background: "hsl(0 0% 100% / 0.08)" }}
            />
          </motion.div>

          {/* ── Bottom Bar ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="pb-10 flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{
              borderTop: "1px solid hsl(0 0% 100% / 0.04)",
              paddingTop: "24px",
            }}
          >
            {/* Logo + Copyright */}
            <div className="flex items-center gap-3">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg, #38BDF8, #4F46E5)",
                }}
              >
                AI
              </div>
              <p className="text-xs text-white/25 leading-snug">
                Designed, Engineered, and continuously improved{" "}
                <span className="text-white/40">by Sihab Safin.</span>
              </p>
            </div>

            {/* Easter egg */}
            <p className="text-[11px] font-mono">
              <BuiltWith />
            </p>

            {/* Version */}
            <div className="text-right">
              <p className="text-[10px] font-mono text-white/18 leading-relaxed">
                <span className="text-white/20">Version</span> 2026.1
                <br />
                {techStack.map((t, i) => (
                  <span key={t}>
                    <span className="text-white/25">{t}</span>
                    {i < techStack.length - 1 && (
                      <span className="text-white/12 mx-1">·</span>
                    )}
                  </span>
                ))}
              </p>
            </div>
          </motion.div>

        </div>
      </footer>
    </>
  );
};