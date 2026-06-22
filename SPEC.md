# Spec: Conference Landing Pages & Attendee Feedback

> **Status:** Shipped (commits `4553064`, `093cb61`). This is a *living* spec — the
> source of truth for the conference feature. Update it before changing behavior,
> not after.

## Objective

Give speaking-engagement attendees a single per-conference landing page they reach
right after a talk (typically via a QR code or short link), where they can:

1. Download the talk's slides.
2. Read recommended posts related to the talk's topic.
3. Leave feedback (name, comment, 1–5 score).
4. Request bringing the talk to their company/university (Google Form link).

**User:** Spanish-speaking attendees of Sebastián's conference talks. All UI copy is
in Spanish and must stay that way.

**Why:** Convert in-room attention into measurable engagement (analytics), captured
feedback (CMS), and content discovery — without requiring a site rebuild per event.

### Success Criteria

- Visiting `/conferences/<slug>` for a conference that exists in the CMS renders the
  talk title, a slides button (when `slidesUrl` is set), recommended posts, and the
  feedback form.
- An unknown slug returns a 404 (Next.js `notFound`).
- New conferences appear immediately after being published in the CMS — **no
  redeploy required** (this is why the page is SSR, not static).
- Submitting valid feedback persists a `ConferenceFeedback` record in the CMS,
  connected to the conference by `slug`, and shows a success message.
- The four GA4 events fire on their respective interactions (see Analytics).
- The page's accent color is driven by the conference's `themeColor`, defaulting to
  `#db2777` (pink-600) when unset.

## Tech Stack

- **Framework:** Next.js 16 (Pages Router), React 19
- **CMS:** Hygraph (GraphCMS) — GraphQL
- **Data fetching:** Apollo Client (reads, `services/index.js`), `graphql-request`
  (writes, in the API route)
- **Styling:** Tailwind CSS v4, with inline `style` for dynamic theme color
- **Analytics:** GA4 via `lib/analytics.js` (`event(...)`)
- **SEO:** `next-seo` (`NextSeo`)
- **Testing:** Jest + React Testing Library (unit), Cypress (e2e)

### CMS Models (assumed provisioned in Hygraph)

- **Conference:** `name`, `slug`, `talkTitle`, `slidesUrl`, `googleFormUrl`,
  `themeColor { hex }`, `categories[] { name, slug }`
- **ConferenceFeedback:** `userName` (String), `comment` (String), `score` (Int),
  `conference` (relation to Conference, connected by `slug`)

### Required Environment Variables

```
NEXT_PUBLIC_GRAPHCMS_ENDPOINT   # Hygraph GraphQL endpoint (client + server)
GRAPHCMS_TOKEN                  # Hygraph mutation token (server-only, write access)
NEXT_PUBLIC_GA_MEASUREMENT_ID   # GA4 measurement id (analytics)
```

## Commands

```
Dev:   npm run dev                              # next dev --webpack
Build: npm run build                            # next build --webpack
Start: npm run start
Lint:  npm run lint                             # eslint .   (use: npx eslint . --fix to autofix)
Test:  npm test                                 # jest
E2E:   npm run cypress:run                       # start dev server + run cypress
E2E (interactive): npm run cypress:open
```

## Project Structure

```
pages/conferences/[slug].js               → SSR landing page (getServerSideProps)
pages/api/conferenceFeedback.js           → API route: writes ConferenceFeedback to CMS
components/ConferenceFeedbackForm.jsx      → Feedback form (client component, localStorage)
services/index.js                          → getConferenceDetails(), submitConferenceFeedback()
services/graphql/queries/getConference.gql → Conference read query
lib/analytics.js                           → GA4 event() helper
__tests__/services/                        → Existing Jest tests (conference tests go here)
```

## Code Style

Match the existing codebase. Reads go through `services/index.js`; the React layer
never calls Apollo/fetch directly. Analytics events use the `{ action, category,
label, value? }` shape.

```js
// services/index.js — a read helper
export const getConferenceDetails = async (slug) => {
    const { data } = await client.query({
        query: GET_CONFERENCE_QUERY,
        variables: { slug },
    });
    return data.conference;
};

// analytics event shape (lib/analytics.js)
event({
  action: 'submit_conference_feedback',
  category: 'conference_landing',
  label: conferenceName,
  value: parseInt(score, 10),
});
```

**Conventions:**

