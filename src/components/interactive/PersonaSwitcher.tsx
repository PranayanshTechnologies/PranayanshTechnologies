import { useState } from "react";
import { Link } from "react-router-dom";

export function PersonaSwitcher() {
  const [activeTab, setActiveTab] = useState<"software" | "staffing">("software");

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16 text-center">
      {/* Clean Mode Switcher */}
      <div className="inline-flex rounded-full bg-slate-100 p-1 border border-slate-200/80 dark:bg-slate-900 dark:border-slate-800 shadow-2xs">
        <button
          type="button"
          onClick={() => setActiveTab("software")}
          className={`rounded-full px-5 py-2 text-xs sm:text-sm font-semibold transition-all ${
            activeTab === "software"
              ? "bg-white text-brand-700 shadow-sm dark:bg-slate-800 dark:text-brand-300"
              : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          }`}
        >
          🚀 Software Development
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("staffing")}
          className={`rounded-full px-5 py-2 text-xs sm:text-sm font-semibold transition-all ${
            activeTab === "staffing"
              ? "bg-white text-brand-700 shadow-sm dark:bg-slate-800 dark:text-brand-300"
              : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          }`}
        >
          👥 Dedicated Consulting &amp; Squads (Remote / On-Premise)
        </button>
      </div>

      {/* Dynamic Content based on Tab */}
      {activeTab === "software" ? (
        <div className="mt-8">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3.5 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 border border-brand-200/60 dark:border-brand-800/60">
            Full-Cycle Product &amp; Cloud Engineering
          </span>

          <h1 className="mx-auto mt-4 max-w-4xl text-4xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            We Architect &amp; Build Modern Software Products.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            From architecture discovery to production cloud deployment. We engineer high-performance web platforms, mobile apps, microservices, and applied AI systems with guaranteed SLAs.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              to="/get-a-quote"
              state={{ serviceId: "software-development" }}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-brand-500/20 hover:bg-brand-700 transition"
            >
              Start a Project
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>

            <Link
              to="/case-studies"
              className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 transition"
            >
              View Case Studies &amp; Architecture
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-8">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60">
            Flexible Deployment: Remote • On-Premise • Hybrid
          </span>

          <h1 className="mx-auto mt-4 max-w-4xl text-4xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            Scale Your Team with Dedicated Senior Engineers in 48h.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Embed pre-vetted senior software engineers or complete agile squads into your roadmap. Deployed remotely with full timezone alignment or on-premise at your corporate offices.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              to="/get-a-quote"
              state={{ serviceId: "dedicated-crew" }}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-brand-500/20 hover:bg-brand-700 transition"
            >
              Hire Engineering Squad
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>

            <Link
              to="/services"
              className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 transition"
            >
              Explore Engagement Models
            </Link>
          </div>
        </div>
      )}

      {/* Clean Trust Strip */}
      <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-medium text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="text-brand-600 font-bold">✓</span> 48-Hour Talent Match SLA
        </span>
        <span className="flex items-center gap-1.5">
          <span className="text-brand-600 font-bold">✓</span> 14-Day Risk-Free Trial Guarantee
        </span>
        <span className="flex items-center gap-1.5">
          <span className="text-brand-600 font-bold">✓</span> 100% IP &amp; Code Ownership
        </span>
        <span className="flex items-center gap-1.5">
          <span className="text-brand-600 font-bold">✓</span> Remote or On-Premise Deployment
        </span>
      </div>
    </div>
  );
}
