<!--
Sync Impact Report
Version change: 2.1.0 -> 2.1.1
Modified principles: none (no engineering-process or governance change)
Added principles: none
Added sections: none
Removed sections: none
Rationale: Brand rename only — the product rebranded from "Pranayansh
Technologies" (IT staffing-first) to "PRANAYANSH Technology" (full-service
software engineering & IT consulting partner, 12 equal core services). The
constitution's engineering principles were already brand-agnostic and require
no substantive change; only the document title is updated for consistency
with the current application and its README.
Deferred items: none
-->

# PRANAYANSH Technology Constitution


## Core Principles

### I. Clean, Maintainable Code
Code MUST be small, focused, and organized into modules with a single clear
responsibility. Entry files MUST act as thin orchestration layers; reusable
logic MUST live in dedicated, composable functions or components. All exported
functions, shared objects, component props, and non-trivial values MUST have
explicit TypeScript types; `any` MUST NOT be introduced unless justified inline
and immediately constrained. Naming MUST be descriptive, duplication MUST be
eliminated through extraction, and dead code MUST be removed rather than
commented out.

### II. Modern, Attractive UX
The UI MUST use a modern, visually polished design language: consistent
spacing, typography, and color usage driven by Tailwind CSS utility classes
and design tokens. Interactions MUST feel deliberate (transitions, hover and
focus states, loading and empty states MUST be designed, not left default).
Interfaces MUST use semantic HTML and MUST preserve readable contrast and
visible focus states as a baseline usability requirement, in both light and
dark modes where applicable.

### III. Responsive Design
Every screen and component MUST render correctly across mobile, tablet, and
desktop breakpoints using Tailwind's responsive utilities. Layouts MUST use
fluid, relative sizing over fixed pixel dimensions wherever practical, and
MUST be verified at common breakpoints before a UI change is considered done.

### IV. Minimal Dependencies
Prefer the platform, React, and Tailwind's built-in capabilities over adding
new packages. Any added dependency MUST solve a clear capability gap, MUST not
duplicate an existing library already in use, and MUST be justified by the
change author. Unused dependencies MUST be removed promptly.

### V. No Automated Testing (NON-NEGOTIABLE)
This project MUST NOT include unit tests, integration tests, end-to-end tests,
or any other automated test suite. No test files, test runners, or testing
frameworks MUST be added to the repository or its dependencies. This principle
supersedes any other guidance in this constitution, any template, any tooling
default, or any other instruction that implies or requires automated testing.
Verification of behavior MUST rely on manual review, type checking, and
successful builds only.

### VI. Requirement Traceability and Verifiable Delivery
Every functional requirement and measurable success criterion MUST map to one
or more implementation tasks and one explicit verification step. Requirements
involving SEO metadata, responsive behavior, calls to action, performance, or
external form flows MUST identify their manual verification method when
automated tests are prohibited. A task list MUST NOT claim coverage solely
because a shared component or data record exists; the user-visible behavior
must be represented and checked.

## Technical Baseline

The project MUST use React (latest stable version) as the UI library and
Tailwind CSS (latest stable version) for styling. TypeScript MUST be used for
type safety. Source code belongs in `src/`, static public assets belong in
`public/`, and shared imagery or component assets belong in `src/assets/`
unless a different location is explicitly justified. Configuration, secrets,
and environment-specific values MUST remain out of source control. The
project MUST build successfully with the checked-in toolchain before changes
are merged.

## Workflow & Quality Gates

Every change MUST stay as small as possible while still solving the requested
problem. Before merge, the author MUST run the project build and confirm there
are no type errors. No task, review, or tooling MAY request or add automated
tests of any kind; any such request MUST be declined in favor of this
constitution's No Automated Testing principle.

Reviews MUST explicitly check constitutional compliance: clean code and
typing quality, UX polish, responsive behavior across breakpoints, dependency
footprint, and absence of any test code. If a requested change conflicts with
this constitution, the constitution takes precedence until it is amended.

## Governance

This constitution supersedes informal conventions, ad hoc patterns, and
individual file preferences. Amendments require a concrete rationale, an updated
version number, and a new amendment date. Versioning follows semantic versioning:
MAJOR for incompatible governance changes, MINOR for new principles or
sections, and PATCH for clarifications or non-semantic wording changes.

Compliance review is required on every merge request or equivalent review gate.
Any unresolved violation blocks merge until the code or the constitution is
updated to restore compliance.

**Version**: 2.1.1 | **Ratified**: 2026-07-28 | **Last Amended**: 2026-10-02
