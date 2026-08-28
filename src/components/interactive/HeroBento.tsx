import { useState } from "react";
import { Link } from "react-router-dom";
import { ParticleConstellation } from "./ParticleConstellation";

export function HeroBento() {
  const [activeTab, setActiveTab] = useState<"software" | "staffing">("software");

  return (
    <div className="relative w-full min-h-[85vh] flex flex-col justify-center px-6 sm:px-10 lg:px-16 xl:px-24 pt-16 pb-20 sm:pt-20 sm:pb-24 text-center overflow-hidden">
      {/* Interactive Dynamic Galaxy View Canvas (Cosmic Nebula & Spiral Stars) */}
      <ParticleConstellation className="absolute inset-0 z-0 h-full w-full pointer-events-auto" starCount={220} />

      {/* Subtle Atmospheric Gradient Mesh Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] rounded-full bg-gradient-to-tr from-[#FF462D]/15 via-[#F1C21B]/10 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* 1. Kyndryl-Style Status Kicker Badge */}
      <div className="relative z-10 mx-auto inline-flex items-center gap-2 rounded-full border border-[#E0E0E0] bg-white/95 px-4 py-1.5 text-xs shadow-2xs dark:border-[#393939] dark:bg-[#161616]/95 backdrop-blur-md">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF462D] opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF462D]" />
        </span>
        <span className="kicker-mono text-[11px] font-medium text-[#161616] dark:text-[#E0E0E0]">
          Now Deploying: <strong className="font-bold text-[#FF462D] dark:text-[#FF7561]">Remote &amp; On-Premise Squads</strong>
        </span>
      </div>

      {/* 2. High-Impact Modern Headline in IBM Plex Sans */}
      <h1 className="relative z-10 mx-auto mt-6 max-w-5xl font-heading text-4xl font-bold tracking-tight text-[#161616] dark:text-[#F4F4F4] sm:text-6xl lg:text-7xl sm:leading-[1.08]">
        Software Engineering.{" "}
        <span className="bg-gradient-to-r from-[#FF462D] via-[#FF7561] to-[#F1C21B] bg-clip-text text-transparent">
          Scaled for Velocity.
        </span>
      </h1>

      {/* 3. Punchy, Clear Subtitle */}
      <p className="relative z-10 mx-auto mt-6 max-w-3xl text-base text-[#525252] dark:text-[#C6C6C6] sm:text-xl leading-relaxed font-sans">
        We architect and engineer mission-critical software platforms. When you need extra development muscle, we deploy dedicated senior engineering squads—remotely or on-premise.
      </p>

      {/* 4. Action Buttons in Kyndryl Red & Carbon */}
      <div className="relative z-10 mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          to="/get-a-quote"
          state={{ serviceId: "software-development" }}
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-[#FF462D] px-8 py-4 text-sm font-semibold text-white shadow-md hover:bg-[#E0301E] transition font-sans"
        >
          Start a Project
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>

        <Link
          to="/get-a-quote"
          state={{ serviceId: "dedicated-crew" }}
          className="inline-flex w-full sm:w-auto items-center justify-center rounded-lg border border-[#393939] bg-white/90 px-8 py-4 text-sm font-semibold text-[#161616] shadow-2xs hover:bg-[#F4F4F4] dark:border-[#4C4C4C] dark:bg-[#161616]/90 dark:text-[#F4F4F4] dark:hover:bg-[#262626] backdrop-blur-md transition font-sans"
        >
          Hire Engineering Squad (48h)
        </Link>
      </div>

      {/* 5. Interactive Live Solution Selector Bento Preview */}
      <div className="relative z-10 mt-16 mx-auto w-full max-w-5xl text-left">
        <div className="clean-card rounded-2xl border border-[#E0E0E0] bg-white/95 p-6 sm:p-10 shadow-sm dark:border-[#2D2D2D] dark:bg-[#161616]/95 backdrop-blur-md">
          {/* Bento Mode Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#E0E0E0] pb-5 dark:border-[#2D2D2D]">
            <div>
              <span className="kicker-mono text-[11px] font-bold text-[#FF462D] dark:text-[#FFA699]">
                Core Execution Models
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-[#161616] dark:text-[#F4F4F4]">
                How We Deliver Value to Your Organization
              </h2>
            </div>

            <div className="inline-flex rounded-lg bg-[#F4F4F4] p-1 dark:bg-[#262626] self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setActiveTab("software")}
                className={`rounded-md px-3.5 py-1.5 text-xs font-semibold transition ${
                  activeTab === "software"
                    ? "bg-white text-[#FF462D] shadow-xs dark:bg-[#121212] dark:text-[#FFA699]"
                    : "text-[#525252] hover:text-[#161616] dark:text-[#A8A8A8] dark:hover:text-white"
                }`}
              >
                Turnkey Software
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("staffing")}
                className={`rounded-md px-3.5 py-1.5 text-xs font-semibold transition ${
                  activeTab === "staffing"
                    ? "bg-white text-[#FF462D] shadow-xs dark:bg-[#121212] dark:text-[#FFA699]"
                    : "text-[#525252] hover:text-[#161616] dark:text-[#A8A8A8] dark:hover:text-white"
                }`}
              >
                Dedicated Squads (48h)
              </button>
            </div>
          </div>

          {/* Tab Content Display */}
          {activeTab === "software" ? (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-xl border border-[#E0E0E0] bg-[#F4F4F4]/60 p-5 dark:border-[#2D2D2D] dark:bg-[#1F1F1F]/50">
                <span className="text-xl">💻</span>
                <h3 className="mt-2 text-xs font-bold text-[#161616] dark:text-[#F4F4F4]">Web &amp; SaaS Platforms</h3>
                <p className="mt-1 text-[11px] text-[#525252] dark:text-[#A8A8A8] leading-relaxed">
                  React, Next.js, .NET Core, Node.js. Clean architecture, 60fps UIs, and automated CI/CD.
                </p>
              </div>

              <div className="rounded-xl border border-[#E0E0E0] bg-[#F4F4F4]/60 p-5 dark:border-[#2D2D2D] dark:bg-[#1F1F1F]/50">
                <span className="text-xl">☁️</span>
                <h3 className="mt-2 text-xs font-bold text-[#161616] dark:text-[#F4F4F4]">Cloud &amp; DevOps</h3>
                <p className="mt-1 text-[11px] text-[#525252] dark:text-[#A8A8A8] leading-relaxed">
                  AWS, Azure, Kubernetes, Terraform. Zero-downtime canary deployments and cost reduction.
                </p>
              </div>

              <div className="rounded-xl border border-[#E0E0E0] bg-[#F4F4F4]/60 p-5 dark:border-[#2D2D2D] dark:bg-[#1F1F1F]/50">
                <span className="text-xl">🧠</span>
                <h3 className="mt-2 text-xs font-bold text-[#161616] dark:text-[#F4F4F4]">Applied AI &amp; Mobile</h3>
                <p className="mt-1 text-[11px] text-[#525252] dark:text-[#A8A8A8] leading-relaxed">
                  Flutter mobile apps, enterprise RAG, vector search, and automated LLM agents.
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-xl border border-[#E0E0E0] bg-[#F4F4F4]/60 p-5 dark:border-[#2D2D2D] dark:bg-[#1F1F1F]/50">
                <span className="text-xl">⚡</span>
                <h3 className="mt-2 text-xs font-bold text-[#161616] dark:text-[#F4F4F4]">48-Hour Matching SLA</h3>
                <p className="mt-1 text-[11px] text-[#525252] dark:text-[#A8A8A8] leading-relaxed">
                  Pre-vetted senior engineers (.NET, React, Python, AWS) ready to commit code in 48 hours.
                </p>
              </div>

              <div className="rounded-xl border border-[#E0E0E0] bg-[#F4F4F4]/60 p-5 dark:border-[#2D2D2D] dark:bg-[#1F1F1F]/50">
                <span className="text-xl">🏢</span>
                <h3 className="mt-2 text-xs font-bold text-[#161616] dark:text-[#F4F4F4]">Remote or On-Premise</h3>
                <p className="mt-1 text-[11px] text-[#525252] dark:text-[#A8A8A8] leading-relaxed">
                  Deployed remotely with US/EU timezone overlap or on-premise at your corporate facility.
                </p>
              </div>

              <div className="rounded-xl border border-[#E0E0E0] bg-[#F4F4F4]/60 p-5 dark:border-[#2D2D2D] dark:bg-[#1F1F1F]/50">
                <span className="text-xl">🛡️</span>
                <h3 className="mt-2 text-xs font-bold text-[#161616] dark:text-[#F4F4F4]">14 to 45-Day Trial</h3>
                <p className="mt-1 text-[11px] text-[#525252] dark:text-[#A8A8A8] leading-relaxed">
                  14 days for seniors, and a full 45-day zero-risk trial program for emerging engineers.
                </p>
              </div>
            </div>
          )}

          {/* Quick Action Footer in Bento */}
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-[#E0E0E0] dark:border-[#2D2D2D]">
            <span className="text-xs text-[#525252] dark:text-[#A8A8A8] font-mono">
              Direct IP Ownership • Strict NDAs • Zero Recruitment Fees
            </span>
            <Link
              to="/get-a-quote"
              state={{ serviceId: activeTab === "software" ? "software-development" : "dedicated-crew" }}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#FF462D] hover:text-[#BA2212] dark:text-[#FF7561]"
            >
              Get Custom Scope &amp; Rates →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
