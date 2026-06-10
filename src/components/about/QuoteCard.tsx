import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface QuoteCardProps {
  quote: string;
  className?: string;
}

export const QuoteCard = React.memo(({ quote, className = "" }: QuoteCardProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`gradient-border-card p-8 lg:p-10 relative overflow-hidden ${className}`}
    >
      {/* Ambient glow */}
      <div
        className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(56,189,248,0.06), transparent 70%)",
          filter: "blur(30px)",
        }}
      />
      {/* Large quote mark */}
      <div
        className="absolute top-4 left-6 font-serif text-[80px] leading-none pointer-events-none select-none"
        style={{ color: "rgba(56,189,248,0.08)", fontFamily: "Georgia, serif" }}
        aria-hidden="true"
      >
        "
      </div>
      <p className="relative text-xl lg:text-2xl font-medium leading-relaxed text-foreground/90 serif-italic">
        {quote}
      </p>
    </motion.div>
  );
});
QuoteCard.displayName = "QuoteCard";