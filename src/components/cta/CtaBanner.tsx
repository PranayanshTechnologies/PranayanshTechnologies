import { Link } from "react-router-dom";

interface CtaBannerProps {
  heading: string;
  body: string;
  ctaLabel: string;
  to: string;
  secondaryLabel?: string;
  secondaryTo?: string;
}

export function CtaBanner({
  heading,
  body,
  ctaLabel,
  to,
  secondaryLabel = "Book 15-Min Call",
  secondaryTo = "/contact",
}: CtaBannerProps) {
  return (
    <div className="mt-20 overflow-hidden rounded-2xl bg-gradient-to-r from-[#FF462D] via-[#E0301E] to-[#BA2212] p-8 sm:p-14 text-center text-white shadow-xl relative w-full">
      {/* Decorative background blur glow */}
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-amber-500/20 blur-2xl" />

      <div className="relative z-10 mx-auto max-w-3xl">
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold">
          <span className="kicker-mono inline-flex items-center gap-1 rounded-md bg-black/20 px-3 py-1 backdrop-blur-md">
            ⚡ 48-Hour Matching
          </span>
          <span className="kicker-mono inline-flex items-center gap-1 rounded-md bg-black/20 px-3 py-1 backdrop-blur-md">
            🛡️ 14-45 Day Trial (45d Freshers)
          </span>
          <span className="kicker-mono inline-flex items-center gap-1 rounded-md bg-black/20 px-3 py-1 backdrop-blur-md">
            🤝 100% IP Ownership
          </span>
        </div>

        <h2 className="mt-6 font-heading text-3xl sm:text-4xl font-bold tracking-tight">{heading}</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm sm:text-base text-[#FFF2F0] leading-relaxed font-sans">
          {body}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Link
            to={to}
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-white px-8 py-3.5 text-sm font-bold text-[#161616] shadow-lg transition hover:bg-[#F4F4F4] font-sans"
          >
            {ctaLabel}
            <svg className="h-4 w-4 text-[#FF462D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>

          <Link
            to={secondaryTo}
            className="inline-flex w-full sm:w-auto items-center justify-center rounded-lg border border-white/40 bg-black/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-black/20 font-sans"
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
