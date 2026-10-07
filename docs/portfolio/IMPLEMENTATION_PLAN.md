# Technical Implementation & Remediation Plan: Portfolio Route (`/portafolio`)

**Target Repository:** `sebastian-gomez-site` (`c:\Users\Usuario\Documents\mis repositorios\sebastian-gomez-site`)  
**Document Author:** `teamwork_preview_worker_m4` (Technical Implementation & Remediation Plan Author)  
**Deliverable Path:** `docs/portfolio/IMPLEMENTATION_PLAN.md`  
**Date:** October 7, 2026  
**Status:** Ready for Engineering Execution  
**Companion Documents:** `SPEC-404-handling.md`, `docs/portfolio/PRD.md`, `docs/portfolio/DESIGN.md`, `docs/portfolio/STACK_RANK_READINESS.md`, `docs/portfolio/projects_catalog.json`

---

## Executive Summary & Engineering Principles

This document establishes the authoritative technical blueprint for implementing and deploying the `/portafolio` route in `sebastian-gomez-site`. Based on a deep-dive audit of all 137 personal repositories (111 public, 26 private), this plan details how 32–38 curated projects will be showcased across an 8-page paginated architecture (4–5 projects per page).

### Core Architectural Decisions:
1. **Pages Router Static Site Generation (SSG):** Next.js 16.1.1 Pages Router pre-rendering via `getStaticProps` and `getStaticPaths`. Pre-rendering all 8 pages at build time eliminates serverless compute overhead, provides 0ms edge response latency, and guarantees 100% build determinism.
2. **Static JSON Sourcing:** Data sourced exclusively from `docs/portfolio/projects_catalog.json` through `services/portfolio.js`. No external CMS (Hygraph) schema alterations or GitHub REST API rate limits.
3. **Hardened Multi-Mode Previews:** Three distinct card modes—Static Architecture Cards, Image Gallery Carousels (`react-multi-carousel`), and an Interactive Workstation Modal utilizing defense-in-depth sandboxed `<iframe>` elements (`sandbox="allow-scripts allow-same-origin allow-forms allow-popups"`, explicit exclusion of `allow-top-navigation`).
4. **Strict 404 Guardrails:** Total alignment with `SPEC-404-handling.md`, ensuring out-of-bounds, negative, or non-numeric page numbers immediately trigger `{ notFound: true }` and serve the branded 404 page.
5. **Non-Destructive Governance:** Zero modifications to existing tracked files in `sebastian-gomez-site` prior to the dedicated implementation phase.

---

## 1. Technical Architecture & Next.js 16 Integration

### 1.1 Pages Router Routing Topology

`sebastian-gomez-site` strictly uses the Next.js **Pages Router** (`pages/` directory). There is no App Router in the repository. Dynamic routing, pagination, layouts, and internationalization conform to Pages Router conventions.

```
pages/
├── portafolio/
│   ├── index.js                     # Canonical Page 1 route (/portafolio)
│   └── page/
│       └── [pageNumber].js          # Dynamic paginated routes (/portafolio/page/2, /portafolio/page/3, etc.)
components/
└── portfolio/
    ├── PortfolioHeader.jsx          # Hero section, title, atmospheric badge, metrics readout
    ├── FilterBar.jsx                # Category pills, live demo toggle, search input, query sync
    ├── PortfolioGrid.jsx            # 8+4 canonical grid layout container & sticky bio sidebar
    ├── ProjectCard.jsx              # Mode 1: Static Architecture Card with tags & CTAs
    ├── ProjectCarouselCard.jsx      # Mode 2: Multi-image carousel card (react-multi-carousel)
    ├── ProjectEmbedModal.jsx        # Mode 3: Sandboxed interactive workstation modal overlay
    ├── PaginationControls.jsx       # Numbered pills, prev/next buttons, item range telemetry
    ├── ReadinessBadge.jsx           # Live/HTTP status, embeddability, and private repo pills
    └── index.js                     # Barrel export for portfolio components
services/
└── portfolio.js                     # Static data access layer importing projects_catalog.json
```

#### Canonical URL & Pagination Routing Logic:
- `GET /portafolio` → Serves Page 1 (projects 1 through 5). This is the canonical SEO entry point.
- `GET /portafolio/page/1` → Automatically redirects (308 Permanent Redirect) or renders Page 1 identically to `/portafolio` to avoid duplicate content penalties.
- `GET /portafolio/page/[pageNumber]` → Dynamic SSG route for pages 2 through 8.
- `GET /portafolio/page/<invalid>` → Triggers `{ notFound: true }` rendering the custom 404 error page.

### 1.2 Build Toolchain & Compiler Constraints

Next.js 16 in this project runs with explicit Webpack enforcement due to GraphQL loaders configured in `next.config.js`:

```json
// package.json scripts
{
  "scripts": {
    "dev": "next dev --webpack",
    "build": "next build --webpack",
    "start": "next start",
    "lint": "eslint .",
    "test": "jest",
    "cypress:run": "cypress run"
  }
}
```

#### Architectural Implications:
- **Webpack Bundling Requirement:** Turbopack (`--turbo`) cannot be used because `next.config.js` configures `graphql-tag/loader` for `.graphql` queries. Static JSON sourcing inside `services/portfolio.js` requires standard Webpack JSON resolution, which is supported natively.
- **Console Stripping:** `next.config.js` sets `compiler.removeConsole = true` in production. Debug telemetry in portfolio components must use conditional debugging flags or tests rather than raw `console.log`.
- **Locale Integration:** The site defines `i18n: { locales: ['en', 'es'], defaultLocale: 'es' }`. All portfolio headings, badges, telemetry strings, and aria-labels default to Spanish, with localized routing handled via Next.js router.
- **Image Loader Compatibility:** `lib/imageLoader.js` line 17 explicitly passes through any non-Hygraph image URL untouched. Local screenshots placed in `public/portfolio/screenshots/` or external assets load directly through `next/image` without consuming Hygraph transformations.

### 1.3 Component Hierarchy & Modular Breakdown

