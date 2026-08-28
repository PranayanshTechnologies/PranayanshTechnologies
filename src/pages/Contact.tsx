import { useState } from "react";
import { useLocation } from "react-router-dom";
import { PageMeta } from "../components/layout/PageMeta";
import { ConsentCheckbox } from "../components/forms/ConsentCheckbox";
import { submitForm } from "../lib/submitForm";
import type { ContactInquiry } from "../types/content";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const location = useLocation();
  const contactContext = location.state as { serviceId?: string; subject?: string } | null;
  const [form, setForm] = useState<ContactInquiry>({
    name: "",
    email: "",
    subject: contactContext?.subject ?? "General Technical Inquiry",
    serviceId: contactContext?.serviceId,
    message: "",
    consentAccepted: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactInquiry, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  function validate(): boolean {
    const next: Partial<Record<keyof ContactInquiry, string>> = {};
    if (!form.name.trim()) next.name = "Full name is required.";
    if (!form.email.trim()) {
      next.email = "Email address is required.";
    } else if (!EMAIL_PATTERN.test(form.email)) {
      next.email = "Enter a valid email address.";
    }
    if (!form.message.trim()) next.message = "Message is required.";
    if (!form.consentAccepted) next.consentAccepted = "Consent is required to submit.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    setSubmitError(null);
    const result = await submitForm({ formType: "contact", payload: form });
    if (result.ok) {
      setStatus("success");
    } else {
      setStatus("error");
      setSubmitError(result.error ?? "Submission failed. Please try again.");
    }
  }

  return (
    <>
      <PageMeta
        title="Contact Us | Technical Consultation &amp; Dedicated Squads"
        description="Get in touch with Pranayansh Technologies for custom software development consultations or engineering team advisory."
      />

      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 py-16 sm:py-24">
        {/* Header */}
        <div className="max-w-3xl">
          <span className="kicker-mono text-xs font-bold text-[#FF462D] dark:text-[#FFA699]">
            Get In Touch
          </span>
          <h1 className="mt-2 font-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#161616] dark:text-[#F4F4F4]">
            Speak with an Engineering Director
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#525252] dark:text-[#C6C6C6] leading-relaxed font-sans">
            Have a new product to build or need to augment your team with senior engineers? We respond within 2 business hours.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="clean-card rounded-xl border border-[#E0E0E0] bg-white p-6 sm:p-8 shadow-xs dark:border-[#2D2D2D] dark:bg-[#161616]">
              <span className="kicker-mono text-xs font-bold text-[#FF462D] dark:text-[#FFA699]">Direct Channels</span>
              <h2 className="mt-2 font-heading text-lg font-bold text-[#161616] dark:text-[#F4F4F4]">Global Availability</h2>
              <div className="mt-5 space-y-4 text-xs text-[#525252] dark:text-[#C6C6C6] font-sans">
                <div>
                  <p className="font-bold text-[#161616] dark:text-[#F4F4F4]">Email</p>
                  <a href="mailto:contact@pranayansh.com" className="text-[#FF462D] dark:text-[#FF7561] hover:underline font-medium">
                    contact@pranayansh.com
                  </a>
                </div>
                <div>
                  <p className="font-bold text-[#161616] dark:text-[#F4F4F4]">Phone</p>
                  <p>+1 (800) 555-0199 / +1 (415) 890-3200</p>
                </div>
                <div>
                  <p className="font-bold text-[#161616] dark:text-[#F4F4F4]">Deployment Modes</p>
                  <p>100% Remote, On-Premise at Client Site, or Hybrid</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-[#FFCCC4] bg-[#FFF2F0] p-6 dark:border-[#7E190E] dark:bg-[#2A0E0A]">
              <span className="kicker-mono text-xs font-bold text-[#FF462D] dark:text-[#FFA699]">Instant Scoping</span>
              <h3 className="mt-1 font-heading font-bold text-sm text-[#161616] dark:text-[#F4F4F4]">
                Need an Immediate Quote?
              </h3>
              <p className="mt-1 text-xs text-[#525252] dark:text-[#C6C6C6] font-sans">
                Use our interactive project planner for an instant scope and rate estimate.
              </p>
              <a
                href="/get-a-quote"
                className="mt-3 inline-block text-xs font-bold text-[#FF462D] dark:text-[#FF7561] hover:underline"
              >
                Launch Planner →
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 clean-card rounded-xl border border-[#E0E0E0] bg-white p-6 sm:p-8 shadow-xs dark:border-[#2D2D2D] dark:bg-[#161616]">
            {status === "success" ? (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-6 text-center text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200">
                <h3 className="font-bold text-base">Message Sent!</h3>
                <p className="mt-1 text-xs">We have received your message and will reply within 2 business hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4 font-sans">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#161616] dark:text-[#E0E0E0]">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sarah Jenkins"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={`mt-1 w-full rounded-lg border px-3.5 py-2.5 text-xs shadow-2xs focus:border-[#FF462D] focus:outline-none dark:bg-[#1F1F1F] dark:text-[#F4F4F4] ${
                        errors.name ? "border-red-400" : "border-[#E0E0E0] dark:border-[#393939]"
                      }`}
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#161616] dark:text-[#E0E0E0]">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      placeholder="sarah@company.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={`mt-1 w-full rounded-lg border px-3.5 py-2.5 text-xs shadow-2xs focus:border-[#FF462D] focus:outline-none dark:bg-[#1F1F1F] dark:text-[#F4F4F4] ${
                        errors.email ? "border-red-400" : "border-[#E0E0E0] dark:border-[#393939]"
                      }`}
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#161616] dark:text-[#E0E0E0]">
                    Topic / Subject
                  </label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-[#E0E0E0] bg-white px-3.5 py-2.5 text-xs shadow-2xs focus:border-[#FF462D] focus:outline-none dark:border-[#393939] dark:bg-[#1F1F1F] dark:text-[#F4F4F4]"
                  >
                    {contactContext?.serviceId && contactContext.subject && (
                      <option value={contactContext.subject}>{contactContext.subject}</option>
                    )}
                    <option value="Turnkey Custom Software Project">Turnkey Custom Software Project</option>
                    <option value="Dedicated Engineering Squad (Remote/On-Premise)">Dedicated Engineering Squad (Remote / On-Premise)</option>
                    <option value="Staff Augmentation (48h Match)">Staff Augmentation (48h Match)</option>
                    <option value="General Consultation">General Technical Consultation</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#161616] dark:text-[#E0E0E0]">
                    Message Details *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your project requirements, timeline, or engineering needs..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`mt-1 w-full rounded-lg border px-3.5 py-2.5 text-xs shadow-2xs focus:border-[#FF462D] focus:outline-none dark:bg-[#1F1F1F] dark:text-[#F4F4F4] ${
                      errors.message ? "border-red-400" : "border-[#E0E0E0] dark:border-[#393939]"
                    }`}
                  />
                  {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
                </div>

                <ConsentCheckbox
                  checked={form.consentAccepted}
                  onChange={(checked) => setForm({ ...form, consentAccepted: checked })}
                  id="contact-consent"
                />
                {errors.consentAccepted && (
                  <p className="-mt-2 text-xs text-red-600">{errors.consentAccepted}</p>
                )}

                {status === "error" && submitError && (
                  <p className="text-xs text-red-600">{submitError}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full rounded-lg bg-[#FF462D] px-6 py-3 text-xs font-bold text-white shadow-sm hover:bg-[#E0301E] disabled:opacity-60 transition"
                >
                  {status === "submitting" ? "Sending..." : "Send Message →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
