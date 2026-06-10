/**
 * TestimonialsSection.tsx
 * Section 09 — "Trusted by People Who Build Great Products."
 * Drop into your page below EngineeringDecisions.
 *
 * Depends on:
 *  - Framer Motion  (npm i framer-motion)
 *  - Tailwind CSS + design tokens from index.css
 *  - Fonts: Instrument Serif, Inter, JetBrains Mono (already in index.css)
 *
 * Usage:
 *  import TestimonialsSection from '@/components/TestimonialsSection'
 *  <TestimonialsSection />
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from 'framer-motion';

/* ─────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────── */

const FEATURED = {
  name: 'Dr. Marcus Elliot',
  role: 'Chief Technology Officer',
  company: 'Meridian Health AI',
  avatar: '/avatars/marcus.jpg', // replace or remove
  initials: 'ME',
  project: 'Enterprise RAG Platform',
  industry: 'Healthcare Technology',
  result: '73% reduction in clinical query latency, deployed across 12 hospitals',
  quote:
    "Working with Safin was categorically different from any vendor relationship we'd had before. He didn't arrive with a solution looking for a problem — he arrived with questions. He challenged our assumptions about the architecture, surfaced tradeoffs we hadn't considered, and ultimately delivered something our entire engineering team could confidently own and extend. That kind of clarity is rare.",
  problem: 'Slow, hallucination-prone clinical document retrieval.',
  solution: 'Custom multi-stage RAG with hybrid vector + BM25 retrieval.',
  outcome: '73% faster queries. Zero hallucination incidents in 6 months.',
};

const TESTIMONIALS = [
  {
    name: 'Priya Nair',
    role: 'Founder & CEO',
    company: 'Luma Retail',
    initials: 'PN',
    avatarColor: '#4F46E5',
    industry: 'Retail Technology',
    project: 'Conversational Commerce Agent',
    quote:
      "We'd tried two agencies before Safin. Both delivered code. Safin delivered clarity. He reframed the problem completely and the agent he built has become our most valuable product feature.",
    problem: 'Low-conversion product discovery on mobile.',
    solution: 'LLM-powered shopping agent with intent classification.',
    outcome: '41% uplift in conversion. Featured in TechCrunch.',
  },
  {
    name: 'James Okonkwo',
    role: 'VP of Engineering',
    company: 'Apex Legal Intelligence',
    initials: 'JO',
    avatarColor: '#0EA5E9',
    industry: 'Legal Tech',
    project: 'Contract Intelligence Suite',
    quote:
      'Safin brought a rare combination — he understood the legal domain deeply enough to ask the right questions, and the ML background to build something that actually worked at scale.',
    problem: 'Manual contract review taking 8+ hours per document.',
    solution: 'Fine-tuned LLM pipeline with structured clause extraction.',
    outcome: 'Review time down to 22 minutes. $2.1M annual savings.',
  },
  {
    name: 'Sofia Andersson',
    role: 'Head of Data Science',
    company: 'Norden Capital',
    initials: 'SA',
    avatarColor: '#10B981',
    industry: 'FinTech',
    project: 'Anomaly Detection System',
    quote:
      'He wrote production-grade code, communicated like a senior engineer, and pushed back intelligently when we were about to make a mistake. That last part is the rarest thing.',
    problem: 'Undetected fraud costing €4M quarterly.',
    solution: 'Real-time streaming anomaly detection on transaction data.',
    outcome: '94% detection rate. False positives reduced by 67%.',
  },
];

const STATS = [
  { value: 20, suffix: '+', label: 'Production\nProjects' },
  { value: 15, suffix: '+', label: 'Countries\nServed' },
  { value: 98, suffix: '%', label: 'Client\nSatisfaction' },
  { value: 5, suffix: '+', label: 'Years of\nExperience' },
];

const MAP_DOTS = [
  { x: '22%', y: '38%', label: 'USA' },
  { x: '20%', y: '28%', label: 'Canada' },
  { x: '46%', y: '32%', label: 'UK' },
  { x: '50%', y: '30%', label: 'Germany' },
  { x: '55%', y: '44%', label: 'UAE' },
  { x: '80%', y: '65%', label: 'Australia' },
  { x: '66%', y: '40%', label: 'Bangladesh' },
  { x: '42%', y: '32%', label: 'France' },
  { x: '70%', y: '36%', label: 'India' },
];

