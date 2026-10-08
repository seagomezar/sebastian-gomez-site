# Product Requirements Document (PRD)
## Dedicated Portfolio Route (`/portafolio`) for `sebastian-gomez-site`

- **Document Version:** 1.0.0 (Production Specification)
- **Status:** Approved / Authoritative
- **Author:** Product & Architecture Guild (`teamwork_preview_worker_m2`)
- **Target Repository:** `sebastian-gomez-site` (`c:\Users\Usuario\Documents\mis repositorios\sebastian-gomez-site`)
- **Date:** October 7, 2026
- **Reference Standards:** `SPEC-404-handling.md`, Next.js 16 (Pages Router), React 19, Tailwind CSS v4, WCAG 2.1 AA

---

## Table of Contents

1. [Executive Summary & Problem Statement](#1-executive-summary--problem-statement)
2. [Target Audience & Personas](#2-target-audience--personas)
3. [User Stories & Acceptance Criteria](#3-user-stories--acceptance-criteria)
4. [Information Architecture & Navigation Integration](#4-information-architecture--navigation-integration)
5. [Pagination Mechanics & Strict 404 Guardrails](#5-pagination-mechanics--strict-404-guardrails)
6. [Filtering Taxonomy & Search Facets](#6-filtering-taxonomy--search-facets)
7. [Public vs. Private Repository Disclosure Strategy](#7-public-vs-private-repository-disclosure-strategy)
8. [Fallback Preview Hierarchy & Workstation Specifications](#8-fallback-preview-hierarchy--workstation-specifications)
9. [Non-Functional Requirements (NFRs) & Engineering Standards](#9-non-functional-requirements-nfrs--engineering-standards)
10. [Data Architecture, Schema & Service Contracts](#10-data-architecture-schema--service-contracts)
11. [Component Hierarchy & State Management](#11-component-hierarchy--state-management)
12. [Release Criteria, Testing & Verification Protocol](#12-release-criteria-testing--verification-protocol)

---

## 1. Executive Summary & Problem Statement

### 1.1 Context & Strategic Vision
Sebastián Gómez has amassed over a decade (10+ years) of high-impact engineering leadership, open-source development, and commercial product delivery. His body of work encompasses 137 individual software repositories spanning Fullstack Web Platforms, Mobile Applications (Flutter & React Native), On-Device AI / Machine Learning (Google Gemma/LiteRT, Gemini Nano, Agent2Agent protocols), 3D & Creative Technologies (Three.js, OpenCV, Web Audio synthesis), and Cloud Infrastructure.

His primary website, `sebastian-gomez-site` (built with Next.js 16, React 19, and Tailwind CSS v4 on Vercel), serves as his central digital brand. While the site currently provides a blog, conference appearances (`/talks`), and background information (`/about`), it lacks a dedicated, curated, and interactive showcase for his engineering portfolio. Potential employers, enterprise clients, conference organizers, and fellow developers currently have no unified way to test his live applications, inspect architectural case studies, or understand the breadth of his technical execution.

### 1.2 Core Problem Statement
1. **The Invisibility Paradox:** Without a dedicated `/portafolio` route, 137 repositories of intellectual property remain obscured inside GitHub profiles or private client archives. Visitors cannot easily discover top-tier applications.
2. **Static Resume Fatigue:** Traditional portfolios present static screenshots and bullet lists. Modern senior engineering evaluation requires interacting with live software, evaluating system architecture, and inspecting responsive execution in real time.
4. **Header & Embed Friction:** Many external deployments configure `X-Frame-Options` or Content Security Policies (`CSP`) that break naive `<iframe>` embeds. A production portfolio requires an intelligent, multi-tier preview hierarchy that gracefully falls back from live interactive workstations to rich image galleries and static architectural cards.

### 1.3 Solution Hypothesis & Product Vision
By implementing a dedicated, SSR-powered, paginated portfolio (`/portafolio`) that organizes 32 stack-ranked projects into 8 clean pages (4 projects per page), `sebastian-gomez-site` will transform passive website visitors into engaged evaluators. The experience provides:
- **Zero-Latency Exploration:** Blazing-fast deterministic rendering backed by a statically compiled catalog (`docs/portfolio/projects_catalog.json`), requiring zero external CMS dependencies.
- **Three-Tier Adaptive Preview Hierarchy:**
  - *Mode 1 (Interactive Workstation):* Embedded live applications running in a sandboxed, responsive workstation modal with viewport switching (Desktop, Tablet, Mobile).
  - *Mode 2 (Multi-Image Gallery):* Multi-image carousels using `react-multi-carousel` displaying real production screenshots.
  - *Mode 3 (Architecture Deep-Dive):* Sanitized architectural blueprints, complexity scores, and data flow diagrams for backend APIs, CLIs, and proprietary systems.
- **Architectural Harmony:** Strict adherence to `sebastian-gomez-site` design tokens (Pink `#db2777`, Sky Blue `#60a5fa`, Slate `#0f172a`), the canonical 8+4 grid layout, and the strict 404 guardrails established in `SPEC-404-handling.md`.

### 1.4 Business & Career Objectives
- **Target Recruitment:** Enable Tech Leads, VP of Engineering, and Staff hiring managers to evaluate code quality, system complexity, and interactive UX in under 60 seconds.
- **Consulting Conversion:** Provide commercial clients with social proof of enterprise SaaS delivery (e.g., DIAN-compliant invoicing, telemetry systems, booking engines).
- **Thought Leadership:** Highlight specialized expertise in On-Device AI, Web Audio, and Creative Tech alongside standard enterprise fullstack stacks.

### 1.5 Key Success Metrics & KPIs
| Metric | Baseline | Target Goal | Measurement Method |
|---|---|---|---|
| **Portfolio Route Time-to-Interactive (TTI)** | N/A (Route does not exist) | `< 1.2s` | Lighthouse / Vercel Speed Insights |
| **First Contentful Paint (FCP)** | N/A | `< 0.9s` | Vercel Analytics / Core Web Vitals |
| **Interactive Demo Engagement Rate** | 0% | `> 40%` of visitors trigger a preview modal | Client event telemetry |
| **Routing Reliability (404 Compliance)** | 0% | `100%` compliance with `SPEC-404-handling.md` | Automated Jest & Cypress test suites |
| **Private Code Security Leak Rate** | N/A | `0%` (Zero leaked private repos/keys) | Pre-commit & CI verification |

---

## 2. Target Audience & Personas

Understanding the distinct mindsets of visitors arriving at `/portafolio` dictates the UI structure, telemetry display, and interaction defaults.

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                             PRIMARY USER PERSONAS                                │
├──────────────────────┬──────────────────────┬────────────────────────────────────┤
│ Persona              │ Core Objective       │ Primary UI Need                    │
├──────────────────────┼──────────────────────┼────────────────────────────────────┤
│ 1. Principal Lead /  │ Evaluate engineering │ Technical stack depth, live code,  │
│    Engineering Mgr   │ rigor & architecture │ architecture cards, latency metrics│
├──────────────────────┼──────────────────────┼────────────────────────────────────┤
│ 2. Senior Technical  │ Rapid qualification  │ Clear categorization, live links,  │
│    Recruiter         │ of skills & domain   │ visual polish, responsive mobile   │
├──────────────────────┼──────────────────────┼────────────────────────────────────┤
│ 3. Enterprise Buyer /│ Verify delivery      │ Real-world SaaS proof, security    │
│    Founder Client    │ reliability & polish │ disclosures, commercial impact     │
├──────────────────────┼──────────────────────┼────────────────────────────────────┤
│ 4. Open-Source Peer  │ Explore techniques,  │ GitHub links, tech stack badges,   │
│    Developer         │ libraries, and demos │ interactive sandbox experimentation│
└──────────────────────┴──────────────────────┴────────────────────────────────────┘
```

### 2.1 Persona 1: Staff / Principal Tech Lead ("The Architectural Skeptic")
- **Profile:** Marcus, 42, Principal Engineer at a tier-1 tech company. Evaluates candidate depth, distributed architecture, and code craftsmanship.
- **Needs:**
  - Wants to know *how* systems are designed, not just what they look like.
  - Values monospaced technical telemetry (e.g., HTTP status codes, latency, state management, protocols).
  - Inspects private project architecture summaries to see how enterprise constraints (DIAN electronic invoicing, Cloud Run SSE telemetry) are solved.
- **Pain Points:** Dislikes trivial todo-apps, generic tutorial clones, or broken demo links.
- **Portfolio Delight Feature:** Mode 3 Static Architecture Cards with detailed complexity scores, data flow descriptions, and Mode 1 sandboxed live workstations with viewport testing.

### 2.2 Persona 2: Senior Technical Recruiter ("The Fast Scanner")
- **Profile:** Elena, 31, Talent Acquisition Lead recruiting for Senior / Staff Fullstack & Mobile roles.
- **Needs:**
  - Spends 30 to 45 seconds scanning a candidate's portfolio.
  - Needs immediate visual confirmation of skills: Flutter, React 19, Next.js, Node.js, Python, Kotlin.
  - Needs crisp pagination and fast filters to jump straight to "Mobile" or "Web Apps".
- **Pain Points:** Cluttered navigation, slow loading times, broken images, and ambiguous project descriptions.
- **Portfolio Delight Feature:** Clean 8+4 layout with bright badges, prominent "En Vivo ⚡" live status pills, and fast category filter pills.

### 2.3 Persona 3: Enterprise Client & Startup Founder ("The Product Delivery Buyer")
- **Profile:** Carlos, 38, Startup Founder seeking a fractional CTO or lead consultant to build a mission-critical SaaS.
- **Needs:**
  - Looks for proof that Sebastián delivers complete, production-grade applications that handle auth, payments, database transactions, and real users.
- **Pain Points:** Theoretical open-source toys without real-world utility or polished user interfaces.
- **Portfolio Delight Feature:** High-resolution multi-screenshot galleries (Mode 2) displaying real login flows, billing dashboards, and mobile views.

### 2.4 Persona 4: Peer Software Engineer & Open Source Collaborator ("The Hands-on Hacker")
- **Profile:** Sofía, 27, Fullstack & Creative Tech Engineer.
- **Needs:**
  - Wants to try out creative experiments: Web Audio synthesis (`AI-Based-Music-Generator-ReactJS`), Flute acoustics (`flutemodes`), terminal games (`tmux-game`), and on-device AI (`liteRT-LM`).
  - Wants direct access to public GitHub repositories to star and inspect source code.
- **Pain Points:** Dead links, lack of source code buttons, lack of live interactive playgrounds.
- **Portfolio Delight Feature:** Mode 1 Live Interactive Workstation with full keyboard and mouse support, plus direct "Código GitHub" repository links.

---

## 3. User Stories & Acceptance Criteria

### 3.1 Epics & Thematic Breakdown
- **EPIC-1: Discovery & Presentation:** Browsing the curated catalog, viewing project cards, and reading technical summaries.
- **EPIC-2: Navigation & Pagination:** Moving through the 8 pages of projects with seamless SSR, URL synchronization, and robust 404 guardrails.
- **EPIC-3: Filtering & Taxonomy:** Slicing the catalog by domain category, technology tags, and live verification status.
- **EPIC-4: Interactive Previews:** Engaging with the 3-mode preview hierarchy (Live Iframe Workstation, Image Gallery, Architecture Card).
- **EPIC-5: Security & Privacy:** Safely presenting proprietary commercial projects without code or credential disclosure.

---

### 3.2 Detailed User Stories & Acceptance Criteria

#### US-01: Catalog Browsing & Initial Impression
> **As a** visitor arriving at `https://www.sebastian-gomez.com/portafolio`,  
> **I want to** immediately see an atmospheric, high-contrast showcase of Sebastián's top projects,  
> **So that** I understand his seniority, breadth of experience, and technical focus within seconds.

- **Acceptance Criteria:**
  - **AC-01.1:** The canonical URL `/portafolio` loads Page 1 returning HTTP `200 OK` with zero client-side redirection delays.
  - **AC-01.2:** The header highlights the "Portafolio" navigation link with active pink brand styling (`text-pink-600` or pink pill accent).
  - **AC-01.4:** The page includes a Hero banner with Montserrat typography, title *"Portafolio de Proyectos"*, subtitle, and audit telemetry badge bar (*"137 Repositorios Auditados | 32 Proyectos Curados | 27 Demos en Vivo"*).
  - **AC-01.5:** The right sidebar (in 8+4 desktop layout) renders Sebastián's profile card, quick stats, and category shortcut counts.

#### US-02: Predictable SSR Pagination & URL Navigation
> **As an** evaluator browsing deep into the portfolio,  
> **I want to** navigate across numbered pages (`/portafolio/page/2`, `/portafolio/page/3`, etc.),  
> **So that** I can systematically inspect all 32 projects with permanent, bookmarkable, and shareable URLs.

- **Acceptance Criteria:**
  - **AC-02.1:** Page numbers 1 through 8 map strictly to 4 projects per page (Page 1: 1–4; Page 2: 5–8; ... Page 8: 29–32).
  - **AC-02.2:** Each pagination transition updates the browser URL via Next.js router (`/portafolio` for Page 1, `/portafolio/page/[pageNumber]` for Pages 2–8).
  - **AC-02.3:** The pagination controls display "Anterior", numbered buttons `1, 2, 3, 4, 5, 6, 7, 8`, "Siguiente", and a telemetry indicator *"Mostrando 1–4 de 32 proyectos curados"*.
  - **AC-02.4:** On Page 1, the "Anterior" button is disabled/hidden. On Page 8, the "Siguiente" button is disabled/hidden.
  - **AC-02.5:** Navigation scrolls smoothly back to the top of the project feed (`scroll: true`).
  - **AC-02.6:** Direct visits to `/portafolio/page/1` are handled gracefully (serving Page 1 content or permanently redirecting 308 to canonical `/portafolio`).

#### US-03: Multi-Faceted Category & Technology Filtering
> **As a** technical recruiter looking specifically for Flutter mobile apps or AI systems,  
> **I want to** filter projects by domain category, technology tags, and live status,  
> **So that** I can instantly isolate relevant engineering samples.

- **Acceptance Criteria:**
  - **AC-03.1:** The filter bar exposes the 6 canonical categories: *Todos*, *Web Apps*, *Mobile*, *3D & Creative Tech*, *AI & ML*, *Audio Tech*, *Systems*.
  - **AC-03.2:** Selecting a category chip highlights it in solid `bg-pink-600 text-white` and updates the feed to show matching projects.
  - **AC-03.3:** A dedicated toggle switch *"Demos en Vivo Únicamente ⚡"* filters the feed to projects with verified HTTP 200 live endpoints.
  - **AC-03.4:** If a filter combination produces 0 projects, a branded empty-state card is rendered in Spanish: *"No se encontraron proyectos con los filtros seleccionados"* with a *"Restablecer Filtros"* button.
  - **AC-03.5:** Category selections sync with client URL query parameters (`?category=mobile`) so filtered views can be shared.

#### US-04: Live Application Preview via Interactive Workstation
> **As a** tech lead testing a live application (e.g., `AI-Based-Music-Generator-ReactJS`, `flutemodes`, `rigare`),  
> **I want to** launch an interactive workstation modal without navigating away from the portfolio,  
> **So that** I can experience the actual user interface and evaluate its responsiveness directly.

- **Acceptance Criteria:**
  - **AC-04.1:** Clicking *"Probar en Vivo ⚡"* on an embeddable project opens a full-screen blurred modal workstation (`bg-slate-900` chassis, `z-50`).
  - **AC-04.2:** The workstation renders the live project inside a sandboxed `<iframe>` with `sandbox="allow-scripts allow-same-origin allow-forms allow-popups"` and `referrerpolicy="no-referrer"`.
  - **AC-04.3:** The workstation chrome bar includes responsive viewport toggles:
    - *Desktop (Full Width)*: 100% container width.
    - *Tablet (768px)*: Centered 768px container with simulated device border.
    - *Mobile (375px)*: Centered 375px container simulating an iPhone/Android screen.
  - **AC-04.4:** The chrome bar displays the target URL, verified HTTP 200 badge, an *"Abrir en Nueva Ventana ↗"* button, and a close button `✕` (accessible via Esc key).
  - **AC-04.5:** If a project sends headers preventing framing (or triggers `onError`), an intelligent fallback banner appears: *"Esta aplicación requiere navegación directa por políticas de seguridad del navegador"* with an immediate direct launch button.

#### US-05: Multi-Image Visual Gallery Exploration
> **I want to** swipe through high-resolution screenshots in an integrated carousel,  
> **So that** I can assess UI/UX polish, typography, and functional layouts.

- **Acceptance Criteria:**
  - **AC-05.1:** Mode 2 project cards integrate `react-multi-carousel` with custom arrow controls matching `styles/globals.scss` line 45 (`.arrow-btn`).
  - **AC-05.2:** Supports touch-swipe gestures on mobile devices and keyboard arrow navigation.
  - **AC-05.3:** Displays carousel dot indicators showing the active slide index.
  - **AC-05.4:** Images use Next.js `next/image` with `lib/imageLoader.js` pass-through, lazy loading, and modern WebP compression.
  - **AC-05.5:** Clicking on a screenshot opens an expanded high-resolution lightbox view.

#### US-06: Architecture Deep-Dive for Backend & Private Systems
> **I want to** inspect architectural diagrams, complexity scores, and sanitized engineering summaries,  
> **So that** I can appreciate the system design even without direct source code access.

- **Acceptance Criteria:**
  - **AC-06.1:** Mode 3 cards highlight system topology, data flow diagrams, and a numerical complexity score (0–100).
  - **AC-06.2:** Technical highlights are rendered as structured bullet points (e.g., *"Event-driven architecture using SSE on Cloud Run"*, *"OpenCV contour detection and minimap template matching"*).
  - **AC-06.3:** Private projects display a prominent badge: `🔒 Proprietary / Private Commercial Work` in purple styling (`bg-purple-100 text-purple-800 border-purple-200`).
  - **AC-06.4:** No GitHub buttons, repository URLs, or confidential client keys are rendered.

#### US-07: Error Handling & Invalid Route Recovery
> **As a** visitor or web crawler landing on a malformed portfolio URL (e.g., `/portafolio/page/abc`, `/portafolio/page/99`, `/portafolio/page/-1`),  
> **I want to** receive a strict HTTP 404 response and a friendly custom 404 page,  
> **So that** I am not shown broken empty pages or server error crashes.

- **Acceptance Criteria:**
  - **AC-07.1:** Any non-numeric `pageNumber` parameter (e.g., `/portafolio/page/abc`) returns HTTP `404` via `{ notFound: true }` in `getServerSideProps`.
  - **AC-07.2:** Any integer `pageNumber < 1` (e.g., `/portafolio/page/0`, `/portafolio/page/-5`) returns HTTP `404`.
  - **AC-07.3:** Any integer `pageNumber > 8` (where 8 is `totalPages`) returns HTTP `404`.
  - **AC-07.4:** The response renders the custom static `pages/404.js` page in Spanish with recovery links back to `/portafolio` and blog categories.

---

## 4. Information Architecture & Navigation Integration

### 4.1 Site Navigation Hierarchy & User Flow
The addition of `/portafolio` elevates the site from a technical blog with talks into a holistic engineering destination:

```
[ Homepage: / ] ──┬── [ Blog Posts: /post/[slug] ]
                  ├── [ Categories: /category/[slug] ]
                  ├── [ Talks / Conferencias: /talks ]
                  ├── [ About / Trayectoria: /about ]
                  └── [ PORTAFOLIO: /portafolio ] (NEW)
                        ├── Page 1: /portafolio (Canonical)
                        ├── Page 2: /portafolio/page/2
                        ├── ...
                        ├── Page 8: /portafolio/page/8
                        └── Interactive Workstation Modal (Overlay State)
```

### 4.2 Integration with `components/CategoryList.jsx`
The global navigation header is rendered in `components/Header.jsx` using `components/CategoryList.jsx`. The portfolio link must be integrated into both desktop and mobile navigation viewports.

#### Desktop Navigation Bar (`CategoryList.jsx`)
In the desktop view (`hidden md:inline-block`), the link is placed immediately following `About` and `Conferencias`:

```jsx
{/* Desktop Header Links */}
<Link href="/about">
  <span className="hidden md:inline-block mr-4 text-white font-semibold cursor-pointer hover:text-pink-300 transition">
    About
  </span>
</Link>
<Link href="/talks">
  <span className="hidden md:inline-block mr-4 text-white font-semibold cursor-pointer hover:text-pink-300 transition">
    Conferencias
  </span>
</Link>
<Link href="/portafolio">
  <span className="hidden md:inline-block mr-4 text-white font-semibold cursor-pointer hover:text-pink-300 transition relative">
    Portafolio
    {/* Optional active indicator dot */}
    {router.pathname.startsWith('/portafolio') && (
      <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-pink-500 rounded-full animate-pulse" />
    )}
  </span>
</Link>
```

#### Mobile Dropdown Navigation Drawer (`CategoryList.jsx`)
In the mobile drawer (`isOpen` state on screens `< 768px`), the portfolio item is presented with high visual emphasis using the site's brand gradient:

```jsx
{/* Mobile Drawer Menu Item */}
<Link href="/portafolio">
  <span
    onClick={closeDropdown}
    className="md:hidden block px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-pink-600 to-red-500 hover:from-pink-500 hover:to-red-400 cursor-pointer rounded-md mx-2 my-1 shadow-sm transition"
  >
    💼 Portafolio de Proyectos
  </span>
</Link>
```

### 4.3 Breadcrumbs & Header Active State Behavior
- **URL Path Detection:** When `router.pathname` begins with `/portafolio`, the header link receives active styling (`text-pink-400` font bold with bottom accent indicator).
- **Breadcrumb Navigation:** On paginated routes, a subtle breadcrumb is rendered above the hero on pages 2–8:
  `Inicio > Portafolio > Página [pageNumber]` (rendered in `text-xs text-gray-300`).

### 4.4 URL Route Architecture & Canonical Linking
To ensure optimal SEO and zero duplicate content penalties:
1. **Canonical Page 1:** `https://www.sebastian-gomez.com/portafolio`
2. **Subsequent Pages:** `https://www.sebastian-gomez.com/portafolio/page/[2..8]`
3. **Canonical Link Header:**
   - On `/portafolio`: `<link rel="canonical" href="https://www.sebastian-gomez.com/portafolio" />`
   - On `/portafolio/page/2`: `<link rel="canonical" href="https://www.sebastian-gomez.com/portafolio/page/2" />`
   - Prev/Next SEO tags:
     - Page 1: `<link rel="next" href="https://www.sebastian-gomez.com/portafolio/page/2" />`
     - Page 2: `<link rel="prev" href="https://www.sebastian-gomez.com/portafolio" />`, `<link rel="next" href="https://www.sebastian-gomez.com/portafolio/page/3" />`

### 4.5 The Canonical 8+4 Grid Layout System
Following the exact grid architectural standard established in `pages/index.js`, `pages/about.js`, and `pages/talks.js`:
- **Outer Wrapper:** `<div className="container mx-auto px-4 sm:px-6 lg:px-10 mb-8">`
- **Two-Column Grid:** `<div className="grid grid-cols-1 lg:grid-cols-12 gap-12">`
  - **Main Feed Column (`col-span-1 lg:col-span-8`):**
    1. Filter & Search Toolbar
    2. Stack-ranked feed of 4 Project Cards
    3. Pagination Bar Component
  - **Sidebar Column (`col-span-1 lg:col-span-4`):**
    1. `<div className="relative lg:sticky top-8 space-y-8">`
    2. Author Profile & Bio Card (`SiteWidget`)
    3. Portfolio Telemetry Stats Widget (137 Audited / 32 Curated / 27 Live)
    4. Quick Category Facet Widget with project counters

---

## 5. Pagination Mechanics & Strict 404 Guardrails

### 5.1 Pagination Topology
- **Total Audited Repositories:** 137
- **Total Curated Projects:** Exactly 32 projects (Composite Score $\ge 35$, code files $\ge 5$).
- **Projects Per Page (`PAGE_SIZE`):** Exactly 4 projects.
- **Total Calculated Pages (`TOTAL_PAGES`):** $\lceil 32 / 4 \rceil = 8$ pages.

```
Page 1: Projects #01 – #04  (Tier 1 Flagship Showcase)
Page 2: Projects #05 – #08  (Tier 2 Core Portfolio)
Page 3: Projects #09 – #12  (Tier 2 Core Portfolio)
Page 4: Projects #13 – #16  (Tier 3 Specialized - AI & Audio)
Page 5: Projects #17 – #20  (Tier 3 Specialized - Web & Creative)
Page 6: Projects #21 – #24  (Tier 3 Specialized - Fullstack & Tools)
Page 7: Projects #25 – #28  (Tier 3 Specialized - Systems & Cross-Platform)
Page 8: Projects #29 – #32  (Tier 3 Specialized - Early Innovations & Labs)
```

### 5.2 Server-Side Rendering (SSR) Logic & Data Slicing
All pagination occurs server-side via `getServerSideProps` in `pages/portafolio/page/[pageNumber].js` and `pages/portafolio/index.js`. Slicing is performed using deterministically ordered records from `projects_catalog.json`:

$$\text{startIndex} = (\text{pageNumber} - 1) \times 4$$
$$\text{endIndex} = \text{startIndex} + 4$$
$$\text{projects} = \text{allProjects.slice(startIndex, endIndex)}$$

### 5.3 URL Synchronization & History Management
- Pagination buttons use standard Next.js `<Link>` components wrapped around accessible button markup.
- Clicking a page button executes a client-side route transition with server-side props fetching.
- Browser back/forward navigation (`popstate`) correctly restores page state and scroll position.

### 5.4 Strict 404 Guardrails Matching `SPEC-404-handling.md`
To maintain complete consistency with the repository's living specification `SPEC-404-handling.md`, the dynamic route `pages/portafolio/page/[pageNumber].js` must strictly validate all input parameters in `getServerSideProps` before rendering:

```javascript
// pages/portafolio/page/[pageNumber].js - Strict 404 Guardrails
import { getProjectsCatalog } from '../../../services/portfolio';

const PROJECTS_PER_PAGE = 4;

export async function getServerSideProps({ params }) {
  // 1. Parse pageNumber as a strict Number
  const rawPage = params?.pageNumber;
  const pageNumber = Number(rawPage);

  // Guard 1: Non-numeric strings, floats, NaN, or non-integers -> 404
  if (!Number.isInteger(pageNumber)) {
    return { notFound: true };
  }

  // Guard 2: Numbers less than 1 (0, negative integers) -> 404
  if (pageNumber < 1) {
    return { notFound: true };
  }

  // 2. Fetch catalog and compute total pages
  const allProjects = getProjectsCatalog();
  const totalProjects = allProjects.length;
  const totalPages = Math.ceil(totalProjects / PROJECTS_PER_PAGE);

  // Guard 3: Numbers greater than totalPages (e.g. page 9, 99) -> 404
  if (pageNumber > totalPages) {
    return { notFound: true };
  }

  // Guard 4: Canonical Page 1 redirect guard
  // If user visits /portafolio/page/1 directly, redirect to canonical /portafolio
  if (pageNumber === 1) {
    return {
      redirect: {
        destination: '/portafolio',
        permanent: true, // 308 Permanent Redirect for SEO
      },
    };
  }

  // Compute sliced slice
  const startIndex = (pageNumber - 1) * PROJECTS_PER_PAGE;
  const projects = allProjects.slice(startIndex, startIndex + PROJECTS_PER_PAGE);

  return {
    props: {
      projects,
      currentPage: pageNumber,
      totalPages,
      totalProjects,
      nextPageNumber: pageNumber < totalPages ? pageNumber + 1 : null,
      prevPageNumber: pageNumber > 1 ? pageNumber - 1 : null,
    },
  };
}
```

#### Verification Matrix for 404 Guardrails:
| Incoming URL | Expected HTTP Code | Resulting View | Specification Rule |
|---|---|---|---|
| `/portafolio` | `200 OK` | Page 1 (Projects 1–4) | Canonical Entry Point |
| `/portafolio/page/1` | `308 Redirect` | Redirects to `/portafolio` | Canonical Deduplication |
| `/portafolio/page/2` | `200 OK` | Page 2 (Projects 5–8) | Valid Middle Page |
| `/portafolio/page/8` | `200 OK` | Page 8 (Projects 29–32) | Valid Terminal Page |
| `/portafolio/page/9` | `404 Not Found` | Custom `404.js` Page | Out of range (`> totalPages`) |
| `/portafolio/page/0` | `404 Not Found` | Custom `404.js` Page | Out of range (`< 1`) |
| `/portafolio/page/-5` | `404 Not Found` | Custom `404.js` Page | Negative number |
| `/portafolio/page/abc` | `404 Not Found` | Custom `404.js` Page | Non-numeric string |
| `/portafolio/page/2.5` | `404 Not Found` | Custom `404.js` Page | Float / Non-integer |
| `/portafolio/page/null` | `404 Not Found` | Custom `404.js` Page | Null string literal |

### 5.5 Pagination Controls UI Specification
The pagination bar rendered at the base of the feed must feature:
1. **Previous Button:**
   - Label: `← Anterior`
   - Active state: `bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 px-4 py-2 rounded-full text-sm font-semibold shadow-sm transition`
   - Disabled state (Page 1): `opacity-40 cursor-not-allowed pointer-events-none`
2. **Page Number Indicator Buttons:**
   - Standard pills: `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`.
   - Active page pill: `bg-pink-600 text-white font-bold shadow-md scale-105 px-3.5 py-1.5 rounded-full text-sm`
   - Inactive page pill: `bg-white text-gray-700 hover:bg-pink-50 hover:text-pink-600 border border-gray-200 px-3.5 py-1.5 rounded-full text-sm font-medium transition`
3. **Next Button:**
   - Label: `Siguiente →`
   - Active state: `bg-pink-600 hover:bg-pink-700 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-md transition`
   - Disabled state (Page 8): `opacity-40 cursor-not-allowed pointer-events-none`
4. **Range Readout:**
   - Text: `Mostrando {(currentPage - 1) * 4 + 1}–{Math.min(currentPage * 4, totalProjects)} de {totalProjects} proyectos curados`
   - Styling: `text-xs font-mono text-gray-400 mt-3 text-center`

---

## 6. Filtering Taxonomy & Search Facets

### 6.1 Multi-Tier Taxonomy Definition
Every curated project is assigned to exactly one primary category and tagged with multiple secondary technology chips.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        PORTFOLIO TAXONOMY MATRIX                       │
├──────────────────────┬─────────────┬───────────────────────────────────┤
│ Category Name        │ Slug        │ Representative Stack-Rank Projects│
├──────────────────────┼─────────────┼───────────────────────────────────┤
│                      │             │ agendarcitademaquillaje, rigare   │
├──────────────────────┼─────────────┼───────────────────────────────────┤
│ Mobile Apps          │ mobile      │ music-journal-app,                │
│                      │             │ workshopJsconfmxRNApp, PetTracker │
├──────────────────────┼─────────────┼───────────────────────────────────┤
│                      │             │ sonoma-racing-coach,              │
│                      │             │ real-time-coach-codelab, tmux-game│
├──────────────────────┼─────────────┼───────────────────────────────────┤
├──────────────────────┼─────────────┼───────────────────────────────────┤
│ Audio Tech & Sound   │ audio       │ AI-Based-Music-Generator-ReactJS, │
│                      │             │ flutemodes, harmony-assistant     │
├──────────────────────┼─────────────┼───────────────────────────────────┤
└──────────────────────┴─────────────┴───────────────────────────────────┘
```

### 6.2 Technology Tags & Stack Filtering
Projects feature searchable technology chips representing libraries, runtimes, and protocols:
- `React 19`, `Next.js`, `TypeScript`, `Tailwind CSS`, `Flutter`, `Dart`, `Android SDK`, `Kotlin`, `Python`, `OpenCV`, `Three.js`, `Tone.js`, `Web Audio API`, `Cloud Run`, `Docker`, `GraphQL`, `Agent2Agent`, `Google Gemma`.

### 6.3 Live Status & Embeddability Toggle
A dedicated toolbar toggle switch allows visitors to immediately isolate interactive experiences:
- **Toggle Label:** `Demos en Vivo Únicamente ⚡`
- **Filter Behavior:** Filters catalog where `readiness.status === 'live'` and `readiness.httpStatus === 200`.

### 6.4 Client-Side vs. Server-Side Interaction Model
- **Primary Page Views:** Paginated via SSR (`/portafolio/page/[n]`) for perfect SEO crawling.
- **In-Page Filtering:** Filter chips trigger instant client-side state updates. When an active category filter is selected, client-side pagination recalculates over the filtered subset without requiring server round-trips.
- **Deep Linking:** Selecting a filter updates the browser URL hash or query param (e.g. `/portafolio?category=mobile`) via `router.push({ query: { category: 'mobile' } }, undefined, { shallow: true })`.

---

## 7. Public vs. Private Repository Disclosure Strategy

### 7.1 Security & Intellectual Property Safeguards
Of the 32 curated projects, **12 are private repositories** containing proprietary commercial code, client intellectual property, or custom internal tooling:
10. `family-wallet` (Private personal finance system)
11. `cognitive-guardian` (Hackathon enterprise architecture)

### 7.2 Sanitized Architecture Disclosures
For all 12 private projects, the portfolio must adhere to strict redaction protocols:
- **Zero GitHub Code Links:** The "Ver Código GitHub" button is strictly omitted or disabled.
- **Zero Raw Config/Key Exposure:** No repository URLs, internal API endpoints, client credentials, or private commit hashes may appear in the catalog JSON or UI markup.
- **Sanitized Case Study Format:** Projects are described through sanitized architecture summaries focusing on engineering challenges solved:

### 7.3 Visual Badging & Provenance Attribution
All 12 private projects must be badged with a prominent security pill:
- **Badge Content:** `🔒 Proprietary / Private Commercial Work`
- **Styling:** `bg-purple-50 text-purple-700 border border-purple-200 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1`
- **Tooltip / Subtext:** *"Código fuente privado bajo acuerdo de confidencialidad comercial. Se presenta resumen arquitectónico y capturas autorizadas."*

### 7.4 Public Repository Integration
For the 20 public repositories:
- Direct GitHub button: `<a href={project.repository.githubUrl} target="_blank" rel="noopener noreferrer">`
- Repository metrics: Star count, fork count, primary language, and verified commit date.

---

## 8. Fallback Preview Hierarchy & Workstation Specifications

### 8.1 Preview Mode Decision Tree & Fallback Matrix
Every project card dynamically determines its presentation mode using verified audit telemetry:

```
                      [ Project Evaluated ]
                                │
               Is liveUrl HTTP 200 & embeddable?
                     ├── YES ──> MODE 1: Interactive Live Iframe Workstation
                     │
                     └── NO (Offline, X-Frame blocked, or Native Mobile)
                                │
                      Are screenshots available?
                           ├── YES ──> MODE 2: Multi-Image Carousel Gallery
                           │
                           └── NO ───> MODE 3: Static Architecture Card
```

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           PREVIEW HIERARCHY MATRIX                              │
├─────────────────┬───────────┬───────────────────────────────────────────────────┤
│ Mode            │ Candidate │ Key Features & Fallback Safeguards                │
│                 │ Projects  │                                                   │
├─────────────────┼───────────┼───────────────────────────────────────────────────┤
│ Mode 1:         │ 27 Live   │ • Embedded <iframe> inside modal chassis          │
│ Interactive     │ Web Apps  │ • Viewport switcher: Desktop (100%), Tablet       │
│ Live Workstation│           │   (768px), Mobile (375px)                         │
│                 │           │ • Sandbox: allow-scripts allow-same-origin        │
│                 │           │ • Fallback banner if frame-ancestors block frame  │
├─────────────────┼───────────┼───────────────────────────────────────────────────┤
│ Mode 2:         │ Native    │ • Multi-image carousel via react-multi-carousel   │
│ Multi-Image     │ Mobile &  │ • Touch swipe, slide dot indicators               │
│ Gallery         │ Rich Apps │ • Next/image optimized WebP assets                │
│                 │ (e.g. 8)  │ • Fullscreen lightbox image expansion             │
├─────────────────┼───────────┼───────────────────────────────────────────────────┤
│ Mode 3:         │ Backend,  │ • Architecture diagram / flowchart thumbnail      │
│ Static          │ APIs,     │ • System complexity score & technical highlights  │
│ Architecture    │ CLIs &    │ • Sanitized problem/solution summary              │
│ Card            │ Private   │ • Badged as "🔒 Proprietary Commercial Work"      │
└─────────────────┴───────────┴───────────────────────────────────────────────────┘
```

---

### 8.2 Mode 1: Interactive Live Iframe Embed Workstation Specification

#### Workstation Chassis & Modal Topology
- **Trigger:** Clicking *"Probar en Vivo ⚡"* on any project with `media.previewMode === 'interactive_embed'`.
- **Overlay:** `fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-2 lg:p-6 animate-fadeIn`.
- **Chassis Window:** `w-full max-w-7xl h-[92vh] bg-slate-900 rounded-xl border border-slate-700 flex flex-col overflow-hidden shadow-2xl`.

#### Window Chrome Bar Anatomy:
1. **Window Controls (Left):** Three macOS-style window dots (Red, Amber, Green).
2. **Project Identity & Telemetry (Left-Center):**
   - Project Title: `font-bold text-white text-sm lg:text-base`
   - Verified Badge: `bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs px-2 py-0.5 rounded font-mono`
3. **Simulated URL Bar (Center):**
   - Read-only pill: `bg-slate-800 text-slate-300 font-mono text-xs px-3 py-1 rounded-md border border-slate-700 max-w-md truncate`
4. **Responsive Viewport Switcher Controls (Center-Right):**
   - **Desktop Button:** `🖥️ Desktop (Full)` — sets viewport width to `w-full`
   - **Tablet Button:** `📱 Tablet (768px)` — sets viewport container to `max-w-[768px] mx-auto`
   - **Mobile Button:** `📱 Celular (375px)` — sets viewport container to `max-w-[375px] mx-auto shadow-2xl border-x border-slate-700`
5. **Direct Launch & Close (Right):**
   - Direct Link: `↗ Abrir en Nueva Ventana` (`text-xs text-pink-400 hover:text-pink-300 flex items-center gap-1`)
   - Close Button: `✕` (`text-slate-400 hover:text-white text-xl p-2 cursor-pointer`)

#### Security Sandboxing Attributes:
```jsx
<iframe
  src={activeProject.readiness.liveUrl}
  title={`${activeProject.title} Live Preview`}
  className="w-full h-full bg-white border-0 transition-all duration-300"
  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
  referrerPolicy="no-referrer"
  loading="lazy"
/>
```

#### Security Blockage Fallback Banner:
If an app fails to render or enforces `X-Frame-Options: SAMEORIGIN` (such as `gdgdevfestmed`), the workstation displays an inline emergency banner over a captured screenshot:
> *"⚠️ Esta aplicación restringe el visor embebido por políticas de seguridad del navegador (X-Frame-Options). Haz clic en 'Abrir en Nueva Ventana' para explorarla directamente en su entorno de producción."*

---

### 8.3 Mode 2: Multi-Image Carousel / Interactive Gallery Specification
- **Component Harness:** `react-multi-carousel` (version `^2.8.5` in `package.json`).
- **Styling Hooks:** Utilizes existing SCSS custom arrow classes from `styles/globals.scss` line 45 (`.arrow-btn`).
- **Responsive Breakpoints:**
  ```javascript
  const responsiveBreakpoints = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
  };
  ```
- **Asset Resolution:** Pre-processed local WebP assets located in `public/portfolio/screenshots/<slug>-*.webp`.

---

### 8.4 Mode 3: Static Architecture Card Specification
- **Card Surface:** `bg-white shadow-lg rounded-lg p-6 lg:p-8 mb-8 border border-gray-100`.
- **Top Metadata Row:**
  - Left: Composite Rank `#01 Top Pick` + Domain Category chip.
  - Right: Complexity Score Badge: `Score: 94/100` (`bg-blue-50 text-blue-700 font-mono text-xs px-2.5 py-1 rounded-md`).
- **Architectural Highlights Section:** Bulleted breakdown covering data flow, security model, and latency optimizations.

---

## 9. Non-Functional Requirements (NFRs) & Engineering Standards

### 9.1 Performance & Core Web Vitals Targets
- **Lighthouse Performance Score:** $\ge 90$ on desktop and $\ge 85$ on mobile.
- **Largest Contentful Paint (LCP):** $< 2.0\text{s}$ over 4G connections.
- **Cumulative Layout Shift (CLS):** $< 0.05$ (guaranteed by explicit aspect-ratio containers on all images and carousels).
- **First Input Delay (FID) / Interaction to Next Paint (INP):** $< 50\text{ms}$.

### 9.2 Image Optimization & Custom Loader Compatibility
- **Zero Vercel Quota Overhead:** As discovered in Survey 3, `lib/imageLoader.js` line 17 explicitly passes through any non-Hygraph image sources untouched:
  ```javascript
  if (typeof src !== 'string' || !isHygraphUrl(src)) {
    return src;
  }
  ```
- All portfolio static assets (`public/portfolio/`) bypass Hygraph transformations and load directly with native browser caching.

### 9.3 Accessibility (a11y) & WCAG 2.1 AA Compliance
- **Color Contrast:** All text must meet a minimum contrast ratio of `4.5:1` against card surfaces. Headings on `bg-white` use `text-gray-900` (`12.5:1` ratio). Secondary text uses `text-gray-700` (`7.0:1` ratio).
- **Keyboard Navigation:**
  - All interactive elements (pagination buttons, filter chips, modal triggers) must be accessible via `Tab` / `Shift+Tab`.
  - Visible focus ring: `focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2`.
- **Modal Focus Trap & ARIA:**
  - The Live Workstation Modal must implement an accessible focus trap (`aria-modal="true"`, `role="dialog"`).
  - Pressing `Escape` must immediately close the modal and return focus to the triggering button.

### 9.4 Security Hardening & Isolation
- **Iframe Sandboxing:** Strictly restricted to `allow-scripts allow-same-origin allow-forms allow-popups`. Dangerous permissions (`allow-top-navigation`, `allow-modals`, `allow-pointer-lock`) are explicitly excluded.
- **Referrer Policy:** Enforces `referrerPolicy="no-referrer"` to prevent passing internal tokens or site referrer data to embedded applications.
- **HTTPS Enforcement:** Any external URLs configured as `http://` must be automatically rewritten to `https://` to eliminate mixed-content blocking.

### 9.5 SEO, Structured Data & Social Sharing
- **Meta Tags via `next-seo`:**
  - Title: `Portafolio de Proyectos | Sebastián Gómez - Senior Software Engineer`
  - Description: `Explora más de una década de desarrollo de software: aplicaciones web interactivas, apps móviles Flutter, modelos de IA y sistemas fullstack en producción.`
- **OpenGraph & Twitter Cards:** Configured with dedicated 1200x630 OG image (`/portfolio/og-portfolio.png`).
- **Structured Data (JSON-LD):** Implements `ItemList` schema with `SoftwareApplication` entries for all 32 curated projects.

---

## 10. Data Architecture, Schema & Service Contracts

### 10.1 Schema Definition for `projects_catalog.json`
Located at `docs/portfolio/projects_catalog.json`, this pre-compiled, version-controlled catalog acts as the single source of truth.

```typescript
export interface ProjectRecord {
  tagline: string;                 // Short subtitle
  description: string;             // Architectural excerpt
  category: "web" | "mobile" | "creative" | "ai" | "audio" | "systems";
  tags: string[];                  // e.g. ["Next.js", "TypeScript", "Tailwind CSS"]
  rank: {
    position: number;              // 1 to 32
    compositeScore: number;        // e.g. 44 (out of 50)
    completenessScore: number;
    complexityScore: number;
    visualScore: number;
    recencyScore: number;
    domainScore: number;
  };
  page: number;                    // 1 to 8 (4 projects per page)
  featured: boolean;
  readiness: {
    status: "live" | "offline" | "staging" | "archived";
    liveUrl: string | null;
    httpStatus: number | null;     // e.g. 200
    embeddable: boolean;           // true if safe for iframe
    xFrameOptions: string | null;
    cspFrameAncestors: string | null;
    verifiedAt: string;            // ISO timestamp
  };
  repository: {
    name: string;
    isPrivate: boolean;
    visibility: "public" | "private";
    githubUrl: string | null;      // NULL for private repositories
    stars: number;
    forks: number;
    lastCommitDate: string | null;
    primaryLanguage: string;
  };
  media: {
    previewMode: "interactive_embed" | "gallery" | "static_card";
    thumbnail: string;
    screenshots: string[];
    hasVisualAssets: boolean;
    assetActionRequired: string | null;
  };
  highlights: string[];            // Bulleted architectural accomplishments
}
```

### 10.2 Service Contract (`services/portfolio.js`)
Following the exact service-layer pattern established in `pages/education/data.json` and `services/index.js`:

```javascript
// services/portfolio.js
import catalogData from '../docs/portfolio/projects_catalog.json';

export const getProjectsCatalog = () => catalogData.projects || [];

export const getProjectsMetadata = () => catalogData.metadata || {};

export const getProjectsByPage = (pageNumber = 1, pageSize = 4) => {
  const allProjects = getProjectsCatalog();
  const start = (pageNumber - 1) * pageSize;
  return allProjects.slice(start, start + pageSize);
};

export const getProjectsByCategory = (categorySlug) => {
  const allProjects = getProjectsCatalog();
  if (!categorySlug || categorySlug === 'todos') return allProjects;
  return allProjects.filter((p) => p.category === categorySlug);
};

export const getProjectBySlug = (slug) => {
  const allProjects = getProjectsCatalog();
  return allProjects.find((p) => p.slug === slug) || null;
};
```

---

## 11. Component Hierarchy & State Management

The component hierarchy cleanly separates presentation, interactive modals, and data hooks:

```
pages/
├── portafolio/
│   ├── index.js                     (Canonical Page 1 SSR Entry Point)
│   └── page/
│       └── [pageNumber].js          (Dynamic SSR Pagination Route 2..8)

components/portfolio/
├── PortfolioHero.jsx                (Header banner, metrics badge bar)
├── PortfolioFilterBar.jsx           (Category pills, Live demo toggle switch)
├── PortfolioFeed.jsx                (List of 4 Project Cards)
├── ProjectCard.jsx                  (Master dispatcher for Card Modes)
│   ├── ProjectCardHeader.jsx        (Rank pill, Live badge, Private lock badge)
│   ├── ProjectCardGallery.jsx       (react-multi-carousel implementation)
│   ├── ProjectCardArchitecture.jsx  (Mode 3 architecture diagram & bullets)
│   └── ProjectCardActions.jsx       (Live CTA, GitHub button, Viewport launcher)
├── PortfolioPagination.jsx          (Prev, Numbered pills 1..8, Next, Range text)
├── PortfolioSidebar.jsx             (Profile widget, Audit telemetry, Category counts)
└── WorkstationModal.jsx             (Fullscreen sandboxed iframe workstation)
    ├── WorkstationChrome.jsx        (Traffic lights, URL bar, Close button)
    ├── ViewportSwitcher.jsx         (Desktop / Tablet / Mobile toggle buttons)
    └── WorkstationFallback.jsx      (Emergency launch banner for blocked headers)
```

---

## 12. Release Criteria, Testing & Verification Protocol

### 12.1 Definition of Done (DoD)
A build implementing `/portafolio` is considered production-ready when:
1. `docs/portfolio/PRD.md` is fully ratified.
2. `projects_catalog.json` accurately catalogues all 137 repositories, including 32 curated projects.
3. Stitch UI screen designs are finalized in `docs/portfolio/DESIGN.md`.
4. All unit tests (`__tests__/pages/portafolio.test.js`) and Cypress E2E tests pass cleanly.
5. `npm run build && npm run start` executes with zero Webpack, GraphQL, or CSS errors.
6. `SPEC-404-handling.md` criteria are 100% verified across invalid pages and slugs.

### 12.2 Automated Testing Strategy

#### Unit Tests (Jest & React Testing Library):
- File: `__tests__/pages/portafolio.test.js`
- Test Cases:
  - `getServerSideProps` on Page 1 returns 4 projects and `currentPage: 1`.
  - `getServerSideProps` on Page 8 returns 4 projects and `currentPage: 8`.
  - `getServerSideProps` on `pageNumber = "abc"` returns `{ notFound: true }`.
  - `getServerSideProps` on `pageNumber = 0` returns `{ notFound: true }`.
  - `getServerSideProps` on `pageNumber = 9` returns `{ notFound: true }`.
  - `getServerSideProps` on `pageNumber = 1` returns permanent redirect to `/portafolio`.

#### End-to-End Tests (Cypress):
- File: `cypress/e2e/portfolio.cy.js`
- Test Scenarios:
  - Visit `/portafolio` $\rightarrow$ verifies 4 cards rendered, rank badges present.
  - Click "Siguiente" $\rightarrow$ URL transitions to `/portafolio/page/2`, updates feed.
  - Click "Probar en Vivo ⚡" $\rightarrow$ opens `WorkstationModal`, verifies iframe rendered with sandbox attributes.
  - Click Tablet viewport button $\rightarrow$ iframe container resizes to 768px.
  - Press `Escape` $\rightarrow$ modal closes and focus returns to button.
  - Visit `/portafolio/page/99` $\rightarrow$ verifies custom 404 page rendered.

### 12.3 Audit & Forensic Verification Protocol
To guarantee compliance with the project's integrity mandates:
- **No Facade Data:** Every single project URL in `projects_catalog.json` must be backed by real ping telemetry and real git repositories in `c:\Users\Usuario\Documents\mis repositorios`.
- **Zero Source Code Ingestion Outside `docs/portfolio/` during Milestone 2:** All deliverables remain self-contained within documentation and design artifacts until Milestone 4 implementation commences.

---

*End of Product Requirements Document.*