```
Page Container (pages/portafolio/index.js OR pages/portafolio/page/[pageNumber].js)
│
├── Layout (components/Layout.jsx - Global Navbar & Footer)
│   │
│   ├── PortfolioHeader (Hero banner, total audited repos: 137, curated: 32, live demos: 27)
│   │
│   ├── FilterBar (Category pills: "Todos", "Web Apps", "Mobile", "Edge AI", "Live Only" toggle)
│   │
│   ├── PortfolioGrid (Canonical 8+4 grid structure)
│   │   ├── Main Feed Column (col-span-8)
│   │   │   ├── ProjectCard / ProjectCarouselCard (Feed of 4–5 projects)
│   │   │   │   ├── ReadinessBadge (HTTP status indicator & privacy shield)
│   │   │   │   ├── StackBadges (TypeScript, Next.js, Flutter, OpenCV, etc.)
│   │   │   │   └── ActionButtons ("Probar en Vivo ⚡", "Código GitHub", "Detalles")
│   │   │   └── PaginationControls (Page pills 1–8, items telemetry)
│   │   │
│   │   └── Sidebar Column (col-span-4 sticky)
│   │       ├── SiteWidget (Sebastian's profile, bio, Twitter, LinkedIn)
│   │       ├── PortfolioMetricsWidget (Audit summary, embeddability breakdown)
│   │       └── AdWidget (Sponsor/Ad display container)
│   │
│   └── ProjectEmbedModal (Fixed overlay workstation, lazily mounted on trigger)
│       ├── WorkstationWindow (Mac-style chrome dots, title, live URL bar)
│       ├── ViewportSwitcher (Desktop 100%, Tablet 768px, Mobile 375px)
│       ├── SandboxedIframe (Hardened iframe container)
│       └── FallbackShield (Displays when cross-origin framing is blocked)
```

#### Detailed Component Specifications:

#### 1. `PortfolioHeader.jsx`
- **Location:** `components/portfolio/PortfolioHeader.jsx`
- **Props:** `{ totalAudited, totalCurated, totalLive }`
- **Visual Design:** Centered text on atmospheric cosmos background (`public/bg.webp`).
- **Elements:**
  - H1 Title: `text-3xl lg:text-4xl font-bold text-white tracking-tight` with `.text-shadow`.
  - Subtitle: `text-base lg:text-lg text-gray-200 mt-2 max-w-2xl mx-auto`.
  - Metrics Ribbon: Elevated translucent glass pill (`bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2 mt-4 inline-flex items-center gap-4 text-xs lg:text-sm text-gray-100 font-mono`). Displays: `137 Repositorios Auditados` | `32 Proyectos Curados` | `27 Demos en Vivo`.

#### 2. `FilterBar.jsx`
- **Location:** `components/portfolio/FilterBar.jsx`
- **Props:** `{ categories, activeCategory, onSelectCategory, liveOnly, onToggleLiveOnly }`
- **Behavior:**
  - Horizontally scrollable pill bar on mobile, wrapped flex container on desktop.
  - Active category chip: `bg-pink-600 text-white shadow-md font-semibold`.
  - Inactive category chip: `bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 font-medium`.
  - Toggle Switch: `Demos en Vivo Únicamente ⚡` with animated checkbox / toggle knob (`bg-emerald-500` when active).
  - Syncs state with shallow URL query parameters (`?cat=ai-audio&live=true`) via `next/router` without triggering full SSR reloads.

#### 3. `PortfolioGrid.jsx`
- **Location:** `components/portfolio/PortfolioGrid.jsx`
- **Props:** `{ projects, currentPage, totalPages, totalProjects, onOpenEmbed }`
- **Structure:**
  - Container: `container mx-auto px-4 sm:px-6 lg:px-10 mb-8`.
  - Responsive Grid: `grid grid-cols-1 lg:grid-cols-12 gap-12`.
  - Left Feed Column: `col-span-1 lg:col-span-8`. Maps over `projects` to render `ProjectCard` or `ProjectCarouselCard`.
  - Right Sidebar: `col-span-1 lg:col-span-4`. Wraps `<div className="relative lg:sticky top-8 space-y-6">` hosting `<SiteWidget />`, `<PortfolioMetricsWidget />`, and `<AdWidget />`.

#### 4. `ProjectCard.jsx` (Mode 1: Static Architecture Card)
- **Location:** `components/portfolio/ProjectCard.jsx`
- **Props:** `{ project, onOpenEmbed }`
- **Visual Structure:**
  - Card Shell: `bg-white shadow-lg rounded-lg p-6 lg:p-8 mb-8 border border-gray-100 transition hover:shadow-xl`.
  - Card Header: Flex row containing Rank Pill (`#01 Top Pick` in `bg-pink-100 text-pink-700 font-bold px-3 py-1 rounded-full text-xs`) and `<ReadinessBadge status={project.readiness} />`.
  - Title: `text-2xl font-bold text-gray-900 mb-2 hover:text-pink-600 transition`.
  - Tagline: `text-sm font-semibold text-pink-600 mb-3`.
  - Excerpt: `text-gray-700 leading-relaxed mb-4 text-sm lg:text-base`.
  - Tech Stack Badges: Monospaced chips (`bg-gray-100 text-gray-800 text-xs px-2.5 py-1 rounded-md font-mono mr-2 mb-2`).
  - Action Row:
    - Primary CTA: If `project.readiness.embeddable`, renders `Probar en Vivo ⚡` button (`bg-pink-600 hover:bg-pink-700 text-white font-medium px-6 py-2 rounded-full text-sm shadow-md transition transform hover:-translate-y-0.5`).
    - Secondary CTA: If public, renders GitHub link button (`border border-gray-300 hover:border-gray-400 text-gray-700 px-5 py-2 rounded-full text-sm flex items-center gap-1.5 transition`).
    - Private Disclosure: If `project.repository.isPrivate`, renders `🔒 Código Privado / Comercial` notice.

#### 5. `ProjectCarouselCard.jsx` (Mode 2: Image Gallery Card)
- **Location:** `components/portfolio/ProjectCarouselCard.jsx`
- **Props:** `{ project, onOpenEmbed }`
- **Implementation:**
  - Wraps `react-multi-carousel` with custom arrow buttons matching `styles/globals.scss` line 45 (`.adjacent-post .arrow-btn`).
  - Renders 2–4 high-resolution screenshots stored in `public/portfolio/screenshots/` with responsive breakpoints:
    ```javascript
    const responsive = {
      desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
      tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
      mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
    };
    ```
  - Includes overlay indicators and caption drawers.

