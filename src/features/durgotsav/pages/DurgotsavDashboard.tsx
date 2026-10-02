import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useDurgotsavAuth } from "../context/DurgotsavAuthContext";
import type { Activity, Participant } from "../types/durgotsav";
import {
  fetchActivities,
  fetchActivityParticipants,
  fetchMyRegistrations,
  registerActivity,
  withdrawActivityRegistration,
  revokeWithdrawActivityRegistration,
  updateParticipantRegistration
} from "../services/durgotsavApi";
import { formatDateTimeRange, resolveDefaultActivity } from "../utils/dateUtils";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { ErrorAlert } from "../components/common/ErrorAlert";
import { ConfirmModal } from "../components/common/ConfirmModal";

/**
 * Helper to safely extract YouTube Embed URL for live stream / performance showcase
 */
function getYouTubeEmbedUrl(url?: string): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtube.com")) {
      const v = parsed.searchParams.get("v");
      if (v) return `https://www.youtube-nocookie.com/embed/${v}`;
    }
    if (parsed.hostname.includes("youtu.be")) {
      const id = parsed.pathname.replace(/^\//, "");
      if (id) return `https://www.youtube-nocookie.com/embed/${id}`;
    }
  } catch {
    return null;
  }
  return null;
}

// Towers A to Z list (A, B, C, D...)
const TOWERS_A_TO_Z: string[] = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

