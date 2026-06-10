import emailjs from "@emailjs/browser";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowUpRight, ChevronDown, Check, ArrowRight } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const projectTypes = ["AI Agent", "RAG System", "Healthcare AI", "Automation", "MVP", "Consulting", "Other"];
const budgetRanges = ["Under $2K", "$2K – $5K", "$5K – $10K", "$10K+", "Let's Discuss"];
const timelines = ["ASAP", "1 Month", "2–3 Months", "Flexible"];

const workTypes = [
  "AI Consulting",
  "LLM Applications",
  "Enterprise AI",
  "AI Agents",
  "RAG Systems",
  "Technical Architecture",
  "Research Collaboration",
  "Speaking",
];

const processSteps = [
  { label: "Discovery", desc: "Goals, constraints, success criteria." },
  { label: "Architecture", desc: "Design the right AI system." },
  { label: "Proposal", desc: "Scope, timeline, and cost." },
  { label: "Development", desc: "Build and iterate fast." },
  { label: "Deployment", desc: "Production-ready delivery." },
  { label: "Support", desc: "Ongoing reliability." },
];

const faqs = [
  {
    q: "Do you build MVPs?",
    a: "Yes. I specialize in taking AI products from zero to production. MVPs are one of my favorite engagements—fast, focused, and high-impact.",
  },
  {
    q: "Can you deploy on AWS or Azure?",
    a: "Absolutely. I'm experienced with AWS, Azure, and GCP—including serverless, containerized, and managed ML services.",
  },
  {
    q: "Can you work with early-stage startups?",
    a: "Yes. Some of my best work has been with founders who had a great idea and needed an AI engineer to bring it to life.",
  },
  {
    q: "Can you sign an NDA?",
    a: "Of course. I treat all client work with full confidentiality. NDA can be signed before any technical discussion.",
  },
  {
    q: "Do you work remotely?",
    a: "100% remote across all timezones. I've worked with teams in 15+ countries with zero friction.",
  },
  {
    q: "Can you maintain projects post-launch?",
    a: "Yes. I offer ongoing support, monitoring, and iteration as a separate engagement after initial delivery.",
  },
];

const socials = [
  {
    label: "GitHub",
    sub: "Open Source Work",
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
    label: "Email",
    sub: "Direct Contact",
     href: "https://mail.google.com/mail/?view=cm&fs=1&to=sihabulislamsafin1@gmail.com&su=Hello%20Safin",
    color: "#4F46E5",
  },
  {
    label: "HuggingFace",
    sub: "Models & Spaces",
    href: "https://huggingface.co/sihabsafin",
    color: "#38BDF8",
  },
  {
    label: "Kaggle",
    sub: "Data Science",
    href: "https://kaggle.com/sihabsafin",
    color: "#818CF8",
  },
];

const whatNextSteps = [
  {
    num: "01",
    title: "We Discuss",
    desc: "We understand your goals, constraints, and success criteria.",
    color: "#38BDF8",
  },
  {
    num: "02",
    title: "We Design",
    desc: "We architect the right AI solution before writing a single line of code.",
    color: "#818CF8",
  },
  {
    num: "03",
    title: "We Build",
    desc: "We deliver production-ready systems with testing, deployment, and support.",
    color: "#4F46E5",
  },
];

// ─── Custom Select ─────────────────────────────────────────────────────────────

