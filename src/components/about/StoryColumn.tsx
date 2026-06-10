import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const whatIBuild = [
  "Enterprise AI",
  "AI Agents",
  "LLMs",
  "RAG Pipelines",
  "Healthcare AI",
  "Automation",
  "Production ML",
];

const blocks = [
  {
    label: "Who I Am",
    body: "I'm a Generative AI Engineer focused on building production-ready AI systems — not experimental demos. I live at the intersection of research and shipping.",
  },
  {
    label: "What I Believe",
    body: "Good AI isn't measured by how impressive the demo is. It's measured by whether businesses can trust it in production — at scale, under pressure, with real users.",
  },
  {
    label: "Why",
    body: "My goal is simple: build intelligent software that creates measurable business value. Not AI for the sake of AI. AI that earns its place in production.",
  },
];

export const StoryColumn = React.memo(() => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="space-y-10">
      {blocks.map((block, i) => (
        <motion.div
          key={block.label}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-sky-400/80 mb-2">
            {block.label}
          </p>
          <p className="text-base text-foreground/80 leading-relaxed">{block.body}</p>
        </motion.div>
      ))}

      {/* What I Build pill cluster */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-sky-400/80 mb-3">
          What I Build
        </p>
        <div className="flex flex-wrap gap-2">
          {whatIBuild.map((item) => (
            <span key={item} className="pill text-xs px-3.5 py-1.5">
              {item}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
});
StoryColumn.displayName = "StoryColumn";