export const DurgotsavDashboard: React.FC = () => {
  const { user, isAdmin } = useDurgotsavAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialActivityId = searchParams.get("activityId") || "";

  // Data states
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivityId, setSelectedActivityId] = useState<string>(initialActivityId);
  const [myRegistrations, setMyRegistrations] = useState<Participant[]>([]);
  const [activityParticipants, setActivityParticipants] = useState<Participant[]>([]);

  // UI states
  const [loading, setLoading] = useState(true);
  const [loadingParticipants, setLoadingParticipants] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [participantSearch, setParticipantSearch] = useState("");

  // Modals
  const [editingParticipant, setEditingParticipant] = useState<Participant | null>(null);
  const [withdrawingParticipant, setWithdrawingParticipant] = useState<Participant | null>(null);

  // Edit Modal Form State
  const [editFullName, setEditFullName] = useState("");
  const [editTower, setEditTower] = useState("A");
  const [editFloor, setEditFloor] = useState("");
  const [editFlat, setEditFlat] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editAudioVideoLink, setEditAudioVideoLink] = useState("");
  const [editModalError, setEditModalError] = useState<string | null>(null);

  // Registration Form States (all controls empty by default)
  const [formFullName, setFormFullName] = useState("");
  const [formTower, setFormTower] = useState("");
  const [formFlat, setFormFlat] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formAudioVideoLink, setFormAudioVideoLink] = useState("");

  // 1. Initial Data Fetch (Activities + My Registrations)
  const loadInitialData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [actRes, myRegRes] = await Promise.all([
        fetchActivities(),
        fetchMyRegistrations()
      ]);

      if (actRes.success && actRes.activities.length > 0) {
        setActivities(actRes.activities);

        // Priority resolution:
        // Priority 1: Activity matching URL searchParam activityId (if present and valid)
        // Priority 2: Earliest scheduled activity for TODAY (in local timezone)
        // Priority 3: First available activity returned by API
        const currentParamId = searchParams.get("activityId") || initialActivityId;
        const defaultActivity = resolveDefaultActivity(actRes.activities, currentParamId);
        const targetId = defaultActivity ? defaultActivity._id : actRes.activities[0]._id;
        setSelectedActivityId(targetId);
        setSearchParams({ activityId: targetId }, { replace: true });
      }

      if (myRegRes.success) {
        setMyRegistrations(myRegRes.registrations || []);
      }
    } catch (err: any) {
      setError(err?.message || "Failed to load Durgotsav dashboard.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  // Sync state if URL query param changes externally (e.g. browser back/forward or overview click)
  useEffect(() => {
    const urlActivityId = searchParams.get("activityId");
    if (activities.length > 0 && urlActivityId) {
      const resolved = resolveDefaultActivity(activities, urlActivityId);
      if (resolved && resolved._id !== selectedActivityId) {
        setSelectedActivityId(resolved._id);
      }
    }
  }, [searchParams, activities]);

  // 2. Fetch Activity Participants whenever selectedActivityId changes
  const loadParticipants = useCallback(async (activityId: string) => {
    if (!activityId) return;
    setLoadingParticipants(true);
    try {
      const res = await fetchActivityParticipants(activityId);
      if (res.success) {
        setActivityParticipants(res.participants || []);
      }
    } catch (err: any) {
      console.error("Failed to load activity participants:", err);
    } finally {
      setLoadingParticipants(false);
    }
  }, []);

  useEffect(() => {
    if (selectedActivityId) {
      loadParticipants(selectedActivityId);
    }
  }, [selectedActivityId, loadParticipants]);

  // Dropdown change handler: updates state and syncs URL query param
  const handleActivityDropdownChange = (newActivityId: string) => {
    setSelectedActivityId(newActivityId);
    setSearchParams({ activityId: newActivityId }, { replace: true });
  };

  // Currently Selected Activity Object
  const selectedActivity = useMemo(() => {
    return activities.find((a) => a._id === selectedActivityId) || activities[0] || null;
  }, [activities, selectedActivityId]);

  // All registrations by current user for this selected activity (can be multiple: wife, child, self, etc.)
  const myRegistrationsForThisActivity = useMemo(() => {
    if (!selectedActivityId) return [];
    return myRegistrations.filter((r) => {
      const actId = typeof r.activityId === "object" ? (r.activityId as any)._id : r.activityId;
      return actId === selectedActivityId;
    });
  }, [myRegistrations, selectedActivityId]);

  // Filtered Participants List based on Search Query
  const filteredParticipants = useMemo(() => {
    if (!participantSearch.trim()) return activityParticipants;
    const q = participantSearch.toLowerCase().trim();
    return activityParticipants.filter((p) => {
      return (
        p.fullName.toLowerCase().includes(q) ||
        (p.tower && p.tower.toLowerCase().includes(q)) ||
        (p.flatNo && p.flatNo.toLowerCase().includes(q)) ||
        (p.society && p.society.toLowerCase().includes(q))
      );
    });
  }, [activityParticipants, participantSearch]);

  // Helper to verify if current user is the owner of this registration record (or admin)
  const isParticipantOwner = (p: Participant): boolean => {
    if (isAdmin) return true;
    if (!user) return false;
    const participantUserId =
      typeof p.userId === "object" && p.userId !== null
        ? (p.userId as any)._id || (p.userId as any).id
        : p.userId;
    return (
      (participantUserId && String(participantUserId) === String(user.id)) ||
      p.mobile === user.phone
    );
  };

  // Handle Event Registration Submission (Multiple registrations always allowed!)
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedActivityId) return;

    const trimmedName = formFullName.trim() || user?.fullName || "";
    if (!trimmedName) {
      setError("Please enter the participant's name (e.g. self, spouse, or child's name).");
      return;
    }

    if (formAudioVideoLink.trim()) {
      try {
        const parsed = new URL(formAudioVideoLink.trim());
        if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
          throw new Error();
        }
      } catch {
        setError("Please enter a valid URL (starting with http:// or https://) for Audio / Video link.");
        return;
      }
    }

    setRegistering(true);
    setError(null);
    setSuccessMsg(null);
    try {
      const res = await registerActivity(selectedActivityId, {
        fullName: trimmedName,
        mobile: formPhone.trim() || user?.phone,
        tower: formTower.trim(),
        flatNo: formFlat.trim(),
        email: formEmail.trim(),
        audioVideoLink: formAudioVideoLink.trim()
      });

      if (res.success) {
        setSuccessMsg(`🎉 Participant "${trimmedName}" registered successfully for ${selectedActivity?.activity}!`);
        // Add to local registrations list
        setMyRegistrations((prev) => [res.participant, ...prev]);
        // Reload activity participants
        loadParticipants(selectedActivityId);
        // Clear all form controls for next registration
        setFormFullName("");
        setFormTower("");
        setFormFlat("");
        setFormPhone("");
        setFormEmail("");
        setFormAudioVideoLink("");
      }
    } catch (err: any) {
      setError(err?.message || "Registration failed. Please try again.");
    } finally {
      setRegistering(false);
    }
  };

  // Open Edit Modal
  const handleOpenEditModal = (participant: Participant) => {
    if (!isParticipantOwner(participant)) return;
    setEditingParticipant(participant);
    setEditFullName(participant.fullName || "");
    setEditTower(participant.tower || "");
    setEditFloor(participant.floor || "");
    setEditFlat(participant.flatNo || "");
    setEditEmail(participant.email || "");
    setEditAudioVideoLink(participant.audioVideoLink || "");
    setEditModalError(null);
  };

  // Submit Edit Modal Form
  const handleEditModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingParticipant) return;

    if (editAudioVideoLink.trim()) {
      try {
        const parsed = new URL(editAudioVideoLink.trim());
        if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
          throw new Error();
        }
      } catch {
        setEditModalError("Please enter a valid URL (e.g. https://...) for Audio / Video link.");
        return;
      }
    }

    setActionLoading(true);
    setEditModalError(null);
    try {
      const res = await updateParticipantRegistration(editingParticipant._id, {
        fullName: editFullName.trim(),
        tower: editTower.trim(),
        floor: editFloor.trim(),
        flatNo: editFlat.trim(),
        email: editEmail.trim(),
        audioVideoLink: editAudioVideoLink.trim()
      });

      if (res.success) {
        // Update local state in table
        setActivityParticipants((prev) =>
          prev.map((p) => (p._id === editingParticipant._id ? { ...p, ...res.participant } : p))
        );
        // Update myRegistrations if user's own record
        setMyRegistrations((prev) =>
          prev.map((p) => (p._id === editingParticipant._id ? { ...p, ...res.participant } : p))
        );
        setEditingParticipant(null);
        setSuccessMsg(`✓ Participant "${editFullName}" updated successfully.`);
      }
    } catch (err: any) {
      setEditModalError(err?.message || "Failed to update participant details.");
    } finally {
      setActionLoading(false);
    }
  };

  // Open Withdraw Confirmation Modal
  const handleOpenWithdrawModal = (participant: Participant) => {
    if (!isParticipantOwner(participant)) return;
    setWithdrawingParticipant(participant);
  };

  // Confirm Withdrawal
  const handleConfirmWithdraw = async () => {
    if (!withdrawingParticipant) return;
    setActionLoading(true);
    try {
      const res = await withdrawActivityRegistration(withdrawingParticipant._id);
      if (res.success) {
        // Update table grid row to be grayed out
        setActivityParticipants((prev) =>
          prev.map((p) => (p._id === withdrawingParticipant._id ? { ...p, isWithdraw: true } : p))
        );
        // Update user registrations
        setMyRegistrations((prev) =>
          prev.map((p) => (p._id === withdrawingParticipant._id ? { ...p, isWithdraw: true } : p))
        );
        setWithdrawingParticipant(null);
        setSuccessMsg(`✓ Registration for "${withdrawingParticipant.fullName}" has been withdrawn.`);
      }
    } catch (err: any) {
      setError(err?.message || "Failed to withdraw registration.");
    } finally {
      setActionLoading(false);
    }
  };

  // Revoke Withdrawal / Reactivate Participant Row
  const handleRevokeWithdraw = async (participant: Participant) => {
    if (!isParticipantOwner(participant)) return;
    setActionLoading(true);
    setError(null);
    try {
      const res = await revokeWithdrawActivityRegistration(participant._id);
      if (res.success) {
        // Restore row from grayed out to active
        setActivityParticipants((prev) =>
          prev.map((p) => (p._id === participant._id ? { ...p, isWithdraw: false } : p))
        );
        // Update user registrations
        setMyRegistrations((prev) =>
          prev.map((p) => (p._id === participant._id ? { ...p, isWithdraw: false } : p))
        );
        setSuccessMsg(`✓ Registration for "${participant.fullName}" reactivated successfully.`);
      }
    } catch (err: any) {
      setError(err?.message || "Failed to reactivate registration.");
    } finally {
      setActionLoading(false);
    }
  };

  // Video embed link
  const youtubeEmbedUrl = useMemo(() => {
    return getYouTubeEmbedUrl(selectedActivity?.audioVideoLink);
  }, [selectedActivity]);

  if (loading) {
    return <LoadingSpinner message="Loading Durgotsav Activity Dashboard..." fullHeight />;
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-8 space-y-8">
      {/* ========================================================================= */}
      {/* 1. DASHBOARD HEADER */}
      {/* ========================================================================= */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-amber-200/80 dark:border-stone-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🪔</span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Durgotsav 2026 Participation Hub
            </span>
          </div>
          <h1 className="mt-1 font-heading text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100">
            Welcome, {user?.fullName || "Resident"}!
          </h1>
          <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-400 flex flex-wrap items-center gap-2">
            <span>📱 {user?.phone}</span>
            {user?.tower && <span>• {user.tower}</span>}
            {user?.flatNumber && <span>• Flat {user.flatNumber}</span>}
            {user?.society && <span>• {user.society}</span>}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            to="/durgotsav/my-registrations"
            className="inline-flex items-center gap-1.5 rounded-xl border border-amber-300 bg-amber-50/70 px-4 py-2 text-xs font-bold text-amber-800 hover:bg-amber-100 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-300 transition"
          >
            <span>📝 My Registrations</span>
            <span className="rounded-full bg-amber-600 px-2 py-0.5 text-[10px] text-white">
              {myRegistrations.filter((r) => !r.isWithdraw).length}
            </span>
          </Link>

          {isAdmin && (
            <Link
              to="/durgotsav/admin"
              className="inline-flex items-center gap-1 rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-rose-700 transition"
            >
              👑 Admin Console
            </Link>
          )}
        </div>
      </header>

      {/* Global Alerts */}
      {error && <ErrorAlert message={error} onRetry={loadInitialData} />}
      {successMsg && (
        <div className="rounded-2xl bg-emerald-50 border border-emerald-300 p-4 text-xs font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 flex items-center justify-between">
          <span>{successMsg}</span>
          <button
            onClick={() => setSuccessMsg(null)}
            className="text-emerald-700 hover:text-emerald-900 dark:text-emerald-400 text-sm font-bold ml-4"
          >
            ✕
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. SMALL IMAGE / DURGOTSAV BANNER */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden rounded-3xl border border-amber-300/80 bg-gradient-to-r from-amber-600 via-rose-600 to-amber-700 p-6 sm:p-8 text-white shadow-xl dark:border-amber-700/50">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-100 backdrop-blur-md">
              <span>✨ Durga Puja Mahotsav ✨</span>
            </div>
            <h2 className="mt-3 font-heading text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              14th Avenue - 8th Durgotsav
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-amber-50/90 leading-relaxed">
              Register yourself, your spouse, or children for stage performances, submit audio/video tracks, and manage your family entries in the attendance grid below.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-4 bg-white/10 rounded-2xl p-4 backdrop-blur-md border border-white/20">
            <div className="text-center">
              <span className="text-3xl">🪔</span>
              <p className="text-[11px] font-bold mt-1 text-amber-200">Main Mandap</p>
              <p className="text-[10px] text-white/80">Oct 18 – 24</p>
            </div>
            <div className="h-10 w-px bg-white/30" />
            <div className="text-center">
              <span className="text-3xl">🎭</span>
              <p className="text-[11px] font-bold mt-1 text-amber-200">{activities.length} Events</p>
              <p className="text-[10px] text-white/80">Live On Stage</p>
            </div>
          </div>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute -right-10 -bottom-10 h-48 w-48 rounded-full bg-amber-400/20 blur-3xl pointer-events-none" />
        <div className="absolute -left-10 -top-10 h-48 w-48 rounded-full bg-rose-400/20 blur-3xl pointer-events-none" />
      </section>

      {/* ========================================================================= */}
      {/* 3. ACTIVITY DROPDOWN (Retrieved from Activity API) */}
      {/* ========================================================================= */}
      <section className="rounded-2xl border border-amber-300/70 bg-white p-5 shadow-sm dark:border-amber-900/40 dark:bg-stone-900/90">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <label
              htmlFor="activity-selector"
              className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1"
            >
              Select Activity / Event <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-base">
                🎭
              </span>
              <select
                id="activity-selector"
                value={selectedActivityId}
                onChange={(e) => handleActivityDropdownChange(e.target.value)}
                className="w-full rounded-xl border border-stone-300 pl-11 pr-10 py-3 text-sm font-bold text-stone-900 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100 cursor-pointer shadow-2xs"
              >
                {activities.map((act) => (
                  <option key={act._id} value={act._id}>
                    {act.activity} (📍 {act.venue})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {selectedActivity && (
            <div className="flex items-center gap-3 pt-2 md:pt-5">
              <div className="rounded-xl bg-amber-50 px-4 py-2 text-center border border-amber-200 dark:bg-amber-950/40 dark:border-amber-900/50">
                <span className="text-[10px] font-bold uppercase text-stone-500 dark:text-stone-400">
                  Total Active
                </span>
                <p className="text-base font-black text-amber-600 dark:text-amber-400">
                  {activityParticipants.filter((p) => !p.isWithdraw).length}
                </p>
              </div>

              <div className="rounded-xl bg-stone-50 px-4 py-2 text-center border border-stone-200 dark:bg-stone-800/80 dark:border-stone-700">
                <span className="text-[10px] font-bold uppercase text-stone-500 dark:text-stone-400">
                  My Family Entries
                </span>
                <p className="text-xs font-bold text-stone-800 dark:text-stone-200">
                  {myRegistrationsForThisActivity.filter((r) => !r.isWithdraw).length} Registered
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. ACTIVITY DETAILS BOX + 5. MULTI-PARTICIPANT REGISTRATION FORM */}
      {/* ========================================================================= */}
      {selectedActivity && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT COLUMN: 4. Activity Square Box Details (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="durgotsav-card-glow rounded-3xl border border-amber-300/80 bg-white p-6 shadow-md dark:border-amber-900/40 dark:bg-stone-900/90 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 pb-4 border-b border-stone-100 dark:border-stone-800">
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                    📍 {selectedActivity.venue}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                    ● Active Event
                  </span>
                </div>

                <h3 className="mt-4 font-heading text-xl font-extrabold text-stone-900 dark:text-stone-100">
                  {selectedActivity.activity}
                </h3>

                <div className="mt-3 flex items-start gap-2 text-xs font-semibold text-amber-600 dark:text-amber-400">
                  <span className="text-base">🕒</span>
                  <span>{formatDateTimeRange(selectedActivity.startDateTime, selectedActivity.endDateTime)}</span>
                </div>

                <div className="mt-4">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                    Description & Guidelines
                  </h4>
                  <p className="mt-1 text-xs text-stone-600 dark:text-stone-300 leading-relaxed whitespace-pre-line">
                    {selectedActivity.description || "No special instructions. Please report to the stage 15 minutes before scheduled start."}
                  </p>
                </div>

                {/* Compact & Mobile-Friendly Live Event Stream inside the Event Box */}
                {youtubeEmbedUrl ? (
                  <div className="mt-5 space-y-2 pt-4 border-t border-stone-100 dark:border-stone-800">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                        <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                        Live Event Stream
                      </span>
                      {selectedActivity.audioVideoLink && (
                        <a
                          href={selectedActivity.audioVideoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] font-bold text-amber-600 hover:underline dark:text-amber-400"
                        >
                          Open in YouTube ↗
                        </a>
                      )}
                    </div>
                    <div className="aspect-video w-full rounded-2xl overflow-hidden border border-amber-200/80 dark:border-stone-800 shadow-sm bg-black">
                      <iframe
                        src={youtubeEmbedUrl}
                        title={`${selectedActivity.activity} Live Stream`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                ) : selectedActivity.audioVideoLink ? (
                  <div className="mt-5 pt-4 border-t border-stone-100 dark:border-stone-800">
                    <a
                      href={selectedActivity.audioVideoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 px-4 py-2.5 text-xs font-bold text-amber-700 dark:text-amber-300 transition w-full justify-center border border-amber-300/60"
                    >
                      <span>🎬 Watch Event Promo / Stream Link</span>
                      <span>→</span>
                    </a>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: 5. Registration Box (7 Cols) - ALWAYS ENABLED FOR MULTIPLE REGISTRATIONS */}
          <div className="lg:col-span-7">
            <div className="durgotsav-card-glow rounded-3xl border border-amber-300/80 bg-white p-6 sm:p-7 shadow-md dark:border-amber-900/40 dark:bg-stone-900/90 space-y-5">
              <div className="pb-3 border-b border-stone-100 dark:border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    Participant Registration
                  </span>
                  <h3 className="font-heading text-lg font-bold text-stone-900 dark:text-stone-100">
                    Register Participant for {selectedActivity.activity}
                  </h3>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                  ✨ Multi-Registration Open
                </span>
              </div>

              {/* Already Registered Family Members Badge (if any) */}
              {myRegistrationsForThisActivity.length > 0 && (
                <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-3.5 dark:border-amber-900/40 dark:bg-amber-950/20">
                  <span className="text-[11px] font-bold uppercase text-amber-800 dark:text-amber-300 block mb-1.5">
                    Your Registered Entries for this Event ({myRegistrationsForThisActivity.length}):
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {myRegistrationsForThisActivity.map((r) => (
                      <div
                        key={r._id}
                        className={`inline-flex items-center gap-1.5 rounded-xl border px-2.5 py-1 text-xs font-semibold ${r.isWithdraw
                          ? "border-stone-300 bg-stone-100 text-stone-500 line-through dark:border-stone-700 dark:bg-stone-800"
                          : "border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300"
                          }`}
                      >
                        <span>{r.isWithdraw ? "✕" : "✓"} {r.fullName}</span>
                        <button
                          type="button"
                          onClick={() => handleOpenEditModal(r)}
                          className="text-[10px] font-bold underline ml-1 hover:text-amber-600"
                          title="Edit this participant"
                        >
                          Edit
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Registration Form (Always enabled for multiple submissions) */}
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                {/* Row 1: Full Name | Tower | Flat */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wide">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formFullName}
                      onChange={(e) => setFormFullName(e.target.value)}
                      placeholder="Full Name"
                      className="mt-1 w-full rounded-xl border border-stone-300 px-3.5 py-2 text-xs font-semibold text-stone-900 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
                    />
                  </div>

                  {/* Tower */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wide">
                      Tower
                    </label>
                    <select
                      value={formTower}
                      onChange={(e) => setFormTower(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-stone-300 px-3.5 py-2 text-xs font-semibold text-stone-900 focus:border-amber-500 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
                    >
                      <option value="">- Select -</option>
                      {TOWERS_A_TO_Z.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Flat */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wide">
                      Flat
                    </label>
                    <input
                      type="text"
                      value={formFlat}
                      onChange={(e) => setFormFlat(e.target.value)}
                      placeholder="e.g. 502"
                      className="mt-1 w-full rounded-xl border border-stone-300 px-3.5 py-2 text-xs font-semibold text-stone-900 focus:border-amber-500 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
                    />
                  </div>
                </div>

                {/* Row 2: Phone Number | Email Add */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wide">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      placeholder="e.g. 9876543210"
                      className="mt-1 w-full rounded-xl border border-stone-300 px-3.5 py-2 text-xs font-semibold text-stone-900 focus:border-amber-500 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
                    />
                  </div>

                  {/* Email Add */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wide">
                      Email Add
                    </label>
                    <input
                      type="email"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="name@email.com"
                      className="mt-1 w-full rounded-xl border border-stone-300 px-3.5 py-2 text-xs font-semibold text-stone-900 focus:border-amber-500 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
                    />
                  </div>
                </div>

                {/* Row 3: Audio/Video */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wide">
                    Audio/Video (Optional)
                  </label>
                  <input
                    type="url"
                    value={formAudioVideoLink}
                    onChange={(e) => setFormAudioVideoLink(e.target.value)}
                    placeholder="Paste audio or video link (YouTube, Drive, MP3...)"
                    className="mt-1 w-full rounded-xl border border-stone-300 px-3.5 py-2 text-xs text-stone-900 placeholder:text-stone-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
                  />
                  <p className="mt-1 text-[11px] text-stone-500">
                    Optional — Admin can use this link during your performance.
                  </p>
                </div>

                {/* Row 4: Participate button */}
                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="submit"
                    disabled={registering}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 px-8 py-3 text-xs font-bold text-white shadow-lg hover:from-amber-600 hover:to-rose-700 transition transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50"
                  >
                    {registering ? (
                      <>
                        <div className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                        <span>Registering...</span>
                      </>
                    ) : (
                      <span>+ Participate in {selectedActivity.activity} →</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. LIST OF THE PARTICIPANTS TABLE GRID (ACTIVE ATTENDANCE GRID) */}
      {/* ========================================================================= */}
      <section className="rounded-3xl border border-amber-300/80 bg-white shadow-md dark:border-amber-900/40 dark:bg-stone-900/90 overflow-hidden">
        {/* Table Filter & Title Bar */}
        <div className="p-6 border-b border-stone-200 dark:border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Active Attendance Grid
            </span>
            <h3 className="mt-0.5 font-heading text-lg font-bold text-stone-900 dark:text-stone-100">
              Participants for {selectedActivity ? selectedActivity.activity : "Selected Activity"}
            </h3>
            <p className="text-xs text-stone-500">
              Showing all registered residents. You can edit/withdraw your own family records.
            </p>
          </div>

          {/* Name Search Filter */}
          <div className="w-full md:w-72 relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-stone-400">
              🔍
            </span>
            <input
              type="text"
              value={participantSearch}
              onChange={(e) => setParticipantSearch(e.target.value)}
              placeholder="Search by name, flat, tower..."
              className="w-full rounded-xl border border-stone-300 pl-8 pr-3 py-2 text-xs text-stone-900 placeholder:text-stone-400 focus:border-amber-500 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
            />
          </div>
        </div>

        {/* Table Content */}
        {loadingParticipants ? (
          <div className="py-12">
            <LoadingSpinner message="Loading participant list..." />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 dark:bg-stone-800/50 text-stone-500 uppercase font-bold tracking-wider border-b border-stone-200 dark:border-stone-800">
                <tr>
                  <th className="px-5 py-3.5 w-12 text-center">#</th>
                  <th className="px-5 py-3.5">Participants Name</th>
                  <th className="px-5 py-3.5">Tower</th>
                  <th className="px-5 py-3.5">Flat Number</th>
                  <th className="px-5 py-3.5">Registration Datetime</th>
                  <th className="px-5 py-3.5 text-center">Edit</th>
                  <th className="px-5 py-3.5 text-center">Withdrawl</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                {filteredParticipants.length > 0 ? (
                  filteredParticipants.map((p, idx) => {
                    const isWithdrawn = Boolean(p.isWithdraw);
                    const isOwner = isParticipantOwner(p);
                    const rowClass = isWithdrawn
                      ? "bg-stone-100/80 text-stone-400 dark:bg-stone-800/40 dark:text-stone-500 opacity-65 transition"
                      : "hover:bg-amber-50/40 dark:hover:bg-stone-800/40 transition";

                    return (
                      <tr key={p._id || idx} className={rowClass}>
                        {/* 1. # */}
                        <td className="px-5 py-4 text-center font-bold text-stone-400">
                          {p.participantNumber ?? idx + 1}
                        </td>

                        {/* 2. Participants Name */}
                        <td className="px-5 py-4">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`font-bold text-sm ${isWithdrawn
                                ? "line-through text-stone-400 dark:text-stone-500"
                                : "text-stone-900 dark:text-stone-100"
                                }`}
                            >
                              {p.fullName}
                            </span>
                            {isOwner && (
                              <span className="rounded-md bg-amber-100 px-1.5 py-0.5 text-[9px] font-bold text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                                You
                              </span>
                            )}
                            {isWithdrawn && (
                              <span className="rounded-md bg-stone-200 px-1.5 py-0.5 text-[10px] font-bold text-stone-600 dark:bg-stone-700 dark:text-stone-300">
                                Withdrawn
                              </span>
                            )}
                            {p.isPerformed && !isWithdrawn && (
                              <span className="rounded-md bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                                ✓ Performed
                              </span>
                            )}
                          </div>
                          {p.society && (
                            <p className="text-[10px] text-stone-400">{p.society}</p>
                          )}
                          {p.audioVideoLink && !isWithdrawn && (
                            <div className="mt-1">
                              <a
                                href={p.audioVideoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-600 hover:underline dark:text-amber-400"
                              >
                                ▶ View Media Link
                              </a>
                            </div>
                          )}
                        </td>

                        {/* 3. Tower */}
                        <td
                          className={`px-5 py-4 font-medium ${isWithdrawn ? "line-through" : "text-stone-700 dark:text-stone-300"
                            }`}
                        >
                          {p.tower || "—"}
                        </td>

                        {/* 4. Flat Number */}
                        <td
                          className={`px-5 py-4 font-semibold ${isWithdrawn ? "line-through" : "text-stone-800 dark:text-stone-200"
                            }`}
                        >
                          {p.flatNo || "—"}
                        </td>

                        {/* 5. Registration Datetime */}
                        <td className="px-5 py-4 text-xs text-stone-500">
                          {p.createdDate
                            ? new Date(p.createdDate).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit"
                            })
                            : "—"}
                        </td>

                        {/* 6. Edit (Owner / Admin only) */}
                        <td className="px-5 py-4 text-center">
                          {isOwner ? (
                            <button
                              type="button"
                              onClick={() => handleOpenEditModal(p)}
                              className="inline-flex items-center gap-1 rounded-lg border border-amber-300 bg-amber-50 px-2.5 py-1.5 text-xs font-bold text-amber-800 hover:bg-amber-100 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-300 transition"
                              title="Edit this registration"
                            >
                              <span>✏️ Edit</span>
                            </button>
                          ) : (
                            <span
                              className="text-stone-300 dark:text-stone-600 text-xs select-none"
                              title="Only the resident who registered this participant can edit"
                            >
                              —
                            </span>
                          )}
                        </td>

                        {/* 7. Withdrawl / Revoke Withdrawl (Owner / Admin only) */}
                        <td className="px-5 py-4 text-center">
                          {isOwner ? (
                            isWithdrawn ? (
                              <button
                                type="button"
                                onClick={() => handleRevokeWithdraw(p)}
                                disabled={actionLoading}
                                className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 px-2.5 py-1.5 text-xs font-bold text-white shadow-2xs transition disabled:opacity-50"
                                title="Reactivate / Revoke withdrawal"
                              >
                                <span>🔄 Revoke Withdrawl</span>
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => handleOpenWithdrawModal(p)}
                                disabled={actionLoading}
                                className="inline-flex items-center gap-1 rounded-lg border border-rose-200 bg-rose-50 hover:bg-rose-100 px-2.5 py-1.5 text-xs font-bold text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-400 dark:hover:bg-rose-900/40 transition disabled:opacity-50"
                                title="Withdraw participant from event"
                              >
                                <span>✕ Withdraw</span>
                              </button>
                            )
                          ) : (
                            <span
                              className="text-stone-300 dark:text-stone-600 text-xs select-none"
                              title="Only the resident who registered this participant can withdraw"
                            >
                              —
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-stone-400">
                      <span className="text-3xl">🪔</span>
                      <p className="mt-2 text-sm font-semibold text-stone-600 dark:text-stone-300">
                        No participants found for this activity.
                      </p>
                      <p className="text-xs text-stone-400">
                        Be the first devotee to register using the form above!
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* EDIT PARTICIPANT MODAL */}
      {/* ========================================================================= */}
      {editingParticipant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-lg rounded-3xl border border-amber-300 bg-white p-6 sm:p-8 shadow-2xl dark:border-amber-900/40 dark:bg-stone-900 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Update Registration
                </span>
                <h3 className="font-heading text-lg font-bold text-stone-900 dark:text-stone-100">
                  Edit Participant Details
                </h3>
              </div>
              <button
                onClick={() => setEditingParticipant(null)}
                className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-stone-800 dark:hover:text-stone-200"
              >
                ✕
              </button>
            </div>

            {editModalError && <ErrorAlert message={editModalError} className="mt-4" />}

            <form onSubmit={handleEditModalSubmit} className="mt-5 space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wide">
                  Participant Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editFullName}
                  onChange={(e) => setEditFullName(e.target.value)}
                  placeholder="Full Name"
                  className="mt-1 w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-xs font-semibold text-stone-900 focus:border-amber-500 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
                />
              </div>

              {/* Tower & Floor */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wide">
                    Tower / Block
                  </label>
                  <select
                    value={editTower}
                    onChange={(e) => setEditTower(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-xs font-semibold text-stone-900 focus:border-amber-500 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
                  >
                    <option value="">- Select -</option>
                    {TOWERS_A_TO_Z.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wide">
                    Floor (1 - 50)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    value={editFloor}
                    onChange={(e) => setEditFloor(e.target.value)}
                    placeholder="e.g. 5"
                    className="mt-1 w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-xs font-semibold text-stone-900 focus:border-amber-500 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
                  />
                </div>
              </div>

              {/* Flat Number & Email */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wide">
                    Flat Number
                  </label>
                  <input
                    type="text"
                    value={editFlat}
                    onChange={(e) => setEditFlat(e.target.value)}
                    placeholder="e.g. A-502"
                    className="mt-1 w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-xs font-semibold text-stone-900 focus:border-amber-500 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wide">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    placeholder="name@email.com"
                    className="mt-1 w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-xs font-semibold text-stone-900 focus:border-amber-500 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
                  />
                </div>
              </div>

              {/* Audio / Video Link */}
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wide">
                  Audio / Video Link (Optional)
                </label>
                <input
                  type="url"
                  value={editAudioVideoLink}
                  onChange={(e) => setEditAudioVideoLink(e.target.value)}
                  placeholder="Paste audio or video link (YouTube, Drive, MP3...)"
                  className="mt-1 w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-xs text-stone-900 placeholder:text-stone-400 focus:border-amber-500 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
                />
                <p className="mt-1 text-[11px] text-stone-500">
                  Optional — Admin can use this link during your performance.
                </p>
              </div>

              {/* Modal Buttons */}
              <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-stone-100 dark:border-stone-800">
                <button
                  type="button"
                  onClick={() => setEditingParticipant(null)}
                  className="rounded-xl border border-stone-300 px-4 py-2.5 text-xs font-bold text-stone-700 hover:bg-stone-100 dark:border-stone-700 dark:text-stone-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="rounded-xl bg-amber-600 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-amber-700 transition disabled:opacity-50 flex items-center gap-1.5"
                >
                  {actionLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* WITHDRAW CONFIRMATION MODAL */}
      {/* ========================================================================= */}
      <ConfirmModal
        isOpen={Boolean(withdrawingParticipant)}
        title="Withdraw from Activity"
        message={`Are you sure you want to withdraw ${withdrawingParticipant?.fullName} from "${selectedActivity?.activity}"? The participant row will be grayed out in the attendance grid, and you can revoke the withdrawal anytime.`}
        confirmLabel="Yes, Withdraw"
        cancelLabel="Keep Registration"
        variant="danger"
        loading={actionLoading}
        onConfirm={handleConfirmWithdraw}
        onCancel={() => setWithdrawingParticipant(null)}
      />

      {/* ========================================================================= */}
      {/* 8. FOOTER SECTION WITH IMPORTANT LINKS */}
      {/* ========================================================================= */}
      <footer className="rounded-3xl border border-stone-200 bg-stone-50 p-6 dark:border-stone-800 dark:bg-stone-900/60">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs text-stone-600 dark:text-stone-400">
          <div>
            <h4 className="font-heading font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider mb-2">
              🪔 Event Guidelines
            </h4>
            <p className="leading-relaxed text-[11px]">
              Performers should arrive 15 minutes prior to scheduled timings. Sound & mic testing is conducted during the 10-minute break between performances.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider mb-2">
              📞 Cultural Desk
            </h4>
            <ul className="space-y-1 text-[11px]">
              <li>Cultural Committee: +91 98765 43210</li>
              <li>Stage & Audio Incharge: Desk B</li>
              <li>Prasad Distribution: Main Hall</li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider mb-2">
              📍 Quick Navigation
            </h4>
            <ul className="space-y-1 text-[11px]">
              <li>
                <Link to="/durgotsav/activities" className="hover:text-amber-600 transition">
                  • All Activities Schedule
                </Link>
              </li>
              <li>
                <Link to="/durgotsav/my-registrations" className="hover:text-amber-600 transition">
                  • My Registered Events
                </Link>
              </li>
              <li>
                <Link to="/durgotsav" className="hover:text-amber-600 transition">
                  • Festival Overview & Welcome
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider mb-2">
              🏢 Main Website
            </h4>
            <p className="leading-relaxed text-[11px]">
              Event Management System engineered for Durgotsav 2026.
            </p>
            <Link
              to="/"
              className="mt-2 inline-flex items-center gap-1 font-bold text-amber-600 hover:text-amber-700 dark:text-amber-400 text-[11px]"
            >
              ← Back to Pranayansh Technologies
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
