import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { DashboardStats } from "../../types/durgotsav";
import { fetchAdminDashboard } from "../../services/durgotsavApi";
import { formatDateTimeRange } from "../../utils/dateUtils";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import { ErrorAlert } from "../../components/common/ErrorAlert";

export const DurgotsavAdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboard = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchAdminDashboard();
      if (res.success) {
        setStats(res);
      }
    } catch (err: any) {
      setError(err?.message || "Failed to load admin statistics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
            Durgotsav Control Center
          </span>
          <h1 className="mt-1 font-heading text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100">
            Event Management Overview
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-stone-500">
            Live statistics, participation progress, and performance verification summary.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/durgotsav/admin/activities"
            className="rounded-xl bg-amber-600 px-4 py-2 text-xs font-bold text-white hover:bg-amber-700 transition"
          >
            Manage Activities
          </Link>
          <Link
            to="/durgotsav/admin/participants"
            className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-700 transition"
          >
            Verify Participants
          </Link>
        </div>
      </div>

      {error && <ErrorAlert message={error} onRetry={loadDashboard} />}

      {loading ? (
        <LoadingSpinner message="Calculating real-time festival analytics..." fullHeight />
      ) : stats ? (
        <>
          {/* Top Aggregate Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs dark:border-stone-800 dark:bg-stone-900">
              <span className="text-2xl">🎪</span>
              <p className="mt-2 text-3xl font-black text-stone-900 dark:text-stone-100">
                {stats.totalActivities}
              </p>
              <p className="text-xs font-medium text-stone-500">
                Total Activities ({stats.activeActivities} Active)
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs dark:border-stone-800 dark:bg-stone-900">
              <span className="text-2xl">👥</span>
              <p className="mt-2 text-3xl font-black text-amber-600 dark:text-amber-400">
                {stats.totalParticipants}
              </p>
              <p className="text-xs font-medium text-stone-500">
                Total Registrations
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs dark:border-stone-800 dark:bg-stone-900">
              <span className="text-2xl">🎭</span>
              <p className="mt-2 text-3xl font-black text-emerald-600 dark:text-emerald-400">
                {stats.totalPerformed}
              </p>
              <p className="text-xs font-medium text-stone-500">
                Performances Verified
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs dark:border-stone-800 dark:bg-stone-900">
              <span className="text-2xl">📜</span>
              <p className="mt-2 text-3xl font-black text-purple-600 dark:text-purple-400">
                {stats.totalCertificatesCollected}
              </p>
              <p className="text-xs font-medium text-stone-500">
                Certificates Issued ({stats.pendingCertificates} Pending)
              </p>
            </div>
          </div>

          {/* Activity-wise Breakdown Table */}
          <div className="rounded-2xl border border-stone-200 bg-white shadow-xs dark:border-stone-800 dark:bg-stone-900 overflow-hidden">
            <div className="px-6 py-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
              <h2 className="font-heading font-bold text-base text-stone-900 dark:text-stone-100">
                Activity-Wise Performance Breakdown
              </h2>
              <span className="text-xs font-semibold text-stone-500">
                {stats.activityStats?.length || 0} Events Listed
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 dark:bg-stone-800/50 text-stone-500 uppercase font-bold tracking-wider border-b border-stone-200 dark:border-stone-800">
                  <tr>
                    <th className="px-6 py-3.5">Activity</th>
                    <th className="px-6 py-3.5">Venue & Timings</th>
                    <th className="px-6 py-3.5 text-center">Registered</th>
                    <th className="px-6 py-3.5 text-center">Performed</th>
                    <th className="px-6 py-3.5 text-center">Certificates</th>
                    <th className="px-6 py-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                  {stats.activityStats && stats.activityStats.length > 0 ? (
                    stats.activityStats.map((item) => (
                      <tr key={item.activityId} className="hover:bg-stone-50/70 dark:hover:bg-stone-800/40 transition">
                        <td className="px-6 py-4 font-bold text-stone-900 dark:text-stone-100">
                          {item.activityName}
                        </td>
                        <td className="px-6 py-4 text-stone-600 dark:text-stone-400">
                          <p className="font-semibold text-stone-800 dark:text-stone-200">📍 {item.venue}</p>
                          <p className="text-[11px] text-stone-500">
                            {formatDateTimeRange(item.startDateTime, item.endDateTime)}
                          </p>
                        </td>
                        <td className="px-6 py-4 text-center font-bold text-amber-600">
                          {item.totalRegistered}
                          {item.withdrawn > 0 && (
                            <span className="text-[10px] text-stone-400 block font-normal">
                              ({item.withdrawn} withdrawn)
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center font-bold text-emerald-600">
                          {item.performed}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="font-bold text-purple-600">{item.certificatesCollected}</span>
                          {item.pendingCertificates > 0 && (
                            <span className="text-[10px] text-rose-500 block font-semibold">
                              {item.pendingCertificates} pending
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Link
                            to={`/durgotsav/admin/participants?activityId=${item.activityId}`}
                            className="inline-flex items-center rounded-lg bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-700 hover:bg-rose-100 dark:bg-rose-950/60 dark:text-rose-300 transition"
                          >
                            Verify →
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-stone-400">
                        No activities scheduled yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};