const PROCESS_STEPS = [
  { label: 'Discovery', desc: 'Deep dive into your system and goals' },
  { label: 'Architecture Workshop', desc: 'Design the right solution together' },
  { label: 'Prototype', desc: 'Validate core assumptions fast' },
  { label: 'Production Build', desc: 'Rigorous, test-covered engineering' },
  { label: 'Deployment', desc: 'Smooth, documented release' },
  { label: 'Long-term Support', desc: 'Ongoing partnership, not a hand-off' },
];

/* ─────────────────────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────────────────────── */

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 18, mass: 0.8 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) motionVal.set(value);
  }, [inView, motionVal, value]);

  useEffect(() => {
    const unsub = spring.on('change', (v) => setDisplay(Math.round(v)));
    return unsub;
  }, [spring]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────
   PROBLEM → SOLUTION → RESULT BADGE
───────────────────────────────────────────────────────── */

function PSR({
  problem,
  solution,
  outcome,
}: {
  problem: string;
  solution: string;
  outcome: string;
}) {
  return (
    <div
      style={{
        background: 'hsl(220 40% 6% / 0.8)',
        border: '1px solid hsl(0 0% 100% / 0.07)',
        borderRadius: '0.75rem',
        padding: '0.875rem 1rem',
        marginTop: '1.25rem',
      }}
    >
      {[
        { emoji: '⚑', label: 'Problem', text: problem },
        { emoji: '⚙', label: 'Solution', text: solution },
        { emoji: '↑', label: 'Outcome', text: outcome },
      ].map((item, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            gap: '0.6rem',
            alignItems: 'flex-start',
            marginBottom: i < 2 ? '0.6rem' : 0,
          }}
        >
          <span
            style={{
              fontSize: '0.6rem',
              color: i === 0 ? '#F87171' : i === 1 ? '#38BDF8' : '#34D399',
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              paddingTop: '1px',
              minWidth: '52px',
            }}
          >
            {item.label}
          </span>
          <span
            style={{
              fontSize: '0.72rem',
              color: 'hsl(215 16% 70%)',
              lineHeight: 1.5,
              fontFamily: 'Inter, sans-serif',
            }}
          >
            {item.text}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   AVATAR
───────────────────────────────────────────────────────── */

function Avatar({
  src,
  initials,
  color,
  size = 56,
}: {
  src?: string;
  initials: string;
  color?: string;
  size?: number;
}) {
  const [err, setErr] = useState(false);
  const bg = color || '#4F46E5';

  if (src && !err) {
    return (
      <img
        src={src}
        alt={initials}
        onError={() => setErr(true)}
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          objectFit: 'cover',
          border: '2px solid hsl(0 0% 100% / 0.12)',
          flexShrink: 0,
        }}
      />
    );
  }

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: `${bg}22`,
        border: `1.5px solid ${bg}44`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, sans-serif',
        fontWeight: 600,
        fontSize: size * 0.3,
        color: bg,
        flexShrink: 0,
        letterSpacing: '0.05em',
      }}
    >
      {initials}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────── */

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      style={{
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 'clamp(5rem, 10vw, 9rem)',
        paddingBottom: 'clamp(5rem, 10vw, 9rem)',
      }}
    >
      {/* ── Grid background ── */}
      <div
        aria-hidden
        className="grid-pattern"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          opacity: 0.6,
        }}
      />

      {/* ── Ambient glow ── */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80vw',
          height: '60vh',
          background:
            'radial-gradient(ellipse at center, hsl(239 84% 60% / 0.07) 0%, transparent 65%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '20%',
          width: '50vw',
          height: '40vh',
          background:
            'radial-gradient(ellipse at center, hsl(199 89% 60% / 0.05) 0%, transparent 65%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div
        className="container-narrow"
        style={{ position: 'relative', zIndex: 1 }}
      >
        {/* ══════════════════════════════════════
            EDITORIAL HEADING
        ══════════════════════════════════════ */}
        <div
          ref={headingRef}
          style={{ textAlign: 'center', marginBottom: 'clamp(3.5rem, 7vw, 6rem)' }}
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="pill" style={{ marginBottom: '1.75rem', display: 'inline-flex' }}>
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#38BDF8',
                  boxShadow: '0 0 8px #38BDF8',
                  animation: 'live-pulse 2s ease-in-out infinite',
                }}
              />
              Social Proof &amp; Trust
            </span>
          </motion.div>

          {/* Main heading — split into lines for drama */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 1.0,
              margin: 0,
              fontSize: 'clamp(2.6rem, 6vw, 5rem)',
            }}
          >
            <span style={{ color: 'white', display: 'block' }}>Trusted by People</span>
            <span style={{ color: 'white', display: 'block' }}>Who Build</span>
            <span
              className="serif-italic gradient-text-accent"
              style={{ display: 'block', fontSize: '1.08em' }}
            >
              Great Products.
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
              color: 'hsl(215 16% 62%)',
              lineHeight: 1.7,
              maxWidth: '38ch',
              margin: '1.75rem auto 0',
              fontWeight: 400,
            }}
          >
            Great software isn't remembered because it shipped.
            <br />
            It's remembered because people{' '}
            <span style={{ color: 'hsl(215 16% 80%)' }}>trusted it.</span>
          </motion.p>
        </div>

        {/* ══════════════════════════════════════
            FEATURED TESTIMONIAL
        ══════════════════════════════════════ */}
        <FeaturedTestimonial />

        {/* ══════════════════════════════════════
            THREE SECONDARY CARDS
        ══════════════════════════════════════ */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '1.25rem',
            marginTop: '1.25rem',
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.name} data={t} index={i} />
          ))}
        </div>

        {/* ══════════════════════════════════════
            TRUST INDICATORS
        ══════════════════════════════════════ */}
        <TrustStrip />

        {/* ══════════════════════════════════════
            COLLABORATION TIMELINE + GLOBAL MAP
        ══════════════════════════════════════ */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
            gap: '1.25rem',
            marginTop: '1.25rem',
          }}
        >
          <CollaborationTimeline />
          <GlobalMap />
        </div>

        {/* ══════════════════════════════════════
            CLIENT INDUSTRIES STRIP
        ══════════════════════════════════════ */}
        <IndustriesStrip />

        {/* ══════════════════════════════════════
            BOTTOM QUOTE
        ══════════════════════════════════════ */}
        <BottomQuote />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   FEATURED TESTIMONIAL
