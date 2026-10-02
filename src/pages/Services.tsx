import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageMeta } from "../components/layout/PageMeta";
import { ServiceCard } from "../components/cards/ServiceCard";
import { EngagementModelQuiz } from "../components/interactive/EngagementModelQuiz";
import { CtaBanner } from "../components/cta/CtaBanner";
import { services } from "../data/services";
import { engagementModels } from "../data/engagementModels";
import type { ServiceOffering } from "../types/content";

type CategoryFilter = "all" | ServiceOffering["category"];

const FILTERS: { id: CategoryFilter; label: string }[] = [
  { id: "all", label: "All Services" },
  { id: "engineering", label: "💻 Engineering" },
  { id: "cloud-devops", label: "☁️ Cloud & DevOps" },
  { id: "ai-data", label: "🧠 AI & Data" },
  { id: "design", label: "🎨 Design" },
  { id: "consulting", label: "🤝 Consulting & Teams" },
  { id: "managed-marketing", label: "📈 Managed & Marketing" },
];

export default function Services() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("all");

  const filteredServices = services.filter((s) => {
    if (activeFilter === "all") return true;
    return s.category === activeFilter;
  });

  function handleCta(service: ServiceOffering) {
    navigate("/get-a-quote", {
      state: {
        serviceId: service.id,
        projectDescription: `Inquiring about ${service.name} (${service.tagline})`,
      },
    });
  }

  return (
    <>
      <PageMeta
        title="Our 12 Core Services"
        description="Custom software, web & mobile development, cloud consulting, DevOps, AI & generative AI, UI/UX design, data engineering, digital transformation, dedicated teams, managed IT & SEO — one technology partner."
      />

      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 py-16 sm:py-24">
        {/* Header */}
        <div className="max-w-3xl">
          <span className="kicker-mono text-xs font-bold text-[#5B47F5] dark:text-[#9FA3FF]">
            Our Services
          </span>
          <h1 className="mt-2 font-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#161616] dark:text-[#F4F4F4]">
            12 Services. One Technology Partner.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#525252] dark:text-[#C6C6C6] leading-relaxed font-sans">
            From custom software and cloud migration to AI, design, data engineering, and digital transformation — every service below is a first-class capability, not an afterthought.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="mt-10 flex flex-wrap gap-2 border-b border-[#E0E0E0] pb-4 dark:border-[#2D2D2D]">
          {FILTERS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveFilter(tab.id)}
              className={`rounded-lg px-4 py-2 text-xs sm:text-sm font-semibold transition ${
                activeFilter === tab.id
                  ? "bg-[#5B47F5] text-white shadow-xs"
                  : "bg-[#F4F4F4] text-[#525252] hover:bg-[#E0E0E0] dark:bg-[#1F1F1F] dark:text-[#C6C6C6] dark:hover:bg-[#262626]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <section className="mt-8" aria-labelledby="services-heading">
          <h2 id="services-heading" className="sr-only">
            Services
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} onCtaClick={handleCta} />
            ))}
          </div>
        </section>

        {/* Comparison Matrix */}
        <div className="mt-24">
          <div className="max-w-2xl">
            <span className="kicker-mono text-xs font-bold text-[#5B47F5] dark:text-[#9FA3FF]">
              How We Engage
            </span>
            <h2 className="mt-1 font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#161616] dark:text-[#F4F4F4]">
              Choose the Best Delivery Model for Your Organization
            </h2>
          </div>

          <div className="mt-6 overflow-x-auto rounded-xl border border-[#E0E0E0] shadow-xs dark:border-[#2D2D2D]">
            <table className="min-w-full divide-y divide-[#E0E0E0] text-left text-xs sm:text-sm dark:divide-[#2D2D2D]">
              <thead className="bg-[#F4F4F4] dark:bg-[#161616]">
                <tr>
                  <th className="px-5 py-4 font-bold text-[#161616] dark:text-[#F4F4F4]">Engagement Model</th>
                  <th className="px-5 py-4 font-bold text-[#161616] dark:text-[#F4F4F4]">Best Suited For</th>
                  <th className="px-5 py-4 font-bold text-[#161616] dark:text-[#F4F4F4]">Deployment Modes</th>
                  <th className="px-5 py-4 font-bold text-[#161616] dark:text-[#F4F4F4]">Kickoff SLA</th>
                  <th className="px-5 py-4 font-bold text-[#161616] dark:text-[#F4F4F4]">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E0E0E0] bg-white dark:divide-[#2D2D2D] dark:bg-[#121212]">
                {engagementModels.map((m) => (
                  <tr key={m.id} className="hover:bg-[#F4F4F4]/70 dark:hover:bg-[#1F1F1F]/60">
                    <td className="px-5 py-4">
                      <p className="font-bold text-[#161616] dark:text-[#F4F4F4]">{m.name}</p>
                      <p className="kicker-mono text-[11px] text-[#5B47F5] dark:text-[#7B74FF]">{m.subtitle}</p>
                    </td>
                    <td className="px-5 py-4 text-[#525252] dark:text-[#A8A8A8] max-w-xs leading-relaxed text-xs font-sans">
                      {m.bestFor}
                    </td>
                    <td className="px-5 py-4 text-xs text-[#161616] dark:text-[#E0E0E0] font-medium font-sans">
                      {m.id === "custom-software-development" ? "Cloud / Milestone Delivery" : "Remote, On-Premise, Hybrid"}
                    </td>
                    <td className="px-5 py-4 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      {m.onboardingTime}
                    </td>
                    <td className="px-5 py-4">
                      <button
                        type="button"
                        onClick={() => navigate("/get-a-quote", { state: { serviceId: m.id } })}
                        className="rounded-lg bg-[#F4F4F4] px-3.5 py-1.5 text-xs font-semibold text-[#161616] hover:bg-[#5B47F5] hover:text-white transition dark:bg-[#1F1F1F] dark:text-[#E0E0E0] dark:hover:bg-[#5B47F5]"
                      >
                        Select →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Embedded Diagnostic Quiz */}
        <div className="mt-24">
          <EngagementModelQuiz />
        </div>

        {/* Bottom CTA */}
        <CtaBanner
          heading="Ready to build software or expand your engineering team?"
          body="Tell us about your requirements. We'll respond with a transparent scope and quote within 48 hours."
          ctaLabel="Get a Quote"
          to="/get-a-quote"
        />
      </div>
    </>
  );
}

