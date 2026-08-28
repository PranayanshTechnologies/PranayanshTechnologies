import { useState } from "react";
import { useNavigate } from "react-router-dom";

type PlannerMode = "software" | "staffing";

export function CostEstimatorWizard() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<PlannerMode>("software");

  // Software Dev options
  const [projectType, setProjectType] = useState<string>("web-platform");
  const [scopeTier, setScopeTier] = useState<string>("growth");

  // Staffing options
  const [deploymentLocation, setDeploymentLocation] = useState<"remote" | "on-premise">("remote");
  const [teamSize, setTeamSize] = useState<number>(3);
  const [seniority, setSeniority] = useState<"fresher" | "senior" | "lead">("fresher");

  function handleRequestProposal() {
    if (mode === "software") {
      navigate("/get-a-quote", {
        state: {
          serviceId: "software-development",
          projectDescription: `Configured via Planner: Custom ${projectType} (${scopeTier} scope).`,
          timeframe: scopeTier === "mvp" ? "1 - 3 Months" : scopeTier === "growth" ? "3 - 6 Months" : "6+ Months",
        },
      });
    } else {
      const trialText = seniority === "fresher" ? "45-Day Zero-Risk Trial" : "14-Day Risk-Free Trial";
      navigate("/get-a-quote", {
        state: {
          serviceId: "dedicated-crew",
          projectDescription: `Configured via Planner: Dedicated team of ${teamSize}x ${seniority.toUpperCase()} engineers (${deploymentLocation} deployment, ${trialText}).`,
          teamSize,
          seniorityLevel: seniority.toUpperCase(),
          timeframe: "Kickoff in 3 - 5 Days",
        },
      });
    }
  }

  return (
    <div className="clean-card rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {/* Header with Mode Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-6 dark:border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-cyan-400">
            Interactive Scope &amp; Team Planner
          </span>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Configure Your Project Scope &amp; Trial Terms
          </h2>
        </div>

        {/* Tab Switch */}
        <div className="inline-flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
          <button
            type="button"
            onClick={() => setMode("software")}
            className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition ${
              mode === "software"
                ? "bg-white text-brand-700 shadow-xs dark:bg-slate-900 dark:text-brand-300"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            }`}
          >
            🚀 Custom Software Dev
          </button>
          <button
            type="button"
            onClick={() => setMode("staffing")}
            className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition ${
              mode === "staffing"
                ? "bg-white text-brand-700 shadow-xs dark:bg-slate-900 dark:text-brand-300"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            }`}
          >
            👥 Dedicated Squads &amp; Consulting
          </button>
        </div>
      </div>

      {mode === "software" ? (
        /* Software Development Planner */
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7 space-y-6">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                1. Select Product Type
              </label>
              <div className="mt-2.5 grid grid-cols-2 gap-3">
                {[
                  { id: "web-platform", label: "Web Platform & SaaS", desc: "React, Next.js, .NET Core" },
                  { id: "cloud-devops", label: "Cloud & Microservices", desc: "AWS, Azure, Kubernetes" },
                  { id: "mobile-app", label: "Mobile Application", desc: "iOS, Android, Flutter" },
                  { id: "ai-data", label: "AI & Intelligent Data", desc: "Generative AI, LLMs, RAG" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setProjectType(item.id)}
                    className={`rounded-2xl border p-3.5 text-left transition ${
                      projectType === item.id
                        ? "border-brand-600 bg-brand-50/60 ring-2 ring-brand-500/20 dark:border-brand-500 dark:bg-brand-950/40"
                        : "border-slate-200 bg-slate-50/50 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-800/40"
                    }`}
                  >
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100">{item.label}</p>
                    <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                2. Project Scope &amp; Maturity
              </label>
              <div className="mt-2.5 grid grid-cols-3 gap-3">
                {[
                  { id: "mvp", title: "MVP / Proof of Concept", timeline: "4 - 8 Weeks" },
                  { id: "growth", title: "Scale / Full Product", timeline: "3 - 6 Months" },
                  { id: "enterprise", title: "Enterprise Platform", timeline: "6+ Months" },
                ].map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setScopeTier(tier.id)}
                    className={`rounded-2xl border p-3 text-center transition ${
                      scopeTier === tier.id
                        ? "border-brand-600 bg-brand-50/60 ring-2 ring-brand-500/20 dark:border-brand-500 dark:bg-brand-950/40"
                        : "border-slate-200 bg-slate-50/50 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-800/40"
                    }`}
                  >
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100">{tier.title}</p>
                    <p className="mt-0.5 text-[11px] text-brand-600 dark:text-cyan-400 font-semibold">{tier.timeline}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Summary */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-800/60">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Turnkey Engineering Proposal
              </span>
              <p className="mt-3 text-lg font-bold text-slate-900 dark:text-white">
                Milestone-Based Delivery &amp; Warranty
              </p>
              <ul className="mt-4 space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>UI/UX Figma design system &amp; clickable prototype</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Full-stack architecture with automated CI/CD</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Guaranteed delivery milestone SLA &amp; post-launch warranty</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={handleRequestProposal}
                className="w-full rounded-xl bg-brand-600 px-5 py-3 text-xs font-bold text-white shadow-sm hover:bg-brand-700 transition"
              >
                Request Detailed Scope &amp; Proposal →
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Staffing Planner */
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7 space-y-6">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                1. Deployment Format
              </label>
              <div className="mt-2.5 grid grid-cols-2 gap-3">
                {[
                  { id: "remote", label: "Remote Squad", desc: "Full US/EU timezone overlap" },
                  { id: "on-premise", label: "On-Premise / On-Site", desc: "Stationed at your facility" },
                ].map((dep) => (
                  <button
                    key={dep.id}
                    type="button"
                    onClick={() => setDeploymentLocation(dep.id as "remote" | "on-premise")}
                    className={`rounded-2xl border p-3.5 text-left transition ${
                      deploymentLocation === dep.id
                        ? "border-brand-600 bg-brand-50/60 ring-2 ring-brand-500/20 dark:border-brand-500 dark:bg-brand-950/40"
                        : "border-slate-200 bg-slate-50/50 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-800/40"
                    }`}
                  >
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100">{dep.label}</p>
                    <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">{dep.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  2. Experience &amp; Trial Tier
                </label>
                <div className="mt-2 grid grid-cols-3 gap-1.5">
                  {[
                    { id: "fresher", label: "Freshers (0-2y)", trial: "45-Day Trial" },
                    { id: "senior", label: "Senior (5-8y)", trial: "14-Day Trial" },
                    { id: "lead", label: "Lead (8y+)", trial: "14-Day Trial" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSeniority(item.id as "fresher" | "senior" | "lead")}
                      className={`rounded-xl border p-2 text-center transition ${
                        seniority === item.id
                          ? "border-brand-600 bg-brand-50 text-brand-700 dark:border-brand-500 dark:bg-brand-950 dark:text-brand-300 font-bold"
                          : "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-400"
                      }`}
                    >
                      <p className="text-[11px] font-bold">{item.label}</p>
                      <span className={`text-[10px] inline-block mt-0.5 font-semibold ${
                        item.id === "fresher" ? "text-emerald-600 dark:text-emerald-400 font-black" : "text-slate-500 dark:text-slate-400"
                      }`}>
                        {item.trial}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  3. Team Size ({teamSize} Devs)
                </label>
                <div className="mt-2 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-1.5 dark:border-slate-800 dark:bg-slate-800">
                  <button
                    type="button"
                    onClick={() => setTeamSize((s) => Math.max(1, s - 1))}
                    className="h-8 w-8 rounded-lg bg-white text-xs font-bold shadow-xs dark:bg-slate-900"
                  >
                    -
                  </button>
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    {teamSize} {teamSize === 1 ? "Developer" : "Developers"}
                  </span>
                  <button
                    type="button"
                    onClick={() => setTeamSize((s) => Math.min(10, s + 1))}
                    className="h-8 w-8 rounded-lg bg-white text-xs font-bold shadow-xs dark:bg-slate-900"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Special 45-Day Trial Callout for Freshers */}
            {seniority === "fresher" && (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 dark:border-emerald-900 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🎁</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                    Special Program: 45-Day Zero-Risk Trial for Freshers
                  </span>
                </div>
                <p className="mt-1 text-xs text-emerald-800 dark:text-emerald-300 leading-relaxed">
                  Evaluate top engineering graduates and mentored junior developers in your codebase. If you are not completely delighted within <strong>45 days</strong>, you pay zero fees.
                </p>
              </div>
            )}
          </div>

          {/* Right Summary */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-800/60">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Delivery SLA &amp; Guarantees
              </h4>
              <p className="mt-3 text-lg font-bold text-slate-900 dark:text-white">
                Matched &amp; Onboarded in 48 Hours
              </p>
              <ul className="mt-4 space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>
                    {seniority === "fresher"
                      ? "45-Day Zero-Risk Trial Guarantee"
                      : "14-Day Risk-Free Trial Guarantee"}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Top 3% rigorous technical vetting &amp; English fluency</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>
                    {deploymentLocation === "on-premise"
                      ? "On-premise deployment at your headquarters"
                      : "Remote with full US/EU timezone overlap"}
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={handleRequestProposal}
                className="w-full rounded-xl bg-brand-600 px-5 py-3 text-xs font-bold text-white shadow-sm hover:bg-brand-700 transition"
              >
                Request Matched Profiles in 48h →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
