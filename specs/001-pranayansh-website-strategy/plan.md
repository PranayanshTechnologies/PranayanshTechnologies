# Implementation Plan: Pranayansh Technologies Website & Business Positioning Strategy

**Branch**: `001-pranayansh-website-strategy` | **Date**: 2026-07-28 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-pranayansh-website-strategy/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command; its definition describes the execution workflow.

## Summary

Rebuild Pranayansh Technologies' marketing site as an 11-page React + Tailwind CSS single-page application (Home, Services, Industries, About, Careers/Join Our Network, Case Studies/Testimonials, Resources/Blog, Get a Quote, Contact, FAQ, Privacy Policy) that leads with the three core staffing engagement models, presents emerging services (Software Development, Mobile, AI/Data, Cloud, Managed/DevOps) as clearly labeled growing capabilities with Contact-form interest routing, and drives visitors toward a shared, pre-selectable "Get a Quote" form. Content (services, capability areas, technologies, case studies, resource articles, FAQ) is stored in typed local TypeScript data files rather than a CMS. Lead-capture forms (Quote, Contact, Careers) post to an external hosted form endpoint and require explicit consent per the Privacy Policy. The existing Vite + TypeScript toolchain is retained; React 19 and Tailwind CSS v4 are added as the UI/styling layer. No automated tests are added, per the constitution's non-negotiable No Automated Testing principle — verification relies on build success, type checking, and explicit manual checks mapped to each requirement.

## Technical Context

**Language/Version**: TypeScript ~6.0.2 (existing), targeting ES2023, strict typing at all component/data boundaries.

**Primary Dependencies**: React 19.x (latest stable) + react-dom, react-router-dom 7.x (latest stable, client-side routing for the 11 pages), Tailwind CSS v4.x (latest stable) + `@tailwindcss/vite` plugin, Vite 8.x (existing build tool). No component/UI kit, no CSS-in-JS library, no form library, no CMS SDK.

**Storage**: N/A (no database/backend). Content for Service Offering, Industry, Technology, Case Study/Testimonial, Resource Article, and FAQ entities lives in structured local TypeScript data files under `src/data/` (per spec Clarifications), version-controlled and edited via code changes.

**Testing**: None. Per constitution principle V (No Automated Testing, NON-NEGOTIABLE), this project MUST NOT include unit, integration, or end-to-end tests or any test runner/framework. Verification is via `npm run build` (type check + production build) and manual review only.

**Target Platform**: Modern web browsers (desktop, tablet, mobile), static-hosted single-page application.

**Project Type**: Web (frontend-only single-page application; no custom backend service — lead-capture forms submit to an external hosted form endpoint, see research.md).

**Performance Goals**: Fast initial load suitable for SEO and bounce-rate sensitivity (target Largest Contentful Paint under ~2.5s on a typical broadband/4G connection); no heavy client-side data fetching since content is bundled at build time. Manual verification uses browser DevTools Lighthouse or Performance at desktop and mobile presets; results are recorded with the final validation notes.

**Constraints**: MUST build successfully via the existing `npm run build` (`tsc && vite build`) before merge; MUST remain fully responsive with no horizontal scrolling at mobile/tablet/desktop breakpoints; MUST NOT introduce automated tests or test tooling; MUST keep dependency count minimal (each new package must close a clear capability gap per constitution principle IV).

