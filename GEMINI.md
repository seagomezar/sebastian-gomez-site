# GraphCMS Headless Blog (Next.js)

## Project Overview

This is a **Next.js** application that serves as a blog, fetching content from **GraphCMS (Hygraph)** via **GraphQL**. It features a responsive design built with **Tailwind CSS** and **SASS**, and includes functionalities for featured posts, comments, and category browsing.

## Technology Stack

*   **Framework:** Next.js (v15)
*   **UI Library:** React (v19)
*   **Styling:** Tailwind CSS (v4), SASS
*   **Data Fetching:** GraphQL (Apollo Client, graphql-request)
*   **CMS:** GraphCMS (Hygraph)
*   **Testing:** Cypress

## Project Structure

*   **`pages/`**: Application routes.
    *   `index.js`: The homepage, fetching initial posts server-side.
    *   `post/[slug].js`: Dynamic route for individual blog posts.
    *   `api/`: API routes (e.g., for handling comments).
*   **`components/`**: Reusable UI components (e.g., `PostCard`, `Header`, `Layout`).
*   **`services/`**: logic for data fetching.
    *   `index.js`: Exports functions to fetch data (posts, categories, etc.) using Apollo Client.
    *   `graphql/`: Contains `.gql` files for specific GraphQL queries.
*   **`styles/`**: Global styles (`globals.scss`).
*   **`cypress/`**: End-to-end tests.

## Key Files & Configuration

*   **`package.json`**: Dependencies and scripts.
*   **`next.config.js`**: Next.js configuration.
*   **`tailwind.config.js`**: Tailwind CSS configuration.
*   **`services/index.js`**: The central hub for all API calls to the CMS.
*   **`.env.example`**: Example environment variables (requires `NEXT_PUBLIC_GRAPHCMS_ENDPOINT`).

## Building and Running

### Development
To start the development server:
```bash
npm run dev
# or
yarn dev
```
The application will be available at `http://localhost:3000`.

### Production Build
To build the application for production:
```bash
npm run build
npm start
```

### Testing
To run Cypress end-to-end tests:
```bash
# Open Cypress Test Runner
npm run cypress:open

# Run tests headlessly
npm run cypress:test
```

## Development Conventions

*   **Styling:** Use Tailwind CSS utility classes primarily. Custom styles are in `styles/globals.scss`.
*   **Data Fetching:** Use the helper functions in `services/index.js`.
*   **Components:** Create new components in the `components/` directory.
*   **Testing:** Write E2E tests in `cypress/e2e/`.
