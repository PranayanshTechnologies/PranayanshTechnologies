import { useNavigate } from "react-router-dom";
import { PageMeta } from "../components/layout/PageMeta";
import { CtaBanner } from "../components/cta/CtaBanner";
import { industries } from "../data/industries";

function IndustryNatureIcon({ id }: { id: string }) {
  switch (id) {
    case "fintech-banking-payments":
      // FinTech: Vault Shield & Digital Currency Node
      return (
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EEF0FF] text-[#5B47F5] dark:bg-[#1E1B4B] dark:text-[#9FA3FF] border border-[#C5C9FF] dark:border-[#251D6B]">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      );
    case "healthcare-life-sciences":
      // Healthcare: Medical Cross & Vital Pulse Wave
      return (
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
      );
    case "real-estate":
      // Real Estate: Property / Listing Building
      return (
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-200 dark:border-amber-900">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </div>
      );
    case "ecommerce-retail":
      // E-Commerce: High Velocity Cart & Delivery
      return (
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-200 dark:border-amber-900">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
      );
    case "logistics-supply-chain":
      // Logistics / Fleet: GPS Route & Connected Transport
      return (
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400 border border-purple-200 dark:border-purple-900">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
          </svg>
        </div>
      );
    default:
      // Educational Institutions: Graduation Cap / Learning Node
      return (
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600 dark:bg-orange-950/60 dark:text-orange-400 border border-orange-200 dark:border-orange-900">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.42A12.083 12.083 0 0112 20.055 12.083 12.083 0 015.84 10.58L12 14z" />
          </svg>
        </div>
      );
  }
}

export default function Industries() {
  const navigate = useNavigate();

  function handleIndustryQuote(industryName: string) {
    navigate("/get-a-quote", {
      state: {
        serviceId: "custom-software-development",
        projectDescription: `Inquiring about software engineering or dedicated consulting for ${industryName}.`,
      },
    });
  }

  return (
    <>
      <PageMeta
        title="Industry-Specific Engineering Solutions"
        description="Domain-fluent software development and consulting tailored to FinTech, Healthcare, Real Estate, E-Commerce, Logistics, and Education."
      />

      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 py-16 sm:py-24">
        {/* Header */}
        <div className="max-w-3xl">
          <span className="kicker-mono text-xs font-bold text-[#5B47F5] dark:text-[#9FA3FF]">
            Industry-Specific Solutions
          </span>
          <h1 className="mt-2 font-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#161616] dark:text-[#F4F4F4]">
            Engineering Tailored to the Nature of Your Industry
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#525252] dark:text-[#C6C6C6] leading-relaxed font-sans">
            We match you with software engineers and agile squads who understand your sector's regulatory compliance, latency constraints, and operational realities.
          </p>
        </div>

        {/* Industry Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((ind) => (
            <div
              key={ind.id}
              className="clean-card flex flex-col justify-between rounded-xl border border-[#E0E0E0] bg-white p-8 shadow-xs dark:border-[#2D2D2D] dark:bg-[#161616]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <IndustryNatureIcon id={ind.id} />
                  <span className="kicker-mono text-[10px] font-bold text-[#8D8D8D] border border-[#E0E0E0] dark:border-[#393939] px-2.5 py-1 rounded-md">
                    {ind.badgeLabel}
                  </span>
                </div>

                <h3 className="mt-5 font-heading text-xl font-bold text-[#161616] dark:text-[#F4F4F4]">
                  {ind.name}
                </h3>
                <p className="mt-1.5 text-xs text-[#5B47F5] dark:text-[#7B74FF] font-semibold font-sans">
                  {ind.tagline}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-[#525252] dark:text-[#A8A8A8] font-sans">
                  {ind.description}
                </p>

                {/* Specific Challenges / Nature */}
                {ind.challenges && ind.challenges.length > 0 && (
                  <div className="mt-5 space-y-2 border-t border-[#E0E0E0] pt-4 dark:border-[#2D2D2D]">
                    <p className="kicker-mono text-[10px] font-bold text-[#8D8D8D]">Core Domain Challenges</p>
                    <ul className="space-y-1 text-[11px] text-[#525252] dark:text-[#C6C6C6] font-sans">
                      {ind.challenges.map((c, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-[#5B47F5] font-bold">▪</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-[#E0E0E0] dark:border-[#2D2D2D]">
                <button
                  type="button"
                  onClick={() => handleIndustryQuote(ind.name)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#5B47F5] hover:text-[#3827AB] dark:text-[#7B74FF] transition"
                >
                  Build {ind.name.split(",")[0]} Solution →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <CtaBanner
          heading="Need domain-specific software engineering?"
          body="Tell us about your industry requirements and we'll assemble an experienced squad in 48 hours."
          ctaLabel="Get a Quote &amp; Scope"
          to="/get-a-quote"
        />
      </div>
    </>
  );
}
