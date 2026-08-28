import { useState } from "react";
import { PageMeta } from "../components/layout/PageMeta";
import { CaseStudyDetailCard } from "../components/cards/CaseStudyDetailCard";
import { CtaBanner } from "../components/cta/CtaBanner";
import { caseStudies } from "../data/caseStudies";

export default function CaseStudies() {
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all");

  const filteredCaseStudies = caseStudies.filter((cs) => {
    if (selectedIndustry === "all") return true;
    return cs.relatedIndustryId === selectedIndustry;
  });

  return (
    <>
      <PageMeta
        title="Enterprise Case Studies &amp; Architecture"
        description="Explore how Pranayansh Technologies builds custom software and scales engineering teams for high-growth enterprises."
      />

      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 py-16 sm:py-24">
        {/* Header */}
        <div className="max-w-3xl">
          <span className="kicker-mono text-xs font-bold text-[#FF462D] dark:text-[#FFA699]">
            Client Outcomes
          </span>
          <h1 className="mt-2 font-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#161616] dark:text-[#F4F4F4]">
            Engineering Outcomes &amp; Architecture
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#525252] dark:text-[#C6C6C6] leading-relaxed font-sans">
            Real architectural modernizations, cloud migrations, and product deliveries built by Pranayansh teams.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="mt-10 flex flex-wrap gap-2 border-b border-[#E0E0E0] pb-4 dark:border-[#2D2D2D]">
          {[
            { id: "all", label: "All Work" },
            { id: "software-development-industry", label: "FinTech & Payments" },
            { id: "cloud-devops", label: "Cloud & E-Commerce" },
            { id: "data-ai", label: "Healthcare & AI" },
            { id: "mobile-apps", label: "Mobile Applications" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedIndustry(tab.id)}
              className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition ${
                selectedIndustry === tab.id
                  ? "bg-[#FF462D] text-white shadow-xs"
                  : "bg-[#F4F4F4] text-[#525252] hover:bg-[#E0E0E0] dark:bg-[#1F1F1F] dark:text-[#C6C6C6] dark:hover:bg-[#262626]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Case Studies Grid */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {filteredCaseStudies.map((caseStudy) => (
            <CaseStudyDetailCard key={caseStudy.id} caseStudy={caseStudy} />
          ))}
        </div>

        {/* Bottom CTA */}
        <CtaBanner
          heading="Have a similar architectural challenge?"
          body="Let's discuss how our software engineering team or dedicated squads can deliver your roadmap."
          ctaLabel="Discuss Your Project"
          to="/get-a-quote"
        />
      </div>
    </>
  );
}
