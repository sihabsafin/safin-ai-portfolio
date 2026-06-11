<div align="center">

# safin-ai-portfolio

**Production-grade AI systems. Enterprise LLM applications. Autonomous agents that solve real problems.**

[![Live](https://img.shields.io/badge/Portfolio-Live-00C896?style=flat-square&logo=vercel&logoColor=white)](https://your-domain.com)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-E5E7EB?style=flat-square)](LICENSE)

</div>

---

## Live

<div align="center">

**[sihabsafin.dev](https://your-domain.com)** · **[github.com/sihabsafin](https://github.com/sihabsafin)**

</div>

---

## Overview

This repository is the source of my professional portfolio — but it is not a portfolio in the conventional sense.

It is an engineered system built to communicate one thing clearly: how I think about building AI. Every architectural decision, section hierarchy, and interaction is deliberate. There are no template components, no Framer site exports, and no AI-generated boilerplate. Each line of code reflects a considered choice.

The site presents my work as a GenAI engineer: autonomous multi-agent systems, RAG pipelines, fine-tuned language models, and full-stack AI applications. It is designed for technical evaluators — engineering leads, CTOs, and serious clients — who can tell the difference between a portfolio built for impressions and one built for understanding.

---

## Features

| Capability | Description |
|---|---|
| ✦ Production UI | Component architecture built for real maintainability, not demo day |
| ✦ AI Architecture Visualization | Interactive diagrams of multi-agent pipelines and LLM system designs |
| ✦ Enterprise Case Studies | Project breakdowns with technical decisions, tradeoffs, and outcomes |
| ✦ Engineering Timeline | Chronological record of learning, building, and shipping |
| ✦ Dark Premium Theme | Obsidian-grade dark palette with surgical use of color |
| ✦ Glassmorphism | Selective, purposeful — not decorative noise |
| ✦ Framer Motion Animations | Orchestrated, not scattered. Animation as communication |
| ✦ Fully Responsive | Mobile-first, tested across breakpoints |
| ✦ Performance Optimized | Lazy loading, code splitting, optimized assets |
| ✦ SEO Ready | Semantic HTML, Open Graph, structured metadata |
| ✦ Accessible | Keyboard navigation, ARIA labels, reduced-motion support |
| ✦ Interactive Components | Hover states, micro-interactions, live demos |

---

## Website Sections

**Hero**
Opens with a direct statement of what I build and why. No stock photography. No vague taglines. The hero is a thesis.

**Currently Building**
A live snapshot of active projects — what's in progress, what's shipping, what's being researched. Updated manually, not a GitHub activity feed.

**About**
Engineering background, academic context (BSc CSE, BGC Trust University Bangladesh — graduating 2026), and the path from full-stack development into production AI systems.

**Core Expertise**
Specific capabilities broken into signal: LLM fine-tuning (QLoRA, PEFT), multi-agent orchestration (CrewAI, LangGraph), RAG pipeline architecture, API integration, and full-stack deployment. Not a skills cloud.

**Tech Stack**
A structured map of the tools I use in production, organized by category. Languages, frameworks, AI infrastructure, vector databases, deployment, and monitoring.

**AI Production Architecture**
Visual system diagrams of how my key projects are architected — agent roles, data flow, retrieval strategies, and orchestration logic.

**Enterprise Case Studies**
Deep-dives into AutoSec, RecruitIQ, ClinicalCrew, INVESTIQ-AI, DocMind, and InterviewIQ. Each case study covers: problem statement, architecture, technical decisions, and what I learned.

**Engineering Decisions**
A section dedicated to tradeoffs — why I chose CrewAI over LangGraph for a given project, why BM25 + semantic hybrid outperformed pure vector retrieval in a specific context, why QLoRA over full fine-tuning. The reasoning, not just the outcome.

**Open Source & Research**
Active GitHub repositories, the Chittagonian dialect machine translation thesis (QLoRA, Qwen2.5-3B / Gemma-2B-IT / LLaMA-3.2-3B comparative study), and contributions worth highlighting.

**Testimonials**
Professional feedback from clients and collaborators. Real names, real context.

**Career Journey**
A visual timeline: freelance full-stack work → GenAI engineering → thesis research → production AI systems → target: Masters in CS/AI, Italy, 2027.

**Contact**
Direct reach. No contact form maze.

**Footer**
Clean. Links to primary profiles. One line that captures the intent behind the work.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Language | TypeScript 5 |
| Framework | React 18 |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS 3 |
| Components | shadcn/ui |
| Animation | Framer Motion |
| Icons | Lucide React |
| Deployment | Vercel |
| Version Control | Git + GitHub |

---

## Project Structure

```
safin-ai-portfolio/
├── public/
│   ├── favicon.ico
│   └── og-image.png
├── src/
│   ├── components/
│   │   ├── layout/
│   │   ├── sections/
│   │   └── ui/
│   ├── hooks/
│   ├── lib/
│   │   └── utils.ts
│   ├── assets/
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
├── package.json
└── README.md
```

---

## Local Development

```bash
# Clone the repository
git clone https://github.com/sihabsafin/safin-ai-portfolio.git
cd safin-ai-portfolio

# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

Requires Node.js 18 or later.

---

## Performance

- Vite code splitting — only what the current view needs is loaded
- React lazy and Suspense for heavy sections
- Image assets compressed and served in modern formats
- CSS animations respect `prefers-reduced-motion`
- Zero unused Tailwind classes in production (purged at build time)
- Lighthouse score targets: Performance ≥ 95, Accessibility ≥ 95, SEO ≥ 95

---

## Design Philosophy

The choices here follow a single constraint: nothing that doesn't earn its space.

The dark theme is not aesthetic preference — it puts emphasis where it belongs, on code, diagrams, and technical content. The glassmorphism is used exactly twice, for surfaces that need to float above dense content. The animations are orchestrated in one primary sequence on load, with micro-interactions on hover. There is no ambient particle field, no cursor glow, no scroll hijacking.

Typography runs on a clear hierarchy: a weighted display face for section titles, a neutral body face for prose, and a monospace face for code and data. Spacing between sections is consistent and intentional — it signals that each section is its own unit, not a continuous scroll feed.

The goal is a site that communicates competence before the visitor reads a single word.

---

## Engineering Principles

- **Production over prototypes.** Projects are architected to scale, not just to demo.
- **Explicit tradeoffs.** Every architectural choice reflects a conscious decision. I document the alternatives.
- **Readable code.** Code is written for the next engineer to understand, not to impress a linter.
- **Reusable components.** The component library is designed to extend, not copy-paste.
- **Performance is a feature.** Slow software is broken software.
- **Accessibility is not optional.** Keyboard navigation and screen reader support are built in, not bolted on.
- **Meaningful animation.** If removing an animation would make the interface clearer, it gets removed.

---

## Roadmap

- [x] Core portfolio sections
- [x] Case study architecture
- [x] Mobile-responsive layout
- [x] Framer Motion orchestration
- [x] Vercel deployment
- [ ] Interactive AI demos (live inference, embedded agents)
- [ ] Technical blog with engineering deep-dives
- [ ] Multilingual support (Bengali, English)
- [ ] Light theme toggle
- [ ] Custom analytics dashboard
- [ ] Open Graph image generation per project
- [ ] CMS integration for case studies

---

## Connect

| Platform | Link |
|---|---|
| GitHub | [github.com/sihabsafin](https://github.com/sihabsafin) |
| LinkedIn | [linkedin.com/in/sihabsafin](https://linkedin.com/in/sihabsafin) |
| Portfolio | [your-domain.com](https://your-domain.com) |
| Email | your@email.com |

---

## License

MIT License. See [LICENSE](LICENSE) for details.

---

<div align="center">

*Built with curiosity, engineered with precision, and continuously improved through real-world experience.*

</div>
