# Spec: Per-Post Language Toggle (Spanish ⇄ English)

> **Status:** Implemented. This is a *living* spec — update it before changing
> behavior, not after. Companion to `SPEC.md` (conferences) and
> `SPEC-404-handling.md`.
>
> **Implementation note (important gotcha):** Hygraph's
> `localizations(includeCurrent: false)` is **relative to the currently-viewed
> locale** — it returns `['en']` on the ES view and `['es']` on the EN view. So the
> toggle checks whether the **target** locale is in `availableLocales` (not a
> hardcoded `'en'`), and the page's `hasEnglish` (for `hreflang`) is
> `locale === 'en' || availableLocales.includes('en')`. Verified against a
> production build: ES view shows the US flag + all three `hrefLang` tags; EN view
> shows the Spanish flag + the same tags. Note: as of implementation **every**
> published post has an English version, so the no-flag branch is covered by unit
> tests (the e2e skips it gracefully when no EN-less post exists).

## Objective

Let a reader switch a post between its **Spanish** and **English** versions with a
single button near the post header, **only when an English version actually exists**.

**User:** Blog readers. Most content is authored in Spanish; some posts also have a
real English localization in Hygraph (verified: e.g. `plugins-con-nextjs`,
`invocar-gemini-desde-pubsub-google-cloud` have distinct, populated EN content).

**Why:** English-reading visitors currently have no way to discover or reach the
English version of a post, even though the data and the SSR locale path already
exist (`/post/<slug>?lang=en`). The only missing piece is the UI.

### What already exists (no new infra needed)

- `pages/post/[slug].js` reads `?lang=en` from `query`, validates it against
  `SUPPORTED_LOCALES = ['es', 'en']`, and passes `locale` to the page.
- `getPostDetails(slug, locale)` requests Hygraph locales `[en, es]` (EN with ES
  fallback) or `[es]`.
- The page already computes `localeParam = locale === 'es' ? '' : '?lang=en'` for
  the canonical/OG URL.

### The fallback caveat (why "only when EN exists")

Hygraph **falls back to Spanish** for any field without an English localization. So
an always-visible button could send a reader to an "English" URL that silently shows
Spanish content. We must therefore detect real English availability per post.

**Detection mechanism (verified against the live CMS):** the `post` query supports
`localizations(includeCurrent: false) { locale }`, which lists the *other* locales a
post has. For a Spanish post with a real English version it returns `[{ locale: en }]`;
without one it returns `[]`. This is added to the **existing** `getPostDetails` query
so detection costs **zero extra round-trips**.

### Success Criteria

- On a Spanish post that **has** an English localization, a **US flag** (matching
  the about page) is visible near the header and links to `/post/<slug>?lang=en`.
- On the English view (`?lang=en`), a **Spanish flag** is shown linking back to
  `/post/<slug>`. The flag shown is always the *target* language.
- On a post with **no** English localization, **no** flag is rendered (the page is
  unchanged from today).
- Switching is plain navigation to the existing SSR route — content is correct,
  the URL is shareable/bookmarkable, and the existing 404 behavior is unaffected.
- For posts with EN, the page emits `hreflang` alternate links (`es`, `en`,
  `x-default`) so search engines treat the two URLs as translations.
- A GA4 event fires when the flag is clicked (see Analytics).
- No regression: posts without EN, the `?lang=en` happy path, OG/canonical URLs,
  and the 404-on-unknown-slug behavior all behave as before.

## Tech Stack

- **Framework:** Next.js 16 (Pages Router), React 19
- **CMS:** Hygraph (GraphQL) — localized content with ES fallback
- **Data fetching:** Apollo Client read via `services/index.js`
- **Analytics:** GA4 via `lib/analytics.js` (`event(...)`)
- **Styling:** Tailwind CSS v4
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

## Project Structure

```
services/graphql/queries/getPostDetails.gql → add localizations(includeCurrent:false){ locale }
services/index.js                            → getPostDetails returns availableLocales too
pages/post/[slug].js                         → pass availableLocales + locale to the toggle
components/PostLanguageToggle.jsx             → NEW: the bidirectional button (client component)
lib/analytics.js                             → existing event() helper (reused)
__tests__/components/PostLanguageToggle.test.jsx → NEW unit test
__tests__/pages/post.test.js                  → extend for availableLocales prop
cypress/e2e/post-language-toggle.spec.cy.js   → NEW e2e
```

## Code Style

Match the existing codebase. Reads go through `services/index.js`; the component
never calls Apollo directly. The toggle is a `<Link>` (no wrapped `<span>` — apply
`className` directly, per the repo convention).