───────────────────────────────────────────────────────── */

function FeaturedTestimonial() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'relative',
        background:
          'linear-gradient(145deg, hsl(220 40% 10% / 0.9), hsl(220 40% 7% / 0.7))',
        border: '1px solid hsl(0 0% 100% / 0.09)',
        borderRadius: '1.5rem',
        padding: 'clamp(1.75rem, 4vw, 3rem)',
        backdropFilter: 'blur(24px)',
        overflow: 'hidden',
      }}
      whileHover={{
        borderColor: 'hsl(199 89% 60% / 0.22)',
        boxShadow:
          '0 32px 80px -20px hsl(220 50% 2% / 0.7), 0 0 60px -20px hsl(199 89% 60% / 0.12)',
      }}
    >
      {/* Accent corner glow */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '-60px',
          right: '-60px',
          width: '240px',
          height: '240px',
          background:
            'radial-gradient(circle, hsl(239 84% 60% / 0.12) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      {/* Large opening quote mark */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '1.5rem',
          right: '2rem',
          fontFamily: 'Instrument Serif, serif',
          fontSize: '9rem',
          lineHeight: 1,
          color: 'hsl(0 0% 100% / 0.04)',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        "
      </div>

      {/* Layout: left meta / right quote */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
          gap: '2rem',
          alignItems: 'start',
        }}
      >
        {/* LEFT — identity */}
        <div>
          <Avatar
            src={FEATURED.avatar}
            initials={FEATURED.initials}
            color="#4F46E5"
            size={72}
          />

          <div style={{ marginTop: '1rem' }}>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                fontSize: '1.05rem',
                color: 'white',
                margin: 0,
                letterSpacing: '-0.02em',
              }}
            >
              {FEATURED.name}
            </p>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.82rem',
                color: 'hsl(215 16% 60%)',
                margin: '0.2rem 0 0',
              }}
            >
              {FEATURED.role}
            </p>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.82rem',
                color: '#38BDF8',
                margin: '0.1rem 0 0',
                fontWeight: 500,
              }}
            >
              {FEATURED.company}
            </p>
          </div>

          {/* Meta badges */}
          <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[
              { icon: '▸', label: 'Project', val: FEATURED.project },
              { icon: '◈', label: 'Industry', val: FEATURED.industry },
              { icon: '↑', label: 'Outcome', val: FEATURED.result },
            ].map((m) => (
              <div key={m.label}>
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.58rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'hsl(215 16% 45%)',
                    marginBottom: '0.15rem',
                  }}
                >
                  {m.label}
                </span>
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.78rem',
                    color:
                      m.label === 'Outcome' ? '#34D399' : 'hsl(215 16% 72%)',
                    lineHeight: 1.4,
                  }}
                >
                  {m.val}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — quote */}
        <div>
          <blockquote
            style={{
              margin: 0,
              fontFamily: 'Instrument Serif, serif',
              fontStyle: 'italic',
              fontSize: 'clamp(1.1rem, 2.2vw, 1.4rem)',
              color: 'hsl(0 0% 90%)',
              lineHeight: 1.7,
              letterSpacing: '-0.01em',
            }}
          >
            "{FEATURED.quote}"
          </blockquote>

          <PSR
            problem={FEATURED.problem}
            solution={FEATURED.solution}
            outcome={FEATURED.outcome}
          />
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   SECONDARY TESTIMONIAL CARD
───────────────────────────────────────────────────────── */