#### 6. `ProjectEmbedModal.jsx` (Mode 3: Interactive Workstation Modal)
- **Location:** `components/portfolio/ProjectEmbedModal.jsx`
- **Props:** `{ isOpen, project, onClose }`
- **Design Tokens & Behavior:**
  - Overlay: `fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-2 lg:p-6`.
  - Window Chassis: `w-full max-w-7xl h-[92vh] bg-slate-900 rounded-xl border border-slate-700 flex flex-col overflow-hidden shadow-2xl`.
  - Window Header Chrome:
    - Left: macOS window controls (Red, Yellow, Green status dots).
    - Center: Simulated URL bar displaying project URL with verified SSL padlock icon.
    - Viewport Switcher Controls:
      - `🖥️ Desktop`: Sets iframe container to `w-full` (100%).
      - `📱 Tablet`: Sets iframe container to `max-w-[768px]` centered.
      - `📱 Móvil`: Sets iframe container to `max-w-[375px]` centered.
    - Right Actions: `↗ Abrir en Nueva Ventana` button and `✕` close button.
  - Iframe Element: Hardened sandboxed iframe (see Section 3).
  - Accessibility: Traps focus inside modal, listens to `Escape` key, sets `aria-modal="true"`.

#### 7. `PaginationControls.jsx`
- **Location:** `components/portfolio/PaginationControls.jsx`
- **Props:** `{ currentPage, totalPages, totalProjects, itemsPerPage }`
- **UI Elements:**
  - Previous Button: Disabled and muted when `currentPage === 1`. Links to `/portafolio` (if page 2) or `/portafolio/page/${currentPage - 1}`.
  - Page Number Buttons: Renders pills for `1, 2, ... totalPages`. Active page styled in `bg-pink-600 text-white font-bold shadow-md`.
  - Next Button: Styled in `bg-pink-600 text-white hover:bg-pink-700 rounded-full px-6 py-2.5 shadow-md`. Disabled on last page.
  - Telemetry Line: `text-sm text-gray-500 font-medium text-center mt-3`. E.g., *"Mostrando 1–5 de 32 proyectos curados"*.

#### 8. `ReadinessBadge.jsx`
- **Location:** `components/portfolio/ReadinessBadge.jsx`
- **Props:** `{ readiness, isPrivate }`
- **Badge Types:**
  - **Live & Embeddable (HTTP 200):** `bg-emerald-50 text-emerald-700 border border-emerald-200` with animated pulsing green dot.
  - **Live Standalone (HTTP 200, Blocked Frame):** `bg-blue-50 text-blue-700 border border-blue-200` with external link indicator.
  - **Offline / Local Architecture:** `bg-gray-100 text-gray-700 border border-gray-200` with terminal/code icon.
  - **Staging / CI Workflow:** `bg-amber-50 text-amber-700 border border-amber-200` with clock icon.
  - **Private / Commercial Work:** `bg-purple-50 text-purple-700 border border-purple-200` with lock icon.

---

## 2. Data Layer & Schema

### 2.1 Static JSON Sourcing Evaluation

| Criterion | Hygraph CMS (GraphQL) | GitHub REST API | Static `projects_catalog.json` (Selected) |
|---|---|---|---|
| **Response Latency** | 150–350ms network roundtrip | 200–600ms + rate limiting | **0ms (instant in-memory static compile)** |
| **External Dependencies** | Requires CMS schema changes & auth token | Requires `GITHUB_TOKEN` secret | **Zero external dependencies** |
| **Build Stability** | Fails if Hygraph endpoint is degraded | Fails if GitHub rate limit (60 req/hr) hits | **100% deterministic & version-controlled** |
| **Verified Metadata** | Cannot store verified HTTP probe codes | Raw GitHub data lacks live embed probes | **Stores pre-audited HTTP status, CSP, and assets** |
| **Architectural Fit** | Used for dynamic blog articles | Not used in codebase | **Matches `pages/education/data.json` pattern** |

**Architectural Decision:** Storing project data in `docs/portfolio/projects_catalog.json` and consuming it via `services/portfolio.js` guarantees that `next build --webpack` compiles all pages deterministically with zero network calls and zero quota consumption.

### 2.2 Formal Catalog Schema Contract

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "ProjectsCatalog",
  "type": "object",
  "required": ["metadata", "projects"],
  "properties": {
    "metadata": {
      "type": "object",
      "required": ["generatedAt", "totalAudited", "totalCurated", "projectsPerPage", "totalPages", "categories"],
      "properties": {
        "generatedAt": { "type": "string", "format": "date-time" },
        "totalAudited": { "type": "integer", "enum": [137] },
        "totalCurated": { "type": "integer" },
        "projectsPerPage": { "type": "integer", "enum": [4, 5] },
        "totalPages": { "type": "integer" },
        "categories": { "type": "array", "items": { "type": "string" } }
      }
    },
    "projects": {
      "type": "array",
      "items": {
        "type": "object",
        "required": [
          "id", "slug", "title", "tagline", "description", "category", "tags",
          "rank", "page", "readiness", "repository", "media"
        ],
        "properties": {
          "id": { "type": "string" },
          "slug": { "type": "string" },
          "title": { "type": "string" },
          "tagline": { "type": "string" },
          "description": { "type": "string" },
          "category": { "type": "string" },
          "tags": { "type": "array", "items": { "type": "string" } },
          "rank": {
            "type": "object",
            "required": ["position", "compositeScore"],
            "properties": {
              "position": { "type": "integer" },
              "compositeScore": { "type": "number", "minimum": 0, "maximum": 50 },
              "completenessScore": { "type": "number" },
              "complexityScore": { "type": "number" },
              "visualScore": { "type": "number" },
              "recencyScore": { "type": "number" },
              "domainScore": { "type": "number" }
            }
          },
          "page": { "type": "integer", "minimum": 1, "maximum": 8 },
          "featured": { "type": "boolean" },
          "readiness": {
            "type": "object",
            "required": ["status", "liveUrl", "httpStatus", "embeddable"],
            "properties": {
              "status": { "type": "string", "enum": ["live", "offline", "staging", "archived"] },
              "liveUrl": { "type": ["string", "null"] },
              "httpStatus": { "type": ["integer", "null"] },
              "embeddable": { "type": "boolean" },
              "embedUrl": { "type": ["string", "null"] },
              "xFrameOptions": { "type": ["string", "null"] },
              "cspFrameAncestors": { "type": ["string", "null"] },
              "verifiedAt": { "type": "string", "format": "date-time" }
            }
          },
          "repository": {
            "type": "object",
            "required": ["name", "isPrivate", "visibility"],
            "properties": {
              "name": { "type": "string" },
              "isPrivate": { "type": "boolean" },
              "visibility": { "type": "string", "enum": ["public", "private"] },
              "githubUrl": { "type": ["string", "null"] },
              "stars": { "type": "integer" },
              "forks": { "type": "integer" },
              "lastCommitDate": { "type": ["string", "null"] },
              "primaryLanguage": { "type": "string" }
            }
          },
          "media": {
            "type": "object",
            "required": ["previewMode", "thumbnail", "screenshots"],
            "properties": {
              "previewMode": { "type": "string", "enum": ["static_card", "gallery", "interactive_embed"] },
              "thumbnail": { "type": "string" },
              "screenshots": { "type": "array", "items": { "type": "string" } },
              "hasVisualAssets": { "type": "boolean" },
              "assetActionRequired": { "type": ["string", "null"] }
            }
          },
          "highlights": { "type": "array", "items": { "type": "string" } }
        }
      }
    }
  }
}
```

### 2.3 Service Layer Implementation (`services/portfolio.js`)

```javascript
/**
 * services/portfolio.js
 * High-performance, zero-latency data access layer for portfolio projects.
 */
