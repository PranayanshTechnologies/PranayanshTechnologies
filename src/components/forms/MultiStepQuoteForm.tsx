import { useState } from "react";
import { ConsentCheckbox } from "./ConsentCheckbox";
import { submitForm } from "../../lib/submitForm";
import type { QuoteRequest } from "../../types/content";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface MultiStepQuoteFormProps {
  initialState?: Partial<QuoteRequest>;
}

export function MultiStepQuoteForm({ initialState }: MultiStepQuoteFormProps) {
  const [step, setStep] = useState<number>(1);
  const [form, setForm] = useState<QuoteRequest>({
    name: initialState?.name ?? "",
    company: initialState?.company ?? "",
    email: initialState?.email ?? "",
    phone: initialState?.phone ?? "",
    serviceId: initialState?.serviceId ?? "software-development",
    technologyNeed: initialState?.technologyNeed ?? "",
    timeframe: initialState?.timeframe ?? "Within 1 Month",
    seniorityLevel: initialState?.seniorityLevel ?? "SENIOR",
    teamSize: initialState?.teamSize ?? 2,
    projectDescription: initialState?.projectDescription ?? "",
    preferredContactMethod: initialState?.preferredContactMethod ?? "discovery-call",
    consentAccepted: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof QuoteRequest, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  function validateStep(currentStep: number): boolean {
    const next: Partial<Record<keyof QuoteRequest, string>> = {};

    if (currentStep === 1) {
      if (!form.serviceId) next.serviceId = "Please select an engagement type.";
    } else if (currentStep === 2) {
      if (!form.name.trim()) next.name = "Full name is required.";
      if (!form.company.trim()) next.company = "Company is required.";
      if (!form.email.trim()) {
        next.email = "Work email is required.";
      } else if (!EMAIL_PATTERN.test(form.email)) {
        next.email = "Enter a valid work email.";
      }
      if (!form.consentAccepted) {
        next.consentAccepted = "Consent is required to submit.";
      }
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleNext() {
    if (validateStep(1)) {
      setStep(2);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateStep(2)) return;

    setStatus("submitting");
    setSubmitError(null);

    const result = await submitForm({ formType: "quote", payload: form });
    if (result.ok) {
      setStatus("success");
    } else {
      setStatus("error");
      setSubmitError(result.error ?? "Submission failed. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50/50 p-8 sm:p-10 text-center dark:border-emerald-900 dark:bg-emerald-950/30">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/60 dark:text-emerald-300">
          ✓
        </div>
        <h2 className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
          Proposal Request Received
        </h2>
        <p className="mx-auto mt-2 max-w-md text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Thank you, <span className="font-semibold text-slate-900 dark:text-white">{form.name}</span>. An Engineering Director is reviewing your requirements and will reach out to <span className="font-semibold text-slate-900 dark:text-white">{form.email}</span> within 2 business hours.
        </p>
      </div>
    );
  }

  return (
    <div className="clean-card rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs dark:border-slate-800 dark:bg-slate-900">
      {/* Step Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Step {step} of 2
          </span>
          <h2 className="mt-0.5 text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            {step === 1 ? "1. What are you looking to build or staff?" : "2. How can we deliver your proposal?"}
          </h2>
        </div>
        <div className="flex gap-1.5">
          <div className={`h-2 w-8 rounded-full ${step >= 1 ? "bg-brand-600" : "bg-slate-200 dark:bg-slate-700"}`} />
          <div className={`h-2 w-8 rounded-full ${step >= 2 ? "bg-brand-600" : "bg-slate-200 dark:bg-slate-700"}`} />
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
        {step === 1 ? (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Engagement Objective
              </label>
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: "software-development", label: "Custom Software Dev", sub: "Turnkey Product Delivery" },
                  { id: "dedicated-crew", label: "Dedicated Pod", sub: "Remote / On-Premise" },
                  { id: "on-demand-resources", label: "Staff Augmentation", sub: "Hourly 48h Match" },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setForm({ ...form, serviceId: s.id })}
                    className={`rounded-2xl border p-3 text-left transition ${
                      form.serviceId === s.id
                        ? "border-brand-600 bg-brand-50/60 ring-2 ring-brand-500/20 dark:border-brand-500 dark:bg-brand-950/40"
                        : "border-slate-200 bg-slate-50/50 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-800/40"
                    }`}
                  >
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100">{s.label}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{s.sub}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Technology Focus (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. React, .NET Core, AWS, Python, Flutter"
                value={form.technologyNeed}
                onChange={(e) => setForm({ ...form, technologyNeed: e.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs shadow-2xs focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Project Overview or Role Requirements
              </label>
              <textarea
                rows={3}
                placeholder="Briefly describe what you need built, target timeline, or team requirements..."
                value={form.projectDescription}
                onChange={(e) => setForm({ ...form, projectDescription: e.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs shadow-2xs focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Alex Smith"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={`mt-1 w-full rounded-xl border px-3.5 py-2.5 text-xs shadow-2xs focus:border-brand-500 focus:outline-none dark:bg-slate-800 dark:text-slate-100 ${
                    errors.name ? "border-red-400" : "border-slate-300 dark:border-slate-700"
                  }`}
                />
                {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Company / Organization *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Acme Tech"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className={`mt-1 w-full rounded-xl border px-3.5 py-2.5 text-xs shadow-2xs focus:border-brand-500 focus:outline-none dark:bg-slate-800 dark:text-slate-100 ${
                    errors.company ? "border-red-400" : "border-slate-300 dark:border-slate-700"
                  }`}
                />
                {errors.company && <p className="mt-1 text-xs text-red-600">{errors.company}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Work Email *
                </label>
                <input
                  type="email"
                  placeholder="alex@company.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={`mt-1 w-full rounded-xl border px-3.5 py-2.5 text-xs shadow-2xs focus:border-brand-500 focus:outline-none dark:bg-slate-800 dark:text-slate-100 ${
                    errors.email ? "border-red-400" : "border-slate-300 dark:border-slate-700"
                  }`}
                />
                {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Phone (Optional)
                </label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs shadow-2xs focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>
            </div>

            <ConsentCheckbox
              checked={form.consentAccepted}
              onChange={(checked) => setForm({ ...form, consentAccepted: checked })}
            />
            {errors.consentAccepted && (
              <p className="-mt-2 text-xs text-red-600">{errors.consentAccepted}</p>
            )}

            {status === "error" && submitError && (
              <p className="text-xs text-red-600">{submitError}</p>
            )}
          </div>
        )}

        {/* Buttons */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
          {step === 2 ? (
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400"
            >
              ← Back to Step 1
            </button>
          ) : <div />}

          {step === 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="rounded-xl bg-brand-600 px-6 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-brand-700 transition"
            >
              Continue to Step 2 →
            </button>
          ) : (
            <button
              type="submit"
              disabled={status === "submitting"}
              className="rounded-xl bg-brand-600 px-6 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-brand-700 disabled:opacity-60 transition"
            >
              {status === "submitting" ? "Submitting..." : "Request Proposal & Estimate"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
