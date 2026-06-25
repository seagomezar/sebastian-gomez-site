# Spec: 404 Handling for Unknown Dynamic Routes

> **Status:** Implemented. This is a *living* spec — update it before changing
> behavior, not after. Companion to `SPEC.md` (conferences), which already
> implements the correct pattern this spec generalizes.
>
> **Implementation note:** `getCategoryPost` is also used by the conferences page
> for related posts, so its return shape was left untouched. Instead, the shared
> `GetCategoryPost` query was extended to also return the `category` record, and a
> new `getCategoryPageData(slug)` helper returns `{ category, posts }` for the
> category page's 404-vs-empty decision. All criteria verified against a production
> build (`npm run build && npm run start`): unknown post/category slugs and bad page
> numbers return 404; valid pages and `?lang=en`/query params unchanged.

## Objective

Make dynamic SSR pages return a proper **404** (and render a helpful, custom 404
page) when the requested identifier does not exist in the CMS, instead of crashing
with a **500** or silently rendering an empty/misleading page.

**User:** Any visitor (or crawler/bot) who hits a URL with a slug or page number
that doesn't exist — via a typo, a stale/shared link, a mangled link, or scanning.

**Why:** A non-existent post currently throws a server error. The reported symptom
was the URL `https://www.sebastian-gomez.com/post/plugins-con-nextjs&hola=hola`.
That URL has **no `?`**, so `&hola=hola` is part of the **slug**
(`plugins-con-nextjs&hola=hola`), which doesn't exist in Hygraph. The bug is not
about query parameters — it is that **an unknown slug is not handled**. A 500 is
wrong for "not found": it looks like an outage, returns the wrong HTTP status to
search engines, and exposes a server error instead of the branded 404 page.

### Confirmed Behavior (root cause)

| Route | Bad input | Current | Should be |
|---|---|---|---|
| `/post/[slug]` | unknown slug | **500** (crash) | **404** |
| `/category/[slug]` | unknown slug | 200, empty page | **404** |
| `/posts/page/[pageNumber]` | non-numeric / out-of-range | 200, empty/wrong page | **404** |

Root cause for `/post/[slug]`: `getServerSideProps` calls
`getPostDetails(slug)`; for a missing slug Hygraph returns `data.post = null`,
which is passed straight through as the `post` prop. The component then
dereferences `post.title` (and `post.excerpt`, `post.author`, …) during SSR →
unhandled `TypeError` → 500.

`/category/[slug]` and `/posts/page/[pageNumber]` don't crash because they map over
an array that comes back empty — so they render a valid-looking but empty page,
which should also be a 404 for a non-existent resource.

### Reference: the correct pattern already in the repo

`pages/conferences/[slug].js` already does this right — it returns
`{ notFound: true }` from `getServerSideProps` when the CMS returns nothing. This
spec generalizes that same pattern to the post, category, and pagination routes.

### Success Criteria

- `GET /post/<unknown-slug>` returns HTTP **404** and renders the custom 404 page
  (no 500, no unhandled exception in logs).
- `GET /post/plugins-con-nextjs&hola=hola` (the reported URL) returns **404**.
- A **valid** post still returns 200 and renders unchanged (no regression),
  including the `?lang=en` locale path.
- `GET /category/<unknown-slug>` returns **404** (not a 200 empty page).
- `GET /posts/page/<non-numeric>` and `GET /posts/page/<out-of-range>` return
  **404** (not a 200 empty page). Page `1` and valid pages still return 200.
- Query strings on a valid URL (`/post/<valid>?anything=x`) remain 200 — they were
  never the cause and behavior must not change.
- The custom 404 page shows a friendly message and surfaces **categories** and
  **recent posts** so the visitor can recover, and these load client-side
  (the 404 page is static — see Code Style).
- A request to a **known category that legitimately has zero posts** returns **200**
  and renders an empty-state message ("aún no hay posts" / recommended content) —
  it is NOT a 404.
- A genuine CMS/network failure (Hygraph timeout, auth, 5xx) still returns **500** —
  it is NOT masked as a 404.

## Tech Stack

- **Framework:** Next.js 16 (Pages Router), React 19
- **Data fetching:** Apollo Client reads via `services/index.js`
- **CMS:** Hygraph (GraphQL) — returns `null` / empty arrays for missing records
- **404 page:** Next.js default `/404` (static, already built — see build output)
- **Testing:** Jest + React Testing Library (unit), Cypress (e2e)

## Commands

```
Dev:   npm run dev
Build: npm run build
Start: npm run start
Lint:  npm run lint            # eslint .  (autofix: npx eslint . --fix)
Test:  npm test                # jest
E2E:   npm run cypress:run
```

Manual repro (against a local prod build, since dev can mask SSR 500s):

