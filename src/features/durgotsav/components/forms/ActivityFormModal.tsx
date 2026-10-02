import React, { useState, useEffect } from "react";
import type { Activity } from "../../types/durgotsav";
import { ErrorAlert } from "../common/ErrorAlert";

interface ActivityFormModalProps {
  isOpen: boolean;
  activity?: Activity | null;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (formData: {
    activity: string;
    description: string;
    venue: string;
    startDateTime: string;
    endDateTime: string;
    audioVideoLink: string;
  }) => Promise<void>;
}

export const ActivityFormModal: React.FC<ActivityFormModalProps> = ({
  isOpen,
  activity,
  loading = false,
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    activity: "",
    description: "",
    venue: "",
    startDateTime: "",
    endDateTime: "",
    audioVideoLink: ""
  });

  const [error, setError] = useState<string | null>(null);

  // Helper to format ISO to datetime-local format YYYY-MM-DDTHH:mm
  const toDateTimeLocal = (dateStr?: string) => {
    if (!dateStr) return "";
    try {
      const d = new Date(dateStr);
      return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    } catch {
      return "";
    }
  };

  useEffect(() => {
    if (activity) {
      setFormData({
        activity: activity.activity || "",
        description: activity.description || "",
        venue: activity.venue || "",
        startDateTime: toDateTimeLocal(activity.startDateTime),
        endDateTime: toDateTimeLocal(activity.endDateTime),
        audioVideoLink: activity.audioVideoLink || ""
      });
    } else {
      setFormData({
        activity: "",
        description: "",
        venue: "",
        startDateTime: "",
        endDateTime: "",
        audioVideoLink: ""
      });
    }
    setError(null);
  }, [activity, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.activity.trim()) {
      setError("Activity name is required.");
      return;
    }

    if (!formData.venue.trim()) {
      setError("Venue is required.");
      return;
    }

    if (!formData.startDateTime) {
      setError("Start Date and Time is required.");
      return;
    }

    if (!formData.endDateTime) {
      setError("End Date and Time is required.");
      return;
    }

    const start = new Date(formData.startDateTime);
    const end = new Date(formData.endDateTime);

    if (end < start) {
      setError("End Date/Time cannot be earlier than Start Date/Time.");
      return;
    }

    try {
      await onSubmit({
        activity: formData.activity.trim(),
        description: formData.description.trim(),
        venue: formData.venue.trim(),
        startDateTime: new Date(formData.startDateTime).toISOString(),
        endDateTime: new Date(formData.endDateTime).toISOString(),
        audioVideoLink: formData.audioVideoLink.trim()
      });
      onClose();
    } catch (err: any) {
      setError(err?.message || "Failed to save activity");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="w-full max-w-xl rounded-2xl border border-stone-200 bg-white p-6 shadow-2xl dark:border-stone-800 dark:bg-stone-900 transition-all my-8">
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800">
          <div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              {activity ? "Edit Durgotsav Activity" : "Create New Activity"}
            </h3>
            <p className="text-xs text-stone-500">
              {activity ? "Update activity details" : "Schedule a community puja event"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-stone-400 hover:text-stone-600 hover:bg-stone-100 dark:hover:bg-stone-800"
          >
            ✕
          </button>
        </div>

        {error && <ErrorAlert message={error} className="mt-4" />}

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wide">
              Activity Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Kalash Yatra, Aarti, Dhunuchi Dance"
              value={formData.activity}
              onChange={(e) => setFormData({ ...formData, activity: e.target.value })}
              className="mt-1 w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wide">
              Venue / Location <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Main Temple, Community Hall, Stage"
              value={formData.venue}
              onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
              className="mt-1 w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wide">
                Start Date & Time <span className="text-rose-500">*</span>
              </label>
              <input
                type="datetime-local"
                required
                value={formData.startDateTime}
                onChange={(e) => setFormData({ ...formData, startDateTime: e.target.value })}
                className="mt-1 w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-sm text-stone-900 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wide">
                End Date & Time <span className="text-rose-500">*</span>
              </label>
              <input
                type="datetime-local"
                required
                value={formData.endDateTime}
                onChange={(e) => setFormData({ ...formData, endDateTime: e.target.value })}
                className="mt-1 w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-sm text-stone-900 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wide">
              Description (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="Provide event details, guidelines, or instructions for participants..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="mt-1 w-full rounded-xl border border-stone-300 px-3.5 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wide">
              Audio / Video Link (Optional)
            </label>
            <input
              type="url"
              placeholder="https://example.com/stream-or-video"
              value={formData.audioVideoLink}
              onChange={(e) => setFormData({ ...formData, audioVideoLink: e.target.value })}
              className="mt-1 w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
            />
          </div>

          <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-end gap-3">
            <button
              type="button"
              disabled={loading}
              onClick={onClose}
              className="rounded-xl border border-stone-300 px-4 py-2.5 text-xs font-semibold text-stone-700 hover:bg-stone-100 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl bg-amber-600 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-amber-700 transition focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50"
            >
              {loading && <div className="h-3 w-3 rounded-full border-2 border-white/40 border-t-white animate-spin" />}
              {activity ? "Update Activity" : "Create Activity"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
