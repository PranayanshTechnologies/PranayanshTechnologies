import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { Activity } from "../types/durgotsav";
import { fetchActivities } from "../services/durgotsavApi";
import { formatDateTimeRange } from "../utils/dateUtils";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { ErrorAlert } from "../components/common/ErrorAlert";
import { useDurgotsavAuth } from "../context/DurgotsavAuthContext";

export const DurgotsavLanding: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin } = useDurgotsavAuth();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
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
      setError(err?.message || "Unable to load Durgotsav activities. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadActivities();
  }, []);

  return (
    <div className="w-full">
      {/* 1. Festive Hero Banner */}
      <section className="relative w-full overflow-hidden px-6 sm:px-10 lg:px-16 py-16 sm:py-24 text-center">
        {/* Ambient decorative glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[650px] rounded-full bg-gradient-to-tr from-amber-500/15 via-rose-500/15 to-transparent blur-3xl pointer-events-none -z-10" />

        {/* Festive Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50/90 px-4 py-1.5 text-xs font-bold text-amber-800 shadow-xs dark:border-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
          <span>🪔</span>
          <span>Durgotsav 2026 Community Celebration</span>
        </div>

        {/* Hero Title */}
        <h1 className="mt-6 font-heading text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-stone-900 dark:text-white">
          Celebrate. Participate.{" "}
          <span className="durgotsav-festive-gradient-text block sm:inline">
            Create Memories.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed font-sans">
          Welcome to the official Durgotsav 2026 Event Management portal. Explore the sacred puja schedule, register for cultural performances, and track your certificates all in one place.
        </p>

        {/* Primary Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          {isAuthenticated ? (
            <Link
              to={isAdmin ? "/durgotsav/admin" : "/durgotsav/dashboard"}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg hover:from-amber-600 hover:to-rose-700 transition transform hover:-translate-y-0.5"
            >
              {isAdmin ? "👑 Open Admin Dashboard" : "✨ Go to My Dashboard"}
            </Link>
          ) : (
            <Link
              to="/durgotsav/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg hover:from-amber-600 hover:to-rose-700 transition transform hover:-translate-y-0.5"
            >
              <span>Login to Participate</span>
              <span>→</span>
            </Link>
          )}
        </div>
      </section>

      {/* 2. Upcoming Activities Section */}
      <section className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-stone-200/80 dark:border-stone-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Schedule of Events
            </span>
            <h2 className="mt-1 font-heading text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100">
              Upcoming Activities & Rituals
            </h2>
          </div>
        </div>

        {/* State Handlers */}
        {loading && <LoadingSpinner message="Loading upcoming activities..." fullHeight={false} />}

        {error && (
          <div className="mt-8">
            <ErrorAlert message={error} onRetry={loadActivities} />
          </div>
        )}

        {!loading && !error && activities.length === 0 && (
          <div className="mt-8 rounded-2xl border border-dashed border-stone-300 p-12 text-center dark:border-stone-700">
            <span className="text-4xl">🪔</span>
            <h3 className="mt-3 text-base font-bold text-stone-800 dark:text-stone-200">
              No activities published yet
            </h3>
            <p className="mt-1 text-xs text-stone-500">
              Activities will appear here once the organizing committee schedules them.
            </p>
          </div>
        )}

        {!loading && !error && activities.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activities.slice(0, 6).map((activity) => (
              <div
                key={activity._id}
                role="button"
                tabIndex={0}
                onClick={() => navigate(`/durgotsav/dashboard?activityId=${activity._id}`)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    navigate(`/durgotsav/dashboard?activityId=${activity._id}`);
                  }
                }}
                className="durgotsav-card-glow group flex flex-col justify-between rounded-2xl border border-amber-200/60 bg-white p-6 dark:border-amber-900/30 dark:bg-stone-900/80 transition cursor-pointer hover:border-amber-400/80 hover:shadow-xl hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 dark:text-amber-300">
                      📍 {activity.venue}
                    </span>
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                      Active
                    </span>
                  </div>

                  <h3 className="mt-3 font-heading text-lg font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {activity.activity}
                  </h3>

                  <p className="mt-1 text-xs font-semibold text-amber-600 dark:text-amber-400">
                    🕒 {formatDateTimeRange(activity.startDateTime, activity.endDateTime)}
                  </p>

                  {activity.description && (
                    <p className="mt-3 text-xs text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
                      {activity.description}
                    </p>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-600 group-hover:text-amber-700 dark:text-amber-400 transition flex items-center gap-1">
                    <span>View Activity & Register</span>
                    <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                  </span>

                  {activity.audioVideoLink && (
                    <a
                      href={activity.audioVideoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                      title="Audio/Video Link"
                    >
                      🎥 Media
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