function TestimonialCard({
  data,
  index,
}: {
  data: (typeof TESTIMONIALS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.1,
      }}
      className="glass-card-hover"
      style={{ padding: 'clamp(1.25rem, 3vw, 1.75rem)', cursor: 'default' }}
      whileHover={{ y: -6 }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
        <Avatar
          initials={data.initials}
          color={data.avatarColor}
          size={44}
        />
        <div>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '0.9rem',
              color: 'white',
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            {data.name}
          </p>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.74rem',
              color: 'hsl(215 16% 55%)',
              margin: '0.1rem 0 0',
            }}
          >
            {data.role} · {data.company}
          </p>
        </div>
      </div>

      {/* Quote */}
      <blockquote
        style={{
          margin: 0,
          fontFamily: 'Instrument Serif, serif',
          fontStyle: 'italic',
          fontSize: 'clamp(0.9rem, 1.6vw, 1.02rem)',
          color: 'hsl(0 0% 82%)',
          lineHeight: 1.7,
          letterSpacing: '-0.005em',
        }}
      >
        "{data.quote}"
      </blockquote>

      {/* Industry tag */}
      <div style={{ marginTop: '0.9rem' }}>
        <span
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.6rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'hsl(215 16% 40%)',
            fontWeight: 600,
          }}
        >
          {data.industry}
        </span>
      </div>

      <PSR
        problem={data.problem}
        solution={data.solution}
        outcome={data.outcome}
      />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   TRUST STRIP
───────────────────────────────────────────────────────── */

function TrustStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))',
        gap: '1px',
        marginTop: '1.25rem',
        borderRadius: '1.25rem',
        overflow: 'hidden',
        border: '1px solid hsl(0 0% 100% / 0.07)',
      }}
    >
      {STATS.map((s, i) => (
        <div
          key={s.label}
          style={{
            background:
              'linear-gradient(160deg, hsl(220 40% 9% / 0.85), hsl(220 40% 6% / 0.7))',
            padding: '2rem 1.5rem',
            textAlign: 'center',
            borderRight:
              i < STATS.length - 1 ? '1px solid hsl(0 0% 100% / 0.06)' : 'none',
            backdropFilter: 'blur(12px)',
          }}
        >
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(2rem, 4vw, 2.75rem)',
              letterSpacing: '-0.04em',
              margin: 0,
              background: 'linear-gradient(120deg, #FFFFFF 0%, #BAE6FD 40%, #A5B4FC 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            <AnimatedNumber value={s.value} suffix={s.suffix} />
          </p>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.72rem',
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'hsl(215 16% 48%)',
              margin: '0.5rem 0 0',
              whiteSpace: 'pre-line',
              lineHeight: 1.4,
            }}
          >
            {s.label}
          </p>
        </div>
      ))}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   COLLABORATION TIMELINE
