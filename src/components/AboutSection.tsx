import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { StoryColumn } from "./about/StoryColumn";
import { PhilosophyTimeline } from "./about/PhilosophyTimeline";
import { EngineeringPrinciples } from "./about/EngineeringPrinciples";
import { JourneyTimeline } from "./about/JourneyTimeline";
import { ArchitectureSketch } from "./about/ArchitectureSketch";
import { StatsStrip } from "./about/StatsStrip";
import { FounderCard } from "./about/FounderCard";

export const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Background depth — mirrors Hero language */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 5% 30%, rgba(56,189,248,0.05), transparent 60%), " +
            "radial-gradient(ellipse 45% 40% at 95% 70%, rgba(79,70,229,0.07), transparent 60%)",
        }}
      />
      <div className="absolute inset-0 grid-pattern opacity-25" />

      <div
        ref={ref}
        className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10 relative z-10"
      >
        {/* ── Section Header ── */}
        <div className="mb-16 lg:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground mb-5"
          >
            / About
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.06 }}
            className="text-[42px] sm:text-5xl lg:text-[64px] font-semibold tracking-[-0.04em] leading-[1.02]"
          >
            <span className="text-foreground">A short story</span>
            <br />
            <span className="text-foreground/60">about how I </span>
            <span className="serif-italic gradient-text-accent">build.</span>
          </motion.h2>
        </div>

        {/* ── Row 1: Story + Philosophy ── */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 mb-14">
          {/* Left: Editorial story */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <StoryColumn />
            </div>
          </div>

          {/* Right: Founder Card + Philosophy */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {/* Founder Card */}
            <FounderCard />

            <div className="grid sm:grid-cols-2 gap-6">
              {/* Build Process timeline */}
              <div className="glass-card p-6 lg:p-7">
                <PhilosophyTimeline />
              </div>

              {/* Principles + Architecture stacked */}
              <div className="flex flex-col gap-5">
                <EngineeringPrinciples />
                <ArchitectureSketch />
              </div>
            </div>
          </div>
        </div>

        {/* ── Stats Strip ── */}
        <div className="mb-14">
          <StatsStrip />
        </div>

        {/* ── Journey Timeline ── */}
        <div
          className="rounded-3xl p-7 lg:p-10"
          style={{
            background: "hsl(220 40% 7% / 0.5)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <JourneyTimeline />
        </div>
      </div>
    </section>
  );
};