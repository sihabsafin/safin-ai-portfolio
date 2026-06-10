import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GitBranch, Cloud, Clock } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { Roadmap } from "./Roadmap";

const deploymentStack = ["AWS ECS", "Docker", "Kubernetes"];

const ProgressBar = React.memo(({ value }: { value: number }) => (
  <div className="mt-6">
    <div className="flex items-center justify-between mb-2">
      <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
        Build Progress
      </span>
      <span className="text-[11px] font-mono text-sky-400">{value}%</span>
    </div>
    <div
      className="h-1.5 rounded-full overflow-hidden"
      style={{ background: "rgba(255,255,255,0.06)" }}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="h-full rounded-full"
        style={{
          background: "linear-gradient(90deg, #38BDF8, #4F46E5)",
          boxShadow: "0 0 12px rgba(56,189,248,0.4)",
        }}
      />
    </div>
  </div>
));
ProgressBar.displayName = "ProgressBar";

export const FeaturedProjectCard = React.memo(() => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="gradient-border-card p-7 lg:p-8 h-full flex flex-col"
      style={{ minHeight: 480 }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground mb-2">
            Featured Project
          </p>
          <h3 className="text-xl lg:text-2xl font-semibold tracking-tight leading-snug">
            Enterprise Multi-Agent
            <br />
            <span className="serif-italic gradient-text-accent">Platform</span>
          </h3>
        </div>
        <StatusBadge status="beta" />
      </div>

      {/* Meta grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {[
          { icon: <GitBranch className="w-3.5 h-3.5" />, label: "Version", value: "v2.4" },
          { icon: <Cloud className="w-3.5 h-3.5" />, label: "Deploy", value: "AWS ECS" },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-xl px-3.5 py-2.5"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
              {item.icon}
              <span className="text-[10px] uppercase tracking-wider">{item.label}</span>
            </div>
            <div className="text-sm font-medium text-foreground/90">{item.value}</div>
          </div>
        ))}
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed mb-6">
        Building a modular AI platform capable of orchestrating multiple specialized agents
        for enterprise automation, knowledge retrieval, and autonomous decision-making.
      </p>

      {/* Deployment stack */}
      <div className="flex items-center gap-2 mb-2">
        <Cloud className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Deployment</span>
      </div>
      <div className="flex gap-2 flex-wrap mb-2">
        {deploymentStack.map((d) => (
          <span
            key={d}
            className="text-[11px] font-mono px-2.5 py-1 rounded-lg text-foreground/60"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {d}
          </span>
        ))}
      </div>

      <ProgressBar value={82} />

      <div className="mt-auto pt-6">
        <Roadmap />
      </div>

      {/* Live activity chip */}
      <div
        className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full self-start"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <Clock className="w-3 h-3 text-muted-foreground" />
        <span className="text-[10px] font-mono text-muted-foreground">
          Last commit <span className="text-foreground/70">2 hours ago</span>
        </span>
      </div>
    </motion.div>
  );
});
FeaturedProjectCard.displayName = "FeaturedProjectCard";