───────────────────────────────────────────────────────── */

function CollaborationTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card"
      style={{ padding: 'clamp(1.5rem, 3vw, 2rem)' }}
    >
      {/* Label */}
      <p
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.6rem',
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#38BDF8',
          margin: '0 0 0.35rem',
        }}
      >
        How We Work
      </p>
      <p
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 700,
          fontSize: '1.1rem',
          color: 'white',
          letterSpacing: '-0.02em',
          margin: '0 0 1.5rem',
        }}
      >
        Collaboration Timeline
      </p>

      {/* Steps */}
      <div style={{ position: 'relative' }}>
        {/* Vertical line */}
        <div
          style={{
            position: 'absolute',
            left: '10px',
            top: '16px',
            bottom: '16px',
            width: '1px',
            background:
              'linear-gradient(to bottom, hsl(0 0% 100% / 0.0), hsl(0 0% 100% / 0.1) 20%, hsl(199 89% 60% / 0.3) 50%, hsl(239 84% 60% / 0.2) 80%, hsl(0 0% 100% / 0.0))',
          }}
        />

        {PROCESS_STEPS.map((step, i) => (
          <motion.div
            key={step.label}
            initial={{ opacity: 0, x: -12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.15 + i * 0.08,
            }}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem',
              marginBottom: i < PROCESS_STEPS.length - 1 ? '1.1rem' : 0,
              position: 'relative',
            }}
          >
            {/* Dot */}
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                background: 'hsl(220 40% 8%)',
                border: `1.5px solid ${
                  i === 0
                    ? '#38BDF8'
                    : i === PROCESS_STEPS.length - 1
                    ? '#818CF8'
                    : 'hsl(0 0% 100% / 0.15)'
                }`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                zIndex: 1,
                boxShadow:
                  i === 0
                    ? '0 0 10px hsl(199 89% 60% / 0.4)'
                    : i === PROCESS_STEPS.length - 1
                    ? '0 0 10px hsl(239 84% 60% / 0.35)'
                    : 'none',
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background:
                    i === 0
                      ? '#38BDF8'
                      : i === PROCESS_STEPS.length - 1
                      ? '#818CF8'
                      : 'hsl(0 0% 100% / 0.25)',
                }}
              />
            </div>

            {/* Text */}
            <div style={{ paddingTop: '1px' }}>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  color: 'hsl(0 0% 88%)',
                  margin: 0,
                  letterSpacing: '-0.01em',
                }}
              >
                {step.label}
              </p>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.73rem',
                  color: 'hsl(215 16% 50%)',
                  margin: '0.15rem 0 0',
                }}
              >
                {step.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   GLOBAL MAP
───────────────────────────────────────────────────────── */

function GlobalMap() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className="glass-card"
      style={{ padding: 'clamp(1.5rem, 3vw, 2rem)', minHeight: '280px' }}
    >
      <p
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.6rem',
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#34D399',
          margin: '0 0 0.35rem',
        }}
      >
        Global Reach
      </p>
      <p
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 700,
          fontSize: '1.1rem',
          color: 'white',
          letterSpacing: '-0.02em',
          margin: '0 0 1.25rem',
        }}
      >
        Clients Across 15+ Countries
      </p>

      {/* SVG dot-map */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '2/1' }}>
        <svg
          viewBox="0 0 800 400"
          style={{ width: '100%', height: '100%' }}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Very simplified continent shapes — purely decorative */}
          {/* North America */}
          <path
            d="M 120 80 L 200 60 L 230 90 L 220 150 L 180 190 L 150 180 L 110 150 Z"
            fill="none"
            stroke="hsl(0 0% 100% / 0.08)"
            strokeWidth="1"
          />
          {/* South America */}
          <path
            d="M 165 210 L 210 200 L 220 260 L 200 320 L 170 310 L 155 260 Z"
            fill="none"
            stroke="hsl(0 0% 100% / 0.08)"
            strokeWidth="1"
          />
          {/* Europe */}
          <path
            d="M 370 70 L 430 65 L 450 100 L 420 130 L 380 125 L 360 100 Z"
            fill="none"
            stroke="hsl(0 0% 100% / 0.08)"
            strokeWidth="1"
          />
          {/* Africa */}
          <path
            d="M 380 140 L 440 135 L 460 200 L 440 280 L 400 290 L 370 260 L 360 190 Z"
            fill="none"
            stroke="hsl(0 0% 100% / 0.08)"
            strokeWidth="1"
          />
          {/* Asia */}
          <path
            d="M 460 60 L 650 55 L 680 130 L 620 160 L 540 155 L 480 130 L 450 100 Z"
            fill="none"
            stroke="hsl(0 0% 100% / 0.08)"
            strokeWidth="1"
          />
          {/* Australia */}
          <path
            d="M 610 240 L 690 235 L 710 290 L 680 320 L 620 315 L 600 280 Z"
            fill="none"
            stroke="hsl(0 0% 100% / 0.08)"
            strokeWidth="1"
          />

          {/* Glowing dots */}
          {MAP_DOTS.map((dot, i) => {
            const cx = (parseFloat(dot.x) / 100) * 800;
            const cy = (parseFloat(dot.y) / 100) * 400;
            return (
              <g key={dot.label}>
                {/* Outer pulse ring */}
                <motion.circle
                  cx={cx}
                  cy={cy}
                  r={12}
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth="0.5"
                  initial={{ opacity: 0.6, scale: 0.6 }}
                  animate={{ opacity: 0, scale: 1.8 }}
                  transition={{
                    duration: 2.4,
                    ease: 'easeOut',
                    delay: i * 0.28,
                    repeat: Infinity,
                    repeatDelay: 1.2,
                  }}
                  style={{ transformOrigin: `${cx}px ${cy}px` }}
                />
                {/* Inner dot */}
                <motion.circle
                  cx={cx}
                  cy={cy}
                  r={3.5}
                  fill="#38BDF8"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    duration: 0.4,
                    delay: 0.3 + i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    filter: 'drop-shadow(0 0 4px #38BDF8)',
                    transformOrigin: `${cx}px ${cy}px`,
                  }}
                />
                {/* Label */}
                <motion.text
                  x={cx}
                  y={cy - 9}
                  textAnchor="middle"
                  fill="hsl(215 16% 55%)"
                  fontSize="7"
                  fontFamily="Inter, sans-serif"
                  fontWeight="500"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                >
                  {dot.label}
                </motion.text>
              </g>
            );
          })}
        </svg>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   INDUSTRIES STRIP
