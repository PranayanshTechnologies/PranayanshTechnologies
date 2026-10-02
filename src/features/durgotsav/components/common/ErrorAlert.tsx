import React from "react";

interface ErrorAlertProps {
  message: string;
  errors?: string[];
  onRetry?: () => void;
  className?: string;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({
  message,
  errors,
  onRetry,
  className = ""
}) => {
  return (
    <div
      className={`rounded-xl border border-rose-200 bg-rose-50/90 p-4 text-rose-900 shadow-sm dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-200 ${className}`}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <span className="text-xl leading-none">⚠️</span>
        <div className="flex-1 text-sm">
          <p className="font-semibold">{message}</p>
          {errors && errors.length > 0 && (
            <ul className="mt-2 list-disc pl-5 text-xs text-rose-700 dark:text-rose-300 space-y-0.5">
              {errors.map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          )}
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              🔄 Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
