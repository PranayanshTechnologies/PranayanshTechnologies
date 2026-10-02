import type { ServiceOffering } from "../../types/content";

interface ServiceCardProps {
  service: ServiceOffering;
  onCtaClick: (service: ServiceOffering) => void;
}

const CATEGORY_LABELS: Record<ServiceOffering["category"], string> = {
  engineering: "Engineering",
  "cloud-devops": "Cloud & DevOps",
  "ai-data": "AI & Data",
  design: "Design",
  consulting: "Consulting & Teams",
  "managed-marketing": "Managed & Marketing",
};

export function ServiceCard({ service, onCtaClick }: ServiceCardProps) {
  return (
    <div className="clean-card flex h-full flex-col justify-between rounded-xl border border-[#E0E0E0] bg-white p-7 shadow-xs dark:border-[#2D2D2D] dark:bg-[#161616]">
      <div>
        <div className="flex items-center justify-between">
          <span className="kicker-mono rounded-md px-2.5 py-1 text-[11px] font-bold bg-[#EEF0FF] text-[#5B47F5] dark:bg-[#1E1B4B] dark:text-[#9FA3FF]">
            {CATEGORY_LABELS[service.category]}
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

        <p className="mt-1.5 text-xs text-[#5B47F5] dark:text-[#7B74FF] font-semibold">
          {service.tagline}
        </p>

        <p className="mt-3 text-xs leading-relaxed text-[#525252] dark:text-[#C6C6C6] font-sans">
          {service.description}
        </p>

        {service.features && (
          <ul className="mt-5 space-y-2 border-t border-[#E0E0E0] pt-4 dark:border-[#2D2D2D] text-xs text-[#525252] dark:text-[#C6C6C6] font-sans">
            {service.features.slice(0, 3).map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#5B47F5] font-bold">✓</span>
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
          className="w-full rounded-lg bg-[#161616] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#5B47F5] dark:bg-[#262626] dark:hover:bg-[#5B47F5]"
        >
          {service.ctaLabel} →
        </button>
      </div>
    </div>
  );
}

