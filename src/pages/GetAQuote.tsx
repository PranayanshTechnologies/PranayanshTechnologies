import { useLocation } from "react-router-dom";
import { PageMeta } from "../components/layout/PageMeta";
import { MultiStepQuoteForm } from "../components/forms/MultiStepQuoteForm";
import { CtaBanner } from "../components/cta/CtaBanner";
import type { QuoteRequest } from "../types/content";

export default function GetAQuote() {
  const location = useLocation();
  const initialState = (location.state as Partial<QuoteRequest>) || {};

  return (
    <>
      <PageMeta
        title="Get a Project Scope &amp; Rate Estimate"
        description="Request a tailored proposal for any of our 12 core services, including Custom Software Development and Dedicated Development Teams."
      />

      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 py-16 sm:py-24">
        {/* Header */}
        <div className="max-w-3xl">
          <span className="kicker-mono text-xs font-bold text-[#5B47F5] dark:text-[#9FA3FF]">
            Instant Scoping &amp; Proposal
          </span>
          <h1 className="mt-2 font-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#161616] dark:text-[#F4F4F4]">
            Get Your Project Scope &amp; Rate Estimate
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#525252] dark:text-[#C6C6C6] leading-relaxed font-sans">
            Tell us about your project or team needs. A solutions architect will deliver a tailored proposal within 48 hours.
          </p>
        </div>

        {/* Form Container */}
        <div className="mt-12 max-w-4xl">
          <MultiStepQuoteForm initialState={initialState} />
        </div>

        {/* Direct Email Note */}
        <div className="mt-8 text-xs text-[#525252] dark:text-[#A8A8A8] font-sans">
          Prefer to email directly? Reach our solutions architecture team at{" "}
          <a href="mailto:contact@pranayansh.com" className="font-semibold text-[#5B47F5] dark:text-[#7B74FF] hover:underline">
            contact@pranayansh.com
          </a>
        </div>

        <CtaBanner
          heading="Still deciding where to start?"
          body="Ask a technical question and we will help you shape the right engagement."
          ctaLabel="Contact Our Team"
          to="/contact"
          secondaryLabel="Join Our Network"
          secondaryTo="/careers"
        />
      </div>
    </>
  );
}
