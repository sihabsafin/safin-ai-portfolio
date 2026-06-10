import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const navLinks = [
  { href: "#about",      label: "Story",        sub: "Who I Am"     },
  { href: "#expertise",  label: "Capabilities", sub: "What I Do"    },
  { href: "#skills",     label: "Architecture", sub: "How I Build"  },
  { href: "#projects",   label: "Case Studies", sub: "Real Systems" },
  { href: "#experience", label: "Journey",      sub: "My Growth"    },
];

// ─── Neural Node ──────────────────────────────────────────────────────────────

const NeuralNode = ({ size = 34 }: { size?: number }) => {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 1400);
    }, 6500);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      className="relative flex items-center justify-center shrink-0"
      style={{ width: size, height: size }}
      whileHover="hover"
      animate={pulse ? "pulse" : "idle"}
    >
      {/* Ambient glow behind icon */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(56,189,248,0.18) 0%, transparent 70%)" }}
        variants={{ idle: { opacity: 0.6 }, hover: { opacity: 1 }, pulse: { opacity: [0.6, 1, 0.6] } }}
        transition={{ duration: 1.2 }}
      />

      <svg width={size} height={size} viewBox="0 0 34 34" fill="none" aria-hidden="true">
        {/* Lines */}
        {[
          { x1: 11, y1: 24, x2: 17, y2: 10, delay: 0 },
          { x1: 23, y1: 24, x2: 17, y2: 10, delay: 0.1 },
          { x1: 11, y1: 24, x2: 23, y2: 24, delay: 0.2 },
        ].map((l, i) => (
          <motion.line
            key={i}
            x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke="url(#lg)" strokeWidth="1.2" strokeLinecap="round"
            variants={{
              idle:  { opacity: 0.3 },
              hover: { opacity: 0.85 },
              pulse: { opacity: [0.3, 1, 0.3] },
            }}
            transition={{ duration: 1.2, delay: l.delay }}
          />
        ))}

        {/* Nodes */}
        <motion.circle cx="17" cy="10" r="3"
          fill="url(#ng)"
          variants={{ idle: { r: 3 }, hover: { r: 3.6 }, pulse: { r: [3, 3.8, 3] } }}
          transition={{ duration: 1.2 }}
        />
        <motion.circle cx="11" cy="24" r="2.2"
          fill="url(#ng)"
          variants={{ idle: { r: 2.2 }, hover: { r: 2.8 }, pulse: { r: [2.2, 3, 2.2] } }}
          transition={{ duration: 1.2, delay: 0.13 }}
        />
        <motion.circle cx="23" cy="24" r="2.2"
          fill="url(#ng)"
          variants={{ idle: { r: 2.2 }, hover: { r: 2.8 }, pulse: { r: [2.2, 3, 2.2] } }}
          transition={{ duration: 1.2, delay: 0.26 }}
        />

        {/* Top node outer ring */}
        <motion.circle cx="17" cy="10" r="5.5"
          stroke="#38BDF8" strokeWidth="0.6" fill="none"
          variants={{ idle: { opacity: 0 }, hover: { opacity: 0.35 }, pulse: { opacity: [0, 0.5, 0] } }}
          transition={{ duration: 1.2 }}
        />

        <defs>
          <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#818CF8" />
          </linearGradient>
          <radialGradient id="ng" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#BAE6FD" />
            <stop offset="100%" stopColor="#6366F1" />
          </radialGradient>
        </defs>
      </svg>
    </motion.div>
  );
};

// ─── Status Badge ─────────────────────────────────────────────────────────────

