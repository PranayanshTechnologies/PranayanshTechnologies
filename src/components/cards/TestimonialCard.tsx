import type { CaseStudy } from "../../types/content";

interface TestimonialCardProps {
  caseStudy: CaseStudy;
}

export function TestimonialCard({ caseStudy }: TestimonialCardProps) {
  return (
    <div className="glow-card flex h-full flex-col justify-between rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div>
        <div className="flex items-center justify-between">
          <div className="flex text-amber-500 text-xs">★★★★★</div>
          <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
            {caseStudy.clientType || "Enterprise Client"}
          </span>
        </div>

        <h3 className="mt-3 text-base font-bold text-gray-900 dark:text-gray-100">
          {caseStudy.title}
        </h3>

        <p className="mt-2 text-xs leading-relaxed text-gray-600 dark:text-gray-400">
          "{caseStudy.summary}"
        </p>

        {caseStudy.results && caseStudy.results.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl bg-gray-50 p-2.5 dark:bg-gray-800/50">
            {caseStudy.results.slice(0, 2).map((res, i) => (
              <div key={i} className="text-center">
                <p className="text-sm font-black text-brand-600 dark:text-brand-400">
                  {res.metric}
                </p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-tight">
                  {res.label}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>{caseStudy.engagementType || "Dedicated Pod"}</span>
        <span className="font-semibold text-emerald-600 dark:text-emerald-400">Verified Project</span>
      </div>
    </div>
  );
}

