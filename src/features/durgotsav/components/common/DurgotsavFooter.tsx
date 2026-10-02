import React from "react";
import { Link } from "react-router-dom";

export const DurgotsavFooter: React.FC = () => {
  return (
    <footer className="w-full border-t border-amber-200/60 bg-stone-50 py-10 px-6 sm:px-10 lg:px-16 dark:border-amber-900/30 dark:bg-[#0c0a09]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🪔</span>
          <div>
            <p className="font-heading font-bold text-sm text-stone-900 dark:text-stone-100">
              Durgotsav 2026 Community Celebration
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Devotion • Unity • Joyous Cultural Memories
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs text-stone-600 dark:text-stone-400">
          <Link to="/durgotsav" className="hover:text-amber-600 transition">
            Overview
          </Link>
          <Link to="/durgotsav/activities" className="hover:text-amber-600 transition">
            All Events
          </Link>
          <Link to="/durgotsav/login" className="hover:text-amber-600 transition">
            Member Login
          </Link>
          <Link to="/" className="text-amber-600 dark:text-amber-400 font-semibold hover:underline">
            Pranayansh Technologies →
          </Link>
        </div>
      </div>
      <div className="mt-8 pt-4 border-t border-stone-200/60 dark:border-stone-800/60 text-center text-[11px] text-stone-400">
        © 2026 Durgotsav Event Management. Powered by Pranayansh Technologies.
      </div>
    </footer>
  );
};