const StatusBadge = ({ scrolled }: { scrolled: boolean }) => (
  <motion.div
    animate={{ opacity: scrolled ? 0 : 1, scale: scrolled ? 0.92 : 1, pointerEvents: scrolled ? "none" : "auto" }}
    transition={{ duration: 0.35 }}
    className="hidden xl:flex items-center gap-2 pl-2 pr-3.5 py-1.5 rounded-full select-none
      bg-gradient-to-r from-emerald-950/60 to-teal-950/40
      border border-emerald-500/25
      shadow-[0_0_12px_rgba(16,185,129,0.12),inset_0_1px_0_rgba(52,211,153,0.08)]"
  >
    <span className="relative flex items-center justify-center w-4 h-4">
      <motion.span
        className="absolute w-3 h-3 rounded-full bg-emerald-400/25"
        animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
      />
      <span className="relative w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,1)]" />
    </span>
    <span className="text-[11px] font-semibold text-emerald-300 whitespace-nowrap tracking-wide">
      Available
    </span>
    <span className="w-px h-3 bg-emerald-500/30" />
    <span className="text-[10px] font-medium text-emerald-400/70 whitespace-nowrap">
      2 AI Projects · Q3 2026
    </span>
  </motion.div>
);

// ─── CTA Button ───────────────────────────────────────────────────────────────

