# Improvements for Miscellaneous Articles

## 1. Web Development (CSS, React, Angular)
**Slug:** `todo-sobre-transiciones-en-css`, `react-props`, `escribiendo-tests-para-funciones-y-propiedades-privadas-en-angular`
*   **Proposed Improvements:**
    *   **CSS View Transitions:** Update the CSS transitions article to mention the modern **View Transitions API**, which allows for seamless page transitions (especially relevant for the Next.js context).
    *   **React + TypeScript:** For `react-props`, show how to define props using TypeScript `interface` or `type`, as this is the standard professional practice.
    *   **Angular `inject()`:** For Angular posts, mention the modern `inject()` function which replaces constructor injection in many cases (functional guards, interceptors, etc.).

## 2. RxJS / Observables
**Slug:** `implementando-*-como-operador-en-observables`
*   **Proposed Improvements:**
    *   **Pipeable Operators:** Ensure all examples use the `.pipe()` syntax. Older RxJS versions used prototype patching (dot-chaining like `.map().filter()`), which is not tree-shakeable and is considered legacy.
    *   **RxJS Version:** Explicitly mention compatibility with RxJS 7+.

## 3. DevOps & Kubernetes
**Slug:** `el-comando-kubectl`, `troubleshooting-con-kubectl-en-k8s`
*   **Proposed Improvements:**
    *   **K9s:** Mention **k9s**, a popular terminal UI that makes interacting with Kubernetes clusters much faster than raw `kubectl` commands.
    *   **Debug Container:** Mention `kubectl debug` (ephemeral containers) for troubleshooting distroless pods that don't have shell access.

## 4. Mobile (React Native)
**Slug:** `el-boilerplate-por-excelencia-para-crear-aplicaciones-con-react-native`
*   **Proposed Improvements:**
    *   **Ignite CLI:** Ensure the reference to Infinite Red's boilerplate mentions the **Ignite CLI** and its latest version (v9+), which supports Expo by default now.