import catalogData from '../docs/portfolio/projects_catalog.json';

const PROJECTS_PER_PAGE = 4; // Or 5 depending on catalog size

/**
 * Returns the entire array of curated projects.
 */
export function getProjectsCatalog() {
  return catalogData.projects || [];
}

/**
 * Returns metadata summary for hero statistics and pagination calculation.
 */
export function getProjectsMetadata() {
  return (
    catalogData.metadata || {
      totalAudited: 137,
      totalCurated: (catalogData.projects || []).length,
      projectsPerPage: PROJECTS_PER_PAGE,
      totalPages: Math.ceil((catalogData.projects || []).length / PROJECTS_PER_PAGE),
      categories: [],
    }
  );
}

/**
 * Slices the catalog for a given page number.
 */
export function getProjectsPerPage(pageNumber = 1, pageSize = PROJECTS_PER_PAGE) {
  const allProjects = getProjectsCatalog();
  const validPage = Math.max(1, parseInt(pageNumber, 10) || 1);
  const start = (validPage - 1) * pageSize;
  return allProjects.slice(start, start + pageSize);
}

/**
 * Retrieves a single project by slug.
 */
export function getProjectBySlug(slug) {
  const allProjects = getProjectsCatalog();
  return allProjects.find((project) => project.slug === slug) || null;
}

/**
 * Returns unique categories with project counts.
 */
export function getCategoriesWithCounts() {
  const allProjects = getProjectsCatalog();
  const counts = { Todos: allProjects.length };
  allProjects.forEach((p) => {
    if (p.category) {
      counts[p.category] = (counts[p.category] || 0) + 1;
    }
  });
  return counts;
}

/**
 * Computes total pages dynamically.
 */
export function getTotalPortfolioPages(pageSize = PROJECTS_PER_PAGE) {
  const allProjects = getProjectsCatalog();
  return Math.ceil(allProjects.length / pageSize) || 1;
}
```

### 2.4 Static Site Generation Pipeline (`getStaticProps` & `getStaticPaths`)

#### Page 1: `pages/portafolio/index.js`
```javascript
import Head from 'next/head';
import {
  PortfolioHeader,
  FilterBar,
  PortfolioGrid,
  ProjectEmbedModal,
} from '../../components/portfolio';
import {
  getProjectsPerPage,
  getProjectsMetadata,
  getCategoriesWithCounts,
  getTotalPortfolioPages,
} from '../../services/portfolio';

export default function PortfolioPage({
  projects,
  metadata,
  categoriesWithCounts,
  currentPage,
  totalPages,
}) {
  return (
    <>
      <Head>
        <title>Portafolio de Proyectos | Sebastián Gómez</title>
        <meta
          name="description"
          content="Explora 32 proyectos de software curados, aplicaciones web interactivas, herramientas de IA y sistemas fullstack en producción."
        />
        <meta property="og:title" content="Portafolio de Proyectos | Sebastián Gómez" />
        <meta property="og:type" content="website" />
      </Head>
      <PortfolioHeader
        totalAudited={metadata.totalAudited}
        totalCurated={metadata.totalCurated}
        totalLive={projects.filter((p) => p.readiness.status === 'live').length}
      />
      <PortfolioGrid
        projects={projects}
        currentPage={currentPage}
        totalPages={totalPages}
        totalProjects={metadata.totalCurated}
      />
    </>
  );
}

export async function getStaticProps() {
  const metadata = getProjectsMetadata();
  const totalPages = getTotalPortfolioPages(metadata.projectsPerPage || 4);
  const projects = getProjectsPerPage(1, metadata.projectsPerPage || 4);
  const categoriesWithCounts = getCategoriesWithCounts();

  return {
    props: {
      projects,
      metadata,
      categoriesWithCounts,
      currentPage: 1,
      totalPages,
    },
    // No revalidate needed since catalog is committed in repository
  };
}
```

#### Dynamic Pages: `pages/portafolio/page/[pageNumber].js`
```javascript
import Head from 'next/head';
import {
  PortfolioHeader,
  PortfolioGrid,
} from '../../../components/portfolio';
import {
  getProjectsPerPage,
  getProjectsMetadata,
  getCategoriesWithCounts,
  getTotalPortfolioPages,
} from '../../../services/portfolio';

export default function DynamicPortfolioPage({
  projects,
  metadata,
  currentPage,
  totalPages,
}) {
  return (
    <>
      <Head>
        <title>{`Portafolio de Proyectos - Página ${currentPage} | Sebastián Gómez`}</title>
      </Head>
      <PortfolioHeader
        totalAudited={metadata.totalAudited}
        totalCurated={metadata.totalCurated}
        totalLive={projects.filter((p) => p.readiness.status === 'live').length}
      />
      <PortfolioGrid
        projects={projects}
        currentPage={currentPage}
        totalPages={totalPages}
        totalProjects={metadata.totalCurated}
      />
    </>
  );
}

export async function getStaticPaths() {
  const metadata = getProjectsMetadata();
  const totalPages = getTotalPortfolioPages(metadata.projectsPerPage || 4);

  // Pre-render pages 2 through N at build time (Page 1 is handled by /portafolio)
  const paths = [];
  for (let page = 2; page <= totalPages; page++) {
    paths.push({
      params: { pageNumber: String(page) },
    });
  }

  return {
    paths,
    fallback: false, // Strict 404 for any page not in paths
  };
}

