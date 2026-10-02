import { Link } from "react-router-dom";

interface BrandLogoProps {
  className?: string;
  showSubtitle?: boolean;
  size?: "sm" | "md" | "lg";
}

export function BrandLogo({ className = "", showSubtitle = true, size = "md" }: BrandLogoProps) {
  const titleSizes = {
    sm: "text-base sm:text-lg",
    md: "text-lg sm:text-xl",
    lg: "text-2xl sm:text-3xl",
  };

  const subtitleSizes = {
    sm: "text-[9px]",
    md: "text-[10px]",
    lg: "text-xs",
  };

  return (
    <Link to="/" className={`inline-flex flex-col text-right items-end group transition ${className}`}>
      {/* Brand Name Typography */}
      <span className={`font-heading font-extrabold tracking-tight text-[#161616] dark:text-[#F4F4F6] leading-none transition-colors group-hover:text-brand-500 dark:group-hover:text-brand-300 ${titleSizes[size]}`}>
        PRANAYANSH
      </span>
      {showSubtitle && (
        <span className={`font-mono font-bold text-brand-500 dark:text-brand-300 tracking-widest uppercase mt-1 ${subtitleSizes[size]}`}>
          Technology
        </span>
      )}
    </Link>
  );
}
