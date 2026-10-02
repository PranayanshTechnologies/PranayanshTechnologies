import React from "react";

interface LoadingSpinnerProps {
  message?: string;
  fullHeight?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = "Loading Durgotsav events...",
  fullHeight = false
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 text-center ${
        fullHeight ? "min-h-[50vh]" : "py-12"
      }`}
    >
      <div className="relative flex items-center justify-center">
        {/* Outer pulsating diya ring */}
        <div className="h-12 w-12 rounded-full border-4 border-amber-500/20 border-t-amber-500 animate-spin" />
        <span className="absolute text-lg">🪔</span>
      </div>
      {message && (
        <p className="mt-4 text-sm font-medium text-stone-600 dark:text-stone-400 animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
};
