import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  MessageSquare, Search, Network, FlaskConical,
  ClipboardCheck, Rocket, ActivitySquare, Zap,
} from "lucide-react";

const steps = [
  { icon: MessageSquare, label: "Problem",       desc: "Define the business need",      color: "#38BDF8" },
  { icon: Search,        label: "Research",      desc: "Explore approaches",             color: "#60A5FA" },
  { icon: Network,       label: "Architecture",  desc: "System design",                  color: "#818CF8" },
  { icon: FlaskConical,  label: "Prototype",     desc: "Fast validation",                color: "#A78BFA" },
  { icon: ClipboardCheck,label: "Evaluation",    desc: "Measure rigorously",             color: "#C084FC" },
  { icon: Rocket,        label: "Deployment",    desc: "Production-grade ship",          color: "#E879F9" },
  { icon: ActivitySquare,label: "Monitoring",    desc: "Observe & alert",                color: "#F472B6" },
  { icon: Zap,           label: "Optimization",  desc: "Iterate on signal",              color: "#FB7185" },
];

const TravelingPulse = ({ inView, delay = 0 }: { inView: boolean; delay?: number }) => (
  <motion.div
    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full z-20 pointer-events-none"
    style={{
      background: "radial-gradient(circle, #fff 0%, #38BDF8 60%, transparent 100%)",
      boxShadow: "0 0 12px 4px rgba(56,189,248,0.6)",
      left: 0,
    }}
    initial={{ left: "0%", opacity: 0 }}
    animate={inView ? { left: ["0%", "100%"], opacity: [0, 1, 1, 0] } : {}}
    transition={{
      duration: 3.2,
      delay,
      repeat: Infinity,
      repeatDelay: 2.5,
      ease: "easeInOut",
    }}
  />
);

const FlowArrow = ({ color, inView, delay }: { color: string; inView: boolean; delay: number }) => (
  <div className="flex items-center justify-center w-full h-full relative">
    <motion.div
      className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2"
      style={{ background: `linear-gradient(to right, ${color}40, ${color}80)`, transformOrigin: "left" }}
      initial={{ scaleX: 0 }}
      animate={inView ? { scaleX: 1 } : {}}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
    />
    <motion.div
      className="absolute right-0 top-1/2 -translate-y-1/2"
      initial={{ opacity: 0, x: -4 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.3, delay: delay + 0.3 }}
    >
      <svg width="7" height="9" viewBox="0 0 7 9" fill="none">
        <path d="M0 0L7 4.5L0 9" fill={color} opacity="0.7" />
      </svg>
    </motion.div>
  </div>
);

