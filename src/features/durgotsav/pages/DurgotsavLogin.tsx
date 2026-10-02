import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDurgotsavAuth } from "../context/DurgotsavAuthContext";
import { ErrorAlert } from "../components/common/ErrorAlert";
const TOWERS_A_TO_Z: string[] = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

export const DurgotsavLogin: React.FC = () => {
  // Step 1: Mobile verification, Step 2: Profile completion (for new users only)
  const [step, setStep] = useState<1 | 2>(1);
  const [phone, setPhone] = useState("");

  // Step 2 profile fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [society, setSociety] = useState("");
  const [tower, setTower] = useState("A");
  const [floor, setFloor] = useState("");
  const [flatNumber, setFlatNumber] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { checkOrLogin, register, isAuthenticated, isAdmin } = useDurgotsavAuth();
  const navigate = useNavigate();

  // If already authenticated in current session, redirect immediately
  useEffect(() => {
    if (isAuthenticated) {
      if (isAdmin) {
        navigate("/durgotsav/admin", { replace: true });
      } else {
        navigate("/durgotsav/dashboard", { replace: true });
      }
    }
  }, [isAuthenticated, isAdmin, navigate]);

  // Handle Step 1: Mobile Check / Direct Login
  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanPhone = phone.trim().replace(/[^0-9]/g, "");

    if (!cleanPhone) {
      setError("Please enter your 10-digit mobile number.");
      return;
    }

    if (cleanPhone.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await checkOrLogin(cleanPhone);

      if (response.isNewUser) {
        // Case B: New user -> advance to Step 2
        setPhone(cleanPhone);
        setStep(2);
      } else if (response.user) {
        // Case A: Existing user -> navigate directly to Dashboard / Admin
        if (response.user.isAdmin) {
          navigate("/durgotsav/admin", { replace: true });
        } else {
          navigate("/durgotsav/dashboard", { replace: true });
        }
      }
    } catch (err: any) {
      setError(err?.message || "Failed to verify mobile number. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Step 2: Registration Submission
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    // Floor validation (1-50) if entered
    if (floor.trim()) {
      const floorNum = parseInt(floor.trim(), 10);
      if (isNaN(floorNum) || floorNum < 1 || floorNum > 50) {
        setError("Please enter a valid floor number between 1 and 50.");
        return;
      }
    }

    setSubmitting(true);
    try {
      const response = await register({
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        society: society.trim(),
        tower: tower.trim(),
        floor: floor.trim(),
        flatNumber: flatNumber.trim()
      });

      if (response.success && response.user) {
        // Successful registration -> navigate directly to Activity & Durgotsav Dashboard
        navigate("/durgotsav/dashboard", { replace: true });
      }
    } catch (err: any) {
      setError(err?.message || "Registration failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-[75vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Festive Card Container */}
        <div className="durgotsav-card-glow rounded-3xl border border-amber-300/80 bg-white/95 p-8 shadow-xl backdrop-blur-md dark:border-amber-900/40 dark:bg-stone-900/90 transition-all">
          <div className="text-center">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-600 text-3xl shadow-lg">
              🪔
            </span>
            <h1 className="mt-4 font-heading text-2xl font-black text-stone-900 dark:text-stone-100">
              {step === 1 ? "Durgotsav 2026 Login" : "Complete Your Registration"}
            </h1>
            <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
              {step === 1
                ? "Enter your mobile number to participate in community events."
                : "Enter your resident details to complete your Durgotsav profile."}
            </p>
          </div>

          {error && <ErrorAlert message={error} className="mt-6" />}

          {/* ==================== STEP 1: MOBILE NUMBER ==================== */}
          {step === 1 && (
            <form onSubmit={handlePhoneSubmit} className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="phone-input"
                  className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wide"
                >
                  Mobile Number
                </label>
                <div className="relative mt-1">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-xs font-bold text-stone-400">
                    +91
                  </span>
                  <input
                    id="phone-input"
                    type="tel"
                    maxLength={10}
                    autoFocus
                    placeholder="9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-stone-300 pl-12 pr-4 py-3 text-base font-semibold tracking-wide text-stone-900 placeholder:text-stone-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
                  />
                </div>
                <p className="mt-1.5 text-[11px] text-stone-500">
                  🔒 Direct mobile verification. No password or OTP required.
                </p>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 py-3.5 text-sm font-bold text-white shadow-lg hover:from-amber-600 hover:to-rose-700 transition transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <div className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                    <span>Verifying Mobile...</span>
                  </>
                ) : (
                  <span>Continue →</span>
                )}
              </button>
            </form>
          )}

          {/* ==================== STEP 2: PROFILE COMPLETION (NEW USER ONLY) ==================== */}
          {step === 2 && (
            <form onSubmit={handleRegisterSubmit} className="mt-6 space-y-3.5">
              {/* Read-Only Mobile Badge */}
              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wide">
                    Mobile Number
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      setError(null);
                    }}
                    className="text-[11px] font-semibold text-amber-600 hover:underline"
                  >
                    Change Number
                  </button>
                </div>
                <div className="mt-1 rounded-xl bg-stone-100 px-3.5 py-2 text-xs font-bold text-stone-800 dark:bg-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700">
                  📱 +91 {phone}
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wide">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-xs font-semibold text-stone-900 placeholder:text-stone-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wide">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="e.g. manish.kumar@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-xs font-semibold text-stone-900 placeholder:text-stone-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
                />
              </div>

              {/* Tower & Floor */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wide">
                    Tower / Block
                  </label>
                  <select
                    value={tower}
                    onChange={(e) => setTower(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-xs font-semibold text-stone-900 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
                  >
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
                    placeholder="e.g. 5"
                    value={floor}
                    onChange={(e) => setFloor(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-xs font-semibold text-stone-900 placeholder:text-stone-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
                  />
                </div>
              </div>

              {/* Flat Number & Society */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wide">
                    Flat Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. A-502"
                    value={flatNumber}
                    onChange={(e) => setFlatNumber(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-xs font-semibold text-stone-900 placeholder:text-stone-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wide">
                    Society Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ABC Residency"
                    value={society}
                    onChange={(e) => setSociety(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-xs font-semibold text-stone-900 placeholder:text-stone-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 py-3.5 text-sm font-bold text-white shadow-lg hover:from-amber-600 hover:to-rose-700 transition transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <div className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                      <span>Completing Registration...</span>
                    </>
                  ) : (
                    <span>Register & Continue →</span>
                  )}
                </button>
              </div>
            </form>
          )}

          <div className="mt-6 border-t border-stone-200/80 pt-4 text-center text-xs text-stone-500 dark:border-stone-800">
            <span>Durgotsav Community Portal • </span>
            <span className="font-semibold text-stone-700 dark:text-stone-300">
              Safe & Secure
            </span>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/durgotsav"
            className="text-xs font-semibold text-stone-500 hover:text-amber-600 dark:text-stone-400"
          >
            ← Back to Durgotsav Overview
          </Link>
        </div>
      </div>
    </div>
  );
};
