import React from "react";

interface StatusBadgeProps {
  isWithdraw?: boolean;
  isPerformed?: boolean;
  isCertificateCollected?: boolean;
  size?: "sm" | "md";
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  isWithdraw = false,
  isPerformed = false,
  isCertificateCollected = false,
  size = "md"
}) => {
  const sizeClasses = size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-3 py-1 text-xs";

  if (isWithdraw) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 font-medium rounded-full bg-stone-100 text-stone-600 border border-stone-200 dark:bg-stone-900/60 dark:text-stone-400 dark:border-stone-800 ${sizeClasses}`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-stone-400" />
        Withdrawn
      </span>
    );
  }

  if (isCertificateCollected) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 font-semibold rounded-full bg-purple-50 text-purple-700 border border-purple-200 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800/60 ${sizeClasses}`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
        Certificate Collected ✓
      </span>
    );
  }

  if (isPerformed) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800/60 ${sizeClasses}`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        Performed ✓
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full bg-amber-50 text-amber-800 border border-amber-200/80 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/60 ${sizeClasses}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
      Registered
    </span>
  );
};
