import { Link } from "react-router-dom";
import { PageMeta } from "../components/layout/PageMeta";
import { HeroBento } from "../components/interactive/HeroBento";
import { CostEstimatorWizard } from "../components/interactive/CostEstimatorWizard";
import { CaseStudyDetailCard } from "../components/cards/CaseStudyDetailCard";
import { CtaBanner } from "../components/cta/CtaBanner";
import { caseStudies } from "../data/caseStudies";

export default function Home() {
  return (
    <>
      <PageMeta
        title="Enterprise Software Engineering &amp; Dedicated Technology Consulting"
        description="Pranayansh Technologies builds mission-critical software and deploys dedicated engineering consultants remotely or on-premise."
      />

      {/* 1. Full-Width Hero Section */}
      <section className="relative w-full overflow-hidden border-b border-[#E0E0E0] bg-gradient-to-b from-[#F4F4F4]/70 via-white to-white dark:border-[#2D2D2D] dark:from-[#121212] dark:via-[#161616] dark:to-[#121212]">
        <HeroBento />
      </section>

      {/* 2. Full-Width Authority & Trust Bar */}
      <section className="w-full border-b border-[#E0E0E0] bg-[#F4F4F4]/80 py-8 dark:border-[#2D2D2D] dark:bg-[#161616]/70">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 text-center">
            <div>
              <p className="font-heading text-3xl sm:text-4xl font-bold text-[#FF462D] dark:text-[#FF7561]">48h</p>
              <p className="kicker-mono text-xs font-semibold text-[#525252] dark:text-[#A8A8A8] mt-1">
                Talent Matching SLA
              </p>
            </div>
            <div>
              <p className="font-heading text-3xl sm:text-4xl font-bold text-[#FF462D] dark:text-[#FF7561]">Top 3%</p>
              <p className="kicker-mono text-xs font-semibold text-[#525252] dark:text-[#A8A8A8] mt-1">
                Vetting Pass Rate
              </p>
            </div>
            <div>
              <p className="font-heading text-3xl sm:text-4xl font-bold text-[#FF462D] dark:text-[#FF7561]">14-45 Days</p>
              <p className="kicker-mono text-xs font-semibold text-[#525252] dark:text-[#A8A8A8] mt-1">
                Zero-Risk Trial (45d Freshers)
              </p>
            </div>
            <div>
              <p className="font-heading text-3xl sm:text-4xl font-bold text-[#FF462D] dark:text-[#FF7561]">100%</p>
              <p className="kicker-mono text-xs font-semibold text-[#525252] dark:text-[#A8A8A8] mt-1">
                Direct IP Ownership
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Full-Width Capabilities Grid */}
      <section className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 py-16 sm:py-24">
        <div className="max-w-3xl">
          <span className="kicker-mono text-xs font-bold text-[#FF462D] dark:text-[#FFA699]">
            Enterprise Capabilities
          </span>
          <h2 className="mt-2 font-heading text-3xl sm:text-4xl font-bold tracking-tight text-[#161616] dark:text-[#F4F4F4]">
            Software Development &amp; Technical Squads
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#525252] dark:text-[#A8A8A8]">
            From turnkey product modernization to on-demand senior squads deployed remotely or on-premise at your facilities.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: "💻",
              title: "Custom Web & SaaS Platforms",
              desc: "React, Next.js, .NET Core, Node.js microservices with 99.9% uptime architectures.",
              link: "/services",
            },
            {
              icon: "☁️",
              title: "Cloud & DevOps Modernization",
              desc: "AWS & Azure infrastructure, Kubernetes orchestration, and automated GitOps CI/CD.",
              link: "/services",
            },
            {
              icon: "📱",
              title: "Mobile App Engineering",
              desc: "Cross-platform Flutter & native iOS/Android mobile apps built for fluid 60fps performance.",
              link: "/services",
            },
            {
              icon: "👥",
              title: "Dedicated Pods & Consulting Squads",
              desc: "Senior pre-vetted consultants deployed in 48h. Available 100% Remotely or On-Premise at your HQ.",
              link: "/services",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="clean-card flex flex-col justify-between rounded-xl border border-[#E0E0E0] bg-white p-6 shadow-xs dark:border-[#2D2D2D] dark:bg-[#161616]"
            >
              <div>
                <span className="text-2xl">{item.icon}</span>
                <h3 className="mt-3 font-heading text-base font-bold text-[#161616] dark:text-[#F4F4F4]">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs text-[#525252] dark:text-[#A8A8A8] leading-relaxed font-sans">
                  {item.desc}
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-[#E0E0E0] dark:border-[#2D2D2D]">
                <Link
                  to={item.link}
                  className="text-xs font-semibold text-[#FF462D] hover:text-[#BA2212] dark:text-[#FF7561] transition"
                >
                  Explore Capability →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Full-Width Interactive Scope & Team Planner */}
      <section className="w-full border-t border-[#E0E0E0] bg-[#F4F4F4]/50 py-16 sm:py-24 dark:border-[#2D2D2D] dark:bg-[#161616]/40">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
          <CostEstimatorWizard />
        </div>
      </section>

      {/* 5. Full-Width Deployment Flexibility Showcase */}
      <section className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 py-16 sm:py-24">
        <div className="rounded-2xl border border-[#E0E0E0] bg-white p-8 sm:p-12 shadow-xs dark:border-[#2D2D2D] dark:bg-[#161616]">
          <div className="max-w-3xl">
            <span className="kicker-mono text-xs font-bold text-[#FF462D] dark:text-[#FFA699]">
              Deployment Flexibility
            </span>
            <h2 className="mt-2 font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#161616] dark:text-[#F4F4F4]">
              Engineered for Your Working Model
            </h2>
            <p className="mt-3 text-sm text-[#525252] dark:text-[#A8A8A8]">
              We provide complete deployment agility to suit your security, compliance, and governance preferences.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="rounded-xl bg-[#F4F4F4] p-6 dark:bg-[#1F1F1F] border border-[#E0E0E0] dark:border-[#2D2D2D]">
              <span className="text-2xl">🌐</span>
              <h3 className="mt-3 font-heading font-bold text-sm text-[#161616] dark:text-[#F4F4F4]">100% Remote Squads</h3>
              <p className="mt-1.5 text-xs text-[#525252] dark:text-[#A8A8A8] leading-relaxed font-sans">
                Full overlap with US (EST, CST, PST) and European business hours. Seamless Slack, Jira, and GitHub sync.
              </p>
            </div>

            <div className="rounded-xl bg-[#F4F4F4] p-6 dark:bg-[#1F1F1F] border border-[#E0E0E0] dark:border-[#2D2D2D]">
              <span className="text-2xl">🏢</span>
              <h3 className="mt-3 font-heading font-bold text-sm text-[#161616] dark:text-[#F4F4F4]">On-Premise Deployment</h3>
              <p className="mt-1.5 text-xs text-[#525252] dark:text-[#A8A8A8] leading-relaxed font-sans">
                Vetted senior engineers stationed directly at your corporate headquarters or facility for high-security environments.
              </p>
            </div>

            <div className="rounded-xl bg-[#F4F4F4] p-6 dark:bg-[#1F1F1F] border border-[#E0E0E0] dark:border-[#2D2D2D]">
              <span className="text-2xl">⚡</span>
              <h3 className="mt-3 font-heading font-bold text-sm text-[#161616] dark:text-[#F4F4F4]">Hybrid Squads</h3>
              <p className="mt-1.5 text-xs text-[#525252] dark:text-[#A8A8A8] leading-relaxed font-sans">
                Co-located technical architects with distributed engineering squads for optimal cost-efficiency and delivery speed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Full-Width Featured Case Studies */}
      <section className="w-full border-t border-[#E0E0E0] bg-[#F4F4F4]/50 py-16 sm:py-24 dark:border-[#2D2D2D] dark:bg-[#161616]/40">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <span className="kicker-mono text-xs font-bold text-[#FF462D] dark:text-[#FFA699]">
                Proven Delivery
              </span>
              <h2 className="mt-1 font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#161616] dark:text-[#F4F4F4]">
                Enterprise Outcomes &amp; Architecture
              </h2>
            </div>
            <Link
              to="/case-studies"
              className="text-xs font-semibold text-[#FF462D] hover:text-[#BA2212] dark:text-[#FF7561] transition"
            >
              View All Case Studies →
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {caseStudies.slice(0, 2).map((cs) => (
              <CaseStudyDetailCard key={cs.id} caseStudy={cs} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. Full-Width Bottom CTA Banner */}
      <section className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 pb-20">
        <CtaBanner
          heading="Ready to build or scale your engineering capacity?"
          body="Tell us about your roadmap. We'll deliver a tailored architectural scope or match senior engineers within 48 hours."
          ctaLabel="Start a Project / Get a Quote"
          to="/get-a-quote"
        />
      </section>
    </>
  );
}
