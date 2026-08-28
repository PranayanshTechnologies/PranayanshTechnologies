import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function StickyContactBar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 400 && !dismissed) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dismissed]);

  if (!visible || dismissed) return null;

  return (
    <aside
      aria-label="Quick engagement actions"
      className="fixed bottom-4 left-4 right-4 z-40 mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-2xl backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95"
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-2">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white font-bold text-sm shadow-sm">
            ⚡
          </span>
          <div>
            <p className="text-xs font-bold text-slate-900 dark:text-white">
              Need Senior Software Engineers Fast?
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Matched in 48 hours • 14-45 Day Trial (45d Freshers) • Remote &amp; On-Premise
            </p>
          </div>
        </div>

        <div className="flex w-full sm:w-auto items-center gap-2">
          <Link
            to="/get-a-quote"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 rounded-xl bg-brand-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-brand-700 transition"
          >
            Request Engineers
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
          <Link
            to="/services"
            className="hidden sm:inline-flex rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            Compare Models
          </Link>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="Dismiss quick engagement banner"
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            ✕
          </button>
        </div>
      </div>
    </aside>
  );
}
