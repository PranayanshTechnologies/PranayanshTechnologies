import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import type { Activity, Participant } from "../types/durgotsav";
import { fetchActivityById, fetchMyRegistrations, registerActivity } from "../services/durgotsavApi";
import { formatDateTimeRange } from "../utils/dateUtils";
import { useDurgotsavAuth } from "../context/DurgotsavAuthContext";
import { StatusBadge } from "../components/common/StatusBadge";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { ErrorAlert } from "../components/common/ErrorAlert";

export const DurgotsavActivityDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated } = useDurgotsavAuth();
  const navigate = useNavigate();

  const [activity, setActivity] = useState<Activity | null>(null);
  const [userRegistration, setUserRegistration] = useState<Participant | null>(null);
  const [participantName, setParticipantName] = useState("");
  const [email, setEmail] = useState("");
  const [audioVideoLink, setAudioVideoLink] = useState("");
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const actRes = await fetchActivityById(id);
      if (actRes.success) {
        setActivity(actRes.activity);
      }

      if (isAuthenticated) {
        const regRes = await fetchMyRegistrations();
        if (regRes.success && regRes.registrations) {
          const match = regRes.registrations.find((r) => {
            const regActId = typeof r.activityId === "object" ? (r.activityId as any)._id : r.activityId;
            return regActId === id;
          });
          setUserRegistration(match || null);
        }
      }
    } catch (err: any) {
      setError(err?.message || "Failed to load activity details");
    } finally {
      setLoading(false);
    }
  }, [id, isAuthenticated]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    if (!isAuthenticated) {
      navigate("/durgotsav/login");
      return;
    }

    const nameToSubmit = participantName.trim() || user?.fullName || "";
    if (!nameToSubmit) {
      setError("Please enter the participant name.");
      return;
    }

    if (audioVideoLink.trim()) {
      try {
        const parsed = new URL(audioVideoLink.trim());
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
      const res = await registerActivity(id, {
        fullName: nameToSubmit,
        email: email.trim(),
        audioVideoLink: audioVideoLink.trim(),
        tower: user?.tower,
        flatNo: user?.flatNumber,
        mobile: user?.phone
      });
      if (res.success) {
        setSuccessMsg(`🎉 Participant "${nameToSubmit}" registered successfully for this activity!`);
        setUserRegistration(res.participant);
        setParticipantName("");
        setAudioVideoLink("");
      }
    } catch (err: any) {
      setError(err?.message || "Registration failed. Please try again.");
    } finally {
      setRegistering(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading activity details..." fullHeight />;
  }

  if (error && !activity) {
    return (
      <div className="w-full max-w-3xl mx-auto px-4 py-16">
        <ErrorAlert message={error} onRetry={loadData} />
        <div className="mt-6 text-center">
          <Link to="/durgotsav/activities" className="text-xs font-bold text-amber-600 hover:underline">
            ← Back to Activities
          </Link>
        </div>
      </div>
    );
  }

  if (!activity) return null;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-8 py-10">
      <div className="mb-6">
        <Link
          to="/durgotsav/activities"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-amber-600 dark:text-stone-400 dark:hover:text-amber-400"
        >
          ← Back to All Activities
        </Link>
      </div>

      <div className="durgotsav-card-glow rounded-3xl border border-amber-300/80 bg-white p-6 sm:p-10 shadow-xl dark:border-amber-900/40 dark:bg-stone-900/90">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                📍 {activity.venue}
              </span>
              {userRegistration && (
                <StatusBadge
                  isWithdraw={userRegistration.isWithdraw}
                  isPerformed={userRegistration.isPerformed}
                  isCertificateCollected={userRegistration.isCertificateCollected}
                />
              )}
            </div>

            <h1 className="mt-4 font-heading text-2xl sm:text-4xl font-black text-stone-900 dark:text-stone-100">
              {activity.activity}
            </h1>

            <p className="mt-2 text-sm font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-2">
              <span>🕒</span>
              <span>{formatDateTimeRange(activity.startDateTime, activity.endDateTime)}</span>
            </p>
          </div>

          {activity.audioVideoLink && (
            <a
              href={activity.audioVideoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-amber-300 px-4 py-2 text-xs font-bold text-amber-700 hover:bg-amber-50 dark:border-amber-800 dark:text-amber-300 dark:hover:bg-amber-950/40 transition"
            >
              🎥 Live Stream / Video Link
            </a>
          )}
        </div>

        {/* Description */}
        <div className="mt-8">
          <h2 className="text-xs font-bold uppercase tracking-wider text-stone-400">
            Event Description & Guidelines
          </h2>
          <p className="mt-2 text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed whitespace-pre-line">
            {activity.description || "No special instructions provided. Please arrive on time at the specified venue."}
          </p>
        </div>

        {/* Registration Section */}
        <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50/50 p-6 dark:border-amber-900/40 dark:bg-amber-950/20">
          {successMsg && (
            <div className="mb-4 rounded-xl bg-emerald-100 p-4 text-xs font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300">
              {successMsg}
            </div>
          )}

          {error && <ErrorAlert message={error} className="mb-4" />}

          {!isAuthenticated ? (
            <div className="text-center sm:text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-heading font-bold text-base text-stone-900 dark:text-stone-100">
                  Ready to participate?
                </h3>
                <p className="mt-0.5 text-xs text-stone-600 dark:text-stone-400">
                  Login with your mobile number to register instantly for this activity.
                </p>
              </div>
              <Link
                to="/durgotsav/login"
                className="inline-flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 px-6 py-3 text-xs font-bold text-white shadow-md hover:from-amber-600 hover:to-rose-700 transition"
              >
                Login to Register
              </Link>
            </div>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-bold text-base text-stone-900 dark:text-stone-100">
                    Register Participant (Family / Self)
                  </h3>
                  <p className="mt-1 text-xs text-stone-600 dark:text-stone-400">
                    Account: <strong>{user?.fullName}</strong> • Phone: <strong>{user?.phone}</strong>
                    {user?.flatNumber ? ` • Flat: ${user.flatNumber}` : ""}
                  </p>
                </div>
                <Link
                  to="/durgotsav/my-registrations"
                  className="text-xs font-bold text-amber-600 hover:underline"
                >
                  My Registrations →
                </Link>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wide">
                  Participant Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={participantName}
                  onChange={(e) => setParticipantName(e.target.value)}
                  className="mt-1 w-full max-w-md rounded-xl border border-stone-300 px-3.5 py-2.5 text-xs text-stone-900 placeholder:text-stone-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wide">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full max-w-md rounded-xl border border-stone-300 px-3.5 py-2.5 text-xs text-stone-900 placeholder:text-stone-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wide">
                  Audio / Video Link (Optional)
                </label>
                <input
                  type="url"
                  placeholder="Paste audio or video link"
                  value={audioVideoLink}
                  onChange={(e) => setAudioVideoLink(e.target.value)}
                  className="mt-1 w-full max-w-md rounded-xl border border-stone-300 px-3.5 py-2.5 text-xs text-stone-900 placeholder:text-stone-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
                />
                <p className="mt-1 text-[11px] text-stone-500">
                  Optional — Admin can use this link during your performance.
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={registering}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 px-8 py-3 text-xs font-bold text-white shadow-lg hover:from-amber-600 hover:to-rose-700 transition disabled:opacity-50"
                >
                  {registering ? (
                    <>
                      <div className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                      <span>Registering...</span>
                    </>
                  ) : (
                    <span>+ Register Participant Now →</span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
