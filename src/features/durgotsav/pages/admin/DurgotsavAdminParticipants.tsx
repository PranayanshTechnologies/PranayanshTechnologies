import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import type { Activity, Participant } from "../../types/durgotsav";
import {
  fetchAdminActivities,
  fetchAdminParticipants,
  markParticipantCertificateCollected,
  markParticipantPerformed
} from "../../services/durgotsavApi";
import { StatusBadge } from "../../components/common/StatusBadge";
import { ConfirmModal } from "../../components/common/ConfirmModal";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import { ErrorAlert } from "../../components/common/ErrorAlert";

export const DurgotsavAdminParticipants: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialActivityId = searchParams.get("activityId") || "";

  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivityId, setSelectedActivityId] = useState<string>(initialActivityId);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [search, setSearch] = useState<string>("");

  const [loadingActivities, setLoadingActivities] = useState<boolean>(true);
  const [loadingParticipants, setLoadingParticipants] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Modals for actions
  const [performedModalParticipant, setPerformedModalParticipant] = useState<Participant | null>(null);
  const [certificateModalParticipant, setCertificateModalParticipant] = useState<Participant | null>(null);
  const [actionLoading, setActionLoading] = useState<boolean>(false);

  // Load activities dropdown
  useEffect(() => {
    async function initActivities() {
      setLoadingActivities(true);
      try {
        const res = await fetchAdminActivities();
        if (res.success && res.activities.length > 0) {
          setActivities(res.activities);
          if (!selectedActivityId) {
            setSelectedActivityId(res.activities[0]._id);
          }
        }
      } catch (err: any) {
        setError(err?.message || "Failed to load activities");
      } finally {
        setLoadingActivities(false);
      }
    }

    initActivities();
  }, [selectedActivityId]);

  // Load participants for selected activity
  const loadParticipants = useCallback(async () => {
    if (!selectedActivityId) return;
    setLoadingParticipants(true);
    setError(null);
    try {
      const res = await fetchAdminParticipants(selectedActivityId, {
        status: statusFilter,
        search: search.trim()
      });
      if (res.success) {
        setParticipants(res.participants || []);
      }
    } catch (err: any) {
      setError(err?.message || "Failed to load participants");
    } finally {
      setLoadingParticipants(false);
    }
  }, [selectedActivityId, statusFilter, search]);

  useEffect(() => {
    if (selectedActivityId) {
      setSearchParams({ activityId: selectedActivityId });
      loadParticipants();
    }
  }, [selectedActivityId, statusFilter, search, loadParticipants, setSearchParams]);

  // Handle Mark Performed
  const handleConfirmPerformed = async () => {
    if (!performedModalParticipant) return;
    setActionLoading(true);
    try {
      const res = await markParticipantPerformed(performedModalParticipant._id);
      if (res.success) {
        setParticipants((prev) =>
          prev.map((p) => (p._id === performedModalParticipant._id ? res.participant : p))
        );
        setPerformedModalParticipant(null);
      }
    } catch (err: any) {
      setError(err?.message || "Failed to mark as performed");
    } finally {
      setActionLoading(false);
    }
  };

  // Handle Mark Certificate Collected
  const handleConfirmCertificate = async () => {
    if (!certificateModalParticipant) return;
    setActionLoading(true);
    try {
      const res = await markParticipantCertificateCollected(certificateModalParticipant._id);
      if (res.success) {
        setParticipants((prev) =>
          prev.map((p) => (p._id === certificateModalParticipant._id ? res.participant : p))
        );
        setCertificateModalParticipant(null);
      }
    } catch (err: any) {
      setError(err?.message || "Failed to mark certificate collected");
    } finally {
      setActionLoading(false);
    }
  };

  const selectedActivity = activities.find((a) => a._id === selectedActivityId);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
            Audit & Verification
          </span>
          <h1 className="mt-1 font-heading text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100">
            Participant Verification Portal
          </h1>
          <p className="mt-1 text-xs text-stone-500">
            Verify stage performance, issue certificates, and filter participant attendance.
          </p>
        </div>
      </div>

      {error && <ErrorAlert message={error} onRetry={loadParticipants} />}

      {/* Activity Selector & Filter Bar */}
      <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs dark:border-stone-800 dark:bg-stone-900 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Activity Dropdown */}
          <div>
            <label className="block text-[11px] font-bold uppercase text-stone-500 mb-1">
              Select Activity <span className="text-rose-500">*</span>
            </label>
            <select
              value={selectedActivityId}
              disabled={loadingActivities || activities.length === 0}
              onChange={(e) => setSelectedActivityId(e.target.value)}
              className="w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-xs font-bold text-stone-900 focus:border-amber-500 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
            >
              {activities.map((a) => (
                <option key={a._id} value={a._id}>
                  {a.activity} (📍 {a.venue})
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-[11px] font-bold uppercase text-stone-500 mb-1">
              Status Filter
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-xs font-semibold text-stone-900 focus:border-amber-500 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
            >
              <option value="all">All Registrations</option>
              <option value="performed">Performed ✓</option>
              <option value="not_performed">Not Performed</option>
              <option value="certificate_collected">Certificate Collected</option>
              <option value="certificate_pending">Certificate Pending</option>
              <option value="withdrawn">Withdrawn</option>
            </select>
          </div>

          {/* Search Box */}
          <div>
            <label className="block text-[11px] font-bold uppercase text-stone-500 mb-1">
              Search Participant
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-stone-400">
                🔍
              </span>
              <input
                type="text"
                placeholder="Name, mobile, or flat..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-stone-300 pl-8 pr-3 py-2.5 text-xs text-stone-900 placeholder:text-stone-400 focus:border-amber-500 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
              />
            </div>
          </div>
        </div>

        {selectedActivity && (
          <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500">
            <span>
              Viewing participants for: <strong>{selectedActivity.activity}</strong> at{" "}
              <strong>{selectedActivity.venue}</strong>
            </span>
            <span className="font-bold text-amber-600 dark:text-amber-400">
              {participants.length} Registered Found
            </span>
          </div>
        )}
      </div>

      {/* Participants Table */}
      {loadingParticipants ? (
        <LoadingSpinner message="Fetching participant records..." fullHeight />
      ) : (
        <div className="rounded-2xl border border-stone-200 bg-white shadow-xs dark:border-stone-800 dark:bg-stone-900 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 dark:bg-stone-800/50 text-stone-500 uppercase font-bold tracking-wider border-b border-stone-200 dark:border-stone-800">
                <tr>
                  <th className="px-5 py-3.5 text-center w-12">#</th>
                  <th className="px-6 py-3.5">Participant Details</th>
                  <th className="px-6 py-3.5">Apartment & Society</th>
                  <th className="px-6 py-3.5 text-center">Audio / Video</th>
                  <th className="px-6 py-3.5">Current Status</th>
                  <th className="px-6 py-3.5 text-center">Action 1: Performance</th>
                  <th className="px-6 py-3.5 text-center">Action 2: Certificate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                {participants.length > 0 ? (
                  participants.map((p, idx) => {
                    return (
                      <tr key={p._id} className="hover:bg-stone-50/70 dark:hover:bg-stone-800/40 transition">
                        {/* 1. # */}
                        <td className="px-5 py-4 text-center font-bold text-stone-400">
                          {p.participantNumber ?? idx + 1}
                        </td>

                        {/* Name & Mobile */}
                        <td className="px-6 py-4">
                          <p className="font-bold text-sm text-stone-900 dark:text-stone-100">
                            {p.fullName}
                          </p>
                          <p className="text-[11px] font-semibold text-stone-500">
                            📱 {p.mobile}
                          </p>
                          {p.email && (
                            <p className="text-[10px] text-stone-400">{p.email}</p>
                          )}
                        </td>

                        {/* Flat & Tower */}
                        <td className="px-6 py-4 text-stone-600 dark:text-stone-300">
                          <p className="font-semibold">
                            {p.flatNo ? `Flat ${p.flatNo}` : "—"}
                            {p.tower ? ` • ${p.tower}` : ""}
                            {p.floor ? ` (Fl. ${p.floor})` : ""}
                          </p>
                          {p.society && <p className="text-[11px] text-stone-500">{p.society}</p>}
                        </td>

                        {/* Audio / Video Media Link */}
                        <td className="px-6 py-4 text-center">
                          {p.audioVideoLink ? (
                            <a
                              href={p.audioVideoLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 px-3 py-1.5 text-xs font-bold text-amber-700 dark:text-amber-300 transition border border-amber-300/60 dark:border-amber-900/60"
                            >
                              <span>▶ Open Media</span>
                            </a>
                          ) : (
                            <span className="text-[11px] text-stone-400 italic">
                              No audio/video provided
                            </span>
                          )}
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4">
                          <StatusBadge
                            isWithdraw={p.isWithdraw}
                            isPerformed={p.isPerformed}
                            isCertificateCollected={p.isCertificateCollected}
                          />
                        </td>

                        {/* Action 1: Mark Performed */}
                        <td className="px-6 py-4 text-center">
                          {p.isPerformed ? (
                            <span className="inline-flex items-center gap-1 font-bold text-emerald-600 text-xs">
                              <span>✓ Performed</span>
                            </span>
                          ) : p.isWithdraw ? (
                            <span className="text-[11px] text-stone-400">Withdrawn</span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setPerformedModalParticipant(p)}
                              className="inline-flex items-center gap-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs transition"
                            >
                              <span>Mark Performed</span>
                            </button>
                          )}
                        </td>

                        {/* Action 2: Mark Certificate Collected */}
                        <td className="px-6 py-4 text-center">
                          {p.isCertificateCollected ? (
                            <span className="inline-flex items-center gap-1 font-bold text-purple-600 text-xs">
                              <span>✓ Collected</span>
                            </span>
                          ) : !p.isPerformed ? (
                            <span
                              title="Participant must perform before certificate can be collected"
                              className="text-[11px] text-stone-400 cursor-not-allowed italic"
                            >
                              Pending Performance
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setCertificateModalParticipant(p)}
                              className="inline-flex items-center gap-1 rounded-xl bg-purple-600 hover:bg-purple-700 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs transition"
                            >
                              <span>Mark Certificate</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-10 text-center text-stone-400">
                      No participants found matching the selected filter/search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Mark Performed */}
      <ConfirmModal
        isOpen={Boolean(performedModalParticipant)}
        title="Confirm Participant Performance"
        message={`Are you sure that ${performedModalParticipant?.fullName} (${performedModalParticipant?.mobile}) has completed/performed this activity?`}
        confirmLabel="Confirm Performance"
        cancelLabel="Cancel"
        variant="success"
        loading={actionLoading}
        onConfirm={handleConfirmPerformed}
        onCancel={() => setPerformedModalParticipant(null)}
      />

      {/* Confirmation Modal for Mark Certificate Collected */}
      <ConfirmModal
        isOpen={Boolean(certificateModalParticipant)}
        title="Confirm Certificate Collection"
        message={`Confirm that the participation/achievement certificate has been handed over to ${certificateModalParticipant?.fullName}?`}
        confirmLabel="Confirm Collection"
        cancelLabel="Cancel"
        variant="primary"
        loading={actionLoading}
        onConfirm={handleConfirmCertificate}
        onCancel={() => setCertificateModalParticipant(null)}
      />
    </div>
  );
};