function PremiumSelect({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className="relative">
      <label className="block text-[11px] font-mono uppercase tracking-[0.2em] text-white/35 mb-2">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full h-12 px-4 rounded-xl flex items-center justify-between text-sm transition-all duration-200"
        style={{
          background: "hsl(220 40% 8% / 0.8)",
          border: open ? "1px solid hsl(199 89% 60% / 0.4)" : "1px solid hsl(0 0% 100% / 0.08)",
          color: value ? "white" : "hsl(0 0% 100% / 0.3)",
          boxShadow: open ? "0 0 20px hsl(199 89% 60% / 0.08)" : "none",
        }}
      >
        <span>{value || `Select ${label}`}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4 opacity-40" />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="absolute top-full left-0 right-0 mt-2 z-50 overflow-hidden rounded-xl py-1"
            style={{
              background: "hsl(220 40% 9%)",
              border: "1px solid hsl(0 0% 100% / 0.1)",
              boxShadow: "0 20px 60px -12px hsl(220 50% 2% / 0.8)",
            }}
          >
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => { onChange(opt); setOpen(false); }}
                className="w-full text-left px-4 py-2.5 text-sm transition-all duration-150 flex items-center justify-between group"
                style={{
                  color: value === opt ? "#38BDF8" : "hsl(0 0% 100% / 0.65)",
                  background: "transparent",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "hsl(0 0% 100% / 0.04)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >
                {opt}
                {value === opt && <Check className="w-3.5 h-3.5" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── FAQ Accordion ────────────────────────────────────────────────────────────

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  const inView = useInView(useRef(null), { once: true });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      className="border-b last:border-b-0 transition-colors duration-200"
      style={{ borderColor: "hsl(0 0% 100% / 0.06)" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group gap-4"
      >
        <span
          className="text-sm font-medium transition-colors duration-200"
          style={{ color: open ? "white" : "hsl(0 0% 100% / 0.65)" }}
        >
          {q}
        </span>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-lg leading-none"
          style={{
            background: open ? "hsl(199 89% 60% / 0.15)" : "hsl(0 0% 100% / 0.05)",
            color: open ? "#38BDF8" : "hsl(0 0% 100% / 0.35)",
            border: `1px solid ${open ? "hsl(199 89% 60% / 0.3)" : "hsl(0 0% 100% / 0.08)"}`,
            fontSize: "13px",
          }}
        >
          +
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="text-sm text-white/45 leading-relaxed pb-5">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export const ContactSection = () => {
  const { toast } = useToast();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
  });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await emailjs.send(
        "service_4gvieue",
        "template_lbgomol",
        {
          name: form.name,
          email: form.email,
          message: `Company: ${form.company}\nProject: ${form.projectType}\nBudget: ${form.budget}\nTimeline: ${form.timeline}\n\n${form.message}`,
        },
        "RPpdqVqxbspagzyuo"
      );
      setSubmitted(true);
    } catch {
      toast({ title: "Failed to send", description: "Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-25 pointer-events-none" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, hsl(199 89% 60% / 0.07) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at bottom right, hsl(239 84% 60% / 0.06) 0%, transparent 65%)",
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
          <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-white/25 mb-8">
            / Contact
          </p>
          <h2
            className="font-semibold tracking-tight leading-[1.0]"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4.5rem)" }}
          >
            <span className="gradient-text">Let's Build</span>
            <br />
            <span className="gradient-text">Something</span>
            <br />
            <span
              className="serif-italic"
              style={{
                fontSize: "clamp(2.8rem, 5.5vw, 5rem)",
                background: "linear-gradient(120deg, #38BDF8 0%, #818CF8 50%, #4F46E5 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Intelligent.
            </span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg text-white/40 max-w-lg leading-relaxed mb-20 font-light"
        >
          Whether you're building an AI startup,<br />
          enterprise automation,<br />
          or production-grade LLM systems,<br />
          I'd love to hear your idea.
        </motion.p>

        {/* ── Main Grid ── */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 mb-24">

          {/* ── LEFT ── */}
          <div className="lg:col-span-5 space-y-6">

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="glass-card p-7 relative overflow-hidden"
              style={{ border: "1px solid hsl(152 76% 50% / 0.15)" }}
            >
              <div
                className="absolute -top-12 -right-12 w-32 h-32 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse, hsl(152 76% 50% / 0.12), transparent 70%)",
                }}
              />
              <div className="flex items-center gap-3 mb-4">
                <div className="live-dot" />
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-white/35">
                  Status
                </span>
              </div>
              <p
                className="text-2xl font-semibold tracking-tight mb-2"
                style={{ color: "#34d399" }}
              >
                Available
              </p>
              <p className="text-sm text-white/45 leading-relaxed">
                Currently accepting{" "}
                <span className="text-white/80 font-medium">2 new AI projects</span>{" "}
                for this quarter.
              </p>
            </motion.div>

            {/* Ways We Work */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="glass-card p-7"
            >
              <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/25 mb-5">
                / Ways We Can Work
              </p>
              <div className="grid grid-cols-2 gap-2">
                {workTypes.map((w, i) => (
                  <motion.div
                    key={w}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.25 + i * 0.04 }}
                    className="flex items-center gap-2.5 py-1.5"
                  >
                    <div
                      className="w-1 h-1 rounded-full flex-shrink-0"
                      style={{
                        background:
                          i % 2 === 0 ? "#38BDF8" : "#818CF8",
                      }}
                    />
                    <span className="text-xs text-white/55 font-medium">{w}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Working Process */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.26 }}
              className="glass-card p-7"
            >
              <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/25 mb-6">
                / Working Process
              </p>
              <div className="relative">
                <div
                  className="absolute left-[9px] top-2 bottom-2 w-[1px]"
                  style={{
                    background:
                      "linear-gradient(to bottom, #38BDF830, #4F46E530, transparent)",
                  }}
                />
                <div className="space-y-4">
                  {processSteps.map((step, i) => (
                    <motion.div
                      key={step.label}
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + i * 0.07 }}
                      className="flex items-start gap-4"
                    >
                      <div
                        className="w-[18px] h-[18px] rounded-full flex-shrink-0 flex items-center justify-center mt-0.5 relative z-10"
                        style={{
                          background: `linear-gradient(135deg, #38BDF820, #4F46E520)`,
                          border: "1px solid #38BDF840",
                        }}
                      >
                        <div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: i < 3 ? "#38BDF8" : "#818CF8" }}
                        />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-white/75">{step.label}</p>
                        <p className="text-xs text-white/30 mt-0.5">{step.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Response Promise */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.34 }}
              className="glass-card p-7 text-center relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, hsl(220 40% 9% / 0.8), hsl(239 84% 10% / 0.5))",
                border: "1px solid hsl(239 84% 60% / 0.12)",
              }}
            >
              <div
                className="absolute -bottom-10 -right-10 w-40 h-40 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse, hsl(199 89% 60% / 0.08), transparent 70%)",
                }}
              />
              <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/25 mb-4">
                Average Response
              </p>
              <p
                className="font-bold tracking-tight mb-1"
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                  background: "linear-gradient(120deg, #38BDF8, #818CF8)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                24 Hours
              </p>
              <p className="text-xs text-white/35 font-mono">Worldwide.</p>
            </motion.div>
          </div>

          {/* ── RIGHT: Form + FAQ ── */}
          <div className="lg:col-span-7 space-y-6">

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="gradient-border-card relative overflow-hidden"
            >
              <div
                className="absolute -top-20 -right-20 w-52 h-52 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse, hsl(239 84% 60% / 0.08), transparent 70%)",
                }}
              />

              <div className="p-8 lg:p-10">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="py-16 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                        className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
                        style={{
                          background: "hsl(152 76% 50% / 0.12)",
                          border: "1px solid hsl(152 76% 50% / 0.3)",
                          boxShadow: "0 0 40px hsl(152 76% 50% / 0.2)",
                        }}
                      >
                        <Check className="w-7 h-7" style={{ color: "#34d399" }} />
                      </motion.div>
                      <h3 className="text-2xl font-semibold tracking-tight mb-2 text-white">
                        Message Sent.
                      </h3>
                      <p className="text-sm text-white/45">
                        I'll respond within 24 hours. Looking forward to it.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={submit}
                      className="space-y-5"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/25 mb-6">
                        / Start a Project
                      </p>

                      {/* Name + Company */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-[11px] font-mono uppercase tracking-[0.2em] text-white/35 mb-2"
                          >
                            Name *
                          </label>
                          <input
                            id="name"
                            value={form.name}
                            onChange={(e) => set("name", e.target.value)}
                            required
                            placeholder="Your name"
                            className="w-full h-12 px-4 rounded-xl text-sm text-white placeholder:text-white/20 outline-none transition-all duration-200 focus:ring-0"
                            style={{
                              background: "hsl(220 40% 8% / 0.8)",
                              border: "1px solid hsl(0 0% 100% / 0.08)",
                            }}
                            onFocus={(e) => {
                              e.target.style.border = "1px solid hsl(199 89% 60% / 0.4)";
                              e.target.style.boxShadow = "0 0 20px hsl(199 89% 60% / 0.08)";
                            }}
                            onBlur={(e) => {
                              e.target.style.border = "1px solid hsl(0 0% 100% / 0.08)";
                              e.target.style.boxShadow = "none";
                            }}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="company"
                            className="block text-[11px] font-mono uppercase tracking-[0.2em] text-white/35 mb-2"
                          >
                            Company
                          </label>
                          <input
                            id="company"
                            value={form.company}
                            onChange={(e) => set("company", e.target.value)}
                            placeholder="Your company"
                            className="w-full h-12 px-4 rounded-xl text-sm text-white placeholder:text-white/20 outline-none transition-all duration-200"
                            style={{
                              background: "hsl(220 40% 8% / 0.8)",
                              border: "1px solid hsl(0 0% 100% / 0.08)",
                            }}
                            onFocus={(e) => {
                              e.target.style.border = "1px solid hsl(199 89% 60% / 0.4)";
                              e.target.style.boxShadow = "0 0 20px hsl(199 89% 60% / 0.08)";
                            }}
                            onBlur={(e) => {
                              e.target.style.border = "1px solid hsl(0 0% 100% / 0.08)";
                              e.target.style.boxShadow = "none";
                            }}
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-[11px] font-mono uppercase tracking-[0.2em] text-white/35 mb-2"
                        >
                          Email *
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={form.email}
                          onChange={(e) => set("email", e.target.value)}
                          required
                          placeholder="your@email.com"
                          className="w-full h-12 px-4 rounded-xl text-sm text-white placeholder:text-white/20 outline-none transition-all duration-200"
                          style={{
                            background: "hsl(220 40% 8% / 0.8)",
                            border: "1px solid hsl(0 0% 100% / 0.08)",
                          }}
                          onFocus={(e) => {
                            e.target.style.border = "1px solid hsl(199 89% 60% / 0.4)";
                            e.target.style.boxShadow = "0 0 20px hsl(199 89% 60% / 0.08)";
                          }}
                          onBlur={(e) => {
                            e.target.style.border = "1px solid hsl(0 0% 100% / 0.08)";
                            e.target.style.boxShadow = "none";
                          }}
                        />
                      </div>

                      {/* Selects */}
                      <div className="grid sm:grid-cols-3 gap-4">
                        <PremiumSelect
                          label="Project Type"
                          options={projectTypes}
                          value={form.projectType}
                          onChange={(v) => set("projectType", v)}
                        />
                        <PremiumSelect
                          label="Budget Range"
                          options={budgetRanges}
                          value={form.budget}
                          onChange={(v) => set("budget", v)}
                        />
                        <PremiumSelect
                          label="Timeline"
                          options={timelines}
                          value={form.timeline}
                          onChange={(v) => set("timeline", v)}
                        />
                      </div>

                      {/* Message */}
                      <div>
                        <label
                          htmlFor="message"
                          className="block text-[11px] font-mono uppercase tracking-[0.2em] text-white/35 mb-2"
                        >
                          Message *
                        </label>
                        <textarea
                          id="message"
                          value={form.message}
                          onChange={(e) => set("message", e.target.value)}
                          required
                          rows={5}
                          placeholder="Tell me about your project, goals, and what success looks like..."
                          className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-white/20 outline-none resize-none transition-all duration-200"
                          style={{
                            background: "hsl(220 40% 8% / 0.8)",
                            border: "1px solid hsl(0 0% 100% / 0.08)",
                          }}
                          onFocus={(e) => {
                            e.target.style.border = "1px solid hsl(199 89% 60% / 0.4)";
                            e.target.style.boxShadow = "0 0 20px hsl(199 89% 60% / 0.08)";
                          }}
                          onBlur={(e) => {
                            e.target.style.border = "1px solid hsl(0 0% 100% / 0.08)";
                            e.target.style.boxShadow = "none";
                          }}
                        />
                      </div>

                      {/* Submit */}
                      <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="w-full h-14 rounded-xl text-sm font-semibold flex items-center justify-center gap-3 relative overflow-hidden transition-all duration-300"
                        style={{
                          background: loading
                            ? "hsl(220 40% 12%)"
                            : "linear-gradient(135deg, #38BDF8, #4F46E5)",
                          color: "white",
                          boxShadow: loading
                            ? "none"
                            : "0 8px 32px -8px hsl(199 89% 60% / 0.5), 0 0 0 1px hsl(199 89% 60% / 0.2)",
                        }}
                      >
                        {loading ? (
                          <span className="opacity-50">Sending…</span>
                        ) : (
                          <>
                            <span>Start the Conversation</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </motion.button>

                      <p className="text-center text-[11px] text-white/20 font-mono">
                        No spam. No commitment. Just a conversation.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* FAQ */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="glass-card p-8"
            >
              <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/25 mb-2">
                / FAQ
              </p>
              <div className="mt-4">
                {faqs.map((f, i) => (
                  <FAQItem key={f.q} q={f.q} a={f.a} index={i} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Social Cards ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-24"
        >
          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/25 mb-6">
            / Connect
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {socials.map((s, i) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.07, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className="group relative flex flex-col justify-between p-5 rounded-2xl overflow-hidden transition-all duration-400"
                style={{
                  background: "hsl(220 40% 8% / 0.7)",
                  border: "1px solid hsl(0 0% 100% / 0.06)",
                  backdropFilter: "blur(20px)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.border = `1px solid ${s.color}30`;
                  el.style.boxShadow = `0 16px 40px -12px ${s.color}20`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.border = "1px solid hsl(0 0% 100% / 0.06)";
                  el.style.boxShadow = "none";
                }}
              >
                {/* Background glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at top left, ${s.color}08, transparent 70%)`,
                  }}
                />

                <div className="flex items-start justify-between mb-6">
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
                  <motion.div
                    className="opacity-0 group-hover:opacity-100 transition-all duration-300"
                    initial={{ x: -4, y: 4 }}
                    whileHover={{ x: 0, y: 0 }}
                  >
                    <ArrowUpRight className="w-4 h-4" style={{ color: s.color }} />
                  </motion.div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors mb-0.5">
                    {s.label}
                  </p>
                  <p className="text-[11px] text-white/30">{s.sub}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* ── What Happens Next ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
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
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[1px]"
              style={{
                background:
                  "linear-gradient(90deg, transparent, hsl(199 89% 60% / 0.3), transparent)",
              }}
            />

            <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/25 text-center mb-12">
              / What Happens Next
            </p>

            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Connector lines */}
              <div className="hidden md:block absolute top-8 left-[33%] right-[33%] h-[1px]"
                style={{
                  background: "linear-gradient(90deg, #38BDF830, #4F46E530)",
                }}
              />

              {whatNextSteps.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.12, duration: 0.6 }}
                  className="relative text-center group"
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:scale-105"
                    style={{
                      background: `${step.color}10`,
                      border: `1px solid ${step.color}25`,
                      boxShadow: `0 0 0 0 ${step.color}00`,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 0 24px ${step.color}20`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 0 ${step.color}00`;
                    }}
                  >
                    <span
                      className="text-lg font-bold font-mono"
                      style={{ color: step.color }}
                    >
                      {step.num}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-white/90 mb-2 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs text-white/35 leading-relaxed max-w-[180px] mx-auto">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Trust Strip ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-20"
        >
          <p className="text-sm text-white/25 font-light tracking-wide">
            Trusted by founders, startups, researchers,<br className="sm:hidden" />
            {" "}and businesses building the future with AI.
          </p>
        </motion.div>

        {/* ── Final Quote ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="text-center"
        >
          <div className="w-12 h-[1px] bg-white/10 mx-auto mb-14" />
          <blockquote>
            <p
              className="serif-italic leading-tight mb-3"
              style={{
                fontSize: "clamp(2rem, 4.5vw, 4rem)",
                background: "linear-gradient(120deg, #FFFFFF 0%, #BAE6FD 40%, #A5B4FC 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              The best products
            </p>
            <p
              className="serif-italic leading-tight mb-3"
              style={{
                fontSize: "clamp(2rem, 4.5vw, 4rem)",
                color: "hsl(0 0% 100% / 0.3)",
              }}
            >
              begin with
            </p>
            <p
              className="serif-italic leading-tight"
              style={{
                fontSize: "clamp(2rem, 4.5vw, 4rem)",
                background: "linear-gradient(120deg, #38BDF8 0%, #818CF8 50%, #4F46E5 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              a conversation.
            </p>
          </blockquote>
          <div className="w-12 h-[1px] bg-white/10 mx-auto mt-14" />
        </motion.div>

      </div>
    </section>
  );
};