**Flag-only UI, matching the about page.** The about pages already implement this
exact toggle with flag images: `/en.png` (English) and `/es.jpg` (Spanish), rendered
32×32, `unoptimized`, `rounded-full`, floated right (`pages/about.js`,
`pages/en/about.js`). The post toggle reuses the **same assets and styling** so it
feels native. The flag shown is the **target** language (US flag = "switch to
English"), with an `alt`/`title` for accessibility — no visible text label.

```jsx
// components/PostLanguageToggle.jsx — render nothing unless the other locale exists
import Link from 'next/link';
import Image from 'next/image';
import { event } from '../lib/analytics';

export default function PostLanguageToggle({ slug, locale, availableLocales }) {
  const hasEnglish = availableLocales?.includes('en');
  // Only English alt-content exists today; show the toggle only when it's available.
  if (!hasEnglish) return null;

  const toEnglish = locale === 'es';
  const href = toEnglish ? `/post/${slug}?lang=en` : `/post/${slug}`;
  const flagSrc = toEnglish ? '/en.png' : '/es.jpg';   // target-language flag
  const flagAlt = toEnglish ? 'View in English' : 'Ver en Español';

  const handleClick = () => {
    event({
      action: 'toggle_post_language',
      category: 'post',
      label: slug,
      value: toEnglish ? 'en' : 'es',
    });
  };

  return (
    <div className="float-right">
      <Link href={href} onClick={handleClick} aria-label={flagAlt} title={flagAlt}>
        <Image
          unoptimized
          alt={flagAlt}
          height="32"
          width="32"
          sizes="(max-width: 768px) 100vw"
          className="align-middle rounded-full"
          src={flagSrc}
        />
      </Link>
    </div>
  );
}
```

```graphql
# getPostDetails.gql — add to the existing post selection (no new query)
query GetPostDetails($slug: String!, $locales: [Locale!]!) {
  post(where: { slug: $slug }, locales: $locales) {
    # ...existing fields...
    localizations(includeCurrent: false) {
      locale
    }
  }
}
```

**SEO — `hreflang` alternates (the "best for SEO" piece).** The post page already
sets a per-language canonical `og:url` and `og:locale` (commit `66a0a3a`). The
correct multilingual-SEO addition is telling Google that the ES and EN URLs are
translations of the *same* page via `hreflang` alternate links. `next-seo`
(already used on this page) supports this with `languageAlternates` — **only emit
them when an English version actually exists** (same `availableLocales` signal):

```jsx
// pages/post/[slug].js — inside the existing <NextSeo .../>
const baseUrl = `https://www.sebastian-gomez.com/post/${post.slug}`;
const hasEnglish = post.availableLocales?.includes('en');

<NextSeo
  /* ...existing title/description/openGraph... */
  canonical={`${baseUrl}${localeParam}`}
  languageAlternates={hasEnglish ? [
    { hrefLang: 'es', href: baseUrl },
    { hrefLang: 'en', href: `${baseUrl}?lang=en` },
    { hrefLang: 'x-default', href: baseUrl },
  ] : undefined}
/>
```

```js
// services/index.js — surface availableLocales without changing the existing return contract
export const getPostDetails = async (slug, locale = 'es') => {
    const locales = locale === 'es' ? ['es'] : [locale, 'es'];
    const { data } = await client.query({
        query: GET_POST_DETAILS_QUERY,
        variables: { slug, locales },
    });
    if (!data.post) return null; // keep null → 404 contract (SPEC-404-handling.md)
    return {
        ...data.post,
        availableLocales: (data.post.localizations || []).map((l) => l.locale),
    };
};
```

**Conventions:**

- 4-space indent in `services/`, 2-space in components/pages (follow the file).
- `<Link>` with `className` directly; never wrap a `<span>` just for classes.
- Guard rendering in the component (`return null`), not in the page body.
- Keep `getPostDetails` returning `null` for a missing post (404 contract intact).

## Analytics (GA4 events)

| Action | Category | When | Label / Value |
|---|---|---|---|
| `toggle_post_language` | `post` | Language toggle click | label = slug, value = target locale (`en`/`es`) |

## Testing Strategy

- **Framework:** Jest + React Testing Library (unit); Cypress (e2e).
- **Coverage target:** 90% for new/changed code (per project DAD config).
- **Unit — `PostLanguageToggle`:**
  - renders nothing when `availableLocales` lacks `en`;
  - on a Spanish post with EN: shows "View in English" linking to `?lang=en`;
  - on the English view: shows "Ver en Español" linking to `/post/<slug>`;
  - fires the GA4 event on click (mock `lib/analytics`).
- **Unit — `getPostDetails` / post page:** `availableLocales` is derived from
  `localizations`; missing post still returns `null` (→ 404). Mock the `services`
  module for the page's `getServerSideProps`.
- **e2e — Cypress:** on a known post that has EN (query the CMS for one, like the
  existing `post.spec.cy.js` does), assert the toggle appears, click it, and confirm
  the URL becomes `?lang=en` and the title changes to the English title; on a post
  without EN, assert no toggle. Stub/guard via `NEXT_PUBLIC_GRAPHCMS_ENDPOINT` like
  the existing specs.

## Boundaries

- **Always:**
  - Run `npm run lint` and `npm test` before committing.
  - Route the read through `services/index.js`; keep the toggle a pure UI component.
  - Preserve the `getPostDetails` → `null` → 404 contract.
  - Show the toggle only when the target locale genuinely exists.
- **Ask first:**
  - Changing the Hygraph schema or `SUPPORTED_LOCALES`.
  - Adding locales beyond `en`/`es`, or switching the URL scheme (e.g. `/en/post/...`
    path segments instead of `?lang=`).
  - Adding `hreflang` alternate tags / changing canonical URL strategy for SEO
    (worthwhile, but a separate task — see Open Questions).
- **Never:**
  - Show an "English" button on a post that only has Spanish (would serve fallback
    Spanish under an English URL).
  - Commit secrets or `.env`.
  - Remove or skip failing tests without approval.

## Tasks

- [ ] **Task: Detect available locales in the post query/service**
  - Acceptance: `getPostDetails.gql` selects `localizations(includeCurrent:false){ locale }`;
    `getPostDetails` returns `availableLocales: string[]` and still returns `null`
    for a missing post.
  - Verify: service unit test; `npm test`.
  - Files: `services/graphql/queries/getPostDetails.gql`, `services/index.js`,
    `__tests__/services/index.test.js`.

- [ ] **Task: Build `PostLanguageToggle` component (flag UI)**
  - Acceptance: renders nothing without an `en` localization; renders the
    target-language flag (`/en.png` or `/es.jpg`, 32×32, `unoptimized`,
    `rounded-full`, `float-right`) with an accessible `alt`/`aria-label`/`title`;
    bidirectional href; fires `toggle_post_language` GA4 event on click.
  - Verify: component unit test; `npm test`.
  - Files: `components/PostLanguageToggle.jsx`,
    `__tests__/components/PostLanguageToggle.test.jsx`.

- [ ] **Task: Wire the toggle into the post page**
  - Acceptance: `pages/post/[slug].js` passes `slug`, `locale`, and
    `availableLocales` to `<PostLanguageToggle>` near the header; existing post test
    extended for the new prop.
  - Verify: `npm run build && npm run start`; visit a post with EN → flag shows and
    switches; post without EN → no flag. Unit test.
  - Files: `pages/post/[slug].js`, `__tests__/pages/post.test.js`.

- [ ] **Task: Add `hreflang` alternates for SEO**
  - Acceptance: for posts with EN, `<NextSeo>` emits `languageAlternates`
    (`es`, `en`, `x-default`) and a per-locale `canonical`; posts without EN emit
    no alternates. Rendered `<head>` contains the `rel="alternate" hreflang=...`
    links (verify in the built page).
  - Verify: `npm run build && npm run start`; `curl` a post with EN and grep for
    `hreflang`. Unit/render test if practical.
  - Files: `pages/post/[slug].js`.

- [ ] **Task: e2e — toggle switches language**
  - Acceptance: Cypress finds a post with EN, asserts toggle appears, clicks it,
    confirms `?lang=en` + English title; a post without EN shows no toggle.
  - Verify: `npm run cypress:run`.
  - Files: `cypress/e2e/post-language-toggle.spec.cy.js`.

## Resolved Decisions

1. **Show the toggle only when EN exists.** Detected via
   `localizations(includeCurrent:false)` folded into the existing `getPostDetails`
   query (zero extra round-trips). Prevents serving Spanish fallback under an
   English URL.
2. **Switch via link navigation to `?lang=en`** (and back to `/post/<slug>`).
   Reuses the existing SSR locale path — correct content, shareable URL, no new
   client-side data fetching.
3. **Bidirectional flag toggle:** the **target-language flag** near the post header —
   US flag (`/en.png`) on the ES page, Spanish flag (`/es.jpg`) on the EN page —
   reusing the about page's assets and styling. No visible text label (flag only);
   accessibility via `alt`/`aria-label`/`title`.
4. **SEO = `hreflang` alternates.** Keep the existing `?lang=en` URL scheme (set in
   commit `66a0a3a`) and add `languageAlternates` (`es`/`en`/`x-default`) via
   `next-seo`, only for posts that have an English version.

## Open Questions

1. **Exact placement** — `float-right` near the post title (as on the about page) is
   assumed; confirm it looks right against the post header during implementation.
