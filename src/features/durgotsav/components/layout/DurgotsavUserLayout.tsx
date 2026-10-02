import React from "react";
import { Outlet } from "react-router-dom";
import { DurgotsavNavbar } from "../common/DurgotsavNavbar";
import { DurgotsavFooter } from "../common/DurgotsavFooter";
import "../../styles/durgotsav.css";

export const DurgotsavUserLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAF9F6] text-stone-900 dark:bg-[#0c0a09] dark:text-stone-100 antialiased selection:bg-amber-500 selection:text-white">
      <DurgotsavNavbar />
      <main className="flex-1 w-full durgotsav-festive-bg">
        <Outlet />
      </main>
      <DurgotsavFooter />
    </div>
  );
};
