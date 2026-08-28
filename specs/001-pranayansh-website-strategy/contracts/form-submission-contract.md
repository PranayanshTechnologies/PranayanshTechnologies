# Contract: Lead-Capture Form Submission

**Feature**: [../spec.md](../spec.md) | **Data Model**: [../data-model.md](../data-model.md) | **Research**: [../research.md](../research.md) §2

Each of the three lead-capture forms (Get a Quote, Contact, Careers/Join Our Network) submits a POST request from the browser to a single external hosted form endpoint, configured via the `VITE_FORM_ENDPOINT` build-time environment variable. This is an external HTTP contract (client → third-party hosted form service), not an API implemented by this repository.

## Request

- **Method**: `POST`
- **URL**: value of `VITE_FORM_ENDPOINT`
- **Headers**: `Content-Type: application/json`, `Accept: application/json`
- **Body**: JSON object with a `formType` discriminator plus the relevant payload from data-model.md:

```json
{
  "formType": "quote" | "contact" | "career",
  "submittedAt": "2026-07-28T12:00:00.000Z",
  "payload": { /* Quote Request | Contact Inquiry | Candidate Interest Submission */ }
}
```

## Client-side validation (before request is sent)

- `name`: required, non-empty.
- `email`: required, MUST match a standard email pattern; invalid/missing email blocks submission with inline validation (spec edge case).
- `consentAccepted`: MUST be `true`; the consent checkbox is required and unchecked state blocks submission (FR-020).
- Quote-specific: `serviceId`, `technologyNeed`, `timeframe` required.
- Contact-specific: `message` required.
- Emerging-service Contact inquiries MAY include `serviceId` to preserve the selected capability context from the Services page.
- Career-specific: `technologyBackground` MUST contain at least one entry.

## Response handling

| Condition | UI behavior |
|---|---|
| HTTP 2xx | Show a success confirmation message in place of the form (FR-008/FR-009's "confirm successful submission") |
| Network error or non-2xx | Show an inline error message and allow retry without losing entered field values |
| Client-side validation failure | Form is not submitted; inline field errors are shown (edge case: invalid/missing email) |

## Notes

- The actual hosted form endpoint account/provider setup (e.g., creating the endpoint, spam protection configuration) is an operational/deployment concern outside this repository's code changes, tracked as a deployment prerequisite rather than a coding task.
- No server-side code is added to this repository to implement this contract; it is a pure client-to-external-service integration, consistent with the Minimal Dependencies principle and the spec's assumption that lead-routing infrastructure is decided during planning (this document is that decision).
