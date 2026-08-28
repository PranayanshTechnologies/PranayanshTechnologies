import type { ServiceOffering } from "../../types/content";

interface ServiceCardProps {
  service: ServiceOffering;
  onCtaClick: (service: ServiceOffering) => void;
}

export function ServiceCard({ service, onCtaClick }: ServiceCardProps) {
  const isDev = service.category === "development";
  const isEmerging = service.status === "emerging";

  return (
    <div className="clean-card flex h-full flex-col justify-between rounded-xl border border-[#E0E0E0] bg-white p-7 shadow-xs dark:border-[#2D2D2D] dark:bg-[#161616]">
      <div>
        <div className="flex items-center justify-between">
          <span
            className={`kicker-mono rounded-md px-2.5 py-1 text-[11px] font-bold ${
              isDev
                ? "bg-[#FFF2F0] text-[#FF462D] dark:bg-[#2A0E0A] dark:text-[#FFA699]"
                : "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
            }`}
          >
            {isEmerging ? "Growing Capability" : isDev ? "Software Engineering" : "Consulting & Squads"}
          </span>

          {service.turnaround && (
            <span className="font-mono text-[11px] font-medium text-[#8D8D8D]">
              {service.turnaround}
            </span>
          )}
        </div>

        <h3 className="mt-4 font-heading text-lg font-bold tracking-tight text-[#161616] dark:text-[#F4F4F4]">
          {service.name}
        </h3>

        <p className="mt-1.5 text-xs text-[#FF462D] dark:text-[#FF7561] font-semibold">
          {service.tagline}
        </p>

        <p className="mt-3 text-xs leading-relaxed text-[#525252] dark:text-[#C6C6C6] font-sans">
          {service.description}
        </p>

        {service.features && (
          <ul className="mt-5 space-y-2 border-t border-[#E0E0E0] pt-4 dark:border-[#2D2D2D] text-xs text-[#525252] dark:text-[#C6C6C6] font-sans">
            {service.features.slice(0, 3).map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#FF462D] font-bold">✓</span>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-[#E0E0E0] dark:border-[#2D2D2D]">
        <button
          type="button"
          onClick={() => onCtaClick(service)}
          className="w-full rounded-lg bg-[#161616] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#FF462D] dark:bg-[#262626] dark:hover:bg-[#FF462D]"
        >
          {isEmerging ? "Register Interest" : service.ctaLabel} →
        </button>
      </div>
    </div>
  );
}
