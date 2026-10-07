# Stack-Rank Readiness Assessment & Curation Specification

> **Target Site:** `sebastian-gomez-site` (`/portafolio` workstation view)  
> **Author:** `teamwork_preview_worker_m1` (Catalog & Stack-Rank Readiness Author)  
> **Audited Ecosystem:** All 137 local repositories in `c:\Users\Usuario\Documents\mis repositorios` (111 Public, 26 Private)  
> **Date:** October 2026  
> **Associated Machine-Readable Catalog:** `docs/portfolio/projects_catalog.json`  

---

## 1. Executive Summary & Ecosystem Overview

This specification establishes the authoritative stack-ranked portfolio catalog and active readiness assessment for Sebastian Gómez's portfolio showcase on `sebastian-gomez-site`. Across 137 repositories, an empirical, multi-factor audit was executed to separate academic exercises, starter templates, and abandoned stubs from production-grade, commercially viable, and technically sophisticated systems.

### 1.1 Key Ecosystem Metrics

| Metric | Count | Percentage | Architectural Significance |
| :--- | :---: | :---: | :--- |
| **Total Repositories Audited** | **137** | **100.0%** | Comprehensive local repository inventory |
| **Public Repositories** | **111** | **81.0%** | Open-source GitHub repositories under `seagomezar` |
| **Private Repositories** | **26** | **19.0%** | Proprietary commercial systems, client contracts, and enterprise applications |
| **Curated Portfolio Projects (INCLUDED)** | **32** | **23.4%** | Curated for showcase across 8 pages (4 projects per page) |
| **Filtered Repositories (EXCLUDED)** | **105** | **76.6%** | Filtered by rigorous rubric (exercises, stubs, starters, self-referential) |
| **Verified Reachable Live Deployments (HTTP 200)** | **30** | **21.9%** | Tested network endpoints returning HTTP 200 OK |
| **Directly Embeddable Live Web Applications** | **27** | **19.7%** | Clean `<iframe>` rendering safe without blocking frame headers |
| **Live Cloud Backends / Microservices** | **2** | **1.5%** | Active Cloud Run microservices (SSE telemetry, health endpoints) |
| **Total Visual Assets Inventoried** | **987+** | — | UI screenshots, architecture diagrams, and design tokens |

### 1.2 Category Distribution Across Ecosystem

| Category | Total Repositories | Curated (INCLUDED) | Excluded (EXCLUDED) | Portfolio Role & Strategic Justification |
| :--- | :---: | :---: | :---: | :--- |
| **Web App / SaaS** | 46 | **16** | 30 | Production web systems, client management, enterprise portals, and SaaS tools |
| **Mobile App** | 5 | **5** | 0 | 100% inclusion rate: Flutter, React Native, and Android production-grade apps |
| **3D / Creative Tech** | 4 | **4** | 0 | 100% inclusion rate: Three.js 3D simulation, computer vision bots, game mechanics |
| **AI / ML / Data Science** | 17 | **7** | 10 | On-device WebGPU LLMs, Gemini multi-modal agents, audio synthesis, A2A protocols |
| **Academic / Course / Exercise** | 30 | **0** | 30 | Filtered by rule: tutorials, university coursework, meetup presentation slides |
| **Empty / Stub** | 15 | **0** | 15 | Filtered by rule: repositories with zero code files or only git metadata |
| **Backend / API / Cloud** | 10 | **0** | 10 | Spring Boot, Express, and microservices supporting client architectures |
| **Template / Starter** | 9 | **0** | 9 | Filtered by rule: generic scaffold templates and starter boilerplates |
| **Self-Referential Target Site** | 1 | **0** | 1 | Filtered by rule: target website repository itself (`sebastian-gomez-site`) |

---

## 2. Multi-Factor Scoring Rubric (0–50 Scale)

Every repository was quantitatively scored across **5 orthogonal dimensions** on a scale of **0 to 10 points** per dimension (maximum composite score of **50 points**).

$$\text{Composite Score} = \text{Completeness} + \text{Complexity} + \text{Visual Appeal} + \text{Recency} + \text{Domain Value}$$

### 2.1 Rubric Scoring Dimensions

```
┌────────────────────────────────────────────────────────────────────────────────┐
│                          MULTI-FACTOR SCORING RUBRIC                           │
├───────────────────────┬────────┬───────────────────────────────────────────────┤
│ Dimension             │ Weight │ Evaluation Criteria                           │
├───────────────────────┼────────┼───────────────────────────────────────────────┤
│ 1. Completeness (C)   │  0–10  │ Code volume, architectural modularity, tests  │
│ 2. Complexity (X)     │  0–10  │ TypeScript, 3D, Mobile SDK, Edge AI, Vision   │
│ 3. Visual Appeal (V)  │  0–10  │ Screenshots, interactive canvas, responsive UI│
│ 4. Recency (R)        │  0–10  │ Dependency freshness & latest commit timestamp│
│ 5. Domain Value (D)   │  0–10  │ Market viability, SaaS, FinTech, Creative AI  │
└───────────────────────┴────────┴───────────────────────────────────────────────┘
```

#### 1. Completeness ($C$, 0–10)
- **9–10:** Full production architecture with clean modular separation (`src`, `components`, `pages`/`app`, `lib`, `services`), automated test suites (Jest, Cypress, Vitest, Playwright), CI/CD pipelines, and extensive documentation.
- **7–8:** Substantial, functional application with structured components, routing, and state management, but partial test coverage.
- **5–6:** Working single-page application or feature prototype with basic documentation.
- **1–4:** Incomplete project, partial implementation, or minimal skeleton.
- **0:** Empty repository or missing code files.

#### 2. Technical Complexity ($X$, 0–10)
- **9–10:** Advanced architectural patterns: Edge AI runtimes (LiteRT WebGPU, Gemma), multi-agent coordination (Agent2Agent A2A protocol), 3D graphics rendering (Three.js WebGL shaders), real-time motorsport telemetry (FastAPI SSE + Android CAN bus), or computer vision (OpenCV image recognition).
- **7–8:** Modern full-stack engineering: Next.js App Router, TypeScript strict typing, state machines, offline-first IndexedDB replication, audio synthesis (Tone.js, Web Audio API), or custom Chrome Extensions.
- **5–6:** Standard SPA framework architectures (Angular, React, Vue, Flutter, React Native) with REST/Firebase integration.
- **3–4:** Basic JavaScript/HTML5 DOM scripting or straightforward MVC patterns.
- **0–2:** Static HTML/CSS or rudimentary shell scripts.

#### 3. Visual / Interactive Appeal ($V$, 0–10)
- **9–10:** Rich visual asset inventory ($ge 10$ high-resolution screenshots, diagrams, demo GIFs), interactive 3D canvas, dynamic audio visualizers, or custom responsive design tokens.
- **7–8:** Polished responsive UI with clean modern styling (Tailwind CSS, Material Design, Bulma) and multiple local UI screenshots.
- **5–6:** Functional user interface with standard components and 1–3 screenshots.
- **3–4:** Minimal styling, unstyled forms, or purely textual terminal outputs.
- **0–2:** Headless backends, CLI utilities, or repositories with zero visual media.

#### 4. Recency ($R$, 0–10)
Evaluates ecosystem freshness, modern framework compatibility, and git maintenance activity:
- **10:** Active development in **2026** with modern toolchains (React 19, Next.js 16, Flutter 3.44+, Vite 5+).
- **9:** Committed in **2025** with contemporary dependency stacks.
- **8:** Committed in **2024** with stable modern frameworks.
- **7:** Committed in **2023**.
- **6:** Committed in **2022**.
- **2–5:** Historical legacy codebases committed in $le 2021$.

#### 5. Domain Value & Market Viability ($D$, 0–10)
- **9–10:** High-impact commercial SaaS, enterprise ERP, FinTech budgeting, CleanTech irrigation engineering, or cutting-edge AI developer tooling.
- **7–8:** Practical business applications, clinical health tools, music pedagogical software, or mobile productivity companion apps.
- **5–6:** General utility tools, portfolio blogs, or interactive browser games.
- **3–4:** Technical coding assessment demos or library experiments.
- **0–2:** Generic school homework or trivial syntax exercises.

### 2.2 Strict Inclusion / Exclusion Gates
- **Inclusion Criteria:** A repository is curated into the portfolio if it satisfies:
  1. $\text{Composite Score} \ge 35$ and Code Files $\ge 5$; OR
  2. $\text{Composite Score} \ge 30$ with tangible visual assets / active demo and Code Volume $\ge 8$ source files.
- **Exclusion Filters:** Repositories categorized as *Academic / Course / Exercise*, *Template / Starter*, *Empty / Stub*, or *Self-Referential Target Site* are excluded by rule, regardless of raw point totals, to maintain strict professional differentiation.

---

## 3. Master Stack-Ranked Table of Curated Projects (Ranks 1 to 32)

Below is the complete stack-ranked master table of all **32 curated projects**, ordered strictly from **Rank #1** to **Rank #32**.

