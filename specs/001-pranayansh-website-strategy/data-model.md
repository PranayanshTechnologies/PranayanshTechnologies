# Data Model: Pranayansh Technologies Website & Business Positioning Strategy

**Feature**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

All entities are structured content records maintained in local TypeScript data files under `src/data/` (see [research.md](./research.md) §5), not database-backed records. Shared interfaces live in `src/types/content.ts`.

## Service Offering

Represents a staffing engagement model or an emerging service line.

| Field | Type | Notes |
|---|---|---|
| `id` | `string` | Unique slug, e.g. `dedicated-crew` |
| `name` | `string` | Display name, e.g. "Dedicated Crew" |
| `tagline` | `string` | One-line summary |
| `description` | `string` | What it is |
| `idealFor` | `string` | Who/when it's the right fit |
| `status` | `"core" \| "emerging"` | Core = Dedicated Crew / On-Demand / Pay-Per-Hour; Emerging = Software Development, Mobile, AI & Data, Cloud Consulting, Managed Services, DevOps (FR-014) |
| `ctaLabel` | `string` | e.g. "Get a Quote" (core) or "Register Interest" (emerging) |

**Validation rules**: `id` MUST be unique across all Service Offering records. `status` determines which CTA behavior applies (FR-003 pre-selects Get a Quote for `core`; FR-014 routes `emerging` to a "register interest" path).

## Industry

Represents a target industry vertical.

| Field | Type | Notes |
|---|---|---|
| `id` | `string` | Unique slug |
| `name` | `string` | e.g. "Data & AI" |
| `description` | `string` | Why this industry engages Pranayansh |
| `relatedServiceIds` | `string[]` | References `Service Offering.id` |
| `relatedTechnologyIds` | `string[]` | References `Technology.id` |

**Validation rules**: Every id in `relatedServiceIds`/`relatedTechnologyIds` MUST match an existing record (checked by convention during data authoring; no runtime schema validator is introduced, per Minimal Dependencies).

## Technology

Represents a named technology skill area.

| Field | Type | Notes |
|---|---|---|
| `id` | `string` | Unique slug |
| `name` | `string` | e.g. ".NET", "React" |
| `category` | `"language" \| "framework" \| "cloud" \| "practice"` | Used for grouping on Services/Careers pages |

## Quote Request (form submission payload, not persisted in-repo)

| Field | Type | Notes |
|---|---|---|
| `name` | `string` | required |
| `company` | `string` | required |
| `email` | `string` | required, must match a valid email pattern (edge case: invalid/missing email blocks submission) |
| `phone` | `string \| undefined` | optional |
| `serviceId` | `string` | references `Service Offering.id`; pre-selected when reached via a Services page CTA (FR-008) |
| `technologyNeed` | `string` | free text |
| `timeframe` | `string` | free text or enumerated range |
| `consentAccepted` | `boolean` | MUST be `true` before submission is allowed (FR-020) |

## Contact Inquiry (form submission payload)

| Field | Type | Notes |
|---|---|---|
| `name` | `string` | required |
| `email` | `string` | required, valid email pattern |
| `message` | `string` | required |
| `consentAccepted` | `boolean` | MUST be `true` before submission is allowed (FR-020) |

## Candidate Interest Submission (form submission payload)

| Field | Type | Notes |
|---|---|---|
| `name` | `string` | required |
| `email` | `string` | required, valid email pattern |
| `technologyBackground` | `string[]` | references `Technology.id` values the candidate selects |
| `preferredEngagementType` | `"dedicated" \| "on-demand" \| "pay-per-hour" \| "any"` | |
| `consentAccepted` | `boolean` | MUST be `true` before submission is allowed (FR-020) |

## Case Study / Testimonial

| Field | Type | Notes |
|---|---|---|
| `id` | `string` | Unique slug |
| `title` | `string` | e.g. client/project name or honest placeholder headline |
| `summary` | `string` | Narrative body |
| `relatedServiceId` | `string \| undefined` | References `Service Offering.id` |
| `relatedIndustryId` | `string \| undefined` | References `Industry.id` |
| `isPlaceholder` | `boolean` | `true` until replaced with a real, verifiable client story (per spec Assumptions); placeholder content MUST NOT fabricate metrics (edge case) |

## Resource Article

| Field | Type | Notes |
|---|---|---|
| `id` | `string` | Unique slug, used as route param |
| `title` | `string` | Unique per article (FR-011, FR-017) |
| `metaDescription` | `string` | Unique per article, used for SEO (FR-017) |
| `body` | `string` | Article content (plain text/markdown-like paragraphs) |
| `publishedDate` | `string` (ISO date) | |

## FAQ Entry

| Field | Type | Notes |
|---|---|---|
| `id` | `string` | Unique slug |
| `question` | `string` | |
| `answer` | `string` | |
| `topic` | `"engagement-models" \| "billing" \| "onboarding" \| "technology"` | Groups FAQ content per FR-012 |

## Relationships Summary

```text
Service Offering (1) ──< Case Study / Testimonial (0..n)
Service Offering (1) ──< Industry (0..n, via relatedServiceIds)
Industry (1) ──< Technology (0..n, via relatedTechnologyIds)
Service Offering (1) ──< Quote Request (0..n, via serviceId)
Technology (1) ──< Candidate Interest Submission (0..n, via technologyBackground)
```

No entity is persisted server-side; only form submission payloads (Quote Request, Contact Inquiry, Candidate Interest Submission) leave the browser, sent to the external hosted form endpoint (see [contracts/form-submission-contract.md](./contracts/form-submission-contract.md)).
