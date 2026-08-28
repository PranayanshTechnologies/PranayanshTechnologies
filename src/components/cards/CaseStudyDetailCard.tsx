import { useNavigate } from "react-router-dom";
import type { CaseStudy } from "../../types/content";

interface CaseStudyDetailCardProps {
  caseStudy: CaseStudy;
}

export function CaseStudyDetailCard({ caseStudy }: CaseStudyDetailCardProps) {
  const navigate = useNavigate();

  function handleDiscuss() {
    navigate("/get-a-quote", {
      state: {
        serviceId: caseStudy.relatedServiceId || "software-development",
        projectDescription: `Interested in solution similar to: ${caseStudy.title}`,
      },
    });
  }

  return (
    <div className="clean-card flex flex-col justify-between rounded-xl border border-[#E0E0E0] bg-white p-8 shadow-xs dark:border-[#2D2D2D] dark:bg-[#161616]">
      <div>
        <div className="flex items-center justify-between">
          <span className="kicker-mono text-xs font-bold text-[#FF462D] dark:text-[#FFA699]">
            {caseStudy.clientType}
          </span>
          <span className="font-mono text-xs text-[#8D8D8D]">
            {caseStudy.engagementType}
          </span>
        </div>

        <h3 className="mt-4 font-heading text-xl font-bold tracking-tight text-[#161616] dark:text-[#F4F4F4]">
          {caseStudy.title}
        </h3>

        <p className="mt-2.5 text-xs sm:text-sm text-[#525252] dark:text-[#C6C6C6] leading-relaxed font-sans">
          {caseStudy.summary}
        </p>

        {/* Results Row */}
        <div className="mt-6 grid grid-cols-2 gap-4 rounded-lg bg-[#F4F4F4] p-4 dark:bg-[#1F1F1F]">
          {caseStudy.results.slice(0, 2).map((res, i) => (
            <div key={i}>
              <p className="font-heading text-2xl font-bold text-[#FF462D] dark:text-[#FF7561]">{res.metric}</p>
              <p className="text-xs text-[#525252] dark:text-[#A8A8A8] mt-0.5 font-sans">{res.label}</p>
            </div>
          ))}
        </div>

        {/* Tech tags */}
        <div className="mt-6 flex flex-wrap gap-1.5">
          {caseStudy.technologies.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-[#E0E0E0] bg-white px-2 py-0.5 font-mono text-[11px] font-medium text-[#525252] dark:border-[#393939] dark:bg-[#1F1F1F] dark:text-[#C6C6C6]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-[#E0E0E0] dark:border-[#2D2D2D]">
        <button
          type="button"
          onClick={handleDiscuss}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF462D] hover:text-[#BA2212] dark:text-[#FF7561] transition"
        >
          Discuss Similar Architecture &amp; Delivery →
        </button>
      </div>
    </div>
  );
}