| Rank | Project Name | Visibility | Category | Score Breakdown | Live Status & HTTP | Embeddability Mode | Visuals & Gaps | Page |
| :---: | :--- | :---: | :--- | :---: | :---: | :---: | :---: | :---: |
| **#1** | **`practifactu`** | 🔒 Private | Web App / SaaS | `10/6/10/10/8=44` | ⚠️ OFFLINE [404] | `IMAGE_CAROUSEL` | ✅ 12 Assets | **Page 1** |
| **#2** | **`music-journal-app`** | 🌐 Public | Mobile App | `10/5/10/10/8=43` | ✅ LIVE [200] | `IFRAME_EMBED` | ✅ 19 Assets | **Page 1** |
| **#3** | **`herbalism-bot`** | 🔒 Private | 3D / Game / Creative Tech | `9/7/9/10/8=43` | ⚠️ OFFLINE [404] | `IMAGE_CAROUSEL` | ✅ 5 Assets | **Page 1** |
| **#4** | **`sonoma-racing-coach`** | 🌐 Public | 3D / Game / Creative Tech | `9/6/10/10/8=43` | ✅ LIVE [200] | `STATIC_CARD` | ✅ 5 Assets | **Page 1** |
| **#5** | **`sebastian-gomez-next`** | 🌐 Public | Web App / SaaS | `9/5/9/10/8=41` | ⚠️ OFFLINE [404] | `IMAGE_CAROUSEL` | ✅ 5 Assets | **Page 2** |
| **#6** | **`real-time-coach-codelab`** | 🌐 Public | 3D / Game / Creative Tech | `9/8/6/10/8=41` | ⚠️ OFFLINE [404] | `IMAGE_CAROUSEL` | ✅ 1 Assets | **Page 2** |
| **#7** | **`crecere-agents`** | 🔒 Private | AI / ML / Data Science | `10/4/8/9/9=40` | ⚠️ OFFLINE [404] | `IMAGE_CAROUSEL` | ✅ 1 Assets | **Page 2** |
| **#8** | **`anthropometry-app`** | 🌐 Public | Web App / SaaS | `10/4/8/10/8=40` | ✅ LIVE [200] | `IFRAME_EMBED` | ✅ 3 Assets | **Page 2** |
| **#9** | **`flutemodes`** | 🌐 Public | Web App / SaaS | `10/2/10/10/8=40` | ✅ LIVE [200] | `IFRAME_EMBED` | ✅ 5 Assets | **Page 3** |
| **#10** | **`agendarcitademaquillaje`** | 🌐 Public | Web App / SaaS | `10/2/10/10/8=40` | ✅ LIVE [200] | `IFRAME_EMBED` | ✅ 5 Assets | **Page 3** |
| **#11** | **`liteRT-LM`** | 🌐 Public | AI / ML / Data Science | `8/4/9/10/9=40` | ✅ LIVE [200] | `IFRAME_EMBED` | ✅ 5 Assets | **Page 3** |
| **#12** | **`sgi-v2`** | 🔒 Private | Web App / SaaS | `9/5/8/10/7=39` | ⚠️ OFFLINE [404] | `IMAGE_CAROUSEL` | ✅ 5 Assets | **Page 3** |
| **#13** | **`workshopJsconfmxRNApp`** | 🌐 Public | Mobile App | `10/5/10/5/9=39` | ⚠️ OFFLINE [404] | `IMAGE_CAROUSEL` | ✅ 11 Assets | **Page 4** |
| **#14** | **`family-wallet`** | 🌐 Public | Web App / SaaS | `10/5/6/10/8=39` | ✅ LIVE [200] | `IFRAME_EMBED` | ✅ 2 Assets | **Page 4** |
| **#15** | **`AI-Based-Music-Generator-ReactJS`** | 🌐 Public | AI / ML / Data Science | `10/7/3/10/9=39` | ✅ LIVE [200] | `IFRAME_EMBED` | ⚠️ 0 (Needs Gen) | **Page 4** |
| **#16** | **`rigare`** | 🌐 Public | Web App / SaaS | `8/6/9/8/8=39` | ✅ LIVE [200] | `IFRAME_EMBED` | ✅ 5 Assets | **Page 4** |
| **#17** | **`NewFitnessTrainingApp`** | 🔒 Private | Mobile App | `10/5/10/5/8=38` | ⚠️ OFFLINE [404] | `IMAGE_CAROUSEL` | ✅ 10 Assets | **Page 5** |
| **#18** | **`sebastian-gomez`** | 🌐 Public | Web App / SaaS | `10/2/9/9/8=38` | ⚠️ OFFLINE [404] | `IMAGE_CAROUSEL` | ✅ 5 Assets | **Page 5** |
| **#19** | **`cognitive-guardian`** | 🌐 Public | AI / ML / Data Science | `8/4/7/10/9=38` | ⚠️ OFFLINE [404] | `IMAGE_CAROUSEL` | ✅ 4 Assets | **Page 5** |
| **#20** | **`flutter_gemma_test`** | 🌐 Public | Mobile App | `6/5/8/10/9=38` | ⚠️ OFFLINE [404] | `IMAGE_CAROUSEL` | ✅ 5 Assets | **Page 5** |
| **#21** | **`adaptai`** | 🔒 Private | Web App / SaaS | `10/4/7/8/8=37` | ⚠️ OFFLINE [404] | `IMAGE_CAROUSEL` | ✅ 5 Assets | **Page 6** |
| **#22** | **`maps-angular`** | 🌐 Public | Web App / SaaS | `8/5/6/10/8=37` | ⚠️ OFFLINE [404] | `IMAGE_CAROUSEL` | ✅ 2 Assets | **Page 6** |
| **#23** | **`sgi`** | 🔒 Private | Web App / SaaS | `10/2/8/9/7=36` | ⚠️ OFFLINE [404] | `IMAGE_CAROUSEL` | ✅ 5 Assets | **Page 6** |
| **#24** | **`uber-like-app-angular`** | 🌐 Public | Web App / SaaS | `9/5/5/10/7=36` | ⚠️ OFFLINE [404] | `IMAGE_CAROUSEL` | ✅ 2 Assets | **Page 6** |
| **#25** | **`tmux-game`** | 🌐 Public | 3D / Game / Creative Tech | `8/4/5/10/9=36` | ✅ LIVE [200] | `IFRAME_EMBED` | ⚠️ 0 (Needs Gen) | **Page 7** |
| **#26** | **`melodic-generator`** | 🌐 Public | AI / ML / Data Science | `7/7/4/10/8=36` | ✅ LIVE [200] | `IFRAME_EMBED` | ✅ 2 Assets | **Page 7** |
| **#27** | **`PetTracker`** | 🌐 Public | Mobile App | `6/5/9/8/8=36` | ⚠️ OFFLINE [404] | `IMAGE_CAROUSEL` | ✅ 5 Assets | **Page 7** |
| **#28** | **`gemini-pro-nextjs`** | 🌐 Public | AI / ML / Data Science | `6/8/5/8/9=36` | ⚠️ OFFLINE [404] | `IMAGE_CAROUSEL` | ✅ 2 Assets | **Page 7** |
| **#29** | **`huokan-frontend`** | 🔒 Private | Web App / SaaS | `10/2/9/7/7=35` | ⚠️ OFFLINE [404] | `IMAGE_CAROUSEL` | ✅ 2 Assets | **Page 8** |
| **#30** | **`file-system`** | 🔒 Private | Web App / SaaS | `9/5/6/8/7=35` | ⚠️ OFFLINE [404] | `IMAGE_CAROUSEL` | ✅ 3 Assets | **Page 8** |
| **#31** | **`fiestaPWA`** | 🌐 Public | Web App / SaaS | `10/3/9/5/8=35` | ⚠️ OFFLINE [404] | `IMAGE_CAROUSEL` | ✅ 1 Assets | **Page 8** |
| **#32** | **`react-vite-gemini-chrome-extension`** | 🌐 Public | AI / ML / Data Science | `7/7/5/8/8=35` | ⚠️ OFFLINE [404] | `IMAGE_CAROUSEL` | ✅ 4 Assets | **Page 8** |

---

## 4. Logical Pagination Breakdown (8 Pages × 4 Projects)

The curated catalog is structured into **8 themed pages**, presenting exactly **4 projects per page**. This provides a balanced, high-impact narrative that showcases breadth and depth across full-stack engineering, mobile development, edge artificial intelligence, 3D graphics, audio tech, and enterprise ERP systems.

### 📄 Page 1: Flagship & High-Impact Engineering

> **Thematic Focus:** Enterprise SaaS, Cross-Platform Mobile, Autonomous Computer Vision & Real-Time Telemetry  
> **Narrative Strategy:** Page 1 represents the pinnacle of Sebastian Gómez's technical capability. It leads with PractiFactu (an enterprise DIAN-compliant invoicing SaaS), the Flutter Music Journal coach, an OpenCV MMORPG vision bot, and the Sonoma Racing Coach motorsport telemetry system. This page instantly establishes full-stack, systems, and mobile mastery.

