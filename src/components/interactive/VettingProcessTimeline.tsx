import { useState } from "react";

const VETTING_STAGES = [
  {
    step: 1,
    title: "1. Background & Experience Audit",
    passRate: "Top 15% Pass",
    description:
      "Comprehensive verification of candidate employment history, production code repositories (GitHub/GitLab), and architectural depth across enterprise projects.",
    details: [
      "Minimum 5+ years of verified production software experience",
      "Rigorous portfolio inspection and architecture defense",
      "Verified identity and employment background checks",
    ],
  },
  {
    step: 2,
    title: "2. Live Algorithmic & Coding Challenge",
    passRate: "Top 8% Pass",
    description:
      "Timed, live proctored coding sessions assessing data structures, algorithmic complexity, concurrency, and clean code hygiene.",
    details: [
      "Real-time problem-solving with automated edge-case test suites",
      "Time and space complexity optimization (Big-O analysis)",
      "Strict adherence to SOLID principles and clean code formatting",
    ],
  },
  {
    step: 3,
    title: "3. System Design & Architectural Defense",
    passRate: "Top 5% Pass",
    description:
      "A 90-minute deep-dive interview conducted by a Staff Architect evaluating distributed systems, fault tolerance, caching, and database schemas.",
    details: [
      "Designing scalable cloud architectures on AWS/Azure/GCP",
      "Event-driven microservices, Kafka/RabbitMQ messaging, and Redis caching",
      "Data consistency, ACID vs BASE, and security threat modeling",
    ],
  },
  {
    step: 4,
    title: "4. English Fluency & Communication Protocol",
    passRate: "Top 3% Accepted",
    description:
      "Evaluating verbal, written, and asynchronous communication to guarantee seamless collaboration in daily standups and sprint planning.",
    details: [
      "C1/C2 Professional English fluency certification",
      "Async communication protocol & Jira/Slack hygiene",
      "Cross-cultural collaboration and proactive blocker escalation",
    ],
  },
  {
    step: 5,
    title: "5. 2-Week Risk-Free Trial Period",
    passRate: "100% Guarantee",
    description:
      "Start working with your matched engineer or pod for 14 days. If you are not completely satisfied, you pay nothing.",
    details: [
      "Direct code commits into your repo from day one",
      "Full daily standup participation and timezone overlap",
      "Immediate replacement at zero cost if not a 100% cultural/technical fit",
    ],
  },
];

export function VettingProcessTimeline() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const stage = VETTING_STAGES[activeStep];

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 lg:p-10 shadow-xl dark:border-gray-800 dark:bg-gray-900">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-100 pb-6 dark:border-gray-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Enterprise Quality Standards
          </span>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl">
            Our Top 3% Developer Vetting Process
          </h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            We reject 97% of applicants so you get elite senior engineers who deliver from day one.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-2xl bg-brand-50 px-4 py-2 text-brand-900 dark:bg-brand-950/80 dark:text-brand-200">
          <span className="text-2xl font-black text-brand-600 dark:text-brand-400">3%</span>
          <div className="text-xs font-semibold">
            <span>Rigorous Acceptance Rate</span>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">Out of 10,000+ candidates</p>
          </div>
        </div>
      </div>

      {/* 5-Step Navigation Tabs */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-5 gap-2">
        {VETTING_STAGES.map((s, idx) => {
          const isActive = activeStep === idx;
          return (
            <button
              key={s.step}
              type="button"
              onClick={() => setActiveStep(idx)}
              className={`flex flex-col items-start rounded-2xl border p-3 text-left transition-all ${
                isActive
                  ? "border-brand-600 bg-brand-50/80 shadow-md ring-2 ring-brand-500/20 dark:border-brand-500 dark:bg-brand-950/70"
                  : "border-gray-200 bg-gray-50 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-800/60 dark:hover:bg-gray-800"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                    isActive
                      ? "bg-brand-600 text-white"
                      : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                  }`}
                >
                  {s.step}
                </span>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                  {s.passRate}
                </span>
              </div>
              <p className="mt-2 text-xs font-bold text-gray-900 dark:text-gray-100 line-clamp-1">
                {s.title.split(". ")[1]}
              </p>
            </button>
          );
        })}
      </div>

      {/* Stage Detail Card */}
      <div className="mt-6 rounded-2xl border border-brand-100 bg-gradient-to-br from-brand-50/40 via-white to-gray-50 p-6 dark:border-gray-800 dark:from-gray-800/80 dark:via-gray-900 dark:to-gray-950">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
            {stage.title}
          </h3>
          <span className="inline-block w-fit rounded-full bg-brand-600 px-3 py-0.5 text-xs font-bold text-white shadow-sm">
            {stage.passRate}
          </span>
        </div>

        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          {stage.description}
        </p>

        <div className="mt-4 border-t border-gray-100 pt-4 dark:border-gray-800">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Evaluation Criteria &amp; Checks:
          </h4>
          <ul className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {stage.details.map((detail, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 rounded-xl bg-white/80 p-3 text-xs text-gray-700 shadow-sm border border-gray-100 dark:bg-gray-800/60 dark:border-gray-700/60 dark:text-gray-300"
              >
                <span className="text-brand-600 dark:text-brand-400 font-bold shrink-0">✓</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Risk-free Trial Banner */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 p-5 text-white shadow-md">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/20">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-bold">14-Day Zero-Risk Trial Guarantee</h4>
            <p className="text-xs text-emerald-100">
              Evaluate your matched talent in production. If it's not a perfect fit, you pay nothing.
            </p>
          </div>
        </div>
        <a
          href="/get-a-quote"
          className="shrink-0 rounded-xl bg-white px-4 py-2 text-xs font-bold text-emerald-900 shadow-sm transition hover:bg-emerald-50"
        >
          Start Risk-Free Trial →
        </a>
      </div>
    </div>
  );
}

