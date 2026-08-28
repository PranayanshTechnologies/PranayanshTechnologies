# Quickstart: Pranayansh Technologies Website & Business Positioning Strategy

**Feature**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

This guide validates the feature end-to-end once implemented. It does not include implementation code — see [data-model.md](./data-model.md) and [contracts/](./contracts/) for the structures being validated.

## Prerequisites

- Node.js and npm installed (matching the versions already used by this repo's Vite/TypeScript toolchain).
- Dependencies installed: `npm install` (after React, react-router-dom, and Tailwind CSS are added per [research.md](./research.md)).
- A `VITE_FORM_ENDPOINT` value configured in a local `.env` file (see [contracts/form-submission-contract.md](./contracts/form-submission-contract.md)) pointing to a hosted form endpoint (or a test endpoint for local validation).

## Setup

```powershell
npm install
npm run dev
```

Open the printed local URL in a browser.

## Validation Scenarios

Run through each scenario and confirm the expected outcome. These map directly to the spec's Acceptance Scenarios and Success Criteria.

### 1. Primary navigation and sitemap (FR-001, FR-015)

- Confirm all 11 pages are reachable from consistent primary navigation: Home, Services, Industries, About, Careers, Case Studies/Testimonials, Resources/Blog, Get a Quote, Contact, FAQ, and a Privacy Policy link in the footer.

### 2. Home → Get a Quote in one click (SC-001, User Story 1 Scenario 1)

- From Home, click the primary CTA.
- **Expected**: Lands directly on the Get a Quote form.
- Repeat from a representative deep page such as FAQ or Case Studies and record the click count.
- **Expected**: The form opens within two clicks from both Home and the deep page.

### 3. Services page → pre-selected Quote form (User Story 1 Scenario 2, FR-003, FR-008)

- From Services, click the CTA on any one of the three engagement models (Dedicated Crew, On-Demand, Pay-Per-Hour).
- **Expected**: Get a Quote form opens with that engagement model pre-selected.
- Start a timer before reading the comparison element and stop after selecting the best-fit model.
- **Expected**: The model can be selected in under 3 minutes (SC-002).

### 4. Quote form validation and consent (FR-008, FR-020, edge case)

- Submit the Get a Quote form with an invalid/missing email.
- **Expected**: Inline validation error; submission blocked.
- Fill all required fields with a valid email but leave the consent checkbox unchecked.
- **Expected**: Submission blocked until consent is checked.
- Complete all required fields and check consent, then submit.
- **Expected**: Success confirmation message shown (per [contracts/form-submission-contract.md](./contracts/form-submission-contract.md)).

### 5. Careers / Join Our Network flow (User Story 2, FR-007, SC-005)

- From Home, reach the Careers page within 2 clicks.
- Confirm supported technologies (.NET, Java, Python, React, Angular, Node.js, Azure, AWS, DevOps) and engagement types are listed.
- Submit the interest form with consent checked.
- **Expected**: Confirmation message shown.

### 6. Emerging services labeling (FR-014, edge case)

- Locate any emerging service (e.g., AI & Data Solutions).
- **Expected**: Clearly labeled as a growing/emerging capability with a "register interest" CTA, distinct from core staffing CTAs; activating it opens Contact with the selected capability carried into the inquiry context.

### 7. Trust and credibility content (User Story 3, FR-006, FR-018, SC-007)

- From Home, reach About within one navigation step.
- Confirm mission, vision, core values, and target industries are present.
- Confirm Case Studies/Testimonials content is honest (no fabricated metrics) where marked as placeholder.

### 8. Privacy policy and consent (FR-019, FR-020)

- Confirm a Privacy Policy page exists and is linked from the footer on every page.
- Confirm all three lead-capture forms require the consent checkbox (linked to the Privacy Policy) before submission.

### 9. SEO metadata uniqueness (FR-017, SC-004)

- Inspect the page `<title>` and meta description on each of the 11 pages, including Privacy Policy.
- **Expected**: Every page has a unique title and meta description.

### 10. Responsive behavior (FR-016, SC-003)

- View each page at common breakpoints (e.g., ~375px mobile, ~768px tablet, ~1280px desktop).
- **Expected**: No horizontal scrolling; navigation, forms, and CTAs remain fully usable at every breakpoint.

### 11. CTA coverage and performance (FR-013, SC-006, plan performance goal)

- Visit all 11 routes and record at least one appropriate CTA on each page: Get a Quote for buyer-facing pages, Join Our Network for talent-facing pages, and a clear next step from FAQ/Resources/Privacy Policy.
- Run browser DevTools Lighthouse or Performance checks at desktop and mobile presets on Home and Services.
- **Expected**: No route is left without a next action, and the implementation records whether the approximate 2.5 second LCP goal is met or documents the remaining bottleneck.

## Build verification

```powershell
npm run build
```

- **Expected**: Build completes successfully with no TypeScript errors (this is the project's sole automated verification gate, per the constitution's No Automated Testing principle — no test command exists or should be added).

## Validation Evidence (2026-08-28)

- Routes: all 11 routes loaded successfully in the shared Chromium browser session.
- SEO: all 11 routes had a non-empty description and unique document title.
- CTA coverage: all 11 routes exposed at least one link or button; Careers, Get a Quote, and Privacy Policy were explicitly checked after the CTA review.
- Contact validation: submitting the empty Contact form produced inline validation errors and did not submit.
- Emerging capability flow: Services showed 6 Register Interest cards; selecting one opened Contact with its capability visible in the subject field.
- Responsive layout: Home and Services produced no horizontal overflow at 1280px and 375px viewport widths.
- Performance timings: Home/Services load timings were 439ms/423ms desktop and 375ms/300ms mobile in the local browser session. Largest Contentful Paint was unavailable because the local Chromium session emitted no LCP performance entry; Lighthouse should be used in a production-like deployment for a definitive LCP measurement.
