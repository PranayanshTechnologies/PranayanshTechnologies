import { useNavigate } from "react-router-dom";
import type { DeveloperProfile } from "../../types/content";

interface DeveloperProfileCardProps {
  profile: DeveloperProfile;
}

export function DeveloperProfileCard({ profile }: DeveloperProfileCardProps) {
  const navigate = useNavigate();

  function handleRequestTalent() {
    navigate("/get-a-quote", {
      state: {
        serviceId: "on-demand-resources",
        technologyNeed: profile.primarySkills.slice(0, 3).join(", "),
        seniorityLevel: profile.seniority,
        projectDescription: `Inquiring about profile ${profile.id} (${profile.roleTitle}) or engineers with similar stack.`,
      },
    });
  }

  const isAvailableNow = profile.availability === "Available Immediately";

  return (
    <div className="glow-card flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div>
        {/* Header: Seniority, Avatar Initials, Availability */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-base font-bold text-white shadow-sm">
              {profile.roleTitle.charAt(0)}
              {profile.primarySkills[0]?.charAt(0) || "D"}
            </div>
            <div>
              <span className="inline-block rounded-md bg-brand-50 px-2 py-0.5 text-xs font-semibold text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
                {profile.seniority}
              </span>
              <h3 className="mt-0.5 text-base font-bold text-gray-900 dark:text-gray-100">
                {profile.roleTitle}
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
            <span
              className={`h-2 w-2 rounded-full ${
                isAvailableNow ? "animate-pulse bg-emerald-500" : "bg-amber-500"
              }`}
            />
            {profile.availability}
          </div>
        </div>

        {/* Key Metrics: Experience, Rating, Engagements */}
        <div className="mt-4 grid grid-cols-3 divide-x divide-gray-100 rounded-xl bg-gray-50 p-2.5 text-center dark:divide-gray-800 dark:bg-gray-800/50">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Experience</p>
            <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
              {profile.experienceYears}+ Yrs
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Rating</p>
            <p className="text-sm font-bold text-amber-600 dark:text-amber-400">
              ★ {profile.rating.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Projects</p>
            <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
              {profile.completedEngagements}+
            </p>
          </div>
        </div>

        {/* Bio summary */}
        <p className="mt-4 text-xs leading-relaxed text-gray-600 dark:text-gray-300">
          {profile.summary}
        </p>

        {/* Primary Skills */}
        <div className="mt-4">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Core Stack</p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {profile.primarySkills.map((skill) => (
              <span
                key={skill}
                className="rounded-md border border-brand-200 bg-brand-50/60 px-2 py-0.5 text-xs font-medium text-brand-800 dark:border-brand-800 dark:bg-brand-950 dark:text-brand-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Sample project highlight */}
        <div className="mt-3.5 rounded-lg border border-gray-100 bg-gray-50/70 p-2.5 text-xs text-gray-600 dark:border-gray-800/60 dark:bg-gray-800/30 dark:text-gray-400">
          <span className="font-semibold text-gray-700 dark:text-gray-300">Highlight: </span>
          {profile.sampleProject}
        </div>
      </div>

      {/* Action footer */}
      <div className="mt-5 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {profile.timezone}
        </span>
        <button
          type="button"
          onClick={handleRequestTalent}
          className="inline-flex items-center gap-1 rounded-lg bg-brand-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500"
        >
          Request Similar Profile
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}

