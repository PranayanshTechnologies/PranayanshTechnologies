import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { technologies } from "../../data/technologies";

const CATEGORIES = [
  { id: "all", label: "All Technologies" },
  { id: "framework", label: "Frontend & Full-Stack" },
  { id: "language", label: "Backend & Languages" },
  { id: "cloud", label: "Cloud & Infrastructure" },
  { id: "practice", label: "DevOps & SRE" },
  { id: "mobile", label: "Mobile Apps" },
  { id: "ai-data", label: "Generative AI & Data" },
];

export function TechBenchExplorer() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredTechnologies = useMemo(() => {
    return technologies.filter((tech) => {
      const matchesCategory =
        selectedCategory === "all" || tech.category === selectedCategory;
      const matchesSearch =
        tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tech.tagline?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tech.popularPairings?.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  function handleHireTech(techName: string) {
    navigate("/get-a-quote", {
      state: {
        serviceId: "on-demand-resources",
        technologyNeed: techName,
        projectDescription: `Requesting senior engineers specialized in ${techName} with 48h deployment.`,
      },
    });
  }

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 lg:p-10 shadow-xl dark:border-gray-800 dark:bg-gray-900">
      {/* Header with Search and Category Tabs */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-100 pb-6 dark:border-gray-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Talent Bench &amp; Tech Matrix
          </span>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl">
            Explore Verified Technology Capabilities
          </h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Pre-screened senior engineers ready for deployment in 24 to 48 hours.
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Search skill (e.g. React, .NET, AWS)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-2.5 pl-10 text-xs shadow-sm focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          />
          <svg
            className="absolute left-3.5 top-3 h-4 w-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Category Pills */}
      <div className="mt-6 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition ${
                isActive
                  ? "bg-brand-600 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Grid of Technologies */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTechnologies.map((tech) => (
          <div
            key={tech.id}
            className="glow-card flex flex-col justify-between rounded-2xl border border-gray-200 bg-gray-50/50 p-5 dark:border-gray-800 dark:bg-gray-800/40"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-brand-50 px-2 py-0.5 text-[11px] font-bold text-brand-700 dark:bg-brand-900/50 dark:text-brand-300">
                  {tech.avgExperience || "5+ Yrs Avg"}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {tech.benchCount || 8} on bench
                </span>
              </div>

              <h3 className="mt-3 text-base font-bold text-gray-900 dark:text-gray-100">
                {tech.name}
              </h3>

              <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                {tech.tagline}
              </p>

              {/* Popular pairings */}
              {tech.popularPairings && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {tech.popularPairings.map((p) => (
                    <span
                      key={p}
                      className="rounded bg-white px-1.5 py-0.5 text-[10px] font-medium text-gray-600 border border-gray-200 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Action CTA */}
            <div className="mt-4 pt-3 border-t border-gray-200/60 dark:border-gray-700/60">
              <button
                type="button"
                onClick={() => handleHireTech(tech.name)}
                className="inline-flex w-full items-center justify-center gap-1 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-brand-600 shadow-sm border border-brand-200 hover:bg-brand-50 dark:bg-gray-800 dark:border-brand-800 dark:text-brand-300 dark:hover:bg-gray-700"
              >
                Hire {tech.name.split(" ")[0]} Developers
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

