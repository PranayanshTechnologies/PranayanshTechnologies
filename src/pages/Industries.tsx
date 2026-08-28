import { useNavigate } from "react-router-dom";
import { PageMeta } from "../components/layout/PageMeta";
import { CtaBanner } from "../components/cta/CtaBanner";
import { industries } from "../data/industries";

function IndustryNatureIcon({ id }: { id: string }) {
  switch (id) {
    case "software-development-industry":
      // FinTech: Vault Shield & Digital Currency Node
      return (
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF2F0] text-[#FF462D] dark:bg-[#2A0E0A] dark:text-[#FFA699] border border-[#FFCCC4] dark:border-[#7E190E]">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      );
    case "data-ai":
      // Healthcare: Medical Cross & Vital Pulse Wave
      return (
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
      );
    case "cloud-devops":
      // E-Commerce: High Velocity Cart & Delivery
      return (
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-200 dark:border-amber-900">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
      );
    case "saas-enterprise":
      // SaaS Enterprise: Cloud Microservice Hexagon Mesh
      return (
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-600 dark:bg-sky-950/60 dark:text-sky-400 border border-sky-200 dark:border-sky-900">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 00-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
        </div>
      );
    case "mobile-applications":
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
      // Manufacturing & Industrial Automation: Precision Gear / Sensor Node
      return (
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600 dark:bg-orange-950/60 dark:text-orange-400 border border-orange-200 dark:border-orange-900">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
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
        serviceId: "software-development",
        projectDescription: `Inquiring about software engineering or dedicated consulting for ${industryName}.`,
      },
    });
  }

  return (
    <>
      <PageMeta
        title="Industry-Specific Engineering Solutions"
        description="Domain-fluent software development and dedicated engineering consulting tailored to the specific nature of FinTech, Healthcare, E-Commerce, SaaS, and Logistics."
      />

      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 py-16 sm:py-24">
        {/* Header */}
        <div className="max-w-3xl">
          <span className="kicker-mono text-xs font-bold text-[#FF462D] dark:text-[#FFA699]">
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
                <p className="mt-1.5 text-xs text-[#FF462D] dark:text-[#FF7561] font-semibold font-sans">
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
                          <span className="text-[#FF462D] font-bold">▪</span>
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
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#FF462D] hover:text-[#BA2212] dark:text-[#FF7561] transition"
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
