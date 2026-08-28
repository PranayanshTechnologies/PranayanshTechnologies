---

description: "Task list for feature implementation"
---

# Tasks: Pranayansh Technologies Website & Business Positioning Strategy

**Input**: Design documents from `/specs/001-pranayansh-website-strategy/`

**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/](./contracts/), [quickstart.md](./quickstart.md)

**Tests**: Not included. Constitution v2.0.0 principle V (No Automated Testing, NON-NEGOTIABLE) forbids unit, integration, and end-to-end tests; the sole verification gates are `npm run build` (type checking) and the manual [quickstart.md](./quickstart.md) walkthrough.

**Organization**: Tasks are grouped by user story (from spec.md) to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependency on an incomplete task)
- **[Story]**: Maps the task to US1, US2, or US3 from spec.md
- File paths reference the structure defined in [plan.md](./plan.md)

## Path Conventions

Single Vite + React + TypeScript project at the repository root (per plan.md Structure Decision): `src/pages/`, `src/components/`, `src/data/`, `src/types/`, `src/lib/`. No `tests/` directory (per constitution).

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Add the React/Tailwind toolchain on top of the existing Vite/TypeScript project

- [X] T001 Add `react`, `react-dom`, `react-router-dom`, `tailwindcss`, `@tailwindcss/vite`, `@vitejs/plugin-react`, `@types/react`, `@types/react-dom` to package.json via `npm install` (per plan.md Technical Context and research.md §1, §4, §7)
- [X] T002 Create `vite.config.ts` at the repo root registering the React and Tailwind Vite plugins (depends on T001)
- [X] T003 [P] Update `tsconfig.json` to support JSX (`"jsx": "react-jsx"`, include `.tsx` files, add `"types": ["vite/client"]` retained)
- [X] T004 [P] Replace the contents of `src/style.css` with Tailwind's `@import "tailwindcss"` directive plus a small `@theme` token block for brand colors/fonts (research.md §4)
- [X] T005 [P] Create `.env.example` at the repo root with a `VITE_FORM_ENDPOINT` placeholder (contracts/form-submission-contract.md)

**Checkpoint**: Toolchain ready — `npm run dev` can serve a React entry point once Foundational phase adds `App.tsx`/`main.tsx`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared types, content data, layout, and routing that every user story depends on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T006 [P] Create `src/types/content.ts` with the shared entity interfaces (`ServiceOffering`, `Industry`, `Technology`, `QuoteRequest`, `ContactInquiry`, `CandidateInterestSubmission`, `CaseStudy`, `ResourceArticle`, `FaqEntry`) per data-model.md
- [X] T007 [P] Create `src/data/technologies.ts` with the 9 technology records (.NET, Java, Python, React, Angular, Node.js, Azure, AWS, DevOps) per contracts/content-data-contract.md (depends on T006)
- [X] T008 [P] Create `src/data/services.ts` with the 3 core engagement models (Dedicated Crew, On-Demand Resources, Pay-Per-Hour Experts) and 6 emerging services (Software Development, Mobile App Development, AI & Data Solutions, Cloud Consulting, Managed Services, DevOps Services) per contracts/content-data-contract.md (depends on T006)
- [X] T009 [P] Create `src/data/industries.ts` with the 5 target industries, each referencing related service and technology ids per contracts/content-data-contract.md (depends on T006, T007, T008)
- [X] T010 [P] Create `src/lib/submitForm.ts` implementing the POST contract in contracts/form-submission-contract.md (formType discriminator, `fetch`, success/error response handling) (depends on T006)
- [X] T011 [P] Create `src/components/forms/ConsentCheckbox.tsx`, a reusable required consent checkbox linking to the `/privacy-policy` route (FR-020)
- [X] T012 [P] Create `src/components/layout/PageMeta.tsx` that sets `document.title` and the meta description tag on mount (research.md §3, FR-017)
- [X] T013 [P] Create `src/components/layout/Navbar.tsx` with primary navigation (Home, Services, Industries, About, Careers, Contact, Get a Quote) per FR-015
- [X] T014 [P] Create `src/components/layout/Footer.tsx` with secondary navigation (Case Studies, Resources, FAQ) and a Privacy Policy link on every page per FR-001
- [X] T015 Create `src/pages/PrivacyPolicy.tsx` describing how Get a Quote/Contact/Careers data is collected and used (FR-019) (depends on T012)
- [X] T016 Create `src/App.tsx` with `react-router-dom` routes for all 11 pages (Home, Services, Industries, About, Careers, CaseStudies, Resources, GetAQuote, Contact, Faq, PrivacyPolicy) wrapped in a shared layout (Navbar + Footer) (depends on T013, T014, T015)
- [X] T017 Create `src/main.tsx` mounting `<App />` inside `<BrowserRouter>` and update `index.html`'s script tag to load `/src/main.tsx` (depends on T016, T002)
- [X] T018 Remove the now-superseded `src/main.ts` and `src/counter.ts` vanilla entry files (depends on T017)