```
npm run build && npm run start
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/post/does-not-exist-xyz
# expected after fix: 404   (currently: 500)
```

## Project Structure

```
pages/post/[slug].js                → SSR post page  (PRIMARY fix — currently 500s)
pages/category/[slug].js            → SSR category page (return 404 on empty)
pages/posts/page/[pageNumber].js    → SSR pagination (return 404 on bad/empty page)
pages/conferences/[slug].js         → REFERENCE: already returns notFound correctly
services/index.js                   → getPostDetails / getCategoryPost / getPostsPerPage
__tests__/pages/                     → getServerSideProps unit tests (new)
cypress/e2e/                         → e2e: unknown slug → 404 (new/extended)
```

## Code Style

Match the existing codebase. The guard lives in `getServerSideProps` — return
`{ notFound: true }` so Next.js serves the 404 page with the correct status. Do
**not** add defensive `post?.title` checks in the component to paper over a null
prop; the page should never receive a null record.

```js
// pages/post/[slug].js — getServerSideProps
export async function getServerSideProps({ params, query }) {
  const locale = SUPPORTED_LOCALES.includes(query.lang) ? query.lang : 'es';
  const data = await getPostDetails(params.slug, locale);

  if (!data) {
    return { notFound: true };          // unknown slug → 404, not a 500
  }

  return { props: { post: data, locale } };
}
```

**Custom 404 page (`pages/404.js`).** In the Pages Router, `404.js` is **statically
generated** — it CANNOT use `getServerSideProps`/`getStaticProps` to fetch data per
request. So its recovery content (categories + recent posts) must load
**client-side**, the same way the existing widgets already do:

```jsx
// pages/404.js — static page; data loads client-side via existing components
export default function Custom404() {
  return (
    <div className="container mx-auto px-4 md:px-10 my-12 text-center">
      <h1 className="text-3xl font-semibold mb-4">Página no encontrada</h1>
      <p className="mb-8 text-gray-600">
        Parece que lo que buscas no existe. Quizá quieras revisar las categorías
        o los posts recientes.
      </p>
      <div className="max-w-xl mx-auto text-left">
        <PostWidget categories={undefined} slug={undefined} />  {/* recent posts */}
        <Categories />                                          {/* categories   */}
      </div>
    </div>
  );
}
```

`Categories` and `PostWidget` already fetch on the client (see `pages/index.js`
sidebar), so they work inside a static 404 page unchanged. All copy stays in
**Spanish**.

**Distinguish "not found" from "fetch failed" (Open Question 2 → resolved: yes).**
A successful CMS response with no record is a 404; a transport/CMS error is a real
500 and must not be masked. Reads in `services/index.js` may throw on network/auth
errors — let those propagate (→ 500). Only return `notFound` when the query
**succeeded** and the record is absent (`data.post == null` / empty list).

**Conventions:**