const CTAButton = ({ full }: { full?: boolean }) => {
  const [shine, setShine] = useState(false);
  const [hovered, setHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setShine(true);
      setTimeout(() => setShine(false), 750);
    }, 8000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.a
      ref={ref}
      href="#contact"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (r) { mouseX.set(e.clientX - r.left); mouseY.set(e.clientY - r.top); }
      }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className={`relative overflow-hidden inline-flex items-center gap-2 font-semibold rounded-full
        text-white border border-indigo-400/30
        bg-[linear-gradient(135deg,#1D4ED8_0%,#4F46E5_50%,#7C3AED_100%)]
        shadow-[0_0_0_1px_rgba(99,102,241,0.2),0_4px_24px_rgba(79,70,229,0.45),inset_0_1px_0_rgba(255,255,255,0.15)]
        hover:shadow-[0_0_0_1px_rgba(99,102,241,0.35),0_4px_32px_rgba(79,70,229,0.65),inset_0_1px_0_rgba(255,255,255,0.2)]
        transition-shadow duration-300
        ${full ? "w-full justify-center text-[14px] px-5 py-3" : "text-[12.5px] px-4 py-2"}`}
      aria-label="Start a Project"
    >
      {/* cursor spotlight */}
      <motion.span
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle 50px at ${mouseX.get()}px ${mouseY.get()}px, rgba(255,255,255,0.13), transparent)`,
        }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />

      {/* shine sweep */}
      <AnimatePresence>
        {shine && (
          <motion.span
            key="sh"
            className="absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12"
            initial={{ left: "-4rem" }}
            animate={{ left: "120%" }}
            exit={{}}
            transition={{ duration: 0.65, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>

      {/* top gloss */}
      <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

      <Sparkles className="relative z-10 w-3.5 h-3.5 opacity-80" />
      <span className="relative z-10">Start a Project</span>
      <motion.span
        className="relative z-10"
        animate={{ x: hovered ? 3 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 25 }}
      >
        <ArrowRight className="w-3.5 h-3.5" />
      </motion.span>
    </motion.a>
  );
};

// ─── Scroll Progress ──────────────────────────────────────────────────────────

const ScrollProgress = () => {
  const [p, setP] = useState(0);
  useEffect(() => {
    const fn = () => {
      const d = document.documentElement;
      setP(d.scrollHeight - d.clientHeight > 0 ? d.scrollTop / (d.scrollHeight - d.clientHeight) : 0);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[100] pointer-events-none">
      <motion.div
        className="h-full bg-[linear-gradient(90deg,#38BDF8,#6366F1,#A78BFA,#06B6D4)]"
        style={{ scaleX: p, transformOrigin: "0 50%" }}
      />
      {/* glow under bar */}
      <motion.div
        className="h-[6px] -mt-[2px] bg-[linear-gradient(90deg,#38BDF8,#6366F1,#06B6D4)] blur-sm opacity-60"
        style={{ scaleX: p, transformOrigin: "0 50%" }}
      />
    </div>
  );
};

// ─── Nav Item ─────────────────────────────────────────────────────────────────

const NavItem = ({ link, isActive }: { link: typeof navLinks[0]; isActive: boolean }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={link.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative px-4 py-2.5 rounded-xl text-[13px] font-medium transition-colors duration-200
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:rounded-xl
        group"
      aria-current={isActive ? "page" : undefined}
    >
      {/* Active pill */}
      {isActive && (
        <motion.span
          layoutId="active-pill"
          className="absolute inset-0 rounded-xl
            bg-gradient-to-b from-sky-500/15 to-indigo-500/10
            border border-sky-400/35
            shadow-[0_0_14px_rgba(56,189,248,0.15),inset_0_1px_0_rgba(255,255,255,0.1)]"
          transition={{ type: "spring", stiffness: 420, damping: 32 }}
        />
      )}

      {/* Hover capsule */}
      <AnimatePresence>
        {hovered && !isActive && (
          <motion.span
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.88 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-0 rounded-xl bg-white/[0.05] border border-white/[0.1]"
          />
        )}
      </AnimatePresence>

      {/* Label */}
      <span className={`relative z-10 block transition-colors duration-200 ${
        isActive ? "text-sky-300" : "text-slate-400 group-hover:text-slate-200"
      }`}>
        {link.label}
      </span>

      {/* Sub-label tooltip on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, y: 4, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.9 }}
            transition={{ duration: 0.18 }}
            className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+6px)] px-2 py-0.5 rounded-md
              text-[9.5px] font-medium text-sky-400/80 whitespace-nowrap
              bg-[#0B1120]/90 border border-sky-500/20
              shadow-[0_4px_12px_rgba(0,0,0,0.4)]
              pointer-events-none z-20"
          >
            {link.sub}
          </motion.span>
        )}
      </AnimatePresence>
    </a>
  );
};

// ─── Divider ──────────────────────────────────────────────────────────────────

const VDivider = () => (
  <div className="hidden lg:block w-px h-5 bg-gradient-to-b from-transparent via-white/10 to-transparent mx-1 shrink-0" />
);

// ─── Mobile Panel ─────────────────────────────────────────────────────────────

const MobilePanel = ({ open, onClose }: { open: boolean; onClose: () => void }) => (
  <AnimatePresence>
    {open && (
      <>
        <motion.div
          key="bd"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md"
          onClick={onClose}
        />
        <motion.aside
          key="pn"
          initial={{ x: "100%", opacity: 0.5 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0.5 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-0 right-0 bottom-0 z-50 w-[min(340px,92vw)] flex flex-col
            bg-[#070B17] border-l border-sky-500/15 backdrop-blur-3xl
            shadow-[-24px_0_80px_rgba(0,0,0,0.7),inset_1px_0_0_rgba(56,189,248,0.06)]"
          aria-label="Mobile menu"
        >
          {/* Top gradient bar */}
          <div className="h-[2px] bg-[linear-gradient(90deg,transparent,#38BDF8,#6366F1,transparent)]" />

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
            <div className="flex items-center gap-3">
              <NeuralNode size={30} />
              <div>
                <p className="text-[15px] font-bold tracking-tight text-white">Safin</p>
                <p className="text-[10px] text-sky-400/70 font-medium mt-0.5">Generative AI Engineer</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/10
                flex items-center justify-center text-slate-400 hover:text-white transition-colors"
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Status row */}
          <div className="flex items-center gap-2 mx-6 mt-4 px-3 py-2 rounded-xl
            bg-emerald-950/40 border border-emerald-500/20">
            <span className="relative flex w-4 h-4 items-center justify-center">
              <motion.span className="absolute w-3 h-3 rounded-full bg-emerald-400/20"
                animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2.2, repeat: Infinity }} />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
            </span>
            <span className="text-[11px] font-semibold text-emerald-300">Available</span>
            <span className="text-[10px] text-emerald-400/60 ml-0.5">· 2 AI Projects · Q3 2026</span>
          </div>

          {/* Links */}
          <nav className="flex-1 px-4 py-5 space-y-1 overflow-y-auto">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={onClose}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.065 + 0.08, type: "spring", stiffness: 300, damping: 28 }}
                className="flex items-center justify-between px-4 py-3.5 rounded-2xl
                  text-slate-300 hover:text-white
                  hover:bg-gradient-to-r hover:from-sky-500/[0.08] hover:to-indigo-500/[0.06]
                  hover:border hover:border-sky-500/15
                  border border-transparent
                  transition-all duration-200 group"
              >
                <div>
                  <p className="text-[14px] font-semibold">{link.label}</p>
                  <p className="text-[11px] text-sky-400/55 mt-0.5 font-medium">{link.sub}</p>
                </div>
                <motion.div
                  className="w-6 h-6 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center
                    text-slate-500 group-hover:text-sky-400 group-hover:border-sky-500/30 group-hover:bg-sky-500/10 transition-all"
                >
                  <ArrowRight className="w-3 h-3" />
                </motion.div>
              </motion.a>
            ))}
          </nav>

          {/* CTA */}
          <div className="px-5 pb-8 pt-2">
            <CTAButton full />
          </div>
        </motion.aside>
      </>
    )}
  </AnimatePresence>
);

// ─── Main Export ──────────────────────────────────────────────────────────────

export const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 30);
      const y = window.scrollY + 140;
      let cur = "";
      navLinks.forEach((l) => {
        const el = document.querySelector(l.href) as HTMLElement | null;
        if (el && el.offsetTop <= y) cur = l.href;
      });
      setActive(cur);
    };
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <ScrollProgress />

      <motion.header
        initial={{ y: -28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
        role="banner"
      >
        <motion.nav
          animate={{ marginTop: scrolled ? 8 : 16 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto w-[min(1400px,calc(100%-2rem))]"
          aria-label="Primary navigation"
        >
          <motion.div
            animate={{
              paddingTop:    scrolled ? "7px"  : "11px",
              paddingBottom: scrolled ? "7px"  : "11px",
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`relative flex items-center justify-between gap-3 px-3 rounded-2xl transition-all duration-500
              ${scrolled
                ? "bg-[#080E1C]/90 border border-sky-400/20 backdrop-blur-[40px] shadow-[0_0_0_1px_rgba(56,189,248,0.07),0_0_40px_rgba(56,189,248,0.06),0_16px_48px_-8px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(0,0,0,0.3)]"
                : "bg-[#080E1C]/80 border border-sky-400/[0.18] backdrop-blur-[28px] shadow-[0_0_0_1px_rgba(56,189,248,0.08),0_0_30px_rgba(56,189,248,0.07),0_8px_32px_-8px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.07),inset_0_-1px_0_rgba(0,0,0,0.2)]"
              }`}
          >
            {/* Top edge highlight */}
            <span className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/30 to-transparent pointer-events-none" />

            {/* ── Logo ── */}
            <a
              href="#"
              className="flex items-center gap-2.5 shrink-0 pl-1 pr-2
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-xl
                group"
              aria-label="Safin – home"
            >
              <NeuralNode />
              <motion.div animate={{ opacity: scrolled ? 0.9 : 1 }} transition={{ duration: 0.4 }}>
                <p className="text-[15px] font-bold tracking-tight text-white leading-none group-hover:text-sky-100 transition-colors">
                  Safin
                </p>
                <p className="text-[9.5px] font-medium mt-[3px] leading-none
                  bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
                  Generative AI Engineer
                </p>
              </motion.div>
            </a>

            <VDivider />

            {/* ── Status ── */}
            <StatusBadge scrolled={scrolled} />

            {/* ── Desktop Links ── */}
            <div className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
              {navLinks.map((link) => (
                <NavItem key={link.href} link={link} isActive={active === link.href} />
              ))}
            </div>

            <VDivider />

            {/* ── CTA + Hamburger ── */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="hidden sm:block">
                <CTAButton />
              </div>
              <button
                onClick={() => setOpen(true)}
                className="md:hidden w-9 h-9 rounded-xl
                  bg-gradient-to-b from-white/[0.08] to-white/[0.04]
                  border border-white/[0.14]
                  flex items-center justify-center text-slate-300 hover:text-white
                  shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]
                  transition-all hover:border-sky-400/30 hover:bg-sky-500/10"
                aria-label="Open menu"
                aria-expanded={open}
                aria-controls="mobile-nav"
              >
                <Menu className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </motion.nav>
      </motion.header>

      <div id="mobile-nav">
        <MobilePanel open={open} onClose={() => setOpen(false)} />
      </div>
    </>
  );
};