**Checkpoint**: Foundation ready — routing, layout, shared data, and form submission plumbing exist; user story pages can now be built in parallel

---

## Phase 3: User Story 1 - Prospective Client Requests Staffing Quote (Priority: P1) 🎯 MVP

**Goal**: A hiring manager/CTO can go Home → Services → Get a Quote, understand the three engagement models, and submit a quote request with the model pre-selected.

**Independent Test**: Navigate Home → Services → Get a Quote, fill the form (name, company, email, service type, technology need, timeframe, consent), submit, and confirm a success message is shown.

- [X] T019 [P] [US1] Create `src/pages/Home.tsx` with the value proposition, tagline ("Flexible IT Staffing Solutions for Modern Businesses"), primary USPs, and a primary CTA linking to Get a Quote above the fold (FR-002)
- [X] T020 [P] [US1] Create `src/components/cards/ServiceCard.tsx` rendering a `ServiceOffering` (name, tagline, description, ideal-for, CTA)
- [X] T021 [US1] Create `src/pages/Services.tsx` listing the 3 core engagement models via `ServiceCard`, a comparison element to help visitors self-select, and the technology/industry lists from `src/data/technologies.ts` and `src/data/industries.ts` (FR-003, FR-004) (depends on T020, T008, T007, T009)
- [X] T022 [US1] Create `src/pages/GetAQuote.tsx` with the Quote Request form (name, company, email, phone, service/engagement type, technology need, timeframe, `ConsentCheckbox`), reading a pre-selected `serviceId` from route/query state, and submitting via `src/lib/submitForm.ts` with pending/success/error UI (FR-008) (depends on T010, T011, T008)
- [X] T023 [US1] Add inline field validation to the Get a Quote form (required fields, email format check, consent required before submit) per contracts/form-submission-contract.md (depends on T022)
- [X] T024 [US1] Wire each Services page engagement-model CTA to open Get a Quote with that model pre-selected, and wire the Home page primary CTA to Get a Quote (depends on T019, T021, T022)
- [X] T025 [US1] Add unique SEO title and meta description to Home, Services, and Get a Quote pages via `PageMeta` (FR-017) (depends on T019, T021, T022, T012)

**Checkpoint**: User Story 1 is fully functional and independently testable (Home → Services → Get a Quote, submit, confirm)

---

## Phase 4: User Story 2 - Technology Professional Explores Opportunities (Priority: P2)

**Goal**: A technology professional can find the Careers/Join Our Network page within 2 clicks from Home, review supported technologies and engagement types, and submit an interest form.

**Independent Test**: Navigate to Careers from Home, review technologies/engagement types, submit the interest form with consent, and confirm a success message is shown — independent of the Get a Quote flow.

- [X] T026 [P] [US2] Create `src/pages/Careers.tsx` listing supported technologies (`src/data/technologies.ts`) and available engagement types (`src/data/services.ts`, core records) (FR-007) (depends on T007, T008)
- [X] T027 [US2] Add the candidate interest form to `Careers.tsx` (name, email, technology background multi-select, preferred engagement type, `ConsentCheckbox`), submitting via `src/lib/submitForm.ts` (depends on T026, T010, T011)
- [X] T028 [US2] Add inline validation to the career interest form (required fields, email format, at least one technology selected, consent required) (depends on T027)
- [X] T029 [US2] Add unique SEO title and meta description to the Careers page via `PageMeta` (FR-017) (depends on T026, T012)

**Checkpoint**: User Stories 1 and 2 both work independently

---

## Phase 5: User Story 3 - Stakeholder Evaluates Credibility and Positioning (Priority: P3)

**Goal**: An investor/partner/enterprise buyer can read About (mission, vision, values, industries) and trust-building content (Industries, Case Studies) and find it coherent and honest.

**Independent Test**: Navigate to About, Industries, and Case Studies independently of submitting any form, and confirm mission/vision/values/industries are presented and testimonial content is honest (no fabricated metrics where marked as placeholder).

- [X] T030 [P] [US3] Create `src/pages/About.tsx` presenting mission, vision, core values (Integrity, Innovation, Customer Success, Agility, Excellence), and company positioning narrative (FR-006)
- [X] T031 [P] [US3] Create `src/pages/Industries.tsx` mapping the 5 target industries to related service offerings and technologies (FR-005) (depends on T009)
- [X] T032 [P] [US3] Create `src/components/cards/TestimonialCard.tsx` rendering a `CaseStudy` record, clearly indicating placeholder status without fabricated metrics
- [X] T033 [US3] Create `src/data/caseStudies.ts` with honest placeholder case studies per contracts/content-data-contract.md (depends on T006)
- [X] T034 [US3] Create `src/pages/CaseStudies.tsx` rendering the case studies via `TestimonialCard` (depends on T032, T033)
- [X] T035 [US3] Review and align trust-building elements (core values, technology depth, industry focus) so they appear consistently across Home, About, and Services pages (FR-018) (depends on T019, T021, T030)
- [X] T036 [US3] Add unique SEO title and meta description to About, Industries, and Case Studies pages via `PageMeta` (FR-017) (depends on T030, T031, T034, T012)