export async function getStaticProps({ params }) {
  const pageNumber = Number(params.pageNumber);
  const metadata = getProjectsMetadata();
  const totalPages = getTotalPortfolioPages(metadata.projectsPerPage || 4);

  // Strict 404 Guardrails matching SPEC-404-handling.md
  if (!Number.isInteger(pageNumber) || pageNumber < 1 || pageNumber > totalPages) {
    return { notFound: true };
  }

  const projects = getProjectsPerPage(pageNumber, metadata.projectsPerPage || 4);

  return {
    props: {
      projects,
      metadata,
      currentPage: pageNumber,
      totalPages,
    },
  };
}
```

---

## 3. Security & Iframe Sandboxing

### 3.1 Threat Model for Embedded Projects

Embedding untrusted or third-party web content inside a parent site presents five core security vectors:
1. **Top Navigation Hijacking (`window.top.location = ...`):** Malicious or unvetted scripts inside an iframe redirecting the user away from `sebastian-gomez.com` to an external phishing or scam page.
2. **Parent DOM & Cookie Stealing (`allow-same-origin` abuse):** If an iframe runs with identical origin or full access, scripts can inspect parent `localStorage`, cookies, or DOM structures.
3. **Modal & Form Exploitation (`window.alert`, auto-submitting forms):** Uncontrolled alert dialog loops or unauthorized POST requests.
4. **Mixed Content Insecurity:** Loading legacy `http://` URLs inside an `https://` production Next.js application triggers browser mixed content warnings.
5. **Resource Exhaustion:** Embedded audio/canvas loops consuming 100% of the client CPU/GPU in background tabs.

### 3.2 Hardened `<iframe>` Security Configuration

To mitigate all identified vectors, `ProjectEmbedModal.jsx` executes a defense-in-depth sandbox policy:

```jsx
<iframe
  src={secureEmbedUrl}
  title={`${project.title} - Vista Previa en Vivo`}
  className="w-full h-full bg-white border-0 transition-all duration-300"
  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
  referrerPolicy="no-referrer"
  loading="lazy"
  allow="autoplay 'none'; microphone 'none'; camera 'none'; geolocation 'none'"
  aria-label={`Interactive preview of ${project.title}`}
/>
```

#### Detailed Breakdown of Sandbox Tokens:
- **`allow-scripts`:** Required for interactive React/Vue/Web Audio applications to execute their client bundle.
- **`allow-same-origin`:** Required for SPAs to fetch their own static assets, WebAssembly chunks, and relative API routes on their hosting origin. Because the parent domain (`sebastian-gomez.com`) is completely distinct from the embedded origin (e.g., `seagomezar.github.io` or `*.vercel.app`), granting `allow-same-origin` does NOT grant access to the parent's origin cookies or DOM!
- **`allow-forms`:** Permitted for search/demo inputs inside the application.
- **`allow-popups`:** Allows links designated `target="_blank"` to open in separate browser tabs without breaking the modal experience.
- **CRITICAL EXCLUSIONS (Enforced):**
  - **`allow-top-navigation` is STRICTLY OMITTED:** Embedded applications cannot alter `window.top.location` or hijack the browser URL.
  - **`allow-top-navigation-by-user-activation` is OMITTED.**
  - **`allow-modals` is OMITTED:** Blocks intrusive `window.alert()`, `window.confirm()`, and prompt dialogs.
  - **`allow-pointer-lock` is OMITTED.**
- **`referrerPolicy="no-referrer"`:** Prevents the parent page URL, query parameters, and session tokens from leaking in the HTTP `Referer` header to external origins.
- **`loading="lazy"`:** Defers network requests and asset hydration until the modal is actively opened by the user.

### 3.3 Restrictive Header Detection & Fallback Handling

Certain legitimate applications (such as `gdgdevfestmed`, which returns `X-Frame-Options: sameorigin`) prohibit iframe embedding by design. The modal implements a graceful fallback mechanism:

```jsx
// Fallback state management inside ProjectEmbedModal.jsx
const [loadError, setLoadError] = useState(false);
const [isLoading, setIsLoading] = useState(true);

const handleIframeLoad = () => {
  setIsLoading(false);
};

const handleIframeError = () => {
  setLoadError(true);
  setIsLoading(false);
};

// If project.readiness.embeddable is false OR loadError is caught:
{(!project.readiness.embeddable || loadError) ? (
  <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-slate-900 text-white">
    <div className="p-4 bg-slate-800 rounded-full mb-4 text-3xl">🛡️</div>
    <h3 className="text-xl font-bold mb-2">Visualización Externa Protegida</h3>
    <p className="max-w-md text-slate-300 text-sm mb-6">
      Este proyecto cuenta con directivas de seguridad (<code>X-Frame-Options: SAMEORIGIN</code>)
      que protegen la aplicación impidiendo su ejecución embebida. Puedes explorarla en vivo
      directamente en su entorno de producción.
    </p>
    <a
      href={project.readiness.liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-pink-600 hover:bg-pink-700 text-white font-medium px-8 py-3 rounded-full shadow-lg transition"
    >
      Abrir en Nueva Ventana ↗
    </a>
  </div>
) : (
  <iframe /* hardened attributes */ />
)}
```

### 3.4 Origin & Protocol Normalization

To ensure secure cross-origin communication:
1. **Force HTTPS Protocol:** Any legacy URL starting with `http://` is automatically coerced to `https://` via `const secureEmbedUrl = project.readiness.liveUrl.replace(/^http:\/\//i, 'https://');`.
2. **Private Repository Data Masking:** Projects flagged with `repository.isPrivate === true` never expose internal GitHub URLs or raw origin endpoints. The modal header displays *"Entorno Comercial Verificado"* instead of an external repository link.

---

## 4. Testing Strategy & Quality Assurance

### 4.1 Unit & Component Tests (Jest + React Testing Library)

Testing targets reside in `__tests__/` mirroring the codebase structure.

#### 1. Catalog Schema Integrity Test (`__tests__/services/portfolio-data.test.js`)
```javascript
import catalog from '../../docs/portfolio/projects_catalog.json';

describe('Portfolio Catalog Integrity', () => {
  it('contains exactly 137 audited repositories in metadata', () => {
    expect(catalog.metadata.totalAudited).toBe(137);
  });

  it('has between 30 and 40 curated projects', () => {
    expect(catalog.projects.length).toBeGreaterThanOrEqual(30);
    expect(catalog.projects.length).toBeLessThanOrEqual(40);
  });

  it('ensures every project has a unique id, slug, and positive rank position', () => {
    const slugs = new Set();
    const ids = new Set();

    catalog.projects.forEach((project, idx) => {
      expect(project.id).toBeTruthy();
      expect(project.slug).toBeTruthy();
      expect(ids.has(project.id)).toBe(false);
      expect(slugs.has(project.slug)).toBe(false);
      ids.add(project.id);
      slugs.add(project.slug);

      expect(project.rank.position).toBe(idx + 1);
      expect(project.rank.compositeScore).toBeGreaterThanOrEqual(0);
      expect(project.rank.compositeScore).toBeLessThanOrEqual(50);
    });
  });

  it('verifies that private projects do not leak public github URLs', () => {
    catalog.projects.forEach((project) => {
      if (project.repository.isPrivate) {
        expect(project.repository.visibility).toBe('private');
        expect(project.repository.githubUrl).toBeNull();
      }
    });
  });
});
```