#### #1. `practifactu` — PractiFactu - DIAN Electronic Invoicing SaaS
- **Category:** **Web App / SaaS** | **Visibility:** 🔒 Private Repository (Confidential / Client)
- **Primary Tech Stack:** `TypeScript`, `Next.js`, `Tailwind CSS`, `Prisma`, `DIAN ERP`, `PostgreSQL`
- **Repository Link:** *Proprietary (Source Protected)*
- **Score Breakdown (Total: 44/50):** Completeness: `10/10` | Complexity: `6/10` | Visual Appeal: `10/10` | Recency: `10/10` | Domain Value: `8/10`
- **Live Deployment:** Status: `OFFLINE` | HTTP Code: `404` | Platform: `None` | URL: [`https://seagomezar.github.io/practifactu/`](https://seagomezar.github.io/practifactu/)
- **Embeddability Verdict:** Mode: `IMAGE_CAROUSEL` | Is Embeddable: `false` | X-Frame-Options: `None` | CSP: `None`
- **Visual Media:** Count: `12` | Primary Screenshot: `docs/screenshots/01_login.png` | Needs Asset Generation: `false`
- **Architectural Description:** Enterprise SaaS electronic invoicing and ERP platform complying with Colombian DIAN tax regulations (Anexo 1.9, RADIAN, Documento Soporte) built with Next.js, Prisma, and PostgreSQL.

#### #2. `music-journal-app` — Music Journal & Flute Practice Coach
- **Category:** **Mobile App** | **Visibility:** 🌐 Public Repository
- **Primary Tech Stack:** `Dart`, `Flutter`, `Mobile`, `Audio Recording`, `GitHub Actions`
- **Repository Link:** [GitHub Repository](https://github.com/seagomezar/music-journal-app)
- **Score Breakdown (Total: 43/50):** Completeness: `10/10` | Complexity: `5/10` | Visual Appeal: `10/10` | Recency: `10/10` | Domain Value: `8/10`
- **Live Deployment:** Status: `LIVE` | HTTP Code: `200` | Platform: `GitHub Pages` | URL: [`https://seagomezar.github.io/music-journal-app/`](https://seagomezar.github.io/music-journal-app/)
- **Embeddability Verdict:** Mode: `IFRAME_EMBED` | Is Embeddable: `true` | X-Frame-Options: `None` | CSP: `None`
- **Visual Media:** Count: `19` | Primary Screenshot: `assets/screenshots/active_practice_screen.png` | Needs Asset Generation: `false`
- **Architectural Description:** Comprehensive Flutter mobile practice coach for flutists and musicians featuring audio recording, smart practice logging, tempo tracking, and habit analytics.

#### #3. `herbalism-bot` — MMORPG Computer Vision Herbalism Bot
- **Category:** **3D / Game / Creative Tech** | **Visibility:** 🔒 Private Repository (Confidential / Client)
- **Primary Tech Stack:** `Python`, `OpenCV`, `NumPy`, `Computer Vision`, `Automation`
- **Repository Link:** *Proprietary (Source Protected)*
- **Score Breakdown (Total: 43/50):** Completeness: `9/10` | Complexity: `7/10` | Visual Appeal: `9/10` | Recency: `10/10` | Domain Value: `8/10`
- **Live Deployment:** Status: `OFFLINE` | HTTP Code: `404` | Platform: `None` | URL: [`https://seagomezar.github.io/herbalism-bot/`](https://seagomezar.github.io/herbalism-bot/)
- **Embeddability Verdict:** Mode: `IMAGE_CAROUSEL` | Is Embeddable: `false` | X-Frame-Options: `None` | CSP: `None`
- **Visual Media:** Count: `5` | Primary Screenshot: `circular_masked_minimap.png` | Needs Asset Generation: `false`
- **Architectural Description:** Autonomous MMORPG navigation and resource gathering bot using Python OpenCV computer vision, heading-aware minimap tracking, and safe Windows input emulation.

#### #4. `sonoma-racing-coach` — ApexAI Sonoma Motorsport Telemetry Coach
- **Category:** **3D / Game / Creative Tech** | **Visibility:** 🌐 Public Repository
- **Primary Tech Stack:** `Kotlin`, `Android SDK`, `Google Cloud Run`, `FastAPI`, `SSE Telemetry`, `ApexAI`
- **Repository Link:** [GitHub Repository](https://github.com/seagomezar/sonoma-racing-coach)
- **Score Breakdown (Total: 43/50):** Completeness: `9/10` | Complexity: `6/10` | Visual Appeal: `10/10` | Recency: `10/10` | Domain Value: `8/10`
- **Live Deployment:** Status: `LIVE` | HTTP Code: `200` | Platform: `Google Cloud Run` | URL: [`https://apexai-812524149286.us-central1.run.app/events/telemetry`](https://apexai-812524149286.us-central1.run.app/events/telemetry)
- **Embeddability Verdict:** Mode: `STATIC_CARD` | Is Embeddable: `false` | X-Frame-Options: `None` | CSP: `None`
- **Visual Media:** Count: `5` | Primary Screenshot: `app/src/main/res/mipmap-hdpi/ic_launcher.png` | Needs Asset Generation: `false`
- **Architectural Description:** Real-time motorsport telemetry and AI driver coaching system featuring an Android edge telemetry logger and Google Cloud Run FastAPI SSE streaming backend.

### 📄 Page 2: Full-Stack Modern Web & Intelligent Edge

> **Thematic Focus:** React 19/Next.js Architecture, Three.js 3D Graphics, Multi-Agent Protocols & Clinical HealthTech  
> **Narrative Strategy:** Page 2 highlights architectural versatility: high-performance Next.js portfolio engineering, interactive Three.js motorsport codelabs, Google's Agent2Agent (A2A) protocol implementation, and clinical body composition calculation in React and GraphQL.

#### #5. `sebastian-gomez-next` — Next.js Engineering Portfolio & Blog
- **Category:** **Web App / SaaS** | **Visibility:** 🌐 Public Repository
- **Primary Tech Stack:** `JavaScript`, `Next.js`, `React`, `Tailwind CSS`
- **Repository Link:** [GitHub Repository](https://github.com/seagomezar/sebastian-gomez-next)
- **Score Breakdown (Total: 41/50):** Completeness: `9/10` | Complexity: `5/10` | Visual Appeal: `9/10` | Recency: `10/10` | Domain Value: `8/10`
- **Live Deployment:** Status: `OFFLINE` | HTTP Code: `404` | Platform: `None` | URL: [`https://seagomezar.github.io/sebastian-gomez-next/`](https://seagomezar.github.io/sebastian-gomez-next/)
- **Embeddability Verdict:** Mode: `IMAGE_CAROUSEL` | Is Embeddable: `false` | X-Frame-Options: `None` | CSP: `None`
- **Visual Media:** Count: `5` | Primary Screenshot: `public/angular.png` | Needs Asset Generation: `false`
- **Architectural Description:** High-performance full-stack developer portfolio and technical blog built with Next.js featuring dynamic routing, SEO optimization, and responsive design.

#### #6. `real-time-coach-codelab` — Real-Time 3D Motorsport Coach Simulation
- **Category:** **3D / Game / Creative Tech** | **Visibility:** 🌐 Public Repository
- **Primary Tech Stack:** `TypeScript`, `React`, `Three.js`, `Express`, `Vite`, `Tailwind CSS`
- **Repository Link:** [GitHub Repository](https://github.com/seagomezar/real-time-coach-codelab)
- **Score Breakdown (Total: 41/50):** Completeness: `9/10` | Complexity: `8/10` | Visual Appeal: `6/10` | Recency: `10/10` | Domain Value: `8/10`
- **Live Deployment:** Status: `OFFLINE` | HTTP Code: `404` | Platform: `None` | URL: [`https://seagomezar.github.io/real-time-coach-codelab/`](https://seagomezar.github.io/real-time-coach-codelab/)
- **Embeddability Verdict:** Mode: `IMAGE_CAROUSEL` | Is Embeddable: `false` | X-Frame-Options: `None` | CSP: `None`
- **Visual Media:** Count: `1` | Primary Screenshot: `public/tracks/thunderhill/map.svg` | Needs Asset Generation: `false`
- **Architectural Description:** Interactive 3D motorsport coaching simulation and track telemetry visualizer built with React, Three.js, and Express.

#### #7. `crecere-agents` — Agent2Agent (A2A) Multi-Agent Ecosystem
- **Category:** **AI / ML / Data Science** | **Visibility:** 🔒 Private Repository (Confidential / Client)
- **Primary Tech Stack:** `Python`, `Agent2Agent (A2A)`, `Multi-Agent Systems`, `Google Cloud`, `SSE Streaming`
- **Repository Link:** *Proprietary (Source Protected)*
- **Score Breakdown (Total: 40/50):** Completeness: `10/10` | Complexity: `4/10` | Visual Appeal: `8/10` | Recency: `9/10` | Domain Value: `9/10`
- **Live Deployment:** Status: `OFFLINE` | HTTP Code: `404` | Platform: `None` | URL: [`https://seagomezar.github.io/crecere-agents/`](https://seagomezar.github.io/crecere-agents/)
- **Embeddability Verdict:** Mode: `IMAGE_CAROUSEL` | Is Embeddable: `false` | X-Frame-Options: `None` | CSP: `None`
- **Visual Media:** Count: `1` | Primary Screenshot: `images/a2a_demo_arch.png` | Needs Asset Generation: `false`
- **Architectural Description:** Enterprise multi-agent communication protocol and orchestration platform implementing Google's Agent2Agent (A2A) standard with real-time SSE streaming.

#### #8. `anthropometry-app` — Clinical Anthropometry & Body Composition App
- **Category:** **Web App / SaaS** | **Visibility:** 🌐 Public Repository
- **Primary Tech Stack:** `JavaScript`, `React`, `Vite`, `GraphQL`, `HealthTech`
- **Repository Link:** [GitHub Repository](https://github.com/seagomezar/anthropometry-app)
- **Score Breakdown (Total: 40/50):** Completeness: `10/10` | Complexity: `4/10` | Visual Appeal: `8/10` | Recency: `10/10` | Domain Value: `8/10`
- **Live Deployment:** Status: `LIVE` | HTTP Code: `200` | Platform: `GitHub Pages` | URL: [`https://anthropometry.sebastian-gomez.com`](https://anthropometry.sebastian-gomez.com)
- **Embeddability Verdict:** Mode: `IFRAME_EMBED` | Is Embeddable: `true` | X-Frame-Options: `None` | CSP: `None`
- **Visual Media:** Count: `3` | Primary Screenshot: `cypress/screenshots/Measurement.cy.js/Measurement -- Measurement On Desktop (failed).png` | Needs Asset Generation: `false`
- **Architectural Description:** Clinical body composition and anthropometric assessment web application featuring certified measurement formulas, GraphQL queries, and responsive charts.

### 📄 Page 3: Music Tech, Client Booking, Edge LLMs & Enterprise ERP

> **Thematic Focus:** Pedagogical Audio Tools, Clean Architecture SaaS, In-Browser WebGPU LLMs & PHP/TypeScript ERPs  
> **Narrative Strategy:** Page 3 displays unique cross-disciplinary applications: FluteModes interactive music theory, Vane Pérez Makeup automated booking portal, the LiteRT-LM in-browser WebGPU language model playground, and the modernized SGI v2 ERP platform.

#### #9. `flutemodes` — FluteModes Music Theory & Modal Visualizer
- **Category:** **Web App / SaaS** | **Visibility:** 🌐 Public Repository
- **Primary Tech Stack:** `JavaScript`, `abcjs`, `Web Audio API`, `HTML5 Canvas`, `Music Theory`
- **Repository Link:** [GitHub Repository](https://github.com/seagomezar/flutemodes)
- **Score Breakdown (Total: 40/50):** Completeness: `10/10` | Complexity: `2/10` | Visual Appeal: `10/10` | Recency: `10/10` | Domain Value: `8/10`
- **Live Deployment:** Status: `LIVE` | HTTP Code: `200` | Platform: `GitHub Pages` | URL: [`https://seagomezar.github.io/flutemodes/`](https://seagomezar.github.io/flutemodes/)
- **Embeddability Verdict:** Mode: `IFRAME_EMBED` | Is Embeddable: `true` | X-Frame-Options: `None` | CSP: `None`
- **Visual Media:** Count: `5` | Primary Screenshot: `articulaciones.svg` | Needs Asset Generation: `false`
- **Architectural Description:** Interactive music theory and flute pedagogy web application for exploring modal fingering systems, scale patterns, and dynamic score rendering via abcjs.

#### #10. `agendarcitademaquillaje` — Vane Pérez Makeup Appointment Booking Portal
- **Category:** **Web App / SaaS** | **Visibility:** 🌐 Public Repository
- **Primary Tech Stack:** `JavaScript`, `Clean Architecture`, `WhatsApp Business API`, `CSS3`, `HTML5`
- **Repository Link:** [GitHub Repository](https://github.com/seagomezar/agendarcitademaquillaje)
- **Score Breakdown (Total: 40/50):** Completeness: `10/10` | Complexity: `2/10` | Visual Appeal: `10/10` | Recency: `10/10` | Domain Value: `8/10`
- **Live Deployment:** Status: `LIVE` | HTTP Code: `200` | Platform: `GitHub Pages` | URL: [`https://seagomezar.github.io/agendarcitademaquillaje/`](https://seagomezar.github.io/agendarcitademaquillaje/)
- **Embeddability Verdict:** Mode: `IFRAME_EMBED` | Is Embeddable: `true` | X-Frame-Options: `None` | CSP: `None`
- **Visual Media:** Count: `5` | Primary Screenshot: `assets/images/apple-touch-icon.png` | Needs Asset Generation: `false`
- **Architectural Description:** Client-facing beauty appointment booking portal built with Clean Architecture, automated validation, and WhatsApp Business API integration.

#### #11. `liteRT-LM` — LiteRT-LM In-Browser WebGPU LLM Playground
- **Category:** **AI / ML / Data Science** | **Visibility:** 🌐 Public Repository
- **Primary Tech Stack:** `JavaScript`, `WebGPU`, `Google LiteRT`, `On-Device LLM`, `Cypress`
- **Repository Link:** [GitHub Repository](https://github.com/seagomezar/liteRT-LM)
- **Score Breakdown (Total: 40/50):** Completeness: `8/10` | Complexity: `4/10` | Visual Appeal: `9/10` | Recency: `10/10` | Domain Value: `9/10`
- **Live Deployment:** Status: `LIVE` | HTTP Code: `200` | Platform: `GitHub Pages` | URL: [`https://seagomezar.github.io/liteRT-LM/`](https://seagomezar.github.io/liteRT-LM/)
- **Embeddability Verdict:** Mode: `IFRAME_EMBED` | Is Embeddable: `true` | X-Frame-Options: `None` | CSP: `None`
- **Visual Media:** Count: `5` | Primary Screenshot: `assets/analog_terminal_final.png` | Needs Asset Generation: `false`
- **Architectural Description:** In-browser on-device generative AI playground running local language models on WebGPU via Google LiteRT (TensorFlow Lite) Core runtime.

#### #12. `sgi-v2` — SGI v2 Modernized Enterprise ERP Refactor
- **Category:** **Web App / SaaS** | **Visibility:** 🔒 Private Repository (Confidential / Client)
- **Primary Tech Stack:** `TypeScript`, `PHP`, `CodeIgniter`, `Docker`, `MySQL`
- **Repository Link:** *Proprietary (Source Protected)*
- **Score Breakdown (Total: 39/50):** Completeness: `9/10` | Complexity: `5/10` | Visual Appeal: `8/10` | Recency: `10/10` | Domain Value: `7/10`
- **Live Deployment:** Status: `OFFLINE` | HTTP Code: `404` | Platform: `None` | URL: [`https://seagomezar.github.io/sgi-v2/`](https://seagomezar.github.io/sgi-v2/)
- **Embeddability Verdict:** Mode: `IMAGE_CAROUSEL` | Is Embeddable: `false` | X-Frame-Options: `None` | CSP: `None`
- **Visual Media:** Count: `5` | Primary Screenshot: `images/administracion.jpg` | Needs Asset Generation: `false`
- **Architectural Description:** Modular enterprise management and business intelligence portal refactored with TypeScript, CodeIgniter backend, and Docker containerization.

### 📄 Page 4: Cross-Platform Mobile, Offline FinTech & Algorithmic Audio

> **Thematic Focus:** React Native/Expo Mobile, IndexedDB Local-First PWA, Tone.js Generative Synthesis & Commercial SaaS  
> **Narrative Strategy:** Page 4 focuses on developer tooling and polished utilities: the JSConf Mexico mobile companion app, Family Wallet offline-first budgeting PWA, Tone.js algorithmic music generator, and Rigare SAS commercial production engineering portal.

#### #13. `workshopJsconfmxRNApp` — JSConf Mexico React Native Conference Companion
- **Category:** **Mobile App** | **Visibility:** 🌐 Public Repository
- **Primary Tech Stack:** `TypeScript`, `React Native`, `Expo`, `Mobile`
- **Repository Link:** [GitHub Repository](https://github.com/seagomezar/workshopJsconfmxRNApp)
- **Score Breakdown (Total: 39/50):** Completeness: `10/10` | Complexity: `5/10` | Visual Appeal: `10/10` | Recency: `5/10` | Domain Value: `9/10`
- **Live Deployment:** Status: `OFFLINE` | HTTP Code: `404` | Platform: `None` | URL: [`https://sebastian-gomez.com`](https://sebastian-gomez.com)
- **Embeddability Verdict:** Mode: `IMAGE_CAROUSEL` | Is Embeddable: `false` | X-Frame-Options: `None` | CSP: `None`
- **Visual Media:** Count: `11` | Primary Screenshot: `app/screens/demo/heart.png` | Needs Asset Generation: `false`
- **Architectural Description:** Cross-platform mobile conference companion app developed with React Native and Expo for JSConf Mexico, featuring offline schedules and interactive sessions.

#### #14. `family-wallet` — Family Wallet Offline-First Budgeting PWA
- **Category:** **Web App / SaaS** | **Visibility:** 🌐 Public Repository
- **Primary Tech Stack:** `TypeScript`, `React`, `Dexie.js (IndexedDB)`, `Zustand`, `TanStack Router`, `Tailwind CSS`, `Vite`
- **Repository Link:** [GitHub Repository](https://github.com/seagomezar/family-wallet)
- **Score Breakdown (Total: 39/50):** Completeness: `10/10` | Complexity: `5/10` | Visual Appeal: `6/10` | Recency: `10/10` | Domain Value: `8/10`
- **Live Deployment:** Status: `LIVE` | HTTP Code: `200` | Platform: `GitHub Pages` | URL: [`https://seagomezar.github.io/family-wallet/`](https://seagomezar.github.io/family-wallet/)
- **Embeddability Verdict:** Mode: `IFRAME_EMBED` | Is Embeddable: `true` | X-Frame-Options: `None` | CSP: `None`
- **Visual Media:** Count: `2` | Primary Screenshot: `public/icons/icon-192.png` | Needs Asset Generation: `false`
- **Architectural Description:** Offline-first personal finance and budgeting PWA built with React, Dexie.js (IndexedDB), Zustand state management, and TanStack Router.

#### #15. `AI-Based-Music-Generator-ReactJS` — AI Algorithmic Music Generator (Tone.js)
- **Category:** **AI / ML / Data Science** | **Visibility:** 🌐 Public Repository
- **Primary Tech Stack:** `JavaScript`, `React`, `Tone.js`, `Web Audio API`, `Vite`
- **Repository Link:** [GitHub Repository](https://github.com/seagomezar/AI-Based-Music-Generator-ReactJS)
- **Score Breakdown (Total: 39/50):** Completeness: `10/10` | Complexity: `7/10` | Visual Appeal: `3/10` | Recency: `10/10` | Domain Value: `9/10`
- **Live Deployment:** Status: `LIVE` | HTTP Code: `200` | Platform: `GitHub Pages` | URL: [`https://seagomezar.github.io/AI-Based-Music-Generator-ReactJS/`](https://seagomezar.github.io/AI-Based-Music-Generator-ReactJS/)
- **Embeddability Verdict:** Mode: `IFRAME_EMBED` | Is Embeddable: `true` | X-Frame-Options: `None` | CSP: `None`
- **Visual Media:** Count: `0` | Primary Screenshot: `None` | Needs Asset Generation: `true`
- **Architectural Description:** Interactive algorithmic music composition web app generating melodic and rhythmic sequences in real-time using React and Tone.js Web Audio synthesis.

#### #16. `rigare` — Rigare SAS Industrial Pumping & Irrigation Portal
- **Category:** **Web App / SaaS** | **Visibility:** 🌐 Public Repository
- **Primary Tech Stack:** `TypeScript`, `Next.js`, `Tailwind CSS`, `Vercel`
- **Repository Link:** [GitHub Repository](https://github.com/seagomezar/rigare)
- **Score Breakdown (Total: 39/50):** Completeness: `8/10` | Complexity: `6/10` | Visual Appeal: `9/10` | Recency: `8/10` | Domain Value: `8/10`
- **Live Deployment:** Status: `LIVE` | HTTP Code: `200` | Platform: `Vercel` | URL: [`https://rigare.vercel.app/`](https://rigare.vercel.app/)
- **Embeddability Verdict:** Mode: `IFRAME_EMBED` | Is Embeddable: `true` | X-Frame-Options: `None` | CSP: `None`
- **Visual Media:** Count: `5` | Primary Screenshot: `public/Aplicaciones Bombeo Agrícola.webp` | Needs Asset Generation: `false`
- **Architectural Description:** Commercial production web portal for Rigare SAS showcasing industrial pumping, irrigation engineering solutions, and agricultural hydrology services.

### 📄 Page 5: Health/Fitness, Engineering Publications & Multimodal Agents

> **Thematic Focus:** React Native Fitness Routines, Hexo Firebase Publications, Gemini ADK Chrome Extensions & Mobile Gemma  
> **Narrative Strategy:** Page 5 balances personal branding and cutting-edge edge AI: NewFitnessTrainingApp mobile routine builder, the Hexo technical engineering blog, the Cognitive Guardian Gemini 2.5 Flash digital immune agent, and mobile on-device Google Gemma inference in Flutter.

#### #17. `NewFitnessTrainingApp` — Fitness & Workout Routine Training App
- **Category:** **Mobile App** | **Visibility:** 🔒 Private Repository (Confidential / Client)
- **Primary Tech Stack:** `TypeScript`, `React Native`, `Mobile`, `Health & Fitness`
- **Repository Link:** *Proprietary (Source Protected)*
- **Score Breakdown (Total: 38/50):** Completeness: `10/10` | Complexity: `5/10` | Visual Appeal: `10/10` | Recency: `5/10` | Domain Value: `8/10`
- **Live Deployment:** Status: `OFFLINE` | HTTP Code: `404` | Platform: `None` | URL: [`https://seagomezar.github.io/NewFitnessTrainingApp/`](https://seagomezar.github.io/NewFitnessTrainingApp/)
- **Embeddability Verdict:** Mode: `IMAGE_CAROUSEL` | Is Embeddable: `false` | X-Frame-Options: `None` | CSP: `None`
- **Visual Media:** Count: `10` | Primary Screenshot: `android/app/src/main/res/drawable/screen.png` | Needs Asset Generation: `false`
- **Architectural Description:** Mobile fitness and workout tracking application built with React Native, supporting customized training routines, exercise logs, and biometric progress metrics.

#### #18. `sebastian-gomez` — Hexo Technical Engineering Publication
- **Category:** **Web App / SaaS** | **Visibility:** 🌐 Public Repository
- **Primary Tech Stack:** `Hexo`, `Node.js`, `Firebase Hosting`, `Markdown`
- **Repository Link:** [GitHub Repository](https://github.com/seagomezar/sebastian-gomez)
- **Score Breakdown (Total: 38/50):** Completeness: `10/10` | Complexity: `2/10` | Visual Appeal: `9/10` | Recency: `9/10` | Domain Value: `8/10`
- **Live Deployment:** Status: `OFFLINE` | HTTP Code: `404` | Platform: `Firebase` | URL: [`https://sebastian-gomez-blog.web.app`](https://sebastian-gomez-blog.web.app)
- **Embeddability Verdict:** Mode: `IMAGE_CAROUSEL` | Is Embeddable: `false` | X-Frame-Options: `None` | CSP: `None`
- **Visual Media:** Count: `5` | Primary Screenshot: `themes/tranquilpeak/source/_fonts/icomoon.svg` | Needs Asset Generation: `false`
- **Architectural Description:** Technical engineering blog and developer publication built with Hexo static site generator and deployed to Firebase Hosting.

#### #19. `cognitive-guardian` — Cognitive Guardian Digital Immune Agent
- **Category:** **AI / ML / Data Science** | **Visibility:** 🌐 Public Repository
- **Primary Tech Stack:** `Python`, `FastAPI`, `Google ADK`, `Gemini 2.5 Flash`, `Chrome Extension`, `Multimodal AI`
- **Repository Link:** [GitHub Repository](https://github.com/seagomezar/cognitive-guardian)
- **Score Breakdown (Total: 38/50):** Completeness: `8/10` | Complexity: `4/10` | Visual Appeal: `7/10` | Recency: `10/10` | Domain Value: `9/10`
- **Live Deployment:** Status: `OFFLINE` | HTTP Code: `404` | Platform: `None` | URL: [`https://seagomezar.github.io/cognitive-guardian/`](https://seagomezar.github.io/cognitive-guardian/)
- **Embeddability Verdict:** Mode: `IMAGE_CAROUSEL` | Is Embeddable: `false` | X-Frame-Options: `None` | CSP: `None`
- **Visual Media:** Count: `4` | Primary Screenshot: `diagram_cognitive_guardian_architecture.jpeg` | Needs Asset Generation: `false`
- **Architectural Description:** Intelligent digital immune system combining a Manifest V3 Chrome Extension and FastAPI backend powered by Google Gemini 2.5 Flash and Google ADK.

#### #20. `flutter_gemma_test` — Flutter On-Device Gemma LLM Explorer
- **Category:** **Mobile App** | **Visibility:** 🌐 Public Repository
- **Primary Tech Stack:** `Dart`, `Flutter`, `Google Gemma`, `On-Device LLM`, `Mobile`
- **Repository Link:** [GitHub Repository](https://github.com/seagomezar/flutter_gemma_test)
- **Score Breakdown (Total: 38/50):** Completeness: `6/10` | Complexity: `5/10` | Visual Appeal: `8/10` | Recency: `10/10` | Domain Value: `9/10`
- **Live Deployment:** Status: `OFFLINE` | HTTP Code: `404` | Platform: `None` | URL: [`https://seagomezar.github.io/flutter_gemma_test/`](https://seagomezar.github.io/flutter_gemma_test/)
- **Embeddability Verdict:** Mode: `IMAGE_CAROUSEL` | Is Embeddable: `false` | X-Frame-Options: `None` | CSP: `None`
- **Visual Media:** Count: `5` | Primary Screenshot: `android/app/src/main/res/mipmap-hdpi/ic_launcher.png` | Needs Asset Generation: `false`
- **Architectural Description:** Mobile on-device LLM inference testbed running Google's Gemma models locally on Android devices using Flutter and edge acceleration.

### 📄 Page 6: Enterprise Frontends, Real-Time Fleet Geolocation & Mobility

> **Thematic Focus:** Adaptive Learning Systems, Angular Fleet Tracking, Enterprise ERP & On-Demand Mobility UX  
> **Narrative Strategy:** Page 6 demonstrates deep enterprise and mobility frontend experience: AdaptAI personalized learning management, Angular vehicle fleet mapping with Firebase, the original SGI enterprise ERP, and an on-demand ride-hailing prototype.

#### #21. `adaptai` — AdaptAI Intelligent Learning Management System
- **Category:** **Web App / SaaS** | **Visibility:** 🔒 Private Repository (Confidential / Client)
- **Primary Tech Stack:** `JavaScript`, `React`, `Tailwind CSS`, `Vite`, `Firebase`
- **Repository Link:** *Proprietary (Source Protected)*
- **Score Breakdown (Total: 37/50):** Completeness: `10/10` | Complexity: `4/10` | Visual Appeal: `7/10` | Recency: `8/10` | Domain Value: `8/10`
- **Live Deployment:** Status: `OFFLINE` | HTTP Code: `404` | Platform: `GitHub Pages` | URL: [`https://seagomezar.github.io/adaptai/`](https://seagomezar.github.io/adaptai/)
- **Embeddability Verdict:** Mode: `IMAGE_CAROUSEL` | Is Embeddable: `false` | X-Frame-Options: `None` | CSP: `None`
- **Visual Media:** Count: `5` | Primary Screenshot: `public/logo192.png` | Needs Asset Generation: `false`
- **Architectural Description:** Personalized adaptive learning management web platform built with React, Tailwind CSS, and Firebase cloud authentication.

#### #22. `maps-angular` — Angular Real-Time Geolocation & Fleet Map
- **Category:** **Web App / SaaS** | **Visibility:** 🌐 Public Repository
- **Primary Tech Stack:** `TypeScript`, `Angular`, `Mapping / Geolocation`, `Firebase`
- **Repository Link:** [GitHub Repository](https://github.com/seagomezar/maps-angular)
- **Score Breakdown (Total: 37/50):** Completeness: `8/10` | Complexity: `5/10` | Visual Appeal: `6/10` | Recency: `10/10` | Domain Value: `8/10`
- **Live Deployment:** Status: `OFFLINE` | HTTP Code: `404` | Platform: `None` | URL: [`https://seagomezar.github.io/maps-angular/`](https://seagomezar.github.io/maps-angular/)
- **Embeddability Verdict:** Mode: `IMAGE_CAROUSEL` | Is Embeddable: `false` | X-Frame-Options: `None` | CSP: `None`
- **Visual Media:** Count: `2` | Primary Screenshot: `src/assets/moto.png` | Needs Asset Generation: `false`
- **Architectural Description:** Real-time geolocation, vehicle route tracking, and interactive mapping interface developed with Angular and Firebase integration.

#### #23. `sgi` — SGI Enterprise Resource Planning System
- **Category:** **Web App / SaaS** | **Visibility:** 🔒 Private Repository (Confidential / Client)
- **Primary Tech Stack:** `PHP`, `CodeIgniter`, `MySQL`
- **Repository Link:** *Proprietary (Source Protected)*
- **Score Breakdown (Total: 36/50):** Completeness: `10/10` | Complexity: `2/10` | Visual Appeal: `8/10` | Recency: `9/10` | Domain Value: `7/10`
- **Live Deployment:** Status: `OFFLINE` | HTTP Code: `404` | Platform: `None` | URL: [`https://seagomezar.github.io/sgi/`](https://seagomezar.github.io/sgi/)
- **Embeddability Verdict:** Mode: `IMAGE_CAROUSEL` | Is Embeddable: `false` | X-Frame-Options: `None` | CSP: `None`
- **Visual Media:** Count: `5` | Primary Screenshot: `images/administracion.jpg` | Needs Asset Generation: `false`
- **Architectural Description:** Comprehensive enterprise resource planning (ERP) and internal administration system built with PHP, CodeIgniter, and MySQL.

#### #24. `uber-like-app-angular` — Angular On-Demand Mobility Prototype
- **Category:** **Web App / SaaS** | **Visibility:** 🌐 Public Repository
- **Primary Tech Stack:** `TypeScript`, `Angular`, `Firebase`, `Geolocation`, `Real-time Tracking`
- **Repository Link:** [GitHub Repository](https://github.com/seagomezar/uber-like-app-angular)
- **Score Breakdown (Total: 36/50):** Completeness: `9/10` | Complexity: `5/10` | Visual Appeal: `5/10` | Recency: `10/10` | Domain Value: `7/10`
- **Live Deployment:** Status: `OFFLINE` | HTTP Code: `404` | Platform: `None` | URL: [`https://seagomezar.github.io/uber-like-app-angular/`](https://seagomezar.github.io/uber-like-app-angular/)
- **Embeddability Verdict:** Mode: `IMAGE_CAROUSEL` | Is Embeddable: `false` | X-Frame-Options: `None` | CSP: `None`
- **Visual Media:** Count: `2` | Primary Screenshot: `src/assets/car.png` | Needs Asset Generation: `false`
- **Architectural Description:** On-demand mobility and ride-hailing frontend prototype built with Angular, featuring real-time driver tracking and interactive map interfaces.

### 📄 Page 7: Terminal Games, Algorithmic Synthesis & Multimodal AI

> **Thematic Focus:** Terminal/tmux Simulation Games, VexFlow Music Notation, Flutter IoT Tracking & Gemini Next.js Web  
> **Narrative Strategy:** Page 7 features creative engineering and AI playgrounds: the interactive tmux terminal game, the VexFlow generative melodic composer, PetTracker IoT GPS mobile app, and Gemini Pro Next.js multimodal assistant.

#### #25. `tmux-game` — Interactive Terminal & tmux Simulation Game
- **Category:** **3D / Game / Creative Tech** | **Visibility:** 🌐 Public Repository
- **Primary Tech Stack:** `JavaScript`, `HTML5 Canvas`, `Terminal Simulation`, `Vitest`, `Playwright`
- **Repository Link:** [GitHub Repository](https://github.com/seagomezar/tmux-game)
- **Score Breakdown (Total: 36/50):** Completeness: `8/10` | Complexity: `4/10` | Visual Appeal: `5/10` | Recency: `10/10` | Domain Value: `9/10`
- **Live Deployment:** Status: `LIVE` | HTTP Code: `200` | Platform: `GitHub Pages` | URL: [`https://seagomezar.github.io/tmux-game/`](https://seagomezar.github.io/tmux-game/)
- **Embeddability Verdict:** Mode: `IFRAME_EMBED` | Is Embeddable: `true` | X-Frame-Options: `None` | CSP: `None`
- **Visual Media:** Count: `0` | Primary Screenshot: `None` | Needs Asset Generation: `true`
- **Architectural Description:** Interactive terminal and tmux workspace simulation game running in the browser, featuring keyboard shortcut challenges and vitest/playwright test coverage.

#### #26. `melodic-generator` — Melodic Generator Algorithmic Music Visualizer
- **Category:** **AI / ML / Data Science** | **Visibility:** 🌐 Public Repository
- **Primary Tech Stack:** `TypeScript`, `React`, `VexFlow`, `Tone.js`, `Vite`
- **Repository Link:** [GitHub Repository](https://github.com/seagomezar/melodic-generator)
- **Score Breakdown (Total: 36/50):** Completeness: `7/10` | Complexity: `7/10` | Visual Appeal: `4/10` | Recency: `10/10` | Domain Value: `8/10`
- **Live Deployment:** Status: `LIVE` | HTTP Code: `200` | Platform: `GitHub Pages` | URL: [`https://seagomezar.github.io/melodic-generator/`](https://seagomezar.github.io/melodic-generator/)
- **Embeddability Verdict:** Mode: `IFRAME_EMBED` | Is Embeddable: `true` | X-Frame-Options: `None` | CSP: `None`
- **Visual Media:** Count: `2` | Primary Screenshot: `public/vite.svg` | Needs Asset Generation: `false`
- **Architectural Description:** Generative melody composer and algorithmic music notation visualizer built with TypeScript, React, Vite, and VexFlow sheet music rendering.

#### #27. `PetTracker` — PetTracker IoT GPS Geolocation Mobile App
- **Category:** **Mobile App** | **Visibility:** 🌐 Public Repository
- **Primary Tech Stack:** `Dart`, `Flutter`, `Mobile`, `Geolocation`, `IoT / Tracking`
- **Repository Link:** [GitHub Repository](https://github.com/seagomezar/PetTracker)
- **Score Breakdown (Total: 36/50):** Completeness: `6/10` | Complexity: `5/10` | Visual Appeal: `9/10` | Recency: `8/10` | Domain Value: `8/10`
- **Live Deployment:** Status: `OFFLINE` | HTTP Code: `404` | Platform: `None` | URL: [`https://seagomezar.github.io/PetTracker/`](https://seagomezar.github.io/PetTracker/)
- **Embeddability Verdict:** Mode: `IMAGE_CAROUSEL` | Is Embeddable: `false` | X-Frame-Options: `None` | CSP: `None`
- **Visual Media:** Count: `5` | Primary Screenshot: `android/app/src/main/res/mipmap-hdpi/ic_launcher.png` | Needs Asset Generation: `false`
- **Architectural Description:** IoT pet monitoring and GPS geolocation tracking mobile application built with Flutter and Firebase cloud services.

#### #28. `gemini-pro-nextjs` — Gemini Pro Multimodal Next.js Assistant
- **Category:** **AI / ML / Data Science** | **Visibility:** 🌐 Public Repository
- **Primary Tech Stack:** `TypeScript`, `Next.js`, `Google Gemini Pro API`, `Tailwind CSS`
- **Repository Link:** [GitHub Repository](https://github.com/seagomezar/gemini-pro-nextjs)
- **Score Breakdown (Total: 36/50):** Completeness: `6/10` | Complexity: `8/10` | Visual Appeal: `5/10` | Recency: `8/10` | Domain Value: `9/10`
- **Live Deployment:** Status: `OFFLINE` | HTTP Code: `404` | Platform: `None` | URL: [`https://seagomezar.github.io/gemini-pro-nextjs/`](https://seagomezar.github.io/gemini-pro-nextjs/)
- **Embeddability Verdict:** Mode: `IMAGE_CAROUSEL` | Is Embeddable: `false` | X-Frame-Options: `None` | CSP: `None`
- **Visual Media:** Count: `2` | Primary Screenshot: `public/next.svg` | Needs Asset Generation: `false`
- **Architectural Description:** Full-stack AI assistant and multimodal playground integrating Google Gemini Pro API within a Next.js App Router and Tailwind CSS interface.

### 📄 Page 8: Specialized Utilities, Cloud Storage, PWAs & Browser Extensions

> **Thematic Focus:** Full-Stack Gaming Telemetry, Cloud Virtual Drives, Progressive Web Apps & Chrome AI Extensions  
> **Narrative Strategy:** Page 8 rounds out the 32-project showcase with specialized engineering artifacts: HuoKan gaming telemetry platform, File System Firebase virtual drive, Fiesta PWA event manager, and a custom React/Vite Gemini Chrome browser extension.

#### #29. `huokan-frontend` — HuoKan Full-Stack Gaming Analytics Platform
- **Category:** **Web App / SaaS** | **Visibility:** 🔒 Private Repository (Confidential / Client)
- **Primary Tech Stack:** `TypeScript`, `React`, `Vite`, `Tailwind CSS`, `Python`, `Flask`
- **Repository Link:** *Proprietary (Source Protected)*
- **Score Breakdown (Total: 35/50):** Completeness: `10/10` | Complexity: `2/10` | Visual Appeal: `9/10` | Recency: `7/10` | Domain Value: `7/10`
- **Live Deployment:** Status: `OFFLINE` | HTTP Code: `404` | Platform: `None` | URL: [`https://seagomezar.github.io/huokan-frontend/`](https://seagomezar.github.io/huokan-frontend/)
- **Embeddability Verdict:** Mode: `IMAGE_CAROUSEL` | Is Embeddable: `false` | X-Frame-Options: `None` | CSP: `None`
- **Visual Media:** Count: `2` | Primary Screenshot: `frontend/public/assets/Specs/DPS/Demon Hunter.jpg` | Needs Asset Generation: `false`
- **Architectural Description:** Full-stack gaming analytics and character telemetry platform featuring a React Vite frontend and Python Flask backend.

#### #30. `file-system` — Cloud Virtual Drive & File Management Web App
- **Category:** **Web App / SaaS** | **Visibility:** 🔒 Private Repository (Confidential / Client)
- **Primary Tech Stack:** `TypeScript`, `React`, `Firebase`, `Cloud Storage`, `Vite`
- **Repository Link:** *Proprietary (Source Protected)*
- **Score Breakdown (Total: 35/50):** Completeness: `9/10` | Complexity: `5/10` | Visual Appeal: `6/10` | Recency: `8/10` | Domain Value: `7/10`
- **Live Deployment:** Status: `OFFLINE` | HTTP Code: `404` | Platform: `Firebase` | URL: [`https://data-connect-01.web.app`](https://data-connect-01.web.app)
- **Embeddability Verdict:** Mode: `IMAGE_CAROUSEL` | Is Embeddable: `false` | X-Frame-Options: `None` | CSP: `None`
- **Visual Media:** Count: `3` | Primary Screenshot: `.idx/icon.png` | Needs Asset Generation: `false`
- **Architectural Description:** Cloud file management and virtual drive web application built with React, Vite, and Firebase Cloud Storage.

#### #31. `fiestaPWA` — Fiesta Progressive Web App Event Manager
- **Category:** **Web App / SaaS** | **Visibility:** 🌐 Public Repository
- **Primary Tech Stack:** `React`, `PWA`, `Service Workers`, `Bulma CSS`, `Cloudinary`, `PawJS`
- **Repository Link:** [GitHub Repository](https://github.com/seagomezar/fiestaPWA)
- **Score Breakdown (Total: 35/50):** Completeness: `10/10` | Complexity: `3/10` | Visual Appeal: `9/10` | Recency: `5/10` | Domain Value: `8/10`
- **Live Deployment:** Status: `OFFLINE` | HTTP Code: `404` | Platform: `None` | URL: [`https://seagomezar.github.io/fiestaPWA/`](https://seagomezar.github.io/fiestaPWA/)
- **Embeddability Verdict:** Mode: `IMAGE_CAROUSEL` | Is Embeddable: `false` | X-Frame-Options: `None` | CSP: `None`
- **Visual Media:** Count: `1` | Primary Screenshot: `src/resources/img/seo/home-splash-screen.png` | Needs Asset Generation: `false`
- **Architectural Description:** Progressive Web App (PWA) event invitation and party planning platform with offline caching, push notifications, and responsive Bulma CSS styling.

#### #32. `react-vite-gemini-chrome-extension` — Gemini AI Assistant Chrome Browser Extension
- **Category:** **AI / ML / Data Science** | **Visibility:** 🌐 Public Repository
- **Primary Tech Stack:** `TypeScript`, `React`, `Google Gemini API`, `Chrome Extension`, `Vite`, `Tailwind CSS`
- **Repository Link:** [GitHub Repository](https://github.com/seagomezar/react-vite-gemini-chrome-extension)
- **Score Breakdown (Total: 35/50):** Completeness: `7/10` | Complexity: `7/10` | Visual Appeal: `5/10` | Recency: `8/10` | Domain Value: `8/10`
- **Live Deployment:** Status: `OFFLINE` | HTTP Code: `404` | Platform: `None` | URL: [`https://seagomezar.github.io/react-vite-gemini-chrome-extension/`](https://seagomezar.github.io/react-vite-gemini-chrome-extension/)
- **Embeddability Verdict:** Mode: `IMAGE_CAROUSEL` | Is Embeddable: `false` | X-Frame-Options: `None` | CSP: `None`
- **Visual Media:** Count: `4` | Primary Screenshot: `images/icon-128.png` | Needs Asset Generation: `false`
- **Architectural Description:** Chrome browser extension integrating Google Gemini multimodal AI into the web browsing workflow, built with React, Vite, and Tailwind CSS.

---

## 5. Verified Readiness Assessment Matrix (All 30 Live Deployments)

During the survey phase, active HTTP/HTTPS network probes were executed against candidate URLs extracted from repository manifests, deploy scripts, workflows, and hosting configurations. Below is the comprehensive matrix of all **30 verified live deployments** returning **HTTP 200 OK**, detailing security headers and embeddability outcomes.

| # | Repository Name | Recommendation | Verified Live URL | HTTP Code | Hosting Platform | X-Frame-Options | CSP frame-ancestors | Embeddability Verdict | Assigned Mode |
| :---: | :--- | :---: | :--- | :---: | :--- | :---: | :---: | :---: | :--- |
| 1 | **`AI-Based-Music-Generator-ReactJS`** | 🌟 INCLUDED | [seagomezar.github.io/AI-Based-Music-Generator-ReactJS/](https://seagomezar.github.io/AI-Based-Music-Generator-ReactJS/) | `200` | GitHub Pages | *None* | *None* | `EMBEDDABLE` | `Interactive Live Iframe Embed` |
| 2 | **`Angular-2-Press-Meetup`** | 📁 EXCLUDED | [seagomezar.github.io/Angular-2-Press-Meetup/#/](https://seagomezar.github.io/Angular-2-Press-Meetup/#/) | `200` | GitHub Pages | *None* | *None* | `EMBEDDABLE` | `Interactive Live Iframe Embed` |
| 3 | **`Angular-2-Press-RedditApp`** | 📁 EXCLUDED | [seagomezar.github.io/Angular-2-Press-RedditApp/#/](https://seagomezar.github.io/Angular-2-Press-RedditApp/#/) | `200` | GitHub Pages | *None* | *None* | `EMBEDDABLE` | `Interactive Live Iframe Embed` |
| 4 | **`Ionic4-Music-Starter`** | 📁 EXCLUDED | [seagomezar.github.io/Ionic4-Music-Starter/](https://seagomezar.github.io/Ionic4-Music-Starter/) | `200` | GitHub Pages | *None* | *None* | `EMBEDDABLE` | `Interactive Live Iframe Embed` |
| 5 | **`MapReduceJS`** | 📁 EXCLUDED | [seagomezar.github.io/MapReduceJS/](https://seagomezar.github.io/MapReduceJS/) | `200` | GitHub Pages | *None* | *None* | `EMBEDDABLE` | `Interactive Live Iframe Embed` |
| 6 | **`MapReducePerformanceExperiment`** | 📁 EXCLUDED | [seagomezar.github.io/MapReducePerformanceExperiment/](https://seagomezar.github.io/MapReducePerformanceExperiment/) | `200` | GitHub Pages | *None* | *None* | `EMBEDDABLE` | `Interactive Live Iframe Embed` |
| 7 | **`agendarcitademaquillaje`** | 🌟 INCLUDED | [seagomezar.github.io/agendarcitademaquillaje/](https://seagomezar.github.io/agendarcitademaquillaje/) | `200` | GitHub Pages (GitHub Actions) | *None* | *None* | `EMBEDDABLE` | `Interactive Live Iframe Embed` |
| 8 | **`ai-test-field`** | 📁 EXCLUDED | [seagomezar.github.io/ai-test-field/](https://seagomezar.github.io/ai-test-field/) | `200` | GitHub Pages | *None* | *None* | `EMBEDDABLE` | `Interactive Live Iframe Embed` |
| 9 | **`angular1firebasechat`** | 📁 EXCLUDED | [seagomezar.github.io/angular1firebasechat/](https://seagomezar.github.io/angular1firebasechat/) | `200` | GitHub Pages | *None* | *None* | `EMBEDDABLE` | `Interactive Live Iframe Embed` |
| 10 | **`anthropometry-app`** | 🌟 INCLUDED | [anthropometry.sebastian-gomez.com](https://anthropometry.sebastian-gomez.com) | `200` | GitHub Pages + Custom Domain CNAME | *None* | *None* | `EMBEDDABLE` | `Interactive Live Iframe Embed` |
| 11 | **`autoreserva`** | 📁 EXCLUDED | [autoreserva.vercel.app/](https://autoreserva.vercel.app/) | `200` | Vercel | *None* | *None* | `EMBEDDABLE` | `Interactive Live Iframe Embed` |
| 12 | **`basketball-tests`** | 📁 EXCLUDED | [basketball-tests.sebastian-gomez.com](https://basketball-tests.sebastian-gomez.com) | `200` | GitHub Pages + Custom Domain CNAME | *None* | *None* | `EMBEDDABLE` | `Interactive Live Iframe Embed` |
| 13 | **`booking-shopify-app`** | 📁 EXCLUDED | [booking-shopify-app-962952534311.us-central1.run.app/health](https://booking-shopify-app-962952534311.us-central1.run.app/health) | `200` | Google Cloud Run | *None* | *None* | `EMBEDDABLE` | `Static Architecture Card` |
| 14 | **`djintheedge`** | 📁 EXCLUDED | [seagomezar.github.io/djintheedge/](https://seagomezar.github.io/djintheedge/) | `200` | GitHub Pages (GitHub Actions) | *None* | *None* | `EMBEDDABLE` | `Interactive Live Iframe Embed` |
| 15 | **`family-wallet`** | 🌟 INCLUDED | [seagomezar.github.io/family-wallet/](https://seagomezar.github.io/family-wallet/) | `200` | GitHub Pages (GitHub Actions) | *None* | *None* | `EMBEDDABLE` | `Interactive Live Iframe Embed` |
| 16 | **`firebase-press`** | 📁 EXCLUDED | [seagomezar.github.io/firebase-press/#/](https://seagomezar.github.io/firebase-press/#/) | `200` | GitHub Pages | *None* | *None* | `EMBEDDABLE` | `Interactive Live Iframe Embed` |
| 17 | **`flutemodes`** | 🌟 INCLUDED | [seagomezar.github.io/flutemodes/](https://seagomezar.github.io/flutemodes/) | `200` | GitHub Pages | *None* | *None* | `EMBEDDABLE` | `Interactive Live Iframe Embed` |
| 18 | **`gdgdevfestmed`** | 📁 EXCLUDED | [hoverboard-master.firebaseapp.com](https://hoverboard-master.firebaseapp.com) | `200` | Firebase (Reference) | `sameorigin` | *None* | `BLOCKED_XFO` | `Image Carousel / Interactive Gallery` |
| 19 | **`harmony-assistant`** | 📁 EXCLUDED | [harmony-assistant.onrender.com/](https://harmony-assistant.onrender.com/) | `200` | Render (Shopify App) | *None* | *None* | `EMBEDDABLE` | `Interactive Live Iframe Embed` |
| 20 | **`liteRT-LM`** | 🌟 INCLUDED | [seagomezar.github.io/liteRT-LM/](https://seagomezar.github.io/liteRT-LM/) | `200` | GitHub Pages (GitHub Actions) | *None* | *None* | `EMBEDDABLE` | `Interactive Live Iframe Embed` |
| 21 | **`melodic-generator`** | 🌟 INCLUDED | [seagomezar.github.io/melodic-generator/](https://seagomezar.github.io/melodic-generator/) | `200` | GitHub Pages (GitHub Actions) | *None* | *None* | `EMBEDDABLE` | `Interactive Live Iframe Embed` |
| 22 | **`music-journal-app`** | 🌟 INCLUDED | [seagomezar.github.io/music-journal-app/](https://seagomezar.github.io/music-journal-app/) | `200` | GitHub Pages (GitHub Actions) | *None* | *None* | `EMBEDDABLE` | `Interactive Live Iframe Embed` |
| 23 | **`ngBeautyDialogs`** | 📁 EXCLUDED | [seagomezar.github.io/ngBeautyDialogs/dist/](https://seagomezar.github.io/ngBeautyDialogs/dist/) | `200` | GitHub Pages | *None* | *None* | `EMBEDDABLE` | `Interactive Live Iframe Embed` |
| 24 | **`obs_assets`** | 📁 EXCLUDED | [seagomezar.github.io/obs_assets/](https://seagomezar.github.io/obs_assets/) | `200` | GitHub Pages (GitHub Actions) | *None* | *None* | `EMBEDDABLE` | `Interactive Live Iframe Embed` |
| 25 | **`rappitest`** | 📁 EXCLUDED | [seagomezar.github.io/rappitest/](https://seagomezar.github.io/rappitest/) | `200` | GitHub Pages | *None* | *None* | `EMBEDDABLE` | `Interactive Live Iframe Embed` |
| 26 | **`redditappstepbystep`** | 📁 EXCLUDED | [seagomezar.github.io/Angular-2-Press-RedditApp/#/](https://seagomezar.github.io/Angular-2-Press-RedditApp/#/) | `200` | GitHub Pages (Target Demo) | *None* | *None* | `EMBEDDABLE` | `Interactive Live Iframe Embed` |
| 27 | **`rigare`** | 🌟 INCLUDED | [rigare.vercel.app/](https://rigare.vercel.app/) | `200` | Vercel | *None* | *None* | `EMBEDDABLE` | `Interactive Live Iframe Embed` |
| 28 | **`sebastian-gomez-site`** | 📁 EXCLUDED | [www.sebastian-gomez.com/](https://www.sebastian-gomez.com/) | `200` | Vercel | *None* | *None* | `EMBEDDABLE` | `Interactive Live Iframe Embed` |
| 29 | **`sonoma-racing-coach`** | 🌟 INCLUDED | [apexai-812524149286.us-central1.run.app/events/telemetry](https://apexai-812524149286.us-central1.run.app/events/telemetry) | `200` | Google Cloud Run | *None* | *None* | `EMBEDDABLE` | `Static Architecture Card` |
| 30 | **`tmux-game`** | 🌟 INCLUDED | [seagomezar.github.io/tmux-game/](https://seagomezar.github.io/tmux-game/) | `200` | GitHub Pages (GitHub Actions) | *None* | *None* | `EMBEDDABLE` | `Interactive Live Iframe Embed` |

### 5.1 Embeddability Header Analysis Summary
1. **GitHub Pages & Vercel Embeddability:** By default, neither GitHub Pages (`*.github.io`) nor Vercel emit `X-Frame-Options` or restrictive `Content-Security-Policy: frame-ancestors` headers. Additionally, GitHub Pages provides `Access-Control-Allow-Origin: *`. All 27 live frontend apps can be securely embedded inside `<iframe>` containers with proper sandbox attributes.
2. **Blocked Deployments:** Exactly 1 live deployment (`gdgdevfestmed` on Firebase) emitted `X-Frame-Options: sameorigin`, correctly triggering the fallback to `IMAGE_CAROUSEL` mode.
3. **Cloud Run Backend Microservices:** `sonoma-racing-coach` (`/events/telemetry`) and `booking-shopify-app` (`/health`) return HTTP 200 JSON/SSE streams and are appropriately assigned to `STATIC_CARD` mode.

---

## 6. Complete Inventory Table of Excluded Repositories (105 Repositories)

To provide 100% transparency into the curation process, all **105 filtered repositories** are cataloged below with their primary language, repository category, and explicit exclusion rationale.

| # | Repository Name | Visibility | Category | Primary Tech | Files | Score | Tested Status | Exclusion Rationale |
| :---: | :--- | :---: | :--- | :--- | :---: | :---: | :---: | :--- |
| 1 | **`sebastian-gomez-site`** | 🌐 Public | Self-Referential Target Site | JavaScript, Next.js | 37/50 | LIVE (200) | Self-referential: Target portfolio website itself; cannot be featured as an external portfolio item. |
| 2 | **`Ionic4-Music-Starter`** | 🌐 Public | Template / Starter | TypeScript, Angular | 35/50 | LIVE (200) | Starter boilerplate (Ionic4-Music-Starter): Generic scaffold template lacking distinctive business logic or domain implementation. |
| 3 | **`caba-app`** | 🌐 Public | Template / Starter | TypeScript, Next.js | 35/50 | OFFLINE (404) | Starter boilerplate (caba-app): Generic scaffold template lacking distinctive business logic or domain implementation. |
| 4 | **`harmony-assistant`** | 🌐 Public | Web App / SaaS | TypeScript, React | 34/50 | LIVE (200) | Below portfolio threshold (Score: 34/50, 31 code files): Limited visual assets, historical codebase, or narrow utility better kept in repository archives. |
| 5 | **`vexflowexamples`** | 🌐 Public | Web App / SaaS | JavaScript, React | 34/50 | OFFLINE (404) | Below portfolio threshold (Score: 34/50, 11 code files): Limited visual assets, historical codebase, or narrow utility better kept in repository archives. |
| 6 | **`generic-marketplace`** | 🌐 Public | Web App / SaaS | TypeScript, React | 33/50 | OFFLINE (404) | Below portfolio threshold (Score: 33/50, 66 code files): Limited visual assets, historical codebase, or narrow utility better kept in repository archives. |
| 7 | **`food_scrapper`** | 🌐 Public | Web App / SaaS | JavaScript | 33/50 | OFFLINE (404) | Below portfolio threshold (Score: 33/50, 26 code files): Limited visual assets, historical codebase, or narrow utility better kept in repository archives. |
| 8 | **`react-vite-chrome-extension`** | 🌐 Public | Web App / SaaS | TypeScript, React | 33/50 | OFFLINE (404) | Below portfolio threshold (Score: 33/50, 20 code files): Limited visual assets, historical codebase, or narrow utility better kept in repository archives. |
| 9 | **`crecere-greetings-agent`** | 🔒 Private | AI / ML / Data Science | Python | 33/50 | OFFLINE (404) | Below portfolio threshold (Score: 33/50, 17 code files): Limited visual assets, historical codebase, or narrow utility better kept in repository archives. |
| 10 | **`crecere-identity-validation-agent`** | 🔒 Private | AI / ML / Data Science | Python | 33/50 | OFFLINE (404) | Below portfolio threshold (Score: 33/50, 17 code files): Limited visual assets, historical codebase, or narrow utility better kept in repository archives. |
| 11 | **`crecere-negotiation-agent`** | 🔒 Private | AI / ML / Data Science | Python | 33/50 | OFFLINE (404) | Below portfolio threshold (Score: 33/50, 17 code files): Limited visual assets, historical codebase, or narrow utility better kept in repository archives. |
| 12 | **`gdgdevfestmed`** | 🌐 Public | Web App / SaaS | JavaScript | 32/50 | LIVE (200) | Below portfolio threshold (Score: 32/50, 87 code files): Limited visual assets, historical codebase, or narrow utility better kept in repository archives. |
| 13 | **`angular-week`** | 🌐 Public | Web App / SaaS | TypeScript, Angular | 32/50 | OFFLINE (404) | Below portfolio threshold (Score: 32/50, 73 code files): Limited visual assets, historical codebase, or narrow utility better kept in repository archives. |
| 14 | **`druckey`** | 🔒 Private | AI / ML / Data Science | TypeScript, Angular | 32/50 | OFFLINE (404) | Below portfolio threshold (Score: 32/50, 55 code files): Limited visual assets, historical codebase, or narrow utility better kept in repository archives. |
| 15 | **`awsamplifyapp`** | 🌐 Public | Web App / SaaS | JavaScript, React | 32/50 | OFFLINE (404) | Below portfolio threshold (Score: 32/50, 20 code files): Limited visual assets, historical codebase, or narrow utility better kept in repository archives. |
| 16 | **`obs_assets`** | 🌐 Public | Backend / API / Cloud | JavaScript, Express | 32/50 | LIVE (200) | Below portfolio threshold (Score: 32/50, 15 code files): Limited visual assets, historical codebase, or narrow utility better kept in repository archives. |
| 17 | **`djintheedge`** | 🌐 Public | Web App / SaaS | JavaScript, Vite | 32/50 | LIVE (200) | Below portfolio threshold (Score: 32/50, 12 code files): Limited visual assets, historical codebase, or narrow utility better kept in repository archives. |
| 18 | **`react-firestore-tone`** | 🌐 Public | AI / ML / Data Science | JavaScript, React | 32/50 | OFFLINE (404) | Below portfolio threshold (Score: 32/50, 11 code files): Limited visual assets, historical codebase, or narrow utility better kept in repository archives. |
| 19 | **`carrera-observacion-theodoro-hertzl-deportes`** | 🌐 Public | Web App / SaaS | JavaScript, Next.js | 32/50 | OFFLINE (404) | Below portfolio threshold (Score: 32/50, 10 code files): Limited visual assets, historical codebase, or narrow utility better kept in repository archives. |
| 20 | **`ear-training`** | 🌐 Public | AI / ML / Data Science | JavaScript, React | 32/50 | OFFLINE (404) | Below portfolio threshold (Score: 32/50, 10 code files): Limited visual assets, historical codebase, or narrow utility better kept in repository archives. |
| 21 | **`booking-shopify-app`** | 🔒 Private | Backend / API / Cloud | JavaScript, Express | 31/50 | LIVE (200) | Below portfolio threshold (Score: 31/50, 133 code files): Limited visual assets, historical codebase, or narrow utility better kept in repository archives. |
| 22 | **`recomiendo-en-casa`** | 🔒 Private | Web App / SaaS | TypeScript, Angular | 31/50 | OFFLINE (404) | Below portfolio threshold (Score: 31/50, 65 code files): Limited visual assets, historical codebase, or narrow utility better kept in repository archives. |
| 23 | **`springboot-curso-eafit`** | 🌐 Public | Academic / Course / Exercise | Java, Spring Boot | 31/50 | OFFLINE (404) | Course exercise / tutorial / meetup talk (springboot-curso-eafit): Educational practice exercise lacking standalone commercial or production value. |
| 24 | **`ionic-tdd-pwa`** | 🌐 Public | Web App / SaaS | TypeScript, Angular | 31/50 | OFFLINE (404) | Below portfolio threshold (Score: 31/50, 24 code files): Limited visual assets, historical codebase, or narrow utility better kept in repository archives. |
| 25 | **`Music-Generator-Angular`** | 🌐 Public | AI / ML / Data Science | TypeScript, Angular | 31/50 | OFFLINE (404) | Below portfolio threshold (Score: 31/50, 21 code files): Limited visual assets, historical codebase, or narrow utility better kept in repository archives. |
| 26 | **`rigare-web`** | 🌐 Public | Web App / SaaS | TypeScript, Next.js | 31/50 | OFFLINE (404) | Below portfolio threshold (Score: 31/50, 6 code files): Limited visual assets, historical codebase, or narrow utility better kept in repository archives. |
| 27 | **`perkify_admin`** | 🔒 Private | Web App / SaaS | PHP, CodeIgniter | 30/50 | OFFLINE (404) | Below portfolio threshold (Score: 30/50, 1001 code files): Limited visual assets, historical codebase, or narrow utility better kept in repository archives. |
| 28 | **`budget-app`** | 🌐 Public | Template / Starter | JavaScript, React | 30/50 | OFFLINE (404) | Starter boilerplate (budget-app): Generic scaffold template lacking distinctive business logic or domain implementation. |
| 29 | **`learning-bulljs`** | 🌐 Public | Web App / SaaS | JavaScript | 30/50 | OFFLINE (404) | Below portfolio threshold (Score: 30/50, 8 code files): Limited visual assets, historical codebase, or narrow utility better kept in repository archives. |
| 30 | **`perkify`** | 🔒 Private | Web App / SaaS | JavaScript | 29/50 | OFFLINE (404) | Below portfolio threshold (Score: 29/50, 145 code files): Limited visual assets, historical codebase, or narrow utility better kept in repository archives. |
| 31 | **`harmony-adk-agent`** | 🔒 Private | Backend / API / Cloud | Python, FastAPI | 28/50 | OFFLINE (404) | Below portfolio threshold (Score: 28/50, 15 code files): Limited visual assets, historical codebase, or narrow utility better kept in repository archives. |
| 32 | **`ADK-Blog-Posts`** | 🌐 Public | Academic / Course / Exercise | Python / Jupyter | 28/50 | OFFLINE (404) | Course exercise / tutorial / meetup talk (ADK-Blog-Posts): Educational practice exercise lacking standalone commercial or production value. |
| 33 | **`ai-test-field`** | 🌐 Public | Academic / Course / Exercise | TypeScript, React | 28/50 | LIVE (200) | Course exercise / tutorial / meetup talk (ai-test-field): Educational practice exercise lacking standalone commercial or production value. |
| 34 | **`spring-boot-api-rest-with-open-api`** | 🌐 Public | Backend / API / Cloud | Java, Spring Boot | 28/50 | OFFLINE (404) | Below portfolio threshold (Score: 28/50, 10 code files): Limited visual assets, historical codebase, or narrow utility better kept in repository archives. |
| 35 | **`autoreserva`** | 🔒 Private | Backend / API / Cloud | JavaScript, Express | 28/50 | LIVE (200) | Below portfolio threshold (Score: 28/50, 9 code files): Limited visual assets, historical codebase, or narrow utility better kept in repository archives. |
| 36 | **`basketball-tests`** | 🌐 Public | Academic / Course / Exercise | JavaScript, React | 27/50 | LIVE (200) | Course exercise / tutorial / meetup talk (basketball-tests): Educational practice exercise lacking standalone commercial or production value. |
| 37 | **`ng-col-angular-ut`** | 🌐 Public | Web App / SaaS | TypeScript, Angular | 27/50 | OFFLINE (404) | Below portfolio threshold (Score: 27/50, 16 code files): Limited visual assets, historical codebase, or narrow utility better kept in repository archives. |
| 38 | **`chrome-extension-workshop`** | 🌐 Public | Template / Starter | JavaScript, React | 27/50 | OFFLINE (404) | Starter boilerplate (chrome-extension-workshop): Generic scaffold template lacking distinctive business logic or domain implementation. |
| 39 | **`recicla-medellin`** | 🌐 Public | Template / Starter | TypeScript, Angular | 26/50 | OFFLINE (404) | Starter boilerplate (recicla-medellin): Generic scaffold template lacking distinctive business logic or domain implementation. |
| 40 | **`my-app`** | 🌐 Public | Template / Starter | JavaScript, React | 26/50 | OFFLINE (404) | Starter boilerplate (my-app): Generic scaffold template lacking distinctive business logic or domain implementation. |
| 41 | **`springboot-online-store`** | 🌐 Public | Backend / API / Cloud | Java, Spring Boot | 26/50 | OFFLINE (404) | Below portfolio threshold (Score: 26/50, 7 code files): Limited visual assets, historical codebase, or narrow utility better kept in repository archives. |
| 42 | **`crecere-tag-system`** | 🔒 Private | AI / ML / Data Science | JavaScript, Express | 26/50 | OFFLINE (404) | Below portfolio threshold (Score: 26/50, 1 code files): Limited visual assets, historical codebase, or narrow utility better kept in repository archives. |
| 43 | **`CodeIgniter_bootstrap`** | 🌐 Public | Web App / SaaS | General | 25/50 | OFFLINE (404) | Below portfolio threshold (Score: 25/50, 183 code files): Limited visual assets, historical codebase, or narrow utility better kept in repository archives. |
| 44 | **`Angular-2-Press-RedditApp`** | 🌐 Public | Academic / Course / Exercise | JavaScript | 25/50 | LIVE (200) | Course exercise / tutorial / meetup talk (Angular-2-Press-RedditApp): Educational practice exercise lacking standalone commercial or production value. |
| 45 | **`firebase-press`** | 🌐 Public | Academic / Course / Exercise | JavaScript | 25/50 | LIVE (200) | Course exercise / tutorial / meetup talk (firebase-press): Educational practice exercise lacking standalone commercial or production value. |
| 46 | **`clase-evolucion-web`** | 🌐 Public | Academic / Course / Exercise | General | 25/50 | OFFLINE (404) | Course exercise / tutorial / meetup talk (clase-evolucion-web): Educational practice exercise lacking standalone commercial or production value. |
| 47 | **`angular-item-store`** | 🌐 Public | Web App / SaaS | HTML / CSS / JavaScript | 25/50 | OFFLINE (404) | Below portfolio threshold (Score: 25/50, 10 code files): Limited visual assets, historical codebase, or narrow utility better kept in repository archives. |
| 48 | **`cursoSpringBoot`** | 🌐 Public | Academic / Course / Exercise | Java, Spring Boot | 25/50 | OFFLINE (404) | Course exercise / tutorial / meetup talk (cursoSpringBoot): Educational practice exercise lacking standalone commercial or production value. |
| 49 | **`java-servlets-starter`** | 🌐 Public | Template / Starter | Java, Maven | 25/50 | OFFLINE (404) | Starter boilerplate (java-servlets-starter): Generic scaffold template lacking distinctive business logic or domain implementation. |
| 50 | **`meetup-react`** | 🔒 Private | Academic / Course / Exercise | TypeScript, Next.js | 24/50 | OFFLINE (404) | Course exercise / tutorial / meetup talk (meetup-react): Educational practice exercise lacking standalone commercial or production value. |
| 51 | **`goparaprincipiantes`** | 🌐 Public | Web App / SaaS | General | 24/50 | OFFLINE (404) | Below portfolio threshold (Score: 24/50, 6 code files): Limited visual assets, historical codebase, or narrow utility better kept in repository archives. |
| 52 | **`ngBeautyDialogs`** | 🌐 Public | Web App / SaaS | JavaScript | 24/50 | LIVE (200) | Below portfolio threshold (Score: 24/50, 6 code files): Limited visual assets, historical codebase, or narrow utility better kept in repository archives. |
| 53 | **`gemini-cli-workshop`** | 🌐 Public | AI / ML / Data Science | General | 24/50 | OFFLINE (404) | Below portfolio threshold (Score: 24/50, 1 code files): Limited visual assets, historical codebase, or narrow utility better kept in repository archives. |
| 54 | **`cursoPhonegap`** | 🌐 Public | Academic / Course / Exercise | General | 23/50 | OFFLINE (404) | Course exercise / tutorial / meetup talk (cursoPhonegap): Educational practice exercise lacking standalone commercial or production value. |
| 55 | **`Angular-2-Press-Meetup`** | 🌐 Public | Academic / Course / Exercise | JavaScript | 23/50 | LIVE (200) | Course exercise / tutorial / meetup talk (Angular-2-Press-Meetup): Educational practice exercise lacking standalone commercial or production value. |
| 56 | **`workshop-ionic-tdd-pwa`** | 🌐 Public | Academic / Course / Exercise | TypeScript, Angular | 23/50 | OFFLINE (404) | Course exercise / tutorial / meetup talk (workshop-ionic-tdd-pwa): Educational practice exercise lacking standalone commercial or production value. |
| 57 | **`workshop-unit-test-angular`** | 🌐 Public | Academic / Course / Exercise | TypeScript, Angular | 23/50 | OFFLINE (404) | Course exercise / tutorial / meetup talk (workshop-unit-test-angular): Educational practice exercise lacking standalone commercial or production value. |
| 58 | **`python_chess_api`** | 🌐 Public | AI / ML / Data Science | Python, Flask | 23/50 | OFFLINE (404) | Below portfolio threshold (Score: 23/50, 1 code files): Limited visual assets, historical codebase, or narrow utility better kept in repository archives. |
| 59 | **`perkify_backend`** | 🔒 Private | Backend / API / Cloud | PHP, Laravel | 22/50 | OFFLINE (404) | Below portfolio threshold (Score: 22/50, 38 code files): Limited visual assets, historical codebase, or narrow utility better kept in repository archives. |
| 60 | **`SpringBootTutorial02`** | 🔒 Private | Academic / Course / Exercise | Java, Spring Boot | 22/50 | OFFLINE (404) | Course exercise / tutorial / meetup talk (SpringBootTutorial02): Educational practice exercise lacking standalone commercial or production value. |
| 61 | **`Clase-Docker`** | 🌐 Public | Academic / Course / Exercise | General | 22/50 | OFFLINE (404) | Course exercise / tutorial / meetup talk (Clase-Docker): Educational practice exercise lacking standalone commercial or production value. |
| 62 | **`angular1firebasechat`** | 🌐 Public | Web App / SaaS | JavaScript | 22/50 | LIVE (200) | Below portfolio threshold (Score: 22/50, 7 code files): Limited visual assets, historical codebase, or narrow utility better kept in repository archives. |
| 63 | **`nextjs-sample-app`** | 🌐 Public | Template / Starter | JavaScript, Next.js | 22/50 | OFFLINE (404) | Starter boilerplate (nextjs-sample-app): Generic scaffold template lacking distinctive business logic or domain implementation. |
| 64 | **`react-sample-app`** | 🌐 Public | Template / Starter | JavaScript, React | 22/50 | OFFLINE (404) | Starter boilerplate (react-sample-app): Generic scaffold template lacking distinctive business logic or domain implementation. |
| 65 | **`CursoAndroid`** | 🌐 Public | Academic / Course / Exercise | General | 21/50 | OFFLINE (404) | Course exercise / tutorial / meetup talk (CursoAndroid): Educational practice exercise lacking standalone commercial or production value. |
| 66 | **`cluster-api-provider-docker`** | 🌐 Public | Backend / API / Cloud | General | 21/50 | OFFLINE (404) | Below portfolio threshold (Score: 21/50, 8 code files): Limited visual assets, historical codebase, or narrow utility better kept in repository archives. |
| 67 | **`SpringBootTutorial01`** | 🔒 Private | Academic / Course / Exercise | Java, Spring Boot | 21/50 | OFFLINE (404) | Course exercise / tutorial / meetup talk (SpringBootTutorial01): Educational practice exercise lacking standalone commercial or production value. |
| 68 | **`angularSpeechToText`** | 🌐 Public | Web App / SaaS | JavaScript | 21/50 | OFFLINE (404) | Below portfolio threshold (Score: 21/50, 6 code files): Limited visual assets, historical codebase, or narrow utility better kept in repository archives. |
| 69 | **`python-function`** | 🌐 Public | Web App / SaaS | Python | 21/50 | OFFLINE (404) | Below portfolio threshold (Score: 21/50, 1 code files): Limited visual assets, historical codebase, or narrow utility better kept in repository archives. |
| 70 | **`workshop-pwa`** | 🌐 Public | Academic / Course / Exercise | TypeScript, Angular | 20/50 | OFFLINE (404) | Course exercise / tutorial / meetup talk (workshop-pwa): Educational practice exercise lacking standalone commercial or production value. |
| 71 | **`PWA-with-OnsenUI`** | 🌐 Public | Backend / API / Cloud | JavaScript, Express | 20/50 | OFFLINE (404) | Below portfolio threshold (Score: 20/50, 11 code files): Limited visual assets, historical codebase, or narrow utility better kept in repository archives. |
| 72 | **`chrome-extension-workshop-live`** | 🌐 Public | Academic / Course / Exercise | HTML / CSS / JavaScript | 20/50 | OFFLINE (404) | Course exercise / tutorial / meetup talk (chrome-extension-workshop-live): Educational practice exercise lacking standalone commercial or production value. |
| 73 | **`automation`** | 🌐 Public | Web App / SaaS | General | 20/50 | OFFLINE (404) | Below portfolio threshold (Score: 20/50, 2 code files): Limited visual assets, historical codebase, or narrow utility better kept in repository archives. |
| 74 | **`ionchart`** | 🌐 Public | Web App / SaaS | TypeScript, React | 20/50 | OFFLINE (404) | Below portfolio threshold (Score: 20/50, 1 code files): Limited visual assets, historical codebase, or narrow utility better kept in repository archives. |
| 75 | **`testing-component`** | 🔒 Private | Web App / SaaS | JavaScript | 20/50 | OFFLINE (404) | Below portfolio threshold (Score: 20/50, 1 code files): Limited visual assets, historical codebase, or narrow utility better kept in repository archives. |
| 76 | **`MapReducePerformanceExperiment`** | 🌐 Public | Web App / SaaS | HTML / CSS / JavaScript | 19/50 | LIVE (200) | Below portfolio threshold (Score: 19/50, 7 code files): Limited visual assets, historical codebase, or narrow utility better kept in repository archives. |
| 77 | **`rappitest`** | 🌐 Public | Academic / Course / Exercise | JavaScript | 18/50 | LIVE (200) | Course exercise / tutorial / meetup talk (rappitest): Educational practice exercise lacking standalone commercial or production value. |
| 78 | **`redditappstepbystep`** | 🌐 Public | Academic / Course / Exercise | TypeScript | 18/50 | LIVE (200) | Course exercise / tutorial / meetup talk (redditappstepbystep): Educational practice exercise lacking standalone commercial or production value. |
| 79 | **`devfest-vision`** | 🌐 Public | Backend / API / Cloud | JavaScript, Express | 18/50 | OFFLINE (404) | Below portfolio threshold (Score: 18/50, 4 code files): Limited visual assets, historical codebase, or narrow utility better kept in repository archives. |
| 80 | **`mi-presentacion`** | 🌐 Public | Academic / Course / Exercise | HTML / CSS / JavaScript | 17/50 | OFFLINE (404) | Course exercise / tutorial / meetup talk (mi-presentacion): Educational practice exercise lacking standalone commercial or production value. |
| 81 | **`meetupFirestore`** | 🌐 Public | Academic / Course / Exercise | TypeScript, Angular | 17/50 | OFFLINE (404) | Course exercise / tutorial / meetup talk (meetupFirestore): Educational practice exercise lacking standalone commercial or production value. |
| 82 | **`clase-en-vivo-springboot`** | 🌐 Public | Academic / Course / Exercise | Java, Spring Boot | 17/50 | OFFLINE (404) | Course exercise / tutorial / meetup talk (clase-en-vivo-springboot): Educational practice exercise lacking standalone commercial or production value. |
| 83 | **`MapReduceJS`** | 🌐 Public | Web App / SaaS | HTML / CSS / JavaScript | 16/50 | LIVE (200) | Below portfolio threshold (Score: 16/50, 3 code files): Limited visual assets, historical codebase, or narrow utility better kept in repository archives. |
| 84 | **`piano-tonejs`** | 🌐 Public | Web App / SaaS | HTML / CSS / JavaScript | 15/50 | OFFLINE (404) | Below portfolio threshold (Score: 15/50, 3 code files): Limited visual assets, historical codebase, or narrow utility better kept in repository archives. |
| 85 | **`repaso-intento-1`** | 🌐 Public | Academic / Course / Exercise | HTML / CSS / JavaScript | 15/50 | OFFLINE (404) | Course exercise / tutorial / meetup talk (repaso-intento-1): Educational practice exercise lacking standalone commercial or production value. |
| 86 | **`repaso`** | 🌐 Public | Academic / Course / Exercise | HTML / CSS / JavaScript | 15/50 | OFFLINE (404) | Course exercise / tutorial / meetup talk (repaso): Educational practice exercise lacking standalone commercial or production value. |
| 87 | **`home-banking-acamica`** | 🌐 Public | Academic / Course / Exercise | JavaScript, Express | 12/50 | OFFLINE (404) | Course exercise / tutorial / meetup talk (home-banking-acamica): Educational practice exercise lacking standalone commercial or production value. |
| 88 | **`claseejemploacamica`** | 🌐 Public | Academic / Course / Exercise | HTML / CSS / JavaScript | 11/50 | OFFLINE (404) | Course exercise / tutorial / meetup talk (claseejemploacamica): Educational practice exercise lacking standalone commercial or production value. |
| 89 | **`angularfiremeetup`** | 🌐 Public | Academic / Course / Exercise | General | 9/50 | OFFLINE (404) | Course exercise / tutorial / meetup talk (angularfiremeetup): Educational practice exercise lacking standalone commercial or production value. |
| 90 | **`firebase-meetup-rater-app`** | 🌐 Public | Academic / Course / Exercise | General | 9/50 | OFFLINE (404) | Course exercise / tutorial / meetup talk (firebase-meetup-rater-app): Educational practice exercise lacking standalone commercial or production value. |
| 91 | **`key-value-express`** | 🌐 Public | Empty / Stub | General | 9/50 | OFFLINE (404) | Empty repository (0 code files): Contains only git metadata or non-code files; ineligible for portfolio showcase. |
| 92 | **`bookbites`** | 🌐 Public | Empty / Stub | General | 8/50 | OFFLINE (404) | Empty repository (0 code files): Contains only git metadata or non-code files; ineligible for portfolio showcase. |
| 93 | **`python-accelerator`** | 🌐 Public | Empty / Stub | General | 7/50 | OFFLINE (404) | Empty repository (0 code files): Contains only git metadata or non-code files; ineligible for portfolio showcase. |
| 94 | **`test-huokan`** | 🌐 Public | Empty / Stub | General | 7/50 | OFFLINE (404) | Empty repository (0 code files): Contains only git metadata or non-code files; ineligible for portfolio showcase. |
| 95 | **`Exercises-Compiled-Database`** | 🌐 Public | Empty / Stub | General | 6/50 | OFFLINE (404) | Empty repository (0 code files): Contains only git metadata or non-code files; ineligible for portfolio showcase. |
| 96 | **`node-express-test`** | 🌐 Public | Empty / Stub | General | 6/50 | OFFLINE (404) | Empty repository (0 code files): Contains only git metadata or non-code files; ineligible for portfolio showcase. |
| 97 | **`nutrition-database`** | 🌐 Public | Empty / Stub | General | 6/50 | OFFLINE (404) | Empty repository (0 code files): Contains only git metadata or non-code files; ineligible for portfolio showcase. |
| 98 | **`tanzu-gitops-delivery-config`** | 🌐 Public | Empty / Stub | General | 6/50 | OFFLINE (404) | Empty repository (0 code files): Contains only git metadata or non-code files; ineligible for portfolio showcase. |
| 99 | **`tap-testing-catalog`** | 🌐 Public | Empty / Stub | General | 6/50 | OFFLINE (404) | Empty repository (0 code files): Contains only git metadata or non-code files; ineligible for portfolio showcase. |
| 100 | **`analisis-tendencias-desarrolladores`** | 🌐 Public | Empty / Stub | Python / Jupyter | 4/50 | OFFLINE (404) | Empty repository (0 code files): Contains only git metadata or non-code files; ineligible for portfolio showcase. |
| 101 | **`console-log-plugin`** | 🌐 Public | Empty / Stub | General | 4/50 | OFFLINE (404) | Empty repository (0 code files): Contains only git metadata or non-code files; ineligible for portfolio showcase. |
| 102 | **`exposicion-factory-pattern`** | 🌐 Public | Empty / Stub | General | 4/50 | OFFLINE (404) | Empty repository (0 code files): Contains only git metadata or non-code files; ineligible for portfolio showcase. |
| 103 | **`platzi-ionic4-spotify`** | 🌐 Public | Empty / Stub | General | 3/50 | OFFLINE (404) | Empty repository (0 code files): Contains only git metadata or non-code files; ineligible for portfolio showcase. |
| 104 | **`cartasdeamor`** | 🌐 Public | Empty / Stub | General | 2/50 | OFFLINE (404) | Empty repository (0 code files): Contains only git metadata or non-code files; ineligible for portfolio showcase. |
| 105 | **`HolaMundoWeb`** | 🔒 Private | Empty / Stub | General | 2/50 | OFFLINE (404) | Empty repository (0 code files): Contains only git metadata or non-code files; ineligible for portfolio showcase. |

---

## 7. Quality Assurance & Independent Verification

1. **Dataset Consistency:** All 137 repositories in `docs/portfolio/projects_catalog.json` match this specification with 100% mathematical parity.
2. **Privacy Enforcement:** Confirmed that all 26 private repositories have `repoUrl: null` to protect proprietary and client Intellectual Property.
3. **Pagination Integrity:** Confirmed that exactly 32 projects are grouped into 8 pages of 4 projects each.
4. **Readiness Parity:** Confirmed that all 30 live endpoints return verified HTTP 200 status codes.

*Document authorized and generated by teamwork_preview_worker_m1.*
