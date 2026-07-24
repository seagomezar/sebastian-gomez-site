# Project: Sebastian Gomez Site (GraphCMS Headless Blog)

Personal blog + site. Next.js (Pages Router) fetching content from Hygraph (GraphCMS)
over GraphQL. Bilingual (es default, `/en` routes). Deployed on Vercel.

## Tech Stack
- Next.js 16 (Pages Router), React 19
- Tailwind CSS 4 + SASS (`styles/globals.scss`)
- Data: Hygraph via `graphql-request` / `@apollo/client`; queries are `.gql` files
- `@vercel/postgres` (comments/feedback), `@vercel/analytics`
- Tests: Jest + Testing Library (unit), Cypress (E2E)
- Node >= 14 (`engineStrict`)

## Commands
- Dev: `npm run dev` (http://localhost:3000)
- Build: `npm run build`
- Lint: `npm run lint` (eslint flat config, `eslint.config.mjs`)
- Unit tests: `npm test` (Jest)
- E2E: `npm run cypress:open` / `npm run cypress:run`

## Project Structure
- `pages/` — routes (Pages Router). English variants under `pages/en/`. Data via `getServerSideProps`.
- `components/` — reusable UI, `.jsx`, exported through the `components/index.jsx` barrel
- `sections/` — larger composed page sections
- `services/` — data access. `index.js` is the central hub for CMS calls; `parsing.js` holds `getContentFragment` (rich-text renderer); `graphql/queries/*.gql` are the queries
- `lib/` — pure utilities (imageLoader, ads, color)
- `__tests__/` — all unit tests, mirroring source layout (`__tests__/components/Foo.test.jsx`)
- `__mocks__/` — Jest mocks
- `public/` — static assets

## Code Conventions
- Function components only; default export for pages/components, named exports re-bundled in `components/index.jsx`
- Components use `.jsx`; plain utilities use `.js`
- React 17+ JSX transform — no `import React` needed for JSX (rule is off), though existing files often still import it; match the file you're editing
- `prop-types` is disabled — don't add PropTypes
- Style with Tailwind utility classes first; custom styles in `styles/globals.scss`
- Fetch data through helpers in `services/index.js`, not inline `fetch`/queries in pages
- Render Hygraph rich text via `getContentFragment` from `services/parsing`
- Use `next/image` for images; flag/locale toggles use numeric `width`/`height` and `unoptimized`
- `getServerSideProps` returns `(await getX()) || []` fallbacks (see `pages/about.js`)

## Testing Conventions
- Unit tests live in `__tests__/`, mirroring the source path; name `*.test.js(x)`
- Use Testing Library queries; mocks go in `__mocks__/`
- E2E specs under `cypress/`

## Boundaries
- Never commit `.env`, `.env.local`, or secrets
- Don't add dependencies without a clear need (small site, mind bundle size)
- Keep refactors separate from feature/bugfix commits
- Branch before committing on `main`; PRs target `main`

## Blog Content Rules
- No emoji, no prose hyphens in blog post text (see `CONTENT_GUIDELINES.md`)
- Live posts resolve at `/post/<slug>` (singular)

## Related Docs
- `GEMINI.md` — older overview (note: predates Next 16 upgrade)
- `SPEC.md`, `SPEC-404-handling.md`, `SPEC-post-language-toggle.md` — feature specs
- `ANALYTICS.md`, `CONTENT_GUIDELINES.md`
