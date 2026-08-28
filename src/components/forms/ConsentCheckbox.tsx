import { Link } from "react-router-dom";

interface ConsentCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  id?: string;
}

/**
 * Reusable required consent checkbox linking to the Privacy Policy page.
 * MUST be checked before any lead-capture form can be submitted (FR-020).
 */
export function ConsentCheckbox({ checked, onChange, id = "consent" }: ConsentCheckboxProps) {
  return (
    <div className="flex items-start gap-2">
      <input
        id={id}
        type="checkbox"
        required
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 h-4 w-4 shrink-0 rounded border-gray-300 text-brand-600 focus:ring-2 focus:ring-brand-500"
      />
      <label htmlFor={id} className="text-sm text-gray-600 dark:text-gray-300">
        I consent to Pranayansh Technologies collecting and using this information as
        described in the{" "}
        <Link to="/privacy-policy" className="text-brand-600 underline hover:text-brand-700">
          Privacy Policy
        </Link>
        . <span className="text-red-600">*</span>
      </label>
    </div>
  );
}
