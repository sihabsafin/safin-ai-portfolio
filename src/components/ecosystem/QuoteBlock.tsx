import { motion } from "framer-motion";

interface QuoteBlockProps {
  inView: boolean;
}

export const QuoteBlock = ({ inView }: QuoteBlockProps) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
    className="text-center py-16 px-4"
  >
    {/* Decorative line */}
    <div className="flex items-center justify-center gap-4 mb-10">
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/15" />
      <div className="w-1 h-1 rounded-full bg-white/20" />
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/15" />
    </div>

    <div className="max-w-2xl mx-auto">
      <p className="text-3xl lg:text-[44px] leading-[1.15] tracking-tight font-semibold text-white/80 mb-3">
        Great AI products are{" "}
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
          ecosystems
        </em>
        .
      </p>
      <p className="text-3xl lg:text-[44px] leading-[1.15] tracking-tight font-semibold text-white/40">
        Not prompts.
      </p>
    </div>

    <div className="flex items-center justify-center gap-4 mt-10 mb-8">
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/15" />
      <div className="w-1 h-1 rounded-full bg-white/20" />
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/15" />
    </div>

    <p className="text-[12.5px] text-white/28 font-medium leading-relaxed max-w-lg mx-auto">
      Every AI system I build follows this production architecture.
      <br />
      The technologies may evolve. The engineering principles do not.
    </p>
  </motion.div>
);