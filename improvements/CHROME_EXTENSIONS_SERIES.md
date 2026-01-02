# Improvements for Chrome Extensions Series

## Overview
This series correctly focuses on **Manifest V3**, which is the current standard. The content is relatively recent and accurate. Improvements should focus on "gotchas" with Service Workers and modern tooling.

## 1. Service Workers & Persistence
**Slug:** `chrome-extensions-capitulo-5-background`
*   **Current Status:** Introduces Service Workers as the replacement for background pages.
*   **Proposed Improvements:**
    *   **Ephemeral Nature:** Strongly emphasize that Service Workers **terminate** when not in use. Global variables in `background.js` will be lost.
    *   **State Persistence:** Add a dedicated section or example on using `chrome.storage.local` to persist state across service worker restarts. This is the #1 confusion for developers moving from V2.

## 2. Content Scripts & Injection
**Slug:** `chrome-extensions-capitulo-6-content-script`
*   **Current Status:** Static declaration in `manifest.json`.
*   **Proposed Improvements:**
    *   **Dynamic Injection:** Add an example of `chrome.scripting.executeScript`. This is often required for extensions that only run on user action (e.g., clicking the extension icon) rather than on every page load (performance/privacy).

## 3. Tooling (Esbuild/React)
**Slug:** `chrome-extensions-capitulo-14-esbuild`
*   **Current Status:** Uses `esbuild` for bundling.
*   **Proposed Improvements:**
    *   **Vite / CRXJS:** Mention **Vite** combined with plugins like CRXJS. It has become a dominant tool for building modern web apps and extensions due to HMR (Hot Module Replacement) and ease of use.
    *   **TypeScript:** Ensure examples use TypeScript if possible, as the ecosystem has shifted heavily towards it.

## 4. Debugging
**Slug:** `chrome-extensions-capitulo-12-debugging`
*   **Current Status:** General debugging tips.
*   **Proposed Improvements:**
    *   **Service Worker Console:** Remind users that the Service Worker has its *own* DevTools window (Inspect views: Service Worker), separate from the popup or content script.
