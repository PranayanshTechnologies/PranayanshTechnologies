import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import type { Activity } from "../../types/durgotsav";
import {
  createAdminActivity,
  deleteAdminActivity,
  fetchAdminActivities,
  updateAdminActivity
} from "../../services/durgotsavApi";
import { formatDateTimeRange } from "../../utils/dateUtils";
import { ConfirmModal } from "../../components/common/ConfirmModal";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import { ErrorAlert } from "../../components/common/ErrorAlert";

/**
 * Format a Date to HTML datetime-local input string (YYYY-MM-DDTHH:mm)
 */
function toDateTimeLocalString(dateInput?: string | Date): string {
  if (!dateInput) return "";
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return "";
  const pad = (n: number) => n.toString().padStart(2, "0");
  const year = d.getFullYear();
  const month = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export const DurgotsavAdminActivities: React.FC = () => {
  const formRef = useRef<HTMLDivElement>(null);

  // Activities Data state
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // On-Page Form State
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [formActivity, setFormActivity] = useState("");
  const [formVenue, setFormVenue] = useState("");
  const [formStartDateTime, setFormStartDateTime] = useState("");
  const [formEndDateTime, setFormEndDateTime] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formAudioVideoLink, setFormAudioVideoLink] = useState("");
  const [formIsActive, setFormIsActive] = useState(true);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Delete modal state
  const [deletingActivity, setDeletingActivity] = useState<Activity | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // 1. Fetch Activities
  const loadActivities = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchAdminActivities({ search: search.trim() });
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
  }, [search]);

  // Reset On-Page Form to default create mode
  const handleResetForm = () => {
    setEditingActivity(null);
    setFormActivity("");
    setFormVenue("");
    setFormStartDateTime("");
    setFormEndDateTime("");
    setFormDescription("");
    setFormAudioVideoLink("");
    setFormIsActive(true);
    setFormError(null);
  };

  // Populate On-Page Form for Editing an Activity
  const handleStartEdit = (act: Activity) => {
    setEditingActivity(act);
    setFormActivity(act.activity || "");
    setFormVenue(act.venue || "");
    setFormStartDateTime(toDateTimeLocalString(act.startDateTime));
    setFormEndDateTime(toDateTimeLocalString(act.endDateTime));
    setFormDescription(act.description || "");
    setFormAudioVideoLink(act.audioVideoLink || "");
    setFormIsActive(Boolean(act.isActive));
    setFormError(null);
    setSuccessMsg(null);

    // Scroll smoothly to form
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Handle On-Page Form Submission (Add or Update)
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formActivity.trim()) {
      setFormError("Activity Name is required.");
      return;
    }
    if (!formVenue.trim()) {
      setFormError("Venue is required.");
      return;
    }
    if (!formStartDateTime) {
      setFormError("Start Date & Time is required.");
      return;
    }
    if (!formEndDateTime) {
      setFormError("End Date & Time is required.");
      return;
    }

    if (new Date(formEndDateTime) <= new Date(formStartDateTime)) {
      setFormError("End Date & Time must be after Start Date & Time.");
      return;
    }

    if (formAudioVideoLink.trim()) {
      try {
        const parsed = new URL(formAudioVideoLink.trim());
        if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
          throw new Error();
        }
      } catch {
        setFormError("Please enter a valid URL (starting with http:// or https://) for Audio / Video link.");
        return;
      }
    }

    setFormSubmitting(true);
    setFormError(null);
    setSuccessMsg(null);

    const payload = {
      activity: formActivity.trim(),
      venue: formVenue.trim(),
      startDateTime: new Date(formStartDateTime).toISOString(),
      endDateTime: new Date(formEndDateTime).toISOString(),
      description: formDescription.trim(),
      audioVideoLink: formAudioVideoLink.trim(),
      isActive: formIsActive
    };

    try {
      if (editingActivity) {
        await updateAdminActivity(editingActivity._id, payload);
        setSuccessMsg(`🎉 Activity "${payload.activity}" updated successfully!`);
      } else {
        await createAdminActivity(payload);
        setSuccessMsg(`🎉 New Activity "${payload.activity}" created successfully!`);
      }
      handleResetForm();
      await loadActivities();
    } catch (err: any) {
      setFormError(err?.message || "Failed to save activity. Please try again.");
    } finally {
      setFormSubmitting(false);
    }
  };

  // Handle Toggle Active/Inactive Quick Action
  const handleToggleStatus = async (act: Activity) => {
    try {
      await updateAdminActivity(act._id, { isActive: !act.isActive });
      setActivities((prev) =>
        prev.map((a) => (a._id === act._id ? { ...a, isActive: !a.isActive } : a))
      );
    } catch (err: any) {
      setError(err?.message || "Failed to update activity status");
    }
  };

  // Handle Delete Confirmation
  const handleDeleteConfirm = async () => {
    if (!deletingActivity) return;
    setDeleteLoading(true);
    try {
      await deleteAdminActivity(deletingActivity._id);
      setDeletingActivity(null);
      setSuccessMsg(`🗑️ Activity "${deletingActivity.activity}" deleted.`);
      await loadActivities();
    } catch (err: any) {
      setError(err?.message || "Failed to delete activity");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
            Admin Management
          </span>
          <h1 className="mt-1 font-heading text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100">
            Festival Activities Management
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-stone-500">
            Add new activities on this page, schedule timings, manage descriptions, and edit events row-wise.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/durgotsav/admin/participants"
            className="inline-flex items-center gap-1.5 rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-xs font-bold text-stone-700 shadow-2xs hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200 transition"
          >
            <span>👥 View All Participants</span>
          </Link>
        </div>
      </div>

      {/* Global Alerts */}
      {successMsg && (
        <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-4 text-xs font-bold text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 flex items-center justify-between">
          <span>{successMsg}</span>
          <button onClick={() => setSuccessMsg(null)} className="text-emerald-600 hover:text-emerald-900 ml-4 font-bold">
            ✕
          </button>
        </div>
      )}
      {error && <ErrorAlert message={error} onRetry={loadActivities} />}

      {/* ========================================================================= */}
      {/* 1. ON-PAGE FORM: ADD / EDIT ACTIVITY (ON SAME PAGE) */}
      {/* ========================================================================= */}
      <div
        ref={formRef}
        className={`durgotsav-card-glow rounded-3xl border ${
          editingActivity
            ? "border-amber-500 ring-2 ring-amber-500/20 bg-amber-50/20 dark:bg-amber-950/10"
            : "border-amber-300/80 bg-white dark:border-amber-900/40 dark:bg-stone-900/90"
        } p-6 sm:p-8 shadow-md transition`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100 dark:border-stone-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/15 text-amber-700 dark:text-amber-400 font-bold text-sm">
                {editingActivity ? "✏️" : "✨"}
              </span>
              <h2 className="font-heading text-lg font-bold text-stone-900 dark:text-stone-100">
                {editingActivity ? `Edit Activity: ${editingActivity.activity}` : "Add New Festival Activity"}
              </h2>
            </div>
            <p className="mt-1 text-xs text-stone-500">
              {editingActivity
                ? "Update event schedule, venue, instructions, or media links."
                : "Fill in the details below to schedule a new festival activity or competition."}
            </p>
          </div>

          {editingActivity && (
            <button
              type="button"
              onClick={handleResetForm}
              className="inline-flex items-center gap-1 text-xs font-bold text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 px-3 py-1.5 rounded-lg transition"
            >
              ✕ Cancel Edit / New Activity
            </button>
          )}
        </div>

        {formError && <ErrorAlert message={formError} className="mt-4" />}

        <form onSubmit={handleFormSubmit} className="mt-5 space-y-4">
          {/* Row 1 (3 Cols): Activity Name | Venue | Audio/Video Link */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wide">
                Activity Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Kalash Yatra, Solo Dance, Singing"
                value={formActivity}
                onChange={(e) => setFormActivity(e.target.value)}
                className="mt-1 w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-xs font-semibold text-stone-900 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wide">
                Venue <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Main Temple, Stage, Community Hall"
                value={formVenue}
                onChange={(e) => setFormVenue(e.target.value)}
                className="mt-1 w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-xs font-semibold text-stone-900 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wide">
                Audio / Video Link (Optional)
              </label>
              <input
                type="url"
                placeholder="https://youtube.com/... or media link"
                value={formAudioVideoLink}
                onChange={(e) => setFormAudioVideoLink(e.target.value)}
                className="mt-1 w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-xs text-stone-900 placeholder:text-stone-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
              />
            </div>
          </div>

          {/* Row 2 (3 Cols): Start Date & Time | End Date & Time | Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wide">
                Start Date & Time <span className="text-rose-500">*</span>
              </label>
              <input
                type="datetime-local"
                required
                value={formStartDateTime}
                onChange={(e) => setFormStartDateTime(e.target.value)}
                className="mt-1 w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-xs font-semibold text-stone-900 focus:border-amber-500 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wide">
                End Date & Time <span className="text-rose-500">*</span>
              </label>
              <input
                type="datetime-local"
                required
                value={formEndDateTime}
                onChange={(e) => setFormEndDateTime(e.target.value)}
                className="mt-1 w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-xs font-semibold text-stone-900 focus:border-amber-500 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wide">
                Activity Status
              </label>
              <select
                value={formIsActive ? "active" : "inactive"}
                onChange={(e) => setFormIsActive(e.target.value === "active")}
                className="mt-1 w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-xs font-semibold text-stone-900 focus:border-amber-500 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
              >
                <option value="active">🟢 Active (Open for Registration)</option>
                <option value="inactive">⚪ Inactive (Hidden / Closed)</option>
              </select>
            </div>
          </div>

          {/* Row 3: Description & Guidelines */}
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wide">
              Description & Performance Guidelines
            </label>
            <textarea
              rows={3}
              placeholder="Provide event details, guidelines, rules, or instructions for participants..."
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              className="mt-1 w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-xs text-stone-900 placeholder:text-stone-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
            />
          </div>

          {/* Submit & Cancel Buttons */}
          <div className="pt-2 flex items-center gap-3">
            <button
              type="submit"
              disabled={formSubmitting}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 px-8 py-3 text-xs font-bold text-white shadow-lg hover:from-amber-600 hover:to-rose-700 transition transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50"
            >
              {formSubmitting ? (
                <>
                  <div className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                  <span>Saving Activity...</span>
                </>
              ) : editingActivity ? (
                <span>💾 Save Changes to Activity →</span>
              ) : (
                <span>+ Add Activity Now →</span>
              )}
            </button>

            {editingActivity && (
              <button
                type="button"
                onClick={handleResetForm}
                className="rounded-xl border border-stone-300 px-5 py-3 text-xs font-bold text-stone-700 hover:bg-stone-100 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* ========================================================================= */}
      {/* 2. ROW-WISE ACTIVITIES LIST & EDIT TABLE */}
      {/* ========================================================================= */}
      <div className="rounded-3xl border border-stone-200/80 bg-white shadow-md dark:border-stone-800 dark:bg-stone-900/90 overflow-hidden">
        {/* Table Filter & Title Bar */}
        <div className="p-6 border-b border-stone-200 dark:border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              Scheduled Activities ({activities.length})
            </span>
            <h3 className="mt-0.5 font-heading text-lg font-bold text-stone-900 dark:text-stone-100">
              Row-Wise Activity Details
            </h3>
            <p className="text-xs text-stone-500">
              Click "Edit" on any row to load and modify details in the form above.
            </p>
          </div>

          {/* Search Filter */}
          <div className="w-full md:w-72 relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-stone-400">🔍</span>
            <input
              type="text"
              placeholder="Search activities..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-stone-300 pl-9 pr-4 py-2 text-xs text-stone-900 placeholder:text-stone-400 focus:border-amber-500 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
            />
          </div>
        </div>

        {/* Table Content */}
        {loading ? (
          <div className="py-12">
            <LoadingSpinner message="Loading activities list..." />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 dark:bg-stone-800/50 text-stone-500 uppercase font-bold tracking-wider border-b border-stone-200 dark:border-stone-800">
                <tr>
                  <th className="px-5 py-3.5 w-12 text-center">#</th>
                  <th className="px-5 py-3.5">Activity Name</th>
                  <th className="px-5 py-3.5">Venue & Timings</th>
                  <th className="px-5 py-3.5">Description & Guidelines</th>
                  <th className="px-5 py-3.5 text-center">Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                {activities.length > 0 ? (
                  activities.map((act, idx) => {
                    const isCurrentlyEditing = editingActivity?._id === act._id;

                    return (
                      <tr
                        key={act._id}
                        className={`transition ${
                          isCurrentlyEditing
                            ? "bg-amber-50/80 dark:bg-amber-950/30 font-medium"
                            : "hover:bg-amber-50/40 dark:hover:bg-stone-800/40"
                        }`}
                      >
                        {/* 1. Index # */}
                        <td className="px-5 py-4 text-center font-bold text-stone-400">
                          {idx + 1}
                        </td>

                        {/* 2. Activity Name */}
                        <td className="px-5 py-4">
                          <div className="flex flex-col">
                            <span className="font-bold text-sm text-stone-900 dark:text-stone-100">
                              {act.activity}
                            </span>
                            {act.audioVideoLink && (
                              <a
                                href={act.audioVideoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-600 hover:underline dark:text-amber-400 mt-1"
                              >
                                🎬 Video / Stream Link ↗
                              </a>
                            )}
                          </div>
                        </td>

                        {/* 3. Venue & Timings */}
                        <td className="px-5 py-4">
                          <span className="inline-flex items-center gap-1 rounded-md bg-stone-100 px-2 py-0.5 text-xs font-bold text-stone-800 dark:bg-stone-800 dark:text-stone-200">
                            📍 {act.venue}
                          </span>
                          <p className="mt-1 text-[11px] font-medium text-amber-600 dark:text-amber-400">
                            🕒 {formatDateTimeRange(act.startDateTime, act.endDateTime)}
                          </p>
                        </td>

                        {/* 4. Description */}
                        <td className="px-5 py-4 text-stone-600 dark:text-stone-300 max-w-xs">
                          <p className="line-clamp-2 text-xs">
                            {act.description || "—"}
                          </p>
                        </td>

                        {/* 5. Status Toggle */}
                        <td className="px-5 py-4 text-center">
                          <button
                            type="button"
                            onClick={() => handleToggleStatus(act)}
                            title="Click to toggle status"
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold transition cursor-pointer ${
                              act.isActive
                                ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300"
                                : "bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400"
                            }`}
                          >
                            <span>{act.isActive ? "● Active" : "○ Inactive"}</span>
                          </button>
                        </td>

                        {/* 6. Actions */}
                        <td className="px-5 py-4 text-right space-x-2">
                          <Link
                            to={`/durgotsav/admin/participants?activityId=${act._id}`}
                            className="inline-flex items-center rounded-lg bg-amber-50 px-2.5 py-1.5 text-xs font-bold text-amber-800 hover:bg-amber-100 dark:bg-amber-950/60 dark:text-amber-300 transition"
                            title="View registered participants"
                          >
                            👥 Participants
                          </Link>

                          <button
                            type="button"
                            onClick={() => handleStartEdit(act)}
                            className="inline-flex items-center gap-1 rounded-lg border border-amber-300 bg-amber-50 px-2.5 py-1.5 text-xs font-bold text-amber-800 hover:bg-amber-100 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-300 transition"
                            title="Edit this activity in form above"
                          >
                            <span>✏️ Edit</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setDeletingActivity(act)}
                            className="inline-flex items-center rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1.5 text-xs font-bold text-rose-700 hover:bg-rose-100 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-400 transition"
                            title="Delete activity"
                          >
                            <span>🗑️ Delete</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-stone-400">
                      <span className="text-3xl">🪔</span>
                      <p className="mt-2 text-sm font-semibold text-stone-600 dark:text-stone-300">
                        No activities found.
                      </p>
                      <p className="text-xs text-stone-400">
                        Use the form above to add and schedule your first Durgotsav activity!
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deletingActivity)}
        title="Delete Festival Activity"
        message={`Are you sure you want to delete "${deletingActivity?.activity}"? This will soft-delete the activity from active festival listings.`}
        confirmLabel="Yes, Delete Activity"
        cancelLabel="Keep Activity"
        variant="danger"
        loading={deleteLoading}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingActivity(null)}
      />
    </div>
  );
};
