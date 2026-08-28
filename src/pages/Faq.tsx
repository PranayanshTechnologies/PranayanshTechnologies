import { useState, useMemo } from "react";
import { PageMeta } from "../components/layout/PageMeta";
import { CtaBanner } from "../components/cta/CtaBanner";
import { faq } from "../data/faq";
import type { FaqEntry } from "../types/content";

const TOPICS = [
  { id: "all", label: "All Questions" },
  { id: "development", label: "Software Development" },
  { id: "staffing", label: "Consulting & Vetting" },
  { id: "pricing", label: "Pricing & Trials" },
  { id: "security", label: "IP Ownership" },
];

export default function Faq() {
  const [selectedTopic, setSelectedTopic] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [openIds, setOpenIds] = useState<string[]>([faq[0]?.id || ""]);

  function toggleAccordion(id: string) {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }

  const filteredFaq = useMemo(() => {
    return faq.filter((item) => {
      const matchesTopic = selectedTopic === "all" || item.topic === selectedTopic;
      const matchesSearch =
        item.question.toLowerCase().includes(search.toLowerCase()) ||
        item.answer.toLowerCase().includes(search.toLowerCase());
      return matchesTopic && matchesSearch;
    });
  }, [selectedTopic, search]);

  return (
    <>
      <PageMeta
        title="Frequently Asked Questions (FAQ) | Software &amp; Consulting"
        description="Clear answers on software development, dedicated consulting models, 48h talent matching, IP ownership, and pricing."
      />

      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 py-16 sm:py-24">
        {/* Header */}
        <div className="max-w-3xl">
          <span className="kicker-mono text-xs font-bold text-[#FF462D] dark:text-[#FFA699]">
            Knowledge Base
          </span>
          <h1 className="mt-2 font-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#161616] dark:text-[#F4F4F4]">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#525252] dark:text-[#C6C6C6] font-sans">
            Answers regarding our software engineering delivery, remote/on-premise consulting squads, and 45-day trial guarantees.
          </p>

          {/* Search bar */}
          <div className="mt-8 relative max-w-lg">
            <input
              type="text"
              placeholder="Search questions (e.g. trial, pricing, IP, freshers)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-[#E0E0E0] bg-white px-4 py-3 pl-10 text-xs shadow-2xs focus:border-[#FF462D] focus:outline-none dark:border-[#393939] dark:bg-[#1F1F1F] dark:text-[#F4F4F4]"
            />
            <svg
              className="absolute left-3.5 top-3.5 h-4 w-4 text-[#8D8D8D]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="mt-10 flex flex-wrap gap-2 border-b border-[#E0E0E0] pb-4 dark:border-[#2D2D2D]">
          {TOPICS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setSelectedTopic(t.id)}
              className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition ${
                selectedTopic === t.id
                  ? "bg-[#FF462D] text-white shadow-xs"
                  : "bg-[#F4F4F4] text-[#525252] hover:bg-[#E0E0E0] dark:bg-[#1F1F1F] dark:text-[#C6C6C6] dark:hover:bg-[#262626]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Accordions */}
        <div className="mt-8 space-y-3 max-w-5xl">
          {filteredFaq.map((item: FaqEntry) => {
            const isOpen = openIds.includes(item.id);
            return (
              <div
                key={item.id}
                className="overflow-hidden rounded-xl border border-[#E0E0E0] bg-white dark:border-[#2D2D2D] dark:bg-[#161616]"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(item.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between p-5 text-left transition hover:bg-[#F4F4F4]/70 dark:hover:bg-[#1F1F1F]/60"
                >
                  <span className="font-heading text-sm sm:text-base font-bold text-[#161616] dark:text-[#F4F4F4] pr-4">
                    {item.question}
                  </span>
                  <span className="text-sm font-bold text-[#FF462D] dark:text-[#FFA699]">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div className="border-t border-[#E0E0E0] px-5 pb-5 pt-3 dark:border-[#2D2D2D] bg-[#F4F4F4]/40 dark:bg-[#1F1F1F]/30">
                    <p className="text-xs sm:text-sm text-[#525252] dark:text-[#C6C6C6] leading-relaxed font-sans">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <CtaBanner
          heading="Ready to get started?"
          body="Tell us about your project requirements or team staffing needs for a proposal in 2 hours."
          ctaLabel="Get a Quote &amp; Estimate"
          to="/get-a-quote"
        />
      </div>
    </>
  );
}