#### 2. Service Layer Unit Tests (`__tests__/services/portfolio.test.js`)
```javascript
import {
  getProjectsCatalog,
  getProjectsPerPage,
  getTotalPortfolioPages,
  getCategoriesWithCounts,
} from '../../services/portfolio';

describe('services/portfolio.js Unit Tests', () => {
  it('retrieves correct slice for page 1 and page 2', () => {
    const page1 = getProjectsPerPage(1, 4);
    const page2 = getProjectsPerPage(2, 4);

    expect(page1.length).toBe(4);
    expect(page2.length).toBe(4);
    expect(page1[0].id).not.toBe(page2[0].id);
  });

  it('handles negative or zero page number gracefully', () => {
    const page = getProjectsPerPage(0, 4);
    expect(page.length).toBe(4); // Defaults to page 1
  });

  it('computes total pages accurately', () => {
    const total = getTotalPortfolioPages(4);
    expect(total).toBe(8);
  });

  it('aggregates category counts correctly', () => {
    const counts = getCategoriesWithCounts();
    expect(counts['Todos']).toBe(getProjectsCatalog().length);
    expect(Object.keys(counts).length).toBeGreaterThan(1);
  });
});
```

#### 3. Pagination Controls Component Test (`__tests__/components/portfolio/PaginationControls.test.js`)
```javascript
import React from 'react';
import { render, screen } from '@testing-library/react';
import PaginationControls from '../../../components/portfolio/PaginationControls';

describe('PaginationControls Component', () => {
  it('renders all page number buttons and highlights active page', () => {
    render(
      <PaginationControls
        currentPage={1}
        totalPages={8}
        totalProjects={32}
        itemsPerPage={4}
      />
    );

    const activeBtn = screen.getByRole('button', { name: '1' });
    expect(activeBtn).toHaveClass('bg-pink-600');

    const nextBtn = screen.getByRole('link', { name: /siguiente/i });
    expect(nextBtn).toBeInTheDocument();
  });

  it('disables previous button on page 1', () => {
    render(
      <PaginationControls
        currentPage={1}
        totalPages={8}
        totalProjects={32}
        itemsPerPage={4}
      />
    );

    const prevBtn = screen.queryByRole('link', { name: /anterior/i });
    expect(prevBtn).toBeNull(); // Or disabled
  });
});
```

#### 4. ProjectEmbedModal Lifecycle & Security Test (`__tests__/components/portfolio/ProjectEmbedModal.test.js`)
```javascript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProjectEmbedModal from '../../../components/portfolio/ProjectEmbedModal';

const mockProject = {
  title: 'AI Music Generator',
  readiness: {
    status: 'live',
    liveUrl: 'https://seagomezar.github.io/AI-Based-Music-Generator-ReactJS/',
    embeddable: true,
  },
  repository: { isPrivate: false },
};

describe('ProjectEmbedModal Component', () => {
  it('renders hardened iframe attributes when open', () => {
    render(
      <ProjectEmbedModal
        isOpen={true}
        project={mockProject}
        onClose={jest.fn()}
      />
    );

    const iframe = screen.getByTitle(/AI Music Generator - Vista Previa en Vivo/i);
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute(
      'sandbox',
      'allow-scripts allow-same-origin allow-forms allow-popups'
    );
    expect(iframe).not.toHaveAttribute('sandbox', expect.stringContaining('allow-top-navigation'));
    expect(iframe).toHaveAttribute('referrerpolicy', 'no-referrer');
    expect(iframe).toHaveAttribute('loading', 'lazy');
  });

  it('triggers onClose when close button is clicked', () => {
    const handleClose = jest.fn();
    render(
      <ProjectEmbedModal
        isOpen={true}
        project={mockProject}
        onClose={handleClose}
      />
    );

    const closeBtn = screen.getByRole('button', { name: /cerrar/i });
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
```

### 4.2 404 Guardrail Tests (`SPEC-404-handling.md` Compliance)

In strict accordance with `SPEC-404-handling.md` and matching `__tests__/pages/page.test.js`:

```javascript
// __tests__/pages/portfolio-page.test.js
import { getStaticProps, getStaticPaths } from '../../pages/portafolio/page/[pageNumber]';

describe('portafolio/page/[pageNumber] SSG 404 Guardrails', () => {
  it('returns notFound: true for non-numeric pageNumber (e.g., abc)', async () => {
    const result = await getStaticProps({ params: { pageNumber: 'abc' } });
    expect(result).toEqual({ notFound: true });
  });

  it('returns notFound: true for pageNumber = 0', async () => {
    const result = await getStaticProps({ params: { pageNumber: '0' } });
    expect(result).toEqual({ notFound: true });
  });

  it('returns notFound: true for negative pageNumber = -1', async () => {
    const result = await getStaticProps({ params: { pageNumber: '-1' } });
    expect(result).toEqual({ notFound: true });
  });

  it('returns notFound: true for out-of-range pageNumber = 9 (total 8 pages)', async () => {
    const result = await getStaticProps({ params: { pageNumber: '9' } });
    expect(result).toEqual({ notFound: true });
  });

  it('returns valid props for legitimate pageNumber = 2', async () => {
    const result = await getStaticProps({ params: { pageNumber: '2' } });
    expect(result.notFound).toBeUndefined();
    expect(result.props.currentPage).toBe(2);
    expect(result.props.projects.length).toBeGreaterThan(0);
  });

  it('pre-renders exactly pages 2 through 8 in getStaticPaths with fallback: false', async () => {
    const { paths, fallback } = await getStaticPaths();
    expect(fallback).toBe(false);
    expect(paths.map((p) => p.params.pageNumber)).toEqual([
      '2', '3', '4', '5', '6', '7', '8',
    ]);
  });
});
```

### 4.3 End-to-End Cypress Tests (`cypress/e2e/portfolio.spec.cy.js`)

