import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Activity } from "../types/durgotsav";
import { fetchActivities } from "../services/durgotsavApi";
import { formatDateTimeRange } from "../utils/dateUtils";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { ErrorAlert } from "../components/common/ErrorAlert";

export const DurgotsavActivities: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadActivities = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchActivities();
      if (res.success) {
        setActivities(res.activities || []);
      }
    } catch (err: any) {
      setError(err?.message || "Failed to load activities");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadActivities();
  }, []);

  const filteredActivities = activities.filter((act) => {
    const q = searchTerm.toLowerCase();
    return (
      act.activity.toLowerCase().includes(q) ||
      act.venue.toLowerCase().includes(q) ||
      (act.description && act.description.toLowerCase().includes(q))
    );
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-stone-200 dark:border-stone-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Durgotsav 2026
          </span>
          <h1 className="mt-1 font-heading text-3xl sm:text-4xl font-black text-stone-900 dark:text-stone-100">
            Event Activities & Rituals
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-stone-600 dark:text-stone-400">
            Explore and participate in community puja ceremonies, cultural events, and competitions.
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-full md:w-72">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-stone-400">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search by event or venue..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-stone-300 pl-9 pr-4 py-2.5 text-xs text-stone-900 placeholder:text-stone-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
            />
          </div>
        </div>
      </div>

      {error && <ErrorAlert message={error} onRetry={loadActivities} className="mt-6" />}

      {loading ? (
        <LoadingSpinner message="Fetching all scheduled activities..." fullHeight />
      ) : filteredActivities.length === 0 ? (
        <div className="mt-12 rounded-3xl border border-dashed border-stone-300 p-12 text-center dark:border-stone-800">
          <span className="text-4xl">🪔</span>
          <h3 className="mt-3 text-base font-bold text-stone-900 dark:text-stone-100">
            {searchTerm ? "No matching activities found" : "No activities scheduled currently"}
          </h3>
          <p className="mt-1 text-xs text-stone-500">
            {searchTerm ? "Try searching with a different term." : "Please check back later for schedule updates."}
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="mt-4 text-xs font-bold text-amber-600 hover:underline"
            >
              Clear Search
            </button>
          )}
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((act) => (
            <div
              key={act._id}
              className="durgotsav-card-glow flex flex-col justify-between rounded-2xl border border-amber-200/60 bg-white p-6 dark:border-amber-900/30 dark:bg-stone-900/80 transition"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                    📍 {act.venue}
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                    Open for Registration
                  </span>
                </div>

                <h2 className="mt-3 font-heading text-lg font-bold text-stone-900 dark:text-stone-100">
                  {act.activity}
                </h2>

                <p className="mt-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
                  🕒 {formatDateTimeRange(act.startDateTime, act.endDateTime)}
                </p>

                {act.description && (
                  <p className="mt-3 text-xs text-stone-600 dark:text-stone-400 line-clamp-3 leading-relaxed">
                    {act.description}
                  </p>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                <Link
                  to={`/durgotsav/activities/${act._id}`}
                  className="rounded-xl bg-amber-500/15 hover:bg-amber-500/25 px-4 py-2 text-xs font-bold text-amber-700 dark:text-amber-300 transition"
                >
                  View Details & Register →
                </Link>

                {act.audioVideoLink && (
                  <a
                    href={act.audioVideoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200"
                  >
                    🎥 Media Link
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
