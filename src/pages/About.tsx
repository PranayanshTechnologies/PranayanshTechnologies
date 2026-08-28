import { useState } from "react";
import { PageMeta } from "../components/layout/PageMeta";
import { CtaBanner } from "../components/cta/CtaBanner";
import { teamMembers, type TeamMember } from "../data/team";

export default function About() {
  const [selectedDept, setSelectedDept] = useState<string>("all");

  const filteredTeam = teamMembers.filter((m) => {
    if (selectedDept === "all") return true;
    return m.department === selectedDept;
  });

  return (
    <>
      <PageMeta
        title="About Pranayansh Technologies | Enterprise Software &amp; Leadership"
        description="Learn how Pranayansh Technologies architects mission-critical digital products and deploys high-velocity dedicated engineering squads."
      />

      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 py-16 sm:py-24">
        {/* 1. Header with Kicker */}
        <div className="max-w-4xl">
          <span className="kicker-mono text-xs font-bold text-[#FF462D] dark:text-[#FFA699]">
            About Pranayansh Technologies
          </span>
          <h1 className="mt-2 font-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#161616] dark:text-[#F4F4F4]">
            Engineering Authority. Scaled for Global Velocity.
          </h1>
          <p className="mt-5 text-base sm:text-lg text-[#525252] dark:text-[#C6C6C6] leading-relaxed font-sans">
            Pranayansh Technologies was founded on a simple conviction: modern enterprise software requires senior technical craftsmanship, predictable timelines, and friction-free technical consulting. We combine turnkey digital product development with flexible engineering team deployment—remotely or on-premise at client facilities.
          </p>
        </div>

        {/* 2. Key Metrics Bar */}
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 rounded-xl border border-[#E0E0E0] bg-[#F4F4F4]/80 p-6 sm:p-8 dark:border-[#2D2D2D] dark:bg-[#161616]/70 text-center">
          <div>
            <p className="font-heading text-3xl sm:text-4xl font-bold text-[#FF462D] dark:text-[#FF7561]">48h</p>
            <p className="kicker-mono text-xs font-semibold text-[#525252] dark:text-[#A8A8A8] mt-1">Talent Matching SLA</p>
          </div>
          <div>
            <p className="font-heading text-3xl sm:text-4xl font-bold text-[#FF462D] dark:text-[#FF7561]">Top 3%</p>
            <p className="kicker-mono text-xs font-semibold text-[#525252] dark:text-[#A8A8A8] mt-1">Vetting Acceptance</p>
          </div>
          <div>
            <p className="font-heading text-3xl sm:text-4xl font-bold text-[#FF462D] dark:text-[#FF7561]">14-45 Days</p>
            <p className="kicker-mono text-xs font-semibold text-[#525252] dark:text-[#A8A8A8] mt-1">Zero-Risk Trial Period</p>
          </div>
          <div>
            <p className="font-heading text-3xl sm:text-4xl font-bold text-[#FF462D] dark:text-[#FF7561]">100%</p>
            <p className="kicker-mono text-xs font-semibold text-[#525252] dark:text-[#A8A8A8] mt-1">Direct IP Ownership</p>
          </div>
        </div>

        {/* 3. The 4 Pillars of Pranayansh Engineering */}
        <div className="mt-20">
          <div className="max-w-3xl">
            <span className="kicker-mono text-xs font-bold text-[#FF462D] dark:text-[#FFA699]">
              Core Foundation
            </span>
            <h2 className="mt-1 font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#161616] dark:text-[#F4F4F4]">
              The Four Pillars of Our Engineering Delivery
            </h2>
            <p className="mt-2 text-sm text-[#525252] dark:text-[#A8A8A8] font-sans">
              How we guarantee speed, code quality, and intellectual security across every engagement.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="clean-card rounded-xl border border-[#E0E0E0] bg-white p-7 shadow-xs dark:border-[#2D2D2D] dark:bg-[#161616]">
              <span className="text-2xl">🏛️</span>
              <h3 className="mt-4 font-heading text-base font-bold text-[#161616] dark:text-[#F4F4F4]">
                1. Architectural Rigor
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#525252] dark:text-[#A8A8A8] font-sans">
                Clean architecture, domain-driven design, and comprehensive automated test suites. We engineer code built to endure.
              </p>
            </div>

            <div className="clean-card rounded-xl border border-[#E0E0E0] bg-white p-7 shadow-xs dark:border-[#2D2D2D] dark:bg-[#161616]">
              <span className="text-2xl">🛡️</span>
              <h3 className="mt-4 font-heading text-base font-bold text-[#161616] dark:text-[#F4F4F4]">
                2. Security &amp; Compliance
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#525252] dark:text-[#A8A8A8] font-sans">
                SOC-2 readiness, HIPAA/PCI-DSS standards, strict NDAs, and 100% intellectual property assignment from day one.
              </p>
            </div>

            <div className="clean-card rounded-xl border border-[#E0E0E0] bg-white p-7 shadow-xs dark:border-[#2D2D2D] dark:bg-[#161616]">
              <span className="text-2xl">⚡</span>
              <h3 className="mt-4 font-heading text-base font-bold text-[#161616] dark:text-[#F4F4F4]">
                3. Speed &amp; 48h Mobilization
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#525252] dark:text-[#A8A8A8] font-sans">
                Match with senior engineers in 48 hours with guaranteed 4 to 8 hours daily overlap with US &amp; EU business hours.
              </p>
            </div>

            <div className="clean-card rounded-xl border border-[#E0E0E0] bg-white p-7 shadow-xs dark:border-[#2D2D2D] dark:bg-[#161616]">
              <span className="text-2xl">🎁</span>
              <h3 className="mt-4 font-heading text-base font-bold text-[#161616] dark:text-[#F4F4F4]">
                4. Zero-Risk Trial Guarantee
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#525252] dark:text-[#A8A8A8] font-sans">
                14 days for senior developers and a full 45-day zero-cost evaluation program for emerging engineers and fresh graduates.
              </p>
            </div>
          </div>
        </div>

        {/* 4. Executive Leadership & Team Members Section */}
        <div className="mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <span className="kicker-mono text-xs font-bold text-[#FF462D] dark:text-[#FFA699]">
                Leadership &amp; Technical Architects
              </span>
              <h2 className="mt-1 font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#161616] dark:text-[#F4F4F4]">
                Our Leadership Team
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[#525252] dark:text-[#A8A8A8] font-sans max-w-2xl">
                Led by veteran systems architects, engineering directors, and cloud strategists dedicated to delivering technical excellence.
              </p>
            </div>

            {/* Department Filter Pills */}
            <div className="inline-flex rounded-lg bg-[#F4F4F4] p-1 dark:bg-[#1F1F1F] self-start sm:self-auto border border-[#E0E0E0] dark:border-[#2D2D2D]">
              {[
                { id: "all", label: "All Team" },
                { id: "Executive Leadership", label: "Leadership" },
                { id: "Technical Architecture", label: "Architecture" },
                { id: "Talent & Delivery", label: "Talent & Delivery" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedDept(tab.id)}
                  className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                    selectedDept === tab.id
                      ? "bg-[#FF462D] text-white shadow-xs"
                      : "text-[#525252] hover:text-[#161616] dark:text-[#C6C6C6] dark:hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Team Cards Grid */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeam.map((member: TeamMember) => (
              <div
                key={member.id}
                className="clean-card flex flex-col justify-between rounded-xl border border-[#E0E0E0] bg-white p-7 shadow-xs dark:border-[#2D2D2D] dark:bg-[#161616]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] text-[#525252] dark:text-[#A8A8A8] bg-[#F4F4F4] dark:bg-[#1F1F1F] px-2.5 py-1 rounded-md">
                      📍 {member.location}
                    </span>
                    <span className="kicker-mono text-[10px] font-bold text-[#FF462D] dark:text-[#FFA699]">
                      {member.department}
                    </span>
                  </div>

                  {/* Circled Avatar Image with Kyndryl Coral Accent Ring */}
                  <div className="mt-5 flex items-center gap-3.5">
                    <img
                      src={member.avatarUrl}
                      alt={member.name}
                      loading="lazy"
                      className="h-16 w-16 rounded-full object-cover ring-2 ring-[#FF462D] ring-offset-2 ring-offset-white dark:ring-offset-[#161616] shadow-xs shrink-0"
                    />
                    <div>
                      <h3 className="font-heading text-lg font-bold text-[#161616] dark:text-[#F4F4F4]">
                        {member.name}
                      </h3>
                      <p className="kicker-mono text-[11px] font-semibold text-[#FF462D] dark:text-[#FF7561] mt-0.5">
                        {member.role}
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-xs leading-relaxed text-[#525252] dark:text-[#C6C6C6] font-sans">
                    {member.bio}
                  </p>

                  <div className="mt-5 space-y-1.5">
                    <p className="kicker-mono text-[10px] font-bold text-[#8D8D8D]">Core Expertise</p>
                    <div className="flex flex-wrap gap-1.5">
                      {member.expertise.map((exp) => (
                        <span
                          key={exp}
                          className="font-mono text-[10px] text-[#525252] dark:text-[#C6C6C6] border border-[#E0E0E0] dark:border-[#393939] px-2 py-0.5 rounded"
                        >
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E0E0E0] dark:border-[#2D2D2D] flex items-center gap-3">
                  {member.linkedInUrl && (
                    <a
                      href={member.linkedInUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-[11px] font-semibold text-[#FF462D] hover:text-[#BA2212] dark:text-[#FF7561] transition flex items-center gap-1"
                    >
                      <span>LinkedIn Profile</span> →
                    </a>
                  )}
                  {member.githubUrl && (
                    <a
                      href={member.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-[11px] font-semibold text-[#525252] hover:text-[#161616] dark:text-[#A8A8A8] dark:hover:text-white transition flex items-center gap-1"
                    >
                      <span>GitHub</span> →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Deployment Flexibility & Global Presence */}
        <div className="mt-24 rounded-2xl border border-[#E0E0E0] bg-white p-8 sm:p-12 shadow-xs dark:border-[#2D2D2D] dark:bg-[#161616]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="kicker-mono text-xs font-bold text-[#FF462D] dark:text-[#FFA699]">
                Global Delivery Network
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#161616] dark:text-[#F4F4F4]">
                Flexible Deployment Tailored to Your Infrastructure
              </h2>
              <p className="text-sm text-[#525252] dark:text-[#C6C6C6] leading-relaxed font-sans">
                We support fully distributed remote teams with seamless collaboration in Slack, Jira, and GitHub, as well as on-premise deployments at your corporate headquarters for specialized regulatory or security constraints.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-[#161616] dark:text-[#E0E0E0]">
                <span className="flex items-center gap-1.5">
                  <span className="text-[#FF462D] font-bold">✓</span> North America (EST/CST/PST)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-[#FF462D] font-bold">✓</span> EMEA (GMT/CET)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-[#FF462D] font-bold">✓</span> India Hubs (New Delhi, Mohali, Bangalore, Hyderabad, Pune)
                </span>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-[#E0E0E0] bg-[#F4F4F4] p-5 dark:border-[#2D2D2D] dark:bg-[#1F1F1F]">
                <h4 className="font-heading text-sm font-bold text-[#161616] dark:text-[#F4F4F4]">100% Remote Squads</h4>
                <p className="mt-1 text-xs text-[#525252] dark:text-[#A8A8A8] font-sans">Instant scaling with no hardware or office overhead.</p>
              </div>
              <div className="rounded-xl border border-[#E0E0E0] bg-[#F4F4F4] p-5 dark:border-[#2D2D2D] dark:bg-[#1F1F1F]">
                <h4 className="font-heading text-sm font-bold text-[#161616] dark:text-[#F4F4F4]">On-Premise Deployment</h4>
                <p className="mt-1 text-xs text-[#525252] dark:text-[#A8A8A8] font-sans">Engineers stationed at your facility for classified &amp; on-site systems.</p>
              </div>
              <div className="rounded-xl border border-[#E0E0E0] bg-[#F4F4F4] p-5 dark:border-[#2D2D2D] dark:bg-[#1F1F1F]">
                <h4 className="font-heading text-sm font-bold text-[#161616] dark:text-[#F4F4F4]">Hybrid Squad Models</h4>
                <p className="mt-1 text-xs text-[#525252] dark:text-[#A8A8A8] font-sans">On-site technical leads with distributed delivery engineers.</p>
              </div>
              <div className="rounded-xl border border-[#E0E0E0] bg-[#F4F4F4] p-5 dark:border-[#2D2D2D] dark:bg-[#1F1F1F]">
                <h4 className="font-heading text-sm font-bold text-[#161616] dark:text-[#F4F4F4]">48-Hour Matching SLA</h4>
                <p className="mt-1 text-xs text-[#525252] dark:text-[#A8A8A8] font-sans">Start code reviews and sprint work in under two days.</p>
              </div>
            </div>
          </div>
        </div>

        {/* 6. Bottom CTA */}
        <CtaBanner
          heading="Ready to partner with an engineering firm that delivers?"
          body="Tell us about your roadmap. We'll provide transparent technical scoping or match senior engineers in 48 hours."
          ctaLabel="Start a Project / Get a Quote"
          to="/get-a-quote"
        />
      </div>
    </>
  );
}
