# Sebastian Gomez Site

[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen)](https://nextjs-plum-five-51.vercel.app/)
[![Unit Tests](https://img.shields.io/badge/Unit%20Tests-Passing-brightgreen)]()
[![E2E Tests](https://img.shields.io/badge/E2E%20Tests-Passing-brightgreen)]()
[![Next.js](https://img.shields.io/badge/Next.js-v16-black)](https://nextjs.org/)

### [Live Site](https://nextjs-plum-five-51.vercel.app/)

![GraphCMS Headless Blog](https://i.ibb.co/NmnJnKD/image.png)

## Overview
This is a personal blog and portfolio site for Sebastian Gomez, built with the latest modern web technologies. It features a responsive design, dynamic content fetching from GraphCMS (Hygraph), and a robust reading experience with syntax highlighting and comment systems.

## Technology Stack
- **Framework:** [Next.js v16](https://nextjs.org/) (React 19)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & SASS
- **Content:** [GraphCMS (Hygraph)](https://hygraph.com/) via GraphQL
- **Data Fetching:** [Apollo Client v3.13](https://www.apollographql.com/docs/react/)
- **Testing:** Cypress (E2E) & Jest

## Features
- **Dynamic Routing:** `/post/[slug]`, `/category/[slug]`
- **Rich Text Rendering:** Custom rendering for Markdown/Rich Text with syntax highlighting (PrismJS).
- **Comments:** Integrated commenting system.
- **Featured & Recent Posts:** Dynamic carousels and widgets.
- **Applause/Likes:** Interactive applause feature (requires Postgres).

## Getting Started

### Development
```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

### Building
```bash
npm run build
npm start
```

## Running Tests
This project maintains high code quality through automated testing.

### End-to-End Tests (Cypress)
Traverses all blog posts and verifies rendering stability.
```bash
# Run headless
npm run cypress:run

# Open Cypress UI
npm run cypress:open
```

## Project Status
- **Build**: ✅ Passing
- **Tests**: ✅ Passing
- **Dependencies**: Fully updated to 2025/2026 standards.