```javascript
describe('Portfolio Page End-to-End Tests', () => {
  beforeEach(() => {
    cy.visit('/portafolio');
  });

  it('loads the canonical portfolio page with 4-5 projects and metrics ribbon', () => {
    cy.get('h1').contains(/portafolio de proyectos/i).should('be.visible');
    cy.contains(/137 repositorios auditados/i).should('be.visible');
    cy.get('[data-testid="project-card"]').should('have.length.within', 4, 5);
  });

  it('navigates to page 2 via pagination controls and updates URL', () => {
    cy.get('[aria-label="Página 2"]').click();
    cy.url().should('include', '/portafolio/page/2');
    cy.get('h1').should('be.visible');
    cy.get('[data-testid="project-card"]').should('have.length.within', 4, 5);
  });

  it('opens and closes the interactive live embed modal workstation', () => {
    cy.contains('button', /probar en vivo/i).first().click();
    cy.get('[data-testid="embed-modal"]').should('be.visible');
    cy.get('iframe').should('have.attr', 'sandbox');

    // Switch viewports
    cy.get('button[aria-label="Vista Celular"]').click();
    cy.get('[data-testid="iframe-container"]').should('have.class', 'max-w-[375px]');

    // Close modal
    cy.get('button[aria-label="Cerrar Modal"]').click();
    cy.get('[data-testid="embed-modal"]').should('not.exist');
  });

  it('enforces 404 on invalid or out-of-range portfolio page', () => {
    cy.visit('/portafolio/page/99', { failOnStatusCode: false });
    cy.contains('Página no encontrada').should('be.visible');
    cy.contains(/revisar las categorías o los posts recientes/i).should('exist');

    cy.visit('/portafolio/page/abc', { failOnStatusCode: false });
    cy.contains('Página no encontrada').should('be.visible');
  });
});
```

---

## 5. Concrete Readiness Remediation Roadmap

Based on the survey audit of all 137 local repositories, this section outlines specific actions to elevate high-value projects into production-ready portfolio showcases.

### 5.1 Actionable Remediation Checklist for Top Projects

| Rank | Repository | Current Status | Assets | Remediation Action Plan |
|---|---|---|---|---|
| **#1** | `practifactu` | OFFLINE (Private SaaS) | 17 PNGs in `docs/screenshots/` | **Staging Demo Deployment:** Next.js + Prisma app. Deploy sanitized demo on Vercel (`practifactu-demo.vercel.app`) using mock SQLite/PostgreSQL database with pre-seeded test invoices. Exclude real DIAN API keys. |
| **#2** | `music-journal-app` | LIVE (HTTP 200) | 69 PNGs (8 high-res) | **Asset Optimization:** Web build is live at `https://seagomezar.github.io/music-journal-app/`. Convert 8 mobile PNGs to modern WebP thumbnails in `public/portfolio/screenshots/music-journal-*.webp`. |
| **#3** | `herbalism-bot` | OFFLINE (Private) | 41 PNGs | **Showcase Mode:** Computer vision bot. Keep as Mode 2 Gallery card. Generate a 15-second compressed WebM/GIF demonstrating OpenCV minimap detection. |
| **#4** | `sonoma-racing-coach` | LIVE (HTTP 200 API) | 11 PNGs | **Live Telemetry Connection:** Cloud Run backend is healthy at `https://apexai-812524149286.us-central1.run.app/events/telemetry`. Wire an interactive radar chart in Mode 3 modal displaying the real-time SSE stream. |
| **#5** | `sebastian-gomez-next` | OFFLINE | 48 PNGs | **Static Architecture Mode:** Use rich existing screenshots for Mode 2 Gallery. Provide deep-link to GitHub source. |
| **#6** | `real-time-coach-codelab` | OFFLINE (404) | 1 PNG | **Deploy to GitHub Pages:** Three.js + Chrome Gemini Nano AI app. Build static export (`npm run build`) and push to `gh-pages` branch. Capture 3 high-res 1080p screenshots. |
| **#7** | `crecere-agents` | OFFLINE (Private) | 5 PNGs | **Protocol Architecture Mode:** Document Agent2Agent Google protocol. Render architecture diagram as primary asset. |
| **#8** | `anthropometry-app` | LIVE (HTTP 200) | 7 PNGs | **Embed Verification:** Live at `https://anthropometry.sebastian-gomez.com`. Permissive headers verified. Enable Mode 3 Interactive Embed immediately. |
| **#9** | `flutemodes` | LIVE (HTTP 200) | 15 PNGs | **Embed Verification:** Live at `https://seagomezar.github.io/flutemodes/`. Enable Mode 3 Interactive Embed. |
| **#10**| `agendarcitademaquillaje` | LIVE (HTTP 200) | 32 PNGs | **Embed Verification:** Live at `https://seagomezar.github.io/agendarcitademaquillaje/`. Enable Mode 3 Interactive Embed. |
| **Bonus**| `AI-Based-Music-Generator-ReactJS`| LIVE (HTTP 200) | 0 PNGs | **Automated Screenshot Capture:** Live on GitHub Pages but missing visual thumbnails. Execute automated Playwright script to capture UI at 1920x1080. |
| **Bonus**| `tmux-game` | LIVE (HTTP 200) | 0 PNGs | **Automated Screenshot Capture:** Live on GitHub Pages. Capture terminal canvas screenshot at 1440x900. |
| **Bonus**| `sgi-v2` | OFFLINE (Private) | 29 PNGs | **Deploy Demo on Vercel:** Next.js AgTech pumping controller. Deploy with simulated IoT sensors. |

### 5.2 Headless Browser Visual Asset Capture Automation

To remediate projects lacking visual assets (e.g., `AI-Based-Music-Generator-ReactJS`, `tmux-game`, `real-time-coach-codelab`), the following standalone script automates headless screenshot capture across desktop and mobile viewports:

```javascript
/**
 * scripts/capture-portfolio-screenshots.mjs
 * Automates high-resolution WebP screenshot generation using Playwright.
 * Run: node scripts/capture-portfolio-screenshots.mjs
 */
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const TARGET_OUTPUT_DIR = path.resolve('public/portfolio/screenshots');

const TARGET_URLS = [
  {
    slug: 'ai-based-music-generator',
    url: 'https://seagomezar.github.io/AI-Based-Music-Generator-ReactJS/',
    waitFor: 3000,
  },
  {
    slug: 'tmux-game',
    url: 'https://seagomezar.github.io/tmux-game/',
    waitFor: 2500,
  },
  {
    slug: 'anthropometry-app',
    url: 'https://anthropometry.sebastian-gomez.com',
    waitFor: 2000,
  },
  {
    slug: 'autoreserva',
    url: 'https://autoreserva.vercel.app/',
    waitFor: 2000,
  },
  {
    slug: 'rigare',
    url: 'https://rigare.vercel.app/',
    waitFor: 2000,
  },
];

async function capture() {
  if (!fs.existsSync(TARGET_OUTPUT_DIR)) {
    fs.mkdirSync(TARGET_OUTPUT_DIR, { recursive: true });
  }

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2,
  });

  const page = await context.newPage();

  for (const item of TARGET_URLS) {
    console.log(`Capturing ${item.slug} from ${item.url}...`);
    try {
      await page.goto(item.url, { waitUntil: 'networkidle', timeout: 30000 });
      if (item.waitFor) await page.waitForTimeout(item.waitFor);

      // Desktop screenshot
      const desktopPath = path.join(TARGET_OUTPUT_DIR, `${item.slug}-desktop.webp`);
      await page.screenshot({ path: desktopPath, type: 'png' });
      console.log(`Saved ${desktopPath}`);

      // Mobile screenshot
      await page.setViewportSize({ width: 390, height: 844 });
      await page.waitForTimeout(500);
      const mobilePath = path.join(TARGET_OUTPUT_DIR, `${item.slug}-mobile.webp`);
      await page.screenshot({ path: mobilePath, type: 'png' });
      console.log(`Saved ${mobilePath}`);

      // Reset viewport
      await page.setViewportSize({ width: 1920, height: 1080 });
    } catch (err) {
      console.error(`Failed capturing ${item.slug}:`, err.message);
    }
  }

  await browser.close();
  console.log('Capture completed successfully.');
}

capture();
```

