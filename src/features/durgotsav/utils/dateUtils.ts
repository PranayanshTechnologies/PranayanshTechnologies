import type { Activity } from "../types/durgotsav";

/**
 * Date formatting helpers for Durgotsav Event Management
 */

export function formatEventDateTime(dateString?: string | null): string {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "N/A";
    return date.toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
  } catch {
    return dateString;
  }
}

export function formatEventDate(dateString?: string | null): string {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "N/A";
    return date.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  } catch {
    return dateString;
  }
}

export function formatEventTime(dateString?: string | null): string {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "N/A";
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
  } catch {
    return dateString;
  }
}

export function formatDateTimeRange(startStr?: string, endStr?: string): string {
  if (!startStr) return "N/A";
  const startDate = formatEventDate(startStr);
  const startTime = formatEventTime(startStr);
  const endTime = endStr ? formatEventTime(endStr) : "";

  if (endTime) {
    return `${startDate} • ${startTime} - ${endTime}`;
  }
  return `${startDate} • ${startTime}`;
}

/**
 * Determine default activity selection based on strict priority:
 * Priority 1: Activity matching requested activityId (if present and valid in active list)
 * Priority 2: Earliest scheduled activity for TODAY (in local/event timezone)
 * Priority 3: First available activity returned by API
 */
export function resolveDefaultActivity(
  activities: Activity[],
  requestedActivityId?: string | null
): Activity | null {
  if (!activities || activities.length === 0) return null;

  // Priority 1: URL / Navigation requested activityId (if present and valid)
  if (requestedActivityId && typeof requestedActivityId === "string" && requestedActivityId.trim()) {
    const matched = activities.find((a) => a._id === requestedActivityId.trim());
    if (matched) return matched;
  }

  // Priority 2: Activities scheduled for TODAY in local timezone
  const now = new Date();
  const todayYear = now.getFullYear();
  const todayMonth = now.getMonth();
  const todayDate = now.getDate();

  const todayActivities = activities.filter((a) => {
    if (!a.startDateTime) return false;
    const actDate = new Date(a.startDateTime);
    if (isNaN(actDate.getTime())) return false;
    return (
      actDate.getFullYear() === todayYear &&
      actDate.getMonth() === todayMonth &&
      actDate.getDate() === todayDate
    );
  });

  if (todayActivities.length > 0) {
    // Sort ascending by startDateTime to select the earliest scheduled activity today
    todayActivities.sort(
      (a, b) => new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime()
    );
    return todayActivities[0];
  }

  // Priority 3: First available activity
  return activities[0];
}