- 2-space indent in pages/components; 4-space in `services/` (follow the file).
- Guard in `getServerSideProps`, not in the render body.
- `/category/[slug]`: an empty result for an **unknown** slug is a **404**; a
  **known** category with zero posts renders a **200 empty state** ("aún no hay
  posts" + recommended content). This requires the query to tell the two apart —
  see Open Question 1 (resolved) and Tasks.
- For `/posts/page/[pageNumber]`: reject non-numeric and `< 1` page numbers, and
  page numbers past the last page, with `notFound`.

## Testing Strategy

- **Framework:** Jest + React Testing Library (unit); Cypress (e2e).
- **Location:** Unit tests under `__tests__/` mirroring source paths.
- **Coverage target:** 90% for new/changed code (per project DAD config).
- **What to test (unit — `getServerSideProps`):**
  - `/post/[slug]`: returns `{ notFound: true }` when `getPostDetails` resolves
    `null`/`undefined`; returns `{ props: { post, locale } }` for a found post;
    `?lang=en` selects the `en` locale, unknown `lang` falls back to `es`.
  - `/category/[slug]`: `{ notFound: true }` when `getCategoryPost` is empty;
    props when non-empty.
  - `/posts/page/[pageNumber]`: `{ notFound: true }` for non-numeric and
    out-of-range page numbers; props for valid pages.
  - Mock the `services` module so no live CMS calls are made.
- **What to test (e2e — Cypress):**
  - Visit an unknown post slug → assert the 404 page is shown (e.g. the 404 marker
    text) and the app did not error. Stub `services`/network as needed.
  - Visit a known slug → assert the post renders (regression guard).

## Boundaries

- **Always:**
  - Run `npm run lint` and `npm test` before committing.
  - Use `{ notFound: true }` from `getServerSideProps` for missing resources.
  - Verify the fix against a **production build** (`npm run build && npm run start`),
    since `npm run dev` can render an error overlay instead of a clean 500/404.
  - Keep the valid-post happy path (incl. `?lang=en`) unchanged.
- **Ask first:**
  - Treating a *known but empty* category as 404 vs. rendering an "empty" state.
  - Adding a custom-styled 404 page (vs. Next.js default) — that's a separate change.
  - Any change to the Hygraph schema or `services` query shapes.
  - Switching these pages off SSR.
- **Never:**
  - "Fix" this by mangling/stripping the slug or query string — the slug genuinely
    doesn't exist; parsing is not the bug.
  - Swallow real CMS/network errors as 404. A failed request (timeout, auth, 5xx
    from Hygraph) is a genuine 500 — only a successful "no such record" is a 404.
    (See Open Questions: distinguish "not found" from "fetch failed".)
  - Remove or skip failing tests without approval.
  - Commit secrets or `.env`.

## Tasks

- [ ] **Task: Return 404 for unknown post slug** *(primary — fixes the 500)*
  - Acceptance: `getServerSideProps` returns `{ notFound: true }` when
    `getPostDetails` returns null. Valid slug + `?lang=en` unchanged.
  - Verify: `npm run build && npm run start`; `curl` of an unknown slug → 404,
    valid slug → 200. Jest unit test green.
  - Files: `pages/post/[slug].js`, `__tests__/pages/post.test.js`.

- [ ] **Task: Distinguish unknown category from empty category (query change)**
  - Context: `GetCategoryPost` currently returns only `postsConnection.edges` and
    never queries the `Category` model, so "unknown slug" and "known slug, zero
    posts" are indistinguishable (both empty). To satisfy decision (a) we must know
    whether the category exists.
  - Acceptance: extend the GraphQL query to also fetch the category record (e.g.
    `category(where: { slug: $slug }) { name slug }`) and surface it from
    `getCategoryPost` (return both `category` and `edges`, e.g.
    `{ category, posts }`). **Ask-first** boundary: this touches a query shape —
    confirm before changing.
  - Verify: query returns `category: null` for an unknown slug and a populated
    object for a known one. Unit test on the service.
  - Files: `services/graphql/queries/getCategoryPost.gql`, `services/index.js`,
    `__tests__/services/...`.

- [ ] **Task: 404 for unknown category; empty-state for known-but-empty category**
  - Acceptance: in `getServerSideProps`, if `category == null` → `{ notFound: true }`
    (404). If the category exists but has zero posts → return props and render a
    **200 empty state** in Spanish ("Aún no hay posts en esta categoría" +
    recommended content / categories). Non-empty → renders as today.
  - Verify: `curl` unknown category → 404; known empty category → 200 empty state;
    known non-empty category → 200 list. Unit + component test.
  - Files: `pages/category/[slug].js`, `__tests__/pages/category.test.js`.

- [ ] **Task: Return 404 for invalid/out-of-range page number**
  - Acceptance: non-numeric or out-of-range `pageNumber` → `{ notFound: true }`;
    valid pages → 200.
  - Verify: `curl /posts/page/abc` and a too-large page → 404; `/posts/page/1` →
    200. Unit test.
  - Files: `pages/posts/page/[pageNumber].js`, `__tests__/pages/page.test.js`.

- [ ] **Task: Build the custom 404 page**
  - Acceptance: `pages/404.js` shows a friendly Spanish message ("Parece que lo que
    buscas no existe. Quizá quieras revisar las categorías o los posts recientes.")
    and renders **recent posts** + **categories** via the existing client-fetching
    components (`PostWidget`, `Categories`). No `getServerSideProps`/`getStaticProps`
    (the page is static; data loads client-side). Styling matches the site (Tailwind).
  - Verify: `npm run build && npm run start`; visit an unknown slug → 404 page shows
    message + categories + recent posts. Component test renders without crashing.
  - Files: `pages/404.js`, `__tests__/pages/404.test.js`.

- [ ] **Task: e2e — unknown slug renders custom 404**
  - Acceptance: Cypress visits an unknown post slug and asserts the custom 404 page
    (message + categories/recent-posts present); a known slug still renders.
  - Verify: `npm run cypress:run`.
  - Files: `cypress/e2e/...`.

## Resolved Decisions

1. **Known-but-empty category → 200 empty state**, not 404. Render a Spanish
   "aún no hay posts" message plus recommended content. Requires the category query
   to distinguish unknown-slug from zero-posts (see Tasks).
2. **"Not found" vs "fetch failed" → keep them separate.** Only a *successful*
   query with no record returns `notFound`; transport/CMS errors still surface as
   500 and must not be masked as 404.
3. **Custom 404 page → yes, in scope.** Friendly Spanish copy plus categories and
   recent posts so visitors can recover (client-side data, since `404.js` is static).
