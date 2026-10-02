import React from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDurgotsavAuth } from "../../context/DurgotsavAuthContext";
import "../../styles/durgotsav.css";

export const DurgotsavAdminLayout: React.FC = () => {
  const { user, logout } = useDurgotsavAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/durgotsav/login");
  };

  const adminTabClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all ${
      isActive
        ? "bg-rose-600 text-white shadow-md"
        : "text-stone-600 hover:text-stone-900 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800"
    }`;

  return (
    <div className="flex min-h-screen flex-col bg-stone-100/70 text-stone-900 dark:bg-[#0c0a09] dark:text-stone-100 antialiased selection:bg-rose-500 selection:text-white">
      {/* Admin Top Header */}
      <header className="sticky top-0 z-40 w-full border-b border-rose-200/80 bg-white/95 backdrop-blur-md dark:border-rose-950/60 dark:bg-[#120e0d]/95">
        <div className="w-full px-4 sm:px-8 lg:px-12 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/durgotsav/admin" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-rose-600 to-amber-600 text-lg shadow-md text-white">
                👑
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-heading font-black text-base text-stone-900 dark:text-stone-100">
                    Durgotsav <span className="text-rose-600 dark:text-rose-400">Admin</span>
                  </span>
                  <span className="rounded-md bg-rose-100 px-1.5 py-0.5 text-[10px] font-extrabold text-rose-800 dark:bg-rose-950 dark:text-rose-300 uppercase">
                    Control Center
                  </span>
                </div>
                <p className="text-[10px] text-stone-500">Event Operations & Verifications</p>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/durgotsav"
              className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-amber-700 hover:text-amber-800 dark:text-amber-400 px-3 py-1.5 rounded-lg border border-amber-300 dark:border-amber-900"
            >
              👁️ View Public Portal
            </Link>

            <div className="text-right text-xs leading-tight hidden md:block">
              <p className="font-bold text-stone-900 dark:text-stone-100">{user?.fullName || "Admin"}</p>
              <p className="text-[10px] text-stone-500">{user?.phone}</p>
            </div>

            <button
              onClick={handleLogout}
              className="rounded-lg bg-stone-200/80 hover:bg-rose-100 hover:text-rose-700 dark:bg-stone-800 dark:hover:bg-rose-950 dark:hover:text-rose-300 px-3 py-1.5 text-xs font-semibold transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="w-full px-4 sm:px-8 lg:px-12 border-t border-stone-200/70 dark:border-stone-800/80 overflow-x-auto py-2 flex items-center gap-2">
          <NavLink to="/durgotsav/admin" end className={adminTabClass}>
            📊 Dashboard
          </NavLink>
          <NavLink to="/durgotsav/admin/activities" className={adminTabClass}>
            🎪 Activities Management
          </NavLink>
          <NavLink to="/durgotsav/admin/participants" className={adminTabClass}>
            👥 Participant Verification
          </NavLink>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-8">
        <Outlet />
      </main>

      {/* Admin Footer */}
      <footer className="w-full border-t border-stone-200/60 bg-white py-4 px-4 text-center text-xs text-stone-500 dark:border-stone-800 dark:bg-[#0c0a09]">
        Durgotsav 2026 Admin Portal • Authenticated as {user?.fullName} ({user?.phone})
      </footer>
    </div>
  );
};
