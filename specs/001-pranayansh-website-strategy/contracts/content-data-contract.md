# Contract: Content Data Files

**Feature**: [../spec.md](../spec.md) | **Data Model**: [../data-model.md](../data-model.md)

This contract defines the shape every content data module under `src/data/` MUST conform to, so pages/components can rely on a stable, typed structure. These are internal, compile-time contracts (enforced by `tsc`), not network APIs.

## `src/data/services.ts`

```ts
export interface ServiceOffering {
  id: string;
  name: string;
  tagline: string;
  description: string;
  idealFor: string;
  status: "core" | "emerging";
  ctaLabel: string;
}

export const services: ServiceOffering[];
```

- MUST contain exactly the three `status: "core"` records (Dedicated Crew, On-Demand Resources, Pay-Per-Hour Experts) required by FR-003.
- MUST contain the six `status: "emerging"` records required by FR-014 (Software Development, Mobile App Development, AI & Data Solutions, Cloud Consulting, Managed Services, DevOps Services).
- Every `id` MUST be unique.

## `src/data/industries.ts`

```ts
export interface Industry {
  id: string;
  name: string;
  description: string;
  relatedServiceIds: string[];
  relatedTechnologyIds: string[];
}

export const industries: Industry[];
```

- MUST contain the five target industries from FR-004/FR-005 (Software Development, Cloud & DevOps, Data & AI, QA & Testing, Mobile Applications).
- Every id in `relatedServiceIds`/`relatedTechnologyIds` MUST correspond to an existing record in `services.ts`/`technologies.ts`.

## `src/data/technologies.ts`

```ts
export interface Technology {
  id: string;
  name: string;
  category: "language" | "framework" | "cloud" | "practice";
}

export const technologies: Technology[];
```

- MUST include the nine technologies from FR-004 (.NET, Java, Python, React, Angular, Node.js, Azure, AWS, DevOps).

## `src/data/caseStudies.ts`

```ts
export interface CaseStudy {
  id: string;
  title: string;
  summary: string;
  relatedServiceId?: string;
  relatedIndustryId?: string;
  isPlaceholder: boolean;
}

export const caseStudies: CaseStudy[];
```

- Until real client stories exist, all records MUST have `isPlaceholder: true` and MUST NOT include fabricated metrics (edge case in spec.md).

## `src/data/resourceArticles.ts`

```ts
export interface ResourceArticle {
  id: string;
  title: string;
  metaDescription: string;
  body: string;
  publishedDate: string; // ISO date
}

export const resourceArticles: ResourceArticle[];
```

- Every `title` and `metaDescription` MUST be unique across the array (FR-011, FR-017, SC-004).

## `src/data/faq.ts`

```ts
export interface FaqEntry {
  id: string;
  question: string;
  answer: string;
  topic: "engagement-models" | "billing" | "onboarding" | "technology";
}

export const faq: FaqEntry[];
```

- MUST cover all four `topic` values at least once (FR-012).
