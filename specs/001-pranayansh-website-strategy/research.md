# Research: Pranayansh Technologies Website & Business Positioning Strategy

**Feature**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

All unknowns from the Technical Context have been resolved below. No `NEEDS CLARIFICATION` markers remain.

## 1. Client-side routing approach

- **Decision**: Use `react-router-dom` (latest v7.x) with a single `<BrowserRouter>` in `App.tsx` defining routes for all 11 pages, sharing a common layout (Navbar/Footer) via a layout route.
- **Rationale**: The spec requires 11 distinct pages with consistent primary navigation (FR-015) and independent per-page SEO metadata (FR-017). Client-side routing keeps a single `index.html`/bundle, avoids full-page reloads between pages, and lets a shared layout (nav, footer, consent-aware forms) be defined once — directly supporting the Clean, Maintainable Code principle (no duplicated boilerplate per page).
- **Alternatives considered**:
  - **Vite multi-page build (multiple HTML entry points)** — rejected: would require duplicating `<head>`, Navbar, and Footer markup per entry, increasing duplication and violating Clean, Maintainable Code; also complicates shared state (e.g., consent).
  - **A meta-framework (Next.js/Remix)** — rejected: adds a much larger dependency surface and build/runtime model (SSR, file-system routing conventions) than an 11-page marketing site needs, conflicting with the Minimal Dependencies principle. No SSR/SEO requirement in the spec demands it (client-rendered meta tags are sufficient per FR-017).

## 2. Lead-capture form submission mechanism

- **Decision**: Each lead-capture form (Get a Quote, Contact, Careers/Join Our Network) submits via `fetch()` as a POST request to a single configurable external hosted form endpoint (URL supplied via a Vite environment variable, e.g., `VITE_FORM_ENDPOINT`), compatible with third-party static-form backends (e.g., Formspree-style APIs). The UI shows a pending/success/error state based on the response.
- **Rationale**: FR-008/FR-009/FR-007 require a confirmation message on successful submission, but the project has no custom backend and the constitution prioritizes Minimal Dependencies and avoids added operational complexity. A hosted form endpoint satisfies the functional requirement without standing up or maintaining server infrastructure.
- **Alternatives considered**:
  - **Custom serverless/backend function built in this repo** — rejected for this feature: introduces a second deployable unit, infra, and operational surface not justified by current scope; can be revisited in a later phase if lead volume/routing needs grow.
  - **`mailto:` link only** — rejected as the primary mechanism: cannot reliably show an in-page confirmation state (violates FR-008/009's confirmation requirement) and depends on the visitor's local email client being configured.

## 3. SEO per-page metadata management

- **Decision**: A small reusable `PageMeta` component (in `src/components/layout/`) sets `document.title` and the meta description tag via a `useEffect` on each page mount; no external head-management library is added.
- **Rationale**: FR-017 requires a unique title and meta description per page. For a client-rendered SPA with a fixed, small set of 11 pages, direct DOM updates are sufficient and keep dependency count minimal (principle IV) versus adding a dedicated library for a well-bounded need.
- **Alternatives considered**: **`react-helmet-async`** — rejected only on dependency-minimalism grounds; revisit if metadata needs grow substantially more complex (e.g., structured data/JSON-LD injection at scale).

## 4. Styling system

- **Decision**: Tailwind CSS v4.x (latest) integrated via the official `@tailwindcss/vite` plugin, replacing the current hand-written `style.css` with Tailwind utility classes plus a small `@theme` token block (brand colors, fonts) for consistency across pages.
- **Rationale**: Directly mandated by the constitution's Technical Baseline (React + Tailwind, latest versions). Utility-first classes keep component styling colocated and reviewable, and Tailwind's responsive/dark-mode variants directly support the Responsive Design and Modern, Attractive UX principles.
- **Alternatives considered**: **CSS-in-JS (styled-components/Emotion)** — rejected: duplicates Tailwind's responsibility and adds an extra dependency, conflicting with Minimal Dependencies; also not requested by the constitution.

## 5. Content data representation

- **Decision**: One TypeScript module per entity type under `src/data/` (e.g., `services.ts`, `industries.ts`), each exporting a typed array of records matching interfaces defined in `src/types/content.ts`. Pages/components import these arrays directly (no runtime fetch).
- **Rationale**: Matches the spec Clarification that content is maintained in structured local data files, not a CMS/database. TypeScript (over plain JSON) is chosen so every content record is checked against a shared interface at compile time, supporting the Clean, Maintainable Code principle's type-completeness requirement.
- **Alternatives considered**: **JSON files** — viable but rejected in favor of `.ts` modules so authoring mistakes (missing fields, wrong types) are caught by `tsc` during `npm run build` rather than only at runtime.

## 6. Testing approach

- **Decision**: No automated tests of any kind (no unit, integration, or end-to-end tests; no test runner/framework dependency such as Vitest, Jest, or Playwright is added).
- **Rationale**: Constitution principle V (No Automated Testing, NON-NEGOTIABLE) explicitly supersedes any other guidance that would imply test coverage. Verification relies on `npm run build` (type-checking + production build) and manual review per page against the spec's acceptance scenarios.
- **Alternatives considered**: None — this is a non-negotiable constitutional constraint, not an open design choice.

## 7. Package version baseline

- **Decision**: Add `react`, `react-dom` (React 19.x latest), `react-router-dom` (7.x latest), `tailwindcss` + `@tailwindcss/vite` (v4.x latest) as the only new dependencies. Existing `typescript` (~6.0.2) and `vite` (^8.1.1) are retained unchanged.
- **Rationale**: Satisfies the constitution's mandate to use React and Tailwind "latest version" while minimizing the total dependency delta from the current vanilla TypeScript/Vite starter.
- **Alternatives considered**: Pinning to older major versions — rejected; constitution explicitly requires latest stable versions.