- 4-space indent in `services/`, 2-space in components/pages (follow the file you're in).
- GraphQL queries live in `.gql` files and are imported by their named export.
- Component files: `PascalCase.jsx`. Pages: lowercase, dynamic routes in `[brackets]`.
- All user-facing copy in **Spanish**.
- Dynamic theme color via inline `style={{ ... }}`; everything else via Tailwind classes.

## Analytics (GA4 events)

| Action | Category | When | Label / Value |
|---|---|---|---|
| `view_conference_page` | `conference_landing` | Page mount (conference loaded) | label = `conference.name` |
| `click_conference_slides` | `conference_landing` | Slides button click | label = `conference.name` |
| `click_conference_form` | `conference_landing` | Google Form button click | label = `conference.name` |
| `submit_conference_feedback` | `conference_landing` | Successful feedback submit | label = name, value = score |

## Testing Strategy

- **Framework:** Jest + React Testing Library for units; Cypress for e2e.
- **Location:** Unit tests under `__tests__/` mirroring source paths; existing tests
  live in `__tests__/services/`.
- **Coverage target:** 90% for new/changed conference code (per project DAD config).
- **What to test:**
  - `services`: `getConferenceDetails` returns `data.conference`;
    `submitConferenceFeedback` POSTs the right body and parses JSON.
  - API route: validation rejects bad input (see follow-ups); happy path returns 200.
  - `ConferenceFeedbackForm`: required-field error, score parsing, `localStorage`
    save/clear based on the "remember me" checkbox, success message + auto-hide.
  - e2e (Cypress): visit a known slug, submit feedback, see success message.

## Boundaries

- **Always:**
  - Run `npm run lint` and `npm test` before committing.
  - Keep all attendee-facing copy in Spanish.
  - Route CMS reads through `services/index.js`; keep `GRAPHCMS_TOKEN` server-side
    only (never import it into client/component code).
  - Return `notFound` for missing conferences.
- **Ask first:**
  - Changing the Hygraph schema (Conference / ConferenceFeedback fields).
  - Switching the page off SSR (e.g. to SSG/ISR) — it would change the "no redeploy"
    guarantee.
  - Adding dependencies or changing CI / analytics config.
- **Never:**
  - Commit secrets or the `.env` file.
  - Echo the raw CMS error object to the client (the API route currently does — see
    follow-ups).
  - Remove or skip failing tests without approval.

## Required Follow-Ups (committed work)

The feature shipped without tests or input hardening. These are committed tasks, not
optional ideas:

- [ ] **Task: Add server-authoritative input validation to `pages/api/conferenceFeedback.js`**
  - Acceptance: rejects missing `userName`/`comment`/`slug` with 400; the server is the
    **real guard** for `score` — coerce `parseInt(req.body.score, 10)` and reject when
    `Number.isNaN(score) || score < 1 || score > 5` (never trust the client; a direct
    POST can send anything). Enforces sane length limits on `userName`/`comment`.
    Returns a generic error message instead of the raw CMS `error` object.
  - Note: the client-side `!score` check in `ConferenceFeedbackForm` is effectively dead
    (the `<select>` defaults to `"5"` and only offers 1–5). It may stay as harmless
    belt-and-suspenders, but correctness lives on the server. The meaningful client
    checks are the genuinely-optional fields (`userName`, `comment`).
  - Verify: unit test for the route covering each rejection + happy path; `npm test`.
  - Files: `pages/api/conferenceFeedback.js`, `__tests__/...`.

- [ ] **Task: Add free, self-contained spam protection to the feedback endpoint**
  - Acceptance: the unauthenticated endpoint resists casual bot abuse using no paid /
    third-party service:
    - **Honeypot field** — a CSS-hidden input (e.g. `website`, *not* `type=hidden`).
      If non-empty on the server, return `200` (fake success) so bots don't retry.
    - **Timing check** — stamp form-render time in a hidden field; submissions
      arriving in under ~2.5s return a **fake `200`** (not a `400`) so a mis-timed real
      user is never shown an error.
  - Note: in-memory rate limiting is unreliable on Vercel (serverless instances are
    ephemeral and don't share state). A durable throttle is possible via the existing
    `@vercel/postgres` dependency (store hashed-IP + last-submit timestamp), but build
    it **only if real abuse appears** — do not pre-build.
  - Verify: unit test for honeypot rejection (fake-200) and timing rejection; `npm test`.
  - Files: `pages/api/conferenceFeedback.js`, `components/ConferenceFeedbackForm.jsx`,
    `__tests__/...`.

- [ ] **Task: Unit-test the conference service helpers**
  - Acceptance: tests for `getConferenceDetails` and `submitConferenceFeedback`.
  - Verify: `npm test` green; covered by coverage report.
  - Files: `__tests__/services/index.test.js` (or co-located).

- [ ] **Task: Unit-test `ConferenceFeedbackForm`**
  - Acceptance: covers validation error, score parsing, localStorage save/clear,
    success-message lifecycle.
  - Verify: `npm test`.
  - Files: `__tests__/components/ConferenceFeedbackForm.test.jsx`.

- [ ] **Task: e2e happy path (Cypress)**
  - Acceptance: visit a known conference slug, submit feedback, assert success message.
    `cy.intercept` stubs `/api/conferenceFeedback` so no live records are written to the
    CMS. Repurpose `cypress/e2e/conferences.spec.cy.js` (currently a mislabeled
    duplicate of the `/talks` test) to cover `/conferences/<slug>`; leave
    `talks.spec.cy.js` (the talks-listing page) untouched.
  - Verify: `npm run cypress:run`.
  - Files: `cypress/e2e/conferences.spec.cy.js`.

## Resolved Decisions

1. **Conference seeding is manual per event.** Conferences are created by hand in
   Hygraph for each talk. SSR means they go live without a redeploy. No automated
   seeding is planned.
2. **Spam protection: honeypot + timing check first.** The endpoint stays
   unauthenticated; casual bot abuse is handled with a CSS-hidden honeypot field and a
   minimum-fill-time check (both free and stateless). A Postgres-backed durable
   throttle is the fallback **only if real abuse appears** — in-memory throttling is
   unreliable on Vercel's ephemeral serverless instances. (See follow-up task.)
3. **Score validation belongs on the server.** The client `<select>` always supplies
   a valid 1–5 value, so the client `!score` check is dead code; the authoritative
   guard is server-side `parseInt` + range check. (See validation follow-up task.)

## Future (not committed)

- **`/conferences` index page** listing given talks, driven by the same `Conference`
  model (add a `getConferences()` list helper + index page). The read query and SSR
  pattern already exist, so this is a natural extension when wanted.