───────────────────────────────────────────────────────── */

const INDUSTRIES = [
  { icon: '◈', label: 'Healthcare AI' },
  { icon: '◈', label: 'FinTech' },
  { icon: '◈', label: 'Legal Intelligence' },
  { icon: '◈', label: 'Retail Technology' },
  { icon: '◈', label: 'Education' },
  { icon: '◈', label: 'Enterprise SaaS' },
];

function IndustriesStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{ marginTop: '1.25rem', textAlign: 'center' }}
    >
      <p
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.6rem',
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'hsl(215 16% 38%)',
          margin: '0 0 1rem',
        }}
      >
        Industries Served
      </p>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '0.6rem',
        }}
      >
        {INDUSTRIES.map((ind) => (
          <span key={ind.label} className="pill">
            <span style={{ color: '#38BDF8', fontSize: '0.55rem' }}>◈</span>
            {ind.label}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   BOTTOM QUOTE
───────────────────────────────────────────────────────── */

function BottomQuote() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        textAlign: 'center',
        marginTop: 'clamp(4rem, 8vw, 7rem)',
        paddingTop: '2rem',
        borderTop: '1px solid hsl(0 0% 100% / 0.06)',
      }}
    >
      <p
        style={{
          fontFamily: 'Instrument Serif, serif',
          fontStyle: 'italic',
          fontSize: 'clamp(1.8rem, 4vw, 3rem)',
          lineHeight: 1.25,
          letterSpacing: '-0.025em',
          margin: 0,
          background: 'linear-gradient(120deg, #FFFFFF 0%, #BAE6FD 45%, #A5B4FC 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        Trust is earned
        <br />
        <span style={{ color: 'hsl(215 16% 55%)', WebkitTextFillColor: 'hsl(215 16% 55%)' }}>
          through consistency.
        </span>
      </p>
    </motion.div>
  );
}