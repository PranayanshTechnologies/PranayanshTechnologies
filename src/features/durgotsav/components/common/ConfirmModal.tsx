import React from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "primary" | "danger" | "success";
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "primary",
  loading = false,
  onConfirm,
  onCancel
}) => {
  if (!isOpen) return null;

  const buttonColors = {
    primary: "bg-amber-600 hover:bg-amber-700 text-white focus:ring-amber-500",
    danger: "bg-rose-600 hover:bg-rose-700 text-white focus:ring-rose-500",
    success: "bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500"
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-6 shadow-2xl dark:border-stone-800 dark:bg-stone-900 transition-all">
        <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
          {title}
        </h3>
        <p className="mt-2 text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
          {message}
        </p>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            disabled={loading}
            onClick={onCancel}
            className="rounded-lg border border-stone-300 px-4 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-100 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800 transition disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={onConfirm}
            className={`rounded-lg px-4 py-2 text-xs font-semibold shadow-xs transition focus:outline-none focus:ring-2 disabled:opacity-50 flex items-center gap-2 ${buttonColors[variant]}`}
          >
            {loading && <div className="h-3 w-3 rounded-full border-2 border-white/40 border-t-white animate-spin" />}
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
