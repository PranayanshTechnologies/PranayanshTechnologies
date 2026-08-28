import type { QuoteRequest, ContactInquiry, CandidateInterestSubmission } from "../types/content";

/**
 * Client-side integration with the external hosted form endpoint used by all
 * three lead-capture forms (Get a Quote, Contact, Careers/Join Our Network).
 * See contracts/form-submission-contract.md.
 */

export type SubmitFormPayload =
  | { formType: "quote"; payload: QuoteRequest }
  | { formType: "contact"; payload: ContactInquiry }
  | { formType: "career"; payload: CandidateInterestSubmission };

export interface SubmitFormResult {
  ok: boolean;
  error?: string;
}

/**
 * Posts a lead-capture form submission to the configured VITE_FORM_ENDPOINT.
 * Returns { ok: true } on any 2xx response, or { ok: false, error } otherwise
 * (network failure or non-2xx response), per the form-submission contract.
 */
export async function submitForm(input: SubmitFormPayload): Promise<SubmitFormResult> {
  const endpoint = import.meta.env.VITE_FORM_ENDPOINT as string | undefined;

  if (!endpoint) {
    return {
      ok: false,
      error: "Form endpoint is not configured. Please try again later.",
    };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        formType: input.formType,
        submittedAt: new Date().toISOString(),
        payload: input.payload,
      }),
    });

    if (!response.ok) {
      return {
        ok: false,
        error: "We couldn't submit your request. Please try again.",
      };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      error: "We couldn't reach the server. Please check your connection and try again.",
    };
  }
}