**Checkpoint**: All three user stories are independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Remaining sitemap pages (not tied to a single prioritized story) and final verification across the whole site

- [X] T037 [P] Create `src/pages/Contact.tsx` with a general inquiry form (name, email, message, `ConsentCheckbox`) separate from Get a Quote, submitting via `src/lib/submitForm.ts` (FR-009) (depends on T010, T011)
- [X] T038 [P] Create `src/data/resourceArticles.ts` with initial articles, each with a unique title and meta description (FR-011, FR-017) (depends on T006)
- [X] T039 [P] Create `src/data/faq.ts` covering all four topics (engagement-models, billing, onboarding, technology) (FR-012) (depends on T006)
- [X] T040 Create `src/pages/Resources.tsx` listing resource articles (FR-011) (depends on T038)
- [X] T041 Create `src/pages/Faq.tsx` grouping FAQ entries by topic (FR-012) (depends on T039)
- [X] T042 Add unique SEO title and meta description to Contact, Resources, and FAQ pages via `PageMeta` (FR-017) (depends on T037, T040, T041, T012)
- [X] T043 [P] Create `public/robots.txt` and `public/sitemap.xml` listing all 11 routes for search-engine crawling
- [X] T044 Review pass across all 11 pages to confirm each presents at least one clear call-to-action (FR-013, SC-006)
- [X] T045 Run `npm run build` and confirm the production build succeeds with zero TypeScript errors (sole automated verification gate per constitution v2.0.0)
- [X] T046 Execute all 10 scenarios in quickstart.md manually, including responsive breakpoint checks (FR-016, SC-003) and a full SEO title/meta-description uniqueness review across all 11 pages (SC-004)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational phase completion
  - US1, US2, US3 can proceed in parallel (if staffed) or sequentially in priority order (P1 → P2 → P3)
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational — no dependency on US2/US3
- **User Story 2 (P2)**: Can start after Foundational — independent of US1/US3
- **User Story 3 (P3)**: Can start after Foundational — T035 touches Home/Services files created in US1, so if working sequentially, complete US1 first; if working in parallel, coordinate on that one task

### Within Each User Story

- Data/type dependencies (Foundational) before page components
- Page components before wiring/validation tasks
- SEO metadata task last, once the page content it targets exists

### Parallel Opportunities

- Setup: T003, T004, T005 can run in parallel after T001-T002
- Foundational: T006 first, then T007-T014 in parallel, then T015 → T016 → T017 → T018 sequentially
- Once Foundational completes, US1, US2, and US3 can be worked on in parallel by different developers
- Within US1: T019 and T020 in parallel; within US3: T030, T031, T032 in parallel
- Polish: T037, T038, T039, T043 can run in parallel

---

## Parallel Example: Foundational Phase

```bash
# After T006 (types) completes, launch these together:
Task: "Create src/data/technologies.ts per contracts/content-data-contract.md"
Task: "Create src/data/services.ts per contracts/content-data-contract.md"
Task: "Create src/lib/submitForm.ts per contracts/form-submission-contract.md"
Task: "Create src/components/forms/ConsentCheckbox.tsx"
Task: "Create src/components/layout/PageMeta.tsx"
Task: "Create src/components/layout/Navbar.tsx"
Task: "Create src/components/layout/Footer.tsx"
```

## Parallel Example: User Story 1

```bash
Task: "Create src/pages/Home.tsx with value proposition and primary CTA"
Task: "Create src/components/cards/ServiceCard.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL — blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Run the Home → Services → Get a Quote quickstart scenarios independently
5. Deploy/demo if ready — this is the primary revenue-generating flow

### Incremental Delivery

1. Setup + Foundational → foundation ready
2. Add User Story 1 → validate independently → deploy/demo (MVP)
3. Add User Story 2 → validate independently → deploy/demo
4. Add User Story 3 → validate independently → deploy/demo
5. Polish phase → remaining sitemap pages, SEO files, full build/quickstart verification

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (T019-T025)
   - Developer B: User Story 2 (T026-T029)
   - Developer C: User Story 3 (T030-T036)
3. Stories complete and integrate independently; Polish phase follows once all three are done

---

## Notes

- [P] tasks = different files, no dependency on an incomplete task
- [Story] label maps task to US1/US2/US3 for traceability
- No test tasks are included anywhere in this list — constitution v2.0.0 principle V (No Automated Testing) is NON-NEGOTIABLE and supersedes any default that would otherwise add them
- Commit after each task or logical group
- `npm run build` (T045) is the only automated verification step in this project