**Scale/Scope**: 11 routed pages, ~8 content entity types (all low-volume, static/bundled data — tens of records at most per type), 3 lead-capture forms, single locale (English), no user accounts/authentication.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Gate | Status |
|---|---|---|
| I. Clean, Maintainable Code | Pages/components are small and single-purpose; content data is separated from presentation (`src/data/`); all component props, data records, and form state are explicitly typed | PASS — structure in this plan enforces the separation |
| II. Modern, Attractive UX | Tailwind CSS v4 utility-driven design system; deliberate hover/focus/loading/empty states planned for forms and CTAs | PASS — addressed in research.md and data-model.md |
| III. Responsive Design | Tailwind responsive utilities (`sm:`/`md:`/`lg:`) used for every page; layouts use relative sizing | PASS — verification step included in quickstart.md |
| IV. Minimal Dependencies | Only React, react-dom, react-router-dom, and Tailwind CSS (+ its Vite plugin) are added; each closes a clear gap (UI library, routing across 11 pages, styling); no form library, CMS, or CSS-in-JS added | PASS — see research.md Decision log for justification of each addition |
| V. No Automated Testing (NON-NEGOTIABLE) | No test files, runners, or frameworks are part of this plan's structure or task scope | PASS — explicitly excluded from Project Structure below |
| VI. Requirement Traceability and Verifiable Delivery | Every requirement and success criterion has implementation tasks plus an explicit manual or build verification step | PASS — mapped in tasks.md and quickstart.md |

No violations identified; Complexity Tracking table is not needed.

### Post-Design Re-check (after Phase 1)

Data model ([data-model.md](./data-model.md)) and contracts ([contracts/](./contracts/)) introduce no database, no backend service, no additional dependencies beyond those already listed in Technical Context, and no test files. All content entities remain typed local data modules; the only external integration (form submission) is a client-to-hosted-endpoint HTTP contract with no server code added to this repository. All six principles remain PASS with no new violations. The final manual checklist explicitly verifies emerging-service routing, Privacy Policy metadata, CTA coverage, two-click navigation, timed model selection, responsive behavior, and LCP.

## Project Structure

### Documentation (this feature)

```text
specs/001-pranayansh-website-strategy/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md         # Phase 1 output (/speckit.plan command)
├── quickstart.md         # Phase 1 output (/speckit.plan command)
├── contracts/            # Phase 1 output (/speckit.plan command)
│   ├── content-data-contract.md
│   └── form-submission-contract.md
├── checklists/
│   └── requirements.md
└── tasks.md              # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
index.html
public/
├── icons.svg              # existing
├── robots.txt             # new — SEO crawling rules
└── sitemap.xml            # new — SEO sitemap for the 11 routed pages

src/
├── main.tsx               # entry point; mounts <App /> with router provider
├── App.tsx                # route definitions (react-router-dom), layout shell
├── assets/                # existing images/logos, reused across pages
├── data/                  # structured local content data files (per Clarifications)
│   ├── services.ts        # Service Offering records (core + emerging)
│   ├── industries.ts      # Industry records
│   ├── technologies.ts    # Technology records
│   ├── caseStudies.ts     # Case Study / Testimonial records
│   ├── resourceArticles.ts# Resource Article records
│   └── faq.ts             # FAQ entries
├── types/                 # shared TypeScript interfaces mirroring Key Entities
│   └── content.ts
├── components/
│   ├── layout/             # Navbar, Footer, PageMeta (per-page title/meta)
│   ├── cta/                 # Reusable CTA button/link components
│   ├── cards/                # ServiceCard, TestimonialCard, ResourceCard, FaqItem
│   └── forms/                 # QuoteForm, ContactForm, CareerInterestForm, ConsentCheckbox
├── pages/
│   ├── Home.tsx
│   ├── Services.tsx
│   ├── Industries.tsx
│   ├── About.tsx
│   ├── Careers.tsx
│   ├── CaseStudies.tsx
│   ├── Resources.tsx
│   ├── GetAQuote.tsx
│   ├── Contact.tsx
│   ├── Faq.tsx
│   └── PrivacyPolicy.tsx
└── style.css               # Tailwind directives + minimal global tokens (replaces current CSS)
```

**Structure Decision**: Single Vite + React + TypeScript project at the repository root (no separate frontend/backend split) since there is no custom backend service — this matches the existing repo layout (`src/`, `public/`) and extends it rather than restructuring. Content is separated into `src/data/` (typed data modules) and `src/types/` from presentation in `src/pages/` and `src/components/`, satisfying the Clean, Maintainable Code principle. No `tests/` directory is created, per the constitution's No Automated Testing principle.

## Complexity Tracking

> No Constitution Check violations were identified; this section is not applicable.

