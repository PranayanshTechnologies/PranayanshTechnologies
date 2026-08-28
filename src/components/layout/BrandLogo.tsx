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
    <Link to="/" className={`inline-flex flex-col text-left group transition ${className}`}>
      {/* Brand Name Typography */}
      <span className={`font-heading font-extrabold tracking-tight text-[#161616] dark:text-[#F4F4F4] leading-none transition-colors group-hover:text-[#FF462D] dark:group-hover:text-[#FF7561] ${titleSizes[size]}`}>
        Pranayansh
      </span>
      {showSubtitle && (
        <span className={`font-mono font-bold text-[#FF462D] dark:text-[#FF7561] tracking-widest uppercase mt-1 ${subtitleSizes[size]}`}>
          Technologies
        </span>
      )}
    </Link>
  );
}
