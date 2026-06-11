<div align="center">

<br />

# safin-ai-portfolio

### Source repository for my professional engineering portfolio

**Building production AI systems that handle real workloads — not demos.**

<br />

[![Portfolio](https://img.shields.io/badge/Portfolio-sihabsafin.dev-00C896?style=flat-square&logo=vercel&logoColor=white)](https://your-domain.com)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-EF4D9B?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-6B7280?style=flat-square)](LICENSE)

<br />

</div>

---

<br />

## The Site

<div align="center">

**[sihabsafin.dev](https://your-domain.com)** &nbsp;&nbsp;·&nbsp;&nbsp; **[github.com/sihabsafin](https://github.com/sihabsafin)** &nbsp;&nbsp;·&nbsp;&nbsp; **[linkedin.com/in/sihabsafin](https://linkedin.com/in/sihabsafin)**

</div>

<br />

---

<br />

## What This Repository Is

This is not a portfolio built to look impressive. It is a portfolio built to be understood.

Most engineering portfolios optimize for surface area — as many projects listed as possible, as many technology logos as will fit. This one optimizes for depth. Every section is written for a technical evaluator who will spend real time reading it: an engineering manager assessing whether I can architect systems at scale, a CTO deciding whether my judgment on AI tradeoffs is trustworthy, or a client determining whether I understand their problem well enough to solve it.

The work documented here spans autonomous multi-agent AI systems, production RAG pipelines with hybrid retrieval, QLoRA-based fine-tuning for low-resource language translation, and full-stack applications with real deployment constraints. None of it is toy code. All of it started as a genuine problem that needed solving.

The frontend itself is built the same way I build AI systems: with explicit architectural decisions, documented tradeoffs, and zero tolerance for components that exist to fill space.

<br />

---

<br />

## Featured Projects

These are the systems documented in depth on the portfolio. Each one has a full case study covering problem statement, architectural decisions, implementation details, and what broke before it worked.

<br />

### AutoSec — Multi-Agent Cybersecurity Intelligence System

A production-grade threat detection and analysis platform built on a hierarchical multi-agent architecture. The system continuously monitors for CVEs via the NIST NVD API, triages findings through specialized analyst agents, and surfaces actionable remediation reports with severity scoring.

**Architecture:** CrewAI hierarchical crew with four specialized agents — a Threat Intelligence Analyst, a Vulnerability Assessor, a Remediation Strategist, and an Orchestration Manager. Agents operate asynchronously, passing structured JSON context between roles. The LLM backbone uses Groq-hosted LLaMA 3.3 70B for high-throughput inference and Gemini 2.0 Flash for summarization tasks where latency matters less than coherence.

**Why hierarchical over sequential:** Sequential CrewAI pipelines bottleneck at each handoff. For cybersecurity workflows where an assessor may need to query the intelligence layer mid-task, hierarchical orchestration with a manager agent enables dynamic delegation. The tradeoff is increased token overhead from manager coordination — acceptable given the improvement in task flexibility.

**Storage:** Supabase for persistent threat records, audit logs, and cross-session state. Streamlit for the operational dashboard.

**Stack:** Python · CrewAI · Groq (LLaMA 3.3 70B) · Gemini 2.0 Flash · NIST NVD API · Supabase · Streamlit

<br />

### RecruitIQ — Autonomous Hiring Pipeline

An end-to-end recruitment automation system that handles candidate sourcing logic, resume screening, interview question generation, and hiring recommendation synthesis — without human intervention at each stage.

**Architecture:** Multi-agent pipeline with role-specific agents: a Job Analyst that parses requirements into structured criteria, a Candidate Evaluator that scores resumes against those criteria using semantic matching rather than keyword overlap, an Interview Architect that generates role-specific question sets calibrated to the candidate's background, and a Hiring Advisor that synthesizes a structured recommendation with confidence scores.

**The semantic scoring decision:** Early iterations used keyword extraction for resume evaluation. Recruiters know this fails — a candidate who writes "reduced infrastructure spend by 40%" matches differently than one who writes "cut AWS costs by two-fifths" despite describing the same achievement. Replacing keyword matching with embedding-based semantic scoring against structured job criteria cut false negatives substantially in internal testing.

**Stack:** Python · CrewAI · Groq (LLaMA 3.3 70B) · Gemini 2.0 Flash · Supabase · Streamlit

<br />

### ClinicalCrew — Multi-Agent Clinical Decision Support

The most architecturally complex system in this portfolio. A four-phase, eleven-agent clinical decision support platform designed to assist medical professionals with differential diagnosis, treatment protocol evaluation, drug interaction screening, and discharge planning.

**Architecture overview:**
- Phase 1 — Patient Intake: structured history extraction, symptom normalization, and risk stratification
- Phase 2 — Diagnostic Reasoning: differential generation, evidence-based narrowing, confidence scoring
- Phase 3 — Treatment Planning: protocol retrieval, contraindication checking, interaction screening
- Phase 4 — Documentation: discharge summary generation, follow-up scheduling logic, handoff notes

**Why eleven agents:** The scope of clinical reasoning cannot be collapsed into a single model call without unacceptable hallucination risk. Decomposing the workflow into discrete, bounded agents means each agent has a narrow, verifiable job. A drug interaction checker that only checks drug interactions is far more reliable than a generalist agent asked to do everything. The tradeoff is coordination overhead — managed through a hierarchical orchestration layer that maintains shared state across phases.

**Responsible AI note:** This system is a clinical decision *support* tool, not a replacement for clinical judgment. All outputs are framed as structured inputs for a human professional, not terminal recommendations.

**Stack:** Python · CrewAI · Groq · Gemini 2.0 Flash · Supabase · Streamlit

<br />

### INVESTIQ-AI — Multi-Agent Investment Intelligence Dashboard

A financial analysis platform that aggregates market data, runs multi-source sentiment analysis, evaluates technical indicators, and synthesizes investment theses across user-defined asset watchlists.

**Architecture:** Parallel agent execution for data ingestion (market data, news, filings), sequential execution for analysis and synthesis. Parallelism in ingestion reduces latency from sequential API calls; sequential synthesis ensures the final recommendation draws on all available inputs before committing to an output.

**Stack:** Python · CrewAI · Groq · Gemini 2.0 Flash · Financial APIs · Supabase · Streamlit

<br />

### DocMind Hybrid — Enterprise Financial Document Intelligence

A production RAG system built for financial document analysis. The key architectural decision here was hybrid retrieval: BM25 sparse retrieval combined with semantic dense retrieval, fused via Reciprocal Rank Fusion (RRF).

**Why hybrid over pure vector retrieval:** Pure semantic search fails on financial documents in predictable ways. A query for "EBITDA margin Q3 FY2023" needs exact term matching, not semantic neighborhood search — semantic search will surface documents about profitability in general rather than the specific figure requested. BM25 handles exact financial terminology and numerical queries well; dense retrieval handles conceptual questions like "what are the primary risk factors for this portfolio." RRF fusion gets both. The tradeoff is higher indexing complexity and slightly increased query latency, both of which are acceptable for a financial analysis context where answer precision matters more than sub-100ms response times.

**Stack:** Python · LangChain · FAISS · BM25 (rank-bm25) · NVIDIA API Catalog · Streamlit

<br />

### InterviewIQ — AI Mock Interview Coach

A real-time voice-based interview coaching system with live transcription, dynamic follow-up question generation, and post-session feedback synthesis.

**Architecture:** LiveKit for real-time audio transport, Deepgram for streaming STT, ElevenLabs for TTS response synthesis, GPT-4o for conversational reasoning and question generation, Supabase for session persistence and feedback history. The frontend is Next.js.

**The latency constraint:** Voice applications have a hard UX ceiling on response latency — anything beyond roughly 1.5 seconds of silence feels broken. This forced specific architectural choices: Deepgram's streaming model over batch transcription, ElevenLabs' streaming synthesis endpoint over their standard API, and aggressive context truncation to keep GPT-4o prompts within a window that returns in time. The session history is stored and summarized rather than passed verbatim to keep token count manageable without losing continuity.

**Stack:** Next.js · TypeScript · LiveKit · Deepgram STT · ElevenLabs TTS · GPT-4o · Supabase

<br />

### Chittagonian Dialect Machine Translation — BSc Thesis

A comparative study of QLoRA fine-tuning across three instruction-tuned language models (Qwen2.5-3B, Gemma-2B-IT, and LLaMA-3.2-3B) for Bengali-to-Chittagonian dialect translation — a genuinely low-resource NLP problem with essentially no existing parallel corpora.

**The research problem:** Chittagonian (Chatgaiya) is spoken by roughly 13 million people in the Chittagong region of Bangladesh. It is mutually unintelligible with standard Bengali despite surface similarity, with distinct phonology, vocabulary, and grammatical constructions. Existing MT systems treat it as a Bengali dialect and produce unusable output. Building a parallel corpus from scratch was a prerequisite for any supervised approach.

**Why QLoRA:** Full fine-tuning on 3B-parameter models was cost-prohibitive given compute constraints. QLoRA (4-bit quantization + LoRA adapters) enabled fine-tuning on a single GPU while retaining enough model capacity for meaningful translation quality. The comparative study across three base models isolates the effect of pre-training corpus composition on low-resource translation performance — Qwen2.5-3B's multilingual pre-training makes it a different baseline than Gemma-2B-IT or LLaMA-3.2-3B.

**Stack:** Python · Hugging Face Transformers · PEFT · bitsandbytes · QLoRA · Weights & Biases

<br />

---

<br />

## Technical Capabilities

This section exists for recruiters and hiring managers who want a quick map of where my depth is. For each capability, I've listed what "depth" means concretely — not just that I know the term.

<br />

### LLM Fine-Tuning & Adaptation

- **QLoRA / PEFT**: implemented and validated on the Chittagonian translation task; understand rank selection, alpha tuning, target module selection, and quantization tradeoffs
- **Instruction tuning**: constructed instruction-response datasets from scratch for low-resource language pairs
- **Evaluation**: BLEU, chrF, human evaluation protocols; understand why BLEU misleads on morphologically rich languages

<br />

### Multi-Agent AI Systems

- **CrewAI**: hierarchical and sequential crew architectures, custom tool integration, agent role design, inter-agent context passing, JSON schema validation for structured outputs
- **Orchestration patterns**: when to use hierarchical vs sequential vs parallel execution; manager agent design; shared state management across phases
- **Reliability engineering**: retry logic, fallback agents, output validation, graceful degradation when upstream agents return malformed context

<br />

### Retrieval-Augmented Generation

- **Hybrid retrieval**: BM25 + dense vector search + RRF fusion; implemented in DocMind for financial document analysis
- **Vector databases**: FAISS (local), Supabase pgvector (hosted); chunking strategies, embedding model selection, index tuning
- **Context management**: query decomposition, re-ranking, context window budgeting; aggressive truncation strategies for latency-constrained applications

<br />

### Full-Stack AI Application Development

- **Frontend**: React 18, TypeScript, Next.js, Tailwind CSS, Framer Motion, shadcn/ui
- **Backend**: FastAPI, NestJS, Prisma, PostgreSQL, Supabase
- **APIs**: REST, streaming endpoints, webhook handlers, real-time via LiveKit
- **Deployment**: Vercel, Hostinger, Supabase hosted; environment management, CI/CD basics

<br />

### Voice AI Systems

- **STT**: Deepgram streaming transcription, latency optimization, word-boundary handling
- **TTS**: ElevenLabs streaming synthesis, voice selection, latency vs quality tradeoffs
- **Real-time transport**: LiveKit session management, audio pipeline architecture

<br />

---

<br />

## Portfolio Website — Technical Details

<br />

### Stack

| Layer | Technology | Rationale |
|---|---|---|
| Language | TypeScript 5 | Type safety across the entire component tree; eliminates a class of runtime errors that hurt production deployments |
| Framework | React 18 | Concurrent rendering, Suspense for lazy-loaded sections, ecosystem depth for component needs |
| Build Tool | Vite 5 | Sub-second HMR during development; significantly faster cold starts than CRA or webpack-based setups |
| Styling | Tailwind CSS 3 | Constraint-based design system; forces consistent spacing, typography, and color usage; zero runtime CSS |
| Components | shadcn/ui | Unstyled, accessible primitives that I own and can extend — not a dependency that ships its own opinions about visual design |
| Animation | Framer Motion 11 | Declarative animation API; orchestration via `AnimatePresence` and `variants`; respects `prefers-reduced-motion` |
| Icons | Lucide React | Consistent stroke weight, tree-shakeable, no icon font overhead |
| Deployment | Vercel | Edge network, automatic preview deployments per branch, zero-config for Vite projects |

<br />

### Project Structure

```
safin-ai-portfolio/
├── public/
│   ├── favicon.ico
│   ├── og-image.png                  # Open Graph preview image
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Navigation.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── CurrentlyBuilding.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Expertise.tsx
│   │   │   ├── TechStack.tsx
│   │   │   ├── Architecture.tsx
│   │   │   ├── CaseStudies.tsx
│   │   │   ├── EngineeringDecisions.tsx
│   │   │   ├── Research.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── CareerJourney.tsx
│   │   │   └── Contact.tsx
│   │   └── ui/
│   │       ├── Badge.tsx
│   │       ├── Card.tsx
│   │       ├── AnimatedSection.tsx
│   │       └── TechBadge.tsx
│   ├── hooks/
│   │   ├── useIntersectionObserver.ts
│   │   └── useReducedMotion.ts
│   ├── lib/
│   │   ├── utils.ts
│   │   └── constants.ts
│   ├── assets/
│   │   └── images/
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── tailwind.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── package.json
└── README.md
```

<br />

### Getting Started

```bash
# Clone
git clone https://github.com/sihabsafin/safin-ai-portfolio.git
cd safin-ai-portfolio

# Install dependencies
npm install

# Start the development server (http://localhost:5173)
npm run dev

# Type check
npm run type-check

# Build for production
npm run build

# Preview the production build locally
npm run preview
```

Requires **Node.js 18.x or later**. The project has no environment variables required for local development.

<br />

### Performance Targets

| Metric | Target | Approach |
|---|---|---|
| Lighthouse Performance | ≥ 95 | Vite code splitting per route; lazy-loaded sections below the fold |
| Lighthouse Accessibility | ≥ 95 | ARIA labels, keyboard focus management, semantic HTML throughout |
| Lighthouse SEO | ≥ 95 | Structured metadata, Open Graph, canonical URLs |
| First Contentful Paint | < 1.2s | Critical CSS inlined; above-the-fold assets prioritized |
| Total Bundle Size | < 200kb gzip | Tree-shaking, dynamic imports, no icon fonts |

<br />

---

<br />

## Website Sections — Detailed Reference

<br />

**Hero**
A direct statement of what I build and the problems it solves. No stock photography, no abstract background animations, no taglines that could belong to anyone. The hero opens with a specific claim about what my work produces, not a vague description of who I am.

**Currently Building**
A manually maintained snapshot of what is actively in progress — systems under development, research questions being explored, infrastructure being built. Deliberately not automated from GitHub activity, because commit frequency is a terrible proxy for meaningful work.

**About**
Engineering background, academic trajectory (BSc Computer Science & Engineering, BGC Trust University Bangladesh, graduating June 2026), and the path from full-stack web development into production AI systems. Written to give technical evaluators context, not to fill space.

**Core Expertise**
Specific technical capabilities with enough detail to be verifiable. Not a tag cloud. Each capability is described in terms of what I can actually build with it, not just that I've encountered it.

**Tech Stack**
A structured map of the tools I use in production, organized by function: LLM inference, orchestration, retrieval, frontend, backend, deployment, and monitoring. Includes honest notes on where I prefer one tool over another and why.

**AI Production Architecture**
Visual system diagrams of how the key projects are architected. Agent roles, data flow, retrieval strategies, orchestration logic. Built with the same care as production architecture diagrams — clear enough that an engineer could implement from them.

**Enterprise Case Studies**
Full write-ups of the six major projects: AutoSec, RecruitIQ, ClinicalCrew, INVESTIQ-AI, DocMind Hybrid, and InterviewIQ. Each covers problem statement, architectural decisions with stated rationale, implementation details, what failed before the working approach, and what I'd change with hindsight.

**Engineering Decisions**
A section dedicated to tradeoffs documented explicitly. Why hierarchical over sequential for AutoSec. Why hybrid retrieval for DocMind. Why QLoRA over full fine-tuning for the thesis. Why streaming STT over batch for InterviewIQ. The reasoning behind decisions is as important as the decisions themselves — it's what separates an engineer from someone who followed a tutorial.

**Open Source & Research**
Active GitHub repositories with honest descriptions. The Chittagonian dialect MT thesis — context on the research problem, methodology, and what the comparative study found. Academic work treated as engineering work: reproducible, documented, with stated limitations.

**Testimonials**
Feedback from actual clients and collaborators. Real names, real project context, real specifics — not generic praise.

**Career Journey**
A visual timeline from freelance web development through full-stack engineering, into AI systems research and production GenAI work. Includes the target: MSc in Computer Science / Artificial Intelligence in Italy, 2027 intake.

**Contact**
Direct reach. GitHub, LinkedIn, email. No multi-step contact form.

<br />

---

<br />

## Design Rationale

Every visual decision in this portfolio has a reason. This section explains the main ones, because the thinking behind design choices is part of the engineering story.

**Dark theme:** Not a stylistic preference. Dark backgrounds reduce visual noise around code blocks, terminal outputs, architecture diagrams, and dense technical content — which is the majority of what this site presents. The palette uses a near-black base (`#0A0A0F`) with two accent colors: a cold blue for interactive elements and a muted green for status indicators. Nothing else.

**Typography:** Display headings use a weighted geometric sans-serif with tight letter-spacing. Body text uses a neutral, high-legibility face at a reading size that doesn't require zooming on mobile. Code and data use a monospace face with clear number differentiation. The hierarchy is immediately readable without requiring the reader to scan for structure.

**Glassmorphism used twice:** One instance on the navigation bar as it scrolls over content. One instance on the featured project cards where depth context matters. Nowhere else. Glassmorphism as decoration is visual noise; glassmorphism as a depth cue is functional.

**Animation strategy:** A single orchestrated entrance sequence on initial load — staggered section reveals that communicate structure without demanding attention. Hover micro-interactions on interactive elements. No ambient motion, no scroll-triggered parallax, no cursor effects. Every animation removed something more distracting than what was added.

**Section spacing:** Generous vertical padding between sections signals that each section is a discrete unit with its own scope. This is not decoration — it affects how a reader mentally organizes the content. Tight spacing makes a page feel like one continuous document; deliberate spacing makes it feel like a structured argument.

<br />

---

<br />

## Engineering Principles

These are the principles that show up in how I actually write code, not just what I write in a README.

**Production over prototypes.** A system that works on a demo dataset and breaks on real data is not a system. Every project in this portfolio was designed with failure modes in mind: what happens when the API is slow, when the LLM returns malformed JSON, when the user sends an edge case input.

**Document tradeoffs, not just decisions.** Any engineer can write down what they chose. The useful artifact is why — and what the alternatives were. Future maintainers (including future me) need to understand the constraints that produced a decision, not just the decision itself.

**Own your components.** I use shadcn/ui as a starting point, not a dependency. Components are copied into the project, modified, and owned. This avoids the trap of a major version upgrade breaking a visual that a third party controls.

**Type safety is load-bearing.** TypeScript strict mode throughout. Types are not decorative annotations — they are the specification for how data moves through the system. When types are wrong, the code is wrong.

**Latency is a product decision.** In voice applications and agentic systems, latency is not a technical problem to be optimized away after launch. It is a product constraint that shapes architecture from the start. I design for the latency budget first, then fit the capability into it.

**Write for the next engineer.** Variable names, function names, and comments are for the reader who comes after. The compiler doesn't care about naming. The human debugging a production issue at 11pm does.

<br />

---

<br />

## Roadmap

The portfolio itself is a maintained project. Planned improvements are tracked here.

- [x] Core sections: Hero, About, Expertise, Tech Stack, Case Studies, Career Journey, Contact
- [x] Framer Motion orchestrated entrance animations
- [x] Fully responsive layout down to 375px
- [x] Vercel deployment with automatic preview branches
- [x] Open Graph metadata for social sharing
- [x] Performance optimization pass (Lighthouse ≥ 95)
- [ ] Live AI demos embedded directly — inference calls from the browser to demonstrate systems working in real time
- [ ] Technical writing section — architecture deep-dives, implementation notes, research summaries
- [ ] Bengali language support — the portfolio translated into Bengali for local professional context
- [ ] Light theme — high-contrast light mode with full parity to the dark version
- [ ] Per-project Open Graph images — generated at build time for accurate social previews when specific case studies are shared
- [ ] Analytics dashboard — first-party, privacy-respecting session and interaction data
- [ ] CMS integration — case studies and research entries managed through a headless CMS rather than hardcoded

<br />

---

<br />

## Connect

| | |
|---|---|
| GitHub | [github.com/sihabsafin](https://github.com/sihabsafin) |
| LinkedIn | [linkedin.com/in/sihabsafin](https://linkedin.com/in/sihabsafin) |
| Portfolio | [sihabsafin.dev](https://your-domain.com) |
| Email | your@email.com |

Open to senior GenAI engineering roles, AI systems consulting, and research collaborations. Not open to junior positions or non-AI engineering work.

<br />

---

<br />

## License

MIT License — see [LICENSE](LICENSE) for the full text. You are free to use this codebase as a reference, but the written content (case studies, project descriptions, research documentation) represents my own work and is not for reproduction.

<br />

---

<div align="center">

<br />

*Built with curiosity, engineered with precision, and continuously improved through real-world experience.*

<br />

**Sihab Safin** — Generative AI Engineer

[sihabsafin.dev](https://your-domain.com) &nbsp;·&nbsp; [github.com/sihabsafin](https://github.com/sihabsafin) &nbsp;·&nbsp; [linkedin.com/in/sihabsafin](https://linkedin.com/in/sihabsafin)

<br />

</div>
