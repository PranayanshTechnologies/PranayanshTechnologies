import { Link } from "react-router-dom";
import { PageMeta } from "../components/layout/PageMeta";
import { HeroBento } from "../components/interactive/HeroBento";
import { CoreServicesEngagementSection } from "../components/interactive/CoreServicesEngagementSection";
import { CostEstimatorWizard } from "../components/interactive/CostEstimatorWizard";
import { CaseStudyDetailCard } from "../components/cards/CaseStudyDetailCard";
import { CtaBanner } from "../components/cta/CtaBanner";
import { caseStudies } from "../data/caseStudies";
import { services } from "../data/services";
import { products } from "../data/products";

const USPS = [
  { icon: "🤖", title: "AI-First Development", desc: "Every engagement considers where AI can accelerate delivery and outcomes." },
  { icon: "☁️", title: "Cloud-Native Solutions", desc: "Built for Azure, AWS, and Google Cloud from day one." },
  { icon: "🔁", title: "End-to-End Product Engineering", desc: "From discovery and design through launch and ongoing support." },
  { icon: "🛡️", title: "Enterprise Security & Scalability", desc: "Secure-by-design architecture that grows with your business." },
  { icon: "⚡", title: "Rapid Development & Delivery", desc: "Proposals in days, not weeks — momentum from day one." },
  { icon: "🌍", title: "Global Talent Pool", desc: "Senior engineers across India, the USA, the Middle East & Europe." },
  { icon: "🤝", title: "Long-Term Technology Partnership", desc: "We aim to grow with you across multiple engagements, not just one project." },
];

