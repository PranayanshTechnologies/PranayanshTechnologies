import { useState, useMemo, useRef } from "react";
import { PageMeta } from "../components/layout/PageMeta";
import { ConsentCheckbox } from "../components/forms/ConsentCheckbox";
import { technologies } from "../data/technologies";
import { jobListings, type JobListing } from "../data/jobs";
import { submitForm } from "../lib/submitForm";
import type { CandidateInterestSubmission } from "../types/content";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Careers() {
  // Job Board Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState<string>("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);

  // Application Form State
  const formRef = useRef<HTMLDivElement | null>(null);
  const [selectedRoleTitle, setSelectedRoleTitle] = useState<string>("");

  const [form, setForm] = useState<CandidateInterestSubmission>({
    name: "",
    email: "",
    phone: "",
    linkedInOrGithub: "",
    yearsOfExperience: "5-8 Years",
    technologyBackground: ["react", "dotnet", "aws"],
    preferredEngagementType: "dedicated",
    consentAccepted: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CandidateInterestSubmission, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Filter Jobs
  const filteredJobs = useMemo(() => {
    return jobListings.filter((job) => {
      const matchesSearch =
        searchQuery === "" ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDept = selectedDept === "all" || job.department === selectedDept;

      const matchesLocation =
        selectedLocation === "all" ||
        (selectedLocation === "india" && job.location.includes("India")) ||
        (selectedLocation === "remote" && (job.location.includes("Remote") || job.location.includes("US"))) ||
        (selectedLocation === "onpremise" && job.location.includes("On-Premise"));

      const matchesType =
        selectedType === "all" ||
        (selectedType === "emerging" && job.type.includes("Emerging")) ||
        (selectedType === "dedicated" && job.type.includes("Dedicated")) ||
        (selectedType === "contract" && job.type.includes("Contract"));

      return matchesSearch && matchesDept && matchesLocation && matchesType;
    });
  }, [searchQuery, selectedDept, selectedLocation, selectedType]);

  function handleApplyForJob(job: JobListing) {
    setSelectedRoleTitle(job.title);
    setForm((prev) => ({
      ...prev,
      yearsOfExperience:
        job.experienceLevel === "Junior / Emerging (0-2y)"
          ? "0-2 Years"
          : job.experienceLevel === "Mid-Level (3-5y)"
          ? "3-5 Years"
          : job.experienceLevel === "Senior (5-8y)"
          ? "5-8 Years"
          : "8+ Years",
    }));

    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function toggleTechnology(id: string) {
    setForm((prev) => ({
      ...prev,
      technologyBackground: prev.technologyBackground.includes(id)
        ? prev.technologyBackground.filter((t) => t !== id)
        : [...prev.technologyBackground, id],
    }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof CandidateInterestSubmission, string>> = {};
    if (!form.name.trim()) next.name = "Full name is required.";
    if (!form.email.trim()) {
      next.email = "Email address is required.";
    } else if (!EMAIL_PATTERN.test(form.email)) {
      next.email = "Enter a valid email address.";
    }
    if (form.technologyBackground.length === 0) {
      next.technologyBackground = "Select at least one technology.";
    }
    if (!form.consentAccepted) next.consentAccepted = "Consent is required to submit.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    setSubmitError(null);
    const result = await submitForm({
      formType: "career",
      payload: {
        ...form,
        preferredEngagementType: selectedRoleTitle
          ? (`Applying for: ${selectedRoleTitle}` as any)
          : form.preferredEngagementType,
      },
    });

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
        title="Open Engineering Roles &amp; Talent Bench | Pranayansh Technologies"
        description="Explore open engineering positions across India, US, and EU timezones. Join the Pranayansh talent bench for high-impact software delivery."
      />

      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 py-16 sm:py-24">
        {/* 1. Header with Kicker */}
        <div className="max-w-4xl">
          <span className="kicker-mono text-xs font-bold text-[#FF462D] dark:text-[#FFA699]">
            Careers &amp; Engineering Talent Bench
          </span>
          <h1 className="mt-2 font-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#161616] dark:text-[#F4F4F4]">
            Build Mission-Critical Software with Global Teams
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#525252] dark:text-[#C6C6C6] leading-relaxed font-sans">
            Join high-velocity dedicated engineering squads. We offer remote and hybrid opportunities with competitive compensation and transparent career progression.
          </p>
        </div>

        {/* 2. Key Perks Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="clean-card rounded-xl border border-[#E0E0E0] bg-white p-6 dark:border-[#2D2D2D] dark:bg-[#161616]">
            <span className="text-2xl">🇮🇳 / 🌐</span>
            <h3 className="mt-3 font-heading text-base font-bold text-[#161616] dark:text-[#F4F4F4]">
              India (IST) &amp; Global Hubs
            </h3>
            <p className="mt-1.5 text-xs text-[#525252] dark:text-[#A8A8A8] font-sans leading-relaxed">
              Work in IST business hours from New Delhi, Mohali, Bangalore, Hyderabad, Pune, or remotely across India and international client teams.
            </p>
          </div>

          <div className="clean-card rounded-xl border border-[#E0E0E0] bg-white p-6 dark:border-[#2D2D2D] dark:bg-[#161616]">
            <span className="text-2xl">🎓</span>
            <h3 className="mt-3 font-heading text-base font-bold text-[#161616] dark:text-[#F4F4F4]">
              Mentored Emerging Talent Track
            </h3>
            <p className="mt-1.5 text-xs text-[#525252] dark:text-[#A8A8A8] font-sans leading-relaxed">
              Accelerated launchpad for emerging developers with dedicated 1-on-1 technical mentorship from principal architects.
            </p>
          </div>

          <div className="clean-card rounded-xl border border-[#E0E0E0] bg-white p-6 dark:border-[#2D2D2D] dark:bg-[#161616]">
            <span className="text-2xl">⚡</span>
            <h3 className="mt-3 font-heading text-base font-bold text-[#161616] dark:text-[#F4F4F4]">
              Competitive Above-Market Pay
            </h3>
            <p className="mt-1.5 text-xs text-[#525252] dark:text-[#A8A8A8] font-sans leading-relaxed">
              Predictable, competitive compensation packages aligned with modern enterprise tech industry benchmarks.
            </p>
          </div>
        </div>

        {/* 3. Open Positions & Search Section */}
        <div className="mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <span className="kicker-mono text-xs font-bold text-[#FF462D] dark:text-[#FFA699]">
                Live Opportunities
              </span>
              <h2 className="mt-1 font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#161616] dark:text-[#F4F4F4]">
                Explore Open Positions ({filteredJobs.length} Roles)
              </h2>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="mt-8 rounded-xl border border-[#E0E0E0] bg-[#F4F4F4] p-5 dark:border-[#2D2D2D] dark:bg-[#1F1F1F]">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Search by keyword/tech */}
              <div>
                <label className="kicker-mono text-[10px] font-bold text-[#8D8D8D]">Search Keyword / Tech</label>
                <div className="relative mt-1">
                  <input
                    type="text"
                    placeholder="e.g. React, .NET, Node.js, AWS, Python..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-lg border border-[#E0E0E0] bg-white px-3 py-2 text-xs shadow-2xs focus:border-[#FF462D] focus:outline-none dark:border-[#393939] dark:bg-[#161616] dark:text-[#F4F4F4]"
                  />
                </div>
              </div>

              {/* Department */}
              <div>
                <label className="kicker-mono text-[10px] font-bold text-[#8D8D8D]">Department</label>
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-[#E0E0E0] bg-white px-3 py-2 text-xs shadow-2xs focus:border-[#FF462D] focus:outline-none dark:border-[#393939] dark:bg-[#161616] dark:text-[#F4F4F4]"
                >
                  <option value="all">All Departments</option>
                  <option value="Engineering">Engineering &amp; Architecture</option>
                  <option value="Cloud & DevOps">Cloud &amp; DevOps</option>
                  <option value="AI & Data">AI &amp; Data Systems</option>
                  <option value="Mobile">Mobile Engineering</option>
                </select>
              </div>

              {/* Location & Timezone */}
              <div>
                <label className="kicker-mono text-[10px] font-bold text-[#8D8D8D]">Location &amp; Timezone</label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-[#E0E0E0] bg-white px-3 py-2 text-xs shadow-2xs focus:border-[#FF462D] focus:outline-none dark:border-[#393939] dark:bg-[#161616] dark:text-[#F4F4F4]"
                >
                  <option value="all">All Locations</option>
                  <option value="india">🇮🇳 India (IST Timezone / New Delhi / Mohali / Bangalore / Hyd / Pune)</option>
                  <option value="remote">🌐 Remote (US / EU / Global Timezones)</option>
                  <option value="onpremise">🏢 On-Premise (Client HQ)</option>
                </select>
              </div>

              {/* Track */}
              <div>
                <label className="kicker-mono text-[10px] font-bold text-[#8D8D8D]">Engagement Track</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-[#E0E0E0] bg-white px-3 py-2 text-xs shadow-2xs focus:border-[#FF462D] focus:outline-none dark:border-[#393939] dark:bg-[#161616] dark:text-[#F4F4F4]"
                >
                  <option value="all">All Tracks</option>
                  <option value="dedicated">Full-Time Dedicated</option>
                  <option value="emerging">Emerging Talent Track</option>
                  <option value="contract">Contract Squads</option>
                </select>
              </div>
            </div>
          </div>

          {/* Job List Cards (Salary removed from top, shown inside View Details) */}
          <div className="mt-8 space-y-4">
            {filteredJobs.length === 0 ? (
              <div className="rounded-xl border border-[#E0E0E0] bg-white p-8 text-center dark:border-[#2D2D2D] dark:bg-[#161616]">
                <p className="font-bold text-sm text-[#161616] dark:text-[#F4F4F4]">No positions match your filter criteria.</p>
                <p className="text-xs text-[#525252] dark:text-[#A8A8A8] mt-1">
                  Try adjusting your search terms or apply to our general talent bench below!
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedDept("all");
                    setSelectedLocation("all");
                    setSelectedType("all");
                  }}
                  className="mt-4 rounded-lg bg-[#FF462D] px-4 py-2 text-xs font-semibold text-white"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              filteredJobs.map((job) => {
                const isExpanded = expandedJobId === job.id;
                return (
                  <div
                    key={job.id}
                    className="clean-card rounded-xl border border-[#E0E0E0] bg-white p-6 shadow-xs dark:border-[#2D2D2D] dark:bg-[#161616]"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="kicker-mono text-[10px] font-bold text-[#FF462D] dark:text-[#FFA699] bg-[#FFF2F0] dark:bg-[#2A0E0A] px-2.5 py-0.5 rounded-md">
                            {job.department}
                          </span>
                          <span className="font-mono text-[11px] text-[#525252] dark:text-[#A8A8A8] bg-[#F4F4F4] dark:bg-[#1F1F1F] px-2.5 py-0.5 rounded-md">
                            📍 {job.location}
                          </span>
                          <span className="font-mono text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-md">
                            {job.type}
                          </span>
                          <span className="font-mono text-[11px] text-[#525252] dark:text-[#A8A8A8] bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-md">
                            Exp: {job.experienceLevel}
                          </span>
                        </div>

                        <h3 className="mt-3 font-heading text-lg sm:text-xl font-bold text-[#161616] dark:text-[#F4F4F4]">
                          {job.title}
                        </h3>

                        <p className="mt-1 text-xs text-[#525252] dark:text-[#C6C6C6] font-sans">
                          {job.description}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {job.technologies.map((t) => (
                            <span
                              key={t}
                              className="font-mono text-[10px] text-[#525252] dark:text-[#C6C6C6] border border-[#E0E0E0] dark:border-[#393939] px-2 py-0.5 rounded"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action buttons (Clean without salary on top) */}
                      <div className="flex items-center gap-2.5 shrink-0 self-start lg:self-center">
                        <button
                          type="button"
                          onClick={() => setExpandedJobId(isExpanded ? null : job.id)}
                          className="rounded-lg border border-[#E0E0E0] px-3.5 py-2 text-xs font-medium text-[#525252] hover:bg-[#F4F4F4] dark:border-[#393939] dark:text-[#C6C6C6] dark:hover:bg-[#1F1F1F] transition"
                        >
                          {isExpanded ? "Hide Details" : "View Details"}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleApplyForJob(job)}
                          className="rounded-lg bg-[#FF462D] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#E0301E] transition"
                        >
                          Apply Now →
                        </button>
                      </div>
                    </div>

                    {/* Expandable Details with Salary Range & Expectations */}
                    {isExpanded && (
                      <div className="mt-6 pt-5 border-t border-[#E0E0E0] dark:border-[#2D2D2D] space-y-5 text-xs text-[#525252] dark:text-[#C6C6C6] font-sans">
                        {/* Compensation Row inside details */}
                        <div className="rounded-lg bg-[#F4F4F4] p-4 dark:bg-[#1F1F1F] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border border-[#E0E0E0] dark:border-[#2D2D2D]">
                          <div>
                            <p className="kicker-mono text-[10px] font-bold text-[#8D8D8D]">Target Compensation Range</p>
                            <p className="font-mono text-sm sm:text-base font-bold text-[#FF462D] dark:text-[#FF7561] mt-0.5">
                              {job.salaryRange}
                            </p>
                          </div>
                          <div className="text-left sm:text-right">
                            <p className="kicker-mono text-[10px] font-bold text-[#8D8D8D]">Experience Tier</p>
                            <p className="font-mono text-xs font-semibold text-[#161616] dark:text-[#F4F4F4] mt-0.5">
                              {job.experienceLevel}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <p className="kicker-mono text-[11px] font-bold text-[#161616] dark:text-[#F4F4F4]">Key Responsibilities</p>
                            <ul className="mt-2 space-y-1.5">
                              {job.responsibilities.map((r, i) => (
                                <li key={i} className="flex items-start gap-1.5">
                                  <span className="text-[#FF462D] font-bold">▪</span>
                                  <span>{r}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <p className="kicker-mono text-[11px] font-bold text-[#161616] dark:text-[#F4F4F4]">Requirements &amp; Qualifications</p>
                            <ul className="mt-2 space-y-1.5">
                              {job.requirements.map((req, i) => (
                                <li key={i} className="flex items-start gap-1.5">
                                  <span className="text-[#FF462D] font-bold">▪</span>
                                  <span>{req}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* 4. Apply to Talent Bench — Submit Your Technical Profile (Clean Experience Levels, No Trial Mentions) */}
        <div ref={formRef} className="mt-24 max-w-4xl mx-auto">
          <div className="clean-card rounded-2xl border-2 border-[#FF462D]/30 bg-white p-8 sm:p-12 shadow-md dark:border-[#FF462D]/20 dark:bg-[#161616]">
            {/* Form Header */}
            <div className="border-b border-[#E0E0E0] pb-6 dark:border-[#2D2D2D]">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="kicker-mono text-xs font-bold text-[#FF462D] dark:text-[#FFA699]">
                  Fast-Track Application
                </span>
                <span className="font-mono text-[11px] bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 font-bold px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-900">
                  ⚡ 48-Hour Technical Review SLA
                </span>
              </div>

              <h2 className="mt-2 font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#161616] dark:text-[#F4F4F4]">
                Apply to Talent Bench — Submit Your Technical Profile
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[#525252] dark:text-[#A8A8A8] font-sans">
                {selectedRoleTitle
                  ? `You are applying for: ${selectedRoleTitle}`
                  : "Join our pre-vetted bench for remote and on-premise dedicated client engagements across India and global hubs."}
              </p>
            </div>

            {status === "success" ? (
              <div className="mt-8 rounded-xl border border-emerald-200 bg-emerald-50/70 p-8 text-center text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-200">
                <span className="text-3xl">🎉</span>
                <h3 className="mt-3 font-heading font-bold text-lg">Application Submitted Successfully!</h3>
                <p className="mt-2 text-xs sm:text-sm max-w-md mx-auto">
                  Our engineering talent directors will review your technical profile and GitHub/LinkedIn links within 24–48 hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setStatus("idle");
                    setSelectedRoleTitle("");
                  }}
                  className="mt-5 rounded-lg bg-[#FF462D] px-5 py-2 text-xs font-bold text-white shadow-xs"
                >
                  Submit Another Profile
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-6 font-sans">
                {/* Step 1: Clean Experience Level (No Trial Mention) */}
                <div>
                  <label className="kicker-mono text-xs font-bold text-[#161616] dark:text-[#F4F4F4]">
                    1. Select Experience Level *
                  </label>
                  <div className="mt-2.5 grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: "0-2 Years", label: "0-2 Years", desc: "Emerging / Junior Developer" },
                      { id: "3-5 Years", label: "3-5 Years", desc: "Mid-Level Software Engineer" },
                      { id: "5-8 Years", label: "5-8 Years", desc: "Senior Software Engineer" },
                      { id: "8+ Years", label: "8+ Years", desc: "Lead / Principal Architect" },
                    ].map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setForm({ ...form, yearsOfExperience: s.id })}
                        className={`rounded-xl border p-3.5 text-center transition ${
                          form.yearsOfExperience === s.id
                            ? "border-[#FF462D] bg-[#FFF2F0] text-[#FF462D] dark:border-[#FF462D] dark:bg-[#2A0E0A] dark:text-[#FFA699] font-bold ring-1 ring-[#FF462D]"
                            : "border-[#E0E0E0] bg-[#F4F4F4] text-[#525252] dark:border-[#393939] dark:bg-[#1F1F1F] dark:text-[#C6C6C6]"
                        }`}
                      >
                        <p className="text-xs font-bold">{s.label}</p>
                        <p className="mt-1 text-[10px] text-[#8D8D8D] font-medium">{s.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Tech Stack selection */}
                <div>
                  <label className="kicker-mono text-xs font-bold text-[#161616] dark:text-[#F4F4F4]">
                    2. Core Technology Stack * (Select all that apply)
                  </label>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {technologies.map((tech) => {
                      const isSelected = form.technologyBackground.includes(tech.id);
                      return (
                        <button
                          type="button"
                          key={tech.id}
                          onClick={() => toggleTechnology(tech.id)}
                          className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
                            isSelected
                              ? "bg-[#FF462D] text-white shadow-2xs"
                              : "bg-[#F4F4F4] text-[#525252] hover:bg-[#E0E0E0] dark:bg-[#1F1F1F] dark:text-[#C6C6C6] dark:hover:bg-[#262626]"
                          }`}
                        >
                          {isSelected && <span className="mr-1">✓</span>}
                          {tech.name}
                        </button>
                      );
                    })}
                  </div>
                  {errors.technologyBackground && (
                    <p className="mt-1 text-xs text-red-600">{errors.technologyBackground}</p>
                  )}
                </div>

                {/* Step 3: Contact & Links */}
                <div>
                  <label className="kicker-mono text-xs font-bold text-[#161616] dark:text-[#F4F4F4]">
                    3. Contact &amp; Portfolio Links *
                  </label>
                  <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Full Legal Name *"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={`w-full rounded-lg border px-3.5 py-2.5 text-xs shadow-2xs focus:border-[#FF462D] focus:outline-none dark:bg-[#1F1F1F] dark:text-[#F4F4F4] ${
                          errors.name ? "border-red-400" : "border-[#E0E0E0] dark:border-[#393939]"
                        }`}
                      />
                      {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                    </div>

                    <div>
                      <input
                        type="email"
                        placeholder="Primary Work Email *"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={`w-full rounded-lg border px-3.5 py-2.5 text-xs shadow-2xs focus:border-[#FF462D] focus:outline-none dark:bg-[#1F1F1F] dark:text-[#F4F4F4] ${
                          errors.email ? "border-red-400" : "border-[#E0E0E0] dark:border-[#393939]"
                        }`}
                      />
                      {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                    </div>

                    <div>
                      <input
                        type="text"
                        placeholder="LinkedIn Profile URL"
                        value={form.linkedInOrGithub}
                        onChange={(e) => setForm({ ...form, linkedInOrGithub: e.target.value })}
                        className="w-full rounded-lg border border-[#E0E0E0] bg-white px-3.5 py-2.5 text-xs shadow-2xs focus:border-[#FF462D] focus:outline-none dark:border-[#393939] dark:bg-[#1F1F1F] dark:text-[#F4F4F4]"
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        placeholder="GitHub / GitLab / Portfolio URL"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full rounded-lg border border-[#E0E0E0] bg-white px-3.5 py-2.5 text-xs shadow-2xs focus:border-[#FF462D] focus:outline-none dark:border-[#393939] dark:bg-[#1F1F1F] dark:text-[#F4F4F4]"
                      />
                    </div>
                  </div>
                </div>

                <ConsentCheckbox
                  checked={form.consentAccepted}
                  onChange={(checked) => setForm({ ...form, consentAccepted: checked })}
                  id="career-consent"
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
                  className="w-full rounded-xl bg-[#FF462D] px-6 py-4 text-xs font-bold text-white shadow-md hover:bg-[#E0301E] disabled:opacity-60 transition font-sans tracking-wider uppercase"
                >
                  {status === "submitting" ? "Submitting Profile..." : "Submit Technical Profile (48h Review) →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