export const WorkflowTimeline = React.memo(() => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [autoStep, setAutoStep] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const timer = setInterval(() => {
      setAutoStep((prev) => (prev + 1) % steps.length);
    }, 1100);
    return () => clearInterval(timer);
  }, [inView]);

  const displayStep = activeStep !== null ? activeStep : autoStep;

  return (
    <div ref={ref} className="mt-20 lg:mt-28">
      {/* Header row */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between mb-10 gap-4"
      >
        <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground shrink-0">
          Engineering Workflow
        </p>

        {/* Dynamic active step pill */}
        <AnimatePresence mode="wait">
          <motion.div
            key={displayStep}
            initial={{ opacity: 0, y: 5, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.94 }}
            transition={{ duration: 0.22 }}
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-mono"
            style={{
              background: `${steps[displayStep].color}10`,
              border: `1px solid ${steps[displayStep].color}28`,
            }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: steps[displayStep].color }}
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            />
            <span style={{ color: steps[displayStep].color }} className="font-semibold">
              {String(displayStep + 1).padStart(2, "0")} {steps[displayStep].label}
            </span>
            <span className="text-muted-foreground">—</span>
            <span className="text-foreground/60">{steps[displayStep].desc}</span>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* ── Desktop ── */}
      <div className="hidden md:block">
        {/* Track + nodes */}
        <div className="relative">
          {/* Static base track */}
          <div
            className="absolute top-[38px] left-[3.5%] right-[3.5%] h-px"
            style={{ background: "rgba(255,255,255,0.05)" }}
          />
          {/* Animated gradient fill */}
          <motion.div
            className="absolute top-[38px] left-[3.5%] right-[3.5%] h-px origin-left"
            style={{ background: "linear-gradient(to right, #38BDF8, #818CF8, #FB7185)" }}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />
          {/* Traveling pulse */}
          <div className="absolute top-[30px] left-[3.5%] right-[3.5%] h-5 overflow-hidden pointer-events-none">
            <TravelingPulse inView={inView} delay={2.0} />
            <TravelingPulse inView={inView} delay={5.0} />
          </div>

          {/* 8 step nodes */}
          <div className="grid grid-cols-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isActive = displayStep === i;

              return (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.18 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center text-center cursor-pointer select-none"
                  onMouseEnter={() => setActiveStep(i)}
                  onMouseLeave={() => setActiveStep(null)}
                >
                  {/* Node */}
                  <motion.div
                    animate={{
                      scale: isActive ? 1.22 : 1,
                      background: isActive
                        ? `linear-gradient(135deg, ${step.color}25, ${step.color}12)`
                        : "hsl(220 40% 8% / 0.95)",
                      borderColor: isActive ? `${step.color}55` : "rgba(255,255,255,0.08)",
                    }}
                    transition={{ duration: 0.22 }}
                    className="w-[54px] h-[54px] rounded-[16px] flex items-center justify-center mb-4 z-10 relative border"
                    style={{ boxShadow: "0 0 0 4px hsl(220 40% 4%)" }}
                  >
                    <motion.div
                      animate={{ rotate: isActive ? 12 : 0, scale: isActive ? 1.1 : 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Icon
                        className="w-[19px] h-[19px]"
                        style={{
                          color: isActive ? step.color : "rgba(56,189,248,0.55)",
                          transition: "color 0.2s",
                        }}
                        strokeWidth={1.5}
                      />
                    </motion.div>
                    {/* Pulse ring */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-[16px] border"
                        style={{ borderColor: step.color }}
                        initial={{ scale: 1, opacity: 0.7 }}
                        animate={{ scale: 1.6, opacity: 0 }}
                        transition={{ duration: 0.9, repeat: Infinity, ease: "easeOut" }}
                      />
                    )}
                  </motion.div>

                  {/* Step index */}
                  <div
                    className="text-[9px] font-mono font-bold mb-1 transition-colors duration-200"
                    style={{ color: isActive ? step.color : "rgba(255,255,255,0.18)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  {/* Label */}
                  <div
                    className="text-[12px] font-semibold leading-tight mb-1 transition-colors duration-200"
                    style={{ color: isActive ? "#fff" : "rgba(255,255,255,0.55)" }}
                  >
                    {step.label}
                  </div>

                  {/* Desc */}
                  <div
                    className="text-[10px] leading-tight transition-colors duration-200"
                    style={{ color: isActive ? `${step.color}bb` : "rgba(255,255,255,0.28)" }}
                  >
                    {step.desc}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Arrow row beneath */}
        <div className="grid grid-cols-8 mt-2 px-[3.5%]">
          {steps.map((step, i) => (
            <div key={step.label} className="relative h-5">
              {i < steps.length - 1 && (
                <div className="absolute -right-[6px] top-0 w-[calc(100%+12px)] h-full">
                  <FlowArrow color={step.color} inView={inView} delay={0.8 + i * 0.11} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Mobile: vertical stepper ── */}
      <div className="md:hidden space-y-0">
        {steps.map((step, i) => {
          const Icon = step.icon;
          const isActive = displayStep === i;
          return (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, x: -14 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.08 + i * 0.07 }}
              className="flex gap-4 cursor-pointer"
              onClick={() => setActiveStep(isActive ? null : i)}
            >
              <div className="flex flex-col items-center">
                <motion.div
                  animate={{ scale: isActive ? 1.15 : 1 }}
                  transition={{ duration: 0.2 }}
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 z-10 border"
                  style={{
                    background: isActive ? `${step.color}18` : "hsl(220 40% 8%)",
                    borderColor: isActive ? `${step.color}50` : "rgba(255,255,255,0.09)",
                    boxShadow: isActive ? `0 0 14px ${step.color}35` : "none",
                  }}
                >
                  <Icon className="w-4 h-4" style={{ color: isActive ? step.color : "rgba(56,189,248,0.55)" }} strokeWidth={1.5} />
                </motion.div>
                {i < steps.length - 1 && (
                  <motion.div
                    className="w-px my-1"
                    style={{
                      background: `linear-gradient(to bottom, ${step.color}50, ${steps[i+1].color}20)`,
                      minHeight: 28,
                    }}
                    initial={{ scaleY: 0 }}
                    animate={inView ? { scaleY: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.3 + i * 0.07 }}
                  />
                )}
              </div>
              <div className="pb-5 pt-1 flex-1">
                <div className="text-[9px] font-mono mb-0.5" style={{ color: `${step.color}80` }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="text-sm font-semibold" style={{ color: isActive ? "#fff" : "rgba(255,255,255,0.65)" }}>
                  {step.label}
                </div>
                <div className="text-xs text-muted-foreground">{step.desc}</div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
});
WorkflowTimeline.displayName = "WorkflowTimeline";