import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDurgotsavAuth } from "../../context/DurgotsavAuthContext";

export const DurgotsavNavbar: React.FC = () => {
  const { user, isAuthenticated, isAdmin, logout } = useDurgotsavAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/durgotsav/login");
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
      isActive
        ? "bg-amber-500/15 text-amber-700 dark:text-amber-400 dark:bg-amber-500/20 shadow-2xs font-bold"
        : "text-stone-600 hover:text-stone-900 hover:bg-stone-100 dark:text-stone-300 dark:hover:text-white dark:hover:bg-stone-800"
    }`;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-amber-200/60 bg-white/95 backdrop-blur-md dark:border-amber-900/30 dark:bg-[#0c0a09]/95 transition-colors">
      {/* Top micro-banner */}
      <div className="w-full bg-gradient-to-r from-amber-600 via-rose-600 to-amber-700 px-4 py-1 text-center text-[11px] font-medium text-white">
        <span>✨ Durgotsav 2026 Celebration • Society Event Management Portal ✨</span>
      </div>

      <div className="w-full px-4 sm:px-8 lg:px-12 py-3 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3">
          <Link
            to="/durgotsav"
            className="flex items-center gap-2 group focus:outline-none"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 to-rose-600 text-lg shadow-md group-hover:scale-105 transition">
              🪔
            </span>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-black text-base tracking-tight text-stone-900 dark:text-stone-100">
                  Durgotsav <span className="text-amber-600 dark:text-amber-400">2026</span>
                </span>
                <span className="rounded-full bg-amber-100 px-1.5 py-0.2 text-[9px] font-bold text-amber-800 dark:bg-amber-900/60 dark:text-amber-300 uppercase">
                  Puja
                </span>
              </div>
              <p className="text-[10px] text-stone-500 dark:text-stone-400 leading-none">
                Community Event Portal
              </p>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-2">
          <NavLink to="/durgotsav" end className={navLinkClass}>
            Overview
          </NavLink>
          {isAuthenticated && (
            <NavLink to="/durgotsav/dashboard" className={navLinkClass}>
              Dashboard
            </NavLink>
          )}
          {isAuthenticated && isAdmin && (
            <NavLink to="/durgotsav/admin/activities" className={navLinkClass}>
              Activities
            </NavLink>
          )}

          {isAuthenticated && (
            <NavLink to="/durgotsav/my-registrations" className={navLinkClass}>
              My Registrations
            </NavLink>
          )}

          {isAuthenticated && isAdmin && (
            <NavLink
              to="/durgotsav/admin"
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                  isActive
                    ? "bg-rose-500/20 text-rose-700 dark:text-rose-400 dark:bg-rose-500/25 shadow-2xs"
                    : "text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/40"
                }`
              }
            >
              👑 Admin Dashboard
            </NavLink>
          )}
        </nav>

        {/* User Status / CTA */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-2.5">
              <div className="text-right leading-tight">
                <p className="text-xs font-bold text-stone-900 dark:text-stone-100">
                  {user.fullName}
                </p>
                <p className="text-[10px] text-stone-500 dark:text-stone-400">
                  {user.phone} {user.flatNumber ? `• ${user.flatNumber}` : ""}
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="rounded-lg border border-stone-200 px-3 py-1.5 text-xs font-semibold text-stone-600 hover:bg-stone-100 hover:text-stone-900 dark:border-stone-800 dark:text-stone-300 dark:hover:bg-stone-800 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/durgotsav/login"
              className="rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:from-amber-600 hover:to-amber-700 transition"
            >
              Login with Phone
            </Link>
          )}

          {/* Quick back link to main Pranayansh website */}
          <Link
            to="/"
            title="Return to Pranayansh Technologies Homepage"
            className="rounded-lg border border-stone-200/80 px-2.5 py-1.5 text-[11px] font-medium text-stone-500 hover:bg-stone-50 hover:text-stone-900 dark:border-stone-800 dark:text-stone-400 dark:hover:bg-stone-900 dark:hover:text-stone-200 transition"
          >
            ← Pranayansh Tech
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle Durgotsav Menu"
            className="rounded-lg p-2 text-stone-600 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-amber-200/60 bg-white px-4 py-4 md:hidden dark:border-amber-900/30 dark:bg-[#0c0a09] animate-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col gap-2">
            <NavLink
              to="/durgotsav"
              end
              onClick={() => setMobileMenuOpen(false)}
              className={navLinkClass}
            >
              Overview
            </NavLink>
            {isAuthenticated && (
              <NavLink
                to="/durgotsav/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className={navLinkClass}
              >
                Dashboard
              </NavLink>
            )}
            {isAuthenticated && isAdmin && (
              <NavLink
                to="/durgotsav/admin/activities"
                onClick={() => setMobileMenuOpen(false)}
                className={navLinkClass}
              >
                Activities
              </NavLink>
            )}

            {isAuthenticated && (
              <NavLink
                to="/durgotsav/my-registrations"
                onClick={() => setMobileMenuOpen(false)}
                className={navLinkClass}
              >
                My Registrations
              </NavLink>
            )}

            {isAuthenticated && isAdmin && (
              <NavLink
                to="/durgotsav/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 flex items-center gap-1.5"
              >
                👑 Admin Dashboard
              </NavLink>
            )}

            <div className="mt-3 pt-3 border-t border-stone-200 dark:border-stone-800 flex flex-col gap-2">
              {isAuthenticated && user ? (
                <>
                  <div className="px-2 py-1">
                    <p className="text-xs font-bold text-stone-900 dark:text-stone-100">{user.fullName}</p>
                    <p className="text-[10px] text-stone-500">{user.phone} {user.flatNumber ? `• Flat ${user.flatNumber}` : ""}</p>
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full rounded-lg border border-stone-300 py-2 text-xs font-semibold text-stone-700 dark:border-stone-700 dark:text-stone-300"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/durgotsav/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full rounded-lg bg-amber-600 py-2.5 text-center text-xs font-bold text-white shadow-xs"
                >
                  Login with Phone
                </Link>
              )}

              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-1.5 text-xs text-stone-500 hover:text-stone-800 dark:text-stone-400"
              >
                ← Back to Pranayansh Technologies
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
