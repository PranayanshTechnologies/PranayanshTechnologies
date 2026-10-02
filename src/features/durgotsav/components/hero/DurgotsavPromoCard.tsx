import React from "react";
import { Link } from "react-router-dom";

/**
 * Temporary Durgotsav Promotional Card for Pranayansh Technologies Hero Section.
 * Designed to be 100% self-contained and easily removable post-festival.
 */
export const DurgotsavPromoCard: React.FC = () => {
  return (
    <div className="relative z-10 mx-auto mt-7 w-full max-w-2xl overflow-hidden rounded-2xl border border-amber-400/40 bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-amber-500/10 p-4 sm:p-5 shadow-lg backdrop-blur-md dark:border-amber-500/30 dark:bg-stone-900/80 transition-all hover:border-amber-500/60 hover:shadow-xl">
      {/* Decorative ambient background accents */}
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-amber-400/20 blur-2xl pointer-events-none" />
      <div className="absolute -left-8 -bottom-8 h-24 w-24 rounded-full bg-rose-500/20 blur-2xl pointer-events-none" />

      <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 to-rose-600 text-2xl shadow-md">
            🪔
          </div>
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="font-heading font-black text-sm tracking-tight text-stone-900 dark:text-white">
                Durgotsav 2026
              </span>
              <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wide">
                Special Event
              </span>
            </div>
            <p className="mt-0.5 text-xs text-stone-600 dark:text-stone-300 font-sans">
              Join the Celebration • Explore Events & Participate Online
            </p>
          </div>
        </div>

        <Link
          to="/durgotsav"
          className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 px-5 py-2.5 text-xs font-bold text-white shadow-md transition hover:from-amber-600 hover:to-rose-700 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          <span>Explore Durgotsav</span>
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
};
