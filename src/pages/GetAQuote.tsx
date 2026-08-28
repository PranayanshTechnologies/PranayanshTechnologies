import { useLocation } from "react-router-dom";
import { PageMeta } from "../components/layout/PageMeta";
import { MultiStepQuoteForm } from "../components/forms/MultiStepQuoteForm";
import type { QuoteRequest } from "../types/content";

export default function GetAQuote() {
  const location = useLocation();
  const initialState = (location.state as Partial<QuoteRequest>) || {};

  return (
    <>
      <PageMeta
        title="Get a Project Scope &amp; Rate Estimate"
        description="Request a tailored proposal for Custom Software Development or Dedicated Engineering Pods (Remote / On-Premise) with 48h talent matching."
      />

      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 py-16 sm:py-24">
        {/* Header */}
        <div className="max-w-3xl">
          <span className="kicker-mono text-xs font-bold text-[#FF462D] dark:text-[#FFA699]">
            Instant Scoping &amp; Proposal
          </span>
          <h1 className="mt-2 font-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#161616] dark:text-[#F4F4F4]">
            Get Your Project Scope &amp; Rate Estimate
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#525252] dark:text-[#C6C6C6] leading-relaxed font-sans">
            Tell us about your software project or dedicated engineering squad needs. An Engineering Director will deliver a tailored blueprint and proposal within 2 business hours.
          </p>
        </div>

        {/* Form Container */}
        <div className="mt-12 max-w-4xl">
          <MultiStepQuoteForm initialState={initialState} />
        </div>

        {/* Direct Email Note */}
        <div className="mt-8 text-xs text-[#525252] dark:text-[#A8A8A8] font-sans">
          Prefer to email directly? Reach our solutions architecture team at{" "}
          <a href="mailto:contact@pranayansh.com" className="font-semibold text-[#FF462D] dark:text-[#FF7561] hover:underline">
            contact@pranayansh.com
          </a>
        </div>
      </div>
    </>
  );
}