export default function Home() {
  return (
    <>
      <PageMeta
        title="Software Engineering & IT Consulting Partner"
        description="PRANAYANSH Technologies: global software engineering and IT consulting for custom software, cloud, AI, and digital transformation. Innovate. Build. Scale."
      />

      {/* 1. Full-Width Hero Section */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#F4F4F4]/70 via-white to-white dark:from-[#0B0B14] dark:via-[#121225] dark:to-[#0B0B14]">
        <HeroBento />
      </section>

      {/* 2. Full-Width How We Help: Core Services & Engagement Models */}
      <CoreServicesEngagementSection />

      {/* 3. Why Choose Us */}
      <section className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 py-16 sm:py-24">
        <div className="max-w-3xl">
          <span className="kicker-mono text-xs font-bold text-[#5B47F5] dark:text-[#9FA3FF]">
            Why Choose Us
          </span>
          <h2 className="mt-2 font-heading text-3xl sm:text-4xl font-bold tracking-tight text-[#161616] dark:text-[#F4F4F6]">
            A Technology Partner Built for the Long Term
          </h2>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {USPS.map((usp) => (
            <div key={usp.title} className="clean-card rounded-xl border border-[#E0E0E0] bg-white p-6 shadow-xs dark:border-[#2D2D2D] dark:bg-[#121212]">
              <span className="text-2xl">{usp.icon}</span>
              <h3 className="mt-3 font-heading text-sm font-bold text-[#161616] dark:text-[#F4F4F6]">{usp.title}</h3>
              <p className="mt-2 text-xs text-[#525252] dark:text-[#A8A8A8] leading-relaxed font-sans">{usp.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Full-Width Capabilities Grid */}
      <section className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 py-16 sm:py-24 border-t border-[#E0E0E0] dark:border-[#2D2D2D]">
        <div className="max-w-3xl">
          <span className="kicker-mono text-xs font-bold text-[#5B47F5] dark:text-[#9FA3FF]">
            Our Services
          </span>
          <h2 className="mt-2 font-heading text-3xl sm:text-4xl font-bold tracking-tight text-[#161616] dark:text-[#F4F4F6]">
            12 Core Services. One Technology Partner.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#525252] dark:text-[#A8A8A8]">
            From custom software to cloud, AI, design, data, and growth marketing — every service is first-class.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.slice(0, 8).map((service) => (
            <div
              key={service.id}
              className="clean-card flex flex-col justify-between rounded-xl border border-[#E0E0E0] bg-white p-6 shadow-xs dark:border-[#2D2D2D] dark:bg-[#121212]"
            >
              <div>
                <h3 className="font-heading text-base font-bold text-[#161616] dark:text-[#F4F4F6]">
                  {service.name}
                </h3>
                <p className="mt-2 text-xs text-[#525252] dark:text-[#A8A8A8] leading-relaxed font-sans">
                  {service.tagline}
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-[#E0E0E0] dark:border-[#2D2D2D]">
                <Link
                  to="/services"
                  className="text-xs font-semibold text-[#5B47F5] hover:text-[#3827AB] dark:text-[#7B74FF] transition"
                >
                  Explore Service →
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/services" className="inline-flex items-center justify-center rounded-lg border border-[#5B47F5] px-6 py-2.5 text-sm font-semibold text-[#5B47F5] hover:bg-[#EEF0FF] dark:text-[#9FA3FF] dark:hover:bg-[#1E1B4B] transition">
            View All 12 Services
          </Link>
        </div>
      </section>

      {/* 4. Full-Width Interactive Scope Planner */}
      <section className="w-full border-t border-[#E0E0E0] bg-[#F4F4F4]/50 py-16 sm:py-24 dark:border-[#2D2D2D] dark:bg-[#121212]/40">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
          <CostEstimatorWizard />
        </div>
      </section>

      {/* 5. Full-Width Featured Portfolio */}
      <section className="w-full border-t border-[#E0E0E0] bg-[#F4F4F4]/50 py-16 sm:py-24 dark:border-[#2D2D2D] dark:bg-[#121212]/40">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <span className="kicker-mono text-xs font-bold text-[#5B47F5] dark:text-[#9FA3FF]">
                Proven Delivery
              </span>
              <h2 className="mt-1 font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#161616] dark:text-[#F4F4F6]">
                Featured Portfolio
              </h2>
            </div>
            <Link
              to="/portfolio"
              className="text-xs font-semibold text-[#5B47F5] hover:text-[#3827AB] dark:text-[#7B74FF] transition"
            >
              View Full Portfolio →
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {caseStudies.slice(0, 2).map((cs) => (
              <CaseStudyDetailCard key={cs.id} caseStudy={cs} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. SaaS Product Showcase */}
      <section className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 py-16 sm:py-24">
        <div className="rounded-2xl border border-[#E0E0E0] bg-white p-8 sm:p-12 shadow-xs dark:border-[#2D2D2D] dark:bg-[#121212]">
          <div className="max-w-3xl">
            <span className="kicker-mono text-xs font-bold text-[#5B47F5] dark:text-[#9FA3FF]">
              PRANAYANSH Labs
            </span>
            <h2 className="mt-2 font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#161616] dark:text-[#F4F4F6]">
              What We're Building Next
            </h2>
            <p className="mt-3 text-sm text-[#525252] dark:text-[#A8A8A8]">
              Alongside client engagements, we're incubating our own SaaS products — here's an early look.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {products.map((product) => (
              <div key={product.id} className="rounded-xl bg-[#F4F4F4] p-6 dark:bg-[#1F1F1F] border border-[#E0E0E0] dark:border-[#2D2D2D]">
                <span className="kicker-mono text-[10px] font-bold text-[#5B47F5] dark:text-[#9FA3FF] uppercase">
                  {product.status === "coming-soon" ? "Coming Soon" : "In Development"} • {product.category}
                </span>
                <h3 className="mt-2 font-heading font-bold text-base text-[#161616] dark:text-[#F4F4F6]">{product.name}</h3>
                <p className="mt-1 text-xs font-semibold text-[#5B47F5] dark:text-[#7B74FF]">{product.tagline}</p>
                <p className="mt-2 text-xs text-[#525252] dark:text-[#A8A8A8] leading-relaxed font-sans">{product.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Full-Width Bottom CTA Banner */}
      <section className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 pb-20">
        <CtaBanner
          heading="Ready to innovate, build, and scale?"
          body="Tell us about your roadmap. We'll respond with a tailored proposal or consultation within 48 hours."
          ctaLabel="Get a Free Consultation"
          to="/get-a-quote"
        />
      </section>
    </>
  );
}

