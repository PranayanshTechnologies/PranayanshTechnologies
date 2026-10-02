import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Participant } from "../types/durgotsav";
import { fetchMyRegistrations, withdrawActivityRegistration } from "../services/durgotsavApi";
import { formatDateTimeRange } from "../utils/dateUtils";
import { StatusBadge } from "../components/common/StatusBadge";
import { ConfirmModal } from "../components/common/ConfirmModal";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { ErrorAlert } from "../components/common/ErrorAlert";

export const DurgotsavMyRegistrations: React.FC = () => {
  const [registrations, setRegistrations] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Withdraw modal state
  const [selectedReg, setSelectedReg] = useState<Participant | null>(null);
  const [withdrawing, setWithdrawing] = useState(false);

  const loadRegistrations = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchMyRegistrations();
      if (res.success) {
        setRegistrations(res.registrations || []);
      }
    } catch (err: any) {
      setError(err?.message || "Failed to load registrations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRegistrations();
  }, []);

  const handleWithdrawConfirm = async () => {
    if (!selectedReg) return;
    setWithdrawing(true);
    try {
      const res = await withdrawActivityRegistration(selectedReg._id);
      if (res.success) {
        // Update local list state
        setRegistrations((prev) =>
          prev.map((r) => (r._id === selectedReg._id ? { ...r, isWithdraw: true } : r))
        );
        setSelectedReg(null);
      }
    } catch (err: any) {
      setError(err?.message || "Failed to withdraw registration");
    } finally {
      setWithdrawing(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Participation Tracking
          </span>
          <h1 className="mt-1 font-heading text-3xl font-black text-stone-900 dark:text-stone-100">
            My Registered Activities
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-stone-600 dark:text-stone-400">
            Track performance status, collect your certificates, and manage registrations.
          </p>
        </div>

        <Link
          to="/durgotsav/activities"
          className="inline-flex items-center gap-1.5 rounded-xl bg-amber-600 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-amber-700 transition"
        >
          + Register for New Event
        </Link>
      </div>

      {error && <ErrorAlert message={error} onRetry={loadRegistrations} className="mt-6" />}

      {loading ? (
        <LoadingSpinner message="Loading your registrations..." fullHeight />
      ) : registrations.length === 0 ? (
        <div className="mt-12 rounded-3xl border border-dashed border-stone-300 p-12 text-center dark:border-stone-800">
          <span className="text-4xl">🪔</span>
          <h3 className="mt-3 text-base font-bold text-stone-900 dark:text-stone-100">
            No registrations found
          </h3>
          <p className="mt-1 text-xs text-stone-500">
            You haven't registered for any Durgotsav events yet.
          </p>
          <Link
            to="/durgotsav/activities"
            className="mt-4 inline-flex items-center gap-1 rounded-xl bg-amber-600 px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-amber-700"
          >
            Explore Activities Now →
          </Link>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {registrations.map((reg) => {
            const activityData = typeof reg.activityId === "object" ? (reg.activityId as any) : null;
            const venue = activityData?.venue || "Main Temple";
            const timeRange = activityData
              ? formatDateTimeRange(activityData.startDateTime, activityData.endDateTime)
              : "Check activity schedule";

            return (
              <div
                key={reg._id}
                className="durgotsav-card-glow rounded-2xl border border-stone-200/80 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900/80 transition flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusBadge
                      isWithdraw={reg.isWithdraw}
                      isPerformed={reg.isPerformed}
                      isCertificateCollected={reg.isCertificateCollected}
                    />
                    <span className="text-xs text-stone-400">
                      📍 {venue}
                    </span>
                  </div>

                  <h2 className="mt-2 font-heading text-lg font-bold text-stone-900 dark:text-stone-100">
                    {reg.activity}
                  </h2>

                  <p className="mt-1 text-xs font-semibold text-amber-600 dark:text-amber-400">
                    🕒 {timeRange}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-1 text-xs text-stone-500">
                    <span>Participant: <strong>{reg.fullName}</strong></span>
                    <span>Mobile: <strong>{reg.mobile}</strong></span>
                    {reg.flatNo && <span>Flat: <strong>{reg.flatNo}</strong></span>}
                    {reg.audioVideoLink && (
                      <span className="flex items-center gap-1">
                        Media:{" "}
                        <a
                          href={reg.audioVideoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-amber-600 hover:text-amber-700 underline dark:text-amber-400 font-semibold"
                        >
                          ▶ View Submitted Media
                        </a>
                      </span>
                    )}
                  </div>
                </div>

                {/* Status Callout & Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-stone-100 dark:border-stone-800">
                  {reg.isCertificateCollected ? (
                    <div className="rounded-xl bg-purple-50 px-4 py-2.5 text-center text-xs font-bold text-purple-700 dark:bg-purple-950/60 dark:text-purple-300">
                      🏅 Certificate Issued
                    </div>
                  ) : reg.isPerformed ? (
                    <div className="rounded-xl bg-emerald-50 px-4 py-2.5 text-center text-xs font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                      ✨ Performed • Certificate Ready for Collection
                    </div>
                  ) : reg.isWithdraw ? (
                    <div className="rounded-xl bg-stone-100 px-4 py-2.5 text-center text-xs font-medium text-stone-500 dark:bg-stone-800 dark:text-stone-400">
                      Registration Withdrawn
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setSelectedReg(reg)}
                      className="rounded-xl border border-rose-200 px-4 py-2 text-xs font-bold text-rose-700 hover:bg-rose-50 dark:border-rose-900/60 dark:text-rose-400 dark:hover:bg-rose-950/40 transition"
                    >
                      Withdraw Registration
                    </button>
                  )}

                  {activityData?._id && (
                    <Link
                      to={`/durgotsav/activities/${activityData._id}`}
                      className="rounded-xl border border-stone-300 px-4 py-2 text-center text-xs font-bold text-stone-700 hover:bg-stone-100 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800 transition"
                    >
                      Activity Details
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Withdraw Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(selectedReg)}
        title="Withdraw Registration"
        message={`Are you sure you want to withdraw your registration for "${selectedReg?.activity}"? You can re-register anytime before the event starts.`}
        confirmLabel="Yes, Withdraw"
        cancelLabel="Keep Registration"
        variant="danger"
        loading={withdrawing}
        onConfirm={handleWithdrawConfirm}
        onCancel={() => setSelectedReg(null)}
      />
    </div>
  );
};