### 5.3 Deployment Blueprints for Offline High-Value Apps

#### Blueprint A: `real-time-coach-codelab` (GitHub Actions CI/CD to GitHub Pages)
Create `.github/workflows/deploy.yml` in `c:\Users\Usuario\Documents\mis repositorios\real-time-coach-codelab`:
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
permissions:
  contents: write
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - name: Deploy to GitHub Pages
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: dist
          branch: gh-pages
```

#### Blueprint B: `AI-Based-Music-Generator-ReactJS` (Vercel CLI Deployment)
In repository `c:\Users\Usuario\Documents\mis repositorios\AI-Based-Music-Generator-ReactJS`:
```bash
# 1. Install or update dependencies
npm install

# 2. Add vercel.json configuration for clean SPA routing and permissive headers
cat << 'EOF' > vercel.json
{
  "version": 2,
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Origin", "value": "*" },
        { "key": "X-Frame-Options", "value": "ALLOWALL" }
      ]
    }
  ]
}
EOF

# 3. Deploy to production
vercel --prod --yes
```

#### Blueprint C: `sgi-v2` & `practifactu` Demo Mock Blueprint (Vercel Environment)
To deploy offline private apps without leaking credentials:
1. Create a `demo/` branch.
2. Replace private database connection strings with an in-memory SQLite (`sqlite://demo.db`) or local JSON mock database.
3. Configure `vercel.json` with `NEXT_PUBLIC_DEMO_MODE=true`.
4. Deploy to `https://practifactu-demo.vercel.app` and `https://sgi-v2-demo.vercel.app`.

---

## 6. Verification & Non-Destructive Guardrail Checklist

### 6.1 Strict Non-Destructive Pre-Implementation Verification

To comply with the project mandate that existing tracked files remain untouched during this specification and planning phase:

```bash
# Step 1: Verify git status in target repository
git status --porcelain

# Expected Output:
# ?? .agents/
# ?? docs/portfolio/
# (Zero tracked application files modified)
```

#### File Immutability Matrix:
- `pages/` (existing routes): **UNTOUCHED**
- `components/` (existing widgets): **UNTOUCHED**
- `services/index.js`: **UNTOUCHED**
- `package.json` & `package-lock.json`: **UNTOUCHED**
- `next.config.js`: **UNTOUCHED**
- `SPEC-404-handling.md`: **UNTOUCHED**

### 6.2 Implementation Phase Execution Gate Checklist

When approval is granted to begin code implementation, the following checklist must be validated step-by-step:

- [ ] **Data Placement:** `docs/portfolio/projects_catalog.json` copied/linked to `data/projects_catalog.json`.
- [ ] **Service Layer:** `services/portfolio.js` created and validated with unit tests.
- [ ] **Component Creation:** All 8 modular components created under `components/portfolio/`.
- [ ] **Route Scaffolding:**
  - `pages/portafolio/index.js` created.
  - `pages/portafolio/page/[pageNumber].js` created.
- [ ] **Header Integration:** `components/CategoryList.jsx` updated with `<Link href="/portafolio">Portafolio</Link>`.
- [ ] **Quality Assurance Gates:**
  1. `npm run lint` passes with 0 errors (`eslint .`).
  2. `npm test` passes with 100% of new unit tests passing (`jest`).
  3. `npm run build` (`next build --webpack`) succeeds, compiling all 8 static portfolio pages (`/portafolio` and `/portafolio/page/2` through `8`).
  4. `npm run cypress:run` completes with all E2E specs passing.

---

## 7. Implementation Roadmap & Timeline

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       PORTFOLIO IMPLEMENTATION PHASING                      │
├──────────┬─────────────────────────────┬────────────────────────────────────┤
│ Phase    │ Focus Area                  │ Deliverables & Milestones           │
├──────────┼─────────────────────────────┼────────────────────────────────────┤
│ Phase 1  │ Data Layer & Services       │ • Finalize projects_catalog.json   │
│          │                             │ • Implement services/portfolio.js  │
│          │                             │ • Unit tests for data slicing      │
├──────────┼─────────────────────────────┼────────────────────────────────────┤
│ Phase 2  │ UI Components & Stitch Prep │ • Build ReadinessBadge & Tags      │
│          │                             │ • Build ProjectCard (Mode 1)       │
│          │                             │ • Build ProjectCarouselCard (Mode2)│
│          │                             │ • Build FilterBar & Pagination     │
├──────────┼─────────────────────────────┼────────────────────────────────────┤
│ Phase 3  │ Modal & Sandboxed Iframe    │ • Build ProjectEmbedModal (Mode 3) │
│          │                             │ • Viewport switcher & Fallback     │
│          │                             │ • Security tokens verification     │
├──────────┼─────────────────────────────┼────────────────────────────────────┤
│ Phase 4  │ Routing & SSG Pre-rendering │ • Scaffolding pages/portafolio/    │
│          │                             │ • getStaticProps & getStaticPaths  │
│          │                             │ • SPEC-404 compliance verification │
├──────────┼─────────────────────────────┼────────────────────────────────────┤
│ Phase 5  │ Asset Remediation & E2E     │ • Run Playwright screenshot capture│
│          │                             │ • Cypress E2E test suite execution │
│          │                             │ • Production build verification    │
└──────────┴─────────────────────────────┴────────────────────────────────────┘
```

This implementation plan is comprehensive, self-contained, and fully actionable. Engineers can proceed directly to execution upon milestone sign-off.
