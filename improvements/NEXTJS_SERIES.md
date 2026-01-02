# Improvements for Next.js Series

## Overview
The current Next.js series provides a solid foundation but is based on the **Pages Router** (Next.js 12 and older). With the project now using Next.js 15, the content is significantly outdated. The primary recommendation is a comprehensive update to reflect the **App Router**, **React Server Components**, and modern data fetching paradigms.

## 1. Introducción a Next.js / Comenzando con Next.js
**Slug:** `introduccion-a-nextjs`, `comenzando-con-nextjs`
*   **Current Status:** Introduces Next.js as a framework for SSR/SSG using the `pages` directory. Mentions `create-next-app`.
*   **Proposed Improvements:**
    *   **Shift to App Router:** Introduce the `app/` directory structure (`layout.tsx`, `page.tsx`) as the default.
    *   **RSC First:** Explain that components are Server Components by default.
    *   **Turbopack:** Mention `next dev --turbo` for faster development.
    *   **Code Snippets:** Update `npm run dev` output and folder structure examples to match Next.js 15.

## 2. Enrutando páginas / Navegación
**Slug:** `enrutando-paginas-en-nextjs`, `navegacion-entre-rutas-en-nextjs`
*   **Current Status:** Explains file-system routing in `pages/` and `<Link>` usage.
*   **Proposed Improvements:**
    *   **Layouts & Nested Routing:** Explain how `layout.js` enables persistent UI across routes, a key feature of the App Router.
    *   **Link Component:** Update `<Link>` usage (no longer requires child `<a>` tag in newer versions).
    *   **useRouter:** Distinguish between `next/navigation` (App Router) and `next/router` (Pages Router).

## 3. Data Fetching (Obteniendo datos / Modos de renderizado)
**Slug:** `obteniendo-datos-con-nextjs`, `modos-de-renderizado-en-nextjs`
*   **Current Status:** Heavily focuses on `getStaticProps`, `getServerSideProps`, and `getInitialProps`.
*   **Proposed Improvements:**
    *   **DEPRECATE (Conceptually):** Mark `getStaticProps` and `getServerSideProps` as legacy for App Router.
    *   **Async Components:** Introduce `async` function components and direct `fetch` calls.
    *   **Caching:** Explain `fetch('...', { cache: 'force-cache' })` and `revalidate`.
    *   **Streaming:** Introduce `Suspense` and `loading.js` for progressive rendering.

## 4. API Rest
**Slug:** `crea-tu-api-rest-con-nextjs`
*   **Current Status:** Uses `pages/api` functions with `req`, `res`.
*   **Proposed Improvements:**
    *   **Route Handlers:** Switch to `app/api/.../route.js`.
    *   **Request/Response:** Use standard Web `Request` and `Response` (or `NextRequest`/`NextResponse`) objects instead of Node.js-like req/res.
    *   **Methods:** Explain named exports (`GET`, `POST`, etc.) instead of a single default handler with a switch statement.

## 5. Styling & Config
**Slug:** `css-y-estilos-en-nextjs`, `theme-ui-en-nextjs`, `personalizando-la-configuracion-en-nextjs`
*   **Current Status:** Mentions Global CSS, CSS Modules, and Theme UI.
*   **Proposed Improvements:**
    *   **Tailwind CSS:** Since the project has `tailwind.config.js`, emphasize Tailwind as the primary styling solution.
    *   **CSS-in-JS Warning:** Note that runtime CSS-in-JS (like Theme UI) has limitations in Server Components; recommend zero-runtime solutions or Tailwind.
    *   **Config:** Update `next.config.js` tips for the latest version (e.g., `images.remotePatterns` instead of `domains`).

## 6. Dynamic Components & Deployment
**Slug:** `carga-de-componentes-dinamicos-en-nextjs`, `despliegue-de-aplicaciones-nextjs`
*   **Current Status:** dynamic imports and Vercel deployment.
*   **Proposed Improvements:**
    *   **Suspense:** Highlight that `Suspense` is often a better alternative to manual dynamic loading for data boundaries.
    *   **Vercel:** Update screenshots of the deployment flow. Mention "Framework Detection" which automatically handles Next.js 15.
