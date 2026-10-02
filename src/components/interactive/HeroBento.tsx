import { Link } from "react-router-dom";
import { ParticleConstellation } from "./ParticleConstellation";

export function HeroBento() {
  return (
    <div className="relative w-full min-h-[56vh] flex flex-col justify-center px-6 sm:px-10 lg:px-16 xl:px-24 pt-6 pb-10 sm:pt-8 sm:pb-14 text-center overflow-hidden">
      {/* Interactive ambient canvas background */}
      <ParticleConstellation className="absolute inset-0 z-0 h-full w-full pointer-events-auto" starCount={220} />

      {/* Subtle Atmospheric Gradient Mesh Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] rounded-full bg-gradient-to-tr from-[#5B47F5]/15 via-[#F5A524]/10 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* 1. Status Kicker Badge */}
      <div className="relative z-10 mx-auto inline-flex items-center gap-2 rounded-full border border-[#E0E0E0] bg-white/95 px-4 py-1.5 text-xs shadow-2xs dark:border-[#393939] dark:bg-[#121212]/95 backdrop-blur-md">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5B47F5] opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#5B47F5]" />
        </span>
        <span className="kicker-mono text-[11px] font-medium text-[#161616] dark:text-[#E0E0E0]">
          Serving India • USA • Middle East • Europe — <strong className="font-bold text-[#5B47F5] dark:text-[#7B74FF]">Global Remote Delivery</strong>
        </span>
      </div>

      {/* 2. High-Impact Modern Headline */}
      <h1 className="relative z-10 mx-auto mt-6 max-w-5xl font-heading text-4xl font-bold tracking-tight text-[#161616] dark:text-[#F4F4F6] sm:text-6xl lg:text-7xl sm:leading-[1.08]">
        Innovate. Build.{" "}
        <span className="bg-gradient-to-r from-[#5B47F5] via-[#7B74FF] to-[#F5A524] bg-clip-text text-transparent">
          Scale.
        </span>
      </h1>

      {/* 3. Punchy, Clear Subtitle */}
      <p className="relative z-10 mx-auto mt-6 max-w-3xl text-base text-[#525252] dark:text-[#C6C6C6] sm:text-xl leading-relaxed font-sans">
        PRANAYANSH Technology is a global software engineering and IT consulting partner — custom software, cloud, AI, and digital transformation for startups, SMBs, and enterprises.
      </p>

      {/* 4. Action Buttons */}
      <div className="relative z-10 mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          to="/get-a-quote"
          state={{ serviceId: "custom-software-development" }}
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-[#5B47F5] px-8 py-4 text-sm font-semibold text-white shadow-md hover:bg-[#4634D6] transition font-sans"
        >
          Get a Free Consultation
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>

        <Link
          to="/services"
          className="inline-flex w-full sm:w-auto items-center justify-center rounded-lg border border-[#393939] bg-white/90 px-8 py-4 text-sm font-semibold text-[#161616] shadow-2xs hover:bg-[#F4F4F4] dark:border-[#4C4C4C] dark:bg-[#121212]/90 dark:text-[#F4F4F6] dark:hover:bg-[#262626] backdrop-blur-md transition font-sans"
        >
          Explore Our 12 Services
        </Link>
      </div>
    </div>
  );
}

